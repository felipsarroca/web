# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Sembradora mecànica de tres fileres de Jethro Tull (c. 1701),
sobre llit de terra llaurada amb tremuja oberta de llavors,
dosador giratori mogut per les rodes, relles, tubs de caiguda, rasclet i esteves.
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
    make_cone,
    make_cyl,
    make_gear,
    make_mat,
    make_rod_between,
    make_sphere,
    make_spoked_wheel,
    make_torus,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    setup_lighting,
)


def build_sembradora(animate=True):
    clear_scene()

    p_wood = build_pbr_pair("WoodSmb", "wood", bump_scale=1.6)
    p_iron = build_pbr_pair("IronSmb", "castiron", bump_scale=2.0)
    p_brass = build_pbr_pair("BrassSmb", "brass", bump_scale=1.2)
    p_soil = build_pbr_pair("SoilSmb", "soil", bump_scale=2.5)
    p_leather = build_pbr_pair("LeatherSmb", "leather", bump_scale=1.6)

    m_wood = make_mat("FustaRoure", "#7b532c", metallic=0.0, roughness=0.76, pbr_pair=p_wood)
    m_wood_d = make_mat("FustaFosca", "#52351b", metallic=0.0, roughness=0.78, pbr_pair=p_wood)
    m_iron = make_mat("FerroForjat", "#2d3238", metallic=0.86, roughness=0.45, pbr_pair=p_iron)
    m_steel = make_mat("AcerRella", "#b8c1ca", metallic=0.94, roughness=0.22)
    m_brass = make_mat("LlautóDosador", "#cf9d3b", metallic=0.90, roughness=0.26, pbr_pair=p_brass)
    m_soil = make_mat("TerraLlaurada", "#5a422b", metallic=0.0, roughness=0.92, pbr_pair=p_soil, tex_scale=(2.4, 2.0))
    m_seed = make_mat("LlavorBlat", "#e0b64e", metallic=0.0, roughness=0.52)
    m_leather = make_mat("CorretjaSmb", "#643a20", metallic=0.0, roughness=0.74, pbr_pair=p_leather)
    m_glass = make_mat("TallTransparent", "#e5edf2", metallic=0.0, roughness=0.18, alpha=0.28)

    add_shadow_floor(z=0.0, size=14.0)

    # 1. SOLC DE TERRA LLAURADA (base en X = -2.2 .. +2.2, Y = -1.1 .. +1.1)
    make_box("BaseTerra", (4.30, 2.20, 0.16), (0.0, 0.0, 0.08), m_soil, bevel=0.02, uv_scale=0.6)
    row_ys = (-0.42, 0.0, 0.42)
    for ry in row_ys:
        # Cavalló / vora de solc a cada costat de la filera
        make_box(f"CavalloEsq_{ry:.2f}", (4.10, 0.10, 0.06), (0.0, ry - 0.13, 0.18), m_soil, bevel=0.015)
        make_box(f"CavalloDret_{ry:.2f}", (4.10, 0.10, 0.06), (0.0, ry + 0.13, 0.18), m_soil, bevel=0.015)

    # 2. BASTIDOR DE FUSTA, ESTEVES I RODES (avançant cap a +X)
    g_maq = add_empty("SembradoraConjunt", (0.0, 0.0, 0.0))

    # Travessers longitudinals i transversals del bastidor
    for by in (-0.64, 0.64):
        make_box(f"BastLong_{by:.2f}", (2.15, 0.09, 0.10), (0.15, by, 0.72), m_wood, parent=g_maq, bevel=0.008)
    for bx in (-0.68, -0.05, 0.62, 1.15):
        make_box(f"BastTrav_{bx:.2f}", (0.09, 1.36, 0.09), (bx, 0.0, 0.72), m_wood, parent=g_maq, bevel=0.008)
    # Vares davanteres per als cavalls (+X)
    for by in (-0.52, 0.52):
        make_rod_between(f"VaraCavall_{by:.2f}", (1.15, by, 0.72), (2.25, by * 0.85, 0.82), 0.042, m_wood_d, parent=g_maq)
    make_box("BarraTir", (0.08, 1.05, 0.07), (1.35, 0.0, 0.74), m_wood_d, parent=g_maq, bevel=0.006)

    # Esteves posteriors (-X) amb mànecs tornejats
    for by in (-0.42, 0.42):
        make_rod_between(f"Esteva_{by:.2f}", (-0.68, by, 0.72), (-1.75, by * 0.95, 1.16), 0.036, m_wood, parent=g_maq)
        make_cyl(f"ManecEst_{by:.2f}", 0.042, 0.22, (-1.82, by * 0.95, 1.19), m_wood_d, rot=(0, 1.25, 0), parent=g_maq)
    make_rod_between("TravesserEst", (-1.45, -0.40, 1.04), (-1.45, 0.40, 1.04), 0.025, m_wood_d, parent=g_maq)

    # Dues grans rodes de carreta (radi 0.54, eix a x = 0.05, z = 0.70)
    r_w = 0.54
    wx, wz = 0.05, 0.16 + r_w
    make_cyl("EixRodes", 0.036, 1.72, (wx, 0.0, wz), m_iron, rot=(math.pi / 2, 0, 0), parent=g_maq)
    g_rodes = []
    for sy in (-0.79, 0.79):
        rw = make_spoked_wheel(f"Roda_{sy:.2f}", r_w, 0.08, 10, (wx, sy, wz), m_wood, mat_hub=m_iron, axis="Y", parent=g_maq)
        make_torus(f"CercolRoda_{sy:.2f}", r_w, 0.018, (0, 0, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=rw)
        g_rodes.append(rw)

    # 3. TREMUJA OBERTA, DOSADOR AMB OSQUES I TRANSMISSIÓ DES DE LA RODA
    # Tremuja trapezoïdal sobre el bastidor (costat frontal -Y obert/retallat per veure el gra i el dosador!)
    tr_x, tr_z = 0.08, 1.24
    make_box("TremujaDarrera", (0.58, 0.05, 0.46), (tr_x, 0.56, tr_z), m_wood, rot=(0.18, 0, 0), parent=g_maq, bevel=0.006)
    make_box("TremujaEsq", (0.05, 1.12, 0.46), (tr_x - 0.28, 0.0, tr_z), m_wood, rot=(0, -0.16, 0), parent=g_maq, bevel=0.006)
    make_box("TremujaDreta", (0.05, 1.12, 0.46), (tr_x + 0.28, 0.0, tr_z), m_wood, rot=(0, 0.16, 0), parent=g_maq, bevel=0.006)
    make_box("TremujaFrontBaix", (0.48, 0.05, 0.22), (tr_x, -0.52, tr_z - 0.12), m_wood, rot=(-0.18, 0, 0), parent=g_maq, bevel=0.006)
    # Llavor dins la tremuja
    make_box("GraTremuja", (0.44, 0.96, 0.18), (tr_x, 0.0, tr_z - 0.06), m_seed, parent=g_maq, bevel=0.02)

    # Caixa i eix del dosador sota la tremuja (x = 0.08, z = 0.92)
    dos_x, dos_z = 0.08, 0.92
    g_dosador = add_empty("DosadorGrup", (dos_x, 0.0, dos_z), parent=g_maq)
    make_cyl("EixDosador", 0.026, 1.38, (0, 0, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=g_dosador)
    for ry in row_ys:
        make_cyl(f"TamborDos_{ry:.2f}", 0.078, 0.13, (0, ry, 0), m_wood_d, rot=(math.pi / 2, 0, 0), parent=g_dosador)
        # Osques / culleres de llautó al voltant de cada tambor dosador
        for k in range(6):
            a = k * (math.pi / 3.0)
            make_box(
                f"OscaDos_{ry:.2f}_{k}",
                (0.028, 0.09, 0.028),
                (0.075 * math.cos(a), ry, 0.075 * math.sin(a)),
                m_brass,
                rot=(0, -a, 0),
                parent=g_dosador,
                bevel=0.003,
            )

    # Engranatge a la roda davantera-esquerra (o eix lateral y = -0.66) + corretja/engranatges cap al dosador
    g_eng_eix = add_empty("EngranatgeEixG", (wx, -0.66, wz), parent=g_maq)
    make_gear("EngranatgeEix", 0.14, 0.045, 14, (0, 0, 0), m_brass, axis="Y", parent=g_eng_eix)
    g_eng_dos = add_empty("EngranatgeDosadorG", (dos_x, -0.66, dos_z), parent=g_maq)
    make_gear("EngranatgeDosador", 0.10, 0.045, 10, (0, 0, 0), m_brass, axis="Y", parent=g_eng_dos)
    make_rod_between("CadenaSmb1", (wx - 0.11, -0.66, wz), (dos_x - 0.08, -0.66, dos_z), 0.014, m_leather, parent=g_maq)
    make_rod_between("CadenaSmb2", (wx + 0.11, -0.66, wz), (dos_x + 0.08, -0.66, dos_z), 0.014, m_leather, parent=g_maq)

    # 4. RELLES OBRE-SOLCS, TUBS DE CAIGUDA I RASCLET (per a cadascuna de les 3 fileres)
    seeds_anim = []
    for i_row, ry in enumerate(row_ys):
        # Rella obre-solc davant del tub (x = 0.34, punxa fins a z = 0.13)
        make_box(f"SuportRella_{i_row}", (0.06, 0.035, 0.56), (0.34, ry, 0.44), m_wood_d, rot=(0, -0.18, 0), parent=g_maq, bevel=0.004)
        make_cone(f"PuntaRella_{i_row}", 0.07, 0.012, 0.24, (0.36, ry, 0.20), m_steel, rot=(0, -1.25, 0), parent=g_maq)

        # Tub embut de caiguda just darrere la rella (x = 0.08 .. -0.02, z = 0.85 .. 0.20)
        make_cone(f"EmbutTub_{i_row}", 0.095, 0.042, 0.20, (0.08, ry, 0.78), m_brass, rot=(math.pi, 0, 0), parent=g_maq)
        # Costat frontal semitransparent/obert del tub perquè es vegin caure les llavors!
        make_cyl(f"TubVidre_{i_row}", 0.038, 0.56, (0.06, ry, 0.46), m_glass, parent=g_maq)

        # Llavors caient dins del tub en loop
        for j in range(3):
            gs = add_empty(f"LlavorAnim_{i_row}_{j}", (0.06, ry, 0.65), parent=g_maq)
            make_sphere(f"Gra_{i_row}_{j}", 0.022, (0, 0, 0), m_seed, segs=10, rings=8, parent=gs)
            seeds_anim.append((gs, i_row, j))

        # Llavors ja col·locades al fons del solc darrere el tub
        for kx in (-0.30, -0.65, -1.00):
            make_sphere(f"GraSolc_{i_row}_{kx:.2f}", 0.020, (kx, ry, 0.16), m_seed, segs=8, rings=6)

    # 5. RASCLET POSTERIOR (x = -0.92, colga la llavor amb pues metàl·liques)
    make_box("BarraRasclet", (0.08, 1.18, 0.07), (-0.92, 0.0, 0.36), m_wood, parent=g_maq, bevel=0.006)
    make_rod_between("BracRascletEsq", (-0.68, -0.52, 0.72), (-0.92, -0.52, 0.36), 0.022, m_iron, parent=g_maq)
    make_rod_between("BracRascletDret", (-0.68, 0.52, 0.72), (-0.92, 0.52, 0.36), 0.022, m_iron, parent=g_maq)
    for py in [-0.50 + 0.125 * k for k in range(9)]:
        make_cyl(f"PuaRasclet_{py:.2f}", 0.012, 0.24, (-0.96, py, 0.24), m_steel, rot=(0, 0.25, 0), parent=g_maq)

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        for rw in g_rodes:
            rw.rotation_euler = (0.0, theta, 0.0)
        g_eng_eix.rotation_euler = (0.0, theta, 0.0)
        g_dosador.rotation_euler = (0.0, theta * 1.4, 0.0)
        g_eng_dos.rotation_euler = (0.0, theta * 1.4, 0.0)
        g_maq.location = (0.0, 0.0, 0.008 * math.sin(theta * 4.0))
        for gs, i_row, j in seeds_anim:
            ph = (p + j / 3.0 + i_row * 0.17) % 1.0
            gs.location = (0.06, row_ys[i_row], 0.74 - 0.56 * ph)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = g_rodes + [g_eng_eix, g_dosador, g_eng_dos, g_maq] + [gs for gs, _, _ in seeds_anim]
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.20)

    cam_loc = (1.35, -4.55, 2.35)
    target = (-0.05, 0.0, 0.78)
    setup_lighting(cam_loc, target, lens=44.0)

    anchors = {
        "tremuja": (tr_x, -0.25, 1.32),
        "dosador": (dos_x, -0.45, dos_z),
        "roda": (wx, -0.78, wz + 0.22),
        "tub": (0.08, -0.42, 0.50),
        "rella": (0.42, -0.42, 0.22),
        "rasclet": (-0.94, -0.35, 0.32),
        "bastidor": (0.72, -0.64, 0.74),
        "esteves": (-1.58, -0.42, 1.10),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "sembradora-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "sembradora-detall.png"), (0.55, -2.05, 1.25), (0.10, -0.20, 0.72), lens=50.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("sembradora", "sembradora.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_sembradora(animate=True)
