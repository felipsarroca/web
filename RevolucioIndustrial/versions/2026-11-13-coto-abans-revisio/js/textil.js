// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 3 · El cotó: la cursa entre filar i teixir i les màquines que la van córrer. */
(function () {
  const { svg, roda, persona, txt, retol, fletxa, tram, lerp } = RI;
  const fons = (c) => `<rect class="${c || 'crema'}" x="-60" width="1320" height="720"/>`;

  /* ---------- 1 · la cursa (balança) ---------- */
  const OFERTA = [2, 2, 4, 7, 12, 12], DEMANDA = [2, 5, 5, 5, 5, 12];
  const INVENTS = [['1733', 'Llançadora volant', 'teixir', 'John Kay'], ['1764', 'Spinning Jenny', 'filar', 'J. Hargreaves'], ['1769', 'Water Frame', 'filar', 'R. Arkwright'], ['1779', 'Mula', 'filar', 'S. Crompton'], ['1785', 'Teler mecànic', 'teixir', 'E. Cartwright']];
  function cursa() {
    let s = fons();
    const plat = (id, items) => `<g id="${id}"><path d="M0 0L-96 150M0 0L96 150" class="t nf"/><path class="t llauto" d="M-112 150h224q-10 26-112 26t-112-26z"/>${items}</g>`;
    let bob = '', tel = '';
    for (let i = 0; i < 13; i++) {
      const x = -64 + (i % 5) * 32, y = 148 - Math.floor(i / 5) * 36;
      bob += `<g class="it-o"><path class="t2" fill="#fbf3dc" d="M${x - 9} ${y}l3-28h12l3 28z"/><path d="M${x - 7} ${y - 8}h14M${x - 6} ${y - 16}h12" class="t1"/></g>`;
      tel += `<g class="it-d"><rect class="t2 fusta3" x="${x - 11}" y="${y - 26}" width="22" height="26" rx="2"/><path d="M${x - 11} ${y - 14}h22M${x} ${y - 26}v26" class="t1"/></g>`;
    }
    s += `<path class="t fusta" d="M584 230h32l26 250H558z"/><path class="t fusta2" d="M500 480h200v18H500z"/>`;
    s += `<g id="biga"><rect class="t fusta" x="290" y="190" width="620" height="20" rx="8"/><circle class="t llauto" cx="600" cy="200" r="14"/></g>${plat('plat-o', bob)}${plat('plat-d', tel)}`;
    s += `<text x="300" y="76" class="tx-g mig">Fil que es fabrica</text><text x="300" y="100" class="tx-p mig">filar</text><text x="900" y="76" class="tx-g mig">Fil que demanen els telers</text><text x="900" y="100" class="tx-p mig">teixir</text>`;
    s += RI.innova(600, 26, 'INNOVACIÓ EN CADENA · accelerar una fase obliga a innovar l’altra', { w: 485 });
    s += `<g id="r-falta" opacity="0">${retol(600, 120, 'Falta fil!', { fons: '#d9482b', w: 150, h: 40 })}</g><g id="r-sobra" opacity="0">${retol(600, 120, 'Sobra fil: falten telers!', { fons: '#2f7fb5', w: 270, h: 40 })}</g><g id="r-eq" opacity="0">${retol(600, 120, 'Equilibri', { fons: '#5b8c35', w: 130, h: 40 })}</g>`;
    INVENTS.forEach(([any, nom, tipus, qui], i) => {
      const x = 44 + i * 226;
      s += `<g class="targeta" id="tg-${i}"><rect class="t" x="${x}" y="570" width="208" height="112" rx="14" fill="#fffdf7"/><text x="${x + 16}" y="612" class="tx-gg">${any}</text><text x="${x + 16}" y="640" class="tx">${nom}</text><text x="${x + 16}" y="662" class="tx-p">${qui}</text><rect x="${x + 128}" y="586" width="66" height="24" rx="12" fill="${tipus === 'filar' ? '#b9722a' : '#2f7fb5'}"/><text x="${x + 161}" y="603" class="tx-r mig" fill="#fff" style="font-size:13px">${tipus}</text></g>`;
    });
    return svg(s);
  }
  function animaCursa({ p, k, el, svg: g }) {
    const fins = [0, 0.1, 0.28, 0.46, 0.64, 0.82, 1], ang = (i) => (DEMANDA[i] - OFERTA[i]) * 2.2;
    const ant = Math.max(0, k - 1), a = tram(p, fins[k], fins[k] + 0.07, ang(ant), ang(k)), r = (a * Math.PI) / 180;
    el('biga').setAttribute('transform', `rotate(${a.toFixed(2)} 600 200)`);
    el('plat-o').setAttribute('transform', `translate(${(600 - 300 * Math.cos(r)).toFixed(1)} ${(200 - 300 * Math.sin(r)).toFixed(1)})`);
    el('plat-d').setAttribute('transform', `translate(${(600 + 300 * Math.cos(r)).toFixed(1)} ${(200 + 300 * Math.sin(r)).toFixed(1)})`);
    if (!g._o) { g._o = Array.from(g.querySelectorAll('.it-o')); g._d = Array.from(g.querySelectorAll('.it-d')); }
    g._o.forEach((n, i) => n.setAttribute('opacity', i < OFERTA[k] ? 1 : 0)); g._d.forEach((n, i) => n.setAttribute('opacity', i < DEMANDA[k] ? 1 : 0));
    const dif = DEMANDA[k] - OFERTA[k];
    el('r-falta').setAttribute('opacity', dif > 0 ? 1 : 0); el('r-sobra').setAttribute('opacity', dif < 0 ? 1 : 0); el('r-eq').setAttribute('opacity', dif === 0 ? 1 : 0);
    for (let i = 0; i < 5; i++) { const t = el('tg-' + i); t.setAttribute('opacity', i < k ? 1 : 0.35); t.firstChild.setAttribute('fill', i === k - 1 ? '#ffe08a' : '#fffdf7'); }
  }

  const cap = {
    id: 'textil', titol: 'El cotó', llegenda: [['#fff8e8', 'metxa (cotó tou)'], ['#f2c230', 'fil estirat i torçut'], ['#d9482b', 'fil de trama']],
    escenes: [
      {
        id: 'cursa', nom: 'La cursa', any: '1733 – 1785', durada: 30, bucle: true,
        pregunta: 'Per què un invent en demana un altre?',
        intro: 'Per fer tela calen dues feines: <b>filar</b> (fer fil amb la fibra) i <b>teixir</b> (encreuar fils). Quan una s’accelera, l’altra no dona l’abast. Mira com es decanta la balança.',
        svg: cursa, anima: animaCursa, llegenda: false,
        fases: [
          { fins: 0.1, nom: 'Abans: tot a mà', text: 'Roda de filar i teler manual, a casa. Lent, però equilibrat.' },
          { fins: 0.28, nom: '1733 · Llançadora volant', text: 'Els teixidors treballen el doble de ràpid… i gasten el doble de fil. <b>Falta fil</b>: el problema ara és filar.' },
          { fins: 0.46, nom: '1764 · Spinning Jenny', text: 'Una persona fila 8 fils alhora (després, molts més). Ajuda, però el fil és fluix i encara no n’hi ha prou.' },
          { fins: 0.64, nom: '1769 · Water Frame', text: 'Fil fort fet amb la força de l’aigua. Cal un edifici i una roda: <b>neix la fàbrica</b>. Ja hi ha més fil que no pas telers.' },
          { fins: 0.82, nom: '1779 · Mula', text: 'Fil fi i resistent en quantitats enormes. Ara el coll d’ampolla és a l’altra banda: <b>sobra fil</b> i falten teixidors.' },
          { fins: 1, nom: '1785 · Teler mecànic', text: 'El teler també es mou amb aigua o vapor. Torna l’equilibri, però amb una producció que no té res a veure amb la de 1730.' }
        ],
        clau: 'Cada invent resol un coll d’ampolla i en crea un altre: per això les innovacions arriben en cadena.',
        batx: { titol: 'Inventar no és el mateix que difondre', text: 'El teler mecànic de Cartwright (1785) no es va generalitzar fins als anys 1820-1830: era poc fiable i els teixidors manuals cobraven molt poc. Les quantitats de la balança són il·lustratives, no dades reals. Quines condicions calen perquè una empresa adopti una màquina nova?', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum · Manchester i el cotó' }
      },
      {
        id: 'llancadora', nom: 'Llançadora volant', any: '1733', qui: 'John Kay', durada: 9,
        model: 'Teler manual vist des de dalt · esquema didàctic',
        pregunta: 'Com passes un fil entre centenars de fils sense tocar-lo?',
        intro: 'Teixir és passar un fil (la <b>trama</b>) per entre els fils llargs (l’<b>ordit</b>). Abans la llançadora es passava de mà en mà; Kay la fa volar amb una estirada de cordill.',
        svg: null, anima: null, innova: [1],
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D',
            model: 'Teler manual de fusta amb llançadora volant · perspectiva 3D',
            etiquetes: [['ordit', 600, 128, 600, 200], ['pinta', 980, 205, 870, 260, 'Pinta i batà'], ['caixes', 70, 250, 150, 306, 'Caixa i taco'], ['llancadora', 450, 286, 420, 338], ['cordill', 1025, 420, 740, 384, 'Cordill i mànec'], ['tela', 600, 650, 600, 520]]
          },
          {
            id: 'tall', nom: 'Secció lateral (calada)',
            model: 'Secció lateral del teler: obertura de la calada i picada de la pinta',
            etiquetes: [['ordit', 210, 185, 225, 305], ['pinta', 686, 165, 686, 260, 'Batà i pinta'], ['llancadora', 560, 488, 624, 392], ['tela', 960, 185, 945, 345]]
          },
          {
            id: 'planta', nom: 'Planta (des de dalt)',
            model: 'Vista zenital del teler · recorregut complet de la llançadora',
            etiquetes: [['ordit', 600, 108, 600, 195], ['llancadora', 360, 250, 300, 318, 'Llançadora'], ['caixes', 80, 400, 180, 340, 'Caixa'], ['cordill', 760, 420, 700, 402, 'Cordill i mànec'], ['pinta', 1110, 330, 1024, 330], ['tela', 600, 690, 600, 600]]
          }
        ],
        fases: [
          { fins: 0.17, nom: 'S’obre la calada', text: 'La meitat dels fils de l’ordit puja (foscos) i l’altra meitat baixa (clars). Entre uns i altres queda un túnel.', focus: ['ordit'] },
          { fins: 0.36, nom: 'La llançadora vola', text: 'Una estirada seca del mànec i el cordill dispara la llançadora d’una caixa a l’altra. Va deixant el fil de trama dins del túnel.', focus: ['llancadora', 'cordill', 'caixes'] },
          { fins: 0.5, nom: 'La pinta pica', text: 'La pinta empeny el fil nou contra la tela ja feta i el deixa ben atapeït.', focus: ['pinta', 'tela'] },
          { fins: 1, nom: 'I torna en sentit contrari', text: 'Els fils de l’ordit s’intercanvien (els que eren a dalt, ara a baix) i la llançadora torna. Així el fil de trama queda travat.' }
        ],
        parts: {
          ordit: { nom: 'Ordit', text: 'Els fils llargs, tibants, que van d’un corró a l’altre del teler.' },
          llancadora: { nom: 'Llançadora', text: 'Peça de fusta en forma de barqueta que porta a dins una bobina de fil de trama.' },
          caixes: { nom: 'Caixes', text: 'Una a cada costat. Reben la llançadora i la tornen a disparar.' },
          cordill: { nom: 'Cordill i mànec', text: 'El teixidor estira el mànec amb una sola mà. L’altra mà queda lliure per moure la pinta.' },
          pinta: { nom: 'Pinta', text: 'Barra amb pues per on passen els fils de l’ordit. Atapeeix cada passada de trama.' },
          tela: { nom: 'Tela', text: 'Ordit i trama ja entrecreuats. S’enrotlla al corró de baix.' }
        },
        etiquetes: [['ordit', 600, 160, 600, 200], ['llancadora', 360, 250, 300, 318, 'Llançadora'], ['caixes', 80, 400, 180, 340, 'Caixa'], ['cordill', 760, 420, 700, 402, 'Cordill i mànec'], ['pinta', 1110, 330, 1024, 330], ['tela', 600, 690, 600, 600]],
        explotada: {
          img: 'img/exp-teler.webp',
          model: 'Làmina tècnica en vista explotada · Teler manual amb llançadora volant (John Kay, 1733)',
          guies: '<path d="M490 505L635 580M660 445L760 515M865 255L985 190M570 595L670 670"/><circle cx="490" cy="505" r="4.5"/><circle cx="660" cy="445" r="4.5"/><circle cx="570" cy="595" r="4.5"/>',
          zones: [['ordit', 330, 215, 115, 70], ['pinta', 680, 385, 130, 58], ['llancadora', 775, 445, 92, 46], ['caixes', 515, 610, 75, 44], ['caixes', 935, 345, 75, 44], ['cordill', 1020, 220, 95, 75], ['tela', 900, 575, 135, 80]],
          etiquetes: [['ordit', 180, 125, 330, 215], ['pinta', 595, 145, 640, 340], ['cordill', 1030, 115, 995, 185], ['caixes', 1055, 355, 935, 345, 'Caixa'], ['llancadora', 645, 540, 760, 455], ['tela', 1030, 695, 915, 595]]
        },
        real: {
          img: 'img/real-teler.webp',
          titol: 'Teler manual de teixidor, encara en funcionament',
          museu: 'Weaver’s Cottage · Kilbarchan (Escòcia)',
          lic: 'Foto: Richard Sutcliffe · Wikimedia Commons · CC BY-SA 2.0',
          etiquetes: [['tela', 70, 62, 'Tela'], ['ordit', 52, 48, 'Ordit']]
        },
        clau: 'Un sol teixidor fa teles amples i treballa el doble de ràpid: de cop, falta fil.',
        batx: { titol: 'Kay i la por a les màquines', text: 'Teixidors que temien perdre la feina van assaltar la casa de Kay, que va acabar emigrant a França. La resistència a les màquines és anterior al ludisme (1811-1816) i forma part de la història de cada innovació.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'jenny', nom: 'Spinning Jenny', any: '1764', qui: 'James Hargreaves', durada: 10,
        model: 'Spinning Jenny de vuit fusos, vista des de dalt · esquema didàctic',
        pregunta: 'Com fila una sola persona vuit fils alhora?',
        intro: 'Filar és fer dues coses: <b>estirar</b> la fibra i <b>tòrcer-la</b> perquè no es trenqui. La Jenny ho fa amb vuit fils a la vegada, amb una roda i una pinça.',
        svg: null, anima: null, innova: [1],
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D',
            model: 'Spinning Jenny de Hargreaves · bastiment inclinat amb 8 fusos i carro-pinça',
            etiquetes: [['metxes', 225, 598, 240, 492, 'Fileta de metxes'], ['pinca', 0, -128, 0, -72, 'Pinça mòbil', 'j3-carro'], ['fusos', 840, 128, 825, 225, 'Fusos i fil-guia'], ['roda', 1070, 215, 995, 280], ['corda', 645, 578, 645, 480, 'Tambor i corda']]
          },
          {
            id: 'planta', nom: 'Planta (8 fusos)',
            model: 'Spinning Jenny vista des de dalt · 8 fils en paral·lel',
            etiquetes: [['metxes', 185, 110, 185, 170, 'Metxes'], ['pinca', 0, 108, 0, 152, 'Pinça mòbil', 'j2-pinca'], ['fusos', 835, 110, 830, 184, 'Fusos'], ['roda', 1070, 115, 1070, 222], ['corda', 960, 664, 960, 620, 'Tambor i corda']]
          }
        ],
        fases: [
          { fins: 0.2, nom: 'Surt una mica de metxa', text: 'La pinça s’obre i recula una mica: deixa passar un tros de metxa (cotó tou, gruixut, encara sense tòrcer).', focus: ['pinca', 'metxes'] },
          { fins: 0.6, nom: 'Estirar i tòrcer', text: 'La pinça es tanca i recula. La metxa s’estira i s’aprima mentre la roda fa girar tots els fusos, que la torcen: ja és fil.', focus: ['pinca', 'fusos', 'roda', 'corda'] },
          { fins: 1, nom: 'Enrotllar', text: 'La pinça torna cap als fusos, que ara enrotllen el fil acabat. I torna a començar.', focus: ['fusos'] }
        ],
        parts: {
          metxes: { nom: 'Bobines de metxa', text: 'Cotó cardat en forma de cordó gruixut i tou. És la matèria primera.' },
          pinca: { nom: 'Pinça mòbil', text: 'Dos llistons que agafen totes les metxes alhora i es mouen endavant i endarrere sobre el bastidor.' },
          fusos: { nom: 'Fusos', text: 'Varetes que giren molt de pressa: torcen el fil i després l’enrotllen. Els primers models en tenien 8; aviat, 80 o més.' },
          roda: { nom: 'Roda', text: 'Es mou a mà. Un sol gir fa rodar tots els fusos.' },
          corda: { nom: 'Corda de transmissió', text: 'Porta el moviment de la roda fins als fusos.' }
        },
        etiquetes: [['metxes', 185, 110, 185, 170, 'Metxes'], ['pinca', 0, 108, 0, 152, 'Pinça mòbil', 'j2-pinca'], ['fusos', 835, 110, 830, 184, 'Fusos'], ['roda', 1070, 115, 1070, 222], ['corda', 960, 664, 960, 620, 'Tambor i corda']],
        explotada: {
          img: 'img/exp-jenny.webp',
          model: 'Làmina tècnica en vista explotada · Spinning Jenny (James Hargreaves, 1764)',
          guies: '<path d="M225 560L335 455M385 635L495 530M265 395L380 310M755 280L805 215M905 335L955 270M760 475L925 570"/><circle cx="335" cy="455" r="4.5"/><circle cx="495" cy="530" r="4.5"/><circle cx="380" cy="310" r="4.5"/><circle cx="755" cy="280" r="4.5"/><circle cx="905" cy="335" r="4.5"/><circle cx="760" cy="475" r="4.5"/>',
          zones: [['metxes', 280, 590, 175, 105], ['pinca', 295, 465, 185, 55], ['corda', 715, 385, 135, 95], ['fusos', 895, 195, 155, 105], ['roda', 990, 540, 135, 155]],
          etiquetes: [['pinca', 145, 125, 245, 495, 'Pinça mòbil'], ['metxes', 130, 685, 220, 585, 'Bobines de metxa'], ['corda', 635, 610, 675, 425, 'Tambor i corda'], ['fusos', 655, 115, 835, 165, 'Fusos'], ['roda', 1065, 265, 1005, 435]]
        },
        real: {
          img: 'img/real-jenny.webp',
          titol: 'Spinning Jenny (model del tipus de Hargreaves)',
          museu: 'North Mill Museum · Belper, Derbyshire (Regne Unit)',
          lic: 'Foto: Betty Longbottom · Wikimedia Commons · CC BY-SA 2.0',
          etiquetes: [['fusos', 52, 13, 'Fusos'], ['metxes', 62, 46, 'Bobines de metxa']]
        },
        clau: 'Una màquina petita, barata i manual: multiplica el fil sense sortir de casa.',
        batx: { titol: 'Una màquina domèstica', text: 'La Jenny no necessitava motor i cabia en una casa: va reforçar el treball a domicili abans que la fàbrica el substituís. El seu fil, poc resistent, servia per a la trama però no per a l’ordit.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'water', nom: 'Water Frame', any: '1769', qui: 'Richard Arkwright', durada: 12,
        model: 'Un cap de filatura de la Water Frame, de costat · esquema didàctic',
        pregunta: 'Com s’estira el cotó sense mans?',
        intro: 'El secret són <b>tres parells de corrons</b>. Cada parell gira més de pressa que l’anterior i, com que estira més fil del que rep, el cotó s’aprima.',
        svg: null, anima: null, innova: [1],
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D (4 fusos)',
            model: 'Water Frame d’Arkwright · tracció hidràulica, engranatges cònics i 4 fusos',
            etiquetes: [['aigua', 185, 205, 185, 310, 'Roda hidràulica'], ['metxa', 965, 98, 835, 148, 'Bobines de metxa'], ['corrons', 320, 290, 445, 296, 'Corrons i pesos'], ['aleta', 1030, 520, 862, 515, 'Aletes i bobines']]
          },
          {
            id: 'tall', nom: 'Secció (1 cap de filatura)',
            model: 'Detall d’un cap de filatura · 3 parells de corrons a velocitats creixents',
            etiquetes: [['metxa', 500, 50, 580, 120, 'Bobina de metxa'], ['corrons', 392, 330, 556, 300, 'Corrons'], ['aleta', 480, 600, 560, 540, 'Aleta'], ['aigua', 200, 250, 180, 350, 'Roda hidràulica']]
          }
        ],
        fases: [
          { fins: 0.25, nom: 'La metxa entra lentament', text: 'El primer parell de corrons agafa la metxa i la fa baixar a poc a poc.', focus: ['metxa', 'corrons'] },
          { fins: 0.5, nom: 'Cada parell, més de pressa', text: 'El segon parell gira més ràpid que el primer, i el tercer encara més. Entre parell i parell el cotó s’estira com un xiclet.', focus: ['corrons'] },
          { fins: 0.75, nom: 'L’aleta torça i enrotlla', text: 'En sortir, una aleta que gira al voltant de la bobina torça el fil i l’hi enrotlla, tot alhora i sense parar.', focus: ['aleta'] },
          { fins: 1, nom: 'L’aigua ho mou tot', text: 'Tanta maquinària pesa massa per moure-la a mà. Arkwright la connecta a una roda hidràulica: per això en diuen «màquina d’aigua».', focus: ['aigua'] }
        ],
        parts: {
          metxa: { nom: 'Bobina de metxa', text: 'El cotó cardat, encara tou i gruixut.' },
          corrons: { nom: 'Corrons d’estiratge', text: 'Tres parells que giren a velocitats creixents. Substitueixen els dits de la filadora.' },
          aleta: { nom: 'Aleta i bobina', text: 'L’aleta gira al voltant de la bobina: torça el fil i l’enrotlla en un moviment continu.' },
          aigua: { nom: 'Roda hidràulica', text: 'Dona la força a centenars de fusos alhora. Obliga a reunir màquines i treballadors en un edifici: la fàbrica.' }
        },
        etiquetes: [['metxa', 500, 50, 580, 120, 'Bobina de metxa'], ['corrons', 392, 330, 556, 300, 'Corrons'], ['aleta', 480, 600, 560, 540, 'Aleta'], ['aigua', 200, 250, 180, 350, 'Roda hidràulica']],
        explotada: {
          img: 'img/exp-water.webp',
          model: 'Làmina tècnica en vista explotada · Water Frame (Richard Arkwright, 1769)',
          guies: '<path d="M235 465L425 415M485 170L485 215M615 280L730 230M615 335L770 295M615 390L815 355M605 510L785 600M365 655L520 565"/><circle cx="425" cy="415" r="4.5"/><circle cx="485" cy="215" r="4.5"/><circle cx="615" cy="280" r="4.5"/><circle cx="615" cy="335" r="4.5"/><circle cx="615" cy="390" r="4.5"/><circle cx="605" cy="510" r="4.5"/>',
          zones: [['aigua', 200, 445, 115, 160], ['metxa', 485, 115, 115, 72], ['corrons', 835, 335, 175, 125], ['aleta', 890, 575, 130, 115]],
          etiquetes: [['aigua', 160, 215, 195, 330], ['metxa', 260, 105, 440, 125, 'Bobines de metxa'], ['corrons', 830, 135, 800, 215, 'Corrons i pesos'], ['aleta', 1030, 645, 900, 555, 'Aletes i bobines']]
        },
        real: {
          img: 'img/real-water.webp',
          titol: 'Water Frame d’Arkwright (c. 1775)',
          museu: 'Science and Industry Museum · Manchester',
          lic: 'Foto: Clem Rutter · Wikimedia Commons · CC BY 3.0',
          etiquetes: [['metxa', 46, 22, 'Bobines de metxa'], ['corrons', 52, 42, 'Corrons'], ['aleta', 48, 92, 'Aletes i bobines']]
        },
        clau: 'Fil fort, continu i sense força humana: la màquina que va crear la fàbrica.',
        batx: { titol: 'Arkwright, empresari', text: 'Més que inventor, Arkwright va ser organitzador: va reunir invents d’altres, capital i mà d’obra (sovint infantil) a Cromford (1771). Les seves patents van ser anul·lades el 1785 i la màquina es va estendre per tot Lancashire.', font: 'https://www.cromfordmills.org.uk/', fontNom: 'Cromford Mills' }
      },
      {
        id: 'mula', nom: 'La mula', any: '1779', qui: 'Samuel Crompton', durada: 10,
        model: 'Mula de filar, de costat (un sol fus) · esquema didàctic',
        pregunta: 'I si ajuntem el millor de les dues màquines?',
        intro: 'Crompton combina els <b>corrons</b> de la Water Frame amb el <b>carro mòbil</b> de la Jenny. Com la mula, filla d’egua i ase, és un encreuament.',
        svg: null, anima: null, innova: [0, 1],
        vistes: [
          {
            id: 'tall', nom: 'De costat (1 fus)',
            model: 'Secció lateral d’un fus de la mula · estirament i bobinatge',
            etiquetes: [['fileta', 90, 110, 140, 160], ['corrons', 400, 210, 340, 260], ['carro', 15, 646, 15, 540, 'Carro mòbil', 'm2-carro'], ['fus', 112, 408, 22, 420, 'Fus i fil-guia', 'm2-carro']]
          },
          {
            id: '3d', nom: 'Perspectiva (6 fusos)',
            model: 'Mula de Crompton · tren de corrons + carro mòbil de 6 fusos sobre rails',
            etiquetes: [['fileta', 165, 118, 185, 185], ['corrons', 380, 198, 375, 270], ['carro', -10, 640, 20, 540, 'Carro mòbil', 'm3-carro'], ['fus', 65, 285, -18, 385, 'Fusos i fil-guia', 'm3-carro']]
          }
        ],
        fases: [
          { fins: 0.45, nom: 'El carro surt', text: 'Els corrons van donant metxa estirada mentre el carro s’allunya i el fus gira: el fil s’estira i es torça alhora.', focus: ['corrons', 'carro', 'fus'] },
          { fins: 0.6, nom: 'Últim estirament', text: 'Els corrons s’aturen, però el carro encara recula una mica. Aquest tram final és el que fa el fil tan fi.', focus: ['carro'] },
          { fins: 1, nom: 'El carro torna', text: 'En tornar, el fus enrotlla el fil acabat. Una mula tenia desenes de fusos; cap al 1830, més de mil.', focus: ['fus', 'carro'] }
        ],
        parts: {
          fileta: { nom: 'Fileta', text: 'El bastidor fix on hi ha les bobines de metxa.' },
          corrons: { nom: 'Corrons', text: 'Com els de la Water Frame: estiren la metxa abans que surti.' },
          carro: { nom: 'Carro mòbil', text: 'Va i ve sobre rails portant tots els fusos. És la idea de la Jenny, però més gran.' },
          fus: { nom: 'Fus', text: 'Gira per tòrcer el fil i després per enrotllar-lo.' }
        },
        etiquetes: [['fileta', 90, 110, 140, 160], ['corrons', 400, 210, 340, 260], ['carro', 15, 646, 15, 540, 'Carro mòbil', 'carro'], ['fus', 112, 408, 22, 420, 'Fus i fil-guia', 'carro']],
        explotada: {
          img: 'img/exp-mula.webp',
          model: 'Làmina tècnica en vista explotada · Spinning Mule (Samuel Crompton, 1779)',
          guies: '<path d="M685 570L685 605M855 625L855 660M765 375L765 465M910 420L910 510M430 480L485 535"/><circle cx="685" cy="605" r="4.5"/><circle cx="855" cy="660" r="4.5"/><circle cx="765" cy="465" r="4.5"/><circle cx="910" cy="510" r="4.5"/><circle cx="485" cy="535" r="4.5"/>',
          zones: [['fileta', 225, 225, 125, 145], ['corrons', 395, 345, 95, 85], ['carro', 805, 520, 230, 125], ['fus', 860, 325, 165, 95]],
          etiquetes: [['fileta', 140, 115, 235, 200], ['corrons', 460, 145, 410, 310], ['fus', 835, 145, 825, 285, 'Fusos i fil-guia'], ['carro', 960, 685, 880, 480, 'Carro mòbil sobre rails']]
        },
        real: {
          img: 'img/real-mula.webp',
          titol: 'Mula de filar del segle XIX (ja automàtica)',
          museu: 'Quarry Bank Mill · Styal, Cheshire (Regne Unit)',
          lic: 'Foto: David Dixon · Wikimedia Commons · CC BY-SA 2.0',
          etiquetes: [['fus', 18, 32, 'Fusos'], ['carro', 30, 62, 'Carro mòbil']]
        },
        clau: 'Fil fi com el de l’Índia, fort com el de la Water Frame i en quantitats industrials.',
        batx: { titol: 'El cotó britànic contra les mussolines de l’Índia', text: 'Fins llavors els teixits fins de cotó venien de Bengala. Amb la mula, Lancashire els pot imitar més barats; el 1830 una mula «automàtica» (Roberts) ja no necessita un filador expert. Relaciona-ho amb la desindustrialització tèxtil de l’Índia sota domini britànic.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      }
    ],
    repte: [
      { q: 'Què vol dir «filar»?', o: ['Encreuar fils per fer tela', 'Estirar i tòrcer la fibra per fer fil', 'Tenyir la tela'], c: 1, e: 'Filar és convertir la fibra en fil; teixir és convertir el fil en tela.' },
      { q: 'Quin problema va crear la llançadora volant?', o: ['Va faltar fil', 'Van sobrar teixidors', 'Les teles eren massa estretes'], c: 0, e: 'Es teixia tan de pressa que els filadors no donaven l’abast.' },
      { q: 'Com estira el cotó la Water Frame?', o: ['Amb una pinça que recula', 'Amb parells de corrons que giren cada cop més de pressa', 'Amb el pes d’una pedra'], c: 1, e: 'Cada parell estira més fil del que rep de l’anterior.' },
      { q: 'Per què la Water Frame va fer néixer la fàbrica?', o: ['Perquè necessitava una roda hidràulica i un gran edifici', 'Perquè era molt petita', 'Perquè només la podien fer servir nens'], c: 0, e: 'Era massa gran i pesant per moure-la a mà o tenir-la a casa.' },
      { q: 'Què combina la mula de Crompton?', o: ['El teler i la llançadora', 'Els corrons de la Water Frame i el carro de la Jenny', 'La roda d’aigua i el vapor'], c: 1, e: 'D’aquí li ve el nom: és un encreuament de dues màquines.' },
      { tipus: 'toca', esc: 'llancadora', part: 'caixes', p: 0.3, q: 'Toca la peça que va afegir John Kay perquè la llançadora volés sola.', e: 'Les caixes dels costats, amb un taco que colpeja la llançadora quan el teixidor estira el cordill.' },
      { tipus: 'toca', esc: 'water', part: 'corrons', p: 0.4, q: 'Toca la peça de la Water Frame que estira el cotó sense mans.', e: 'Els corrons: cada parell gira més de pressa que l’anterior i el cotó s’aprima.' },
      { tipus: 'ordena', esc: 'mula', q: 'Ordena el que fa la mula en cada cicle.', e: 'Surt el carro → últim estirament amb els corrons parats → el carro torna i enrotlla.' },
      { q: 'Per què les innovacions tèxtils arriben «en cadena»?', o: ['Per casualitat', 'Perquè cada invent crea un nou coll d’ampolla en una altra fase', 'Perquè ho manava el rei'], c: 1, e: 'Accelerar una fase deixa enrere l’altra i empeny a buscar una nova solució.' }
    ]
  };
  const sintesi=cap.escenes.shift();
  cap.escenes.unshift(RI.RODA_ESCENA);
  cap.escenes.push(sintesi);
  for(const e of cap.escenes){
    if(e.id==='cursa')continue;
    e.svg=()=>RI.TEXTIL_MODELS.svg(e.id);
    e.anima=RI.TEXTIL_MODELS.anima(e.id);
    e.model='Perspectiva obliqua fixa · mecanisme didàctic';
    delete e.vistes; delete e.etiquetes;
    if(!e.parts.bastidor)e.parts.bastidor={nom:'Bastidor',text:'L’estructura de fusta manté alineats els conjunts de treball i de transmissió.'};
  }
  const waterScene=cap.escenes.find(e=>e.id==='water');
  waterScene.parts.aigua={nom:'Transmissió motriu',text:'La politja rep el moviment dels eixos de la fàbrica. Una roda hidràulica exterior proporciona la força; no forma part del bastidor de filatura.'};
  waterScene.fases[3].focus=['aigua'];
  cap.escenes.find(e=>e.id==='jenny').parts.metxes={nom:'Alimentació de metxa',text:'La metxa és cotó cardat encara tou i gruixut. Les guies la presenten a la pinça que en controla l’estiratge.'};
  cap.escenes.find(e=>e.id==='mula').parts.roda={nom:'Roda de comandament',text:'En els primers models manuals, el filador acciona la roda i coordina el treball dels fusos amb el desplaçament del carro.'};
  const loom=cap.escenes.find(e=>e.id==='llancadora');
  loom.parts.llicos={nom:'Lliços',text:'Els fils passen pels ullets dels lliços. En aixecar un grup i abaixar l’altre s’obre la calada per on passa la llançadora.'};
  loom.parts.bastidor={nom:'Bastidor',text:'L’estructura de fusta manté els plegadors, els lliços i el batà en la posició de treball.'};
  RI.TEXTIL_ESCENES=Object.fromEntries(cap.escenes.map(e=>[e.id,e]));
  cap.repte.unshift({q:'Quants fils es treballen alhora amb la roda de filar tradicional?',o:['Un sol fil','Vuit fils','Tants com amb una Water Frame'],c:0,e:'La roda de filar treballa un fil cada vegada. La Jenny multiplica el nombre de fusos.'});
  RI.capitol(cap);
})();
