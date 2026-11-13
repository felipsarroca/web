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
    s += `<text x="300" y="76" class="tx-g mig">Fil que es fabrica</text><text x="300" y="100" class="tx-p mig">filar</text><text x="900" y="76" class="tx-g mig">Fil que demanen els telers</text><text x="900" y="100" class="tx-p mig">teixir</text>`;
    s += RI.innova(600, 26, 'INNOVACIÓ EN CADENA · accelerar una fase obliga a innovar l’altra', { w: 485 });
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

  /* Helicoïde visual de torsió al llarg d'un filament entre (x1,y1) i (x2,y2) */
  function onaFil(x1, y1, x2, y2, fase, amp, freq) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len, n = Math.max(6, Math.round(len / 14));
    let d = `M${x1.toFixed(1)} ${y1.toFixed(1)}`;
    for (let i = 1; i <= n; i++) {
      const u = i / n, env = Math.sin(u * Math.PI);
      const off = Math.sin(u * len * freq - fase) * amp * Math.min(1, env * 2.5);
      d += `L${(x1 + dx * u + nx * off).toFixed(1)} ${(y1 + dy * u + ny * off).toFixed(1)}`;
    }
    return d;
  }

  /* ---------- 2 · teler i llançadora volant (3D + secció + planta) ---------- */
  function teler() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA 3D === */
    s += `<g data-vista="3d">`;
    s += `<ellipse cx="600" cy="618" rx="445" ry="36" fill="#5e4931" opacity=".12"/>`;
    s += `<g data-guia="1"><path d="M350 220L295 190M850 220L795 190M600 132V60M300 265H210M900 265H990M310 515L350 567M890 515L930 567M600 585V623"/></g>`;

    /* Bastiment fix de roure */
    s += `<g><path class="t" fill="url(#g-fustac)" d="M346 132h24v350h-24zM830 132h24v350h-24z"/>
      <path class="t fusta2" d="M346 250h508v20H346zM346 420l-68 78h24l68-78zM854 420l68 78h-24l-68-78z"/>
      <path class="t" fill="url(#g-fustac)" d="M276 112h28v475h-28zM896 112h28v475h-28zM268 106h664v26H268z"/>
      <path class="t fusta2" d="M294 132l54 22v18l-54-22zM906 132l-54 22v18l54-22zM276 540h648v24H276z"/>
      <circle cx="290" cy="119" r="3.5" fill="#3a2412"/><circle cx="910" cy="119" r="3.5" fill="#3a2412"/><circle cx="290" cy="552" r="3.5" fill="#3a2412"/><circle cx="910" cy="552" r="3.5" fill="#3a2412"/></g>`;

    /* Plegador d'ordit posterior + banda de calada visible */
    s += `<g data-part="ordit" data-exp="-55 -30">
      <rect class="t" fill="url(#g-fustac)" x="356" y="198" width="488" height="36" rx="14"/>
      <rect class="t1" fill="url(#g-cotocrem)" x="380" y="195" width="440" height="42" rx="8"/>
      <path d="M405 196v40M445 196v40M485 196v40M525 196v40M565 196v40M605 196v40M645 196v40M685 196v40M725 196v40M765 196v40M800 196v40" stroke="#bba987" stroke-width="1.3" opacity=".7"/>
      <circle class="t ferro2" cx="356" cy="216" r="17"/><circle cx="356" cy="216" r="6" fill="#2a2420"/>
      <polygon id="t3-tunel" points="325,308 875,308 875,368 325,368" fill="#fde68a" opacity=".32"/>
      <path id="t3-fa" d="" fill="none" stroke="#22354a" stroke-width="2.5"/>
      <path id="t3-fb" d="" fill="none" stroke="#b97b2c" stroke-width="2.3"/>
    </g>`;

    /* Llissos (marcs) */
    s += `<g data-part="ordit" data-exp="0 -56">
      <g id="t3-m1"><rect class="t" fill="#314b66" x="378" y="232" width="444" height="10" rx="3"/><rect class="t" fill="#314b66" x="378" y="330" width="444" height="10" rx="3"/><path d="${Array.from({ length: 18 }, (_, i) => `M${396 + i * 24} 242v88`).join('')}" stroke="#314b66" stroke-width="1.3" opacity=".75"/></g>
      <g id="t3-m2"><rect class="t" fill="#b97b2c" x="370" y="248" width="460" height="10" rx="3"/><rect class="t" fill="#b97b2c" x="370" y="346" width="460" height="10" rx="3"/><path d="${Array.from({ length: 18 }, (_, i) => `M${388 + i * 25} 258v88`).join('')}" stroke="#b97b2c" stroke-width="1.3" opacity=".75"/></g>
    </g>`;

    /* Càlculs (pedals) */
    s += `<g data-part="ordit" data-exp="0 38">
      <path id="t3-ped1" class="t" fill="#314b66" d="M510 562h52l14 36h-72z"/>
      <path id="t3-ped2" class="t" fill="#b97b2c" d="M638 562h52l14 36h-72z"/>
      <path d="M536 340v222M664 356v206" stroke="#7c5b37" stroke-width="1.6" stroke-dasharray="4 3" opacity=".7"/>
    </g>`;

    /* Batà oscil·lant amb pinta, pista, caixes laterals, cordill i llançadora */
    s += `<g id="t3-bata">
      <g data-part="pinta" data-exp="0 -72">
        <path class="t" fill="url(#g-fustac)" d="M312 126h18v242h-18zM870 126h18v242h-18z"/>
        <circle class="t llauto" cx="321" cy="128" r="6"/><circle class="t llauto" cx="879" cy="128" r="6"/>
        <rect class="t" fill="url(#g-fustac)" x="172" y="348" width="856" height="22" rx="4"/>
        <rect class="t2 fusta3" x="280" y="308" width="640" height="14" rx="3"/>
        <path d="${Array.from({ length: 40 }, (_, i) => `M${292 + i * 16} 322v26`).join('')}" stroke="#3e3934" stroke-width="1.4" opacity=".8"/>
      </g>
      <g data-part="caixes" data-exp="-58 14">
        <rect class="t fusta" x="124" y="306" width="122" height="70" rx="6"/><rect fill="#3a2a1c" x="136" y="318" width="110" height="40" rx="3"/>
        <rect id="t3-tacoL" fill="#a0522d" stroke="#2a2420" stroke-width="2.2" x="140" y="316" width="20" height="44" rx="3"/><path d="M150 316V300" stroke="#4c3926" stroke-width="3"/>
        <text x="185" y="396" class="tx-p mig" style="font-size:13px;font-weight:800">taco</text>
        <circle id="t3-copL" cx="196" cy="338" r="18" fill="#d9482b" opacity="0"/>
      </g>
      <g data-part="caixes" data-exp="58 14">
        <rect class="t fusta" x="954" y="306" width="122" height="70" rx="6"/><rect fill="#3a2a1c" x="954" y="318" width="110" height="40" rx="3"/>
        <rect id="t3-tacoR" fill="#a0522d" stroke="#2a2420" stroke-width="2.2" x="1040" y="316" width="20" height="44" rx="3"/><path d="M1050 316V300" stroke="#4c3926" stroke-width="3"/>
        <text x="1015" y="396" class="tx-p mig" style="font-size:13px;font-weight:800">taco</text>
        <circle id="t3-copR" cx="1004" cy="338" r="18" fill="#d9482b" opacity="0"/>
      </g>
      <g data-exp="0 -26"><g id="t3-llan" data-part="llancadora">
        <path class="t" fill="#7d4c23" d="M-46 0q22-14 46-14t46 14q-22 14-46 14t-46-14z"/>
        <path fill="#b7bfc4" stroke="#2a2420" stroke-width="1.4" d="M-46 0l12-6v12zM46 0l-12-6v12z"/>
        <ellipse cx="0" cy="0" rx="22" ry="7" fill="#3a2310"/>
        <ellipse cx="0" cy="0" rx="17" ry="5" fill="#d9482b" stroke="#fff3d2" stroke-width=".9"/>
        <circle cx="-18" cy="11" r="3" fill="#c9952a"/><circle cx="18" cy="11" r="3" fill="#c9952a"/>
      </g></g>
      <g data-part="cordill" data-exp="0 46">
        <path id="t3-cord" d="M150 300L600 412L1050 300" class="nf" stroke="#4c3926" stroke-width="2.4" stroke-dasharray="5 3"/>
        <g id="t3-manec"><rect class="t" fill="url(#g-fustac)" x="-9" y="-14" width="18" height="44" rx="7"/><circle class="t llauto" cx="0" cy="-6" r="5"/>
          <path d="M10 18q22 18 32 48" stroke="#c68d67" stroke-width="12" stroke-linecap="round" fill="none" opacity=".88"/>
          <circle cx="8" cy="14" r="9" fill="#e5b38c" stroke="#2a2420" stroke-width="1.6"/>
        </g>
      </g>
    </g>`;

    /* Fil de trama independent del batà per quedar travat a la vora de la tela */
    s += `<path id="t3-trama" d="M236 338H236" class="nf" stroke="#d9482b" stroke-width="4.6" stroke-linecap="round"/>`;

    /* Tela frontal + fila acabada de travar */
    s += `<g data-part="tela" data-exp="40 52">
      <path class="t" fill="#eddcb1" d="M312 436h576l28 66H284z"/>
      <path d="${Array.from({ length: 7 }, (_, i) => `M${308 - i * 3} ${444 + i * 8}H${892 + i * 3}`).join('')}" stroke="#c96b27" stroke-width="2.1" opacity=".85"/>
      <path d="${Array.from({ length: 28 }, (_, i) => `M${322 + i * 20.5} 436l${(i - 13.5) * 1.1} 66`).join('')}" stroke="#4e3d28" stroke-width="1" opacity=".4"/>
      <line id="t3-fila-lock" x1="312" y1="436" x2="888" y2="436" stroke="#d9482b" stroke-width="4.6" stroke-linecap="round" opacity="0"/>
      <rect class="t" fill="url(#g-fustac)" x="268" y="492" width="664" height="26" rx="10"/>
      <rect class="t" fill="url(#g-fustac)" x="290" y="534" width="620" height="36" rx="14"/>
      <rect class="t1" fill="#e6d09c" x="314" y="530" width="572" height="44" rx="8"/>
      <circle class="t ferro2" cx="912" cy="552" r="18"/>
    </g>`;
    s += `<g data-fase="0.17-0.36,0.67-0.86">${retol(790, 46, 'una estirada de cordill fa volar la llançadora!', { fons: '#d9482b', w: 380 })}</g>`;
    s += RI.innova(225, 58, 'INNOVACIÓ · caixes + cordill: 1 sol teixidor fa teles amples', { apunta: [185, 306], halo: [185, 341, 78, 50], w: 405 });
    s += `</g>`;

    /* === VISTA 2: SECCIÓ LATERAL (OBERTURA DE LA CALADA I PICADA) === */
    s += `<g data-vista="tall">`;
    s += `<g data-guia="1"><path d="M180 350V170M470 290V170M525 430V515M670 300V170M980 420V525"/></g>`;
    s += `<path class="t" fill="url(#g-fustac)" d="M160 130h28v470h-28zM980 130h28v470h-28zM150 116h868v26H150zM160 564h848v24H160z"/>`;
    /* Plegador d'ordit, creueria i triangle brillant de la calada */
    s += `<g data-part="ordit" data-exp="-55 0"><circle class="t" fill="url(#g-fustac)" cx="195" cy="360" r="56"/><circle class="t1" fill="url(#g-cotocrem)" cx="195" cy="360" r="46"/><circle class="t ferro2" cx="195" cy="360" r="12"/><circle class="t fusta2" cx="310" cy="342" r="10"/><circle class="t fusta2" cx="350" cy="378" r="10"/>
      <polygon id="tt-cal" points="350,360 466,308 776,360 526,412" fill="#fde047" opacity=".36"/>
      <path id="tt-fa" d="" fill="none" stroke="#22354a" stroke-width="4.2"/>
      <path id="tt-fb" d="" fill="none" stroke="#c4882e" stroke-width="3.8"/>
    </g>`;
    /* Pedals + cordes connectades als llissos */
    s += `<g data-part="ordit" data-exp="0 64">
      <line id="tt-c1" x1="466" y1="408" x2="466" y2="544" stroke="#314b66" stroke-width="2" stroke-dasharray="4 3"/>
      <line id="tt-c2" x1="526" y1="488" x2="526" y2="544" stroke="#b97b2c" stroke-width="2" stroke-dasharray="4 3"/>
      <rect id="tt-ped1" class="t" fill="#314b66" x="442" y="544" width="48" height="16" rx="4"/>
      <rect id="tt-ped2" class="t" fill="#b97b2c" x="502" y="544" width="48" height="16" rx="4"/>
    </g>`;
    /* Dos llissos verticals */
    s += `<g data-part="ordit" data-exp="0 -64"><g id="tt-m1"><rect class="t" fill="#314b66" x="454" y="210" width="24" height="18" rx="4"/><rect class="t" fill="#314b66" x="454" y="390" width="24" height="18" rx="4"/><line x1="466" y1="228" x2="466" y2="390" stroke="#314b66" stroke-width="2.6"/><circle cx="466" cy="309" r="7" fill="#fff" stroke="#22354a" stroke-width="2.4"/></g></g>`;
    s += `<g data-part="ordit" data-exp="0 64"><g id="tt-m2"><rect class="t" fill="#b97b2c" x="514" y="290" width="24" height="18" rx="4"/><rect class="t" fill="#b97b2c" x="514" y="470" width="24" height="18" rx="4"/><line x1="526" y1="308" x2="526" y2="470" stroke="#b97b2c" stroke-width="2.6"/><circle cx="526" cy="389" r="7" fill="#fff" stroke="#b97b2c" stroke-width="2.4"/></g></g>`;
    /* Batà oscil·lant + llançadora creuant la calada */
    s += `<g id="tt-bata"><g data-part="pinta" data-exp="0 -60"><rect class="t" fill="url(#g-fustac)" x="676" y="132" width="20" height="288" rx="4"/><circle class="t llauto" cx="686" cy="136" r="7"/><rect class="t fusta2" x="650" y="394" width="68" height="24" rx="5"/><line x1="686" y1="312" x2="686" y2="394" stroke="#403a35" stroke-width="4.5"/></g></g>`;
    s += `<g data-part="llancadora" data-exp="0 30"><g id="tt-llan"><path class="t" fill="#7d4c23" d="M600 374h52l-7 20h-38z"/><ellipse cx="626" cy="378" rx="16" ry="5.5" fill="#d9482b"/></g></g>`;
    /* Secció del fil de trama nou que la pinta empeny fins a la tela */
    s += `<circle id="tt-trama-punt" cx="626" cy="360" r="7.5" fill="#d9482b" stroke="#fff" stroke-width="2" opacity="0"/>`;
    /* Tela teixida amb punts de trama travats per l'ordit */
    s += `<g data-part="tela" data-exp="55 0"><path class="t" fill="#e8d49d" d="M776 350H958q26 0 26 26v114H956V376H776z"/>
      ${[792, 814, 836, 858, 880, 902, 924].map((x, i) => `<circle cx="${x}" cy="363" r="4.5" fill="#d9482b" stroke="#2a2420" stroke-width="1"/><path d="M${x - 10} ${i % 2 ? 355 : 371}Q${x} ${i % 2 ? 373 : 353} ${x + 10} ${i % 2 ? 355 : 371}" fill="none" stroke="#22354a" stroke-width="1.8"/>`).join('')}
      <rect class="t" fill="url(#g-fustac)" x="946" y="344" width="38" height="36" rx="10"/><circle class="t" fill="url(#g-fustac)" cx="956" cy="500" r="52"/><circle class="t1" fill="#e6cf98" cx="956" cy="500" r="42"/><circle class="t ferro2" cx="956" cy="500" r="12"/></g>`;
    s += `<text x="580" y="365" class="tx-p mig" fill="#92400e" style="font-weight:800">CALADA</text>`;
    s += `<text x="605" y="92" class="tx mig">Els pedals obren el túnel (calada), la llançadora passa el fil i la pinta el prem</text>`;
    s += RI.innova(595, 42, 'INNOVACIÓ · la llançadora creua el túnel disparada per cordill', { apunta: [626, 374], halo: [626, 378, 46, 34], w: 465 });
    s += `</g>`;

    /* === VISTA 3: PLANTA (DES DE DALT) === */
    let parells = '', senars = '';
    for (let i = 0; i < 35; i++) { const x = 260 + i * 20, l = `<path d="M${x} 134V470"/>`; if (i % 2) senars += l; else parells += l; }
    let tr = ''; for (let y = 478; y < 620; y += 9) tr += `M252 ${y}H948`;
    s += `<g data-vista="planta">`;
    s += `<g data-guia="1"><path d="M600 118V66M164 330H94M1036 330H1106M600 634V678"/></g>`;
    s += `<rect class="t" fill="url(#g-fustac)" x="150" y="84" width="900" height="590" rx="10"/><rect class="crema" x="178" y="112" width="844" height="534"/>`;
    s += `<g data-part="ordit" data-exp="0 -48"><rect class="t fusta3" x="230" y="100" width="740" height="34" rx="14"/><g id="tp-fa" stroke="#22354a" stroke-width="3">${parells}</g><g id="tp-fb" stroke="#c4882e" stroke-width="2.2">${senars}</g></g>`;
    s += `<g data-part="tela" data-exp="0 48"><rect class="t" x="250" y="470" width="700" height="150" fill="#ecdcae"/><path d="${tr}" stroke="#c7a548" stroke-width="2.5"/><path d="${Array.from({ length: 35 }, (_, i) => `M${260 + i * 20} 470V620`).join('')}" stroke="#2a2420" stroke-width="1" opacity=".45"/><line id="tp-fila-lock" x1="252" y1="470" x2="948" y2="470" stroke="#d9482b" stroke-width="5" opacity="0"/><rect class="t fusta3" x="230" y="620" width="740" height="30" rx="13"/></g>`;
    s += `<g id="tp-bata"><g data-part="pinta" data-exp="0 -28"><rect class="t fusta2" x="170" y="-13" width="860" height="26" rx="5"/><path d="${Array.from({ length: 36 }, (_, i) => `M${250 + i * 20} -13v26`).join('')}" class="t1" opacity=".6"/></g>
      <g data-part="caixes" data-exp="-58 0"><rect class="t fusta" x="164" y="-24" width="84" height="48" rx="6"/></g>
      <g data-part="caixes" data-exp="58 0"><rect class="t fusta" x="952" y="-24" width="84" height="48" rx="6"/></g>
      <g data-exp="0 -24"><g data-part="llancadora" id="tp-llan"><path class="t" fill="#8f6038" d="M-44 0q22-17 44-17t44 17q-22 17-44 17t-44-17z"/><ellipse class="t1" fill="#d9482b" cx="0" cy="0" rx="20" ry="7"/></g></g>
      <g data-part="cordill" data-exp="0 46"><path id="tp-cord" d="M206 0L600 96L994 0" class="nf t1" stroke-dasharray="5 4"/><g id="tp-manec"><rect class="t fusta" x="-8" y="-22" width="16" height="48" rx="7"/></g></g></g>`;
    /* Fil de trama independent perquè baixi fins a la tela i s'hi quedi */
    s += `<path id="tp-trama" d="M210 330H210" class="nf" stroke="#d9482b" stroke-width="5" stroke-linecap="round"/>`;
    s += `<text x="80" y="300" class="tx mig" transform="rotate(-90 80 300)">ORDIT (fils llargs)</text><text x="1120" y="540" class="tx mig" transform="rotate(90 1120 540)">TELA</text>`;
    s += RI.innova(600, 42, 'INNOVACIÓ · una estirada de mànec dispara la llançadora d’una caixa a l’altra', { apunta: [330, 330], w: 545 });
    s += `</g>`;

    return svg(s);
  }

  function animaTeler({ p, el }) {
    const m = p < 0.5 ? p * 2 : (p - 0.5) * 2, anada = p < 0.5;
    const obert = anada ? 1 : -1;
    const cal = obert * 28;
    const batDy = m < 0.72 ? 0 : m < 0.86 ? tram(m, 0.72, 0.86, 0, 88) : tram(m, 0.86, 1, 88, 0);
    const f = tram(m, 0.34, 0.7, 0, 1, true);
    const xl3 = anada ? lerp(208, 992, f) : lerp(992, 208, f);

    /* Vista 3D */
    if (el('t3-bata')) {
      el('t3-bata').setAttribute('transform', `translate(0 ${batDy.toFixed(1)})`);
      el('t3-llan').setAttribute('transform', `translate(${xl3.toFixed(1)} 338)`);
      const x0 = anada ? 208 : 992;
      if (m <= 0.34) {
        el('t3-trama').setAttribute('opacity', 0);
      } else if (m < 0.72) {
        el('t3-trama').setAttribute('d', `M${x0} 338H${xl3.toFixed(1)}`);
        el('t3-trama').setAttribute('opacity', 1);
      } else if (m < 0.86) {
        const yTr = tram(m, 0.72, 0.86, 338, 436);
        el('t3-trama').setAttribute('d', `M312 ${yTr.toFixed(1)}H888`);
        el('t3-trama').setAttribute('opacity', 1);
      } else {
        el('t3-trama').setAttribute('opacity', 0);
      }
      el('t3-fila-lock').setAttribute('opacity', m >= 0.84 ? tram(m, 0.84, 1, 1, 0.25) : 0);
      const cop = m > 0.24 && m < 0.48 ? Math.sin(((m - 0.24) / 0.24) * Math.PI) : 0;
      const mx = 600 + (anada ? 1 : -1) * 52 * cop;
      el('t3-manec').setAttribute('transform', `translate(${mx.toFixed(1)} 412)`);
      el('t3-cord').setAttribute('d', `M${(150 + (anada ? cop * 34 : 0)).toFixed(1)} 300L${mx.toFixed(1)} 412L${(1050 - (!anada ? cop * 34 : 0)).toFixed(1)} 300`);
      el('t3-tacoL').setAttribute('x', anada ? (140 + cop * 34).toFixed(1) : '140');
      el('t3-tacoR').setAttribute('x', !anada ? (1040 - cop * 34).toFixed(1) : '1040');
      el('t3-copL').setAttribute('opacity', anada && m > 0.28 && m < 0.4 ? (cop * 0.5).toFixed(2) : '0');
      el('t3-copR').setAttribute('opacity', !anada && m > 0.28 && m < 0.4 ? (cop * 0.5).toFixed(2) : '0');

      const calF = m < 0.12 ? tram(m, 0, 0.12, 0, cal) : m > 0.88 ? tram(m, 0.88, 1, cal, -cal * 0.35) : cal;
      const yA = 292 - calF, yB = 292 + calF;
      el('t3-tunel').setAttribute('opacity', (Math.abs(calF) / 28 * 0.36).toFixed(2));
      el('t3-m1').setAttribute('transform', `translate(0 ${(-calF * 0.8).toFixed(1)})`);
      el('t3-m2').setAttribute('transform', `translate(0 ${(calF * 0.8).toFixed(1)})`);
      el('t3-ped1').setAttribute('transform', `translate(0 ${anada ? 10 : 0})`);
      el('t3-ped2').setAttribute('transform', `translate(0 ${anada ? 0 : 10})`);
      let dA = '', dB = '';
      for (let i = 0; i < 20; i++) {
        const xb = 390 + i * 22, xm = 365 + i * 24.7, xf = 325 + i * 28.9;
        const cmd = `M${xb} 222L${xm.toFixed(1)} ${(i % 2 ? yB : yA).toFixed(1)}L${xf.toFixed(1)} 440`;
        if (i % 2) dB += cmd; else dA += cmd;
      }
      el('t3-fa').setAttribute('d', dA);
      el('t3-fb').setAttribute('d', dB);
    }

    /* Vista Secció lateral (calada i picada real sobre el punt de trama) */
    if (el('tt-bata')) {
      const xBat = m < 0.72 ? 0 : m < 0.86 ? tram(m, 0.72, 0.86, 0, 82) : tram(m, 0.86, 1, 82, 0);
      el('tt-bata').setAttribute('transform', `translate(${xBat.toFixed(1)} 0)`);
      const passa = m > 0.34 && m < 0.7;
      el('tt-llan').setAttribute('opacity', passa ? 1 : 0.22);
      el('tt-llan').setAttribute('transform', passa ? `translate(0 ${(Math.sin(((m - 0.34) / 0.36) * Math.PI) * -14).toFixed(1)})` : '');
      const y1 = 360 - obert * 54, y2 = 360 + obert * 54;
      el('tt-m1').setAttribute('transform', `translate(0 ${(y1 - 309).toFixed(1)})`);
      el('tt-m2').setAttribute('transform', `translate(0 ${(y2 - 389).toFixed(1)})`);
      el('tt-ped1').setAttribute('transform', `translate(0 ${anada ? 0 : 12})`);
      el('tt-ped2').setAttribute('transform', `translate(0 ${anada ? 12 : 0})`);
      el('tt-c1').setAttribute('y2', anada ? '544' : '556');
      el('tt-c2').setAttribute('y2', anada ? '556' : '544');
      el('tt-fa').setAttribute('d', `M220 354L330 356L466 ${y1.toFixed(1)}L776 360`);
      el('tt-fb').setAttribute('d', `M220 366L330 364L526 ${y2.toFixed(1)}L776 360`);
      el('tt-cal').setAttribute('points', `330,360 466,${y1.toFixed(1)} 776,360 526,${y2.toFixed(1)}`);
      if (m > 0.36) {
        const px = m < 0.72 ? 626 : m < 0.86 ? tram(m, 0.72, 0.86, 626, 774) : 774;
        el('tt-trama-punt').setAttribute('cx', px.toFixed(1));
        el('tt-trama-punt').setAttribute('opacity', m > 0.9 ? tram(m, 0.9, 1, 1, 0.3) : 1);
      } else {
        el('tt-trama-punt').setAttribute('opacity', 0);
      }
    }

    /* Vista Planta */
    if (el('tp-bata')) {
      const yb = m < 0.72 ? 330 : m < 0.86 ? tram(m, 0.72, 0.86, 330, 456) : tram(m, 0.86, 1, 456, 330);
      const xl = anada ? lerp(210, 990, f) : lerp(990, 210, f);
      el('tp-bata').setAttribute('transform', `translate(0 ${yb.toFixed(1)})`);
      el('tp-llan').setAttribute('transform', `translate(${xl.toFixed(1)} 0)`);
      const x0 = anada ? 210 : 990;
      if (m <= 0.34) {
        el('tp-trama').setAttribute('opacity', 0);
      } else if (m < 0.72) {
        el('tp-trama').setAttribute('d', `M${x0} 330H${xl.toFixed(1)}`);
        el('tp-trama').setAttribute('opacity', 1);
      } else if (m < 0.86) {
        el('tp-trama').setAttribute('d', `M252 ${yb.toFixed(1)}H948`);
        el('tp-trama').setAttribute('opacity', 1);
      } else {
        el('tp-trama').setAttribute('opacity', 0);
      }
      el('tp-fila-lock').setAttribute('opacity', m >= 0.84 ? tram(m, 0.84, 1, 1, 0.25) : 0);
      const mx = 600 + (anada ? 1 : -1) * 52 * (m > 0.24 && m < 0.48 ? Math.sin(((m - 0.24) / 0.24) * Math.PI) : 0);
      el('tp-manec').setAttribute('transform', `translate(${mx.toFixed(1)} 96)`);
      el('tp-cord').setAttribute('d', `M206 0L${mx.toFixed(1)} 96L994 0`);
      const dalt = anada ? 'tp-fa' : 'tp-fb', baix = anada ? 'tp-fb' : 'tp-fa';
      el(dalt).setAttribute('stroke-width', 3.4); el(dalt).setAttribute('opacity', 1);
      el(baix).setAttribute('stroke-width', 2); el(baix).setAttribute('opacity', 0.45);
    }
  }

  /* ---------- 3 · Spinning Jenny (Perspectiva 3D + Planta 8 fusos, unificades esquerra -> dreta) ---------- */
  const FILES = [190, 240, 290, 340, 390, 440, 490, 540];
  function jenny() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA 3D REALISTA (HARGREAVES) === */
    s += `<g data-vista="3d">`;
    s += `<ellipse cx="600" cy="634" rx="450" ry="34" fill="#5e4931" opacity=".12"/>`;
    s += `<g data-guia="1"><path d="M350 480L296 530M580 510V578M550 280L532 212M820 265L875 215M945 360H1015"/></g>`;

    /* Bastiment fix inclinat + rails visibles per al carro-pinça */
    s += `<g>
      <path class="t" fill="url(#g-fustac)" d="M220 330l18-10 38 286h-22zM486 410l18-10 24 214h-22zM756 232l18-10 34 318h-22zM916 320l18-10 26 238h-22z"/>
      <path class="t fusta2" d="M242 528h266v16H242zM770 462l168 42v16l-168-42zM236 330l530-98 14 14-530 98zM500 412l434-92 12 16-434 92z"/>
      <path d="M355 344L740 272M368 422L752 348" stroke="#6d7880" stroke-width="4" stroke-linecap="round"/>
    </g>`;

    /* Tambor horitzontal d'estany i corda de transmissió */
    s += `<g data-part="corda" data-exp="0 64">
      <path class="t" fill="url(#g-ferroc)" d="M512 480l268-54q16 14 10 38l-268 54q-14-14-10-38z"/>
      <ellipse class="t" fill="#77848c" cx="516" cy="499" rx="11" ry="19"/>
      <ellipse class="t" fill="#5e6a73" cx="784" cy="445" rx="11" ry="19"/>
      <path id="j3-bandes" d="M555 473v36M605 463v36M655 453v36M705 443v36M755 433v36" stroke="#dbe4ea" stroke-width="2.4" opacity=".65"/>
      <path d="M945 360L786 435M945 452L786 462" class="nf" stroke="#4a3723" stroke-width="5"/>
      <path id="j3-corretja" d="M945 360L786 435" class="flux2 s-taronja" stroke-width="2.8" data-flux="-2"/>
      ${Array.from({ length: 8 }, (_, i) => `<line x1="${535 + i * 32}" y1="${482 - i * 6.5}" x2="${760 + i * 21}" y2="${308 - i * 15}" stroke="#6c5844" stroke-width="1.5" opacity=".7"/>`).join('')}
    </g>`;

    /* Fileta inclinada a l'esquerra amb 8 bobines de metxa (tota a x <= 325) */
    s += `<g data-part="metxes" data-exp="-52 52">
      <path class="t fusta" d="M124 446l222 42-14 70-222-42z"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const bx = 148 + i * 25, by = 468 + i * 4.7;
        return `<ellipse class="t" fill="url(#g-cotocrem)" cx="${bx}" cy="${by - 20}" rx="11" ry="22"/><ellipse class="t2 fusta3" cx="${bx}" cy="${by - 40}" rx="4" ry="2"/>`;
      }).join('')}
    </g>`;

    /* 8 metxes gruixudes (esquerra) + 8 fils estirats/torçuts (dreta) */
    s += `<g id="j3-rovs" fill="none" stroke-linecap="round"></g>`;
    s += `<g id="j3-fils" fill="none" stroke-linecap="round"></g>`;

    /* 8 fusos inclinats al bastidor posterior + cons + fil-guia */
    s += `<g data-part="fusos" data-exp="55 -48">
      <path class="t fusta2" d="M744 278l168 38-8 16-168-38z"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const sx = 760 + i * 20.5, sy = 282 + i * 4.6;
        return `<g>
          <line x1="${sx}" y1="${sy + 26}" x2="${sx + 16}" y2="${sy - 96}" stroke="#5b4c3d" stroke-width="5.5" stroke-linecap="round"/>
          <circle class="j3-whorl" cx="${sx + 2}" cy="${sy + 10}" r="5" fill="#d49b35" stroke="#2a2420" stroke-width="1.4"/>
          <path id="j3-cop${i}" class="t1" fill="url(#g-cotoblanc)" d="M${sx + 3} ${sy + 4}L${sx + 12} ${sy - 72}L${sx + 20} ${sy - 68}L${sx + 15} ${sy + 8}z"/>
          <path class="j3-mf" d="M${sx + 6} ${sy - 40}l10 3M${sx + 8} ${sy - 24}l10 3" stroke="#b9722a" stroke-width="1.8"/>
        </g>`;
      }).join('')}
      <path id="j3-guia" d="M766 202l164 38" stroke="#2f7fb5" stroke-width="3.6" stroke-linecap="round"/>
    </g>`;

    /* Carro-pinça mòbil amb mordassa superior articulada (OBERTA / TANCADA) */
    s += `<g data-exp="-18 -68"><g id="j3-carro" data-part="pinca">
      <rect class="t" fill="url(#g-fustac)" x="-15" y="-56" width="24" height="122" rx="4" transform="skewY(11)"/>
      <rect id="j3-mord" class="t fusta2" x="-11" y="-82" width="16" height="32" rx="4" transform="skewY(11)"/>
      <circle class="t ferro2" cx="-3" cy="68" r="8"/><circle class="t ferro2" cx="-3" cy="-54" r="7"/>
      <rect class="t llauto" x="-10" y="-10" width="26" height="14" rx="4"/>
      <g id="j3-stat" transform="translate(0 94)"><rect x="-46" y="-12" width="92" height="22" rx="11" fill="#5b8c35" stroke="#2a2420" stroke-width="1.8"/><text x="0" y="3" text-anchor="middle" fill="#fff" font-size="11.5" font-weight="800" font-family="Figtree,sans-serif">OBERTA</text></g>
    </g></g>`;

    /* Gran volant manual a la dreta */
    s += `<g data-part="roda" data-exp="72 15">
      <g id="j3-roda">${roda(946, 360, 108, { raigs: 10, color: '#9f6939', gruix: 14, extra: '<circle class="t ferro2" cx="946" cy="360" r="14"/><circle class="t fusta2" cx="991" cy="360" r="9"/>' })}</g>
    </g>`;
    s += persona(1112, 622, 290, { color: '#7a4f9a', brac: 'M8-68l8 26', attr: 'class="atenua"' });
    s += `<g class="atenua"><path id="j3-brac" d="" fill="none" stroke="#2a2420" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><circle id="j3-ma" r="11" fill="#e9b98f" stroke="#2a2420" stroke-width="3"/></g>`;
    s += `<g id="j3-r1" opacity="0">${retol(600, 98, '1 · pinça OBERTA: deixa passar metxa gruixuda i tova', { fons: '#5b8c35', w: 445 })}</g>
          <g id="j3-r2" opacity="0">${retol(600, 98, '2 · pinça TANCADA: estira la metxa i els fusos la torcen en fil fi', { fons: '#d9482b', w: 525 })}</g>
          <g id="j3-r3" opacity="0">${retol(600, 98, '3 · el carro torna i el fil-guia bobina els 8 cons alhora', { fons: '#2f7fb5', w: 475 })}</g>`;
    s += RI.innova(300, 56, 'INNOVACIÓ · 1 roda + 1 pinça = 8 fils estirats i torçuts alhora', { apunta: [730, 215], halo: [835, 240, 108, 72], w: 455 });
    s += `</g>`;

    /* === VISTA 2: PLANTA SUPERIOR (UNIFICADA ESQUERRA -> DRETA) === */
    s += `<g data-vista="planta">`;
    s += `<g data-guia="1"><path d="M180 140V92M865 360H940M1070 340H1145M600 590V642"/></g>`;
    s += `<rect class="t" fill="url(#g-fustac)" x="115" y="140" width="845" height="450" rx="10"/><rect class="crema" x="141" y="166" width="793" height="398"/>`;
    /* Tambor i corda a la dreta */
    s += `<g data-part="corda" data-exp="0 52">
      <rect class="t" fill="url(#g-ferroc)" x="875" y="170" width="24" height="390" rx="8"/>
      <path d="M1070 220V620H887V560" class="nf t" stroke-dasharray="7 5"/>
      <path d="M1070 220V620H887V560" class="flux2 s-taronja" stroke-width="3" data-flux="2"/>
    </g>`;
    /* 8 bobines de metxa a l'ESQUERRA */
    s += `<g data-part="metxes" data-exp="-48 0">${FILES.map((y) => `<circle class="t" fill="url(#g-cotocrem)" cx="185" cy="${y}" r="21"/><circle cx="185" cy="${y}" r="14" fill="none" stroke="#dfd5be" stroke-width="2" stroke-dasharray="6 4"/><circle class="t1 fusta3" cx="185" cy="${y}" r="6"/>`).join('')}</g>`;
    /* 8 metxes gruixudes (esquerra) + 8 fils estirats/torçuts (dreta) */
    s += `<g id="j2-fils-m" stroke-linecap="round">${FILES.map((y) => `<line class="j2-fm0" x1="205" y1="${y}" x2="640" y2="${y}" stroke="#2a2420" stroke-width="9.5"/><line class="j2-fm" x1="205" y1="${y}" x2="640" y2="${y}" stroke="#fff8e8" stroke-width="7"/>`).join('')}</g>`;
    s += `<g id="j2-fils-f" fill="none" stroke-linecap="round"></g>`;
    /* 8 fusos a la DRETA */
    s += `<g data-part="fusos" data-exp="54 0">${FILES.map((y) => `<g><rect class="t2 fusta2" x="802" y="${y - 4}" width="68" height="8" rx="3"/><ellipse class="j2-cop t2" cx="830" cy="${y}" rx="22" ry="8" fill="url(#g-cotoblanc)"/><path class="j2-mf" d="M818 ${y - 6}l8 12M834 ${y - 6}l8 12" stroke="#2a2420" stroke-width="1.6"/></g>`).join('')}</g>`;
    /* Pinça mòbil al mig */
    s += `<g data-exp="0 -54"><g data-part="pinca" id="j2-pinca"><rect class="t fusta" x="-14" y="160" width="12" height="410" rx="5"/><rect id="j2-pinca2" class="t fusta" x="2" y="160" width="12" height="410" rx="5"/><rect class="t fusta2" x="-28" y="150" width="56" height="18" rx="6"/><rect class="t fusta2" x="-28" y="562" width="56" height="18" rx="6"/></g></g>`;
    /* Roda a la dreta */
    s += `<g data-part="roda" data-exp="54 0"><g id="j2-roda">${roda(1070, 340, 118, { raigs: 10, color: '#a67547', gruix: 14, extra: '<circle class="t llauto" cx="1138" cy="340" r="12"/>' })}</g></g>`;
    s += RI.innova(540, 52, 'INNOVACIÓ · la pinça mòbil estira totes 8 metxes a la vegada cap als fusos', { apunta: [520, 360], w: 485 });
    s += `</g>`;

    return svg(s);
  }

  function animaJenny({ p, t, k, el, svg: g }) {
    /* Vista 3D */
    if (el('j3-carro')) {
      const s = p < 0.2 ? tram(p, 0, 0.2, 0.78, 0.56) : p < 0.6 ? tram(p, 0.2, 0.6, 0.56, 0.04) : tram(p, 0.6, 1, 0.04, 0.78);
      const cx = lerp(410, 680, s), cy = lerp(346, 294, s);
      el('j3-carro').setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`);
      const obert = p < 0.2;
      el('j3-mord').setAttribute('y', obert ? -98 : -78);
      const st = el('j3-stat');
      if (st) {
        st.firstChild.setAttribute('fill', obert ? '#5b8c35' : p < 0.6 ? '#d9482b' : '#2f7fb5');
        st.lastChild.textContent = obert ? 'OBERTA' : p < 0.6 ? 'TANCADA' : 'ENROTLLA';
      }
      const gruix = obert ? 6.6 : p < 0.6 ? tram(p, 0.2, 0.6, 6.6, 2.3) : 2.3;
      const torcAmp = p >= 0.2 && p < 0.6 ? tram(p, 0.2, 0.35, 1.2, 3.2) : 0;
      const col = p < 0.25 ? '#fff8e8' : p < 0.38 ? '#fde68a' : '#f2c230';
      let rovs = '', fils = '';
      for (let i = 0; i < 8; i++) {
        const bx = 148 + i * 25, by = 430 + i * 4.7;
        const px = cx - 4 + i * 1.4, py = cy - 42 + i * 13.5;
        const sx = 772 + i * 20.5, sy = 216 + i * 4.6;
        rovs += `<path d="M${bx} ${by}L${px.toFixed(1)} ${py.toFixed(1)}" stroke="#2a2420" stroke-width="9"/><path d="M${bx} ${by}L${px.toFixed(1)} ${py.toFixed(1)}" stroke="#fff9eb" stroke-width="6.5"/>`;
        fils += `<path d="M${px.toFixed(1)} ${py.toFixed(1)}L${sx} ${sy}" stroke="#2a2420" stroke-width="${(gruix + 2.2).toFixed(1)}"/><path d="M${px.toFixed(1)} ${py.toFixed(1)}L${sx} ${sy}" stroke="${col}" stroke-width="${gruix.toFixed(1)}"/>`;
        if (torcAmp > 0) fils += `<path d="${onaFil(px, py, sx, sy, t * 22 + i * 0.7, torcAmp, 0.22)}" stroke="#8f4f12" stroke-width="1.5"/>`;
      }
      el('j3-rovs').innerHTML = rovs;
      el('j3-fils').innerHTML = fils;
      const gir = k >= 1;
      if (gir) g._ang = (t * 190) % 360;
      const ang = g._ang || 0;
      el('j3-roda').setAttribute('transform', `rotate(${ang.toFixed(1)} 946 360)`);
      /* braç amb colze: la mà segueix la maneta de la roda */
      const ra = (ang * Math.PI) / 180, hx = 946 + 45 * Math.cos(ra), hy = 360 + 45 * Math.sin(ra), sx = 1089, sy = 425, L = 104;
      const dx = hx - sx, dy = hy - sy, d = Math.min(Math.hypot(dx, dy), 2 * L - 1), a0 = Math.atan2(dy, dx), b = Math.acos(d / (2 * L));
      const ex = sx + L * Math.cos(a0 - b), ey = sy + L * Math.sin(a0 - b);
      el('j3-brac').setAttribute('d', `M${sx} ${sy}L${ex.toFixed(1)} ${ey.toFixed(1)}L${hx.toFixed(1)} ${hy.toFixed(1)}`);
      el('j3-ma').setAttribute('cx', hx.toFixed(1)); el('j3-ma').setAttribute('cy', hy.toFixed(1));
      el('j3-bandes').setAttribute('opacity', gir ? (0.35 + 0.55 * Math.sin(t * 16)).toFixed(2) : '.55');
      if (!g._j3mf) { g._j3mf = Array.from(g.querySelectorAll('.j3-mf')); g._j3wh = Array.from(g.querySelectorAll('.j3-whorl')); }
      g._j3mf.forEach((m) => m.setAttribute('transform', gir ? `translate(0 ${((t * 60) % 14 - 7).toFixed(1)})` : ''));
      g._j3wh.forEach((w) => w.setAttribute('fill', gir ? '#f2c230' : '#c9952a'));
      el('j3-guia').setAttribute('transform', p > 0.6 ? `translate(0 ${(Math.sin(((p - 0.6) / 0.4) * Math.PI) * 26).toFixed(1)})` : '');
      ['j3-r1', 'j3-r2', 'j3-r3'].forEach((id, i) => el(id).setAttribute('opacity', i === k ? 1 : 0));
    }

    /* Vista Planta (unificada esquerra -> dreta) */
    if (el('j2-pinca')) {
      if (!g._fm) { g._fm = Array.from(g.querySelectorAll('.j2-fm')); g._fm0 = Array.from(g.querySelectorAll('.j2-fm0')); g._cop = Array.from(g.querySelectorAll('.j2-cop')); g._mf = Array.from(g.querySelectorAll('.j2-mf')); }
      const x = p < 0.2 ? tram(p, 0, 0.2, 680, 560) : p < 0.6 ? tram(p, 0.2, 0.6, 560, 315) : tram(p, 0.6, 1, 315, 680);
      const gruix = p < 0.2 ? 7 : p < 0.6 ? tram(p, 0.2, 0.6, 7, 2.5) : 2.5;
      const torcAmp = p >= 0.2 && p < 0.6 ? 3.2 : 0;
      const col = p < 0.25 ? '#fff8e8' : '#f2c230';
      el('j2-pinca').setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
      el('j2-pinca2').setAttribute('x', p < 0.2 ? 9 : 2);
      g._fm.forEach((l) => l.setAttribute('x2', x.toFixed(1)));
      g._fm0.forEach((l) => l.setAttribute('x2', x.toFixed(1)));
      let filsP = '';
      FILES.forEach((y, i) => {
        filsP += `<line x1="${x.toFixed(1)}" y1="${y}" x2="808" y2="${y}" stroke="#2a2420" stroke-width="${(gruix + 2.2).toFixed(1)}"/><line x1="${x.toFixed(1)}" y1="${y}" x2="808" y2="${y}" stroke="${col}" stroke-width="${gruix.toFixed(1)}"/>`;
        if (torcAmp > 0) filsP += `<path d="${onaFil(x, y, 808, y, t * 22 + i * 0.7, torcAmp, 0.22)}" stroke="#8f4f12" stroke-width="1.6"/>`;
      });
      el('j2-fils-f').innerHTML = filsP;
      const ple = p < 0.6 ? 8 : tram(p, 0.6, 1, 8, 13.5);
      g._cop.forEach((c) => c.setAttribute('ry', ple.toFixed(1)));
      const gir = k >= 1; g._mf.forEach((m) => m.setAttribute('transform', gir ? `translate(${((t * 60) % 16) - 8} 0)` : ''));
      if (gir) el('j2-roda').setAttribute('transform', `rotate(${((t * 170) % 360).toFixed(1)} 1070 340)`);
    }
  }

  /* ---------- 4 · Water Frame (Perspectiva 3D multi-fus + Secció 1 cap) ---------- */
  function water() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA 3D (4 FUSOS + RODA HIDRÀULICA + ESTIRATGE x1/x2/x4) === */
    s += `<g data-vista="3d">`;
    s += `<rect class="aigua" x="-60" y="644" width="1320" height="76"/><path d="M-60 644H1260" stroke="#2d6699" stroke-width="5"/>`;
    s += `<g data-guia="1"><path d="M235 450H170M365 450v65M660 148V88M470 295H410M660 390v45M845 530H915"/></g>`;

    /* Bastiment de roure */
    s += `<g>
      <rect class="t" fill="url(#g-fustac)" x="430" y="100" width="24" height="546" rx="4"/>
      <rect class="t" fill="url(#g-fustac)" x="936" y="100" width="24" height="546" rx="4"/>
      <rect class="t fusta2" x="424" y="96" width="542" height="22" rx="4"/>
      <rect class="t fusta2" x="430" y="196" width="528" height="16"/>
      <rect class="t fusta2" x="430" y="388" width="528" height="16"/>
      <rect class="t fusta2" x="430" y="592" width="528" height="20"/>
    </g>`;

    /* Roda hidràulica i canal d'aigua animat */
    s += `<g data-part="aigua" data-exp="-68 0">
      <path class="t pedra" d="M-60 220h180v424H-60z"/>
      <path class="t fusta" d="M-60 256H176v18H-60z"/><rect x="-60" y="260" width="234" height="10" class="aigua"/>
      <g id="w3-cascada" fill="none" stroke="#4ea0d9" stroke-linecap="round"></g>
      <g data-girat="182 450 55">${roda(182, 450, 146, { raigs: 8, color: '#9c6633', gruix: 22, raig: 8 })}</g>
      <rect class="t" fill="url(#g-ferroc)" x="182" y="441" width="248" height="18" rx="4"/>
    </g>`;

    /* Engranatge cònic + 3 pinyons que fan girar x1, x2, x4 */
    s += `<g data-part="aigua" data-exp="-35 55">
      <path class="t" fill="url(#g-ferroc)" d="M352 418l24 10v44l-24 10z"/>
      <path class="t" fill="url(#g-ferroc)" d="M362 464l44-16 14 20-58 14z"/>
      <rect class="t" fill="url(#g-ferroc)" x="382" y="220" width="12" height="236"/>
      <g data-girat="388 240 55"><circle class="t llauto" cx="388" cy="240" r="14"/><path d="M378 240h20M388 230v20" stroke="#2a2420" stroke-width="1.6"/></g>
      <g data-girat="388 296 115"><circle class="t llauto" cx="388" cy="296" r="12"/><path d="M379 296h18M388 287v18" stroke="#2a2420" stroke-width="1.6"/></g>
      <g data-girat="388 352 240"><circle class="t llauto" cx="388" cy="352" r="10"/><path d="M380 352h16M388 344v16" stroke="#2a2420" stroke-width="1.6"/></g>
    </g>`;

    /* 4 bobines superiors de metxa */
    const FUSX = [505, 615, 725, 835];
    s += `<g data-part="metxa" data-exp="0 -44">
      ${FUSX.map((x) => `<g>
        <rect class="t1 fusta3" x="${x - 5}" y="114" width="10" height="72"/>
        <ellipse class="t" fill="url(#g-cotocrem)" cx="${x}" cy="148" rx="28" ry="26"/>
        <ellipse cx="${x}" cy="148" rx="18" ry="15" fill="none" stroke="#d5c6a5" stroke-width="1.6" stroke-dasharray="6 4"/>
      </g>`).join('')}
    </g>`;

    /* 4 jocs de 3 parells de corrons + fils que s'estiren en temps real */
    s += `<g data-part="corrons" data-exp="-28 -18">
      ${[240, 296, 352].map((y, tier) => {
        const sp = [55, 115, 240][tier];
        return `<rect class="t" fill="url(#g-ferroc)" x="438" y="${y - 10}" width="510" height="20" rx="4"/>
          <rect class="t fusta2" x="444" y="${y - 24}" width="498" height="14" rx="4"/>
          ${FUSX.map((x) => `
            <path d="M${x} 174V238" stroke="#f8efe0" stroke-width="11"/>
            <path d="M${x} 240V296" stroke="#fff8e8" stroke-width="7.5"/>
            <path d="M${x} 296V352" stroke="#f2c230" stroke-width="4.5"/>
            <path d="M${x} 352V454" stroke="#f2c230" stroke-width="2.6"/>
            <g data-girat="${x} ${y} ${sp}"><circle class="t ferro2" cx="${x}" cy="${y}" r="12"/><path d="M${x - 9} ${y}h18M${x} ${y - 9}v18" stroke="#fff" stroke-width="1.5"/></g>
          `).join('')}`;
      }).join('')}
      <g id="w3-fibres" stroke-linecap="round"></g>
    </g>`;
    /* Pesos de pressió */
    s += `<g data-part="corrons" data-exp="0 40">
      ${FUSX.map((x) => `<path d="M${x + 26} 214v185" stroke="#3c4348" stroke-width="2.6"/><rect class="t" fill="url(#g-ferroc)" x="${x + 17}" y="396" width="18" height="32" rx="3"/>`).join('')}
    </g>`;

    /* 4 aletes giratòries i bobines */
    s += `<g data-part="aleta" data-exp="62 28">
      <rect class="t fusta" x="454" y="556" width="480" height="18" rx="4"/>
      ${FUSX.map((x, i) => `<g>
        <rect class="t2 ferro" x="${x - 4}" y="468" width="8" height="122"/>
        <rect class="t" fill="url(#g-cotoblanc)" x="${x - 19}" y="488" width="38" height="62" rx="6"/>
        <path d="M${x - 17} 504h34M${x - 17} 519h34M${x - 17} 534h34" stroke="#e4ae1d" stroke-width="2.4"/>
        <path id="w3-alB${i}" d="" class="nf" stroke="#7d6f62" stroke-width="3.6"/>
        <path id="w3-alF${i}" d="" class="t nf" stroke-width="4.6"/>
        <path id="w3-fi${i}" d="M${x - 28} 524H${x}" stroke="#d9482b" stroke-width="2.4"/>
      </g>`).join('')}
    </g>`;
    s += `<text x="690" y="34" class="tx mig">4 fusos alhora moguts per una sola roda d’aigua · fil fort d’ordit</text>`;
    s += `${retol(992, 240, '×1', { fons: '#2a2420', w: 46, h: 24 })}${retol(992, 296, '×2', { fons: '#b9722a', w: 46, h: 24 })}${retol(992, 352, '×4', { fons: '#d9482b', w: 46, h: 24 })}`;
    s += RI.innova(660, 74, 'INNOVACIÓ · corrons a velocitats creixents + força de l’aigua (fàbrica)', { apunta: [440, 296], halo: [490, 296, 70, 96], w: 510 });
    s += `</g>`;

    /* === VISTA 2: SECCIÓ D'UN CAP DE FILATURA === */
    s += `<g data-vista="tall">`;
    s += `<rect class="aigua" x="-60" y="644" width="1320" height="76"/><path d="M-60 644H1260" stroke="#2d6699" stroke-width="5"/><path d="M-60 662q60-8 120 0t120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0" stroke="#d6ecf3" stroke-width="3" fill="none" opacity=".6"/>`;
    s += `<g data-guia="1"><path d="M180 490H120M605 140V80M578 296H520M605 530H675"/></g>`;
    s += `<g data-part="aigua" data-exp="-58 0"><path class="t fusta" d="M-60 300H180v18H-60z"/><rect x="-60" y="304" width="238" height="9" class="aigua"/><g id="w2-cascada" fill="none" stroke="#4ea0d9" stroke-linecap="round"></g><path d="M170 618q16-14 34 0M240 622q20-16 40 0" stroke="#d6ecf3" stroke-width="4" fill="none" stroke-linecap="round"/><g data-girat="180 490 50">${roda(180, 490, 150, { raigs: 8, color: '#a67547', gruix: 22, raig: 8 })}</g>
      <path d="M180 490L578 366M180 490L605 595" class="nf t" stroke-dasharray="7 5"/><path d="M180 490L578 366" class="flux2 s-taronja" stroke-width="3" data-flux="2"/></g>`;
    s += `<rect class="t" fill="url(#g-fustac)" x="430" y="70" width="380" height="584" rx="10"/><rect class="crema" x="452" y="92" width="336" height="540"/>`;
    s += `<g data-part="metxa" data-exp="0 -54"><ellipse class="t" fill="url(#g-cotocrem)" cx="605" cy="140" rx="46" ry="34"/><ellipse cx="605" cy="140" rx="34" ry="22" fill="none" stroke="#dfd5be" stroke-width="2" stroke-dasharray="8 4"/><rect class="t1 fusta3" x="599" y="100" width="12" height="80"/></g>`;
    /* Cinta de cotó que es va aprimant + fibres animades accelerant-se x1 -> x2 -> x4 */
    s += `<path d="M605 174V226" stroke="#2a2420" stroke-width="18"/><path d="M605 174V226" stroke="#fff8e8" stroke-width="14"/><path d="M605 226V296" stroke="#2a2420" stroke-width="12.5"/><path d="M605 226V296" stroke="#fff8e8" stroke-width="9"/><path d="M605 296V366" stroke="#2a2420" stroke-width="8"/><path d="M605 296V366" stroke="#f9e6b3" stroke-width="5"/><path d="M605 366V452" stroke="#2a2420" stroke-width="5.2"/><path d="M605 366V452" stroke="#f2c230" stroke-width="2.8"/>`;
    s += `<g id="w2-fibres" fill="none" stroke-linecap="round"></g>`;
    const parell = (y, v, nom) => `<g data-girat="578 ${y} ${v}"><circle class="t ferro2" cx="578" cy="${y}" r="24"/><path d="M558 ${y}h40M578 ${y - 20}v40" class="t2"/></g><g data-girat="632 ${y} ${-v}"><circle class="t fusta2" cx="632" cy="${y}" r="24"/><path d="M612 ${y}h40M632 ${y - 20}v40" class="t2"/></g><text x="670" y="${y + 6}" class="tx">${nom}</text>`;
    s += `<g data-part="corrons" data-exp="-46 0">${parell(226, 60, '×1 · lent')}${parell(296, 130, '×2 · ràpid')}${parell(366, 280, '×4 · molt ràpid')}<path d="M632 250v170" stroke="#3c4348" stroke-width="3"/><rect class="t" fill="url(#g-ferroc)" x="620" y="420" width="24" height="32" rx="4"/></g>`;
    /* Aleta en 3D (braç del darrere + braç guia davant + fil que s'enrotlla) */
    s += `<g data-part="aleta" data-exp="48 24">
      <rect class="t2 ferro" x="601" y="470" width="8" height="150"/>
      <rect class="t" fill="url(#g-cotoblanc)" x="583" y="500" width="44" height="70" rx="8"/>
      <path d="M585 515h40M585 530h40M585 545h40" stroke="#f2c230" stroke-width="3"/>
      <path id="w2-alB" d="" class="nf" stroke="#7d6f62" stroke-width="4.2"/>
      <path id="w2-alF" d="" class="t nf" stroke-width="5.2"/>
      <path id="w2-fil" d="" fill="none" stroke="#d9482b" stroke-width="2.8" stroke-linecap="round"/>
    </g>`;
    s += `<g>${retol(990, 150, 'metxa: cotó tou i gruixut', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 250 })}${fletxa('M990 176V250', '#2a2420', 4)}${retol(990, 280, 'els corrons l’estiren (×1→×4)', { fons: '#b9722a', w: 235 })}${fletxa('M990 306V380', '#2a2420', 4)}${retol(990, 410, 'l’aleta el torça i enrotlla', { fons: '#b9722a', w: 215 })}${fletxa('M990 436V510', '#2a2420', 4)}${retol(990, 540, 'fil prim i molt resistent', { fons: '#f2c230', color: '#2a2420', vora: '#2a2420', w: 220 })}</g>`;
    s += RI.innova(960, 68, 'INNOVACIÓ · els corrons substitueixen els dits humans', { apunta: [656, 296], halo: [605, 296, 84, 102], w: 405 });
    s += `</g>`;

    return svg(s);
  }

  function animaWater({ t, el }) {
    const FUSX = [505, 615, 725, 835];
    /* Vista 3D */
    if (el('w3-fibres')) {
      /* Cascada d'aigua animada */
      let cas3 = '';
      for (let i = 0; i < 6; i++) {
        const u = ((t * 1.4 + i / 6) % 1), x = 176 + u * 44, y = 264 + u * u * 78;
        cas3 += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(5 - u * 1.8).toFixed(1)}" fill="#4ea0d9" opacity="${(1 - u * 0.5).toFixed(2)}"/>`;
      }
      el('w3-cascada').innerHTML = cas3;

      /* Fibres baixant a velocitats ×1, ×2, ×4 dins cada fus */
      let fib3 = '';
      FUSX.forEach((x, idx) => {
        for (let d = 0; d < 3; d++) {
          const u1 = ((t * 0.45 + d / 3 + idx * 0.13) % 1);
          fib3 += `<line x1="${x}" y1="${(178 + u1 * 52).toFixed(1)}" x2="${x}" y2="${(186 + u1 * 52).toFixed(1)}" stroke="#c96b27" stroke-width="4.5" opacity=".75"/>`;
          const u2 = ((t * 0.95 + d / 3 + idx * 0.13) % 1);
          fib3 += `<line x1="${x}" y1="${(242 + u2 * 44).toFixed(1)}" x2="${x}" y2="${(254 + u2 * 44).toFixed(1)}" stroke="#b9722a" stroke-width="3.2" opacity=".82"/>`;
          const u3 = ((t * 1.9 + d / 3 + idx * 0.13) % 1);
          fib3 += `<line x1="${x}" y1="${(298 + u3 * 46).toFixed(1)}" x2="${x}" y2="${(313 + u3 * 46).toFixed(1)}" stroke="#d9482b" stroke-width="2.2" opacity=".9"/>`;
        }
        fib3 += `<path d="${onaFil(x, 356, x, 452, t * 24 + idx, 2.6, 0.24)}" stroke="#d9482b" stroke-width="1.6" fill="none"/>`;
      });
      el('w3-fibres').innerHTML = fib3;

      for (let i = 0; i < 4; i++) {
        const ang = t * 9 + i * 0.9, c = Math.cos(ang), sgn = Math.sin(ang);
        const xa = FUSX[i] - 28 * c, xb = FUSX[i] + 28 * c;
        const pathF = `M${FUSX[i]} 454V468H${xa.toFixed(1)}V546`, pathB = `M${FUSX[i]} 468H${xb.toFixed(1)}V546`;
        el('w3-alF' + i).setAttribute('d', sgn >= 0 ? pathF : pathB);
        el('w3-alB' + i).setAttribute('d', sgn >= 0 ? pathB : pathF);
        el('w3-fi' + i).setAttribute('d', `M${xa.toFixed(1)} 472V524H${FUSX[i]}`);
      }
    }

    /* Vista Secció 1 cap */
    if (el('w2-alF')) {
      let cas2 = '';
      for (let i = 0; i < 6; i++) {
        const u = ((t * 1.4 + i / 6) % 1), x = 180 + u * 44, y = 308 + u * u * 78;
        cas2 += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(5.5 - u * 2).toFixed(1)}" fill="#4ea0d9" opacity="${(1 - u * 0.5).toFixed(2)}"/>`;
      }
      el('w2-cascada').innerHTML = cas2;

      let fib2 = '';
      for (let d = 0; d < 3; d++) {
        const u1 = ((t * 0.45 + d / 3) % 1);
        fib2 += `<line x1="605" y1="${(176 + u1 * 42).toFixed(1)}" x2="605" y2="${(184 + u1 * 42).toFixed(1)}" stroke="#c96b27" stroke-width="7"/>`;
        const u2 = ((t * 0.95 + d / 3) % 1);
        fib2 += `<line x1="605" y1="${(232 + u2 * 52).toFixed(1)}" x2="605" y2="${(246 + u2 * 52).toFixed(1)}" stroke="#b9722a" stroke-width="4.5"/>`;
        const u3 = ((t * 1.9 + d / 3) % 1);
        fib2 += `<line x1="605" y1="${(300 + u3 * 54).toFixed(1)}" x2="605" y2="${(318 + u3 * 54).toFixed(1)}" stroke="#d9482b" stroke-width="3"/>`;
      }
      fib2 += `<path d="${onaFil(605, 368, 605, 452, t * 26, 3.2, 0.24)}" stroke="#d9482b" stroke-width="2" fill="none"/>`;
      el('w2-fibres').innerHTML = fib2;

      const ang = t * 9, c = Math.cos(ang), sgn = Math.sin(ang), xa = 605 - 45 * c, xb = 605 + 45 * c;
      const pF = `M605 452V470H${xa.toFixed(1)}V560`, pB = `M605 470H${xb.toFixed(1)}V560`;
      el('w2-alF').setAttribute('d', sgn >= 0 ? pF : pB);
      el('w2-alB').setAttribute('d', sgn >= 0 ? pB : pF);
      el('w2-fil').setAttribute('d', `M605 452V470L${xa.toFixed(1)} 472V538H605`);
    }
  }

  /* ---------- 5 · Mula de Crompton (Perspectiva 6 fusos + Secció lateral) ---------- */
  function mula() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA DEL CARRO DE 6 FUSOS === */
    s += `<g data-vista="3d">`;
    s += `<rect class="t pedra" x="-60" y="592" width="1320" height="128"/>`;
    s += `<g data-guia="1"><path d="M220 260L160 225M365 280L330 226M340 460L286 496M700 555v42M540 420L554 365"/></g>`;

    /* Rails de ferro */
    s += `<g data-exp="0 42">
      <path class="t" fill="url(#g-ferroc)" d="M370 572l680-76v10l-680 76zM440 618l695-84v10l-695 84z"/>
      <path d="M405 588h76M545 572h76M685 556h76M825 540h76M965 524h76" stroke="#534942" stroke-width="6"/>
    </g>`;

    /* Fileta posterior amb 6 bobines de metxa */
    s += `<g data-part="fileta" data-exp="-60 -35">
      <path class="t" fill="url(#g-fustac)" d="M110 592V148h24v444zM266 566V174h22v392zM110 148l178 26v20L110 168z"/>
      ${[0, 1, 2].map((r) => `
        <ellipse class="t" fill="url(#g-cotocrem)" cx="${164 + r * 32}" cy="${224 + r * 6}" rx="20" ry="30"/>
        <ellipse class="t" fill="url(#g-cotocrem)" cx="${164 + r * 32}" cy="${322 + r * 6}" rx="20" ry="30"/>
      `).join('')}
      <path d="M182 228Q275 245 340 282M214 234Q290 250 356 286M246 240Q305 256 372 290M182 324Q275 305 340 286M214 330Q290 310 356 290M246 336Q305 316 372 294" stroke="#f8efe0" stroke-width="5.5" fill="none"/>
    </g>`;

    /* Tren ample de 3 parells de corrons d'estiratge en paral·lel */
    s += `<g data-part="corrons" data-exp="-36 -54">
      <rect class="t fusta2" x="308" y="252" width="138" height="62" rx="6"/>
      ${[332, 368, 406].map((x, idx) => `<g>
        <g id="m3-c${idx}"><circle class="t ferro2" cx="${x}" cy="268" r="12"/><path d="M${x - 9} 268h18M${x} 259v18" stroke="#fff" stroke-width="1.5"/></g>
        <g id="m3-b${idx}"><circle class="t fusta3" cx="${x}" cy="296" r="12"/><path d="M${x - 9} 296h18M${x} 287v18" stroke="#fff" stroke-width="1.5"/></g>
      </g>`).join('')}
      <g id="m3-estat" transform="translate(377 334)"><rect x="-74" y="-12" width="148" height="22" rx="11" fill="#b9722a" stroke="#2a2420" stroke-width="1.8"/><text x="0" y="3" text-anchor="middle" fill="#fff" font-size="11" font-weight="800" font-family="Figtree,sans-serif">CORRONS GIRANT</text></g>
    </g>`;

    /* Capçal fix i roda de transmissió */
    s += `<g data-part="corrons" data-exp="-54 36">
      <path class="t" fill="url(#g-ferroc)" d="M294 348h126v234H294z"/>
      <g id="m3-rim">${roda(356, 476, 54, { raigs: 6, color: '#536069', gruix: 9 })}</g>
    </g>`;

    /* 6 fils estirats en paral·lel des dels corrons fins als 6 fusos del carro */
    s += `<g id="m3-fils" fill="none" stroke-linecap="round"></g>`;

    /* Carro mòbil sobre rails amb 6 fusos inclinats i fil-guia */
    s += `<g id="m3-carro" data-part="carro">
      <path class="t" fill="url(#g-fustac)" d="M-58 468l136-18 68 44-136 18z"/>
      <path class="t fusta2" d="M-58 468v64l68 44v-64z"/>
      <path class="t fusta" d="M10 512l136-18v64L10 576z"/>
      <g id="m3-w0">${roda(-26, 560, 22, { raigs: 6, color: '#536069', gruix: 6 })}</g>
      <g id="m3-w1">${roda(98, 544, 22, { raigs: 6, color: '#536069', gruix: 6 })}</g>
      <g data-part="fus" data-exp="26 -58">
        ${Array.from({ length: 6 }, (_, i) => {
          const sx = -26 + i * 24, sy = 486 - i * 3.1;
          return `<g>
            <path d="M${sx} ${sy}L${sx - 34} ${sy - 134}" stroke="#4e5860" stroke-width="5" stroke-linecap="round"/>
            <path id="m3-cop${i}" class="t" fill="url(#g-cotoblanc)" d="M${sx - 8} ${sy - 20}L${sx - 26} ${sy - 104}h10l24 80z"/>
          </g>`;
        }).join('')}
        <path id="m3-guia" d="M-64 388l132-18" stroke="#2f7fb5" stroke-width="3.8" stroke-linecap="round"/>
      </g>
    </g>`;

    s += `<g>${retol(270, 44, 'corrons de la Water Frame', { fons: '#b9722a', w: 235 })}<text x="415" y="52" class="tx-gg mig">+</text>${retol(555, 44, 'carro de la Jenny', { fons: '#2f7fb5', w: 175 })}<text x="668" y="52" class="tx-gg mig">=</text>${retol(795, 44, 'MULA: fil fi i fort', { fons: '#f2c230', color: '#2a2420', vora: '#2a2420', w: 205, h: 36 })}</g>`;
    s += RI.innova(765, 92, 'INNOVACIÓ · corrons s’aturen al final i el carro fa l’últim estirament', { apunta: [368, 285], halo: [375, 285, 76, 40], w: 505 });
    s += `<g id="m3-r1" opacity="0">${retol(750, 152, '1 · el carro surt: els corrons donen metxa i els fusos la torcen', { fons: '#d9482b', w: 430 })}</g>
          <g id="m3-r2" opacity="0">${retol(750, 152, '2 · corrons PARATS: un últim estirament fa el fil ultra-fi', { fons: '#2a2420', w: 420 })}</g>
          <g id="m3-r3" opacity="0">${retol(750, 152, '3 · el carro torna i el fil-guia baixa per bobinar els 6 cons', { fons: '#2f7fb5', w: 410 })}</g>`;
    s += `</g>`;

    /* === VISTA 2: SECCIÓ LATERAL (1 CAP CLAR) === */
    s += `<g data-vista="tall">`;
    s += `<g data-guia="1"><path d="M200 150V96M325 250V198M620 550v52"/></g>`;
    s += `<rect class="t pedra" x="-60" y="600" width="1320" height="120"/><rect class="t" fill="url(#g-ferroc)" x="300" y="590" width="760" height="10"/>`;
    /* 1 bobina clara a la fileta d'entrada */
    s += `<g data-part="fileta" data-exp="-54 0"><path class="t" fill="url(#g-fustac)" d="M120 600V150h30V600zM120 150h190v24H120zM290 174v426h-22V174z"/><ellipse class="t" fill="url(#g-cotocrem)" cx="205" cy="240" rx="34" ry="44"/><path d="M236 244Q272 250 302 278" stroke="#2a2420" stroke-width="11" fill="none"/><path d="M236 244Q272 250 302 278" stroke="#fff8e8" stroke-width="8" fill="none"/></g>`;
    /* 3 parells de corrons (x1 -> x2 -> x4) amb indicador d'aturada en fase 2 */
    s += `<g data-part="corrons" data-exp="0 -56">
      <rect class="t fusta2" x="288" y="252" width="106" height="58" rx="6"/>
      ${[306, 340, 374].map((x, idx) => `<g id="m2-c${idx}"><circle class="t ferro2" cx="${x}" cy="268" r="12"/><path d="M${x - 9} 268h18M${x} 259v18" stroke="#fff" stroke-width="1.4"/></g><g id="m2-b${idx}"><circle class="t fusta3" cx="${x}" cy="296" r="12"/><path d="M${x - 9} 296h18M${x} 287v18" stroke="#fff" stroke-width="1.4"/></g>`).join('')}
      <g id="m2-estat" transform="translate(340 336)"><rect x="-74" y="-12" width="148" height="22" rx="11" fill="#b9722a" stroke="#2a2420" stroke-width="1.8"/><text x="0" y="3" text-anchor="middle" fill="#fff" font-size="11" font-weight="800" font-family="Figtree,sans-serif">CORRONS GIRANT</text></g>
    </g>`;
    /* Fil entre corrons i punta del fus + ona helicoïdal de torsió */
    s += `<line id="m2-fil0" x1="386" y1="282" x2="600" y2="330" stroke="#2a2420" stroke-width="7" stroke-linecap="round"/><line id="m2-fil" x1="386" y1="282" x2="600" y2="330" stroke="#f2c230" stroke-width="4.5" stroke-linecap="round"/><path id="m2-torc" d="" fill="none" stroke="#8f4f12" stroke-width="1.8" stroke-linecap="round"/>`;
    s += `<g data-part="carro" id="m2-carro"><rect class="t" fill="url(#g-fustac)" x="-70" y="470" width="170" height="80" rx="8"/><g id="m2-w0">${roda(-36, 566, 24, { raigs: 6 })}</g><g id="m2-w1">${roda(66, 566, 24, { raigs: 6 })}</g><g data-part="fus" data-exp="0 -54"><path d="M40 500L-6 322" class="t" stroke-width="7"/><path id="m2-cop" class="t" fill="url(#g-cotoblanc)" d="M28 470L6 380h12l24 86z"/><path id="m2-guia" d="M-24 352H22" stroke="#2f7fb5" stroke-width="4.2" stroke-linecap="round"/></g></g>`;
    s += RI.innova(760, 52, 'INNOVACIÓ · corrons (Water Frame) + carro mòbil (Jenny)', { apunta: [340, 282], halo: [340, 282, 58, 42], w: 435 });
    s += `<g id="m2-r1" opacity="0">${retol(760, 104, '1 · el carro surt: els corrons donen metxa i el fus la torça', { fons: '#d9482b', w: 440 })}</g>
          <g id="m2-r2" opacity="0">${retol(760, 104, '2 · corrons PARATS: el carro estira una mica més → fil molt fi', { fons: '#2a2420', w: 470 })}</g>
          <g id="m2-r3" opacity="0">${retol(760, 104, '3 · el carro torna i el fus enrotlla el fil acabat', { fons: '#2f7fb5', w: 400 })}</g>`;
    /* cota del recorregut del carro */
    s += `<g opacity=".85"><path d="M449 178v20M954 178v20M449 188H954" stroke="#2a2420" stroke-width="2" fill="none"/><path d="M449 188l12-6v12zM954 188l-12-6v12z" fill="#2a2420"/><rect x="574" y="176" width="256" height="24" rx="12" fill="#fffdf7" stroke="#2a2420" stroke-width="1.5"/><text x="702" y="193" class="tx-p mig" style="font-weight:800">el carro recorre ≈ 1,5 m (no a escala)</text></g>`;
    s += `</g>`;

    return svg(s);
  }

  function animaMula({ p, t, k, el }) {
    /* Vista 3D */
    if (el('m3-carro')) {
      const s = p < 0.45 ? tram(p, 0, 0.45, 0.08, 0.78) : p < 0.6 ? tram(p, 0.45, 0.6, 0.78, 0.96) : tram(p, 0.6, 1, 0.96, 0.08);
      const cx = lerp(455, 920, s), cy = lerp(0, -52, s);
      el('m3-carro').setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`);
      const rotRoda = (s * 420) % 360;
      el('m3-w0').setAttribute('transform', `rotate(${rotRoda.toFixed(1)} -26 560)`);
      el('m3-w1').setAttribute('transform', `rotate(${rotRoda.toFixed(1)} 98 544)`);

      const g = p < 0.45 ? 4.8 : p < 0.6 ? tram(p, 0.45, 0.6, 4.8, 2.1) : 2.1;
      const torcAmp = p < 0.6 ? (p < 0.45 ? 2.2 : 3.4) : 0;
      let fils = '';
      for (let i = 0; i < 6; i++) {
        const sx = cx - 60 + i * 24, sy = cy + 352 - i * 3.1;
        /* Sortida distribuïda al llarg del front de corrons perquè els 6 fils no s'encreuin en X */
        const rx = 408 + (i - 2.5) * 4, ry = 278 + i * 3.2;
        fils += `<path d="M${rx.toFixed(1)} ${ry.toFixed(1)}L${sx.toFixed(1)} ${sy.toFixed(1)}" stroke="#2a2420" stroke-width="${(g + 2.2).toFixed(1)}"/><path d="M${rx.toFixed(1)} ${ry.toFixed(1)}L${sx.toFixed(1)} ${sy.toFixed(1)}" stroke="#f2c230" stroke-width="${g.toFixed(1)}"/>`;
        if (torcAmp > 0) fils += `<path d="${onaFil(rx, ry, sx, sy, t * 22 + i * 0.6, torcAmp, 0.2)}" stroke="#8f4f12" stroke-width="1.5"/>`;
        const w = p < 0.6 ? 0 : tram(p, 0.6, 1, 0, 8);
        const bx = -26 + i * 24, by = 486 - i * 3.1;
        el('m3-cop' + i).setAttribute('d', `M${(bx - 8 - w).toFixed(1)} ${by - 20}L${bx - 26} ${by - 104}h10l${(24 + w * 2).toFixed(1)} 80z`);
      }
      el('m3-fils').innerHTML = fils;

      const gira = p < 0.45 ? (t * 210) % 360 : 0;
      for (let idx = 0; idx < 3; idx++) {
        const rx = 332 + idx * 37;
        el('m3-c' + idx).setAttribute('transform', `rotate(${(gira * (1 + idx * 0.4)).toFixed(1)} ${rx} 268)`);
        el('m3-b' + idx).setAttribute('transform', `rotate(${(-gira * (1 + idx * 0.4)).toFixed(1)} ${rx} 296)`);
      }
      const st3 = el('m3-estat');
      if (st3) {
        st3.firstChild.setAttribute('fill', p < 0.45 ? '#b9722a' : p < 0.6 ? '#d9482b' : '#2f7fb5');
        st3.lastChild.textContent = p < 0.45 ? 'CORRONS GIRANT' : p < 0.6 ? 'CORRONS PARATS!' : 'PARATS · ENROTLLA';
      }
      el('m3-rim').setAttribute('transform', `rotate(${(k < 2 ? (t * 160) : (t * 90)).toFixed(1)} 356 476)`);
      el('m3-guia').setAttribute('transform', p >= 0.6 ? `translate(0 ${(Math.sin(((p - 0.6) / 0.4) * Math.PI) * 26).toFixed(1)})` : '');
      ['m3-r1', 'm3-r2', 'm3-r3'].forEach((id, i) => el(id).setAttribute('opacity', i === k ? 1 : 0));
    }

    /* Vista Secció lateral */
    if (el('m2-carro')) {
      const s = p < 0.45 ? tram(p, 0, 0.45, 0, 0.8) : p < 0.6 ? tram(p, 0.45, 0.6, 0.8, 1) : tram(p, 0.6, 1, 1, 0);
      const x = lerp(455, 960, s);
      el('m2-carro').setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
      const rotW = (s * 420) % 360;
      el('m2-w0').setAttribute('transform', `rotate(${rotW.toFixed(1)} -36 566)`);
      el('m2-w1').setAttribute('transform', `rotate(${rotW.toFixed(1)} 66 566)`);
      const g = p < 0.45 ? 4.8 : p < 0.6 ? tram(p, 0.45, 0.6, 4.8, 2.2) : 2.2;
      ['m2-fil0', 'm2-fil'].forEach((id, i) => { const l = el(id); l.setAttribute('x2', (x - 6).toFixed(1)); l.setAttribute('y2', 322); l.setAttribute('stroke-width', (g + (i ? 0 : 2.6)).toFixed(1)); });
      el('m2-torc').setAttribute('d', p < 0.6 ? onaFil(386, 282, x - 6, 322, t * 22, p < 0.45 ? 2.4 : 3.6, 0.22) : '');
      const gira = p < 0.45 ? (t * 200) % 360 : 0;
      for (let idx = 0; idx < 3; idx++) {
        const rx = 306 + idx * 34;
        el('m2-c' + idx).setAttribute('transform', `rotate(${(gira * (1 + idx * 0.4)).toFixed(1)} ${rx} 268)`);
        el('m2-b' + idx).setAttribute('transform', `rotate(${(-gira * (1 + idx * 0.4)).toFixed(1)} ${rx} 296)`);
      }
      const st2 = el('m2-estat');
      if (st2) {
        st2.firstChild.setAttribute('fill', p < 0.45 ? '#b9722a' : p < 0.6 ? '#d9482b' : '#2f7fb5');
        st2.lastChild.textContent = p < 0.45 ? 'CORRONS GIRANT' : p < 0.6 ? 'CORRONS PARATS!' : 'PARATS · ENROTLLA';
      }
      el('m2-guia').setAttribute('transform', p >= 0.6 ? `translate(0 ${(Math.sin(((p - 0.6) / 0.4) * Math.PI) * 34).toFixed(1)})` : '');
      const w = p < 0.6 ? 0 : tram(p, 0.6, 1, 0, 14);
      el('m2-cop').setAttribute('d', `M${28 - w} 470L6 380h12l${24 + w} 86z`);
      ['m2-r1', 'm2-r2', 'm2-r3'].forEach((id, i) => el(id).setAttribute('opacity', i === k ? 1 : 0));
    }
  }

  RI.capitol({
    id: 'textil', titol: 'El cotó', llegenda: [['#fff8e8', 'metxa (cotó tou)'], ['#f2c230', 'fil estirat i torçut'], ['#d9482b', 'fil de trama']],
    escenes: [
      {
        id: 'cursa', nom: 'La cursa', any: '1733 – 1785', durada: 30, bucle: true,
        pregunta: 'Per què un invent en demana un altre?',
        intro: 'Per fer tela calen dues feines: <b>filar</b> (fer fil amb la fibra) i <b>teixir</b> (encreuar fils). Quan una s’accelera, l’altra no dona l’abast. Mira com es decanta la balança.',
        svg: cursa, anima: animaCursa, llegenda: false,
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
        svg: teler, anima: animaTeler, innova: [1],
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D',
            model: 'Teler manual de fusta amb llançadora volant · perspectiva 3D',
            etiquetes: [['ordit', 600, 128, 600, 200], ['pinta', 980, 205, 870, 260, 'Pinta i batà'], ['caixes', 70, 250, 150, 306, 'Caixa i taco'], ['llancadora', 450, 286, 420, 338], ['cordill', 1025, 420, 740, 384, 'Cordill i mànec'], ['tela', 600, 650, 600, 520]]
          },
          {
            id: 'tall', nom: 'Secció lateral (calada)',
            model: 'Secció lateral del teler: obertura de la calada i picada de la pinta',
            etiquetes: [['ordit', 210, 185, 225, 305], ['pinta', 686, 165, 686, 260, 'Batà i pinta'], ['llancadora', 560, 488, 624, 392], ['tela', 960, 185, 945, 345]]
          },
          {
            id: 'planta', nom: 'Planta (des de dalt)',
            model: 'Vista zenital del teler · recorregut complet de la llançadora',
            etiquetes: [['ordit', 600, 108, 600, 195], ['llancadora', 360, 250, 300, 318, 'Llançadora'], ['caixes', 80, 400, 180, 340, 'Caixa'], ['cordill', 760, 420, 700, 402, 'Cordill i mànec'], ['pinta', 1110, 330, 1024, 330], ['tela', 600, 690, 600, 600]]
          }
        ],
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
        explotada: {
          img: 'img/exp-teler.webp',
          model: 'Làmina tècnica en vista explotada · Teler manual amb llançadora volant (John Kay, 1733)',
          guies: '<path d="M490 505L635 580M660 445L760 515M865 255L985 190M570 595L670 670"/><circle cx="490" cy="505" r="4.5"/><circle cx="660" cy="445" r="4.5"/><circle cx="570" cy="595" r="4.5"/>',
          zones: [['ordit', 330, 215, 115, 70], ['pinta', 680, 385, 130, 58], ['llancadora', 775, 445, 92, 46], ['caixes', 515, 610, 75, 44], ['caixes', 935, 345, 75, 44], ['cordill', 1020, 220, 95, 75], ['tela', 900, 575, 135, 80]],
          etiquetes: [['ordit', 180, 125, 330, 215], ['pinta', 595, 145, 640, 340], ['cordill', 1030, 115, 995, 185], ['caixes', 1055, 355, 935, 345, 'Caixa'], ['llancadora', 645, 540, 760, 455], ['tela', 1030, 695, 915, 595]]
        },
        real: {
          img: 'img/real-teler.webp',
          titol: 'Teler manual de teixidor, encara en funcionament',
          museu: 'Weaver’s Cottage · Kilbarchan (Escòcia)',
          lic: 'Foto: Richard Sutcliffe · Wikimedia Commons · CC BY-SA 2.0',
          etiquetes: [['tela', 70, 62, 'Tela'], ['ordit', 52, 48, 'Ordit']]
        },
        clau: 'Un sol teixidor fa teles amples i treballa el doble de ràpid: de cop, falta fil.',
        batx: { titol: 'Kay i la por a les màquines', text: 'Teixidors que temien perdre la feina van assaltar la casa de Kay, que va acabar emigrant a França. La resistència a les màquines és anterior al ludisme (1811-1816) i forma part de la història de cada innovació.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'jenny', nom: 'Spinning Jenny', any: '1764', qui: 'James Hargreaves', durada: 10,
        model: 'Spinning Jenny de vuit fusos, vista des de dalt · esquema didàctic',
        pregunta: 'Com fila una sola persona vuit fils alhora?',
        intro: 'Filar és fer dues coses: <b>estirar</b> la fibra i <b>tòrcer-la</b> perquè no es trenqui. La Jenny ho fa amb vuit fils a la vegada, amb una roda i una pinça.',
        svg: jenny, anima: animaJenny, innova: [1],
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D',
            model: 'Spinning Jenny de Hargreaves · bastiment inclinat amb 8 fusos i carro-pinça',
            etiquetes: [['metxes', 225, 598, 240, 492, 'Fileta de metxes'], ['pinca', 0, -128, 0, -72, 'Pinça mòbil', 'j3-carro'], ['fusos', 840, 128, 825, 225, 'Fusos i fil-guia'], ['roda', 1070, 215, 995, 280], ['corda', 645, 578, 645, 480, 'Tambor i corda']]
          },
          {
            id: 'planta', nom: 'Planta (8 fusos)',
            model: 'Spinning Jenny vista des de dalt · 8 fils en paral·lel',
            etiquetes: [['metxes', 185, 110, 185, 170, 'Metxes'], ['pinca', 0, 108, 0, 152, 'Pinça mòbil', 'j2-pinca'], ['fusos', 835, 110, 830, 184, 'Fusos'], ['roda', 1070, 115, 1070, 222], ['corda', 960, 664, 960, 620, 'Tambor i corda']]
          }
        ],
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
        etiquetes: [['metxes', 185, 110, 185, 170, 'Metxes'], ['pinca', 0, 108, 0, 152, 'Pinça mòbil', 'j2-pinca'], ['fusos', 835, 110, 830, 184, 'Fusos'], ['roda', 1070, 115, 1070, 222], ['corda', 960, 664, 960, 620, 'Tambor i corda']],
        explotada: {
          img: 'img/exp-jenny.webp',
          model: 'Làmina tècnica en vista explotada · Spinning Jenny (James Hargreaves, 1764)',
          guies: '<path d="M225 560L335 455M385 635L495 530M265 395L380 310M755 280L805 215M905 335L955 270M760 475L925 570"/><circle cx="335" cy="455" r="4.5"/><circle cx="495" cy="530" r="4.5"/><circle cx="380" cy="310" r="4.5"/><circle cx="755" cy="280" r="4.5"/><circle cx="905" cy="335" r="4.5"/><circle cx="760" cy="475" r="4.5"/>',
          zones: [['metxes', 280, 590, 175, 105], ['pinca', 295, 465, 185, 55], ['corda', 715, 385, 135, 95], ['fusos', 895, 195, 155, 105], ['roda', 990, 540, 135, 155]],
          etiquetes: [['pinca', 145, 125, 245, 495, 'Pinça mòbil'], ['metxes', 130, 685, 220, 585, 'Bobines de metxa'], ['corda', 635, 610, 675, 425, 'Tambor i corda'], ['fusos', 655, 115, 835, 165, 'Fusos'], ['roda', 1065, 265, 1005, 435]]
        },
        real: {
          img: 'img/real-jenny.webp',
          titol: 'Spinning Jenny (model del tipus de Hargreaves)',
          museu: 'North Mill Museum · Belper, Derbyshire (Regne Unit)',
          lic: 'Foto: Betty Longbottom · Wikimedia Commons · CC BY-SA 2.0',
          etiquetes: [['fusos', 52, 13, 'Fusos'], ['metxes', 62, 46, 'Bobines de metxa']]
        },
        clau: 'Una màquina petita, barata i manual: multiplica el fil sense sortir de casa.',
        batx: { titol: 'Una màquina domèstica', text: 'La Jenny no necessitava motor i cabia en una casa: va reforçar el treball a domicili abans que la fàbrica el substituís. El seu fil, poc resistent, servia per a la trama però no per a l’ordit.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'water', nom: 'Water Frame', any: '1769', qui: 'Richard Arkwright', durada: 12,
        model: 'Un cap de filatura de la Water Frame, de costat · esquema didàctic',
        pregunta: 'Com s’estira el cotó sense mans?',
        intro: 'El secret són <b>tres parells de corrons</b>. Cada parell gira més de pressa que l’anterior i, com que estira més fil del que rep, el cotó s’aprima.',
        svg: water, anima: animaWater, innova: [1],
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D (4 fusos)',
            model: 'Water Frame d’Arkwright · tracció hidràulica, engranatges cònics i 4 fusos',
            etiquetes: [['aigua', 185, 205, 185, 310, 'Roda hidràulica'], ['metxa', 965, 98, 835, 148, 'Bobines de metxa'], ['corrons', 320, 290, 445, 296, 'Corrons i pesos'], ['aleta', 1030, 520, 862, 515, 'Aletes i bobines']]
          },
          {
            id: 'tall', nom: 'Secció (1 cap de filatura)',
            model: 'Detall d’un cap de filatura · 3 parells de corrons a velocitats creixents',
            etiquetes: [['metxa', 500, 50, 580, 120, 'Bobina de metxa'], ['corrons', 392, 330, 556, 300, 'Corrons'], ['aleta', 480, 600, 560, 540, 'Aleta'], ['aigua', 200, 250, 180, 350, 'Roda hidràulica']]
          }
        ],
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
        etiquetes: [['metxa', 500, 50, 580, 120, 'Bobina de metxa'], ['corrons', 392, 330, 556, 300, 'Corrons'], ['aleta', 480, 600, 560, 540, 'Aleta'], ['aigua', 200, 250, 180, 350, 'Roda hidràulica']],
        explotada: {
          img: 'img/exp-water.webp',
          model: 'Làmina tècnica en vista explotada · Water Frame (Richard Arkwright, 1769)',
          guies: '<path d="M235 465L425 415M485 170L485 215M615 280L730 230M615 335L770 295M615 390L815 355M605 510L785 600M365 655L520 565"/><circle cx="425" cy="415" r="4.5"/><circle cx="485" cy="215" r="4.5"/><circle cx="615" cy="280" r="4.5"/><circle cx="615" cy="335" r="4.5"/><circle cx="615" cy="390" r="4.5"/><circle cx="605" cy="510" r="4.5"/>',
          zones: [['aigua', 200, 445, 115, 160], ['metxa', 485, 115, 115, 72], ['corrons', 835, 335, 175, 125], ['aleta', 890, 575, 130, 115]],
          etiquetes: [['aigua', 160, 215, 195, 330], ['metxa', 260, 105, 440, 125, 'Bobines de metxa'], ['corrons', 830, 135, 800, 215, 'Corrons i pesos'], ['aleta', 1030, 645, 900, 555, 'Aletes i bobines']]
        },
        real: {
          img: 'img/real-water.webp',
          titol: 'Water Frame d’Arkwright (c. 1775)',
          museu: 'Science and Industry Museum · Manchester',
          lic: 'Foto: Clem Rutter · Wikimedia Commons · CC BY 3.0',
          etiquetes: [['metxa', 46, 22, 'Bobines de metxa'], ['corrons', 52, 42, 'Corrons'], ['aleta', 48, 92, 'Aletes i bobines']]
        },
        clau: 'Fil fort, continu i sense força humana: la màquina que va crear la fàbrica.',
        batx: { titol: 'Arkwright, empresari', text: 'Més que inventor, Arkwright va ser organitzador: va reunir invents d’altres, capital i mà d’obra (sovint infantil) a Cromford (1771). Les seves patents van ser anul·lades el 1785 i la màquina es va estendre per tot Lancashire.', font: 'https://www.cromfordmills.org.uk/', fontNom: 'Cromford Mills' }
      },
      {
        id: 'mula', nom: 'La mula', any: '1779', qui: 'Samuel Crompton', durada: 10,
        model: 'Mula de filar, de costat (un sol fus) · esquema didàctic',
        pregunta: 'I si ajuntem el millor de les dues màquines?',
        intro: 'Crompton combina els <b>corrons</b> de la Water Frame amb el <b>carro mòbil</b> de la Jenny. Com la mula, filla d’egua i ase, és un encreuament.',
        svg: mula, anima: animaMula, innova: [0, 1],
        vistes: [
          {
            id: 'tall', nom: 'De costat (1 fus)',
            model: 'Secció lateral d’un fus de la mula · estirament i bobinatge',
            etiquetes: [['fileta', 90, 110, 140, 160], ['corrons', 400, 210, 340, 260], ['carro', 15, 646, 15, 540, 'Carro mòbil', 'm2-carro'], ['fus', 112, 408, 22, 420, 'Fus i fil-guia', 'm2-carro']]
          },
          {
            id: '3d', nom: 'Perspectiva (6 fusos)',
            model: 'Mula de Crompton · tren de corrons + carro mòbil de 6 fusos sobre rails',
            etiquetes: [['fileta', 165, 118, 185, 185], ['corrons', 380, 198, 375, 270], ['carro', -10, 640, 20, 540, 'Carro mòbil', 'm3-carro'], ['fus', 65, 285, -18, 385, 'Fusos i fil-guia', 'm3-carro']]
          }
        ],
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
        etiquetes: [['fileta', 90, 110, 140, 160], ['corrons', 400, 210, 340, 260], ['carro', 15, 646, 15, 540, 'Carro mòbil', 'carro'], ['fus', 112, 408, 22, 420, 'Fus i fil-guia', 'carro']],
        explotada: {
          img: 'img/exp-mula.webp',
          model: 'Làmina tècnica en vista explotada · Spinning Mule (Samuel Crompton, 1779)',
          guies: '<path d="M685 570L685 605M855 625L855 660M765 375L765 465M910 420L910 510M430 480L485 535"/><circle cx="685" cy="605" r="4.5"/><circle cx="855" cy="660" r="4.5"/><circle cx="765" cy="465" r="4.5"/><circle cx="910" cy="510" r="4.5"/><circle cx="485" cy="535" r="4.5"/>',
          zones: [['fileta', 225, 225, 125, 145], ['corrons', 395, 345, 95, 85], ['carro', 805, 520, 230, 125], ['fus', 860, 325, 165, 95]],
          etiquetes: [['fileta', 140, 115, 235, 200], ['corrons', 460, 145, 410, 310], ['fus', 835, 145, 825, 285, 'Fusos i fil-guia'], ['carro', 960, 685, 880, 480, 'Carro mòbil sobre rails']]
        },
        real: {
          img: 'img/real-mula.webp',
          titol: 'Mula de filar del segle XIX (ja automàtica)',
          museu: 'Quarry Bank Mill · Styal, Cheshire (Regne Unit)',
          lic: 'Foto: David Dixon · Wikimedia Commons · CC BY-SA 2.0',
          etiquetes: [['fus', 18, 32, 'Fusos'], ['carro', 30, 62, 'Carro mòbil']]
        },
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
      { tipus: 'toca', esc: 'llancadora', part: 'caixes', p: 0.3, q: 'Toca la peça que va afegir John Kay perquè la llançadora volés sola.', e: 'Les caixes dels costats, amb un taco que colpeja la llançadora quan el teixidor estira el cordill.' },
      { tipus: 'toca', esc: 'water', part: 'corrons', p: 0.4, q: 'Toca la peça de la Water Frame que estira el cotó sense mans.', e: 'Els corrons: cada parell gira més de pressa que l’anterior i el cotó s’aprima.' },
      { tipus: 'ordena', esc: 'mula', q: 'Ordena el que fa la mula en cada cicle.', e: 'Surt el carro → últim estirament amb els corrons parats → el carro torna i enrotlla.' },
      { q: 'Per què les innovacions tèxtils arriben «en cadena»?', o: ['Per casualitat', 'Perquè cada invent crea un nou coll d’ampolla en una altra fase', 'Perquè ho manava el rei'], c: 1, e: 'Accelerar una fase deixa enrere l’altra i empeny a buscar una nova solució.' }
    ]
  });
})();
