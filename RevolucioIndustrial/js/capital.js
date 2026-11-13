// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 8 · El capital: societat anònima, banc i borsa, i concentració empresarial. */
(function () {
  const { svg, roda, persona, txt, retol, fletxa, tram } = RI;
  const fons = () => `<rect class="crema" x="-60" width="1320" height="720"/>`;
  const COLORS = ['#d9482b', '#2f7fb5', '#5b8c35', '#b9722a', '#7a4f9a'], ACC = [40, 25, 20, 10, 5];
  const fabr = (x, y, c, k) => `<g transform="translate(${x} ${y}) scale(${k || 1})"><path class="t" fill="${c}" d="M-50 0V-44l28 16V-44l28 16V-44l28 16V-90h16V0z"/><rect class="t2 vidre" x="-38" y="-18" width="14" height="12"/><rect class="t2 vidre" x="-10" y="-18" width="14" height="12"/></g>`;
  const temple = (x, y, nom, c) => `<g transform="translate(${x} ${y})"><path class="t" fill="${c || '#e9dfc8'}" d="M-90 -110L0 -160 90 -110Z"/><rect class="t" fill="${c || '#e9dfc8'}" x="-84" y="-110" width="168" height="16"/>${[-66, -33, 0, 33, 66].map((d) => `<rect class="t blanc" x="${d - 8}" y="-94" width="16" height="78"/>`).join('')}<rect class="t" fill="${c || '#e9dfc8'}" x="-96" y="-16" width="192" height="16"/><text x="0" y="-122" class="tx mig">${nom}</text></g>`;
  const moneda = (x, y, r) => `<circle class="t2 groc" cx="${x}" cy="${y}" r="${r || 9}"/>`;
  const cami = (d, c, v, fases, g) => `<path d="${d}" class="flux" stroke="${c}" stroke-width="${g || 11}" data-flux="${v}" data-en="${fases}"/>`;

  /* ---------- 1 · societat anònima ---------- */
  function societat() {
    let s = fons();
    // inversors
    ACC.forEach((n, i) => {
      const y = 150 + i * 118;
      s += `<g data-part="inversors">${persona(90, y, 84, { color: COLORS[i], barret: i % 2 === 0 })}<g class="titol-acc" data-i="${i}" opacity="0"><rect class="t2" x="124" y="${y - 62}" width="62" height="40" rx="5" fill="#fffdf7"/><rect x="124" y="${y - 62}" width="62" height="11" fill="${COLORS[i]}"/><text x="155" y="${y - 30}" class="tx mig">${n}</text></g></g>`;
      s += cami(`M200 ${y - 40}C320 ${y - 40} 330 400 440 400`, '#f2b632', 1.6, '2') + cami(`M440 420C330 420 320 ${y - 20} 200 ${y - 20}`, '#f2b632', 1.6, '4');
    });
    s += `<text x="90" y="56" class="tx-g mig">Inversors</text>`;
    // l'empresa
    s += `<g data-part="empresa"><rect class="t" x="440" y="300" width="290" height="230" rx="14" fill="#fffdf7"/><rect x="440" y="300" width="290" height="48" rx="14" fill="#7a4f9a"/><rect x="440" y="330" width="290" height="18" fill="#7a4f9a"/><rect class="t nf" x="440" y="300" width="290" height="230" rx="14"/><text x="585" y="333" class="tx-b mig">Companyia del Ferrocarril, S.A.</text>
      <g id="graella">${Array.from({ length: 100 }, (_, i) => `<rect class="acc" x="${470 + (i % 20) * 11.5}" y="${366 + Math.floor(i / 20) * 14}" width="9.5" height="11" rx="2" fill="#d9cdb4"/>`).join('')}</g><text x="585" y="462" class="tx-p mig">capital dividit en 100 accions</text><text id="caixa" x="585" y="508" class="tx-g mig">caixa: 0</text></g>`;
    s += `<g data-en="0"><rect class="t" x="440" y="90" width="290" height="150" rx="14" fill="#fff6d6"/><text x="585" y="122" class="tx mig">Construir la línia costa…</text><rect class="t vermell" x="470" y="140" width="230" height="26" rx="5"/><text x="585" y="195" class="tx-p mig">…i la fortuna d’un sol burgès:</text><rect class="t groc" x="470" y="206" width="26" height="18" rx="4"/></g>`;
    // el ferrocarril
    s += `<g data-part="negoci"><rect class="t pedra" x="860" y="470" width="320" height="16"/><rect class="t ferro" x="860" y="462" width="320" height="8"/><g id="trenet"><rect class="t" x="900" y="410" width="80" height="34" rx="8" fill="#f2c230"/><path class="t blanc" d="M962 410v-40h14v40z"/><rect class="t blau" x="1000" y="414" width="62" height="30" rx="4"/><rect class="t blau" x="1070" y="414" width="62" height="30" rx="4"/>${roda(920, 450, 13, { raigs: 6, color: '#f2c230' })}${roda(960, 450, 13, { raigs: 6, color: '#f2c230' })}${roda(1016, 452, 10, { raigs: 4 })}${roda(1046, 452, 10, { raigs: 4 })}${roda(1086, 452, 10, { raigs: 4 })}${roda(1116, 452, 10, { raigs: 4 })}</g>
      <text x="1020" y="520" class="tx mig">vies, estacions, locomotores</text></g>`;
    s += cami('M730 380C800 380 820 400 880 400', '#f2b632', 1.6, '3') + cami('M880 440C820 440 800 460 730 460', '#5b8c35', 1.6, '3,4');
    s += `<g data-en="3">${retol(805, 350, 'inversió', { fons: '#f2b632', color: '#2a2420', w: 100 })}${retol(805, 500, 'ingressos', { fons: '#5b8c35', w: 110 })}</g>`;
    s += `<g data-en="2">${retol(585, 264, 'diners a canvi d’accions', { fons: '#2a2420', w: 240 })}</g><g data-en="4">${retol(585, 264, 'dividends: qui té més accions, cobra més', { fons: '#5b8c35', w: 370 })}</g>`;
    s += `<g data-en="4"><rect class="t" x="800" y="570" width="390" height="100" rx="14" fill="#fff6d6"/><text x="995" y="606" class="tx mig">I si l’empresa fa fallida?</text><text x="995" y="632" class="tx-p mig">Cada soci només perd el que hi va posar:</text><text x="995" y="652" class="tx-p mig">és la responsabilitat limitada.</text></g>`;
    return svg(s);
  }
  function animaSoc({ p, k, el, svg: g }) {
    if (!g._acc) { g._acc = Array.from(g.querySelectorAll('.acc')); g._tit = Array.from(g.querySelectorAll('.titol-acc')); }
    const f = k < 2 ? 0 : k === 2 ? tram(p, 0.42, 0.58, 0, 1, true) : 1; let ac = 0;
    const propietari = (i) => { let s = 0; for (let j = 0; j < 5; j++) { s += ACC[j]; if (i < s) return j; } return 4; };
    g._acc.forEach((r, i) => r.setAttribute('fill', k >= 1 && i < f * 100 ? COLORS[propietari(i)] : '#d9cdb4'));
    el('graella').setAttribute('opacity', k >= 1 ? 1 : 0.25);
    g._tit.forEach((t) => t.setAttribute('opacity', k > 2 || (k === 2 && f > 0.3) ? 1 : 0));
    const caixa = k < 2 ? 0 : k === 2 ? Math.round(f * 100) : k === 3 ? Math.round(tram(p, 0.6, 0.8, 100, 20, true)) : Math.round(tram(p, 0.8, 1, 60, 30, true));
    el('caixa').textContent = 'caixa: ' + caixa; void ac;
    el('trenet').setAttribute('transform', `translate(${k >= 3 ? (Math.sin(p * 40) * 26).toFixed(1) : 0} 0)`);
  }

  /* ---------- 2 · banc i borsa ---------- */
  function banc() {
    let s = fons();
    s += `<text x="300" y="60" class="tx-g mig">El banc</text><text x="900" y="60" class="tx-g mig">La borsa</text><path d="M600 40V680" class="t1 nf" stroke-dasharray="4 8"/>`;
    s += `<g data-part="estalviadors">${persona(60, 300, 80, { color: '#2f7fb5' })}${persona(60, 430, 80, { color: '#b9722a', barret: true })}${persona(60, 560, 80, { color: '#5b8c35' })}<text x="60" y="610" class="tx-p mig">estalviadors</text></g>`;
    s += `<g data-part="banc">${temple(300, 470, 'BANC')}</g>`;
    s += `<g data-part="empresari">${fabr(530, 300, '#a8452f', 0.9)}${persona(520, 420, 80, { color: '#7a4f9a', barret: true })}<text x="525" y="450" class="tx-p mig">empresari</text></g>`;
    s += cami('M90 260C160 260 180 380 220 400', '#f2b632', 1.5, '0') + cami('M90 390C140 390 170 410 210 420', '#f2b632', 1.5, '0') + cami('M90 520C150 520 170 450 210 440', '#f2b632', 1.5, '0');
    s += cami('M380 380C430 330 440 300 480 280', '#f2b632', 1.5, '1') + cami('M490 330C450 360 430 400 390 420', '#d9482b', 1.5, '1', 8);
    s += `<g data-en="0">${retol(170, 200, 'dipòsits', { fons: '#2a2420', w: 100 })}</g><g data-en="1">${retol(400, 250, 'préstec', { fons: '#f2b632', color: '#2a2420', w: 96 })}${retol(470, 500, 'el torna amb interès', { fons: '#d9482b', w: 200 })}</g>`;
    s += `<g data-part="borsa">${temple(900, 250, 'BORSA', '#d6ecf3')}</g>`;
    s += `<g data-part="compravenda">${persona(700, 420, 80, { color: '#d9482b', barret: true })}${persona(1100, 420, 80, { color: '#2f7fb5', barret: true })}<rect class="t2" x="738" y="350" width="50" height="34" rx="4" fill="#fffdf7"/><rect x="738" y="350" width="50" height="9" class="lila"/><text x="763" y="377" class="tx-p mig">acció</text>${moneda(1044, 368)}${moneda(1060, 362)}${moneda(1052, 378)}
      ${cami('M800 366H1020', '#7a4f9a', 1.5, '2', 8)}${cami('M1020 392H800', '#f2b632', 1.5, '2')}</g>`;
    s += `<g data-part="preu"><rect class="t" x="680" y="470" width="450" height="200" rx="14" fill="#fffdf7"/><path d="M710 640H1100M710 640V490" class="t2"/><text x="716" y="486" class="tx-p">preu de l’acció</text>
      <path id="corba" d="M712 610L760 590 800 600 850 560 900 570 950 520 990 500 1020 530 1040 620 1070 600 1098 612" class="nf s-lila" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>
      <g data-fase="0.86-1">${retol(1010, 660, 'pànic: tothom ven', { fons: '#d9482b', w: 190 })}</g></g>`;
    return svg(s);
  }
  function animaBanc({ p, el }) { el('corba').setAttribute('stroke-dashoffset', p < 0.72 ? 100 : tram(p, 0.72, 0.98, 100, 0, true).toFixed(1)); }

  /* ---------- 3 · concentració ---------- */
  function concentracio() {
    let s = fons();
    const marc = (x, nom, any, sub) => `<rect class="t" x="${x}" y="50" width="376" height="620" rx="18" fill="#fffdf7"/><text x="${x + 188}" y="96" class="tx-gg mig">${nom}</text><text x="${x + 188}" y="122" class="tx-p mig">${any}</text>${sub.map((l, i) => `<text x="${x + 188}" y="${570 + i * 26}" class="tx mig">${l}</text>`).join('')}`;
    // càrtel
    s += `<g data-part="cartel">${marc(10, 'Càrtel', 'acord entre empreses', ['Empreses independents', 'pacten preus i es reparteixen', 'el mercat per no competir'])}
      ${fabr(100, 300, '#d9482b')}${fabr(300, 300, '#2f7fb5')}${fabr(200, 470, '#5b8c35')}<path d="M150 280H250M130 320L180 390M270 320L220 390" class="t nf" stroke-dasharray="8 7"/>${retol(198, 250, 'preu pactat', { fons: '#2a2420', w: 130 })}</g>`;
    // trust
    s += `<g data-part="trust">${marc(412, 'Trust', 'fusió', ['Les empreses d’un sector', 's’uneixen en una de sola', 'que domina tot el mercat'])}
      <rect class="t" x="446" y="190" width="308" height="320" rx="20" fill="#f6dccf"/>${fabr(520, 320, '#d9482b')}${fabr(680, 320, '#d9482b')}${fabr(600, 470, '#d9482b')}${retol(600, 190, 'una sola direcció', { fons: '#d9482b', w: 180 })}</g>`;
    // holding
    s += `<g data-part="holding">${marc(814, 'Holding', 'control per accions', ['Una societat té la majoria', 'de les accions d’altres,', 'que conserven el seu nom'])}
      <rect class="t lila" x="922" y="170" width="160" height="70" rx="12"/><text x="1002" y="200" class="tx-b mig">societat</text><text x="1002" y="222" class="tx-b mig">matriu</text>
      <path d="M960 240L900 380M1002 240V380M1044 240L1104 380" class="t nf"/>${fabr(900, 470, '#b9722a', 0.8)}<g transform="translate(1002 470)"><path class="t" fill="#2f7fb5" d="M-40 0v-40l40-30 40 30v40z"/><rect class="t2 blanc" x="-10" y="-30" width="20" height="30"/></g><g transform="translate(1104 470)"><rect class="t" x="-36" y="-40" width="60" height="28" rx="6" fill="#5b8c35"/><path class="t blanc" d="M12-40v-22h10v22z"/>${roda(-20, -6, 10, { raigs: 4 })}${roda(10, -6, 10, { raigs: 4 })}</g>
      ${retol(910, 320, '51 %', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 64 })}${retol(1002, 320, '51 %', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 64 })}${retol(1094, 320, '51 %', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 64 })}
      <text x="900" y="496" class="tx-p mig">fàbrica</text><text x="1002" y="496" class="tx-p mig">banc</text><text x="1104" y="496" class="tx-p mig">ferrocarril</text></g>`;
    return svg(s);
  }

  RI.capitol({
    id: 'capital', titol: 'El capital',
    escenes: [
      {
        id: 'societat', nom: 'La societat anònima', any: 'segle XIX', durada: 30,
        pregunta: 'Qui paga una fàbrica o un ferrocarril?',
        intro: 'Un taller el pot pagar una família. Una línia de tren, no: costa una fortuna que ningú té. La solució és <b>ajuntar els diners de molta gent</b>.',
        svg: societat, anima: animaSoc,
        fases: [
          { fins: 0.2, nom: 'Cal molt capital', text: 'Vies, ponts, estacions, locomotores… El cost és moltíssimes vegades més gran que la fortuna d’un sol empresari.', focus: ['empresa'] },
          { fins: 0.4, nom: 'El capital es divideix en accions', text: 'Es crea una societat anònima (S.A.) i el seu capital es parteix en trossos iguals i petits: les <b>accions</b>.', focus: ['empresa'] },
          { fins: 0.6, nom: 'Cadascú en compra les que pot', text: 'Qui compra accions és propietari d’una part de l’empresa: els accionistes. No cal que hi treballin ni que es coneguin: per això és «anònima».', focus: ['inversors', 'empresa'] },
          { fins: 0.8, nom: 'L’empresa inverteix i ven', text: 'Amb els diners reunits es construeix la línia. Els bitllets i el transport de mercaderies donen ingressos.', focus: ['empresa', 'negoci'] },
          { fins: 1, nom: 'Es reparteixen els beneficis', text: 'El guany es reparteix en <b>dividends</b>, segons les accions de cadascú. Si va malament, es perd el que s’ha posat, però res més.', focus: ['inversors'] }
        ],
        parts: {
          inversors: { nom: 'Accionistes', text: 'Burgesos, comerciants, propietaris… El número és quantes accions té cadascú.' },
          empresa: { nom: 'Societat anònima', text: 'L’empresa. Decideix la junta d’accionistes: una acció, un vot. Qui té més accions, mana més.' },
          negoci: { nom: 'El negoci', text: 'Allò en què s’inverteix el capital i que ha de donar beneficis.' }
        },
        clau: 'La societat anònima reuneix el capital de molts i reparteix el risc: sense ella no hi hauria ferrocarrils ni grans fàbriques.',
        batx: { titol: 'Capitalisme industrial i financer', text: 'Al principi les fàbriques tèxtils es financen amb capital familiar i reinversió de beneficis. És el ferrocarril, cap al 1830-1850, el que generalitza la societat anònima i dona protagonisme a bancs i borses. A Espanya, la llei de ferrocarrils de 1855 atreu sobretot capital estranger.', font: 'https://xtec.gencat.cat/web/.content/curriculum/batxillerat/curriculum-171-2022/materies-de-modalitat/modalitat-humanitats-i-ciencies-socials/Historia-del-Mon-Contemporani.pdf', fontNom: 'Currículum d’Història del Món Contemporani' }
      },
      {
        id: 'banc', nom: 'El banc i la borsa', any: 'segle XIX', durada: 24,
        pregunta: 'On es troben els qui tenen diners i els qui en necessiten?',
        intro: 'Dues institucions fan d’intermediàries: el <b>banc</b> presta els estalvis d’uns a uns altres, i la <b>borsa</b> és el mercat on es compren i venen accions.',
        svg: banc, anima: animaBanc,
        fases: [
          { fins: 0.25, nom: 'El banc reuneix estalvis', text: 'Molta gent hi deixa petites quantitats. Juntes fan un capital gran.', focus: ['estalviadors', 'banc'] },
          { fins: 0.5, nom: 'I els presta a canvi d’interès', text: 'L’empresari rep un préstec per comprar màquines i el torna amb un afegit: l’interès. D’aquí surt el guany del banc.', focus: ['banc', 'empresari'] },
          { fins: 0.72, nom: 'A la borsa es venen accions', text: 'Qui vol recuperar els diners ven les seves accions a algú altre. L’empresa no torna res: només canvia el propietari.', focus: ['borsa', 'compravenda'] },
          { fins: 1, nom: 'El preu puja i baixa', text: 'Si molta gent vol comprar, el preu puja; si tothom vol vendre, s’enfonsa. Quan passa de cop, hi ha una crisi.', focus: ['preu'] }
        ],
        parts: {
          estalviadors: { nom: 'Estalviadors', text: 'Deixen els diners al banc i en reben un petit interès.' },
          banc: { nom: 'Banc', text: 'Guanya la diferència entre l’interès que cobra pels préstecs i el que paga pels dipòsits.' },
          empresari: { nom: 'Empresari', text: 'Demana crèdit per invertir en la seva fàbrica.' },
          borsa: { nom: 'Borsa', text: 'El mercat de les accions. Les més importants del segle XIX eren les de Londres i París.' },
          compravenda: { nom: 'Compra i venda', text: 'Qui compra una acció espera cobrar dividends o vendre-la més cara.' },
          preu: { nom: 'Cotització', text: 'El preu de l’acció a cada moment. Depèn de l’oferta i la demanda, i també dels rumors.' }
        },
        clau: 'El banc presta; la borsa posa preu. Tots dos fan circular el capital cap a la indústria.',
        batx: { titol: 'Les crisis del capitalisme', text: 'Són crisis noves: no falta menjar, sinó que sobra producció o esclata una bombolla. El 1873 el pànic comença a la borsa de Viena, s’estén per Europa i els Estats Units i obre una llarga depressió. Compara-les amb les crisis de subsistència de l’Antic Règim.', font: 'https://xtec.gencat.cat/web/.content/curriculum/batxillerat/curriculum-171-2022/materies-de-modalitat/modalitat-humanitats-i-ciencies-socials/Historia-del-Mon-Contemporani.pdf', fontNom: 'Currículum d’Història del Món Contemporani' }
      },
      {
        id: 'concentracio', nom: 'Càrtel, trust i holding', any: 'finals del segle XIX', durada: 18,
        model: 'Formes de concentració empresarial · Segona Revolució Industrial',
        pregunta: 'Com s’ho fan les empreses per no competir?',
        intro: 'Competir abaixa els preus i els beneficis. A finals del segle XIX les grans empreses busquen <b>controlar el mercat</b>. Hi ha tres maneres, i no són el mateix.',
        svg: concentracio,
        fases: [
          { fins: 0.33, nom: 'Càrtel: un pacte', text: 'Diverses empreses del mateix sector acorden preus o es reparteixen les zones de venda. Continuen sent empreses separades. Molt habitual a Alemanya.', focus: ['cartel'] },
          { fins: 0.66, nom: 'Trust: una fusió', text: 'Les empreses s’uneixen sota una sola direcció i esdevenen un gegant que pot arribar al monopoli. L’exemple clàssic és la Standard Oil de Rockefeller (1882).', focus: ['trust'] },
          { fins: 1, nom: 'Holding: control per accions', text: 'Una societat no fabrica res: posseeix la majoria de les accions d’altres empreses, sovint de sectors diferents, i així les dirigeix totes.', focus: ['holding'] }
        ],
        parts: {
          cartel: { nom: 'Càrtel', text: 'Acord entre empreses independents. Si una el trenca, el pacte s’acaba.' },
          trust: { nom: 'Trust', text: 'Fusió d’empreses en una de sola. Elimina la competència dins del sector.' },
          holding: { nom: 'Holding', text: 'Societat que controla altres empreses perquè en té la majoria de les accions.' }
        },
        clau: 'Del capitalisme de moltes empreses petites al de pocs gegants: és el capitalisme monopolista.',
        batx: { titol: 'La reacció: lleis antimonopoli', text: 'Als Estats Units, la Sherman Act (1890) prohibeix els acords que restringeixen la competència, i el 1911 el Tribunal Suprem obliga a dividir la Standard Oil. Debat: la gran empresa abarateix per economies d’escala o encareix perquè no té rivals?', font: 'https://www.archives.gov/milestone-documents/sherman-anti-trust-act', fontNom: 'National Archives (EUA) · Sherman Anti-Trust Act' }
      }
    ],
    repte: [
      { q: 'Què és una acció?', o: ['Un préstec del banc', 'Una part petita del capital d’una empresa', 'El sou d’un obrer'], c: 1, e: 'Qui la compra és propietari d’una part de l’empresa.' },
      { q: 'Per què es van crear societats anònimes?', o: ['Per reunir el capital de molta gent', 'Per pagar menys els obrers', 'Per amagar el nom de l’amo'], c: 0, e: 'Cap fortuna individual podia pagar un ferrocarril.' },
      { q: 'Què és un dividend?', o: ['L’interès d’un préstec', 'La part del benefici que cobra cada accionista', 'El preu d’una acció'], c: 1, e: 'Es reparteix segons el nombre d’accions de cadascú.' },
      { q: 'Què vol dir «responsabilitat limitada»?', o: ['Que l’accionista només pot perdre el que hi va invertir', 'Que l’empresa no pot tenir pèrdues', 'Que només hi pot haver cinc socis'], c: 0, e: 'El risc queda limitat i per això més gent s’atreveix a invertir.' },
      { q: 'On es compren i venen accions?', o: ['Al banc', 'A la borsa', 'A la fàbrica'], c: 1, e: 'La borsa és el mercat de les accions.' },
      { q: 'En què es diferencia un càrtel d’un trust?', o: ['El càrtel és un pacte entre empreses independents; el trust és una fusió', 'Són exactament el mateix', 'El trust és un banc'], c: 0, e: 'Al càrtel cada empresa continua existint; al trust en queda una de sola.' }
    ]
  });
})();
