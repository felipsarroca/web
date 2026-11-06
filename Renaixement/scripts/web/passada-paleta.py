#!/usr/bin/env python3
"""Passada de paleta: fosc museu → paper càlid als components clars.
Els components del VISOR (ViewerModal, AnotacionsOverlay, PanZoomImatge) NO es toquen:
allà el fosc #13191D es conserva per decisió de l'auditoria."""
import pathlib, sys

BASE = pathlib.Path("/home/z/my-project/src/components/renaissance")

# fitxers fosc del visor: intocables en aquesta passada
FOSC = {"ViewerModal.tsx", "AnotacionsOverlay.tsx", "PanZoomImatge.tsx", "TimelineView.tsx"}

# mapping fosc → paper (ordre = prioritat d'aplicació)
MAP = [
    # acció terracota
    ("text-[#c96f4a]", "text-accio"),
    ("hover:text-[#c96f4a]", "hover:text-accio"),
    ("group-hover:text-[#c96f4a]", "group-hover:text-accio"),
    ("bg-[#c96f4a]", "bg-accio"),
    ("hover:bg-[#d67e57]", "hover:bg-[var(--accio-fort)]"),
    ("border-[rgba(201,111,74,0.45)]", "border-accio/50"),
    ("border-[rgba(201,111,74,0.5)]", "border-accio/50"),
    ("hover:border-[rgba(201,111,74,0.45)]", "hover:border-accio/50"),
    ("hover:border-[rgba(201,111,74,0.5)]", "hover:border-accio/50"),
    ("border-[#c96f4a]", "border-accio"),
    ("bg-[rgba(201,111,74,0.12)]", "bg-[var(--terra-suau)]"),
    ("bg-[rgba(201,111,74,0.1)]", "bg-[var(--terra-suau)]"),
    ("bg-[rgba(201,111,74,0.28)]", "bg-[rgba(166,78,50,0.25)]"),
    ("bg-[rgba(201,111,74,0.15)]", "bg-[var(--terra-suau)]"),
    ("hover:bg-[rgba(201,111,74,0.2)]", "hover:bg-[rgba(166,78,50,0.18)]"),
    ("ring-[rgba(201,111,74,0.5)]", "ring-accio/50"),
    ("focus:ring-[rgba(201,111,74,0.5)]", "focus:ring-accio/50"),
    ("ring-[#c96f4a]", "ring-accio"),
    ("focus:ring-[#c96f4a]", "focus:ring-accio"),
    ("focus-visible:ring-[#c96f4a]", "focus-visible:ring-accio"),
    # concepte (daurat fosc)
    ("text-[#c9a84c]", "text-concepte"),
    ("bg-[#c9a84c]", "bg-concepte"),
    ("border-[rgba(201,168,76,0.45)]", "border-concepte/45"),
    ("border-[rgba(201,168,76,0.5)]", "border-concepte/50"),
    ("border-[#c9a84c]/60", "border-concepte/60"),
    ("border-[#c9a84c]/55", "border-concepte/55"),
    ("border-[#c9a84c]/50", "border-concepte/50"),
    ("border-[#c9a84c]/40", "border-concepte/40"),
    ("hover:bg-[#c9a84c]/10", "hover:bg-[var(--concepte-suau)]"),
    ("bg-[#c9a84c]/[0.06]", "bg-[var(--concepte-suau)]"),
    ("bg-[rgba(201,168,76,0.08)]", "bg-[var(--concepte-suau)]"),
    ("bg-[rgba(201,168,76,0.15)]", "bg-[var(--concepte-suau)]"),
    ("hover:bg-[rgba(201,168,76,0.16)]", "hover:bg-[rgba(128,101,39,0.16)]"),
    ("decoration-[#c9a84c]/50", "decoration-concepte/50"),
    ("decoration-[#c9a84c]", "decoration-concepte"),
    # superfícies fosques
    ("bg-[#101216]/95", "bg-paper/95"),
    ("bg-[#101216]", "bg-paper-2"),
    ("bg-[#0d0f13]", "bg-paper-2"),
    ("bg-[#0c0e12]", "bg-paper-2"),
    ("bg-[#16191f]", "bg-card"),
    ("bg-[#22262f]", "bg-card"),
    ("bg-[#1a1d24]", "bg-card"),
    # textos sobre fosc → tinta sobre paper
    ("text-[#f2eee6]", "text-tinta"),
    ("text-[#d8d3c8]", "text-tinta-2"),
    ("text-[#cfd3d9]", "text-tinta"),
    ("text-[#a8adb8]", "text-tinta-2"),
    ("text-[#9aa1ab]", "text-tinta-2"),
    ("text-[#8a9199]", "text-tinta-2"),
    ("text-[#6f7a85]", "text-tinta-2"),
    # text dins de botons terracota (era #101216 sobre #c96f4a → blanc sobre accio)
    ("text-[#101216]", "text-white"),
    ("hover:text-ivori", "hover:text-tinta"),
    ("text-ivori", "text-tinta"),
    # hover blancs translúcids → tinta translúcida
    ("hover:bg-white/5", "hover:bg-tinta/5"),
    ("hover:bg-white/10", "hover:bg-tinta/10"),
    ("bg-white/5", "bg-tinta/5"),
    ("bg-white/10", "bg-tinta/10"),
    ("w-px h-5 bg-white/10", "w-px h-5 bg-tinta/10"),
    # ombres
    ("shadow-[0_8px_30px_rgba(0,0,0,0.45)]", "shadow-[0_8px_30px_rgba(37,44,45,0.12)]"),
    ("from-black/75", "from-[rgba(37,44,45,0.55)]"),
    ("decoration-[rgba(242,238,230,0.25)]", "decoration-[rgba(79,91,92,0.4)]"),
]

aplicacions = {}
for f in sorted(BASE.glob("*.tsx")):
    if f.name in FOSC:
        continue
    src = f.read_text(encoding="utf-8")
    n = 0
    for vell, nou in MAP:
        if vell in src:
            n += src.count(vell)
            src = src.replace(vell, nou)
    if n:
        f.write_text(src, encoding="utf-8")
        aplicacions[f.name] = n

for k, v in sorted(aplicacions.items()):
    print(f"  {k}: {v} substitucions")
print(f"Total: {sum(aplicacions.values())} substitucions en {len(aplicacions)} fitxers")
