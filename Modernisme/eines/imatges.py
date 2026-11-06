"""Descarrega, converteix i acredita les imatges de la web.

Ús (des de la carpeta Modernisme):
    python eines/imatges.py            # processa només el que falti
    python eines/imatges.py --forca    # ho regenera tot

Per a cada imatge del catàleg (eines/imatges.json):
  1. Descarrega l'original de Wikimedia Commons a _originals/ (carpeta no publicada).
  2. Genera tres versions WebP:
       img/mini/<id>.webp     900 px de costat llarg  -> galeries i targetes
       img/mitjana/<id>.webp  2000 px                 -> vista ampliada
       img/gran/<id>.webp     fins a 5000 px          -> zoom de detall (només si l'original és prou gran)
  3. Escriu dades/imatges.js amb mides, autoria i llicència de cada imatge.

El visor no deixa ampliar mai per sobre de la mida real de la versió més gran,
de manera que les imatges no es pixelen.
"""
import json, os, re, sys, time, html, shutil, urllib.request, urllib.parse
from concurrent.futures import ProcessPoolExecutor
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
ARREL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIG = os.path.join(ARREL, '_originals')
UA = {'User-Agent': 'ModernismeEduBot/1.0 (web educativa; github.com/felipsarroca/web)'}
MIDES = {'mini': (900, 78), 'mitjana': (2000, 82), 'gran': (5000, 85)}
MIN_GRAN = 2300  # per sota d'aquest costat llarg, la mitjana ja és la versió màxima


def obre_url(url, intents=8):
    for i in range(intents):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=180).read()
        except urllib.error.HTTPError as e:
            if e.code == 429:
                espera = int(e.headers.get('Retry-After') or 0) or 30 * (i + 1)
                print(f'    429: espero {espera} s')
                time.sleep(espera)
                continue
            raise
    raise RuntimeError('Massa peticions: ' + url)


def info_commons(titols):
    """Retorna {titol: imageinfo} en blocs de 40."""
    res = {}
    for i in range(0, len(titols), 40):
        bloc = ['File:' + t.replace('_', ' ') for t in titols[i:i + 40]]
        q = {'action': 'query', 'titles': '|'.join(bloc), 'prop': 'imageinfo',
             'iiprop': 'url|size|extmetadata', 'format': 'json', 'formatversion': 2,
             'iiextmetadatafilter': 'Artist|LicenseShortName|LicenseUrl|Credit'}
        r = json.loads(obre_url('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(q)))
        norm = {n['to']: n['from'] for n in r['query'].get('normalized', [])}
        for p in r['query']['pages']:
            if p.get('missing'):
                print('  ! No existeix a Commons:', p['title'])
                continue
            original = norm.get(p['title'], p['title'])[5:].replace(' ', '_')
            res[original] = p['imageinfo'][0]
        time.sleep(1)
    return res


def neteja(txt):
    txt = re.sub(r'<[^>]+>', ' ', txt or '')
    txt = html.unescape(re.sub(r'\s+', ' ', txt)).strip()
    txt = re.sub(r'\s*\(\s*talk\s*\)', '', txt)
    return {'Public domain': 'Domini públic'}.get(txt, txt)


def converteix(args):
    id_, origen, forca = args
    sortides = {}
    with Image.open(origen) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode not in ('RGB', 'L'):
            im = im.convert('RGB')
        llarg = max(im.size)
        for nom, (cap, qualitat) in MIDES.items():
            if nom == 'gran' and llarg < MIN_GRAN:
                continue
            desti = os.path.join(ARREL, 'img', nom, id_ + '.webp')
            if not forca and os.path.exists(desti) and os.path.getmtime(desti) > os.path.getmtime(origen):
                with Image.open(desti) as d:
                    sortides[nom] = d.size
                continue
            c = im.copy()
            if max(c.size) > cap:
                c.thumbnail((cap, cap), Image.LANCZOS)
            c.save(desti, 'WEBP', quality=qualitat, method=4)
            sortides[nom] = c.size
    return id_, sortides


def main():
    forca = '--forca' in sys.argv
    cat = json.load(open(os.path.join(ARREL, 'eines', 'imatges.json'), encoding='utf-8'))['imatges']
    os.makedirs(ORIG, exist_ok=True)
    for nom in MIDES:
        os.makedirs(os.path.join(ARREL, 'img', nom), exist_ok=True)

    infos = info_commons([x['commons'] for x in cat if 'commons' in x])
    meta, feines = {}, []
    for x in cat:
        id_ = x['id']
        if 'commons' in x:
            ii = infos.get(x['commons'])
            if not ii:
                continue
            ext = os.path.splitext(ii['url'].split('?')[0])[1].lower()
            origen = os.path.join(ORIG, id_ + ext)
            if not os.path.exists(origen):
                print('  Descarregant', id_, f"({ii['width']}×{ii['height']})", flush=True)
                try:
                    dades = obre_url(ii['url'].split('?')[0])
                except RuntimeError as err:
                    print('  ✘ No s\'ha pogut descarregar', id_, '-', err, flush=True)
                    continue
                with open(origen, 'wb') as f:
                    f.write(dades)
                time.sleep(12)
            m = ii.get('extmetadata', {})
            meta[id_] = {
                'autor': neteja(m.get('Artist', {}).get('value')) or 'Autor desconegut',
                'llicencia': neteja(m.get('LicenseShortName', {}).get('value')),
                'llicenciaUrl': m.get('LicenseUrl', {}).get('value', ''),
                'font': ii['descriptionurl'],
            }
        else:
            origen = os.path.join(ORIG, x['local'])
            if not os.path.exists(origen):
                shutil.copy2(os.path.join(ARREL, 'eines', 'locals', x['local']), origen)
            meta[id_] = {'autor': x.get('autor', ''), 'llicencia': x.get('llicencia', ''),
                         'llicenciaUrl': '', 'font': x.get('font', '')}
        feines.append((id_, origen, forca))

    with ProcessPoolExecutor() as ex:
        for id_, sortides in ex.map(converteix, feines):
            meta[id_]['mides'] = {k: list(v) for k, v in sortides.items()}
            print('  ✓', id_, ' · '.join(f'{k} {v[0]}×{v[1]}' for k, v in sortides.items()))

    ordenat = {x['id']: meta[x['id']] for x in cat if x['id'] in meta}
    os.makedirs(os.path.join(ARREL, 'dades'), exist_ok=True)
    with open(os.path.join(ARREL, 'dades', 'imatges.js'), 'w', encoding='utf-8') as f:
        f.write('/* Fitxer generat per eines/imatges.py: no l\'editis a mà. */\n')
        f.write('window.IMATGES = ' + json.dumps(ordenat, ensure_ascii=False, indent=1) + ';\n')
    print(f'Fet: {len(ordenat)} imatges.')


if __name__ == '__main__':
    main()
