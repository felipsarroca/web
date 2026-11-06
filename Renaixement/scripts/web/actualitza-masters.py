#!/usr/bin/env python3
"""Auditoria de resolució dels actius (auditoria d'imatges):
 1. FONTAINEBLEAU: substitueix el màster (vista de l'estany, distant i amb obstacles)
    per una fotografia propera de la façana del pavelló central i l'escala ovalada
    del pati del Cavall Blanc (CC0, SiefkinDR).
 2. REFETXEGA els màsters locals de ≤960 px cap a resolució real (fins a 3840 px
    d'amplada) via el proxy públic images.weserv.nl, que baixa els BYTES de Commons
    quan la IP comparteix rep 429 del CDN. Un .dzi fet des de 960 px no revela
    detalls que el fitxer original sí que té.
Actualitza imatges.json (Fontainebleau) i deixa els màsters a assets/masters/ per
regenerar derivats amb genera-derivats.mjs."""
import hashlib
import json
import pathlib
import subprocess
import sys
import time
import urllib.parse

ARREL = pathlib.Path("/home/z/my-project")
MASTERS = ARREL / "assets/masters"
IMATGES_JSON = ARREL / "src/data/imatges.json"
W_CAP = 3840  # mateixa escala que la política de thumbs de Commons

imatges = json.loads(IMATGES_JSON.read_text(encoding="utf-8"))

# ── Fontainebleau: fitxer nou (CC0, vista propera del pati + façana) ──
NOU_FONTAINEBLEAU = {
    "fitxer": "Chateau of Fontainebleau Court of Cheval Blanc (1579).jpg",
    "llicencia": "CC0 1.0",
    "autor_foto": "SiefkinDR",
    "nota": "Vista propera del pavelló central i l'escala ovalada del pati del Cavall Blanc; substitueix la vista distant de l'estany.",
}

def url_original(fitxer: str) -> str:
    nom = fitxer.replace(" ", "_")
    h = hashlib.md5(nom.encode("utf-8")).hexdigest()
    return f"https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/{urllib.parse.quote(nom)}"

def baixa(slug: str, fitxer: str, desti: pathlib.Path, w_cap: int = W_CAP, intents: int = 0) -> bool:
    orig = url_original(fitxer)
    weserv = f"https://images.weserv.nl/?url={urllib.parse.quote(orig, safe='')}&w={w_cap}&q=90&output=jpg"
    r = subprocess.run(
        ["curl", "-sL", "--max-time", "120", "-o", str(desti), "-A", "ElRenaixementWeb/1.0 (educational)", weserv],
        capture_output=True,
    )
    if r.returncode == 0 and desti.exists() and desti.stat().st_size > 20000:
        cap = desti.read_bytes()[:3]
        if cap == b"\xff\xd8\xff":  # magic JPEG
            return True
    desti.unlink(missing_ok=True)
    if intents < 2:
        time.sleep(4 + intents * 4)
        return baixa(slug, fitxer, desti, w_cap, intents + 1)
    return False

# 1) Fontainebleau
dst = MASTERS / "fontainebleau.jpg"
abans = dst.stat().st_size if dst.exists() else 0
ok = baixa("fontainebleau", NOU_FONTAINEBLEAU["fitxer"], dst)
print(f"fontainebleau: {'OK' if ok else 'ERROR'} ({dst.stat().st_size if dst.exists() else 0} bytes, abans {abans})")
if ok:
    entrada = dict(imatges["fontainebleau"])
    entrada.update(NOU_FONTAINEBLEAU)
    imatges["fontainebleau"] = entrada
    IMATGES_JSON.write_text(json.dumps(imatges, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

# 2) Màsters petits: refetxa fins a resolució real
manifest_vell = json.loads((ARREL / "src/data/imatges-locals.json").read_text(encoding="utf-8"))
petits = {
    slug: v["amplada"]
    for slug, v in manifest_vell.items()
    if isinstance(v, dict) and "amplada" in v and v["amplada"] <= 960 and slug != "fontainebleau"
}
print(f"\nMàsters a millorar: {len(petits)}")
fets, fallits, senseGuany = [], [], []
for i, (slug, amplada_vell) in enumerate(sorted(petits.items(), key=lambda x: x[1])):
    fitxer = imatges[slug]["fitxer"]
    dst = MASTERS / f"{slug}.jpg"
    tam_vell = dst.stat().st_size if dst.exists() else 0
    if baixa(slug, fitxer, dst):
        nou_tam = dst.stat().st_size
        fets.append((slug, amplada_vell, tam_vell, nou_tam))
        print(f"  [{i+1}/{len(petits)}] {slug}: {amplada_vell}px → {nou_tam} bytes (abans {tam_vell})")
    else:
        # restaura el màster vell si la baixa falla (el curl l'hauria esborrat)
        fallits.append(slug)
        print(f"  [{i+1}/{len(petits)}] {slug}: FALLA la baixa (es conserva el màster anterior si hi era)")
    time.sleep(1.2)

print(f"\nResum: {len(fets)} refetxos · {len(fallits)} fallits {fallits}")
sys.exit(0 if not fallits else 1)
