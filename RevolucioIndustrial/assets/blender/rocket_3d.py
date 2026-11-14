# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Locomotora Rocket de George i Robert Stephenson (1829), en tall longitudinal frontal
mostrant el tènder amb bota d'aigua i coc, fogar amb brases, caldera groga multitubular,
presa de vapor, cilindre inclinat seccionat, biela, rodes motrius i xemeneia amb tiratge forçat.
"""

import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy
from mathutils import Vector

from pbr_comu import (
    add_empty,
    add_shadow_floor,
    build_pbr_pair,
    clear_scene,
    export_glb_and_meta,
    make_box,
    make_cone,
    make_curve_tube,
    make_cutaway_cyl,
    make_cyl,
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


def build_rocket(animate=True):
    clear_scene()

    p_stone = build_pbr_pair("StoneRkt", "stone", bump_scale=2.2)
    p_wood = build_pbr_pair("WoodRkt", "wood_dark", bump_scale=1.8)
    p_iron = build_pbr_pair("IronRkt", "castiron", bump_scale=2.0)
    p_brass = build_pbr_pair("BrassRkt", "brass", bump_scale=1.2)
    p_copper = build_pbr_pair("CopperRkt", "copper", bump_scale=1.4)

    m_ballast = make_mat("BalastVia", "#8c8478", metallic=0.0, roughness=0.92, pbr_pair=p_stone, tex_scale=(3.0, 1.5))
    m_wood = make_mat("FustaTravessa", "#5c3b20", metallic=0.0, roughness=0.76, pbr_pair=p_wood)
    m_iron = make_mat("FerroFosa", "#272b30", metallic=0.85, roughness=0.45, pbr_pair=p_iron)
    m_steel = make_mat("AcerPolit", "#c4ccd4", metallic=0.95, roughness=0.20)
    m_brass = make_mat("Llautó", "#d4a63f", metallic=0.92, roughness=0.24, pbr_pair=p_brass)
    m_copper = make_mat("CoureTubs", "#bc673d", metallic=0.88, roughness=0.30, pbr_pair=p_copper)
    m_yellow = make_mat("GrocRocket", "#d9a72b", metallic=0.18, roughness=0.40)
    m_red = make_mat("VermellBota", "#7b2e26", metallic=0.10, roughness=0.55)
    m_coal = make_mat("CocNegre", "#191b1d", metallic=0.05, roughness=0.90)
    m_fire = make_mat(
        "BrasesFogar",
        "#ff5518",
        metallic=0.0,
        roughness=0.5,
        emission_hex="#ff4508",
        emission_strength=3.2,
    )
    m_water = make_mat("AiguaCaldera", "#2e7eb5", metallic=0.0, roughness=0.18, alpha=0.58)
    m_steam_hot = make_mat(
        "VaporRocket",
        "#ffa252",
        metallic=0.0,
        roughness=0.35,
        alpha=0.52,
        emission_hex="#ff8533",
        emission_strength=0.45,
    )
    m_smoke = make_mat("FumXemeneia", "#c8d0d6", metallic=0.0, roughness=0.65, alpha=0.42)

    add_shadow_floor(z=0.0, size=18.0)

    # 1. VIA FERROVIÀRIA (balast, travesses i rails en X = -4.2 .. +2.5)
    make_box("Balast", (6.80, 1.85, 0.14), (-0.80, 0.0, 0.07), m_ballast, bevel=0.02, uv_scale=0.8)
    for tx in [-3.9 + 0.48 * i for i in range(14)]:
        make_box(f"Travessa_{tx:.2f}", (0.18, 1.38, 0.09), (tx, 0.0, 0.16), m_wood, bevel=0.008)
    rail_y = 0.50
    for ry in (-rail_y, rail_y):
        make_box(f"Rail_{ry:.2f}", (6.70, 0.055, 0.085), (-0.80, ry, 0.24), m_steel, bevel=0.004)

    rail_top_z = 0.285

    # 2. TÈNDER POSTERIOR (x = -3.45 .. -1.65)
    tend_x = -2.55
    make_box("TenderXassis", (1.68, 1.18, 0.12), (tend_x, 0.0, 0.68), m_wood, bevel=0.012)
    make_box("TenderLateralDarr", (1.68, 0.07, 0.34), (tend_x, rail_y + 0.04, 0.90), m_yellow, bevel=0.008)
    make_box("TenderCulat", (0.07, 1.16, 0.34), (tend_x - 0.80, 0.0, 0.90), m_yellow, bevel=0.008)
    # Rodes del tènder
    r_tend = 0.34
    t_wheels = []
    for wx in (tend_x - 0.50, tend_x + 0.50):
        make_cyl(f"EixTend_{wx:.2f}", 0.036, 1.14, (wx, 0.0, rail_top_z + r_tend), m_steel, rot=(math.pi / 2, 0, 0))
        for sy in (-rail_y, rail_y):
            w = make_spoked_wheel(f"RodaTend_{wx:.2f}_{sy:.2f}", r_tend, 0.065, 8, (wx, sy, rail_top_z + r_tend), m_iron, m_brass, axis="Y")
            t_wheels.append(w)
    # Bota d'aigua sobre el tènder
    make_cyl("BotaCos", 0.32, 0.84, (tend_x - 0.24, 0.0, 1.04), m_red, rot=(0, math.pi / 2, 0), bevel=0.015)
    for cx in (-0.36, -0.14, 0.14, 0.36):
        make_torus(f"CercolBota_{cx:.2f}", 0.328, 0.014, (tend_x - 0.24 + cx, 0.0, 1.04), m_iron, rot=(0, math.pi / 2, 0))
    # Munt de coc al tènder i mànega fins a la locomotora
    for ci, (cx, cy, cz, cr) in enumerate(
        [
            (0.45, 0.05, 0.84, 0.14),
            (0.32, -0.18, 0.82, 0.12),
            (0.54, -0.14, 0.81, 0.11),
            (0.42, 0.20, 0.82, 0.12),
            (0.46, 0.0, 0.94, 0.11),
        ]
    ):
        make_sphere(f"Coc_{ci}", cr, (tend_x + cx, cy, cz), m_coal, segs=12, rings=8)
    make_curve_tube("ManegaAigua", [(tend_x + 0.15, -0.25, 0.85), (-1.65, -0.25, 0.72), (-1.28, -0.22, 0.85)], 0.032, m_copper)
    make_box("EnganxallTender", (0.36, 0.12, 0.05), (-1.62, 0.0, 0.68), m_iron, bevel=0.005)

    # 3. BASTIDOR DE LA LOCOMOTORA I RODES
    make_box("BastidorDarr", (2.82, 0.08, 0.14), (0.0, rail_y + 0.04, 0.72), m_yellow, bevel=0.008)
    make_box("BastidorFrontInf", (2.82, 0.08, 0.10), (0.0, -rail_y - 0.04, 0.68), m_yellow, bevel=0.006)
    make_box("PlataformaMaquinista", (0.54, 1.08, 0.08), (-1.38, 0.0, 0.74), m_wood, bevel=0.006)

    # Rodes motrius davanteres (grans, x = 0.72, radius = 0.62)
    r_drive = 0.62
    drv_x = 0.72
    drv_z = rail_top_z + r_drive
    make_cyl("EixMotriu", 0.05, 1.16, (drv_x, 0.0, drv_z), m_steel, rot=(math.pi / 2, 0, 0))
    g_drv_front = add_empty("RodaMotriuFront", (drv_x, -rail_y, drv_z))
    make_spoked_wheel("RodaMotF", r_drive, 0.085, 14, (0, 0, 0), m_yellow, mat_hub=m_iron, axis="Y", parent=g_drv_front)
    make_torus("LlandaMotF", r_drive, 0.025, (0, 0, 0), m_steel, rot=(math.pi / 2, 0, 0), parent=g_drv_front)
    r_crank = 0.24
    make_cyl("BotoRodaFront", 0.036, 0.13, (r_crank, -0.06, 0.0), m_brass, rot=(math.pi / 2, 0, 0), parent=g_drv_front)

    g_drv_back = add_empty("RodaMotriuDarr", (drv_x, rail_y, drv_z))
    make_spoked_wheel("RodaMotD", r_drive, 0.085, 14, (0, 0, 0), m_yellow, mat_hub=m_iron, axis="Y", parent=g_drv_back)
    make_torus("LlandaMotD", r_drive, 0.025, (0, 0, 0), m_steel, rot=(math.pi / 2, 0, 0), parent=g_drv_back)

    # Rodes portadores posteriors (x = -0.82, radius = 0.36)
    r_trail = 0.36
    trl_x = -0.82
    trl_z = rail_top_z + r_trail
    make_cyl("EixPortador", 0.04, 1.14, (trl_x, 0.0, trl_z), m_steel, rot=(math.pi / 2, 0, 0))
    g_trl_f = make_spoked_wheel("RodaPortF", r_trail, 0.07, 10, (trl_x, -rail_y, trl_z), m_iron, m_brass, axis="Y")
    g_trl_d = make_spoked_wheel("RodaPortD", r_trail, 0.07, 10, (trl_x, rail_y, trl_z), m_iron, m_brass, axis="Y")

    # 4. FOGAR SECCIONAT (x = -1.24 .. -0.78)
    make_box("FogarDarr", (0.58, 0.08, 0.72), (-1.04, 0.36, 1.12), m_iron, bevel=0.008)
    make_box("FogarSostre", (0.58, 0.74, 0.07), (-1.04, 0.02, 1.46), m_iron, bevel=0.008)
    make_box("FogarParetEsq", (0.07, 0.74, 0.72), (-1.30, 0.02, 1.12), m_iron, bevel=0.008)
    # Camisa d'aigua interior al fogar i llit de brases incandescents
    make_box("CamisaAiguaFogar", (0.44, 0.14, 0.44), (-1.04, 0.18, 1.14), m_water, bevel=0.005)
    make_box("GraellaFogar", (0.44, 0.56, 0.045), (-1.04, 0.02, 0.80), m_iron, bevel=0.004)
    g_brases = add_empty("BrasesGrup", (-1.04, 0.02, 0.86))
    for fi, (fx, fy, fz, fr, fm) in enumerate(
        [
            (-0.10, -0.06, 0.0, 0.08, m_fire),
            (0.02, 0.02, 0.02, 0.09, m_fire),
            (0.11, -0.05, 0.0, 0.075, m_fire),
            (-0.04, -0.11, 0.03, 0.065, m_coal),
            (0.07, -0.10, 0.03, 0.060, m_coal),
        ]
    ):
        make_sphere(f"Brasa_{fi}", fr, (fx, fy, fz), fm, segs=12, rings=8, parent=g_brases)

    # 5. CALDERA GROGA MULTITUBULAR SECCIONADA (x = -0.78 .. +0.98, z = 1.15)
    cald_cx = 0.10
    cald_cz = 1.15
    cald_len = 1.76
    make_cutaway_cyl(
        "CalderaExterior",
        0.37,
        0.42,
        cald_len,
        (cald_cx, 0.0, cald_cz),
        m_yellow,
        start_ang=-0.10 * math.pi,
        end_ang=1.18 * math.pi,
        segs=40,
        rot=(0.0, math.pi / 2, 0.0),
    )
    # Anells de llautó al voltant de la caldera seccionada
    for rx in (-0.60, -0.12, 0.36, 0.84):
        make_cutaway_cyl(
            f"AnellCald_{rx:.2f}",
            0.415,
            0.435,
            0.04,
            (rx, 0.0, cald_cz),
            m_brass,
            start_ang=-0.10 * math.pi,
            end_ang=1.18 * math.pi,
            segs=40,
            rot=(0.0, math.pi / 2, 0.0),
        )
    # Aigua interior (part baixa) i vapor (part alta) dins la caldera
    make_box("AiguaCaldera", (cald_len - 0.06, 0.56, 0.32), (cald_cx, 0.04, cald_cz - 0.13), m_water, bevel=0.01)
    make_box("VaporCaldera", (cald_len - 0.08, 0.48, 0.20), (cald_cx, 0.06, cald_cz + 0.16), m_steam_hot, bevel=0.01)

    # 5 tubs de fum de coure visibles dins la caldera (del fogar a la caixa de fums)
    for tz, ty in [(cald_cz - 0.18, -0.06), (cald_cz - 0.18, 0.12), (cald_cz - 0.06, -0.14), (cald_cz - 0.06, 0.04), (cald_cz + 0.05, 0.02)]:
        make_cyl(f"TubFum_{tz:.2f}_{ty:.2f}", 0.032, cald_len + 0.12, (cald_cx + 0.02, ty, tz), m_copper, rot=(0, math.pi / 2, 0), verts=16)

    # Dom de presa de vapor i canonada cap al cilindre
    make_cyl("PresaVapor", 0.14, 0.30, (-0.15, 0.0, 1.64), m_brass, bevel=0.01)
    make_sphere("CupulaVapor", 0.14, (-0.15, 0.0, 1.79), m_brass)
    make_curve_tube("TubPresaCil", [(-0.15, -0.05, 1.74), (-0.42, -0.32, 1.62), (-0.48, -0.52, 1.48)], 0.036, m_copper)

    # 6. CAIXA DE FUMS I XEMENEIA ALTA DAVANTERA (x = 1.14)
    chim_x = 1.14
    make_cutaway_cyl(
        "CaixaFums",
        0.35,
        0.41,
        0.38,
        (chim_x, 0.0, cald_cz),
        m_iron,
        start_ang=-0.05 * math.pi,
        end_ang=1.22 * math.pi,
        segs=36,
        rot=(0.0, math.pi / 2, 0.0),
    )
    make_cyl("XemeneiaCos", 0.15, 1.65, (chim_x, 0.0, 2.28), m_iron, bevel=0.008)
    make_cyl("CoronaXem", 0.21, 0.12, (chim_x, 0.0, 3.12), m_brass, bevel=0.01)
    # Tub d'escapament portant vapor usat del cilindre fins dins la xemeneia (blastpipe)
    make_curve_tube(
        "TubEscapament",
        [(-0.32, -0.46, 1.34), (0.35, -0.30, 1.56), (chim_x - 0.04, -0.05, 1.38), (chim_x, 0.0, 1.90)],
        0.034,
        m_copper,
    )
    g_fum = add_empty("FumXemeneia", (chim_x, 0.0, 3.24))
    for si, (sx, sy, sz, sr) in enumerate([(0, 0, 0, 0.13), (-0.08, 0.02, 0.18, 0.17), (-0.20, -0.02, 0.38, 0.21)]):
        make_sphere(f"NuvolXem_{si}", sr, (sx, sy, sz), m_smoke, parent=g_fum)

    # 7. CILINDRE INCLINAT SECCIONAT, PISTÓ I BIELA (costat frontal -Y = -0.55)
    # L'eix del cilindre apunta exactament cap al centre de la roda motriu (drv_x, -rail_y - 0.08, drv_z)
    p_cyl = Vector((-0.52, -0.58, 1.44))
    p_axle = Vector((drv_x, -0.58, drv_z))
    cyl_dir = (p_axle - p_cyl).normalized()
    # Angle en el pla XZ des de X+ cap avall:
    ang_cyl = math.atan2(-cyl_dir.z, cyl_dir.x)

    g_cyl_incl = add_empty("CilindreInclinatGrup", tuple(p_cyl))
    g_cyl_incl.rotation_euler = (0.0, ang_cyl, 0.0)
    # Cilindre seccionat al llarg de X local de g_cyl_incl
    make_cutaway_cyl(
        "CilindreRocket",
        0.13,
        0.18,
        0.54,
        (0.0, 0.0, 0.0),
        m_brass,
        start_ang=-0.08 * math.pi,
        end_ang=1.18 * math.pi,
        segs=32,
        rot=(0.0, math.pi / 2, 0.0),
        parent=g_cyl_incl,
    )
    make_cyl("TapaCilDarr", 0.185, 0.04, (-0.28, 0.0, 0.0), m_iron, rot=(0, math.pi / 2, 0), parent=g_cyl_incl)
    # Guies de la creuera inclinada
    make_box("GuiaInclSup", (0.56, 0.06, 0.025), (0.56, 0.0, 0.09), m_steel, parent=g_cyl_incl, bevel=0.002)
    make_box("GuiaInclInf", (0.56, 0.06, 0.025), (0.56, 0.0, -0.09), m_steel, parent=g_cyl_incl, bevel=0.002)

    g_piston = add_empty("PistoInclinat", (0.0, 0.0, 0.0), parent=g_cyl_incl)
    make_cyl("CapPistoRkt", 0.124, 0.075, (0.0, 0.0, 0.0), m_iron, rot=(0, math.pi / 2, 0), parent=g_piston)
    make_cyl("TijaPistoRkt", 0.022, 0.56, (0.28, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), parent=g_piston)
    make_box("CreueraRkt", (0.11, 0.09, 0.16), (0.56, 0.0, 0.0), m_brass, parent=g_piston, bevel=0.005)

    # Biela forjada entre creuera i botó de la roda motriu
    L_biela = 0.85
    g_biela = add_empty("BielaRocket", (0, 0, 0))
    make_box("BielaRktCos", (L_biela, 0.042, 0.068), (L_biela * 0.5, 0.0, 0.0), m_steel, parent=g_biela, bevel=0.006)
    make_box("CapBiela1", (0.11, 0.07, 0.10), (0.0, 0.0, 0.0), m_brass, parent=g_biela, bevel=0.004)
    make_box("CapBiela2", (0.12, 0.07, 0.11), (L_biela, 0.0, 0.0), m_brass, parent=g_biela, bevel=0.004)

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        g_drv_front.rotation_euler = (0.0, theta, 0.0)
        g_drv_back.rotation_euler = (0.0, theta, 0.0)
        rot_t = theta * (r_drive / r_trail)
        g_trl_f.rotation_euler = (0.0, rot_t, 0.0)
        g_trl_d.rotation_euler = (0.0, rot_t, 0.0)

        # Botó de manovella en món (en el pla Y = -0.58)
        cx = drv_x + r_crank * math.cos(theta)
        cz = drv_z - r_crank * math.sin(theta)

        # Projectem sobre l'eix del cilindre inclinat per trobar la posició exacta de la creuera
        dp = Vector((cx - p_cyl.x, 0.0, cz - p_cyl.z))
        along = dp.dot(cyl_dir)
        perp = (dp - cyl_dir * along).length
        back_dist = math.sqrt(max(0.01, L_biela * L_biela - perp * perp))
        s_cross = along - back_dist
        s_piston = s_cross - 0.56
        g_piston.location = (s_piston, 0.0, 0.0)

        cross_world = p_cyl + cyl_dir * s_cross
        g_biela.location = (cross_world.x, -0.58, cross_world.z)
        ang_b = math.atan2(-(cz - cross_world.z), cx - cross_world.x)
        g_biela.rotation_euler = (0.0, ang_b, 0.0)

        g_fum.location = (chim_x, 0.0, 3.24 + 0.08 * math.sin(theta * 2.0))
        g_brases.scale = (1.0, 1.0, 0.94 + 0.08 * math.sin(theta * 2.0))

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_drv_front, g_drv_back, g_trl_f, g_trl_d, g_piston, g_biela, g_fum, g_brases]
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

    cam_loc = (-0.50, -8.55, 3.05)
    target = (-0.50, 0.0, 1.58)
    setup_lighting(cam_loc, target, lens=42.0)

    anchors = {
        "tender": (tend_x, -0.20, 1.15),
        "fogar": (-1.04, -0.25, 1.05),
        "caldera": (0.10, -0.35, 1.25),
        "tubs": (0.20, -0.20, 1.04),
        "vapor": (-0.15, -0.15, 1.78),
        "cilindre": (-0.48, -0.62, 1.44),
        "biela": (0.25, -0.62, 1.10),
        "roda": (drv_x + 0.15, -0.58, drv_z - 0.10),
        "escapament": (0.45, -0.28, 1.56),
        "xemeneia": (chim_x, -0.16, 2.65),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "rocket-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "rocket-detall.png"), (0.25, -3.20, 1.85), (0.10, -0.15, 1.25), lens=48.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("rocket", "rocket.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_rocket(animate=True)
