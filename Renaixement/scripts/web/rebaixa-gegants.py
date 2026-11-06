#!/usr/bin/env python3
"""Rebaixa els 4 màsters que han fallat amb l'original (fitxers gegants):
baixa un THUMB de Commons a 2048px via weserv (el redimensionament el fa el
servidor de Commons; weserv només fa de proxy dels bytes resultants)."""
import hashlib
import json
import pathlib
import subprocess
import time
import urllib.parse

ARREL = pathlib.Path("/home/z/my-project")
MASTERS = ARREL / "assets/masters"
imatges = json.loads((ARREL / "src/data/imatges.json").read_text(encoding="utf-8"))

PENDENTS = {
    "fontainebleau": ("Chateau of Fontainebleau Court of Cheval Blanc (1579).jpg", 2048),
    "gioconda": (imatges["gioconda"]["fitxer"], 2048),
    "home-turbant": (imatges["home-turbant"]["fitxer"], 2048),
    "torre-babel": (imatges["torre-babel"]["fitxer"], 2048),
}

def url_thumb(fitxer: str, w: int) -> str:
    nom = fitxer.replace(" ", "_")
    h = hashlib.md5(nom.encode("utf-8")).hexdigest()
    q = urllib.parse.quote(nom)
    # Els TIFF/PNG conserven extensió al thumb; els JPG no en posen cap de nova
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{w}px-{q}"

def baixa(slug, fitxer, w, intents=0):
    desti = MASTERS / f"{slug}.jpg"
    weserv = f"https://images.weserv.nl/?url={urllib.parse.quote(url_thumb(fitxer, w), safe='')}&output=jpg"
    r = subprocess.run(["curl", "-sL", "--max-time", "150", "-o", str(desti), "-A", "ElRenaixementWeb/1.0 (educational)", weserv], capture_output=True)
    if r.returncode == 0 and desti.exists() and desti.stat().st_size > 20000 and desti.read_bytes()[:3] == b"\xff\xd8\xff":
        return True
    desti.unlink(missing_ok=True)
    if intents < 2:
        time.sleep(5)
        return baixa(slug, fitxer, w, intents + 1)
    return False

for slug, (fitxer, w) in PENDENTS.items():
    ok = baixa(slug, fitxer, w)
    tam = (MASTERS / f"{slug}.jpg").stat().st_size if (MASTERS / f"{slug}.jpg").exists() else 0
    print(f"{slug}: {'OK' if ok else 'ERROR'} ({tam} bytes) · {fitxer}")
    time.sleep(1.5)
