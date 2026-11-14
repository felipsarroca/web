// SPDX-License-Identifier: AGPL-3.0-or-later
/* Capítol 4 · La fàbrica: una filatura en tall, moguda per aigua o per vapor. */
(function () {
  const { svg, focs, roda, persona, nuvol, txt, retol, fletxa } = RI;
  const XS = [480, 610, 740, 870], EIX = { g: 520, p1: 390, p2: 260 };
  const corretja = (x, y1, y2, r1, r2) => `<path d="M${x - r1} ${y1}L${x - r2} ${y2}M${x + r1} ${y1}L${x + r2} ${y2}" stroke="#2a2420" stroke-width="5"/><path d="M${x - r1} ${y1}L${x - r2} ${y2}M${x + r1} ${y1}L${x + r2} ${y2}" stroke="#a67547" stroke-width="2.5"/><path data-capa="forca" d="M${x - r1} ${y1}L${x - r2} ${y2}" class="flux2 s-taronja" stroke-width="3" data-flux="2.5"/>`;
  const politja = (x, y) => `<g data-girat="${x} ${y} 260">${roda(x, y, 11, { raigs: 4, color: '#a67547', gruix: 4, raig: 2 })}</g>`;
  const carda = (x, yb) => `<path class="t fusta" d="M${x - 40} ${yb}v-26h80v26h-10v-16h-60v16z"/><g data-girat="${x} ${yb - 46} 200"><circle class="t ferro2" cx="${x}" cy="${yb - 46}" r="30"/><circle cx="${x}" cy="${yb - 46}" r="24" fill="none" stroke="#2a2420" stroke-width="5" stroke-dasharray="2 5"/><path d="M${x - 24} ${yb - 46}h48" class="t2"/></g><g data-girat="${x + 38} ${yb - 36} -500"><circle class="t ferro2" cx="${x + 38}" cy="${yb - 36}" r="10"/><path d="M${x + 30} ${yb - 36}h16" class="t1"/></g><path d="M${x - 62} ${yb - 30}q20-22 34-12" class="nf" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M${x + 48} ${yb - 34}q16 2 18 22" class="nf" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
  const filadora = (x, yb) => { let b = ''; for (let i = 0; i < 4; i++) { const bx = x - 30 + i * 20; b += `<path d="M${bx} ${yb - 66}V${yb - 40}" stroke="#fff" stroke-width="2"/><rect class="t2" x="${bx - 5}" y="${yb - 46}" width="10" height="18" rx="3" fill="#fbf3dc"/>`; } return `<path class="t fusta" d="M${x - 44} ${yb}v-28h88v28h-8v-20h-72v20z"/><rect class="t fusta2" x="${x - 44}" y="${yb - 80}" width="88" height="9"/><path d="M${x - 40} ${yb - 72}v44M${x + 40} ${yb - 72}v44" class="t"/>${b}<g data-girat="${x - 22} ${yb - 64} 300"><circle class="t2 ferro2" cx="${x - 22}" cy="${yb - 64}" r="6"/><path d="M${x - 27} ${yb - 64}h10" class="t1"/></g><g data-girat="${x + 2} ${yb - 64} 500"><circle class="t2 ferro2" cx="${x + 2}" cy="${yb - 64}" r="6"/><path d="M${x - 3} ${yb - 64}h10" class="t1"/></g><g data-girat="${x + 26} ${yb - 64} 800"><circle class="t2 ferro2" cx="${x + 26}" cy="${yb - 64}" r="6"/><path d="M${x + 21} ${yb - 64}h10" class="t1"/></g>`; };
  const teler = (x, yb, i) => `<path class="t fusta" d="M${x - 42} ${yb}v-78h84v78h-9v-68h-66v68z"/><circle class="t fusta3" cx="${x - 30}" cy="${yb - 26}" r="12"/><circle class="t blanc" cx="${x + 30}" cy="${yb - 30}" r="10"/><path d="M${x - 30} ${yb - 38}L${x + 30} ${yb - 40}M${x - 30} ${yb - 14}L${x + 30} ${yb - 40}" stroke="#fff" stroke-width="2.5"/><path d="M${x - 30} ${yb - 38}L${x + 30} ${yb - 40}M${x - 30} ${yb - 14}L${x + 30} ${yb - 40}" class="t1 nf" stroke-dasharray="1 5"/><line class="pinta t" data-x="${x}" data-y="${yb - 74}" x1="${x}" y1="${yb - 74}" x2="${x}" y2="${yb - 20}" stroke-width="5"/>`;

  function fabrica(v) {
    const aigua = v === 'aigua';
    let s = `<rect class="cel" x="-60" width="1320" height="620"/>${nuvol(560, 80, 1.5)}${nuvol(1060, 130, 1.1)}<path class="herba2" d="M-60 560c160-60 300-40 420-30s600-70 900 20v70H-60z" opacity=".5"/><rect class="terra" x="-60" y="620" width="1320" height="100"/><rect class="herba" x="-60" y="616" width="1320" height="10"/>`;
    // edifici
    s += `<polygon class="crema" points="356,240 984,240 984,620 356,620"/><path class="t" fill="#a8452f" d="M316 244L670 150 1024 244v-16L670 132 316 228z"/><polygon class="t maof" points="340,240 670,152 1000,240"/>`;
    s += `<rect class="t mao" x="340" y="240" width="16" height="380"/><rect class="t mao" x="984" y="240" width="16" height="380"/>`;
    s += `<rect class="t fusta2" x="356" y="490" width="628" height="10"/><rect class="t fusta2" x="356" y="360" width="628" height="10"/><rect class="t fusta2" x="340" y="232" width="660" height="10"/><rect class="t pedra" x="340" y="618" width="660" height="10"/>`;
    [300, 430, 560].forEach((y) => { s += `<rect class="t vidre" x="986" y="${y}" width="12" height="40"/>`; });
    s += `<rect class="t fusta" x="986" y="545" width="12" height="73"/>`;
    // motor
    if (aigua) {
      s += `<rect x="-60" y="636" width="400" height="26" class="aigua"/><path d="M-50 640q12-6 24 0t24 0 24 0 24 0 24 0 24 0 24 0 24 0 24 0 24 0 24 0" class="nf s-blanc" stroke-width="2"/><rect x="140" y="620" width="200" height="20" fill="#d8cdb4"/><path d="M140 616v46M340 616v46" class="t"/>`;
      s += `<g data-part="motor"><path class="t fusta" d="M-60 438H250v20H-60z"/><rect x="-60" y="442" width="306" height="10" class="aigua"/><path d="M-30 458V620M90 458V620" class="t" stroke-width="6" stroke="#8f6038"/><path d="M-30 520L90 458M-30 458L90 520" class="t1"/>
        <path d="M248 446q20 4 22 30" class="nf s-blau" stroke-width="10" stroke-linecap="round"/><path d="M-50 447H240" class="flux2 s-blanc" stroke-width="3" data-flux="2.5"/>
        <g data-gira="240 546 2">${roda(240, 546, 92, { raigs: 8, color: '#a67547', gruix: 16, raig: 6, extra: Array.from({ length: 16 }, (_, i) => { const a = (i * Math.PI) / 8; return `<path d="M${(240 + Math.cos(a) * 78).toFixed(1)} ${(546 + Math.sin(a) * 78).toFixed(1)}L${(240 + Math.cos(a + 0.22) * 96).toFixed(1)} ${(546 + Math.sin(a + 0.22) * 96).toFixed(1)}" class="t"/>`; }).join('') })}</g>
        <path d="M300 600q10 20 -6 36" class="nf s-blau" stroke-width="8" stroke-linecap="round" stroke-dasharray="6 8"/></g>`;
    } else {
      s += `<polygon class="crema" points="-60,430 340,430 340,620 -60,620"/><path class="t" fill="#a8452f" d="M-70 432H346V416H-70z"/><rect class="t pedra" x="-60" y="618" width="400" height="10"/>`;
      s += `<g data-part="xemeneia"><path class="t mao" d="M-50 430L-44 70h26l6 360z"/><rect class="t fosc" x="-48" y="60" width="34" height="12"/></g><g data-puf="-31 54 60 -50 6 16 2.4" class="fum"></g>`;
      s += `<g data-part="caldera"><rect class="t mao" x="-56" y="520" width="112" height="100"/><rect class="t fosc" x="-44" y="572" width="88" height="42" rx="4"/>${focs(-22, 612, 2, 40, 30, 34)}<rect class="t" fill="url(#g-coure)" x="-48" y="468" width="96" height="88" rx="34"/><path d="M-45 520h90v6q0 26-30 26h-30q-30 0-30-26z" class="aigua" opacity=".9"/><path d="M-24 470v82M24 470v82" stroke="#7c3e16" stroke-width="1.6" stroke-dasharray="2 9" opacity=".6"/><rect class="t nf" x="-48" y="468" width="96" height="88" rx="34"/>
        <path d="M0 468V452H104V522" class="nf" stroke="#2a2420" stroke-width="12"/><path d="M0 468V452H104V522" class="nf" stroke="#f0ab68" stroke-width="7"/><path d="M0 466V452H104V520" class="flux s-blanc" stroke-width="4" data-flux="2"/><path class="t carbo" d="M62 620q22-30 44 0z"/></g>`;
      s += `<g data-part="motor"><rect class="t pedra" x="60" y="560" width="92" height="60"/><rect id="f-cam" x="66" y="526" width="40" height="30" fill="#f9a35e"/><path d="M58 518H150V564H58ZM66 526V556H142V526Z" class="t" fill="url(#g-ferroc)" fill-rule="evenodd"/>
        <g id="f-pist"><rect class="t" fill="url(#g-ferroh)" x="-70" y="-4" width="70" height="8"/><rect class="t" fill="url(#g-ferroc)" x="-76" y="-15" width="9" height="30"/><rect class="t" fill="url(#g-ferroc)" x="-8" y="-10" width="16" height="20" rx="3"/></g>
        <g id="f-volant">${roda(250, 541, 86, { raigs: 6, color: '#56636c', gruix: 15, raig: 6 })}</g><line id="f-biela" x1="180" y1="541" x2="250" y2="541" stroke="#2a2420" stroke-width="11" stroke-linecap="round"/><line id="f-biela2" x1="180" y1="541" x2="250" y2="541" stroke="#b4bec4" stroke-width="6" stroke-linecap="round"/></g>`;
    }
    // transmissió
    s += `<g data-part="arbre"><rect class="t ferro" x="240" y="536" width="144" height="11"/><rect class="t ferro" x="378" y="250" width="12" height="300"/>
      ${[541, EIX.g, EIX.p1, EIX.p2].map((y) => `<path class="t llauto" d="M370 ${y - 14}h28l-6 10h-16z"/><path class="t llauto" d="M398 ${y - 12}v24l-10-5v-14z"/>`).join('')}
      <path data-capa="forca" d="M250 541H384V256" class="flux s-taronja" data-flux="2.5"/></g>`;
    let eixos = '', corr = '';
    [EIX.g, EIX.p1, EIX.p2].forEach((y) => { eixos += `<rect class="t ferro" x="390" y="${y - 4}" width="560" height="8"/><path data-capa="forca" d="M392 ${y}H948" class="flux s-taronja" data-flux="2.5"/>`; XS.forEach((x) => { eixos += politja(x, y); }); });
    XS.forEach((x) => { corr += corretja(x, EIX.g, 574, 10, 14) + corretja(x, EIX.p1, 410, 10, 8) + corretja(x, EIX.p2, 286, 10, 6); });
    s += `<g data-part="eixos">${eixos}</g><g data-part="corretges">${corr}</g>`;
    // màquines
    s += `<g data-part="cardes">${XS.map((x) => carda(x, 620)).join('')}</g><g data-part="filadores">${XS.map((x) => filadora(x, 490)).join('')}</g><g data-part="telers">${XS.map((x, i) => teler(x, 360, i)).join('')}</g>`;
    s += `<g class="atenua">${persona(545, 620, 62, { color: '#7a4f9a' })}${persona(805, 620, 62, { color: '#3d5a80', gir: true })}${persona(675, 490, 62, { color: '#b9722a' })}${persona(930, 490, 48, { color: '#5b8c35' })}${persona(545, 360, 62, { color: '#3d5a80' })}${persona(805, 360, 62, { color: '#a8452f', gir: true })}</g>`;
    s += retol(424, 596, '1 · Cardar', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 108, attr: 'data-capa="coto"' }) + retol(424, 466, '2 · Filar', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 96, attr: 'data-capa="coto"' }) + retol(424, 336, '3 · Teixir', { fons: '#fffdf7', color: '#2a2420', vora: '#2a2420', w: 100, attr: 'data-capa="coto"' });
    // el cotó: carro, bales i recorregut
    s += `<g data-part="coto"><rect class="t fusta" x="1040" y="574" width="130" height="14"/>${roda(1068, 600, 20, { raigs: 8, color: '#a67547' })}${roda(1142, 600, 20, { raigs: 8, color: '#a67547' })}<rect class="t blanc" x="1048" y="544" width="52" height="30" rx="7"/><rect class="t blanc" x="1104" y="544" width="52" height="30" rx="7"/><rect class="t blanc" x="1076" y="514" width="52" height="30" rx="7"/><path d="M1060 544v30M1088 544v30M1116 544v30M1144 544v30M1090 514v30M1114 514v30" class="t1"/>
      <g>${[0, 1, 2].map((i) => `<circle class="t blanc" cx="${940}" cy="${352 - i * 0}" r="0"/>`).join('')}<rect class="t" x="928" y="318" width="44" height="14" rx="7" fill="#d9482b"/><rect class="t" x="928" y="332" width="44" height="14" rx="7" fill="#2f7fb5"/><rect class="t" x="928" y="346" width="44" height="14" rx="7" fill="#f2b632"/></g></g>`;
    s += `<g data-capa="coto"><path d="M1040 604H436V474H916V344H930" class="nf" stroke="#fffdf7" stroke-width="12" stroke-linejoin="round" opacity=".7"/><path d="M1040 604H436V474H916V344H930" class="flux s-verd" stroke-width="8" data-flux="1.6" stroke-linejoin="round"/>${retol(1150, 652, 'bales de cotó', { fons: '#5b8c35' })}${retol(1066, 330, 'tela acabada', { fons: '#5b8c35' })}</g>`;
    s += txt(670, 118, aigua ? 'Filatura hidràulica' : 'Filatura de vapor', 'tx-g mig');
    s += aigua
      ? RI.innova(340, 48, 'INNOVACIÓ · 1 sola roda d’aigua mou tots els pisos (prop del riu)', { apunta: [384, 384], halo: [384, 410, 26, 165], w: 505 })
      : RI.innova(340, 48, 'INNOVACIÓ · el vapor allibera la fàbrica del riu: pot anar a la ciutat', { apunta: [250, 541], halo: [220, 541, 128, 70], w: 530 });
    return svg(s);
  }
  function anima(v) {
    return ({ t, p, el, svg: g }) => {
      if (!g._pintes) g._pintes = Array.from(g.querySelectorAll('.pinta'));
      g._pintes.forEach((l, i) => l.setAttribute('transform', `rotate(${(Math.sin(t * 7 + i) * 16).toFixed(1)} ${l.dataset.x} ${l.dataset.y})`));
      if (v !== 'aigua') {
        const th = t * 3, C = { x: 250 + 34 * Math.cos(th), y: 541 + 34 * Math.sin(th) }, xx = C.x - Math.sqrt(72 * 72 - Math.pow(C.y - 541, 2));
        el('f-volant').setAttribute('transform', `rotate(${(((th * 180) / Math.PI) % 360).toFixed(1)} 250 541)`);
        el('f-pist').setAttribute('transform', `translate(${xx.toFixed(1)} 541)`);
        ['f-biela', 'f-biela2'].forEach((id) => { const l = el(id); l.setAttribute('x1', xx.toFixed(1)); l.setAttribute('x2', C.x.toFixed(1)); l.setAttribute('y2', C.y.toFixed(1)); });
        el('f-cam').setAttribute('width', Math.max(0, xx - 76 - 66).toFixed(1));
      }
    };
  }
  const partsComunes = {
    arbre: { nom: 'Arbre vertical', text: 'Un eix dret que puja la força del motor a tots els pisos. A cada planta, un parell d’engranatges cònics canvia la direcció del gir.' },
    eixos: { nom: 'Eixos de transmissió', text: 'Barres de ferro que recorren el sostre de cada sala girant sense parar. Tenen una politja per a cada màquina.' },
    corretges: { nom: 'Corretges', text: 'Cintes de cuir que baixen del sostre i fan girar cada màquina. Si en treus una, només s’atura aquella màquina.' },
    cardes: { nom: 'Cardes', text: 'Tambors amb pues que desenreden el cotó i el deixen en una metxa tova i contínua.' },
    filadores: { nom: 'Filadores', text: 'Estiren la metxa amb corrons i la torcen fins a convertir-la en fil resistent.' },
    telers: { nom: 'Telers', text: 'Entrecreuen els fils (ordit i trama) per fer la tela.' },
    coto: { nom: 'El cotó', text: 'Entra en bales premsades i surt convertit en peces de tela. Tot el procés passa sota un mateix sostre.' }
  };
  const etqComunes = [['arbre', 300, 330, 380, 330, 'Arbre vertical'], ['eixos', 670, 172, 676, 258, 'Eix de transmissió'], ['corretges', 1080, 404, 880, 404, 'Corretja'], ['cardes', 960, 662, 890, 590, 'Cardes'], ['filadores', 1090, 480, 900, 466, 'Filadores'], ['telers', 1080, 276, 900, 308, 'Telers']];
  const capes = [{ id: 'forca', nom: 'Segueix la força', on: true }, { id: 'coto', nom: 'Segueix el cotó', on: false }];

  RI.capitol({
    id: 'fabrica', titol: 'La fàbrica', llegenda: [['#f08a4b', 'força del motor'], ['#5b8c35', 'camí del cotó']],
    escenes: [
      {
        id: 'hidraulica', nom: 'Fàbrica d’aigua', any: '1771', qui: 'Model d’Arkwright · Cromford', durada: 16, capes,
        model: 'Filatura de diversos pisos · model didàctic, no és un edifici concret',
        pregunta: 'Com mous cent màquines amb un sol motor?',
        intro: 'Abans es filava a casa, amb una roda per persona. La fàbrica ho capgira: <b>un sol motor</b> mou totes les màquines de l’edifici. Activa «Segueix la força» i «Segueix el cotó».',
        svg: () => fabrica('aigua'), anima: anima('aigua'), innova: [1], capaFase: { forca: [0, 1, 2], coto: [3] },
        fases: [
          { fins: 0.25, nom: 'L’aigua fa girar la roda', text: 'Un canal desvia l’aigua del riu i la deixa caure sobre la roda. El pes de l’aigua la fa girar dia i nit.', focus: ['motor'] },
          { fins: 0.5, nom: 'L’arbre vertical puja la força', text: 'L’eix de la roda entra a l’edifici i, amb engranatges, fa girar un arbre dret que travessa tots els pisos.', focus: ['arbre'] },
          { fins: 0.75, nom: 'Eixos i corretges la reparteixen', text: 'A cada sostre, un eix llarg gira contínuament. De cada politja baixa una corretja fins a una màquina.', focus: ['eixos', 'corretges'] },
          { fins: 1, nom: 'El cotó puja de pis en pis', text: 'A baix es carda, al mig es fila i a dalt es teixeix. Les persones ja no fan la força: alimenten i vigilen les màquines, al ritme que marca el motor.', focus: ['cardes', 'filadores', 'telers', 'coto'] }
        ],
        parts: Object.assign({ motor: { nom: 'Roda hidràulica', text: 'El motor de la fàbrica. Aprofita el pes de l’aigua que cau. Obliga a construir la fàbrica al costat d’un riu amb prou cabal.' } }, partsComunes),
        etiquetes: [['motor', 130, 400, 200, 480, 'Roda hidràulica']].concat(etqComunes),
        real: {
          img: '../../img/real-fabrica.webp',
          titol: 'Filatura d’Arkwright a Cromford (1771)',
          museu: 'Cromford Mills · Derbyshire (Regne Unit)',
          lic: 'Foto: Alan Heardman · Wikimedia Commons · CC BY-SA 2.0'
        },
        clau: 'La fàbrica és una sola gran màquina: un motor, una xarxa d’eixos i moltes màquines treballant alhora.',
        batx: { titol: 'Disciplina de fàbrica', text: 'Com que tot depèn d’un sol motor, tothom ha de començar i acabar alhora: horaris, torns, sirenes i vigilants. Compara-ho amb el treball a domicili, on cada família decidia el seu ritme. La tècnica imposa una nova organització del treball.', font: 'https://www.cromfordmills.org.uk/', fontNom: 'Cromford Mills · la primera filatura hidràulica' }
      },
      {
        id: 'vaporera', nom: 'Fàbrica de vapor', any: 'des de 1785', qui: 'Manchester, Barcelona...', durada: 16, capes,
        model: 'El mateix edifici amb una màquina de vapor · model didàctic',
        pregunta: 'Què canvia si traiem la roda i hi posem vapor?',
        intro: 'Per dins, la fàbrica és igual: arbre, eixos i corretges. Però ara el motor és una <b>màquina de vapor</b>. Fixa’t en què apareix de nou a l’esquerra.',
        svg: () => fabrica('vapor'), anima: anima('vapor'), innova: [0, 1], capaFase: { forca: [0, 1, 2], coto: [3] },
        fases: [
          { fins: 0.25, nom: 'El carbó escalfa la caldera', text: 'Ja no cal un riu: cal carbó. Per això les fàbriques es traslladen a prop de les mines, dels ports o del tren.', focus: ['caldera', 'xemeneia'] },
          { fins: 0.5, nom: 'El pistó fa girar el volant', text: 'El vapor empeny el pistó, la biela mou el volant i el volant fa girar el mateix arbre vertical d’abans.', focus: ['motor', 'arbre'] },
          { fins: 0.75, nom: 'La mateixa transmissió', text: 'Eixos i corretges reparteixen la força igual que a la fàbrica d’aigua. La diferència és que es pot afegir més potència: més pisos, més màquines.', focus: ['eixos', 'corretges'] },
          { fins: 1, nom: 'Fàbriques a la ciutat', text: 'Sense dependre del riu ni de la sequera, les fàbriques s’amunteguen a les ciutats. El paisatge s’omple de xemeneies.', focus: ['xemeneia', 'cardes', 'filadores', 'telers'] }
        ],
        parts: Object.assign({ caldera: { nom: 'Caldera', text: 'Crema carbó per produir el vapor. Necessita fogoners i un subministrament constant de combustible.' }, xemeneia: { nom: 'Xemeneia', text: 'Treu el fum ben amunt i fa tirar el foc. És el símbol del paisatge industrial.' }, motor: { nom: 'Màquina de vapor', text: 'Cilindre, pistó, biela i volant: converteix la pressió del vapor en el gir que mou tota la fàbrica.' } }, partsComunes),
        etiquetes: [['xemeneia', 80, 200, -22, 220], ['caldera', 30, 396, 0, 480], ['motor', 200, 400, 230, 470, 'Màquina de vapor']].concat(etqComunes),
        clau: 'El vapor allibera la fàbrica del riu: es pot instal·lar on hi hagi carbó, treballadors i clients.',
        batx: { titol: 'El vapor no va substituir l’aigua de cop', text: 'A Anglaterra l’energia hidràulica va ser majoritària a la indústria cotonera fins ben entrat el segle XIX, i a Catalunya les colònies tèxtils del Ter i el Llobregat van triar l’aigua perquè el carbó era car. Per què conviuen dues tecnologies durant dècades?', font: 'https://www.mnactec.cat/', fontNom: 'Museu de la Ciència i de la Tècnica de Catalunya' }
      }
    ],
    repte: [
      { q: 'Quina és la idea essencial d’una fàbrica?', o: ['Cada treballador té el seu motor', 'Un sol motor mou totes les màquines', 'Les màquines funcionen a mà'], c: 1, e: 'Roda o màquina de vapor: una única font de força per a tot l’edifici.' },
      { tipus: 'toca', esc: 'hidraulica', part: 'arbre', p: 0.4, q: 'Toca la peça que puja la força del motor fins als pisos de dalt.', e: 'L’arbre vertical: travessa els pisos i, amb engranatges, fa girar l’eix de cada planta.' },
      { tipus: 'ordena', esc: 'hidraulica', q: 'Ordena el camí de la força dins la fàbrica d’aigua.', e: 'Roda hidràulica → arbre vertical → eixos i corretges → màquines que treballen el cotó.' },
      { q: 'Què fa la corretja?', o: ['Subjecta el sostre', 'Porta el gir de l’eix del sostre fins a cada màquina', 'Transporta el cotó'], c: 1, e: 'Cada màquina rep el moviment per la seva corretja.' },
      { q: 'En quin ordre es treballa el cotó?', o: ['Teixir, filar, cardar', 'Cardar, filar, teixir', 'Filar, cardar, teixir'], c: 1, e: 'Primer es desenreda (cardar), després es fa fil (filar) i al final tela (teixir).' },
      { q: 'Quin límit tenia la fàbrica hidràulica?', o: ['Havia d’estar al costat d’un riu amb prou aigua', 'No podia tenir més d’un pis', 'Només funcionava de nit'], c: 0, e: 'Depenia del lloc i del cabal: sequeres i glaçades l’aturaven.' },
      { q: 'Què permet la màquina de vapor?', o: ['Fabricar sense treballadors', 'Posar la fàbrica a la ciutat, prop del carbó i dels transports', 'No gastar combustible'], c: 1, e: 'La força ja no depèn del riu, però sí del carbó.' }
    ]
  });
})();
