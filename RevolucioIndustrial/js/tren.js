// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 6 · La locomotora: la Rocket per dins i la cursa de Liverpool a Manchester. */
(function () {
  const { svg, foc, focs, roda, persona, nuvol, cavall, txt, retol, fletxa } = RI;
  const W = { x: 760, y: 480 }, RM = 42, LB = 230, UA = (-145 * Math.PI) / 180, U = { x: Math.cos(UA), y: Math.sin(UA) };
  const tub = (d, c, g) => `<path d="${d}" class="nf" stroke="#2a2420" stroke-width="${(g || 8) + 5}" stroke-linejoin="round"/><path d="${d}" class="nf" stroke="${c}" stroke-width="${g || 8}" stroke-linejoin="round"/>`;
  const arbre = (x, y, k) => RI.arbre(x, y, (k || 1) * 0.72);

  function rocket() {
    let s = `<rect class="cel" x="-60" width="1320" height="600"/>${nuvol(150, 110, 1.5)}${nuvol(980, 170, 1.2)}<path class="herba2" d="M-60 520c200-70 380-30 560-50s420-60 760 10v120H-60z" opacity=".5"/>`;
    let arbres = ''; for (let i = 0; i < 2; i++) [[80, 0.9], [330, 1.2], [610, 0.8], [900, 1.1], [1150, 0.9]].forEach(([x, k]) => { arbres += arbre(x + i * 1320, 596, k); });
    s += `<g id="arbres" opacity=".75">${arbres}</g>`;
    s += `<rect class="herba" x="-60" y="592" width="1320" height="30"/><rect class="pedra" x="-60" y="612" width="1320" height="108"/>`;
    let tr = ''; for (let x = -120; x < 1340; x += 60) tr += `<rect class="t2 fusta2" x="${x}" y="607" width="34" height="13"/>`;
    s += `<g id="trav">${tr}</g><rect class="t ferro" x="-60" y="599" width="1320" height="9"/>`;
    s += `<g data-guia="1"><path d="M180 460h-48M395 320l-42-28M620 260v-44M824 250l34-44M760 480l36 32M474 220v-48"/></g>`;
    // tènder
    s += `<g data-part="tender" data-exp="-58 10"><g id="rt1">${roda(115, 550, 50, { raigs: 8, color: '#a67547' })}</g><g id="rt2">${roda(245, 550, 50, { raigs: 8, color: '#a67547' })}</g>
      <rect class="t" fill="url(#g-fustac)" x="56" y="470" width="250" height="18"/><rect class="t" fill="url(#g-fustac)" x="66" y="368" width="176" height="102" rx="44"/><path d="M110 370v98M154 368v102M198 370v98" class="t nf"/><rect x="74" y="410" width="160" height="52" rx="24" class="aigua" opacity=".55"/>
      <path class="t fusta2" d="M248 470v-52h54v52z"/><path class="t carbo" d="M250 420q26-34 50 0z"/>
      ${tub('M236 452C280 486 320 476 356 436', '#58a9d6', 6)}<path class="t4" d="M306 479h36"/></g>`;
    // roda posterior, bastidor
    s += `<g id="rpost">${roda(470, 540, 60, { raigs: 8, color: '#f2c230' })}</g>`;
    s += `<rect class="t fosc" x="336" y="440" width="528" height="13"/><rect class="t fusta" x="852" y="424" width="16" height="44"/><rect class="t fusta2" x="296" y="440" width="52" height="11"/>`;
    s += persona(320, 440, 118, { color: '#3d5a80', barret: true, attr: 'class="atenua"' });
    // fogar
    s += `<g data-part="fogar" data-exp="-42 -36"><rect class="t coure" x="350" y="235" width="92" height="215" rx="8"/><rect x="358" y="243" width="76" height="180" rx="4" fill="#8fc3e0"/><rect class="t" x="368" y="255" width="64" height="188" rx="4" fill="#4a2a1c"/><rect x="368" y="255" width="64" height="150" fill="#f08a4b" opacity=".45"/>
      ${focs(384, 434, 2, 32, 30, 60)}<path d="M366 436h68" class="t4"/><path class="t carbo" d="M370 434q30-16 60 0z"/><rect class="t ferro" x="342" y="330" width="10" height="46" rx="3"/></g>`;
    // caldera en tall
    s += `<g data-part="caldera" data-exp="0 -34"><rect class="t" x="440" y="250" width="362" height="130" rx="10" fill="#f2c230"/><rect x="448" y="258" width="346" height="114" rx="5" fill="#fbe9c4"/><rect x="448" y="278" width="346" height="94" fill="#7fbde0"/>
      <path d="M448 278q14-7 28 0t28 0 28 0 28 0 28 0 28 0 28 0 28 0 28 0 28 0 28 0 28 0 10 0" class="nf s-blanc" stroke-width="2.5"/>
      <g data-puf="560 276 0 -16 3 5 1.3" class="vap"></g><g data-puf="700 276 0 -16 3 5 1.7" class="vap"></g></g>`;
    let tubs = ''; [298, 317, 336, 355].forEach((y, i) => { tubs += `<path d="M432 ${y}H802" stroke="#2a2420" stroke-width="13"/><path d="M432 ${y}H802" stroke="#e08a45" stroke-width="8"/><path d="M436 ${y}H800" class="flux s-groc" stroke-width="4" data-flux="${2.2 + i * 0.2}"/>`; });
    s += `<g data-part="tubs" data-exp="-12 -64">${tubs}</g>`;
    // caixa de fums i xemeneia
    s += `<g data-part="xemeneia" data-exp="42 -54"><rect class="t fosc" x="800" y="246" width="48" height="138" rx="6"/><path class="t blanc" d="M806 250V96l-8-26h52l-8 26v154z"/><path d="M824 262V120" class="flux s-gris" data-flux="3"/></g><g data-puf="824 66 -170 -70 7 15 1.5" class="vap"></g><g data-puf="824 66 -150 -50 4 12 2.1" class="fum" opacity=".5"></g>`;
    // tubs de vapor i d'escapament
    s += `<g data-part="vapor" data-exp="0 -66"><path class="t llauto" d="M598 252q0-26 22-26t22 26z"/>${tub('M620 232V222H506V246', '#f08a4b', 7)}<path d="M620 232V222H506V244" class="flux s-blanc" stroke-width="4" data-flux="2.5"/></g>`;
    s += `<g data-part="escapament" data-exp="14 -68">${tub('M474 236V204H824V268', '#c9d6dc', 7)}<path d="M474 232V204H824V262" class="flux s-blanc" stroke-width="4" data-flux="3"/></g>`;
    // roda motriu
    s += `<g data-part="roda" data-exp="40 42"><g id="rmot">${roda(W.x, W.y, 120, { raigs: 12, color: '#f2c230', gruix: 13, extra: `<path d="M${W.x} ${W.y}h${RM}" stroke="#2a2420" stroke-width="16" stroke-linecap="round"/><path d="M${W.x} ${W.y}h${RM}" stroke="#8d9aa3" stroke-width="9" stroke-linecap="round"/>` })}</g></g>`;
    // cilindre inclinat (coordenades locals: x al llarg de l'eix, des del centre de la roda)
    s += `<g transform="translate(${W.x} ${W.y}) rotate(-145)"><g data-part="cilindre" data-exp="0 -34"><path d="M176 -15H300M176 15H300" class="t"/><rect x="310" y="-22" width="100" height="44" fill="#eef4f6"/><rect id="cam-a" x="310" y="-22" width="40" height="44" fill="#f9a35e"/><rect id="cam-b" x="360" y="-22" width="50" height="44" fill="#eef4f6"/>
      <path d="M302 -30H418V30H302ZM310 -22V22H410V-22Z" class="t" fill="#f2c230" fill-rule="evenodd"/><rect class="t llauto" x="330" y="-52" width="60" height="22" rx="4"/></g>
      <g data-part="piston" id="creu"><rect class="t ferro" x="0" y="-4" width="130" height="8"/><rect class="t ferro" x="125" y="-22" width="10" height="44"/><rect class="t ferro" x="-12" y="-17" width="24" height="34" rx="4"/></g></g>`;
    s += `<g data-part="biela"><line id="biela" x1="600" y1="370" x2="760" y2="480" stroke="#2a2420" stroke-width="15" stroke-linecap="round"/><line id="biela2" x1="600" y1="370" x2="760" y2="480" stroke="#b4bec4" stroke-width="8" stroke-linecap="round"/><circle id="bulo" class="t llauto" cx="760" cy="480" r="9"/></g>`;
    s += `<g data-en="3">${retol(980, 420, 'vaivé → gir', { fons: '#d9482b' })}</g><g data-en="4">${retol(1000, 150, 'el raig de vapor estira l’aire', { fons: '#2a2420', w: 250 })}${retol(1000, 186, 'i aviva el foc', { fons: '#2a2420' })}</g>`;
    return svg(s);
  }
  function animaRocket({ t, el }) {
    const th = (2 * Math.PI * 4 * t) / 10, al = th - UA, d = RM * Math.cos(al) + Math.sqrt(LB * LB - Math.pow(RM * Math.sin(al), 2));
    const C = { x: W.x + RM * Math.cos(th), y: W.y + RM * Math.sin(th) }, X = { x: W.x + d * U.x, y: W.y + d * U.y }, g = (th * 180) / Math.PI;
    el('rmot').setAttribute('transform', `rotate(${(g % 360).toFixed(1)} ${W.x} ${W.y})`);
    el('rpost').setAttribute('transform', `rotate(${((g * 2) % 360).toFixed(1)} 470 540)`);
    el('rt1').setAttribute('transform', `rotate(${((g * 2.4) % 360).toFixed(1)} 115 550)`); el('rt2').setAttribute('transform', `rotate(${((g * 2.4) % 360).toFixed(1)} 245 550)`);
    el('creu').setAttribute('transform', `translate(${d.toFixed(1)} 0)`);
    ['biela', 'biela2'].forEach((id) => { const l = el(id); l.setAttribute('x1', X.x.toFixed(1)); l.setAttribute('y1', X.y.toFixed(1)); l.setAttribute('x2', C.x.toFixed(1)); l.setAttribute('y2', C.y.toFixed(1)); });
    const b = el('bulo'); b.setAttribute('cx', C.x.toFixed(1)); b.setAttribute('cy', C.y.toFixed(1));
    const xp = d + 130, puja = Math.sin(al) < 0;
    el('cam-a').setAttribute('width', Math.max(0, xp - 5 - 310).toFixed(1)); el('cam-a').setAttribute('fill', puja ? '#f9a35e' : '#eef4f6');
    el('cam-b').setAttribute('x', (xp + 5).toFixed(1)); el('cam-b').setAttribute('width', Math.max(0, 410 - xp - 5).toFixed(1)); el('cam-b').setAttribute('fill', puja ? '#eef4f6' : '#f9a35e');
    const dist = th * 120;
    el('trav').setAttribute('transform', `translate(${(-(dist % 60)).toFixed(1)} 0)`);
    el('arbres').setAttribute('transform', `translate(${(-60 - ((dist * 0.25) % 1320)).toFixed(1)} 0)`);
  }

  /* ---------- la cursa ---------- */
  function cursa() {
    let s = `<rect class="crema" x="-60" width="1320" height="720"/>`;
    s += `<text x="120" y="70" class="tx-g mig">Liverpool</text><text x="1080" y="70" class="tx-g mig">Manchester</text><path d="M200 62H1000" class="t nf" stroke-dasharray="2 10"/><text x="600" y="54" class="tx-p mig">uns 50 km</text>`;
    s += `<path d="M120 90V680M1080 90V680" class="t nf" stroke-dasharray="8 8"/>`;
    s += `<g><circle class="t blanc" cx="600" cy="120" r="44"/><path d="M600 84v8M600 148v8M564 120h8M628 120h8" class="t2"/><line id="agulla" x1="600" y1="120" x2="600" y2="88" class="t" stroke-width="5"/><circle cx="600" cy="120" r="5" class="negre"/></g><text id="hores" x="662" y="130" class="tx-gg">0 h</text>`;
    // canal
    s += `<rect x="-60" y="196" width="1320" height="100" fill="#cfe6ee"/><rect class="aigua" x="-60" y="246" width="1320" height="50" opacity=".85"/><rect class="herba" x="-60" y="232" width="1320" height="16"/><text x="-40" y="218" class="tx">Canal · barcassa estirada per un cavall</text>
      <g id="v-canal"><path class="t fusta" d="M-150 250h130l-14 30h-104z"/><path class="t carbo" d="M-136 250q50-30 96 0z"/>${persona(-32, 250, 34, { color: '#7a4f9a' })}<path d="M-20 256L48 228" class="t1"/>${cavall(68, 240, 0.72, { arnes: true })}</g>`;
    // camí
    s += `<rect x="-60" y="352" width="1320" height="100" fill="#efe0bd"/><rect x="-60" y="430" width="1320" height="22" fill="#c9a877"/><text x="-40" y="374" class="tx">Camí · diligència amb quatre cavalls</text>
      <g id="v-cami"><rect class="t vermell" x="-150" y="384" width="80" height="36" rx="8"/><rect class="t vidre" x="-140" y="390" width="22" height="14"/><rect class="t vidre" x="-108" y="390" width="22" height="14"/><path class="t fosc" d="M-156 384h92l-6-10h-80z"/>${roda(-132, 426, 14, { raigs: 6 })}${roda(-88, 426, 14, { raigs: 6 })}<path d="M-70 410h34" class="t"/>${cavall(-16, 434, 0.64, { color: '#5a4636', arnes: true })}${cavall(34, 434, 0.64, { arnes: true })}</g>`;
    // via
    s += `<rect x="-60" y="508" width="1320" height="110" fill="#e3ead5"/><rect class="pedra" x="-60" y="596" width="1320" height="22"/><rect class="t ferro" x="-60" y="590" width="1320" height="7"/><text x="-40" y="530" class="tx">Ferrocarril · locomotora de vapor amb vagons</text>
      <g id="v-tren">${[-330, -250, -170].map((x) => `<rect class="t blau" x="${x}" y="548" width="70" height="30" rx="4"/><rect class="t vidre" x="${x + 8}" y="554" width="14" height="12"/><rect class="t vidre" x="${x + 28}" y="554" width="14" height="12"/><rect class="t vidre" x="${x + 48}" y="554" width="14" height="12"/>${roda(x + 16, 582, 9, { raigs: 4 })}${roda(x + 54, 582, 9, { raigs: 4 })}`).join('')}
        <rect class="t fusta" x="-92" y="556" width="34" height="22" rx="8"/>${roda(-75, 582, 9, { raigs: 4 })}<rect class="t" x="-50" y="544" width="56" height="26" rx="6" fill="#f2c230"/><path class="t blanc" d="M-6 544v-34h12v34z"/>${roda(-38, 578, 12, { raigs: 6, color: '#f2c230' })}${roda(-8, 572, 18, { raigs: 8, color: '#f2c230' })}<g data-puf="0 506 -60 -30 4 7 1.2" class="vap"></g></g>`;
    s += `<g id="a-tren" opacity="0">${retol(960, 498, 'menys de 2 hores', { fons: '#1f6f78' })}</g><g id="a-cami" opacity="0">${retol(970, 342, 'unes 4 hores', { fons: '#d9482b' })}</g><g id="a-canal" opacity="0">${retol(960, 186, 'unes 12 hores', { fons: '#2f7fb5' })}</g>`;
    s += `<text x="600" y="668" class="tx-p mig">Temps aproximats cap al 1830. La barcassa portava unes 30 tones; la diligència, una quinzena de viatgers; un tren, centenars.</text>`;
    return svg(s);
  }
  function animaCursa({ p, el }) {
    const h = Math.min(12, p * 12.6), pos = (T) => 120 + 960 * Math.min(1, h / T);
    el('v-tren').setAttribute('transform', `translate(${pos(1.75).toFixed(1)} 0)`);
    el('v-cami').setAttribute('transform', `translate(${pos(4).toFixed(1)} 0)`);
    el('v-canal').setAttribute('transform', `translate(${pos(12).toFixed(1)} 0)`);
    el('a-tren').setAttribute('opacity', h >= 1.75 ? 1 : 0); el('a-cami').setAttribute('opacity', h >= 4 ? 1 : 0); el('a-canal').setAttribute('opacity', h >= 12 ? 1 : 0);
    el('agulla').setAttribute('transform', `rotate(${(h * 30).toFixed(1)} 600 120)`);
    el('hores').textContent = (Math.floor(h * 2) / 2).toString().replace('.', ',') + ' h';
  }

  RI.capitol({
    id: 'tren', titol: 'La locomotora',
    escenes: [
      {
        id: 'rocket', nom: 'La Rocket per dins', any: '1829', qui: 'George i Robert Stephenson', durada: 20,
        model: 'Locomotora Rocket (1829), secció simplificada · reconstrucció didàctica',
        pregunta: 'Com mous un tren sense cavalls?',
        intro: 'La <b>Rocket</b> va guanyar el concurs de Rainhill (1829) i va fixar el model de totes les locomotores de vapor. Segueix l’energia: del foc a les rodes en cinc passos.',
        svg: rocket, anima: animaRocket,
        fases: [
          { fins: 0.2, nom: 'El foc crema al fogar', text: 'El fogoner hi tira coc. Les parets del fogar estan envoltades d’aigua, que comença a escalfar-se.', focus: ['fogar', 'tender'] },
          { fins: 0.4, nom: 'Els tubs fan bullir l’aigua', text: 'Els gasos calents del foc travessen la caldera per 25 tubs de coure (aquí en veus quatre). Com que toquen molta aigua alhora, es fa <b>molt vapor en poc temps</b>.', focus: ['caldera', 'tubs'] },
          { fins: 0.6, nom: 'El vapor empeny el pistó', text: 'El vapor a pressió baixa fins al cilindre i empeny el pistó, ara per un costat, ara per l’altre.', focus: ['vapor', 'cilindre', 'piston'] },
          { fins: 0.8, nom: 'La biela fa girar la roda', text: 'El pistó va endavant i endarrere. La biela, enganxada fora del centre de la roda, converteix aquest vaivé en gir.', focus: ['piston', 'biela', 'roda'] },
          { fins: 1, nom: 'El vapor usat aviva el foc', text: 'El vapor que ja ha treballat surt disparat per la xemeneia. En sortir, xucla l’aire a través dels tubs i el foc crema més fort: com més corre, més tira.', focus: ['escapament', 'xemeneia', 'tubs'] }
        ],
        parts: {
          fogar: { nom: 'Fogar', text: 'La cambra on crema el combustible. Està envoltat d’una camisa d’aigua per aprofitar tota la calor.' },
          caldera: { nom: 'Caldera', text: 'Dipòsit ple d’aigua (blau) amb vapor a pressió a dalt. La Rocket era pintada de groc.' },
          tubs: { nom: 'Tubs de fum', text: 'La gran novetat: molts tubs prims per on passen els gasos calents. Multipliquen la superfície que escalfa l’aigua.' },
          vapor: { nom: 'Presa de vapor', text: 'Recull el vapor de la part alta de la caldera i el porta al cilindre.' },
          cilindre: { nom: 'Cilindre', text: 'Inclinat i unit directament a la roda. A dins, el vapor empeny el pistó pels dos costats.' },
          piston: { nom: 'Pistó', text: 'Es mou endavant i endarrere dins del cilindre i estira la biela.' },
          biela: { nom: 'Biela', text: 'Barra que uneix el pistó amb la roda motriu.' },
          roda: { nom: 'Roda motriu', text: 'Rep la força de la biela i empeny la locomotora sobre el rail. Ferro llis sobre ferro llis: n’hi ha prou perquè no patini.' },
          escapament: { nom: 'Tub d’escapament', text: 'Porta el vapor usat fins a la base de la xemeneia.' },
          xemeneia: { nom: 'Xemeneia', text: 'Hi surten junts el fum del foc i el vapor usat. El raig de vapor crea el tiratge.' },
          tender: { nom: 'Tènder', text: 'Vagó amb la reserva d’aigua (la bota) i de combustible.' }
        },
        etiquetes: [['fogar', 300, 180, 372, 250], ['tubs', 620, 660, 620, 356, 'Tubs de fum'], ['caldera', 500, 660, 500, 370], ['vapor', 700, 160, 628, 226, 'Presa de vapor'], ['cilindre', 420, 120, 462, 240], ['biela', 960, 480, 700, 440], ['roda', 940, 560, 850, 540, 'Roda motriu'], ['escapament', 590, 110, 600, 204, 'Tub d’escapament'], ['xemeneia', 940, 110, 840, 130], ['tender', 150, 320, 150, 372]],
        clau: 'Calor → vapor a pressió → vaivé del pistó → gir de les rodes.',
        batx: { titol: 'Tres idees que fan guanyar la Rocket', text: 'Caldera multitubular, tiratge forçat amb el vapor d’escapament i cilindres units directament a les rodes. Cap era del tot nova (Trevithick ja havia fet córrer una locomotora el 1804), però combinades donen una màquina lleugera i ràpida. La innovació sovint és combinació.', font: 'https://www.railwaymuseum.org.uk/objects-and-stories/stephensons-rocket-rainhill-and-rise-locomotive', fontNom: 'National Railway Museum · La Rocket i Rainhill' }
      },
      {
        id: 'cursa', nom: 'Més de pressa que cap cavall', any: '1830', qui: 'Línia Liverpool – Manchester', durada: 14,
        pregunta: 'Quant temps guanyes amb el tren?',
        intro: 'El 1830 s’obre la primera línia entre dues ciutats amb locomotores de vapor i horari fix. Fes sortir els tres transports alhora i mira el rellotge.',
        svg: cursa, anima: animaCursa,
        fases: [
          { fins: 0.15, nom: 'El tren arriba en menys de 2 hores', text: 'I no porta una quinzena de viatgers, sinó centenars, o desenes de tones de cotó del port a les fàbriques.' },
          { fins: 0.33, nom: 'La diligència, unes 4 hores', text: 'Cal canviar els cavalls pel camí. El bitllet és car i hi cap poca gent.' },
          { fins: 1, nom: 'La barcassa, unes 12 hores', text: 'El canal mou molta càrrega amb un sol cavall i és barat, però és lent i a l’hivern es pot glaçar.' }
        ],
        clau: 'El tren no només és més ràpid: porta molt més pes, a tota hora i amb horari. Les distàncies «s’encongeixen».',
        batx: { titol: 'Causa o conseqüència de la industrialització?', text: 'El ferrocarril necessita ferro, carbó, màquines i capital que ja existien; i alhora multiplica la demanda de tots quatre i unifica mercats. Argumenta: és més un resultat de la primera industrialització o el motor de la seva segona etapa?', font: 'https://www.scienceandindustrymuseum.org.uk/objects-and-stories/making-the-liverpool-and-manchester-railway', fontNom: 'Science and Industry Museum · Liverpool and Manchester Railway' }
      }
    ],
    repte: [
      { q: 'Per què la caldera de la Rocket té molts tubs?', o: ['Perquè pesi menys', 'Perquè els gasos calents toquin més aigua i facin més vapor', 'Per guardar-hi el carbó'], c: 1, e: 'Més superfície de contacte entre el foc i l’aigua vol dir més vapor en menys temps.' },
      { q: 'Quina peça converteix el vaivé del pistó en gir?', o: ['La biela', 'La xemeneia', 'El tènder'], c: 0, e: 'La biela uneix el pistó amb un punt de la roda que no és el centre.' },
      { q: 'Què passa amb el vapor que ja ha empès el pistó?', o: ['Torna a la caldera', 'Surt per la xemeneia i aviva el foc', 'Es guarda al tènder'], c: 1, e: 'El raig de vapor arrossega l’aire i fa que el foc cremi més fort.' },
      { q: 'Què porta el tènder?', o: ['Viatgers', 'Aigua i combustible', 'Les eines del maquinista'], c: 1, e: 'Sense aigua no hi ha vapor i sense combustible no hi ha foc.' },
      { q: 'Cap al 1830, quant trigava el tren de Liverpool a Manchester?', o: ['Menys de 2 hores', 'Unes 6 hores', 'Un dia sencer'], c: 0, e: 'La diligència necessitava unes 4 hores i la barcassa del canal, unes 12.' },
      { q: 'Quin avantatge del tren és tan important com la velocitat?', o: ['No necessitava vies', 'Podia portar molta càrrega i molts viatgers alhora', 'No gastava carbó'], c: 1, e: 'Capacitat i regularitat: més mercaderies, més barates i amb horari.' }
    ]
  });
})();
