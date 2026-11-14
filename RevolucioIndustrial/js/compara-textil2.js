// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 3 · «Abans i ara»: roda de filar, Water Frame i mula. */
(function () {
  'use strict';
  const { duo, mesura, posaMesura, animaDuo, tram, color, clamp, svg, roda, lerp, persona } = RI;
  const { rodaFilar, animaRodaFilar, jenny, animaJenny, prisma, P, pp, ma, fil2, posaFil, tang, terra, nota, n1, FUSTA, FUSTAF, DX, DY } = RI.CMP_TEXTIL;
  const T = '#2a2420';
  const corro = (id, x, y, r, cuir) => `<g id="${id}"><circle cx="${x}" cy="${y}" r="${r}" fill="${cuir ? '#8b5a2b' : 'url(#g-ferro)'}" class="t2"/><path d="M${x} ${y}h${r - 2}" stroke="${cuir ? '#f1d9b0' : '#fff'}" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="3" fill="${T}"/></g>`;
  const gira = (el, id, graus, x, y) => el(id).setAttribute('transform', `rotate(${(graus % 360).toFixed(1)} ${x} ${y})`);
  const bobina = (x, y, w, h, c) => `<rect x="${n1(x - w / 2)}" y="${y}" width="${w}" height="${h}" rx="5" fill="${c || '#f6efdc'}" class="t2"/><path d="M${n1(x - w / 2 - 5)} ${y}h${w + 10}M${n1(x - w / 2 - 5)} ${y + h}h${w + 10}" stroke="${T}" stroke-width="4" stroke-linecap="round"/>`;
  /* cinta de temps: es pinta només mentre la màquina fa fil */
  const cinta = (id, x, y, w, etq, n, c) => { let s = `<g><text x="${x}" y="${y - 8}" font-size="16.500" font-weight="700" fill="#4b433b">${etq}</text><rect x="${x}" y="${y}" width="${w}" height="20" rx="4" fill="#fffdf7" stroke="${T}" stroke-width="2"/>`; for (let i = 0; i < n; i++) s += `<rect id="${id}${i}" x="${x}" y="${y + 3}" width="0" height="14" fill="${c}"/>`; return s + `<text id="${id}-t" x="${x + w + 10}" y="${y + 16}" font-size="18" font-weight="800" fill="${T}"></text></g>`; };

  /* ---------- fus de mà (abans de la roda) ---------- */
  function fusMa() {
    let h = terra(548) + `<ellipse cx="250" cy="562" rx="150" ry="13" fill="#2a2420" opacity=".09"/>`;
    // filosa amb la floca de fibra
    h += `<path d="M128 300L104 132" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path d="M128 300L104 132" stroke="#a8733f" stroke-width="5" stroke-linecap="round"/>`;
    h += `<path d="M70 168q-22-30 8-48 4-34 38-22 30-14 40 16 22 22-2 44-6 30-36 22-32 16-48-12z" fill="#f4f7ea" stroke="#7f9a78" stroke-width="2.500"/>`;
    h += persona(190, 548, 318, { color: '#8a5a44', brac: 'M-8-68l-12 14-2-22M8-68l22 14 6-8' });
    h += `<path id="fm-metxa" fill="none" stroke="#6f8a66" stroke-width="8" stroke-linecap="round"/><path id="fm-metxa2" fill="none" stroke="#dcebd0" stroke-width="5.500" stroke-linecap="round"/>`;
    h += fil2('fm-fil', 3.200);
    h += `<g id="fm-fus"><path d="M0-6V96" stroke="${T}" stroke-width="7" stroke-linecap="round"/><path d="M0-4V94" stroke="#b9834a" stroke-width="3.200" stroke-linecap="round"/><ellipse id="fm-cop" cx="0" cy="40" rx="8" ry="26" fill="#f6efdc" class="t2"/><ellipse cx="0" cy="76" rx="27" ry="8" fill="url(#g-fustac)" class="t2"/><path id="fm-marca" d="M-20 76h14" stroke="${T}" stroke-width="3.500" stroke-linecap="round"/></g>`;
    h += `<g id="fm-gir"><path d="M-36 0a36 11 0 1 0 72 0" fill="none" stroke="#d97706" stroke-width="3.500" stroke-linecap="round" stroke-dasharray="7 6"/><path d="M36 0l4-13M36 0l-13-4" stroke="#d97706" stroke-width="3.500" stroke-linecap="round"/></g>`;
    h += nota(390, 250, 'la mà torna', '#4b433b', 17) + nota(390, 272, 'a impulsar el fus', '#4b433b', 17) + nota(390, 294, 'cada pocs segons', '#4b433b', 17);
    h += nota(300, 592, 'el fus gira a impulsos, i penja de la mà', '#4b433b', 20);
    return h;
  }
  /* q: moment d'una tirada; torna la velocitat relativa del fus (0–1) */
  function animaFusMa(el, q, n) {
    const baixa = tram(q, 0.03, 0.62, 0, 1), puja = tram(q, 0.7, 0.96, 0, 1), y = 372 + 96 * (baixa - puja), x = 290;
    // tres impulsos dels dits per tirada; entre l'un i l'altre el fus perd velocitat
    const u = q < 0.66 ? (q / 0.22) % 1 : 1, v = q < 0.66 ? Math.exp(-2.6 * u) : 0;
    const voltes = q < 0.66 ? Math.floor(q / 0.22) * 2.1 + (1 - Math.exp(-2.6 * u)) * 2.3 : 6.3;
    el('fm-fus').setAttribute('transform', `translate(${x} ${n1(y)})`);
    el('fm-marca').setAttribute('transform', `translate(${(20 + 20 * Math.sin(voltes * 6.283 * 3)).toFixed(1)} 0)`);
    el('fm-gir').setAttribute('transform', `translate(${x} ${n1(y + 76)})`); el('fm-gir').style.opacity = (0.15 + 0.85 * v).toFixed(2);
    posaFil(el, 'fm-fil', `M${x} 346L${x} ${n1(y - 4)}`, 3.2, 1);
    const d = `M112 152Q210 200 ${x - 4} 342`; el('fm-metxa').setAttribute('d', d); el('fm-metxa2').setAttribute('d', d);
    el('fm-cop').setAttribute('rx', (6 + (n + puja) * 2.2).toFixed(1));
    return v;
  }

  RI.ABANS.roda = {
    durada: 27,
    pregunta: 'Què hi guanya la roda respecte del fus de mà?',
    intro: 'Filar sempre és el mateix: <b>estirar</b> la fibra i <b>torçar-la</b>. Fixa’t en qui fa girar el fus i en si el gir es manté.',
    svg: () => svg(duo({ abans: 'fus de mà i filosa', ara: 'roda de filar', color: '#b9722a', banda: 606,
      a: `<g transform="translate(-50 0)">${fusMa()}${mesura('mr-a', 40, 668, 300, 'Gir del fus, ara mateix', '#b9722a')}</g>`,
      b: `<g transform="translate(626 0)">${rodaFilar('r').replace('1 roda → 1 fus → 1 fil', 'la roda manté el fus girant de pressa')}${mesura('mr-b', 40, 668, 300, 'Gir del fus, ara mateix', '#b9722a')}</g>` })),
    anima: animaDuo(({ p, el }) => {
      const q = (p * 3) % 1, n = Math.floor(p * 3 + 1e-6), v = animaFusMa(el, q, n);
      animaRodaFilar(el, 'r', q, n);
      posaMesura(el, 'mr-a', 0.08 + 0.5 * v, 300, v > 0.45 ? 'impuls!' : v > 0.02 ? 'perd força…' : 'aturat: recull');
      const vr = q < 0.02 ? 0 : q < 0.56 ? 1 : q < 0.64 ? 0.1 : q < 0.95 ? 0.55 : 0;
      posaMesura(el, 'mr-b', vr, 300, vr > 0.9 ? 'ràpid i constant' : vr > 0.3 ? 'recull' : 'canvi de sentit');
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: el fus penja de la mà', text: 'Els dits fan girar el fus com una baldufa. De seguida <b>perd velocitat</b> i cal tornar-lo a impulsar. La mateixa mà ha d’estirar, impulsar i recollir.' },
      { fins: 0.67, nom: 'Ara: una roda gran mou el fus', text: 'Una corretja uneix la roda gran amb la petita politja del fus: per cada volta de la roda, <b>el fus en fa moltes</b>. Una mà mou la roda i l’altra queda lliure per estirar.' },
      { fins: 1, nom: 'El resultat: gir ràpid i sostingut', text: 'El fus ja no depèn dels dits: gira de pressa mentre la roda giri. Es fila més de pressa i amb una torsió més regular, però encara <b>un sol fil cada vegada</b>.' }
    ],
    clau: 'La roda és la primera «màquina» del fil: transmet i multiplica el gir, però no multiplica els fils.'
  };

  /* ---------- Water Frame: corrons que estiren i una roda hidràulica que no para ---------- */
  const WF = { A: [318, 252], B: [388, 274], C: [458, 296], eix: 474 };
  function waterFrame() {
    let h = terra(548);
    // roda hidràulica amb el canal
    h += `<rect x="0" y="514" width="200" height="34" class="aigua"/><path d="M4 522q12-6 24 0t24 0 24 0 24 0 24 0 24 0 24 0" class="nf s-blanc" stroke-width="2"/>`;
    h += `<path d="M0 306h104v20H0z" fill="url(#g-fustac)" class="t2"/><rect x="0" y="309" width="100" height="10" class="aigua"/><path d="M103 314q30 6 34 60" class="flux2 s-blau" data-flux="2.500" stroke-width="9"/>`;
    let pales = ''; for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6, d = `M${n1(92 + 78 * Math.cos(a))} ${n1(420 + 78 * Math.sin(a))}L${n1(92 + 96 * Math.cos(a + 0.16))} ${n1(420 + 96 * Math.sin(a + 0.16))}`; pales += `<path d="${d}" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path d="${d}" stroke="#8b5a2b" stroke-width="5" stroke-linecap="round"/>`; }
    h += `<path d="${tang([92, 420], 26, [262, 500], 22)}" stroke="#7a4e26" stroke-width="5" fill="none"/>`;
    h += `<g id="wf-roda">${pales}${roda(92, 420, 84, { raigs: 8, color: '#8b5a2b', gruix: 12, raig: 6, raigColor: '#6b3e17' })}<circle cx="92" cy="420" r="26" fill="none" stroke="${T}" stroke-width="3"/></g>`;
    h += nota(98, 282, 'el riu fa la força', '#1d5f8f', 19);
    // bastidor de perfil
    h += `<rect x="236" y="104" width="16" height="444" fill="#c08a52" class="t2"/><rect x="524" y="104" width="16" height="444" fill="#c08a52" class="t2"/><rect x="236" y="104" width="304" height="14" fill="#dcb07a" class="t2"/><rect x="236" y="470" width="304" height="14" fill="#c08a52" class="t2"/><rect x="226" y="534" width="324" height="14" fill="#a8733f" class="t2"/>`;
    h += `<path d="M284 304L506 340" stroke="${T}" stroke-width="16" stroke-linecap="round"/><path d="M284 304L506 340" stroke="#c08a52" stroke-width="11" stroke-linecap="round"/>`;
    h += `<path d="M296 118v24" stroke="${T}" stroke-width="4"/>` + bobina(296, 138, 40, 60, '#eef4e4') + nota(296, 174, 'metxa', '#4f6b48', 15);
    // transmissió: corretges cap als corrons i cap al fus
    h += `<path d="${tang([262, 500], 22, [312, 272], 9)}" stroke="#7a4e26" stroke-width="3" fill="none" opacity=".8"/><path d="${tang([262, 500], 22, [WF.eix, 506], 9)}" stroke="#7a4e26" stroke-width="3" fill="none" opacity=".8"/>`;
    h += `<g id="wf-pol">${roda(262, 500, 24, { raigs: 4, gruix: 7, raig: 3.500 })}</g>`;
    // metxa que s'aprima entre parelles
    const seg = (d, g, i) => `<path d="${d}" stroke="#6f8a66" stroke-width="${g + 3}" stroke-linecap="round"/><path d="${d}" stroke="#dcebd0" stroke-width="${g}" stroke-linecap="round"/><path id="wf-d${i}" d="${d}" stroke="#6f8a66" stroke-width="2" stroke-dasharray="6 9" fill="none"/>`;
    h += seg('M300 198L318 252', 9, 0) + seg('M318 252L388 274', 6.500, 1) + seg('M388 274L458 296', 4, 2);
    [['A', '×1'], ['B', '×2'], ['C', '×4']].forEach(([k, v], i) => { const [x, y] = WF[k]; h += corro('wf-s' + i, x + 6, y - 19, 19, true) + corro('wf-i' + i, x - 6, y + 19, 19) + `<text x="${x + 10}" y="${y - 48}" text-anchor="middle" font-size="22" font-weight="900" fill="#8c4a14" style="paint-order:stroke;stroke:#fffdf7;stroke-width:5px">${v}</text>`; });
    h += nota(446, 150, 'cada parella gira', '#8c4a14', 16) + nota(446, 170, 'més de pressa', '#8c4a14', 16);
    // aleta i bobina
    h += `<path d="M${WF.eix} 356V516" stroke="${T}" stroke-width="6" stroke-linecap="round"/><path d="M${WF.eix} 356V516" stroke="#9aa6af" stroke-width="2.600" stroke-linecap="round"/><circle cx="${WF.eix}" cy="506" r="9" fill="url(#g-llauto)" class="t2"/>`;
    h += `<path id="wf-ala2" fill="none" stroke="#5c6870" stroke-width="4.500" stroke-linecap="round" stroke-linejoin="round"/>`;
    h += `<rect id="wf-bob" x="460" y="398" width="28" height="62" rx="5" fill="#f6efdc" class="t2"/><path d="M${WF.eix - 24} 398h48M${WF.eix - 24} 460h48" stroke="${T}" stroke-width="4" stroke-linecap="round"/>`;
    h += fil2('wf-fil', 2.800) + `<path id="wf-ala" fill="none" stroke="${T}" stroke-width="5.500" stroke-linecap="round" stroke-linejoin="round"/><path id="wf-ala1" fill="none" stroke="#ddb344" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"/>`;
    h += fil2('wf-fil2', 2.800) + nota(396, 420, 'l’aleta torça', '#8c4a14', 15) + nota(396, 438, 'i recull', '#8c4a14', 15);
    h += nota(392, 592, 'els corrons estiren · no s’atura mai', '#8c4a14', 20);
    return h;
  }
  function animaWater(el, p, t) {
    gira(el, 'wf-roda', t * 34, 92, 420); gira(el, 'wf-pol', t * 34 * 26 / 22, 262, 500);
    [1, 2, 4].forEach((v, i) => { const [x, y] = WF[['A', 'B', 'C'][i]]; gira(el, 'wf-s' + i, -t * 46 * v, x + 6, y - 19); gira(el, 'wf-i' + i, t * 46 * v, x - 6, y + 19); el('wf-d' + i).style.strokeDashoffset = (-t * 12 * v).toFixed(1); });
    const X = WF.eix, a = t * 7, c = Math.cos(a), amp = 36, yh = 408 + 44 * (0.5 + 0.5 * Math.sin(t * 0.9)), w = 14 + 9 * p, s0 = c > 0 ? 1 : -1;
    const ala = (s) => `M${X} 362H${n1(X + s * amp * Math.abs(c))}V452`;
    el('wf-ala2').setAttribute('d', ala(-s0)); el('wf-ala').setAttribute('d', ala(s0)); el('wf-ala1').setAttribute('d', ala(s0));
    el('wf-bob').setAttribute('x', n1(X - w)); el('wf-bob').setAttribute('width', n1(2 * w));
    posaFil(el, 'wf-fil', `M458 296L${X} 358`, 3, 1);
    const xa = X + s0 * amp * Math.abs(c);
    posaFil(el, 'wf-fil2', `M${X} 360H${n1(xa)}V${n1(yh)}L${n1(X + s0 * w)} ${n1(yh + 4)}`, 2.4, 1);
  }
  RI.ABANS.water = {
    durada: 30,
    pregunta: 'Què hi guanya la Water Frame?',
    intro: 'Mira <b>qui estira</b> el cotó i <b>qui posa la força</b>. I fixa’t en la cinta de sota: quan es fa fil i quan no.',
    svg: () => svg(duo({ abans: 'filar a mà', ara: 'Water Frame (1769)', color: '#b9722a', banda: 606,
      a: `<g transform="translate(-50 0)">${rodaFilar('w').replace('1 roda → 1 fus → 1 fil', 'els dits estiren · s’atura per recollir')}${cinta('cw-a', 40, 668, 330, 'Quan es fa fil', 3, '#b9722a')}</g>`,
      b: `<g transform="translate(626 0)">${waterFrame()}${cinta('cw-b', 40, 668, 330, 'Quan es fa fil', 1, '#b9722a')}</g>` })),
    anima: animaDuo(({ p, t, el }) => {
      const q = (p * 3) % 1, n = Math.floor(p * 3 + 1e-6);
      animaRodaFilar(el, 'w', q, n); animaWater(el, p, t);
      for (let i = 0; i < 3; i++) { const a = (i + 0.04) / 3, b = clamp(p, a, (i + 0.6) / 3); el('cw-a' + i).setAttribute('x', n1(40 + 330 * a)); el('cw-a' + i).setAttribute('width', n1(Math.max(0, 330 * (b - a)))); }
      el('cw-a-t').textContent = q > 0.04 && q < 0.6 ? 'fila' : 'aturada: recull'; el('cw-b0').setAttribute('width', n1(330 * p)); el('cw-b-t').textContent = 'fila sense parar';
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: els dits i el braç', text: 'La filadora regula el gruix del fil <b>amb els dits</b> i mou la roda amb el braç. Quan ha torçat un tram, s’ha d’aturar per recollir-lo.' },
      { fins: 0.67, nom: 'Ara: tres parelles de corrons', text: 'Cada parella gira <b>més de pressa</b> que l’anterior: la metxa s’aprima sola en passar-hi. A sota, l’aleta torça el fil i el recull alhora. I tot ho mou <b>una roda hidràulica</b>.' },
      { fins: 1, nom: 'El resultat: fil fort, sense parar', text: 'La màquina fila en continu i fa un fil resistent, bo per a l’ordit. Però pesa massa i necessita un riu: <b>ja no cap en una casa</b>. Neix la fàbrica.' }
    ],
    clau: 'Els corrons fan la feina dels dits, i el riu la feina del braç: per això la Water Frame porta a la fàbrica.'
  };

  /* ---------- mula de Crompton: corrons (Water Frame) + carro mòbil (Jenny) ---------- */
  const MS = 6, MDX = 20, MDY = -12.5;
  function mula() {
    let h = terra(548) + `<path d="M218 540H598" stroke="${T}" stroke-width="9"/><path d="M218 540H598" stroke="#8a969e" stroke-width="5"/>`;
    // bastidor fix amb la fileta i els corrons
    h += prisma(52, 150, 16, 398, 130, 146, FUSTAF) + prisma(196, 200, 16, 348, 130, 146, FUSTAF);
    for (let k = MS - 1; k >= 0; k--) h += `<g transform="translate(${MDX * k} ${MDY * k})">${bobina(96, 132, 34, 52, '#eef4e4')}</g>`;
    h += prisma(52, 186, 160, 14, 0, 146) + prisma(52, 150, 16, 398, 0, 16) + prisma(196, 200, 16, 348, 0, 16);
    for (let k = MS - 1; k >= 0; k--) h += `<path d="M${96 + MDX * k} ${184 + MDY * k}L${140 + MDX * k} ${238 + MDY * k}" stroke="#6f8a66" stroke-width="8" stroke-linecap="round"/><path d="M${96 + MDX * k} ${184 + MDY * k}L${140 + MDX * k} ${238 + MDY * k}" stroke="#dcebd0" stroke-width="5.500" stroke-linecap="round"/>`;
    for (let k = MS - 1; k >= 0; k--) h += fil2('mu-f' + k, 3);
    // corrons: es veuen de cap (cercles) i s'allarguen cap al fons
    [[140, 238], [196, 250]].forEach(([x, y], i) => {
      h += `<path d="M${pp(x, y + 14, 0)}L${pp(x, y + 14, 250)}" stroke="${T}" stroke-width="31" stroke-linecap="round"/><path d="M${pp(x, y + 14, 0)}L${pp(x, y + 14, 250)}" stroke="#8a969e" stroke-width="27" stroke-linecap="round"/>`;
      h += `<path d="M${pp(x, y - 14, 0)}L${pp(x, y - 14, 250)}" stroke="${T}" stroke-width="31" stroke-linecap="round"/><path d="M${pp(x, y - 14, 0)}L${pp(x, y - 14, 250)}" stroke="#9b6a3a" stroke-width="27" stroke-linecap="round"/>`;
      h += corro('mu-s' + i, x, y - 14, 14.500, true) + corro('mu-i' + i, x, y + 14, 14.500);
    });
    h += `<text id="mu-estat" x="150" y="330" text-anchor="middle" font-size="17" font-weight="900" fill="#3f7d2a" style="paint-order:stroke;stroke:#fffdf7;stroke-width:5px"></text>`;
    // carro amb els fusos inclinats
    h += `<g id="mu-carro">`;
    for (let k = MS - 1; k >= 0; k--) h += `<g transform="translate(${MDX * k} ${MDY * k})"><path d="M58 470L34 334" stroke="${T}" stroke-width="6" stroke-linecap="round"/><path d="M58 468L34 336" stroke="#9aa6af" stroke-width="2.600" stroke-linecap="round"/><ellipse class="mu-cop t2" cx="46" cy="402" rx="9" ry="40" fill="#f6efdc" transform="rotate(-10 46 402)"/></g>`;
    h += `<path id="mu-guia" d="M30 330L${30 + MDX * 5} ${330 + MDY * 5}" stroke="${T}" stroke-width="3.400" stroke-linecap="round"/>`;
    h += prisma(0, 468, 226, 40, 0, 130);
    h += `<g id="mu-r1">${roda(34, 518, 22, { raigs: 6, gruix: 7, raig: 3.500 })}</g><g id="mu-r2">${roda(190, 518, 22, { raigs: 6, gruix: 7, raig: 3.500 })}</g>`;
    h += `<path d="${tang([162, 420], 66, [70, 486], 10)}" stroke="#7a4e26" stroke-width="3.500" fill="none"/><circle cx="70" cy="486" r="11" fill="url(#g-llauto)" class="t2"/>`;
    h += `<rect x="154" y="420" width="16" height="50" fill="#a8733f" class="t2"/><g id="mu-roda">${roda(162, 420, 70, { raigs: 8, gruix: 11, raig: 5 })}<path d="M162 420L206 420" stroke="${T}" stroke-width="7" stroke-linecap="round"/><circle cx="208" cy="420" r="9" fill="#a8733f" class="t2"/></g></g>`;
    h += nota(330, 592, 'corrons + carro mòbil', '#8c4a14', 21);
    return h;
  }
  function animaMula(el, q, n) {
    const surt = tram(q, 0.03, 0.42, 0, 0.84) + tram(q, 0.42, 0.58, 0, 0.16), torna = tram(q, 0.67, 0.96, 0, 1), c = 232 + 132 * (surt - torna);
    const giren = q >= 0.03 && q < 0.42, rc = 300 * tram(q, 0.03, 0.42, 0, 1, true);
    el('mu-carro').setAttribute('transform', `translate(${n1(c)} 0)`);
    gira(el, 'mu-r1', (c - 232) * 2.6, 34, 518); gira(el, 'mu-r2', (c - 232) * 2.6, 190, 518);
    const gir = 360 * (1.2 * tram(q, 0.03, 0.42, 0, 1, true) + 1.6 * tram(q, 0.42, 0.58, 0, 1, true) - 0.12 * tram(q, 0.58, 0.66, 0, 1) + 1.1 * tram(q, 0.67, 0.96, 0, 1, true));
    gira(el, 'mu-roda', gir, 162, 420);
    [0, 1].forEach((i) => { const x = i ? 196 : 140, y = i ? 250 : 238, v = i ? 2 : 1; gira(el, 'mu-s' + i, -rc * v, x, y - 14); gira(el, 'mu-i' + i, rc * v, x, y + 14); });
    const est = el('mu-estat'); est.textContent = giren ? 'corrons girant' : q < 0.58 ? 'corrons parats: el carro estira' : q < 0.67 ? 'preparant la recollida' : 'el carro torna i enrotlla';
    est.setAttribute('fill', giren ? '#3f7d2a' : q < 0.58 ? '#b23a1f' : '#4b433b');
    const k = q < 0.42 ? 0.35 + 0.3 * tram(q, 0.03, 0.42, 0, 1) : q < 0.58 ? 0.65 + 0.35 * tram(q, 0.42, 0.58, 0, 1) : 1, g = lerp(4.6, 2.6, k);
    const baixa = q >= 0.58 && q < 0.97 ? tram(q, 0.58, 0.66, 0, 1) - tram(q, 0.94, 0.97, 0, 1) : 0, gy = 330 + 58 * baixa + (q > 0.67 && q < 0.94 ? 16 * Math.sin(torna * 9) : 0);
    el('mu-guia').setAttribute('d', `M${n1(30 + (gy - 330) * 0.18)} ${n1(gy)}L${n1(30 + (gy - 330) * 0.18 + MDX * 5)} ${n1(gy + MDY * 5)}`);
    for (let j = 0; j < MS; j++) {
      const ox = MDX * j, oy = MDY * j, tip = [c + 34 + ox, 334 + oy];
      posaFil(el, 'mu-f' + j, baixa > 0.02 ? `M${210 + ox} ${250 + oy}L${n1(c + 30 + (gy - 330) * 0.18 + ox)} ${n1(gy + oy)}L${n1(c + 40 + ox)} ${n1(gy + 18 + oy)}` : `M${210 + ox} ${250 + oy}L${n1(tip[0])} ${n1(tip[1])}`, g, k);
    }
    const ple = (n + torna) * 1.6; el('mu-carro').querySelectorAll('.mu-cop').forEach((e) => e.setAttribute('rx', n1(7 + ple)));
  }
  const mostra = (x, y, w, g, torsio, etq, c) => `<g><path d="M${x} ${y}h${w}" stroke="#7a5a1c" stroke-width="${g + 2.500}" stroke-linecap="round"/><path d="M${x} ${y}h${w}" stroke="#f0c552" stroke-width="${g}" stroke-linecap="round"/><path d="M${x} ${y}h${w}" stroke="#7a5a1c" stroke-width="${g}" stroke-dasharray="1.500 ${torsio}" opacity=".75"/><text x="${x + w + 12}" y="${y + 6}" font-size="17" font-weight="800" fill="${c || T}">${etq}</text></g>`;
  RI.ABANS.mula = {
    durada: 30, innova: [1, 2],
    pregunta: 'Què hi guanya la mula?',
    intro: 'La mula agafa <b>una idea de cada màquina</b>. Busca-hi els corrons de la Water Frame i el carro que s’allunya, com la pinça de la Jenny.',
    svg: () => svg(duo({ abans: 'Jenny (i Water Frame)', ara: 'mula de Crompton (1779)', color: '#b9722a', banda: 606,
      a: `<g transform="translate(-50 0)">${jenny().replace('1 roda → 8 fusos → 8 fils', 'una pinça estira: sense corrons')}${mostra(40, 646, 150, 2.600, 9, 'Jenny: fi, però fluix')}${mostra(40, 692, 150, 6.500, 4, 'Water Frame: fort, però gruixut')}</g>`,
      b: `<g transform="translate(626 0)">${mula()}${mostra(40, 668, 190, 2.600, 3, 'mula: fi i fort alhora', '#8c4a14')}</g>` })),
    anima: animaDuo(({ p, el }) => { const q = (p * 3) % 1, n = Math.floor(p * 3 + 1e-6); animaJenny(el, q, n); animaMula(el, q, n); }),
    fases: [
      { fins: 0.34, nom: 'Abans: dues màquines, dos límits', text: 'La Jenny estira amb una pinça: fa un fil <b>fi però fluix</b>, que es trenca a l’ordit. La Water Frame fa un fil <b>fort però gruixut</b>. Cap de les dues fa fil fi i fort.' },
      { fins: 0.67, nom: 'Ara: corrons i carro, coordinats', text: 'Primer els <b>corrons</b> lliuren metxa ja aprimada mentre el carro s’allunya. Després els corrons <b>s’aturen</b> i el carro encara avança una mica: aquesta estirada final, mentre els fusos torcen, afina el fil.' },
      { fins: 1, nom: 'El resultat: fil fi i resistent', text: 'En tornar, el carro enrotlla el fil als fusos. El fil serveix tant per a l’ordit com per a la trama i permet teles fines com les mussolines de l’Índia.' }
    ],
    clau: 'La mula és un híbrid: per això se’n diu «mula». Combina dues solucions per superar el límit de totes dues.'
  };
})();
