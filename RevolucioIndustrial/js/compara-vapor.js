// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 2 · «Abans i ara»: el sistema anterior i l'invent treballant alhora. */
(function () {
  'use strict';
  const { duo, mesura, posaMesura, animaDuo, focs, fletxa, retol, tram, color, clamp, svg, roda, persona, cavall } = RI;
  RI.ABANS = RI.ABANS || {};
  const T = '#2a2420', VAPOR = '#f9c9a0', BUIT = '#eef4f6';
  const valv = (id, x, y) => `<g id="${id}"><circle cx="${x}" cy="${y}" r="9" fill="#8fd05c" stroke="${T}" stroke-width="2.2"/><line id="${id}-l" x1="${x - 6}" y1="${y}" x2="${x + 6}" y2="${y}" stroke="${T}" stroke-width="4" stroke-linecap="round"/></g>`;
  const posaValv = (el, id, x, y, oberta, vertical) => { el(id).firstChild.setAttribute('fill', oberta ? '#8fd05c' : '#e9644a'); el(id + '-l').setAttribute('transform', `rotate(${(oberta ? 0 : 90) + (vertical ? 90 : 0)} ${x} ${y})`); };
  const tub = (d, c, g) => `<path d="${d}" fill="none" stroke="${T}" stroke-width="${(g || 8) + 5}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${g || 8}" stroke-linejoin="round"/>`;

  /* ---------- una màquina de balancí reduïda a l'essencial ---------- */
  function mini(w) {
    const s = w ? 'w' : 'n';
    let h = `<rect x="0" y="500" width="600" height="106" fill="#d6c5ab"/><rect x="0" y="496" width="600" height="8" class="herba"/>`;
    // pou de la mina i bomba
    h += `<rect x="462" y="500" width="56" height="104" fill="#e7dcc3" class="t"/><rect class="aigua" x="464" y="566" width="52" height="38"/>`;
    h += `<rect x="479" y="486" width="22" height="112" fill="#58a9d6" class="t2"/><path id="puja-${s}" d="M490 594V494" class="flux s-blanc" stroke-width="5" data-flux="2.5"/>`;
    h += `<path class="t2 ferro2" d="M501 488h46v10h-46z"/><path id="raig-${s}" d="M545 498q10 0 12 14" class="nf s-blau" stroke-width="8" stroke-linecap="round"/>`;
    h += `<path class="t2" fill="url(#g-fustac)" d="M532 512h64l-6 34h-52z"/><rect id="cup-${s}" x="538" y="544" width="52" height="0" class="aigua"/><text x="566" y="568" class="mig" font-size="15" font-weight="700" fill="#4b433b">aigua</text><text x="566" y="585" class="mig" font-size="15" font-weight="700" fill="#4b433b">de la mina</text>`;
    // pilar i balancí
    h += `<rect class="t mao" x="322" y="150" width="36" height="350"/>`;
    h += `<line id="cad1-${s}" x1="190" y1="118" x2="190" y2="220" stroke="${T}" stroke-width="4" stroke-dasharray="3 4" stroke-linecap="round"/><line id="cad2-${s}" x1="490" y1="118" x2="490" y2="220" stroke="${T}" stroke-width="4" stroke-dasharray="3 4" stroke-linecap="round"/>`;
    h += `<g id="vareta-${s}"><rect class="t2 fusta" x="484" y="214" width="12" height="350"/><rect class="t2 ferro" x="478" y="560" width="24" height="12" rx="3"/></g>`;
    if (!w) {
      // Newcomen: la caldera just a sota, i l'aigua freda entra DINS del cilindre
      h += `<rect class="t mao" x="105" y="452" width="170" height="48"/><rect class="t fosc" x="125" y="466" width="130" height="32" rx="4"/>${focs(150, 497, 3, 40, 30, 34)}`;
      h += `<path class="t" fill="url(#g-coure)" d="M112 454C112 392 268 392 268 454Z"/><path d="M118 436H262L266 453H114Z" class="aigua" opacity=".9"/><path class="t nf" d="M112 454C112 392 268 392 268 454Z"/>`;
      h += `<rect class="t2" fill="url(#g-coure)" x="181" y="384" width="18" height="26"/>`;
      h += `<g data-puf="190 430 0 -20 3 6 1.5" class="vap"></g>`;
      h += `<rect class="t2" fill="url(#g-fustac)" x="34" y="186" width="72" height="50"/><rect class="aigua" x="37" y="196" width="66" height="37"/><text x="70" y="178" class="mig" font-size="16" font-weight="800" fill="#1d5f8f">aigua freda</text>`;
      h += tub('M70 236V366H152', '#58a9d6', 7);
    } else {
      // Watt: caldera a part, camisa de vapor i condensador separat
      h += `<rect class="t mao" x="8" y="440" width="116" height="60"/><rect class="t fosc" x="22" y="462" width="88" height="36" rx="4"/>${focs(48, 497, 2, 36, 26, 26)}`;
      h += `<rect class="t" fill="url(#g-coure)" x="16" y="372" width="100" height="72" rx="30"/><path d="M19 412h94v6q0 23-26 23h-42q-26 0-26-23z" class="aigua" opacity=".9"/><rect class="t nf" x="16" y="372" width="100" height="72" rx="30"/>`;
      h += `<g data-puf="66 404 0 -16 3 5 1.5" class="vap"></g>`;
      h += tub('M66 372V256H152', '#f0ab68', 8);
      h += `<rect class="t" x="138" y="226" width="104" height="168" rx="8" fill="#f08a4b"/><text x="98" y="306" class="mig" font-size="14" font-weight="700" fill="#b23a1f">camisa</text><text x="98" y="322" class="mig" font-size="14" font-weight="700" fill="#b23a1f">de vapor</text><path d="M122 312h16" stroke="#b23a1f" stroke-width="2"/>`;
      h += tub('M228 258H250V370H228', '#f0ab68', 6);
      h += `<ellipse class="innova-halo innova-pols" cx="276" cy="462" rx="62" ry="58" fill="rgba(251,191,36,.18)" stroke="#d97706" stroke-width="3" stroke-dasharray="7 5"/>`;
      h += `<rect class="t2" fill="url(#g-fustac)" x="236" y="424" width="80" height="76"/><rect class="aigua" x="239" y="432" width="74" height="66"/>`;
      h += tub('M206 386V410H263V442', '#c9d6dc', 7);
      h += `<rect class="t2" x="250" y="440" width="26" height="52" rx="5" fill="#eaf4f8"/><g id="gotes-w"><circle cx="258" cy="452" r="3" class="blau"/><circle cx="268" cy="462" r="3" class="blau"/><circle cx="260" cy="472" r="3" class="blau"/></g><rect class="t2" x="286" y="446" width="18" height="46" rx="3" fill="#eaf4f8"/>`;
      h += retol(276, 524, 'condensador: sempre fred', { fons: '#2f7fb5', w: 214, h: 26 });
    }
    // cilindre i pistó
    h += `<rect id="sota-${s}" x="152" y="320" width="76" height="64" fill="${VAPOR}"/>${w ? `<rect id="sobre-${s}" x="152" y="240" width="76" height="60" fill="${VAPOR}"/>` : ''}`;
    h += `<path id="cil-${s}" d="M144 ${w ? 232 : 238}V392H236V${w ? 232 : 238}H228V384H152V${w ? 240 : 238}Z" class="t" fill="#f08a4b"/>${w ? `<rect class="t2" fill="url(#g-ferro)" x="140" y="226" width="100" height="12"/><rect class="t2" fill="url(#g-llautoc)" x="182" y="218" width="16" height="10"/>` : ''}`;
    if (!w) h += `<g id="esquitx-n"><path d="M154 366l44-26M154 366l56-10M154 366l30-40M154 366l60 6" class="nf s-blau" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="7 6"/></g>`;
    h += `<text id="buit-${s}" x="190" y="360" class="mig" fill="#1d5f8f" opacity="0" style="font-weight:900;font-size:17px;paint-order:stroke;stroke:#fff;stroke-width:4px">BUIT</text>`;
    h += `<g id="pis-${s}"><rect class="t2" fill="url(#g-ferroh)" x="186" y="-92" width="8" height="92"/><rect class="t2" fill="url(#g-ferroc)" x="152" y="-9" width="76" height="18" rx="3"/><rect x="154" y="-2.500" width="72" height="5" fill="url(#g-llauto)"/></g>`;
    if (!w) h += `<g id="aire-n">${fletxa('M168 150V226', '#2f7fb5', 8)}${fletxa('M212 150V226', '#2f7fb5', 8)}<text x="92" y="140" class="mig" font-size="16" font-weight="800" fill="#1d5f8f">l’aire empeny</text></g>`;
    else h += `<g id="empeny-w">${fletxa('M172 244V268', '#d9482b', 5)}${fletxa('M208 244V268', '#d9482b', 5)}</g>`;
    h += w ? valv('va-w', 104, 256) + valv('ve-w', 250, 314) + valv('vc-w', 236, 410) : valv('va-n', 190, 398) + valv('vi-n', 70, 300);
    h += `<g id="biga-${s}"><path d="M195.800 108.700A150 150 0 0 0 195.800 191.300" class="nf" stroke="${T}" stroke-width="15"/><path d="M484.200 108.700A150 150 0 0 1 484.200 191.300" class="nf" stroke="${T}" stroke-width="15"/><rect class="t" fill="url(#g-fustac)" x="196" y="139" width="288" height="22" rx="4"/><path d="M195.800 108.700A150 150 0 0 0 195.800 191.300" class="nf" stroke="#c7935c" stroke-width="10"/><path d="M484.200 108.700A150 150 0 0 1 484.200 191.300" class="nf" stroke="#c7935c" stroke-width="10"/><circle class="t llauto" cx="340" cy="150" r="9"/></g>`;
    // termòmetre del cilindre
    h += `<text x="420" y="226" class="mig" font-size="16" font-weight="800" fill="#2a2420">temperatura</text><text x="420" y="245" class="mig" font-size="16" font-weight="800" fill="#2a2420">del cilindre</text>`;
    h += `<rect x="408" y="258" width="24" height="140" rx="12" fill="#fffdf7" stroke="${T}" stroke-width="2.5"/><rect id="term-${s}" x="414" y="270" width="12" height="126" rx="6" fill="#d9482b"/><circle id="bulb-${s}" cx="420" cy="408" r="17" fill="#d9482b" stroke="${T}" stroke-width="2.5"/>`;
    h += `<text x="440" y="279" font-size="15" font-weight="800" fill="#b23a1f">calent</text><text x="440" y="393" font-size="15" font-weight="800" fill="#1d5f8f">fred</text>`;
    h += `<text id="estat-${s}" x="420" y="452" class="mig" font-size="18" font-weight="800" fill="#b23a1f"></text>`;
    h += `<text x="300" y="88" class="mig" font-size="20" font-weight="700" fill="${T}">${w ? 'refreda el vapor <tspan font-weight="900" fill="#1d5f8f">a part</tspan>, al condensador' : 'refreda el vapor <tspan font-weight="900" fill="#b23a1f">dins</tspan> del mateix cilindre'}</text>`;
    // comptadors
    h += mesura('ma-' + s, 40, 640, 300, 'Aigua pujada de la mina', '#2f7fb5') + mesura('mc-' + s, 40, 694, 300, 'Carbó cremat', '#3a322c');
    return h;
  }
  const N = 4; // cops de bomba per cicle complet
  function animaMini(el, w, p, t) {
    const s = w ? 'w' : 'n', q = (p * N) % 1, fets = Math.floor(p * N + 1e-6);
    let u, calent, forca;
    if (!w) {
      u = q < 0.35 ? tram(q, 0.02, 0.34, 1, -1) : q < 0.47 ? -1 : tram(q, 0.47, 0.85, -1, 1);
      calent = q < 0.35 ? tram(q, 0, 0.28, 0, 1) : tram(q, 0.35, 0.45, 1, 0);
      forca = q >= 0.47 && q < 0.85;
    } else {
      u = q < 0.5 ? tram(q, 0.03, 0.45, -1, 1) : tram(q, 0.52, 0.96, 1, -1);
      calent = 1; forca = q >= 0.03 && q < 0.45;
    }
    const yp = 310 + 35 * u, a = Math.asin((35 * u) / 150);
    el('pis-' + s).setAttribute('transform', `translate(0 ${yp.toFixed(1)})`);
    el('biga-' + s).setAttribute('transform', `rotate(${((-a * 180) / Math.PI).toFixed(2)} 340 150)`);
    el('cad1-' + s).setAttribute('y2', (yp - 90).toFixed(1));
    el('vareta-' + s).setAttribute('transform', `translate(0 ${(-35 * u).toFixed(1)})`);
    el('cad2-' + s).setAttribute('y2', (216 - 35 * u).toFixed(1));
    const sota = el('sota-' + s); sota.setAttribute('y', (yp + 9).toFixed(1)); sota.setAttribute('height', Math.max(0, 384 - yp - 9).toFixed(1));
    el('buit-' + s).setAttribute('y', ((yp + 9 + 384) / 2 + 6).toFixed(1));
    el('puja-' + s).style.opacity = forca ? 1 : 0; el('raig-' + s).style.opacity = forca ? 1 : 0;
    if (!w) {
      sota.setAttribute('fill', q < 0.35 ? VAPOR : color('#f9c9a0', '#bcdcef', (q - 0.35) / 0.08));
      el('buit-n').setAttribute('opacity', q >= 0.42 && q < 0.86 && u < 0.45 ? 1 : 0);
      el('esquitx-n').style.opacity = q >= 0.35 && q < 0.47 ? 1 : 0;
      el('aire-n').style.opacity = forca ? 1 : 0;
      posaValv(el, 'va-n', 190, 398, q < 0.35, true); posaValv(el, 'vi-n', 70, 300, q >= 0.35 && q < 0.47, true);
      el('estat-n').textContent = q < 0.3 ? 'cal reescalfar-lo…' : q < 0.35 ? 'calent' : q < 0.86 ? 'refredat!' : 'fred';
      el('estat-n').setAttribute('fill', q < 0.35 ? '#b23a1f' : '#1d5f8f');
    } else {
      const sb = el('sobre-w'); sb.setAttribute('height', Math.max(0, yp - 9 - 240).toFixed(1));
      sota.setAttribute('fill', q < 0.5 ? color('#f9c9a0', '#eef4f6', q / 0.12) : VAPOR);
      el('buit-w').setAttribute('opacity', q > 0.1 && q < 0.5 && u < 0.5 ? 1 : 0);
      el('empeny-w').style.opacity = forca ? 1 : 0;
      posaValv(el, 'va-w', 104, 256, q < 0.45, false); posaValv(el, 'vc-w', 236, 410, q < 0.45, false); posaValv(el, 've-w', 250, 314, q >= 0.52 && q < 0.96, true);
      el('gotes-w').setAttribute('transform', `translate(0 ${(((q * 4) % 1) * 14).toFixed(1)})`); el('gotes-w').setAttribute('opacity', q < 0.45 ? 1 : 0.2);
      el('estat-w').textContent = 'sempre calent';
    }
    el('cil-' + s).setAttribute('fill', color('#8fc3e0', '#f08a4b', calent));
    const hT = 14 + 112 * calent; el('term-' + s).setAttribute('y', (396 - hT).toFixed(1)); el('term-' + s).setAttribute('height', hT.toFixed(1));
    const cT = color('#2f7fb5', '#d9482b', calent); el('term-' + s).setAttribute('fill', cT); el('bulb-' + s).setAttribute('fill', cT);
    // feina feta i carbó gastat: la mateixa aigua, però Watt crema la quarta part
    const pf = w ? clamp((q - 0.03) / 0.42, 0, 1) : clamp((q - 0.47) / 0.38, 0, 1), feta = (fets + pf) / N;
    posaMesura(el, 'ma-' + s, feta, 300, `${fets + (pf >= 1 ? 1 : 0)} de ${N} bombades`);
    posaMesura(el, 'mc-' + s, p * (w ? 0.25 : 1), 300, w ? `${(p * 1).toFixed(1).replace('.', ',')} sacs` : `${(p * 4).toFixed(1).replace('.', ',')} sacs`);
    el('cup-' + s).setAttribute('y', (544 - 26 * feta).toFixed(1)); el('cup-' + s).setAttribute('height', (26 * feta).toFixed(1));
  }

  RI.ABANS.watt = {
    durada: 26, innova: [1, 2],
    pregunta: 'Què hi guanya Watt respecte de Newcomen?',
    intro: 'Les dues màquines fan <b>la mateixa feina</b>: quatre cops de bomba. Fixa’t en el <b>termòmetre del cilindre</b> i en el <b>carbó</b> que crema cadascuna.',
    svg: () => svg(duo({ abans: 'Newcomen (1712)', ara: 'Watt (1769)', banda: 606, a: `<g transform="translate(-40 0)">${mini(false)}</g>`, b: `<g transform="translate(630 0)">${mini(true)}</g>` })),
    anima: animaDuo(({ p, t, el }) => { animaMini(el, false, p, t); animaMini(el, true, p, t); }),
    fases: [
      { fins: 0.34, nom: 'Abans: fred i calor al mateix lloc', text: 'A cada cop, Newcomen ruixa aigua freda <b>dins del cilindre</b>. Mira el termòmetre: el cilindre es refreda i el vapor següent l’ha de tornar a escalfar. Aquesta calor es perd.' },
      { fins: 0.67, nom: 'Ara: el fred, en un altre recipient', text: 'Watt envia el vapor usat a un <b>condensador separat</b>, sempre fred. El cilindre, embolcallat amb una camisa de vapor, es manté <b>sempre calent</b>.' },
      { fins: 1, nom: 'El resultat: la mateixa aigua, menys carbó', text: 'Totes dues han pujat la mateixa aigua. Però la de Watt ha cremat aproximadament <b>la quarta part del carbó</b>: ja surt a compte lluny de la boca de la mina.' }
    ],
    clau: 'La innovació no és fer més força: és deixar de llençar calor a cada cop.'
  };

  /* ---------- abans de Newcomen: el malacate de cavalls ---------- */
  function mina(maq) {
    const s = maq ? 'm' : 'c', xp = maq ? 396 : 410, fons = maq ? 586 : 470;
    let h = `<rect x="0" y="250" width="600" height="356" class="terra"/><rect x="0" y="246" width="600" height="8" class="herba"/>`;
    // veta de carbó fonda, galeria alta ja explotada i pou
    h += `<rect x="0" y="500" width="600" height="42" class="carbo"/><path d="M0 500h600M0 542h600" stroke="${T}" stroke-width="2"/>`;
    h += `<rect x="150" y="372" width="${xp - 148}" height="48" fill="#d9c9a8" class="t2"/><text x="${(150 + xp) / 2}" y="402" class="mig" font-size="15" font-weight="700" fill="#6b5a3c">veta alta: ja s’acaba</text>`;
    if (maq) h += `<g id="galeria-m"><rect x="150" y="498" width="${xp - 148}" height="46" fill="#e7d9b6" class="t2"/>${persona(230, 542, 40, { color: '#7a5a3a' })}${persona(320, 542, 40, { color: '#3d5a80' })}<g id="pic-m"><path d="M246 516l22-16M260 494q10 2 14 12" stroke="${T}" stroke-width="4" fill="none" stroke-linecap="round"/></g><rect x="352" y="524" width="30" height="18" fill="#2b2826" class="t2"/></g>`;
    h += `<rect x="${xp}" y="250" width="40" height="${fons - 250}" fill="#e7dcc3" class="t2"/>`;
    // aigua: tot el que queda per sota del nivell és inundat
    h += `<g id="aigua-${s}"><rect id="aigua-${s}-r" x="0" y="0" width="600" height="160" fill="#2f7fb5" opacity=".42"/><path d="M0 0q15-7 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0" fill="none" stroke="#fff" stroke-width="2.500"/><path d="M0 0h600" stroke="#1d5f8f" stroke-width="2.500"/></g>`;
    h += `<text id="veta-${s}" x="${maq ? 500 : 250}" y="528" class="mig" font-size="16" font-weight="800" fill="#fff" style="paint-order:stroke;stroke:#2a2420;stroke-width:4px"></text>`;
    if (!maq) {
      // malacate: els cavalls fan girar un tambor que enrotlla la corda dels cubells
      h += `<path d="M396 250L426 92L456 250" fill="none" stroke="${T}" stroke-width="9" stroke-linejoin="round"/><path d="M396 250L426 92L456 250" fill="none" stroke="#a8733f" stroke-width="5" stroke-linejoin="round"/><circle cx="430" cy="104" r="15" fill="url(#g-ferro)" class="t2"/>`;
      h += `<path id="corda-c" fill="none" stroke="#7a4e26" stroke-width="3.200"/><g id="cubell-c"><path d="M-13-22h26l-4 24h-18z" fill="url(#g-fustac)" class="t2"/><rect id="cub-aigua" x="-11" y="-21" width="22" height="6" fill="#58a9d6"/><path d="M-12-22q12-14 24 0" fill="none" stroke="${T}" stroke-width="2.200"/></g>`;
      h += `<path class="t2" fill="url(#g-fustac)" d="M470 232h70l-6 18h-58z"/><rect id="bassa-c" x="476" y="248" width="58" height="0" class="aigua"/>`;
      h += `<g id="cav-l">${cavall(0, 0, 1.05, { arnes: true, gir: true })}</g><g id="cav-r">${cavall(0, 0, 1.05, { arnes: true })}</g>`;
      h += `<rect x="172" y="150" width="16" height="100" fill="#a8733f" class="t2"/><path id="brac-c" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path id="brac-c2" stroke="#c08a52" stroke-width="5" stroke-linecap="round"/>`;
      h += `<ellipse cx="180" cy="152" rx="50" ry="14" fill="#96643a" class="t2"/><rect x="130" y="124" width="100" height="28" fill="#c08a52" class="t2"/><ellipse cx="180" cy="124" rx="50" ry="14" fill="#dcb07a" class="t2"/><path id="volta-c" d="M134 138h92" stroke="#7a4e26" stroke-width="3" stroke-dasharray="8 6"/>`;
      h += `<text x="180" y="92" class="mig" font-size="18" font-weight="800" fill="${T}">malacate: força de cavalls</text>`;
    } else {
      // màquina de Newcomen reduïda: caldera, cilindre, balancí i vareta fins al fons del pou
      h += `<rect class="t2 mao" x="140" y="212" width="124" height="38"/><rect class="t2 fosc" x="156" y="222" width="92" height="26" rx="3"/>${focs(176, 248, 3, 26, 22, 24)}`;
      h += `<path class="t2" fill="url(#g-coure)" d="M146 214C146 168 258 168 258 214Z"/><rect id="vap-m" x="181" y="120" width="42" height="56" fill="${VAPOR}"/><path id="cil-m" d="M175 96V182H229V96H223V176H181V96Z" class="t2" fill="#f08a4b"/>`;
      h += `<g id="pis-m"><rect class="t2" fill="url(#g-ferroh)" x="199" y="-52" width="6" height="52"/><rect class="t2" fill="url(#g-ferroc)" x="181" y="-6" width="42" height="12" rx="2"/></g>`;
      h += `<rect class="t2 mao" x="296" y="70" width="24" height="180"/><line id="cad1-m" x1="202" y1="58" x2="202" y2="90" stroke="${T}" stroke-width="3" stroke-dasharray="3 3"/><line id="cad2-m" x1="414" y1="58" x2="414" y2="130" stroke="${T}" stroke-width="3" stroke-dasharray="3 3"/>`;
      h += `<rect x="408" y="250" width="14" height="${fons - 268}" fill="#58a9d6" class="t2"/><path d="M415 ${fons - 22}V256" class="flux s-blanc" stroke-width="4" data-flux="2.500"/><g id="vareta-m"><rect class="t2 fusta" x="411" y="126" width="7" height="${fons - 150}"/></g>`;
      h += `<path class="t2 ferro2" d="M422 240h40v9h-40z"/><path d="M460 249q10 0 12 12" class="nf s-blau" stroke-width="7" stroke-linecap="round"/><path class="t2" fill="url(#g-fustac)" d="M470 232h70l-6 18h-58z" transform="translate(4 8)"/>`;
      h += `<g id="biga-m"><rect class="t2" fill="url(#g-fustac)" x="196" y="62" width="224" height="16" rx="3"/><path d="M204 44A108 108 0 0 0 204 96" class="nf" stroke="${T}" stroke-width="11"/><path d="M412 44A108 108 0 0 1 412 96" class="nf" stroke="${T}" stroke-width="11"/><path d="M204 44A108 108 0 0 0 204 96" class="nf" stroke="#c7935c" stroke-width="7"/><path d="M412 44A108 108 0 0 1 412 96" class="nf" stroke="#c7935c" stroke-width="7"/><circle class="t2 llauto" cx="308" cy="70" r="7"/></g>`;
      h += `<g data-puf="202 150 0 -14 3 4 1.300" class="vap"></g><text x="96" y="150" class="mig" font-size="18" font-weight="800" fill="${T}">força</text><text x="96" y="172" class="mig" font-size="18" font-weight="800" fill="${T}">del vapor</text>`;
    }
    h += mesura('mf-' + s, 40, 668, 300, 'Fins on es pot baixar a treure carbó', '#3a322c');
    return h;
  }
  RI.ABANS.newcomen = {
    durada: 28, innova: [1, 2],
    pregunta: 'Què hi guanya la mina amb la màquina de Newcomen?',
    intro: 'Com més fonda és una mina, més aigua s’hi filtra. Mira <b>fins on arriba l’aigua</b> a cada mina i quin carbó queda a l’abast.',
    svg: () => svg(duo({ abans: 'cavalls i cubells', ara: 'màquina de Newcomen (1712)', banda: 606, a: `<g transform="translate(-50 0)">${mina(false)}</g>`, b: `<g transform="translate(626 0)">${mina(true)}</g>` })),
    anima: animaDuo(({ p, t, el }) => {
      // cavalls: donen voltes; el cubell puja ple i baixa buit
      const th = t * 0.85, hx = 180 + 118 * Math.cos(th), hy = 244 + 9 * Math.sin(th), dreta = -Math.sin(th) > 0;
      el('cav-l').setAttribute('transform', `translate(${hx.toFixed(1)} ${hy.toFixed(1)})`); el('cav-r').setAttribute('transform', `translate(${hx.toFixed(1)} ${hy.toFixed(1)})`);
      el('cav-l').style.display = dreta ? 'none' : ''; el('cav-r').style.display = dreta ? '' : 'none';
      const d = `M180 168L${hx.toFixed(1)} ${(hy - 44).toFixed(1)}`; el('brac-c').setAttribute('d', d); el('brac-c2').setAttribute('d', d);
      el('volta-c').style.strokeDashoffset = (-t * 16).toFixed(1);
      const v = p * 4, n = Math.floor(v + 1e-6), u = v - n, puja = u < 0.5, yb = puja ? tram(u, 0.02, 0.46, 448, 262) : tram(u, 0.54, 0.98, 262, 448);
      el('cubell-c').setAttribute('transform', `translate(430 ${yb.toFixed(1)})`); el('cub-aigua').style.opacity = puja ? 1 : 0;
      el('corda-c').setAttribute('d', `M226 132L420 96M430 104V${(yb - 34).toFixed(1)}`);
      const ple = Math.min(16, (n + (u > 0.5 ? 1 : 0)) * 4); el('bassa-c').setAttribute('y', (248 - ple).toFixed(1)); el('bassa-c').setAttribute('height', ple.toFixed(1));
      el('aigua-c').setAttribute('transform', `translate(0 ${(440 + 3 * Math.sin(t * 1.3)).toFixed(1)})`); el('aigua-c-r').setAttribute('height', 162);
      el('veta-c').textContent = 'carbó sota l’aigua: no s’hi arriba';
      posaMesura(el, 'mf-c', 0.34, 300, 'poc fons');
      // màquina: bomba sense parar; el nivell baixa i s'obre la veta fonda
      const q = (p * 10) % 1, a = Math.sin(2 * Math.PI * q), yp = 148 + 22 * a;
      el('pis-m').setAttribute('transform', `translate(0 ${yp.toFixed(1)})`); el('biga-m').setAttribute('transform', `rotate(${(-11.8 * a).toFixed(2)} 308 70)`);
      el('cad1-m').setAttribute('y2', (yp - 52).toFixed(1)); el('vareta-m').setAttribute('transform', `translate(0 ${(-22 * a).toFixed(1)})`); el('cad2-m').setAttribute('y2', (128 - 22 * a).toFixed(1));
      el('vap-m').setAttribute('y', (yp + 6).toFixed(1)); el('vap-m').setAttribute('height', Math.max(0, 176 - yp - 6).toFixed(1));
      const fred = Math.cos(2 * Math.PI * q) > 0 && a > -0.2; el('vap-m').setAttribute('fill', fred ? '#bcdcef' : VAPOR); el('cil-m').setAttribute('fill', fred ? '#8fc3e0' : '#f08a4b');
      const baixa = tram(p, 0.36, 0.72, 0, 1), yw = 440 + 136 * baixa;
      el('aigua-m').setAttribute('transform', `translate(0 ${(yw + 2 * Math.sin(t * 1.3)).toFixed(1)})`); el('aigua-m-r').setAttribute('height', Math.max(0, 603 - yw).toFixed(1));
      el('galeria-m').style.opacity = clamp((yw - 545) / 20, 0, 1); el('pic-m').setAttribute('transform', `rotate(${(18 * Math.sin(t * 6)).toFixed(1)} 246 516)`);
      el('veta-m').textContent = yw > 560 ? 'carbó a l’abast' : 'la bomba fa baixar l’aigua…';
      posaMesura(el, 'mf-m', 0.34 + 0.56 * baixa, 300, baixa > 0.95 ? 'molt més fons' : baixa > 0.02 ? 'cada cop més fons' : 'poc fons');
    }),
    fases: [
      { fins: 0.34, nom: 'Abans: cubells i cavalls', text: 'Uns cavalls fan voltar un tambor que puja l’aigua <b>cubell a cubell</b>. A poca fondària n’hi ha prou, però més avall l’aigua entra més de pressa del que es pot treure: la veta fonda queda inundada.' },
      { fins: 0.72, nom: 'Ara: una bomba que no es cansa', text: 'La màquina de Newcomen mou una bomba <b>dia i nit</b> i crema el carbó menut de la mateixa mina. Mira com baixa el nivell de l’aigua.' },
      { fins: 1, nom: 'El resultat: mines més fondes', text: 'Amb el pou eixut es pot arribar al <b>carbó que abans era sota l’aigua</b>. Més carbó vol dir més combustible per a forns i, aviat, per a més màquines.' }
    ],
    clau: 'La primera màquina de vapor no mou fàbriques: salva les mines de l’aigua, i les mines li donen el carbó.'
  };
})();
