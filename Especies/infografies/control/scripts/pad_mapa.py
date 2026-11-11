"""Encaixa un mapa en un marc més ample: fons de pergamí als costats i vores esvaïdes. Ús: pad_mapa.py mapa.png ratio_marc color_r,g,b sortida.png"""
import sys
from PIL import Image, ImageDraw
src, ratio, col, out = sys.argv[1], float(sys.argv[2]), tuple(int(v) for v in sys.argv[3].split(',')), sys.argv[4]
m = Image.open(src).convert('RGB'); H = m.height; W = round(H * ratio)
c = Image.new('RGB', (W, H), col)
mask = Image.new('L', m.size, 255); d = ImageDraw.Draw(mask); f = 50
for i in range(f): d.rectangle((i, i, m.width - 1 - i, m.height - 1 - i), outline=int(255 * i / f))
c.paste(m, ((W - m.width) // 2, 0), mask); c.save(out); print(out, c.size)
