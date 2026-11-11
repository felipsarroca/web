"""Omple un marc magenta amb una obra o un mapa i, si cal, hi afegeix un peu.
Ús: python cbox.py entrada.png obra.png sortida.png [--idx N] [--focus fx fy] [--fit] [--cap "línia 1|línia 2"]
--idx: índex del marc (per defecte, el més gran); --fit: encaixa sense retallar (amb fons de l'obra).
Per als mapes per codi és millor generar-los ja a la proporció del marc (la imprimeix aquest script) que fer servir --fit."""
import os, sys, argparse; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from comp import *
ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('art'); ap.add_argument('out')
ap.add_argument('--idx', type=int); ap.add_argument('--focus', nargs=2, type=float, default=[0.5, 0.5])
ap.add_argument('--fit', action='store_true'); ap.add_argument('--cap')
a = ap.parse_args()
im = load_slide(a.src); bs = magenta_regions(im)
b = bs[a.idx] if a.idx is not None else max(bs, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))
art = Image.open(a.art).convert('RGB')
bw, bh = b[2] - b[0], b[3] - b[1]
if a.fit:
    r = bw / bh
    if art.width / art.height < r:
        W = int(art.height * r); c = Image.new('RGB', (W, art.height), art.getpixel((3, 3))); c.paste(art, ((W - art.width) // 2, 0))
    else:
        H = int(art.width / r); c = Image.new('RGB', (art.width, H), art.getpixel((3, 3))); c.paste(art, (0, (H - art.height) // 2))
    art = c
print(a.out, 'boxes', len(bs), 'box', b, 'ratio art', round(art.width / art.height, 2), 'box', round(bw / bh, 2))
paste_in_box(im, art, b, focus=tuple(a.focus))
if a.cap:
    lines = a.cap.split('|'); d = ImageDraw.Draw(im, 'RGBA')
    sz = max(15, min(22, int(bw / 34))); fs = [font(sz, True, False)] + [font(sz - 3, False, True)] * (len(lines) - 1)
    w = max(d.textlength(t, font=f) for t, f in zip(lines, fs))
    while w > bw - 30 and sz > 12:
        sz -= 1; fs = [font(sz, True, False)] + [font(sz - 3, False, True)] * (len(lines) - 1); w = max(d.textlength(t, font=f) for t, f in zip(lines, fs))
    hh = int(sz * 1.3 * len(lines) + 12)
    x1, y1 = b[2] - 8, b[3] - 8
    d.rounded_rectangle((x1 - w - 22, y1 - hh, x1, y1), 8, fill=(250, 243, 226, 230), outline=(150, 120, 70, 255), width=2)
    y = y1 - hh + 7
    for t, f in zip(lines, fs):
        d.text((x1 - 11, y), t, font=f, fill=(40, 30, 20), anchor='ra'); y += int(sz * 1.3)
print('magenta', leftover_magenta(im)); im.save(a.out)
