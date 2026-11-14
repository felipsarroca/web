// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 5 · «Abans i ara»: del martinet al laminador i del gresol al convertidor. */
(function () {
  'use strict';
  const { duo, mesura, posaMesura, animaDuo, focs, tram, color, clamp, svg, roda, persona, lerp } = RI;
  RI.ABANS = RI.ABANS || {};
  const T = '#2a2420', C = '#c9621c';
  const nota = (x, y, s, c, mida) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${mida || 18}" font-weight="800" fill="${c || T}" style="paint-order:stroke;stroke:#fffdf7;stroke-width:5px;stroke-linejoin:round">${s}</text>`;
  const n1 = (v) => Math.round(v * 10) / 10;
  const terra = (y) => `<rect x="0" y="${y}" width="600" height="${606 - y}" class="pedra"/><path d="M0 ${y}h600" stroke="${T}" stroke-width="2.500"/>`;
  const rellotge = (id, x, y, r) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fffdf7" stroke="${T}" stroke-width="3"/><path d="M${x} ${y - r + 4}v7M${x} ${y + r - 4}v-7M${x - r + 4} ${y}h7M${x + r - 4} ${y}h-7" stroke="${T}" stroke-width="2.500"/><path id="${id}-s" fill="${C}" opacity=".35"/><line id="${id}" x1="${x}" y1="${y}" x2="${x}" y2="${y - r + 9}" stroke="${T}" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="4" fill="${T}"/></g>`;
  const posaRellotge = (el, id, x, y, r, k) => { const a = 2 * Math.PI * clamp(k, 0, 0.9999); el(id).setAttribute('transform', `rotate(${n1(360 * k)} ${x} ${y})`); el(id + '-s').setAttribute('d', `M${x} ${y}V${y - r + 3}A${r - 3} ${r - 3} 0 ${k > 0.5 ? 1 : 0} 1 ${n1(x + (r - 3) * Math.sin(a))} ${n1(y - (r - 3) * Math.cos(a))}Z`); };

  /* ---------- acer de gresol ---------- */
  function gresols() {
    let h = terra(520);
    h += `<rect class="t mao" x="170" y="96" width="78" height="286"/><rect class="t fosc" x="162" y="84" width="94" height="16"/><g data-puf="209 80 14 -46 5 12 2.600" class="fum"></g>`;
    h += `<rect class="t mao" x="60" y="380" width="300" height="140"/>`;
    [120, 250].forEach((x, i) => {
      h += `<path d="M${x - 44} 396h88v112h-88z" fill="#3a2a22" class="t2"/><path d="M${x - 40} 508q8-40 40-44 32 4 40 44z" fill="url(#g-roent)" opacity=".9"/>${focs(x - 22, 506, 3, 22, 18, 26)}`;
      h += `<g id="gr-pot${i}"><path d="M${x - 19} 404h38l-7 86q-12 8-24 0z" fill="#d9c2a0" class="t2"/><path d="M${x - 15} 430h30l-4 54q-11 6-22 0z" fill="url(#g-bany)" opacity=".85"/></g><rect id="gr-tapa${i}" x="${x - 26}" y="392" width="52" height="11" rx="3" fill="#8a7a66" class="t2"/>`;
    });
    h += persona(446, 520, 190, { color: '#7a4a2a', barret: true, brac: 'M-8-68l-22 20M8-68l-26 22' });
    h += `<g id="gr-tenalla"><path d="M400 422L280 396" stroke="${T}" stroke-width="7" stroke-linecap="round"/><path d="M400 422L280 396" stroke="#8a969e" stroke-width="3.500" stroke-linecap="round"/></g>`;
    h += nota(210, 356, 'gresols dins del foc', T, 17);
    // el que surt al cap d'unes hores
    h += `<g id="gr-despres"><rect x="402" y="96" width="186" height="96" rx="12" fill="#fffdf7" stroke="${T}" stroke-width="2" stroke-dasharray="6 5"/><text x="495" y="120" text-anchor="middle" font-size="15" font-weight="800" fill="${T}">al cap d’unes hores</text><path d="M452 150h46l6 26h-58z" fill="url(#g-acer)" class="t2"/><text x="544" y="158" text-anchor="middle" font-size="15" font-weight="800" fill="${T}">un lingot</text><text x="544" y="176" text-anchor="middle" font-size="14" font-weight="700" fill="#4b433b">≈ 20 kg</text></g>`;
    h += nota(300, 592, 'cada gresol, unes desenes de quilos', '#4b433b', 20);
    return h;
  }
  /* ---------- convertidor ---------- */
  const VAS = 'M-62-112Q-82-40-74 44Q-64 104 0 108Q64 104 74 44Q82-40 62-112L36-156H-36Z';
  function convertidor() {
    let h = terra(520);
    h += `<path d="M118 520L152 300h36L222 520z" fill="url(#g-ferroc)" class="t"/><path d="M318 520L352 300h36L422 520z" fill="url(#g-ferroc)" class="t"/>`;
    h += `<path d="M370 300H520V470" fill="none" stroke="${T}" stroke-width="15"/><path d="M370 300H520V470" fill="none" stroke="#8fb9d6" stroke-width="9"/><path d="M516 466V300H376" class="flux s-blanc" data-flux="3" id="bs-aire"/><rect class="t ferro" x="486" y="466" width="70" height="54" rx="6"/><text x="521" y="499" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">aire</text>`;
    h += `<g id="bs-flama"><path d="M270 150C240 110 250 60 270 0C290 60 300 110 270 150Z" fill="#e2501f" class="t2"/><path d="M270 150C254 120 258 86 270 44C282 86 286 120 270 150Z" fill="#ffb02e"/><path d="M270 150C262 132 264 114 270 92C276 114 278 132 270 150Z" fill="#fff3a8"/></g><g id="bs-esp" data-puf="270 140 30 -110 6 5 1.100" class="calor"></g>`;
    h += `<g id="bs-vas"><path d="${VAS}" fill="url(#g-ferroc)" class="t"/><path d="M-52-108Q-70-40-62 40Q-54 92 0 96Q54 92 62 40Q70-40 52-108L30-146H-30Z" fill="#4a2a1c"/><path id="bs-bany" d="M-63 30Q-56 92 0 96Q56 92 63 30Z" fill="url(#g-bany)"/><g id="bs-bomb"><circle cx="-24" cy="56" r="5" fill="#fff6b3"/><circle cx="8" cy="68" r="6" fill="#fff6b3"/><circle cx="30" cy="50" r="4.500" fill="#fff6b3"/><circle cx="-6" cy="44" r="4" fill="#fff6b3"/></g><rect x="-44" y="104" width="88" height="20" rx="4" fill="url(#g-ferro)" class="t2"/><rect x="-84" y="-16" width="168" height="26" rx="6" fill="url(#g-ferroh)" class="t2"/></g>`;
    h += `<circle cx="170" cy="300" r="15" fill="url(#g-llauto)" class="t2"/><circle cx="370" cy="300" r="15" fill="url(#g-llauto)" class="t2"/>`;
    h += `<path id="bs-raig" fill="none" stroke="#ffb02e" stroke-width="11" stroke-linecap="round"/><path d="M36 446h112l-12 74H48z" fill="url(#g-ferroc)" class="t"/><path id="bs-cull" d="M44 500h96l-3 16H47z" fill="url(#g-bany)"/>`;
    h += `<g id="bs-lingots">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${404 + (i % 3) * 62} ${150 - Math.floor(i / 3) * 44}h50l7 34h-64z" fill="url(#g-acer)" class="t2"/>`).join('')}<text x="494" y="208" text-anchor="middle" font-size="15" font-weight="800" fill="${T}">lingots de centenars de quilos</text></g>`;
    h += nota(300, 592, 'diverses tones a cada bufada', '#8c4a14', 20);
    return h;
  }
  RI.ABANS.bessemer = {
    durada: 26, innova: [1, 2],
    pregunta: 'Què hi guanya el convertidor de Bessemer?',
    intro: 'Els dos rellotges marquen <b>els mateixos vint minuts</b>. Mira quant acer ha sortit de cada costat quan s’acaben.',
    svg: () => svg(duo({ abans: 'acer de gresol', ara: 'convertidor Bessemer (1856)', color: C, banda: 606,
      a: `<g transform="translate(-50 0)">${gresols()}${rellotge('rl-a', 70, 150, 44)}${nota(70, 220, '20 minuts', T, 16)}${mesura('ms-a', 40, 668, 300, 'Acer obtingut en 20 minuts', '#56636c')}</g>`,
      b: `<g transform="translate(626 0)">${convertidor()}${rellotge('rl-b', 70, 150, 44)}${nota(70, 220, '20 minuts', T, 16)}${mesura('ms-b', 40, 668, 300, 'Acer obtingut en 20 minuts', '#56636c')}</g>` })),
    anima: animaDuo(({ p, t, el }) => {
      const k = tram(p, 0.06, 0.9, 0, 0.985, true);
      posaRellotge(el, 'rl-a', 70, 150, 44, k); posaRellotge(el, 'rl-b', 70, 150, 44, k);
      // gresols: encara es fonen; l'obrer només n'aixeca la tapa per mirar
      const mira = Math.max(0, Math.sin(p * Math.PI * 5)) ** 4;
      el('gr-tapa1').setAttribute('transform', `translate(${n1(18 * mira)} ${n1(-24 * mira)}) rotate(${n1(-18 * mira)} 250 398)`);
      el('gr-tenalla').setAttribute('transform', `translate(0 ${n1(-22 * mira)})`);
      el('gr-despres').style.opacity = p > 0.72 ? 1 : 0.25;
      posaMesura(el, 'ms-a', 0, 300, p > 0.72 ? 'encara res: falten hores' : 'encara es fon…');
      // convertidor: bufa, bascula i cola
      const bufa = p > 0.1 && p < 0.72, f = bufa ? 0.55 + 0.45 * Math.sin(((p - 0.1) / 0.62) * Math.PI) : 0, gir = 104 * (tram(p, 0.74, 0.82, 0, 1) - tram(p, 0.95, 1, 0, 1)), cola = tram(p, 0.82, 0.94, 0, 1);
      el('bs-vas').setAttribute('transform', `translate(270 300) rotate(${n1(-gir)})`);
      el('bs-flama').setAttribute('transform', `translate(270 150) scale(${n1(0.4 + 0.75 * f)} ${n1(f * (1 + 0.06 * Math.sin(t * 17)))}) translate(-270 -150)`); el('bs-flama').style.opacity = bufa ? 1 : 0;
      el('bs-esp').style.opacity = bufa ? 1 : 0; el('bs-aire').style.opacity = bufa ? 1 : 0;
      el('bs-bomb').style.opacity = bufa ? 1 : 0; el('bs-bomb').setAttribute('transform', `translate(0 ${n1(-12 * ((t * 1.7) % 1))})`);
      el('bs-bany').style.opacity = 1 - cola;
      const boca = [270 - 156 * Math.sin((gir * Math.PI) / 180), 300 - 156 * Math.cos((gir * Math.PI) / 180)];
      el('bs-raig').setAttribute('d', cola > 0.02 && cola < 0.98 ? `M${n1(boca[0])} ${n1(boca[1])}Q${n1(boca[0] - 30)} ${n1(boca[1] + 20)} 96 500` : '');
      el('bs-cull').setAttribute('d', `M${n1(44 - 4 * cola)} ${n1(500 - 40 * cola)}h${n1(96 + 8 * cola)}l${n1(-3 - 5 * cola)} ${n1(16 + 40 * cola)}H47z`); el('bs-cull').style.opacity = cola > 0.02 ? 1 : 0;
      el('bs-lingots').style.opacity = clamp((p - 0.9) / 0.06, 0, 1);
      posaMesura(el, 'ms-b', cola, 300, cola > 0.95 ? 'unes quantes tones' : bufa ? 'bufant…' : cola > 0 ? 'colant…' : 'ferro colat carregat');
    }),
    fases: [
      { fins: 0.3, nom: 'Abans: petits gresols al foc', text: 'L’acer es fonia en <b>gresols</b> de terrissa, de pocs quilos cadascun, enterrats en un foc de coc durant hores. Era excel·lent, però tan car que només servia per a eines i molles.' },
      { fins: 0.74, nom: 'Ara: aire a través del ferro fos', text: 'Bessemer bufa aire per sota del ferro colat líquid. L’oxigen <b>crema el carboni sobrant</b> i aquesta mateixa combustió manté el metall líquid: no cal cap més combustible.' },
      { fins: 1, nom: 'El resultat: tones en vint minuts', text: 'Quan el rellotge arriba als vint minuts, el convertidor bascula i cola <b>tones d’acer</b>. Els gresols encara necessiten hores per donar uns quants quilos.' }
    ],
    clau: 'L’acer deixa de ser un metall de luxe: n’hi haurà prou per a rails, vaixells i ponts.'
  };

  /* ---------- del martinet al laminador ---------- */
  function martinet() {
    let h = terra(520);
    // roda hidràulica i arbre de lleves
    h += `<rect x="470" y="470" width="130" height="50" class="aigua"/><g id="mt-roda">${roda(520, 400, 92, { raigs: 8, color: '#8b5a2b', gruix: 13, raig: 6, raigColor: '#6b3e17' })}</g>`;
    h += `<rect x="404" y="300" width="20" height="220" fill="#a8733f" class="t2"/><g id="mt-lleves"><circle cx="414" cy="400" r="22" fill="url(#g-ferro)" class="t2"/><path d="M414 372v-22M414 428v22M386 400h-22M442 400h22" stroke="${T}" stroke-width="13" stroke-linecap="round"/><path d="M414 372v-22M414 428v22M386 400h-22M442 400h22" stroke="#8a969e" stroke-width="8" stroke-linecap="round"/></g>`;
    h += `<path d="M414 400H520" stroke="${T}" stroke-width="9"/><path d="M414 400H520" stroke="#8a969e" stroke-width="5"/>`;
    // mall: una biga que la lleva aixeca i deixa caure
    h += `<rect x="286" y="330" width="20" height="190" fill="#a8733f" class="t2"/><g id="mt-mall"><rect x="150" y="314" width="250" height="22" rx="5" fill="url(#g-fustac)" class="t2"/><rect x="130" y="300" width="56" height="78" rx="6" fill="url(#g-ferroc)" class="t"/><circle cx="296" cy="325" r="9" fill="url(#g-llauto)" class="t2"/></g>`;
    h += `<path d="M118 520h80l-10-74h-60z" fill="url(#g-ferroc)" class="t"/><rect x="112" y="434" width="92" height="16" rx="3" fill="url(#g-ferro)" class="t2"/>`;
    h += `<rect id="mt-ferro" x="120" y="408" width="50" height="26" rx="6" fill="url(#g-roent)" class="t2"/><g id="mt-guspira"><path d="M150 404l-24-18M160 402l4-28M172 404l26-14M144 410l-30-4" stroke="#ff9a2e" stroke-width="4" stroke-linecap="round"/></g>`;
    h += persona(56, 520, 176, { color: '#7a4a2a', barret: true, brac: 'M-8-68l-8 26M8-68l26 14' }) + `<path d="M86 416L128 420" stroke="${T}" stroke-width="6" stroke-linecap="round"/>`;
    h += nota(300, 96, 'el mall pica: cop a cop', T, 19) + nota(300, 592, 'una barra curta, a força de cops', '#4b433b', 20);
    return h;
  }
  function laminador() {
    let h = terra(520);
    h += `<rect x="214" y="150" width="172" height="370" rx="8" fill="url(#g-ferroc)" class="t"/><rect x="238" y="178" width="124" height="296" rx="6" fill="#e9dfc8" class="t2"/><rect x="286" y="130" width="28" height="30" fill="url(#g-ferro)" class="t2"/><rect x="266" y="118" width="68" height="16" rx="4" fill="url(#g-llauto)" class="t2"/>`;
    h += `<rect x="20" y="344" width="200" height="12" fill="url(#g-ferro)" class="t2"/><rect x="380" y="344" width="220" height="12" fill="url(#g-ferro)" class="t2"/><path d="M40 356v164M190 356v164M410 356v164M560 356v164" stroke="${T}" stroke-width="9"/><path d="M40 356v164M190 356v164M410 356v164M560 356v164" stroke="#8a969e" stroke-width="5"/>`;
    h += `<rect id="lm-entra" x="120" y="316" width="100" height="28" rx="5" fill="url(#g-roent)" class="t2"/><rect id="lm-surt" x="380" y="325" width="0" height="12" rx="4" fill="url(#g-roent)" class="t2"/>`;
    h += `<g id="lm-c1">${roda(300, 268, 62, { raigs: 6, color: '#56636c', gruix: 20, raig: 8 })}</g><g id="lm-c2">${roda(300, 394, 62, { raigs: 6, color: '#56636c', gruix: 20, raig: 8 })}</g>`;
    h += `<ellipse class="innova-halo innova-pols" cx="300" cy="331" rx="56" ry="30" fill="rgba(251,191,36,.2)" stroke="#d97706" stroke-width="3" stroke-dasharray="7 5"/>`;
    h += `<g id="lm-pila"></g>` + nota(300, 96, 'dos corrons: una sola passada', '#8c4a14', 19) + nota(300, 592, 'barres llargues, una darrere l’altra', '#8c4a14', 20);
    return h;
  }
  const NB = 15;
  RI.ABANS.pudelat = {
    durada: 28, innova: [1, 2],
    pregunta: 'Què hi guanyen els corrons respecte del mall?',
    intro: 'Les dues màquines donen forma al ferro roent. Compta les barres que surten de cada costat en el mateix temps.',
    svg: () => svg(duo({ abans: 'forja amb martinet', ara: 'laminador de Cort (1784)', color: C, banda: 606,
      a: `<g transform="translate(-50 0)">${martinet()}${mesura('mb-a', 40, 668, 300, 'Barres fetes', '#56636c')}</g>`,
      b: `<g transform="translate(626 0)">${laminador()}${mesura('mb-b', 40, 668, 300, 'Barres fetes', '#56636c')}</g>` })),
    anima: animaDuo(({ p, t, el }) => {
      // martinet: la lleva aixeca la cua de la biga i el cap cau sobre l'enclusa
      const v = p * 12, u = v % 1, alt = u < 0.8 ? tram(u, 0, 0.8, 0, 1, true) : tram(u, 0.8, 0.9, 1, 0, true), cop = u > 0.9;
      el('mt-mall').setAttribute('transform', `rotate(${n1(7 - 15 * alt)} 296 325)`);
      el('mt-lleves').setAttribute('transform', `rotate(${n1((v * 90) % 360)} 414 400)`); el('mt-roda').setAttribute('transform', `rotate(${n1((v * 90) % 360)} 520 400)`);
      el('mt-guspira').style.opacity = cop ? 1 : 0;
      const w = 50 + 62 * p, hh = 26 - 12 * p; el('mt-ferro').setAttribute('width', n1(w)); el('mt-ferro').setAttribute('height', n1(hh)); el('mt-ferro').setAttribute('y', n1(434 - hh)); el('mt-ferro').setAttribute('x', n1(150 - w / 2));
      posaMesura(el, 'mb-a', p > 0.985 ? 1 / NB : 0, 300, p > 0.985 ? '1 barra' : 'encara cap');
      // laminador: el tocho entra gruixut i surt llarg i prim
      const z = p * NB, n = Math.floor(z + 1e-6), q = z - n, pas = tram(q, 0.08, 0.7, 0, 1, true), surt = tram(q, 0.72, 0.98, 0, 1);
      el('lm-c1').setAttribute('transform', `rotate(${n1((t * 150) % 360)} 300 268)`); el('lm-c2').setAttribute('transform', `rotate(${n1((-t * 150) % 360)} 300 394)`);
      // el tocho arriba per la taula, els corrons se l'empassen i surt per l'altra banda
      el('lm-entra').setAttribute('width', n1(Math.max(0, 100 * (1 - pas)))); el('lm-entra').setAttribute('x', n1(238 - 100 * (1 - pas) - 90 * (1 - tram(q, 0, 0.08, 0, 1))));
      el('lm-surt').setAttribute('x', n1(362 + 240 * surt)); el('lm-surt').setAttribute('width', n1(Math.max(0, 226 * pas * (1 - surt))));
      const pila = el('lm-pila'), fets = n + (q > 0.98 ? 1 : 0);
      if (pila.childNodes.length !== fets) { let s = ''; for (let i = 0; i < fets; i++) s += `<rect x="${424 + (i % 2) * 6}" y="${508 - i * 11}" width="150" height="9" rx="3" fill="url(#g-acer)" stroke="${T}" stroke-width="1.600"/>`; pila.innerHTML = s; }
      posaMesura(el, 'mb-b', fets / NB, 300, `${fets} ${fets === 1 ? 'barra' : 'barres'}`);
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: picar amb el mall', text: 'Una roda hidràulica aixeca un mall pesant i el deixa caure. El ferrer gira la peça roent a cada cop: per fer <b>una sola barra</b> calen moltes martellades.' },
      { fins: 0.67, nom: 'Ara: passar entre dos corrons', text: 'Henry Cort fa passar el ferro roent entre <b>dos corrons</b> que giren en sentit contrari. La peça s’aprima i s’allarga d’una sola passada, sempre amb la mateixa forma.' },
      { fins: 1, nom: 'El resultat: quinze vegades més', text: 'Segons el mateix Cort, laminar era unes <b>quinze vegades més ràpid</b> que martellejar. I els corrons poden portar canals per fer barres, planxes o rails.' }
    ],
    clau: 'El laminador converteix una feina d’ofici en una producció en sèrie: tot el que surt és igual.'
  };
})();
