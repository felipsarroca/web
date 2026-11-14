# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Utilitats compartides PBR, geometria mecànica, animació i render per a Blender 5.3 CLI.
Genera parelles d'albedo sRGB + mapes normals tangents empaquetats dins el .glb i per a Cycles.
"""

import json
import math
import os

import bmesh
import bpy
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT_DIR = os.path.join(ROOT, "assets", "blender", "out")
MODELS_DIR = os.path.join(ROOT, "assets", "models")
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(MODELS_DIR, exist_ok=True)


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_rgb_srgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255.0 for i in (0, 2, 4))


def hex_rgba(h, alpha=1.0):
    r, g, b = (srgb_to_linear(v) for v in hex_rgb_srgb(h))
    return (r, g, b, alpha)


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def _hash2(x, y):
    n = math.sin(x * 127.1 + y * 311.7) * 43758.5453123
    return n - math.floor(n)


def _sample_height_and_color(kind, u, v, px, py):
    """Retorna (r, g, b, height) per generar albedo sRGB i mapa normal coherent."""
    if kind == "wood":
        wobble = math.sin(u * 8.5 + _hash2(int(u * 10), int(v * 16)) * 0.45)
        grain = 0.5 + 0.5 * math.sin(v * 72.0 + 3.8 * wobble)
        ring = 0.5 + 0.5 * math.sin(v * 18.0 + 1.4 * wobble)
        seam = 1.0 if (v * 3.0) % 1.0 > 0.025 else 0.70
        fine = (_hash2(px * 0.22, py) - 0.5) * 0.045
        r = (0.45 + 0.14 * grain + 0.04 * ring + fine) * seam
        g = (0.27 + 0.095 * grain + 0.03 * ring + fine * 0.7) * seam
        b = (0.13 + 0.045 * grain + 0.015 * ring + fine * 0.4) * seam
        ht = (0.52 + 0.34 * grain + fine) * seam
        return r, g, b, ht

    if kind == "wood_dark":
        wobble = math.sin(u * 7.0 + _hash2(int(u * 8), int(v * 14)) * 0.35)
        grain = 0.5 + 0.5 * math.sin(v * 68.0 + 3.2 * wobble)
        fine = (_hash2(px * 0.25, py) - 0.5) * 0.04
        r = 0.28 + 0.10 * grain + fine
        g = 0.16 + 0.06 * grain + fine * 0.7
        b = 0.08 + 0.03 * grain + fine * 0.4
        return r, g, b, 0.50 + 0.32 * grain + fine

    if kind == "castiron":
        n1 = _hash2(px * 0.85, py * 0.85)
        n2 = _hash2(int(u * 56), int(v * 56))
        patina = max(0.0, _hash2(int(u * 16), int(v * 16)) - 0.78) * 0.30
        val = 0.16 + 0.07 * n1 + 0.04 * n2
        return val + patina * 0.40, val * 1.02 + patina * 0.14, val * 1.08, 0.45 + 0.36 * n1 + 0.14 * n2

    if kind == "brass":
        brush = 0.028 * math.sin(u * 140.0) + 0.025 * (_hash2(px * 0.35, py) - 0.5)
        patina = max(0.0, _hash2(int(u * 14), int(v * 14)) - 0.70) * 0.12
        r = 0.80 + brush - patina * 0.45
        g = 0.61 + brush * 0.7 - patina * 0.35
        b = 0.22 + brush * 0.3 + patina * 0.12
        return r, g, b, 0.55 + brush * 1.6

    if kind == "leather":
        n1 = _hash2(int(u * 64), int(v * 64))
        crease = 0.03 * math.sin(u * 38.0 + n1 * 1.8)
        r = 0.34 + 0.08 * n1 + crease
        g = 0.20 + 0.05 * n1 + crease * 0.6
        b = 0.11 + 0.03 * n1 + crease * 0.4
        return r, g, b, 0.50 + 0.32 * n1 + crease * 2.0

    if kind == "cotton_cloth":
        warp = 0.5 + 0.5 * math.sin(u * 140.0)
        weft = 0.5 + 0.5 * math.sin(v * 140.0)
        weave = 0.52 * warp + 0.48 * weft
        n = (_hash2(px * 0.6, py * 0.6) - 0.5) * 0.04
        r = 0.84 + 0.09 * weave + n
        g = 0.79 + 0.09 * weave + n
        b = 0.67 + 0.08 * weave + n
        return r, g, b, 0.35 + 0.55 * weave + n

    if kind == "brick":
        rows, cols = 8.0, 4.0
        row = math.floor(v * rows)
        u_off = (u * cols + (0.5 if int(row) % 2 else 0.0)) % cols
        col = math.floor(u_off)
        fu = u_off - col
        fv = v * rows - row
        mortar = min(fu, 1.0 - fu) < 0.045 or min(fv, 1.0 - fv) < 0.065
        n1 = _hash2(int(u * 40), int(v * 40))
        n2 = _hash2(px * 0.45, py * 0.45)
        bvar = (_hash2(col + row * 11.0, row * 17.0) - 0.5) * 0.14
        if mortar:
            val = 0.62 + (n1 - 0.5) * 0.08
            return val, val * 0.96, val * 0.88, 0.28 + n2 * 0.12
        r = 0.58 + bvar + (n1 - 0.5) * 0.08
        g = 0.25 + bvar * 0.5 + (n1 - 0.5) * 0.05
        b = 0.17 + bvar * 0.3 + (n1 - 0.5) * 0.04
        return r, g, b, 0.68 + n2 * 0.22

    if kind == "copper":
        brush = 0.032 * math.sin(u * 130.0) + 0.035 * (_hash2(px * 0.3, py) - 0.5)
        hammer = 0.035 * math.sin(u * 28.0) * math.cos(v * 28.0)
        patina = max(0.0, _hash2(int(u * 16), int(v * 16)) - 0.68) * 0.18
        r = 0.76 + brush + hammer * 0.5 - patina * 0.65
        g = 0.41 + brush * 0.6 + hammer * 0.3 + patina * 0.22
        b = 0.22 + brush * 0.4 + patina * 0.30
        return r, g, b, 0.55 + hammer * 2.2 + brush * 0.8

    if kind == "painted_iron":
        n1 = _hash2(int(u * 42), int(v * 42))
        n2 = _hash2(px * 0.4, py * 0.4)
        wear = max(0.0, _hash2(int(u * 12), int(v * 12)) - 0.84) * 0.4
        r = 0.16 + 0.04 * n1 + wear * 0.18
        g = 0.26 + 0.05 * n1 + wear * 0.12
        b = 0.28 + 0.05 * n1 + wear * 0.08
        return r, g, b, 0.52 + 0.15 * n2

    if kind == "soil":
        n1 = _hash2(int(u * 60), int(v * 60))
        n2 = _hash2(px * 0.7, py * 0.7)
        furrow = 0.5 + 0.5 * math.sin(v * 32.0)
        r = 0.30 + 0.10 * furrow + (n1 - 0.5) * 0.07
        g = 0.21 + 0.07 * furrow + (n1 - 0.5) * 0.05
        b = 0.13 + 0.04 * furrow + (n1 - 0.5) * 0.04
        return r, g, b, 0.30 + 0.48 * furrow + 0.20 * n2

    if kind == "slate":
        n1 = _hash2(int(u * 48), int(v * 48))
        seam = 1.0 if (v * 6.0) % 1.0 > 0.04 else 0.72
        v0 = (0.28 + 0.07 * n1) * seam
        return v0 * 0.94, v0 * 0.98, v0 * 1.08, (0.55 + 0.25 * n1) * seam

    # stone (sol i socol de taller)
    rows, cols = 4.0, 3.0
    row = math.floor(v * rows)
    u_off = (u * cols + (0.5 if int(row) % 2 else 0.0)) % cols
    col = math.floor(u_off)
    fu = u_off - col
    fv = v * rows - row
    is_seam = min(fu, 1.0 - fu) < 0.032 or min(fv, 1.0 - fv) < 0.042
    n1 = _hash2(int(u * 48), int(v * 48))
    n2 = _hash2(px * 0.5, py * 0.5)
    block_var = (_hash2(col + row * 7.0, row * 13.0) - 0.5) * 0.08
    val = (n1 * 0.55 + n2 * 0.45 - 0.5) * 0.09 + block_var
    seam_k = 0.78 if is_seam else 1.0
    ht = (0.28 if is_seam else 0.66) + (n1 * 0.20 + n2 * 0.12)
    return (0.69 + val) * seam_k, (0.64 + val) * seam_k, (0.54 + val) * seam_k, ht


def build_pbr_pair(name, kind, width=256, height=256, bump_scale=2.4):
    """Genera parella (albedo_sRGB, tangent_normal) empaquetada per a Cycles i glTF."""
    alb = bpy.data.images.new(f"{name}_Alb", width=width, height=height, alpha=False)
    nrm = bpy.data.images.new(f"{name}_Nrm", width=width, height=height, alpha=False)
    nrm.colorspace_settings.name = "Non-Color"

    alb_buf = [0.0] * (width * height * 4)
    hts = [0.0] * (width * height)

    for py in range(height):
        v = py / height
        for px in range(width):
            u = px / width
            r, g, b, h = _sample_height_and_color(kind, u, v, px, py)
            idx = (py * width + px) * 4
            alb_buf[idx] = max(0.0, min(1.0, r))
            alb_buf[idx + 1] = max(0.0, min(1.0, g))
            alb_buf[idx + 2] = max(0.0, min(1.0, b))
            alb_buf[idx + 3] = 1.0
            hts[py * width + px] = h

    nrm_buf = [0.0] * (width * height * 4)
    for py in range(height):
        py0 = (py - 1) % height
        py1 = (py + 1) % height
        for px in range(width):
            px0 = (px - 1) % width
            px1 = (px + 1) % width
            dx = (hts[py * width + px1] - hts[py * width + px0]) * bump_scale
            dy = (hts[py1 * width + px] - hts[py0 * width + px]) * bump_scale
            nx, ny, nz = -dx, -dy, 1.0
            inv = 1.0 / math.sqrt(nx * nx + ny * ny + nz * nz)
            idx = (py * width + px) * 4
            nrm_buf[idx] = 0.5 + 0.5 * (nx * inv)
            nrm_buf[idx + 1] = 0.5 + 0.5 * (ny * inv)
            nrm_buf[idx + 2] = 0.5 + 0.5 * (nz * inv)
            nrm_buf[idx + 3] = 1.0

    alb.pixels.foreach_set(alb_buf)
    alb.pack()
    nrm.pixels.foreach_set(nrm_buf)
    nrm.pack()
    return alb, nrm


def make_mat(
    name,
    color_hex,
    metallic=0.0,
    roughness=0.5,
    alpha=1.0,
    emission_hex=None,
    emission_strength=0.0,
    pbr_pair=None,
    tex_scale=(1.0, 1.0),
    normal_strength=0.80,
):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = hex_rgba(color_hex, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if alpha < 1.0:
        bsdf.inputs["Alpha"].default_value = alpha
        mat.blend_method = "BLEND" if hasattr(mat, "blend_method") else "HASHED"
    if emission_hex:
        bsdf.inputs["Emission Color"].default_value = hex_rgba(emission_hex, 1.0)
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    if pbr_pair is not None:
        alb_img, nrm_img = pbr_pair
        tc = nt.nodes.new("ShaderNodeTexCoord")
        mapping = nt.nodes.new("ShaderNodeMapping")
        mapping.inputs["Scale"].default_value = (tex_scale[0], tex_scale[1], 1.0)
        nt.links.new(tc.outputs["UV"], mapping.inputs["Vector"])

        tex_alb = nt.nodes.new("ShaderNodeTexImage")
        tex_alb.image = alb_img
        nt.links.new(mapping.outputs["Vector"], tex_alb.inputs["Vector"])
        nt.links.new(tex_alb.outputs["Color"], bsdf.inputs["Base Color"])

        if normal_strength > 0:
            tex_nrm = nt.nodes.new("ShaderNodeTexImage")
            tex_nrm.image = nrm_img
            nrm_node = nt.nodes.new("ShaderNodeNormalMap")
            nrm_node.space = "TANGENT"
            nrm_node.inputs["Strength"].default_value = normal_strength
            nt.links.new(mapping.outputs["Vector"], tex_nrm.inputs["Vector"])
            nt.links.new(tex_nrm.outputs["Color"], nrm_node.inputs["Color"])
            nt.links.new(nrm_node.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def link_obj(obj, collection=None):
    col = collection or bpy.context.scene.collection
    col.objects.link(obj)
    return obj


def add_empty(name, loc=(0, 0, 0), parent=None):
    emp = bpy.data.objects.new(name, None)
    emp.location = loc
    link_obj(emp)
    if parent:
        emp.parent = parent
    return emp


def set_smooth(obj):
    if obj.type == "MESH" and obj.data:
        for p in obj.data.polygons:
            p.use_smooth = True


def apply_box_uv(obj, uv_scale=0.65):
    mesh = obj.data
    if not mesh.uv_layers:
        mesh.uv_layers.new(name="UVMap")
    uv_layer = mesh.uv_layers.active.data
    sx, sy, sz = obj.scale
    for poly in mesh.polygons:
        n = poly.normal
        nx, ny, nz = abs(n.x), abs(n.y), abs(n.z)
        for li in poly.loop_indices:
            v = mesh.vertices[mesh.loops[li].vertex_index].co
            wx, wy, wz = v.x * sx, v.y * sy, v.z * sz
            if nz >= nx and nz >= ny:
                u, vv = wx, wy
            elif nx >= ny and nx >= nz:
                u, vv = wy, wz
            else:
                u, vv = wx, wz
            uv_layer[li].uv = (u * uv_scale, vv * uv_scale)


def add_bevel(obj, width=0.008, segments=2):
    mod = obj.modifiers.new(name="Bevel", type="BEVEL")
    mod.width = width
    mod.segments = segments


def make_box(name, size, loc, mat, rot=(0, 0, 0), parent=None, bevel=0.006, uv_scale=0.65):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=loc, rotation=rot)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(scale=True)
    apply_box_uv(obj, uv_scale=uv_scale)
    obj.data.materials.append(mat)
    if bevel > 0:
        add_bevel(obj, width=bevel)
    if parent:
        obj.parent = parent
    return obj


def make_cyl(name, radius, depth, loc, mat, rot=(0, 0, 0), verts=28, parent=None, bevel=0.003, uv_scale=0.65):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=radius, depth=depth, location=loc, rotation=rot)
    obj = bpy.context.active_object
    obj.name = name
    apply_box_uv(obj, uv_scale=uv_scale)
    obj.data.materials.append(mat)
    set_smooth(obj)
    if bevel > 0:
        add_bevel(obj, width=bevel, segments=2)
    if parent:
        obj.parent = parent
    return obj


def make_cone(name, radius1, radius2, depth, loc, mat, rot=(0, 0, 0), verts=24, parent=None, bevel=0.002):
    bpy.ops.mesh.primitive_cone_add(
        vertices=verts, radius1=radius1, radius2=radius2, depth=depth, location=loc, rotation=rot
    )
    obj = bpy.context.active_object
    obj.name = name
    apply_box_uv(obj, uv_scale=0.65)
    obj.data.materials.append(mat)
    set_smooth(obj)
    if bevel > 0:
        add_bevel(obj, width=bevel, segments=2)
    if parent:
        obj.parent = parent
    return obj


def make_sphere(name, radius, loc, mat, segs=20, rings=12, parent=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segs, ring_count=rings, radius=radius, location=loc)
    obj = bpy.context.active_object
    obj.name = name
    apply_box_uv(obj, uv_scale=0.65)
    obj.data.materials.append(mat)
    set_smooth(obj)
    if parent:
        obj.parent = parent
    return obj


def make_rod_between(name, p0, p1, radius, mat, verts=12, parent=None):
    """Crea un cilindre alineat exactament entre p0 i p1."""
    va, vb = Vector(p0), Vector(p1)
    d = vb - va
    length = max(1e-4, d.length)
    rot = d.normalized().to_track_quat("Z", "Y").to_euler()
    return make_cyl(name, radius, length, (va + vb) * 0.5, mat, rot=rot, verts=verts, parent=parent, bevel=0.0)


def make_spoked_wheel(name, radius, width, spokes, loc, mat_rim, mat_hub=None, axis="Y", parent=None):
    """Roda de raigs amb llanda, boixa i raigs orientables (eix X, Y o Z)."""
    root = add_empty(name, loc, parent=parent)
    rot_axis = (math.pi / 2, 0.0, 0.0) if axis == "Y" else (0.0, math.pi / 2, 0.0) if axis == "X" else (0.0, 0.0, 0.0)
    # Llanda buida feta amb torus o anell extruït
    n_seg = 40
    r_out = radius
    r_in = radius - width * 0.9
    half_w = width * 0.5
    mesh = bpy.data.meshes.new(name + "_RimMesh")
    rim_obj = bpy.data.objects.new(name + "_Rim", mesh)
    link_obj(rim_obj)
    rim_obj.parent = root
    rim_obj.data.materials.append(mat_rim)

    bm = bmesh.new()
    v_top_out, v_top_in, v_bot_out, v_bot_in = [], [], [], []
    for i in range(n_seg):
        a = 2.0 * math.pi * i / n_seg
        ca, sa = math.cos(a), math.sin(a)
        v_top_out.append(bm.verts.new((r_out * ca, r_out * sa, half_w)))
        v_top_in.append(bm.verts.new((r_in * ca, r_in * sa, half_w)))
        v_bot_out.append(bm.verts.new((r_out * ca, r_out * sa, -half_w)))
        v_bot_in.append(bm.verts.new((r_in * ca, r_in * sa, -half_w)))
    for i in range(n_seg):
        j = (i + 1) % n_seg
        bm.faces.new((v_top_out[i], v_top_out[j], v_top_in[j], v_top_in[i]))
        bm.faces.new((v_bot_in[i], v_bot_in[j], v_bot_out[j], v_bot_out[i]))
        bm.faces.new((v_top_out[j], v_top_out[i], v_bot_out[i], v_bot_out[j]))
        bm.faces.new((v_top_in[i], v_top_in[j], v_bot_in[j], v_bot_in[i]))
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    rim_obj.rotation_euler = rot_axis
    apply_box_uv(rim_obj, uv_scale=0.8)
    set_smooth(rim_obj)

    hub_mat = mat_hub or mat_rim
    make_cyl(f"{name}_Boixa", radius * 0.19, width * 1.45, (0, 0, 0), hub_mat, rot=rot_axis, verts=20, parent=root)

    spoke_len = r_in - radius * 0.14
    for s in range(spokes):
        a = 2.0 * math.pi * s / spokes
        # Raig en el pla local del disc abans de rotar a axis
        r_mid = radius * 0.14 + spoke_len * 0.5
        if axis == "Y":
            p_loc = (r_mid * math.cos(a), 0.0, r_mid * math.sin(a))
            s_rot = (0.0, math.pi / 2 - a, 0.0)
        elif axis == "X":
            p_loc = (0.0, r_mid * math.cos(a), r_mid * math.sin(a))
            s_rot = (a - math.pi / 2, 0.0, 0.0)
        else:
            p_loc = (r_mid * math.cos(a), r_mid * math.sin(a), 0.0)
            s_rot = (math.pi / 2, 0.0, a - math.pi / 2)
        make_cyl(
            f"{name}_Raig_{s}",
            max(0.008, radius * 0.042),
            spoke_len,
            p_loc,
            mat_rim,
            rot=s_rot,
            verts=10,
            parent=root,
            bevel=0.0,
        )
    return root


def make_gear(name, radius, thickness, teeth, loc, mat, mat_hub=None, axis="X", parent=None):
    """Engranatge dentat extruït autèntic en 3D."""
    mesh = bpy.data.meshes.new(name + "_Mesh")
    obj = bpy.data.objects.new(name, mesh)
    link_obj(obj)
    obj.location = loc
    obj.rotation_euler = (
        (0.0, math.pi / 2, 0.0) if axis == "X" else (math.pi / 2, 0.0, 0.0) if axis == "Y" else (0.0, 0.0, 0.0)
    )
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent

    bm = bmesh.new()
    addendum = max(0.007, radius * 0.11)
    r_root = radius - addendum * 0.65
    r_tip = radius + addendum * 0.65
    hz = thickness * 0.5
    pts = []
    n_step = teeth * 4
    for i in range(n_step):
        a = 2.0 * math.pi * i / n_step
        phase = i % 4
        r = r_root if phase in (0, 3) else r_tip
        pts.append((r * math.cos(a), r * math.sin(a)))

    top_v = [bm.verts.new((x, y, hz)) for x, y in pts]
    bot_v = [bm.verts.new((x, y, -hz)) for x, y in pts]
    bm.faces.new(top_v)
    bm.faces.new(list(reversed(bot_v)))
    for i in range(n_step):
        j = (i + 1) % n_step
        bm.faces.new((top_v[i], top_v[j], bot_v[j], bot_v[i]))
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    apply_box_uv(obj, uv_scale=0.9)
    if mat_hub:
        make_cyl(f"{name}_Nucli", radius * 0.34, thickness * 1.35, (0, 0, 0), mat_hub, verts=16, parent=obj, bevel=0.002)
    return obj


def make_cam(name, r_base, r_lift, thickness, loc, mat, axis="X", rot_phase=0.0, parent=None):
    """Lleva excèntrica en forma de pera per a moviment alternatiu."""
    mesh = bpy.data.meshes.new(name + "_Mesh")
    obj = bpy.data.objects.new(name, mesh)
    link_obj(obj)
    obj.location = loc
    obj.rotation_euler = (
        (0.0, math.pi / 2, rot_phase)
        if axis == "X"
        else (math.pi / 2, rot_phase, 0.0)
        if axis == "Y"
        else (0.0, 0.0, rot_phase)
    )
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent

    bm = bmesh.new()
    n_seg = 36
    hz = thickness * 0.5
    top_v, bot_v = [], []
    for i in range(n_seg):
        a = 2.0 * math.pi * i / n_seg
        lobe = max(0.0, math.cos(a)) ** 2
        r = r_base + r_lift * lobe
        x, y = r * math.cos(a), r * math.sin(a)
        top_v.append(bm.verts.new((x, y, hz)))
        bot_v.append(bm.verts.new((x, y, -hz)))
    bm.faces.new(top_v)
    bm.faces.new(list(reversed(bot_v)))
    for i in range(n_seg):
        j = (i + 1) % n_seg
        bm.faces.new((top_v[i], top_v[j], bot_v[j], bot_v[i]))
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    apply_box_uv(obj, uv_scale=0.9)
    set_smooth(obj)
    return obj


def make_shuttle(name, loc, mat_wood, mat_tip, mat_yarn, scale=1.0, parent=None):
    """Barqueta llançadora històrica amb puntes metàl·liques i canilla de trama vermella."""
    root = add_empty(name, loc, parent=parent)
    body = make_box(f"{name}_Cos", (0.24 * scale, 0.056 * scale, 0.044 * scale), (0, 0, 0), mat_wood, parent=root, bevel=0.008)
    _ = body
    make_cone(
        f"{name}_PuntaEsq",
        0.025 * scale,
        0.003 * scale,
        0.075 * scale,
        (-0.145 * scale, 0, 0),
        mat_tip,
        rot=(0, -math.pi / 2, 0),
        parent=root,
        bevel=0.0,
    )
    make_cone(
        f"{name}_PuntaDreta",
        0.025 * scale,
        0.003 * scale,
        0.075 * scale,
        (0.145 * scale, 0, 0),
        mat_tip,
        rot=(0, math.pi / 2, 0),
        parent=root,
        bevel=0.0,
    )
    # Canilla interior de fil de trama vermell
    make_cyl(
        f"{name}_Canilla",
        0.017 * scale,
        0.13 * scale,
        (0.0, 0.0, 0.012 * scale),
        mat_yarn,
        rot=(0.0, math.pi / 2, 0.0),
        verts=16,
        parent=root,
        bevel=0.004,
    )
    return root


def make_cutaway_cyl(
    name,
    r_in,
    r_out,
    height,
    loc,
    mat,
    start_ang=math.pi * 0.35,
    end_ang=math.pi * 2.15,
    segs=36,
    rot=(0, 0, 0),
    parent=None,
    capped=True,
):
    """Cilindre gruixut seccionat angularment per mostrar l'interior (calderes, cilindres, forns)."""
    mesh = bpy.data.meshes.new(name + "_Mesh")
    obj = bpy.data.objects.new(name, mesh)
    link_obj(obj)
    obj.location = loc
    obj.rotation_euler = rot
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent

    bm = bmesh.new()
    hz = height * 0.5
    ang_span = end_ang - start_ang
    n = max(6, segs)
    bot_in, bot_out, top_in, top_out = [], [], [], []
    for i in range(n + 1):
        a = start_ang + ang_span * (i / n)
        ca, sa = math.cos(a), math.sin(a)
        bot_in.append(bm.verts.new((r_in * ca, r_in * sa, -hz)))
        bot_out.append(bm.verts.new((r_out * ca, r_out * sa, -hz)))
        top_in.append(bm.verts.new((r_in * ca, r_in * sa, hz)))
        top_out.append(bm.verts.new((r_out * ca, r_out * sa, hz)))

    for i in range(n):
        j = i + 1
        bm.faces.new((bot_out[i], bot_out[j], top_out[j], top_out[i]))
        bm.faces.new((top_in[i], top_in[j], bot_in[j], bot_in[i]))
        bm.faces.new((top_out[i], top_out[j], top_in[j], top_in[i]))
        bm.faces.new((bot_in[i], bot_in[j], bot_out[j], bot_out[i]))

    if capped and abs(ang_span - 2.0 * math.pi) > 1e-3:
        bm.faces.new((bot_in[0], bot_out[0], top_out[0], top_in[0]))
        bm.faces.new((top_in[-1], top_out[-1], bot_out[-1], bot_in[-1]))

    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    apply_box_uv(obj, uv_scale=0.65)
    set_smooth(obj)
    return obj


def make_curve_tube(name, points, radius, mat, bevel_res=6, closed=False, parent=None):
    """Tub continu al llarg d'una llista de punts 3D."""
    curve_data = bpy.data.curves.new(name=name + "_Curve", type="CURVE")
    curve_data.dimensions = "3D"
    curve_data.bevel_depth = radius
    curve_data.bevel_resolution = bevel_res
    spline = curve_data.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for i, pt in enumerate(points):
        spline.points[i].co = (pt[0], pt[1], pt[2], 1.0)
    spline.use_cyclic_u = closed
    obj = bpy.data.objects.new(name, curve_data)
    link_obj(obj)
    obj.data.materials.append(mat)
    if parent:
        obj.parent = parent
    return obj


def make_torus(name, major_r, minor_r, loc, mat, rot=(0, 0, 0), major_segs=32, minor_segs=14, parent=None):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major_r,
        minor_radius=minor_r,
        major_segments=major_segs,
        minor_segments=minor_segs,
        location=loc,
        rotation=rot,
    )
    obj = bpy.context.active_object
    obj.name = name
    apply_box_uv(obj, uv_scale=0.8)
    obj.data.materials.append(mat)
    set_smooth(obj)
    if parent:
        obj.parent = parent
    return obj


def add_shadow_floor(z=0.0, size=14.0):
    bpy.ops.mesh.primitive_plane_add(size=size, location=(0.0, 0.0, z))
    pl = bpy.context.active_object
    pl.name = "SombraTerra"
    pl.is_shadow_catcher = True
    return pl


def setup_lighting(cam_loc, target, lens=44.0):
    world = bpy.data.worlds.new("TallerFons")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = hex_rgba("#f7f1e1", 1.0)
    bg.inputs["Strength"].default_value = 0.85

    def add_light(name, ltype, loc, rot, energy, size=6.0, color="#fffaf0"):
        ld = bpy.data.lights.new(name=name, type=ltype)
        ld.energy = energy
        ld.color = hex_rgba(color)[:3]
        if ltype == "AREA":
            ld.size = size
        lo = bpy.data.objects.new(name, ld)
        lo.location = loc
        lo.rotation_euler = rot
        link_obj(lo)
        return lo

    add_light("SolPrincipal", "SUN", (4.5, -5.0, 7.0), (0.78, 0.28, -0.58), 2.75, color="#fff5e0")
    add_light("OmplertDavant", "AREA", (-2.6, -6.5, 3.2), (1.25, 0.0, -0.38), 160.0, size=5.5, color="#eef4ff")
    add_light("ContraContorn", "AREA", (2.0, 5.2, 4.8), (-1.05, 0.0, 2.80), 130.0, size=4.8, color="#ffefd1")

    cam_data = bpy.data.cameras.new("Camara34")
    cam_data.lens = lens
    cam_obj = bpy.data.objects.new("Camara34", cam_data)
    cam_obj.location = Vector(cam_loc)
    cam_obj.rotation_euler = (Vector(target) - Vector(cam_loc)).to_track_quat("-Z", "Y").to_euler()
    link_obj(cam_obj)
    bpy.context.scene.camera = cam_obj
    return cam_obj


def set_linear_fcurves(objs):
    for obj in objs:
        act = obj.animation_data.action if obj.animation_data else None
        if not act:
            continue
        fcurves = getattr(act, "fcurves", None)
        if fcurves is None and hasattr(act, "layers"):
            fcurves = [
                fc
                for lay in act.layers
                for st in lay.strips
                for cb in getattr(st, "channelbags", [])
                for fc in cb.fcurves
            ]
        for fcu in fcurves or []:
            for kp in fcu.keyframe_points:
                kp.interpolation = "LINEAR"


def render_image(out_path, res_x=1200, res_y=760, samples=32, file_format="PNG"):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.cycles.max_bounces = 6
    scene.render.film_transparent = True
    scene.render.resolution_x = res_x
    scene.render.resolution_y = res_y
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = file_format
    scene.render.image_settings.color_mode = "RGBA"
    if file_format == "WEBP":
        scene.render.image_settings.quality = 88
    scene.view_settings.view_transform = "AgX"
    scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)


def render_closeup(out_path, cam_loc, target, lens=60.0, samples=28):
    cam = bpy.context.scene.camera
    cam.location = Vector(cam_loc)
    cam.rotation_euler = (Vector(target) - Vector(cam_loc)).to_track_quat("-Z", "Y").to_euler()
    cam.data.lens = lens
    render_image(out_path, res_x=960, res_y=600, samples=samples, file_format="PNG")


def project_anchors(anchors):
    scene = bpy.context.scene
    cam = scene.camera
    res = {}
    for k, pt in anchors.items():
        co = world_to_camera_view(scene, cam, Vector(pt))
        res[k] = [round(co.x * 100, 1), round((1.0 - co.y) * 100, 1)]
    return res


def anchors_to_gltf_3d(anchors):
    """Converteix (x, y, z) Z-up de Blender a (x, z, -y) Y-up de glTF / <model-viewer>."""
    return {k: [round(pt[0], 3), round(pt[2], 3), round(-pt[1], 3)] for k, pt in anchors.items()}


def export_glb_and_meta(prefix, glb_name, anchors, extra_meta=None):
    for obj in list(bpy.data.objects):
        if obj.name == "SombraTerra" or getattr(obj, "is_shadow_catcher", False):
            bpy.data.objects.remove(obj, do_unlink=True)
    glb_path = os.path.join(MODELS_DIR, glb_name)
    bpy.ops.export_scene.gltf(
        filepath=glb_path,
        export_format="GLB",
        export_animations=True,
        export_animation_mode="SCENE",
        export_anim_scene_split_object=False,
        export_yup=True,
    )
    meta = {
        "hotspots_3d": anchors_to_gltf_3d(anchors),
        "glb_bytes": os.path.getsize(glb_path),
    }
    if extra_meta:
        meta.update(extra_meta)
    meta_path = os.path.join(OUT_DIR, f"{prefix}_meta.json")
    with open(meta_path, "w", encoding="utf-8") as fh:
        json.dump(meta, fh, indent=2)
    print(f"{prefix.upper()}_3D_OK", json.dumps(meta))
