# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Vapor transatlàntic de rodes de pales (tipus SS Great Western, I. K. Brunel, 1838),
en tall longitudinal frontal mostrant carboneres, calderes, xemeneia,
màquina de vapor de palanques laterals (side-lever), roda de pales giratòria,
cabines, bodega i quatre pals amb veles auxiliars.
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
    link_obj,
    make_box,
    make_cone,
    make_curve_tube,
    make_cutaway_cyl,
    make_cyl,
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


def make_hull_section(name, m_hull, m_deck, m_rib):
    """Buc seccionat pel davant (-Y obert fins a y=-0.42) per mostrar la sala de màquines."""
    # Perfil longitudinal en X = -3.4 (popa) .. +3.4 (proa), quilla a Z = 0.18, coberta a Z = 1.48
    # Construïm fons + costat posterior + quadernes + coberta superior parcial
    make_box(f"{name}_Quilla", (6.50, 0.24, 0.14), (0.0, 0.0, 0.22), m_hull, bevel=0.015)
    # Proa inclinada
    make_box(f"{name}_RodaProa", (0.20, 0.24, 1.38), (3.32, 0.0, 0.88), m_hull, rot=(0, 0.22, 0), bevel=0.015)
    # Popa i timó
    make_box(f"{name}_Popa", (0.20, 0.72, 1.30), (-3.22, 0.16, 0.88), m_hull, rot=(0, -0.10, 0), bevel=0.015)
    make_box(f"{name}_Timo", (0.34, 0.07, 0.82), (-3.45, 0.0, 0.65), m_hull, bevel=0.008)

    # Costat posterior sencer (+Y = 0.68) i costat frontal retallat per baix (faldilla z=0.18..0.52)
    make_box(f"{name}_ParetDarrera", (6.10, 0.12, 1.32), (-0.05, 0.68, 0.88), m_hull, bevel=0.015)
    make_box(f"{name}_BordaFront", (5.90, 0.10, 0.28), (-0.05, -0.62, 0.34), m_hull, bevel=0.012)
    make_box(f"{name}_FonsBuc", (6.10, 1.32, 0.10), (-0.05, 0.04, 0.26), m_hull, bevel=0.01)

    # Quadernes de roure internes
    for qx in [-2.6 + 0.65 * i for i in range(9)]:
        make_box(f"{name}_Quad_{qx:.2f}", (0.08, 1.24, 0.08), (qx, 0.04, 0.33), m_rib, bevel=0.004)
        make_box(f"{name}_QuadDarr_{qx:.2f}", (0.08, 0.08, 1.18), (qx, 0.58, 0.88), m_rib, bevel=0.004)

    # Coberta superior (cobrint fins proa i popa) + bauprès davanter
    make_box(f"{name}_Coberta", (6.50, 0.84, 0.09), (0.04, 0.28, 1.52), m_deck, bevel=0.01)
    make_cyl(f"{name}_Baupres", 0.045, 1.05, (3.65, 0.12, 1.66), m_deck, rot=(0, 1.28, 0))
    # Mamparos interns separant carbonera, calderes, màquina i bodega
    for mx in (-2.05, -0.78, 1.35):
        make_box(f"{name}_Mamparo_{mx:.2f}", (0.07, 0.82, 1.12), (mx, 0.25, 0.90), m_rib, bevel=0.005)


def build_western(animate=True):
    clear_scene()

    p_wood = build_pbr_pair("WoodWst", "wood", bump_scale=1.6)
    p_wood_d = build_pbr_pair("WoodDWst", "wood_dark", bump_scale=1.8)
    p_iron = build_pbr_pair("IronWst", "castiron", bump_scale=2.0)
    p_brass = build_pbr_pair("BrassWst", "brass", bump_scale=1.2)
    p_copper = build_pbr_pair("CopperWst", "copper", bump_scale=1.4)
    p_cloth = build_pbr_pair("ClothWst", "cotton_cloth", bump_scale=1.4)

    m_hull = make_mat("BucRoureFosc", "#3a2518", metallic=0.0, roughness=0.72, pbr_pair=p_wood_d)
    m_deck = make_mat("CobertaPi", "#9a7347", metallic=0.0, roughness=0.68, pbr_pair=p_wood)
    m_iron = make_mat("FerroFosa", "#272c31", metallic=0.84, roughness=0.45, pbr_pair=p_iron)
    m_steel = make_mat("AcerPolit", "#c4ccd4", metallic=0.95, roughness=0.20)
    m_brass = make_mat("Llautó", "#d2a23d", metallic=0.92, roughness=0.25, pbr_pair=p_brass)
    m_copper = make_mat("CoureCalent", "#b8633b", metallic=0.88, roughness=0.30, pbr_pair=p_copper)
    m_sail = make_mat("VelaLona", "#e8dfc8", metallic=0.0, roughness=0.82, pbr_pair=p_cloth)
    m_red_band = make_mat("BandaVermella", "#993228", metallic=0.08, roughness=0.50)
    m_coal = make_mat("CarboMineral", "#17191c", metallic=0.06, roughness=0.88)
    m_fire = make_mat("BrasesCaldera", "#ff5918", metallic=0.0, roughness=0.5, emission_hex="#ff4508", emission_strength=2.6)
    m_water = make_mat("AiguaMar", "#236996", metallic=0.0, roughness=0.18, alpha=0.54)
    m_smoke = make_mat("FumVapor", "#c9d2d8", metallic=0.0, roughness=0.65, alpha=0.40)

    add_shadow_floor(z=0.0, size=18.0)

    # Làmina d'aigua marina en base rectangular
    make_box("MarBase", (8.0, 2.8, 0.36), (0.0, 0.05, 0.18), m_water, bevel=0.02)

    # 1. BUC SECCIONAT DEL GREAT WESTERN
    make_hull_section("GreatWestern", m_hull, m_deck, m_deck)

    # 2. CABINES (popa) I BODEGA (proa)
    make_box("CabinesPopa", (0.95, 0.65, 0.56), (-2.62, 0.24, 0.68), m_deck, bevel=0.008)
    make_box("ClaraboiaCabines", (0.65, 0.42, 0.20), (-2.55, 0.25, 1.66), m_deck, bevel=0.008)
    for bi, (bx, by, bz, sz) in enumerate(
        [(2.05, 0.18, 0.58, (0.55, 0.48, 0.42)), (2.65, 0.20, 0.54, (0.45, 0.42, 0.34))]
    ):
        make_box(f"CaixaCarrega_{bi}", sz, (bx, by, bz), m_deck, bevel=0.01)

    # 3. CARBONERES I CALDERES (x = -1.95 .. -0.80 i -0.72 .. +0.05)
    for ci, (cx, cy, cz, cr) in enumerate(
        [(-1.68, 0.12, 0.48, 0.22), (-1.40, 0.20, 0.50, 0.24), (-1.15, 0.08, 0.46, 0.20), (-1.45, 0.05, 0.68, 0.18)]
    ):
        make_sphere(f"Carbo_{ci}", cr, (cx, cy, cz), m_coal, segs=12, rings=8)

    # Caldera marina seccionada pel davant
    make_box("CalderaCos", (0.78, 0.62, 0.92), (-0.36, 0.22, 0.86), m_iron, bevel=0.015)
    make_box("CalderaFogarObert", (0.52, 0.20, 0.34), (-0.36, -0.05, 0.58), m_fire, bevel=0.008)
    # Xemeneia passant sobre coberta
    make_cyl("XemeneiaCos", 0.16, 1.85, (-0.36, 0.22, 2.22), m_iron, bevel=0.006)
    make_cyl("XemeneiaBanda", 0.166, 0.26, (-0.36, 0.22, 2.68), m_red_band, bevel=0.004)
    g_fum = add_empty("FumVaixell", (-0.36, 0.22, 3.24))
    for si, (sx, sz, sr) in enumerate([(0, 0, 0.14), (-0.12, 0.16, 0.18), (-0.26, 0.34, 0.22)]):
        make_sphere(f"NuvolVaixell_{si}", sr, (sx, 0.0, sz), m_smoke, parent=g_fum)

    # Tub de vapor de la caldera cap al cilindre de la màquina de palanques laterals
    make_curve_tube("TubVaporMaq", [(-0.02, 0.16, 1.24), (0.35, 0.10, 1.32), (0.85, 0.05, 1.24)], 0.042, m_copper)

    # 4. MÀQUINA DE PALANQUES LATERALS (SIDE-LEVER ENGINE, x = 0.25 .. 1.25)
    # Cilindre vertical a x = 0.92, y = 0.06, z = 0.86 (seccionat pel davant)
    mcx, mcy, mcz = 0.92, 0.06, 0.88
    make_cutaway_cyl(
        "CilindreSideLever",
        0.18,
        0.24,
        0.64,
        (mcx, mcy, mcz),
        m_brass,
        start_ang=-0.12 * math.pi,
        end_ang=1.12 * math.pi,
        segs=32,
    )
    make_cyl("BaseCilMaq", 0.26, 0.08, (mcx, mcy, 0.52), m_iron)

    # Marc triangular d'acer suportant l'eix del cigonyal amunt (x = 0.34, z = 1.36)
    crank_x, crank_z = 0.34, 1.38
    make_rod_between("SuportCig1", (0.14, -0.05, 0.38), (crank_x, -0.05, crank_z), 0.04, m_iron)
    make_rod_between("SuportCig2", (0.58, -0.05, 0.38), (crank_x, -0.05, crank_z), 0.04, m_iron)
    make_rod_between("SuportCig3", (0.14, 0.42, 0.38), (crank_x, 0.42, crank_z), 0.04, m_iron)
    make_rod_between("SuportCig4", (0.58, 0.42, 0.38), (crank_x, 0.42, crank_z), 0.04, m_iron)

    # Pivot de la palanca lateral inferior a x = 0.58, z = 0.50
    piv_x, piv_z = 0.58, 0.50
    make_cyl("SuportPivot", 0.08, 0.48, (piv_x, 0.14, piv_z - 0.08), m_iron, rot=(math.pi / 2, 0, 0))
    g_lever = add_empty("PalancaLateral", (piv_x, -0.06, piv_z))
    make_box("PalancaCos", (0.88, 0.055, 0.10), (0.0, 0.0, 0.0), m_steel, parent=g_lever, bevel=0.008)
    make_cyl("PalancaBoss", 0.08, 0.075, (0.0, 0.0, 0.0), m_brass, rot=(math.pi / 2, 0, 0), parent=g_lever)

    # Pistó i tija vertical + creuera que baixen per dins del cilindre fins a l'extrem dret de la palanca (dx = +0.34)
    g_piston = add_empty("PistoMaq", (mcx, mcy, mcz))
    make_cyl("CapPistoMaq", 0.17, 0.09, (0, 0, 0), m_iron, parent=g_piston)
    make_cyl("TijaPistoMaq", 0.028, 0.58, (0, 0, 0.28), m_steel, parent=g_piston)
    make_box("CreueraTopMaq", (0.14, 0.24, 0.05), (0, -0.04, 0.58), m_brass, parent=g_piston, bevel=0.005)
    # Vareta lateral que connecta la creuera superior amb l'extrem dret de la palanca lateral
    g_tirant_cil = add_empty("TirantCilindre", (0, 0, 0))
    make_cyl("TirantCilCos", 0.022, 0.96, (0, 0, -0.48), m_steel, parent=g_tirant_cil)

    # Biela vertical pujant de l'extrem esquerre de la palanca (dx = -0.34 -> x ≈ 0.24) fins al cigonyal (crank_x, crank_z)
    R_crank = 0.22
    L_biela = 0.88
    g_biela = add_empty("BielaMaq", (0, 0, 0))
    make_box("BielaMaqCos", (0.052, 0.045, L_biela), (0, 0, L_biela * 0.5), m_steel, parent=g_biela, bevel=0.005)
    make_cyl("CapBielaMaq1", 0.055, 0.065, (0, 0, 0), m_brass, rot=(math.pi / 2, 0, 0), parent=g_biela)
    make_cyl("CapBielaMaq2", 0.055, 0.065, (0, 0, L_biela), m_brass, rot=(math.pi / 2, 0, 0), parent=g_biela)

    # 5. EIX TRANSVERSAL, CIGONYAL I RODES DE PALES (al centre a x = 0.34, z = 1.38)
    g_eix_pales = add_empty("EixRodaPales", (crank_x, 0.0, crank_z))
    make_cyl("EixTransversal", 0.052, 2.30, (0, 0.08, 0), m_steel, rot=(math.pi / 2, 0, 0), parent=g_eix_pales)
    make_box("ManovellaMaq", (R_crank + 0.06, 0.05, 0.09), (R_crank * 0.5, -0.06, 0), m_iron, parent=g_eix_pales, bevel=0.005)
    make_cyl("BotoManMaq", 0.036, 0.08, (R_crank, -0.06, 0), m_brass, rot=(math.pi / 2, 0, 0), parent=g_eix_pales)

    # Roda de pales davant (y = -0.78) i darrere (y = +0.96)
    def build_paddle_wheel(pfx, y_pos):
        gw = add_empty(f"RodaPales_{pfx}", (0, y_pos, 0), parent=g_eix_pales)
        r_p = 1.04
        make_torus(f"CercolExt_{pfx}", r_p, 0.022, (0, -0.14, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=gw)
        make_torus(f"CercolInt_{pfx}", r_p, 0.022, (0, 0.14, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=gw)
        make_torus(f"CercolMig_{pfx}", r_p * 0.65, 0.018, (0, 0.0, 0), m_iron, rot=(math.pi / 2, 0, 0), parent=gw)
        n_p = 12
        for k in range(n_p):
            a = 2.0 * math.pi * k / n_p
            ca, sa = math.cos(a), math.sin(a)
            make_rod_between(f"RaigP_{pfx}_{k}", (0, -0.14, 0), (r_p * ca, -0.14, r_p * sa), 0.018, m_iron, parent=gw)
            make_rod_between(f"RaigP2_{pfx}_{k}", (0, 0.14, 0), (r_p * ca, 0.14, r_p * sa), 0.018, m_iron, parent=gw)
            # Pala de fusta perpendicular al radi
            make_box(
                f"Pala_{pfx}_{k}",
                (0.032, 0.36, 0.20),
                (r_p * 0.94 * ca, 0.0, r_p * 0.94 * sa),
                m_deck,
                rot=(0, -a, 0),
                parent=gw,
                bevel=0.004,
            )
        return gw

    build_paddle_wheel("Front", -0.82)
    build_paddle_wheel("Darr", 0.96)
    # Tambor / caixa protectora de pales al costat posterior (deixem la frontal oberta per veure-la girar!)
    make_cutaway_cyl("CaixaPalesDarr", 1.12, 1.18, 0.44, (crank_x, 0.96, crank_z), m_hull, start_ang=-0.05 * math.pi, end_ang=1.05 * math.pi, rot=(math.pi / 2, 0, 0))

    # 6. QUATRE PALS AMB VELES AUXILIARS
    for mi, mx in enumerate((-2.35, -1.10, 1.38, 2.55)):
        h_mast = 2.45 if mi in (1, 2) else 2.15
        make_cyl(f"Pal_{mi}", 0.052, h_mast, (mx, 0.25, 1.52 + h_mast * 0.5), m_deck, bevel=0.004)
        for vy in (2.35, 3.05):
            make_cyl(f"Verga_{mi}_{vy:.1f}", 0.025, 0.95, (mx, 0.22, vy), m_deck, rot=(math.pi / 2, 0, 0))
            make_box(f"Vela_{mi}_{vy:.1f}", (0.04, 0.85, 0.42), (mx + 0.04, 0.22, vy - 0.22), m_sail, rot=(0, 0.12, 0), bevel=0.006)

    def apply_pose(p):
        theta = 2.0 * math.pi * p
        g_eix_pales.rotation_euler = (0.0, theta, 0.0)

        # Botó de manovella en (X, Z)
        kx = crank_x + R_crank * math.cos(theta)
        kz = crank_z - R_crank * math.sin(theta)

        # Oscil·lació de la palanca lateral (extrem esquerre a dx = -0.34)
        ang_lev = -0.45 * math.sin(theta)
        g_lever.rotation_euler = (0.0, ang_lev, 0.0)
        # Extrem esquerre i extrem dret de la palanca:
        lx = piv_x - 0.34 * math.cos(ang_lev)
        lz = piv_z + 0.34 * math.sin(ang_lev)
        rx = piv_x + 0.34 * math.cos(ang_lev)
        rz = piv_z - 0.34 * math.sin(ang_lev)

        # Biela entre extrem esquerre de palanca i manovella
        g_biela.location = (lx, -0.06, lz)
        v_b = Vector((kx - lx, 0.0, kz - lz))
        g_biela.rotation_euler = (0.0, math.atan2(v_b.x, v_b.z), 0.0)
        g_biela.scale = (1.0, 1.0, v_b.length / L_biela)

        # Pistó puja i baixa en sincronia amb l'extrem dret de la palanca
        dz_p = rz - piv_z
        g_piston.location = (mcx, mcy, mcz + dz_p)
        g_tirant_cil.location = (mcx, -0.06, mcz + dz_p + 0.58)
        g_fum.location = (-0.36, 0.22, 3.24 + 0.06 * math.sin(theta * 2.0))

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_eix_pales, g_lever, g_biela, g_piston, g_tirant_cil, g_fum]
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

    cam_loc = (0.0, -9.80, 3.25)
    target = (0.05, 0.10, 1.80)
    setup_lighting(cam_loc, target, lens=40.0)

    anchors = {
        "carbonera": (-1.45, -0.05, 0.65),
        "calderes": (-0.36, -0.08, 0.88),
        "xemeneia": (-0.36, 0.12, 2.72),
        "maquina": (0.85, -0.18, 0.92),
        "roda": (0.34, -0.92, 1.45),
        "veles": (1.38, 0.15, 2.85),
        "cabines": (-2.62, -0.10, 0.85),
        "carrega": (2.25, -0.05, 0.72),
    }

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
    render_image(os.path.join(out_dir, "western-muntada.png"), res_x=1200, res_y=760, samples=28)
    render_closeup(os.path.join(out_dir, "western-detall.png"), (0.45, -3.55, 1.55), (0.35, -0.15, 1.05), lens=48.0, samples=24)

    proj = project_anchors(anchors)
    export_glb_and_meta("western", "western.glb", anchors, extra_meta={"proj_2d": proj})


if __name__ == "__main__":
    build_western(animate=True)
