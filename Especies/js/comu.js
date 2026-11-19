/* SPDX-License-Identifier: AGPL-3.0-or-later */
/* El comerç de les espècies · codi comú de totes les pàgines */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const CAPS = [
    { n: 1, id: 'paradoxa', tit: 'La paradoxa del pebre', curt: 'La paradoxa del pebre', preg: 'Per què el pebre valia una fortuna i avui és a totes les cuines?', il: 'pot-pebre', act: 'Calculadora de jornals', t: [1438, 1438], sint: 'El pebre no era car per ell mateix: ho era pel camí llarguíssim i per les moltes mans que el compraven i el revenien. Quan el camí es va escurçar i les plantes es van escampar pel món, es va abaratir.' },
    { n: 2, id: 'especies', tit: 'Què són les espècies i on creixen', curt: 'Les espècies i on creixen', preg: 'D’on surten el clau, la canyella o el pebre?', il: 'cistell', act: '7 fitxes i mapa d’orígens', t: [1250, 1500], et: 'Edat mitjana', sint: 'Són parts seques de plantes (fruits, escorces, poncells, estigmes, rizomes) que creixien en llocs tropicals molt concrets. Com més petit i llunyà era l’origen, més cara era l’espècia a Europa.' },
    { n: 3, id: 'marco-polo', tit: 'Marco Polo i el que Europa sabia', curt: 'Marco Polo', preg: 'Què en sabien, els europeus, de l’origen de les espècies?', il: 'marco-polo', act: 'Viatge animat i llegendes', t: [1271, 1298], sint: 'Ben poca cosa: només en veien l’últim tram i ho omplien amb llegendes. Marco Polo va explicar que eren plantes conreades i que Àsia era el gran mercat, molt més que Europa.' },
    { n: 4, id: 'indic', tit: 'La xarxa de l’Índic i els monsons', curt: 'L’Índic i els monsons', preg: 'Com viatjaven les espècies abans d’arribar a Europa?', il: 'dhow', act: 'Mapa dels vents i 14 ports', t: [1300, 1500], sint: 'Per una xarxa de ports on cada mercader feia un tram, empès pels monsons, i les pagava amb teixits de cotó, or, plata o cavalls.' },
    { n: 5, id: 'preus', tit: 'Ports, intermediaris i preus', curt: 'Intermediaris i preus', preg: 'Per què el pebre multiplicava el preu pel camí?', il: 'balanca', act: 'Joc de la galera de Venècia', t: [1368, 1500], sint: 'Perquè cada tram hi afegia transport, riscos, impostos i el benefici de cada intermediari. De Malabar a la resta d’Europa, el preu es multiplicava per més de deu.' },
    { n: 6, id: 'compradors', tit: 'Qui les comprava a Europa', curt: 'Usos i Barcelona', preg: 'Per a què les volien i quin paper hi tenia Barcelona?', il: 'olla', act: 'Mapa català i entra o surt?', t: [1330, 1470], sint: 'Per cuinar, curar-se, pregar i mostrar riquesa. Barcelona les comprava a Alexandria i Beirut i les pagava amb draps de llana, corall, safrà i altres productes catalans.' },
    { n: 7, id: 'colom-gama', tit: 'Colom i Gama: dues apostes', curt: 'Colom i Gama', preg: 'Per què buscar un camí nou per mar fins a les espècies?', il: 'caravella', act: 'Rutes animades i regals', t: [1488, 1499], sint: 'Per saltar-se els intermediaris i quedar-se el guany. Portugal ho va aconseguir voltant l’Àfrica; Colom, cap a l’oest i amb una Terra massa petita al cap, va topar amb Amèrica.' },
    { n: 8, id: 'volta-mon', tit: 'La primera volta al món', curt: 'Primera volta al món', preg: 'Va valer la pena el viatge de la Victoria?', il: 'nau-victoria', act: '14 etapes i mercader a Tidore', t: [1519, 1529], sint: 'Depèn de com ho mesuris: en diners, a penes un 5 % de guany; en vides, una tragèdia (de 239 homes, en van tornar 18); en coneixement, un descobriment immens: tots els oceans estan connectats.' },
    { n: 9, id: 'avui', tit: 'Per què avui són barates', curt: 'Per què avui són barates', preg: 'Què va canviar i les podríem plantar aquí?', il: 'plantacio', act: 'Es pot plantar a Catalunya?', t: [1430, 2026], et: '1430-avui', sint: 'Les plantes es van trasplantar a moltes terres tropicals i el transport es va abaratir: ningú no en podia controlar el preu. A Catalunya no hi podem fer pebre, però sí safrà.' }
  ];
  window.CAPS = CAPS;

  const GLOSSARI = {
    'espècia': 'Part seca d’una planta (llavor, fruit, escorça, flor, arrel) que s’usa en petites quantitats per donar gust, aroma o color, o com a medicament.',
    'monsó': 'Vent de l’oceà Índic que canvia de direcció segons l’estació: a l’hivern bufa del nord-est i a l’estiu, del sud-oest.',
    'intermediari': 'Comerciant que compra a un altre per tornar a vendre. Cada intermediari afegeix el seu benefici al preu.',
    'dhow': 'Vaixell de vela de l’oceà Índic, amb les fustes cosides amb corda de fibra de coco en lloc de claus de ferro.',
    'galera': 'Vaixell llarg mogut per rems i veles. Venècia les feia servir per portar mercaderies cares amb seguretat.',
    'Moluques': 'Arxipèlag de l’actual Indonèsia, les «illes de les espècies». L’únic lloc on creixia el clau.',
    'ducat': 'Moneda d’or de Venècia, molt acceptada a tot el Mediterrani. Servia com a referència de valor.',
    'maravedí': 'Moneda de compte de Castella. Els comptes de l’expedició de Magalhães-Elcano es van fer en maravedisos.',
    'quintar': 'Mesura de pes antiga. A Castella, un quintar eren 4 arroves, uns 46 kg.',
    'bahar': 'Mesura de pes de l’Índic i de les Moluques, d’uns 185 kg de clau.',
    'escorbut': 'Malaltia per falta de vitamina C. Inflava les genives, feia caure les dents i matava molts mariners.',
    'monopoli': 'Situació en què només un venedor controla un producte i, per tant, pot fixar el preu.',
    'commenda': 'Contracte medieval: un inversor posava els diners i un mercader viatjava. Els guanys es repartien.',
    'consolat': 'Representació dels mercaders d’una ciutat en un port estranger. Barcelona en tenia a Alexandria i Damasc.',
    'caravel·la': 'Vaixell lleuger de vela, ràpid i maniobrable, amb què portuguesos i castellans van explorar l’Atlàntic.',
    'factoria': 'Establiment comercial fortificat en un port llunyà, per comprar i guardar mercaderies.',
    'Galè': 'Metge grec (segle II). La medicina basada en les seves idees classificava els aliments en calents, freds, secs i humits.',
    'càssia': 'Escorça d’un arbre de la Xina semblant a la canyella. És la «canyella» més barata que avui es ven a molts súpers.',
    'cauri': 'Petxina de cargol de mar que a l’Índic i a l’Àfrica s’usava com a moneda.',
    'aranzel': 'Impost que es paga per entrar o treure una mercaderia d’un port o d’un país.',
    'Tordesillas': 'Tractat de 1494 entre Castella i Portugal que repartia el món per explorar amb una línia de nord a sud a l’Atlàntic.',
    'antimeridià': 'L’altra meitat de la línia de Tordesillas, a l’altra banda del planeta. No se sabia on queia: per això es discutien les Moluques.',
    'trasplantament': 'Portar una planta viva a un altre lloc del món perquè hi creixi. Va acabar amb els monopolis de les espècies.',
    'tona': 'Mil quilos.',
    'samorí': 'Títol del rei de Calicut, a la costa de Malabar (Índia). Governava un dels ports més rics del comerç del pebre.',
    'mameluc': 'Soldats d’origen esclau que van governar Egipte i Síria del 1250 al 1517. Controlaven el pas de les espècies cap al Mediterrani.',
    'VOC': 'Companyia Holandesa de les Índies Orientals (1602-1799): una gran empresa comercial, amb exèrcit propi, que va imposar el monopoli de les espècies.',
    'capitulacions': 'Contracte entre els reis i un explorador: fixava l’objectiu del viatge i els guanys i càrrecs que rebria.',
    'apotecari': 'Antic farmacèutic: preparava i venia remeis, sovint fets amb espècies.',
    'adroguer': 'Botiguer que venia espècies, sucre, cera i ingredients per a remeis. D’aquí ve la paraula «drogueria».',
    'khan': 'Títol dels sobirans mongols. Kublai Khan governava la Xina quan hi va arribar Marco Polo.',
    'estigma': 'Part de la flor que rep el pol·len. Els tres estigmes vermells de la flor del safrà són l’espècia.',
    'nòlit': 'Preu que es paga per transportar mercaderies en un vaixell.'
  };
  window.GLOSSARI = GLOSSARI;

  const GLOSSARI_CAPS = {
    'espècia': [2], 'monsó': [3, 4], 'intermediari': [1, 5], 'dhow': [4],
    'galera': [5, 6], 'Moluques': [2, 8], 'ducat': [1, 8], 'maravedí': [8],
    'quintar': [8], 'bahar': [8], 'escorbut': [7, 8], 'monopoli': [9],
    'commenda': [6], 'consolat': [6], 'caravel·la': [7], 'factoria': [4],
    'Galè': [6], 'càssia': [2, 9], 'cauri': [4], 'aranzel': [4, 5],
    'Tordesillas': [7, 8], 'antimeridià': [8], 'trasplantament': [9], 'tona': [8],
    'samorí': [7], 'mameluc': [5], 'VOC': [9], 'capitulacions': [8], 'apotecari': [6],
    'adroguer': [5], 'khan': [3], 'estigma': [2], 'nòlit': [5]
  };
  window.GLOSSARI_CAPS = GLOSSARI_CAPS;

  /* Proves per al repte final. a = argument (eco: econòmic, geo: geogràfic i tècnic, hum: humà); c = capítol */
  const BANC = [
    { t: '2,25 dies de feina per una lliura de pebre (Londres, 1438)', c: 1, a: 'eco' },
    { t: 'El pebre passava de 1-2 g de plata a Malabar a 20-30 g a Europa', c: 5, a: 'eco' },
    { t: 'Cada intermediari hi sumava transport, riscos, impostos i benefici', c: 5, a: 'eco' },
    { t: 'Barcelona pagava les espècies amb draps de llana, corall i safrà', c: 6, a: 'eco' },
    { t: 'La Victoria va guanyar només un 5 %', c: 8, a: 'eco' },
    { t: 'Carles I va vendre les Moluques per 350.000 ducats (1529)', c: 8, a: 'eco' },
    { t: 'El clau només creixia a les Moluques', c: 2, a: 'geo' },
    { t: 'A Zayton (Xina) arribava cent vegades més pebre que a Alexandria', c: 3, a: 'geo' },
    { t: 'Els monsons canvien de direcció a l’hivern i a l’estiu', c: 4, a: 'geo' },
    { t: 'Colom creia que la Terra feia uns 30.000 km de volta', c: 7, a: 'geo' },
    { t: 'Gama arriba a Calicut el 1498 voltant l’Àfrica', c: 7, a: 'geo' },
    { t: 'Pierre Poivre trasplanta clau i nou moscada (1770)', c: 9, a: 'geo' },
    { t: 'Avui, el Vietnam és el primer productor de pebre', c: 9, a: 'geo' },
    { t: 'Servir plats molt especiats era una manera de mostrar riquesa', c: 6, a: 'hum' },
    { t: 'En el comerç de l’Índic també es venien persones esclavitzades', c: 4, a: 'hum' },
    { t: 'A Calicut es van riure dels regals de Gama: l’Índia era molt més rica', c: 7, a: 'hum' },
    { t: 'Van sortir 239 homes i en van tornar 18 amb la Victoria (1522)', c: 8, a: 'hum' },
    { t: 'Lapu-Lapu va derrotar Magalhães a Mactan (1521)', c: 8, a: 'hum' },
    { t: 'Conquesta holandesa de Banda (1621): la major part de la població va morir, va ser expulsada o esclavitzada', c: 9, a: 'hum' }
  ];
  window.BANC = BANC;
  const ARGS = { eco: 'Argument econòmic', geo: 'Argument geogràfic i tècnic', hum: 'Argument humà' };
  window.ARGS = ARGS;

  /* ---------- emmagatzematge segur ---------- */
  const KEY = 'especies:v1';
  const llegeix = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } };
  const desa = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) { } };
  const Prog = {
    tot: llegeix,
    vistNets() {
      const v = (llegeix().vist) || {};
      const out = {};
      for (let i = 1; i <= 9; i++) if (v[i]) out[i] = v[i];
      return out;
    },
    marcaVist(n) {
      n = parseInt(n, 10);
      if (!n || n < 1 || n > 9) return;
      const p = llegeix(); p.vist = p.vist || {};
      delete p.vist[0]; delete p.vist['0'];
      if (!p.vist[n]) { p.vist[n] = Date.now(); desa(p); }
    },
    desaQuiz(id, enc, tot) { const p = llegeix(); p.quiz = p.quiz || {}; const ant = p.quiz[id]; if (!ant || enc >= ant.enc) p.quiz[id] = { enc, tot }; desa(p); },
    set(k, v) { const p = llegeix(); p[k] = v; desa(p); },
    proves() { return llegeix().proves || {}; },
    desaProves(n) { const p = llegeix(); p.proves = p.proves || {}; p.proves[n] = Date.now(); desa(p); },
    get(k) { return llegeix()[k]; },
    esborra() { try { localStorage.removeItem(KEY); } catch (e) { } }
  };
  window.Prog = Prog;

  /* ---------- escala en pantalles d'ordinador petites (com edu-apps/Equacions) ---------- */
  const BASE_W = 1440, BASE_H = 800, MIN_ZOOM = 0.8, MIN_DESKTOP_W = 1200;
  function fitScale() {
    const w = window.innerWidth, h = window.innerHeight;
    let z = Math.min(1, w / BASE_W, h / BASE_H);
    z = Math.max(MIN_ZOOM, Math.floor(z * 20) / 20);
    if (w < MIN_DESKTOP_W) z = 1;
    document.documentElement.style.setProperty('--ui-zoom', String(z));
  }
  fitScale();
  window.addEventListener('resize', fitScale);

  const el = (tag, attrs, html) => { const e = document.createElement(tag); if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; };
  window.el = el;
  const pag = document.body.dataset.pag || '';
  const capActual = parseInt(document.body.dataset.cap || '0', 10);

  /* ---------- avís breu (toast) ---------- */
  let toastEl = null, toastT = null;
  function avisa(msg) {
    if (!toastEl) {
      toastEl = el('div', { class: 'toast', role: 'status', 'aria-live': 'polite' });
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('mostra');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('mostra'), 3200);
  }
  window.avisa = avisa;

  /* ---------- navegació ---------- */
  function construeixNav() {
    const vist = Prog.vistNets();
    const nav = el('header', { class: 'nav' });
    const caps = CAPS.map(c => `<a class="cap${c.n === capActual ? ' actual' : ''}${vist[c.n] ? ' vist' : ''}" href="${c.id}.html" data-tit="${c.n}. ${c.tit}" aria-label="Capítol ${c.n}: ${c.tit}"${c.n === capActual ? ' aria-current="page"' : ''}><span class="cap-n">${c.n}</span><span class="cap-nom">${c.curt}</span></a>`).join('');
    nav.innerHTML = `<div class="wrap nav-in">
      <a class="marca" href="index.html"><img src="favicon.svg" alt="">El comerç de les espècies</a>
      <button class="bt-menu" aria-expanded="false" aria-controls="menu-caps" aria-label="Obre el menú">☰</button>
      <nav class="nav-caps" id="menu-caps" aria-label="Capítols">${caps}
        <div class="nav-extres">
          <a class="extra${pag === 'repte' ? ' actual' : ''}" href="repte.html">Repte final</a>
          <a class="extra${pag === 'fonts' ? ' actual' : ''}" href="fonts.html">Glossari i fonts</a>
          <button class="bt-facil" type="button" aria-pressed="false" title="Mostra els resums en un llenguatge més senzill">Lectura fàcil</button>
        </div>
      </nav></div>`;
    document.body.prepend(nav);
    document.body.prepend(el('a', { class: 'skip-link', href: '#contingut' }, 'Salta al contingut'));
    const bm = nav.querySelector('.bt-menu');
    const tancaMenu = () => { nav.classList.remove('obert'); bm.setAttribute('aria-expanded', 'false'); };
    bm.addEventListener('click', (e) => { e.stopPropagation(); const o = nav.classList.toggle('obert'); bm.setAttribute('aria-expanded', String(o)); });
    document.addEventListener('click', (e) => { if (nav.classList.contains('obert') && !nav.contains(e.target)) tancaMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('obert')) tancaMenu(); });

    // Etiqueta discreta als blocs «En 30 segons» quan el mode Lectura fàcil és actiu
    document.querySelectorAll('.resum h2').forEach(h => {
      if (!h.querySelector('.facil-et')) h.insertAdjacentHTML('beforeend', '<span class="facil-et">Lectura fàcil</span>');
    });

    const bf = nav.querySelector('.bt-facil');
    const aplica = (on) => { document.body.classList.toggle('mode-facil', on); bf.setAttribute('aria-pressed', String(on)); };
    aplica(!!Prog.get('facil'));
    bf.addEventListener('click', () => {
      const on = !document.body.classList.contains('mode-facil');
      aplica(on); Prog.set('facil', on);
      const teFacilVisible = [...document.querySelectorAll('.facil')].some(x => x.offsetParent !== null);
      if (on) avisa(teFacilVisible ? 'Mode lectura fàcil activat.' : 'Lectura fàcil activada · la veuràs als resums «En 30 segons».');
      else avisa('Mode lectura fàcil desactivat.');
    });
  }

  function construeixFil() {
    const lloc = document.getElementById('fil'); if (!lloc) return;
    const vist = Prog.vistNets();
    lloc.className = 'fil wrap';
    lloc.setAttribute('aria-label', 'Recorregut dels capítols');
    lloc.innerHTML = '<ol>' + CAPS.map(c => `<li><a href="${c.id}.html" class="${c.n === capActual ? 'actual' : ''}${vist[c.n] ? ' vist' : ''}" title="${c.n}. ${c.tit}">${c.n}</a></li>`).join('') + '</ol>';
  }

  function construeixSeguent() {
    const lloc = document.getElementById('seguent'); if (!lloc) return;
    const s = CAPS[capActual]; // capActual és 1-based → el següent és l'índex capActual
    if (s) {
      lloc.innerHTML = `<a class="seguent" href="${s.id}.html"><img src="img/vinyetes/${s.il}.webp" alt=""><div><span class="et">Capítol ${s.n}</span><h3>${s.tit}</h3><p>${s.preg}</p></div><span class="fl" aria-hidden="true">→</span></a>`;
    } else {
      lloc.innerHTML = `<a class="seguent" href="repte.html"><img src="img/vinyetes/sac-clau.webp" alt=""><div><span class="et">Per acabar</span><h3>El repte final</h3><p>Ara respon tu: per què unes llavors tan petites van moure vaixells, diners i imperis?</p></div><span class="fl" aria-hidden="true">→</span></a>`;
    }
  }

  /* ---------- mini cronologia a la capçalera: on som en el temps ---------- */
  const posAny = (a) => a <= 1750 ? (a - 1250) / 500 * 84 : 84 + Math.min(1, (a - 1750) / 276) * 16;
  function construeixCronos() {
    const c = CAPS[capActual - 1]; if (!c || !c.t) return;
    const preg = document.querySelector('.cap-hero .pregunta'); if (!preg) return;
    const [a0, a1] = c.t;
    const et = c.et || (a0 === a1 ? String(a0) : `${a0}-${a1}`);
    const x0 = posAny(a0), x1 = posAny(a1);
    const marques = [1300, 1400, 1500, 1600, 1700].map(a => `<span class="cr-m" style="left:${posAny(a)}%">${a}</span>`).join('') + `<span class="cr-m" style="left:100%">avui</span>`;
    preg.insertAdjacentHTML('afterend', `<div class="cronos" role="img" aria-label="Època del capítol: ${et}">
      <div class="cr-eix">${marques}<span class="cr-tram${a0 === a1 ? ' punt' : ''}" style="left:${x0}%;width:${Math.max(0, x1 - x0)}%"></span></div>
      <span class="cr-et">${et}</span></div>`);
  }

  /* ---------- flota: vaixells que es perden al llarg d'un viatge ---------- */
  window.Flota = function (cont, noms) {
    cont.classList.add('flota');
    cont.innerHTML = noms.map(n => `<div class="nau-f"><span class="nau-ic" aria-hidden="true">${icona('vaixell')}</span><b>${n}</b><small>navega</small></div>`).join('');
    const els = [...cont.children];
    return (fats) => els.forEach((e, k) => {
      const f = fats[k] || '';
      e.classList.toggle('perduda', !!f && f !== 'arriba');
      e.classList.toggle('arribada', f === 'arriba');
      e.querySelector('small').textContent = f === 'arriba' ? 'torna a casa' : (f || 'navega');
    });
  };

  function construeixPeu() {
    const f = el('footer', { class: 'felip-app-footer' });
    f.innerHTML = `<a class="felip-license-image-link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer" aria-label="Llicència Creative Commons BY-NC-SA 4.0"><img class="felip-license-image" src="img/CC_BY-NC-SA.png" alt="Creative Commons BY-NC-SA"></a>
      <div class="felip-footer-text"><p>Web creada per <a href="https://ja.cat/felipsarroca" target="_blank" rel="noopener noreferrer">Felip Sarroca</a> amb assistència de la IA</p><p>Obra sota llicència <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a></p></div>`;
    document.body.appendChild(f);
  }

  /* ---------- visor d'infografies amb zoom i navegació ---------- */
  function lightbox() {
    // Reubica l'antic botó .lupa fora de la imatge (al peu figcaption) perquè no tapi mai el text de la infografia
    document.querySelectorAll('.infografia').forEach(fig => {
      const bt = fig.querySelector('button[data-gran]');
      const lupa = bt ? bt.querySelector('.lupa') : null;
      const cap = fig.querySelector('figcaption');
      if (bt && lupa) {
        lupa.remove();
        const bAmp = el('button', { type: 'button', class: 'bt-amplia', 'data-gran': bt.dataset.gran, 'data-png': bt.dataset.png || '' },
          `<i class="ic-l" data-icona="lupa"></i> Amplia la infografia`);
        if (bt.dataset.tit) bAmp.dataset.tit = bt.dataset.tit;
        if (cap) cap.appendChild(bAmp);
        else { const fc = el('figcaption'); fc.appendChild(bAmp); fig.appendChild(fc); }
      }
    });

    const lb = el('div', { class: 'lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Infografia ampliada' });
    lb.innerHTML = `<div class="lb-bar">
        <span class="lb-tit" id="lb-tit"></span>
        <div class="lb-ctrl">
          <button type="button" class="lb-b" id="lb-zm" aria-label="Allunya" title="Allunya">−</button>
          <span class="lb-pct" id="lb-pct">100 %</span>
          <button type="button" class="lb-b" id="lb-zp" aria-label="Apropa" title="Apropa">+</button>
          <a class="lb-b lb-dl" id="lb-dl" target="_blank" rel="noopener" title="Obre la imatge PNG a mida completa">PNG ↗</a>
          <button type="button" class="lb-b lb-tanca" id="lb-tanca" aria-label="Tanca">✕</button>
        </div>
      </div>
      <div class="lb-cos" id="lb-cos">
        <button type="button" class="lb-nav lb-prev" id="lb-prev" aria-label="Infografia anterior">‹</button>
        <div class="lb-stage" id="lb-stage"><img id="lb-img" alt=""></div>
        <button type="button" class="lb-nav lb-next" id="lb-next" aria-label="Infografia següent">›</button>
      </div>`;
    document.body.appendChild(lb);

    const img = lb.querySelector('#lb-img'), tit = lb.querySelector('#lb-tit'), dl = lb.querySelector('#lb-dl'),
      btTanca = lb.querySelector('#lb-tanca'), pct = lb.querySelector('#lb-pct'), stage = lb.querySelector('#lb-stage'),
      btPrev = lb.querySelector('#lb-prev'), btNext = lb.querySelector('#lb-next');

    const galeria = CAPS.map(c => ({
      src: `img/infografies/${c.id}.webp`,
      png: `infografies/El comerç de les espècies - (${c.n}).png`,
      tit: `Capítol ${c.n} · ${c.tit}`
    }));

    let origen = null, idx = -1, zoom = 1;
    const aplicaZoom = (z) => {
      zoom = Math.max(1, Math.min(2.4, Math.round(z * 10) / 10));
      img.style.width = zoom === 1 ? '' : (zoom * 100) + '%';
      img.classList.toggle('ampliada', zoom > 1);
      pct.textContent = Math.round(zoom * 100) + ' %';
      if (zoom === 1) { stage.scrollLeft = 0; stage.scrollTop = 0; }
    };
    const carrega = (src, png, t, alt) => {
      img.src = src; img.alt = alt || t || ''; dl.href = png || src; tit.textContent = t || '';
      aplicaZoom(1);
      const mostraNav = idx >= 0;
      btPrev.hidden = btNext.hidden = !mostraNav;
    };
    const mou = (d) => {
      if (idx < 0) return;
      idx = (idx + d + galeria.length) % galeria.length;
      const g = galeria[idx];
      carrega(g.src, g.png, g.tit, g.tit);
    };
    const tanca = () => { lb.classList.remove('obert'); aplicaZoom(1); if (origen) origen.focus(); };

    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-gran]'); if (!b) return;
      e.preventDefault();
      origen = b;
      const src = b.dataset.gran;
      idx = galeria.findIndex(g => src.endsWith(g.src));
      const g = idx >= 0 ? galeria[idx] : null;
      const alt = b.querySelector('img') ? b.querySelector('img').alt : (b.dataset.tit || (g ? g.tit : ''));
      carrega(src, b.dataset.png || (g ? g.png : src), b.dataset.tit || (g ? g.tit : ''), alt);
      lb.classList.add('obert'); btTanca.focus();
    });

    lb.querySelector('#lb-zm').onclick = () => aplicaZoom(zoom - 0.4);
    lb.querySelector('#lb-zp').onclick = () => aplicaZoom(zoom + 0.4);
    btPrev.onclick = () => mou(-1);
    btNext.onclick = () => mou(1);
    img.addEventListener('dblclick', () => aplicaZoom(zoom > 1 ? 1 : 1.8));
    btTanca.onclick = tanca;
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target === stage || e.target === lb.querySelector('#lb-cos')) tanca(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('obert')) return;
      if (e.key === 'Escape') tanca();
      else if (e.key === 'ArrowLeft') mou(-1);
      else if (e.key === 'ArrowRight') mou(1);
      else if (e.key === '+' || e.key === '=') aplicaZoom(zoom + 0.4);
      else if (e.key === '-') aplicaZoom(zoom - 0.4);
    });
  }

  /* ---------- glossari emergent ---------- */
  function glossari() {
    let pop = null, scroll0 = 0, deQui = null, tHover = null;
    const tanca = () => { if (pop) { pop.remove(); pop = null; deQui = null; } };
    const mostra = (g) => {
      const k = g.dataset.gl || g.textContent.trim();
      const def = GLOSSARI[k]; if (!def) return;
      if (deQui === g) return;
      tanca();
      deQui = g;
      pop = el('div', { class: 'gl-pop', role: 'tooltip' }, `<b>${k}</b>: ${def}`);
      document.body.appendChild(pop);
      scroll0 = window.scrollY;
      const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ui-zoom')) || 1;
      const r = g.getBoundingClientRect();
      const left = Math.min(Math.max(8, r.left / z + window.scrollX / z), document.documentElement.clientWidth / z - 316);
      pop.style.left = Math.max(8, left) + 'px';
      pop.style.top = (r.bottom / z + window.scrollY / z + 8) + 'px';
      if (pop.getBoundingClientRect().bottom > window.innerHeight - 70) pop.style.top = (r.top / z + window.scrollY / z - pop.offsetHeight - 8) + 'px';
    };
    document.addEventListener('click', (e) => {
      const g = e.target.closest('.gl');
      if (!g) { if (!e.target.closest('.gl-pop')) tanca(); return; }
      e.preventDefault();
      if (deQui === g && !g.dataset.hover) { tanca(); return; }
      delete g.dataset.hover;
      mostra(g);
    });
    if (window.matchMedia && matchMedia('(hover: hover)').matches) {
      document.addEventListener('mouseover', (e) => {
        const g = e.target.closest('.gl');
        clearTimeout(tHover);
        if (g) tHover = setTimeout(() => { g.dataset.hover = '1'; mostra(g); }, 220);
        else if (deQui && deQui.dataset.hover && !e.target.closest('.gl-pop')) tHover = setTimeout(tanca, 260);
      });
    }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') tanca(); });
    window.addEventListener('scroll', () => { if (pop && Math.abs(window.scrollY - scroll0) > 35) tanca(); }, { passive: true });
    document.querySelectorAll('.gl').forEach(g => { if (g.tagName !== 'BUTTON') { g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); g.click(); } }); } });
  }

  /* ---------- aparició suau ---------- */
  function revela() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('vist')); return; }
    const io = new IntersectionObserver((ents) => ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('vist'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
    window.addEventListener('beforeprint', () => document.querySelectorAll('.reveal').forEach(e => e.classList.add('vist')));
    const bs = document.querySelectorAll('[data-w]');
    const io2 = new IntersectionObserver((ents) => ents.forEach(en => { if (en.isIntersecting) { en.target.style.width = en.target.dataset.w; io2.unobserve(en.target); } }), { threshold: .3 });
    bs.forEach(b => io2.observe(b));
  }

  /* ---------- marcar capítol com a vist ---------- */
  function vigilaLectura() {
    if (!capActual || capActual < 1) return;
    const fi = document.getElementById('seguent') || document.querySelector('.posat');
    if (!fi || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((ents) => { if (ents.some(e => e.isIntersecting)) { Prog.marcaVist(capActual); io.disconnect(); } });
    io.observe(fi);
  }

  /* ---------- motor de preguntes «Posa-t’hi» ---------- */
  const barreja = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  window.barreja = barreja;
  function quiz(cont) {
    const id = cont.dataset.quiz; const preguntes = (window.QUIZ || {})[id]; if (!preguntes) return;
    const munta = () => {
      cont.innerHTML = '';
      const peuMarc = el('div', { class: 'q-peu' });
      const marc = el('p', { class: 'marcador mb0', 'aria-live': 'polite' });
      const btRetry = el('button', { type: 'button', class: 'bt sec2 q-retry', hidden: '' }, '<i class="ic-l" data-icona="reinicia"></i> Torna-ho a provar');
      btRetry.onclick = munta;
      peuMarc.append(marc, btRetry);

      let fetes = 0, encerts = 0;
      const actualitza = () => {
        marc.textContent = `Encerts: ${encerts} de ${preguntes.length}` + (fetes === preguntes.length ? (encerts === preguntes.length ? ' · Perfecte!' : encerts >= preguntes.length * .6 ? ' · Molt bé!' : ' · Rellegeix el capítol i torna-ho a provar.') : '');
        if (fetes === preguntes.length) {
          Prog.desaQuiz(id, encerts, preguntes.length);
          if (capActual >= 1) Prog.marcaVist(capActual);
          btRetry.hidden = false;
          tancament(cont);
        }
      };
      const boxes = [], punts = el('div', { class: 'q-punts', role: 'group', 'aria-label': 'Preguntes' });
      let cur = 0;
      const mostra = (k) => {
        cur = k;
        boxes.forEach((bx, j) => { bx.hidden = j !== k; });
        punts.querySelectorAll('button').forEach((p, j) => p.setAttribute('aria-current', j === k ? 'step' : 'false'));
      };
      const resol = (q, box, ok) => {
        fetes++; if (ok) encerts++;
        const k = boxes.indexOf(box);
        const r = box.querySelector('.retro'); r.classList.add('mostra', ok ? 'be' : 'mal');
        r.innerHTML = (ok ? '<b>Ben fet.</b> ' : '<b>No ben bé.</b> ') + (q.r || '');
        if (!ok) {
          let on = '';
          if (q.on) { const t = document.getElementById('tab-' + q.on); if (t) on = `<a class="on-es" href="#${q.on}">Repassa-ho a «${t.querySelector('.tab-n').textContent}» →</a>`; }
          else if (q.cap && CAPS[q.cap - 1]) on = `<a class="on-es" href="${CAPS[q.cap - 1].id}.html">Repassa el capítol ${q.cap}: ${CAPS[q.cap - 1].tit} →</a>`;
          if (on) r.insertAdjacentHTML('beforeend', ' ' + on);
        }
        punts.querySelectorAll('button')[k].classList.add(ok ? 'be' : 'mal');
        box.dataset.fet = '1';
        const pendent = boxes.findIndex((bx, j) => j > k && !bx.dataset.fet) >= 0 ? boxes.findIndex((bx, j) => j > k && !bx.dataset.fet) : boxes.findIndex(bx => !bx.dataset.fet && bx !== box);
        if (pendent >= 0) {
          const nx = el('button', { type: 'button', class: 'bt q-seg' }, 'Següent pregunta →');
          nx.onclick = () => { mostra(pendent); const f = boxes[pendent].querySelector('button, input, select'); if (f) f.focus({ preventScroll: true }); };
          r.appendChild(nx);
        }
        actualitza();
      };
      preguntes.forEach((q, i) => {
        const box = el('div', { class: 'preg' });
        box.appendChild(el('p', { class: 'enunciat' }, `${i + 1}. ${q.e}`));
        if (q.t === 'tria') {
          const ops = el('div', { class: 'opcions' });
          const ordre = q.fix ? q.o.map((t, k) => k) : barreja(q.o.map((t, k) => k));
          ordre.forEach(k => {
            const b = el('button', { type: 'button' }, q.o[k]);
            b.addEventListener('click', () => {
              ops.querySelectorAll('button').forEach(x => x.disabled = true);
              b.classList.add(k === q.c ? 'be' : 'mal');
              if (k !== q.c) ops.querySelectorAll('button')[ordre.indexOf(q.c)].classList.add('be');
              resol(q, box, k === q.c);
            });
            ops.appendChild(b);
          });
          box.appendChild(ops);
        } else if (q.t === 'vf') {
          const ops = el('div', { class: 'vf' });
          [['Cert', true], ['Fals', false]].forEach(([t, v]) => {
            const b = el('button', { type: 'button' }, t);
            b.addEventListener('click', () => { ops.querySelectorAll('button').forEach(x => x.disabled = true); b.classList.add(v === q.c ? 'be' : 'mal'); resol(q, box, v === q.c); });
            ops.appendChild(b);
          });
          box.appendChild(ops);
        } else if (q.t === 'ordena') {
          const ul = el('ol', { class: 'ordre' });
          let ordre = barreja(q.o.map((t, k) => k)); if (ordre.every((v, k) => v === k)) ordre.reverse();
          const pinta = () => {
            ul.innerHTML = '';
            ordre.forEach((k, pos) => {
              const li = el('li', null, `<span>${q.o[k]}</span>`);
              const up = el('button', { type: 'button', 'aria-label': 'Puja' }, '↑'), dn = el('button', { type: 'button', 'aria-label': 'Baixa' }, '↓');
              up.disabled = pos === 0; dn.disabled = pos === ordre.length - 1;
              up.onclick = () => { [ordre[pos - 1], ordre[pos]] = [ordre[pos], ordre[pos - 1]]; pinta(); ul.querySelectorAll('li')[pos - 1].querySelector('button').focus(); };
              dn.onclick = () => { [ordre[pos + 1], ordre[pos]] = [ordre[pos], ordre[pos + 1]]; pinta(); ul.querySelectorAll('li')[pos + 1].querySelectorAll('button')[1].focus(); };
              li.append(up, dn); ul.appendChild(li);
            });
          };
          pinta(); box.appendChild(ul);
          const ok = el('button', { type: 'button', class: 'bt sec2 mt1' }, 'Comprova l’ordre');
          ok.onclick = () => { const be = ordre.every((v, k) => v === k); ok.disabled = true; ul.querySelectorAll('button').forEach(x => x.disabled = true); if (!be) ul.insertAdjacentHTML('afterend', '<p class="instr mt1">Ordre correcte: ' + q.o.join(' → ') + '</p>'); resol(q, box, be); };
          box.appendChild(ok);
        } else if (q.t === 'aparella') {
          const wrap = el('div', { class: 'aparella' });
          const dretes = barreja(q.p.map(x => x[1]));
          const sels = q.p.map(([a, b]) => {
            const lab = el('label', null, `<span>${a}</span>`);
            const s = el('select', null, '<option value="">Tria…</option>' + dretes.map(d => `<option>${d}</option>`).join(''));
            lab.appendChild(s); wrap.appendChild(lab); return [s, b];
          });
          box.appendChild(wrap);
          const ok = el('button', { type: 'button', class: 'bt sec2 mt1' }, 'Comprova');
          ok.onclick = () => {
            if (sels.some(([s]) => !s.value)) { ok.textContent = 'Completa totes les parelles'; return; }
            let tots = true; sels.forEach(([s, b]) => { const be = s.value === b; s.classList.add(be ? 'be' : 'mal'); if (!be) { tots = false; s.insertAdjacentHTML('afterend', `<small>→ ${b}</small>`); } s.disabled = true; });
            ok.disabled = true; ok.textContent = 'Comprovat'; resol(q, box, tots);
          };
          box.appendChild(ok);
        } else if (q.t === 'xifra') {
          const w = el('div', { class: 'num' });
          const inp = el('input', { type: 'number', step: 'any', 'aria-label': 'Resposta' });
          const ok = el('button', { type: 'button', class: 'bt sec2' }, 'Comprova');
          w.append(inp, el('span', null, q.u || ''), ok); box.appendChild(w);
          ok.onclick = () => { const v = parseFloat(String(inp.value).replace(',', '.')); if (isNaN(v)) { inp.focus(); return; } const be = Math.abs(v - q.c) <= (q.tol || 0); inp.disabled = ok.disabled = true; resol(q, box, be); };
          inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') ok.click(); });
        }
        box.appendChild(el('div', { class: 'retro', 'aria-live': 'polite' }));
        boxes.push(box);
      });
      preguntes.forEach((q, i) => { const p = el('button', { type: 'button', 'aria-label': 'Pregunta ' + (i + 1) }, String(i + 1)); p.onclick = () => mostra(i); punts.appendChild(p); });
      cont.appendChild(punts); boxes.forEach(bx => cont.appendChild(bx)); mostra(0);
      cont.appendChild(peuMarc); actualitza();
      const ant = (Prog.tot().quiz || {})[id];
      if (ant) { cont.insertAdjacentHTML('afterbegin', `<p class="instr">La millor puntuació que hi has fet: ${ant.enc} de ${ant.tot}.</p>`); tancament(cont); }
    };
    munta();
  }

  /* Tancament del capítol: la pregunta ja es pot respondre i les proves passen al repte final */
  function tancament(cont) {
    const c = CAPS[capActual - 1];
    if (!c || cont.querySelector('.tancament')) return;
    const proves = BANC.filter(b => b.c === c.n);
    const guardades = () => !!Prog.proves()[c.n];
    const box = el('div', { class: 'tancament' });
    box.innerHTML = `<div class="tc-resp"><p class="etiq">Ara ja pots respondre</p><p class="tc-preg">${c.preg}</p><p class="mb0">${c.sint}</p></div>
      <div class="tc-proves"><p class="etiq">Proves per al repte final</p><ul>${proves.map(p => `<li class="arg-${p.a}"><span>${ARGS[p.a].replace('Argument ', '')}</span>${p.t}</li>`).join('')}</ul>
      <button type="button" class="bt sec2 tc-bt"></button></div>`;
    const bt = box.querySelector('.tc-bt');
    const pinta = () => {
      const g = guardades();
      bt.innerHTML = g ? `${icona('ok')} Guardades al repte final` : `${icona('caixa')} Guarda-les al teu repte`;
      bt.classList.toggle('fet', g);
    };
    bt.onclick = () => {
      if (guardades()) { location.href = 'repte.html#p2'; return; }
      Prog.desaProves(c.n); pinta();
      avisa('Proves guardades! Les trobaràs destacades al repte final.');
    };
    pinta();
    cont.appendChild(box);
  }

  /* ---------- icones de línia (més elegants que els emojis) ---------- */
  const ICONES = {
    creu: '<circle cx="12" cy="12" r="8.5"/><path d="m9 9 6 6M15 9l-6 6"/>',
    interrogant: '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6"/><circle cx="12" cy="16.7" r=".7" fill="currentColor"/>',
    test: '<path d="M6 13h12l-1.5 7.5h-9Z"/><path d="M12 13V8.5"/><path d="M12 9c0-2.5 1.6-4.5 4.5-4.5 0 2.8-1.6 4.5-4.5 4.5Z"/><path d="M12 10.5c0-2-1.3-3.5-3.8-3.5 0 2.3 1.4 3.5 3.8 3.5Z"/>',
    ok: '<circle cx="12" cy="12" r="8.5"/><path d="m8 12.2 2.7 2.7 5.5-5.6"/>',
    regal: '<rect x="4" y="9" width="16" height="11.5" rx="1.5"/><path d="M3 9h18M12 9v11.5"/><path d="M12 9c-3 0-4.5-1.2-4.5-2.7S9.6 4 12 9Zm0 0c3 0 4.5-1.2 4.5-2.7S14.4 4 12 9Z"/>',
    morter: '<path d="M4 11h16a8 8 0 0 1-16 0Z"/><path d="M8.5 20h7"/><path d="m13.5 11 5-7"/>',
    encens: '<path d="M12 3.5c3 3.2 5 5.8 5 9a5 5 0 0 1-10 0c0-1.9.8-3.4 2-4.6.2 1.6 1 2.6 2 3.1 0-2.6.4-5 1-7.5Z"/>',
    corona: '<path d="M4.5 17 3 7.5l5 4 4-6 4 6 5-4-1.5 9.5Z"/><path d="M4.5 20.5h15"/>',
    llavor: '<path d="M12 3.5c4 0 7 3.8 7 8.3s-3 8.7-7 8.7-7-4.2-7-8.7 3-8.3 7-8.3Z"/><path d="M12 3.5c-1.6 3-1.6 14 0 17"/>',
    calculadora: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8 7h8v3.5H8Z"/><path d="M8.5 14h.01M12 14h.01M15.5 14h.01M8.5 17.5h.01M12 17.5h.01M15.5 17.5h.01" stroke-width="2.4"/>',
    baixa: '<path d="M4 4v16h16"/><path d="m7.5 8 4 4.5 3-2.5 5 6"/>',
    bandera: '<path d="M5.5 21V3.5"/><path d="M5.5 4.5h13l-2.5 4 2.5 4h-13"/>',
    onada: '<path d="M3 8c1.5 0 1.5-1.5 3-1.5S7.5 8 9 8s1.5-1.5 3-1.5S13.5 8 15 8s1.5-1.5 3-1.5S19.5 8 21 8"/><path d="M3 13c1.5 0 1.5-1.5 3-1.5S7.5 13 9 13s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/><path d="M3 18c1.5 0 1.5-1.5 3-1.5S7.5 18 9 18s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
    duana: '<path d="M3.5 9 12 4l8.5 5Z"/><path d="M6 9v8M10 9v8M14 9v8M18 9v8"/><path d="M4.5 17h15M3.5 20h17"/>',
    caixa: '<rect x="3.5" y="8" width="17" height="11.5" rx="1.5"/><path d="M9 8V5.5h6V8"/><path d="M3.5 13h17M10.5 13v2h3v-2"/>',
    copia: '<rect x="8" y="8" width="12" height="12.5" rx="2"/><path d="M16 8V5.5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h2"/>',
    glossari: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5Z"/><path d="M12 6.5v13"/><path d="M6 9h3.5M6 12h3.5M14.5 9H18M14.5 12H18"/>',
    fonts: '<path d="M4 5.5h4v14H4zM8 5.5h4v14H8z"/><path d="m13.2 6.6 3.8-1 3.6 13.6-3.8 1z"/><path d="M4 9h4M8 9h4M4 16h4M8 16h4"/>',
    descarregues: '<path d="M12 4v10.5"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4.5 15.5v2.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2.5"/>',
    professorat: '<path d="M12 5 2.5 9.5 12 14l9.5-4.5Z"/><path d="M6.5 11.5v4c1.5 1.6 3.4 2.3 5.5 2.3s4-.7 5.5-2.3v-4"/><path d="M21.5 9.5v5"/>',
    comenca: '<path d="M13 3 5 13.5h6L10 21l8-10.5h-6Z"/>',
    escriu: '<path d="M4 20h4L19 9l-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/>',
    monedes: '<ellipse cx="10" cy="6.5" rx="6" ry="2.5"/><path d="M4 6.5v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4"/><path d="M8 15.3v2.2c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4c0-1.2-1.8-2.1-4.3-2.4"/>',
    ancora: '<circle cx="12" cy="5" r="2"/><path d="M12 7v13M8 10.5h8"/><path d="M4.5 13.5a7.5 7.5 0 0 0 15 0"/>',
    pergami: '<path d="M8 4h10a2 2 0 0 1 2 2v1.5h-4"/><path d="M16 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5h10V18"/><path d="M8 4a2 2 0 0 0-2 2v10.5"/><path d="M9.5 9.5h3.5M9.5 13h3.5"/>',
    globus: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5S9.5 5.8 12 3.5Z"/>',
    idea: '<path d="M9.5 17.5h5M10.5 20.5h3"/><path d="M12 3.5a5.5 5.5 0 0 0-3.2 10c.7.5 1.2 1.3 1.2 2.1v1.9h4v-1.9c0-.8.5-1.6 1.2-2.1A5.5 5.5 0 0 0 12 3.5Z"/>',
    temps: '<path d="M6.5 3.5h11M6.5 20.5h11"/><path d="M8 3.5c0 4.5 4 5 4 8.5s-4 4-4 8.5M16 3.5c0 4.5-4 5-4 8.5s4 4 4 8.5"/>',
    balanca: '<path d="M12 4v16M8.5 20h7M5 7h14"/><path d="m5 7-2.5 6a2.5 2.5 0 0 0 5 0Z"/><path d="m19 7-2.5 6a2.5 2.5 0 0 0 5 0Z"/>',
    dau: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="8.8" cy="8.8" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="15.2" cy="15.2" r="1" fill="currentColor"/>',
    mapa: '<path d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5Z"/><path d="M9 4.5v13M15 6.5v13"/>',
    vaixell: '<path d="M12 3v13"/><path d="M12 4.5 18 14h-6"/><path d="M10.5 7 6.5 14h4"/><path d="M3.5 17h17l-2.2 3.5H5.7Z"/>',
    bruixola: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
    grafic: '<path d="M4 4v16h16"/><path d="m7.5 15 4-4.5 3 2.5 5-6"/>',
    vent: '<path d="M3.5 9h11a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3.5 13h15a2.5 2.5 0 1 1-2.5 2.5"/><path d="M3.5 17h6"/>',
    fardell: '<path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4Z"/><path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9"/>',
    planta: '<path d="M12 20.5V12"/><path d="M12 12c0-4 2.5-6.5 7-6.5 0 4.5-2.5 6.5-7 6.5Z"/><path d="M12 14.5c0-3-2-5-6-5 0 3.5 2 5 6 5Z"/><path d="M8 20.5h8"/>',
    cadena: '<path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1"/><path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1"/>',
    lupa: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/>',
    fitxes: '<rect x="4" y="7" width="11" height="13.5" rx="2"/><path d="M8 7V5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2h-3"/>',
    barres: '<path d="M3.5 20.5h17"/><path d="M6.5 20.5v-6M10.5 20.5V8.5M14.5 20.5v-9M18.5 20.5V5"/>',
    olla: '<path d="M3.5 11h17"/><path d="M5 11v2.5a7 7 0 0 0 14 0V11"/><path d="M9.5 8c0-1.2 1-1.6 1-2.8M13.5 8c0-1.2 1-1.6 1-2.8"/>',
    etiqueta: '<path d="M3.5 12V4.5a1 1 0 0 1 1-1H12l8.5 8.5-8.5 8.5Z"/><circle cx="8" cy="8" r="1.4"/>',
    repas: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.3 1.3L7.5 4.5M3.5 12l1.3 1.3 2.7-2.8M3.5 18l1.3 1.3 2.7-2.8"/>',
    regle: '<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10.5 8v4.5M14.5 8v3M18.5 8v4.5"/>',
    play: '<polygon points="7,5 19,12 7,19" fill="currentColor" stroke="none"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/>',
    reinicia: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9"/><path d="M4.5 4.5V9H9"/>',
    imprimeix: '<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7Z"/>',
    ull: '<path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/>'
  };
  const icona = (k) => ICONES[k] ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONES[k]}</svg>` : (k || '');
  const omple = (arrel) => (arrel.querySelectorAll ? arrel : document).querySelectorAll('[data-icona]:empty').forEach(e => { e.innerHTML = icona(e.dataset.icona); e.setAttribute('aria-hidden', 'true'); });
  omple(document);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType !== 1) return; if (n.matches('[data-icona]:empty')) n.innerHTML = icona(n.dataset.icona); omple(n); }))).observe(document.documentElement, { childList: true, subtree: true });
  window.icona = icona;

  /* ---------- pestanyes: cada capítol es llegeix per etapes, sense un desplaçament infinit ---------- */
  function pestanyes() {
    const main = document.querySelector('main');
    const secs = [...main.querySelectorAll(':scope > [data-tab]')];
    if (secs.length < 2) return;
    const noms = [], grups = {}, icones = {};
    secs.forEach(s => { const n = s.dataset.tab; if (!grups[n]) { grups[n] = []; noms.push(n); icones[n] = s.dataset.ic || ''; } grups[n].push(s); });
    const bar = el('div', { class: 'tabs' });
    const fila = el('div', { class: 'tabs-fila wrap' });
    const llista = el('div', { class: 'tabs-in', role: 'tablist', 'aria-label': 'Parts d’aquesta pàgina' });
    fila.appendChild(llista); bar.appendChild(fila);
    const zona = el('div', { class: 'tabs-zona' });
    secs[0].before(bar); bar.after(zona);
    const bts = [], pans = [];
    noms.forEach((n, i) => {
      const id = 'p' + (i + 1);
      const b = el('button', { type: 'button', role: 'tab', id: 'tab-' + id, 'aria-controls': id, 'aria-selected': 'false', tabindex: '-1' },
        `<span class="tab-ic${ICONES[icones[n]] ? ' svg' : ''}" aria-hidden="true">${icona(icones[n])}</span><span class="tab-n">${n}</span>`);
      llista.appendChild(b); bts.push(b);
      const pan = el('div', { class: 'tab-panel wrap' + (grups[n].some(s => s.hasAttribute('data-duo')) ? ' duo' : ''), role: 'tabpanel', id, 'aria-labelledby': 'tab-' + id, hidden: '' });
      grups[n].forEach(s => { s.classList.remove('wrap'); pan.appendChild(s); });
      // Numeració correlativa dins de cada pestanya
      pan.querySelectorAll('.sec-tit > .n').forEach((x, k) => { x.textContent = k + 1; });
      const peu = el('div', { class: 'tab-peu' });
      if (i > 0) { const a = el('button', { type: 'button', class: 'bt sec2' }, `← ${noms[i - 1]}`); a.onclick = () => activa(i - 1, true); peu.appendChild(a); } else peu.appendChild(el('span'));
      peu.appendChild(el('span', { class: 'tab-compte' }, `${i + 1} de ${noms.length}`));
      if (i < noms.length - 1) { const s = el('button', { type: 'button', class: 'bt' }, `${noms[i + 1]} →`); s.onclick = () => activa(i + 1, true); peu.appendChild(s); } else peu.appendChild(el('span'));
      pan.appendChild(peu);
      zona.appendChild(pan); pans.push(pan);
    });
    if (capActual >= 1) {
      const bImp = el('button', { type: 'button', class: 'tab-imp', title: 'Imprimeix tot el capítol (totes les pestanyes)', 'aria-label': 'Imprimeix tot el capítol' }, `${icona('imprimeix')}<span>Imprimeix</span>`);
      bImp.onclick = () => window.print();
      fila.appendChild(bImp);
    }
    const marcaDesplaça = () => {
      bar.classList.toggle('mes-dreta', llista.scrollLeft + llista.clientWidth < llista.scrollWidth - 4);
      bar.classList.toggle('mes-esq', llista.scrollLeft > 4);
    };
    llista.addEventListener('scroll', marcaDesplaça, { passive: true });
    window.addEventListener('resize', marcaDesplaça);
    const centraTab = (i, suau) => {
      const b = bts[i];
      llista.scrollTo({ left: Math.max(0, b.offsetLeft - (llista.clientWidth - b.offsetWidth) / 2), behavior: suau ? 'smooth' : 'auto' });
      setTimeout(marcaDesplaça, suau ? 400 : 0);
    };
    const clau = 'especies:tabs:' + location.pathname.split('/').pop();
    let vistes = {}; try { vistes = JSON.parse(sessionStorage.getItem(clau) || '{}'); } catch (e) { }
    let actual = -1;
    function activa(i, desplaça, senseHash) {
      if (i === actual) return;
      actual = i;
      bts.forEach((b, k) => { const on = k === i; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; b.classList.toggle('vista', !!vistes[k] && !on); });
      pans.forEach((p, k) => { p.hidden = k !== i; });
      vistes[i] = 1; try { sessionStorage.setItem(clau, JSON.stringify(vistes)); } catch (e) { }
      pans[i].querySelectorAll('.reveal').forEach(r => r.classList.add('vist'));
      pans[i].querySelectorAll('[data-w]').forEach(b => { b.style.width = '0'; requestAnimationFrame(() => requestAnimationFrame(() => { b.style.width = b.dataset.w; })); });
      // En carregar la pàgina no s'escriu el # a l'adreça: si no, el navegador hi salta i amaga la capçalera
      if (!senseHash) history.replaceState(null, '', '#' + pans[i].id);
      centraTab(i, !senseHash);
      if (desplaça) {
        const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ui-zoom')) || 1;
        const top = bar.getBoundingClientRect().top / z;
        const nav = document.querySelector('.nav'); const h = nav ? nav.offsetHeight : 0;
        if (top < h + 2 || top > window.innerHeight / z * .6) window.scrollTo({ top: Math.max(0, window.scrollY / z + top - h) * z, behavior: 'smooth' });
      }
      if (i === pans.length - 1 && capActual >= 1) Prog.marcaVist(capActual);
      window.dispatchEvent(new CustomEvent('especies:tab', { detail: { index: i, id: pans[i].id } }));
    }
    bts.forEach((b, i) => {
      b.addEventListener('click', () => activa(i, true));
      b.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (e.key === 'Home' || e.key === 'End' || d) { e.preventDefault(); const k = e.key === 'Home' ? 0 : e.key === 'End' ? bts.length - 1 : (i + d + bts.length) % bts.length; activa(k, false); bts[k].focus(); }
      });
    });
    // enllaços interns (#glossari, #descarregues…) i adreces amb #p3
    const desDe = (hash) => {
      if (!hash || hash.length < 2) return -1;
      let t = null; try { t = document.querySelector(hash); } catch (e) { }
      if (!t) return -1;
      return pans.findIndex(p => p === t || p.contains(t));
    };
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      const k = desDe(a.getAttribute('href')); if (k < 0) return;
      e.preventDefault(); activa(k, true);
    });
    const ini = desDe(location.hash);
    activa(ini >= 0 ? ini : 0, false, true);
    window.activaPestanya = (id) => { const k = pans.findIndex(p => p.id === id); if (k >= 0) activa(k, true); };
    document.body.classList.add('amb-tabs');
  }

  document.addEventListener('DOMContentLoaded', () => {
    pestanyes();
    construeixNav(); construeixFil(); construeixCronos(); construeixSeguent(); construeixPeu();
    lightbox(); glossari(); revela(); vigilaLectura();
    document.querySelectorAll('[data-quiz]').forEach(quiz);
  });
})();
