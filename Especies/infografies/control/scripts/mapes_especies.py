"""Mapes verificats (Natural Earth, domini públic) per a les infografies 4 i 7.
Ús (des de la carpeta infografies): python control/scripts/mapes_especies.py 4 W H  |  7 W H
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from mapgen import Map, fb, fi

RED = (178, 40, 40); BLUE = (30, 70, 140); GREEN = (40, 110, 60); OCHRE = (190, 120, 20); BROWN = (120, 70, 30)


def mapa4(W, H):
    m = Map(W, H, 70, 17, 136 * 0.956 * H / W)
    s = W / 1050
    # Moluques i Banda -> Malaca
    m.route([(127.4, 0.6), (126.5, -2.2), (122, -4.6), (114, -5.0), (107, -4.2), (105.6, -1.5), (104.2, 1.2), (102.6, 2.0)], RED, w=7 * s, head=24 * s)
    m.route([(129.9, -4.6), (126, -5.6), (122, -4.9)], RED, w=7 * s, head=1)
    # Malaca -> Calicut (pel sud de Ceilan)
    m.route([(101.5, 2.9), (98.6, 4.6), (94.5, 6.3), (87, 5.6), (81.2, 5.4), (77.6, 7.4), (75.6, 10.6)], RED, w=7 * s, head=24 * s)
    # Calicut -> Aden -> mar Roja -> Suez
    m.route([(75.2, 11.5), (68, 12.6), (58, 13.4), (50, 12.4), (45.5, 12.4), (43.4, 12.7), (41.2, 15.6), (38.6, 20.0), (36.4, 23.8), (34.4, 27.2), (32.8, 29.3)], RED, w=7 * s, head=24 * s)
    # Suez -> Caire -> Alexandria (terra, caravana)
    m.route([(32.5, 29.9), (31.3, 30.0), (30.0, 31.0)], BROWN, w=6 * s, head=20 * s, dash=True)
    # Alexandria -> Venècia
    m.route([(29.6, 31.6), (25.5, 33.9), (21.0, 36.2), (19.2, 39.3), (17.0, 41.4), (14.5, 43.6), (12.6, 45.1)], RED, w=7 * s, head=24 * s)
    # Calicut -> Ormuz -> Bàssora (golf Pèrsic)
    m.route([(75.0, 12.2), (69, 17.5), (62.5, 23.0), (58.5, 24.8), (56.7, 26.3), (54.0, 26.8), (51.5, 27.9), (49.6, 29.3), (48.6, 29.8)], OCHRE, w=7 * s, head=24 * s)
    # Bàssora -> Alep -> Beirut (caravana)
    m.route([(47.8, 30.6), (43.5, 33.6), (40.0, 35.3), (37.2, 36.2), (35.6, 34.0)], BROWN, w=6 * s, head=20 * s, dash=True)
    pts = [
        (127.4, 0.8, "Moluques\n(clau)", 0, -52, 'mm'), (129.9, -4.5, "Banda (nou moscada)", -14, 34, 'rm'),
        (102.25, 2.2, "Malaca", -14, 26, 'rm'), (79.9, 6.9, "Ceilan (canyella)", -16, 22, 'rm'),
        (75.8, 11.25, "Calicut (pebre)", 16, -18, 'lm'), (45.0, 12.8, "Aden", 0, 30, 'mm'),
        (56.3, 27.1, "Ormuz", 16, -12, 'lm'), (31.25, 30.05, "El Caire", 12, 24, 'lm'),
        (29.9, 31.2, "Alexandria", -14, 0, 'rm'), (35.5, 33.9, "Beirut", 14, -22, 'lm'),
        (12.3, 45.4, "Venècia", 14, -8, 'lm'),
    ]
    for lon, lat, n, dx, dy, an in pts:
        m.dot(lon, lat, n, (150, 30, 30), size=int(30 * s), dx=dx * s, dy=dy * s, anchor=an, r=9 * s)
    m.label(78, -12, "Oceà Índic", int(38 * s), (40, 70, 110), italic=True)
    m.label(62, 16, "mar d'Aràbia", int(26 * s), (40, 70, 110), italic=True)
    # llegenda
    x, y = 30 * s, H - 150 * s
    m.d.rounded_rectangle((x, y, x + 470 * s, y + 132 * s), 14 * s, fill=(252, 246, 230, 235), outline=(120, 90, 50), width=2)
    for i, (col, dash, t) in enumerate([(RED, False, "Ruta del mar Roig"), (OCHRE, False, "Ruta del golf Pèrsic"), (BROWN, True, "Tram per terra (caravanes)")]):
        yy = y + 30 * s + i * 38 * s
        if dash:
            for k in range(0, 70, 18): m.d.line((x + 20 * s + k * s, yy, x + 30 * s + k * s, yy), fill=col, width=int(6 * s))
        else:
            m.d.line((x + 20 * s, yy, x + 90 * s, yy), fill=col, width=int(7 * s))
        m.d.text((x + 110 * s, yy), t, font=fb(int(25 * s)), fill=(40, 30, 20), anchor='lm')
    m.credit('Esquema de les rutes principals · Base: Natural Earth (domini públic)')
    return m.im


def mapa7(W, H):
    m = Map(W, H, 3, 5, 172 * 0.996 * H / W)
    s = W / 820
    # Vasco da Gama 1497-1499
    m.route([(-9.4, 38.5), (-15.8, 27.5), (-23.0, 16.5), (-27, 2), (-27, -15), (-18, -30), (2, -35.5), (17.5, -35.2), (24, -35.2), (33.5, -27.5),
             (40.8, -15.5), (40.6, -3.3), (50, 2.5), (63, 8.5), (75.3, 11.2)], RED, w=8 * s, head=28 * s)
    # Colom 1492
    m.route([(-7.2, 36.9), (-16.0, 28.0), (-30, 27.3), (-45, 26.3), (-60, 25.0), (-73.8, 24.1)], BLUE, w=8 * s, head=28 * s)
    pts = [(-9.1, 38.7, "Lisboa", 14, -16, 'lm'), (-6.9, 37.2, "Palos", 14, 16, 'lm'), (-15.5, 28.1, "Canàries", -10, 26, 'rm'),
           (18.5, -34.4, "Cap de Bona Esperança", 16, 22, 'lm'), (40.1, -3.2, "Malindi", 14, 0, 'lm'), (75.8, 11.25, "Calicut", -12, -30, 'rm'),
           (-74.5, 24.0, "Guanahaní (Antilles)", -6, 34, 'lm')]
    for lon, lat, n, dx, dy, an in pts:
        m.dot(lon, lat, n, (150, 30, 30), size=int(28 * s), dx=dx * s, dy=dy * s, anchor=an, r=9 * s)
    m.label(-35, 33.5, "Colom, 1492", int(34 * s), BLUE)
    m.label(-38, -22, "Vasco da Gama\n1497-1499", int(34 * s), RED)
    m.label(-38, 5, "Oceà Atlàntic", int(30 * s), (40, 70, 110), italic=True)
    m.label(66, -18, "Oceà Índic", int(30 * s), (40, 70, 110), italic=True)
    m.label(-48, 45, "Colom creia que era a prop\nde Cipango i de l'Índia", int(24 * s), BLUE, italic=True)
    m.credit()
    return m.im


def mapa8(W, H):
    m = Map(W, H, 0, -6, 360 * H / W)
    s = W / 1150
    GOLD = (150, 60, 20)
    a = [(-6.6, 36.6), (-15.6, 27.6), (-24, 12), (-33, -6), (-40, -21), (-47, -27.5), (-56, -37), (-64, -44), (-66.5, -50.5), (-68.5, -52.6),
         (-72.5, -53.6), (-76.5, -51), (-80, -40), (-85, -28), (-110, -18), (-150, -2), (-179.9, 8)]
    b = [(179.9, 8.2), (160, 12), (145.2, 13.2), (133, 11.5), (125.0, 10.2), (124.0, 7.0), (125.6, 3.5), (127.2, 0.9), (126.5, -3.5),
         (124.5, -8.8), (118, -13), (100, -20), (80, -28), (55, -34.5), (35, -37.5), (19, -36.2), (10, -28), (0, -10), (-12, 0),
         (-22, 8), (-25.5, 15.6), (-25, 25), (-18, 33.5), (-11, 36.5), (-6.9, 36.9)]
    m.route(a[:6], GOLD, w=7 * s, head=26 * s)
    m.route(a[4:], GOLD, w=7 * s, head=1)
    m.route(b, GOLD, w=7 * s, head=26 * s)
    pts = [(-6.35, 36.8, "Sanlúcar", 14, 16, 'lm'), (-43.2, -22.9, "Rio de Janeiro", -14, 0, 'rm'), (-70.5, -53.3, "Estret de Magalhães", 18, -16, 'lm'),
           (144.8, 13.4, "Guam", 0, -24, 'mm'), (123.9, 10.3, "Mactan (Cebu): mor Magalhães", -14, -22, 'rm'), (127.4, 0.7, "Tidore (clau)", 0, 36, 'mm'),
           (18.5, -34.4, "Cap de Bona Esperança", 18, 22, 'lm'), (-23.5, 15.0, "Cap Verd", -14, 18, 'rm')]
    for lon, lat, n, dx, dy, an in pts:
        m.dot(lon, lat, n, (150, 30, 30), size=int(26 * s), dx=dx * s, dy=dy * s, anchor=an, r=8 * s)
    m.label(-130, -36, "Oceà Pacífic\n(3 mesos sense tocar terra)", int(26 * s), (40, 70, 110), italic=True)
    m.label(-16, -30, "Atlàntic", int(26 * s), (40, 70, 110), italic=True)
    m.label(72, -20, "Índic", int(26 * s), (40, 70, 110), italic=True)
    m.label(-120, 30, "1519-1522", int(34 * s), GOLD)
    m.credit()
    return m.im


if __name__ == '__main__':
    n, W, H = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    im = {'4': mapa4, '7': mapa7, '8': mapa8}[n](W, H)
    out = f'obres/mapa{n}.png'
    im.save(out); print(out, im.size)
