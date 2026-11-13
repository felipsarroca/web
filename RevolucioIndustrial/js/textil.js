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
    s += `<text x="300" y="70" class="tx-g mig">Fil que es fabrica</text><text x="300" y="96" class="tx-p mig">filar</text><text x="900" y="70" class="tx-g mig">Fil que demanen els telers</text><text x="900" y="96" class="tx-p mig">teixir</text>`;
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

  /* ---------- 2 · teler i llançadora volant (vista des de dalt) ---------- */
  function teler() {
    let s = fons(), parells = '', senars = '';
    for (let i = 0; i < 35; i++) { const x = 260 + i * 20, l = `<path d="M${x} 134V470"/>`; if (i % 2) senars += l; else parells += l; }
    s += `<rect class="t fusta" x="150" y="84" width="900" height="590" rx="10"/><rect class="crema" x="178" y="112" width="844" height="534"/>`;
    s += `<g data-part="ordit"><rect class="t fusta3" x="230" y="100" width="740" height="34" rx="14"/><g id="fils-a" stroke="#2a2420" stroke-width="3">${parells}</g><g id="fils-b" stroke="#b39f7a" stroke-width="2">${senars}</g></g>`;
    let tr = ''; for (let y = 478; y < 620; y += 9) tr += `M252 ${y}H948`;
    s += `<g data-part="tela"><rect class="t" x="250" y="470" width="700" height="150" fill="#ecdcae"/><path d="${tr}" stroke="#c7a548" stroke-width="2.5"/><path d="${Array.from({ length: 35 }, (_, i) => `M${260 + i * 20} 470V620`).join('')}" stroke="#2a2420" stroke-width="1" opacity=".45"/><rect class="t fusta3" x="230" y="620" width="740" height="30" rx="13"/></g>`;
    s += `<g id="bata"><g data-part="pinta"><rect class="t fusta2" x="170" y="-13" width="860" height="26" rx="5"/><path d="${Array.from({ length: 36 }, (_, i) => `M${250 + i * 20} -13v26`).join('')}" class="t1" opacity=".6"/></g>
      <g data-part="caixes"><rect class="t fusta" x="164" y="-24" width="84" height="48" rx="6"/><rect class="t fusta" x="952" y="-24" width="84" height="48" rx="6"/></g>
      <path id="trama" d="M210 0H210" class="nf" stroke="#d9a520" stroke-width="5" stroke-linecap="round"/>
      <g data-part="llancadora" id="llan"><path class="t" fill="#8f6038" d="M-44 0q22-17 44-17t44 17q-22 17-44 17t-44-17z"/><ellipse class="t1" fill="#f2c230" cx="0" cy="0" rx="20" ry="7"/></g>
      <g data-part="cordill"><path id="cord" d="M206 0L600 96L994 0" class="nf t1" stroke-dasharray="5 4"/><g id="manec"><rect class="t fusta" x="-8" y="-22" width="16" height="48" rx="7"/></g></g></g>`;
    s += `<g data-fase="0.17-0.36,0.67-0.86">${retol(600, 46, 'un sol cop de mà: la llançadora vola', { fons: '#d9482b', w: 330 })}</g>`;
    s += `<text x="80" y="300" class="tx mig" transform="rotate(-90 80 300)">ORDIT (fils llargs)</text><text x="1120" y="540" class="tx mig" transform="rotate(90 1120 540)">TELA</text>`;
    return svg(s);
  }
  function animaTeler({ p, el }) {
    const m = p < 0.5 ? p * 2 : (p - 0.5) * 2, anada = p < 0.5;
    const yb = m < 0.72 ? 330 : m < 0.86 ? tram(m, 0.72, 0.86, 330, 452) : tram(m, 0.86, 1, 452, 330);
    const f = tram(m, 0.34, 0.7, 0, 1, true), xl = anada ? lerp(210, 990, f) : lerp(990, 210, f);
    el('bata').setAttribute('transform', `translate(0 ${yb.toFixed(1)})`);
    el('llan').setAttribute('transform', `translate(${xl.toFixed(1)} 0)`);
    const x0 = anada ? 210 : 990;
    el('trama').setAttribute('d', `M${x0} 0H${xl.toFixed(1)}`); el('trama').setAttribute('opacity', m > 0.34 && m < 0.9 ? 1 : 0);
    const mx = 600 + (anada ? 1 : -1) * 46 * (m > 0.26 && m < 0.5 ? Math.sin(((m - 0.26) / 0.24) * Math.PI) : 0);
    el('manec').setAttribute('transform', `translate(${mx.toFixed(1)} 96)`); el('cord').setAttribute('d', `M206 0L${mx.toFixed(1)} 96L994 0`);
    const dalt = anada ? 'fils-a' : 'fils-b', baix = anada ? 'fils-b' : 'fils-a';
    el(dalt).setAttribute('stroke', '#2a2420'); el(dalt).setAttribute('stroke-width', 3.2); el(baix).setAttribute('stroke', '#b39f7a'); el(baix).setAttribute('stroke-width', 2);
  }

  /* ---------- 3 · Spinning Jenny ---------- */
  const FILES = [190, 240, 290, 340, 390, 440, 490, 540];
  function jenny() {
    let s = fons();
    s += `<rect class="t fusta" x="120" y="140" width="880" height="450" rx="10"/><rect class="crema" x="146" y="166" width="828" height="398"/>`;
    s += `<g data-part="corda"><path d="M1080 300V620H190V560" class="nf t" stroke-dasharray="7 5"/><path d="M1080 300V620H190V560" class="flux2 s-taronja" stroke-width="3" data-flux="-2"/></g>`;
    s += `<g data-part="metxes">${FILES.map((y) => `<circle class="t blanc" cx="910" cy="${y}" r="21"/><circle class="t1 fusta3" cx="910" cy="${y}" r="6"/>`).join('')}</g>`;
    s += `<g id="fils-m" stroke="#fff" stroke-linecap="round">${FILES.map((y, i) => `<line class="fm" x1="890" y1="${y}" x2="500" y2="${y}" stroke-width="8"/>`).join('')}</g><g id="fils-f" stroke-linecap="round">${FILES.map((y) => `<line class="ff0" x1="500" y1="${y}" x2="226" y2="${y}" stroke="#2a2420" stroke-width="9"/><line class="ff" x1="500" y1="${y}" x2="226" y2="${y}" stroke="#fff" stroke-width="7"/>`).join('')}</g>`;
    s += `<g data-part="fusos">${FILES.map((y) => `<g><rect class="t2 fusta2" x="160" y="${y - 4}" width="70" height="8" rx="3"/><ellipse class="cop t2" cx="198" cy="${y}" rx="22" ry="8" fill="#fbf3dc"/><path class="marca-f" d="M186 ${y - 6}l8 12M202 ${y - 6}l8 12" stroke="#2a2420" stroke-width="1.6"/></g>`).join('')}</g>`;
    s += `<g data-part="pinca" id="pinca"><rect class="t fusta" x="-16" y="160" width="14" height="410" rx="5"/><rect id="pinca2" class="t fusta" x="2" y="160" width="14" height="410" rx="5"/><rect class="t fusta2" x="-30" y="150" width="60" height="18" rx="6"/><rect class="t fusta2" x="-30" y="562" width="60" height="18" rx="6"/></g>`;
    s += `<g data-part="roda"><g id="jroda">${roda(1080, 300, 120, { raigs: 10, color: '#a67547', gruix: 14, extra: '<circle class="t llauto" cx="1150" cy="300" r="12"/>' })}</g></g>${persona(1130, 690, 190, { color: '#7a4f9a', brac: 'M-8-68l-22 4M8-68l14-16', attr: 'class="atenua"' })}`;
    s += `<g id="j-r1" opacity="0">${retol(560, 610, 'la pinça s’obre: surt metxa', { fons: '#2a2420', w: 250 })}</g><g id="j-r2" opacity="0">${retol(560, 610, 'pinça tancada: estira i torça', { fons: '#d9482b', w: 262 })}</g><g id="j-r3" opacity="0">${retol(560, 610, 'el fil s’enrotlla als fusos', { fons: '#2f7fb5', w: 240 })}</g>`;
    return svg(s);
  }
  function animaJenny({ p, t, k, el, svg: g }) {
    if (!g._fm) { g._fm = Array.from(g.querySelectorAll('.fm')); g._ff = Array.from(g.querySelectorAll('.ff')); g._ff0 = Array.from(g.querySelectorAll('.ff0')); g._cop = Array.from(g.querySelectorAll('.cop')); g._mf = Array.from(g.querySelectorAll('.marca-f')); }
    const x = p < 0.2 ? tram(p, 0, 0.2, 300, 480) : p < 0.6 ? tram(p, 0.2, 0.6, 480, 760) : tram(p, 0.6, 1, 760, 300);
    const gruix = p < 0.2 ? 7 : p < 0.6 ? tram(p, 0.2, 0.6, 7, 2.6) : 2.6;
    el('pinca').setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
    el('pinca2').setAttribute('x', p < 0.2 ? 8 : 0);
    g._fm.forEach((l) => l.setAttribute('x2', x.toFixed(1)));
    g._ff.forEach((l) => { l.setAttribute('x1', x.toFixed(1)); l.setAttribute('stroke-width', gruix.toFixed(1)); l.setAttribute('stroke', gruix < 6 ? '#f2c230' : '#fff'); });
    g._ff0.forEach((l) => { l.setAttribute('x1', x.toFixed(1)); l.setAttribute('stroke-width', (gruix + 2.4).toFixed(1)); });
    const ple = p < 0.6 ? 8 : tram(p, 0.6, 1, 8, 13);
    g._cop.forEach((c) => c.setAttribute('ry', ple.toFixed(1)));
    const gir = k >= 1; g._mf.forEach((m, i) => m.setAttribute('transform', gir ? `translate(${((t * 60) % 16) - 8} 0)` : ''));
    if (gir) el('jroda').setAttribute('transform', `rotate(${((t * 160) % 360).toFixed(1)} 1080 300)`);
    ['j-r1', 'j-r2', 'j-r3'].forEach((id, i) => el(id).setAttribute('opacity', i === k ? 1 : 0));
  }

  /* ---------- 4 · Water Frame ---------- */
  function water() {
    let s = fons();
    s += `<rect class="aigua" x="-60" y="640" width="470" height="80"/><g data-part="aigua"><path class="t fusta" d="M-60 300H180v18H-60z"/><rect x="-60" y="304" width="238" height="9" class="aigua"/><path d="M178 308q22 6 24 36" class="nf s-blau" stroke-width="10" stroke-linecap="round"/><g data-girat="180 490 50">${roda(180, 490, 150, { raigs: 8, color: '#a67547', gruix: 22, raig: 8 })}</g>
      <path d="M180 490L470 250M180 490L470 480" class="nf t" stroke-dasharray="7 5"/><path d="M180 490L470 250" class="flux2 s-taronja" stroke-width="3" data-flux="2"/></g>`;
    s += `<rect class="t fusta" x="440" y="70" width="330" height="590" rx="10"/><rect class="crema" x="462" y="92" width="286" height="546"/>`;
    s += `<g data-part="metxa"><ellipse class="t blanc" cx="605" cy="140" rx="46" ry="34"/><rect class="t1 fusta3" x="599" y="100" width="12" height="80"/></g>`;
    s += `<path d="M605 174V226" stroke="#2a2420" stroke-width="16"/><path d="M605 174V226" stroke="#fff" stroke-width="13"/><path d="M605 226V296" stroke="#2a2420" stroke-width="11"/><path d="M605 226V296" stroke="#fff" stroke-width="8"/><path d="M605 296V366" stroke="#2a2420" stroke-width="7.5"/><path d="M605 296V366" stroke="#fff" stroke-width="4.5"/><path d="M605 366V452" stroke="#2a2420" stroke-width="5"/><path d="M605 366V452" stroke="#f2c230" stroke-width="2.6"/><path d="M605 180V450" class="flux2" stroke="#b9722a" stroke-width="2" data-flux="1.5" opacity=".7"/>`;
    const parell = (y, v, nom) => `<g data-girat="578 ${y} ${v}"><circle class="t ferro2" cx="578" cy="${y}" r="24"/><path d="M558 ${y}h40M578 ${y - 20}v40" class="t2"/></g><g data-girat="632 ${y} ${-v}"><circle class="t fusta2" cx="632" cy="${y}" r="24"/><path d="M612 ${y}h40M632 ${y - 20}v40" class="t2"/></g><text x="700" y="${y + 6}" class="tx">${nom}</text>`;
    s += `<g data-part="corrons">${parell(226, 60, 'lent')}${parell(296, 130, 'més ràpid')}${parell(366, 280, 'molt ràpid')}</g>`;
    s += `<g data-part="aleta"><path id="aleta" d="M605 452V470M560 470H650M560 470V560M650 470V560" class="t nf" stroke-width="5"/><rect class="t2 ferro" x="601" y="470" width="8" height="150"/><rect id="wbob" class="t" x="583" y="500" width="44" height="70" rx="8" fill="#fbf3dc"/><path d="M585 515h40M585 530h40M585 545h40" stroke="#f2c230" stroke-width="3"/><path id="wfil" d="M560 540H584" stroke="#f2c230" stroke-width="2.6"/></g>`;
    s += `<g>${retol(960, 150, 'metxa: cotó tou i gruixut', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 250 })}${fletxa('M960 176V250', '#2a2420', 4)}${retol(960, 280, 'els corrons l’estiren', { fons: '#b9722a', w: 210 })}${fletxa('M960 306V380', '#2a2420', 4)}${retol(960, 410, 'l’aleta el torça', { fons: '#b9722a', w: 170 })}${fletxa('M960 436V510', '#2a2420', 4)}${retol(960, 540, 'fil prim i resistent', { fons: '#f2c230', color: '#2a2420', vora: '#2a2420', w: 200 })}</g>`;
    return svg(s);
  }
  function animaWater({ t, el }) {
    const c = Math.cos(t * 9), xa = 605 - 45 * c, xb = 605 + 45 * c;
    el('aleta').setAttribute('d', `M605 452V470M${xa.toFixed(1)} 470H${xb.toFixed(1)}M${xa.toFixed(1)} 470V560M${xb.toFixed(1)} 470V560`);
    el('wfil').setAttribute('d', `M${xa.toFixed(1)} 540H605`);
  }

  /* ---------- 5 · mula de Crompton ---------- */
  function mula() {
    let s = fons();
    s += `<rect class="t pedra" x="-60" y="600" width="1320" height="120"/><rect class="t ferro" x="300" y="590" width="760" height="10"/>`;
    s += `<g data-part="fileta"><path class="t fusta" d="M120 600V150h30V600zM120 150h170v24H120zM270 174v426h-22V174z"/><ellipse class="t blanc" cx="200" cy="230" rx="30" ry="40"/><ellipse class="t blanc" cx="200" cy="330" rx="30" ry="40"/><path d="M226 240Q260 250 286 296M226 340Q260 330 286 304" stroke="#2a2420" stroke-width="10" fill="none"/><path d="M226 240Q260 250 286 296M226 340Q260 330 286 304" stroke="#fff" stroke-width="7" fill="none"/></g>`;
    s += `<g data-part="corrons"><g id="mc1"><circle class="t ferro2" cx="300" cy="284" r="15"/><path d="M288 284h24" class="t2"/></g><g id="mc2"><circle class="t fusta2" cx="300" cy="316" r="15"/><path d="M288 316h24" class="t2"/></g></g>`;
    s += `<line id="mfil0" x1="312" y1="300" x2="600" y2="330" stroke="#2a2420" stroke-width="7" stroke-linecap="round"/><line id="mfil" x1="312" y1="300" x2="600" y2="330" stroke="#f2c230" stroke-width="4.5" stroke-linecap="round"/>`;
    s += `<g data-part="carro" id="carro"><rect class="t fusta" x="-70" y="470" width="170" height="80" rx="8"/>${roda(-36, 566, 24, { raigs: 6 })}${roda(66, 566, 24, { raigs: 6 })}<g data-part="fus"><path d="M40 500L-6 322" class="t" stroke-width="7"/><path id="cop" class="t" fill="#fbf3dc" d="M28 470L6 380h12l24 86z"/></g></g>`;
    s += `<g>${retol(300, 60, 'corrons de la Water Frame', { fons: '#b9722a', w: 250 })}<text x="455" y="68" class="tx-gg mig">+</text>${retol(610, 60, 'carro de la Jenny', { fons: '#2f7fb5', w: 180 })}<text x="726" y="68" class="tx-gg mig">=</text>${retol(860, 60, 'MULA: fil fi i fort', { fons: '#f2c230', color: '#2a2420', vora: '#2a2420', w: 210, h: 36 })}</g>`;
    s += `<g id="m-r1" opacity="0">${retol(700, 180, 'el carro surt: estira i torça', { fons: '#d9482b', w: 260 })}</g><g id="m-r2" opacity="0">${retol(700, 180, 'corrons aturats: un últim estirament', { fons: '#2a2420', w: 320 })}</g><g id="m-r3" opacity="0">${retol(700, 180, 'el carro torna: enrotlla el fil', { fons: '#2f7fb5', w: 270 })}</g>`;
    s += persona(1130, 600, 170, { color: '#3d5a80', barret: true, attr: 'class="atenua"' });
    return svg(s);
  }
  function animaMula({ p, t, k, el }) {
    const x = p < 0.45 ? tram(p, 0, 0.45, 430, 860) : p < 0.6 ? tram(p, 0.45, 0.6, 860, 960) : tram(p, 0.6, 1, 960, 430);
    el('carro').setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
    const g = p < 0.45 ? 4.5 : p < 0.6 ? tram(p, 0.45, 0.6, 4.5, 2.4) : 2.4;
    ['mfil0', 'mfil'].forEach((id, i) => { const l = el(id); l.setAttribute('x2', (x - 6).toFixed(1)); l.setAttribute('y2', 322); l.setAttribute('stroke-width', (g + (i ? 0 : 2.6)).toFixed(1)); });
    const gira = p < 0.45 ? (t * 200) % 360 : 0;
    el('mc1').setAttribute('transform', `rotate(${gira.toFixed(1)} 300 284)`); el('mc2').setAttribute('transform', `rotate(${(-gira).toFixed(1)} 300 316)`);
    const w = p < 0.6 ? 0 : tram(p, 0.6, 1, 0, 14);
    el('cop').setAttribute('d', `M${28 - w} 470L6 380h12l${24 + w} 86z`);
    ['m-r1', 'm-r2', 'm-r3'].forEach((id, i) => el(id).setAttribute('opacity', i === k ? 1 : 0));
  }

  RI.capitol({
    id: 'textil', titol: 'El cotó',
    escenes: [
      {
        id: 'cursa', nom: 'La cursa', any: '1733 – 1785', durada: 30, bucle: true,
        pregunta: 'Per què un invent en demana un altre?',
        intro: 'Per fer tela calen dues feines: <b>filar</b> (fer fil amb la fibra) i <b>teixir</b> (encreuar fils). Quan una s’accelera, l’altra no dona l’abast. Mira com es decanta la balança.',
        svg: cursa, anima: animaCursa,
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
        svg: teler, anima: animaTeler,
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
        clau: 'Un sol teixidor fa teles amples i treballa el doble de ràpid: de cop, falta fil.',
        batx: { titol: 'Kay i la por a les màquines', text: 'Teixidors que temien perdre la feina van assaltar la casa de Kay, que va acabar emigrant a França. La resistència a les màquines és anterior al ludisme (1811-1816) i forma part de la història de cada innovació.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'jenny', nom: 'Spinning Jenny', any: '1764', qui: 'James Hargreaves', durada: 10,
        model: 'Spinning Jenny de vuit fusos, vista des de dalt · esquema didàctic',
        pregunta: 'Com fila una sola persona vuit fils alhora?',
        intro: 'Filar és fer dues coses: <b>estirar</b> la fibra i <b>tòrcer-la</b> perquè no es trenqui. La Jenny ho fa amb vuit fils a la vegada, amb una roda i una pinça.',
        svg: jenny, anima: animaJenny,
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
        etiquetes: [['metxes', 910, 120, 910, 170, 'Metxa'], ['pinca', 0, 120, 0, 156, 'Pinça mòbil', 'pinca'], ['fusos', 60, 360, 162, 340, 'Fusos'], ['roda', 1150, 120, 1110, 190], ['corda', 760, 664, 760, 620, 'Corda']],
        clau: 'Una màquina petita, barata i manual: multiplica el fil sense sortir de casa.',
        batx: { titol: 'Una màquina domèstica', text: 'La Jenny no necessitava motor i cabia en una casa: va reforçar el treball a domicili abans que la fàbrica el substituís. El seu fil, poc resistent, servia per a la trama però no per a l’ordit.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'water', nom: 'Water Frame', any: '1769', qui: 'Richard Arkwright', durada: 12,
        model: 'Un cap de filatura de la Water Frame, de costat · esquema didàctic',
        pregunta: 'Com s’estira el cotó sense mans?',
        intro: 'El secret són <b>tres parells de corrons</b>. Cada parell gira més de pressa que l’anterior i, com que estira més fil del que rep, el cotó s’aprima.',
        svg: water, anima: animaWater,
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
        etiquetes: [['metxa', 500, 50, 580, 120, 'Bobina de metxa'], ['corrons', 440, 330, 556, 300, 'Corrons'], ['aleta', 480, 600, 560, 540, 'Aleta'], ['aigua', 200, 250, 180, 350, 'Roda hidràulica']],
        clau: 'Fil fort, continu i sense força humana: la màquina que va crear la fàbrica.',
        batx: { titol: 'Arkwright, empresari', text: 'Més que inventor, Arkwright va ser organitzador: va reunir invents d’altres, capital i mà d’obra (sovint infantil) a Cromford (1771). Les seves patents van ser anul·lades el 1785 i la màquina es va estendre per tot Lancashire.', font: 'https://www.cromfordmills.org.uk/', fontNom: 'Cromford Mills' }
      },
      {
        id: 'mula', nom: 'La mula', any: '1779', qui: 'Samuel Crompton', durada: 10,
        model: 'Mula de filar, de costat (un sol fus) · esquema didàctic',
        pregunta: 'I si ajuntem el millor de les dues màquines?',
        intro: 'Crompton combina els <b>corrons</b> de la Water Frame amb el <b>carro mòbil</b> de la Jenny. Com la mula, filla d’egua i ase, és un encreuament.',
        svg: mula, anima: animaMula,
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
        etiquetes: [['fileta', 90, 110, 140, 160], ['corrons', 400, 240, 316, 290], ['carro', 15, 640, 15, 548, 'Carro mòbil', 'carro'], ['fus', 150, 400, 30, 420, 'Fus', 'carro']],
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
      { q: 'Per què les innovacions tèxtils arriben «en cadena»?', o: ['Per casualitat', 'Perquè cada invent crea un nou coll d’ampolla en una altra fase', 'Perquè ho manava el rei'], c: 1, e: 'Accelerar una fase deixa enrere l’altra i empeny a buscar una nova solució.' }
    ]
  });
})();
