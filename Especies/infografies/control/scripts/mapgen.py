"""Mapes físics verificats (Natural Earth 50m, domini públic), sense fronteres modernes."""
import json, math
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from shapely.geometry import shape, box
SEA = (196, 220, 230); LAND = (238, 226, 196); COAST = (110, 88, 60)
F = r"C:\Windows\Fonts"
K = 1.0
fb = lambda s: ImageFont.truetype(F + r"\palab.ttf", int(s * K))
fr = lambda s: ImageFont.truetype(F + r"\pala.ttf", int(s * K))
fi = lambda s: ImageFont.truetype(F + r"\palai.ttf", int(s * K))
_GEO = None
def geo():
    global _GEO
    if _GEO is None:
        _GEO = [shape(f['geometry']) for f in json.load(open('obres/ne_land.geojson', encoding='utf-8'))['features']]
    return _GEO
class Map:
    def __init__(self, W, H, clon, clat, latspan, proj='eq'):
        self.W, self.H = W, H
        self.kx = math.cos(math.radians(clat))
        self.lat0, self.lat1 = clat - latspan / 2, clat + latspan / 2
        lonspan = latspan * (W / H) / self.kx
        self.lon0, self.lon1 = clon - lonspan / 2, clon + lonspan / 2
        self.im = Image.new('RGB', (W, H), SEA)
        d = ImageDraw.Draw(self.im)
        clip = box(self.lon0 - 3, self.lat0 - 3, self.lon1 + 3, self.lat1 + 3)
        self.polys = []
        for g in geo():
            g = g.intersection(clip)
            if g.is_empty: continue
            for p in ([g] if g.geom_type == 'Polygon' else list(getattr(g, 'geoms', []))):
                if p.geom_type != 'Polygon': continue
                pts = [self.P(*c) for c in p.exterior.coords]
                self.polys.append(p)
                d.polygon(pts, fill=LAND)
                d.line(pts + [pts[0]], fill=COAST, width=3)
        self.im = self.im.filter(ImageFilter.SMOOTH)
        self.d = ImageDraw.Draw(self.im, 'RGBA')
    def P(self, lon, lat):
        return ((lon - self.lon0) / (self.lon1 - self.lon0) * self.W, (self.lat1 - lat) / (self.lat1 - self.lat0) * self.H)
    def fill_area(self, lonlat_poly, col, alpha=150):
        """Acoloreix la terra dins d'un polígon aproximat (lon,lat) — només per a regions històriques documentades."""
        from shapely.geometry import Polygon
        area = Polygon(lonlat_poly)
        lay = Image.new('RGBA', self.im.size, (0, 0, 0, 0)); ld = ImageDraw.Draw(lay)
        for p in self.polys:
            g = p.intersection(area)
            if g.is_empty: continue
            for q in ([g] if g.geom_type == 'Polygon' else list(getattr(g, 'geoms', []))):
                if q.geom_type != 'Polygon': continue
                ld.polygon([self.P(*c) for c in q.exterior.coords], fill=col + (alpha,))
        self.im.paste(lay, (0, 0), lay); self.d = ImageDraw.Draw(self.im, 'RGBA')
    def recoast(self):
        for p in self.polys:
            pts = [self.P(*c) for c in p.exterior.coords]
            self.d.line(pts + [pts[0]], fill=COAST, width=3)
    def text(self, xy, t, f, fill, anchor='mm', halo=(252, 246, 230), sw=5):
        self.d.multiline_text(xy, t, font=f, fill=fill, anchor=anchor, align='center', stroke_width=sw, stroke_fill=halo, spacing=2)
    def dot(self, lon, lat, name, col, size=30, dx=16, dy=0, anchor='lm', r=10):
        x, y = self.P(lon, lat); r, dx, dy = r * K, dx * K, dy * K
        self.d.ellipse((x - r, y - r, x + r, y + r), fill=col, outline=(255, 255, 255), width=3)
        if name: self.text((x + dx, y + dy), name, fb(size), (40, 30, 20), anchor, sw=4)
    def label(self, lon, lat, t, size, col, italic=False, bold=True):
        self.text(self.P(lon, lat), t, (fi if italic else (fb if bold else fr))(size), col)
    def arrow(self, a, b, col, w=8, bend=0.15, label=None, lsize=28, lpos=0.5, loff=(0, -22), dash=False, head=28, trim=(0.02, 0.04), both=False):
        w, head, loff = int(w * K), head * K, (loff[0] * K, loff[1] * K)
        (x0, y0), (x1, y1) = self.P(*a), self.P(*b)
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2
        L = math.hypot(x1 - x0, y1 - y0); nx, ny = -(y1 - y0) / L, (x1 - x0) / L
        cx, cy = mx + nx * L * bend, my + ny * L * bend
        bez = lambda t: ((1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t ** 2 * y1)
        n = 80; ts = [trim[0] + (1 - trim[0] - trim[1]) * i / n for i in range(n + 1)]
        pts = [bez(t) for t in ts]
        if dash:
            for i in range(0, n, 6):
                seg = pts[i:i + 4]; self.d.line(seg, fill=(255, 255, 255), width=w + 5); self.d.line(seg, fill=col, width=w)
        else:
            self.d.line(pts, fill=(255, 255, 255), width=w + 6, joint='curve'); self.d.line(pts, fill=col, width=w, joint='curve')
        def tip(p_end, p_prev):
            ang = math.atan2(p_end[1] - p_prev[1], p_end[0] - p_prev[0]); bx, by = p_end
            tri = [(bx + head * math.cos(ang), by + head * math.sin(ang)), (bx + head * 0.8 * math.cos(ang + 2.5), by + head * 0.8 * math.sin(ang + 2.5)), (bx + head * 0.8 * math.cos(ang - 2.5), by + head * 0.8 * math.sin(ang - 2.5))]
            self.d.polygon(tri, fill=col, outline=(255, 255, 255))
        tip(pts[-1], pts[-4])
        if both: tip(pts[0], pts[3])
        if label:
            lx, ly = bez(lpos); self.text((lx + loff[0], ly + loff[1]), label, fb(lsize), col, sw=5)
    def credit(self, t='Base: Natural Earth (domini públic) · costes actuals, sense fronteres'):
        self.text((self.W - 14, self.H - 10), t, fi(17), (70, 60, 50), anchor='rd', sw=3)

def _chaikin(pts, n=4):
    for _ in range(n):
        q = [pts[0]]
        for a, b in zip(pts[:-1], pts[1:]):
            q += [(0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]), (0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1])]
        q.append(pts[-1]); pts = q
    return pts
def route(self, lonlats, col, w=8, head=28, dash=False):
    """Ruta suavitzada per punts (lon, lat) amb fletxa final."""
    w, head = int(w * K), head * K
    pts = _chaikin([self.P(*p) for p in lonlats])
    if dash:
        for i in range(0, len(pts) - 1, 4):
            seg = pts[i:i + 3]; self.d.line(seg, fill=(255, 255, 255), width=w + 5); self.d.line(seg, fill=col, width=w)
    else:
        self.d.line(pts, fill=(255, 255, 255), width=w + 6, joint='curve'); self.d.line(pts, fill=col, width=w, joint='curve')
    (ax, ay), (bx, by) = pts[-4], pts[-1]
    ang = math.atan2(by - ay, bx - ax)
    tri = [(bx + head * math.cos(ang), by + head * math.sin(ang)), (bx + head * 0.8 * math.cos(ang + 2.5), by + head * 0.8 * math.sin(ang + 2.5)), (bx + head * 0.8 * math.cos(ang - 2.5), by + head * 0.8 * math.sin(ang - 2.5))]
    self.d.polygon(tri, fill=col, outline=(255, 255, 255))
Map.route = route
