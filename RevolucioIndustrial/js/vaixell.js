// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 7 · El vaixell de vapor: el Great Western, pales contra hèlix i la travessia de l'Atlàntic. */
(function () {
  const { svg, focs, roda, persona, nuvol, txt, retol, fletxa, tram, lerp } = RI;
  const S = { x: 670, y: 420 }, PIV = { x: 566, y: 545 }, MIG = 104, RC = 30, LB = 120;
  const ones = (y, c) => `<path d="M-60 ${y}${Array.from({ length: 34 }, () => 'q10-7 20 0t20 0').join('')}" class="nf" stroke="${c || '#fff'}" stroke-width="2.5"/>`;
  const pales = (cx, cy, r, n) => Array.from({ length: n }, (_, i) => { const a = (i * 2 * Math.PI) / n, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; return `<rect class="t2 fusta3" x="${(x - 5).toFixed(1)}" y="${(y - 16).toFixed(1)}" width="10" height="32" transform="rotate(${((a * 180) / Math.PI + 90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('');

  /* ---------- 1 · el Great Western en tall ---------- */
  function western() {
    let s = `<rect class="cel" x="-60" width="1320" height="470"/>${nuvol(900, 78, 1.5)}${nuvol(60, 128, 1.1)}<rect x="-60" y="470" width="1320" height="250" fill="url(#g-mar)"/>`;
    s += ones(470, '#e6f5fc') + ones(525, '#8cc3e6') + ones(605, '#76b5dc') + ones(672, '#5a9ec8');
    s += `<g data-guia="1"><path d="M468 366v-64M842 366v-64M372 420v-58M670 420l54-26M560 545l36 36M372 520l-42 26"/></g>`;
    // pals, eixàrcia i veles auxiliars amb botavares i estais
    s += `<g data-part="veles" data-exp="0 -64">${[[168, 118], [468, 86], [842, 86], [990, 126]].map(([x, y]) => `
      <rect class="t fusta2" x="${x - 5}" y="${y}" width="10" height="${380 - y}"/>
      <path d="M${x} ${y + 12}L${x - 66} 366M${x} ${y + 12}L${x + 120} 366" stroke="#2a2420" stroke-width="1.4" opacity=".45"/>
      <path class="t blanc" d="M${x + 8} ${y + 28}L${x + 114} ${y + 56}Q${x + 126} ${y + 125} ${x + 120} ${y + 188}L${x + 8} ${y + 198}Z"/>
      <path d="M${x + 8} ${y + 28}L${x + 114} ${y + 56}M${x + 8} ${y + 198}L${x + 120} ${y + 188}" class="t4" stroke="#8f6038"/>`).join('')}
      <path class="t vermell" d="M163 118v-32l52 12-52 12"/><path d="M1110 372L1204 334" class="t4" stroke="#8f6038"/><path d="M990 132L1200 335" stroke="#2a2420" stroke-width="1.6" opacity=".5"/></g>`;
    // buc en secció nítida (sense vel blau a sobre) amb timó a popa i doble folre de coure
    s += `<path class="t" fill="#32393f" d="M84 372H1130Q1104 484 1038 580H170Q104 542 84 372Z"/>`;
    s += `<path class="t" fill="url(#g-coure)" d="M104 470H1096Q1078 528 1038 580H170Q122 544 104 470Z"/>`;
    s += `<path class="t" fill="#32393f" d="M84 372H1130L1096 470H104Z"/>`;
    s += `<path fill="#efe3c6" class="t2" d="M112 392H1092Q1072 474 1024 558H186Q130 520 112 392Z"/><path d="M260 558V578M380 558V578M500 558V578M620 558V578M740 558V578M860 558V578" stroke="#4a2b16" stroke-width="3" opacity=".55"/>`;
    s += `<path class="t" fill="url(#g-fustac)" d="M84 480l-22 6 4 72 34-6z"/>`;
    s += `<rect class="t" fill="url(#g-fustac)" x="80" y="366" width="1054" height="14" rx="5"/>`;
    // línia de flotació subtil fora del buc
    s += `<path d="M-40 470H92M1104 470H1240" stroke="#fffdf7" stroke-width="3" stroke-dasharray="10 7" opacity=".85"/>`;
    // interior: cabines, bodega, carboneres, calderes, xemeneia
    s += `<g data-part="cabines" data-exp="0 -34"><rect class="t2" x="122" y="396" width="92" height="78" fill="#f7d9c4"/><rect class="t vidre" x="134" y="408" width="22" height="18"/><rect class="t vidre" x="170" y="408" width="22" height="18"/>${persona(150, 474, 44, { color: '#7a4f9a' })}${persona(190, 474, 44, { color: '#3d5a80', barret: true })}
      <rect class="t2" x="810" y="396" width="150" height="78" fill="#f7d9c4"/><rect class="t vidre" x="824" y="408" width="22" height="18"/><rect class="t vidre" x="864" y="408" width="22" height="18"/><rect class="t vidre" x="904" y="408" width="22" height="18"/>${persona(850, 474, 44, { color: '#b9722a' })}${persona(920, 474, 44, { color: '#5b8c35', barret: true })}</g>`;
    s += `<g data-part="carrega" data-exp="52 36"><rect class="t fusta3" x="820" y="500" width="40" height="40"/><rect class="t fusta3" x="864" y="500" width="40" height="40"/><rect class="t fusta3" x="842" y="480" width="40" height="22"/><ellipse class="t fusta2" cx="940" cy="520" rx="22" ry="20"/><ellipse class="t fusta2" cx="985" cy="524" rx="18" ry="16"/><path d="M820 520h84M842 490h40" class="t1"/></g>`;
    s += `<g data-part="carbonera" data-exp="-44 26"><path class="t carbo" d="M222 556V430q36-22 72 0V556z"/><path class="t carbo" d="M196 556V490h26v66zM790 556V440q-18-10-36 0v116z"/></g>`;
    s += `<g data-part="calderes" data-exp="-38 28"><rect class="t" fill="url(#g-ferroc)" x="302" y="420" width="140" height="136" rx="10"/><path d="M312 492h120" stroke="#9aa6af" stroke-width="2" stroke-dasharray="2 10" opacity=".6"/><rect x="310" y="428" width="124" height="60" rx="5" class="aigua2"/><rect class="t fosc" x="312" y="498" width="54" height="50" rx="4"/><rect class="t fosc" x="378" y="498" width="54" height="50" rx="4"/>${focs(326, 546, 2, 26, 22, 34)}${focs(392, 546, 2, 26, 22, 34)}<g data-puf="350 440 0 -14 3 5 1.3" class="vap"></g><g data-puf="400 440 0 -14 3 5 1.6" class="vap"></g></g>`;
    s += `<g data-part="xemeneia" data-exp="-26 -62"><path class="t negre" d="M352 420V170h40V420z"/><rect class="t vermell" x="350" y="170" width="44" height="26"/><path d="M352 246h40M352 320h40" stroke="#536069" stroke-width="2"/></g><g data-puf="372 160 -200 -80 7 18 2" class="fum"></g>`;
    s += `<path d="M442 440H476" class="nf" stroke="#2a2420" stroke-width="13"/><path d="M442 440H476" class="nf" stroke="#f0ab68" stroke-width="8"/>`;
    // roda de pales + tambor protector
    s += `<g data-part="roda" data-exp="62 -30"><g id="vroda">${roda(S.x, S.y, 112, { raigs: 12, color: '#a8452f', gruix: 8, raig: 4, extra: pales(S.x, S.y, 104, 12) })}</g><path d="M548 380A122 122 0 0 1 792 380" class="t nf" stroke-width="7"/><path d="M548 380A122 122 0 0 1 792 380" class="nf" stroke="#c7935c" stroke-width="3"/></g>`;
    // màquina de palanques laterals
    s += `<g data-part="maquina" data-exp="36 40"><rect class="t pedra" x="456" y="548" width="250" height="12"/><rect id="vcam" x="476" y="436" width="40" height="40" fill="#f9a35e"/><path d="M468 428H524V524H468ZM476 436V516H516V436Z" class="t" fill="url(#g-ferroc)" fill-rule="evenodd"/>
      <g id="vpist"><rect class="t" fill="url(#g-ferroc)" x="476" y="-5" width="40" height="10"/><rect class="t" fill="url(#g-ferroh)" x="492" y="-72" width="8" height="72"/><rect class="t" fill="url(#g-ferro)" x="452" y="-78" width="50" height="9" rx="3"/></g><line id="vtija" x1="458" y1="400" x2="458" y2="545" class="t" stroke-width="6"/>
      <g id="vpal"><path class="t" fill="url(#g-ferroc)" d="M${PIV.x - MIG - 8} ${PIV.y}L${PIV.x} ${PIV.y - 16}L${PIV.x + MIG + 8} ${PIV.y}L${PIV.x} ${PIV.y + 16}Z"/></g><circle class="t llauto" cx="${PIV.x}" cy="${PIV.y}" r="9"/>
      <line id="vbiela" x1="670" y1="545" x2="670" y2="420" stroke="#2a2420" stroke-width="13" stroke-linecap="round"/><line id="vbiela2" x1="670" y1="545" x2="670" y2="420" stroke="#b4bec4" stroke-width="7" stroke-linecap="round"/><line id="vman" x1="670" y1="420" x2="700" y2="420" stroke="#2a2420" stroke-width="15" stroke-linecap="round"/><circle class="t llauto" cx="670" cy="420" r="13"/></g>`;
    // escuma de les pales i fletxes ben separades de les etiquetes
    s += `<g data-puf="600 474 -80 -10 5 9 0.9" class="vap" opacity=".8"></g>${fletxa('M1050 640H1186', '#fffdf7', 6)}<text x="1118" y="676" class="tx-b mig">avança</text><g data-en="2">${fletxa('M900 618H740', '#fffdf7', 6)}<text x="820" y="654" class="tx-b mig">les pales empenyen l’aigua enrere</text></g>`;
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
    let s = `<rect x="-60" width="1320" height="720" fill="#8cc0df"/>`;
    // reticle cartogràfic (meridians i paral·lels) i ones suaus
    for (let x = 80; x < 1200; x += 180) s += `<path d="M${x} 0V720" stroke="#fff" stroke-width="1" opacity=".22"/>`;
    for (let y = 120; y < 700; y += 160) s += `<path d="M-60 ${y}H1260" stroke="#fff" stroke-width="1" opacity=".22"/>`;
    s += ones(140, '#cbe5f5') + ones(410, '#cbe5f5') + ones(610, '#cbe5f5');
    // costa est d'Amèrica del Nord (Terranova, Nova Escòcia, Nova Anglaterra, Nova York, Virgínia)
    s += `<path class="t" fill="#b4cb84" d="M-60 20H185l24 44-34 38-36 10-8 44 48 16 14 28-44 26-26 22 30 16-24 22-36 44-8 56-38 56-10 68-42 64-28 54-48 72H-60Z"/>`;
    // Europa Occidental (Escòcia, Gran Bretanya amb canal de Bristol, Irlanda, Bretanya i Península Ibèrica)
    s += `<path class="t" fill="#b4cb84" d="M1076 20H1260V720H1074l-8-46 38-10 4-62-44-16 8-26 68-46 58-24-30-32-44-10-4-28 24-28 16-42-22-18-32 18-16-26 28-24-12-30-34-12 20-34-16-42 36-38 14-42z"/>`;
    s += `<path class="t" fill="#b4cb84" d="M980 184l32-24 26 14-8 46-32 22-22-18z"/>`;
    // vents dominants de l'oest (per què el veler triga més cap a l'oest)
    s += `<g opacity=".78">${[[430, 125], [640, 120], [500, 325], [760, 330]].map(([x, y]) => `<path d="M${x} ${y}h95" stroke="#fffdf7" stroke-width="3.5" stroke-dasharray="10 6" marker-end="url(#m-fl)"/>`).join('')}<text x="610" y="106" class="tx-p mig" style="fill:#184566">vents dominants de l’oest (en contra)</text></g>`;
    // ports, títol i rutes
    s += `<circle class="t vermell" cx="132" cy="332" r="9"/><text x="64" y="370" class="tx-g mig">Nova York</text><circle class="t vermell" cx="1086" cy="240" r="9"/><text x="1164" y="210" class="tx-g mig">Bristol</text><text x="610" y="56" class="tx-g mig">Oceà Atlàntic · uns 5.500 km</text>`;
    s += `<path d="M1076 242Q600 185 142 330" class="t nf" stroke-dasharray="4 9"/><path id="ruta-v" d="M1076 250Q955 415 835 375T615 470T380 398T142 338" class="t nf" stroke-dasharray="4 9" opacity=".75"/>`;
    // rosa dels vents senzilla
    s += `<g transform="translate(960 590)" opacity=".75"><circle cx="0" cy="0" r="34" fill="#fffdf7" stroke="#2a2420" stroke-width="2"/><path d="M0-28L6 0 0 28-6 0zM-28 0L0-6 28 0 0 6z" fill="#2a2420"/><text x="0" y="-38" class="tx-p mig">N</text></g>`;
    // vaixells en ruta
    s += `<g id="b-vapor"><path class="t" fill="#32393f" d="M-50 0h100l-12 22h-76z"/><rect class="t fusta" x="-48" y="-4" width="96" height="5"/><rect class="t negre" x="-8" y="-34" width="13" height="30"/><rect class="vermell" x="-8" y="-34" width="13" height="8"/><circle class="t vermell" cx="5" cy="10" r="11"/><g data-puf="-2 -38 60 -30 4 8 1.2" class="fum"></g></g>`;
    s += `<g id="b-vela"><path class="t" fill="#8f6038" d="M-48 0h96l-12 22h-72z"/><path class="t blanc" d="M-24 -4v-54l32 26zM10 -4v-64l36 34z"/><path d="M-24 0v-60M10 0v-70" class="t"/></g>`;
    s += `<g><rect class="t" x="470" y="560" width="280" height="110" rx="16" fill="#fffdf7"/><text x="610" y="600" class="tx mig">dies de viatge</text><text id="dia" x="610" y="652" class="tx-gg mig" style="font-size:46px">0</text></g>`;
    s += `<g id="a-vapor" opacity="0">${retol(430, 186, 'Great Western (1838): 15 dies', { fons: '#d9482b', vora: '#2a2420', w: 295, h: 36 })}</g><g id="a-vela" opacity="0">${retol(340, 495, 'veler de línia: uns 35 dies, segons el vent', { fons: '#2a2420', vora: '#2a2420', w: 380, h: 36 })}</g>`;
    return svg(s);
  }
  function animaAtl({ p, el, svg: g }) {
    const d = Math.min(35, p * 37), fv = Math.min(1, d / 15), fs = Math.min(1, d / 35);
    const bz = (t) => ({ x: (1 - t) * (1 - t) * 1076 + 2 * (1 - t) * t * 600 + t * t * 142, y: (1 - t) * (1 - t) * 242 + 2 * (1 - t) * t * 185 + t * t * 330 });
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
        etiquetes: [['veles', 640, 130, 590, 180, 'Pals i veles'], ['xemeneia', 270, 230, 352, 260], ['calderes', 300, 626, 360, 540], ['carbonera', 120, 610, 240, 520, 'Carboneres'], ['maquina', 488, 668, 504, 550, 'Màquina'], ['roda', 780, 280, 740, 330, 'Roda de pales'], ['cabines', 1020, 330, 900, 410], ['carrega', 1090, 560, 990, 524, 'Bodega']],
        explotada: {
          img: 'img/exp-western.webp',
          model: 'Làmina tècnica en vista explotada · SS Great Western (Brunel, 1838)',
          zones: [['veles', 790, 235, 245, 165], ['xemeneia', 550, 245, 55, 115], ['calderes', 535, 285, 95, 75], ['maquina', 545, 395, 115, 65], ['roda', 825, 635, 155, 145], ['carbonera', 495, 665, 85, 65], ['carrega', 355, 655, 115, 85], ['cabines', 925, 455, 135, 75]],
          etiquetes: [['xemeneia', 625, 95, 550, 195], ['veles', 980, 115, 835, 195, 'Pals i veles'], ['calderes', 345, 235, 515, 275], ['maquina', 325, 395, 545, 395, 'Màquina'], ['carrega', 195, 675, 355, 645, 'Bodega'], ['carbonera', 385, 745, 495, 665, 'Carboneres'], ['cabines', 1060, 415, 935, 455], ['roda', 1005, 695, 825, 650, 'Roda de pales']]
        },
        real: {
          img: 'img/real-western.webp',
          titol: 'El vapor SS Great Western salpant cap a Nova York (Joseph Walter, 1838)',
          museu: 'Bristol Museums, Galleries and Archives',
          lic: 'Pintura d’època: domini públic · Wikimedia Commons'
        },
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
