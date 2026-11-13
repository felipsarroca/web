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

  /* ---------- 2 · teler i llançadora volant (3D + secció + planta) ---------- */
  function teler() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA 3D === */
    s += `<g data-vista="3d">`;
    s += `<ellipse cx="600" cy="616" rx="440" ry="38" fill="#5e4931" opacity=".12"/>`;
    /* guies d'explosió (connecten el bastiment amb les peces separades) */
    s += `<g data-guia="1"><path d="M350 220L295 190M850 220L795 190M600 132V60M300 265H210M900 265H990M310 515L350 567M890 515L930 567M600 585V623"/></g>`;

    /* Bastiment fix de roure (4 muntants + travessers + castell superior) */
    s += `<g><path class="t" fill="url(#g-fustac)" d="M346 132h24v350h-24zM830 132h24v350h-24z"/>
      <path class="t fusta2" d="M346 250h508v20H346zM346 420l-68 78h24l68-78zM854 420l68 78h-24l-68-78z"/>
      <path class="t" fill="url(#g-fustac)" d="M276 112h28v475h-28zM896 112h28v475h-28zM268 106h664v26H268z"/>
      <path class="t fusta2" d="M294 132l54 22v18l-54-22zM906 132l-54 22v18l54-22zM276 540h648v24H276z"/>
      <circle cx="290" cy="119" r="3.5" fill="#3a2412"/><circle cx="910" cy="119" r="3.5" fill="#3a2412"/><circle cx="290" cy="552" r="3.5" fill="#3a2412"/><circle cx="910" cy="552" r="3.5" fill="#3a2412"/></g>`;

    /* Peça: plegador d'ordit posterior + tela d'ordit en dos plans */
    s += `<g data-part="ordit" data-exp="-55 -30">
      <rect class="t" fill="url(#g-fustac)" x="356" y="198" width="488" height="36" rx="14"/>
      <rect class="t1" fill="url(#g-cotocrem)" x="380" y="195" width="440" height="42" rx="8"/>
      <path d="M405 196v40M445 196v40M485 196v40M525 196v40M565 196v40M605 196v40M645 196v40M685 196v40M725 196v40M765 196v40M800 196v40" stroke="#bba987" stroke-width="1.3" opacity=".7"/>
      <circle class="t ferro2" cx="356" cy="216" r="17"/><circle cx="356" cy="216" r="6" fill="#2a2420"/>
      <path id="t3-fa" d="" fill="none" stroke="#3c3127" stroke-width="2.1"/>
      <path id="t3-fb" d="" fill="none" stroke="#9d8864" stroke-width="1.9"/>
    </g>`;

    /* Llissos (marcs d'alçament de l'ordit — formen part de la preparació de l'ordit) */
    s += `<g data-part="ordit" data-exp="0 -56">
      <g id="t3-m1"><rect class="t fusta2" x="378" y="232" width="444" height="10" rx="3"/><rect class="t fusta2" x="378" y="330" width="444" height="10" rx="3"/><path d="${Array.from({ length: 18 }, (_, i) => `M${396 + i * 24} 242v88`).join('')}" stroke="#594a3c" stroke-width="1.2" opacity=".75"/></g>
      <g id="t3-m2"><rect class="t fusta" x="370" y="248" width="460" height="10" rx="3"/><rect class="t fusta" x="370" y="346" width="460" height="10" rx="3"/><path d="${Array.from({ length: 18 }, (_, i) => `M${388 + i * 25} 258v88`).join('')}" stroke="#9b7b4e" stroke-width="1.2" opacity=".75"/></g>
    </g>`;

    /* Càlculs (pedals inferiors que mouen els llissos) */
    s += `<g data-part="ordit" data-exp="0 38">
      <path id="t3-ped1" class="t fusta3" d="M510 562h52l14 36h-72z"/>
      <path id="t3-ped2" class="t fusta2" d="M638 562h52l14 36h-72z"/>
      <path d="M536 340v222M664 356v206" stroke="#7c5b37" stroke-width="1.6" stroke-dasharray="4 3" opacity=".7"/>
    </g>`;

    /* Batà oscil·lant amb pinta, pista ampliada, caixes laterals, cordill i llançadora */
    s += `<g id="t3-bata">
      <g data-part="pinta" data-exp="0 -72">
        <path class="t" fill="url(#g-fustac)" d="M312 126h18v242h-18zM870 126h18v242h-18z"/>
        <circle class="t llauto" cx="321" cy="128" r="6"/><circle class="t llauto" cx="879" cy="128" r="6"/>
        <rect class="t" fill="url(#g-fustac)" x="172" y="348" width="856" height="22" rx="4"/>
        <rect class="t2 fusta3" x="280" y="308" width="640" height="14" rx="3"/>
        <path d="${Array.from({ length: 40 }, (_, i) => `M${292 + i * 16} 322v26`).join('')}" stroke="#3e3934" stroke-width="1.4" opacity=".8"/>
      </g>
      <g data-part="caixes" data-exp="-58 14">
        <rect class="t fusta" x="150" y="318" width="92" height="50" rx="5"/><rect class="fusta3" x="160" y="326" width="76" height="28" rx="3"/>
        <rect id="t3-tacoL" class="t ferro2" x="164" y="328" width="14" height="24" rx="2"/>
      </g>
      <g data-part="caixes" data-exp="58 14">
        <rect class="t fusta" x="958" y="318" width="92" height="50" rx="5"/><rect class="fusta3" x="964" y="326" width="76" height="28" rx="3"/>
        <rect id="t3-tacoR" class="t ferro2" x="1022" y="328" width="14" height="24" rx="2"/>
      </g>
      <path id="t3-trama" d="M236 338H236" class="nf" stroke="#d9482b" stroke-width="4.2" stroke-linecap="round"/>
      <g data-exp="0 -26"><g id="t3-llan" data-part="llancadora">
        <path class="t" fill="#7d4c23" d="M-46 0q22-14 46-14t46 14q-22 14-46 14t-46-14z"/>
        <path fill="#b7bfc4" stroke="#2a2420" stroke-width="1.4" d="M-46 0l12-6v12zM46 0l-12-6v12z"/>
        <ellipse cx="0" cy="0" rx="22" ry="7" fill="#3a2310"/>
        <ellipse cx="0" cy="0" rx="17" ry="5" fill="#d9482b" stroke="#fff3d2" stroke-width=".9"/>
        <circle cx="-18" cy="11" r="3" fill="#c9952a"/><circle cx="18" cy="11" r="3" fill="#c9952a"/>
      </g></g>
      <g data-part="cordill" data-exp="0 46">
        <path id="t3-cord" d="M174 334L600 412L1026 334" class="nf" stroke="#4c3926" stroke-width="2.4" stroke-dasharray="5 3"/>
        <g id="t3-manec"><rect class="t" fill="url(#g-fustac)" x="-9" y="-14" width="18" height="44" rx="7"/><circle class="t llauto" cx="0" cy="-6" r="5"/></g>
      </g>
    </g>`;

    /* Peça: pitral frontal + tela teixida + plegador de tela inferior */
    s += `<g data-part="tela" data-exp="40 52">
      <path class="t" fill="#eddcb1" d="M312 436h576l28 66H284z"/>
      <path d="${Array.from({ length: 7 }, (_, i) => `M${308 - i * 3} ${444 + i * 8}H${892 + i * 3}`).join('')}" stroke="#c96b27" stroke-width="2.1" opacity=".85"/>
      <path d="${Array.from({ length: 28 }, (_, i) => `M${322 + i * 20.5} 436l${(i - 13.5) * 1.1} 66`).join('')}" stroke="#4e3d28" stroke-width="1" opacity=".4"/>
      <rect class="t" fill="url(#g-fustac)" x="268" y="492" width="664" height="26" rx="10"/>
      <rect class="t" fill="url(#g-fustac)" x="290" y="534" width="620" height="36" rx="14"/>
      <rect class="t1" fill="#e6d09c" x="314" y="530" width="572" height="44" rx="8"/>
      <circle class="t ferro2" cx="912" cy="552" r="18"/>
    </g>`;
    s += `<g data-fase="0.17-0.36,0.67-0.86">${retol(600, 46, 'un sol cop de mà: la llançadora vola', { fons: '#d9482b', w: 340 })}</g>`;
    s += `</g>`;

    /* === VISTA 2: SECCIÓ LATERAL (OBERTURA DE LA CALADA) === */
    s += `<g data-vista="tall">`;
    s += `<g data-guia="1"><path d="M180 350V170M470 290V170M525 430V515M670 300V170M980 420V525"/></g>`;
    /* bastiment lateral fix */
    s += `<path class="t" fill="url(#g-fustac)" d="M160 130h28v470h-28zM980 130h28v470h-28zM150 116h868v26H150zM160 564h848v24H160z"/>`;
    /* plegador d'ordit i creueria */
    s += `<g data-part="ordit" data-exp="-55 0"><circle class="t" fill="url(#g-fustac)" cx="195" cy="360" r="56"/><circle class="t1" fill="url(#g-cotocrem)" cx="195" cy="360" r="46"/><circle class="t ferro2" cx="195" cy="360" r="12"/><circle class="t fusta2" cx="310" cy="342" r="10"/><circle class="t fusta2" cx="350" cy="378" r="10"/><path id="tt-fa" d="" fill="none" stroke="#2a2420" stroke-width="3.6"/><path id="tt-fb" d="" fill="none" stroke="#a68c5c" stroke-width="3.2"/><polygon id="tt-cal" points="350,360 660,290 660,430" fill="#fff8de" opacity=".55"/></g>`;
    /* dos llissos (vertical) */
    s += `<g data-part="ordit" data-exp="0 -64"><g id="tt-m1"><rect class="t fusta2" x="454" y="210" width="24" height="18" rx="4"/><rect class="t fusta2" x="454" y="390" width="24" height="18" rx="4"/><line x1="466" y1="228" x2="466" y2="390" stroke="#3a2f25" stroke-width="2.4"/><circle cx="466" cy="309" r="6" fill="#fff" stroke="#2a2420" stroke-width="2"/></g></g>`;
    s += `<g data-part="ordit" data-exp="0 64"><g id="tt-m2"><rect class="t fusta" x="514" y="290" width="24" height="18" rx="4"/><rect class="t fusta" x="514" y="470" width="24" height="18" rx="4"/><line x1="526" y1="308" x2="526" y2="470" stroke="#7c5e3a" stroke-width="2.4"/><circle cx="526" cy="389" r="6" fill="#fff" stroke="#2a2420" stroke-width="2"/></g></g>`;
    /* batà + pinta + llançadora de perfil */
    s += `<g id="tt-bata"><g data-part="pinta" data-exp="0 -60"><rect class="t" fill="url(#g-fustac)" x="676" y="132" width="20" height="288" rx="4"/><circle class="t llauto" cx="686" cy="136" r="7"/><rect class="t fusta2" x="650" y="394" width="68" height="24" rx="5"/><line x1="686" y1="312" x2="686" y2="394" stroke="#403a35" stroke-width="4"/></g><g data-part="llancadora" data-exp="0 30"><g id="tt-llan"><path class="t" fill="#7d4c23" d="M624 376h46l-6 18h-34z"/><ellipse cx="647" cy="380" rx="14" ry="5" fill="#d9482b"/></g></g></g>`;
    /* pitral + tela + plegador de tela */
    s += `<g data-part="tela" data-exp="55 0"><path class="t" fill="#e8d49d" d="M776 360H958q26 0 26 26v104H956V388H776z"/><rect class="t" fill="url(#g-fustac)" x="946" y="346" width="38" height="36" rx="10"/><circle class="t" fill="url(#g-fustac)" cx="956" cy="500" r="52"/><circle class="t1" fill="#e6cf98" cx="956" cy="500" r="42"/><circle class="t ferro2" cx="956" cy="500" r="12"/></g>`;
    s += `<text x="615" y="90" class="tx mig">Quan els llissos s’obren, la llançadora passa pel túnel (la calada)</text>`;
    s += `</g>`;

    /* === VISTA 3: PLANTA (DES DE DALT) === */
    let parells = '', senars = '';
    for (let i = 0; i < 35; i++) { const x = 260 + i * 20, l = `<path d="M${x} 134V470"/>`; if (i % 2) senars += l; else parells += l; }
    let tr = ''; for (let y = 478; y < 620; y += 9) tr += `M252 ${y}H948`;
    s += `<g data-vista="planta">`;
    s += `<g data-guia="1"><path d="M600 118V66M164 330H94M1036 330H1106M600 634V678"/></g>`;
    s += `<rect class="t" fill="url(#g-fustac)" x="150" y="84" width="900" height="590" rx="10"/><rect class="crema" x="178" y="112" width="844" height="534"/>`;
    s += `<g data-part="ordit" data-exp="0 -48"><rect class="t fusta3" x="230" y="100" width="740" height="34" rx="14"/><g id="tp-fa" stroke="#2a2420" stroke-width="3">${parells}</g><g id="tp-fb" stroke="#b39f7a" stroke-width="2">${senars}</g></g>`;
    s += `<g data-part="tela" data-exp="0 48"><rect class="t" x="250" y="470" width="700" height="150" fill="#ecdcae"/><path d="${tr}" stroke="#c7a548" stroke-width="2.5"/><path d="${Array.from({ length: 35 }, (_, i) => `M${260 + i * 20} 470V620`).join('')}" stroke="#2a2420" stroke-width="1" opacity=".45"/><rect class="t fusta3" x="230" y="620" width="740" height="30" rx="13"/></g>`;
    s += `<g id="tp-bata"><g data-part="pinta" data-exp="0 -28"><rect class="t fusta2" x="170" y="-13" width="860" height="26" rx="5"/><path d="${Array.from({ length: 36 }, (_, i) => `M${250 + i * 20} -13v26`).join('')}" class="t1" opacity=".6"/></g>
      <g data-part="caixes" data-exp="-58 0"><rect class="t fusta" x="164" y="-24" width="84" height="48" rx="6"/></g>
      <g data-part="caixes" data-exp="58 0"><rect class="t fusta" x="952" y="-24" width="84" height="48" rx="6"/></g>
      <path id="tp-trama" d="M210 0H210" class="nf" stroke="#d9a520" stroke-width="5" stroke-linecap="round"/>
      <g data-exp="0 -24"><g data-part="llancadora" id="tp-llan"><path class="t" fill="#8f6038" d="M-44 0q22-17 44-17t44 17q-22 17-44 17t-44-17z"/><ellipse class="t1" fill="#f2c230" cx="0" cy="0" rx="20" ry="7"/></g></g>
      <g data-part="cordill" data-exp="0 46"><path id="tp-cord" d="M206 0L600 96L994 0" class="nf t1" stroke-dasharray="5 4"/><g id="tp-manec"><rect class="t fusta" x="-8" y="-22" width="16" height="48" rx="7"/></g></g></g>`;
    s += `<text x="80" y="300" class="tx mig" transform="rotate(-90 80 300)">ORDIT (fils llargs)</text><text x="1120" y="540" class="tx mig" transform="rotate(90 1120 540)">TELA</text>`;
    s += `</g>`;

    return svg(s);
  }

  function animaTeler({ p, el }) {
    const m = p < 0.5 ? p * 2 : (p - 0.5) * 2, anada = p < 0.5;
    const obert = anada ? 1 : -1;
    const cal = obert * 24;
    const batDy = m < 0.72 ? 0 : m < 0.86 ? tram(m, 0.72, 0.86, 0, 56) : tram(m, 0.86, 1, 56, 0);
    const f = tram(m, 0.34, 0.7, 0, 1, true);
    const xl3 = anada ? lerp(208, 992, f) : lerp(992, 208, f);

    /* Vista 3D */
    if (el('t3-bata')) {
      el('t3-bata').setAttribute('transform', `translate(0 ${batDy.toFixed(1)})`);
      el('t3-llan').setAttribute('transform', `translate(${xl3.toFixed(1)} 338)`);
      const x0 = anada ? 208 : 992;
      el('t3-trama').setAttribute('d', `M${x0} 338H${xl3.toFixed(1)}`);
      el('t3-trama').setAttribute('opacity', m > 0.34 && m < 0.9 ? 1 : 0);
      const cop = m > 0.26 && m < 0.5 ? Math.sin(((m - 0.26) / 0.24) * Math.PI) : 0;
      const mx = 600 + (anada ? 1 : -1) * 44 * cop;
      el('t3-manec').setAttribute('transform', `translate(${mx.toFixed(1)} 412)`);
      el('t3-cord').setAttribute('d', `M174 334L${mx.toFixed(1)} 412L1026 334`);
      el('t3-tacoL').setAttribute('x', anada ? (164 + cop * 24).toFixed(1) : '164');
      el('t3-tacoR').setAttribute('x', !anada ? (1022 - cop * 24).toFixed(1) : '1022');
      const yA = 290 - cal, yB = 290 + cal;
      el('t3-m1').setAttribute('transform', `translate(0 ${(-cal * 0.85).toFixed(1)})`);
      el('t3-m2').setAttribute('transform', `translate(0 ${(cal * 0.85).toFixed(1)})`);
      el('t3-ped1').setAttribute('transform', `translate(0 ${(anada ? 10 : 0)})`);
      el('t3-ped2').setAttribute('transform', `translate(0 ${(anada ? 0 : 10)})`);
      let dA = '', dB = '';
      for (let i = 0; i < 20; i++) {
        const xb = 390 + i * 22, xm = 365 + i * 24.7, xf = 325 + i * 28.9;
        const cmd = `M${xb} 222L${xm.toFixed(1)} ${(i % 2 ? yB : yA).toFixed(1)}L${xf.toFixed(1)} 440`;
        if (i % 2) dB += cmd; else dA += cmd;
      }
      el('t3-fa').setAttribute('d', dA);
      el('t3-fb').setAttribute('d', dB);
    }

    /* Vista Secció lateral (calada) */
    if (el('tt-bata')) {
      const xBat = m < 0.72 ? 0 : m < 0.86 ? tram(m, 0.72, 0.86, 0, 86) : tram(m, 0.86, 1, 86, 0);
      el('tt-bata').setAttribute('transform', `translate(${xBat.toFixed(1)} 0)`);
      const visLlan = m > 0.34 && m < 0.7 ? 1 : 0.28;
      el('tt-llan').setAttribute('opacity', visLlan);
      const y1 = 360 - obert * 52, y2 = 360 + obert * 52;
      el('tt-m1').setAttribute('transform', `translate(0 ${(y1 - 309).toFixed(1)})`);
      el('tt-m2').setAttribute('transform', `translate(0 ${(y2 - 389).toFixed(1)})`);
      el('tt-fa').setAttribute('d', `M220 354L330 356L466 ${y1.toFixed(1)}L776 360`);
      el('tt-fb').setAttribute('d', `M220 366L330 364L526 ${y2.toFixed(1)}L776 360`);
      el('tt-cal').setAttribute('points', `330,360 466,${y1.toFixed(1)} 776,360 526,${y2.toFixed(1)}`);
    }

    /* Vista Planta */
    if (el('tp-bata')) {
      const yb = m < 0.72 ? 330 : m < 0.86 ? tram(m, 0.72, 0.86, 330, 452) : tram(m, 0.86, 1, 452, 330);
      const xl = anada ? lerp(210, 990, f) : lerp(990, 210, f);
      el('tp-bata').setAttribute('transform', `translate(0 ${yb.toFixed(1)})`);
      el('tp-llan').setAttribute('transform', `translate(${xl.toFixed(1)} 0)`);
      const x0 = anada ? 210 : 990;
      el('tp-trama').setAttribute('d', `M${x0} 0H${xl.toFixed(1)}`); el('tp-trama').setAttribute('opacity', m > 0.34 && m < 0.9 ? 1 : 0);
      const mx = 600 + (anada ? 1 : -1) * 46 * (m > 0.26 && m < 0.5 ? Math.sin(((m - 0.26) / 0.24) * Math.PI) : 0);
      el('tp-manec').setAttribute('transform', `translate(${mx.toFixed(1)} 96)`); el('tp-cord').setAttribute('d', `M206 0L${mx.toFixed(1)} 96L994 0`);
      const dalt = anada ? 'tp-fa' : 'tp-fb', baix = anada ? 'tp-fb' : 'tp-fa';
      el(dalt).setAttribute('stroke', '#2a2420'); el(dalt).setAttribute('stroke-width', 3.2); el(baix).setAttribute('stroke', '#b39f7a'); el(baix).setAttribute('stroke-width', 2);
    }
  }

  /* ---------- 3 · Spinning Jenny (Perspectiva 3D + Planta 8 fusos) ---------- */
  const FILES = [190, 240, 290, 340, 390, 440, 490, 540];
  function jenny() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA 3D REALISTA (HARGREAVES) === */
    s += `<g data-vista="3d">`;
    s += `<ellipse cx="600" cy="634" rx="450" ry="34" fill="#5e4931" opacity=".12"/>`;
    s += `<g data-guia="1"><path d="M350 480L296 530M580 510V578M550 280L532 212M820 265L875 215M945 360H1015"/></g>`;

    /* Bastiment fix inclinat de roure */
    s += `<g>
      <path class="t" fill="url(#g-fustac)" d="M220 330l18-10 38 286h-22zM486 410l18-10 24 214h-22zM756 232l18-10 34 318h-22zM916 320l18-10 26 238h-22z"/>
      <path class="t fusta2" d="M242 528h266v16H242zM770 462l168 42v16l-168-42zM236 330l530-98 14 14-530 98zM500 412l434-92 12 16-434 92z"/>
    </g>`;

    /* Tambor horitzontal d'estany i corretja de transmissió inferior */
    s += `<g data-part="corda" data-exp="0 64">
      <path class="t" fill="url(#g-ferroc)" d="M512 480l268-54q16 14 10 38l-268 54q-14-14-10-38z"/>
      <ellipse class="t" fill="#77848c" cx="516" cy="499" rx="11" ry="19"/>
      <ellipse class="t" fill="#5e6a73" cx="784" cy="445" rx="11" ry="19"/>
      <path id="j3-bandes" d="M560 472v36M620 460v36M680 448v36M740 436v36" stroke="#c8d2d8" stroke-width="2" opacity=".6"/>
      <path d="M945 360L786 435M945 452L786 462" class="nf" stroke="#4a3723" stroke-width="5"/>
      <path d="M945 360L786 435" class="flux2 s-taronja" stroke-width="2.5" data-flux="-2"/>
      ${Array.from({ length: 8 }, (_, i) => `<line x1="${535 + i * 32}" y1="${482 - i * 6.5}" x2="${760 + i * 21}" y2="${308 - i * 15}" stroke="#6c5844" stroke-width="1.4" opacity=".65"/>`).join('')}
    </g>`;

    /* Fileta inclinada inferior amb 8 metxes de cotó */
    s += `<g data-part="metxes" data-exp="-52 52">
      <path class="t fusta" d="M236 446l246 46-14 70-246-46z"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const bx = 262 + i * 28, by = 468 + i * 5.2;
        return `<ellipse class="t" fill="url(#g-cotocrem)" cx="${bx}" cy="${by - 20}" rx="12" ry="22"/><ellipse class="t2 fusta3" cx="${bx}" cy="${by - 40}" rx="4" ry="2"/>`;
      }).join('')}
    </g>`;

    /* 8 fils de metxa (actualitzats per JS des de fileta fins a la pinça mòbil) */
    s += `<g id="j3-rovs" fill="none" stroke-linecap="round"></g>`;
    /* 8 fils estirats/torçuts (des de la pinça mòbil fins als 8 fusos) */
    s += `<g id="j3-fils" fill="none" stroke-linecap="round"></g>`;

    /* 8 fusos inclinats al bastidor posterior + cons de fil + fil-guia */
    s += `<g data-part="fusos" data-exp="55 -48">
      <path class="t fusta2" d="M744 278l168 38-8 16-168-38z"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const sx = 760 + i * 20.5, sy = 282 + i * 4.6;
        return `<g>
          <line x1="${sx}" y1="${sy + 26}" x2="${sx + 16}" y2="${sy - 96}" stroke="#5b4c3d" stroke-width="5.5" stroke-linecap="round"/>
          <path class="j3-cop t1" fill="url(#g-cotoblanc)" d="M${sx + 3} ${sy + 4}L${sx + 12} ${sy - 72}L${sx + 20} ${sy - 68}L${sx + 15} ${sy + 8}z"/>
          <path class="j3-mf" d="M${sx + 6} ${sy - 40}l10 3M${sx + 8} ${sy - 24}l10 3" stroke="#b9722a" stroke-width="1.6"/>
        </g>`;
      }).join('')}
      <path id="j3-guia" d="M766 202l164 38" stroke="#2f7fb5" stroke-width="3.2" stroke-linecap="round"/>
    </g>`;

    /* Carro-pinça mòbil sobre els rails */
    s += `<g data-exp="-18 -68"><g id="j3-carro" data-part="pinca">
      <rect class="t" fill="url(#g-fustac)" x="-16" y="-82" width="24" height="148" rx="4" transform="skewY(11)"/>
      <rect id="j3-mord" class="t fusta2" x="8" y="-84" width="16" height="148" rx="4" transform="skewY(11)"/>
      <circle class="t ferro2" cx="-4" cy="-68" r="7"/><circle class="t ferro2" cx="-4" cy="54" r="7"/>
      <rect class="t llauto" x="-10" y="-14" width="28" height="16" rx="4"/>
    </g></g>`;

    /* Gran volant manual a la dreta */
    s += `<g data-part="roda" data-exp="72 15">
      <g id="j3-roda">${roda(946, 360, 108, { raigs: 10, color: '#9f6939', gruix: 14, extra: '<circle class="t ferro2" cx="946" cy="360" r="14"/><rect class="t fusta2" x="1012" y="352" width="28" height="16" rx="6"/>' })}</g>
    </g>`;
    s += persona(1080, 560, 175, { color: '#7a4f9a', brac: 'M-8-68l-28-6M8-68l16-12', attr: 'class="atenua"' });
    s += `<g id="j3-r1" opacity="0">${retol(600, 672, 'la pinça s’obre: surt metxa gruixuda', { fons: '#2a2420', w: 290 })}</g>
          <g id="j3-r2" opacity="0">${retol(600, 672, 'pinça tancada: recula, estira i torça 8 fils alhora', { fons: '#d9482b', w: 375 })}</g>
          <g id="j3-r3" opacity="0">${retol(600, 672, 'el carro torna i el fil-guia bobina els 8 cons', { fons: '#2f7fb5', w: 350 })}</g>`;
    s += `</g>`;

    /* === VISTA 2: PLANTA SUPERIOR (8 FILS EN PARAL·LEL) === */
    s += `<g data-vista="planta">`;
    s += `<g data-guia="1"><path d="M910 140V92M195 360H120M1080 300H1145M600 590V642"/></g>`;
    s += `<rect class="t" fill="url(#g-fustac)" x="120" y="140" width="880" height="450" rx="10"/><rect class="crema" x="146" y="166" width="828" height="398"/>`;
    s += `<g data-part="corda" data-exp="0 52"><path d="M1080 300V620H190V560" class="nf t" stroke-dasharray="7 5"/><path d="M1080 300V620H190V560" class="flux2 s-taronja" stroke-width="3" data-flux="-2"/></g>`;
    s += `<g data-part="metxes" data-exp="48 0">${FILES.map((y) => `<circle class="t" fill="url(#g-cotocrem)" cx="910" cy="${y}" r="21"/><circle cx="910" cy="${y}" r="14" fill="none" stroke="#dfd5be" stroke-width="2" stroke-dasharray="6 4"/><circle class="t1 fusta3" cx="910" cy="${y}" r="6"/>`).join('')}</g>`;
    s += `<g id="j2-fils-m" stroke="#fff" stroke-linecap="round">${FILES.map((y) => `<line class="j2-fm" x1="890" y1="${y}" x2="500" y2="${y}" stroke-width="8"/>`).join('')}</g><g id="j2-fils-f" stroke-linecap="round">${FILES.map((y) => `<line class="j2-ff0" x1="500" y1="${y}" x2="226" y2="${y}" stroke="#2a2420" stroke-width="9"/><line class="j2-ff" x1="500" y1="${y}" x2="226" y2="${y}" stroke="#fff" stroke-width="7"/>`).join('')}</g>`;
    s += `<g data-part="fusos" data-exp="-54 0">${FILES.map((y) => `<g><rect class="t2 fusta2" x="160" y="${y - 4}" width="70" height="8" rx="3"/><ellipse class="j2-cop t2" cx="198" cy="${y}" rx="22" ry="8" fill="url(#g-cotoblanc)"/><path class="j2-mf" d="M186 ${y - 6}l8 12M202 ${y - 6}l8 12" stroke="#2a2420" stroke-width="1.6"/></g>`).join('')}</g>`;
    s += `<g data-exp="0 -54"><g data-part="pinca" id="j2-pinca"><rect class="t fusta" x="-16" y="160" width="14" height="410" rx="5"/><rect id="j2-pinca2" class="t fusta" x="2" y="160" width="14" height="410" rx="5"/><rect class="t fusta2" x="-30" y="150" width="60" height="18" rx="6"/><rect class="t fusta2" x="-30" y="562" width="60" height="18" rx="6"/></g></g>`;
    s += `<g data-part="roda" data-exp="54 0"><g id="j2-roda">${roda(1080, 300, 120, { raigs: 10, color: '#a67547', gruix: 14, extra: '<circle class="t llauto" cx="1150" cy="300" r="12"/>' })}</g></g>`;
    s += `</g>`;

    return svg(s);
  }

  function animaJenny({ p, t, k, el, svg: g }) {
    /* Vista 3D */
    if (el('j3-carro')) {
      const s = p < 0.2 ? tram(p, 0, 0.2, 0.72, 0.56) : p < 0.6 ? tram(p, 0.2, 0.6, 0.56, 0.08) : tram(p, 0.6, 1, 0.08, 0.72);
      const cx = lerp(420, 680, s), cy = lerp(338, 290, s);
      el('j3-carro').setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`);
      el('j3-mord').setAttribute('x', p < 0.2 ? 16 : 8);
      const gruix = p < 0.2 ? 6.2 : p < 0.6 ? tram(p, 0.2, 0.6, 6.2, 2.2) : 2.2;
      const col = gruix < 5 ? '#f2c230' : '#fff8e8';
      let rovs = '', fils = '';
      for (let i = 0; i < 8; i++) {
        const bx = 262 + i * 28, by = 432 + i * 5.2;
        const px = cx - 4 + i * 1.5, py = cy - 66 + i * 16;
        const sx = 772 + i * 20.5, sy = 216 + i * 4.6;
        rovs += `<path d="M${bx} ${by}L${px.toFixed(1)} ${py.toFixed(1)}" stroke="#2a2420" stroke-width="8.5"/><path d="M${bx} ${by}L${px.toFixed(1)} ${py.toFixed(1)}" stroke="#f8efe0" stroke-width="6"/>`;
        fils += `<path d="M${px.toFixed(1)} ${py.toFixed(1)}L${sx} ${sy}" stroke="#2a2420" stroke-width="${(gruix + 2.2).toFixed(1)}"/><path d="M${px.toFixed(1)} ${py.toFixed(1)}L${sx} ${sy}" stroke="${col}" stroke-width="${gruix.toFixed(1)}"/>`;
      }
      el('j3-rovs').innerHTML = rovs;
      el('j3-fils').innerHTML = fils;
      const gir = k >= 1;
      if (gir) el('j3-roda').setAttribute('transform', `rotate(${((t * 170) % 360).toFixed(1)} 946 360)`);
      el('j3-bandes').setAttribute('opacity', gir ? (0.4 + 0.4 * Math.sin(t * 14)).toFixed(2) : '.6');
      if (!g._j3mf) { g._j3mf = Array.from(g.querySelectorAll('.j3-mf')); }
      g._j3mf.forEach((m) => m.setAttribute('transform', gir ? `translate(0 ${((t * 50) % 14 - 7).toFixed(1)})` : ''));
      el('j3-guia').setAttribute('transform', p > 0.6 ? `translate(0 ${(Math.sin(((p - 0.6) / 0.4) * Math.PI * 2) * 18).toFixed(1)})` : '');
      ['j3-r1', 'j3-r2', 'j3-r3'].forEach((id, i) => el(id).setAttribute('opacity', i === k ? 1 : 0));
    }

    /* Vista Planta */
    if (el('j2-pinca')) {
      if (!g._fm) { g._fm = Array.from(g.querySelectorAll('.j2-fm')); g._ff = Array.from(g.querySelectorAll('.j2-ff')); g._ff0 = Array.from(g.querySelectorAll('.j2-ff0')); g._cop = Array.from(g.querySelectorAll('.j2-cop')); g._mf = Array.from(g.querySelectorAll('.j2-mf')); }
      const x = p < 0.2 ? tram(p, 0, 0.2, 300, 480) : p < 0.6 ? tram(p, 0.2, 0.6, 480, 760) : tram(p, 0.6, 1, 760, 300);
      const gruix = p < 0.2 ? 7 : p < 0.6 ? tram(p, 0.2, 0.6, 7, 2.6) : 2.6;
      el('j2-pinca').setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
      el('j2-pinca2').setAttribute('x', p < 0.2 ? 8 : 0);
      g._fm.forEach((l) => l.setAttribute('x2', x.toFixed(1)));
      g._ff.forEach((l) => { l.setAttribute('x1', x.toFixed(1)); l.setAttribute('stroke-width', gruix.toFixed(1)); l.setAttribute('stroke', gruix < 6 ? '#f2c230' : '#fff'); });
      g._ff0.forEach((l) => { l.setAttribute('x1', x.toFixed(1)); l.setAttribute('stroke-width', (gruix + 2.4).toFixed(1)); });
      const ple = p < 0.6 ? 8 : tram(p, 0.6, 1, 8, 13);
      g._cop.forEach((c) => c.setAttribute('ry', ple.toFixed(1)));
      const gir = k >= 1; g._mf.forEach((m) => m.setAttribute('transform', gir ? `translate(${((t * 60) % 16) - 8} 0)` : ''));
      if (gir) el('j2-roda').setAttribute('transform', `rotate(${((t * 160) % 360).toFixed(1)} 1080 300)`);
    }
  }

  /* ---------- 4 · Water Frame (Perspectiva 3D multi-fus + Secció 1 cap) ---------- */
  function water() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA 3D (4 FUSOS + RODA HIDRÀULICA + ENGRANATGES CÒNICS) === */
    s += `<g data-vista="3d">`;
    s += `<rect class="aigua" x="-60" y="644" width="1320" height="76"/><path d="M-60 644H1260" stroke="#2d6699" stroke-width="5"/>`;
    s += `<g data-guia="1"><path d="M235 450H170M365 450v65M660 148V88M470 295H410M660 390v45M845 530H915"/></g>`;

    /* Bastiment de roure fix */
    s += `<g>
      <rect class="t" fill="url(#g-fustac)" x="430" y="100" width="24" height="546" rx="4"/>
      <rect class="t" fill="url(#g-fustac)" x="936" y="100" width="24" height="546" rx="4"/>
      <rect class="t fusta2" x="424" y="96" width="542" height="22" rx="4"/>
      <rect class="t fusta2" x="430" y="196" width="528" height="16"/>
      <rect class="t fusta2" x="430" y="388" width="528" height="16"/>
      <rect class="t fusta2" x="430" y="592" width="528" height="20"/>
    </g>`;

    /* Roda hidràulica i canal d'aigua */
    s += `<g data-part="aigua" data-exp="-68 0">
      <path class="t pedra" d="M-60 220h180v424H-60z"/>
      <path class="t fusta" d="M-60 256H176v18H-60z"/><rect x="-60" y="260" width="234" height="10" class="aigua"/>
      <path d="M174 264q24 10 26 44M182 276q20 14 22 46" class="nf s-blau" stroke-width="9" stroke-linecap="round"/>
      <g data-girat="182 450 55">${roda(182, 450, 146, { raigs: 8, color: '#9c6633', gruix: 22, raig: 8 })}</g>
      <rect class="t" fill="url(#g-ferroc)" x="182" y="441" width="248" height="18" rx="4"/>
    </g>`;

    /* Engranatge cònic de transmissió inferior */
    s += `<g data-part="aigua" data-exp="-35 55">
      <path class="t" fill="url(#g-ferroc)" d="M352 418l24 10v44l-24 10z"/>
      <path class="t" fill="url(#g-ferroc)" d="M362 464l44-16 14 20-58 14z"/>
      <rect class="t" fill="url(#g-ferroc)" x="382" y="220" width="12" height="236"/>
      <circle class="t llauto" cx="388" cy="240" r="14"/><circle class="t llauto" cx="388" cy="296" r="12"/><circle class="t llauto" cx="388" cy="352" r="10"/>
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

    /* 4 jocs de 3 parells de corrons d'estiratge + pesos de pressió penjants */
    s += `<g data-part="corrons" data-exp="-28 -18">
      ${[240, 296, 352].map((y, tier) => {
        const sp = [55, 125, 260][tier];
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
    </g>`;
    /* Pesos de ferro penjants (pressió dels corrons superiors) */
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
        <path id="w3-al${i}" d="M${x} 454V468M${x - 28} 468H${x + 28}M${x - 28} 468V546M${x + 28} 468V546" class="t nf" stroke-width="4.2"/>
        <path id="w3-fi${i}" d="M${x - 28} 524H${x}" stroke="#f2c230" stroke-width="2.2"/>
      </g>`).join('')}
    </g>`;
    s += `<text x="690" y="38" class="tx mig">4 fusos alhora moguts per una sola roda d’aigua · fil fort d’ordit</text>`;
    s += `</g>`;

    /* === VISTA 2: SECCIÓ D'UN CAP DE FILATURA === */
    s += `<g data-vista="tall">`;
    s += `<rect class="aigua" x="-60" y="644" width="1320" height="76"/><path d="M-60 644H1260" stroke="#2d6699" stroke-width="5"/><path d="M-60 662q60-8 120 0t120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0" stroke="#d6ecf3" stroke-width="3" fill="none" opacity=".6"/>`;
    s += `<g data-guia="1"><path d="M180 490H120M605 140V80M578 296H520M605 530H675"/></g>`;
    s += `<g data-part="aigua" data-exp="-58 0"><path class="t fusta" d="M-60 300H180v18H-60z"/><rect x="-60" y="304" width="238" height="9" class="aigua"/><path d="M178 308q24 8 28 42M186 318q18 14 22 44" class="nf s-blau" stroke-width="9" stroke-linecap="round"/><path d="M170 618q16-14 34 0M240 622q20-16 40 0" stroke="#d6ecf3" stroke-width="4" fill="none" stroke-linecap="round"/><g data-girat="180 490 50">${roda(180, 490, 150, { raigs: 8, color: '#a67547', gruix: 22, raig: 8 })}</g>
      <path d="M180 490L452 250M180 490L452 480" class="nf t" stroke-dasharray="7 5"/><path d="M180 490L452 250" class="flux2 s-taronja" stroke-width="3" data-flux="2"/></g>`;
    s += `<rect class="t" fill="url(#g-fustac)" x="430" y="70" width="380" height="584" rx="10"/><rect class="crema" x="452" y="92" width="336" height="540"/>`;
    s += `<g data-part="metxa" data-exp="0 -54"><ellipse class="t" fill="url(#g-cotocrem)" cx="605" cy="140" rx="46" ry="34"/><ellipse cx="605" cy="140" rx="34" ry="22" fill="none" stroke="#dfd5be" stroke-width="2" stroke-dasharray="8 4"/><rect class="t1 fusta3" x="599" y="100" width="12" height="80"/></g>`;
    s += `<path d="M605 174V226" stroke="#2a2420" stroke-width="16"/><path d="M605 174V226" stroke="#fff" stroke-width="13"/><path d="M605 226V296" stroke="#2a2420" stroke-width="11"/><path d="M605 226V296" stroke="#fff" stroke-width="8"/><path d="M605 296V366" stroke="#2a2420" stroke-width="7.5"/><path d="M605 296V366" stroke="#fff" stroke-width="4.5"/><path d="M605 366V452" stroke="#2a2420" stroke-width="5"/><path d="M605 366V452" stroke="#f2c230" stroke-width="2.6"/><path d="M605 180V450" class="flux2" stroke="#b9722a" stroke-width="2" data-flux="1.5" opacity=".7"/>`;
    const parell = (y, v, nom) => `<g data-girat="578 ${y} ${v}"><circle class="t ferro2" cx="578" cy="${y}" r="24"/><path d="M558 ${y}h40M578 ${y - 20}v40" class="t2"/></g><g data-girat="632 ${y} ${-v}"><circle class="t fusta2" cx="632" cy="${y}" r="24"/><path d="M612 ${y}h40M632 ${y - 20}v40" class="t2"/></g><text x="670" y="${y + 6}" class="tx">${nom}</text>`;
    s += `<g data-part="corrons" data-exp="-46 0">${parell(226, 60, 'lent')}${parell(296, 130, 'més ràpid')}${parell(366, 280, 'molt ràpid')}<path d="M632 250v170" stroke="#3c4348" stroke-width="3"/><rect class="t" fill="url(#g-ferroc)" x="620" y="420" width="24" height="32" rx="4"/></g>`;
    s += `<g data-part="aleta" data-exp="48 24"><path id="w2-aleta" d="M605 452V470M560 470H650M560 470V560M650 470V560" class="t nf" stroke-width="5"/><rect class="t2 ferro" x="601" y="470" width="8" height="150"/><rect class="t" fill="url(#g-cotoblanc)" x="583" y="500" width="44" height="70" rx="8"/><path d="M585 515h40M585 530h40M585 545h40" stroke="#f2c230" stroke-width="3"/><path id="w2-fil" d="M560 540H584" stroke="#f2c230" stroke-width="2.6"/></g>`;
    s += `<g>${retol(990, 150, 'metxa: cotó tou i gruixut', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 250 })}${fletxa('M990 176V250', '#2a2420', 4)}${retol(990, 280, 'els corrons l’estiren', { fons: '#b9722a', w: 210 })}${fletxa('M990 306V380', '#2a2420', 4)}${retol(990, 410, 'l’aleta el torça', { fons: '#b9722a', w: 170 })}${fletxa('M990 436V510', '#2a2420', 4)}${retol(990, 540, 'fil prim i resistent', { fons: '#f2c230', color: '#2a2420', vora: '#2a2420', w: 200 })}</g>`;
    s += `</g>`;

    return svg(s);
  }

  function animaWater({ t, el }) {
    const FUSX = [505, 615, 725, 835];
    for (let i = 0; i < 4; i++) {
      const a = el('w3-al' + i);
      if (!a) break;
      const c = Math.cos(t * 9 + i * 0.9), xa = FUSX[i] - 28 * c, xb = FUSX[i] + 28 * c;
      a.setAttribute('d', `M${FUSX[i]} 454V468M${xa.toFixed(1)} 468H${xb.toFixed(1)}M${xa.toFixed(1)} 468V546M${xb.toFixed(1)} 468V546`);
      el('w3-fi' + i).setAttribute('d', `M${xa.toFixed(1)} 524H${FUSX[i]}`);
    }
    if (el('w2-aleta')) {
      const c = Math.cos(t * 9), xa = 605 - 45 * c, xb = 605 + 45 * c;
      el('w2-aleta').setAttribute('d', `M605 452V470M${xa.toFixed(1)} 470H${xb.toFixed(1)}M${xa.toFixed(1)} 470V560M${xb.toFixed(1)} 470V560`);
      el('w2-fil').setAttribute('d', `M${xa.toFixed(1)} 540H605`);
    }
  }

  /* ---------- 5 · Mula de Crompton (Perspectiva 6 fusos + Secció lateral) ---------- */
  function mula() {
    let s = fons();

    /* === VISTA 1: PERSPECTIVA DEL CARRO DE 6 FUSOS === */
    s += `<g data-vista="3d">`;
    s += `<rect class="t pedra" x="-60" y="592" width="1320" height="128"/>`;
    s += `<g data-guia="1"><path d="M220 260L160 225M365 280L330 226M340 460L286 496M700 555v42M540 420L554 365"/></g>`;

    /* Rails de ferro en perspectiva */
    s += `<g data-exp="0 42">
      <path class="t" fill="url(#g-ferroc)" d="M370 572l680-76v10l-680 76zM440 618l695-84v10l-695 84z"/>
      <path d="M405 588h76M545 572h76M685 556h76M825 540h76M965 524h76" stroke="#534942" stroke-width="6"/>
    </g>`;

    /* Fileta posterior amb bobines de metxa */
    s += `<g data-part="fileta" data-exp="-60 -35">
      <path class="t" fill="url(#g-fustac)" d="M110 592V148h24v444zM266 566V174h22v392zM110 148l178 26v20L110 168z"/>
      ${[0, 1, 2].map((r) => `
        <ellipse class="t" fill="url(#g-cotocrem)" cx="${164 + r * 32}" cy="${224 + r * 6}" rx="20" ry="30"/>
        <ellipse class="t" fill="url(#g-cotocrem)" cx="${164 + r * 32}" cy="${322 + r * 6}" rx="20" ry="30"/>
      `).join('')}
      <path d="M182 228Q275 245 340 282M214 234Q290 250 356 286M246 240Q305 256 372 290M182 324Q275 305 340 286M214 330Q290 310 356 290M246 336Q305 316 372 294" stroke="#f8efe0" stroke-width="5.5" fill="none"/>
    </g>`;

    /* Tren de 3 parells de corrons d'estiratge en perspectiva */
    s += `<g data-part="corrons" data-exp="-36 -54">
      <rect class="t fusta2" x="308" y="256" width="134" height="58" rx="6"/>
      ${[330, 366, 404].map((x, idx) => `<g>
        <g id="m3-c${idx}"><circle class="t ferro2" cx="${x}" cy="272" r="12"/><path d="M${x - 9} 272h18M${x} 263v18" stroke="#fff" stroke-width="1.4"/></g>
        <g id="m3-b${idx}"><circle class="t fusta3" cx="${x}" cy="298" r="12"/><path d="M${x - 9} 298h18M${x} 289v18" stroke="#fff" stroke-width="1.4"/></g>
      </g>`).join('')}
    </g>`;

    /* Capçal fix (headstock) i engranatge de roda principal */
    s += `<g data-part="corrons" data-exp="-54 36">
      <path class="t" fill="url(#g-ferroc)" d="M294 316h126v266H294z"/>
      <g id="m3-rim">${roda(352, 464, 56, { raigs: 6, color: '#536069', gruix: 9 })}</g>
      <path d="M352 408L438 518" stroke="#4a3723" stroke-width="3" stroke-dasharray="6 4" opacity=".6"/>
    </g>`;

    /* 6 fils estirats des dels corrons fins als 6 fusos del carro */
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
        <path id="m3-guia" d="M-64 388l132-18" stroke="#2f7fb5" stroke-width="3.4" stroke-linecap="round"/>
      </g>
    </g>`;

    s += `<g>${retol(270, 52, 'corrons de la Water Frame', { fons: '#b9722a', w: 235 })}<text x="415" y="60" class="tx-gg mig">+</text>${retol(555, 52, 'carro de la Jenny', { fons: '#2f7fb5', w: 175 })}<text x="668" y="60" class="tx-gg mig">=</text>${retol(795, 52, 'MULA: fil fi i fort', { fons: '#f2c230', color: '#2a2420', vora: '#2a2420', w: 205, h: 36 })}</g>`;
    s += `<g id="m3-r1" opacity="0">${retol(740, 152, 'el carro surt: els corrons donen metxa i els fusos la torcen', { fons: '#d9482b', w: 430 })}</g>
          <g id="m3-r2" opacity="0">${retol(740, 152, 'corrons aturats: un últim estirament fa el fil ultra-fi', { fons: '#2a2420', w: 410 })}</g>
          <g id="m3-r3" opacity="0">${retol(740, 152, 'el carro torna i el fil-guia bobina els 6 cons', { fons: '#2f7fb5', w: 360 })}</g>`;
    s += persona(1124, 592, 168, { color: '#3d5a80', barret: true, attr: 'class="atenua"' });
    s += `</g>`;

    /* === VISTA 2: SECCIÓ LATERAL === */
    s += `<g data-vista="tall">`;
    s += `<g data-guia="1"><path d="M200 150V96M300 268V216M620 550v52"/></g>`;
    s += `<rect class="t pedra" x="-60" y="600" width="1320" height="120"/><rect class="t" fill="url(#g-ferroc)" x="300" y="590" width="760" height="10"/>`;
    s += `<g data-part="fileta" data-exp="-54 0"><path class="t" fill="url(#g-fustac)" d="M120 600V150h30V600zM120 150h170v24H120zM270 174v426h-22V174z"/><ellipse class="t" fill="url(#g-cotocrem)" cx="200" cy="230" rx="30" ry="40"/><ellipse class="t" fill="url(#g-cotocrem)" cx="200" cy="330" rx="30" ry="40"/><path d="M226 240Q260 250 286 296M226 340Q260 330 286 304" stroke="#2a2420" stroke-width="10" fill="none"/><path d="M226 240Q260 250 286 296M226 340Q260 330 286 304" stroke="#fff" stroke-width="7" fill="none"/></g>`;
    s += `<g data-part="corrons" data-exp="0 -56"><g id="m2-c1"><circle class="t ferro2" cx="300" cy="284" r="15"/><path d="M288 284h24" class="t2"/></g><g id="m2-c2"><circle class="t fusta2" cx="300" cy="316" r="15"/><path d="M288 316h24" class="t2"/></g></g>`;
    s += `<line id="m2-fil0" x1="312" y1="300" x2="600" y2="330" stroke="#2a2420" stroke-width="7" stroke-linecap="round"/><line id="m2-fil" x1="312" y1="300" x2="600" y2="330" stroke="#f2c230" stroke-width="4.5" stroke-linecap="round"/>`;
    s += `<g data-part="carro" id="m2-carro"><rect class="t" fill="url(#g-fustac)" x="-70" y="470" width="170" height="80" rx="8"/>${roda(-36, 566, 24, { raigs: 6 })}${roda(66, 566, 24, { raigs: 6 })}<g data-part="fus" data-exp="0 -54"><path d="M40 500L-6 322" class="t" stroke-width="7"/><path id="m2-cop" class="t" fill="url(#g-cotoblanc)" d="M28 470L6 380h12l24 86z"/></g></g>`;
    s += persona(1130, 600, 170, { color: '#3d5a80', barret: true, attr: 'class="atenua"' });
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

      const g = p < 0.45 ? 4.4 : p < 0.6 ? tram(p, 0.45, 0.6, 4.4, 2.1) : 2.1;
      let fils = '';
      for (let i = 0; i < 6; i++) {
        const sx = cx - 60 + i * 24, sy = cy + 352 - i * 3.1;
        const rx = 414, ry = 282 + i * 2.5;
        fils += `<path d="M${rx} ${ry}L${sx.toFixed(1)} ${sy.toFixed(1)}" stroke="#2a2420" stroke-width="${(g + 2.2).toFixed(1)}"/><path d="M${rx} ${ry}L${sx.toFixed(1)} ${sy.toFixed(1)}" stroke="#f2c230" stroke-width="${g.toFixed(1)}"/>`;
        const w = p < 0.6 ? 0 : tram(p, 0.6, 1, 0, 8);
        const bx = -26 + i * 24, by = 486 - i * 3.1;
        el('m3-cop' + i).setAttribute('d', `M${(bx - 8 - w).toFixed(1)} ${by - 20}L${bx - 26} ${by - 104}h10l${(24 + w * 2).toFixed(1)} 80z`);
      }
      el('m3-fils').innerHTML = fils;

      const gira = p < 0.45 ? (t * 210) % 360 : 0;
      for (let idx = 0; idx < 3; idx++) {
        const rx = 330 + idx * 37;
        el('m3-c' + idx).setAttribute('transform', `rotate(${(gira * (1 + idx * 0.4)).toFixed(1)} ${rx} 272)`);
        el('m3-b' + idx).setAttribute('transform', `rotate(${(-gira * (1 + idx * 0.4)).toFixed(1)} ${rx} 298)`);
      }
      el('m3-rim').setAttribute('transform', `rotate(${(k < 2 ? (t * 160) : (t * 90)).toFixed(1)} 352 464)`);
      el('m3-guia').setAttribute('transform', p >= 0.6 ? `translate(0 ${(Math.sin(((p - 0.6) / 0.4) * Math.PI * 2) * 18 + 12).toFixed(1)})` : '');
      ['m3-r1', 'm3-r2', 'm3-r3'].forEach((id, i) => el(id).setAttribute('opacity', i === k ? 1 : 0));
    }

    /* Vista Secció lateral */
    if (el('m2-carro')) {
      const x = p < 0.45 ? tram(p, 0, 0.45, 430, 860) : p < 0.6 ? tram(p, 0.45, 0.6, 860, 960) : tram(p, 0.6, 1, 960, 430);
      el('m2-carro').setAttribute('transform', `translate(${x.toFixed(1)} 0)`);
      const g = p < 0.45 ? 4.5 : p < 0.6 ? tram(p, 0.45, 0.6, 4.5, 2.4) : 2.4;
      ['m2-fil0', 'm2-fil'].forEach((id, i) => { const l = el(id); l.setAttribute('x2', (x - 6).toFixed(1)); l.setAttribute('y2', 322); l.setAttribute('stroke-width', (g + (i ? 0 : 2.6)).toFixed(1)); });
      const gira = p < 0.45 ? (t * 200) % 360 : 0;
      el('m2-c1').setAttribute('transform', `rotate(${gira.toFixed(1)} 300 284)`); el('m2-c2').setAttribute('transform', `rotate(${(-gira).toFixed(1)} 300 316)`);
      const w = p < 0.6 ? 0 : tram(p, 0.6, 1, 0, 14);
      el('m2-cop').setAttribute('d', `M${28 - w} 470L6 380h12l${24 + w} 86z`);
    }
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
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D',
            model: 'Teler manual de fusta amb llançadora volant · perspectiva 3D',
            etiquetes: [['ordit', 600, 128, 600, 200], ['pinta', 980, 205, 870, 260, 'Pinta i batà'], ['caixes', 120, 315, 195, 340, 'Caixa'], ['llancadora', 450, 286, 420, 338], ['cordill', 1025, 420, 740, 384, 'Cordill i mànec'], ['tela', 600, 650, 600, 520]]
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
        clau: 'Un sol teixidor fa teles amples i treballa el doble de ràpid: de cop, falta fil.',
        batx: { titol: 'Kay i la por a les màquines', text: 'Teixidors que temien perdre la feina van assaltar la casa de Kay, que va acabar emigrant a França. La resistència a les màquines és anterior al ludisme (1811-1816) i forma part de la història de cada innovació.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'jenny', nom: 'Spinning Jenny', any: '1764', qui: 'James Hargreaves', durada: 10,
        model: 'Spinning Jenny de vuit fusos, vista des de dalt · esquema didàctic',
        pregunta: 'Com fila una sola persona vuit fils alhora?',
        intro: 'Filar és fer dues coses: <b>estirar</b> la fibra i <b>tòrcer-la</b> perquè no es trenqui. La Jenny ho fa amb vuit fils a la vegada, amb una roda i una pinça.',
        svg: jenny, anima: animaJenny,
        vistes: [
          {
            id: '3d', nom: 'Perspectiva 3D',
            model: 'Spinning Jenny de Hargreaves · bastiment inclinat amb 8 fusos i carro-pinça',
            etiquetes: [['metxes', 280, 598, 345, 498, 'Fileta de metxes'], ['pinca', 0, -126, 0, -78, 'Pinça mòbil', 'j3-carro'], ['fusos', 840, 128, 825, 225, 'Fusos i fil-guia'], ['roda', 1070, 215, 995, 280], ['corda', 645, 578, 645, 480, 'Tambor i corda']]
          },
          {
            id: 'planta', nom: 'Planta (8 fusos)',
            model: 'Spinning Jenny vista des de dalt · 8 fils en paral·lel',
            etiquetes: [['metxes', 910, 114, 910, 170, 'Metxa'], ['pinca', 0, 108, 0, 152, 'Pinça mòbil', 'j2-pinca'], ['fusos', 60, 360, 162, 340, 'Fusos'], ['roda', 1150, 120, 1110, 190], ['corda', 760, 664, 760, 620, 'Corda']]
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
        etiquetes: [['metxes', 910, 114, 910, 170, 'Metxa'], ['pinca', 0, 108, 0, 152, 'Pinça mòbil', 'pinca'], ['fusos', 60, 360, 162, 340, 'Fusos'], ['roda', 1150, 120, 1110, 190], ['corda', 760, 664, 760, 620, 'Corda']],
        clau: 'Una màquina petita, barata i manual: multiplica el fil sense sortir de casa.',
        batx: { titol: 'Una màquina domèstica', text: 'La Jenny no necessitava motor i cabia en una casa: va reforçar el treball a domicili abans que la fàbrica el substituís. El seu fil, poc resistent, servia per a la trama però no per a l’ordit.', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/cottonopolis', fontNom: 'Science and Industry Museum' }
      },
      {
        id: 'water', nom: 'Water Frame', any: '1769', qui: 'Richard Arkwright', durada: 12,
        model: 'Un cap de filatura de la Water Frame, de costat · esquema didàctic',
        pregunta: 'Com s’estira el cotó sense mans?',
        intro: 'El secret són <b>tres parells de corrons</b>. Cada parell gira més de pressa que l’anterior i, com que estira més fil del que rep, el cotó s’aprima.',
        svg: water, anima: animaWater,
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
        clau: 'Fil fort, continu i sense força humana: la màquina que va crear la fàbrica.',
        batx: { titol: 'Arkwright, empresari', text: 'Més que inventor, Arkwright va ser organitzador: va reunir invents d’altres, capital i mà d’obra (sovint infantil) a Cromford (1771). Les seves patents van ser anul·lades el 1785 i la màquina es va estendre per tot Lancashire.', font: 'https://www.cromfordmills.org.uk/', fontNom: 'Cromford Mills' }
      },
      {
        id: 'mula', nom: 'La mula', any: '1779', qui: 'Samuel Crompton', durada: 10,
        model: 'Mula de filar, de costat (un sol fus) · esquema didàctic',
        pregunta: 'I si ajuntem el millor de les dues màquines?',
        intro: 'Crompton combina els <b>corrons</b> de la Water Frame amb el <b>carro mòbil</b> de la Jenny. Com la mula, filla d’egua i ase, és un encreuament.',
        svg: mula, anima: animaMula,
        vistes: [
          {
            id: '3d', nom: 'Perspectiva del carro',
            model: 'Mula de Crompton · tren de corrons + carro mòbil de 6 fusos sobre rails',
            etiquetes: [['fileta', 165, 118, 185, 185], ['corrons', 380, 198, 375, 270], ['carro', -10, 640, 20, 540, 'Carro mòbil', 'm3-carro'], ['fus', 65, 285, -18, 385, 'Fusos i fil-guia', 'm3-carro']]
          },
          {
            id: 'tall', nom: 'Secció lateral',
            model: 'Secció lateral d’un fus de la mula · estirament i bobinatge',
            etiquetes: [['fileta', 90, 110, 140, 160], ['corrons', 400, 240, 316, 290], ['carro', 15, 646, 15, 540, 'Carro mòbil', 'm2-carro'], ['fus', 112, 408, 22, 420, 'Fus', 'm2-carro']]
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
        etiquetes: [['fileta', 90, 110, 140, 160], ['corrons', 400, 240, 316, 290], ['carro', 15, 646, 15, 540, 'Carro mòbil', 'carro'], ['fus', 112, 408, 22, 420, 'Fus', 'carro']],
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
