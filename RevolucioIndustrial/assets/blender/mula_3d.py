# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Generador 3D procedural (Blender 5.3 CLI) — rigor museogràfic i PBR:
Mula de filar de Samuel Crompton (1779 · tipus Hall i' th' Wood / Bolton Museum).

Inclou:
  - Bastidor fix de roure anglès amb rails d'acer cargolats al sòcol de pedra
  - Fileta inclinada amb 6 bobines de metxa de cotó i brins d'entrada
  - Tres parelles progressives de corrons d'estiratge (acanalats inferiors + cuir superiors + pesos)
    amb tren d'engranatges laterals de llautó (que gira en alimentar i S'ATURA en l'estiratge fi)
  - Carro mòbil de roure i ferro sobre 4 rodes amb pestanya rodant fidelment sobre els rails
  - 6 fusos inclinats (14°) sobre coixinets de llautó, cops cònics de cotó i corró de llauna
  - Fil-guia (faller wire) basculant de llautó que baixa abans del retorn per enrotllar el fil
  - 6 fils continus entre els corrons i la punta dels fusos sense trencament en tot el recorregut
  - Gran roda manual de comandament (volant de 8 raigs) amb manovella de fusta i corretja

Ús:
  blender -b -P assets/blender/mula_3d.py
  blender -b -P assets/blender/mula_3d.py -- --glb-only
"""

import math
import os
import sys

import bpy

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
if THIS_DIR not in sys.path:
    sys.path.insert(0, THIS_DIR)

from pbr_comu import (
    OUT_DIR,
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
    project_anchors,
    render_closeup,
    render_image,
    set_linear_fcurves,
    setup_lighting,
)


def _clamp(v):
    return max(0.0, min(1.0, v))


def _ease(v):
    v = _clamp(v)
    return v * v * (3.0 - 2.0 * v)


def _seg(p, a, b):
    return _ease((p - a) / (b - a))


def _mix(a, b, q):
    return a + (b - a) * q


def eval_mule_state(p):
    """4 fases del cicle de Crompton: alimentar -> estiratge fi (corrons aturats) -> fil-guia -> enrotllar."""
    fed = _seg(p, 0.00, 0.38)
    last = _seg(p, 0.38, 0.55)
    wind = _seg(p, 0.67, 0.96)
    car_x = (
        _mix(0.02, 0.72, fed)
        if p < 0.38
        else _mix(0.72, 0.92, last)
        if p < 0.55
        else 0.92
        if p < 0.67
        else _mix(0.92, 0.02, wind)
    )
    roller_ang = fed * 2.0 * math.pi * 1.4
    spindle_ang = (
        2.0 * math.pi * 4.0 * _seg(p, 0.00, 0.55)
        if p < 0.55
        else 2.0 * math.pi * (4.0 - 0.12 * _seg(p, 0.55, 0.62))
        if p < 0.67
        else 2.0 * math.pi * (3.88 + 1.8 * wind)
    )
    guide_drop = _seg(p, 0.55, 0.67) * (1.0 - _seg(p, 0.95, 1.00))
    cop_scale = 0.84 + 0.24 * wind
    return {
        "car_x": car_x,
        "roller_ang": roller_ang,
        "spindle_ang": spindle_ang,
        "guide_drop": guide_drop,
        "cop_scale": cop_scale,
    }


def build_mula_scene(animate=False):
    clear_scene()

    pbr_wood = build_pbr_pair("MulaRoure", "wood", 256, 256, bump_scale=2.2)
    pbr_wood_dark = build_pbr_pair("MulaRoureFosc", "wood_dark", 224, 224, bump_scale=2.0)
    pbr_stone = build_pbr_pair("MulaPedra", "stone", 256, 256, bump_scale=2.4)
    pbr_iron = build_pbr_pair("MulaFerro", "castiron", 224, 224, bump_scale=2.0)
    pbr_brass = build_pbr_pair("MulaLlauto", "brass", 192, 192, bump_scale=0.9)
    pbr_leather = build_pbr_pair("MulaCuir", "leather", 192, 192, bump_scale=2.0)
    pbr_cotton = build_pbr_pair("MulaCoto", "cotton_cloth", 224, 224, bump_scale=2.0)

    m_stone = make_mat("Pedra", "#aea389", roughness=0.90, pbr_pair=pbr_stone, tex_scale=(1.1, 1.1), normal_strength=0.90)
    m_wood = make_mat("Roure", "#8e5c30", roughness=0.58, pbr_pair=pbr_wood, tex_scale=(1.0, 1.0), normal_strength=0.75)
    m_wood_dark = make_mat("RoureFosc", "#5a371a", roughness=0.64, pbr_pair=pbr_wood_dark, tex_scale=(1.1, 1.1), normal_strength=0.75)
    m_iron = make_mat("Ferro", "#31363c", metallic=0.84, roughness=0.44, pbr_pair=pbr_iron, normal_strength=0.65)
    m_steel = make_mat("Acer", "#b8c0c8", metallic=0.92, roughness=0.22)
    m_tin = make_mat("Llauna", "#959fa6", metallic=0.88, roughness=0.30)
    m_brass = make_mat("Llauto", "#d4a43a", metallic=0.92, roughness=0.24, pbr_pair=pbr_brass, normal_strength=0.35)
    m_leather = make_mat("Cuir", "#4e2e19", roughness=0.72, pbr_pair=pbr_leather, normal_strength=0.80)
    m_cotton = make_mat("Coto", "#f2ead5", roughness=0.88, pbr_pair=pbr_cotton, normal_strength=0.55)
    m_yarn = make_mat("Fil", "#efe4c6", roughness=0.80)

    add_shadow_floor(z=0.0, size=14.0)

    # Sòcol del taller
    make_box("SocolTaller", (3.35, 2.25, 0.14), (0.10, 0.0, 0.07), m_stone, bevel=0.020)

    # --- 1. BASTIDOR FIX I RAILS D'ACER ---
    g_frame = add_empty("Bastidor")
    # Muntants de ferro i travessers sense cares coplanars (zero z-fighting)
    for px in (-1.12, -0.44):
        for py in (-0.58, 0.58):
            make_box(f"PilarFix_{px}_{py}", (0.10, 0.10, 1.24), (px, py, 0.76), m_wood_dark, parent=g_frame, bevel=0.008)
            make_box(f"PeuFix_{px}_{py}", (0.14, 0.14, 0.04), (px, py, 0.16), m_iron, parent=g_frame, bevel=0.004)
    for py in (-0.58, 0.58):
        make_box(f"TravLatFix_{py}", (0.64, 0.072, 0.078), (-0.78, py, 0.30), m_wood, parent=g_frame)
        make_box(f"TravSupFix_{py}", (0.72, 0.078, 0.085), (-0.78, py, 0.94), m_wood, parent=g_frame)
        # Mènsules laterals de ferro per als corrons d'estiratge
        make_box(f"SuportCorrons_{py}", (0.50, 0.050, 0.11), (-0.54, py, 1.02), m_iron, parent=g_frame, bevel=0.005)
    make_box("TravDarrereInf", (0.076, 1.08, 0.078), (-1.12, 0.0, 0.30), m_wood, parent=g_frame)
    make_box("TravDarrereSup", (0.076, 1.08, 0.082), (-1.12, 0.0, 1.34), m_wood, parent=g_frame)
    make_box("BigaCorrons", (0.28, 1.12, 0.065), (-0.54, 0.0, 0.93), m_wood_dark, parent=g_frame)

    # Rails de ferro sobre el sòcol (amb top a Z = 0.19)
    for ry in (-0.46, 0.46):
        make_box(f"RailBase_{ry}", (2.15, 0.075, 0.025), (0.52, ry, 0.152), m_iron, parent=g_frame, bevel=0.003)
        make_box(f"RailGuia_{ry}", (2.12, 0.032, 0.032), (0.52, ry, 0.175), m_steel, parent=g_frame, bevel=0.003)

    # --- 2. FILETA INCLINADA AMB 6 BOBINES DE METXA ---
    g_fileta = add_empty("Fileta")
    for sy in (-0.54, 0.54):
        make_box(f"MuntantFileta_{sy}", (0.08, 0.08, 0.62), (-0.98, sy, 1.48), m_wood, rot=(0.0, 0.16, 0.0), parent=g_fileta)
    make_box("PrestatgeFileta", (0.22, 1.16, 0.045), (-0.98, 0.0, 1.22), m_wood_dark, parent=g_fileta)
    make_box("BarraGuiaFileta", (0.035, 1.16, 0.035), (-0.90, 0.0, 1.68), m_wood, parent=g_fileta)

    y_slots = [-0.40 + k * 0.16 for k in range(6)]
    for idx, ys in enumerate(y_slots):
        make_cyl(f"EixBobina_{idx}", 0.012, 0.40, (-0.98, ys, 1.44), m_wood_dark, verts=12, parent=g_fileta)
        make_cyl(f"DiscBobInf_{idx}", 0.056, 0.016, (-0.98, ys, 1.26), m_wood, verts=18, parent=g_fileta)
        make_cyl(f"DiscBobSup_{idx}", 0.052, 0.016, (-0.98, ys, 1.62), m_wood, verts=18, parent=g_fileta)
        make_cyl(f"MetxaBobina_{idx}", 0.052, 0.33, (-0.98, ys, 1.44), m_cotton, verts=20, parent=g_fileta)
        # Metxa que baixa cap al primer parell de corrons
        make_rod_between(f"MetxaEntrada_{idx}", (-0.94, ys, 1.38), (-0.68, ys, 1.03), 0.009, m_cotton, verts=8, parent=g_fileta)

    # --- 3. TRES PARELLES DE CORRONS D'ESTIRATGE ---
    g_corrons = add_empty("Corrons")
    roller_xs = (-0.68, -0.53, -0.38)
    r_inf_objs, r_sup_objs, gear_objs = [], [], []
    for idx, rx in enumerate(roller_xs):
        ri = add_empty(f"CorroInf_{idx}", (rx, 0.0, 0.995), parent=g_corrons)
        make_cyl(f"CorroInfCil_{idx}", 0.026, 1.14, (0.0, 0.0, 0.0), m_steel, rot=(math.pi / 2, 0.0, 0.0), verts=20, parent=ri)
        rs = add_empty(f"CorroSup_{idx}", (rx, 0.0, 1.046), parent=g_corrons)
        make_cyl(f"CorroSupCil_{idx}", 0.025, 1.02, (0.0, 0.0, 0.0), m_leather, rot=(math.pi / 2, 0.0, 0.0), verts=20, parent=rs)
        make_cyl(f"CorroSupEix_{idx}", 0.012, 1.16, (0.0, 0.0, 0.0), m_brass, rot=(math.pi / 2, 0.0, 0.0), verts=14, parent=rs)
        # Engranatge lateral frontal visible ben separat per fora (Y = -0.66)
        make_cyl(f"CorroEixExt_{idx}", 0.014, 0.14, (rx, -0.60, 0.995), m_steel, rot=(math.pi / 2, 0.0, 0.0), verts=12, parent=g_corrons)
        gr = make_gear(f"EngranatgeCorro_{idx}", 0.054 - idx * 0.008, 0.022, 14 - idx * 2, (rx, -0.66, 0.995), m_brass, mat_hub=m_iron, axis="Y", parent=g_corrons)
        # Ganxo i contrapès sota el corró
        make_cyl(f"TirantPes_{idx}", 0.007, 0.24, (rx, -0.54, 0.92), m_iron, verts=8, parent=g_corrons, bevel=0.0)
        make_cyl(f"PesCorro_{idx}", 0.032, 0.09, (rx, -0.54, 0.78), m_iron, verts=16, parent=g_corrons)
        r_inf_objs.append(ri)
        r_sup_objs.append(rs)
        gear_objs.append(gr)
        if idx < 2:
            for ys in y_slots:
                make_rod_between(
                    f"MetxaEntre_{idx}_{ys:.2f}",
                    (rx, ys, 1.02),
                    (roller_xs[idx + 1], ys, 1.02),
                    0.0068 - idx * 0.0018,
                    m_yarn,
                    verts=6,
                    parent=g_corrons,
                )

    # --- 4. CARRO MÒBIL SOBRE RAILS + 4 RODES ---
    # El carro comença prop dels corrons (car_x = 0.02..0.92)
    g_carro = add_empty("Carro", (0.02, 0.0, 0.0))
    make_box("CarroTaulerInf", (0.46, 1.06, 0.065), (0.0, 0.0, 0.42), m_wood, parent=g_carro)
    make_box("CarroMarcSup", (0.42, 1.04, 0.055), (0.0, 0.0, 0.72), m_wood_dark, parent=g_carro)
    for sx in (-0.17, 0.17):
        for sy in (-0.48, 0.48):
            make_box(f"CarroMuntant_{sx}_{sy}", (0.055, 0.055, 0.34), (sx, sy, 0.56), m_wood, parent=g_carro)
            make_box(f"CartelaCarro_{sx}_{sy}", (0.068, 0.068, 0.068), (sx, sy, 0.42), m_iron, parent=g_carro, bevel=0.003)
    # Corró de llauna interior per transmetre gir als 6 fusos (buit pare per girar al voltant de Y!)
    g_tin = add_empty("CorroLlaunaRot", (0.04, 0.0, 0.56), parent=g_carro)
    make_cyl("CorroLlauna", 0.072, 0.94, (0.0, 0.0, 0.0), m_tin, rot=(math.pi / 2, 0.0, 0.0), verts=22, parent=g_tin)

    # 4 rodes amb raigs rodant damunt dels rails (Z rail top = 0.191 -> Z roda = 0.286, radi = 0.095)
    wheel_objs = []
    for wx in (-0.16, 0.16):
        for wy in (-0.46, 0.46):
            make_box(f"ForquillaRoda_{wx}_{wy}", (0.065, 0.045, 0.15), (wx, wy, 0.35), m_iron, parent=g_carro, bevel=0.004)
            w = make_spoked_wheel(f"RodaCarro_{wx}_{wy}", 0.095, 0.028, 6, (wx, wy, 0.286), m_iron, mat_hub=m_brass, axis="Y", parent=g_carro)
            wheel_objs.append(w)

    # --- 5. SIS FUSOS INCLINATS (14°), COPS I FIL-GUIA ---
    g_fusos = add_empty("Fusos", (0.0, 0.0, 0.0), parent=g_carro)
    spindle_objs = []
    cop_objs = []
    tilt = 0.244  # 14 graus cap enrere perquè el fil rellisqui per la punta en tòrcer
    for idx, ys in enumerate(y_slots):
        make_cyl(f"CoixinetFus_{idx}", 0.022, 0.032, (-0.15, ys, 0.69), m_brass, verts=14, parent=g_fusos)
        make_cyl(f"BridaFusSup_{idx}", 0.016, 0.022, (-0.125, ys, 0.78), m_brass, verts=14, parent=g_fusos)
        sp_tilt = add_empty(f"FusInclinat_{idx}", (-0.15, ys, 0.69), parent=g_fusos)
        sp_tilt.rotation_euler = (0.0, tilt, 0.0)
        sp_root = add_empty(f"Fus_{idx}", (0.0, 0.0, 0.0), parent=sp_tilt)
        make_cyl(f"FusEix_{idx}", 0.0085, 0.44, (0.0, 0.0, 0.22), m_steel, verts=14, parent=sp_root, bevel=0.0)
        make_cyl(f"FusPolitja_{idx}", 0.022, 0.020, (0.0, 0.0, 0.055), m_brass, verts=16, parent=sp_root)
        cop = make_cone(f"CopCoto_{idx}", 0.034, 0.012, 0.21, (0.0, 0.0, 0.23), m_cotton, verts=20, parent=sp_root)
        spindle_objs.append(sp_root)
        cop_objs.append(cop)

    # Fil-guia (faller wire) amb braços pivotats que baixen abans d'enrotllar
    g_faller = add_empty("FilGuia", (-0.08, 0.0, 0.74), parent=g_carro)
    for sy in (-0.48, 0.48):
        make_box(f"BracGuia_{sy}", (0.020, 0.022, 0.38), (-0.06, sy, 0.18), m_iron, rot=(0.0, 0.22, 0.0), parent=g_faller, bevel=0.002)
    make_cyl("FilferroGuia", 0.006, 0.98, (-0.02, 0.0, 0.36), m_brass, rot=(math.pi / 2, 0.0, 0.0), verts=10, parent=g_faller)
    make_box("PalancaGuia", (0.025, 0.035, 0.20), (-0.12, -0.50, 0.08), m_wood_dark, rot=(0.0, 0.65, 0.0), parent=g_faller)

    # --- 6. GRAN RODA MANUAL DE COMANDAMENT I CORRETGES ---
    g_roda = add_empty("RodaComandament", (0.0, 0.0, 0.0), parent=g_carro)
    make_box("SuportRodaA", (0.065, 0.055, 0.48), (0.16, -0.54, 0.56), m_wood_dark, parent=g_roda)
    make_box("SuportRodaB", (0.065, 0.055, 0.48), (0.22, -0.60, 0.56), m_iron, parent=g_roda)
    g_flywheel = make_spoked_wheel("GranRoda", 0.35, 0.038, 8, (0.20, -0.66, 0.74), m_iron, mat_hub=m_brass, axis="Y", parent=g_roda)
    make_cyl("ManovellaBase", 0.015, 0.08, (0.24, -0.04, 0.0), m_steel, rot=(math.pi / 2, 0.0, 0.0), verts=12, parent=g_flywheel)
    make_cyl("ManovellaPom", 0.021, 0.11, (0.24, -0.10, 0.0), m_wood_dark, rot=(math.pi / 2, 0.0, 0.0), verts=14, parent=g_flywheel)
    # Corretja visible des de la politja central de la roda fins al corró de llauna
    make_cyl("PolitjaMotorLlauna", 0.085, 0.040, (0.04, -0.56, 0.56), m_brass, rot=(math.pi / 2, 0.0, 0.0), verts=22, parent=g_roda)
    make_rod_between("CorretjaEsq", (0.12, -0.62, 0.76), (-0.02, -0.56, 0.58), 0.011, m_leather, verts=8, parent=g_roda)
    make_rod_between("CorretjaDreta", (0.26, -0.62, 0.68), (0.10, -0.56, 0.52), 0.011, m_leather, verts=8, parent=g_roda)

    # --- 7. SIS FILS CONTINUS ENTRE EL DARRER CORRO (X=-0.38,Z=1.02) I LA PUNTA DELS FUSOS ---
    yarn_objs = []
    nip_x, nip_z = -0.38, 1.02
    tip_local_dx = 0.44 * math.sin(tilt)
    tip_local_dz = 0.44 * math.cos(tilt)
    for idx, ys in enumerate(y_slots):
        yr = add_empty(f"FilEstirat_{idx}", (nip_x, ys, nip_z))
        # Cilindre unitari de longitud 1.0 al llarg de +X; escala X i rotació Y l'ancoren sempre al fus
        make_cyl(f"FilSeg_{idx}", 0.0038, 1.0, (0.50, 0.0, 0.0), m_yarn, rot=(0.0, math.pi / 2, 0.0), verts=6, parent=yr, bevel=0.0)
        yarn_objs.append(yr)

    def apply_pose(p):
        st = eval_mule_state(p)
        cx = st["car_x"]
        g_carro.location = (cx, 0.0, 0.0)

        for idx, (ri, rs, gr) in enumerate(zip(r_inf_objs, r_sup_objs, gear_objs)):
            mult = (1.0, 1.6, 3.2)[idx]
            ri.rotation_euler = (0.0, st["roller_ang"] * mult, 0.0)
            rs.rotation_euler = (0.0, -st["roller_ang"] * mult, 0.0)
            gr.rotation_euler = (0.0, st["roller_ang"] * mult, 0.0)

        w_rot = cx / 0.095
        for w in wheel_objs:
            w.rotation_euler = (0.0, w_rot, 0.0)

        g_flywheel.rotation_euler = (0.0, st["spindle_ang"] * 0.45, 0.0)
        g_tin.rotation_euler = (0.0, st["spindle_ang"] * 1.4, 0.0)

        for sp, cop in zip(spindle_objs, cop_objs):
            sp.rotation_euler = (0.0, 0.0, st["spindle_ang"])
            cop.scale = (st["cop_scale"], st["cop_scale"], 1.0)

        g_faller.rotation_euler = (0.0, -0.58 * st["guide_drop"], 0.0)

        # Actualitzar longitud i angle exactes dels 6 fils fins la punta mòbil de cada fus
        tip_x = cx - 0.15 + tip_local_dx
        tip_z = 0.69 + tip_local_dz - 0.14 * st["guide_drop"]
        dx = tip_x - nip_x
        dz = tip_z - nip_z
        dist = math.sqrt(dx * dx + dz * dz)
        ang_y = -math.atan2(dz, dx)
        for yr in yarn_objs:
            yr.rotation_euler = (0.0, ang_y, 0.0)
            yr.scale = (dist, 1.0, 1.0)

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = (
            [g_carro, g_flywheel, g_tin, g_faller]
            + r_inf_objs
            + r_sup_objs
            + gear_objs
            + wheel_objs
            + spindle_objs
            + cop_objs
            + yarn_objs
        )
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                o.keyframe_insert(data_path="rotation_euler", frame=fr)
                o.keyframe_insert(data_path="scale", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        # Posa en plena fase 2: carro sortit estiratge i 6 fils tensats
        apply_pose(0.46)

    setup_lighting(cam_loc=(1.45, -3.75, 2.15), target=(0.05, -0.05, 0.85), lens=44.0)

    anchors = {
        "fileta": (-0.98, -0.25, 1.48),
        "corrons": (-0.53, -0.45, 1.05),
        "carro": (0.48, -0.48, 0.44),
        "fus": (0.34, -0.18, 1.02),
        "bastidor": (-1.12, -0.58, 0.90),
        "roda": (0.60, -0.70, 0.92),
    }
    return anchors


def main():
    glb_only = "--glb-only" in sys.argv
    if not glb_only:
        anc = build_mula_scene(animate=False)
        render_image(os.path.join(OUT_DIR, "mula-muntada.png"), res_x=1200, res_y=760, samples=32)
        pts = project_anchors(anc)
        render_closeup(
            os.path.join(OUT_DIR, "mula-detall.png"),
            cam_loc=(0.28, -2.55, 1.56),
            target=(-0.10, -0.15, 0.98),
            lens=48.0,
            samples=28,
        )

    anc_glb = build_mula_scene(animate=True)
    export_glb_and_meta(
        "mula",
        "mula.glb",
        anc_glb,
        extra_meta={"muntada_pct": pts} if not glb_only else None,
    )


if __name__ == "__main__":
    main()
