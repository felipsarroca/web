// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 7 · El vaixell de vapor: el Great Western, pales contra hèlix i la travessia de l'Atlàntic. */
(function () {
  const { svg, focs, roda, persona, nuvol, txt, retol, fletxa, tram, lerp } = RI;
  const S = { x: 670, y: 420 }, PIV = { x: 566, y: 545 }, MIG = 104, RC = 30, LB = 120;
  const ones = (y, c) => `<path d="M-60 ${y}${Array.from({ length: 34 }, () => 'q10-7 20 0t20 0').join('')}" class="nf" stroke="${c || '#fff'}" stroke-width="2.5"/>`;
  const pales = (cx, cy, r, n) => Array.from({ length: n }, (_, i) => { const a = (i * 2 * Math.PI) / n, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; return `<rect class="t2 fusta3" x="${(x - 5).toFixed(1)}" y="${(y - 16).toFixed(1)}" width="10" height="32" transform="rotate(${((a * 180) / Math.PI + 90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('');

  /* ---------- 1 · el Great Western en tall ---------- */
  function western() {
    let s = `<rect class="cel" x="-60" width="1320" height="470"/>${nuvol(900, 80, 1.5)}${nuvol(60, 130, 1.1)}<rect x="-60" y="470" width="1320" height="250" fill="#2f7fb5"/>`;
    // veles i pals
    s += `<g data-part="veles">${[[170, 120], [470, 90], [840, 90], [990, 130]].map(([x, y]) => `<rect class="t fusta2" x="${x - 5}" y="${y}" width="10" height="${380 - y}"/><path class="t blanc" d="M${x + 8} ${y + 30}L${x + 110} ${y + 60}L${x + 120} ${y + 190}L${x + 8} ${y + 200}Z"/><path d="M${x + 8} ${y + 30}L${x + 110} ${y + 60}" class="t4" stroke="#8f6038"/>`).join('')}<path class="t vermell" d="M165 120v-34l50 12-50 12"/><path d="M1110 372L1190 340" class="t4" stroke="#8f6038"/></g>`;
    // buc
    s += `<path class="t" fill="#3d454b" d="M84 372H1124Q1100 480 1036 578H170Q104 540 84 372Z"/><path fill="#efe3c6" class="t2" d="M110 392H1092Q1072 474 1024 558H186Q130 520 110 392Z"/><rect class="t fusta" x="80" y="366" width="1048" height="14" rx="5"/>`;
    // interior
    s += `<g data-part="cabines"><rect class="t2" x="122" y="396" width="92" height="78" fill="#f7d9c4"/><rect class="t vidre" x="134" y="408" width="22" height="18"/><rect class="t vidre" x="170" y="408" width="22" height="18"/>${persona(150, 474, 44, { color: '#7a4f9a' })}${persona(190, 474, 44, { color: '#3d5a80', barret: true })}
      <rect class="t2" x="810" y="396" width="150" height="78" fill="#f7d9c4"/><rect class="t vidre" x="824" y="408" width="22" height="18"/><rect class="t vidre" x="864" y="408" width="22" height="18"/><rect class="t vidre" x="904" y="408" width="22" height="18"/>${persona(850, 474, 44, { color: '#b9722a' })}${persona(920, 474, 44, { color: '#5b8c35', barret: true })}</g>`;
    s += `<g data-part="carrega"><rect class="t fusta3" x="820" y="500" width="40" height="40"/><rect class="t fusta3" x="864" y="500" width="40" height="40"/><rect class="t fusta3" x="842" y="480" width="40" height="22"/><ellipse class="t fusta2" cx="940" cy="520" rx="22" ry="20"/><ellipse class="t fusta2" cx="985" cy="524" rx="18" ry="16"/><path d="M820 520h84M842 490h40" class="t1"/></g>`;
    s += `<g data-part="carbonera"><path class="t carbo" d="M222 556V430q36-22 72 0V556z"/><path class="t carbo" d="M196 556V490h26v66zM790 556V440q-18-10-36 0v116z"/></g>`;
    s += `<g data-part="calderes"><rect class="t ferro" x="302" y="420" width="140" height="136" rx="10"/><rect x="310" y="428" width="124" height="60" rx="5" class="aigua2"/><rect class="t fosc" x="312" y="498" width="54" height="50" rx="4"/><rect class="t fosc" x="378" y="498" width="54" height="50" rx="4"/>${focs(326, 546, 2, 26, 22, 34)}${focs(392, 546, 2, 26, 22, 34)}<g data-puf="350 440 0 -14 3 5 1.3" class="vap"></g><g data-puf="400 440 0 -14 3 5 1.6" class="vap"></g></g>`;
    s += `<g data-part="xemeneia"><path class="t negre" d="M352 420V170h40V420z"/><rect class="t vermell" x="350" y="170" width="44" height="26"/></g><g data-puf="372 160 -200 -80 7 18 2" class="fum"></g>`;
    s += `<path d="M442 440H476" class="nf" stroke="#2a2420" stroke-width="13"/><path d="M442 440H476" class="nf" stroke="#f0ab68" stroke-width="8"/>`;
    // roda de pales (darrere de la màquina)
    s += `<g data-part="roda"><g id="vroda">${roda(S.x, S.y, 112, { raigs: 12, color: '#a8452f', gruix: 8, raig: 4, extra: pales(S.x, S.y, 104, 12) })}</g><path d="M548 380A122 122 0 0 1 792 380" class="t nf" stroke-width="7"/><path d="M548 380A122 122 0 0 1 792 380" class="nf" stroke="#c7935c" stroke-width="3"/></g>`;
    // màquina de palanques laterals
    s += `<g data-part="maquina"><rect class="t pedra" x="456" y="548" width="250" height="12"/><rect id="vcam" x="476" y="436" width="40" height="40" fill="#f9a35e"/><path d="M468 428H524V524H468ZM476 436V516H516V436Z" class="t" fill="#f08a4b" fill-rule="evenodd"/>
      <g id="vpist"><rect class="t ferro" x="476" y="-5" width="40" height="10"/><rect class="t ferro" x="492" y="-72" width="8" height="72"/><rect class="t ferro" x="452" y="-78" width="50" height="9" rx="3"/></g><line id="vtija" x1="458" y1="400" x2="458" y2="545" class="t" stroke-width="6"/>
      <g id="vpal"><path class="t ferro" d="M${PIV.x - MIG - 8} ${PIV.y}L${PIV.x} ${PIV.y - 16}L${PIV.x + MIG + 8} ${PIV.y}L${PIV.x} ${PIV.y + 16}Z"/></g><circle class="t llauto" cx="${PIV.x}" cy="${PIV.y}" r="9"/>
      <line id="vbiela" x1="670" y1="545" x2="670" y2="420" stroke="#2a2420" stroke-width="13" stroke-linecap="round"/><line id="vbiela2" x1="670" y1="545" x2="670" y2="420" stroke="#b4bec4" stroke-width="7" stroke-linecap="round"/><line id="vman" x1="670" y1="420" x2="700" y2="420" stroke="#2a2420" stroke-width="15" stroke-linecap="round"/><circle class="t llauto" cx="670" cy="420" r="13"/></g>`;
    // aigua per davant
    s += `<rect x="-60" y="470" width="1320" height="250" fill="#2f7fb5" opacity=".28"/>${ones(470)}${ones(520, '#8cc3e6')}${ones(600, '#8cc3e6')}${ones(670, '#8cc3e6')}`;
    s += `<g data-puf="600 474 -80 -10 5 9 0.9" class="vap" opacity=".8"></g>${fletxa('M1040 640H1180', '#fffdf7', 6)}<text x="1110" y="678" class="tx-b mig">avança</text><g data-en="2">${fletxa('M900 610H740', '#fffdf7', 6)}<text x="820" y="650" class="tx-b mig">les pales empenyen l’aigua enrere</text></g>`;
    return svg(s);
  }
  function animaWestern({ t, el }) {
    const th = t * 2.2, C = { x: S.x + RC * Math.cos(th), y: S.y + RC * Math.sin(th) };
    const ey = C.y + Math.sqrt(LB * LB - Math.pow(C.x - 670, 2)), fi = Math.asin((ey - PIV.y) / MIG), g = (fi * 180) / Math.PI;
    const E = { x: PIV.x + MIG * Math.cos(fi), y: PIV.y + MIG * Math.sin(fi) }, A = { x: PIV.x - MIG * Math.cos(fi), y: PIV.y - MIG * Math.sin(fi) };
    el('vroda').setAttribute('transform', `rotate(${(((th * 180) / Math.PI) % 360).toFixed(1)} ${S.x} ${S.y})`);
    el('vpal').setAttribute('transform', `rotate(${g.toFixed(2)} ${PIV.x} ${PIV.y})`);
    ['vbiela', 'vbiela2'].forEach((id) => { const l = el(id); l.setAttribute('x1', E.x.toFixed(1)); l.setAttribute('y1', E.y.toFixed(1)); l.setAttribute('x2', C.x.toFixed(1)); l.setAttribute('y2', C.y.toFixed(1)); });
    const m = el('vman'); m.setAttribute('x2', C.x.toFixed(1)); m.setAttribute('y2', C.y.toFixed(1));
    const yp = 476 + (A.y - PIV.y);
    el('vpist').setAttribute('transform', `translate(0 ${yp.toFixed(1)})`);
    const tj = el('vtija'); tj.setAttribute('x2', A.x.toFixed(1)); tj.setAttribute('y2', A.y.toFixed(1)); tj.setAttribute('y1', (yp - 74).toFixed(1));
    const puja = Math.cos(th) > 0;
    const c = el('vcam'); if (puja) { c.setAttribute('y', (yp + 5).toFixed(1)); c.setAttribute('height', Math.max(0, 516 - yp - 5).toFixed(1)); } else { c.setAttribute('y', 436); c.setAttribute('height', Math.max(0, yp - 5 - 436).toFixed(1)); }
  }

  /* ---------- 2 · pales contra hèlix ---------- */
  function prova() {
    let s = `<rect class="cel" x="-60" width="1320" height="420"/>${nuvol(200, 90, 1.4)}${nuvol(950, 120, 1.2)}<rect x="-60" y="420" width="1320" height="300" fill="#2f7fb5"/>`;
    s += `<g id="parella">`;
    // Rattler (hèlix), mira a l'esquerra
    s += `<g data-part="rattler"><path class="t" fill="#3d454b" d="M110 350H560V440Q560 470 530 470H190Q130 440 110 350Z"/><rect class="t fusta" x="104" y="342" width="460" height="12" rx="4"/><path class="t negre" d="M330 342V230h34V342z"/><rect class="t fusta2" x="205" y="150" width="8" height="192"/><rect class="t fusta2" x="455" y="170" width="8" height="172"/><path class="t blanc" d="M216 180l80 30v90l-80 12z" opacity=".9"/>
      <path d="M560 448H600" class="t" stroke-width="7"/><g id="helix"><ellipse class="t llauto" cx="606" cy="424" rx="9" ry="24"/><ellipse class="t llauto" cx="606" cy="472" rx="9" ry="24"/></g><circle class="t ferro" cx="606" cy="448" r="7"/>${retol(330, 300, 'RATTLER · hèlix', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 170 })}</g><g data-puf="347 222 60 -70 6 14 1.6" class="fum"></g>`;
    // Alecto (pales), mira a la dreta
    s += `<g data-part="alecto"><path class="t" fill="#5a4636" d="M1090 350H640V440Q640 470 670 470H1010Q1070 440 1090 350Z"/><rect class="t fusta" x="636" y="342" width="460" height="12" rx="4"/><path class="t negre" d="M790 342V230h34V342z"/><rect class="t fusta2" x="735" y="170" width="8" height="172"/><rect class="t fusta2" x="985" y="150" width="8" height="192"/><path class="t blanc" d="M982 180l-80 30v90l80 12z" opacity=".9"/>
      <g id="pales2">${roda(880, 400, 80, { raigs: 10, color: '#a8452f', gruix: 7, raig: 3.5, extra: pales(880, 400, 74, 10) })}</g><path d="M792 342A90 90 0 0 1 968 342" class="t nf" stroke-width="6"/>${retol(880, 300, 'ALECTO · pales', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 160 })}</g><g data-puf="807 222 -60 -70 6 14 1.6" class="fum"></g>`;
    s += `<path d="M560 380Q600 392 640 380" class="t nf" stroke-width="5" stroke="#c7935c"/>`;
    s += `</g>`;
    s += `<rect x="-60" y="420" width="1320" height="300" fill="#2f7fb5" opacity=".3"/>${ones(420)}${ones(500, '#8cc3e6')}`;
    s += `<g id="esc-h" opacity="0"><g data-puf="640 448 90 0 5 9 0.8" class="vap"></g></g><g id="esc-p" opacity="0"><g data-puf="850 440 -90 -10 5 9 0.8" class="vap"></g></g>`;
    s += `<g data-en="2">${fletxa('M560 560H300', '#fffdf7', 8)}<text x="430" y="600" class="tx-b mig">l’hèlix arrossega l’altre vaixell, popa endavant</text></g>`;
    s += `<g>${retol(250, 660, 'sempre treballa sota l’aigua', { fons: '#2a2420', w: 270 })}${retol(590, 660, 'les onades no la trenquen', { fons: '#2a2420', w: 250 })}${retol(940, 660, 'deixa lliures els costats del buc', { fons: '#2a2420', w: 290 })}</g>`;
    return svg(s);
  }
  function animaProva({ p, t, k, el }) {
    const marxa = k >= 1, dx = k < 2 ? 0 : tram(p, 0.6, 1, 0, -230, true);
    el('parella').setAttribute('transform', `translate(${dx.toFixed(1)} ${(Math.sin(t * 1.4) * 3).toFixed(1)})`);
    el('esc-h').setAttribute('transform', `translate(${dx.toFixed(1)} 0)`); el('esc-p').setAttribute('transform', `translate(${dx.toFixed(1)} 0)`);
    el('esc-h').setAttribute('opacity', marxa ? 1 : 0); el('esc-p').setAttribute('opacity', marxa ? 1 : 0);
    if (marxa) { el('pales2').setAttribute('transform', `rotate(${((t * 150) % 360).toFixed(1)} 880 400)`); el('helix').setAttribute('transform', `translate(606 448) scale(1 ${Math.cos(t * 14).toFixed(2)}) translate(-606 -448)`); }
  }

  /* ---------- 3 · travessar l'Atlàntic ---------- */
  function atlantic() {
    let s = `<rect x="-60" width="1320" height="720" fill="#9fcbe6"/>${ones(120, '#d6ecf8')}${ones(380, '#d6ecf8')}${ones(600, '#d6ecf8')}`;
    s += `<path class="t" fill="#b9cf8a" d="M-60 40Q120 60 150 200T110 420Q170 560 60 720H-60Z"/><path class="t" fill="#b9cf8a" d="M1260 60Q1090 80 1070 200T1120 380Q1040 520 1130 720H1260Z"/>`;
    s += `<circle class="t vermell" cx="150" cy="300" r="10"/><text x="60" y="270" class="tx-g mig">Nova York</text><circle class="t vermell" cx="1070" cy="250" r="10"/><text x="1160" y="220" class="tx-g mig">Bristol</text><text x="610" y="70" class="tx-g mig">Oceà Atlàntic · uns 5.500 km</text>`;
    s += `<path d="M1060 255Q600 180 160 300" class="t nf" stroke-dasharray="3 10"/><path id="ruta-v" d="M1060 262Q950 420 840 380T620 470T400 400T160 310" class="t nf" stroke-dasharray="3 10" opacity=".7"/>`;
    s += `<g id="b-vapor"><path class="t" fill="#3d454b" d="M-46 0h92l-12 22h-68z"/><rect class="t negre" x="-8" y="-30" width="13" height="30"/><circle class="t vermell" cx="4" cy="12" r="11"/><g data-puf="-2 -34 60 -30 4 8 1.2" class="fum"></g></g>`;
    s += `<g id="b-vela"><path class="t" fill="#8f6038" d="M-46 0h92l-12 22h-68z"/><path class="t blanc" d="M-22 -4v-52l30 26zM10 -4v-62l34 34z"/><path d="M-22 0v-58M10 0v-68" class="t"/></g>`;
    s += `<g><rect class="t" x="470" y="560" width="280" height="110" rx="16" fill="#fffdf7"/><text x="610" y="600" class="tx mig">dies de viatge</text><text id="dia" x="610" y="652" class="tx-gg mig" style="font-size:46px">0</text></g>`;
    s += `<g id="a-vapor" opacity="0">${retol(420, 170, 'Great Western (1838): 15 dies', { fons: '#d9482b', w: 290, h: 36 })}</g><g id="a-vela" opacity="0">${retol(330, 480, 'veler de línia: uns 35 dies, segons el vent', { fons: '#2a2420', w: 380, h: 36 })}</g>`;
    return svg(s);
  }
  function animaAtl({ p, el, svg: g }) {
    const d = Math.min(35, p * 37), fv = Math.min(1, d / 15), fs = Math.min(1, d / 35);
    const bz = (t) => ({ x: (1 - t) * (1 - t) * 1060 + 2 * (1 - t) * t * 600 + t * t * 160, y: (1 - t) * (1 - t) * 255 + 2 * (1 - t) * t * 180 + t * t * 300 });
    const a = bz(fv); el('b-vapor').setAttribute('transform', `translate(${a.x.toFixed(1)} ${(a.y - 26).toFixed(1)})`);
    const r = el('ruta-v'), l = g._lv || (g._lv = r.getTotalLength()), b = r.getPointAtLength(l * fs);
    el('b-vela').setAttribute('transform', `translate(${b.x.toFixed(1)} ${(b.y - 26).toFixed(1)})`);
    el('dia').textContent = Math.floor(d); el('a-vapor').setAttribute('opacity', d >= 15 ? 1 : 0); el('a-vela').setAttribute('opacity', d >= 35 ? 1 : 0);
  }

  RI.capitol({
    id: 'vaixell', titol: 'El vaixell de vapor',
    escenes: [
      {
        id: 'western', nom: 'Per dins d’un vapor', any: '1838', qui: 'I. K. Brunel · SS Great Western', durada: 16,
        model: 'Vapor de pales Great Western (1838), secció simplificada · reconstrucció didàctica',
        pregunta: 'Com navegues sense esperar el vent?',
        intro: 'El <b>Great Western</b> va ser el primer vapor construït expressament per travessar l’Atlàntic. Per dins és una fàbrica flotant: carbó, calderes, màquina i dues rodes de pales.',
        svg: western, anima: animaWestern,
        fases: [
          { fins: 0.25, nom: 'Carbó a les calderes', text: 'Els fogoners alimenten el foc dia i nit. Les carboneres ocupen una gran part del vaixell: en un viatge se’n cremen centenars de tones.', focus: ['carbonera', 'calderes', 'xemeneia'] },
          { fins: 0.5, nom: 'El vapor mou la màquina', text: 'El vapor empeny el pistó amunt i avall. Unes palanques baixes, a banda i banda, passen el moviment a la biela sense ocupar alçada.', focus: ['maquina'] },
          { fins: 0.75, nom: 'L’eix fa girar les pales', text: 'La biela fa girar la manovella i l’eix, que travessa el buc. A cada costat hi ha una roda: les pales entren a l’aigua i l’empenyen enrere.', focus: ['maquina', 'roda'] },
          { fins: 1, nom: 'I les veles?', text: 'Encara hi són. Ajuden quan el vent és bo, estalvien carbó i són l’assegurança si la màquina s’espatlla.', focus: ['veles', 'cabines', 'carrega'] }
        ],
        parts: {
          calderes: { nom: 'Calderes', text: 'Quatre grans dipòsits de ferro plens d’aigua de mar. El foc els travessa per dins i produeix el vapor.' },
          carbonera: { nom: 'Carboneres', text: 'Els magatzems de carbó. Com més lluny vas, més carbó necessites i menys espai queda per a la càrrega.' },
          xemeneia: { nom: 'Xemeneia', text: 'Treu el fum de les calderes per sobre de la coberta i de les veles.' },
          maquina: { nom: 'Màquina de palanques laterals', text: 'Cilindre vertical, pistó, palanca i biela. És una màquina de balancí girada cap per avall perquè hi càpiga sota coberta.' },
          roda: { nom: 'Roda de pales', text: 'Com una roda hidràulica que funciona al revés: no és l’aigua qui la mou, és ella qui empeny l’aigua.' },
          veles: { nom: 'Pals i veles', text: 'Quatre pals amb veles auxiliars. Els vapors en van portar durant dècades.' },
          cabines: { nom: 'Cabines', text: 'Hi viatjaven uns 150 passatgers, amb saló i menjador. El bitllet era molt car.' },
          carrega: { nom: 'Bodega', text: 'Correu, mercaderies de valor i equipatges.' }
        },
        etiquetes: [['veles', 640, 130, 590, 180, 'Pals i veles'], ['xemeneia', 270, 230, 352, 260], ['calderes', 300, 640, 360, 540], ['carbonera', 130, 620, 240, 520, 'Carboneres'], ['maquina', 480, 690, 500, 552, 'Màquina'], ['roda', 780, 280, 740, 330, 'Roda de pales'], ['cabines', 1020, 330, 900, 410], ['carrega', 1090, 560, 990, 524, 'Bodega']],
        clau: 'El vapor dona al mar el que el tren dona a la terra: horaris. El vaixell surt i arriba el dia previst.',
        batx: { titol: 'El problema del carbó', text: 'Molts científics deien que cap vapor podria carregar prou carbó per creuar l’oceà. Brunel va entendre que la capacitat creix amb el cub de la mida i la resistència de l’aigua només amb el quadrat: calia fer el vaixell més gran. Relaciona-ho amb les estacions carboneres i l’expansió colonial.', font: 'https://www.ssgreatbritain.org/brunel/', fontNom: 'Brunel’s SS Great Britain · Brunel i els seus vaixells' }
      },
      {
        id: 'helix', nom: 'Pales o hèlix?', any: '1845', qui: 'Prova de la marina britànica', durada: 14,
        model: 'Prova entre el Rattler i l’Alecto (3 d’abril de 1845) · esquema didàctic',
        pregunta: 'Quin sistema empeny millor?',
        intro: 'Les rodes de pales tenien defectes: amb mala mar una sortia de l’aigua, i un canó les destrossava. L’<b>hèlix</b> era la candidata. Per decidir-ho, van lligar dos vaixells iguals per la popa.',
        svg: prova, anima: animaProva,
        fases: [
          { fins: 0.25, nom: 'Dos vaixells gairebé iguals', text: 'Mateixa mida i màquines de potència semblant. L’un porta hèlix; l’altre, rodes de pales. Un cable els uneix popa amb popa.', focus: ['rattler', 'alecto'] },
          { fins: 0.6, nom: 'Tots dos a tota màquina', text: 'Cadascú estira cap al seu costat. L’aigua bull al voltant de les pales i darrere l’hèlix.' },
          { fins: 1, nom: 'L’hèlix guanya', text: 'El Rattler arrossega l’Alecto cap enrere a uns 2,5 nusos. Des d’aleshores, els vaixells nous es fan amb hèlix.', focus: ['rattler'] }
        ],
        parts: {
          rattler: { nom: 'HMS Rattler', text: 'Vaixell d’hèlix. L’hèlix és un cargol que es rosca dins l’aigua: en girar, l’empeny enrere i el vaixell avança.' },
          alecto: { nom: 'HMS Alecto', text: 'Vaixell de rodes de pales. Funciona bé en rius i en mar calma, però pateix amb les onades.' }
        },
        clau: 'Hèlix + buc de ferro + vapor: la combinació dels grans vaixells de la segona meitat del segle XIX.',
        batx: { titol: 'Una demostració pensada per convèncer', text: 'La prova va ser més un espectacle públic que un experiment net (el Rattler ja havia guanyat curses abans). Mostra com es legitima una tecnologia nova davant l’opinió i el govern. El 1843 Brunel ja havia construït el Great Britain, de ferro i amb hèlix.', font: 'https://www.ssgreatbritain.org/', fontNom: 'Brunel’s SS Great Britain' }
      },
      {
        id: 'atlantic', nom: 'Travessar l’Atlàntic', any: '1838', durada: 16,
        pregunta: 'Quants dies guanya el vapor?',
        intro: 'Un veler depèn del vent: fa ziga-zagues, s’atura amb la calma i ningú sap quin dia arribarà. El vapor va recte i a velocitat constant.',
        svg: atlantic, anima: animaAtl,
        fases: [
          { fins: 0.42, nom: 'El vapor: 15 dies', text: 'L’abril de 1838 el Great Western va de Bristol a Nova York en 15 dies. I encara li sobrava carbó.' },
          { fins: 1, nom: 'El veler: uns 35 dies', text: 'Cap a l’oest, contra els vents dominants, un bon veler de línia necessitava cinc setmanes o més. De tornada, unes tres.' }
        ],
        clau: 'De cinc setmanes incertes a dues setmanes segures. Cap al 1880, una setmana.',
        batx: { titol: 'Un món més petit', text: 'Vapor, ferrocarril i telègraf (cable transatlàntic, 1866) formen la primera globalització: emigració massiva d’europeus a Amèrica, blat i cotó barats, imperis colonials. Tria un d’aquests efectes i explica quin paper hi té el vaixell de vapor.', font: 'https://www.ssgreatbritain.org/brunel/', fontNom: 'Brunel’s SS Great Britain' }
      }
    ],
    repte: [
      { q: 'Què fa moure un vaixell de pales?', o: ['El vent a les veles', 'Les pales, que empenyen l’aigua enrere', 'El corrent del mar'], c: 1, e: 'La màquina fa girar les rodes i les pales empenyen l’aigua: el vaixell avança en sentit contrari.' },
      { q: 'Per què el Great Western encara portava veles?', o: ['Per decoració', 'Per estalviar carbó i com a seguretat si fallava la màquina', 'Perquè no tenia màquina'], c: 1, e: 'Els primers vapors combinaven els dos sistemes.' },
      { q: 'Quin era el gran problema dels viatges llargs amb vapor?', o: ['El carbó ocupava molt espai', 'Les pales feien soroll', 'No hi havia mariners'], c: 0, e: 'Com més llarg el viatge, més carbó i menys lloc per a càrrega i passatgers.' },
      { q: 'Què va demostrar la prova del Rattler i l’Alecto?', o: ['Que les pales eren més ràpides', 'Que l’hèlix empenyia millor que les pales', 'Que la vela guanyava el vapor'], c: 1, e: 'El vaixell d’hèlix va arrossegar el de pales cap enrere.' },
      { q: 'Quin avantatge té l’hèlix amb mala mar?', o: ['Treballa sempre sota l’aigua', 'Pesa menys que una vela', 'No necessita màquina'], c: 0, e: 'Les rodes de pales sortien de l’aigua quan el vaixell es balancejava.' },
      { q: 'Quant va trigar el Great Western a creuar l’Atlàntic el 1838?', o: ['3 dies', '15 dies', '60 dies'], c: 1, e: 'Un veler necessitava unes cinc setmanes en el mateix sentit.' }
    ]
  });
})();
