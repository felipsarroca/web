"""Genera js/mapes-dades.js: contorns de terra (Natural Earth, domini públic) projectats per als mapes SVG de la web."""
import json, math
from shapely.geometry import shape, box
from shapely.ops import unary_union
land = [shape(f['geometry']) for f in json.load(open('infografies/obres/ne_land.geojson', encoding='utf-8'))['features']]
VISTES = {
  'indic': dict(lon0=5, lon1=135, lat0=-15, lat1=50, W=1000, tol=0.12),
  'atlantic': dict(lon0=-95, lon1=85, lat0=-45, lat1=62, W=1000, tol=0.18),
  'mon': dict(lon0=-180, lon1=180, lat0=-58, lat1=72, W=1200, tol=0.3),
}
out = {}
for k, v in VISTES.items():
    kx = math.cos(math.radians((v['lat0'] + v['lat1']) / 2))
    H = round(v['W'] * (v['lat1'] - v['lat0']) / ((v['lon1'] - v['lon0']) * kx))
    W = v['W']
    clip = box(v['lon0'] - 1, v['lat0'] - 1, v['lon1'] + 1, v['lat1'] + 1)
    P = lambda lon, lat: ((lon - v['lon0']) / (v['lon1'] - v['lon0']) * W, (v['lat1'] - lat) / (v['lat1'] - v['lat0']) * H)
    d = []
    for g in land:
        g = g.intersection(clip)
        if g.is_empty: continue
        for p in ([g] if g.geom_type == 'Polygon' else [q for q in getattr(g, 'geoms', []) if q.geom_type == 'Polygon']):
            if p.area < 0.08: continue
            p = p.simplify(v['tol'], preserve_topology=True)
            pts = [P(*c) for c in p.exterior.coords]
            d.append('M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + 'Z')
    out[k] = dict(lon0=v['lon0'], lon1=v['lon1'], lat0=v['lat0'], lat1=v['lat1'], W=W, H=H, d=''.join(d))
    print(k, W, H, len(out[k]['d']))
open('js/mapes-dades.js', 'w', encoding='utf-8').write('/* Contorns: Natural Earth (domini públic). Generat amb eines/mapa_dades.py */\nwindow.MAPES=' + json.dumps(out, separators=(',', ':')) + ';\n')
