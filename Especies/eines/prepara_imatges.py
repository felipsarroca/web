# SPDX-License-Identifier: AGPL-3.0-or-later
"""Prepara les imatges de la web a partir de les infografies v2 (des de la carpeta Especies)."""
from PIL import Image, ImageDraw, ImageFilter
import os
G = 'infografies/gen/'; C = 'infografies/comp/'
FINALS = ['El comerç de les espècies - (%d).png' % i for i in range(1, 10)]
NOMS = ['paradoxa', 'especies', 'marco-polo', 'indic', 'preus', 'compradors', 'colom-gama', 'volta-mon', 'avui']
for f, n in zip(FINALS, NOMS):
    im = Image.open('infografies/' + f).convert('RGB')
    im.save(f'img/infografies/{n}.webp', quality=82, method=6)
    im.resize((640, 360), Image.LANCZOS).save(f'img/infografies/{n}-mini.webp', quality=78, method=6)

V = {  # nom: (fitxer, caixa en coordenades 1672x941)
 'pebre': ('v2-2-especies', (165, 125, 340, 255)), 'clau': ('v2-2-especies', (1055, 115, 1245, 270)),
 'safra': ('v2-2-especies', (20, 275, 240, 475)), 'nou-moscada': ('v2-2-especies', (1145, 315, 1300, 450)),
 'cardamom': ('v2-2-especies', (55, 505, 248, 655)), 'canyella': ('v2-2-especies', (1130, 505, 1400, 670)),
 'gingebre': ('v2-2-especies', (495, 655, 785, 815)), 'cistell': ('v2-2-especies', (650, 270, 1000, 485)),
 'eines-fuster': ('v2-1-paradoxa', (125, 90, 565, 295)), 'pot-pebre': ('v2-1-paradoxa', (1270, 90, 1505, 295)),
 'grans-pebre': ('v2-1-paradoxa', (660, 435, 1000, 625)), 'flor-safra': ('v2-1-paradoxa', (1160, 465, 1495, 675)),
 'marco-polo': ('v2-3-marco-polo', (0, 120, 445, 600)), 'dhow': ('v2-4-index-monsons', (1145, 100, 1625, 345)),
 'mans-sac': ('v2-4-index-monsons', (1105, 520, 1630, 715)), 'camell': ('v2-5-preus', (490, 175, 760, 415)),
 'galera': ('v2-5-preus', (825, 125, 1195, 345)), 'balanca': ('v2-5-preus', (1285, 90, 1655, 295)),
 'planta-pebre': ('v2-5-preus', (55, 250, 375, 475)), 'olla': ('v2-6-compradors', (40, 140, 295, 365)),
 'morter': ('v2-6-compradors', (1070, 150, 1262, 355)), 'encenser': ('v2-6-compradors', (25, 380, 228, 705)),
 'coca': ('v2-6-compradors', (1040, 400, 1300, 665)), 'carn-fals': ('v2-6-compradors', (820, 685, 1165, 885)),
 'copa': ('v2-6-compradors', (595, 280, 975, 475)), 'caravella': ('v2-7-colom-gama', (1015, 125, 1265, 320)),
 'nau-castella': ('v2-7-colom-gama', (1345, 95, 1615, 320)), 'aji': ('v2-7-colom-gama', (1365, 565, 1645, 695)),
 'pebre-canyella': ('v2-7-colom-gama', (980, 565, 1285, 705)), 'nau-victoria': ('v2-8-volta-mon', (125, 495, 475, 715)),
 'sac-clau': ('v2-8-volta-mon', (625, 505, 1005, 715)), 'tractat': ('v2-8-volta-mon', (1155, 505, 1505, 715)),
 'cofre-esqueixos': ('v2-9-avui', (35, 175, 315, 450)), 'plantacio': ('v2-9-avui', (1045, 175, 1355, 425)),
 'portacontenidors': ('v2-9-avui', (10, 590, 322, 805)), 'arbre-clau': ('v2-9-avui', (635, 265, 985, 525)),
 'safra-flor-gran': ('v2-9-avui', (1015, 555, 1305, 865)),
}
for n, (f, box) in V.items():
    im = Image.open(G + f + '.png').convert('RGB').crop(box)
    w, h = im.size; f2 = max(8, min(w, h) // 9)
    m = Image.new('L', (w, h), 0); ImageDraw.Draw(m).rounded_rectangle((f2, f2, w - f2, h - f2), f2 * 2, fill=255)
    m = m.filter(ImageFilter.GaussianBlur(f2 * 0.7))
    out = im.convert('RGBA'); out.putalpha(m)
    s = 2 if max(w, h) < 300 else 1
    if s > 1: out = out.resize((w * s, h * s), Image.LANCZOS)
    out.save(f'img/vinyetes/{n}.webp', quality=85, method=6)
# full de control
ims = [Image.open(f'img/vinyetes/{n}.webp') for n in V]
sheet = Image.new('RGB', (1800, 1400), (250, 244, 228)); x = y = 0; rh = 0
for n, im in zip(V, ims):
    t = im.copy(); t.thumbnail((290, 220))
    if x + t.width > 1800: x = 0; y += rh + 30; rh = 0
    sheet.paste(t, (x, y), t); ImageDraw.Draw(sheet).text((x + 4, y + t.height + 2), n, fill=(0, 0, 0))
    x += t.width + 10; rh = max(rh, t.height)
sheet.save(os.environ.get('SHEET', 'eines/_full.png'))
print('fet', len(V))
