// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 5 · Ferro i acer: coc, alt forn, pudelació, laminatge i convertidor Bessemer. */
(function () {
  const { svg, foc, focs, roda, persona, nuvol, txt, retol, fletxa, tram, lerp, color } = RI;
  const cel = (h) => `<rect class="cel" x="-60" width="1320" height="${h}"/><rect class="terra" x="-60" y="${h}" width="1320" height="${720 - h}"/><rect class="herba" x="-60" y="${h - 4}" width="1320" height="9"/>`;
  const tub = (d, c, g) => `<path d="${d}" class="nf" stroke="#2a2420" stroke-width="${(g || 8) + 5}" stroke-linejoin="round"/><path d="${d}" class="nf" stroke="${c}" stroke-width="${g || 8}" stroke-linejoin="round"/>`;
  const arbre = (x, y, k, id) => `<g ${id ? `id="${id}"` : ''} transform="translate(${x} ${y}) scale(${k})"><rect class="t2" x="-6" y="-40" width="12" height="40" fill="#7a5a3a"/><circle class="t2" cx="0" cy="-66" r="34" fill="#6f9c43"/><circle class="t2" cx="-20" cy="-48" r="20" fill="#7fae4d"/><circle class="t2" cx="20" cy="-50" r="18" fill="#7fae4d"/></g>`;
  const soca = (x, y) => `<path class="t2" fill="#a67547" d="M${x - 9} ${y}v-14h18v14z"/>`;

  /* ---------- 1 · del carbó al coc ---------- */
  function coc() {
    let s = cel(560);
    s += `<text x="190" y="90" class="tx-g mig">Abans: carbó vegetal</text><text x="600" y="90" class="tx-g mig">El forn de coc</text><text x="1010" y="90" class="tx-g mig">El resultat: coc</text><path d="M395 60V640M805 60V640" class="t1 nf" stroke-dasharray="4 8"/>`;
    [[60, 1], [130, 1.2], [210, 0.95], [290, 1.1], [100, 0.8], [250, 0.85]].forEach(([x, k], i) => { s += soca(x, i < 4 ? 556 : 566) + arbre(x, i < 4 ? 556 : 566, k, 'ar' + i); });
    s += `<path class="t" fill="#5a4636" d="M120 560q70-90 140 0z"/><g data-puf="190 500 20 -70 5 12 2.5" class="fum"></g>${retol(190, 610, 'un forn es menja un bosc', { fons: '#d9482b', w: 240, attr: 'data-en="0"' })}`;
    s += `<g data-part="forn"><path class="t mao" d="M450 560V420Q450 280 600 280T750 420V560Z"/><path class="t" fill="#3d2a22" d="M486 560V430Q486 318 600 318T714 430V560Z"/><path id="carrega" class="t carbo" d="M490 558V470q110-50 220 0V558z"/><path id="roent" d="M490 558V470q110-50 220 0V558z" fill="#ff9a2e" opacity="0"/><rect class="t fosc" x="584" y="262" width="32" height="24"/><rect class="t ferro" x="560" y="500" width="80" height="60" rx="4"/></g>`;
    s += `<g data-en="1"><g data-puf="600 256 30 -120 6 14 2" class="fum"></g>${retol(600, 610, 'gasos, quitrà i sofre fora', { fons: '#2a2420', w: 250 })}${retol(600, 190, 'gairebé sense aire: no crema, es cou', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 320 })}</g>`;
    let pila = ''; for (let i = 0; i < 16; i++) { const f = Math.floor((Math.sqrt(8 * i + 1) - 1) / 2), c = i - (f * (f + 1)) / 2, n = 5 - f; if (n <= 0) break; }
    [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1]].forEach(([f, n]) => { for (let c = 0; c < n; c++) pila += `<path class="t2" fill="#8d8d8d" d="M${940 + c * 40 + f * 20} ${556 - f * 30}l8-22 22-6 14 14-6 16z"/><circle cx="${956 + c * 40 + f * 20}" cy="${542 - f * 30}" r="2.5" fill="#555"/>`; });
    s += `<g data-part="coc"><g id="pila" opacity="0">${pila}${retol(1010, 250, '✓ crema molt calent', { fons: '#5b8c35', w: 230 })}${retol(1010, 292, '✓ dur: aguanta molt pes', { fons: '#5b8c35', w: 240 })}${retol(1010, 334, '✓ abundant: ve de la mina', { fons: '#5b8c35', w: 250 })}${fletxa('M1010 580V650', '#d9482b', 6)}<text x="1010" y="686" class="tx mig" style="fill:#fff">cap a l’alt forn</text></g></g>`;
    return svg(s);
  }
  function animaCoc({ p, k, el }) {
    for (let i = 0; i < 6; i++) el('ar' + i).setAttribute('opacity', k === 0 ? (p > 0.04 + i * 0.045 ? 0 : 1) : 0);
    el('roent').setAttribute('opacity', k === 1 ? (0.5 + 0.3 * Math.sin(p * 60)).toFixed(2) : 0);
    el('carrega').setAttribute('fill', k >= 2 ? '#8d8d8d' : ''); el('pila').setAttribute('opacity', k >= 2 ? 1 : 0);
  }

  /* ---------- 2 · alt forn ---------- */
  function altForn() {
    let s = `<rect class="cel" x="-60" width="1320" height="620"/>${nuvol(160, 110, 1.4)}<rect class="terra" x="-60" y="620" width="1320" height="100"/>`;
    s += `<path class="terra t" d="M736 150H1270V720H700Z"/><rect class="herba" x="736" y="144" width="530" height="10"/>`;
    s += `<defs><clipPath id="cl-cuba"><path d="M530 150L470 430L520 520V590H600V520L650 430L590 150Z"/></clipPath></defs>`;
    s += `<g data-part="cuba"><path class="t mao" d="M380 620L462 130H658L740 620Z"/><path class="t" fill="#4a2a1c" d="M530 150L470 430L520 520V590H600V520L650 430L590 150Z"/>
      <g clip-path="url(#cl-cuba)"><g id="capes">${Array.from({ length: 7 }, (_, i) => `<rect class="carbo" x="440" y="${-120 + i * 90}" width="240" height="30"/><rect class="mineral" x="440" y="${-90 + i * 90}" width="240" height="30"/><rect class="calc" x="440" y="${-60 + i * 90}" width="240" height="30"/>`).join('')}</g>
      <rect x="440" y="400" width="240" height="140" class="roent"/><rect x="440" y="330" width="240" height="80" fill="#ff9a2e" opacity=".45"/></g>
      <path class="t nf" d="M530 150L470 430L520 520V590H600V520L650 430L590 150Z"/></g>`;
    s += `<g data-part="gresol"><rect x="522" y="566" width="76" height="22" fill="#fff3a0"/><rect x="522" y="552" width="76" height="14" fill="#8a7a6a"/><text x="560" y="582" class="tx-p mig" style="font-size:12px">ferro</text></g>`;
    s += `<g data-part="carrega"><rect class="t fusta" x="640" y="132" width="130" height="14"/>${persona(800, 146, 70, { color: '#3d5a80', barret: true, gir: true })}<path class="t fusta2" d="M700 132l40-26h36l-10 26z"/>${roda(706, 128, 12, { raigs: 6 })}<g data-fase="0-0.25"><g data-puf="600 120 -30 40 4 6 1" class="fum" opacity=".9"></g></g>
      <g data-en="0">${retol(960, 220, 'mineral de ferro', { fons: '#9a4f32' })}${retol(960, 258, 'coc', { fons: '#2b2826', w: 70 })}${retol(960, 296, 'pedra calcària', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420' })}</g></g>`;
    s += `<g data-puf="560 132 20 -90 6 16 2.2" class="fum" opacity=".6"></g>${foc(560, 150, 50, 70)}`;
    s += `<g data-part="bufadora"><rect class="t pedra" x="80" y="500" width="150" height="120"/><rect class="t ferro" x="100" y="380" width="110" height="120" rx="6"/><rect x="108" y="388" width="94" height="104" fill="#dbe9ef"/><g id="embol"><rect class="t ferro2" x="108" y="-7" width="94" height="14"/><rect class="t ferro" x="150" y="-80" width="10" height="80"/></g>
      ${tub('M210 470H430V500H520', '#c9d6dc', 10)}<path d="M214 470H430V500H516" class="flux s-blau" data-flux="3" stroke-width="5"/><path d="M700 500H604" class="nf" stroke="#2a2420" stroke-width="15"/><path d="M700 500H604" class="nf" stroke="#c9d6dc" stroke-width="10"/><path d="M698 500H606" class="flux s-blau" data-flux="3" stroke-width="5"/></g>`;
    s += `<g data-en="1">${retol(300, 430, 'aire a pressió', { fons: '#2f7fb5' })}</g><g data-en="2">${retol(960, 400, 'més de 1.500 °C', { fons: '#d9482b' })}${retol(960, 180, 'a dalt, uns 200 °C', { fons: '#f2b632', color: '#2a2420' })}${fletxa('M900 380V210', '#d9482b', 5)}</g>`;
    s += `<g data-part="llit"><path class="t" fill="#d8c49a" d="M150 640H500V700H150Z"/><path d="M520 592Q470 600 470 650H180M440 650V690M390 650V690M340 650V690M290 650V690M240 650V690M190 650V690" class="nf" stroke="#8a6a4a" stroke-width="13" stroke-linecap="round"/>
      <path id="colada" d="M520 592Q470 600 470 650H180M440 650V690M390 650V690M340 650V690M290 650V690M240 650V690M190 650V690" class="nf" stroke="#ffb02e" stroke-width="8" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/></g>`;
    s += `<g data-en="3">${retol(330, 610, 'ferro colat en lingots', { fons: '#d9482b', w: 220 })}</g>`;
    return svg(s);
  }
  function animaForn({ p, t, el }) {
    el('capes').setAttribute('transform', `translate(0 ${((t * 14) % 90).toFixed(1)})`);
    el('embol').setAttribute('transform', `translate(0 ${(440 + 40 * Math.sin(t * 3)).toFixed(1)})`);
    el('colada').setAttribute('stroke-dashoffset', p < 0.75 ? 900 : tram(p, 0.76, 0.95, 900, 0).toFixed(0));
  }

  /* ---------- 3 · pudelació i laminatge ---------- */
  function pudelat() {
    let s = `<rect class="crema" x="-60" width="1320" height="720"/><rect class="t pedra" x="-60" y="600" width="1320" height="120"/>`;
    s += `<g data-part="xemeneia"><path class="t mao" d="M520 600V90h70V600z"/><path d="M555 330V100" class="flux s-gris" data-flux="2"/></g><g data-puf="555 84 30 -60 5 13 2.2" class="fum"></g>`;
    s += `<g data-part="forn"><path class="t mao" d="M60 600V330Q300 250 540 330V600Z"/><path class="t" fill="#4a2a1c" d="M90 520V370Q300 300 520 360V440H470V520H240V440H210V520Z"/>
      <path d="M130 500Q220 330 340 400T530 380" class="flux s-taronja" stroke-width="9" data-flux="2.2"/><path d="M130 470Q230 350 350 430" class="flux s-groc" stroke-width="6" data-flux="2.6"/></g>`;
    s += `<g data-part="fogar"><path d="M92 520H208" class="t4"/>${focs(118, 518, 3, 34, 30, 56)}<path class="t carbo" d="M96 518q54-22 110 0z"/></g>`;
    s += `<g data-part="sola"><path class="t" fill="#ff9a2e" d="M244 518V480q110-18 222 0V518z"/><circle id="bola" class="t roent" cx="356" cy="484" r="26" opacity="0"/></g>`;
    s += `<g data-part="pudelador">${persona(420, 600, 150, { color: '#7a5a3a', barret: true, gir: true, brac: 'M-8-68l-30 14M8-68l-34 20' })}<line id="ganxo" x1="398" y1="520" x2="340" y2="486" class="t" stroke-width="6"/></g>`;
    s += `<g data-en="0">${retol(300, 250, 'la flama passa per sobre: el carbó no toca el ferro', { fons: '#2a2420', w: 440 })}</g><g data-en="1">${retol(300, 250, 'remenant, el carboni es crema i el ferro s’espesseix', { fons: '#d9482b', w: 450 })}</g>`;
    // laminador
    s += `<g data-part="laminador"><path class="t ferro" d="M820 600V230h160V600h-30V270H850V600z"/><rect id="barra-e" x="640" y="368" width="250" height="34" rx="6" class="t roent"/><rect id="barra-s" x="910" y="376" width="0" height="18" rx="4" class="t roent"/>
      <g id="corro1">${roda(900, 330, 56, { raigs: 6, color: '#56636c', gruix: 40, raig: 0.1, boto: '#c79a2c' })}<path d="M900 290v20M900 350v20M860 330h20M920 330h20" class="t"/></g><g id="corro2">${roda(900, 442, 56, { raigs: 6, color: '#56636c', gruix: 40, raig: 0.1, boto: '#c79a2c' })}<path d="M900 402v20M900 462v20M860 442h20M920 442h20" class="t"/></g></g>`;
    s += `<g data-en="3">${retol(900, 190, 'els corrons l’aprimen i l’allarguen', { fons: '#d9482b', w: 320 })}</g>`;
    s += `<g><text x="1080" y="560" class="tx mig">barra · planxa · rail</text><rect class="t ferro2" x="1010" y="574" width="50" height="12"/><rect class="t ferro2" x="1070" y="578" width="60" height="5"/><path class="t ferro2" d="M1146 590h30v-5h-10v-12h6v-7h-22v7h6v12h-10z"/></g>`;
    return svg(s);
  }
  function animaPud({ p, t, k, el }) {
    const a = t * 4, gx = 350 + 60 * Math.cos(a), gy = 492 + 10 * Math.sin(a * 2);
    const g = el('ganxo'); g.setAttribute('x2', k === 1 ? gx.toFixed(1) : 350); g.setAttribute('y2', k === 1 ? gy.toFixed(1) : 488);
    const b = el('bola'), f = tram(p, 0.5, 0.66, 0, 1);
    b.setAttribute('opacity', p > 0.4 && p < 0.68 ? 1 : 0); b.setAttribute('cx', lerp(356, 700, f).toFixed(1)); b.setAttribute('cy', lerp(484, 385, f).toFixed(1));
    const q = tram(p, 0.68, 0.98, 0, 1, true), e = el('barra-e'), sx = el('barra-s');
    e.setAttribute('opacity', p >= 0.66 ? 1 : 0); e.setAttribute('x', (640 + 250 * q).toFixed(1)); e.setAttribute('width', Math.max(0, 250 * (1 - q)).toFixed(1));
    sx.setAttribute('opacity', p >= 0.68 ? 1 : 0); sx.setAttribute('width', (470 * q).toFixed(1));
    const gir = p >= 0.66 ? (t * 220) % 360 : 0;
    el('corro1').setAttribute('transform', `rotate(${gir.toFixed(1)} 900 330)`); el('corro2').setAttribute('transform', `rotate(${(-gir).toFixed(1)} 900 442)`);
  }

  /* ---------- 4 · convertidor Bessemer ---------- */
  const PERA = 'M-45 -180C-70 -120 -125 -60 -125 20C-125 90 -100 150 -80 150H80C100 150 125 90 125 20C125 -60 70 -120 45 -180Z';
  const BUIT = 'M-30 -176C-52 -116 -102 -58 -102 20C-102 80 -84 128 -66 128H66C84 128 102 80 102 20C102 -58 52 -116 30 -176Z';
  function bessemer() {
    let s = `<rect class="crema" x="-60" width="1320" height="720"/><rect class="t pedra" x="-60" y="640" width="1320" height="80"/>`;
    s += `<defs><clipPath id="cl-pera"><path d="${BUIT}"/></clipPath></defs>`;
    s += `<path class="t ferro" d="M740 640L772 350h36L840 640zM360 640L392 350h36L460 640z" opacity=".9"/>`;
    s += `<g data-en="0"><path class="t ferro" d="M150 150h150l40 40-12 12-34-28H150z"/><path d="M332 196Q380 250 424 306" class="nf" stroke="#ff9a2e" stroke-width="12" stroke-linecap="round"/>${retol(210, 120, 'ferro colat líquid', { fons: '#d9482b', w: 190 })}</g>`;
    s += `<g id="pera" transform="translate(600 360)"><g data-part="convertidor"><path class="t ferro" d="${PERA}"/><path d="${BUIT}" fill="#4a2a1c" class="t2"/><g clip-path="url(#cl-pera)"><g id="bany-g"><rect id="bany" x="-400" y="60" width="800" height="500" fill="#f08a4b"/><g id="bombolles" opacity="0">${Array.from({ length: 9 }, (_, i) => `<circle class="bb" cx="${-64 + i * 16}" cy="100" r="5" fill="#fffdf7"/>`).join('')}</g></g></g></g>
      <g data-part="toveres"><rect class="t ferro2" x="-84" y="150" width="168" height="26" rx="4"/><path d="M-60 150v-22M-30 150v-22M0 150v-22M30 150v-22M60 150v-22" class="t" stroke="#c9d6dc"/></g>
      <g id="flama" opacity="0">${foc(0, -176, 80, 190)}<g data-puf="0 -330 0 -160 8 9 0.9" class="calor"></g></g></g>`;
    s += `<g data-part="eix"><circle class="t llauto" cx="410" cy="360" r="20"/><circle class="t llauto" cx="790" cy="360" r="20"/>${tub('M790 360H1000V560', '#c9d6dc', 10)}<path d="M996 556V360H794" class="flux s-blau" stroke-width="5" data-flux="3" data-fase="0.3-0.7"/><rect class="t ferro" x="950" y="560" width="100" height="80" rx="6"/><text x="1000" y="606" class="tx-b mig">AIRE</text></g>`;
    s += `<g data-part="cullera"><path class="t ferro" d="M250 560h140l-14 80H264z"/><path id="acer-c" d="M258 600h124l-8 38H266z" fill="#fff3a0" opacity="0"/><path id="raig" d="M440 440Q380 480 330 600" class="nf" stroke="#fff3a0" stroke-width="12" stroke-linecap="round" opacity="0"/></g>`;
    s += `<g data-en="2">${retol(940, 150, 'l’aire crema el carboni', { fons: '#d9482b', w: 220 })}${retol(940, 190, 'sense gastar combustible', { fons: '#2a2420', w: 240 })}<text id="minuts" x="940" y="270" class="tx-gg mig">0 min</text></g><g data-en="3">${retol(150, 520, 'acer líquid', { fons: '#f2b632', color: '#2a2420', vora: '#2a2420', w: 130 })}</g>`;
    return svg(s);
  }
  function animaBes({ p, t, el, svg: g }) {
    const a = p < 0.2 ? -75 : p < 0.3 ? tram(p, 0.2, 0.3, -75, 0) : p < 0.7 ? 0 : p < 0.8 ? tram(p, 0.7, 0.8, 0, -115) : -115;
    el('pera').setAttribute('transform', `translate(600 360) rotate(${a.toFixed(1)})`);
    el('bany-g').setAttribute('transform', `rotate(${(-a).toFixed(1)})`);
    const niv = p < 0.2 ? tram(p, 0.02, 0.2, 130, 50) : p < 0.8 ? 50 : tram(p, 0.8, 0.98, 50, 135);
    el('bany').setAttribute('y', niv.toFixed(1)); el('bany').setAttribute('fill', color('#f08a4b', '#fff3a0', (p - 0.3) / 0.4));
    const bufa = p >= 0.3 && p < 0.7;
    el('flama').setAttribute('opacity', bufa ? 1 : 0); el('bombolles').setAttribute('opacity', bufa ? 1 : 0);
    if (bufa) { if (!g._bb) g._bb = Array.from(g.querySelectorAll('.bb')); g._bb.forEach((c, i) => c.setAttribute('cy', (126 - ((t * 90 + i * 23) % 70)).toFixed(1))); el('minuts').textContent = Math.round(((p - 0.3) / 0.4) * 20) + ' min'; }
    el('raig').setAttribute('opacity', p > 0.8 && p < 0.98 ? 1 : 0); el('acer-c').setAttribute('opacity', p > 0.82 ? tram(p, 0.82, 0.98, 0, 1).toFixed(2) : 0);
  }

  /* ---------- 5 · tres metalls ---------- */
  function tres() {
    let s = `<rect class="crema" x="-60" width="1320" height="720"/>`;
    const fitxa = (x, nom, d, pct, n, prova, usos, col, barra) => {
      let punts = ''; for (let i = 0; i < n; i++) punts += `<circle cx="${x + 185 + Math.cos(i * 2.4) * (12 + (i * 37) % 52)}" cy="${250 + Math.sin(i * 2.4) * (12 + (i * 37) % 52)}" r="5.5" class="negre"/>`;
      return `<g><rect class="t" x="${x}" y="50" width="370" height="620" rx="18" fill="#fffdf7"/><rect x="${x}" y="50" width="370" height="76" rx="18" fill="${col}"/><rect x="${x}" y="100" width="370" height="26" fill="${col}"/><rect class="t nf" x="${x}" y="50" width="370" height="620" rx="18"/>
        <text x="${x + 185}" y="92" class="tx-g mig" style="fill:#fff">${nom}</text><text x="${x + 185}" y="116" class="tx-r mig" fill="#fff">${d}</text>
        <circle class="t" cx="${x + 185}" cy="250" r="78" fill="#c5ccd0"/>${punts}<text x="${x + 185}" y="370" class="tx-gg mig">${pct}</text><text x="${x + 185}" y="394" class="tx-p mig">de carboni (punts negres)</text>
        ${barra}<text x="${x + 185}" y="530" class="tx mig">${prova}</text><path d="M${x + 30} 556H${x + 340}" class="t1"/>${usos.map((u, i) => `<text x="${x + 185}" y="${590 + i * 26}" class="tx-p mig">${u}</text>`).join('')}</g>`;
    };
    s += fitxa(20, 'Ferro colat', 'surt de l’alt forn', '3 – 4 %', 34, 'Dur, però es trenca d’un cop', ['S’emmotlla: olles, columnes,', 'canonades, peces de màquina'], '#4a4541', `<path class="t ferro2" d="M90 440h100l-8 14 10 16H90zM220 470l8-16-10-14h102v30z"/><path d="M196 426l10 12M214 424l-4 14" class="t s-vermell"/>`);
    s += fitxa(415, 'Ferro forjat', 'surt del forn de pudelar', 'menys de 0,1 %', 2, 'Tou: es doblega i es forja', ['Es lamina i es martelleja:', 'barres, cadenes, primers rails'], '#a8452f', `<path class="nf" d="M490 470Q600 400 710 470" stroke="#2a2420" stroke-width="22" stroke-linecap="round"/><path class="nf" d="M490 470Q600 400 710 470" stroke="#7d8a92" stroke-width="16" stroke-linecap="round"/>`);
    s += fitxa(810, 'Acer', 'surt del convertidor', '0,2 – 1,5 %', 10, 'Dur i elàstic alhora', ['Rails, eines, molles, canons,', 'vaixells, ponts i gratacels'], '#2f7fb5', `<rect class="t ferro" x="880" y="444" width="230" height="20" rx="6"/><path d="M920 430q-10-14 0-26M1070 430q10-14 0-26" class="t nf s-blau"/>`);
    return svg(s);
  }

  RI.capitol({
    id: 'metalls', titol: 'Ferro i acer',
    escenes: [
      {
        id: 'coc', nom: 'Del carbó al coc', any: '1709', qui: 'Abraham Darby · Coalbrookdale', durada: 15,
        pregunta: 'Amb què alimentes un forn quan s’acaben els boscos?',
        intro: 'Per fondre ferro es feia servir carbó vegetal, fet de fusta. Anglaterra es quedava sense boscos. Darby prova amb carbó mineral, però abans el <b>cou</b>.',
        svg: coc, anima: animaCoc,
        fases: [
          { fins: 0.33, nom: 'El problema: la fusta', text: 'Cada forn necessita hectàrees de bosc cada any. La fusta s’encareix i el ferro també.' },
          { fins: 0.66, nom: 'Coure el carbó sense aire', text: 'Es tanca el carbó mineral en un forn amb molt poc aire. No crema: s’escalfa i perd els gasos, el quitrà i part del sofre, que faria el ferro trencadís.', focus: ['forn'] },
          { fins: 1, nom: 'Queda el coc', text: 'Un combustible gairebé de carboni pur, porós i dur. Fa més calor que el carbó vegetal i aguanta el pes de forns molt més alts.', focus: ['coc'] }
        ],
        parts: { forn: { nom: 'Forn de coc', text: 'Una volta de maó tancada. La calor expulsa les substàncies volàtils del carbó.' }, coc: { nom: 'Coc', text: 'Carbó mineral «cuit». Serà alhora el combustible i el reactiu de l’alt forn.' } },
        clau: 'El coc deslliga el ferro del bosc i el lliga a la mina de carbó.',
        batx: { titol: 'Una difusió lenta', text: 'Darby fon ferro amb coc el 1709, però fins a mitjan segle XVIII la majoria de forns britànics encara cremen carbó vegetal. Només quan el preu de la fusta puja i milloren les màquines bufadores el coc s’imposa.', font: 'https://www.ironbridge.org.uk/', fontNom: 'Ironbridge Gorge Museums · Coalbrookdale' }
      },
      {
        id: 'altforn', nom: 'L’alt forn', any: 'segle XVIII', durada: 18,
        model: 'Alt forn de coc en secció · esquema didàctic',
        pregunta: 'Com treus ferro d’una pedra?',
        intro: 'El mineral de ferro és ferro enganxat a oxigen. L’alt forn és una torre que funciona dia i nit: per dalt hi entren pedres, per baix en surt <b>ferro líquid</b>.',
        svg: altForn, anima: animaForn,
        fases: [
          { fins: 0.25, nom: 'Es carrega per dalt', text: 'Capes de mineral de ferro, coc i pedra calcària. A mesura que es consumeix el de baix, tot va baixant.', focus: ['carrega', 'cuba'] },
          { fins: 0.5, nom: 'S’hi bufa aire per baix', text: 'Una màquina bufadora injecta aire a pressió per les toveres. Amb més aire, el coc crema amb molta més força.', focus: ['bufadora'] },
          { fins: 0.75, nom: 'El coc fa dues feines', text: 'Escalfa fins a fondre-ho tot i, a més, «roba» l’oxigen del mineral: queda ferro. La calcària s’enduu les impureses i forma l’escòria, que sura.', focus: ['cuba', 'gresol'] },
          { fins: 1, nom: 'La sagnia', text: 'S’obre el forat de baix i el ferro líquid corre per canals de sorra fins a uns motlles. En refredar-se són lingots de <b>ferro colat</b>.', focus: ['gresol', 'llit'] }
        ],
        parts: {
          carrega: { nom: 'Boca de càrrega', text: 'A dalt de tot. Els forns es construïen arran d’un marge per poder-hi arribar amb carretons.' },
          cuba: { nom: 'Cuba', text: 'L’interior del forn, folrat de maó que resisteix el foc. S’eixampla cap avall perquè la càrrega baixi sense encallar-se.' },
          bufadora: { nom: 'Màquina bufadora i toveres', text: 'Un gran pistó (mogut per aigua o per vapor) empeny l’aire pels tubs fins al cor del forn.' },
          gresol: { nom: 'Gresol', text: 'El fons del forn. S’hi acumula el ferro líquid i, a sobre, l’escòria, que pesa menys.' },
          llit: { nom: 'Llit de colada', text: 'Canals i motlles fets a la sorra. Recorden una truja alletant porcells: per això en anglès el lingot es diu «pig iron».' }
        },
        etiquetes: [['carrega', 900, 100, 720, 126, 'Boca de càrrega'], ['cuba', 300, 250, 500, 290], ['bufadora', 150, 330, 150, 384, 'Màquina bufadora'], ['bufadora', 330, 540, 440, 500, 'Tovera'], ['gresol', 760, 570, 600, 574], ['llit', 620, 684, 500, 672, 'Llit de colada']],
        clau: 'Mineral + coc + aire = ferro colat. Abundant i barat, però trencadís.',
        batx: { titol: 'Carbó, ferro i vapor: un cercle', text: 'Les màquines de vapor mouen les bufadores i bomben l’aigua de les mines; les mines donen el carbó per al coc; el ferro serveix per fer màquines de vapor. Aquest cercle explica per què la industrialització s’accelera sola un cop comença.', font: 'https://www.ironbridge.org.uk/', fontNom: 'Ironbridge Gorge Museums' }
      },
      {
        id: 'pudelat', nom: 'Pudelar i laminar', any: '1784', qui: 'Henry Cort', durada: 16,
        model: 'Forn de reverber i tren de laminatge · esquema didàctic',
        pregunta: 'Com converteixes un ferro trencadís en bigues i rails?',
        intro: 'El ferro colat té massa carboni: no es pot forjar. Cort ho resol amb dues idees: un forn on el ferro es <b>remena</b> i uns <b>corrons</b> que el pasten.',
        svg: pudelat, anima: animaPud,
        fases: [
          { fins: 0.25, nom: 'Un forn de dues cambres', text: 'El carbó crema en una banda i el ferro es fon a l’altra. Només hi arriba la flama, rebotada pel sostre: així el sofre del carbó no l’embruta.', focus: ['fogar', 'forn', 'xemeneia'] },
          { fins: 0.5, nom: 'El pudelador remena', text: 'Amb una barra llarga remou el bany. L’aire crema el carboni i el ferro, cada cop més pur, es va fent pastós.', focus: ['pudelador', 'sola'] },
          { fins: 0.66, nom: 'Surt la bola', text: 'El pudelador forma una bola incandescent d’uns 40 kg i la treu amb unes tenalles. És una feina duríssima.', focus: ['sola', 'pudelador'] },
          { fins: 1, nom: 'Laminar', text: 'La bola passa entre corrons amb canals. A cada passada surt més prima, més llarga i amb la forma desitjada.', focus: ['laminador'] }
        ],
        parts: {
          fogar: { nom: 'Fogar', text: 'Aquí crema el carbó, separat del metall per un petit mur.' },
          forn: { nom: 'Volta de reverber', text: 'El sostre baix fa rebotar («reverberar») la flama cap al ferro.' },
          sola: { nom: 'Sola', text: 'La cubeta on es fon i es remena el ferro colat.' },
          pudelador: { nom: 'Pudelador', text: 'L’obrer més ben pagat i més castigat de la siderúrgia: remenava ferro fos a mà durant hores.' },
          xemeneia: { nom: 'Xemeneia', text: 'Estira la flama a través del forn.' },
          laminador: { nom: 'Laminador', text: 'Dos corrons que giren en sentits contraris. Fan en minuts la feina de moltes hores de martell.' }
        },
        etiquetes: [['fogar', 80, 640, 150, 530], ['forn', 180, 300, 240, 322, 'Volta'], ['sola', 300, 650, 330, 512], ['pudelador', 470, 680, 430, 600], ['xemeneia', 680, 130, 588, 150], ['laminador', 1090, 300, 980, 300]],
        clau: 'Ferro forjat en grans quantitats: el material de les màquines, els ponts i els primers rails.',
        batx: { titol: 'Un coll d’ampolla humà', text: 'La pudelació no es va poder mecanitzar: depenia de la força i de l’ofici de cada pudelador. Per això, quan el ferrocarril dispara la demanda, es busca un mètode nou. És el camí que porta a Bessemer.', font: 'https://www.ironbridge.org.uk/', fontNom: 'Ironbridge Gorge Museums' }
      },
      {
        id: 'bessemer', nom: 'Bessemer', any: '1856', qui: 'Henry Bessemer', durada: 18,
        model: 'Convertidor Bessemer en secció · esquema didàctic',
        pregunta: 'Com fas acer en vint minuts?',
        intro: 'L’acer era el millor metall, però caríssim: es feia en petits gresols. Bessemer té una idea que sembla absurda: <b>bufar aire fred</b> a través del ferro fos.',
        svg: bessemer, anima: animaBes,
        fases: [
          { fins: 0.2, nom: 'Càrrega', text: 'El convertidor s’inclina i s’hi aboca ferro colat líquid, acabat de sortir de l’alt forn.', focus: ['convertidor'] },
          { fins: 0.3, nom: 'S’aixeca i comença el vent', text: 'Es posa dret i s’obre l’aire, que entra pel fons a través de les toveres.', focus: ['toveres', 'eix'] },
          { fins: 0.7, nom: 'El bufat', text: 'L’oxigen de l’aire crema el carboni i les impureses del ferro. Aquesta combustió fa pujar la temperatura tota sola: surt una gran flama per la boca.', focus: ['convertidor', 'toveres'] },
          { fins: 1, nom: 'La colada', text: 'Quan la flama canvia, es talla el vent, es torna a inclinar i s’aboca l’acer a la cullera. Tones d’acer en el temps que abans calia per a uns quilos.', focus: ['cullera'] }
        ],
        parts: {
          convertidor: { nom: 'Convertidor', text: 'Recipient d’acer en forma de pera, folrat per dins de material refractari. Bascula sobre un eix.' },
          toveres: { nom: 'Toveres', text: 'Forats al fons per on entra l’aire a pressió i travessa el metall líquid.' },
          eix: { nom: 'Eix i conducte d’aire', text: 'El convertidor gira sobre dos suports. L’aire hi arriba per dins d’un dels eixos.' },
          cullera: { nom: 'Cullera de colada', text: 'Recull l’acer líquid per repartir-lo en motlles (lingoteres).' }
        },
        etiquetes: [['convertidor', 840, 480, 700, 420], ['toveres', 600, 600, 600, 540, 'Toveres', null], ['eix', 880, 310, 800, 350, 'Eix'], ['cullera', 130, 600, 256, 600, 'Cullera']],
        clau: 'Acer abundant i barat: comença l’era dels rails d’acer, els grans vaixells i els gratacels.',
        batx: { titol: 'Un invent que al principi fallava', text: 'El procés no funcionava amb minerals rics en fòsfor (la majoria dels europeus) i l’acer sortia trencadís. Es va resoldre amb el ferromanganès de Mushet i, el 1879, amb el revestiment bàsic de Thomas i Gilchrist. Bessemer pertany ja a la Segona Revolució Industrial.', font: 'https://blog.sciencemuseum.org.uk/onward-ever-sir-henry-bessemer-frs-19-1-1813-15-3-1898/', fontNom: 'Science Museum · Henry Bessemer' }
      },
      {
        id: 'tres', nom: 'Tres metalls', estatica: true,
        pregunta: 'Ferro colat, ferro forjat o acer?',
        intro: 'Tots tres són ferro. La diferència és <b>quant carboni</b> porten barrejat, i això canvia del tot com es comporten.',
        svg: tres,
        clau: 'Massa carboni: trencadís. Gens: tou. La quantitat justa: acer.',
        batx: { titol: 'Cada metall, la seva època', text: 'Pont d’Ironbridge (1779): ferro colat. Rails i locomotores dels anys 1830-1860: ferro forjat. Torre Eiffel (1889): encara ferro pudelat. Pont de Brooklyn (1883) i gratacels de Chicago: acer. Relaciona cada obra amb el material disponible i barat al seu moment.', font: 'https://www.ironbridge.org.uk/', fontNom: 'Ironbridge Gorge Museums' }
      }
    ],
    repte: [
      { q: 'Què és el coc?', o: ['Carbó vegetal fet amb fusta', 'Carbó mineral cuit sense aire', 'Un mineral de ferro'], c: 1, e: 'En coure’s perd gasos, quitrà i sofre, i queda gairebé carboni pur.' },
      { q: 'Quines dues feines fa el coc dins l’alt forn?', o: ['Escalfa i treu l’oxigen del mineral', 'Refreda i filtra el ferro', 'Bufa aire i fa escòria'], c: 0, e: 'És combustible i, alhora, el que separa el ferro de l’oxigen.' },
      { q: 'Què surt de l’alt forn?', o: ['Acer', 'Ferro forjat', 'Ferro colat'], c: 2, e: 'Ferro amb molt carboni (3-4 %): dur però trencadís.' },
      { q: 'Què aconsegueix el pudelador remenant el ferro?', o: ['Afegir-hi carboni', 'Cremar el carboni que sobra', 'Refredar-lo més de pressa'], c: 1, e: 'Amb menys carboni, el ferro es pot forjar i laminar.' },
      { q: 'Per què el convertidor Bessemer no necessita combustible?', o: ['Perquè funciona amb electricitat', 'Perquè el carboni del mateix ferro crema amb l’aire i fa pujar la temperatura', 'Perquè el ferro ja és fred'], c: 1, e: 'La combustió de les impureses dona tota la calor necessària.' },
      { q: 'Quin metall és dur i elàstic alhora?', o: ['El ferro colat', 'El ferro forjat', 'L’acer'], c: 2, e: 'Té la quantitat justa de carboni: entre el 0,2 i l’1,5 %.' }
    ]
  });
})();
