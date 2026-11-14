// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 2 · El vapor: Newcomen, Watt i el moviment rotatiu. */
(function () {
  const { svg, foc, focs, roda, engranatge, persona, nuvol, txt, fletxa, retol, tram, color } = RI;
  const valv = (id, x, y) => `<g id="${id}"><circle class="t2" cx="${x}" cy="${y}" r="11" fill="#fffdf7"/><line id="${id}-l" x1="${x - 8}" y1="${y}" x2="${x + 8}" y2="${y}" stroke="#2a2420" stroke-width="5" stroke-linecap="round"/></g>`;
  function posaValv(el, id, x, y, oberta, vertical) {
    const g = el(id); if (!g) return;
    g.firstChild.setAttribute('fill', oberta ? '#8fd05c' : '#e9644a');
    el(id + '-l').setAttribute('transform', `rotate(${(oberta ? 0 : 90) + (vertical ? 90 : 0)} ${x} ${y})`);
  }

  /* ---------- màquina de balancí (Newcomen o Watt d'efecte simple) ---------- */
  function motor(w) {
    let s = '';
    // paisatge i subsòl
    s += `<rect x="-60" y="-70" width="1320" height="790" fill="#fcf8ef"/>`;
    s += `<rect fill="#d6c5ab" x="-60" y="560" width="1320" height="160"/><rect class="herba" x="620" y="556" width="640" height="9"/><rect class="herba" x="-60" y="556" width="120" height="9"/>`;
    s += `<rect x="806" y="560" width="88" height="152" fill="#e7dcc3" class="t"/><rect x="640" y="640" width="520" height="72" fill="#e7dcc3" class="t"/><rect x="808" y="600" width="84" height="80" fill="#e7dcc3"/>`;
    s += `<rect class="aigua" x="642" y="686" width="516" height="24" opacity=".9"/><path d="M650 686q12-6 24 0t24 0 24 0 24 0 24 0 24 0" class="nf t1 s-blanc"/>`;
    s += persona(1050, 710, 56, { color: '#7a5a3a', barret: true }) + `<rect class="aigua" x="1020" y="688" width="60" height="22" opacity=".85"/>`;
    s += txt(740, 672, 'la mina s’inunda', 'tx mig');
    // casa de màquines
    // Secció sense sostre: no oculta el moviment del balancí.
    s += `<rect class="t mao" x="560" y="128" width="60" height="432"/>`;
    s += `<rect x="90" y="556" width="470" height="8" class="t2 pedra"/>`;

    if (!w) {
      // Newcomen: caldera sota el cilindre
      s += `<g data-guia="1"><path d="M150 180l-42-22M330 420v44M220 420l-48 34M590 110V64"/></g>`;
      s += `<g data-part="caldera" data-exp="0 44"><rect class="t mao" x="215" y="470" width="240" height="90"/><rect class="t fosc" x="245" y="512" width="170" height="44" rx="4"/>${focs(275, 554, 4, 37, 30, 36)}
        <path class="t" fill="url(#g-coure)" d="M225 506C225 426 435 426 435 506Z"/><path d="M232 484H428L434 505H226Z" class="aigua" opacity=".9"/><path d="M236 484h188M244 468h172" stroke="#7c3e16" stroke-width="1.5" stroke-dasharray="3 11" opacity=".65"/><path class="t nf" d="M225 506C225 426 435 426 435 506Z"/>
        <rect class="t" fill="url(#g-coure)" x="318" y="384" width="24" height="64"/><rect class="t" fill="url(#g-llautoc)" x="314" y="408" width="32" height="8" rx="2"/></g>`;
      s += `<g data-puf="330 478 0 -26 4 7 1.6" class="vap"></g>`;
      s += `<g data-part="diposit" data-exp="-54 -28"><rect class="t" fill="url(#g-fustac)" x="105" y="140" width="80" height="55"/><rect class="aigua" x="108" y="152" width="74" height="40"/><path class="t nf" d="M90 200h100"/><path d="M145 195V358H272" class="nf" stroke="#2a2420" stroke-width="13"/><path d="M145 195V358H272" class="nf" stroke="#58a9d6" stroke-width="8"/></g>`;
      s += `<g data-part="desguas" data-exp="-52 38"><path d="M296 384V404H175V522" class="nf" stroke="#2a2420" stroke-width="11"/><path d="M296 384V404H175V522" class="nf" stroke="#9fb4c0" stroke-width="6"/><path class="t fusta" d="M150 520h50l-5 38h-40z"/><path d="M175 404V520" class="flux2 s-blau" data-flux="1.5" data-fase="0.84-1"/></g>`;
    } else {
      // Watt: caldera a part, camisa de vapor, condensador separat
      s += `<g data-guia="1"><path d="M180 420l-42 32M220 220l-42-24M330 300l42-16M405 300h48M480 460l46 38M590 110V64"/></g>`;
      s += `<g data-part="caldera" data-exp="-48 38"><rect class="t mao" x="95" y="452" width="170" height="108"/><rect class="t fosc" x="115" y="512" width="130" height="44" rx="4"/>${focs(142, 554, 3, 38, 30, 36)}
        <rect class="t" fill="url(#g-coure)" x="105" y="400" width="150" height="108" rx="40"/><path d="M108 462h144v10q0 33-36 33h-72q-36 0-36-33z" class="aigua" opacity=".9"/><path d="M138 402v104M222 402v104" stroke="#2a2420" stroke-width="4" opacity=".45"/><path d="M138 412v86M222 412v86" stroke="#fff3d6" stroke-width="1.5" stroke-dasharray="2 10" opacity=".7"/><rect class="t nf" x="105" y="400" width="150" height="108" rx="40"/></g>`;
      s += `<g data-puf="180 448 0 -24 4 7 1.6" class="vap"></g>`;
      s += `<g data-part="tub" data-exp="-46 -32"><path d="M180 400V196H272V232" class="nf" stroke="#2a2420" stroke-width="15"/><path d="M180 400V196H272V232" class="nf" stroke="#f0ab68" stroke-width="10"/><path d="M180 396V196H270" class="flux s-blanc" data-flux="2" data-fase="0-0.45"/></g>`;
      s += `<rect class="t pedra" x="262" y="384" width="136" height="176"/>`;
      s += `<g data-part="camisa" data-exp="42 -16"><rect class="t" x="258" y="216" width="144" height="172" rx="8" fill="url(#g-coure)"/><path d="M262 246h136M262 356h136" stroke="#7c3e16" stroke-width="2" stroke-dasharray="3 12" opacity=".55"/></g>`;
      s += `<g data-part="equilibri" data-exp="54 0"><path d="M388 240H420V364H388" class="nf" stroke="#2a2420" stroke-width="13"/><path d="M388 240H420V364H388" class="nf" stroke="#f0ab68" stroke-width="8"/><path d="M392 240H420V364H392" class="flux s-blanc" data-flux="2" data-fase="0.55-0.97"/></g>`;
      s += `<g data-part="condensador" data-exp="54 44"><rect class="t" fill="url(#g-fustac)" x="430" y="436" width="122" height="124"/><rect class="aigua" x="434" y="448" width="114" height="108"/>
        <path d="M300 384V414H457V470" class="nf" stroke="#2a2420" stroke-width="13"/><path d="M300 384V414H457V470" class="nf" stroke="#c9d6dc" stroke-width="8"/><path d="M300 388V414H457V466" class="flux s-taronja" data-flux="2.5" data-fase="0-0.34"/>
        <rect class="t" x="440" y="466" width="36" height="78" rx="6" fill="#eaf4f8"/><g id="gotes"><circle cx="450" cy="500" r="3.5" class="blau"/><circle cx="462" cy="514" r="3.5" class="blau"/><circle cx="454" cy="528" r="3.5" class="blau"/><circle cx="466" cy="492" r="3.5" class="blau"/></g></g>`;
      s += `<g data-part="bomba" data-exp="54 44"><rect class="t" x="492" y="466" width="36" height="78" rx="4" fill="#eaf4f8"/><path d="M476 536h16" class="t4"/><g id="bomba-m"><path d="M510 122V500" class="t" stroke-width="5"/><rect class="t" fill="url(#g-ferroc)" x="494" y="494" width="32" height="10"/></g></g>`;
    }

    // cilindre
    s += `<g data-part="cilindre"><rect id="vap" x="282" y="300" width="96" height="72" fill="#f9c9a0"/>${w ? '<rect id="vap2" x="282" y="224" width="96" height="60" fill="#f9c9a0"/>' : ''}
      <path id="cil" d="M272 222V384H388V222H378V372H282V222Z" class="t" fill="url(#g-ferroc)"/>${w ? '<path class="t" fill="url(#g-ferro)" d="M268 212h124v12H268z"/><rect class="t" fill="url(#g-llautoc)" x="320" y="202" width="20" height="12"/>' : ''}</g>`;
    if (!w) s += `<g data-fase="0.34-0.47"><path d="M284 358l60-34M284 358l72-14M284 358l40-52M284 358l76 6" class="nf s-blau" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="8 7"/></g>`;
    s += `<text id="buit" x="330" y="350" class="mig" fill="#1d5f8f" opacity="0" style="font-weight:900;font-size:22px;paint-order:stroke;stroke:#fff;stroke-width:5px">BUIT</text>`;
    s += `<g data-part="piston" id="piston"><rect class="t" fill="url(#g-ferroh)" x="325" y="-112" width="10" height="112"/><rect class="t" fill="url(#g-ferroc)" x="282" y="-11" width="96" height="22" rx="3"/><rect x="284" y="-3" width="92" height="6" fill="url(#g-llauto)"/></g>`;
    s += `<line id="cad1" x1="330" y1="110" x2="330" y2="200" stroke="#2a2420" stroke-width="5" stroke-dasharray="3 5" stroke-linecap="round"/>`;
    // vàlvules
    s += w ? valv('v-adm', 228, 196) + valv('v-eq', 420, 300) + valv('v-esc', 380, 414) : valv('v-adm', 330, 416) + valv('v-inj', 145, 290);
    // pressió atmosfèrica (Newcomen) o vapor (Watt)
    if (!w) s += `<g data-fase="0.47-0.84">${fletxa('M290 120V214', '#2f7fb5', 11)}${fletxa('M330 116V200', '#2f7fb5', 11)}${fletxa('M370 120V214', '#2f7fb5', 11)}${retol(500, 150, 'pressió de l’aire (1 atm)', { fons: '#2f7fb5', w: 205 })}</g>`;
    else s += `<g data-fase="0.03-0.45">${fletxa('M304 232V272', '#d9482b', 6)}${fletxa('M356 232V272', '#d9482b', 6)}${retol(495, 250, 'el vapor empeny', { fons: '#d9482b' })}</g>`;
    // bomba de la mina
    s += `<g data-part="bombamina"><rect class="t" x="832" y="535" width="36" height="172" fill="#58a9d6"/><path d="M850 696V544" class="flux s-blanc" stroke-width="5" data-flux="2.5" data-fase="${w ? '0.03-0.45' : '0.47-0.84'}"/><path class="t ferro2" d="M868 541h96v12h-96z"/>
      <path d="M962 551q22 0 24 12" class="nf s-blau" stroke-width="9" stroke-linecap="round" data-fase="${w ? '0.03-0.45' : '0.47-0.84'}"/><ellipse class="aigua" cx="1010" cy="566" rx="70" ry="9"/>
      <g id="vareta"><rect class="t fusta" x="843" y="-400" width="14" height="400"/><rect class="t ferro" x="836" y="-6" width="28" height="14" rx="3"/><rect class="t ferro" x="838" y="-436" width="24" height="40"/></g></g>`;
    s += `<line id="cad2" x1="850" y1="110" x2="850" y2="200" stroke="#2a2420" stroke-width="5" stroke-dasharray="3 5" stroke-linecap="round"/>`;
    // balancí
    s += `<g data-exp="0 -48"><g data-part="balanci" id="biga"><path d="M340 38A260 260 0 0 0 340 182" class="nf" stroke="#2a2420" stroke-width="19"/><path d="M840 38A260 260 0 0 1 840 182" class="nf" stroke="#2a2420" stroke-width="19"/>
      <path d="M345 44L420 104M345 176L420 116M835 44L760 104M835 176L760 116" class="t"/>
      <rect class="t" fill="url(#g-fustac)" x="342" y="97" width="496" height="26" rx="4"/><path d="M340 38A260 260 0 0 0 340 182" class="nf" stroke="#c7935c" stroke-width="13"/><path d="M840 38A260 260 0 0 1 840 182" class="nf" stroke="#c7935c" stroke-width="13"/>
      <circle class="t llauto" cx="590" cy="110" r="11"/></g></g>`;
    return svg(s, '-60 -64 1320 784');
  }

  function animaMotor(w) {
    return ({ p, el }) => {
      let u, calent;
      if (!w) {
        u = p < 0.34 ? tram(p, 0.02, 0.33, 1, -1) : p < 0.47 ? -1 : tram(p, 0.47, 0.84, -1, 1);
        calent = p < 0.34 ? tram(p, 0, 0.26, 0, 1) : tram(p, 0.34, 0.44, 1, 0);
      } else {
        u = p < 0.5 ? tram(p, 0.03, 0.45, -1, 1) : tram(p, 0.55, 0.97, 1, -1);
        calent = 1;
      }
      const yp = 296 + 54 * u, a = (54 * u) / 260;
      el('piston').setAttribute('transform', `translate(0 ${yp.toFixed(1)})`);
      el('biga').setAttribute('transform', `rotate(${((-a * 180) / Math.PI).toFixed(2)} 590 110)`);
      el('cad1').setAttribute('y2', (yp - 110).toFixed(1));
      const yv = 625 - 54 * u;
      el('vareta').setAttribute('transform', `translate(0 ${yv.toFixed(1)})`);
      el('cad2').setAttribute('y2', (yv - 434).toFixed(1));
      const v = el('vap'); v.setAttribute('y', (yp + 11).toFixed(1)); v.setAttribute('height', Math.max(0, 372 - yp - 11).toFixed(1));
      if (!w) {
        const buit = p >= 0.38 && p < 0.86;
        v.setAttribute('fill', p < 0.34 ? '#f9c9a0' : color('#f9c9a0', '#bcdcef', (p - 0.34) / 0.08));
        el('buit').setAttribute('opacity', buit && u < 0.3 ? 1 : 0); el('buit').setAttribute('y', (yp + 11 + (372 - yp - 11) / 2 + 6).toFixed(1));
        el('cil').setAttribute('fill', color('#8fc3e0', '#f08a4b', calent));
        posaValv(el, 'v-adm', 330, 416, p < 0.34, true); posaValv(el, 'v-inj', 145, 290, p >= 0.34 && p < 0.47, true);
      } else {
        const v2 = el('vap2'); v2.setAttribute('y', 224); v2.setAttribute('height', Math.max(0, yp - 11 - 224).toFixed(1));
        const baix = p < 0.34 ? color('#f9c9a0', '#eef4f6', p / 0.2) : p < 0.55 ? '#eef4f6' : '#f9c9a0';
        v.setAttribute('fill', baix);
        el('buit').setAttribute('opacity', p > 0.12 && p < 0.5 && u < 0.5 ? 1 : 0); el('buit').setAttribute('y', (yp + 11 + (372 - yp - 11) / 2 + 6).toFixed(1));
        posaValv(el, 'v-adm', 228, 196, p < 0.45, false); posaValv(el, 'v-esc', 380, 414, p < 0.45, false); posaValv(el, 'v-eq', 420, 300, p >= 0.55 && p < 0.97, true);
        el('bomba-m').setAttribute('transform', `translate(0 ${(16.6 * u).toFixed(1)})`);
        el('gotes').setAttribute('transform', `translate(0 ${((p * 3) % 1) * 16})`); el('gotes').setAttribute('opacity', p < 0.4 ? 1 : 0.25);
      }
    };
  }

  /* ---------- màquina rotativa de Watt ---------- */
  const O = { x: 520, y: 170 }, L = 270, S = { x: 790, y: 470 }, R = 90, LB = 300;
  function rotativa() {
    let s = `<rect class="crema" x="-60" width="1320" height="720"/><rect class="t pedra" x="-60" y="600" width="1320" height="120"/><rect x="640" y="596" width="300" height="124" fill="#e7dcc3" class="t"/>`;
    s += `<rect x="-60" y="0" width="1320" height="40" class="mao t"/>`;
    s += `<g data-guia="1"><path d="M250 420l-42 18M160 420l-52-14M520 170V116M790 470l48 30M1040 420l54-22M1070 117l40-36"/></g>`;
    // eix de transmissió i corretja
    s += `<g data-part="corretja" data-exp="18 -38"><path d="M790 430L1058 96M790 510L1082 150" class="nf" stroke="#2a2420" stroke-width="9"/><path d="M790 430L1058 96M790 510L1082 150" class="nf" stroke="#8f6038" stroke-width="5"/><path d="M790 430L1058 96" class="flux2 s-groc" data-flux="3" stroke-width="3"/>
      <rect class="t ferro" x="1040" y="110" width="160" height="14"/><g data-girat="1070 117 300">${roda(1070, 117, 34, { raigs: 4, color: '#a67547' })}</g>${fletxa('M1108 184H1198', '#d9482b', 5)}<text x="1152" y="166" class="tx mig">cap a les màquines</text></g>`;
    // volant
    s += `<g data-part="volant" data-exp="52 34"><g id="volant">${roda(S.x, S.y, 168, { raigs: 6, color: '#56636c', gruix: 22, raig: 9 })}</g></g>`;
    // columna
    s += `<path class="t" fill="url(#g-fustac)" d="M490 600L508 190h24l18 410z"/><path class="t fusta2" d="M440 600h160v-14H440z"/>`;
    // cilindre de doble efecte
    s += `<g data-part="cilindre" data-exp="-44 20"><rect class="t pedra" x="190" y="540" width="120" height="60"/><rect id="cam-d" x="207" y="322" width="86" height="100" fill="#f9c9a0"/><rect id="cam-b" x="207" y="430" width="86" height="100" fill="#eef4f6"/>
      <path d="M195 312V540H305V312H293V530H207V312Z" class="t" fill="url(#g-ferroc)"/><rect class="t" fill="url(#g-ferro)" x="190" y="300" width="120" height="14"/><rect class="t" fill="url(#g-llautoc)" x="240" y="290" width="20" height="12"/></g>`;
    s += `<g data-part="distribucio" data-exp="-66 -18"><rect class="t" fill="url(#g-ferroc)" x="140" y="330" width="40" height="190" rx="6"/><path d="M180 350h16M180 500h16" class="t4"/><path d="M60 300H160V330" class="nf" stroke="#2a2420" stroke-width="15"/><path d="M60 300H160V330" class="nf" stroke="#f0ab68" stroke-width="10"/><path d="M62 300H160V328" class="flux s-blanc" data-flux="2"/><circle id="papallona" cx="110" cy="300" r="6.5" fill="#fbbf24" stroke="#92400e" stroke-width="1.8"/>
      <text x="62" y="282" class="tx-p">vapor de la caldera</text><path d="M160 520V566H100" class="nf" stroke="#2a2420" stroke-width="13"/><path d="M160 520V566H100" class="nf" stroke="#c9d6dc" stroke-width="8"/><rect class="t" x="52" y="540" width="56" height="56" rx="6" fill="#a9d6ee"/><text x="80" y="528" class="tx-p mig">condensador</text>
      <g id="fl-d">${fletxa('M186 350H232', '#d9482b', 6)}${fletxa('M250 330V374', '#d9482b', 5)}</g><g id="fl-b">${fletxa('M186 500H232', '#d9482b', 6)}${fletxa('M250 518V474', '#d9482b', 5)}</g></g>`;
    s += `<g data-part="piston" id="rpiston"><rect class="t" fill="url(#g-ferroh)" x="245" y="-250" width="10" height="250"/><rect class="t" fill="url(#g-ferroc)" x="207" y="-8" width="86" height="16" rx="3"/><rect x="209" y="-2" width="82" height="4" fill="url(#g-llauto)"/></g>`;
    // balancí
    s += `<g data-exp="0 -54"><g data-part="balanci" id="rbiga"><path class="t" fill="url(#g-fustac)" d="M250 158L520 146 790 158V182L520 194 250 182Z"/><circle class="t llauto" cx="250" cy="170" r="9"/><circle class="t llauto" cx="790" cy="170" r="9"/><circle class="t llauto" cx="520" cy="170" r="12"/></g></g>`;
    // biela + planeta + sol
    s += `<g data-part="sol" data-exp="-38 42"><g id="sol">${engranatge(S.x, S.y, 45, 14, { color: '#c79a2c', boto: '#fffdf7' })}</g></g>`;
    s += `<g data-part="biela"><line id="rbiela" x1="790" y1="170" x2="790" y2="380" stroke="#2a2420" stroke-width="17" stroke-linecap="round"/><line id="rbiela2" x1="790" y1="170" x2="790" y2="380" stroke="#b9c3c9" stroke-width="10" stroke-linecap="round"/></g>`;
    s += `<g data-part="planeta" data-exp="38 -38"><g id="planeta">${engranatge(0, 0, 45, 14, { color: '#d9482b', boto: '#fffdf7' })}</g></g>`;
    // regulador amb màniga i tirant cap a la vàlvula del vapor
    s += `<g data-part="regulador" data-exp="60 -22"><path id="tirant" d="M1040 436L520 264L110 292" fill="none" stroke="#d97706" stroke-width="2.6" stroke-dasharray="5 4" opacity=".8"/><rect class="t" fill="url(#g-ferroh)" x="1034" y="300" width="12" height="300"/><path class="t fusta2" d="M990 600h100v-12H990z"/><g id="reg"><line id="reg-a" x1="1040" y1="318" x2="990" y2="390" class="t" stroke-width="5"/><line id="reg-b" x1="1040" y1="318" x2="1090" y2="390" class="t" stroke-width="5"/><circle id="reg-1" class="t" fill="url(#g-llautoc)" cx="990" cy="390" r="19"/><circle id="reg-2" class="t" fill="url(#g-llautoc)" cx="1090" cy="390" r="19"/><rect id="reg-m" class="t llauto" x="1028" y="424" width="24" height="22" rx="4"/></g><circle class="t ferro" cx="1040" cy="316" r="9"/></g>`;
    s += RI.innova(540, 74, 'INNOVACIÓ · doble efecte + sol i planeta + regulador centrífug', { apunta: [790, 470], halo: [790, 470, 94, 94], w: 468 });
    s += persona(380, 600, 150, { color: '#3d5a80', barret: true, attr: 'class="atenua"' });
    return svg(s);
  }
  function animaRot({ p, t, el }) {
    const th = 2 * Math.PI * p - Math.PI / 2, P = { x: S.x + R * Math.cos(th), y: S.y + R * Math.sin(th) };
    let by = P.y - Math.sqrt(LB * LB - Math.pow(P.x - 790, 2));
    const fi = Math.asin((by - O.y) / L), B = { x: O.x + L * Math.cos(fi), y: O.y + L * Math.sin(fi) };
    const psi = Math.atan2(B.x - P.x, P.y - B.y), sol = 2 * th - psi;
    el('rbiga').setAttribute('transform', `rotate(${((fi * 180) / Math.PI).toFixed(2)} ${O.x} ${O.y})`);
    ['rbiela', 'rbiela2'].forEach((id) => { const l = el(id); l.setAttribute('x1', B.x.toFixed(1)); l.setAttribute('y1', B.y.toFixed(1)); l.setAttribute('x2', P.x.toFixed(1)); l.setAttribute('y2', P.y.toFixed(1)); });
    el('planeta').setAttribute('transform', `translate(${P.x.toFixed(1)} ${P.y.toFixed(1)}) rotate(${((psi * 180) / Math.PI + 12.86).toFixed(2)})`);
    el('sol').setAttribute('transform', `rotate(${((sol * 180) / Math.PI).toFixed(2)} ${S.x} ${S.y})`);
    el('volant').setAttribute('transform', `rotate(${((sol * 180) / Math.PI).toFixed(2)} ${S.x} ${S.y})`);
    const yp = 426 - L * Math.sin(fi) + (170 - 170);
    el('rpiston').setAttribute('transform', `translate(0 ${yp.toFixed(1)})`);
    const puja = p < 0.5;
    el('cam-d').setAttribute('height', Math.max(0, yp - 8 - 322).toFixed(1)); el('cam-d').setAttribute('fill', puja ? '#eef4f6' : '#f9c9a0');
    el('cam-b').setAttribute('y', (yp + 8).toFixed(1)); el('cam-b').setAttribute('height', Math.max(0, 530 - yp - 8).toFixed(1)); el('cam-b').setAttribute('fill', puja ? '#f9c9a0' : '#eef4f6');
    el('fl-d').setAttribute('opacity', puja ? 0 : 1); el('fl-b').setAttribute('opacity', puja ? 1 : 0);
    const c = Math.cos(t * 5), ob = 52;
    el('reg-1').setAttribute('cx', (1040 - ob * c).toFixed(1)); el('reg-2').setAttribute('cx', (1040 + ob * c).toFixed(1));
    el('reg-a').setAttribute('x2', (1040 - ob * c).toFixed(1)); el('reg-b').setAttribute('x2', (1040 + ob * c).toFixed(1));
    const ym = 424 - Math.abs(ob * c) * 0.42;
    el('reg-m').setAttribute('y', ym.toFixed(1));
    el('tirant').setAttribute('d', `M1040 ${(ym + 11).toFixed(1)}L520 264L110 296`);
    el('papallona').setAttribute('r', (4.5 + 3 * (1 - Math.abs(c))).toFixed(1));
  }

  RI.capitol({
    id: 'vapor', titol: 'El vapor', llegenda: true,
    escenes: [
      {
        id: 'newcomen', nom: 'Newcomen', any: '1712', qui: 'Thomas Newcomen · Anglaterra', durada: 11,
        model: 'Màquina atmosfèrica de Newcomen · reconstrucció didàctica',
        pregunta: 'Com treus l’aigua d’una mina inundada?',
        intro: 'Les mines de carbó s’omplien d’aigua. Newcomen va construir la primera màquina de vapor útil: una bomba gegant que funcionava <b>fent el buit</b> dins d’un cilindre.',
        svg: () => motor(false), anima: animaMotor(false), innova: [1, 2],
        fases: [
          { fins: 0.34, focus: ['caldera', 'cilindre', 'piston'], nom: 'El vapor omple el cilindre', text: 'S’obre la vàlvula. El vapor de la caldera entra al cilindre mentre el pes de la vareta de la bomba fa pujar el pistó.' },
          { fins: 0.47, focus: ['diposit', 'cilindre'], nom: 'Un raig d’aigua freda', text: 'Es tanca el vapor i s’injecta aigua freda <b>dins del cilindre</b>. El vapor es refreda de cop i es torna aigua: ocupa molt menys espai.' },
          { fins: 0.84, focus: ['piston', 'balanci', 'bombamina'], nom: 'El buit: l’aire empeny el pistó', text: 'Sota el pistó queda gairebé el buit. La pressió de l’aire de fora l’empeny cap avall, el balancí bascula i la vareta puja l’aigua de la mina.' },
          { fins: 1, focus: ['desguas', 'caldera', 'cilindre'], nom: 'Tornar a escalfar-ho tot', text: 'Surt l’aigua condensada. El cilindre ha quedat fred i el vapor nou l’ha de tornar a escalfar: <b>a cada cicle es llença calor</b>, és a dir, carbó.' }
        ],
        parts: {
          caldera: { nom: 'Caldera', text: 'Un dipòsit de coure amb aigua sobre el foc. L’aigua bull i produeix vapor a poca pressió.' },
          cilindre: { nom: 'Cilindre', text: 'Tub vertical obert per dalt. A dins s’hi fa entrar vapor i després es refreda. És on es perd la calor.' },
          piston: { nom: 'Pistó', text: 'Disc que puja i baixa dins del cilindre. Penja del balancí amb una cadena.' },
          balanci: { nom: 'Balancí', text: 'Gran biga de fusta que bascula com un gronxador: quan baixa el pistó, puja la vareta de la bomba.' },
          diposit: { nom: 'Dipòsit d’aigua freda', text: 'Alimenta el raig que refreda el vapor dins del cilindre.' },
          desguas: { nom: 'Desguàs', text: 'Per aquí surt l’aigua que s’ha format en condensar-se el vapor.' },
          bombamina: { nom: 'Bomba de la mina', text: 'La vareta mou una bomba al fons del pou i eleva l’aigua fins a la superfície.' }
        },
        etiquetes: [['caldera', 150, 470, 240, 470], ['cilindre', 465, 380, 388, 360], ['piston', 200, 250, 284, 296], ['balanci', 470, 60, 500, 100], ['diposit', 190, 118, 150, 150, 'Aigua freda'], ['desguas', 130, 420, 176, 430], ['bombamina', 950, 500, 868, 560]],
        explotada: {
          img: 'img/exp-newcomen.webp',
          model: 'Làmina tècnica en vista explotada · Màquina atmosfèrica de Newcomen (1712)',
          guies: '<path class="sil" d="M510 580V245Q510 185 615 185Q720 185 720 245V580"/><path d="M600 220V585M375 445L575 540M795 235L955 270M855 150H890"/><circle cx="615" cy="195" r="4.5"/><circle cx="600" cy="355" r="4.5"/><circle cx="575" cy="540" r="4.5"/><circle cx="890" cy="150" r="4.5"/>',
          zones: [['caldera', 320, 490, 145, 195], ['balanci', 575, 165, 290, 85], ['piston', 600, 310, 75, 48], ['cilindre', 615, 480, 85, 110], ['desguas', 675, 530, 55, 42], ['diposit', 980, 265, 110, 95], ['bombamina', 885, 555, 65, 160]],
          etiquetes: [['balanci', 575, 82, 575, 155], ['caldera', 145, 355, 285, 425], ['piston', 465, 295, 585, 295], ['cilindre', 465, 485, 595, 480], ['desguas', 725, 625, 670, 495], ['diposit', 1035, 145, 985, 255, 'Aigua freda'], ['bombamina', 1020, 560, 885, 555]]
        },
        real: {
          img: 'img/real-newcomen.webp',
          titol: 'Rèplica de la màquina de Newcomen en funcionament',
          museu: 'Black Country Living Museum · Dudley (Regne Unit)',
          lic: 'Foto: Chris Allen · Wikimedia Commons · CC BY-SA 2.0',
          etiquetes: [['balanci', 37, 36, 'Balancí'], ['bombamina', 26, 62, 'Bomba de la mina'], ['caldera', 71, 18, 'Xemeneia de la caldera']]
        },
        clau: 'No és el vapor qui empeny: és l’aire. El vapor només serveix per fer el buit.',
        batx: { titol: 'Una màquina malgastadora, però útil durant dècades', text: 'El rendiment era molt baix i només sortia a compte on el carbó era barat: a la boca de la mina. Tot i això se’n van construir centenars durant el segle XVIII. Una tecnologia imperfecta es pot difondre si resol un problema urgent.', font: 'https://blog.sciencemuseum.org.uk/a-new-age/', fontNom: 'Science Museum · A new age' }
      },
      {
        id: 'watt', nom: 'El condensador de Watt', any: '1769', qui: 'James Watt · Escòcia', durada: 10,
        model: 'Màquina de Watt d’efecte simple amb condensador separat · reconstrucció didàctica',
        pregunta: 'I si el cilindre no s’hagués de refredar mai?',
        intro: 'Watt reparava una maqueta de Newcomen i va veure el problema: es refredava i s’escalfava el mateix cilindre. La solució: <b>refredar el vapor en un altre lloc</b>.',
        svg: () => motor(true), anima: animaMotor(true), innova: [0],
        fases: [
          { fins: 0.5, focus: ['caldera', 'tub', 'cilindre', 'condensador', 'piston'], nom: 'Vapor a dalt, buit a baix', text: 'El vapor entra per sobre del pistó. El que hi havia a sota s’escapa cap al <b>condensador</b>, que és fred: allà es torna aigua i fa el buit. El pistó baixa amb força.' },
          { fins: 0.55, focus: ['equilibri', 'cilindre'], nom: 'Canvi de vàlvules', text: 'Es tanquen l’entrada de vapor i la sortida al condensador. S’obre la vàlvula que comunica la part de dalt i la de baix del cilindre.' },
          { fins: 1, focus: ['equilibri', 'piston', 'balanci', 'bomba', 'bombamina'], nom: 'El pistó torna a pujar', text: 'Amb la mateixa pressió a dalt i a baix, el pes de la vareta fa pujar el pistó. El vapor passa a sota, preparat per al cicle següent. El cilindre <b>no s’ha refredat</b>.' }
        ],
        parts: {
          caldera: { nom: 'Caldera', text: 'Ara és a part del cilindre. Produeix el vapor que empeny el pistó.' },
          tub: { nom: 'Tub de vapor', text: 'Porta el vapor de la caldera a la part superior del cilindre.' },
          camisa: { nom: 'Camisa de vapor', text: 'Una segona paret plena de vapor envolta el cilindre i el manté sempre calent.' },
          cilindre: { nom: 'Cilindre tancat', text: 'Està tapat per dalt: ja no hi entra aire fred. El pistó l’empeny el vapor, no l’atmosfera.' },
          piston: { nom: 'Pistó', text: 'Baixa quan té vapor a sobre i buit a sota.' },
          equilibri: { nom: 'Tub d’equilibri', text: 'Comunica les dues bandes del pistó perquè pugui tornar a pujar.' },
          condensador: { nom: 'Condensador separat', text: 'La gran idea de Watt: un recipient submergit en aigua freda on el vapor usat es converteix en aigua. El fred es queda aquí, lluny del cilindre.' },
          bomba: { nom: 'Bomba d’aire', text: 'Treu l’aigua i l’aire del condensador perquè s’hi mantingui el buit. La mou el mateix balancí.' },
          balanci: { nom: 'Balancí', text: 'Transmet el moviment del pistó a la bomba de la mina.' },
          bombamina: { nom: 'Bomba de la mina', text: 'Fa la mateixa feina que amb Newcomen, però gastant molt menys carbó.' }
        },
        etiquetes: [['caldera', 170, 622, 180, 520], ['tub', 130, 230, 180, 300], ['camisa', 200, 330, 260, 330], ['cilindre', 330, 180, 330, 214, 'Cilindre tancat'], ['equilibri', 500, 320, 424, 340], ['condensador', 392, 622, 458, 520], ['bomba', 576, 622, 512, 530], ['balanci', 470, 60, 500, 100], ['bombamina', 950, 500, 868, 560]],
        explotada: {
          img: 'img/exp-watt.webp',
          model: 'Làmina tècnica en vista explotada · Màquina de Watt amb condensador separat (1769)',
          guies: '<path class="sil" d="M770 205L800 135L830 205"/><path d="M525 435H580M695 435H645M600 135V280M260 220L535 265M968 382V450M1075 340V405M965 595V680"/><circle cx="600" cy="280" r="4.5"/><circle cx="580" cy="435" r="4.5"/><circle cx="645" cy="435" r="4.5"/><circle cx="965" cy="680" r="4.5"/>',
          zones: [['caldera', 225, 465, 155, 235], ['camisa', 468, 435, 65, 105], ['cilindre', 605, 425, 75, 175], ['equilibri', 755, 455, 85, 95], ['condensador', 965, 505, 75, 105], ['bomba', 1075, 480, 55, 115], ['balanci', 790, 170, 290, 85]],
          etiquetes: [['caldera', 130, 170, 225, 345], ['balanci', 540, 72, 675, 108], ['cilindre', 455, 200, 585, 340, 'Cilindre tancat'], ['camisa', 360, 440, 482, 440], ['equilibri', 725, 345, 725, 420], ['condensador', 805, 675, 945, 515], ['bomba', 1065, 305, 1065, 445]]
        },
        real: {
          img: 'img/real-watt.webp',
          titol: 'El primer condensador separat de James Watt (c. 1765)',
          museu: 'Peça original conservada al Regne Unit',
          lic: 'Foto: Mirko Junge · Wikimedia Commons · CC BY 3.0',
          etiquetes: [['condensador', 50, 45, 'Condensador separat']]
        },
        clau: 'La mateixa feina amb fins a un 75 % menys de carbó: el fred i la calor ja no es barallen dins del mateix cilindre.',
        batx: { titol: 'De la idea (1765) a la fàbrica (1776)', text: 'Watt té la idea el 1765, la patenta el 1769 i no ven màquines fins al 1776, associat amb l’empresari Matthew Boulton. Calien capital, obrers hàbils i cilindres ben foradats (Wilkinson). Invent i innovació no són el mateix moment.', font: 'https://blog.sciencemuseum.org.uk/james-watt-and-the-separate-condenser/', fontNom: 'Science Museum · Watt i el condensador separat' }
      },
      {
        id: 'rotativa', nom: 'Del vaivé al gir', any: '1781 – 1788', qui: 'Boulton & Watt · Birmingham', durada: 6,
        model: 'Màquina rotativa de Watt amb engranatge de sol i planeta · reconstrucció didàctica',
        pregunta: 'Com fas girar una fàbrica amb un pistó que només puja i baixa?',
        intro: 'Una bomba només necessita pujar i baixar. Però un teler o una filadora necessiten <b>un eix que giri</b>. Watt va afegir quatre invents a la seva màquina.',
        svg: rotativa, anima: animaRot, innova: [0, 1],
        fases: [
          { fins: 0.5, focus: ['distribucio', 'cilindre', 'balanci', 'biela', 'planeta', 'sol'], nom: 'El vapor empeny per sota', text: 'La distribució envia vapor sota el pistó i el fa pujar. L’altre extrem del balancí baixa i la biela arrossega l’engranatge «planeta».' },
          { fins: 1, focus: ['distribucio', 'cilindre', 'planeta', 'sol', 'volant', 'regulador'], nom: 'El vapor empeny per dalt', text: 'Ara el vapor entra per sobre: el pistó fa força <b>en els dos sentits</b> (doble efecte). El planeta acaba la volta al voltant del «sol» i el volant no para de girar.' }
        ],
        parts: {
          cilindre: { nom: 'Cilindre de doble efecte', text: 'El vapor empeny el pistó cap amunt i cap avall. La màquina fa el doble de feina amb el mateix cilindre.' },
          piston: { nom: 'Pistó', text: 'Va unit al balancí amb una tija rígida: ha d’empènyer i estirar.' },
          distribucio: { nom: 'Distribució', text: 'Joc de vàlvules que envia el vapor ara a dalt, ara a baix, i deixa sortir el vapor usat cap al condensador.' },
          balanci: { nom: 'Balancí', text: 'Transmet el moviment del pistó a la biela.' },
          biela: { nom: 'Biela', text: 'Barra que penja del balancí. Porta fixat l’engranatge planeta.' },
          planeta: { nom: 'Engranatge planeta', text: 'No gira sobre si mateix: dona voltes al voltant del sol, empès per la biela.' },
          sol: { nom: 'Engranatge sol', text: 'Va fixat a l’eix. El planeta l’obliga a girar: dues voltes per cada anada i tornada del pistó.' },
          volant: { nom: 'Volant d’inèrcia', text: 'Roda molt pesant que guarda moviment i fa que el gir sigui regular, sense estrebades.' },
          regulador: { nom: 'Regulador de boles', text: 'Si la màquina s’accelera, les boles s’obren i tanquen el pas de vapor; si s’alenteix, es tanquen i l’obren. Controla la velocitat tot sol.' },
          corretja: { nom: 'Corretja i eix', text: 'Porten el gir fins a les màquines de la fàbrica.' }
        },
        etiquetes: [['cilindre', 330, 250, 300, 318, 'Cilindre de doble efecte'], ['distribucio', 80, 440, 142, 430], ['balanci', 420, 110, 440, 152], ['biela', 880, 250, 796, 280], ['planeta', 886, 354, 790, 380, 'Planeta', 'planeta@0,0'], ['sol', 650, 520, 770, 480, 'Sol'], ['volant', 690, 680, 720, 620, 'Volant d’inèrcia'], ['regulador', 1080, 460, 1046, 420], ['corretja', 1000, 220, 990, 190]],
        explotada: {
          img: 'img/exp-rotativa.webp',
          model: 'Làmina tècnica en vista explotada · Màquina rotativa de Boulton & Watt (1788)',
          guies: '<path d="M555 415L845 555M910 345L855 540M445 555V610M295 520L385 485"/><circle cx="625" cy="448" r="4.5"/><circle cx="845" cy="555" r="4.5"/><circle cx="445" cy="610" r="4.5"/>',
          zones: [['distribucio', 245, 545, 125, 115], ['cilindre', 445, 475, 95, 125], ['balanci', 595, 145, 195, 75], ['biela', 765, 325, 45, 140], ['sol', 615, 455, 75, 75], ['planeta', 685, 515, 75, 75], ['volant', 885, 545, 145, 195], ['regulador', 910, 240, 85, 105]],
          etiquetes: [['distribucio', 145, 415, 240, 535], ['cilindre', 295, 325, 470, 455, 'Cilindre de doble efecte'], ['balanci', 395, 105, 550, 125], ['biela', 725, 210, 765, 295], ['sol', 540, 345, 610, 445, 'Sol'], ['planeta', 545, 650, 690, 455, 'Planeta'], ['regulador', 1040, 165, 915, 235], ['volant', 1055, 690, 955, 565, 'Volant d’inèrcia']]
        },
        real: {
          img: 'img/real-rotativa.webp',
          titol: 'Engranatge de sol i planeta d’una màquina de Boulton & Watt',
          museu: 'Science Museum · Londres',
          lic: 'Foto: Geni · Wikimedia Commons · CC BY-SA 4.0',
          etiquetes: [['biela', 42, 28, 'Biela'], ['sol', 52, 72, 'Sol i planeta']]
        },
        clau: 'Quan el vapor fa girar un eix, la fàbrica ja no ha d’estar al costat d’un riu.',
        batx: { titol: 'Per què «sol i planeta» i no una simple manovella?', text: 'La manovella estava protegida per una patent d’un competidor (James Pickard, 1780). Boulton & Watt la van esquivar amb aquest engranatge fins que la patent va caducar. Les patents condicionen el camí de la tècnica.', font: 'https://collection.sciencemuseumgroup.org.uk/objects/co50948/rotative-steam-engine-by-boulton-and-watt-1788', fontNom: 'Science Museum Group · Màquina rotativa de 1788' }
      }
    ],
    repte: [
      { q: 'En la màquina de Newcomen, què empeny el pistó cap avall?', o: ['La força del vapor calent', 'La pressió de l’aire de fora', 'El pes del balancí'], c: 1, e: 'El vapor es condensa, queda el buit i és l’atmosfera qui empeny el pistó.' },
      { q: 'Per què gastava tant carbó la màquina de Newcomen?', o: ['Perquè la caldera era massa petita', 'Perquè el cilindre es refredava i s’havia de reescalfar a cada cicle', 'Perquè la mina era molt fonda'], c: 1, e: 'L’aigua freda s’injectava dins del mateix cilindre i cada vegada calia tornar-lo a escalfar.' },
      { q: 'Quina és la gran idea de Watt?', o: ['Condensar el vapor en un recipient separat', 'Fer la caldera més gran', 'Canviar el carbó per llenya'], c: 0, e: 'Amb el condensador separat, el cilindre es manté sempre calent i s’estalvia molt combustible.' },
      { q: 'Per a què serveix l’engranatge de sol i planeta?', o: ['Per refredar el vapor', 'Per convertir el vaivé del pistó en gir', 'Per pujar l’aigua de la mina'], c: 1, e: 'Transforma el moviment d’anada i tornada en la rotació d’un eix que pot moure màquines.' },
      { q: 'Què fa el volant d’inèrcia?', o: ['Produeix vapor', 'Regula el pas de l’aigua', 'Fa que el gir sigui regular'], c: 2, e: 'És una roda pesant que acumula moviment i suavitza les estrebades del pistó.' },
      { tipus: 'toca', esc: 'watt', part: 'condensador', p: 0.25, q: 'Toca la peça que va inventar Watt per estalviar carbó.', e: 'El condensador separat: el vapor es refreda allà i el cilindre es manté sempre calent.' },
      { tipus: 'ordena', esc: 'newcomen', q: 'Ordena el cicle de la màquina de Newcomen.', e: 'Vapor → aigua freda → buit → tornar a escalfar: a cada volta es llença calor.' },
      { q: 'Què va permetre la màquina rotativa a les fàbriques?', o: ['Instal·lar-se lluny dels rius', 'Funcionar sense treballadors', 'No necessitar carbó'], c: 0, e: 'Abans depenien de la roda hidràulica; amb el vapor es podien construir a les ciutats i prop del carbó.' }
    ]
  });
})();
