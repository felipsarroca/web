# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Constructor compartit per a les dues fàbriques tèxtils de 3 plantes (hidràulica i de vapor)
amb tall frontal complet per mostrar el motor, l'arbre vertical, els eixos del sostre,
les corretges, les cardes (1a planta), les filadores (2a planta), els telers (3a planta)
i el recorregut del cotó de les bales fins a les peces de tela.
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
    make_spoked_wheel,
    make_torus,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    setup_lighting,
)


def build_fabrica(mode="aigua", animate=True):
    clear_scene()

    p_stone = build_pbr_pair("StoneFab", "stone", bump_scale=2.2)
    p_brick = build_pbr_pair("BrickFab", "brick", bump_scale=2.2)
    p_wood = build_pbr_pair("WoodFab", "wood", bump_scale=1.6)
    p_iron = build_pbr_pair("IronFab", "castiron", bump_scale=1.8)
    p_brass = build_pbr_pair("BrassFab", "brass", bump_scale=1.2)
    p_leather = build_pbr_pair("LeatherFab", "leather", bump_scale=1.6)
    p_cloth = build_pbr_pair("ClothFab", "cotton_cloth", bump_scale=1.4)

    m_stone = make_mat("PedraBase", "#9c907c", metallic=0.0, roughness=0.88, pbr_pair=p_stone)
    m_brick = make_mat("MaoFabrica", "#9b4936", metallic=0.0, roughness=0.85, pbr_pair=p_brick, tex_scale=(2.4, 2.0))
    m_slate = make_mat("TeuladaPissarra", "#3a424c", metallic=0.08, roughness=0.68)
    m_wood = make_mat("FustaBigues", "#734d29", metallic=0.0, roughness=0.75, pbr_pair=p_wood)
    m_iron = make_mat("FerroFosa", "#272c31", metallic=0.84, roughness=0.45, pbr_pair=p_iron)
    m_steel = make_mat("AcerEixos", "#c4ccd4", metallic=0.95, roughness=0.20)
    m_brass = make_mat("LlautóEng", "#cf9d3b", metallic=0.90, roughness=0.25, pbr_pair=p_brass)
    m_leather = make_mat("Corretges", "#6a3c20", metallic=0.0, roughness=0.72, pbr_pair=p_leather)
    m_cotton = make_mat("CotoBlanc", "#efe9d8", metallic=0.0, roughness=0.88, pbr_pair=p_cloth)
    m_cloth_r = make_mat("TelaVermella", "#b83b2c", metallic=0.0, roughness=0.75)
    m_cloth_b = make_mat("TelaBlava", "#2f6b99", metallic=0.0, roughness=0.75)
    m_water = make_mat("AiguaCanal", "#2b82b8", metallic=0.0, roughness=0.16, alpha=0.58)
    m_fire = make_mat("FocCaldera", "#ff5e14", metallic=0.0, roughness=0.45, emission_hex="#ff4508", emission_strength=2.8)
    m_smoke = make_mat("FumFabrica", "#b8c0c6", metallic=0.0, roughness=0.7, alpha=0.42)

    add_shadow_floor(z=0.0, size=18.0)

    # 1. EDIFICI DE 3 PLANTES SECCIONAT PEL DAVANT (X = -1.10 .. +2.90)
    b_cx = 0.90
    make_box("SocolEdifici", (6.80, 2.20, 0.24), (-0.15, 0.15, 0.12), m_stone, bevel=0.02)
    # Paret posterior i parets laterals de l'edifici tèxtil
    make_box("ParetDarrera", (4.10, 0.18, 3.30), (b_cx, 0.85, 1.88), m_brick, bevel=0.015)
    make_box("ParetEsq", (0.18, 1.38, 3.30), (-1.08, 0.22, 1.88), m_brick, bevel=0.015)
    make_box("ParetDreta", (0.18, 1.38, 3.30), (2.88, 0.22, 1.88), m_brick, bevel=0.015)
    # Teulada a dues aigües de pissarra (seccionada al davant)
    make_box("TeuladaDarr", (4.35, 0.95, 0.12), (b_cx, 0.56, 3.74), m_slate, rot=(-0.42, 0, 0), bevel=0.01)
    make_box("TeuladaDavant", (4.35, 0.95, 0.12), (b_cx, -0.18, 3.74), m_slate, rot=(0.42, 0, 0), bevel=0.01)

    # Forjats / terres de les 3 plantes (z = 0.28, 1.38, 2.48; sostre a z = 3.52)
    floor_zs = (0.28, 1.38, 2.48)
    for fz in floor_zs[1:]:
        make_box(f"Forjat_{fz:.2f}", (3.92, 1.24, 0.09), (b_cx, 0.22, fz), m_wood, bevel=0.008)

    # 2. ARBRE VERTICAL, EIXOS DEL SOSTRE, POLIGES I CORRETGES
    shaft_x, shaft_y = -0.72, 0.18
    make_cyl("ArbreVertical", 0.052, 3.10, (shaft_x, shaft_y, 1.85), m_steel)
    # Eixos horitzontals sota el sostre de cada planta
    ceil_zs = (1.26, 2.36, 3.36)
    g_eixos = []
    mach_xs = (0.15, 1.15, 2.15)
    g_machines_rot = []
    for iz, cz in enumerate(ceil_zs):
        # Parell d'engranatges cònics arbre -> eix
        make_gear(f"EngArb_{iz}", 0.12, 0.04, 12, (shaft_x, shaft_y, cz), m_brass, axis="Z")
        make_gear(f"EngEix_{iz}", 0.12, 0.04, 12, (shaft_x + 0.12, shaft_y, cz), m_iron, axis="X")
        ge = add_empty(f"EixPlanta_{iz}", (0.95, shaft_y, cz))
        make_cyl(f"BarraEix_{iz}", 0.030, 3.45, (0, 0, 0), m_steel, rot=(0, math.pi / 2, 0), parent=ge)
        for mx in mach_xs:
            make_cyl(f"PolSostre_{iz}_{mx:.2f}", 0.11, 0.06, (mx - 0.95, 0, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=ge)
            # Corretges baixant des de la politja del sostre fins a la màquina del pis
            fz_base = floor_zs[iz]
            make_rod_between(f"CorrA_{iz}_{mx:.2f}", (mx - 0.07, shaft_y, cz), (mx - 0.06, shaft_y, fz_base + 0.42), 0.012, m_leather)
            make_rod_between(f"CorrB_{iz}_{mx:.2f}", (mx + 0.07, shaft_y, cz), (mx + 0.06, shaft_y, fz_base + 0.42), 0.012, m_leather)
        g_eixos.append(ge)

    # 3. MÀQUINES DE CADA PLANTA (3 cardes a baix, 3 filadores al mig, 3 telers a dalt)
    for mx in mach_xs:
        # Planta 1 (z = 0.28): Cardes (tambors amb metxa de cotó)
        make_box(f"CardaMarc_{mx:.2f}", (0.58, 0.56, 0.42), (mx, 0.18, 0.52), m_iron, bevel=0.008)
        gc = add_empty(f"TamborCarda_{mx:.2f}", (mx, 0.18, 0.68))
        make_cyl(f"TamborC_{mx:.2f}", 0.18, 0.42, (0, 0, 0), m_wood, rot=(math.pi / 2, 0, 0), parent=gc)
        make_cyl(f"VeloCoto_{mx:.2f}", 0.188, 0.34, (0, 0, 0), m_cotton, rot=(math.pi / 2, 0, 0), parent=gc)
        g_machines_rot.append(gc)

        # Planta 2 (z = 1.38): Filadores (bastidor amb fileres de bobines i fusos)
        make_box(f"FiladoraMarc_{mx:.2f}", (0.62, 0.50, 0.48), (mx, 0.18, 1.66), m_wood, bevel=0.008)
        gf = add_empty(f"VolantFil_{mx:.2f}", (mx - 0.26, 0.0, 1.72))
        make_spoked_wheel(f"RodaFil_{mx:.2f}", 0.14, 0.03, 6, (0, 0, 0), m_brass, axis="X", parent=gf)
        for bi in (-0.14, 0.0, 0.14):
            make_cyl(f"BobFil_{mx:.2f}_{bi:.2f}", 0.038, 0.22, (mx + bi, 0.04, 1.88), m_cotton)
        g_machines_rot.append(gf)

        # Planta 3 (z = 2.48): Telers mecànics amb tela de colors
        make_box(f"TelerMarc_{mx:.2f}", (0.64, 0.54, 0.52), (mx, 0.18, 2.78), m_iron, bevel=0.008)
        make_box(f"TelaTeler_{mx:.2f}", (0.48, 0.36, 0.03), (mx, 0.12, 2.86), m_cloth_r if mx < 1.5 else m_cloth_b, bevel=0.004)
        gt = add_empty(f"PolTeler_{mx:.2f}", (mx + 0.30, 0.18, 2.84))
        make_spoked_wheel(f"RodaTel_{mx:.2f}", 0.13, 0.03, 6, (0, 0, 0), m_iron, axis="X", parent=gt)
        g_machines_rot.append(gt)

    # 4. BALES DE COTÓ A BAIX A LA DRETA I PECES DE TELA ACABADA A DALT
    for bx, bz in [(2.58, 0.42), (2.58, 0.62), (2.28, 0.42)]:
        make_box(f"BalaCoto_{bx:.2f}_{bz:.2f}", (0.28, 0.36, 0.18), (bx, -0.15, bz), m_cotton, bevel=0.02)
    make_cyl("RotlloVermell", 0.07, 0.36, (2.58, -0.10, 2.66), m_cloth_r, rot=(math.pi / 2, 0, 0))
    make_cyl("RotlloBlau", 0.07, 0.36, (2.58, -0.10, 2.80), m_cloth_b, rot=(math.pi / 2, 0, 0))

    # 5. MOTOR LATERAL A L'ESQUERRA (X = -3.20 .. -1.10) SEGONS MODE
    motor_rot_objs = []
    extra_anim = []
    g_eix_motor = None
    g_piston = None
    g_biela = None
    g_fum = None

    if mode == "aigua":
        # Canal elevat amb aigua caient sobre una gran roda hidràulica
        make_box("SoportCanal", (1.20, 0.56, 2.35), (-3.15, 0.25, 1.40), m_stone, bevel=0.02)
        make_box("CanalFusta", (1.55, 0.48, 0.22), (-2.75, 0.20, 2.65), m_wood, bevel=0.01)
        make_box("AiguaCanal", (1.50, 0.38, 0.14), (-2.75, 0.20, 2.72), m_water, bevel=0.01)
        # Xorro d'aigua caient sobre la roda
        make_box("XorroAigua", (0.22, 0.34, 1.35), (-2.05, 0.18, 2.02), m_water, rot=(0, -0.16, 0), bevel=0.02)
        make_box("BasalAigua", (2.20, 0.90, 0.18), (-2.25, 0.18, 0.28), m_water, bevel=0.01)

        # Gran roda hidràulica centrada a (-2.15, 0.18, 1.35)
        g_eix_motor = add_empty("RodaHidraulica", (-2.15, 0.18, 1.35))
        r_hw = 0.96
        make_torus("CercolHW1", r_hw, 0.03, (0, -0.20, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=g_eix_motor)
        make_torus("CercolHW2", r_hw, 0.03, (0, 0.20, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=g_eix_motor)
        for k in range(12):
            a = 2.0 * math.pi * k / 12
            ca, sa = math.cos(a), math.sin(a)
            make_rod_between(f"RaigHW1_{k}", (0, -0.20, 0), (r_hw * ca, -0.20, r_hw * sa), 0.024, m_wood, parent=g_eix_motor)
            make_rod_between(f"RaigHW2_{k}", (0, 0.20, 0), (r_hw * ca, 0.20, r_hw * sa), 0.024, m_wood, parent=g_eix_motor)
            make_box(f"Catufol_{k}", (0.04, 0.40, 0.22), (r_hw * 0.94 * ca, 0, r_hw * 0.94 * sa), m_wood, rot=(0, -a, 0), parent=g_eix_motor, bevel=0.005)
        # Eix principal fins a l'arbre vertical
        make_cyl("EixRodaFab", 0.06, 1.55, (0.72, 0, 0), m_steel, rot=(0, math.pi / 2, 0), parent=g_eix_motor)
        make_gear("EngMotorV", 0.22, 0.06, 16, (-0.72, shaft_y, 1.35), m_brass, axis="Z")
        make_gear("EngMotorH", 0.22, 0.06, 16, (-0.86, shaft_y, 1.35), m_iron, axis="X")
        motor_rot_objs.append(g_eix_motor)
    else:
        # Fàbrica de vapor: caldera + xemeneia alta de maó + màquina de vapor horitzontal amb volant
        make_box("SalaVaporBase", (2.75, 1.40, 0.24), (-2.52, 0.15, 0.36), m_stone, bevel=0.015)
        # Caldera a l'esquerra amb fogar brillant i xemeneia
        make_cyl("CalderaFab", 0.36, 1.05, (-2.95, 0.20, 1.05), m_iron, rot=(0, math.pi / 2, 0))
        make_box("FornCaldFab", (0.85, 0.65, 0.42), (-2.95, 0.20, 0.62), m_brick, bevel=0.01)
        make_box("FocCaldFab", (0.45, 0.45, 0.22), (-2.95, -0.02, 0.60), m_fire, bevel=0.01)
        make_box("XemeneiaBaseFab", (0.50, 0.50, 3.70), (-3.48, 0.35, 2.08), m_brick, bevel=0.015)
        make_box("XemeneiaCorFab", (0.58, 0.58, 0.14), (-3.48, 0.35, 3.96), m_iron, bevel=0.008)
        g_fum = add_empty("FumXemFab", (-3.48, 0.35, 4.10))
        for si, (sx, sz, sr) in enumerate([(0, 0, 0.16), (-0.12, 0.18, 0.20), (-0.28, 0.38, 0.24)]):
            make_sphere(f"NuvolFab_{si}", sr, (sx, 0, sz), m_smoke, parent=g_fum)

        # Màquina de vapor horitzontal acoblada a l'arbre vertical (cilindre a -2.55, volant a -1.72 lliure de paret)
        make_cyl("CilindreFab", 0.18, 0.52, (-2.55, 0.18, 1.56), m_brass, rot=(0, math.pi / 2, 0))
        g_piston = add_empty("PistoFab", (-2.55, 0.18, 1.56))
        make_cyl("TijaPistoFab", 0.028, 0.56, (0.25, 0, 0), m_steel, rot=(0, math.pi / 2, 0), parent=g_piston)

        vx, vz = -1.72, 1.56
        g_eix_motor = add_empty("VolantVaporFab", (vx, 0.18, vz))
        make_spoked_wheel("VolantFab", 0.48, 0.09, 6, (0, 0, 0), m_iron, m_brass, axis="Y", parent=g_eix_motor)
        make_cyl("BotoVolFab", 0.03, 0.08, (0.16, -0.06, 0), m_brass, rot=(math.pi / 2, 0, 0), parent=g_eix_motor)
        make_cyl("EixMotorFab", 0.05, 1.12, (0.50, 0, 0), m_steel, rot=(0, math.pi / 2, 0), parent=g_eix_motor)
        make_gear("EngVaporV", 0.20, 0.06, 16, (-0.72, shaft_y, 1.56), m_brass, axis="Z")
        make_gear("EngVaporH", 0.20, 0.06, 16, (-0.86, shaft_y, 1.56), m_iron, axis="X")

        g_biela = add_empty("BielaFab", (0, 0, 0))
        make_box("BielaFabCos", (0.52, 0.035, 0.06), (0.26, 0, 0), m_steel, parent=g_biela, bevel=0.004)
        extra_anim.extend([g_piston, g_biela, g_fum])
        motor_rot_objs.append(g_eix_motor)

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        if mode == "aigua":
            g_eix_motor.rotation_euler = (0.0, theta, 0.0)
        else:
            g_eix_motor.rotation_euler = (0.0, 2.0 * theta, 0.0)
            t2 = 2.0 * theta
            kx = -1.72 + 0.16 * math.cos(t2)
            kz = 1.56 - 0.16 * math.sin(t2)
            dx = math.sqrt(max(0.01, 0.52 * 0.52 - (kz - 1.56) ** 2))
            xc = kx - dx
            g_piston.location = (xc - 0.52, 0.18, 1.56)
            g_biela.location = (xc, 0.12, 1.56)
            g_biela.rotation_euler = (0.0, math.atan2(-(kz - 1.56), kx - xc), 0.0)
            g_fum.location = (-3.48, 0.35, 4.10 + 0.08 * math.sin(t2))

        for ge in g_eixos:
            ge.rotation_euler = (2.0 * theta, 0.0, 0.0)
        for gm in g_machines_rot:
            gm.rotation_euler = (3.0 * theta, 0.0, 0.0)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = motor_rot_objs + g_eixos + g_machines_rot + extra_anim
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.22)

    cam_loc = (-0.15, -8.80, 3.15)
    target = (-0.15, 0.10, 1.85)
    setup_lighting(cam_loc, target, lens=40.0)

    anchors = {
        "motor": (-2.15, -0.10, 1.45) if mode == "aigua" else (-1.72, 0.0, 1.56),
        "arbre": (shaft_x, 0.0, 2.05),
        "eixos": (0.85, 0.0, 2.36),
        "corretges": (1.15, 0.05, 1.98),
        "cardes": (1.15, 0.0, 0.65),
        "filadores": (1.15, 0.0, 1.72),
        "telers": (1.15, 0.0, 2.82),
        "coto": (2.55, -0.15, 0.55),
    }
    if mode != "aigua":
        anchors["caldera"] = (-2.95, 0.0, 1.05)
        anchors["xemeneia"] = (-3.48, 0.20, 3.25)

    prefix = "hidraulica" if mode == "aigua" else "vaporera"
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, f"{prefix}-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, f"{prefix}-detall.png"), (-1.45, -4.15, 2.15), (-1.20, 0.10, 1.55), lens=46.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta(prefix, f"{prefix}.glb", anchors, extra_meta={"proj_2d": proj})
