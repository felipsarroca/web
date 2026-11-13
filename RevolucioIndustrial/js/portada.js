// SPDX-License-Identifier: AGPL-3.0-or-later
/* Portada: un paisatge de la industrialització on cada lloc porta a un capítol. */
(function () {
  const { roda, foc, nuvol, persona } = RI;
  const C = RI.CAPITOLS;
  const pin = (i, x, y) => `<g class="pin" transform="translate(${x} ${y})"><path d="M0 0v34" stroke="#2a2420" stroke-width="3" stroke-dasharray="2 5" stroke-linecap="round"/><rect x="-14" y="-17" width="${C[i].nom.length * 9.4 + 54}" height="34" rx="17" fill="#fffdf7" stroke="#2a2420" stroke-width="3"/><circle cx="3" cy="0" r="13" fill="${C[i].color}"/><text x="3" y="5.5" text-anchor="middle" class="pin-n">${i + 1}</text><text x="24" y="5.5" class="pin-t">${C[i].nom}</text></g>`;
  const fum = (x, y, n, cls) => Array.from({ length: n || 3 }, (_, i) => `<circle class="fumet ${cls || ''}" cx="${x}" cy="${y}" r="9" style="animation-delay:${-i * 1.3}s"/>`).join('');
  const finestres = (x, y, cols, files, dx, dy) => { let s = ''; for (let r = 0; r < files; r++) for (let c = 0; c < cols; c++) s += `<rect x="${x + c * dx}" y="${y + r * dy}" width="12" height="16" fill="#ffe9a8" stroke="#2a2420" stroke-width="1.6"/>`; return s; };
  const lloc = (i, inner) => `<a class="lloc" href="${C[i].id}.html" aria-label="${i + 1}. ${C[i].nom}: ${C[i].pregunta}">${inner}</a>`;

  function paisatge() {
    let s = `<rect class="cel" width="1600" height="400"/><circle cx="1320" cy="90" r="46" fill="#ffe08a" opacity=".9"/>${nuvol(180, 90, 1.6)}${nuvol(700, 60, 1.3)}${nuvol(1080, 120, 1.1)}`;
    s += `<path d="M0 300Q200 200 420 280T860 250T1300 290L1600 270V520H0Z" fill="#b7d08a"/><path d="M0 340Q260 290 520 330T1000 320T1260 340V520H0Z" fill="#8fb85a"/>`;
    s += `<path d="M1230 345Q1300 330 1600 336V520H1180Q1250 430 1230 345Z" fill="url(#g-aigua)"/><path d="M1260 380q14-8 28 0t28 0 28 0M1380 440q14-8 28 0t28 0 28 0M1300 480q14-8 28 0t28 0" stroke="#fff" stroke-width="2.5" fill="none"/>`;
    s += `<path d="M700 330Q760 380 900 396T1200 420L1230 500H1180Q1100 430 880 420T660 340Z" fill="#6fb9e0" opacity=".9"/>`;
    // 1 camp
    s += lloc(0, `<polygon points="30,330 90,262 150,262 110,330" fill="#e6b93c" stroke="#2a2420" stroke-width="2.5"/><polygon points="110,330 150,262 210,262 190,330" fill="#9a7a52" stroke="#2a2420" stroke-width="2.5"/><polygon points="190,330 210,262 268,262 270,330" fill="#d9c77a" stroke="#2a2420" stroke-width="2.5"/><polygon points="90,262 126,220 262,220 268,262" fill="#7fb85a" stroke="#2a2420" stroke-width="2.5"/>
      <path d="M48 320l24-28M70 320l24-28M92 320l24-28M210 320l8-48M236 320l8-48" stroke="#a8791c" stroke-width="2"/><ellipse cx="170" cy="240" rx="11" ry="7" fill="#fff" stroke="#2a2420" stroke-width="2"/><ellipse cx="210" cy="246" rx="11" ry="7" fill="#fff" stroke="#2a2420" stroke-width="2"/><circle cx="181" cy="237" r="4" fill="#2a2420"/><circle cx="221" cy="243" r="4" fill="#2a2420"/>${pin(0, 96, 176)}`);
    // 2 vapor (mina amb màquina de balancí)
    s += lloc(1, `<rect x="330" y="232" width="70" height="100" fill="url(#p-mao)" stroke="#2a2420" stroke-width="3"/><path d="M322 236l43-34 43 34z" fill="#a8452f" stroke="#2a2420" stroke-width="3"/><rect x="304" y="190" width="16" height="142" fill="url(#p-mao)" stroke="#2a2420" stroke-width="3"/>${fum(312, 180, 3)}
      <g class="balanci" style="transform-origin:400px 232px"><rect x="350" y="226" width="110" height="11" rx="4" fill="#c7935c" stroke="#2a2420" stroke-width="3"/></g><path d="M455 236v96M440 332l15-70 15 70" stroke="#2a2420" stroke-width="4" fill="none"/><rect x="436" y="328" width="40" height="10" fill="#3d454b"/>${pin(1, 330, 150)}`);
    // 3 cotó
    s += lloc(2, `<path d="M500 332V268l30-18v18l30-18v18l30-18v82z" fill="#efe3c6" stroke="#2a2420" stroke-width="3"/><path d="M500 268l30-18v18l30-18v18l30-18" fill="none" stroke="#b9722a" stroke-width="6"/><rect x="528" y="288" width="34" height="44" rx="4" fill="#fbf3dc" stroke="#2a2420" stroke-width="2.5"/><path d="M528 298h34M528 308h34M528 318h34" stroke="#b9722a" stroke-width="3"/><rect x="522" y="282" width="46" height="7" fill="#8f6038" stroke="#2a2420" stroke-width="2"/>${pin(2, 520, 212)}`);
    // 4 fàbrica
    s += lloc(3, `<rect x="786" y="150" width="20" height="182" fill="url(#p-mao)" stroke="#2a2420" stroke-width="3"/>${fum(796, 140, 4)}<rect x="660" y="190" width="130" height="146" fill="url(#p-mao)" stroke="#2a2420" stroke-width="3"/><path d="M652 194l73-30 73 30z" fill="#a8452f" stroke="#2a2420" stroke-width="3"/>${finestres(672, 204, 5, 4, 24, 32)}
      <g class="gira-mig" style="transform-origin:652px 330px">${roda(652, 330, 32, { raigs: 8, color: '#a67547', gruix: 7 })}</g>${pin(3, 668, 126)}`);
    // 5 ferro i acer
    s += lloc(4, `<path d="M880 336l22-128h56l22 128z" fill="url(#p-mao)" stroke="#2a2420" stroke-width="3"/><path d="M908 336l6-40h32l6 40z" fill="url(#g-roent)" stroke="#2a2420" stroke-width="2.5"/>${foc(930, 208, 34, 50)}${fum(930, 150, 3, 'fosc')}<path d="M990 336q20-30 46 0z" fill="#3d454b" stroke="#2a2420" stroke-width="2.5"/>${pin(4, 890, 166)}`);
    // 8 capital
    s += lloc(7, `<rect x="1070" y="262" width="26" height="74" fill="#efe3c6" stroke="#2a2420" stroke-width="2.5"/><path d="M1066 264l17-16 17 16z" fill="#a8452f" stroke="#2a2420" stroke-width="2.5"/><path d="M1100 262l54-30 54 30z" fill="#e9dfc8" stroke="#2a2420" stroke-width="3"/><rect x="1104" y="262" width="100" height="10" fill="#e9dfc8" stroke="#2a2420" stroke-width="2.5"/>${[1112, 1134, 1156, 1178].map((x) => `<rect x="${x}" y="272" width="12" height="54" fill="#fffdf7" stroke="#2a2420" stroke-width="2.5"/>`).join('')}<rect x="1098" y="326" width="112" height="10" fill="#e9dfc8" stroke="#2a2420" stroke-width="2.5"/><circle cx="1154" cy="250" r="7" fill="#f2b632" stroke="#2a2420" stroke-width="2"/>${pin(7, 1090, 200)}`);
    // 7 vaixell
    s += lloc(6, `<g class="oneja"><path d="M1340 400h190l-22 40h-146z" fill="#3d454b" stroke="#2a2420" stroke-width="3"/><rect x="1336" y="394" width="198" height="8" rx="3" fill="#c7935c" stroke="#2a2420" stroke-width="2.5"/><rect x="1410" y="340" width="18" height="54" fill="#2a2420"/><rect x="1409" y="340" width="20" height="10" fill="#d9482b"/>${fum(1419, 330, 4, 'fosc')}<path d="M1370 394v-70M1492 394v-60" stroke="#8f6038" stroke-width="5"/><path d="M1374 330l40 12v40l-40 4z" fill="#fffdf7" stroke="#2a2420" stroke-width="2.5"/>
      <g class="gira-mig" style="transform-origin:1452px 412px">${roda(1452, 412, 30, { raigs: 8, color: '#a8452f', gruix: 6 })}</g><path d="M1418 396a34 34 0 0 1 68 0" fill="none" stroke="#2a2420" stroke-width="4"/></g>${pin(6, 1340, 286)}`);
    // via i 6 tren
    s += `<path d="M0 452H1240" stroke="#8a7a6a" stroke-width="20"/><path d="M0 444H1240" stroke="#2a2420" stroke-width="5"/><path d="M6 452H1240" stroke="#2a2420" stroke-width="12" stroke-dasharray="6 20"/>`;
    s += lloc(5, `<rect x="0" y="380" width="1240" height="80" fill="transparent"/><g class="tren-p">${fum(170, 372, 3)}<rect x="96" y="404" width="64" height="28" rx="7" fill="#f2c230" stroke="#2a2420" stroke-width="3"/><path d="M146 404v-30h14v30z" fill="#fffdf7" stroke="#2a2420" stroke-width="3"/><rect x="60" y="412" width="30" height="20" rx="6" fill="#c7935c" stroke="#2a2420" stroke-width="3"/>
      ${[-20, -90, -160].map((x) => `<rect x="${x}" y="406" width="62" height="26" rx="4" fill="#2f7fb5" stroke="#2a2420" stroke-width="3"/><rect x="${x + 8}" y="412" width="12" height="10" fill="#d6ecf3"/><rect x="${x + 26}" y="412" width="12" height="10" fill="#d6ecf3"/><rect x="${x + 44}" y="412" width="12" height="10" fill="#d6ecf3"/><circle cx="${x + 14}" cy="436" r="8" fill="#3d454b" stroke="#2a2420" stroke-width="2.5"/><circle cx="${x + 48}" cy="436" r="8" fill="#3d454b" stroke="#2a2420" stroke-width="2.5"/>`).join('')}
      <circle cx="74" cy="436" r="8" fill="#3d454b" stroke="#2a2420" stroke-width="2.5"/><circle cx="112" cy="434" r="10" fill="#f2c230" stroke="#2a2420" stroke-width="3"/><circle cx="142" cy="430" r="14" fill="#f2c230" stroke="#2a2420" stroke-width="3"/></g>${pin(5, 560, 372)}`);
    s += `<path d="M0 470H1250L1180 520H0Z" fill="#6f9c43"/>`;
    return `<svg class="esc paisatge" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Paisatge de la Revolució Industrial amb vuit llocs que porten als capítols">${RI.DEFS}${s}</svg>`;
  }

  RI.portada = function () {
    document.querySelector('#app').innerHTML = `
    <header class="cap">${RI.marca()}<p class="lema">Entra dins les màquines. Atura el temps. Mira com funcionen.</p>${RI.eines()}</header>
    <main class="portada">
      <section class="vista"><div class="vista-text"><h1>La Revolució Industrial <em>per dins</em></h1><p>Vuit capítols i vint-i-sis màquines i processos animats. Tria un lloc del paisatge o un capítol.</p></div>${paisatge()}</section>
      <nav class="targetes" aria-label="Capítols">${C.map((c, i) => `<a href="${c.id}.html" class="targeta-cap" style="--c:${c.color}"><span class="n">${i + 1}</span><span class="ic">${RI.icona(c, 26)}</span><strong>${c.nom}</strong><span class="q">${c.pregunta}</span><small>${c.epoca}</small></a>`).join('')}</nav>
    </main>${RI.peu()}`;
    RI.activaEines();
  };
})();
