# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Forn de pudelat de reverber i tren laminador (Henry Cort, 1784):
fogar de carbó separat per muret, volta refractària de reverber en tall frontal,
sola amb bany de ferro incandescent, barra llarga del pudelador remenant la bola pastosa,
xemeneia alta i tren de laminatge amb dos grans corrons acanalats allargant un perfil roent.
"""

import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy

from pbr_comu import (
    add_empty,
    add_shadow_floor,
    build_pbr_pair,
    clear_scene,
    export_glb_and_meta,
    make_box,
    make_cyl,
    make_gear,
    make_mat,
    make_rod_between,
    make_sphere,
    make_torus,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    setup_lighting,
)


def build_pudelat(animate=True):
    clear_scene()

    p_stone = build_pbr_pair("StonePud", "stone", bump_scale=2.2)
    p_brick = build_pbr_pair("BrickPud", "brick", bump_scale=2.2)
    p_iron = build_pbr_pair("IronPud", "castiron", bump_scale=2.0)

    m_stone = make_mat("PedraSocol", "#a89d88", metallic=0.0, roughness=0.88, pbr_pair=p_stone)
    m_brick = make_mat("MaoForn", "#9d4630", metallic=0.0, roughness=0.86, pbr_pair=p_brick, tex_scale=(2.0, 2.0))
    m_refract = make_mat("RefractariClar", "#c79a6b", metallic=0.0, roughness=0.84, pbr_pair=p_brick)
    m_iron = make_mat("FerroFosa", "#272b30", metallic=0.85, roughness=0.45, pbr_pair=p_iron)
    m_steel = make_mat("AcerCorrons", "#c2cad2", metallic=0.95, roughness=0.22)
    m_coal = make_mat("CarboFogar", "#17191c", metallic=0.05, roughness=0.90)
    m_flame = make_mat("FlamaReverber", "#ff7722", metallic=0.0, roughness=0.4, alpha=0.68, emission_hex="#ff5a10", emission_strength=2.6)
    m_molten = make_mat("FerroPudelat", "#ff681e", metallic=0.15, roughness=0.35, emission_hex="#ff4b0a", emission_strength=3.2)

    add_shadow_floor(z=0.0, size=16.0)

    # 1. BASE DE TALLER METAL·LÚRGIC
    make_box("PlintAtelier", (6.50, 2.00, 0.24), (0.0, 0.10, 0.12), m_stone, bevel=0.02)

    # 2. FORN DE REVERBER SECCIONAT PEL DAVANT (-Y obert de x=-2.75 a x=-0.10)
    # Paret posterior (+Y = 0.55) i parets laterals
    make_box("FornParetDarr", (2.68, 0.22, 1.48), (-1.42, 0.56, 0.98), m_brick, bevel=0.015)
    make_box("FornParetEsq", (0.22, 1.05, 1.48), (-2.65, 0.15, 0.98), m_brick, bevel=0.015)
    make_box("FornParetDreta", (0.22, 1.05, 1.48), (-0.18, 0.15, 0.98), m_brick, bevel=0.015)
    make_box("FornBaseSota", (2.68, 1.05, 0.52), (-1.42, 0.15, 0.50), m_brick, bevel=0.015)

    # Armadura metàl·lica exterior amb tirants (buckstays)
    for tx in (-2.55, -1.85, -1.05, -0.30):
        make_box(f"TirantForn_{tx:.2f}", (0.06, 0.08, 1.56), (tx, -0.38, 1.00), m_iron, bevel=0.004)

    # Fogar a l'esquerra (x = -2.42 .. -1.85) + muret separador (bridge wall)
    make_box("GraellaCarbo", (0.58, 0.68, 0.06), (-2.16, 0.10, 0.78), m_iron, bevel=0.004)
    make_box("LlitCarbo", (0.52, 0.56, 0.10), (-2.16, 0.10, 0.85), m_coal, bevel=0.015)
    make_box("MuretSeparador", (0.18, 0.72, 0.36), (-1.78, 0.10, 0.94), m_refract, bevel=0.01)

    # Sola de pudelació (cubeta central, x = -1.66 .. -0.40) amb bany incandescent
    make_box("SolaCubeta", (1.26, 0.72, 0.16), (-1.03, 0.10, 0.84), m_refract, bevel=0.01)
    make_box("BanyFerro", (1.16, 0.58, 0.08), (-1.03, 0.08, 0.94), m_molten, bevel=0.015)

    # Volta baixa de reverber (es baixa sobre la sola per fer rebotar la flama cap al ferro!)
    make_box("VoltaEsq", (0.85, 0.84, 0.22), (-2.15, 0.18, 1.62), m_refract, rot=(0, 0.12, 0), bevel=0.012)
    make_box("VoltaCentre", (1.05, 0.84, 0.22), (-1.22, 0.18, 1.56), m_refract, rot=(0, 0.24, 0), bevel=0.012)
    make_box("VoltaDreta", (0.58, 0.84, 0.22), (-0.48, 0.18, 1.44), m_refract, rot=(0, 0.08, 0), bevel=0.012)

    # Flames corbent-se sota la volta des del fogar cap a la sola i la xemeneia
    g_flames = add_empty("FlamesReverber", (-1.50, 0.05, 1.24))
    for i, (fx, fz, rx, rz) in enumerate([(-0.58, -0.10, 0.32, 0.22), (-0.15, 0.06, 0.42, 0.18), (0.35, -0.02, 0.38, 0.16)]):
        f = make_sphere(f"FlamaRev_{i}", 0.16, (fx, 0, fz), m_flame, parent=g_flames)
        f.scale = (rx / 0.16, 0.8, rz / 0.16)

    # Xemeneia alta de maó a la dreta del forn (x = -0.22)
    make_box("XemeneiaBase", (0.48, 0.56, 1.75), (-0.24, 0.25, 2.38), m_brick, bevel=0.015)
    make_box("XemeneiaCorona", (0.56, 0.64, 0.12), (-0.24, 0.25, 3.26), m_iron, bevel=0.008)

    # Bola pastosa de ferro forjat i barra llarga del pudelador remenant des de -Y
    g_bola = add_empty("BolaPudelada", (-1.03, 0.05, 1.04))
    make_sphere("BolaFerro", 0.14, (0, 0, 0), m_molten, segs=16, rings=10, parent=g_bola)
    make_rod_between("BarraPudelador", (0.0, 0.0, 0.0), (0.12, -1.28, 0.14), 0.018, m_steel, parent=g_bola)

    # 3. TREN DE LAMINATGE (a la dreta, x = +1.05 .. +2.75)
    lam_x = 1.65
    make_box("BancadaLam", (1.95, 1.15, 0.34), (lam_x, 0.08, 0.40), m_iron, bevel=0.015)
    # Castells / bastidors verticals del laminador
    for ly in (-0.34, 0.38):
        make_box(f"Castell_{ly:.2f}", (0.36, 0.16, 1.12), (lam_x, ly, 1.10), m_iron, bevel=0.01)
        make_box(f"PontCastell_{ly:.2f}", (0.42, 0.20, 0.12), (lam_x, ly, 1.68), m_iron, bevel=0.008)
    # Taula d'entrada i taula de sortida dels corrons
    make_box("TaulaEntrada", (0.72, 0.64, 0.07), (lam_x - 0.56, 0.02, 0.94), m_iron, bevel=0.006)
    make_box("TaulaSortida", (0.85, 0.64, 0.07), (lam_x + 0.62, 0.02, 0.94), m_iron, bevel=0.006)

    # Dos grans corrons d'acer acanalats girant en sentits contraris
    z_sup, z_inf = 1.24, 0.96
    g_cor_sup = add_empty("CorroSup", (lam_x, 0.02, z_sup))
    g_cor_inf = add_empty("CorroInf", (lam_x, 0.02, z_inf))
    make_cyl("CorroSupCos", 0.13, 0.72, (0, 0, 0), m_steel, rot=(math.pi / 2, 0, 0), parent=g_cor_sup)
    make_cyl("CorroInfCos", 0.13, 0.72, (0, 0, 0), m_steel, rot=(math.pi / 2, 0, 0), parent=g_cor_inf)
    for gy in (-0.18, 0.0, 0.18):
        make_torus(f"CanalSup_{gy:.2f}", 0.132, 0.014, (0, gy, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=g_cor_sup)
        make_torus(f"CanalInf_{gy:.2f}", 0.132, 0.014, (0, gy, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=g_cor_inf)

    # Pinyons laterals d'engranament dels corrons i volant d'impuls
    make_gear("EngCorSup", 0.14, 0.06, 14, (0, 0.54, 0), m_iron, axis="Y", parent=g_cor_sup)
    make_gear("EngCorInf", 0.14, 0.06, 14, (0, 0.54, 0), m_iron, axis="Y", parent=g_cor_inf)

    # Barra roent passant i allargant-se entre els corrons
    g_barra = add_empty("PerfilLaminat", (lam_x, 0.02, 1.10))
    make_box("PerfilRoent", (1.25, 0.10, 0.045), (0.0, 0.0, 0.0), m_molten, parent=g_barra, bevel=0.008)

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        # El pudelador remena la bola dins la sola
        g_bola.location = (-1.03 + 0.24 * math.sin(theta), 0.05 + 0.08 * math.cos(theta * 2.0), 1.04)
        g_bola.rotation_euler = (0.0, 0.0, 0.12 * math.cos(theta))
        g_flames.scale = (1.0, 1.0, 0.90 + 0.16 * math.sin(theta * 3.0))

        # Els corrons giren en sentits oposats i passen el perfil laminat
        g_cor_sup.rotation_euler = (0.0, -2.0 * theta, 0.0)
        g_cor_inf.rotation_euler = (0.0, 2.0 * theta, 0.0)
        u = p % 1.0
        g_barra.location = (lam_x - 0.35 + 0.72 * u, 0.02, 1.10)
        g_barra.scale = (0.75 + 0.55 * u, 1.0, 1.35 - 0.55 * u)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_bola, g_flames, g_cor_sup, g_cor_inf, g_barra]
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
                o.keyframe_insert(data_path="scale", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.25)

    cam_loc = (0.0, -7.85, 3.05)
    target = (0.0, 0.05, 1.48)
    setup_lighting(cam_loc, target, lens=40.0)

    anchors = {
        "fogar": (-2.16, -0.05, 0.92),
        "forn": (-1.35, -0.05, 1.56),
        "sola": (-1.03, -0.10, 0.94),
        "pudelador": (-0.98, -0.75, 1.12),
        "xemeneia": (-0.24, 0.10, 2.65),
        "laminador": (lam_x, -0.18, 1.15),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "pudelat-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "pudelat-detall.png"), (2.45, -2.35, 1.62), (1.55, 0.0, 1.12), lens=48.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("pudelat", "pudelat.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_pudelat(animate=True)
