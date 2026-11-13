// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 1 · El camp: rotació Norfolk, sembradora de Tull i arada de Rotherham. */
(function () {
  const { svg, roda, persona, nuvol, txt, retol, fletxa, tram, lerp } = RI;
  const cavall = (x, y, k, c) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-22-20v20M-12-20v20M12-20v20M22-20v20" stroke="#2a2420" stroke-width="5" stroke-linecap="round"/><path class="t2" fill="${c || '#8a5c36'}" d="M-28-38q0-10 12-10h28l12-18 12 4-6 12-6 4v12q0 10-10 10h-32q-12 0-12-10z"/><path d="M-28-40q-10 4-8 18" class="t2 nf"/></g>`;
  const ovella = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k || 1})"><path d="M-10 0v10M8 0v10" class="t2"/><ellipse class="t2 blanc" cx="0" cy="-6" rx="17" ry="11"/><circle class="t2 negre" cx="17" cy="-10" r="6"/></g>`;
  const vaca = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k || 1})"><path d="M-18 0v14M-8 0v14M12 0v14M20 0v14" class="t2"/><rect class="t2 blanc" x="-26" y="-22" width="52" height="24" rx="9"/><path d="M-12-22q6 10 14 0zM8-4q6-8 12 0z" class="negre"/><rect class="t2 blanc" x="24" y="-30" width="18" height="16" rx="5"/></g>`;

  /* dibuix dels conreus dins d'una parcel·la de 250 × 200 */
  function conreu(tipus) {
    let s = '';
    if (tipus === 'blat' || tipus === 'ordi') {
      const c = tipus === 'blat' ? '#e6b93c' : '#d9c77a', e = tipus === 'blat' ? '#a8791c' : '#8f8440';
      s += `<rect width="250" height="200" fill="${c}"/>`;
      for (let y = 34; y < 200; y += 32) for (let x = 18; x < 250; x += 24) s += `<path d="M${x} ${y}v-18m0 5l-5-5m5 9l5-5${tipus === 'ordi' ? 'm-5-9l-7-6m7 6l7-6' : ''}" stroke="${e}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    } else if (tipus === 'naps') {
      s += `<rect width="250" height="200" fill="#9a7a52"/>`;
      for (let y = 34; y < 200; y += 40) for (let x = 24; x < 250; x += 40) s += `<path d="M${x} ${y - 6}q-10-14-2-18M${x} ${y - 6}q10-14 2-18M${x} ${y - 6}v-20" stroke="#4f8a3a" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="9" fill="#f3e9f0" stroke="#8d4a8a" stroke-width="2.5"/>`;
    } else if (tipus === 'trevol') {
      s += `<rect width="250" height="200" fill="#7fb85a"/>`;
      for (let y = 22; y < 200; y += 26) for (let x = 16 + ((y / 26) % 2) * 12; x < 250; x += 26) s += `<circle cx="${x - 4}" cy="${y}" r="4" fill="#4f8a3a"/><circle cx="${x + 4}" cy="${y}" r="4" fill="#4f8a3a"/><circle cx="${x}" cy="${y - 6}" r="4" fill="#4f8a3a"/>`;
      s += ovella(70, 150, 1.2) + ovella(170, 80, 1.2) + ovella(190, 170, 1.2);
    } else {
      s += `<rect width="250" height="200" fill="#a58a66"/>`;
      for (let y = 24; y < 200; y += 22) s += `<path d="M6 ${y}q14-6 28 0t28 0 28 0 28 0 28 0 28 0 28 0 28 0 14 0" stroke="#8a6f4d" stroke-width="2" fill="none"/>`;
      s += `<path d="M60 150l4-14M66 152l8-10M180 60l4-14M186 62l8-10" stroke="#6f8a43" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    return s;
  }
  const NOMS = { blat: ['Blat', 'pa i venda'], naps: ['Naps', 'farratge d’hivern'], ordi: ['Ordi', 'cervesa i pinso'], trevol: ['Trèvol', 'pastura i adob'], guaret: ['Guaret', 'la terra descansa'] };
  const ORDRE = ['blat', 'naps', 'ordi', 'trevol'], POS = [[60, 90], [330, 90], [330, 320], [60, 320]];

  function norfolk() {
    let s = `<rect class="herba2" x="-60" width="1320" height="720"/><rect x="40" y="56" width="560" height="500" rx="10" fill="#6a8f3f" class="t"/>`;
    // sistema antic (tres fulles)
    s += `<g id="g-antic">${[['blat', 60], ['ordi', 240], ['guaret', 420]].map(([c, x]) => `<g transform="translate(${x} 90)"><svg width="160" height="430" viewBox="0 0 250 200" preserveAspectRatio="none">${conreu(c)}</svg><rect class="t nf" width="160" height="430"/></g>${retol(x + 80, 120, NOMS[c][0], { fons: c === 'guaret' ? '#d9482b' : '#2a2420', w: 110 })}`).join('')}${retol(500, 480, '1/3 sense collita', { fons: '#d9482b', w: 150 })}</g>`;
    // Norfolk: quatre parcel·les, cadascuna amb les quatre capes de conreu
    s += `<g id="g-norfolk">${POS.map(([x, y], i) => `<g transform="translate(${x} ${y})">${ORDRE.map((c) => `<g class="cv" data-i="${i}" data-c="${c}">${conreu(c)}<g transform="translate(125 26)">${retol(0, 0, NOMS[c][0] + ' · ' + NOMS[c][1], { fons: '#2a2420', w: 228 })}</g></g>`).join('')}<rect class="t nf" width="250" height="200"/><circle class="t blanc" cx="24" cy="176" r="15"/><text x="24" y="182" class="tx mig">${i + 1}</text></g>`).join('')}
      <path d="M300 78q30-26 60 0M612 270q26 30 0 60M360 548q-30 26-60 0M48 330q-26-30 0-60" class="nf s-blanc" stroke-width="6" stroke-linecap="round" marker-end="url(#m-fl)"/></g>`;
    s += `<text id="any" x="320" y="622" class="tx-gg mig" style="fill:#fff">Any 1</text><text id="sub" x="320" y="654" class="tx mig" style="fill:#fff">cada conreu passa a la parcel·la següent</text>`;
    // el cercle del bestiar
    s += `<g id="cercle"><rect class="t" x="650" y="56" width="530" height="610" rx="18" fill="#fffdf7"/><text x="915" y="100" class="tx-g mig">Per què funciona?</text>
      <circle cx="915" cy="380" r="170" class="nf" stroke="#d9cdb4" stroke-width="16"/><circle cx="915" cy="380" r="170" class="flux s-verd" stroke-width="9" data-flux="1.2"/>
      <g><circle class="t" cx="915" cy="210" r="56" fill="#7fb85a"/><text x="915" y="204" class="tx mig">naps i</text><text x="915" y="224" class="tx mig">trèvol</text></g>
      <g><circle class="t" cx="1085" cy="380" r="56" fill="#fffdf7"/>${vaca(1080, 372, 1.1)}<text x="1085" y="412" class="tx-p mig">més bestiar</text></g>
      <g><circle class="t" cx="915" cy="550" r="56" fill="#a67547"/><text x="915" y="546" class="tx mig" style="fill:#fff">més</text><text x="915" y="566" class="tx mig" style="fill:#fff">fems</text></g>
      <g><circle class="t" cx="745" cy="380" r="56" fill="#e6b93c"/><text x="745" y="374" class="tx mig">més</text><text x="745" y="394" class="tx mig">cereal</text></g>
      <text x="915" y="372" class="tx mig">terra sempre</text><text x="915" y="394" class="tx mig">fèrtil</text><text x="915" y="640" class="tx-p mig">i carn, llet i llana durant tot l’any</text></g>`;
    return svg(s);
  }
  function animaNorfolk({ k, el, svg: g }) {
    if (!g._cv) g._cv = Array.from(g.querySelectorAll('.cv'));
    const any = Math.max(0, k - 1);
    el('g-antic').style.display = k === 0 ? '' : 'none'; el('g-norfolk').style.display = k === 0 ? 'none' : '';
    g._cv.forEach((n) => { const i = +n.dataset.i, c = ORDRE[(((i - any) % 4) + 4) % 4]; n.style.display = n.dataset.c === c ? '' : 'none'; });
    el('any').textContent = k === 0 ? 'Abans: tres fulles' : 'Any ' + (any + 1);
    el('sub').textContent = k === 0 ? 'cada any, una de les tres es deixa en guaret' : 'cada conreu passa a la parcel·la següent';
    el('cercle').setAttribute('opacity', k === 0 ? 0.25 : 1);
  }

  /* ---------- sembradora de Jethro Tull ---------- */
  function sembradora() {
    let s = `<rect class="cel" x="-60" width="1320" height="540"/>${nuvol(120, 100, 1.4)}<rect class="terra" x="-60" y="540" width="1320" height="180"/><rect class="herba" x="566" y="534" width="700" height="10"/><rect x="-60" y="534" width="626" height="10" fill="#6f5338"/>`;
    s += `<g id="llavors">${Array.from({ length: 11 }, (_, i) => `<g class="ll"><path class="brot" d="M0 0v-30m0 12q-12-2-14-14m14 6q12-2 14-14" stroke="#4f8a3a" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse class="t1" cx="0" cy="4" rx="6" ry="4.5" fill="#e6b93c"/></g>`).join('')}</g>`;
    s += `${cavall(880, 540, 2.6)}<path d="M700 430L800 440" class="t" stroke-width="5"/>${persona(250, 540, 170, { color: '#7a5a3a', barret: true, brac: 'M-8-68l34 14M8-68l30 10' })}`;
    s += `<g data-part="esteves"><path d="M330 400L420 440M330 388L420 428" class="t" stroke="#8f6038" stroke-width="9"/></g>`;
    s += `<g data-part="bastidor"><path class="t fusta" d="M410 422H710V444H410Z"/></g>`;
    s += `<g data-part="rasclet"><path d="M430 444V548M452 444V548" class="t" stroke-width="6"/></g>`;
    s += `<g data-part="tremuja"><path class="t fusta" d="M450 250H610L580 340H480Z"/><path d="M462 262H598L574 330H486Z" fill="#e6b93c"/><path d="M470 270h10m14 6h10m20-8h10m-50 22h10m24 0h10m16-12h10m-70 26h10m30 4h10" stroke="#a8791c" stroke-width="5" stroke-linecap="round"/></g>`;
    s += `<g data-part="dosador"><rect class="t ferro" x="496" y="340" width="68" height="46" rx="6"/><g id="dos"><circle class="t fusta3" cx="530" cy="363" r="17"/><path d="M530 346v8M530 372v8M513 363h8M539 363h8M518 351l6 6M536 369l6 6M542 351l-6 6M524 369l-6 6" class="t2"/></g></g>`;
    s += `<g data-part="tub"><path class="t" fill="#d9b383" d="M518 386h24l22 150h-12z"/></g><ellipse id="cau" class="t1" cx="540" cy="400" rx="6" ry="4.5" fill="#e6b93c"/>`;
    s += `<g data-part="rella"><path class="t ferro" d="M552 520h34l-20 44z"/></g>`;
    s += `<g data-part="roda"><g id="sroda">${roda(640, 468, 72, { raigs: 10, color: '#a67547', gruix: 10 })}</g><path d="M640 468L530 363" class="t1 nf" stroke-dasharray="6 5"/></g>`;
    // comparació
    s += `<g><rect class="t" x="770" y="46" width="200" height="190" rx="14" fill="#a58a66"/><rect class="t" x="990" y="46" width="200" height="190" rx="14" fill="#a58a66"/>
      ${Array.from({ length: 34 }, (_, i) => `<ellipse cx="${790 + ((i * 71 + 13) % 160)}" cy="${96 + ((i * 113 + 29) % 124)}" rx="4.5" ry="3.2" fill="#e6b93c" stroke="#2a2420"/>`).join('')}
      ${[1040, 1090, 1140].map((x) => Array.from({ length: 7 }, (_, i) => `<ellipse cx="${x}" cy="${96 + i * 20}" rx="4.5" ry="3.2" fill="#e6b93c" stroke="#2a2420"/>`).join('')).join('')}
      <path d="M840 70q10-12 20 0q10-12 20 0M900 110q8-10 16 0q8-10 16 0" class="t2 nf"/>${retol(870, 60, 'a eixam (a mà)', { fons: '#d9482b', w: 150 })}${retol(1090, 60, 'en fileres', { fons: '#5b8c35', w: 110 })}
      <text x="870" y="262" class="tx-p mig">moltes es perden</text><text x="1090" y="262" class="tx-p mig">totes arrelen</text></g>`;
    return svg(s);
  }
  function animaSemb({ t, el, svg: g }) {
    if (!g._ll) g._ll = Array.from(g.querySelectorAll('.ll'));
    const d = t * 46, f = (d % 60) / 60;
    g._ll.forEach((n, i) => { const dist = (d % 60) + i * 60, x = 566 - dist; n.setAttribute('transform', `translate(${x.toFixed(1)} 560)`); const b = n.firstChild, cr = RI.clamp((dist - 150) / 260, 0, 1); b.setAttribute('transform', `scale(${cr.toFixed(2)})`); b.setAttribute('opacity', cr > 0 ? 1 : 0); });
    const c = el('cau'); c.setAttribute('cx', lerp(532, 560, f).toFixed(1)); c.setAttribute('cy', lerp(392, 556, f * f).toFixed(1));
    el('sroda').setAttribute('transform', `rotate(${(((d / 72) * 180) / Math.PI % 360).toFixed(1)} 640 468)`);
    el('dos').setAttribute('transform', `rotate(${((d * 6) % 360).toFixed(1)} 530 363)`);
  }

  /* ---------- arada de Rotherham ---------- */
  function arada() {
    let s = `<rect class="cel" x="-60" width="1320" height="500"/>${nuvol(1000, 100, 1.4)}${nuvol(200, 140, 1)}<rect class="terra" x="-60" y="500" width="1320" height="220"/><rect class="herba" x="640" y="494" width="640" height="10"/>`;
    s += `<g id="solcs">${Array.from({ length: 10 }, (_, i) => `<path class="t2" fill="#6f5338" d="M${560 - i * 80} 500q-34-44-70-6l-10 6z"/>`).join('')}</g><rect x="-60" y="500" width="700" height="6" fill="#6f5338"/>`;
    s += `${cavall(1010, 500, 2.5, '#5a4636')}${cavall(940, 500, 2.5)}<path d="M800 380L880 400" class="t nf" stroke-width="5" stroke-dasharray="6 4"/>${persona(210, 500, 170, { color: '#3d5a80', barret: true, brac: 'M-8-68l40 2M8-68l36 6' })}`;
    s += `<g data-part="esteves"><path d="M250 300L420 368M250 318L424 384" class="nf" stroke="#2a2420" stroke-width="14" stroke-linecap="round"/><path d="M250 300L420 368M250 318L424 384" class="nf" stroke="#c7935c" stroke-width="8" stroke-linecap="round"/></g>`;
    s += `<g data-part="cama"><path class="t fusta" d="M400 352L800 372V392L400 380Z"/><path d="M480 384L520 440" class="t" stroke-width="7"/></g>`;
    s += `<g data-part="orello"><path class="t ferroh" d="M560 492Q520 414 432 398L414 476Q500 482 540 530Z"/><path d="M450 420q50 14 76 60" class="t1 nf" opacity=".6"/></g>`;
    s += `<g data-part="rella"><path class="t ferro" d="M660 528L540 532L560 490Z"/></g>`;
    s += `<g data-part="ganivet"><path class="t ferro2" d="M690 378h14l-22 150-10-6z"/></g>`;
    s += `<g data-en="0">${retol(820, 560, 'talla la terra en vertical', { fons: '#2a2420', w: 240 })}</g><g data-en="1">${retol(760, 600, 'talla per sota i l’aixeca', { fons: '#2a2420', w: 230 })}</g><g data-en="2">${retol(300, 566, 'la gira i colga les males herbes', { fons: '#2a2420', w: 290 })}</g>`;
    s += `<g><rect class="t" x="60" y="40" width="330" height="150" rx="14" fill="#fffdf7"/><text x="225" y="72" class="tx mig">Arada pesant antiga</text>${cavall(110, 150, 1, '#b9a98a')}${cavall(160, 150, 1, '#b9a98a')}${cavall(210, 150, 1, '#b9a98a')}${cavall(260, 150, 1, '#b9a98a')}${persona(310, 152, 56, { color: '#7a5a3a' })}${persona(345, 152, 56, { color: '#7a5a3a' })}<text x="225" y="180" class="tx-p mig">4 o més animals i 2 persones</text>
      <rect class="t" x="420" y="40" width="330" height="150" rx="14" fill="#fff6d6"/><text x="585" y="72" class="tx mig">Arada de Rotherham</text>${cavall(520, 150, 1)}${cavall(570, 150, 1)}${persona(640, 152, 56, { color: '#3d5a80' })}<text x="585" y="180" class="tx-p mig">2 cavalls i 1 persona</text></g>`;
    return svg(s);
  }
  function animaArada({ t, el }) { el('solcs').setAttribute('transform', `translate(${(-((t * 50) % 80)).toFixed(1)} 0)`); }

  RI.capitol({
    id: 'camp', titol: 'El camp',
    escenes: [
      {
        id: 'norfolk', nom: 'La rotació Norfolk', any: 'segle XVIII', qui: 'Est d’Anglaterra', durada: 25,
        model: 'Rotació de quatre conreus · model didàctic simplificat',
        pregunta: 'Com fas produir tota la terra, cada any?',
        intro: 'El cereal esgota la terra. La solució antiga era deixar-ne una part <b>en guaret</b> (sense sembrar). El sistema Norfolk troba una manera millor de fer-la descansar.',
        svg: norfolk, anima: animaNorfolk,
        fases: [
          { fins: 0.2, nom: 'Abans: el guaret', text: 'Cada any, una de cada tres parcel·les no dona res. I a l’hivern falta menjar per al bestiar: se n’ha de matar una bona part.' },
          { fins: 0.4, nom: 'Any 1 · Quatre conreus', text: 'Blat, naps, ordi i trèvol. Cap parcel·la buida.' },
          { fins: 0.6, nom: 'Any 2 · Tot gira', text: 'On hi havia blat ara hi ha trèvol, que «adoba» la terra; on hi havia naps, blat. Cada planta gasta i torna coses diferents.' },
          { fins: 0.8, nom: 'Any 3 · El bestiar hi ajuda', text: 'Naps i trèvol alimenten vaques i ovelles tot l’any. Els seus fems tornen als camps.' },
          { fins: 1, nom: 'Any 4 · I torna a començar', text: 'En quatre anys cada parcel·la ha tingut els quatre conreus. Més cereal, més carn i llet, i la terra no s’esgota.' }
        ],
        clau: 'Més menjar amb la mateixa terra: més població, i menys pagesos necessaris. Molts aniran a la ciutat.',
        batx: { titol: 'No va ser només tècnica', text: 'La rotació es difon lentament i de manera desigual, i va lligada als tancaments de terres (<i>enclosures</i>): els grans propietaris tanquen les terres comunals i molts pagesos pobres es queden sense. La «revolució agrícola» és també un canvi de propietat. Evita explicar-la només per un invent.', font: 'https://www.bbc.co.uk/history/british/empire_seapower/agricultural_revolution_01.shtml', fontNom: 'BBC History · Agricultural Revolution in England' }
      },
      {
        id: 'sembradora', nom: 'La sembradora', any: 'c. 1701', qui: 'Jethro Tull', durada: 14,
        model: 'Sembradora de Jethro Tull, secció simplificada (una sola filera) · reconstrucció didàctica',
        pregunta: 'Com sembres sense llençar la meitat de les llavors?',
        intro: 'Sembrar «a eixam» era llançar grapats de llavor caminant. Moltes quedaven a la vista dels ocells o massa juntes. Tull construeix una màquina que les col·loca <b>d’una en una</b>.',
        svg: sembradora, anima: animaSemb,
        fases: [
          { fins: 0.25, nom: 'La tremuja guarda la llavor', text: 'Un dipòsit en forma d’embut. La llavor baixa pel seu propi pes.', focus: ['tremuja'] },
          { fins: 0.5, nom: 'El dosador les compta', text: 'Un cilindre amb osques gira mogut per la roda. A cada osca hi cap una llavor: com més avança la màquina, més llavors cauen, sempre a la mateixa distància.', focus: ['dosador', 'roda'] },
          { fins: 0.75, nom: 'La rella obre el solc', text: 'Una ganiveta de ferro obre una ratlla a la terra i el tub hi deixa la llavor, al fons, sempre a la mateixa fondària.', focus: ['rella', 'tub'] },
          { fins: 1, nom: 'El rasclet la tapa', text: 'Unes pues colguen la llavor. Queden fileres rectes: s’hi pot passar entremig per treure les males herbes.', focus: ['rasclet'] }
        ],
        parts: {
          tremuja: { nom: 'Tremuja', text: 'El dipòsit de la llavor.' },
          dosador: { nom: 'Dosador', text: 'Cilindre giratori amb osques. Deixa passar les llavors d’una en una.' },
          roda: { nom: 'Roda', text: 'A més de fer rodar la màquina, mou el dosador: per això la sembra és regular.' },
          tub: { nom: 'Tub', text: 'Condueix la llavor fins al fons del solc.' },
          rella: { nom: 'Rella', text: 'Obre el solc just davant d’on caurà la llavor.' },
          rasclet: { nom: 'Rasclet', text: 'Tapa la llavor amb terra perquè no se la mengin els ocells.' },
          bastidor: { nom: 'Bastidor', text: 'L’estructura de fusta. Les sembradores reals sembraven tres fileres alhora.' },
          esteves: { nom: 'Esteves', text: 'Els mànecs per guiar la màquina.' }
        },
        etiquetes: [['tremuja', 400, 230, 470, 280], ['dosador', 400, 330, 498, 360], ['roda', 740, 380, 690, 420], ['tub', 480, 480, 536, 470], ['rella', 660, 600, 574, 548], ['rasclet', 370, 600, 440, 530]],
        clau: 'Menys llavor, més collita: la sembra en fileres és el principi de l’agricultura mecanitzada.',
        batx: { titol: 'Un invent avançat al seu temps', text: 'Tull la construeix cap al 1701 i la publica el 1731, però les sembradores no es generalitzen a Anglaterra fins ben entrat el segle XIX: eren cares, delicades i calia terra ben treballada. Bon exemple de la distància entre invenció i difusió.', font: 'https://www.bbc.co.uk/history/historic_figures/tull_jethro.shtml', fontNom: 'BBC History · Jethro Tull' }
      },
      {
        id: 'arada', nom: 'L’arada de Rotherham', any: '1730', qui: 'Joseph Foljambe', durada: 12,
        model: 'Arada de Rotherham · reconstrucció didàctica',
        pregunta: 'Com llaures més terra amb menys animals?',
        intro: 'Llaurar és tallar una llesca de terra i girar-la. L’arada de Rotherham ho fa amb un bastidor triangular lleuger i un <b>orelló corbat folrat de ferro</b>.',
        svg: arada, anima: animaArada,
        fases: [
          { fins: 0.25, nom: 'El ganivet talla', text: 'Una fulla vertical va al davant i talla la terra com un ganivet talla el pa.', focus: ['ganivet'] },
          { fins: 0.5, nom: 'La rella aixeca', text: 'La punta de ferro avança sota terra i separa la llesca del fons.', focus: ['rella'] },
          { fins: 0.75, nom: 'L’orelló gira', text: 'La terra llisca per la planxa corbada i queda capgirada: les males herbes a sota, la terra fresca a sobre.', focus: ['orello'] },
          { fins: 1, nom: 'Més lleugera', text: 'Com que pesa poc i llisca bé, n’hi ha prou amb dos cavalls i una sola persona. Es llaura més de pressa i més barat.', focus: ['cama', 'esteves'] }
        ],
        parts: {
          ganivet: { nom: 'Ganivet', text: 'Fulla de ferro que talla la terra en vertical.' },
          rella: { nom: 'Rella', text: 'La punta que talla la terra per sota.' },
          orello: { nom: 'Orelló', text: 'Planxa corbada, folrada de ferro, que gira la terra. La seva forma és la gran millora.' },
          cama: { nom: 'Cama', text: 'La biga principal, d’on estiren els animals.' },
          esteves: { nom: 'Esteves', text: 'Els dos mànecs amb què el pagès guia l’arada.' }
        },
        etiquetes: [['ganivet', 790, 300, 700, 400], ['rella', 720, 640, 620, 528], ['orello', 430, 640, 470, 470, 'Orelló'], ['cama', 600, 300, 600, 378], ['esteves', 200, 250, 290, 318]],
        clau: 'Ferro al camp: eines més eficients alliberen braços i animals.',
        batx: { titol: 'Del taller a la fàbrica', text: 'L’arada de Rotherham es va fabricar en sèrie, amb peces iguals, i més endavant totalment de ferro (Ransome, 1785, rella de ferro colat). L’agricultura esdevé client de la siderúrgia: un altre fil que lliga el camp amb la indústria.', font: 'https://www.bbc.co.uk/history/british/empire_seapower/agricultural_revolution_01.shtml', fontNom: 'BBC History · Agricultural Revolution in England' }
      }
    ],
    repte: [
      { q: 'Què és el guaret?', o: ['Un tipus de blat', 'Deixar una terra sense sembrar perquè es recuperi', 'Una eina per llaurar'], c: 1, e: 'Era la manera antiga de fer descansar la terra, però deixava una part del camp sense collita.' },
      { q: 'Quins quatre conreus fan girar el sistema Norfolk?', o: ['Blat, naps, ordi i trèvol', 'Blat, patates, vinya i olivera', 'Arròs, cotó, blat i sucre'], c: 0, e: 'Dos cereals i dues plantes farratgeres que es van alternant.' },
      { q: 'Per què els naps i el trèvol són tan importants?', o: ['Perquè es venen molt cars', 'Perquè alimenten el bestiar i ajuden a recuperar la terra', 'Perquè no necessiten aigua'], c: 1, e: 'Més farratge vol dir més animals, més fems i terra més fèrtil.' },
      { q: 'Què fa el dosador de la sembradora?', o: ['Obre el solc', 'Deixa caure les llavors d’una en una', 'Tapa la llavor'], c: 1, e: 'És un cilindre amb osques que gira amb la roda.' },
      { q: 'Quin avantatge té sembrar en fileres?', o: ['Es gasta menys llavor i es pot desherbar entremig', 'Les plantes creixen sense sol', 'No cal llaurar'], c: 0, e: 'Totes les llavors queden colgades, separades i en línia.' },
      { q: 'Què va canviar amb l’arada de Rotherham?', o: ['Calien més bous', 'N’hi havia prou amb dos cavalls i una persona', 'Ja no calia sembrar'], c: 1, e: 'Era lleugera i el seu orelló de ferro girava la terra amb menys esforç.' }
    ]
  });
})();
