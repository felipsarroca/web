# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Generador 3D procedural (Blender 5.3 CLI) — rigor museogràfic i PBR:
Water Frame de Richard Arkwright (c. 1775, Science and Industry Museum, Manchester).

Inclou:
  - Bastidor vertical tipus armari de roure anglès fosc amb muntants mortasats, tirants de ferro
    colat i reblons de llautó sobre sòcol hidràulic de pedra de fàbrica
  - Rastellera superior amb 4 grosses bobines de metxa de cotó cardat i ulls guia de llautó
  - Capçal d'estirament amb 3 parells de corrons (acer estriat inferior + cuir superior),
    3 contrapesos cilíndrics de ferro colat penjant i tren lateral d'engranatges 1× / 1.6× / 3.2×
  - Pont frontal inferior amb 4 aletes metàl·liques giratòries en U invertida i 4 bobines de fil
    sobre barra elevadora mòbil de vaivé (copping rail)
  - Transmissió hidràulica inferior: politja motriu + corretja de fàbrica, parell cònic cap a
    l'eix rei, gran tambor de fusta i 4 cordes sense fi cap a les torteres dels fusos
  - 4 fils continus des de la metxa -> corrons d'estirament -> ull d'aleta -> bobina

Ús:
  blender -b -P assets/blender/water_3d.py
  blender -b -P assets/blender/water_3d.py -- --glb-only
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
    make_cone,
    make_cyl,
    make_gear,
    make_mat,
    make_rod_between,
    make_sphere,
    make_spoked_wheel,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    setup_lighting,
)


def _make_flyer(name, mat_steel, mat_brass, parent=None):
    """Aleta en U invertida d'Arkwright: braços buits que guien el fil fins a la bobina."""
    fl = add_empty(name, (0.0, 0.0, 0.0), parent=parent)
    # Coll superior d'entrada del fil
    make_cyl(f"{name}_Coll", 0.014, 0.052, (0.0, 0.0, 0.025), mat_brass, verts=14, parent=fl)
    # Espatlla horitzontal superior
    make_box(f"{name}_Espatlla", (0.118, 0.018, 0.016), (0.0, 0.0, -0.004), mat_steel, parent=fl, bevel=0.003)
    # Dos braços verticals descendents fins a la base de la bobina
    for sx in (-0.052, 0.052):
        make_cyl(f"{name}_Brac_{sx}", 0.0065, 0.215, (sx, 0.0, -0.115), mat_steel, verts=10, parent=fl, bevel=0.0)
        make_sphere(f"{name}_UllBrac_{sx}", 0.0095, (sx, 0.0, -0.215), mat_brass, parent=fl)
    return fl


def _make_pillow(name, loc, mat_iron, mat_brass, parent=None):
    pb = add_empty(name, loc, parent=parent)
    make_box(f"{name}_Cos", (0.065, 0.085, 0.048), (0.0, 0.0, 0.0), mat_iron, parent=pb, bevel=0.004)
    make_cyl(f"{name}_Boixa", 0.022, 0.072, (0.0, 0.0, 0.0), mat_brass, rot=(0, math.pi / 2, 0), verts=14, parent=pb)
    return pb


def eval_water_state(p):
    """Moviment continu hidràulic: engranatges en progressió 1 : 1.6 : 3.2 + aletes ràpides + vaivé."""
    ang_drive = 2.0 * math.pi * p
    # 3 velocitats progressives dels corrons d'estirament
    ang_r1 = 1.0 * ang_drive
    ang_r2 = 1.6 * ang_drive
    ang_r3 = 3.2 * ang_drive
    # Aletes giren 8 voltes per cicle; bobines una mica més lentes per recollir el fil (torsió + bobinatge)
    ang_flyer = 8.0 * ang_drive
    ang_bobbin = 6.5 * ang_drive
    # Moviment alternatiu vertical (copping rail) perquè el fil es reparteixi al llarg de la bobina
    rail_dz = 0.042 * math.sin(2.0 * math.pi * p)
    return {
        "ang_drive": ang_drive,
        "ang_r1": ang_r1,
        "ang_r2": ang_r2,
        "ang_r3": ang_r3,
        "ang_flyer": ang_flyer,
        "ang_bobbin": ang_bobbin,
        "rail_dz": rail_dz,
    }


def build_water_scene(animate=False):
    clear_scene()

    pbr_wood = build_pbr_pair("WfRoure", "wood", 256, 256, bump_scale=2.2)
    pbr_wood_dark = build_pbr_pair("WfRoureFosc", "wood_dark", 224, 224, bump_scale=2.2)
    pbr_stone = build_pbr_pair("WfPedra", "stone", 256, 256, bump_scale=2.4)
    pbr_iron = build_pbr_pair("WfFerro", "castiron", 224, 224, bump_scale=2.0)
    pbr_brass = build_pbr_pair("WfLlauto", "brass", 192, 192, bump_scale=0.9)
    pbr_leather = build_pbr_pair("WfCuir", "leather", 192, 192, bump_scale=2.0)
    pbr_cotton = build_pbr_pair("WfCoto", "cotton_cloth", 224, 224, bump_scale=2.6)

    m_stone = make_mat("Pedra", "#aaa089", roughness=0.90, pbr_pair=pbr_stone, tex_scale=(1.1, 1.1), normal_strength=0.90)
    m_wood = make_mat("Roure", "#835228", roughness=0.56, pbr_pair=pbr_wood, normal_strength=0.75)
    m_wood_dark = make_mat("RoureFosc", "#482a14", roughness=0.65, pbr_pair=pbr_wood_dark, normal_strength=0.78)
    m_iron = make_mat("Ferro", "#2c3137", metallic=0.86, roughness=0.42, pbr_pair=pbr_iron, normal_strength=0.65)
    m_steel = make_mat("Acer", "#c0c8d0", metallic=0.94, roughness=0.18)
    m_brass = make_mat("Llauto", "#d6a53a", metallic=0.92, roughness=0.22, pbr_pair=pbr_brass, normal_strength=0.35)
    m_tin = make_mat("Estany", "#a7afb5", metallic=0.88, roughness=0.32)
    m_leather = make_mat("Cuir", "#58341c", roughness=0.68, pbr_pair=pbr_leather, normal_strength=0.80)
    m_cotton = make_mat("CotoCru", "#efe7d2", roughness=0.88, pbr_pair=pbr_cotton, tex_scale=(2.2, 2.2), normal_strength=0.75)
    m_yarn = make_mat("FilUrdim", "#e4d3aa", roughness=0.78)
    m_cord = make_mat("CordoCanem", "#9c8256", roughness=0.85)
    m_water = make_mat("AiguaCanal", "#4a86a8", roughness=0.14)

    add_shadow_floor(z=0.0, size=12.0)

    # Sòcol de pedra del molí hidràulic + canaló de pedra lateral enfonsat amb aigua corrent
    make_box("SocolMoli", (2.42, 1.98, 0.14), (-0.14, 0.0, 0.07), m_stone, bevel=0.018)
    make_box("CanaletaFossa", (0.46, 1.88, 0.03), (-1.04, 0.0, 0.135), m_water, bevel=0.004)
    for cx in (-1.27, -0.81):
        make_box(f"MuretCanal_{cx}", (0.06, 1.88, 0.07), (cx, 0.0, 0.165), m_stone, bevel=0.006)

    # --- 1. BASTIDOR VERTICAL TIPUS ARMARI DE ROURE FOSC ---
    # 4 pilars de cantonada: X in (-0.54, +0.54), Y in (-0.42, +0.42), Z=0.14..1.72
    g_frame = add_empty("Bastidor")
    for sx in (-0.54, 0.54):
        for sy in (-0.42, 0.42):
            make_box(f"Pilar_{sx}_{sy}", (0.095, 0.095, 1.58), (sx, sy, 0.93), m_wood_dark, parent=g_frame, bevel=0.008)
            make_box(f"Sabata_{sx}_{sy}", (0.135, 0.135, 0.036), (sx, sy, 0.158), m_iron, parent=g_frame, bevel=0.004)
        # Travessers laterals (desplaçats en X per zero Z-fighting)
        make_box(f"TravLatBaix_{sx}", (0.074, 0.75, 0.082), (sx, 0.0, 0.25), m_wood, parent=g_frame)
        make_box(f"TravLatMig_{sx}", (0.074, 0.75, 0.082), (sx, 0.0, 0.86), m_wood, parent=g_frame)
        make_box(f"TravLatAlt_{sx}", (0.074, 0.75, 0.082), (sx, 0.0, 1.32), m_wood, parent=g_frame)
        make_box(f"Escaire_{sx}", (0.080, 0.15, 0.14), (sx, -0.34, 1.24), m_iron, parent=g_frame, bevel=0.003)

    # Travessers frontals i posteriors (deixen lliure la zona visual frontal de les aletes i corrons!)
    for sy in (-0.42, 0.42):
        make_box(f"BigaBaix_{sy}", (0.99, 0.074, 0.082), (0.0, sy, 0.23), m_wood, parent=g_frame)
    make_box("BigaAltPost", (0.99, 0.074, 0.082), (0.0, 0.42, 1.32), m_wood, parent=g_frame)
    make_box("BigaAltDavant", (0.99, 0.068, 0.064), (0.0, -0.42, 1.27), m_wood, parent=g_frame)
    make_box("BigaPontMigDavant", (0.99, 0.056, 0.048), (0.0, -0.27, 0.90), m_wood_dark, parent=g_frame)
    make_box("BigaPontBaixDavant", (0.99, 0.058, 0.052), (0.0, -0.27, 0.49), m_wood_dark, parent=g_frame)
    # Taula d'estirament lleugerament inclinada cap al davant (Z~1.34..1.42)
    make_box("BancCorrons", (1.02, 0.42, 0.044), (0.0, 0.04, 1.36), m_wood, rot=(0.14, 0.0, 0.0), parent=g_frame, bevel=0.004)

    # --- 2. RASTELLERA SUPERIOR DE 4 BOBINES DE METXA ---
    xs_sp = (-0.36, -0.12, 0.12, 0.36)
    g_creel = add_empty("RastelleraMetxa", (0.0, 0.0, 0.0), parent=g_frame)
    for sx in (-0.54, 0.54):
        make_box(f"BracRast_{sx}", (0.068, 0.075, 0.36), (sx, 0.24, 1.66), m_wood_dark, parent=g_creel, bevel=0.004)
    make_box("BarraSupRast", (1.16, 0.068, 0.055), (0.0, 0.24, 1.82), m_wood, parent=g_creel, bevel=0.004)
    make_box("BarraInfRast", (1.16, 0.068, 0.050), (0.0, 0.24, 1.54), m_wood, parent=g_creel, bevel=0.004)

    for i, x in enumerate(xs_sp):
        make_cyl(f"EixMetxa_{i}", 0.011, 0.28, (x, 0.24, 1.68), m_steel, verts=12, parent=g_creel, bevel=0.0)
        make_cyl(f"BobinaMetxa_{i}", 0.068, 0.18, (x, 0.24, 1.68), m_cotton, verts=22, parent=g_creel)
        for sz in (1.585, 1.775):
            make_cyl(f"ValonaMetxa_{i}_{sz}", 0.076, 0.014, (x, 0.24, sz), m_wood_dark, verts=20, parent=g_creel)
        make_sphere(f"GuiaMetxa_{i}", 0.012, (x, 0.18, 1.49), m_brass, parent=g_creel)

    # --- 3. TREN DE 3 PARELLS DE CORRONS D'ESTIRAMENT + CONTRAPESOS + ENGRANATGES ---
    g_draft = add_empty("CorronsEstirament")
    roller_locs = [
        (0.16, 1.43),   # Parell 1 posterior (1x)
        (0.02, 1.41),   # Parell 2 central (1.6x)
        (-0.12, 1.39),  # Parell 3 anterior ràpid (3.2x)
    ]
    roller_groups = []
    side_gears = []
    gear_radii = (0.052, 0.042, 0.032)
    gear_teeth = (18, 14, 11)

    for idx, (ry, rz) in enumerate(roller_locs):
        # Corró inferior d'acer estriat + corró superior de cuir
        r_bot = add_empty(f"CorroInf_{idx}", (0.0, ry, rz), parent=g_draft)
        make_cyl(f"EixCorroInf_{idx}", 0.017, 1.16, (0.02, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), verts=18, parent=r_bot)
        for x in xs_sp:
            make_cyl(f"EstriaCorro_{idx}_{x}", 0.022, 0.058, (x, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), verts=18, parent=r_bot)

        r_top = add_empty(f"CorroSup_{idx}", (0.0, ry, rz + 0.042), parent=g_draft)
        make_cyl(f"EixCorroSup_{idx}", 0.014, 1.04, (0.0, 0.0, 0.0), m_iron, rot=(0, math.pi / 2, 0), verts=14, parent=r_top)
        for x in xs_sp:
            make_cyl(f"CuirCorro_{idx}_{x}", 0.023, 0.056, (x, 0.0, 0.0), m_leather, rot=(0, math.pi / 2, 0), verts=18, parent=r_top)
        roller_groups.append((r_bot, r_top))

        # Engranatge lateral dret (en progressió 1x / 1.6x / 3.2x)
        g_side = make_gear(
            f"EngrCorro_{idx}",
            gear_radii[idx],
            0.024,
            gear_teeth[idx],
            (0.59, ry, rz),
            m_brass if idx != 1 else m_iron,
            mat_hub=m_iron,
            axis="X",
            parent=g_draft,
        )
        side_gears.append(g_side)

    # Selles i 3 contrapesos cilíndrics de ferro colat penjant sota els corrons d'estirament
    for wx in (-0.24, 0.0, 0.24):
        make_rod_between(f"GanxoPes_{wx}", (wx, 0.02, 1.46), (wx, 0.02, 1.12), 0.007, m_iron, verts=8, parent=g_draft)
        make_cyl(f"Contrapes_{wx}", 0.046, 0.14, (wx, 0.02, 1.05), m_iron, verts=16, parent=g_draft)

    # ULLS GUIA FRONTALS (entre els corrons i les 4 aletes)
    make_box("BarraUllsGuia", (1.00, 0.038, 0.026), (0.0, -0.27, 1.24), m_wood_dark, parent=g_frame, bevel=0.003)
    for i, x in enumerate(xs_sp):
        make_sphere(f"UllGuiaAleta_{i}", 0.011, (x, -0.27, 1.225), m_brass, parent=g_frame)

    # --- 4. 4 FUSOS FRONTALS AMB ALETES EN U, BOBINES I PONT DE VAIVÉ ---
    g_spindles = add_empty("PontAletes")
    y_sp = -0.27
    # Pont mòbil de vaivé (copping rail) que puja i baixa les bobines dins les aletes
    g_rail = add_empty("PontVaive", (0.0, y_sp, 0.62), parent=g_spindles)
    make_box("TauloVaive", (1.02, 0.095, 0.032), (0.0, 0.0, 0.0), m_wood, parent=g_rail, bevel=0.004)
    for sx in (-0.48, 0.48):
        make_cyl(f"GuiaVaive_{sx}", 0.011, 0.36, (sx, y_sp, 0.68), m_steel, verts=10, parent=g_spindles, bevel=0.0)

    flyers = []
    bobbins = []
    spindle_whorls = []
    # L'eix vertical de cada fus va des de Z=0.48 fins a Z=0.98; l'aleta s'acobla al cim (Z=0.98)
    for i, x in enumerate(xs_sp):
        make_cyl(f"CoixinetFusInf_{i}", 0.016, 0.024, (x, y_sp, 0.515), m_brass, verts=14, parent=g_spindles)
        make_cyl(f"CoixinetFusMig_{i}", 0.016, 0.024, (x, y_sp, 0.88), m_brass, verts=14, parent=g_spindles)

        fl_rot = add_empty(f"AletaRot_{i}", (x, y_sp, 0.98), parent=g_spindles)
        make_cyl(f"EixFus_{i}", 0.0075, 0.50, (0.0, 0.0, -0.25), m_steel, verts=12, parent=fl_rot, bevel=0.0)
        make_cyl(f"TorteraFus_{i}", 0.034, 0.024, (0.0, 0.0, -0.43), m_brass, verts=18, parent=fl_rot)
        _make_flyer(f"Aleta_{i}", m_steel, m_brass, parent=fl_rot)
        flyers.append(fl_rot)

        bob_rot = add_empty(f"BobinaRot_{i}", (x, 0.0, 0.016), parent=g_rail)
        make_cyl(f"BobinaNucli_{i}", 0.016, 0.16, (0.0, 0.0, 0.08), m_wood_dark, verts=14, parent=bob_rot)
        make_cyl(f"BobinaFil_{i}", 0.032, 0.128, (0.0, 0.0, 0.08), m_yarn, verts=18, parent=bob_rot)
        for bz in (0.008, 0.152):
            make_cyl(f"ValonaBob_{i}_{bz}", 0.038, 0.012, (0.0, 0.0, bz), m_wood, verts=18, parent=bob_rot)
        bobbins.append(bob_rot)

    # --- 5. TRANSMISSIÓ HIDRÀULICA INFERIOR (RODA D'AIGUA EXTERIOR + TAMBOR + CORRETGES) ---
    g_drive = add_empty("TransmissioHidraulica")
    # Eix motriu d'entrada des de l'esquerra (sobre la canaleta de pedra) fins al parell cònic central
    g_water_shaft = add_empty("EixAigua", (-0.68, 0.0, 0.38), parent=g_drive)
    make_cyl("BarraAigua", 0.024, 1.06, (0.21, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), verts=18, parent=g_water_shaft)
    # Roda hidràulica de pales amb 8 àleps ben visibles sobre la canaleta d'aigua
    make_spoked_wheel("PolitjaHidraulica", 0.25, 0.095, 8, (-0.36, 0.0, 0.0), m_wood_dark, mat_hub=m_iron, axis="X", parent=g_water_shaft)
    for k in range(12):
        ang_p = 2.0 * math.pi * k / 12.0
        make_box(f"PalaAigua_{k}", (0.115, 0.018, 0.075), (-0.36, 0.275 * math.cos(ang_p), 0.275 * math.sin(ang_p)), m_wood, rot=(ang_p, 0, 0), parent=g_water_shaft, bevel=0.002)
    # Politja plana de cuir d'entrada al bastidor
    make_cyl("PolitjaEmbragatge", 0.135, 0.072, (0.04, 0.0, 0.0), m_brass, rot=(0, math.pi / 2, 0), verts=26, parent=g_water_shaft)
    make_gear("PinyoConicH", 0.082, 0.032, 16, (0.68, 0.0, 0.0), m_iron, mat_hub=m_brass, axis="X", parent=g_water_shaft)
    _make_pillow("CoixinetAigua", (-0.54, 0.0, 0.38), m_iron, m_brass, parent=g_drive)
    _make_pillow("CoixinetCanalExt", (-1.18, 0.0, 0.38), m_iron, m_brass, parent=g_drive)
    make_box("PilastraCanalExt", (0.09, 0.14, 0.22), (-1.18, 0.0, 0.25), m_stone, parent=g_drive, bevel=0.004)

    # Corretja plana vertical cap a l'embarrat hidràulic del molí
    make_rod_between("CorretjaMoliA", (-0.64, -0.125, 0.34), (-0.64, -0.125, 1.38), 0.015, m_leather, verts=8, parent=g_drive)
    make_rod_between("CorretjaMoliB", (-0.64, 0.125, 0.34), (-0.64, 0.125, 1.38), 0.015, m_leather, verts=8, parent=g_drive)

    # Eix rei vertical central (Z=0.25..1.40) que mou tant el tambor dels fusos com el tren de corrons superior
    g_king_shaft = add_empty("EixReiVertical", (0.0, 0.12, 0.34), parent=g_drive)
    make_cyl("BarraEixRei", 0.022, 1.18, (0.0, 0.0, 0.52), m_steel, verts=16, parent=g_king_shaft, bevel=0.0)
    make_gear("CoronaConicaV", 0.095, 0.030, 18, (0.0, 0.0, 0.04), m_brass, mat_hub=m_iron, axis="Z", parent=g_king_shaft)
    # Gran tambor vertical d'estany/fusta (Z=0.55..0.72) del qual surten els 4 cordons cap a les torteres
    make_cyl("TamboMotorFusos", 0.145, 0.14, (0.0, 0.0, 0.21), m_tin, verts=28, parent=g_king_shaft)
    # Transmissió superior fins al tren lateral d'engranatges dels corrons
    make_gear("PinyoSuperiorRei", 0.068, 0.026, 14, (0.0, 0.0, 1.05), m_brass, mat_hub=m_iron, axis="Z", parent=g_king_shaft)

    # Eix horitzontal superior de reenviament cap als engranatges laterals dels corrons
    g_top_shaft = add_empty("EixReenviamentSup", (0.0, 0.16, 1.39), parent=g_drive)
    make_cyl("BarraReenvSup", 0.016, 0.66, (0.30, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), verts=14, parent=g_top_shaft)
    make_gear("PinyoReenvSup", 0.044, 0.022, 12, (0.59, 0.0, 0.0), m_iron, mat_hub=m_brass, axis="X", parent=g_top_shaft)

    # 4 cordes sense fi entre el tambor central (0, 0.12, 0.55) i cada tortera dels fusos (x, -0.27, 0.55)
    for i, x in enumerate(xs_sp):
        make_rod_between(f"CordillaFusL_{i}", (-0.08 + i * 0.05, 0.12, 0.56), (x - 0.025, y_sp, 0.55), 0.0038, m_cord, verts=6, parent=g_drive)
        make_rod_between(f"CordillaFusR_{i}", (-0.08 + i * 0.05, 0.12, 0.53), (x + 0.025, y_sp, 0.55), 0.0038, m_cord, verts=6, parent=g_drive)

    # --- 6. 4 FILS CONTINUS (METXA -> CORRONS -> ULL GUIA -> ALETA) ---
    g_fils = add_empty("FilsCotons")
    for i, x in enumerate(xs_sp):
        # Tram gruixut de metxa: bobina superior -> parell 1 de corrons -> parell 3
        make_rod_between(f"MetxaFil_{i}", (x, 0.18, 1.49), (x, 0.16, 1.45), 0.0065, m_cotton, verts=8, parent=g_fils)
        make_rod_between(f"MetxaEstirada_{i}", (x, 0.16, 1.45), (x, -0.12, 1.41), 0.0045, m_cotton, verts=8, parent=g_fils)
        # Tram fi filat: sortida del 3r parell -> ull guia -> entrada de l'aleta giratòria
        make_rod_between(f"FilFinsUll_{i}", (x, -0.12, 1.41), (x, -0.27, 1.225), 0.0026, m_yarn, verts=8, parent=g_fils)
        make_rod_between(f"FilFinsAleta_{i}", (x, -0.27, 1.225), (x, -0.27, 1.01), 0.0024, m_yarn, verts=8, parent=g_fils)
        # Fil dins del braç de cada aleta (vinculat al rotor de l'aleta perquè giri amb ella!)
        make_rod_between(f"FilDinsAleta_{i}", (0.0, 0.0, 0.03), (-0.052, 0.0, -0.004), 0.0022, m_yarn, verts=6, parent=flyers[i])
        make_rod_between(f"FilBracAleta_{i}", (-0.052, 0.0, -0.004), (-0.052, 0.0, -0.215), 0.0022, m_yarn, verts=6, parent=flyers[i])
        make_rod_between(f"FilCapBobina_{i}", (-0.052, 0.0, -0.215), (-0.028, 0.0, -0.255), 0.0022, m_yarn, verts=6, parent=flyers[i])

    def apply_pose(p):
        st = eval_water_state(p)
        g_water_shaft.rotation_euler = (st["ang_drive"], 0.0, 0.0)
        g_king_shaft.rotation_euler = (0.0, 0.0, st["ang_drive"] * 1.4)
        g_top_shaft.rotation_euler = (st["ang_r1"], 0.0, 0.0)

        speeds = (st["ang_r1"], st["ang_r2"], st["ang_r3"])
        for idx, (r_bot, r_top) in enumerate(roller_groups):
            r_bot.rotation_euler = (speeds[idx], 0.0, 0.0)
            r_top.rotation_euler = (-speeds[idx], 0.0, 0.0)
            side_gears[idx].rotation_euler = (speeds[idx], 0.0, 0.0)

        for fl in flyers:
            fl.rotation_euler = (0.0, 0.0, st["ang_flyer"])
        for bob in bobbins:
            bob.rotation_euler = (0.0, 0.0, st["ang_bobbin"])
        g_rail.location = (0.0, y_sp, 0.62 + st["rail_dz"])

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = (
            [g_water_shaft, g_king_shaft, g_top_shaft, g_rail]
            + [r for pair in roller_groups for r in pair]
            + side_gears
            + flyers
            + bobbins
        )
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.25)

    setup_lighting(cam_loc=(2.35, -3.15, 2.15), target=(-0.10, 0.02, 0.98), lens=37.0)

    anchors = {
        "metxa": (-0.12, 0.24, 1.68),
        "corrons": (0.12, 0.02, 1.45),
        "engranatges": (0.59, 0.02, 1.41),
        "aleta": (-0.12, -0.27, 0.88),
        "aigua": (-0.98, 0.0, 0.42),
        "bastidor": (0.54, -0.42, 1.15),
    }
    return anchors


def main():
    glb_only = "--glb-only" in sys.argv
    if not glb_only:
        anc = build_water_scene(animate=False)
        render_image(os.path.join(OUT_DIR, "water-muntada.png"), res_x=1200, res_y=760, samples=32)
        pts = project_anchors(anc)
        render_closeup(
            os.path.join(OUT_DIR, "water-detall.png"),
            cam_loc=(1.35, -1.35, 1.42),
            target=(0.10, -0.10, 1.05),
            lens=46.0,
            samples=28,
        )

    anc_glb = build_water_scene(animate=True)
    export_glb_and_meta(
        "water",
        "water.glb",
        anc_glb,
        extra_meta={"muntada_pct": pts} if not glb_only else None,
    )


if __name__ == "__main__":
    main()
