# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Alt forn de coc en secció (model Coalbrookdale, segle XVIII):
marge i pont de càrrega superior, torre de pedra i maó refractari seccionada,
capes de mineral, coc i calcària, màquina bufadora lateral amb pistó i toveres,
gresol amb ferro colat líquid i escòria, i llit de colada de lingots en sorra.
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
    make_curve_tube,
    make_cutaway_cyl,
    make_cyl,
    make_mat,
    make_sphere,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    setup_lighting,
)


def build_altforn(animate=True):
    clear_scene()

    p_stone = build_pbr_pair("StoneAlt", "stone", bump_scale=2.4)
    p_brick = build_pbr_pair("BrickAlt", "brick", bump_scale=2.2)
    p_iron = build_pbr_pair("IronAlt", "castiron", bump_scale=2.0)
    p_wood = build_pbr_pair("WoodAlt", "wood_dark", bump_scale=1.6)
    p_soil = build_pbr_pair("SoilAlt", "soil", bump_scale=1.8)

    m_stone = make_mat("PedraForn", "#8d8270", metallic=0.0, roughness=0.90, pbr_pair=p_stone, tex_scale=(1.6, 1.8))
    m_brick = make_mat("MaoRefractari", "#9e4933", metallic=0.0, roughness=0.86, pbr_pair=p_brick, tex_scale=(1.8, 2.0))
    m_iron = make_mat("FerroFosa", "#272c31", metallic=0.84, roughness=0.45, pbr_pair=p_iron)
    m_steel = make_mat("AcerPolit", "#bfc7cf", metallic=0.94, roughness=0.22)
    m_wood = make_mat("FustaPont", "#6c4827", metallic=0.0, roughness=0.76, pbr_pair=p_wood)
    m_sand = make_mat("SorraColada", "#b79b6c", metallic=0.0, roughness=0.92, pbr_pair=p_soil, tex_scale=(2.2, 2.0))
    m_ore = make_mat("MineralFerro", "#7d382b", metallic=0.15, roughness=0.82)
    m_coke = make_mat("CocForn", "#1b1d20", metallic=0.08, roughness=0.88)
    m_lime = make_mat("Calcaria", "#cfc8b6", metallic=0.0, roughness=0.88)
    m_slag = make_mat("Escoria", "#c98b34", metallic=0.1, roughness=0.45, emission_hex="#e67e22", emission_strength=1.2)
    m_molten = make_mat("FerroLiquid", "#ff5e14", metallic=0.1, roughness=0.35, emission_hex="#ff4508", emission_strength=3.6)
    m_air = make_mat("FluxAire", "#79c0e6", metallic=0.0, roughness=0.3, alpha=0.45, emission_hex="#55a8d8", emission_strength=0.35)
    m_smoke = make_mat("FlamaBoca", "#ff9642", metallic=0.0, roughness=0.4, alpha=0.45, emission_hex="#ff7020", emission_strength=1.4)

    add_shadow_floor(z=0.0, size=18.0)

    # 1. BASE DE PEDRA I MARGE LATERAL DE CÀRREGA (a la dreta, x = +1.35 .. +3.25)
    make_box("SocolBase", (6.80, 2.40, 0.22), (0.0, 0.15, 0.11), m_stone, bevel=0.02)
    # Terraplè / marge de càrrega a la dreta amb pont fins a la boca del forn
    make_box("MargeCàrrega", (1.65, 1.85, 2.55), (2.45, 0.35, 1.48), m_stone, bevel=0.03)
    make_box("PontCarrega", (1.85, 0.62, 0.12), (1.18, 0.15, 2.74), m_wood, bevel=0.01)
    # Carretó de mineral/coc sobre el pont
    make_box("CarretoCaixa", (0.46, 0.34, 0.24), (1.35, 0.05, 2.98), m_wood, bevel=0.008)
    make_cyl("CarretoRoda", 0.12, 0.05, (1.12, 0.05, 2.86), m_iron, rot=(math.pi / 2, 0, 0))
    make_box("CarretoCarrega", (0.38, 0.28, 0.12), (1.35, 0.05, 3.12), m_ore, bevel=0.02)

    # 2. TORRE DE L'ALT FORN EN SECCIÓ FRONTAL (centre a x = 0.0, y = 0.20, z = 0.22 .. 3.05)
    fx, fy = 0.0, 0.20
    # Esglaons exteriors de maçoneria (seccionats pel costat frontal -Y)
    make_cutaway_cyl(
        "TorreBaseExt",
        0.74,
        1.14,
        0.92,
        (fx, fy, 0.68),
        m_stone,
        start_ang=-0.05 * math.pi,
        end_ang=1.18 * math.pi,
        segs=36,
    )
    make_cutaway_cyl(
        "TorreCosMitja",
        0.66,
        1.02,
        1.10,
        (fx, fy, 1.66),
        m_stone,
        start_ang=-0.05 * math.pi,
        end_ang=1.18 * math.pi,
        segs=36,
    )
    make_cutaway_cyl(
        "TorreCosAlt",
        0.52,
        0.86,
        0.72,
        (fx, fy, 2.54),
        m_stone,
        start_ang=-0.05 * math.pi,
        end_ang=1.18 * math.pi,
        segs=36,
    )
    # Anells de tirants de ferro al voltant de la torre
    for rz, rr in [(1.18, 1.04), (1.82, 1.03), (2.36, 0.87), (2.82, 0.87)]:
        make_cutaway_cyl(f"TirantTorre_{rz:.2f}", rr - 0.02, rr + 0.02, 0.06, (fx, fy, rz), m_iron, start_ang=-0.05 * math.pi, end_ang=1.18 * math.pi, segs=36)

    # Folre refractari de maó interior (perfil de cuba + etalatges + gresol)
    make_cutaway_cyl("RefractariAlt", 0.42, 0.56, 1.38, (fx, fy, 2.22), m_brick, start_ang=-0.02 * math.pi, end_ang=1.12 * math.pi, segs=32)
    make_cutaway_cyl("RefractariVentre", 0.50, 0.68, 0.72, (fx, fy, 1.20), m_brick, start_ang=-0.02 * math.pi, end_ang=1.12 * math.pi, segs=32)
    make_cutaway_cyl("RefractariGresol", 0.34, 0.54, 0.65, (fx, fy, 0.56), m_brick, start_ang=-0.02 * math.pi, end_ang=1.12 * math.pi, segs=32)
    # Corona / boca de càrrega superior
    make_cutaway_cyl("BocaCarrega", 0.36, 0.68, 0.24, (fx, fy, 2.98), m_iron, start_ang=-0.05 * math.pi, end_ang=1.18 * math.pi, segs=32)

    # 3. CAPES DE CÀRREGA INTERIORS (mineral, coc, calcària), GRESOL DE FERRO FOS I ESCÒRIA
    layers_grp = add_empty("CapesCarrega", (fx, fy, 0.0))
    layer_specs = [
        (2.72, 0.40, 0.14, m_ore),
        (2.55, 0.40, 0.14, m_coke),
        (2.38, 0.41, 0.14, m_lime),
        (2.20, 0.42, 0.14, m_ore),
        (2.02, 0.43, 0.16, m_coke),
        (1.82, 0.45, 0.16, m_ore),
        (1.62, 0.48, 0.18, m_coke),
    ]
    for idx, (lz, lr, lh, lm) in enumerate(layer_specs):
        make_cutaway_cyl(f"Capa_{idx}", 0.02, lr, lh, (0, 0, lz), lm, start_ang=-0.02 * math.pi, end_ang=1.08 * math.pi, segs=24, parent=layers_grp)

    # Nucli incandescent al ventre i gresol inferior
    g_glow = add_empty("ZonaCalor", (fx, fy, 1.18))
    make_cutaway_cyl("NucliCalor", 0.02, 0.46, 0.52, (0, 0, 0), m_molten, start_ang=-0.02 * math.pi, end_ang=1.08 * math.pi, segs=24, parent=g_glow)
    make_cutaway_cyl("FerroGresol", 0.02, 0.33, 0.36, (fx, fy, 0.46), m_molten, start_ang=-0.02 * math.pi, end_ang=1.08 * math.pi, segs=24)
    make_cutaway_cyl("EscoriaGresol", 0.02, 0.35, 0.12, (fx, fy, 0.70), m_slag, start_ang=-0.02 * math.pi, end_ang=1.08 * math.pi, segs=24)

    # Flamarada suau a la boca superior
    g_flama = add_empty("FlamaSuperior", (fx, fy, 3.16))
    for i, (sx, sz, sr) in enumerate([(0, 0, 0.20), (-0.06, 0.18, 0.16), (0.08, 0.24, 0.14)]):
        make_sphere(f"Flama_{i}", sr, (sx, 0, sz), m_smoke, parent=g_flama)

    # 4. MÀQUINA BUFADORA I TOVERA (a l'esquerra, x = -2.20 .. -0.35)
    bx = -2.25
    make_box("BaseBufadora", (1.20, 1.10, 0.35), (bx, 0.10, 0.38), m_stone, bevel=0.015)
    make_cutaway_cyl("CilindreBufador", 0.32, 0.38, 1.05, (bx, 0.10, 1.10), m_iron, start_ang=-0.10 * math.pi, end_ang=1.15 * math.pi, segs=32)
    make_cyl("TapaBufInf", 0.40, 0.06, (bx, 0.10, 0.56), m_iron)
    make_cyl("TapaBufSup", 0.40, 0.06, (bx, 0.10, 1.64), m_iron)

    g_buf_piston = add_empty("PistoBufador", (bx, 0.10, 1.05))
    make_cyl("DiscBuf", 0.30, 0.10, (0, 0, 0), m_steel, parent=g_buf_piston)
    make_cyl("TijaBuf", 0.04, 0.85, (0, 0, 0.42), m_steel, parent=g_buf_piston)

    # Conducte d'aire de la bufadora fins a la tovera dins del gresol
    make_curve_tube(
        "ConducteTovera",
        [(bx + 0.35, 0.10, 0.72), (-1.45, 0.10, 0.72), (-0.75, 0.10, 0.92), (-0.38, 0.15, 0.92)],
        0.075,
        m_iron,
    )
    make_cone("BroquetTovera", 0.085, 0.045, 0.24, (-0.36, 0.15, 0.92), m_steel, rot=(0, math.pi / 2, 0))
    g_vent = add_empty("RaigAireTovera", (-0.18, 0.15, 0.92))
    make_cone("ConAire", 0.025, 0.11, 0.28, (0.05, 0, 0), m_air, rot=(0, math.pi / 2, 0), parent=g_vent)

    # 5. LLIT DE COLADA AL DAVANT (lingots de ferro colat en sorra: pig iron)
    make_box("LlitSorra", (1.65, 1.10, 0.14), (0.0, -0.78, 0.26), m_sand, bevel=0.02)
    # Canal de sagnia del gresol cap al llit de lingots
    g_sagnia = add_empty("RaigSagnia", (0.0, -0.25, 0.36))
    make_box("CanalMare", (0.14, 0.95, 0.05), (0.0, -0.42, 0.0), m_molten, parent=g_sagnia, bevel=0.006)
    for lx in (-0.48, -0.24, 0.24, 0.48):
        make_box(f"Lingot_{lx:.2f}", (0.12, 0.36, 0.05), (lx, -0.86, 0.35), m_molten, bevel=0.008)
    make_box("BrancCanal", (1.10, 0.10, 0.05), (0.0, -0.66, 0.35), m_molten, bevel=0.006)

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        # Pistó de la màquina bufadora pujant i baixant
        g_buf_piston.location = (bx, 0.10, 1.08 + 0.34 * math.sin(theta))
        # Raig d'aire entra amb força quan el pistó baixa
        air_k = 0.65 + 0.45 * max(0.0, -math.cos(theta))
        g_vent.scale = (air_k, 1.0, 1.0)
        g_glow.scale = (1.0, 1.0, 0.95 + 0.08 * math.sin(theta * 2.0))
        g_flama.location = (fx, fy, 3.16 + 0.07 * math.sin(theta * 3.0))
        layers_grp.location = (fx, fy, -0.02 * (p % 1.0))

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_buf_piston, g_vent, g_glow, g_flama, layers_grp]
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="scale", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.25)

    cam_loc = (-0.25, -7.20, 2.75)
    target = (0.10, 0.0, 1.55)
    setup_lighting(cam_loc, target, lens=42.0)

    anchors = {
        "carrega": (0.85, 0.05, 2.95),
        "cuba": (0.0, 0.02, 2.05),
        "bufadora": (bx, -0.10, 1.15),
        "toveres": (-0.55, 0.05, 0.92),
        "gresol": (0.0, -0.10, 0.56),
        "llit": (0.0, -0.82, 0.38),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "altforn-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "altforn-detall.png"), (-0.15, -3.10, 1.10), (-0.10, -0.20, 0.72), lens=48.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("altforn", "altforn.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_altforn(animate=True)
