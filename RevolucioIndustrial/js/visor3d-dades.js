/* Dades didàctiques del visor 3D interactiu (Newcomen, Watt, Llançadora volant, Spinning Jenny, Water Frame, Mula de filar i Cartwright) */
/* SPDX-License-Identifier: CC-BY-SA-4.0 */
window.RI_VISOR3D_DADES = {
  newcomen: {
    titol: 'La màquina atmosfèrica de Newcomen',
    subtitol: '1712 · Thomas Newcomen · Caldera directament sota el cilindre obert, raig d’aigua freda interior i força atmosfèrica per bombar aigua de les mines.',
    badge: 'BLENDER 5.3 · MODEL 3D',
    eyebrow: '1712 · Thomas Newcomen · La primera màquina de vapor útil',
    backHref: 'vapor.html#newcomen',
    backLabel: 'Tornar al capítol del vapor',
    glb: 'assets/models/newcomen.glb',
    poster: 'assets/blender/out/newcomen-muntada.png',
    cameraOrbit: '22deg 74deg 14.8m',
    cameraTarget: '0.55m 2.55m 0m',
    fov: '36deg',
    detallImg: 'assets/blender/out/newcomen-detall.png',
    detallAlt: 'Detall de la caldera de coure directament sota el cilindre obert, amb el dipòsit d’aigua freda elevat i els tubs d’injecció i desguàs',
    detallL: '1–5 · Caldera, cilindre obert i injecció freda',
    detallR: 'acosta al detall ↗',
    detallOrbit: '12deg 74deg 5.8m',
    detallTarget: '-1.95m 3.0m 0m',
    ideaTitol: 'Fer el buit dins el mateix cilindre',
    ideaHtml: 'El vapor es refreda amb un raig d’aigua freda <strong>dins del propi cilindre</strong>. L’aire exterior empeny el pistó avall, però a cada cicle s’ha de tornar a escalfar tot el metall: es malgasta molt de carbó.',
    flowBtnLabel: 'Curs del vapor i l’aigua freda',
    legendHot: 'Vapor càlid i aire atmosfèric',
    legendCold: 'Aigua freda d’injecció / desguàs',
    fonamentHtml: 'Reconstrucció didàctica de 1712: caldera tipus paller directament sota un cilindre obert amb segell d’aigua i injecció directa. Fonament: <a href="https://blog.sciencemuseum.org.uk/newcomen-engine/" target="_blank" rel="noopener">Science Museum · Newcomen 1712</a> i exemplar conservat del Black Country.',
    hotspots: {
      caldera: { num: 1, titol: 'Caldera i fogar sota el cilindre', text: 'Caldera de coure tipus paller muntada directament sobre el fogar de maó i sota la base del cilindre.', pos3d: [-1.65, 2.15, 0.9] },
      cilindre: { num: 2, titol: 'Cilindre obert per dalt', text: 'A diferència del de Watt, el cim és obert a l’aire: el cilindre s’escalfa amb vapor i es refreda amb aigua a cada cop.', pos3d: [-1.15, 4.05, 0.45] },
      piston: { num: 3, titol: 'Pistó amb segell d’aigua', text: 'Una fina làmina d’aigua freda al damunt segella l’ajust i evita que l’aire es coli quan es fa el buit a sota.', pos3d: [-1.65, 4.36, 0.45] },
      balanci: { num: 4, titol: 'Balancí simètric amb cadenes', text: 'La cadena només pot estirar: el contrapès de la bomba fa pujar el pistó i el buit l’estira cap avall.', pos3d: [0.2, 5.78, 0.22] },
      diposit: { num: 5, titol: 'Dipòsit d’aigua freda i injecció', text: 'Dipòsit elevat de plom que envia un raig directe a l’interior del cilindre per condensar el vapor de cop.', pos3d: [-3.28, 4.0, 0.42] },
      desguas: { num: 6, titol: 'Tub de desguàs i pou calent', text: 'Evacua l’aigua escalfada després de cada condensació cap a una tina de fusta lateral.', pos3d: [-3.28, 0.85, 0.36] },
      bombamina: { num: 7, titol: 'Vareta pesada i bomba de mina', text: 'El bloc de contrapès sobre la vareta compensa el pistó durant l’admissió de vapor i eleva l’aigua en el cop motriu.', pos3d: [4.25, 1.45, 0.28] }
    },
    flows: [
      { id: 'n-vap', cls: 'fl-hot', lbl: 'vapor ascendent', fases: [0], from: 'caldera', to: 'cilindre', dx1: 0, dy1: -10, dx2: 0, dy2: 12, ctrlDx: -14, ctrlDy: 0, lblDx: -26, lblDy: -4 },
      { id: 'n-inj', cls: 'fl-cold', lbl: 'raig d’aigua freda', fases: [1], from: 'diposit', to: 'cilindre', dx1: 8, dy1: 8, dx2: -10, dy2: 4, ctrlDx: 10, ctrlDy: 16, lblDx: 12, lblDy: 16 },
      { id: 'n-atm', cls: 'fl-eq', lbl: 'pressió aire (1 atm)', fases: [2], from: 'balanci', to: 'piston', dx1: -16, dy1: 4, dx2: 6, dy2: -14, ctrlDx: -12, ctrlDy: -16, lblDx: -10, lblDy: -10 },
      { id: 'n-des', cls: 'fl-cold', lbl: 'aigua condensada', fases: [3], from: 'cilindre', to: 'desguas', dx1: -12, dy1: 14, dx2: 10, dy2: -10, ctrlDx: -18, ctrlDy: 4, lblDx: -16, lblDy: 8 }
    ],
    fases: [
      {
        curt: 'Admissió de vapor',
        titol: 'El vapor omple el cilindre',
        desc: 'S’obre la vàlvula de la caldera: el vapor entra a baixa pressió mentre el pes de la vareta de la bomba fa pujar el pistó.',
        pMin: 0.00,
        pJump: 0.16,
        chips: [['Vapor: admès', 'oberta'], ['Injecció: tancada', 'tancada'], ['Vareta: baixa per pes', '']]
      },
      {
        curt: 'Raig d’aigua freda',
        titol: 'Injecció freda i condensació',
        desc: 'Es tanca el vapor i entra un raig d’aigua freda dins del cilindre; el vapor es condensa de cop i deixa buit a sota.',
        pMin: 0.34,
        pJump: 0.40,
        chips: [['Vapor: tancat', 'tancada'], ['Injecció: oberta', 'oberta'], ['Cilindre: es refreda', '']]
      },
      {
        curt: 'Cop atmosfèric',
        titol: 'L’aire empeny el pistó avall',
        desc: 'La pressió de l’atmosfera sobre el pistó obert el fa baixar amb força, bascula el balancí i puja l’aigua de la mina.',
        pMin: 0.47,
        pJump: 0.68,
        chips: [['Aire 1 atm: empeny', 'oberta'], ['Buit sota pistó', 'oberta'], ['Bomba: puja aigua', 'oberta']]
      },
      {
        curt: 'Desguàs i pèrdua tèrmica',
        titol: 'Desguàs i reescalfament',
        desc: 'Surt l’aigua tèbia pel desguàs. El cilindre ha quedat fred i el nou vapor n’haurà de recuperar tota la temperatura.',
        pMin: 0.84,
        pJump: 0.92,
        chips: [['Desguàs: evacua', 'oberta'], ['Pèrdua de calor alta', 'tancada']]
      }
    ]
  },

  watt: {
    titol: 'El cilindre calent, el condensador fred',
    subtitol: '1769 · James Watt · Màquina atmosfèrica perfeccionada amb camisa de vapor, tub d’equilibri i condensador separat.',
    badge: 'BLENDER 5.3 · MODEL 3D',
    eyebrow: '1769 · James Watt · Energia tèrmica',
    backHref: 'vapor.html#watt',
    backLabel: 'Tornar al capítol del vapor',
    glb: 'assets/models/watt.glb',
    poster: 'assets/blender/out/watt-muntada.png',
    cameraOrbit: '22deg 74deg 15.2m',
    cameraTarget: '0.45m 2.4m 0m',
    fov: '36deg',
    detallImg: 'assets/blender/out/watt-detall.png',
    detallAlt: 'Detall ampliat del cilindre calent seccionat al costat del condensador fred amb gotes de condensació',
    detallL: '2–3 · Cilindre calent → 6 · Condensador',
    detallR: 'acosta al detall ↗',
    detallOrbit: '8deg 72deg 6.8m',
    detallTarget: '-0.85m 2.05m 0m',
    ideaTitol: 'Separar el fred de la calor',
    ideaHtml: 'El vapor es refreda en un recipient <strong>separat</strong> (condensador). Així el cilindre es manté sempre calent i no es malgasta carbó reescalfant-lo a cada cicle (estalvi de fins al <strong>75 % de carbó</strong>).',
    flowBtnLabel: 'Curs d’aigua calenta i freda',
    legendHot: 'Vapor / aigua calenta',
    legendCold: 'Aigua freda / condensat',
    fonamentHtml: 'Reconstrucció didàctica de 1769: combina camisa anular, vàlvules d’equilibri i condensador seccionat. Fonament històric: <a href="https://blog.sciencemuseum.org.uk/james-watt-and-the-separate-condenser/" target="_blank" rel="noopener">Science Museum (condensador separat)</a> i <a href="https://collection.sciencemuseumgroup.org.uk/objects/co50928/watts-second-separate-condenser-1765-condensers" target="_blank" rel="noopener">model de 1765</a>.',
    hotspots: {
      caldera: { num: 1, titol: 'Caldera i fogar', text: 'Ara és a part del cilindre, reblonada en doble anell, amb arc de maó, vàlvula de seguretat amb contrapès, manòmetre i nivell d’aigua.', pos3d: [-3.95, 2.74, 0.88] },
      camisa: { num: 2, titol: 'Camisa de vapor', text: 'Doble paret amb vapor càlid envoltant el cilindre interior (talls vermells): manté les parets sempre calentes sense malgastar calor.', pos3d: [-2.28, 2.55, 0.45] },
      cilindre: { num: 3, titol: 'Cilindre tancat', text: 'Tapat per dalt amb premsaestopes i brida de 10 perns: el pistó l’empeny el vapor viu, no la pressió atmosfèrica.', pos3d: [-1.18, 3.02, 0.42] },
      piston: { num: 4, titol: 'Pistó i cadena articulada', text: 'Baixa quan té vapor a sobre i buit a sota, estirat per una cadena plana amb passadors sobre el sector circular del balancí.', pos3d: [-1.68, 2.606, 0.48] },
      equilibri: { num: 5, titol: 'Tub d’equilibri i vàlvules', text: 'Comunica la part superior i inferior del cilindre mitjançant tres vàlvules animades perquè el pistó pugui tornar a pujar.', pos3d: [-0.77, 2.58, 0.22] },
      condensador: { num: 6, titol: 'Condensador separat (seccionat)', text: 'La gran innovació de Watt (1769): recipient immers en la tina d’aigua freda amb injecció freda i gotes de condensació.', pos3d: [0.02, 1.30, 0.36] },
      bomba: { num: 7, titol: 'Bomba d’aire (seccionada)', text: 'Immersa al costat del condensador i moguda pel balancí: l’èmbol i la vàlvula de peu extreuen aigua i aire per mantenir el buit.', pos3d: [0.76, 1.40, 0.28] },
      balanci: { num: 8, titol: 'Balancí amb puntal i arcs', text: 'Biga de roure afuada amb tires laterals de ferro, perns passants, tirants i sectors circulars concèntrics (arch-heads).', pos3d: [0.85, 5.11, 0.22] },
      bombamina: { num: 9, titol: 'Bomba i canaleta de la mina', text: 'Aspira l’aigua del pou de carreus i l’aboca per la canaleta cap a la bassa, fent la mateixa feina amb molt menys carbó.', pos3d: [4.45, 1.35, 0.28] }
    },
    flows: [
      { id: 'w-hot', cls: 'fl-hot', lbl: 'vapor calent', fases: [0, 1], from: 'caldera', to: 'cilindre', dx1: 6, dy1: -34, dx2: -14, dy2: -32, ctrlDy: -22, lblDy: -6 },
      { id: 'w-exh', cls: 'fl-hot', lbl: 'vapor usat', fases: [0, 1], from: 'equilibri', to: 'condensador', dx1: -4, dy1: -10, dx2: -8, dy2: -12, ctrlDy: -16, lblDy: -6 },
      { id: 'w-eq', cls: 'fl-eq', lbl: 'retorn equilibri', fases: [2, 3], from: 'equilibri', to: 'piston', dx1: 14, dy1: -16, dx2: 12, dy2: 20, ctrlDx: 18, ctrlDy: 0, lblDx: 24, lblDy: 4 },
      { id: 'w-inj', cls: 'fl-cold', lbl: 'injecció freda', fases: [0, 1], from: 'condensador', dx1: -34, dy1: 14, dx2: 26, dy2: -10, ctrlDy: 6, lblDx: -24, lblDy: 15 },
      { id: 'w-cnd', cls: 'fl-cold', lbl: 'condensat', fases: [1, 3], from: 'condensador', to: 'bomba', dx1: 8, dy1: 12, dx2: 0, dy2: 12, ctrlDy: 4, lblDx: 22, lblDy: 16 },
      { id: 'w-min', cls: 'fl-cold', lbl: 'aigua pujada', fases: [0, 1], from: 'bombamina', dx1: 0, dy1: 22, dx2: 38, dy2: -30, ctrlDx: 6, ctrlDy: -22, lblDx: 18, lblDy: -6 }
    ],
    fases: [
      {
        curt: 'Vapor i buit',
        titol: 'Vapor i buit',
        desc: 'Entra vapor calent per dalt del pistó i l’escapament obert crea buit al condensador fred.',
        pMin: 0.00,
        pJump: 0.10,
        chips: [['Admissió: oberta', 'oberta'], ['Equilibri: tancada', 'tancada'], ['Escapament: oberta', 'oberta']]
      },
      {
        curt: 'Pistó avall',
        titol: 'Pistó avall',
        desc: 'La diferència de pressions empeny el pistó cap avall; el balancí puja l’aigua de la mina.',
        pMin: 0.23,
        pJump: 0.32,
        chips: [['Admissió: oberta', 'oberta'], ['Equilibri: tancada', 'tancada'], ['Escapament: oberta', 'oberta']]
      },
      {
        curt: 'Canvi de vàlvules',
        titol: 'Canvi de vàlvules',
        desc: 'Punt mort inferior: es tanquen admissió i escapament i s’obre el pas d’equilibri.',
        pMin: 0.48,
        pJump: 0.50,
        chips: [['Admissió: tancada', 'tancada'], ['Equilibri: oberta', 'oberta'], ['Escapament: tancada', 'tancada']]
      },
      {
        curt: 'Retorn d’equilibri',
        titol: 'Retorn d’equilibri',
        desc: 'El vapor passa per darrere el tub d’equilibri; el pistó puja i el cilindre continua calent.',
        pMin: 0.52,
        pJump: 0.75,
        chips: [['Admissió: tancada', 'tancada'], ['Equilibri: oberta', 'oberta'], ['Escapament: tancada', 'tancada']]
      }
    ]
  },

  llancadora: {
    titol: 'La llançadora volant de John Kay',
    subtitol: '1733 · John Kay · Caixes laterals, tacos de cuir sobre varetes d’acer i cordill en V que dupliquen la velocitat del teixit.',
    badge: 'BLENDER 5.3 · MODEL 3D',
    eyebrow: '1733 · John Kay · La primera peça clau del tèxtil',
    backHref: 'textil.html#llancadora',
    backLabel: 'Tornar al capítol del tèxtil',
    glb: 'assets/models/llancadora.glb',
    poster: 'assets/blender/out/llancadora-muntada.png',
    cameraOrbit: '36deg 72deg 4.8m',
    cameraTarget: '0.02m 0.92m 0.05m',
    fov: '36deg',
    detallImg: 'assets/blender/out/llancadora-detall.png',
    detallAlt: 'Detall de les caixes de llançadora, taco sobre vareta d’acer, pinta, cordill en V i teixit a ratlles',
    detallL: '3–4 · Caixa, taco i cordill en V',
    detallR: 'acosta al detall ↗',
    detallOrbit: '28deg 74deg 2.2m',
    detallTarget: '-0.35m 0.92m 0.05m',
    ideaTitol: 'Teixir més ample amb una sola mà',
    ideaHtml: 'Amb una sola estrebada del <strong>cordill central en V</strong>, un taco colpeja la llançadora amb punxes d’acer i la fa volar fins a l’altra caixa. Un sol teixidor fa peces molt més amples al <strong>doble de velocitat</strong> i deixa sense prou fil les filadores.',
    flowBtnLabel: 'Trajecte de la llançadora i calada',
    legendHot: 'Vol i cops de trama',
    legendCold: 'Moviment de lliços i pinta',
    fonamentHtml: 'Reconstrucció segons els models preservats de la col·lecció tèxtil britànica: <a href="https://collection.sciencemuseumgroup.org.uk/objects/co43043/kays-flying-shuttle-1733-model" target="_blank" rel="noopener">Science Museum Group (model de Kay, 1733)</a> i <a href="https://www.nts.org.uk/visit/places/weavers-cottage" target="_blank" rel="noopener">Weaver’s Cottage (Kilbarchan)</a>.',
    hotspots: {
      ordit: { num: 1, titol: 'Ordit i plegador posterior', text: 'Fils longitudinals tensats sobre el plegador de roure posterior i separats en dues capes (parells i senars) per obrir la calada.', pos3d: [-0.68, 0.92, -0.58] },
      llancadora: { num: 2, titol: 'Llançadora volant amb punxes', text: 'Cos de fusta dura acabat en punxes d’acer i canilla interior vermella que deixa el fil de trama en creuar la calada.', pos3d: [0.12, 0.92, -0.08] },
      caixes: { num: 3, titol: 'Caixes laterals i tacos de cuir', text: 'Prolonguen la pista del batà pels dos extrems: el taco de cuir llisca per una vareta d’acer i dispara la llançadora.', pos3d: [-1.22, 0.92, -0.08] },
      cordill: { num: 4, titol: 'Cordill en V i mànec central', text: 'Uneix tots dos tacos a un sol mànec penjant: el teixidor l’estreba amb una mà mentre amb l’altra mou el batà.', pos3d: [-0.02, 1.38, 0.08] },
      pinta: { num: 5, titol: 'Pinta i batà oscil·lant', text: 'Marc suspès des de dalt amb pues d’acer que guien la llançadora i baten cada passada contra la vora del teixit.', pos3d: [0.48, 1.06, -0.10] },
      tela: { num: 6, titol: 'Teixit acabat i plegador', text: 'La tela passa sobre el davantal frontal i s’enrotlla al plegador inferior amb roda de dents de llautó i manovella.', pos3d: [0.00, 0.90, 0.64] },
      bastidor: { num: 7, titol: 'Bastidor de roure anglès', text: 'Estructura sòlida de bigues ensamblades a caixa i metxa que absorbeix els cops del batà i la tensió de l’ordit.', pos3d: [-1.04, 1.48, 0.84] },
      llicos: { num: 8, titol: 'Lliços i pedals alternats', text: 'Dos marcs amb ullets connectats als pedals dels peus: pugen una meitat de l’ordit i baixen l’altra a cada passada.', pos3d: [-0.25, 1.18, -0.32] }
    },
    flows: [
      { id: 'll-vol', cls: 'fl-hot', lbl: 'vol d’anada i tornada', fases: [1, 3], from: 'caixes', to: 'pinta', dx1: 6, dy1: -8, dx2: 24, dy2: 14, ctrlDy: -40, lblDy: -10 },
      { id: 'll-estreb', cls: 'fl-hot', lbl: 'estrebada manual', fases: [1, 3], from: 'cordill', to: 'llancadora', dx1: 0, dy1: 4, dx2: 0, dy2: -8, ctrlDx: 10, ctrlDy: -4, lblDx: 28, lblDy: 0 },
      { id: 'll-calada', cls: 'fl-cold', lbl: 'pujada i baixada', fases: [0, 3], from: 'llicos', to: 'ordit', dx1: 0, dy1: -10, dx2: 0, dy2: 10, ctrlDx: -14, ctrlDy: 0, lblDx: -42, lblDy: 2 },
      { id: 'll-batuda', cls: 'fl-eq', lbl: 'batuda del teixit', fases: [2], from: 'pinta', to: 'tela', dx1: -8, dy1: 12, dx2: 8, dy2: -6, ctrlDy: 6, lblDy: 12 }
    ],
    fases: [
      {
        curt: 'Obrir calada',
        titol: 'Obrir calada',
        desc: 'Els pedals baixen i separen els lliços parells i senars per obrir el túnel triangular de l’ordit.',
        pMin: 0.00,
        pJump: 0.10,
        chips: [['Pedals: pas 1', 'oberta'], ['Taco: en repòs', 'tancada'], ['Batà: enrere', 'tancada']]
      },
      {
        curt: 'Estrebada i vol',
        titol: 'Estrebada i vol',
        desc: 'Una estrebada del mànec en V dispara el taco esquerre; la llançadora creua tota l’amplada d’un sol cop.',
        pMin: 0.16,
        pJump: 0.27,
        chips: [['Cordill: estrebada', 'oberta'], ['Llançadora: esq → dreta', 'oberta'], ['Batà: guia la pista', '']]
      },
      {
        curt: 'Batuda de pinta',
        titol: 'Batuda de pinta',
        desc: 'La mà lliure tira el batà cap endavant: la pinta d’acer premsa el nou fil de trama contra la tela.',
        pMin: 0.39,
        pJump: 0.48,
        chips: [['Pinta: bat endavant', 'oberta'], ['Trama: premuda', 'oberta'], ['Lliços: fixos', 'tancada']]
      },
      {
        curt: 'Canvi i retorn',
        titol: 'Canvi i retorn',
        desc: 'S’inverteixen els lliços per atrapar la trama i el taco dret torna la llançadora cap a la caixa inicial.',
        pMin: 0.56,
        pJump: 0.77,
        chips: [['Lliços: invertits', 'oberta'], ['Llançadora: dreta → esq', 'oberta'], ['Tela: s’enrotlla', '']]
      }
    ]
  },

  mula: {
    titol: 'La mula de filar (Mule-Jenny)',
    subtitol: '1779 · Samuel Crompton · Híbrid dels corrons d’Arkwright i el carro mòbil de Hargreaves per obtenir fil fi i resistent.',
    badge: 'BLENDER 5.3 · MODEL 3D',
    eyebrow: '1779 · Samuel Crompton · Revolució en la filatura',
    backHref: 'textil.html#mula',
    backLabel: 'Tornar al capítol del tèxtil',
    glb: 'assets/models/mula.glb',
    poster: 'assets/blender/out/mula-muntada.png',
    cameraOrbit: '22deg 72deg 4.65m',
    cameraTarget: '0.02m 0.85m 0.05m',
    fov: '36deg',
    detallImg: 'assets/blender/out/mula-detall.png',
    detallAlt: 'Detall dels tres parells de corrons d’estiratge amb engranatges de llautó, pesos, fusos inclinats i fil-guia',
    detallL: '2 · Corrons d’estiratge i 4 · Fusos',
    detallR: 'acosta al detall ↗',
    detallOrbit: '16deg 74deg 2.0m',
    detallTarget: '-0.48m 1.02m 0.05m',
    ideaTitol: 'Estirar en dues fases per no trencar el fil',
    ideaHtml: 'Primer els <strong>tres parells de corrons</strong> estiren la metxa abans d’entregar-la al carro; després els corrons s’aturen i el <strong>carro retrocedeix encara una mica</strong> mentre els fusos inclinatíssims hi afegeixen torsió extra. Així surt fil molt fi però capaç de suportar el teler mecànic.',
    flowBtnLabel: 'Pas del fil i recorregut del carro',
    legendHot: 'Trajecte i tensió del fil',
    legendCold: 'Anada i tornada del carro',
    fonamentHtml: 'Basat en la primera mula de fusta conservada de Samuel Crompton (c. 1780): <a href="https://boltonlams.co.uk/museum/crompton/" target="_blank" rel="noopener">Bolton Museum — Hall i’ th’ Wood</a>.',
    hotspots: {
      fileta: { num: 1, titol: 'Fileta de metxes de cotó', text: 'Prestatge inclinat amb 6 bobines de cotó cardat (rovings) que alimenten sense tensió els corrons posteriors.', pos3d: [-0.98, 1.48, 0.25] },
      corrons: { num: 2, titol: 'Tres parells de corrons i engranatges', text: 'Roden a velocitat creixent (1×, 1,6× i 3,2×) amb pesos penjants i rodes de llautó externes per aprimar la metxa.', pos3d: [-0.53, 1.05, 0.45] },
      carro: { num: 3, titol: 'Carro mòbil sobre rails d’acer', text: 'Plataforma amb quatre rodes de pestanya que s’allunya estirant el fil i torna cap als corrons per enrotllar-lo.', pos3d: [0.48, 0.44, 0.48] },
      fus: { num: 4, titol: 'Fusos inclinats, fusades i fil-guia', text: 'Inclinats uns 14° cap als corrons perquè el fil llisqui per la punta mentre torça; el fil-guia el baixa per fer la fusada.', pos3d: [0.34, 1.02, 0.18] },
      bastidor: { num: 5, titol: 'Bastidor fix de roure', text: 'Sosté la fileta superior i els suports de fosa dels corrons d’estiratge alineats amb els rails del terra.', pos3d: [-1.12, 0.90, 0.58] },
      roda: { num: 6, titol: 'Roda manual i corró de llauna', text: 'El filador gira la roda amb manovella i fa moure per corretja el corró de llauna longitudinal que acciona tots els fusos alhora.', pos3d: [0.60, 0.92, 0.70] }
    },
    flows: [
      { id: 'mu-fil', cls: 'fl-hot', lbl: 'estiratge de la metxa', fases: [0, 1], from: 'fileta', to: 'corrons', dx1: 6, dy1: 8, dx2: -8, dy2: -4, ctrlDy: -6, lblDy: -8 },
      { id: 'mu-torsio', cls: 'fl-hot', lbl: 'torsió fina a la punta', fases: [0, 1, 2], from: 'corrons', to: 'fus', dx1: 12, dy1: 0, dx2: -8, dy2: -6, ctrlDy: -14, lblDy: -8 },
      { id: 'mu-surt', cls: 'fl-cold', lbl: 'carro surt (1,5 m)', fases: [0, 1], from: 'carro', dx1: -28, dy1: 12, dx2: 56, dy2: 0, ctrlDy: 10, lblDx: 8, lblDy: 16 },
      { id: 'mu-torna', cls: 'fl-eq', lbl: 'retorn i enrotllament', fases: [2, 3], from: 'fus', to: 'corrons', dx1: -6, dy1: 18, dx2: 26, dy2: 24, ctrlDy: 24, lblDy: 18 }
    ],
    fases: [
      {
        curt: 'Estiratge i torsió',
        titol: 'Estiratge i torsió',
        desc: 'Els tres corrons giren entregant metxa estiramassada mentre el carro surt i els fusos apliquen la primera torsió.',
        pMin: 0.00,
        pJump: 0.20,
        chips: [['Corrons: en marxa', 'oberta'], ['Carro: s’allunya', 'oberta'], ['Fil-guia: amunt', 'tancada']]
      },
      {
        curt: 'Estiratge fi',
        titol: 'Estiratge fi (after-draft)',
        desc: 'Els corrons s’aturen de cop, però el carro avança encara uns centímetres tot torçant els trams gruixuts fins igualar el gruix.',
        pMin: 0.38,
        pJump: 0.47,
        chips: [['Corrons: aturats', 'tancada'], ['Carro: tram final', 'oberta'], ['Fusos: màxima torsió', 'oberta']]
      },
      {
        curt: 'Descàrrega i fil-guia',
        titol: 'Descàrrega i baixada del fil-guia',
        desc: 'Els fusos fan un breu gir invers per alliberar les espires de la punta i la barra del fil-guia prem el fil cap avall.',
        pMin: 0.55,
        pJump: 0.62,
        chips: [['Corrons: aturats', 'tancada'], ['Fusos: descarreguen', ''], ['Fil-guia: baixa', 'oberta']]
      },
      {
        curt: 'Enrotllament',
        titol: 'Retorn del carro i enrotllament',
        desc: 'El carro torna cap als corrons mentre els fusos recullen ordenadament el fil fi damunt de cada fusada cònica.',
        pMin: 0.67,
        pJump: 0.82,
        chips: [['Carro: torna endins', 'oberta'], ['Fusades: recullen fil', 'oberta'], ['Fil-guia: guia la capa', 'oberta']]
      }
    ]
  },

  jenny: {
    titol: 'La Spinning Jenny de Hargreaves',
    subtitol: '1764–1770 · James Hargreaves · Pinça mòbil sobre carrils inclinats i gran roda manual per filar deu fils alhora.',
    badge: 'BLENDER 5.3 · MODEL 3D',
    eyebrow: '1764–1770 · James Hargreaves · Multiplicar els fusos manuals',
    backHref: 'textil.html#jenny',
    backLabel: 'Tornar al capítol del tèxtil',
    glb: 'assets/models/jenny.glb',
    poster: 'assets/blender/out/jenny-muntada.png',
    cameraOrbit: '36deg 66deg 3.7m',
    cameraTarget: '0.05m 0.65m 0.05m',
    fov: '36deg',
    detallImg: 'assets/blender/out/jenny-detall.png',
    detallAlt: 'Detall de la pinça mòbil lliscant, les fusades còniques de fil, les torteres de llautó i el tambor inferior d’estany',
    detallL: '2–5 · Pinça, fusos i cordons de transmissió',
    detallR: 'acosta al detall ↗',
    detallOrbit: '42deg 64deg 2.0m',
    detallTarget: '0.05m 0.85m 0.25m',
    ideaTitol: 'Una sola mà mou molts fusos alhora',
    ideaHtml: 'La <strong>pinça de fusta</strong> substitueix els dits que retenen la metxa mentre la mà dreta gira la <strong>roda</strong>. Així un sol treballador estira, torça i plega múltiples fils al mateix temps sense energia hidràulica ni vapor.',
    flowBtnLabel: 'Recorregut de filatura i transmissió',
    legendHot: 'Rotació roda -> tambor -> fusos',
    legendCold: 'Estiratge de metxa a fusada',
    fonamentHtml: 'Reconstrucció didàctica basada en la patent de Hargreaves (1770) i l’exemplar conservat al <a href="https://lancashiremuseumsstories.wordpress.com/2020/05/29/james-hargreaves-and-the-spinning-jenny/" target="_blank" rel="noopener">North Mill Museum · Belper</a>.',
    hotspots: {
      metxes: { num: 1, titol: 'Bobines de metxa cardada', text: 'Prestatge inclinat amb 10 bobines de cotó tou encara sense tòrcer que passen per ulls de llautó cap a la pinça.', pos3d: [-0.3, 0.45, 0.22] },
      pinca: { num: 2, titol: 'Carro mòbil de la pinça', text: 'Llisca sobre rodetes de llautó al llarg dels carrils inclinats; quan es tanca i recula, aprima totes les metxes alhora.', pos3d: [0.0, 0.96, 0.18] },
      fusos: { num: 3, titol: 'Banc de 10 fusos i fil guia', text: 'Fusos d’acer inclinats amb fusades còniques i una barra de llautó basculant (faller wire) per repartir el fil plegat.', pos3d: [-0.25, 1.12, -0.52] },
      roda: { num: 4, titol: 'Gran roda manual amb maneta', text: 'Girada amb la mà dreta del filador; transmet el moviment multiplicat al tambor inferior d’estany.', pos3d: [0.84, 0.92, -0.02] },
      corda: { num: 5, titol: 'Tambor d’estany i cordes', text: 'El tambor cilíndric rep la corretja de la roda i reparteix el gir mitjançant cordills sense fi cap a cada tortera.', pos3d: [0.62, 0.56, -0.38] },
      bastidor: { num: 6, titol: 'Bastidor domèstic de roure', text: 'Estructura lleugera amb carrils inclinats que cap dins d’un taller domèstic sense necessitat de força hidràulica.', pos3d: [-0.72, 0.62, 0.82] }
    },
    flows: [
      { id: 'jn-metxa', cls: 'fl-cold', lbl: 'estiratge cap al fus', fases: [0, 1], from: 'metxes', to: 'pinca', dx1: 6, dy1: -10, dx2: -8, dy2: 10, ctrlDy: -10, lblDy: -6 },
      { id: 'jn-fil', cls: 'fl-cold', lbl: 'torsió en fus', fases: [1, 2], from: 'pinca', to: 'fusos', dx1: 6, dy1: -8, dx2: -10, dy2: 8, ctrlDy: -12, lblDy: -8 },
      { id: 'jn-roda', cls: 'fl-hot', lbl: 'corretja al tambor', fases: [1, 2, 3], from: 'roda', to: 'corda', dx1: -10, dy1: 8, dx2: 8, dy2: -8, ctrlDy: 10, lblDy: 8 },
      { id: 'jn-corda', cls: 'fl-hot', lbl: 'cordills als fusos', fases: [1, 3], from: 'corda', to: 'fusos', dx1: -12, dy1: -8, dx2: 14, dy2: 10, ctrlDx: 10, ctrlDy: -12, lblDx: 12, lblDy: -6 }
    ],
    fases: [
      {
        curt: 'Alimentar metxa',
        titol: 'Obertura de pinça i entrada de metxa',
        desc: 'La pinça s’obre breument prop dels fusos i deixa passar un tram nou de metxa tova de cotó des de les bobines inferiors.',
        pMin: 0.00,
        pJump: 0.06,
        chips: [['Pinça: oberta', 'oberta'], ['Carro: endavant', ''], ['Metxa: entra', 'oberta']]
      },
      {
        curt: 'Estirar i tòrcer',
        titol: 'Retrocés de pinça i torsió simultània',
        desc: 'La mordassa es tanca i el carro recula estirant els deu fils mentre la roda manual fa girar ràpidament tots els fusos.',
        pMin: 0.12,
        pJump: 0.34,
        chips: [['Pinça: tancada', 'tancada'], ['Roda: gira', 'oberta'], ['Fils: s’aprimen i torcen', 'oberta']]
      },
      {
        curt: 'Descarregar i fil-guia',
        titol: 'Breu inversió i baixada del fil-guia',
        desc: 'Un petit gir invers allibera l’espiral de la punta del fus i la barra del fil-guia prem els fils cap a la panxa de la fusada.',
        pMin: 0.52,
        pJump: 0.60,
        chips: [['Roda: breu inversió', ''], ['Fil-guia: baixa', 'oberta'], ['Carro: aturat', 'tancada']]
      },
      {
        curt: 'Plegar en fusades',
        titol: 'Retorn del carro i bobinatge',
        desc: 'El carro torna cap als fusos mentre la roda gira suavament i enrotlla els deu fils acabats damunt de cada fusada cònica.',
        pMin: 0.66,
        pJump: 0.80,
        chips: [['Carro: retorna', 'oberta'], ['Fusades: creixen', 'oberta']]
      }
    ]
  },

  water: {
    titol: 'El Water Frame d’Arkwright',
    subtitol: '1769–1775 · Richard Arkwright · Tres parells de corrons amb velocitat creixent, aletes giratòries i energia hidràulica en continu.',
    badge: 'BLENDER 5.3 · MODEL 3D',
    eyebrow: '1769–1775 · Richard Arkwright · El pas cap a la fàbrica',
    backHref: 'textil.html#water',
    backLabel: 'Tornar al capítol del tèxtil',
    glb: 'assets/models/water.glb',
    poster: 'assets/blender/out/water-muntada.png',
    cameraOrbit: '36deg 68deg 3.9m',
    cameraTarget: '-0.05m 0.92m 0.02m',
    fov: '36deg',
    detallImg: 'assets/blender/out/water-detall.png',
    detallAlt: 'Detall dels corrons d’estirament amb pesos de ferro, tren lateral d’engranatges i aletes en U girant sobre les bobines',
    detallL: '2–4 · Corrons d’estirament, engranatges i aletes',
    detallR: 'acosta al detall ↗',
    detallOrbit: '44deg 70deg 2.0m',
    detallTarget: '0.08m 1.05m 0.10m',
    ideaTitol: 'Estirar amb corrons i moure-ho amb aigua',
    ideaHtml: 'Tres parells de <strong>corrons</strong> giren cada cop més de pressa (1×, 1,6×, 3,2×) per aprimar la metxa sense mans. L’energia ve d’una <strong>roda hidràulica</strong> exterior i produeix un ordit molt fort de manera contínua.',
    flowBtnLabel: 'Camí del cotó i transmissió hidràulica',
    legendHot: 'Força hidràulica -> tambor -> corrons',
    legendCold: 'Estirament continu en aleta',
    fonamentHtml: 'Reconstrucció didàctica de 1775: bastidor vertical, pesos penjants sobre corrons, aletes en U i vaivé de bobines. Font: <a href="https://collection.sciencemuseumgroup.org.uk/objects/co44832/arkwrights-water-frame-1775" target="_blank" rel="noopener">Science and Industry Museum · Manchester</a>.',
    hotspots: {
      metxa: { num: 1, titol: 'Rastellera de bobines de metxa', text: 'Quatre grosses bobines superiors plenes de cotó cardat que baixen verticalment sense interrupcions cap als corrons.', pos3d: [-0.12, 1.68, -0.24] },
      corrons: { num: 2, titol: 'Corrons d’estirament i pesos', text: 'Tres parells d’acer estriat i cuir premuts per contrapesos penjants de ferro colat per evitar que les fibres rellissin.', pos3d: [0.12, 1.45, -0.02] },
      engranatges: { num: 3, titol: 'Tren lateral d’engranatges', text: 'Multiplica la velocitat de cada parell successiu (1×, 1,6× i 3,2×) perquè la metxa s’estiri progressivament.', pos3d: [0.59, 1.41, -0.02] },
      aleta: { num: 4, titol: 'Aletes en U i pont de vaivé', text: 'Cada aleta metàl·lica gira ràpidament per tòrcer el fil mentre el pont elevador puja i baixa les bobines per repartir-lo.', pos3d: [-0.12, 0.88, 0.27] },
      aigua: { num: 5, titol: 'Transmissió hidràulica inferior', text: 'Roda de pales al canaló, parell cònic cap a l’eix rei vertical i tambor d’estany amb cordons fins als fusos.', pos3d: [-0.98, 0.42, 0.0] },
      bastidor: { num: 6, titol: 'Bastidor tipus armari fabril', text: 'Màquina alta, pesant i contínua: massa gran per a una casa, obliga a reunir les filadores dins d’una fàbrica vora un riu.', pos3d: [0.54, 1.15, 0.42] }
    },
    flows: [
      { id: 'wf-estira', cls: 'fl-cold', lbl: 'estiratge 1× -> 3,2×', fases: [0, 1], from: 'metxa', to: 'corrons', dx1: 6, dy1: 8, dx2: -8, dy2: -8, ctrlDy: -6, lblDy: -6 },
      { id: 'wf-aleta', cls: 'fl-cold', lbl: 'torsió contínua', fases: [2, 3], from: 'corrons', to: 'aleta', dx1: -8, dy1: 12, dx2: 6, dy2: -14, ctrlDx: -12, ctrlDy: 4, lblDx: -18, lblDy: 0 },
      { id: 'wf-hid', cls: 'fl-hot', lbl: 'força d’aigua -> aletes', fases: [0, 2, 3], from: 'aigua', to: 'aleta', dx1: 12, dy1: -6, dx2: -10, dy2: 10, ctrlDy: 8, lblDy: 8 },
      { id: 'wf-eng', cls: 'fl-hot', lbl: 'reductor als corrons', fases: [1, 3], from: 'aigua', to: 'engranatges', dx1: 14, dy1: -10, dx2: -10, dy2: 14, ctrlDx: 20, ctrlDy: -16, lblDx: 12, lblDy: -8 }
    ],
    fases: [
      {
        curt: 'Alimentar corrons',
        titol: 'Entrada de metxa al primer parell',
        desc: 'Els contrapesos de ferro estrenyen els corrons revestits de cuir contra l’acer estriat per agafar la metxa amb fermesa.',
        pMin: 0.00,
        pJump: 0.14,
        chips: [['Metxa: entra', 'oberta'], ['Contrapesos: premen', 'oberta'], ['Corrons: 1×', '']]
      },
      {
        curt: 'Estiratge progressiu',
        titol: 'Acceleració 1× -> 1,6× -> 3,2×',
        desc: 'Cada parell de corrons gira més de pressa gràcies al tren d’engranatges lateral: les fibres llisquen i s’aprimen contínuament.',
        pMin: 0.25,
        pJump: 0.38,
        chips: [['Engranatges: 3,2×', 'oberta'], ['Estiratge: continu', 'oberta'], ['Sense aturades', 'oberta']]
      },
      {
        curt: 'Tòrcer amb aleta',
        titol: 'Aleta en U i vaivé de bobina',
        desc: 'El fil entra per l’ull de l’aleta giratòria, rep una torsió forta apta per a ordit i s’enrotlla sobre la bobina que puja i baixa.',
        pMin: 0.50,
        pJump: 0.62,
        chips: [['Aleta: gira ràpid', 'oberta'], ['Pont vaivé: puja/baixa', 'oberta'], ['Fil resistent (ordit)', 'oberta']]
      },
      {
        curt: 'Producció fabril',
        titol: 'Moviment hidràulic ininterromput',
        desc: 'L’eix rei vertical rep la força del molí d’aigua i manté sincronitzats alhora els quatre fusos i tots els corrons.',
        pMin: 0.75,
        pJump: 0.88,
        chips: [['Roda hidràulica: contínua', 'oberta'], ['Fàbrica: producció constant', 'oberta']]
      }
    ]
  },

  cartwright: {
    titol: 'El teler mecànic de Cartwright',
    subtitol: '1787–1790 · Edmund Cartwright · Corretja des de la fàbrica, reducció 2:1, lleves i bieles per teixir amb força hidràulica o de vapor.',
    badge: 'BLENDER 5.3 · MODEL 3D',
    eyebrow: '1787–1790 · Edmund Cartwright · Mecanització completa del teixit',
    backHref: 'textil.html#cartwright',
    backLabel: 'Tornar al capítol del tèxtil',
    glb: 'assets/models/cartwright.glb',
    poster: 'assets/blender/out/cartwright-muntada.png',
    cameraOrbit: '38deg 72deg 4.9m',
    cameraTarget: '0.15m 0.88m 0.05m',
    fov: '36deg',
    detallImg: 'assets/blender/out/cartwright-detall.png',
    detallAlt: 'Detall de la politja amb corretja, volant d’inèrcia, pinyó de llautó 2:1, eix de lleves i biela forjada del batà',
    detallL: '1–2 · Transmissió, engranatges 2:1 i biela',
    detallR: 'acosta al detall ↗',
    detallOrbit: '48deg 74deg 2.15m',
    detallTarget: '0.82m 0.56m 0.18m',
    ideaTitol: 'Tot el teler sincronitzat amb un sol eix',
    ideaHtml: 'La corretja de la fàbrica fa girar l’<strong>eix principal de manovelles</strong>, que bat la pinta a cada volta, mentre un <strong>engranatge reductor 2:1</strong> mou l’eix de lleves perquè una passada vagi a la dreta i la següent torni a l’esquerra sense intervenció humana.',
    flowBtnLabel: 'Transmissió de força i cicle 2:1',
    legendHot: 'Força motriu i impulsors',
    legendCold: 'Sincronització 2:1 i calada',
    fonamentHtml: 'Reconstrucció basada en el model industrial primerenc (1787–1790) descrit a <a href="https://books.google.com/books?id=bJ9EAAAAYAAJ" target="_blank" rel="noopener">Strickland (1843)</a> i les patents d’Edmund Cartwright.',
    hotspots: {
      transmissio: { num: 1, titol: 'Politja motriu doble, forquilla i volant', text: 'Recull el gir de l’embarrat superior mitjançant una corretja plana de cuir sobre politges fixa i boja, regularitzat per un volant lliure.', pos3d: [1.4, 0.86, 0.34] },
      eix: { num: 2, titol: 'Eix principal, pinyó 2:1, lleves i bieles', text: 'El pinyó de llautó (14 dents) mou la corona de ferro (28 dents) a meitat de velocitat per coordinar calada, tir i batuda.', pos3d: [0.85, 0.48, 0.18] },
      llicos: { num: 3, titol: 'Lliços penjats i trepitjadors de lleva', text: 'Dues lleves en cor empenyen palanques inferiors amb corró que baixen i pugen alternativament els marcs de l’ordit.', pos3d: [-0.2, 1.22, -0.32] },
      llancadora: { num: 4, titol: 'Impulsors amb moll i llançadora', text: 'Lleves de picat disparen les espases amb tacs de cuir sobre varetes guia d’acer i molls espirals de retorn.', pos3d: [-0.15, 0.92, -0.04] },
      pinta: { num: 5, titol: 'Batà i pinta de 44 pues amb bieles', text: 'Dues bieles d’acer forjat amb brides de llautó connecten el cigonyal al batà perquè bati cada fil de trama amb força.', pos3d: [0.5, 1.08, -0.06] },
      ordit: { num: 6, titol: 'Ordit tensat amb palanca i contrapès', text: 'Plegador posterior regulat amb brida i pes de ferro colat per mantenir la tensió uniforme de l’ordit.', pos3d: [-0.52, 0.95, -0.62] },
      tela: { num: 7, titol: 'Corró de pit, trempador i plegador', text: 'La tela passa sobre el corró d’acer polit i el trempador de llautó abans d’enrotllar-se al plegador frontal.', pos3d: [-0.15, 0.95, 0.6] },
      bastidor: { num: 8, titol: 'Bastidor reforçat amb escaires', text: 'Estructura pesant de roure sobre sabates i coixinets bipartits de fosa per resistir el ritme continu de fàbrica.', pos3d: [-1.04, 1.48, -0.8] }
    },
    flows: [
      { id: 'cw-corretja', cls: 'fl-hot', lbl: 'força de l’embarrat', fases: [0, 1, 2, 3], from: 'transmissio', to: 'eix', dx1: -6, dy1: -10, dx2: 6, dy2: -8, ctrlDx: 32, ctrlDy: 10, lblDx: 38, lblDy: 16 },
      { id: 'cw-bieles', cls: 'fl-hot', lbl: 'bieles cap al batà', fases: [2], from: 'eix', to: 'pinta', dx1: -4, dy1: -10, dx2: 8, dy2: 8, ctrlDx: 28, ctrlDy: -16, lblDx: 32, lblDy: -8 },
      { id: 'cw-lleves', cls: 'fl-cold', lbl: 'lleves 2:1 als lliços', fases: [0, 3], from: 'eix', to: 'llicos', dx1: -12, dy1: -12, dx2: 14, dy2: 8, ctrlDx: -10, ctrlDy: -28, lblDx: -14, lblDy: -8 },
      { id: 'cw-impuls', cls: 'fl-eq', lbl: 'llançadora mecànica', fases: [1, 3], from: 'llancadora', to: 'pinta', dx1: -14, dy1: 0, dx2: 12, dy2: 2, ctrlDy: -20, lblDy: -10 }
    ],
    fases: [
      {
        curt: 'Lleves i calada',
        titol: 'Lleves de calada (pas 1)',
        desc: 'L’eix de lleves (girant a la meitat de velocitat) bascula els lliços i deixa oberta la calada abans del tir.',
        pMin: 0.00,
        pJump: 0.08,
        chips: [['Eix principal: 1×', 'oberta'], ['Eix lleves: ½×', 'oberta'], ['Batà: enrere', 'tancada']]
      },
      {
        curt: 'Cop d’impulsor',
        titol: 'Cop d’impulsor mecànic',
        desc: 'La lleva de picat colpeja l’espasa esquerra i projecta la llançadora d’extrem a extrem pel túnel d’ordit.',
        pMin: 0.12,
        pJump: 0.22,
        chips: [['Impulsor: cop lateral', 'oberta'], ['Llançadora: vol ràpid', 'oberta'], ['Calada: oberta', 'oberta']]
      },
      {
        curt: 'Batuda per manovella',
        titol: 'Batuda per manovella i bieles',
        desc: 'La manovella de l’eix principal completa la volta i fa avançar el batà amb les dues bieles per prémer la trama.',
        pMin: 0.30,
        pJump: 0.39,
        chips: [['Bieles: bat endavant', 'oberta'], ['Llançadora: en caixa', 'tancada'], ['Tela: avança 1 passada', 'oberta']]
      },
      {
        curt: 'Segona passada',
        titol: 'Invertir calada i retorn automàtic',
        desc: 'A la segona volta de l’eix principal, l’eix de lleves arriba a 180°, canvia els lliços i dispara el retorn contrari.',
        pMin: 0.50,
        pJump: 0.72,
        chips: [['Eix lleves: mitja volta', 'oberta'], ['Impulsor contrari: actiu', 'oberta'], ['Ritme: continu', 'oberta']]
      }
    ]
  }
};
