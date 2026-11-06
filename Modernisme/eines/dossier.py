"""Genera dossier.html: totes les activitats «Posa-t'hi» en format imprimible.

Ús (des de la carpeta Modernisme):
    python eines/dossier.py

Torna'l a executar sempre que canviïs alguna activitat de les pàgines.
"""
import os, random, re
from bs4 import BeautifulSoup

ARREL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGINES = ['que-es', 'catalunya', 'mon', 'temps', 'arquitectura', 'arts', 'oficis', 'objectes',
           'cartellisme', 'autors', 'arquitectes', 'terrassa', 'llegat']
AUTOAVALUACIO = [
    'Sé explicar què és el Modernisme, quan i on es va desenvolupar.',
    'Sé relacionar el Modernisme amb la industrialització, la burgesia i la Renaixença.',
    'Reconec una obra modernista pels seus trets: natura, línia corba, color i materials.',
    'Conec els principals arquitectes, artistes i escriptors, també les dones.',
    'Sé explicar com treballaven almenys tres oficis artesans.',
    'Identifico materials i tècniques: maó, ferro, vidre, ceràmica, trencadís, esgrafiat i volta catalana.',
    'Conec el patrimoni modernista de Terrassa i el sé situar al mapa.',
    'Argumento per què cal conservar el patrimoni i quins problemes té avui.',
]


def caixa(s):
    return '<span class="caixa-marcar" aria-hidden="true"></span>' + s


def transforma(sec, sopa, rnd):
    for x in sec.select('header svg, .accions-activitat, .copia-enllac, .retroaccio, .explicacio'):
        x.decompose()
    for b in sec.select('button.boto, a.boto'):
        if 'print' in (b.get('onclick') or '') or b.name == 'button':
            b.decompose()
    # Termes del glossari i botons d'imatge: només el contingut
    for t in sec.select('button.terme'):
        t.name = 'span'; t.attrs = {'class': 'terme-imprès'}
    for b in sec.select('button.boto-imatge'):
        img = b.find('img')
        b.replace_with(img if img else '')
    # Relacionar → taula amb espai per escriure
    for act in sec.select('.activitat-relaciona'):
        opcions = sorted(act.get('data-opcions', '').split('|'), key=str.lower)
        files = ''.join('<tr><td>%s</td><td class="buit"></td></tr>' % (f.select_one('.text-fila') or f).decode_contents()
                        for f in act.select('.fila-relaciona'))
        nou = BeautifulSoup('<div class="dossier-relaciona"><p class="opcions-dossier"><strong>Opcions:</strong> %s</p>'
                            '<table class="taula-dossier"><tbody>%s</tbody></table></div>' % (' · '.join(opcions), files), 'html.parser')
        act.replace_with(nou)
    # Classificar → targetes amb caselles
    for act in sec.select('.activitat-classifica'):
        opcions = act.get('data-opcions', 'Modernista|No modernista').split('|')
        cartes = []
        for c in act.select('.carta-classifica'):
            img = c.find('img')
            nom = c.select_one('.nom')
            cartes.append('<div class="carta-dossier">%s<p><strong>%s</strong></p><p>%s</p></div>' % (
                str(img) if img else '', nom.get_text() if nom else '', ' '.join(caixa(o) for o in opcions)))
        act.replace_with(BeautifulSoup('<div class="graella-dossier">%s</div>' % ''.join(cartes), 'html.parser'))
    # Ordenar → elements barrejats amb una casella per numerar
    for act in sec.select('.activitat-ordena'):
        items = [li.decode_contents() for li in act.find_all('li', recursive=False)]
        rnd.shuffle(items)
        act.replace_with(BeautifulSoup('<ul class="ordena-dossier">%s</ul>' % ''.join(
            '<li><span class="num-buit"></span>%s</li>' % i for i in items), 'html.parser'))
    # Endevinalles → espai per a la resposta
    for d in sec.select('.endevinalla details'):
        d.replace_with(BeautifulSoup('<p class="linia-resposta">Resposta:</p>', 'html.parser'))
    # Espai per escriure després de cada pregunta oberta
    for a in sec.select('.activitat'):
        if not a.select('.dossier-relaciona, .graella-dossier, .ordena-dossier, table'):
            a.append(BeautifulSoup('<div class="linies-dossier"><span></span><span></span><span></span><span></span></div>', 'html.parser'))
    for x in sec.find_all(attrs={'style': True}):
        del x['style']
    del sec['class']
    sec['class'] = 'activitat-dossier'
    return sec


def main():
    rnd = random.Random(1888)
    blocs = []
    for n, nom in enumerate(PAGINES, 1):
        sopa = BeautifulSoup(open(os.path.join(ARREL, nom + '.html'), encoding='utf-8').read(), 'html.parser')
        titol = sopa.find('h1').get_text(strip=True)
        seccions = sopa.select('section.posa-thi')
        if not seccions:
            continue
        cos = ''.join(str(transforma(s, sopa, rnd)) for s in seccions)
        cos = cos.replace('id="posathi"', '')
        blocs.append('<article class="bloc-dossier"><p class="pagina-origen">%d · %s · <a href="%s.html#posathi">%s.html</a></p>%s</article>' % (n, titol, nom, nom, cos))

    auto = ''.join('<tr><th scope="row">%s</th><td></td><td></td><td></td></tr>' % a for a in AUTOAVALUACIO)
    html = open(os.path.join(ARREL, 'eines', 'dossier-plantilla.html'), encoding='utf-8').read()
    # Consignes pensades per a la pantalla, adaptades al paper
    PAPER = [(" Després prem <strong>Comprova</strong> per llegir l'explicació.", ''),
             (' Quan comprovis, apareixerà l\'any de cada fet.', ''),
             ('amb les fletxes', 'numerant les caselles'),
             ('Amplia cada imatge si cal i tria', 'Tria'),
             ('pensa la resposta i després obre-la per comprovar-ho', 'i escriu la resposta')]
    blocs = [b for b in blocs]
    for i, b in enumerate(blocs):
        for vell, nou in PAPER:
            b = b.replace(vell, nou)
        blocs[i] = b
    html = html.replace('<!--BLOCS-->', '\n'.join(blocs)).replace('<!--AUTOAVALUACIO-->', auto)
    open(os.path.join(ARREL, 'dossier.html'), 'w', encoding='utf-8').write(html)
    print('dossier.html:', len(blocs), 'pàgines')


if __name__ == '__main__':
    main()
