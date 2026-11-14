# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Arada triangular de Rotherham (Joseph Foljambe, 1730):
biga principal (cama) amb regulador d'enganxall, ganivet vertical,
rella triangular de ferro, orelló helicoïdal corbat folrat de ferro,
bastidor triangular lleuger, dues esteves i gleves de terra voltejant-se al solc.
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
    make_cyl,
    make_mat,
    make_rod_between,
    make_torus,
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    set_smooth,
    setup_lighting,
)


def make_mouldboard(name, mat, parent=None):
    """Construeix un orelló corbat autèntic que gira gradualment la gleba de terra."""
    mesh = bpy.data.meshes.new(name + "_Mesh")
    obj = bpy.data.objects.new(name, mesh)
    link_obj(obj)
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent

    bm = bmesh.new()
    nu, nv = 16, 10
    grid_front, grid_back = [], []
    thick = 0.022
    for iu in range(nu + 1):
        u = iu / nu  # de davant (u=0, punta) a darrere (u=1, ala de l'orelló)
        x = 0.36 - u * 0.92
        row_f, row_b = [], []
        # Torsió progressiva: al davant gairebé pla horitzontal; al darrere es gira cap a -Y (costat dret del solc)
        twist = (u ** 1.15) * 1.48
        y_off = -0.02 - 0.30 * (u ** 1.3)
        for iv in range(nv + 1):
            v = iv / nv  # de baix (v=0) a dalt (v=1)
            w = 0.08 + 0.36 * math.sin(u * math.pi * 0.65)
            h_rel = v * w
            # Superfície corbada amb concavitat suau
            dy = y_off - h_rel * math.sin(twist) * 0.85 - 0.06 * math.sin(v * math.pi) * u
            dz = 0.22 + h_rel * math.cos(twist * 0.55) + 0.05 * u
            row_f.append(bm.verts.new((x, dy, dz)))
            row_b.append(bm.verts.new((x, dy + thick, dz + thick * 0.35)))
        grid_front.append(row_f)
        grid_back.append(row_b)

    for iu in range(nu):
        for iv in range(nv):
            bm.faces.new((grid_front[iu][iv], grid_front[iu + 1][iv], grid_front[iu + 1][iv + 1], grid_front[iu][iv + 1]))
            bm.faces.new((grid_back[iu][iv + 1], grid_back[iu + 1][iv + 1], grid_back[iu + 1][iv], grid_back[iu][iv]))
    for iu in range(nu):
        bm.faces.new((grid_front[iu][0], grid_back[iu][0], grid_back[iu + 1][0], grid_front[iu + 1][0]))
        bm.faces.new((grid_front[iu + 1][nv], grid_back[iu + 1][nv], grid_back[iu][nv], grid_front[iu][nv]))
    for iv in range(nv):
        bm.faces.new((grid_front[0][iv], grid_front[0][iv + 1], grid_back[0][iv + 1], grid_back[0][iv]))
        bm.faces.new((grid_back[nu][iv], grid_back[nu][iv + 1], grid_front[nu][iv + 1], grid_front[nu][iv]))

    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    apply_box_uv(obj, uv_scale=0.8)
    set_smooth(obj)
    return obj


def make_share(name, mat, parent=None):
    """Rella triangular afuada de ferro forjat."""
    mesh = bpy.data.meshes.new(name + "_Mesh")
    obj = bpy.data.objects.new(name, mesh)
    link_obj(obj)
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent

    bm = bmesh.new()
    # Punta davantera a x=0.58, s'eixampla fins x=0.22 entre y=0.02 i y=-0.26
    z0, z1 = 0.19, 0.24
    pts = [(0.62, -0.02, z0), (0.22, 0.04, z0), (0.22, -0.26, z0)]
    pts_top = [(0.62, -0.02, z0 + 0.015), (0.22, 0.04, z1), (0.22, -0.26, z1 - 0.01)]
    vb = [bm.verts.new(p) for p in pts]
    vt = [bm.verts.new(p) for p in pts_top]
    bm.faces.new((vt[0], vt[1], vt[2]))
    bm.faces.new((vb[2], vb[1], vb[0]))
    for i in range(3):
        j = (i + 1) % 3
        bm.faces.new((vb[i], vb[j], vt[j], vt[i]))
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    apply_box_uv(obj, uv_scale=0.8)
    return obj


def build_arada(animate=True):
    clear_scene()

    p_wood = build_pbr_pair("WoodArd", "wood", bump_scale=1.6)
    p_iron = build_pbr_pair("IronArd", "castiron", bump_scale=1.8)
    p_soil = build_pbr_pair("SoilArd", "soil", bump_scale=2.6)

    m_wood = make_mat("FustaRoure", "#7e562e", metallic=0.0, roughness=0.75, pbr_pair=p_wood)
    m_wood_d = make_mat("FustaFosca", "#53361b", metallic=0.0, roughness=0.78, pbr_pair=p_wood)
    m_iron = make_mat("FerroForjat", "#2d3238", metallic=0.86, roughness=0.44, pbr_pair=p_iron)
    m_steel = make_mat("FerroPolit", "#aeb8c2", metallic=0.94, roughness=0.20)
    m_soil = make_mat("TerraCamp", "#5b4129", metallic=0.0, roughness=0.92, pbr_pair=p_soil, tex_scale=(2.2, 2.0))
    m_soil_fresh = make_mat("TerraGleb", "#47301c", metallic=0.0, roughness=0.94, pbr_pair=p_soil, tex_scale=(1.4, 1.4))

    add_shadow_floor(z=0.0, size=12.0)

    # 1. BASE DE TERRA AMB SOLC OBERT AL COSTAL FRONTAL
    make_box("TerraBaseFons", (4.0, 1.80, 0.14), (0.0, 0.0, 0.07), m_soil, bevel=0.02, uv_scale=0.6)
    make_box("TerraNoLlaurada", (4.0, 0.85, 0.14), (0.0, 0.45, 0.20), m_soil, bevel=0.02, uv_scale=0.6)
    # Solc bolcat darrere l'orelló
    make_box("TerraGlebGirada", (2.10, 0.34, 0.15), (-0.95, -0.45, 0.21), m_soil_fresh, rot=(0.25, 0.0, 0.0), bevel=0.03)

    # 2. CONJUNT DE L'ARADA DE ROTHERHAM (avança cap a +X)
    g_arada = add_empty("AradaRotherham", (0.0, 0.0, 0.0))

    # Cama (biga principal longitudinal corbada lleugerament, x = -0.75 .. +1.55)
    make_box("CamaPrincipal", (2.32, 0.085, 0.105), (0.40, 0.0, 0.78), m_wood, rot=(0, 0.05, 0), parent=g_arada, bevel=0.01)
    # Regulador d'enganxall a la punta davantera (+X)
    make_box("BridaEnganxall", (0.14, 0.105, 0.18), (1.52, 0.0, 0.71), m_iron, parent=g_arada, bevel=0.005)
    make_torus("AnellaTir", 0.055, 0.012, (1.59, 0.0, 0.70), m_steel, rot=(0, math.pi / 2, 0), parent=g_arada)

    # Bastidor triangular: taló / rella d'arrossegament inferior + muntants verticals
    make_box("SolaLliscament", (0.98, 0.07, 0.075), (-0.22, 0.0, 0.22), m_iron, parent=g_arada, bevel=0.005)
    make_rod_between("MuntantDavant", (0.18, 0.0, 0.76), (0.12, 0.0, 0.24), 0.038, m_wood_d, parent=g_arada)
    make_rod_between("MuntantDarrera", (-0.64, 0.0, 0.82), (-0.68, 0.0, 0.24), 0.042, m_wood_d, parent=g_arada)

    # Ganivet vertical (coulter) travessant la cama just davant la rella
    make_box("GanivetFulla", (0.095, 0.024, 0.68), (0.64, -0.01, 0.56), m_steel, rot=(0, 0.22, 0), parent=g_arada, bevel=0.004)
    make_box("BridaGanivet", (0.12, 0.11, 0.13), (0.68, 0.0, 0.76), m_iron, parent=g_arada, bevel=0.004)

    # Rella triangular i orelló corbat folrat de ferro
    make_share("RellaFerro", m_steel, parent=g_arada)
    make_mouldboard("OrelloFerro", m_steel, parent=g_arada)

    # Dues esteves posteriors per guiar l'arada
    make_rod_between("EstevaEsq", (-0.64, 0.02, 0.82), (-1.58, 0.22, 1.12), 0.034, m_wood, parent=g_arada)
    make_rod_between("EstevaDreta", (-0.64, -0.04, 0.76), (-1.58, -0.22, 1.12), 0.034, m_wood, parent=g_arada)
    make_cyl("ManecEsq", 0.038, 0.20, (-1.66, 0.23, 1.15), m_wood_d, rot=(0, 1.30, 0), parent=g_arada)
    make_cyl("ManecDret", 0.038, 0.20, (-1.66, -0.23, 1.15), m_wood_d, rot=(0, 1.30, 0), parent=g_arada)
    make_rod_between("TravesserEst", (-1.18, 0.13, 0.99), (-1.18, -0.13, 0.99), 0.022, m_wood_d, parent=g_arada)

    # Gleves animades tallades per la rella i capgirades per l'orelló
    gleves = []
    for k in range(3):
        gg = add_empty(f"GlebaAnim_{k}", (0.35, -0.10, 0.24))
        make_box(f"GlebaCos_{k}", (0.28, 0.22, 0.13), (0, 0, 0), m_soil_fresh, bevel=0.025, parent=gg)
        gleves.append(gg)

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        g_arada.location = (0.0, 0.0, 0.012 * math.sin(theta * 2.0))
        g_arada.rotation_euler = (0.018 * math.sin(theta), 0.012 * math.cos(theta * 2.0), 0.0)
        for k, gg in enumerate(gleves):
            u = (p + k / 3.0) % 1.0
            gx = 0.50 - 1.15 * u
            gy = -0.06 - 0.36 * (u ** 1.25)
            gz = 0.22 + 0.14 * math.sin(u * math.pi)
            gg.location = (gx, gy, gz)
            gg.rotation_euler = (-2.6 * u, 0.15 * math.sin(u * math.pi), 0.0)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_arada] + gleves
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.25)

    cam_loc = (0.85, -4.15, 2.05)
    target = (0.0, -0.05, 0.65)
    setup_lighting(cam_loc, target, lens=44.0)

    anchors = {
        "cama": (0.45, -0.06, 0.82),
        "ganivet": (0.64, -0.06, 0.56),
        "rella": (0.44, -0.14, 0.23),
        "orello": (-0.08, -0.26, 0.36),
        "esteves": (-1.45, -0.22, 1.08),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "arada-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "arada-detall.png"), (0.45, -1.95, 1.05), (0.15, -0.15, 0.42), lens=50.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("arada", "arada.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_arada(animate=True)
