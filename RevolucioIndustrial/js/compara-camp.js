// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 1 · «Abans i ara»: sembrar a eixam o en fileres; arada pesant o arada de Rotherham. */
(function () {
  'use strict';
  const { duo, mesura, posaMesura, animaDuo, tram, clamp, svg, roda, persona, cavall } = RI;
  RI.ABANS = RI.ABANS || {};
  const T = '#2a2420', C = '#5b8c35';
  const n1 = (v) => Math.round(v * 10) / 10;
  const nota = (x, y, s, c, mida) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${mida || 18}" font-weight="800" fill="${c || T}" style="paint-order:stroke;stroke:#fffdf7;stroke-width:5px;stroke-linejoin:round">${s}</text>`;
  /* nombres pseudoaleatoris fixos: el dibuix és sempre el mateix */
  const atzar = (n, llavor) => { const r = []; let a = llavor; for (let i = 0; i < n; i++) { a = (a * 9301 + 49297) % 233280; r.push(a / 233280); } return r; };
  const ocell = (id, x, y) => `<g id="${id}" transform="translate(${x} ${y})"><path d="M-12 0q2-12 14-10q8 2 8 9q-10 8-22 1z" fill="#3a322c" class="t1"/><path d="M10-3l9 2-9 3z" fill="#d97706"/><path d="M-12 0l-10-4 2 8z" fill="#3a322c"/><path d="M-2 6v7M4 6v7" stroke="${T}" stroke-width="2"/></g>`;
  const planta = (x, y, k) => `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n1(k)})"><path d="M0 0c-9-3-12-10-10-16 6 1 10 7 10 16zM0 0c9-3 12-10 10-16-6 1-10 7-10 16z" fill="#6f9c43" stroke="#3f6a22" stroke-width="1.600"/></g>`;

  /* ---------- sembrar ---------- */
  const A1 = atzar(120, 7), A2 = atzar(120, 31);
  function sembra(fileres) {
    const s = fileres ? 'f' : 'e';
    let h = `<rect x="0" y="62" width="600" height="250" class="cel"/><rect x="0" y="300" width="600" height="78" class="terra"/><path d="M0 300h600" stroke="${T}" stroke-width="2.500"/>`;
    if (!fileres) {
      // el sembrador llança grapats: les llavors queden a sobre, a mercè dels ocells
      let ll = ''; for (let i = 0; i < 34; i++) ll += `<ellipse cx="${n1(A1[i] * 600)}" cy="${n1(296 - A2[i] * 5)}" rx="4" ry="2.800" fill="#f2b632" stroke="${T}" stroke-width="1"/>`;
      h += `<g id="se-terra">${ll}<g transform="translate(600 0)">${ll}</g></g>`;
      h += persona(300, 300, 190, { color: '#8a5a44', barret: true, brac: 'M-8-68l-6 26M8-68l24-6' }) + `<path d="M278 190q22 34 44 0v40h-44z" fill="#e7dcc3" class="t2"/>`;
      for (let i = 0; i < 7; i++) h += `<ellipse id="se-v${i}" rx="4" ry="2.800" fill="#f2b632" stroke="${T}" stroke-width="1"/>`;
      h += ocell('se-o1', 120, 286) + ocell('se-o2', 500, 286) + nota(300, 96, 'les llavors cauen on volen, a la vista', T, 19);
    } else {
      // la sembradora obre un solc, hi deixa les llavors d'una en una i les tapa
      let ll = ''; for (let i = 0; i < 16; i++) ll += `<ellipse cx="${i * 40 + 12}" cy="328" rx="4" ry="2.800" fill="#f2b632" stroke="${T}" stroke-width="1"/>`;
      h += `<clipPath id="se-clip"><rect x="0" y="300" width="306" height="78"/></clipPath><g clip-path="url(#se-clip)"><g id="sf-terra">${ll}<g transform="translate(640 0)">${ll}</g></g></g><path d="M0 312H300" stroke="#6b4a2f" stroke-width="3" stroke-dasharray="1 9" stroke-linecap="round"/>`;
      h += cavall(506, 298, 1.5, { arnes: true }) + `<path d="M300 232H470" stroke="${T}" stroke-width="7" stroke-linecap="round"/><path d="M300 232H470" stroke="#c08a52" stroke-width="3.500" stroke-linecap="round"/>`;
      h += `<path d="M258 110h96l-22 78h-52z" fill="url(#g-fustac)" class="t"/><path d="M270 124h72l-8 28h-56z" fill="#f2b632" opacity=".9"/><rect x="286" y="188" width="40" height="30" rx="6" fill="url(#g-ferroc)" class="t2"/><g id="sf-dos"><circle cx="306" cy="203" r="11" fill="url(#g-llauto)" class="t2"/><path d="M306 203h10" stroke="${T}" stroke-width="3" stroke-linecap="round"/></g>`;
      h += `<path d="M300 218L308 318" stroke="${T}" stroke-width="13" stroke-linecap="round"/><path d="M300 218L308 318" stroke="#c9a56b" stroke-width="8" stroke-linecap="round"/><path d="M298 306l22 0-8 26z" fill="url(#g-ferroc)" class="t2"/>`;
      h += `<ellipse id="sf-cau" rx="4" ry="2.800" fill="#f2b632" stroke="${T}" stroke-width="1"/>`;
      h += `<rect x="212" y="226" width="150" height="12" rx="3" fill="url(#g-fustac)" class="t2"/><g id="sf-roda">${roda(250, 256, 44, { raigs: 8, color: '#b9834a', gruix: 8, raig: 4, raigColor: '#8b5a2b' })}</g>`;
      h += `<path d="M212 232L150 200" stroke="${T}" stroke-width="7" stroke-linecap="round"/><path d="M212 232L150 200" stroke="#c08a52" stroke-width="3.500" stroke-linecap="round"/>` + persona(120, 300, 176, { color: '#7a5a3a', barret: true, brac: 'M-8-68l-6 26M8-68l22 6' });
      h += nota(300, 96, 'd’una en una, colgades, a la mateixa fondària', '#3f6a22', 19);
    }
    // el mateix camp unes setmanes després, vist des de dalt
    h += `<rect x="30" y="398" width="540" height="170" rx="8" fill="#8a6a48" class="t2"/><text x="300" y="590" text-anchor="middle" font-size="16" font-weight="800" fill="${T}">el camp unes setmanes després (vist des de dalt)</text><g id="${s}-brots"></g>`;
    if (fileres) h += `<g id="sf-aixada"><path d="M0-12V180" stroke="#fffdf7" stroke-width="8" opacity=".35"/><rect x="-9" y="-16" width="18" height="12" rx="2" fill="url(#g-ferro)" class="t2"/></g>`;
    h += mesura('ml-' + s, 40, 668, 300, 'Llavor que arriba a fer planta', C);
    return h;
  }
  /* posicions de les plantes: a eixam (grumolls, clapes buides) o en cinc fileres */
  const EIXAM = (() => { const r = []; for (let i = 0; i < 46; i++) { const g = Math.floor(A1[i + 40] * 6), cx = [80, 190, 240, 380, 470, 520][g], cy = [450, 520, 430, 500, 440, 530][g]; r.push([cx + (A2[i + 40] - 0.5) * 120, clamp(cy + (A1[i + 60] - 0.5) * 90, 412, 556), A2[i + 20] > 0.42]); } return r; })();
  const FILERES = (() => { const r = []; for (let f = 0; f < 5; f++) for (let c = 0; c < 13; c++) r.push([62 + c * 40, 420 + f * 32]); return r; })();
  RI.ABANS.sembradora = {
    durada: 26, innova: [1, 2],
    pregunta: 'Què hi guanya la sembra en fileres?',
    intro: 'Les dues persones sembren <b>la mateixa quantitat de llavor</b>. A dalt veus com la deixen; a baix, què en queda al cap d’unes setmanes.',
    svg: () => svg(duo({ abans: 'sembrar a eixam', ara: 'sembradora de Tull (c. 1701)', color: C, banda: 606, a: `<g transform="translate(-50 0)">${sembra(false)}</g>`, b: `<g transform="translate(626 0)">${sembra(true)}</g>` })),
    anima: animaDuo(({ p, t, el, svg: arrel }) => {
      // a eixam: el terra corre, les llavors volen i els ocells piquen
      el('se-terra').setAttribute('transform', `translate(${n1(-((t * 46) % 600))} 0)`);
      for (let i = 0; i < 7; i++) { const u = (t * 0.9 + i / 7) % 1, a = -0.5 + i * 0.16; const n = el('se-v' + i); n.setAttribute('cx', n1(332 + u * 150 * Math.cos(a))); n.setAttribute('cy', n1(214 + u * 150 * Math.sin(a) + 190 * u * u * 0.45)); n.style.opacity = u < 0.86 ? 1 : 0; }
      ['se-o1', 'se-o2'].forEach((id, i) => el(id).setAttribute('transform', `translate(${i ? 500 : 120} 286) rotate(${n1(18 * Math.max(0, Math.sin(t * 7 + i * 2)))})`));
      // en fileres: una llavor cada pam, sota terra
      el('sf-terra').setAttribute('transform', `translate(${n1(-((t * 46) % 640))} 0)`); el('sf-roda').setAttribute('transform', `rotate(${n1((-t * 60) % 360)} 250 256)`); el('sf-dos').setAttribute('transform', `rotate(${n1((-t * 207) % 360)} 306 203)`);
      const u = ((t * 46) / 40) % 1; el('sf-cau').setAttribute('cx', n1(302 + 6 * u)); el('sf-cau').setAttribute('cy', n1(222 + 104 * u));
      // creixement
      const g = tram(p, 0.3, 0.95, 0, 1), pas = Math.round(g * 12);
      if (arrel._pas !== pas) {
        arrel._pas = pas; const k = pas / 12;
        el('e-brots').innerHTML = EIXAM.map(([x, y, viu], i) => viu ? planta(x, y, 0.25 + 0.7 * k * (0.6 + 0.4 * A1[i])) : (k > 0.25 ? '' : `<ellipse cx="${n1(x)}" cy="${n1(y)}" rx="3.500" ry="2.500" fill="#f2b632"/>`)).join('');
        el('f-brots').innerHTML = FILERES.map(([x, y]) => planta(x, y, 0.25 + 1.0 * k)).join('');
      }
      el('sf-aixada').setAttribute('transform', `translate(${n1(82 + ((t * 30) % 480))} 404)`); el('sf-aixada').style.opacity = g > 0.5 ? 1 : 0;
      posaMesura(el, 'ml-e', 0.45 * tram(p, 0.3, 0.9, 0.3, 1), 300, g > 0.6 ? 'se’n perd molta' : '…');
      posaMesura(el, 'ml-f', 0.92 * tram(p, 0.3, 0.9, 0.3, 1), 300, g > 0.6 ? 'gairebé tota' : '…');
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: llavor llançada a grapats', text: 'El pagès camina i escampa la llavor amb el braç. Queda <b>a sobre de la terra</b>, a munts o massa separada: els ocells se la mengen, el vent se l’enduu i moltes llavors no arrelen.' },
      { fins: 0.67, nom: 'Ara: una màquina que compta i colga', text: 'La roda fa girar un <b>dosador</b> que deixa caure les llavors d’una en una. Una rella obre el solc, un tub les hi porta i la terra les tapa. Totes queden a la mateixa fondària.' },
      { fins: 1, nom: 'El resultat: fileres netes', text: 'Mira el camp des de dalt: a l’esquerra, clapes buides i munts; a la dreta, <b>fileres rectes</b>. I entre fileres es pot passar l’aixada per treure les males herbes.' }
    ],
    clau: 'Amb menys llavor es cull més: sembrar en fileres és el primer pas per mecanitzar el camp.'
  };

  /* ---------- llaurar ---------- */
  function llaura(nova) {
    const s = nova ? 'n' : 'v';
    let h = `<rect x="0" y="62" width="600" height="400" class="cel"/><rect x="0" y="440" width="600" height="166" class="terra"/><rect x="${nova ? 196 : 176}" y="434" width="424" height="9" class="herba"/>`;
    // solcs ja girats darrere de l'arada
    h += `<clipPath id="ar-clip-${s}"><rect x="0" y="410" width="${nova ? 200 : 180}" height="40"/></clipPath><g clip-path="url(#ar-clip-${s})"><path id="ar-solc-${s}" d="M-80 442q20-26 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0z" fill="#6b4a2f" class="t2"/></g>`;
    if (!nova) {
      // arada pesant de fusta amb rodes: quatre animals, un bover i un llaurador
      [[420, 0], [516, 0], [404, -10], [500, -10]].forEach(([x, dy], i) => { h += `<g id="ar-a${i}">${cavall(x, 436 + dy, 1.250, { color: i > 1 ? '#8f7a5c' : '#a08a6a', crin: '#5c4a34', arnes: true })}</g>`; });
      h += persona(360, 440, 150, { color: '#3d5a80', brac: 'M-8-68l-6 26M8-68l26-14' }) + `<path d="M386 322L420 300" stroke="${T}" stroke-width="5" stroke-linecap="round"/>`;
      h += `<path d="M150 372L352 392" stroke="${T}" stroke-width="20" stroke-linecap="round"/><path d="M150 372L352 392" stroke="#a8733f" stroke-width="14" stroke-linecap="round"/><path d="M352 392L404 398" stroke="${T}" stroke-width="5"/>`;
      h += `<path d="M176 380L154 300M196 384L176 296" stroke="${T}" stroke-width="12" stroke-linecap="round"/><path d="M176 380L154 300M196 384L176 296" stroke="#c08a52" stroke-width="7" stroke-linecap="round"/>`;
      h += `<path d="M196 384L238 452L160 452L172 396Z" fill="#a8733f" class="t"/><path d="M250 386L246 448" stroke="${T}" stroke-width="10" stroke-linecap="round"/><path d="M250 386L246 448" stroke="#8a969e" stroke-width="5" stroke-linecap="round"/>`;
      h += `<g id="ar-r-v">${roda(318, 412, 30, { raigs: 6, color: '#b9834a', gruix: 7, raig: 3.500, raigColor: '#8b5a2b' })}</g>`;
      h += persona(120, 440, 156, { color: '#8a5a44', barret: true, brac: 'M-8-68l-6 26M8-68l24 2' });
      h += nota(300, 96, 'fusta gruixuda i molt de fregament', T, 19);
    } else {
      // Rotherham: bastidor triangular lleuger i orelló corbat folrat de ferro
      [[450, 0], [432, -10]].forEach(([x, dy], i) => { h += `<g id="ar-a${i + 4}">${cavall(x, 436 + dy, 1.450, { color: i ? '#6b4a34' : '#8d5b34', arnes: true })}</g>`; });
      h += `<path d="M168 366L360 384" stroke="${T}" stroke-width="13" stroke-linecap="round"/><path d="M168 366L360 384" stroke="#c08a52" stroke-width="8" stroke-linecap="round"/><path d="M360 384L404 390" stroke="${T}" stroke-width="4"/>`;
      h += `<path d="M186 372L156 296M214 374L188 298" stroke="${T}" stroke-width="10" stroke-linecap="round"/><path d="M186 372L156 296M214 374L188 298" stroke="#c08a52" stroke-width="5.500" stroke-linecap="round"/>`;
      h += `<ellipse class="innova-halo innova-pols" cx="226" cy="416" rx="64" ry="48" fill="rgba(251,191,36,.2)" stroke="#d97706" stroke-width="3" stroke-dasharray="7 5"/>`;
      h += `<path d="M214 374Q262 392 262 452L184 452Q170 420 196 384Z" fill="url(#g-acer)" class="t"/><path d="M206 392q30 12 38 52" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/><path d="M262 452l34 0-34-16z" fill="url(#g-ferroc)" class="t2"/>`;
      h += `<path d="M288 380L282 448" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path d="M288 380L282 448" stroke="#8a969e" stroke-width="4.500" stroke-linecap="round"/>`;
      h += persona(126, 440, 156, { color: '#3d5a80', barret: true, brac: 'M-8-68l-6 26M8-68l24 2' });
      h += nota(300, 96, 'lleugera, i el ferro llisca dins la terra', '#3f6a22', 19);
    }
    h += `<text x="40" y="640" font-size="18" font-weight="800" fill="${T}">${nova ? '2 cavalls · 1 persona' : '4 animals o més · 2 persones'}</text>` + mesura('mr-' + s, 40, 686, 300, 'Terra llaurada', '#6b4a2f');
    return h;
  }
  RI.ABANS.arada = {
    durada: 24, innova: [1, 2],
    pregunta: 'Què hi guanya l’arada de Rotherham?',
    intro: 'Les dues arades obren el mateix solc. Compta els <b>animals i les persones</b> que necessita cadascuna i mira quina avança més.',
    svg: () => svg(duo({ abans: 'arada pesant de fusta', ara: 'arada de Rotherham (1730)', color: C, banda: 606, a: `<g transform="translate(-50 0)">${llaura(false)}</g>`, b: `<g transform="translate(626 0)">${llaura(true)}</g>` })),
    anima: animaDuo(({ p, t, el }) => {
      [['v', 0.62, 22], ['n', 1, 36]].forEach(([s, k, v]) => {
        el('ar-solc-' + s).setAttribute('transform', `translate(${n1(-((t * v) % 40))} 0)`);
        posaMesura(el, 'mr-' + s, p * k, 300, s === 'v' ? 'a poc a poc' : 'més de pressa');
      });
      el('ar-r-v').setAttribute('transform', `rotate(${n1((-t * 44) % 360)} 318 412)`);
      for (let i = 0; i < 6; i++) el('ar-a' + i).setAttribute('transform', `translate(0 ${n1(2.200 * Math.sin(t * (i < 4 ? 5 : 8) + i))})`);
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: una arada que pesa', text: 'L’arada antiga és un bastidor gruixut de fusta, sovint amb rodes. Arrossegar-la demana <b>quatre animals o més</b>, una persona per guiar-los i una altra per portar l’arada.' },
      { fins: 0.67, nom: 'Ara: lleugera i folrada de ferro', text: 'L’arada de Rotherham té un bastidor triangular lleuger i un <b>orelló corbat de ferro</b>: la terra hi llisca i es gira sola, amb molt menys fregament.' },
      { fins: 1, nom: 'El resultat: menys braços i animals', text: 'Amb <b>dos cavalls i una persona</b> es fa la mateixa feina, i més de pressa. Els animals i els jornals que s’estalvien queden lliures per a altres feines.' }
    ],
    clau: 'Llaurar amb la meitat d’animals i de gent: la mateixa terra es treballa amb menys mans.'
  };
})();
