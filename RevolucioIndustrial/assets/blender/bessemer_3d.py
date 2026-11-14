# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Convertidor Bessemer en secció frontal (Henry Bessemer, 1856):
suports de fosa amb eix basculant i conducte d'aire a pressió pel munyó,
recipient en forma de pera folrat d'acer i maó refractari seccionat,
caixa de vent i toveres inferiors, bany de ferro/acer incandescent,
gran flamarada de bufat i cullera de colada sobre carro refractari.
"""

import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bmesh
import bpy

from pbr_comu import (
    add_empty,
    add_shadow_floor,
    apply_box_uv,
    build_pbr_pair,
    clear_scene,
    export_glb_and_meta,
    link_obj,
    make_box,
    make_cone,
    make_curve_tube,
    make_cutaway_cyl,
    make_cyl,
    make_gear,
    make_mat,
    make_sphere,
    make_torus,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    set_smooth,
    setup_lighting,
)


def make_pear_vessel(name, mat_shell, mat_lining, parent=None):
    """Recipient en forma de pera amb camisa d'acer i folre refractari seccionats pel davant (-Y)."""
    # Perfil de revolució parcial de -0.05*pi a 1.15*pi per deixar obert el frontal -Y
    profile = [
        (-1.05, 0.34, 0.50),
        (-0.85, 0.56, 0.72),
        (-0.20, 0.62, 0.78),
        (0.42, 0.52, 0.66),
        (0.92, 0.28, 0.40),
        (1.18, 0.24, 0.35),
    ]
    start_a, end_a = -0.04 * math.pi, 1.16 * math.pi
    n_seg = 34

    def build_revolved(sfx, r_idx_in, r_idx_out, mat):
        mesh = bpy.data.meshes.new(f"{name}_{sfx}_Mesh")
        obj = bpy.data.objects.new(f"{name}_{sfx}", mesh)
        link_obj(obj)
        obj.data.materials.append(mat)
        if parent:
            obj.parent = parent

        bm = bmesh.new()
        rings_in, rings_out = [], []
        for z_p, r_i, r_o in profile:
            ri = r_i if r_idx_in == 1 else r_o
            ro = r_o if r_idx_out == 2 else (r_o + 0.045)
            rin, rout = [], []
            for j in range(n_seg + 1):
                a = start_a + (end_a - start_a) * (j / n_seg)
                ca, sa = math.cos(a), math.sin(a)
                rin.append(bm.verts.new((ri * ca, ri * sa, z_p)))
                rout.append(bm.verts.new((ro * ca, ro * sa, z_p)))
            rings_in.append(rin)
            rings_out.append(rout)

        nr = len(profile)
        for k in range(nr - 1):
            for j in range(n_seg):
                bm.faces.new((rings_out[k][j], rings_out[k][j + 1], rings_out[k + 1][j + 1], rings_out[k + 1][j]))
                bm.faces.new((rings_in[k][j + 1], rings_in[k][j], rings_in[k + 1][j], rings_in[k + 1][j + 1]))
        # Tapes dels talls laterals i vores
        for j in range(n_seg):
            bm.faces.new((rings_out[-1][j], rings_out[-1][j + 1], rings_in[-1][j + 1], rings_in[-1][j]))
            bm.faces.new((rings_in[0][j], rings_in[0][j + 1], rings_out[0][j + 1], rings_out[0][j]))
        for k in range(nr - 1):
            bm.faces.new((rings_in[k][0], rings_out[k][0], rings_out[k + 1][0], rings_in[k + 1][0]))
            bm.faces.new((rings_out[k][-1], rings_in[k][-1], rings_in[k + 1][-1], rings_out[k + 1][-1]))

        bm.normal_update()
        bm.to_mesh(mesh)
        bm.free()
        apply_box_uv(obj, uv_scale=0.6)
        set_smooth(obj)
        return obj

    build_revolved("Refractari", 1, 2, mat_lining)
    build_revolved("CarcassaAcer", 2, 3, mat_shell)


def build_bessemer(animate=True):
    clear_scene()

    p_stone = build_pbr_pair("StoneBes", "stone", bump_scale=2.2)
    p_brick = build_pbr_pair("BrickBes", "brick", bump_scale=2.0)
    p_iron = build_pbr_pair("IronBes", "castiron", bump_scale=2.0)

    m_stone = make_mat("FossatPedra", "#968c7a", metallic=0.0, roughness=0.90, pbr_pair=p_stone)
    m_brick = make_mat("FolreRefractari", "#a4593d", metallic=0.0, roughness=0.86, pbr_pair=p_brick)
    m_iron = make_mat("FerroFosa", "#272b30", metallic=0.85, roughness=0.44, pbr_pair=p_iron)
    m_steel = make_mat("AcerCarcassa", "#4f5963", metallic=0.88, roughness=0.35)
    m_brass = make_mat("LlautóValv", "#d2a23d", metallic=0.92, roughness=0.25)
    m_molten = make_mat("AcerLiquid", "#ff6218", metallic=0.15, roughness=0.32, emission_hex="#ff4406", emission_strength=3.8)
    m_flame = make_mat("FlamaBessemer", "#ffaa33", metallic=0.0, roughness=0.35, alpha=0.68, emission_hex="#ff8811", emission_strength=3.5)
    m_air = make_mat("AireBufat", "#86ccf2", metallic=0.0, roughness=0.25, alpha=0.46, emission_hex="#5ab5e6", emission_strength=0.4)

    add_shadow_floor(z=0.0, size=14.0)

    # 1. BASE I CASTELLS DE SUPORT DEL CONVERTIDOR (centre de gir a x = 0.0, y = 0.0, z = 1.95)
    make_box("BaseTaller", (5.20, 2.40, 0.24), (0.0, 0.0, 0.12), m_stone, bevel=0.02)
    piv_z = 1.98
    for sx in (-1.18, 1.18):
        make_box(f"PeuSuport_{sx:.2f}", (0.34, 0.92, 0.24), (sx, 0.0, 0.36), m_iron, bevel=0.01)
        make_box(f"ColumnaSuport_{sx:.2f}", (0.26, 0.42, 1.65), (sx, 0.0, 1.25), m_iron, bevel=0.012)
        make_cyl(f"CoixinetMunyo_{sx:.2f}", 0.17, 0.28, (sx, 0.0, piv_z), m_brass, rot=(0, math.pi / 2, 0))

    # Conducte d'aire a pressió entrant pel suport dret fins al munyó (trunnion)
    make_curve_tube("CanonadaAire", [(2.15, 0.0, 0.45), (1.58, 0.0, 0.55), (1.58, 0.0, piv_z), (1.18, 0.0, piv_z)], 0.095, m_steel)
    make_cyl("BridaAire", 0.15, 0.05, (1.58, 0.0, 1.25), m_brass)

    # Volant dentat de basculament a l'esquerra
    g_gear_tilt = add_empty("CoronaBasculamentG", (-0.98, 0.0, piv_z))
    make_gear("CoronaBasculament", 0.34, 0.09, 22, (0, 0, 0), m_iron, m_brass, axis="X", parent=g_gear_tilt)
    make_gear("PinyoBasculament", 0.14, 0.09, 10, (-0.98, -0.35, piv_z - 0.32), m_brass, axis="X")

    # 2. GRUP BASCULANT DEL CONVERTIDOR BESSEMER
    g_conv = add_empty("ConvertidorBessemer", (0.0, 0.0, piv_z))
    # Cinturó d'acer i munyons laterals
    make_cutaway_cyl("CinturoMunyo", 0.78, 0.86, 0.26, (0, 0, 0), m_iron, start_ang=-0.04 * math.pi, end_ang=1.16 * math.pi, segs=36, parent=g_conv)
    make_cyl("MunyoEsq", 0.14, 0.46, (-1.00, 0, 0), m_steel, rot=(0, math.pi / 2, 0), parent=g_conv)
    make_cyl("MunyoDret", 0.14, 0.46, (1.00, 0, 0), m_steel, rot=(0, math.pi / 2, 0), parent=g_conv)

    # Recipient en forma de pera seccionat pel davant
    make_pear_vessel("Pera", m_steel, m_brick, parent=g_conv)

    # Tub exterior d'aire baixant des del munyó dret fins a la caixa de vent inferior
    make_curve_tube("TubVentExt", [(0.86, 0.0, 0.0), (0.98, 0.0, -0.58), (0.62, 0.0, -1.16), (0.18, 0.0, -1.16)], 0.068, m_steel, parent=g_conv)

    # Caixa de vent i placa de toveres al fons del convertidor (z_local = -1.15)
    make_cutaway_cyl("CaixaVent", 0.32, 0.44, 0.20, (0, 0, -1.16), m_iron, start_ang=-0.04 * math.pi, end_ang=1.16 * math.pi, segs=28, parent=g_conv)
    make_cutaway_cyl("FonsToveres", 0.02, 0.38, 0.14, (0, 0, -0.98), m_brick, start_ang=-0.04 * math.pi, end_ang=1.16 * math.pi, segs=28, parent=g_conv)
    # 5 toveres i bombolles d'aire travessant el ferro líquid
    g_raigs_aire = add_empty("RaigsToveres", (0, 0, -0.92), parent=g_conv)
    for tx, ty in [(-0.18, 0.06), (0.0, 0.02), (0.18, 0.06), (-0.09, 0.18), (0.09, 0.18)]:
        make_cyl(f"Tovera_{tx:.2f}_{ty:.2f}", 0.024, 0.22, (tx, ty, -0.06), m_brass, parent=g_raigs_aire)
        make_cone(f"Vent_{tx:.2f}_{ty:.2f}", 0.018, 0.055, 0.46, (tx, ty, 0.26), m_air, parent=g_raigs_aire)

    # Bany d'acer incandescent a l'interior del convertidor
    make_cutaway_cyl("BanyConvertidor", 0.02, 0.56, 0.52, (0, 0, -0.56), m_molten, start_ang=-0.02 * math.pi, end_ang=1.10 * math.pi, segs=28, parent=g_conv)

    # Gran flamarada de bufat sortint per la boca superior (z_local = +1.20 .. +2.10)
    g_flama = add_empty("FlamaBoca", (0, 0, 1.24), parent=g_conv)
    for i, (fx, fz, fr) in enumerate([(0.0, 0.16, 0.22), (-0.04, 0.42, 0.26), (0.03, 0.68, 0.20)]):
        f = make_sphere(f"FlamaBes_{i}", fr, (fx, 0, fz), m_flame, parent=g_flama)
        f.scale = (0.85, 0.85, 1.45)

    # 3. CULLERA DE COLADA I RAIG D'ACER LÍQUID A L'ESQUERRA/DAVANT (x = -1.55)
    cull_x, cull_z = -1.65, 0.62
    make_box("CarroCullera", (0.86, 0.86, 0.12), (cull_x, -0.25, 0.30), m_iron, bevel=0.01)
    make_cutaway_cyl("CulleraCos", 0.30, 0.38, 0.58, (cull_x, -0.25, cull_z), m_iron, start_ang=-0.05 * math.pi, end_ang=1.18 * math.pi, segs=28)
    make_cyl("CulleraBase", 0.38, 0.08, (cull_x, -0.25, cull_z - 0.28), m_iron)
    make_cutaway_cyl("AcerCullera", 0.02, 0.29, 0.30, (cull_x, -0.25, cull_z - 0.08), m_molten, start_ang=-0.05 * math.pi, end_ang=1.18 * math.pi, segs=24)

    # Raig de colada que només apareix quan el convertidor bascula cap a l'esquerra
    g_colada = add_empty("RaigColada", (-1.38, -0.18, 1.05))
    make_cyl("RaigColadaCyl", 0.052, 0.88, (0, 0, 0), m_molten, rot=(0, 0.25, 0), parent=g_colada)

    def apply_pose(p):
        # Cicle realista:
        # 0.00..0.65: posició vertical amb bufat intens i flama viva
        # 0.65..0.82: basculament cap a la cullera (-Y? No, girant entorn de Y en angle negatiu cap a -X!)
        # Wait: rot_y = alpha -> boca (0, 0, 1.20) va a (1.2*sin(alpha), 0, 1.2*cos(alpha)), així cap a -X és rot_y < 0!
        if p < 0.62:
            tilt = 0.0
            flame_s = 0.85 + 0.35 * abs(math.sin(p * math.pi * 6.0))
            air_s = 1.0
            pour_s = 0.001
        elif p < 0.78:
            q = (p - 0.62) / 0.16
            sm = q * q * (3.0 - 2.0 * q)
            tilt = -1.78 * sm
            flame_s = max(0.001, 0.85 * (1.0 - sm))
            air_s = max(0.001, 1.0 - sm)
            pour_s = 1.0 if q > 0.75 else 0.001
        elif p < 0.88:
            tilt = -1.78
            flame_s = 0.001
            air_s = 0.001
            pour_s = 1.0
        else:
            q = (p - 0.88) / 0.12
            sm = q * q * (3.0 - 2.0 * q)
            tilt = -1.78 * (1.0 - sm)
            flame_s = 0.25 * sm
            air_s = sm
            pour_s = 0.001

        g_conv.rotation_euler = (0.0, tilt, 0.0)
        g_gear_tilt.rotation_euler = (0.0, tilt, 0.0)
        g_flama.scale = (1.0, 1.0, flame_s)
        g_raigs_aire.scale = (1.0, 1.0, air_s)
        g_colada.scale = (pour_s, pour_s, pour_s)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_conv, g_gear_tilt, g_flama, g_raigs_aire, g_colada]
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
                o.keyframe_insert(data_path="scale", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.28)

    cam_loc = (-0.25, -7.10, 2.75)
    target = (-0.25, 0.0, 1.65)
    setup_lighting(cam_loc, target, lens=42.0)

    anchors = {
        "convertidor": (0.0, -0.35, 1.85),
        "toveres": (0.0, -0.10, 0.92),
        "eix": (1.18, -0.15, piv_z),
        "cullera": (cull_x, -0.40, cull_z + 0.15),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "bessemer-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "bessemer-detall.png"), (0.10, -3.10, 1.75), (0.0, 0.0, 1.48), lens=48.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("bessemer", "bessemer.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_bessemer(animate=True)
