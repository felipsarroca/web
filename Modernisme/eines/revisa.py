"""Revisió automàtica de la web.

Ús (des de la carpeta Modernisme):
    python eines/revisa.py

Comprova:
  - enllaços interns trencats (pàgina o àncora #id inexistent);
  - imatges sense fitxer (mini, mitjana) o sense crèdits a dades/imatges.js;
  - obres (data-obra) i termes del glossari (data-terme) que no existeixen;
  - termes del glossari que no s'usen enlloc;
  - preguntes del repte amb enllaços «Repassa-ho» trencats.
Retorna codi 1 si troba errors.
"""
import glob, json, os, re, sys
from bs4 import BeautifulSoup

ARREL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ARREL)
errors, avisos = [], []


def js_objecte(fitxer, nom):
    """Llegeix window.NOM = {...}; / [...] amb Node per no haver d'analitzar JavaScript a mà."""
    import subprocess
    codi = "global.window={};require('./%s');process.stdout.write(JSON.stringify(window.%s))" % (fitxer, nom)
    return json.loads(subprocess.run(['node', '-e', codi], capture_output=True, text=True, encoding='utf-8', check=True).stdout)


IMATGES = js_objecte('dades/imatges.js', 'IMATGES')
OBRES = {o['id']: o for o in js_objecte('dades/obres.js', 'OBRES')}
GLOSSARI = js_objecte('dades/glossari.js', 'GLOSSARI')
PREGUNTES = js_objecte('dades/preguntes.js', 'PREGUNTES')
comu = open('js/comu.js', encoding='utf-8').read()

# Identificadors de cada pàgina (els generats per JS s'afegeixen a mà)
ids = {}
pagines = {}
for p in sorted(glob.glob('*.html')):
    sopa = BeautifulSoup(open(p, encoding='utf-8').read(), 'html.parser')
    pagines[p] = sopa
    ids[p] = {t['id'] for t in sopa.find_all(id=True)} | {'titol-fonts'}
ids['glossari.html'] |= set(GLOSSARI)
# Seccions generades amb JavaScript
ids['arquitectes.html'] |= {'gaudi', 'domenech', 'puig', 'muncunill'}

def comprova_enllac(origen, href):
    if not href or href.startswith(('http', 'mailto:', 'javascript:', '#!')):
        return
    pag, _, ancora = href.partition('#')
    pag = pag or origen
    if pag not in pagines:
        if not os.path.exists(pag):
            errors.append('%s: enllaç a una pàgina inexistent: %s' % (origen, href))
        return
    if ancora and ancora not in ids[pag]:
        errors.append('%s: àncora inexistent: %s' % (origen, href))

usats_img, usats_terme = set(), set()
for p, sopa in pagines.items():
    for a in sopa.find_all('a', href=True):
        comprova_enllac(p, a['href'])
    for el in sopa.find_all(attrs={'data-img': True}):
        usats_img.add(el['data-img'])
    for el in sopa.find_all(attrs={'data-obra': True}):
        o = el['data-obra']
        if o not in OBRES:
            errors.append('%s: obra inexistent a dades/obres.js: %s' % (p, o))
        elif OBRES[o].get('img'):
            usats_img.add(OBRES[o]['img'])
    for img in sopa.find_all('img', src=True):
        m = re.match(r'img/(mini|mitjana|gran)/(.+)\.webp$', img['src'])
        if m:
            usats_img.add(m.group(2))
        elif not img['src'].startswith(('http', 'data:')) and not os.path.exists(img['src']):
            errors.append('%s: imatge inexistent: %s' % (p, img['src']))
        if not img.has_attr('alt'):
            errors.append('%s: imatge sense text alternatiu: %s' % (p, img['src']))
    for el in sopa.find_all(attrs={'data-terme': True}):
        usats_terme.add(el['data-terme'])
        if el['data-terme'] not in GLOSSARI:
            errors.append('%s: terme inexistent al glossari: %s' % (p, el['data-terme']))

# Menú i enllaços generats per JavaScript
for href in re.findall(r"href: '([^']+)'", comu):
    comprova_enllac('js/comu.js', href)
for o in OBRES.values():
    if o.get('img'):
        usats_img.add(o['img'])
for q in PREGUNTES:
    if q.get('img'):
        usats_img.add(q['img'])
    if q.get('r'):
        comprova_enllac('dades/preguntes.js', q['r'])

for i in sorted(usats_img):
    if i not in IMATGES:
        errors.append('Imatge sense crèdits a dades/imatges.js: ' + i)
    for mida in ('mini', 'mitjana'):
        if not os.path.exists('img/%s/%s.webp' % (mida, i)):
            errors.append('Falta el fitxer img/%s/%s.webp' % (mida, i))
for i, d in IMATGES.items():
    if not d.get('autor') or not d.get('llicencia'):
        avisos.append('Imatge amb autoria o llicència incompleta: ' + i)
for i in sorted(set(IMATGES) - usats_img):
    avisos.append('Imatge al catàleg que no es fa servir: ' + i)
for t in sorted(set(GLOSSARI) - usats_terme):
    avisos.append('Terme del glossari que no s\'enllaça des de cap pàgina: ' + t)

for a in avisos:
    print('  · Avís:', a)
for e in errors:
    print('  ✘ Error:', e)
print('Revisió acabada: %d errors, %d avisos (%d pàgines, %d imatges, %d termes).' % (len(errors), len(avisos), len(pagines), len(IMATGES), len(GLOSSARI)))
sys.exit(1 if errors else 0)
