// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 3 · «Abans i ara»: la màquina sencera al costat del sistema anterior.
   Dibuix en perspectiva cavallera: el pla frontal no es deforma i la profunditat
   s'esbiaixa sempre amb el mateix vector, de manera que les rodes giren dins del seu pla. */
(function () {
  'use strict';
  const { duo, mesura, posaMesura, animaDuo, tram, color, clamp, svg, roda, lerp } = RI;
  RI.ABANS = RI.ABANS || {};
  const T = '#2a2420', DX = 0.42, DY = -0.26;
  const n1 = (v) => Math.round(v * 10) / 10;
  const P = (x, y, d) => [x + DX * (d || 0), y + DY * (d || 0)];
  const pp = (x, y, d) => { const q = P(x, y, d); return n1(q[0]) + ' ' + n1(q[1]); };
  const FUSTA = ['#c08a52', '#dcb07a', '#96643a'], FUSTAF = ['#a8733f', '#c79660', '#7d5230'], FERRO = ['#8a969e', '#b9c4ca', '#5c6870'], LLAUTO = ['#ddb344', '#f3d67a', '#a87d1c'], COTO = ['#f6efdc', '#fffaf0', '#d8ccb0'];
  /* prisma amb la cara frontal a la profunditat d0 i el fons a d1 */
  const prisma = (x, y, w, h, d0, d1, c, attr) => {
    c = c || FUSTA;
    return `<g ${attr || ''}><path d="M${pp(x, y, d0)}L${pp(x, y, d1)}L${pp(x + w, y, d1)}L${pp(x + w, y, d0)}Z" fill="${c[1]}" class="t2"/><path d="M${pp(x + w, y, d0)}L${pp(x + w, y, d1)}L${pp(x + w, y + h, d1)}L${pp(x + w, y + h, d0)}Z" fill="${c[2]}" class="t2"/><path d="M${pp(x, y, d0)}h${w}v${h}h${-w}Z" fill="${c[0]}" class="t2"/></g>`;
  };
  /* tot el que es dibuixa dins queda al pla lateral (profunditat × alçada) */
  const lateral = (x, y, d, inner, attr) => { const q = P(x, y, d); return `<g transform="matrix(${DX} ${DY} 0 1 ${n1(q[0])} ${n1(q[1])})" ${attr || ''}>${inner}</g>`; };
  const ma = (id, gir) => `<g id="${id}"><g transform="rotate(${gir || 0})"><rect x="-46" y="-10" width="32" height="20" rx="5" fill="#3d5a80" class="t2"/><path d="M-16-8q-4 8 0 16h17q11 0 11-8t-11-8z" fill="#e9b98f" class="t2"/><path d="M-4-8v9M3-8v9" stroke="${T}" stroke-width="1.4" fill="none"/></g></g>`;
  const fil2 = (id, g) => `<path id="${id}a" fill="none" stroke="#7a5a1c" stroke-width="${(g || 3) + 2}" stroke-linecap="round"/><path id="${id}" fill="none" stroke="#f0c552" stroke-width="${g || 3}" stroke-linecap="round"/>`;
  const posaFil = (el, id, d, g, k) => { // k: 0 = metxa verdosa, 1 = fil daurat
    const a = el(id + 'a'), b = el(id); a.setAttribute('d', d); b.setAttribute('d', d);
    a.setAttribute('stroke-width', (g + 2.2).toFixed(1)); b.setAttribute('stroke-width', g.toFixed(1));
    a.setAttribute('stroke', color('#6f8a66', '#7a5a1c', k)); b.setAttribute('stroke', color('#dcebd0', '#f0c552', k));
  };
  const tang = (c1, r1, c2, r2) => { // tangents exteriors entre dues politges
    const dx = c2[0] - c1[0], dy = c2[1] - c1[1], d = Math.hypot(dx, dy), q = (r1 - r2) / d, h = Math.sqrt(1 - q * q);
    return [-1, 1].map((s) => { const nx = q * dx / d - s * h * dy / d, ny = q * dy / d + s * h * dx / d; return `M${n1(c1[0] + r1 * nx)} ${n1(c1[1] + r1 * ny)}L${n1(c2[0] + r2 * nx)} ${n1(c2[1] + r2 * ny)}`; }).join('');
  };
  const terra = (y) => `<rect x="0" y="${y}" width="600" height="${606 - y}" fill="#e3d6bd"/><path d="M0 ${y}h600" stroke="${T}" stroke-width="2.5"/>`;
  const nota = (x, y, s, c, mida) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${mida || 18}" font-weight="800" fill="${c || T}" style="paint-order:stroke;stroke:#fffdf7;stroke-width:5px;stroke-linejoin:round">${s}</text>`;

  /* ---------- roda de filar: una roda, un fus, un fil ---------- */
  const GW = { c: P(429, 286, 25), r: 118, w: P(190, 396, 46), tip: P(190, 396, -44) };
  function rodaFilar(s) {
    let h = terra(548);
    h += `<ellipse cx="320" cy="566" rx="250" ry="16" fill="#2a2420" opacity=".09"/>`;
    h += `<path d="M150 470l-22 92M158 470l8 92M470 470l24 92M512 448l22 96" stroke="${T}" stroke-width="17" stroke-linecap="round"/><path d="M150 470l-22 92M158 470l8 92M470 470l24 92M512 448l22 96" stroke="#a8733f" stroke-width="12" stroke-linecap="round"/>`;
    h += prisma(120, 452, 380, 18, 0, 90);
    h += prisma(420, 300, 18, 152, 40, 58, FUSTAF);
    h += prisma(183, 404, 14, 48, 60, 72, FUSTAF);
    // corretja, fus i nou
    h += `<path d="${tang(GW.c, GW.r - 4, GW.w, 10)}" stroke="#7a4e26" stroke-width="3.2" fill="none"/>`;
    h += `<path d="M${pp(190, 396, 84)}L${n1(GW.tip[0])} ${n1(GW.tip[1])}" stroke="${T}" stroke-width="7" stroke-linecap="round"/><path d="M${pp(190, 396, 84)}L${n1(GW.tip[0])} ${n1(GW.tip[1])}" stroke="#9aa6af" stroke-width="3.6" stroke-linecap="round"/>`;
    h += `<circle cx="${n1(GW.w[0])}" cy="${n1(GW.w[1])}" r="11" fill="url(#g-llauto)" class="t2"/><g id="gw-nou-${s}"><path d="M${n1(GW.w[0])} ${n1(GW.w[1] - 9)}v18" stroke="${T}" stroke-width="2.4"/></g>`;
    h += `<path id="gw-cop-${s}a" d="M${pp(190, 396, 22)}L${pp(190, 396, -22)}" stroke="${T}" stroke-linecap="round" stroke-width="18"/><path id="gw-cop-${s}" d="M${pp(190, 396, 22)}L${pp(190, 396, -22)}" stroke="#f6efdc" stroke-linecap="round" stroke-width="14"/>`;
    h += prisma(183, 404, 14, 48, 0, 12, FUSTAF);
    h += fil2('gw-fil-' + s, 4);
    h += `<g id="gw-floca-${s}"><path d="M-30-12q-12-14 6-18 10-12 24-2 16-4 16 12 10 12-6 18-12 10-24 2-18 2-16-12z" fill="#f4f7ea" stroke="#7f9a78" stroke-width="2"/></g>` + ma('gw-ma-' + s, -32);
    // roda gran amb la mà que l'empeny
    h += `<g id="gw-roda-${s}">${roda(n1(GW.c[0]), n1(GW.c[1]), GW.r, { raigs: 10, color: '#b9834a', gruix: 15, raig: 6, raigColor: '#8b5a2b', boto: '#a8733f' })}</g>`;
    h += ma('gw-ma2-' + s, 215);
    h += nota(300, 592, '1 roda → 1 fus → 1 fil', '#4b433b', 21);
    return h;
  }
  /* q: moment d'una estirada (0–1) */
  function animaRodaFilar(el, s, q, n) {
    const estira = tram(q, 0.04, 0.5, 0, 1), torna = tram(q, 0.64, 0.95, 0, 1), L = 30 + 300 * (estira - torna);
    const gir = 360 * (2.2 * tram(q, 0.02, 0.56, 0, 1, true) - 0.12 * tram(q, 0.56, 0.62, 0, 1) + 1.1 * tram(q, 0.64, 0.95, 0, 1, true));
    el('gw-roda-' + s).setAttribute('transform', `rotate(${gir.toFixed(1)} ${n1(GW.c[0])} ${n1(GW.c[1])})`);
    el('gw-nou-' + s).setAttribute('transform', `rotate(${(gir * 11).toFixed(1)} ${n1(GW.w[0])} ${n1(GW.w[1])})`);
    // la mà s'allunya del fus cap a l'espectador; durant la recollida s'acosta i baixa
    const H = [GW.tip[0] - DX * L - 10, GW.tip[1] - DY * L - 46 * estira * (1 - torna) - 8];
    const k = q < 0.5 ? estira * 0.75 : q < 0.64 ? 0.75 + 0.25 * tram(q, 0.5, 0.62, 0, 1) : 1;
    posaFil(el, 'gw-fil-' + s, `M${n1(GW.tip[0])} ${n1(GW.tip[1])}L${n1(H[0])} ${n1(H[1])}`, lerp(8, 3.4, k), k);
    el('gw-ma-' + s).setAttribute('transform', `translate(${n1(H[0] - 12)} ${n1(H[1] + 9)})`);
    el('gw-floca-' + s).setAttribute('transform', `translate(${n1(H[0] - 6)} ${n1(H[1] + 6)})`);
    const ple = (n + torna) * 2.6;
    el('gw-cop-' + s).setAttribute('stroke-width', (10 + ple).toFixed(1)); el('gw-cop-' + s + 'a').setAttribute('stroke-width', (14 + ple).toFixed(1));
    const a = ((gir % 360) * Math.PI) / 180 + 0.5, m = [GW.c[0] + 96 * Math.cos(a), GW.c[1] + 96 * Math.sin(a)];
    el('gw-ma2-' + s).setAttribute('transform', `translate(${n1(m[0] + 8)} ${n1(m[1] + 6)})`);
  }

  /* ---------- Spinning Jenny: una roda, vuit fusos ---------- */
  const JX = (i) => 114 + i * 42, JL = 360;
  function jenny() {
    let h = terra(548) + `<ellipse cx="330" cy="566" rx="270" ry="16" fill="#2a2420" opacity=".09"/>`;
    // potes i fileta del fons, amb les bobines de metxa
    h += prisma(80, 300, 16, 258, JL - 16, JL, FUSTAF) + prisma(424, 300, 16, 258, JL - 16, JL, FUSTAF);
    h += prisma(80, 474, 360, 12, JL - 34, JL - 16, FUSTAF);
    for (let i = 0; i < 8; i++) { const b = P(JX(i), 474, JL - 26); h += `<rect x="${n1(b[0] - 13)}" y="${n1(b[1] - 38)}" width="26" height="38" rx="5" fill="#eef4e4" stroke="#6f8a66" stroke-width="2.2"/><path d="M${n1(b[0] - 16)} ${n1(b[1])}h32M${n1(b[0] - 16)} ${n1(b[1] - 38)}h32" stroke="${T}" stroke-width="3" stroke-linecap="round"/>`; }
    for (let i = 0; i < 8; i++) h += `<path id="j-m${i}a" fill="none" stroke="#6f8a66" stroke-width="8" stroke-linecap="round"/><path id="j-m${i}" fill="none" stroke="#dcebd0" stroke-width="5.6" stroke-linecap="round"/>`;
    // travessers laterals
    h += prisma(80, 506, 16, 14, 0, JL, FUSTAF) + prisma(80, 300, 16, 14, 0, JL) ;
    for (let i = 0; i < 8; i++) h += fil2('j-f' + i, 3);
    // carro amb la pinça
    h += `<g id="j-carro">${prisma(72, 284, 376, 16, -9, 9)}<g id="j-pin">${prisma(72, 268, 376, 13, -9, 9, FUSTAF)}<path d="M228 268v-20h64v20" fill="none" stroke="${T}" stroke-width="12" stroke-linejoin="round"/><path d="M228 268v-20h64v20" fill="none" stroke="#a8733f" stroke-width="7" stroke-linejoin="round"/></g>${ma('j-ma1', 100)}</g>`;
    h += prisma(424, 506, 16, 14, 0, JL, FUSTAF) + prisma(424, 300, 16, 14, 0, JL);
    // fusos, eix motor i travesser de davant
    h += `<rect x="92" y="473" width="392" height="11" rx="5" fill="url(#g-ferroh)" class="t2"/>`;
    for (let i = 0; i < 8; i++) {
      const x = JX(i);
      h += `<path d="M${x} 478V356" stroke="${T}" stroke-width="6" stroke-linecap="round"/><path d="M${x} 476V358" stroke="#9aa6af" stroke-width="2.6" stroke-linecap="round"/><path d="M${x - 3} 362l3-14 3 14z" fill="${T}"/>`;
      h += `<ellipse id="j-c${i}" cx="${x}" cy="420" rx="9" ry="36" fill="#f6efdc" class="t2"/><path id="j-g${i}" d="M${x} 392v56" stroke="#c9b98e" stroke-width="2"/>`;
      h += `<rect x="${x - 10}" y="454" width="20" height="7" rx="2" fill="url(#g-llauto)" class="t2"/><rect x="${x - 8}" y="468" width="16" height="20" rx="4" fill="url(#g-llauto)" class="t2"/>`;
    }
    h += `<path id="j-guia" d="M96 352H442" stroke="${T}" stroke-width="3.4" stroke-linecap="round"/>`;
    h += prisma(80, 506, 360, 18, 0, 12) + prisma(80, 300, 16, 258, 0, 16) + prisma(424, 300, 16, 258, 0, 16);
    // roda de costat (pla lateral) amb corretja fins a l'eix dels fusos
    h += prisma(470, 350, 12, 208, 118, 132, FUSTAF);
    h += lateral(486, 478, 6, `<path d="${tang([126, -128], 112, [0, 0], 20)}" stroke="#7a4e26" stroke-width="4" fill="none"/><g id="j-politja">${roda(0, 0, 22, { raigs: 4, gruix: 6, raig: 3 })}</g><g id="j-roda">${roda(126, -128, 116, { raigs: 8, color: '#b9834a', gruix: 15, raig: 7, raigColor: '#8b5a2b', boto: 'url(#g-ferro)' })}</g>`);
    h += `<g id="j-maneta"><path d="M0 0h30" stroke="${T}" stroke-width="15" stroke-linecap="round"/><path d="M0 0h30" stroke="#a8733f" stroke-width="10" stroke-linecap="round"/>${ma('j-ma2', 180)}</g>`;
    h += nota(290, 592, '1 roda → 8 fusos → 8 fils', '#8c4a14', 21);
    return h;
  }
  function animaJenny(el, q, n) {
    const obre = q < 0.14 || q >= 0.95, c = q < 0.14 ? tram(q, 0.02, 0.14, 70, 130) : q < 0.5 ? tram(q, 0.16, 0.5, 130, 322) : q < 0.66 ? 322 : tram(q, 0.68, 0.95, 322, 70);
    const gir = 360 * (0.5 * tram(q, 0.16, 0.5, 0, 1, true) + 1.7 * tram(q, 0.5, 0.64, 0, 1, true) - 0.1 * tram(q, 0.64, 0.68, 0, 1) + 1.2 * tram(q, 0.68, 0.95, 0, 1, true));
    el('j-carro').setAttribute('transform', `translate(${n1(DX * c)} ${n1(DY * c)})`);
    el('j-pin').setAttribute('transform', `translate(0 ${obre ? -9 : 0})`);
    el('j-ma1').setAttribute('transform', 'translate(260 232)');
    el('j-roda').setAttribute('transform', `rotate(${gir.toFixed(1)} 126 -128)`);
    el('j-politja').setAttribute('transform', `rotate(${(gir * 5.3).toFixed(1)})`);
    const a = (gir * Math.PI) / 180, hm = P(486, 478, 6 + 126 + 64 * Math.cos(a)); hm[1] += -128 + 64 * Math.sin(a);
    el('j-maneta').setAttribute('transform', `translate(${n1(hm[0])} ${n1(hm[1])})`);
    el('j-ma2').setAttribute('transform', 'translate(56 0)');
    const recull = tram(q, 0.68, 0.95, 0, 1), gy = q >= 0.64 && q < 0.96 ? 352 + 62 * tram(q, 0.64, 0.7, 0, 1) - 62 * tram(q, 0.93, 0.96, 0, 1) + 16 * Math.sin(recull * 9) * (q > 0.7 ? 1 : 0) : 352;
    el('j-guia').setAttribute('d', `M96 ${n1(gy)}H442`);
    const k = q < 0.16 ? 0 : q < 0.5 ? 0.55 * tram(q, 0.16, 0.5, 0, 1) : q < 0.66 ? 0.55 + 0.45 * tram(q, 0.5, 0.64, 0, 1) : 1, g = lerp(6.4, 2.8, k), ple = (n + recull) * 1.7;
    for (let i = 0; i < 8; i++) {
      const x = JX(i), pin = P(x, 286, c), bob = P(x, 436, JL - 26);
      const d1 = `M${n1(bob[0])} ${n1(bob[1])}L${n1(pin[0])} ${n1(pin[1])}`; el('j-m' + i).setAttribute('d', d1); el('j-m' + i + 'a').setAttribute('d', d1);
      posaFil(el, 'j-f' + i, gy > 353 ? `M${n1(pin[0])} ${n1(pin[1])}L${x + 4} ${n1(gy)}L${x + 8} ${n1(gy + 18)}` : `M${n1(pin[0])} ${n1(pin[1])}L${x} 350`, g, k);
      el('j-c' + i).setAttribute('rx', (7 + ple).toFixed(1));
      el('j-g' + i).setAttribute('transform', `translate(${((7 + ple) * 0.8 * Math.sin(a * 5.3 + i)).toFixed(1)} 0)`);
    }
  }

  const NJ = 3; // estirades per cicle complet
  RI.ABANS.jenny = {
    durada: 30, innova: [1, 2],
    pregunta: 'Què hi guanya la Jenny respecte de la roda?',
    intro: 'Les dues persones fan <b>el mateix gest</b>: estirar, torçar i recollir. Compta quants fils surten de cada estirada.',
    svg: () => svg(duo({ abans: 'roda de filar', ara: 'Spinning Jenny (1764)', color: '#b9722a', banda: 606,
      a: `<g transform="translate(-50 0)">${rodaFilar('j')}${mesura('mj-a', 40, 668, 300, 'Trams de fil filats', '#b9722a')}</g>`,
      b: `<g transform="translate(626 0)">${jenny()}${mesura('mj-b', 40, 668, 300, 'Trams de fil filats', '#b9722a')}</g>` })),
    anima: animaDuo(({ p, el }) => {
      const q = (p * NJ) % 1, n = Math.floor(p * NJ + 1e-6), fet = n + (q >= 0.95 ? 1 : 0);
      animaRodaFilar(el, 'j', q, n); animaJenny(el, q, n);
      posaMesura(el, 'mj-a', (n + tram(q, 0.64, 0.95, 0, 1)) / (NJ * 8), 300, `${fet} ${fet === 1 ? 'tram' : 'trams'}`);
      posaMesura(el, 'mj-b', (n + tram(q, 0.68, 0.95, 0, 1)) / NJ, 300, `${fet * 8} trams`);
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: una roda, un fil', text: 'Una mà fa girar la roda i l’altra estira la metxa. La roda mou <b>un sol fus</b>: per molt hàbil que sigui la filadora, de cada estirada en surt un sol fil.' },
      { fins: 0.67, nom: 'Ara: una roda, vuit fusos', text: 'A la Jenny una <b>pinça</b> agafa vuit metxes alhora i la mateixa roda fa girar <b>vuit fusos</b>. El gest és el mateix, però es fa vuit vegades de cop.' },
      { fins: 1, nom: 'El resultat: vuit vegades més fil', text: 'Amb el mateix temps i la mateixa força, una sola persona fila el que abans filaven vuit. I la màquina encara cap en una casa.' }
    ],
    clau: 'La Jenny no fila millor: multiplica els fusos que mou una sola persona.'
  };
  RI.CMP_TEXTIL = { rodaFilar, animaRodaFilar, jenny, animaJenny, prisma, lateral, P, pp, ma, fil2, posaFil, tang, terra, nota, n1, FUSTA, FUSTAF, FERRO, LLAUTO, COTO, DX, DY };
})();
