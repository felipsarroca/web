// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 6 · «Abans i ara»: la caldera d'un sol tub i la caldera multitubular de la Rocket. */
(function () {
  'use strict';
  const { duo, mesura, posaMesura, animaDuo, focs, tram, clamp, svg, fletxa } = RI;
  RI.ABANS = RI.ABANS || {};
  const T = '#2a2420', C = '#1f6f78';
  const n1 = (v) => Math.round(v * 10) / 10;
  const nota = (x, y, s, c, mida) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${mida || 18}" font-weight="800" fill="${c || T}" style="paint-order:stroke;stroke:#fffdf7;stroke-width:5px;stroke-linejoin:round">${s}</text>`;

  function caldera(multi) {
    const s = multi ? 'm' : 'u';
    let h = '';
    // fogar, cos de la caldera en secció i xemeneia
    h += `<rect x="40" y="168" width="78" height="170" rx="6" fill="url(#g-coure)" class="t"/><rect x="50" y="232" width="58" height="96" rx="4" fill="#3a2a22" class="t2"/><g id="foc-${s}">${focs(64, 326, 2, 28, 26, 44)}</g><rect x="46" y="322" width="66" height="10" class="carbo t2"/>`;
    h += `<rect x="112" y="150" width="372" height="170" rx="14" fill="#cfd9de" class="t"/><rect x="118" y="186" width="360" height="128" rx="8" fill="#6fb6dc"/><path d="M118 190q15-7 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0" fill="none" stroke="#fff" stroke-width="2.200"/>`;
    h += `<rect x="484" y="150" width="54" height="170" rx="6" fill="url(#g-ferroc)" class="t"/><rect x="494" y="40" width="34" height="112" fill="url(#g-ferroc)" class="t"/><path d="M488 40h46" stroke="${T}" stroke-width="7" stroke-linecap="round"/>`;
    h += `<rect x="276" y="118" width="44" height="36" rx="12" fill="url(#g-llauto)" class="t2"/><path d="M298 118V96H420" fill="none" stroke="${T}" stroke-width="${multi ? 15 : 9}"/><path d="M298 118V96H420" fill="none" stroke="#f0ab68" stroke-width="${multi ? 10 : 5}"/><path d="M298 114V96H416" class="flux s-blanc" stroke-width="${multi ? 6 : 3}" data-flux="${multi ? 3.500 : 1.200}"/>`;
    h += `<text x="360" y="84" text-anchor="middle" font-size="15" font-weight="800" fill="#b23a1f">vapor cap als cilindres</text>`;
    // tubs de foc: un de sol o molts de prims
    const tub = (y, g) => `<rect x="112" y="${y}" width="376" height="${g}" fill="#f0a35c" stroke="${T}" stroke-width="2.200"/><path d="M118 ${y + g / 2}H482" class="flux s-groc" stroke-width="${Math.min(7, g * 0.5)}" data-flux="2.200"/>`;
    if (multi) [204, 228, 252, 276, 298].forEach((y) => { h += tub(y, 11); });
    else h += tub(226, 54);
    (multi ? [[150, 4, 6], [215, 5, 6.500], [280, 5, 6], [345, 5, 6.500], [410, 4, 6], [450, 3, 5]] : [[200, 2, 6], [360, 2, 6.500]]).forEach(([x, n, r]) => { h += `<g data-puf="${x} ${multi ? 204 : 226} 0 ${multi ? -16 : -36} ${n} ${r - 2} 1.900" class="vap"></g>`; });
    h += `<g data-puf="511 40 26 -44 ${multi ? 6 : 3} ${multi ? 13 : 9} ${multi ? 1.400 : 2.600}" class="${multi ? 'vap' : 'fum'}"></g>`;
    if (multi) {
      h += `<ellipse class="innova-halo innova-pols" cx="300" cy="258" rx="200" ry="72" fill="rgba(251,191,36,.12)" stroke="#d97706" stroke-width="3" stroke-dasharray="7 5"/>`;
      h += `<path d="M440 352H511V170" fill="none" stroke="${T}" stroke-width="11"/><path d="M440 352H511V170" fill="none" stroke="#c9d6dc" stroke-width="6"/><path d="M444 352H511V160" class="flux s-blanc" stroke-width="4" data-flux="4"/>` + fletxa('M511 150V96', '#fff', 5) + nota(404, 376, 'el vapor usat estira el foc', C, 15);
    }
    // la mateixa caldera vista de cara
    h += `<circle cx="120" cy="486" r="80" fill="#cfd9de" class="t"/><path d="M46 458A80 80 0 1 0 194 458Z" fill="#6fb6dc"/><circle cx="120" cy="486" r="80" fill="none" class="t"/>`;
    if (multi) { let k = 0; for (let f = 0; f < 5; f++) for (let c = 0; c < 5; c++, k++) h += `<circle cx="${n1(72 + c * 24 + (f % 2 ? 0 : 0))}" cy="${470 + f * 19}" r="7.500" fill="#f0a35c" stroke="${T}" stroke-width="2"/>`; }
    else h += `<circle cx="120" cy="508" r="30" fill="#f0a35c" class="t2"/>`;
    h += nota(120, 392, 'vista de cara', T, 15) + nota(120, 592, multi ? '25 tubs' : '1 tub', multi ? '#8c4a14' : '#4b433b', 20);
    // manòmetre: quant vapor hi ha per empènyer els pistons
    h += `<circle cx="420" cy="494" r="66" fill="#fffdf7" class="t"/><path d="M372 532A62 62 0 1 1 468 532" fill="none" stroke="#d9cdb4" stroke-width="12"/><path d="M372 532A62 62 0 0 1 380 448" fill="none" stroke="#e9a48f" stroke-width="12"/><path d="M460 448A62 62 0 0 1 468 532" fill="none" stroke="#8fd05c" stroke-width="12"/><text x="366" y="560" text-anchor="middle" font-size="13" font-weight="800" fill="#b23a1f">poca</text><text x="476" y="560" text-anchor="middle" font-size="13" font-weight="800" fill="#3f7d2a">molta</text>`;
    h += `<line id="agulla-${s}" x1="420" y1="494" x2="420" y2="444" stroke="${T}" stroke-width="5" stroke-linecap="round"/><circle cx="420" cy="494" r="7" fill="${T}"/>` + nota(420, 592, 'força del vapor', T, 17);
    h += mesura('mt-' + s, 40, 668, 300, 'Superfície de foc que toca l’aigua', '#f08a4b');
    return h;
  }
  RI.ABANS.rocket = {
    durada: 24, innova: [1, 2],
    pregunta: 'Què hi guanya la caldera de la Rocket?',
    intro: 'Per córrer cal <b>molt vapor</b>, i per fer vapor cal que el foc toqui molta aigua. Compara els tubs de les dues calderes, tallades de costat i vistes de cara.',
    svg: () => svg(duo({ abans: 'un sol tub de foc (1825)', ara: 'caldera multitubular (1829)', color: C, banda: 606, a: `<g transform="translate(-50 0)">${caldera(false)}</g>`, b: `<g transform="translate(626 0)">${caldera(true)}</g>` })),
    anima: animaDuo(({ p, t, el }) => {
      const k = tram(p, 0, 0.25, 0, 1);
      [['u', 0.3, -62, 0.42], ['m', 1, 58, 0.95]].forEach(([s, f, ang, sup]) => {
        el('foc-' + s).setAttribute('transform', `translate(78 326) scale(1 ${n1(0.55 + 0.6 * f + 0.05 * Math.sin(t * 9))}) translate(-78 -326)`);
        el('agulla-' + s).setAttribute('transform', `rotate(${n1(-120 + (ang + 120) * k + 2.500 * Math.sin(t * 11))} 420 494)`);
        posaMesura(el, 'mt-' + s, sup * k, 300, s === 'u' ? 'poca' : k > 0.9 ? 'més del doble' : 'molta');
      });
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: un sol tub de foc', text: 'A les primeres locomotores, els gasos calents travessaven l’aigua per <b>un sol tub gros</b>. Poca superfície calenta, poc vapor: el tren no podia córrer gaire estona.' },
      { fins: 0.67, nom: 'Ara: vint-i-cinc tubs prims', text: 'A la Rocket el foc passa per <b>25 tubs de coure</b> envoltats d’aigua. I el vapor que surt dels cilindres s’escapa per la xemeneia: l’estirada <b>aviva el foc</b> just quan la màquina corre més.' },
      { fins: 1, nom: 'El resultat: vapor de sobres', text: 'La caldera fa molt més vapor amb el mateix volum. Per això la Rocket va guanyar a Rainhill i totes les locomotores de vapor posteriors van copiar aquesta caldera.' }
    ],
    clau: 'La Rocket no té més foc: fa que el mateix foc toqui molta més aigua.'
  };
})();
