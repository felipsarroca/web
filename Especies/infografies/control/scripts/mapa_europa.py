"""Mapa físic verificat (Natural Earth 50m, domini públic) de l'expansió del Renaixement.
Sense fronteres modernes: només costes, punts de ciutats reals i fletxes des d'Itàlia."""
import json, math, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from shapely.geometry import shape, box

W, H = int(sys.argv[2]), int(sys.argv[3])
kx = math.cos(math.radians(46))
CLON, CLAT, LATSPAN = 5.5, 46.3, 20.5
LAT0, LAT1 = CLAT - LATSPAN / 2, CLAT + LATSPAN / 2
LONSPAN = LATSPAN * (W / H) / kx
LON0, LON1 = CLON - LONSPAN / 2, CLON + LONSPAN / 2
def P(lon, lat):
    return (lon - LON0) / (LON1 - LON0) * W, (LAT1 - lat) / (LAT1 - LAT0) * H

sea = (196, 220, 228); land = (238, 222, 186); coast = (120, 95, 60)
im = Image.new('RGB', (W, H), sea)
d = ImageDraw.Draw(im)
clip = box(LON0 - 2, LAT0 - 2, LON1 + 2, LAT1 + 2)
geo = json.load(open('obres/ne_land.geojson', encoding='utf-8'))
for f in geo['features']:
    g = shape(f['geometry']).intersection(clip)
    if g.is_empty: continue
    polys = [g] if g.geom_type == 'Polygon' else list(getattr(g, 'geoms', []))
    for p in polys:
        if p.geom_type != 'Polygon': continue
        pts = [P(*c) for c in p.exterior.coords]
        d.polygon(pts, fill=land, outline=coast)
        d.line(pts + [pts[0]], fill=coast, width=3)
im = im.filter(ImageFilter.SMOOTH)
d = ImageDraw.Draw(im)
F = r"C:\Windows\Fonts"
fb = lambda s: ImageFont.truetype(F + r"\georgiab.ttf", s)
fi = lambda s: ImageFont.truetype(F + r"\georgiai.ttf", s)
# Itàlia ressaltada (halo) i ciutats reals
cities = {'Florència': (11.25, 43.77), 'Roma': (12.50, 41.90), 'Venècia': (12.33, 45.44),
          'Nuremberg': (11.08, 49.45), 'Wittenberg': (12.65, 51.87), 'Anvers': (4.40, 51.22),
          'Bruges': (3.22, 51.21), 'Chambord': (1.52, 47.62), 'París': (2.35, 48.86)}
def dot(name, col, r=9, dx=14, dy=-6, anchor='lm', size=24):
    x, y = P(*cities[name])
    d.ellipse((x - r, y - r, x + r, y + r), fill=col, outline=(255, 255, 255), width=3)
    d.text((x + dx, y + dy), name, font=fb(size), fill=(40, 30, 20), anchor=anchor, stroke_width=3, stroke_fill=(250, 244, 228))
# fletxes des de Florència
def arrow(a, b, col, w=9):
    (x0, y0), (x1, y1) = P(*a), P(*b)
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    nx, ny = -(y1 - y0), (x1 - x0); L = math.hypot(nx, ny); nx, ny = nx / L, ny / L
    cx, cy = mx + nx * 40, my + ny * 40
    pts = [((1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t ** 2 * y1) for t in [i / 40 for i in range(41)]]
    pts = pts[3:-4]
    d.line(pts, fill=(255, 255, 255), width=w + 6, joint='curve'); d.line(pts, fill=col, width=w, joint='curve')
    (ax, ay), (bx, by) = pts[-3], pts[-1]
    ang = math.atan2(by - ay, bx - ax); s = 26
    tri = [(bx + s * math.cos(ang), by + s * math.sin(ang)), (bx + s * math.cos(ang + 2.5), by + s * math.sin(ang + 2.5)), (bx + s * math.cos(ang - 2.5), by + s * math.sin(ang - 2.5))]
    d.polygon(tri, fill=col, outline=(255, 255, 255))
FLO = cities['Florència']
arrow(FLO, cities['Nuremberg'], (190, 60, 40))
arrow(FLO, cities['Chambord'], (40, 90, 170))
arrow(FLO, cities['Anvers'], (120, 60, 140))
arrow(FLO, (-3.7, 40.4), (200, 140, 30))
for n in ['Florència', 'Roma', 'Venècia']:
    dot(n, (60, 130, 60))
dot('Nuremberg', (190, 60, 40)); dot('Wittenberg', (190, 60, 40))
dot('Anvers', (120, 60, 140), dx=14, dy=-4, anchor='lm')
dot('Chambord', (40, 90, 170), dx=-14, dy=10, anchor='rm'); dot('París', (40, 90, 170), dx=-14, anchor='rm')
def region(txt, lon, lat, col, size=34):
    x, y = P(lon, lat)
    d.text((x, y), txt, font=fb(size), fill=col, anchor='mm', stroke_width=5, stroke_fill=(252, 246, 230))
region('ITÀLIA', 13.6, 43.0, (40, 110, 50), 36)
region('FLANDES', 1.6, 50.75, (110, 50, 130), 30)
region('FRANÇA', 2.0, 46.2, (30, 70, 150))
region('ALEMANYA', 10.2, 50.6, (170, 50, 35))
region('PENÍNSULA IBÈRICA', -4.0, 39.8, (170, 110, 20), 30)
d.text((W - 16, H - 12), "Base: Natural Earth (domini públic) · mapa físic actual, sense fronteres", font=fi(17), fill=(70, 60, 50), anchor='rd')
im.save(sys.argv[1])
print('ok', im.size)
