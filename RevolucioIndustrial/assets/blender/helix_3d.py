# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Comparativa i mecanisme d'hèlix marina vs. roda de pales
(inspirada en la prova HMS Rattler vs HMS Alecto, 1845):
popa de vaixell amb caixa d'engranatges, arbre portahèlix, caixa d'estopa
i hèlix de bronze submergida de 4 pales enfrontada/comparada amb la roda de pales
i cable de tracció sota una làmina d'aigua translúcida.
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


def make_propeller(name, radius, loc, mat_bronze, parent=None):
    """Hèlix marina realista de 4 pales helicoïdals inclinades."""
    root = add_empty(name, loc, parent=parent)
    make_cyl(f"{name}_Boixa", radius * 0.24, radius * 0.45, (0, 0, 0), mat_bronze, rot=(0, math.pi / 2, 0), parent=root)
    make_sphere(f"{name}_Ogiva", radius * 0.22, (-radius * 0.22, 0, 0), mat_bronze, parent=root)
    for i in range(4):
        ang = i * (math.pi * 0.5)
        blade_grp = add_empty(f"{name}_PalaG_{i}", (0, 0, 0), parent=root)
        blade_grp.rotation_euler = (ang, 0.0, 0.0)
        # Pala inclinada 34° respecte al pla perpendicular a l'eix X
        blade = make_box(
            f"{name}_Pala_{i}",
            (0.028, radius * 0.48, radius * 0.80),
            (0.0, 0.0, radius * 0.56),
            mat_bronze,
            rot=(0.0, 0.0, 0.58),
            parent=blade_grp,
            bevel=0.012,
        )
        _ = blade
    return root


def build_helix(animate=True):
    clear_scene()

    p_wood = build_pbr_pair("WoodHlx", "wood_dark", bump_scale=1.8)
    p_iron = build_pbr_pair("IronHlx", "castiron", bump_scale=2.0)
    p_brass = build_pbr_pair("BrassHlx", "brass", bump_scale=1.2)
    p_stone = build_pbr_pair("StoneHlx", "stone", bump_scale=1.8)

    m_hull = make_mat("BucRoure", "#3e2718", metallic=0.0, roughness=0.72, pbr_pair=p_wood)
    m_deck = make_mat("CobertaHlx", "#9c7648", metallic=0.0, roughness=0.68, pbr_pair=p_wood)
    m_iron = make_mat("FerroFosa", "#2a2f35", metallic=0.84, roughness=0.45, pbr_pair=p_iron)
    m_steel = make_mat("AcerPolit", "#c4ccd4", metallic=0.95, roughness=0.19)
    m_brass = make_mat("BronzeHelix", "#c89634", metallic=0.92, roughness=0.24, pbr_pair=p_brass)
    m_rope = make_mat("CableTraccio", "#9b855b", metallic=0.0, roughness=0.88, pbr_pair=p_stone)
    m_water = make_mat("AiguaMar", "#2070a0", metallic=0.0, roughness=0.16, alpha=0.46)
    m_wake = make_mat("EstelaAigua", "#b6e2f7", metallic=0.0, roughness=0.35, alpha=0.52)

    add_shadow_floor(z=0.0, size=16.0)

    # Tanc / canal d'aigua comparatiu translúcid perquè es vegi l'hèlix submergida
    make_box("BaseAiguaFons", (6.80, 2.40, 0.12), (0.0, 0.0, 0.06), m_iron, bevel=0.015)
    make_box("VolumAigua", (6.65, 2.25, 0.88), (0.0, 0.0, 0.56), m_water, bevel=0.015)

    # 1. COSTET ESQUERRE: HMS RATTLER (POPA SECCIONADA AMB HÈLIX SUBMERGIDA)
    # Buc de popa orientat cap a -X (la popa mira al centre x = -0.75 per enfrontar les popes, proa cap a -3.1)
    make_box("RattlerQuilla", (2.35, 0.24, 0.14), (-1.92, 0.0, 0.34), m_hull, bevel=0.014)
    make_box("RattlerPopaPost", (0.14, 0.22, 1.38), (-0.78, 0.0, 1.00), m_hull, bevel=0.012)
    make_box("RattlerDarr", (2.25, 0.12, 1.18), (-1.92, 0.56, 1.00), m_hull, bevel=0.012)
    make_box("RattlerCoberta", (2.35, 0.72, 0.10), (-1.92, 0.24, 1.62), m_deck, bevel=0.01)
    make_box("RattlerTimo", (0.28, 0.07, 0.86), (-0.56, 0.0, 0.78), m_hull, bevel=0.008)

    # Motor interior simbòlic + engranatge multiplicador vertical + arbre portahèlix submergit
    make_cyl("MotorRattler", 0.22, 0.54, (-2.42, 0.12, 1.02), m_iron)
    make_cyl("XemRattler", 0.10, 0.78, (-2.42, 0.28, 2.02), m_iron)
    make_cyl("CoixinetArbre", 0.10, 0.22, (-1.85, 0.0, 0.56), m_brass, rot=(0, math.pi / 2, 0))
    make_cyl("CaixaEstopaPopa", 0.11, 0.20, (-1.05, 0.0, 0.56), m_brass, rot=(0, math.pi / 2, 0))
    g_gear_drv = add_empty("EngranatgeGranRG", (-2.05, 0.0, 0.95))
    make_gear("EngranatgeGranR", 0.26, 0.06, 20, (0, 0, 0), m_iron, m_brass, axis="X", parent=g_gear_drv)
    g_gear_pin = add_empty("PinyoHelixG", (-2.05, 0.0, 0.56))
    make_gear("PinyoHelix", 0.13, 0.07, 10, (0, 0, 0), m_brass, axis="X", parent=g_gear_pin)

    g_shaft_h = add_empty("ArbreHelix", (-1.15, 0.0, 0.56))
    make_cyl("ArbreH", 0.048, 1.48, (-0.28, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), parent=g_shaft_h)
    make_propeller("HelixBronze", 0.42, (0.48, 0.0, 0.0), m_brass, parent=g_shaft_h)

    # Estela de propulsió darrere l'hèlix
    g_wake_h = add_empty("EstelaHelix", (-0.38, 0.0, 0.56))
    for i, (wx, wr) in enumerate([(0.0, 0.18), (0.20, 0.24), (0.42, 0.28)]):
        make_torus(f"OnaH_{i}", wr, 0.025, (wx, 0.0, 0.0), m_wake, rot=(0, math.pi / 2, 0), parent=g_wake_h)

    # 2. CABLE DE TRACCIÓ ENTRE POPES (duel 1845)
    make_rod_between("CableDuel", (-0.78, 0.0, 1.56), (0.78, 0.0, 1.56), 0.024, m_rope)
    make_cyl("BitaRattler", 0.065, 0.20, (-0.82, 0.0, 1.66), m_iron)
    make_cyl("BitaAlecto", 0.065, 0.20, (0.82, 0.0, 1.66), m_iron)

    # 3. COSTAT DRET: HMS ALECTO (POPA I RODA DE PALES LATERAL PARCIALMENT EMERGIDA)
    make_box("AlectoQuilla", (2.35, 0.24, 0.14), (1.92, 0.0, 0.34), m_hull, bevel=0.014)
    make_box("AlectoPopaPost", (0.14, 0.22, 1.38), (0.78, 0.0, 1.00), m_hull, bevel=0.012)
    make_box("AlectoDarr", (2.25, 0.12, 1.18), (1.92, 0.56, 1.00), m_hull, bevel=0.012)
    make_box("AlectoCoberta", (2.35, 0.72, 0.10), (1.92, 0.24, 1.62), m_deck, bevel=0.01)
    make_cyl("MotorAlecto", 0.22, 0.54, (2.25, 0.14, 1.02), m_iron)
    make_cyl("XemAlecto", 0.10, 0.78, (2.35, 0.28, 2.02), m_iron)

    g_paddles = add_empty("RodaPalesAlecto", (1.95, -0.56, 1.32))
    make_cyl("EixPalesAl", 0.045, 0.72, (0, 0.34, 0), m_steel, rot=(math.pi / 2, 0, 0), parent=g_paddles)
    r_pal = 0.74
    make_torus("CercolAl1", r_pal, 0.018, (0, -0.10, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=g_paddles)
    make_torus("CercolAl2", r_pal, 0.018, (0, 0.10, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=g_paddles)
    for k in range(10):
        a = 2.0 * math.pi * k / 10
        ca, sa = math.cos(a), math.sin(a)
        make_rod_between(f"RaigAl_{k}", (0, 0, 0), (r_pal * ca, 0, r_pal * sa), 0.016, m_iron, parent=g_paddles)
        make_box(
            f"PalaAl_{k}",
            (0.028, 0.28, 0.16),
            (r_pal * 0.94 * ca, 0.0, r_pal * 0.94 * sa),
            m_deck,
            rot=(0, -a, 0),
            parent=g_paddles,
            bevel=0.004,
        )

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        g_gear_drv.rotation_euler = (theta, 0.0, 0.0)
        g_gear_pin.rotation_euler = (-2.0 * theta, 0.0, 0.0)
        g_shaft_h.rotation_euler = (-2.0 * theta, 0.0, 0.0)
        g_paddles.rotation_euler = (0.0, -theta, 0.0)
        s = 0.85 + 0.22 * math.sin(theta * 2.0)
        g_wake_h.scale = (s, s, s)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_gear_drv, g_gear_pin, g_shaft_h, g_paddles, g_wake_h]
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
                o.keyframe_insert(data_path="scale", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.20)

    cam_loc = (0.0, -7.20, 2.55)
    target = (0.0, 0.0, 0.95)
    setup_lighting(cam_loc, target, lens=42.0)

    anchors = {
        "rattler": (-0.68, 0.0, 0.72),
        "arbre": (-1.55, 0.0, 0.62),
        "motor": (-2.15, 0.0, 1.05),
        "cable": (0.0, 0.0, 1.62),
        "alecto": (1.95, -0.60, 1.32),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "helix-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "helix-detall.png"), (-0.75, -2.85, 1.25), (-1.15, 0.0, 0.65), lens=48.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("helix", "helix.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_helix(animate=True)
