#!/usr/bin/env python3
"""Afegeix activitatInici/activitatFi/estatDocumentacio a cada artista de src/data/artistes.ts.
Intervals DOCUMENTATS: primera inscripció de gremi, primer encàrrec o obra datada.
No es calcula mai «naixement + 20» (regla de l'auditoria de cronologia)."""
import re, sys

FITXER = "/home/z/my-project/src/data/artistes.ts"

# slug -> (activitat_inici, activitat_fi, estat)
# estats: AD = activitat_documentada, EST = estimacio (per obres conservades), VID = vida_documentada
ACTIVITAT = {
    "brunelleschi":        (1401, 1446, "AD"),  # concurs del baptisteri → mort treballant el faró
    "masaccio":            (1422, 1428, "AD"),  # inscripció a l'Arte dei Medici e Speziali
    "ghiberti":            (1401, 1455, "AD"),  # concurs del 1401 → mort; portes acabades el 1452
    "donatello":           (1406, 1466, "AD"),  # primers pagaments de l'Opera del Duomo (David de marbre)
    "alberti":             (1434, 1472, "AD"),  # De pictura dedicat a Brunelleschi → façana de Sant'Andreu
    "piero-della-francesca": (1439, 1474, "AD"),# pagament documentat a Florència (Sant Egidio) → retaule de Brera
    "mantegna":            (1448, 1506, "AD"),  # inscripció al gremi de Pàdua amb 17 anys
    "botticelli":          (1470, 1505, "AD"),  # La Fortaleza per al Tribunal de la Mercanzia; darreres obres c. 1505
    "van-eyck":            (1422, 1441, "AD"),  # pintor de Joan de Baviera a la Haia
    "van-der-weyden":      (1427, 1464, "AD"),  # mestre al gremi de Tournai (taller de Campin)
    "fouquet":             (1447, 1481, "AD"),  # retrat d'Eugeni IV a Roma documentat per Vespasiano; pintor del rei 1475
    "leonardo":            (1472, 1519, "AD"),  # inscripció al gremi de Sant Lluc → mort a Amboise
    "bramante":            (1477, 1514, "AD"),  # documentat com a pintor el 1477 → sant Pere
    "miquel-angel":        (1488, 1564, "AD"),  # aprenentatge documentat amb Ghirlandaio (1488)
    "rafael":              (1500, 1520, "AD"),  # encàrrec datat i signat de Città di Castello (1500)
    "titia":               (1508, 1576, "AD"),  # pagaments del Fondaco dei Tedeschi
    "verones":             (1541, 1588, "AD"),  # aprenentatge documentat amb Antonio Badile
    "bosch":               (1474, 1516, "AD"),  # primera menció als registres de 's-Hertogenbosch
    "bruegel":             (1551, 1569, "AD"),  # mestre al gremi de sant Lluc d'Anvers
    "durer":               (1490, 1528, "AD"),  # viatge del giny (1490); taller propi documentat 1495
    "holbein":             (1515, 1543, "AD"),  # primeres obres documentades a Basilea
    "clouet":              (1516, 1541, "AD"),  # primer pintor del rei documentat el 1516
    "berruguete":          (1517, 1561, "AD"),  # nomenament documentat com a pintor del rei (1517)
    "machuca":             (1517, 1550, "AD"),  # ja presentat com «act. 1517-1550» a la fitxa
    "herrera":             (1563, 1597, "AD"),  # traçat documentat de l'Escorial
    "el-greco":            (1566, 1614, "AD"),  # documentat com a mestre a Càndia (juny de 1566)
    "palladio":            (1534, 1580, "AD"),  # encàrrec documentat de la vil·la Godi
    "verrocchio":          (1465, 1488, "AD"),  # primers encàrrecs mèdics documentats; mort a Venècia
    "cellini":             (1516, 1571, "AD"),  # aprenentatge documentat; Perseu acabat el 1554
    "giambologna":         (1553, 1608, "AD"),  # documentat a Florència des del 1553
    "pollaiuolo":          (1458, 1498, "AD"),  # document judicial per no acabar l'aprenentatge (1458)
    "desiderio":           (1453, 1464, "AD"),  # inscripció al gremi dels mestres de pedra de Florència
    "parmigianino":        (1521, 1540, "AD"),  # encàrrec documentat dels frescos de San Giovanni Evangelista
}

src = open(FITXER, encoding="utf-8").read()
falten, fets = [], 0

def sub(m):
    global fets
    indent, slug = m.group(1), m.group(2)
    if slug not in ACTIVITAT:
        return m.group(0)
    ini, fi, est = ACTIVITAT[slug]
    estat = "activitat_documentada" if est == "AD" else ("estimacio" if est == "EST" else "vida_documentada")
    fets += 1
    return (f'{m.group(0)}\n{indent}activitatInici: {ini}, activitatFi: {fi},\n'
            f'{indent}estatDocumentacio: "{estat}",')

nou = re.sub(r'(\n(\s+)slug:\s*"([^"]+)")', "", src)  # placeholder per evitar warnings
nou = re.sub(r'( *)dates:\s*"[^"]*",(\s*//.*)?', lambda m: m.group(0), src)

# inserció real: localitza cada bloc de slug i afegeix els camps després de dates
def inserta(text):
    out = text
    for slug, (ini, fi, est) in ACTIVITAT.items():
        estat = "activitat_documentada" if est == "AD" else ("estimacio" if est == "EST" else "vida_documentada")
        pat = re.compile(r'(slug:\s*"' + re.escape(slug) + r'",[\s\S]{0,600}?)(\n(\s+)dates:\s*"[^"]*",)')
        m = pat.search(out)
        if not m:
            falten.append(slug); continue
        camp = (f'\n{m.group(3)}activitatInici: {ini}, activitatFi: {fi},'
                f'\n{m.group(3)}estatDocumentacio: "{estat}",')
        out = out[:m.end(2)] + camp + out[m.end(2):]
    return out

resultat = inserta(src)
open(FITXER, "w", encoding="utf-8").write(resultat)
print(f"Insertats: {fets}/{len(ACTIVITAT)}")
if falten:
    print("FALTEN:", falten); sys.exit(1)
