# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Generador 3D procedural (Blender 5.3 CLI) — rigor museogràfic i PBR:
Teler mecànic horitzontal d'Edmund Cartwright (millores de 1787–1790, gravat de Strickland).

Inclou:
  - Bastidor mixt de roure anglès amb front rebaixat i coixinets inferiors de ferro colat
  - Transmissió motriu exterior: corretja plana de cuir des de l'eix de fàbrica cap a les politges
    i gran volant d'inèrcia de ferro colat de 6 raigs
  - Eix principal amb doble manovella (2 voltes per cicle) que mou les dues bieles del batà
  - Reductor d'engranatges 2:1 (pinyó de llautó + roda de ferro) cap a l'eix de lleves
  - Lleves excèntriques inferiors que aixequen i baixen els dos lliços per alternar la calada
  - Lleves laterals que colpegen les dues espases impulsores (picking arms) sobre la barqueta
  - Batà basculant amb pinta metàl·lica de 38 pues, caixes laterals, trama vermella i plegadors

Ús:
  blender -b -P assets/blender/cartwright_3d.py
  blender -b -P assets/blender/cartwright_3d.py -- --glb-only
"""

import math
import os
import sys

import bpy

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
if THIS_DIR not in sys.path:
    sys.path.insert(0, THIS_DIR)

from pbr_comu import (
    OUT_DIR,
    add_empty,
    add_shadow_floor,
    build_pbr_pair,
    clear_scene,
    export_glb_and_meta,
    make_box,
    make_cam,
    make_cyl,
    make_gear,
    make_mat,
    make_rod_between,
    make_shuttle,
    make_sphere,
    make_spoked_wheel,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    setup_lighting,
)


def _clamp(v):
    return max(0.0, min(1.0, v))


def _ease(v):
    v = _clamp(v)
    return v * v * (3.0 - 2.0 * v)


def _seg(p, a, b):
    return _ease((p - a) / (b - a))


def _mix(a, b, q):
    return a + (b - a) * q


def eval_cartwright_state(p):
    """Cicle sincronitzat: 1 volta de l'eix de lleves = 2 voltes de l'eix principal / manovella (2:1)."""
    half = 0 if p < 0.5 else 1
    q = p * 2.0 - half
    sign = 1.0 if half == 0 else -1.0

    shed = _mix(-sign, sign, _seg(q, 0.00, 0.22))
    shuttle_x = _mix(-1.14 * sign, 1.14 * sign, _seg(q, 0.28, 0.56))
    beat = _seg(q, 0.62, 0.78) * (1.0 - _seg(q, 0.78, 0.96))

    kick_l = _seg(q, 0.24, 0.29) * (1.0 - _seg(q, 0.29, 0.38)) if half == 0 else 0.0
    kick_r = _seg(q, 0.24, 0.29) * (1.0 - _seg(q, 0.29, 0.38)) if half == 1 else 0.0

    ang_main = 4.0 * math.pi * p
    ang_cam = 2.0 * math.pi * p
    return {
        "shed": shed,
        "shuttle_x": shuttle_x,
        "beat": beat,
        "kick_l": kick_l,
        "kick_r": kick_r,
        "ang_main": ang_main,
        "ang_cam": ang_cam,
    }


def build_cartwright_scene(animate=False):
    clear_scene()

    pbr_wood = build_pbr_pair("CwRoure", "wood", 256, 256, bump_scale=2.2)
    pbr_wood_dark = build_pbr_pair("CwRoureFosc", "wood_dark", 224, 224, bump_scale=2.0)
    pbr_stone = build_pbr_pair("CwPedra", "stone", 256, 256, bump_scale=2.4)
    pbr_iron = build_pbr_pair("CwFerro", "castiron", 224, 224, bump_scale=2.0)
    pbr_brass = build_pbr_pair("CwLlauto", "brass", 192, 192, bump_scale=0.9)
    pbr_leather = build_pbr_pair("CwCuir", "leather", 192, 192, bump_scale=2.0)
    pbr_cloth = build_pbr_pair("CwTela", "cotton_cloth", 256, 256, bump_scale=2.4)

    m_stone = make_mat("Pedra", "#aea389", roughness=0.90, pbr_pair=pbr_stone, tex_scale=(1.1, 1.1), normal_strength=0.90)
    m_wood = make_mat("Roure", "#8c592d", roughness=0.58, pbr_pair=pbr_wood, tex_scale=(1.0, 1.0), normal_strength=0.75)
    m_wood_dark = make_mat("RoureFosc", "#563418", roughness=0.65, pbr_pair=pbr_wood_dark, tex_scale=(1.1, 1.1), normal_strength=0.75)
    m_iron = make_mat("Ferro", "#31363c", metallic=0.84, roughness=0.44, pbr_pair=pbr_iron, normal_strength=0.65)
    m_steel = make_mat("Acer", "#b8c0c8", metallic=0.92, roughness=0.22)
    m_brass = make_mat("Llauto", "#d4a43a", metallic=0.92, roughness=0.24, pbr_pair=pbr_brass, normal_strength=0.35)
    m_leather = make_mat("Cuir", "#58341c", roughness=0.70, pbr_pair=pbr_leather, normal_strength=0.80)
    m_cloth = make_mat("TelaCoto", "#e9dfc4", roughness=0.86, pbr_pair=pbr_cloth, tex_scale=(2.2, 2.2), normal_strength=0.70)
    m_warp = make_mat("OrditCru", "#e4d7b7", roughness=0.82)
    m_weft = make_mat("TramaVermella", "#b83a24", roughness=0.74)

    add_shadow_floor(z=0.0, size=14.0)

    # Sòcol del taller
    make_box("SocolTaller", (3.55, 2.35, 0.14), (0.15, 0.0, 0.07), m_stone, bevel=0.020)

    # --- 1. BASTIDOR REFORÇAT DE ROURE I COIXINETS DE FERRO COLAT ---
    g_frame = add_empty("Bastidor")
    # Pilars posteriors i mitjans alts (Z=0.14..1.88) i davanters rebaixats (Z=0.14..0.94), sense cares coplanars
    for sx in (-1.04, 1.04):
        make_box(f"PilarDarrere_{sx}", (0.11, 0.11, 1.74), (sx, 0.80, 1.01), m_wood_dark, parent=g_frame, bevel=0.009)
        make_box(f"PilarMig_{sx}", (0.10, 0.10, 1.74), (sx, -0.18, 1.01), m_wood_dark, parent=g_frame, bevel=0.009)
        make_box(f"PilarDavant_{sx}", (0.11, 0.11, 0.80), (sx, -0.80, 0.54), m_wood_dark, parent=g_frame, bevel=0.009)
        for py in (-0.80, -0.18, 0.80):
            make_box(f"Sabata_{sx}_{py}", (0.15, 0.15, 0.04), (sx, py, 0.16), m_iron, parent=g_frame, bevel=0.004)
        make_box(f"TravLatBaixDarr_{sx}", (0.082, 0.88, 0.085), (sx, 0.31, 0.25), m_wood, parent=g_frame)
        make_box(f"TravLatBaixDav_{sx}", (0.082, 0.52, 0.085), (sx, -0.49, 0.25), m_wood, parent=g_frame)
        make_box(f"TravLatMig_{sx}", (0.076, 1.50, 0.076), (sx, 0.0, 0.86), m_wood, parent=g_frame)
        make_box(f"TravLatSup_{sx}", (0.082, 0.88, 0.088), (sx, 0.31, 1.84), m_wood, parent=g_frame)
        # Coixinets de ferro colat sobre els travessers baixos alineats amb els dos eixos
        make_box(f"CoixinetPrinc_{sx}", (0.095, 0.11, 0.24), (sx, -0.34, 0.41), m_iron, parent=g_frame, bevel=0.005)
        make_box(f"CoixinetLleves_{sx}", (0.095, 0.11, 0.18), (sx, -0.096, 0.38), m_iron, parent=g_frame, bevel=0.005)

    make_box("BigaDarrereBaix", (1.97, 0.082, 0.085), (0.0, 0.80, 0.25), m_wood, parent=g_frame)
    make_box("BigaDarrereSup", (1.97, 0.088, 0.088), (0.0, 0.80, 1.84), m_wood, parent=g_frame)
    make_box("BigaLlicos", (1.97, 0.082, 0.082), (0.0, 0.32, 1.84), m_wood_dark, parent=g_frame)
    make_box("BigaPivotBata", (1.97, 0.085, 0.088), (0.0, -0.18, 1.84), m_wood_dark, parent=g_frame)
    make_box("BigaPitDavant", (1.97, 0.088, 0.082), (0.0, -0.80, 0.90), m_wood, parent=g_frame)
    make_box("BigaOrditDarrere", (1.97, 0.082, 0.076), (0.0, 0.80, 0.90), m_wood, parent=g_frame)

    # --- 2. TRANSMISSIÓ MOTRIU EXTERIOR (EIX DE FÀBRICA + CORRETJA + VOLANT) ---
    g_trans = add_empty("Transmissio")
    # Extensió dreta del bastidor per al volant d'inèrcia (amb marge sobre el sòcol!)
    make_box("PeuVolant", (0.46, 0.44, 0.11), (1.28, -0.34, 0.195), m_wood_dark, parent=g_trans)
    make_box("CoixinetExtern", (0.10, 0.13, 0.30), (1.42, -0.34, 0.40), m_iron, parent=g_trans, bevel=0.005)
    # Politja superior de l'embarrat general de la fàbrica
    make_box("SuportEmbarrat", (0.12, 0.12, 0.26), (1.28, -0.24, 1.98), m_iron, parent=g_trans)
    make_cyl("EixEmbarrat", 0.030, 0.44, (1.28, -0.24, 1.86), m_steel, rot=(0, math.pi / 2, 0), parent=g_trans)
    g_top_pulley = make_cyl("PolitjaFabrica", 0.135, 0.085, (1.26, -0.24, 1.86), m_wood, rot=(0, math.pi / 2, 0), verts=28, parent=g_trans)
    # Politja receptora doble sobre l'eix principal (Z=0.54)
    g_loom_pulley = make_cyl("PolitjaTeler", 0.115, 0.085, (1.26, -0.34, 0.54), m_brass, rot=(0, math.pi / 2, 0), verts=26, parent=g_trans)
    # Corretja plana de cuir tangent entre politja de fàbrica i politja del teler
    make_rod_between("CorretjaDavant", (1.26, -0.37, 1.85), (1.26, -0.45, 0.54), 0.014, m_leather, verts=8, parent=g_trans)
    make_rod_between("CorretjaDarrere", (1.26, -0.11, 1.85), (1.26, -0.23, 0.54), 0.014, m_leather, verts=8, parent=g_trans)
    # Gran volant d'inèrcia de ferro colat amb 6 raigs (0.54 - 0.36 = 0.18 > 0.14 sòcol!)
    g_flywheel = make_spoked_wheel("VolantInercia", 0.36, 0.048, 6, (1.42, -0.34, 0.54), m_iron, mat_hub=m_brass, axis="X", parent=g_trans)

    # --- 3. EIX PRINCIPAL AMB MANOVELLES + REDUCTOR 2:1 + EIX DE LLEVES ---
    g_eix = add_empty("EixILleves")
    # Eix principal (Y = -0.34, Z = 0.54) gira 2 voltes per cicle al voltant de l'eix X
    g_main_shaft = add_empty("EixPrincipal", (0.0, -0.34, 0.54), parent=g_eix)
    make_cyl("BarraEixPrinc", 0.026, 2.54, (0.20, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), verts=20, parent=g_main_shaft)
    make_gear("Pinyo2a1", 0.085, 0.042, 14, (1.14, 0.0, 0.0), m_brass, mat_hub=m_iron, axis="X", parent=g_main_shaft)
    for sx in (-0.88, 0.88):
        make_box(f"BracManovella_{sx}", (0.042, 0.048, 0.14), (sx, 0.0, -0.055), m_iron, parent=g_main_shaft, bevel=0.004)
        make_cyl(f"PernManovella_{sx}", 0.018, 0.068, (sx, 0.0, -0.11), m_brass, rot=(0, math.pi / 2, 0), verts=14, parent=g_main_shaft)

    # Eix de lleves (Y = -0.096, Z = 0.468) engranat 2:1 (dist = sqrt(0.244^2 + 0.072^2) = 0.254 = 0.085 + 0.169!)
    y_cam, z_cam = -0.096, 0.468
    g_cam_shaft = add_empty("EixLleves", (0.0, y_cam, z_cam), parent=g_eix)
    make_cyl("BarraEixLleves", 0.024, 2.38, (0.04, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), verts=18, parent=g_cam_shaft)
    make_gear("Roda2a1", 0.168, 0.042, 28, (1.14, 0.0, 0.0), m_iron, mat_hub=m_brass, axis="X", parent=g_cam_shaft)
    make_cam("LlevaLlic1", 0.055, 0.055, 0.045, (-0.18, 0.0, 0.0), m_brass, axis="X", rot_phase=0.0, parent=g_cam_shaft)
    make_cam("LlevaLlic2", 0.055, 0.055, 0.045, (0.18, 0.0, 0.0), m_brass, axis="X", rot_phase=math.pi, parent=g_cam_shaft)
    make_cam("LlevaImpulsEsq", 0.052, 0.065, 0.036, (-1.12, 0.0, 0.0), m_iron, axis="X", rot_phase=0.6, parent=g_cam_shaft)
    make_cam("LlevaImpulsDret", 0.052, 0.065, 0.036, (1.02, 0.0, 0.0), m_iron, axis="X", rot_phase=0.6 + math.pi, parent=g_cam_shaft)

    # --- 4. PLEGADOR D'ORDIT I CALADA ---
    g_ordit = add_empty("Ordit")
    make_cyl("PlegadorOrditNucli", 0.045, 2.14, (0.0, 0.72, 0.66), m_wood_dark, rot=(0, math.pi / 2, 0), parent=g_ordit)
    make_cyl("PlegadorOrditCoto", 0.125, 1.54, (0.0, 0.72, 0.66), m_cloth, rot=(0, math.pi / 2, 0), parent=g_ordit)
    make_gear("TrinquetOrdit", 0.125, 0.025, 18, (-0.92, 0.72, 0.66), m_iron, mat_hub=m_brass, axis="X", parent=g_ordit)
    make_cyl("RodetPosterior", 0.040, 1.78, (0.0, 0.76, 0.91), m_wood, rot=(0, math.pi / 2, 0), parent=g_ordit)

    def build_warp_group(name, y_pivot, z_pivot, y_end, x_offset):
        grp = add_empty(name, (0.0, y_pivot, z_pivot), parent=g_ordit)
        dy = y_end - y_pivot
        for i in range(13):
            x = -0.72 + i * 0.12 + x_offset
            make_rod_between(f"{name}_Fil_{i}", (x, 0.0, 0.0), (x, dy, 0.0), 0.0042, m_warp, verts=6, parent=grp)
        return grp

    g_ord_par_darr = build_warp_group("OrditParellDarr", 0.76, 0.91, 0.32, -0.03)
    g_ord_par_dav = build_warp_group("OrditParellDav", -0.42, 0.91, 0.32, -0.03)
    g_ord_imp_darr = build_warp_group("OrditImparellDarr", 0.76, 0.91, 0.32, 0.03)
    g_ord_imp_dav = build_warp_group("OrditImparellDav", -0.42, 0.91, 0.32, 0.03)

    # --- 5. LLIÇOS ACCIONATS PER LES LLEVES ---
    g_llicos = add_empty("Llicos")
    for px in (-0.42, 0.42):
        make_cyl(f"CorroLlic_{px}", 0.065, 0.055, (px, 0.32, 1.74), m_wood, rot=(0, math.pi / 2, 0), parent=g_llicos)
    for cx, cy in ((-0.18, -0.096), (0.18, -0.096)):
        make_rod_between(f"PalancaLleva_{cx}", (cx, -0.24, 0.42), (cx, 0.32, 0.44), 0.022, m_wood_dark, verts=8, parent=g_llicos)

    def build_heddle_frame(name, y_pos, x_off):
        hf = add_empty(name, (0.0, y_pos, 0.91), parent=g_llicos)
        make_box(f"{name}_BarSup", (1.62, 0.024, 0.035), (0.0, 0.0, 0.25), m_wood, parent=hf, bevel=0.003)
        make_box(f"{name}_BarInf", (1.62, 0.024, 0.035), (0.0, 0.0, -0.25), m_wood, parent=hf, bevel=0.003)
        for sx in (-0.79, 0.79):
            make_box(f"{name}_Costat_{sx}", (0.025, 0.024, 0.50), (sx, 0.0, 0.0), m_wood, parent=hf, bevel=0.003)
        make_cyl(f"{name}_TirantInf", 0.008, 0.24, (0.0, 0.0, -0.37), m_iron, verts=8, parent=hf, bevel=0.0)
        for k in range(13):
            kx = -0.72 + k * 0.12 + x_off
            make_cyl(f"{name}_Filferro_{k}", 0.0028, 0.48, (kx, 0.0, 0.0), m_steel, verts=6, parent=hf, bevel=0.0)
            make_sphere(f"{name}_Ullet_{k}", 0.0085, (kx, 0.0, 0.0), m_brass, segs=8, rings=6, parent=hf)
        return hf

    g_llic1 = build_heddle_frame("Llic1", 0.28, -0.03)
    g_llic2 = build_heddle_frame("Llic2", 0.36, 0.03)

    # --- 6. BATÀ BASCULANT, PINTA METÀL·LICA I DUES BIELES CAP A L'EIX PRINCIPAL ---
    g_bata = add_empty("Bata", (0.0, -0.18, 1.84))
    for sx in (-0.88, 0.88):
        make_box(f"EspasaBata_{sx}", (0.052, 0.062, 1.04), (sx, 0.0, -0.50), m_wood_dark, parent=g_bata, bevel=0.006)
        make_cyl(f"PernBataSup_{sx}", 0.022, 0.14, (sx, 0.0, 0.0), m_iron, rot=(0, math.pi / 2, 0), verts=12, parent=g_bata)
        make_cyl(f"PernBataInf_{sx}", 0.020, 0.12, (sx, -0.02, -0.96), m_brass, rot=(0, math.pi / 2, 0), verts=12, parent=g_bata)

    make_box("PistaBata", (2.82, 0.14, 0.048), (0.0, -0.02, -0.97), m_wood, parent=g_bata, bevel=0.006)
    make_box("PassamaPinta", (1.84, 0.052, 0.052), (0.0, 0.0, -0.70), m_wood, parent=g_bata, bevel=0.006)
    make_box("BasePinta", (1.72, 0.040, 0.030), (0.0, 0.0, -0.93), m_brass, parent=g_bata, bevel=0.003)
    for r in range(36):
        rx_pua = -0.80 + r * (1.60 / 35.0)
        make_box(f"PuaPinta_{r}", (0.005, 0.014, 0.21), (rx_pua, 0.0, -0.82), m_steel, parent=g_bata, bevel=0.0)

    for side_n, sx in (("Esq", -1.22), ("Dreta", 1.22)):
        make_box(f"CaixaDarr_{side_n}", (0.34, 0.022, 0.092), (sx, 0.045, -0.91), m_wood_dark, parent=g_bata)
        make_box(f"CaixaDav_{side_n}", (0.34, 0.020, 0.068), (sx, -0.085, -0.92), m_wood_dark, parent=g_bata)
        make_box(f"CaixaTapa_{side_n}", (0.024, 0.14, 0.092), (-1.39 if sx < 0 else 1.39, -0.02, -0.91), m_brass, parent=g_bata, bevel=0.003)

    # Bieles forjades d'acer (enllaçades entre el pern del batà i la manovella de l'eix principal)
    biela_objs = []
    for sx in (-0.88, 0.88):
        br = add_empty(f"Biela_{sx}", (sx, -0.34, 0.42))
        make_cyl(f"BielaBarra_{sx}", 0.018, 1.0, (0.0, 0.0, 0.50), m_steel, verts=12, parent=br, bevel=0.0)
        biela_objs.append((br, sx))

    # --- 7. IMPULSORS MECÀNICS LATERALS I LLANÇADORA ---
    g_imp_esq = add_empty("ImpulsorEsq", (-1.18, -0.10, 0.46))
    make_box("EspasaImpEsq", (0.036, 0.044, 0.52), (-0.06, 0.0, 0.22), m_wood_dark, parent=g_imp_esq, bevel=0.004)
    make_box("CapImpEsq", (0.08, 0.055, 0.055), (-0.02, 0.0, 0.45), m_leather, parent=g_imp_esq, bevel=0.004)

    g_imp_dret = add_empty("ImpulsorDret", (1.18, -0.10, 0.46))
    make_box("EspasaImpDret", (0.036, 0.044, 0.52), (0.06, 0.0, 0.22), m_wood_dark, parent=g_imp_dret, bevel=0.004)
    make_box("CapImpDret", (0.08, 0.055, 0.055), (0.02, 0.0, 0.45), m_leather, parent=g_imp_dret, bevel=0.004)

    g_llanc = make_shuttle("Llancadora", (-1.14, -0.02, -0.92), m_wood_dark, m_steel, m_weft, scale=1.0, parent=g_bata)
    g_trama_activa = make_box("TramaActiva", (1.44, 0.012, 0.012), (0.0, -0.02, -0.92), m_weft, parent=g_bata, bevel=0.0)

    # --- 8. TELA TEIXIDA I PLEGADOR FRONTAL ---
    g_tela = add_empty("Tela")
    make_box("TelaPlana", (1.52, 0.42, 0.016), (0.0, -0.61, 0.90), m_cloth, parent=g_tela, bevel=0.003)
    for ti in range(4):
        make_box(f"LlistaTrama_{ti}", (1.51, 0.014, 0.019), (0.0, -0.43 - ti * 0.052, 0.902), m_weft, parent=g_tela, bevel=0.0)
    make_box("TelaBaixada", (1.52, 0.016, 0.24), (0.0, -0.81, 0.78), m_cloth, rot=(0.24, 0, 0), parent=g_tela, bevel=0.002)
    make_cyl("PlegadorTelaNucli", 0.045, 2.14, (0.0, -0.70, 0.66), m_wood_dark, rot=(0, math.pi / 2, 0), parent=g_tela)
    make_cyl("PlegadorTelaCoto", 0.115, 1.54, (0.0, -0.70, 0.66), m_cloth, rot=(0, math.pi / 2, 0), parent=g_tela)
    make_gear("RodaTela", 0.115, 0.024, 16, (-0.92, -0.70, 0.66), m_brass, mat_hub=m_iron, axis="X", parent=g_tela)

    def apply_pose(p):
        st = eval_cartwright_state(p)
        # Tots els eixos transversals giren al voltant d'X!
        g_main_shaft.rotation_euler = (st["ang_main"], 0.0, 0.0)
        g_loom_pulley.rotation_euler = (st["ang_main"], 0.0, 0.0)
        g_flywheel.rotation_euler = (st["ang_main"], 0.0, 0.0)
        g_top_pulley.rotation_euler = (st["ang_main"] * 0.86, 0.0, 0.0)
        # Relació 2:1 exacta (en sentit invers per l'engranatge!)
        g_cam_shaft.rotation_euler = (-st["ang_cam"], 0.0, 0.0)

        # Batà oscil·la en sincronia amb la manovella
        rx_bata = 0.26 - 0.50 * st["beat"]
        g_bata.rotation_euler = (rx_bata, 0.0, 0.0)

        # Bieles connectant exactament la manovella giratòria (Y=-0.34, Z=0.54) amb el pern del batà
        c_ang = st["ang_main"]
        cy = -0.34 + 0.11 * math.sin(c_ang)
        cz = 0.54 - 0.11 * math.cos(c_ang)
        py_bata = -0.18 - 0.96 * math.sin(rx_bata) - 0.02 * math.cos(rx_bata)
        pz_bata = 1.84 - 0.96 * math.cos(rx_bata) + 0.02 * math.sin(rx_bata)
        dy_b = py_bata - cy
        dz_b = pz_bata - cz
        len_b = math.sqrt(dy_b * dy_b + dz_b * dz_b)
        ang_b = math.atan2(-dy_b, dz_b)
        for br, sx in biela_objs:
            br.location = (sx, cy, cz)
            br.rotation_euler = (ang_b, 0.0, 0.0)
            br.scale = (1.0, 1.0, len_b)

        # Lliços i calada
        dz_heddle = 0.095 * st["shed"]
        g_llic1.location = (0.0, 0.28, 0.91 + dz_heddle)
        g_llic2.location = (0.0, 0.36, 0.91 - dz_heddle)
        ang_par_darr = math.atan2(dz_heddle, 0.44)
        ang_par_dav = -math.atan2(dz_heddle, 0.74)
        g_ord_par_darr.rotation_euler = (-ang_par_darr, 0.0, 0.0)
        g_ord_par_dav.rotation_euler = (-ang_par_dav, 0.0, 0.0)
        g_ord_imp_darr.rotation_euler = (ang_par_darr, 0.0, 0.0)
        g_ord_imp_dav.rotation_euler = (ang_par_dav, 0.0, 0.0)

        # Impulsors mecànics i llançadora
        g_imp_esq.rotation_euler = (0.0, 0.34 * st["kick_l"], 0.0)
        g_imp_dret.rotation_euler = (0.0, -0.34 * st["kick_r"], 0.0)
        g_llanc.location = (st["shuttle_x"], -0.02, -0.92)
        vis_x = max(0.05, min(1.0, abs(st["shuttle_x"]) / 0.85))
        g_trama_activa.scale = (vis_x, 1.0, 1.0)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [
            g_main_shaft,
            g_loom_pulley,
            g_flywheel,
            g_top_pulley,
            g_cam_shaft,
            g_bata,
            g_llic1,
            g_llic2,
            g_ord_par_darr,
            g_ord_par_dav,
            g_ord_imp_darr,
            g_ord_imp_dav,
            g_imp_esq,
            g_imp_dret,
            g_llanc,
            g_trama_activa,
        ] + [b for b, _ in biela_objs]
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
                o.keyframe_insert(data_path="scale", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.20)

    setup_lighting(cam_loc=(3.05, -3.55, 2.25), target=(0.15, -0.05, 0.88), lens=44.0)

    anchors = {
        "transmissio": (1.42, -0.34, 0.82),
        "eix": (0.85, -0.18, 0.42),
        "llicos": (-0.20, 0.32, 1.18),
        "llancadora": (-0.15, 0.06, 0.90),
        "pinta": (0.50, 0.08, 1.05),
        "ordit": (-0.52, 0.60, 0.92),
        "tela": (-0.15, -0.60, 0.90),
        "bastidor": (-1.04, 0.80, 1.48),
    }
    return anchors


def main():
    glb_only = "--glb-only" in sys.argv
    if not glb_only:
        anc = build_cartwright_scene(animate=False)
        render_image(os.path.join(OUT_DIR, "cartwright-muntada.png"), res_x=1200, res_y=760, samples=32)
        pts = project_anchors(anc)
        render_closeup(
            os.path.join(OUT_DIR, "cartwright-detall.png"),
            cam_loc=(2.55, -2.05, 1.15),
            target=(0.75, -0.18, 0.56),
            lens=46.0,
            samples=28,
        )

    anc_glb = build_cartwright_scene(animate=True)
    export_glb_and_meta(
        "cartwright",
        "cartwright.glb",
        anc_glb,
        extra_meta={"muntada_pct": pts} if not glb_only else None,
    )


if __name__ == "__main__":
    main()
