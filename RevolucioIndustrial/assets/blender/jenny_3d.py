# SPDX-License-Identifier: AGPL-3.0-or-later
"""
Generador 3D procedural (Blender 5.3 CLI) — rigor museogràfic i PBR:
Spinning Jenny de James Hargreaves (1764–1770, North Mill Museum, Belper).

Inclou:
  - Bastidor de roure envellit en trapezi inclinat amb travessers, escaires de ferro i carrils guia
  - Rampa inferior amb 10 bobines de metxa de cotó cardat i regleta guia de llautó
  - Carro mòbil de la pinça doble (pinca de fusta) sobre rodetes de llautó amb mordassa articulada
    que estreny les metxes en el recorregut d'estirament i s'obre en el retorn
  - Banc de 10 fusos verticals d'acer amb torteres de llautó, fusades còniques de fil i fil guia
    basculant per dirigir el plegat del fil
  - Gran roda lateral de fusta de 8 raigs amb maneta tornejada, corretja de cuir cap al tambor
    d'estany inferior i cordons sense fi fins als 10 fusos
  - 10 fils continus articulats que connecten metxes -> pinça mòbil -> punta dels fusos

Ús:
  blender -b -P assets/blender/jenny_3d.py
  blender -b -P assets/blender/jenny_3d.py -- --glb-only
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


def _make_dynamic_strand(name, mat, radius=0.0028, parent=None):
    """Segment extensible de longitud 1 al llarg de +Z per unir dos punts mòbils."""
    emp = add_empty(name, (0.0, 0.0, 0.0), parent=parent)
    make_cyl(f"{name}_Mesh", radius, 1.0, (0.0, 0.0, 0.5), mat, verts=8, parent=emp, bevel=0.0)
    return emp


def _aim_strand(emp, p0, p1):
    dx = p1[0] - p0[0]
    dy = p1[1] - p0[1]
    dz = p1[2] - p0[2]
    dist = math.sqrt(dx * dx + dy * dy + dz * dz)
    if dist < 1e-4:
        dist = 1e-4
    emp.location = p0
    # Eix +Z alineat cap a (dx, dy, dz) via angles d'Euler XYZ -> Rx(-atan2(dy, dz)) o quaternion
    emp.rotation_mode = "QUATERNION"
    from mathutils import Vector
    vec = Vector((dx, dy, dz))
    emp.rotation_quaternion = vec.to_track_quat("Z", "Y")
    emp.scale = (1.0, 1.0, dist)


def eval_jenny_state(p):
    """
    Cicle de 4 fases de la Spinning Jenny:
      0.00–0.12: pinça s'obre breument i deixa passar metxa nova prop dels fusos
      0.12–0.52: pinça tancada retrocedeix cap al filador estirant la metxa mentre la roda gira i torça
      0.52–0.66: breu inversió per descarregar l'espiral de la punta del fus + baixa el fil guia
      0.66–0.96: la pinça torna endavant i els fusos bobinen el fil torçut sobre les fusades
    """
    if p < 0.10:
        car_t = 0.0
        clamp_open = 1.0 - _seg(p, 0.05, 0.10)
        faller = 0.0
        wheel_rev = 0.20 * _seg(p, 0.0, 0.10)
    elif p < 0.52:
        car_t = _seg(p, 0.10, 0.52)
        clamp_open = 0.0
        faller = 0.0
        wheel_rev = 0.20 + 2.80 * _seg(p, 0.10, 0.52)
    elif p < 0.65:
        car_t = 1.0
        clamp_open = 0.0
        faller = _seg(p, 0.55, 0.65)
        wheel_rev = 3.00 - 0.35 * _seg(p, 0.52, 0.65)
    elif p < 0.94:
        car_t = 1.0 - _seg(p, 0.65, 0.94)
        clamp_open = _seg(p, 0.88, 0.94)
        faller = 1.0 - _seg(p, 0.86, 0.94)
        wheel_rev = 2.65 + 1.35 * _seg(p, 0.65, 0.94)
    else:
        car_t = 0.0
        clamp_open = 1.0
        faller = 0.0
        wheel_rev = 4.00

    return {
        "car_t": car_t,
        "clamp_open": clamp_open,
        "faller": faller,
        "wheel_ang": 2.0 * math.pi * wheel_rev,
        "spindle_ang": 2.0 * math.pi * wheel_rev * 5.0,
    }


def build_jenny_scene(animate=False):
    clear_scene()

    pbr_wood = build_pbr_pair("JnRoure", "wood", 256, 256, bump_scale=2.2)
    pbr_wood_dark = build_pbr_pair("JnRoureFosc", "wood_dark", 224, 224, bump_scale=2.1)
    pbr_stone = build_pbr_pair("JnPedra", "stone", 256, 256, bump_scale=2.4)
    pbr_iron = build_pbr_pair("JnFerro", "castiron", 224, 224, bump_scale=2.0)
    pbr_brass = build_pbr_pair("JnLlauto", "brass", 192, 192, bump_scale=0.9)
    pbr_leather = build_pbr_pair("JnCuir", "leather", 192, 192, bump_scale=2.0)
    pbr_cotton = build_pbr_pair("JnCoto", "cotton_cloth", 224, 224, bump_scale=2.6)

    m_stone = make_mat("Pedra", "#aea289", roughness=0.90, pbr_pair=pbr_stone, tex_scale=(1.1, 1.1), normal_strength=0.90)
    m_wood = make_mat("Roure", "#8e5c30", roughness=0.56, pbr_pair=pbr_wood, normal_strength=0.75)
    m_wood_dark = make_mat("RoureFosc", "#543218", roughness=0.64, pbr_pair=pbr_wood_dark, normal_strength=0.75)
    m_iron = make_mat("Ferro", "#31363c", metallic=0.84, roughness=0.44, pbr_pair=pbr_iron, normal_strength=0.65)
    m_steel = make_mat("Acer", "#c0c8d0", metallic=0.94, roughness=0.18)
    m_brass = make_mat("Llauto", "#d6a53a", metallic=0.92, roughness=0.22, pbr_pair=pbr_brass, normal_strength=0.35)
    m_tin = make_mat("Estany", "#a7afb5", metallic=0.88, roughness=0.32)
    m_leather = make_mat("Cuir", "#58341c", roughness=0.70, pbr_pair=pbr_leather, normal_strength=0.80)
    m_cotton = make_mat("CotoCru", "#efe7d2", roughness=0.88, pbr_pair=pbr_cotton, tex_scale=(2.2, 2.2), normal_strength=0.75)
    m_yarn = make_mat("FilCoto", "#e7d8b5", roughness=0.78)
    m_cord = make_mat("CordoCanem", "#9c8256", roughness=0.85)

    add_shadow_floor(z=0.0, size=12.0)

    # Sòcol del taller artesanal
    make_box("SocolTaller", (2.65, 2.55, 0.12), (0.08, 0.0, 0.06), m_stone, bevel=0.018)

    # --- 1. BASTIDOR TRAPEZOÏDAL DE ROURE ---
    # Front (filador) a Y = -0.86, zona dels fusos darrere a Y = +0.62
    g_frame = add_empty("Bastidor")
    for sx in (-0.72, 0.72):
        # Potes anteriors (baixes, Z=0.12..0.82) i posteriors (altes, Z=0.12..1.04)
        make_box(f"PotaDavant_{sx}", (0.085, 0.085, 0.70), (sx, -0.82, 0.47), m_wood_dark, parent=g_frame, bevel=0.008)
        make_box(f"PotaDarrere_{sx}", (0.085, 0.085, 0.92), (sx, 0.62, 0.58), m_wood_dark, parent=g_frame, bevel=0.008)
        for py in (-0.82, 0.62):
            make_box(f"Sabata_{sx}_{py}", (0.12, 0.12, 0.036), (sx, py, 0.138), m_iron, parent=g_frame, bevel=0.004)
        # Travessers laterals inferiors i mitjans (offset 4 mm en X per evitar coplanaritat)
        make_box(f"TravLatBaix_{sx}", (0.068, 1.44, 0.072), (sx, -0.10, 0.24), m_wood, parent=g_frame)
        # Llargs carrils inclinats superiors per on corre el carro de la pinça (des de Y=+0.58 Z=0.98 fins a Y=-0.84 Z=0.80)
        make_rod_between(f"CarrilSup_{sx}", (sx, 0.62, 0.99), (sx, -0.86, 0.79), 0.038, m_wood, verts=8, parent=g_frame)
        # Guia metàl·lica fina d'acer incrustada al cim del carril
        make_rod_between(f"GuiaAcer_{sx}", (sx, 0.56, 1.022), (sx, -0.82, 0.822), 0.008, m_steel, verts=8, parent=g_frame)
        # Tirants diagonals de rigidesa
        make_rod_between(f"Diagonal_{sx}", (sx, 0.58, 0.30), (sx, -0.78, 0.76), 0.024, m_wood_dark, verts=8, parent=g_frame)
        # Cargols de llautó als nusos
        for cy, cz in ((0.62, 0.96), (-0.82, 0.78), (0.62, 0.24), (-0.82, 0.24)):
            make_cyl(f"Cargol_{sx}_{cy}_{cz}", 0.008, 0.10, (sx, cy, cz), m_brass, rot=(0, math.pi / 2, 0), verts=8, parent=g_frame, bevel=0.0)

    # Travessers transversals
    make_box("BigaDavantBaix", (1.36, 0.068, 0.072), (0.0, -0.82, 0.24), m_wood, parent=g_frame)
    make_box("BigaDarrereBaix", (1.36, 0.068, 0.072), (0.0, 0.62, 0.24), m_wood, parent=g_frame)
    make_box("BigaDavantSup", (1.36, 0.072, 0.070), (0.0, -0.82, 0.75), m_wood_dark, parent=g_frame)
    make_box("BigaDarrereSup", (1.36, 0.075, 0.075), (0.0, 0.62, 0.99), m_wood_dark, parent=g_frame)

    # --- 2. RASTELLERA INFERIOR DE 10 BOBINES DE METXA ---
    n_sp = 10
    xs_sp = [-0.54 + i * (1.08 / (n_sp - 1)) for i in range(n_sp)]
    g_metxes = add_empty("RampaMetxes", (0.0, 0.0, 0.0), parent=g_frame)
    for sx in (-0.64, 0.64):
        make_rod_between(f"SuportRampa_{sx}", (sx, -0.45, 0.28), (sx, 0.35, 0.56), 0.022, m_wood_dark, verts=8, parent=g_metxes)
    make_cyl("EixMetxesBaix", 0.012, 1.32, (0.0, -0.22, 0.42), m_iron, rot=(0, math.pi / 2, 0), verts=14, parent=g_metxes)
    make_cyl("GuiaFilferroMetxes", 0.008, 1.30, (0.0, -0.05, 0.58), m_brass, rot=(0, math.pi / 2, 0), verts=12, parent=g_metxes)

    roving_tips = []
    for i, x in enumerate(xs_sp):
        make_cyl(f"NucliMetxa_{i}", 0.014, 0.102, (x, -0.22, 0.42), m_wood, rot=(0, math.pi / 2, 0), verts=12, parent=g_metxes)
        make_cyl(f"BobinaMetxa_{i}", 0.044, 0.078, (x, -0.22, 0.42), m_cotton, rot=(0, math.pi / 2, 0), verts=18, parent=g_metxes)
        for side_d in (-0.042, 0.042):
            make_cyl(f"ValonaMetxa_{i}_{side_d}", 0.048, 0.010, (x + side_d, -0.22, 0.42), m_wood_dark, rot=(0, math.pi / 2, 0), verts=16, parent=g_metxes)
        make_sphere(f"UllGuiaMetxa_{i}", 0.011, (x, -0.05, 0.58), m_brass, parent=g_metxes)
        roving_tips.append((x, -0.05, 0.585))

    # --- 3. BANC DE 10 FUSOS VERTICALS, TORTERES, TAMBOR D'ESTANY I FIL GUIA ---
    g_spindles_bank = add_empty("BancFusos", (0.0, 0.0, 0.0))
    # Regletes del pont de fusos (inclinats lleugerament cap endavant, base Y=0.58 Z=0.66, cap Y=0.50 Z=1.08)
    make_box("PontFusosBaix", (1.38, 0.075, 0.045), (0.0, 0.58, 0.65), m_wood_dark, parent=g_spindles_bank, bevel=0.004)
    make_box("PontFusosMig", (1.38, 0.065, 0.042), (0.0, 0.54, 0.86), m_wood, parent=g_spindles_bank, bevel=0.004)

    # Tambor d'estany inferior (Y=0.38, Z=0.54) mogut per la gran roda
    g_drum = add_empty("TamboCordes", (0.0, 0.38, 0.54), parent=g_spindles_bank)
    make_cyl("TamborEstany", 0.072, 1.18, (0.0, 0.0, 0.0), m_tin, rot=(0, math.pi / 2, 0), verts=28, parent=g_drum)
    make_cyl("EixTambor", 0.016, 1.54, (0.06, 0.0, 0.0), m_steel, rot=(0, math.pi / 2, 0), verts=16, parent=g_drum)
    make_cyl("PolitjaTambor", 0.055, 0.032, (0.80, 0.0, 0.0), m_brass, rot=(0, math.pi / 2, 0), verts=22, parent=g_drum)
    for sx in (-0.64, 0.64):
        make_box(f"SuportTambor_{sx}", (0.045, 0.075, 0.34), (sx, 0.38, 0.40), m_iron, parent=g_spindles_bank, bevel=0.004)

    spindle_rotors = []
    spindle_cops = []
    # Cada fus inclinat -0.18 rad cap endavant
    tilt_sp = 0.18
    for i, x in enumerate(xs_sp):
        sp_base = add_empty(f"FusBase_{i}", (x, 0.58, 0.67), parent=g_spindles_bank)
        sp_base.rotation_euler = (tilt_sp, 0.0, 0.0)
        make_cyl(f"CoixinetFus_{i}", 0.014, 0.022, (0.0, 0.0, 0.0), m_brass, verts=12, parent=sp_base)
        sp_rot = add_empty(f"FusRot_{i}", (0.0, 0.0, 0.0), parent=sp_base)
        make_cyl(f"TijaFus_{i}", 0.0065, 0.56, (0.0, 0.0, 0.28), m_steel, verts=10, parent=sp_rot, bevel=0.0)
        make_cyl(f"TorteraFus_{i}", 0.024, 0.018, (0.0, 0.0, 0.085), m_brass, verts=16, parent=sp_rot)
        cop = make_cone(f"Fusada_{i}", 0.025, 0.008, 0.16, (0.0, 0.0, 0.33), m_yarn, verts=16, parent=sp_rot)
        spindle_rotors.append(sp_rot)
        spindle_cops.append(cop)
        # Cordó sense fi del tambor a la tortera del fus
        make_rod_between(f"CordoFus_{i}", (x, 0.38, 0.60), (x, 0.56, 0.75), 0.0032, m_cord, verts=6, parent=g_spindles_bank)
        make_rod_between(f"CordoFusInf_{i}", (x, 0.38, 0.48), (x, 0.56, 0.74), 0.0032, m_cord, verts=6, parent=g_spindles_bank)

    # Fil guia basculant (faller wire) muntat al davant dels fusos
    g_faller = add_empty("FilGuiaPivot", (0.0, 0.43, 0.90), parent=g_spindles_bank)
    for sx in (-0.64, 0.64):
        make_box(f"BracGuia_{sx}", (0.020, 0.16, 0.022), (sx, -0.07, 0.0), m_iron, parent=g_faller, bevel=0.002)
    make_cyl("BarraFilGuia", 0.005, 1.28, (0.0, -0.14, 0.0), m_brass, rot=(0, math.pi / 2, 0), verts=10, parent=g_faller, bevel=0.0)

    # --- 4. CARRO MÒBIL DE LA PINÇA DOBLE (CLASP CARRIAGE) ---
    g_carriage = add_empty("PincaMobil", (0.0, 0.0, 0.0))
    # Travessa principal inferior de la pinça (sobre els carrils)
    make_box("PincaBase", (1.50, 0.092, 0.044), (0.0, 0.0, 0.022), m_wood, parent=g_carriage, bevel=0.004)
    for sx in (-0.72, 0.72):
        for wy in (-0.04, 0.04):
            make_cyl(f"RodetaPinca_{sx}_{wy}", 0.022, 0.020, (sx, wy, -0.012), m_brass, rot=(0, math.pi / 2, 0), verts=16, parent=g_carriage)
        make_box(f"MuntantPinca_{sx}", (0.036, 0.088, 0.095), (sx, 0.0, 0.075), m_iron, parent=g_carriage, bevel=0.003)
    # Mordassa superior articulada + mànec del filador
    g_jaw = add_empty("PincaMordassa", (0.0, 0.035, 0.052), parent=g_carriage)
    make_box("MordassaBarra", (1.42, 0.068, 0.036), (0.0, -0.035, 0.018), m_wood_dark, parent=g_jaw, bevel=0.004)
    make_box("ManecPinca", (0.28, 0.036, 0.036), (0.0, -0.09, 0.030), m_wood, parent=g_jaw, bevel=0.006)
    make_cyl("PalancaMordassa", 0.009, 0.14, (-0.36, -0.04, 0.055), m_brass, rot=(0.55, 0, 0), verts=10, parent=g_jaw)

    # --- 5. GRAN RODA MOTRIU LATERAL (DRETA) AMB MANETA I CORRETJA ---
    g_wheel_grp = add_empty("TransmissioRoda")
    make_box("PeuRodaExt", (0.22, 0.56, 0.085), (0.86, 0.05, 0.162), m_wood_dark, parent=g_wheel_grp, bevel=0.005)
    make_rod_between("MuntantRodaA", (0.86, -0.14, 0.18), (0.86, 0.02, 0.76), 0.048, m_wood, verts=8, parent=g_wheel_grp)
    make_rod_between("MuntantRodaB", (0.86, 0.24, 0.18), (0.86, 0.02, 0.76), 0.048, m_wood, verts=8, parent=g_wheel_grp)
    make_box("CoixinetRoda", (0.075, 0.095, 0.075), (0.86, 0.02, 0.76), m_iron, parent=g_wheel_grp, bevel=0.004)

    g_wheel = make_spoked_wheel("GranRoda", 0.36, 0.042, 8, (0.80, 0.02, 0.76), m_wood, mat_hub=m_brass, axis="X", parent=g_wheel_grp)
    # Maneta de fusta per fer girar la roda amb la mà dreta
    make_cyl("BracManeta", 0.012, 0.14, (0.085, 0.0, 0.15), m_iron, rot=(0, math.pi / 2, 0), verts=10, parent=g_wheel)
    make_cyl("EmpunyaduraManeta", 0.018, 0.12, (0.145, 0.0, 0.21), m_wood_dark, rot=(0, math.pi / 2, 0), verts=14, parent=g_wheel)

    # Corretja sense fi de cuir entre la Gran Roda (Y=0.02, Z=0.76, R=0.36) i la politja del tambor (Y=0.38, Z=0.54, R=0.055)
    make_rod_between("CorretjaRodaSup", (0.80, -0.02, 1.115), (0.80, 0.36, 0.595), 0.010, m_leather, verts=8, parent=g_wheel_grp)
    make_rod_between("CorretjaRodaInf", (0.80, 0.08, 0.405), (0.80, 0.40, 0.485), 0.010, m_leather, verts=8, parent=g_wheel_grp)

    # --- 6. 10 FILS CONTINUS (METXA -> PINÇA -> FUS) ---
    g_strands = add_empty("Fils")
    strands_back = []
    strands_front = []
    for i in range(n_sp):
        strands_back.append(_make_dynamic_strand(f"FilDarrere_{i}", m_cotton, radius=0.0032, parent=g_strands))
        strands_front.append(_make_dynamic_strand(f"FilDavant_{i}", m_yarn, radius=0.0024, parent=g_strands))

    # Posició en repòs de la punta del fus (offset local (0, 0, 0.55) rotada tilt_sp al voltant d'X)
    sp_tip_y = 0.58 - 0.55 * math.sin(tilt_sp)
    sp_tip_z = 0.67 + 0.55 * math.cos(tilt_sp)
    sp_cop_y = 0.58 - 0.36 * math.sin(tilt_sp)
    sp_cop_z = 0.67 + 0.36 * math.cos(tilt_sp)

    def apply_pose(p):
        st = eval_jenny_state(p)
        car_t = st["car_t"]
        # El carro llisca sobre el carril des de Y=+0.32 Z=0.985 fins a Y=-0.72 Z=0.845
        cy = 0.32 + (-0.72 - 0.32) * car_t
        cz = 0.985 + (0.845 - 0.985) * car_t
        tilt_rail = math.atan2(0.79 - 0.99, -0.86 - 0.62)  # inclinació del carril (~ -0.134 rad)
        g_carriage.location = (0.0, cy, cz)
        g_carriage.rotation_euler = (-tilt_rail, 0.0, 0.0)
        g_jaw.rotation_euler = (0.28 * st["clamp_open"], 0.0, 0.0)

        g_wheel.rotation_euler = (st["wheel_ang"], 0.0, 0.0)
        g_drum.rotation_euler = (st["spindle_ang"] * 0.45, 0.0, 0.0)
        for sp_rot in spindle_rotors:
            sp_rot.rotation_euler = (0.0, 0.0, st["spindle_ang"])

        # Fil guia pivota cap avall per abaixar el fil fins a la panxa de la fusada durant el bobinatge
        g_faller.rotation_euler = (-0.65 * st["faller"], 0.0, 0.0)

        # Actualitzar els 10 fils continus
        fy_end = sp_tip_y * (1.0 - st["faller"]) + sp_cop_y * st["faller"]
        fz_end = sp_tip_z * (1.0 - st["faller"]) + sp_cop_z * st["faller"]
        clamp_z = cz + 0.045
        for i, x in enumerate(xs_sp):
            p_clamp = (x, cy, clamp_z)
            _aim_strand(strands_back[i], roving_tips[i], p_clamp)
            _aim_strand(strands_front[i], p_clamp, (x, fy_end, fz_end))

    if animate:
        scene = bpy.context.scene
        scene.frame_start = 1
        scene.frame_end = 60
        anim_objs = [g_carriage, g_jaw, g_wheel, g_drum, g_faller] + spindle_rotors + strands_back + strands_front
        for fr in range(1, 61):
            p = (fr - 1) / 60.0
            apply_pose(p)
            for o in anim_objs:
                o.keyframe_insert(data_path="location", frame=fr)
                if o.rotation_mode == "QUATERNION":
                    o.keyframe_insert(data_path="rotation_quaternion", frame=fr)
                else:
                    o.keyframe_insert(data_path="rotation_euler", frame=fr)
                o.keyframe_insert(data_path="scale", frame=fr)
        set_linear_fcurves(anim_objs)
    else:
        apply_pose(0.38)

    setup_lighting(cam_loc=(2.55, -2.55, 1.95), target=(0.05, -0.08, 0.72), lens=42.0)

    anchors = {
        "metxes": (-0.30, -0.22, 0.45),
        "pinca": (0.0, -0.18, 0.96),
        "fusos": (-0.25, 0.52, 1.12),
        "roda": (0.84, 0.02, 0.92),
        "corda": (0.62, 0.38, 0.56),
        "bastidor": (-0.72, -0.82, 0.62),
    }
    return anchors


def main():
    glb_only = "--glb-only" in sys.argv
    if not glb_only:
        anc = build_jenny_scene(animate=False)
        render_image(os.path.join(OUT_DIR, "jenny-muntada.png"), res_x=1200, res_y=760, samples=32)
        pts = project_anchors(anc)
        render_closeup(
            os.path.join(OUT_DIR, "jenny-detall.png"),
            cam_loc=(1.45, -1.35, 1.38),
            target=(0.05, 0.28, 0.92),
            lens=46.0,
            samples=28,
        )

    anc_glb = build_jenny_scene(animate=True)
    export_glb_and_meta(
        "jenny",
        "jenny.glb",
        anc_glb,
        extra_meta={"muntada_pct": pts} if not glb_only else None,
    )


if __name__ == "__main__":
    main()
