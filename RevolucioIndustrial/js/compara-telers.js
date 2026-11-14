// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 3 · «Abans i ara» dels telers: la llançadora volant (vista des de dalt)
   i el teler mecànic (vista de perfil). */
(function () {
  'use strict';
  const { duo, mesura, posaMesura, animaDuo, tram, color, clamp, svg, roda, lerp, persona, engranatge } = RI;
  const { tang, nota, n1 } = RI.CMP_TEXTIL;
  const T = '#2a2420', TRAMA = '#c8553a';
  const bump = (u, a, b) => { const k = clamp((u - a) / (b - a), 0, 1); return Math.sin(k * Math.PI); };
  const pill = (id, x, y, w, s) => `<g id="${id}"><rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="#fffdf7" stroke="${T}" stroke-width="2"/><text x="${x + w / 2}" y="${y + 20.500}" text-anchor="middle" font-size="15.500" font-weight="800" fill="${T}">${s}</text></g>`;
  const encen = (el, id, on, c) => { const r = el(id).firstChild; r.setAttribute('fill', on ? (c || '#f2b632') : '#fffdf7'); };

  /* ---------- teler vist des de dalt ---------- */
  const NF = 28, FX = (i) => 137 + i * 12.07;
  function telerPlanta(s, volant) {
    let h = `<rect x="96" y="104" width="408" height="412" rx="6" fill="#f3ead6" stroke="none"/>`;
    h += `<rect x="100" y="104" width="14" height="412" fill="#c08a52" class="t2"/><rect x="486" y="104" width="14" height="412" fill="#c08a52" class="t2"/>`;
    // plegador i fils de l'ordit (dos grups que els lliços alternen)
    h += `<rect x="118" y="112" width="364" height="26" rx="12" fill="#efe6cf" class="t2"/>`;
    ['a', 'b'].forEach((g, k) => { let d = ''; for (let i = k; i < NF; i += 2) d += `M${n1(FX(i))} 136V392`; h += `<path id="tp-o${g}-${s}" d="${d}" stroke="${k ? '#8fa6ab' : '#56747c'}" stroke-width="2.200" fill="none"/>`; });
    h += `<rect id="tp-l1-${s}" x="120" y="196" width="360" height="11" rx="3" fill="#a8733f" class="t2"/><rect id="tp-l2-${s}" x="120" y="220" width="360" height="11" rx="3" fill="#dcb07a" class="t2"/>`;
    h += `<text id="tp-f1-${s}" x="84" y="208" text-anchor="middle" font-size="16" font-weight="900" fill="#8c4a14">▲</text><text id="tp-f2-${s}" x="84" y="232" text-anchor="middle" font-size="16" font-weight="900" fill="#8c4a14">▼</text>`;
    // tela teixida i plegador de davant
    h += `<rect x="134" y="392" width="332" height="112" fill="#efe6cf" stroke="${T}" stroke-width="2.200"/><path d="M134 400h332M134 408h332M134 416h332M134 424h332M134 432h332M134 440h332M134 448h332M134 456h332M134 464h332M134 472h332M134 480h332M134 488h332M134 496h332" stroke="#cdbf9e" stroke-width="1.300"/>`;
    h += `<path id="tp-t0-${s}" d="M134 395H466" stroke="${TRAMA}" stroke-width="3.400" stroke-linecap="round" opacity="0"/><path id="tp-t1-${s}" d="" stroke="${TRAMA}" stroke-width="3.400" stroke-linecap="round" fill="none"/>`;
    h += `<rect x="96" y="500" width="408" height="16" rx="3" fill="#a8733f" class="t2"/>`;
    // batà amb la pinta (i, amb l'invent, caixes i tacos)
    h += `<g id="tp-b-${s}">${volant ? `<rect x="50" y="-4" width="500" height="34" rx="4" fill="#c08a52" class="t2"/><rect x="50" y="-4" width="64" height="34" rx="4" fill="#dcb07a" class="t2"/><rect x="486" y="-4" width="64" height="34" rx="4" fill="#dcb07a" class="t2"/>` : `<rect x="106" y="0" width="388" height="16" rx="4" fill="#c08a52" class="t2"/>`}`;
    let dents = ''; for (let i = 0; i <= NF; i++) dents += `M${n1(131 + i * 12.07)} 1v13`;
    h += `<rect x="126" y="0" width="348" height="15" fill="#e7e2d2" stroke="${T}" stroke-width="1.600"/><path d="${dents}" stroke="#7d8a92" stroke-width="1.400"/>`;
    if (volant) h += `<rect id="tp-tl-${s}" x="56" y="6" width="16" height="22" rx="3" fill="url(#g-llauto)" class="t2"/><rect id="tp-tr-${s}" x="528" y="6" width="16" height="22" rx="3" fill="url(#g-llauto)" class="t2"/>`;
    h += `</g>`;
    if (volant) h += `<path id="tp-c-${s}" fill="none" stroke="#7a4e26" stroke-width="2.800" stroke-linejoin="round"/>`;
    h += nota(300, 172, 'ordit', '#3f5a62', 16) + nota(300, 462, 'tela', '#7a6a48', 16) + `<text x="84" y="186" text-anchor="middle" font-size="13" font-weight="800" fill="#8c4a14">lliços</text>` + (volant ? nota(84, 290, 'caixa i taco', '#8c4a14', 15) : '');
    h += `<g id="tp-ll-${s}"><path d="M-26 0Q0-13 26 0Q0 13-26 0Z" fill="#b9834a" class="t2"/><rect x="-11" y="-3.500" width="22" height="7" rx="3" fill="${TRAMA}"/></g>`;
    return h;
  }
  const cap = (x, y, c) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="17" fill="${c}" class="t2"/><circle cx="${x}" cy="${y - 3}" r="15" fill="#6b4a2f" class="t2"/>`;
  const brac = (id) => `<path id="${id}a" fill="none" stroke="${T}" stroke-width="15" stroke-linecap="round"/><path id="${id}" fill="none" stroke="#e9b98f" stroke-width="10" stroke-linecap="round"/>`;
  const posaBrac = (el, id, a, b) => { const d = `M${n1(a[0])} ${n1(a[1])}L${n1(b[0])} ${n1(b[1])}`; el(id).setAttribute('d', d); el(id + 'a').setAttribute('d', d); };
  /* u: moment d'una passada; n: nombre de passades fetes; torna la posició del batà i la llançadora */
  function animaPlanta(el, s, u, n, volant) {
    const dir = n % 2 ? -1 : 1, f0 = volant ? 0.12 : 0.1, f1 = volant ? 0.3 : 0.44, f = tram(u, f0, f1, 0, 1, volant);
    const by = 318 + 58 * (tram(u, 0.52, 0.64, 0, 1) - tram(u, 0.66, 0.8, 0, 1)), ys = by + (volant ? 17 : 30);
    const xa = volant ? 88 : 122, xb = volant ? 512 : 478, x = dir > 0 ? lerp(xa, xb, f) : lerp(xb, xa, f);
    el('tp-b-' + s).setAttribute('transform', `translate(0 ${n1(by)})`);
    el('tp-ll-' + s).setAttribute('transform', `translate(${n1(x)} ${n1(ys)})`);
    // la trama surt de la vora, segueix la llançadora i el batà l'atapeeix contra la tela
    const xi = dir > 0 ? 134 : 466, xf = clamp(x, 134, 466), yt = Math.min(393, Math.max(ys, by + 22));
    el('tp-t1-' + s).setAttribute('d', u < f0 ? '' : `M${xi} ${n1(yt)}L${n1(xf)} ${n1(u < 0.52 ? ys : yt)}`);
    el('tp-t0-' + s).setAttribute('opacity', n > 0 ? 1 : 0);
    const canvi = u > 0.86, amunt = (n + (canvi ? 1 : 0)) % 2 === 0;
    el('tp-oa-' + s).setAttribute('stroke-width', amunt ? 3 : 1.7); el('tp-ob-' + s).setAttribute('stroke-width', amunt ? 1.7 : 3);
    el('tp-f1-' + s).textContent = amunt ? '▲' : '▼'; el('tp-f2-' + s).textContent = amunt ? '▼' : '▲';
    return { by, ys, x, dir, f0, f1 };
  }

  const NP = 4; // passades de l'«abans» per cicle complet; amb la llançadora volant, el doble
  RI.ABANS.llancadora = {
    durada: 28, innova: [1, 2],
    pregunta: 'Què hi guanya la llançadora volant?',
    intro: 'Els dos telers teixeixen <b>la mateixa tela ampla</b>, vistos des de dalt. Compta les persones i les passades de trama (el fil vermell).',
    svg: () => {
      const gent = (x, n) => { let s = ''; for (let i = 0; i < n; i++) s += persona(x + i * 32, 726, 50, { color: i ? '#3d5a80' : '#8a5a44' }); return s + `<text x="${x + n * 32 + 2}" y="712" font-size="18" font-weight="800" fill="${T}">${n === 1 ? '1 persona' : n + ' persones'}</text>`; };
      const a = `<g transform="translate(-50 0)">${telerPlanta('a', false)}${brac('ta-b1')}${brac('ta-b2')}${brac('ta-b3')}${brac('ta-b4')}${cap(214, 560, '#8a5a44')}${cap(386, 560, '#3d5a80')}${nota(300, 86, 'la llançadora passa de mà en mà', '#4b433b', 19)}${mesura('ml-a', 40, 638, 230, 'Passades de trama', TRAMA)}${gent(60, 2)}</g>`;
      const b = `<g transform="translate(626 0)"><ellipse class="innova-halo innova-pols" cx="82" cy="340" rx="52" ry="44" fill="rgba(251,191,36,.18)" stroke="#d97706" stroke-width="3" stroke-dasharray="7 5"/>${telerPlanta('b', true)}${brac('tb-b1')}${brac('tb-b2')}<g id="tb-manec"><rect x="-7" y="-20" width="14" height="40" rx="6" fill="#a8733f" class="t2"/></g>${cap(300, 562, '#8a5a44')}${nota(300, 86, 'una estirada de cordill la fa volar', '#8c4a14', 19)}${mesura('ml-b', 40, 638, 230, 'Passades de trama', TRAMA)}${gent(60, 1)}</g>`;
      return svg(duo({ abans: 'teler ample de dues persones', ara: 'llançadora volant (1733)', color: '#b9722a', banda: 606, a, b }));
    },
    anima: animaDuo(({ p, el }) => {
      // abans: dos teixidors, un a cada vora
      let v = p * NP, n = Math.floor(v + 1e-6), u = v - n, e = animaPlanta(el, 'a', u, n, false);
      const agafa = (costat) => { const meva = (e.dir > 0) === (costat < 0) ? u < e.f0 + 0.04 : u > e.f1 - 0.04; return meva ? [e.x - costat * 4, e.ys + 4] : [costat < 0 ? 112 : 488, e.ys + 10]; };
      posaBrac(el, 'ta-b1', [186, 556], agafa(-1)); posaBrac(el, 'ta-b4', [414, 556], agafa(1));
      posaBrac(el, 'ta-b2', [240, 556], [262, e.by + 12]); posaBrac(el, 'ta-b3', [360, 556], [338, e.by + 12]);
      posaMesura(el, 'ml-a', (n + (u > 0.64 ? 1 : 0)) / (NP * 2), 230, `${n + (u > 0.64 ? 1 : 0)}`);
      // ara: un sol teixidor amb el mànec i els cordills
      v = p * NP * 2; n = Math.floor(v + 1e-6); u = v - n; e = animaPlanta(el, 'b', u, n, true);
      const cop = bump(u, 0.06, 0.2), hx = 322 + e.dir * 30 * cop, hy = 470 - 6 * cop;
      const tl = 56 + (e.dir > 0 ? 34 * cop : 0), tr = 528 - (e.dir < 0 ? 34 * cop : 0);
      el('tp-tl-b').setAttribute('x', n1(tl)); el('tp-tr-b').setAttribute('x', n1(tr));
      el('tp-c-b').setAttribute('d', `M${n1(tl + 8)} ${n1(e.by + 17)}L${n1(hx)} ${n1(hy)}L${n1(tr + 8)} ${n1(e.by + 17)}`);
      el('tb-manec').setAttribute('transform', `translate(${n1(hx)} ${n1(hy)})`);
      posaBrac(el, 'tb-b1', [330, 558], [hx + 4, hy + 8]); posaBrac(el, 'tb-b2', [270, 558], [268, e.by + 26]);
      posaMesura(el, 'ml-b', (n + (u > 0.64 ? 1 : 0)) / (NP * 2), 230, `${n + (u > 0.64 ? 1 : 0)}`);
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: la llançadora de mà en mà', text: 'Un braç no arriba d’una vora a l’altra d’una tela ampla. Calen <b>dues persones</b>: una llança la llançadora i l’altra l’agafa. Després atapeeixen la trama amb el batà.' },
      { fins: 0.67, nom: 'Ara: dos tacos i un cordill', text: 'Kay posa una <b>caixa amb un taco</b> a cada extrem del batà, units per un cordill. Una estirada seca del mànec i el taco dispara la llançadora, que corre sobre rodetes fins a l’altra caixa.' },
      { fins: 1, nom: 'El resultat: una persona i més passades', text: 'Un sol teixidor fa la tela ampla i, a més, teixeix <b>molt més de pressa</b>. Ara el problema és un altre: falta fil per alimentar els telers.' }
    ],
    clau: 'La llançadora volant accelera el teixit i crea el primer coll d’ampolla: cal filar més de pressa.'
  };

  /* ---------- teler de perfil: manual (peus i mans) o mecànic (un eix) ---------- */
  function telerPerfil(s, mec) {
    let h = `<rect x="0" y="548" width="600" height="58" fill="#e3d6bd"/><path d="M0 548h600" stroke="${T}" stroke-width="2.500"/>`;
    // bastidor
    h += `<rect x="92" y="296" width="16" height="252" fill="#a8733f" class="t2"/><rect x="456" y="300" width="16" height="248" fill="#a8733f" class="t2"/><rect x="92" y="430" width="380" height="14" fill="#c08a52" class="t2"/>`;
    h += `<rect x="252" y="128" width="14" height="316" fill="#c08a52" class="t2"/><rect x="330" y="128" width="14" height="316" fill="#c08a52" class="t2"/><rect x="240" y="116" width="176" height="14" fill="#dcb07a" class="t2"/>`;
    // plegador d'ordit, ordit en dues capes, tela i plegador de tela
    h += `<circle cx="118" cy="330" r="36" fill="#efe6cf" class="t2"/><circle cx="118" cy="330" r="22" fill="none" stroke="#cdbf9e" stroke-width="2"/><circle cx="118" cy="330" r="7" fill="url(#g-ferro)" class="t2"/>`;
    h += `<path d="M118 294L172 300" stroke="#56747c" stroke-width="3"/><circle cx="172" cy="306" r="7" fill="#a8733f" class="t2"/>`;
    h += `<path id="pf-oa-${s}" fill="none" stroke="#56747c" stroke-width="3" stroke-linejoin="round"/><path id="pf-ob-${s}" fill="none" stroke="#8fa6ab" stroke-width="3" stroke-linejoin="round"/>`;
    h += `<path d="M400 300H462Q474 300 470 314L448 384" fill="none" stroke="${T}" stroke-width="8" stroke-linejoin="round"/><path d="M400 300H462Q474 300 470 314L448 384" fill="none" stroke="#efe6cf" stroke-width="5" stroke-linejoin="round"/><circle cx="462" cy="306" r="7" fill="#a8733f" class="t2"/>`;
    h += `<circle cx="440" cy="398" r="20" fill="#efe6cf" class="t2"/><circle id="pf-tela-${s}" cx="440" cy="398" r="9" fill="none" stroke="${TRAMA}" stroke-width="3"/>`;
    // lliços penjats d'un corró: quan l'un puja, l'altre baixa
    h += `<circle cx="298" cy="140" r="11" fill="url(#g-fustac)" class="t2"/>`;
    ['1', '2'].forEach((k, i) => { const x = i ? 311 : 285; h += `<g id="pf-l${k}-${s}"><path d="M${x} 150V236M${x} 364V${mec ? 452 : 500}" stroke="#7a4e26" stroke-width="2.200"/><rect x="${x - 4}" y="236" width="8" height="128" rx="2" fill="${i ? '#dcb07a' : '#a8733f'}" class="t2"/><circle cx="${x}" cy="300" r="4.500" fill="#fffdf7" stroke="${T}" stroke-width="1.800"/></g>`; });
    // llançadora: es veu de cap quan travessa la calada
    h += `<g id="pf-ll-${s}"><ellipse cx="0" cy="0" rx="13" ry="8" fill="#b9834a" class="t2"/><circle cx="0" cy="0" r="3.500" fill="${TRAMA}"/></g>`;
    if (!mec) {
      // pedals, batà penjat i teixidor assegut
      h += `<path id="pf-p1-${s}" stroke="${T}" stroke-width="11" stroke-linecap="round"/><path id="pf-p1c-${s}" stroke="#c08a52" stroke-width="7" stroke-linecap="round"/><path id="pf-p2-${s}" stroke="${T}" stroke-width="11" stroke-linecap="round"/><path id="pf-p2c-${s}" stroke="#dcb07a" stroke-width="7" stroke-linecap="round"/>`;
      h += `<circle cx="398" cy="128" r="7" fill="url(#g-ferro)" class="t2"/><g id="pf-bata-${s}"><path d="M398 128L398 336" stroke="${T}" stroke-width="10" stroke-linecap="round"/><path d="M398 128L398 336" stroke="#c08a52" stroke-width="6" stroke-linecap="round"/><rect x="391" y="262" width="14" height="60" fill="#e7e2d2" stroke="${T}" stroke-width="2"/><rect x="384" y="320" width="40" height="14" rx="3" fill="#a8733f" class="t2"/></g>`;
      h += `<rect x="520" y="404" width="76" height="12" rx="3" fill="#a8733f" class="t2"/><path d="M530 416v132M586 416v132" stroke="${T}" stroke-width="9"/><path d="M530 416v132M586 416v132" stroke="#a8733f" stroke-width="5"/>`;
      h += `<path id="pf-cama-${s}" fill="none" stroke="${T}" stroke-width="21" stroke-linecap="round" stroke-linejoin="round"/><path id="pf-cama2-${s}" fill="none" stroke="#4b433b" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>`;
      h += `<path d="M560 400L548 268" stroke="${T}" stroke-width="40" stroke-linecap="round"/><path d="M560 400L548 268" stroke="#8a5a44" stroke-width="34" stroke-linecap="round"/><circle cx="540" cy="224" r="23" fill="#e9b98f" class="t"/>`;
      h += `<path id="pf-bra1-${s}a" fill="none" stroke="${T}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path id="pf-bra1-${s}" fill="none" stroke="#8a5a44" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
      h += `<path id="pf-cord-${s}" fill="none" stroke="#7a4e26" stroke-width="2.600"/><path id="pf-bra2-${s}a" fill="none" stroke="${T}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path id="pf-bra2-${s}" fill="none" stroke="#8a5a44" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      // eix de transmissió del sostre, corretja, eix principal amb cigonyal i eix de lleves
      h += `<rect x="150" y="72" width="330" height="10" rx="5" fill="url(#g-ferroh)" class="t2"/><path d="${tang([206, 77], 24, [206, 478], 34)}" stroke="#7a4e26" stroke-width="5" fill="none"/><path d="M210 110V440" class="flux2 s-groc" data-flux="2.500" stroke-width="3"/>`;
      h += `<g id="pf-pt-${s}">${roda(206, 77, 26, { raigs: 4, gruix: 8, raig: 4 })}</g>`;
      h += `<ellipse class="innova-halo innova-pols" cx="262" cy="490" rx="118" ry="62" fill="rgba(251,191,36,.18)" stroke="#d97706" stroke-width="3" stroke-dasharray="7 5"/>`;
      h += `<path id="pf-t1-${s}" stroke="${T}" stroke-width="10" stroke-linecap="round"/><path id="pf-t1c-${s}" stroke="#c08a52" stroke-width="6" stroke-linecap="round"/><path id="pf-t2-${s}" stroke="${T}" stroke-width="10" stroke-linecap="round"/><path id="pf-t2c-${s}" stroke="#dcb07a" stroke-width="6" stroke-linecap="round"/>`;
      h += `<g id="pf-lleva-${s}"><path d="M298 500m-14 0a14 14 0 1 0 28 0q0-10-14-34q-14 24-14 34z" fill="#d9482b" class="t2"/><path d="M298 500m-14 0a14 14 0 1 0 28 0q0-10-14-34q-14 24-14 34z" fill="#f08a4b" class="t2" transform="rotate(180 298 500)"/><circle cx="298" cy="500" r="6" fill="url(#g-llauto)" class="t2"/></g>`;
      h += `<g id="pf-e2-${s}">${engranatge(256, 500, 28, 20, { color: '#c79a2c' })}</g><g id="pf-pp-${s}">${roda(206, 478, 36, { raigs: 6, gruix: 9, raig: 4.500 })}</g><g id="pf-e1-${s}">${engranatge(222, 482, 14, 10, { color: '#8a969e' })}</g>`;
      h += `<circle cx="386" cy="530" r="8" fill="url(#g-ferro)" class="t2"/><g id="pf-bata-${s}"><path d="M386 530L386 268" stroke="${T}" stroke-width="11" stroke-linecap="round"/><path d="M386 530L386 268" stroke="#8a969e" stroke-width="6.500" stroke-linecap="round"/><rect x="379" y="262" width="14" height="60" fill="#e7e2d2" stroke="${T}" stroke-width="2"/><rect x="372" y="320" width="40" height="14" rx="3" fill="#a8733f" class="t2"/></g>`;
      h += `<path id="pf-biela-${s}a" stroke="${T}" stroke-width="10" stroke-linecap="round"/><path id="pf-biela-${s}" stroke="#b9c3c9" stroke-width="5.500" stroke-linecap="round"/><circle id="pf-mun-${s}" r="6" fill="url(#g-llauto)" class="t2"/>`;
      h += persona(548, 548, 250, { color: '#3d5a80', barret: true }) + nota(548, 286, 'només vigila', '#3d5a80', 17);
    }
    return h;
  }
  /* u: moment d'una passada; n: passades fetes */
  function animaPerfil(el, s, u, n, mec) {
    // calada: els dos lliços intercanvien la posició al final de cada passada
    const sg = n % 2 ? -1 : 1, obert = (u < 0.12 ? tram(u, 0, 0.12, 0, 1) : 1) - tram(u, 0.82, 1, 0, 1), d = 34 * obert * sg;
    el('pf-l1-' + s).setAttribute('transform', `translate(0 ${n1(-d)})`); el('pf-l2-' + s).setAttribute('transform', `translate(0 ${n1(d)})`);
    el('pf-oa-' + s).setAttribute('d', `M172 300L285 ${n1(300 - d)}L400 300`); el('pf-ob-' + s).setAttribute('d', `M172 300L311 ${n1(300 + d)}L400 300`);
    // batà: enrere mentre passa la llançadora, endavant per atapeir
    let rx, passa = bump(u, 0.24, 0.46);
    if (mec) {
      const a = 2 * Math.PI * (u - 0.66), cx = 206 + 20 * Math.cos(a), cy = 478 + 20 * Math.sin(a);
      // biela de longitud constant entre el colze del cigonyal i el batà
      const Lb = 172, R = 136, px = 386, py = 530; let th = -0.05;
      for (let i = 0; i < 24; i++) { const bx = px + R * Math.sin(th), byy = py - R * Math.cos(th), e0 = Math.hypot(bx - cx, byy - cy) - Lb, th2 = th + 0.001, e1 = Math.hypot(px + R * Math.sin(th2) - cx, py - R * Math.cos(th2) - cy) - Lb; th -= e0 / ((e1 - e0) / 0.001 || 1e-6); }
      const bx = px + R * Math.sin(th), byy = py - R * Math.cos(th);
      el('pf-bata-' + s).setAttribute('transform', `rotate(${n1((th * 180) / Math.PI)} 386 530)`);
      ['pf-biela-' + s, 'pf-biela-' + s + 'a'].forEach((id) => el(id).setAttribute('d', `M${n1(cx)} ${n1(cy)}L${n1(bx)} ${n1(byy)}`));
      el('pf-mun-' + s).setAttribute('cx', n1(cx)); el('pf-mun-' + s).setAttribute('cy', n1(cy));
      rx = 386 + 232 * Math.sin(th);
      const g = 360 * (n + u);
      el('pf-pp-' + s).setAttribute('transform', `rotate(${n1(g % 360)} 206 478)`); el('pf-e1-' + s).setAttribute('transform', `rotate(${n1(g % 360)} 222 482)`); el('pf-pt-' + s).setAttribute('transform', `rotate(${n1((g * 1.4) % 360)} 206 77)`);
      el('pf-e2-' + s).setAttribute('transform', `rotate(${n1((-g / 2) % 360)} 256 500)`); el('pf-lleva-' + s).setAttribute('transform', `rotate(${n1((g / 2 + 90) % 360)} 298 500)`);
      // les lleves empenyen les palanques, i les palanques estiren els lliços
      [['1', -d, 285], ['2', d, 311]].forEach(([k, dy, x]) => { const y = 452 + dy, dd = `M176 ${n1(476 + dy * 0.2)}L${x} ${n1(y)}L346 ${n1(458 + dy * 1.25)}`; el('pf-t' + k + '-' + s).setAttribute('d', dd); el('pf-t' + k + 'c-' + s).setAttribute('d', dd); });
    } else {
      const k = tram(u, 0.54, 0.66, 0, 1) - tram(u, 0.68, 0.82, 0, 1), ang = -9 + 9.5 * k;
      el('pf-bata-' + s).setAttribute('transform', `rotate(${n1(-ang)} 398 128)`);
      rx = 398 + 172 * Math.sin((ang * Math.PI) / 180);
      [['1', -d, 285, 'pf-p1'], ['2', d, 311, 'pf-p2']].forEach(([kk, dy, x, id]) => { const dd = `M190 ${n1(520 + dy * 0.2)}L${x} ${n1(500 + dy)}L470 ${n1(486 + dy * 1.7)}`; el(id + '-' + s).setAttribute('d', dd); el(id + 'c-' + s).setAttribute('d', dd); });
      // el peu prem el pedal que baixa; una mà porta el batà i l'altra estira el cordill
      const peu = [466, 480 + Math.abs(d) * 1.7], dc = `M556 398L500 404L${peu[0]} ${n1(peu[1])}`; el('pf-cama-' + s).setAttribute('d', dc); el('pf-cama2-' + s).setAttribute('d', dc);
      const b1 = `M552 280L486 300L${n1(rx + 22)} 300`; el('pf-bra1-' + s).setAttribute('d', b1); el('pf-bra1-' + s + 'a').setAttribute('d', b1);
      const hx = 470 + 26 * bump(u, 0.2, 0.36), hy = 206 + 22 * bump(u, 0.2, 0.36), b2 = `M548 274L508 232L${n1(hx)} ${n1(hy)}`; el('pf-bra2-' + s).setAttribute('d', b2); el('pf-bra2-' + s + 'a').setAttribute('d', b2);
      el('pf-cord-' + s).setAttribute('d', `M${n1(hx)} ${n1(hy)}L${n1(rx + 6)} 270`);
    }
    const ll = el('pf-ll-' + s); ll.setAttribute('transform', `translate(${n1(rx + 24)} 302) scale(${n1(0.4 + 0.9 * passa)})`); ll.style.opacity = passa > 0.03 ? 1 : 0;
    return { calada: u < 0.2 || u > 0.82, passa: u >= 0.24 && u < 0.46, bat: u >= 0.5 && u < 0.8 };
  }
  RI.ABANS.cartwright = {
    durada: 30, innova: [1, 2],
    pregunta: 'Què hi guanya el teler mecànic?',
    intro: 'Els dos telers fan <b>els mateixos tres moviments</b>: obrir la calada, passar la llançadora i atapeir. Mira qui els fa a cada costat.',
    svg: () => {
      const tres = (s, mots, x) => mots.map((m, i) => pill(`pc-${s}${i}`, x, 618 + i * 35, 320, m)).join('');
      const a = `<g transform="translate(-50 0)">${telerPerfil('a', false)}${nota(280, 590, 'mans i peus coordinats pel teixidor', '#4b433b', 19)}${tres('a', ['els peus obren la calada', 'una mà llança la llançadora', 'l’altra mà atapeeix amb el batà'], 40)}</g>`;
      const b = `<g transform="translate(626 0)">${telerPerfil('b', true)}${nota(270, 590, 'un sol eix ho coordina tot', '#8c4a14', 19)}${tres('b', ['les lleves obren la calada', 'un impulsor llança la llançadora', 'la biela atapeeix amb el batà'], 40)}</g>`;
      return svg(duo({ abans: 'teler manual amb llançadora volant', ara: 'teler mecànic (patent de 1785)', color: '#b9722a', banda: 606, a, b }));
    },
    anima: animaDuo(({ p, el }) => {
      const v = p * 6, n = Math.floor(v + 1e-6), u = v - n;
      [['a', false], ['b', true]].forEach(([s, mec]) => { const e = animaPerfil(el, s, u, n, mec); encen(el, `pc-${s}0`, e.calada, mec ? '#f08a4b' : '#f2b632'); encen(el, `pc-${s}1`, e.passa, mec ? '#f08a4b' : '#f2b632'); encen(el, `pc-${s}2`, e.bat, mec ? '#f08a4b' : '#f2b632'); });
      el('pf-tela-a').setAttribute('r', n1(9 + n * 0.9)); el('pf-tela-b').setAttribute('r', n1(9 + n * 0.9));
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: el teixidor ho fa tot', text: 'Amb els <b>peus</b> prem els pedals que obren la calada; amb una <b>mà</b> estira el cordill de la llançadora i amb l’altra porta el batà. El ritme el marca el seu cos.' },
      { fins: 0.67, nom: 'Ara: un eix mou les tres accions', text: 'Una corretja fa girar l’eix del teler. Les <b>lleves</b> mouen els lliços, un <b>impulsor</b> dispara la llançadora i una <b>biela</b> empeny el batà. Tot va encadenat, sempre en el mateix ordre.' },
      { fins: 1, nom: 'El resultat: la persona vigila', text: 'El treballador ja no fa la força ni marca el ritme: nua fils trencats i canvia llançadores. Amb les millores posteriors, <b>una sola persona podrà atendre diversos telers</b>.' }
    ],
    clau: 'El teler mecànic no inventa moviments nous: lliga els tres de sempre a un eix que mou una màquina.'
  };
})();
