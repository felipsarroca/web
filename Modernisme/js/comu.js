/* =========================================================
   El Modernisme · funcions comunes de totes les pàgines
   - Menú i peus compartits
   - Adaptació a l'espai útil de la pantalla
   - Visor d'imatges amb zoom sense pixelació
   - Glossari emergent i lectura fàcil
   ========================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const IMATGES = window.IMATGES || {};
  const GLOSSARI = window.GLOSSARI || {};

  /* ---------- Icones (SVG en línia) ---------- */
  const ICONES = {
    flor: '<svg class="logo-lliri" viewBox="0 0 80 80" aria-hidden="true"><rect width="80" height="80" rx="18" fill="#5c4a3d"/><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 74V38C16 18 27 8 40 8s24 10 24 30v36z" stroke="#e2c77f" stroke-width="3.4" fill="#6b5747"/><path d="M40 70c0-9-9-12-9-21s12-8 10-17" stroke="#f6ead0" stroke-width="3.2"/><path d="M31 49c-7-3-8-11-3-14 3-2 6 2 3 3" stroke="#f6ead0" stroke-width="2.6"/><path d="M37 62c-9-2-14-8-15-15 8 2 13 7 15 15z" fill="#9cb98a" stroke="#f6ead0" stroke-width="1.8"/><path d="M41 33c-3-7-3-15 0-21 3 6 3 14 0 21z" fill="#e8b4b8" stroke="#f6ead0" stroke-width="1.8"/><path d="M41 33c-7-2-12-7-14-13 7 0 12 5 14 13z" fill="#e8b4b8" stroke="#f6ead0" stroke-width="1.8"/><path d="M41 33c7-2 12-7 14-13-7 0-12 5-14 13z" fill="#e8b4b8" stroke="#f6ead0" stroke-width="1.8"/></g></svg>',
    lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6"/></svg>',
    mes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    menys: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    ajusta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    real: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9v6M14 9v6M12 10.5v0M12 13.5v0"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    tanca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    esq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    dre: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    amunt: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>',
    avall: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    llegir: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3zM21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z"/></svg>'
  };
  const ORNAMENT = '<svg class="ornament" viewBox="0 0 260 26" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 13c30 0 40-10 62-10 18 0 22 10 36 10M256 13c-30 0-40-10-62-10-18 0-22 10-36 10"/><path d="M40 13c18 0 28 9 46 9 12 0 16-6 30-9M220 13c-18 0-28 9-46 9-12 0-16-6-30-9" opacity=".6"/><circle cx="130" cy="13" r="5" fill="currentColor"/><path d="M118 13c4-6 8-8 12-8s8 2 12 8c-4 6-8 8-12 8s-8-2-12-8z"/></g></svg>';

  /* ---------- Rutes d'imatges ---------- */
  function rutaImatge(id, mida) { return 'img/' + (mida || 'mini') + '/' + id + '.webp'; }
  function midaMaxima(id) {
    const m = (IMATGES[id] || {}).mides || {};
    return m.gran ? 'gran' : 'mitjana';
  }

  /* ---------- Estructura del menú ---------- */
  const MENU = [
    { text: 'Inici', href: 'index.html' },
    { text: 'Context', fills: [
      { text: 'Què és el Modernisme?', sub: 'Idees clau i característiques', href: 'que-es.html' },
      { text: 'Catalunya', sub: 'Per què aquí i per què llavors', href: 'catalunya.html' },
      { text: 'Dues ciutats', sub: 'Burgesos i obrers, cases i fàbriques', href: 'ciutats.html' },
      { text: 'Al món', sub: 'Art Nouveau, Secessió, Jugendstil…', href: 'mon.html' },
      { text: 'Línia del temps', sub: 'De 1859 a 1926', href: 'temps.html' },
      { text: 'El llegat avui', sub: 'Abans i ara, patrimoni i debats', href: 'llegat.html' }
    ] },
    { text: 'Arts', fills: [
      { text: 'Arquitectura', sub: 'Formes, materials i tècniques', href: 'arquitectura.html' },
      { text: 'Pintura, escultura i música', sub: 'L\'art total', href: 'arts.html' },
      { text: 'Cartellisme', sub: 'L\'art surt al carrer', href: 'cartellisme.html' },
      { text: 'Oficis i materials', sub: 'Les mans de l\'art total', href: 'oficis.html' },
      { text: 'Objectes quotidians', sub: 'L\'art a casa i al carrer', href: 'objectes.html' }
    ] },
    { text: 'Protagonistes', fills: [
      { text: 'Autors i autores', sub: 'Arquitectes, artistes i escriptors', href: 'autors.html' },
      { text: 'Els grans arquitectes', sub: 'Vida i obres, de la primera a l\'última', href: 'arquitectes.html' },
      { text: 'Obres', sub: 'Galeria amb fitxa de cada obra', href: 'obres.html' }
    ] },
    { text: 'Explora', fills: [
      { text: 'Mapa', sub: 'Barcelona, Terrassa i més enllà', href: 'mapa.html' },
      { text: 'Terrassa modernista', sub: 'Itinerari a peu', href: 'terrassa.html' },
      { text: 'Glossari', sub: 'Paraules clau', href: 'glossari.html' },
      { text: 'Repte final', sub: 'Posa a prova el que saps', href: 'repte.html' },
      { text: 'Dossier imprimible', sub: 'Totes les activitats en paper', href: 'dossier.html' },
      { text: 'El meu progrés', sub: 'Resultats, autoavaluació i resum', href: 'progres.html' }
    ] }
  ];

  const paginaActual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function construeixNav() {
    const nav = document.querySelector('.nav-principal');
    if (!nav) return;
    let html = '<div class="nav-container">' +
      '<a href="index.html" class="nav-logo">' + ICONES.flor + 'El Modernisme</a>' +
      '<ul class="nav-menu" id="navMenu">';
    MENU.forEach((item, i) => {
      if (!item.fills) {
        const actiu = item.href === paginaActual;
        html += '<li><a class="nav-enllac' + (actiu ? ' actiu' : '') + '" href="' + item.href + '"' + (actiu ? ' aria-current="page"' : '') + '>' + item.text + '</a></li>';
        return;
      }
      const conteActual = item.fills.some(f => f.href === paginaActual);
      html += '<li><button type="button" class="nav-grup-boto' + (conteActual ? ' actiu' : '') + '" aria-expanded="false" aria-controls="sub' + i + '">' + item.text + '</button>' +
        '<ul class="nav-submenu" id="sub' + i + '">' +
        item.fills.map(f => '<li><a href="' + f.href + '"' + (f.href === paginaActual ? ' aria-current="page"' : '') + '>' + f.text + '<small>' + f.sub + '</small></a></li>').join('') +
        '</ul></li>';
    });
    html += '</ul><div class="nav-eines">' +
      '<button type="button" class="boto-tema" aria-pressed="false" aria-label="Mode fosc" title="Canvia entre el mode clar i el fosc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg></button>' +
      '<button type="button" class="boto-lectura" aria-pressed="false" title="Mostra els textos principals en lectura fàcil">' + ICONES.llegir + '<span class="text-boto">Lectura fàcil</span></button>' +
      '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="navMenu" aria-label="Obre el menú"><span></span><span></span><span></span></button>' +
      '</div></div>';
    nav.innerHTML = html;
    nav.setAttribute('aria-label', 'Menú principal');

    const toggle = nav.querySelector('.menu-toggle');
    const menu = nav.querySelector('.nav-menu');
    const grups = nav.querySelectorAll('.nav-grup-boto');

    function tancaGrups(excepte) {
      grups.forEach(b => {
        if (b === excepte) return;
        b.setAttribute('aria-expanded', 'false');
        document.getElementById(b.getAttribute('aria-controls')).classList.remove('obert');
      });
    }
    grups.forEach(b => {
      b.addEventListener('click', e => {
        e.stopPropagation();
        const obert = b.getAttribute('aria-expanded') === 'true';
        tancaGrups(b);
        b.setAttribute('aria-expanded', String(!obert));
        document.getElementById(b.getAttribute('aria-controls')).classList.toggle('obert', !obert);
      });
    });
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const obert = menu.classList.toggle('obert');
      toggle.setAttribute('aria-expanded', String(obert));
      toggle.setAttribute('aria-label', obert ? 'Tanca el menú' : 'Obre el menú');
      if (obert) {
        // En mòbil, desplega el grup de la pàgina actual
        const actiu = nav.querySelector('.nav-grup-boto.actiu');
        if (actiu && actiu.getAttribute('aria-expanded') !== 'true') actiu.click();
      }
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        tancaGrups();
        menu.classList.remove('obert');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const obert = nav.querySelector('.nav-grup-boto[aria-expanded="true"]');
      if (obert) { tancaGrups(); obert.focus(); }
      if (menu.classList.contains('obert')) { menu.classList.remove('obert'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    });

    // Mode fosc
    const botoTema = nav.querySelector('.boto-tema');
    const posaTema = fosc => {
      if (fosc) document.documentElement.dataset.tema = 'fosc'; else delete document.documentElement.dataset.tema;
      botoTema.setAttribute('aria-pressed', String(fosc));
    };
    let temaFosc = false;
    try { temaFosc = localStorage.getItem('modernisme:tema') === 'fosc'; } catch (e) { /* sense emmagatzematge */ }
    posaTema(temaFosc);
    botoTema.addEventListener('click', () => {
      temaFosc = !temaFosc;
      posaTema(temaFosc);
      try { localStorage.setItem('modernisme:tema', temaFosc ? 'fosc' : 'clar'); } catch (e) { /* res */ }
    });

    // Lectura fàcil
    const botoLectura = nav.querySelector('.boto-lectura');
    if (!document.querySelector('.text-facil')) {
      botoLectura.hidden = true;
    } else {
      let actiu = false;
      try { actiu = localStorage.getItem('modernisme:lectura-facil') === '1'; } catch (e) { /* sense emmagatzematge */ }
      const aplica = v => {
        document.documentElement.classList.toggle('lectura-facil', v);
        botoLectura.setAttribute('aria-pressed', String(v));
      };
      aplica(actiu);
      botoLectura.addEventListener('click', () => {
        actiu = !actiu;
        aplica(actiu);
        try { localStorage.setItem('modernisme:lectura-facil', actiu ? '1' : '0'); } catch (e) { /* res */ }
      });
    }
  }

  function construeixPeus() {
    if (!document.querySelector('.footer') && !document.body.dataset.sensePeu) {
      const f = document.createElement('footer');
      f.className = 'footer';
      f.innerHTML = '<div class="footer-interior">' +
        '<div><h2>El Modernisme</h2><p>Recurs educatiu de l\'Escola Ramon Pont (Terrassa) per descobrir el moviment artístic que va transformar Catalunya i Europa entre 1888 i 1911.</p></div>' +
        MENU.filter(m => m.fills).slice(0, 3).map(m => '<div><h3>' + m.text + '</h3><ul>' + m.fills.map(f => '<li><a href="' + f.href + '">' + f.text + '</a></li>').join('') + '</ul></div>').join('') +
        '</div>' +
        '<div class="footer-interior" style="margin-top:1.4rem;padding-top:1.2rem;border-top:1px solid rgba(255,255,255,.12);display:flex;flex-wrap:wrap;gap:.4rem 1.4rem;font-size:.9rem">' +
        MENU[4].fills.map(f => '<a href="' + f.href + '">' + f.text + '</a>').join('') +
        '<a href="credits.html">Fonts i crèdits de les imatges</a></div>';
      document.body.appendChild(f);
    }
    if (!document.querySelector('.felip-app-footer')) {
      const p = document.createElement('footer');
      p.className = 'felip-app-footer';
      p.innerHTML = '<a class="felip-license-image-link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer" aria-label="Llicència Creative Commons BY-NC-SA 4.0">' +
        '<img class="felip-license-image" src="assets/CC_BY-NC-SA.png" alt="Creative Commons BY-NC-SA" width="88" height="31"></a>' +
        '<div class="felip-footer-text"><p>Aplicació creada per <a href="https://ja.cat/felipsarroca" target="_blank" rel="noopener noreferrer">Felip Sarroca</a> amb assistència de la IA</p>' +
        '<p>Obra sota llicència <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a></p></div>';
      document.body.appendChild(p);
    }
  }

  /* ---------- Adaptació a l'espai útil (com a edu-apps/Equacions) ----------
     El disseny de referència és una finestra útil de 1440 × 820 px.
     En portàtils més petits (p. ex. 1366 × 768, o amb escalat del 125 %)
     tota la interfície es redueix uniformement, sense baixar del 80 %.
     En tauletes i mòbils (< 1100 px) no s'escala: hi ha disseny responsiu. */
  const BASE_W = 1440, BASE_H = 820, MIN_ZOOM = 0.8, MIN_ESCRIPTORI = 1100;
  function ajustaEscala() {
    const w = window.innerWidth, h = window.innerHeight;
    let z = Math.min(1, w / BASE_W, h / BASE_H);
    z = Math.max(MIN_ZOOM, Math.floor(z * 20) / 20);
    if (w < MIN_ESCRIPTORI) z = 1;
    document.documentElement.style.setProperty('--ui-zoom', String(z));
  }

  /* ---------- Visor d'imatges ---------- */
  const Visor = (function () {
    let dlg, escenari, img, info, nivell, carrega, ajuda, botoAnt, botoSeg;
    let items = [], idx = 0;
    let W = 1, H = 1;              // mida real (px) de la versió més gran disponible
    let s = 1, tx = 0, ty = 0;     // escala i desplaçament
    let sAjust = 1, sMax = 1;
    let carregadaGran = false, idActual = null;
    const punters = new Map();
    let pessic = null, arrossega = null;

    function crea() {
      dlg = document.createElement('dialog');
      dlg.className = 'visor';
      dlg.setAttribute('aria-label', 'Visor d\'imatges');
      dlg.innerHTML =
        '<div class="visor-cos">' +
          '<div class="visor-escenari">' +
            '<img class="visor-imatge" alt="" draggable="false">' +
            '<div class="visor-carrega" aria-live="polite">Carregant alta resolució…</div>' +
            '<div class="visor-ajuda">Roda del ratolí o pessic per ampliar · arrossega per moure\'t · doble clic per a la mida real</div>' +
            '<button type="button" class="visor-nav anterior" aria-label="Imatge anterior">' + ICONES.esq + '</button>' +
            '<button type="button" class="visor-nav seguent" aria-label="Imatge següent">' + ICONES.dre + '</button>' +
            '<div class="visor-barra" role="toolbar" aria-label="Controls del zoom">' +
              '<button type="button" data-acc="menys" aria-label="Redueix">' + ICONES.menys + '</button>' +
              '<span class="nivell" aria-live="polite"></span>' +
              '<button type="button" data-acc="mes" aria-label="Amplia">' + ICONES.mes + '</button>' +
              '<button type="button" data-acc="ajusta" aria-label="Ajusta a la pantalla" title="Ajusta a la pantalla">' + ICONES.ajusta + '</button>' +
              '<button type="button" data-acc="real" aria-label="Mida real" title="Mida real (màxim detall)">' + ICONES.real + '</button>' +
              '<button type="button" data-acc="info" aria-label="Mostra o amaga la fitxa" title="Fitxa de l\'obra">' + ICONES.info + '</button>' +
            '</div>' +
          '</div>' +
          '<aside class="visor-info"></aside>' +
        '</div>' +
        '<button type="button" class="visor-tancar" aria-label="Tanca el visor">' + ICONES.tanca + '</button>';
      document.body.appendChild(dlg);
      escenari = dlg.querySelector('.visor-escenari');
      img = dlg.querySelector('.visor-imatge');
      info = dlg.querySelector('.visor-info');
      nivell = dlg.querySelector('.nivell');
      carrega = dlg.querySelector('.visor-carrega');
      ajuda = dlg.querySelector('.visor-ajuda');
      botoAnt = dlg.querySelector('.visor-nav.anterior');
      botoSeg = dlg.querySelector('.visor-nav.seguent');

      dlg.querySelector('.visor-tancar').addEventListener('click', tanca);
      dlg.addEventListener('close', () => { document.body.style.overflow = ''; img.removeAttribute('src'); });
      botoAnt.addEventListener('click', () => mostra(idx - 1));
      botoSeg.addEventListener('click', () => mostra(idx + 1));
      dlg.querySelector('.visor-barra').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        const r = escenari.getBoundingClientRect(), cx = r.width / 2, cy = r.height / 2;
        if (b.dataset.acc === 'mes') zoomA(s * 1.6, cx, cy);
        if (b.dataset.acc === 'menys') zoomA(s / 1.6, cx, cy);
        if (b.dataset.acc === 'ajusta') ajusta();
        if (b.dataset.acc === 'real') zoomA(sMax, cx, cy);
        if (b.dataset.acc === 'info') { dlg.classList.toggle('sense-info'); setTimeout(() => { calculaAjust(); ajusta(); }, 30); }
      });
      escenari.addEventListener('wheel', e => {
        e.preventDefault();
        const r = escenari.getBoundingClientRect();
        zoomA(s * Math.pow(1.0018, -e.deltaY), e.clientX - r.left, e.clientY - r.top);
      }, { passive: false });
      escenari.addEventListener('dblclick', e => {
        const r = escenari.getBoundingClientRect();
        if (s < sMax * 0.98) zoomA(sMax, e.clientX - r.left, e.clientY - r.top);
        else ajusta();
      });
      escenari.addEventListener('pointerdown', e => {
        if (e.target.closest('button')) return;
        escenari.setPointerCapture(e.pointerId);
        punters.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (punters.size === 1) { arrossega = { x: e.clientX, y: e.clientY, tx, ty }; escenari.classList.add('arrossegant'); }
        if (punters.size === 2) {
          const [a, b] = [...punters.values()];
          pessic = { d: Math.hypot(a.x - b.x, a.y - b.y), s };
          arrossega = null;
        }
      });
      escenari.addEventListener('pointermove', e => {
        if (!punters.has(e.pointerId)) return;
        punters.set(e.pointerId, { x: e.clientX, y: e.clientY });
        const r = escenari.getBoundingClientRect();
        if (pessic && punters.size === 2) {
          const [a, b] = [...punters.values()];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          zoomA(pessic.s * d / pessic.d, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
        } else if (arrossega) {
          tx = arrossega.tx + e.clientX - arrossega.x;
          ty = arrossega.ty + e.clientY - arrossega.y;
          aplica();
        }
      });
      const final = e => {
        punters.delete(e.pointerId);
        if (punters.size < 2) pessic = null;
        if (punters.size === 0) { arrossega = null; escenari.classList.remove('arrossegant'); }
      };
      escenari.addEventListener('pointerup', final);
      escenari.addEventListener('pointercancel', final);
      dlg.addEventListener('keydown', e => {
        const r = escenari.getBoundingClientRect(), cx = r.width / 2, cy = r.height / 2;
        if (e.key === '+' || e.key === '=') zoomA(s * 1.4, cx, cy);
        else if (e.key === '-') zoomA(s / 1.4, cx, cy);
        else if (e.key === '0') ajusta();
        else if (e.key === 'ArrowLeft' && items.length > 1) mostra(idx - 1);
        else if (e.key === 'ArrowRight' && items.length > 1) mostra(idx + 1);
        else return;
        e.preventDefault();
      });
      window.addEventListener('resize', () => { if (dlg.open) { calculaAjust(); ajusta(); } });
    }

    function calculaAjust() {
      const r = escenari.getBoundingClientRect();
      sAjust = Math.min(r.width / W, r.height / H) * 0.94;
      // Límit sense pixelació: 1 píxel de la imatge per píxel de pantalla
      // (amb un marge per a pantalles d'alta densitat).
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sMax = Math.max(sAjust, 1 / Math.max(1, dpr / 1.5));
      if (sAjust > sMax) sAjust = sMax;
    }

    function limita() {
      const r = escenari.getBoundingClientRect();
      const w = W * s, h = H * s;
      tx = w <= r.width ? (r.width - w) / 2 : Math.min(0, Math.max(r.width - w, tx));
      ty = h <= r.height ? (r.height - h) / 2 : Math.min(0, Math.max(r.height - h, ty));
    }

    function aplica() {
      limita();
      img.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')';
      nivell.textContent = Math.round(s * 100) + ' %';
      // Si s'amplia per sobre del detall de la versió mitjana, carrega la gran
      const m = (IMATGES[idActual] || {}).mides || {};
      if (!carregadaGran && m.gran && m.mitjana && W * s > m.mitjana[0] * 1.05) carregaGran();
    }

    function zoomA(nova, cx, cy) {
      nova = Math.max(sAjust * 0.6, Math.min(sMax, nova));
      tx = cx - (cx - tx) * (nova / s);
      ty = cy - (cy - ty) * (nova / s);
      s = nova;
      aplica();
      ajuda.classList.add('amagada');
    }

    function ajusta() { s = sAjust; tx = 0; ty = 0; aplica(); }

    function carregaGran() {
      carregadaGran = true;
      const id = idActual;
      const pre = new Image();
      carrega.classList.add('visible');
      pre.onload = () => { if (id === idActual) img.src = pre.src; carrega.classList.remove('visible'); };
      pre.onerror = () => carrega.classList.remove('visible');
      pre.src = rutaImatge(id, 'gran');
    }

    function textCredit(id) {
      const d = IMATGES[id];
      if (!d) return '';
      let llic = d.llicencia || '';
      if (d.llicenciaUrl) llic = '<a href="' + d.llicenciaUrl + '" target="_blank" rel="noopener noreferrer">' + llic + '</a>';
      const font = d.font && /^https?:/.test(d.font)
        ? ' · <a href="' + d.font + '" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>'
        : (d.font ? ' · ' + d.font : '');
      const m = d.mides || {};
      const max = m.gran || m.mitjana;
      return 'Imatge: ' + d.autor + (llic ? ' · ' + llic : '') + font +
        (max ? '<br>Resolució màxima: ' + max[0] + ' × ' + max[1] + ' px' : '');
    }

    function mostra(i) {
      if (!items.length) return;
      idx = (i + items.length) % items.length;
      const it = items[idx];
      idActual = it.img;
      const m = (IMATGES[it.img] || {}).mides || {};
      const gran = m.gran || m.mitjana || [1600, 1200];
      W = gran[0]; H = gran[1];
      carregadaGran = !m.gran;
      img.alt = it.alt || it.titol || '';
      img.style.width = W + 'px';
      img.style.height = H + 'px';
      img.src = rutaImatge(it.img, m.mitjana ? 'mitjana' : 'mini');
      info.innerHTML =
        '<h2>' + (it.titol || '') + '</h2>' +
        (it.sub ? '<p class="visor-sub">' + it.sub + '</p>' : '') +
        (it.desc ? '<p class="visor-desc">' + it.desc + '</p>' : '') +
        (it.fixat && it.fixat.length ? '<h3>Fixa-t\'hi</h3><ul>' + it.fixat.map(f => '<li>' + f + '</li>').join('') + '</ul>' : '') +
        '<p class="visor-credit">' + textCredit(it.img) + '</p>';
      const varies = items.length > 1;
      botoAnt.hidden = !varies; botoSeg.hidden = !varies;
      calculaAjust();
      ajusta();
    }

    function obre(llista, inici) {
      if (!dlg) crea();
      items = llista;
      ajuda.classList.remove('amagada');
      dlg.showModal();
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => mostra(inici || 0));
      setTimeout(() => ajuda.classList.add('amagada'), 4000);
    }

    function tanca() { dlg.close(); }

    return { obre, textCredit };
  })();

  /* Llegeix la informació d'un element amb [data-img] */
  function itemDe(el) {
    const obra = el.dataset.obra && window.OBRES ? window.OBRES.find(o => o.id === el.dataset.obra) : null;
    if (obra) {
      return { img: obra.img, titol: obra.titol, sub: [obra.autor, obra.anys, obra.lloc].filter(Boolean).join(' · '),
        desc: obra.desc, fixat: obra.fixat, alt: obra.titol };
    }
    return {
      img: el.dataset.img,
      titol: el.dataset.titol || (el.querySelector('img') || {}).alt || '',
      sub: el.dataset.sub || '',
      desc: el.dataset.desc || '',
      fixat: el.dataset.fixat ? el.dataset.fixat.split('|') : [],
      alt: (el.querySelector('img') || {}).alt || ''
    };
  }

  function activaVisor() {
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-img],[data-obra]');
      if (!el || el.closest('dialog.visor')) return;
      e.preventDefault();
      const grup = el.closest('[data-galeria]') || document;
      const tots = [...grup.querySelectorAll('[data-img],[data-obra]')].filter(x => x.offsetParent !== null || x === el);
      Visor.obre(tots.map(itemDe), Math.max(0, tots.indexOf(el)));
    });
  }

  /* Prepara els botons d'imatge: lupa i atribut d'accessibilitat */
  function preparaBotonsImatge(arrel) {
    (arrel || document).querySelectorAll('.boto-imatge[data-img], .boto-imatge[data-obra]').forEach(b => {
      if (b.dataset.preparat) return;
      b.dataset.preparat = '1';
      // Les imatges verticals s'enquadren per la part de dalt (cares, títols de cartells)
      const im = b.querySelector('img'), id = b.dataset.img || (itemDe(b) || {}).img;
      const m = ((IMATGES[id] || {}).mides || {}).mini;
      if (im && !im.style.objectPosition && m && m[1] > m[0] * 1.15) im.style.objectPosition = 'center 15%';
      if (!b.querySelector('.lupa')) b.insertAdjacentHTML('beforeend', '<span class="lupa" aria-hidden="true">' + ICONES.lupa + '</span>');
      if (!b.getAttribute('aria-label')) {
        const it = itemDe(b);
        b.setAttribute('aria-label', 'Amplia la imatge: ' + (it.titol || it.alt));
      }
    });
  }

  /* ---------- Glossari emergent ---------- */
  function activaGlossari() {
    let bombolla = null, actiu = null;
    function tanca() {
      if (bombolla) bombolla.remove();
      if (actiu) actiu.setAttribute('aria-expanded', 'false');
      bombolla = null; actiu = null;
    }
    function obre(boto) {
      tanca();
      const t = GLOSSARI[boto.dataset.terme];
      if (!t) return;
      actiu = boto;
      boto.setAttribute('aria-expanded', 'true');
      bombolla = document.createElement('div');
      bombolla.className = 'bombolla-glossari';
      bombolla.setAttribute('role', 'tooltip');
      bombolla.id = 'bombolla-glossari';
      const facil = document.documentElement.classList.contains('lectura-facil') && t.facil;
      bombolla.innerHTML = '<strong>' + t.terme + '</strong>' + (facil ? t.facil : t.def) +
        ' <a href="glossari.html#' + boto.dataset.terme + '">Glossari</a>';
      document.body.appendChild(bombolla);
      boto.setAttribute('aria-describedby', 'bombolla-glossari');
      const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ui-zoom')) || 1;
      const r = boto.getBoundingClientRect();
      const bw = bombolla.offsetWidth;
      let left = (r.left + r.width / 2) / z + window.scrollX / z - bw / 2;
      left = Math.max(8, Math.min(left, document.documentElement.clientWidth / z - bw - 8));
      bombolla.style.left = left + 'px';
      bombolla.style.top = (r.bottom / z + window.scrollY / z + 8) + 'px';
    }
    document.querySelectorAll('.terme').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.addEventListener('click', e => { e.stopPropagation(); actiu === b ? tanca() : obre(b); });
    });
    document.addEventListener('click', e => { if (bombolla && !bombolla.contains(e.target)) tanca(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') tanca(); });
    window.addEventListener('resize', tanca);
  }

  /* ---------- Aparició suau en desplaçar ---------- */
  function activaReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('visible')); return; }
    const io = new IntersectionObserver(ents => ents.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  }

  function afegeixOrnaments() {
    document.querySelectorAll('.header-seccio').forEach(h => {
      if (!h.querySelector('.ornament')) h.insertAdjacentHTML('beforeend', ORNAMENT);
    });
  }

  /* A la portada, el menú és fosc sobre la imatge i clar quan es baixa */
  function navPortada() {
    const nav = document.querySelector('.pagina-inici .nav-principal');
    const hero = document.querySelector('.hero-index');
    if (!nav || !hero) return;
    const actualitza = () => nav.classList.toggle('nav-fosca', hero.getBoundingClientRect().bottom > nav.getBoundingClientRect().bottom + 4);
    window.addEventListener('scroll', actualitza, { passive: true });
    actualitza();
  }

  /* ---------- Registre de progrés (només en aquest dispositiu) ---------- */
  const CLAU_PROGRES = 'modernisme:progres';
  function llegeixProgres() {
    try { return JSON.parse(localStorage.getItem(CLAU_PROGRES)) || {}; } catch (e) { return {}; }
  }
  function registraProgres(id, nom, encerts, total) {
    const p = llegeixProgres();
    const ant = p[id];
    p[id] = {
      nom, pagina: paginaActual, encerts, total,
      millor: Math.max(encerts, ant ? ant.millor || 0 : 0),
      intents: (ant ? ant.intents || 0 : 0) + 1,
      data: new Date().toISOString()
    };
    try { localStorage.setItem(CLAU_PROGRES, JSON.stringify(p)); } catch (e) { /* sense emmagatzematge */ }
  }
  function esborraProgres() { try { localStorage.removeItem(CLAU_PROGRES); } catch (e) { /* res */ } }

  function titolPagina(href) {
    const net = String(href).split('#')[0];
    for (const m of MENU) {
      if (m.href === net) return m.text;
      for (const f of (m.fills || [])) if (f.href === net) return f.text;
    }
    return '';
  }

  /* ---------- Fonts de cada pàgina ----------
     Cadena simple = cerca a la Viquipèdia; [text, url] = enllaç directe. */
  const MUSEUS = {
    mnac: ['Museu Nacional d\'Art de Catalunya', 'https://www.museunacional.cat'],
    mnactec: ['Museu de la Ciència i de la Tècnica de Catalunya', 'https://mnactec.cat'],
    disseny: ['Museu del Disseny de Barcelona', 'https://www.museudeldisseny.cat']
  };
  const FONTS = {
    'que-es.html': ['Modernisme català', 'Art Nouveau', 'Noucentisme'],
    'catalunya.html': ['Renaixença', 'Exposició Universal de Barcelona (1888)', 'Pla Cerdà', 'Indústria tèxtil a Catalunya'],
    'mon.html': ['Art Nouveau', 'Secessió de Viena', 'Jugendstil', 'Japonisme'],
    'temps.html': ['Modernisme català', 'Setmana Tràgica', 'Mancomunitat de Catalunya'],
    'llegat.html': ['Obres d\'Antoni Gaudí', 'Palau de la Música Catalana', 'Hospital de la Santa Creu i Sant Pau', MUSEUS.mnactec],
    'arquitectura.html': ['Arquitectura modernista catalana', 'Casa Batlló', 'Volta catalana', 'Trencadís', 'Arc parabòlic'],
    'arts.html': ['Ramon Casas', 'Santiago Rusiñol', 'Lluïsa Vidal', 'Josep Llimona i Bruguera', 'Miquel Blay i Fàbregas', 'Enric Granados', 'Isaac Albéniz', 'Orfeó Català', MUSEUS.mnac],
    'ciutats.html': ['Colònia Güell', 'Colònia industrial', 'Vaga de La Canadenca', 'Setmana Tràgica', 'La nena obrera', 'Casa Alegre de Sagrera', MUSEUS.mnactec],
    'cartellisme.html': ['Cartellisme', 'Litografia', 'Anís del Mono', 'Alexandre de Riquer'],
    'oficis.html': ['Pujol i Bausis', 'Antoni Rigalt i Blanch', 'Lluís Bru i Salelles', 'Gaspar Homar', 'Lluís Masriera', 'Eusebi Arnau', 'Volta catalana', 'Esgrafiat', 'Rajola hidràulica', MUSEUS.mnac, MUSEUS.mnactec],
    'objectes.html': ['Gaspar Homar', 'Lluís Masriera', 'Panot', 'René Lalique', MUSEUS.disseny, MUSEUS.mnac],
    'arquitectes.html': ['Antoni Gaudí', 'Lluís Domènech i Montaner', 'Josep Puig i Cadafalch', 'Lluís Muncunill i Parellada', 'Obres d\'Antoni Gaudí', 'Cripta de la Colònia Güell', 'Catenària', 'Josep Maria Jujol i Gibert', 'Francesc Berenguer i Mestres', 'Rafael Masó i Valentí', 'Cèsar Martinell i Brunet'],
    'autors.html': ['Antoni Gaudí', 'Lluís Domènech i Montaner', 'Josep Puig i Cadafalch', 'Lluís Muncunill', 'Caterina Albert'],
    'obres.html': ['Modernisme català', MUSEUS.mnac],
    'mapa.html': ['Ruta del Modernisme', 'Casa Navàs', 'Casa Rull', 'Farinera Teixidor', 'Celler Cooperatiu del Pinell de Brai', 'Casa de los Botines', 'Palau Episcopal d\'Astorga'],
    'terrassa.html': ['Modernisme a Terrassa', 'Masia Freixa', 'Vapor Aymerich, Amat i Jover', 'Mercat de la Independència', MUSEUS.mnactec],
    'glossari.html': ['Modernisme català']
  };
  function fontsPagina() {
    const llista = FONTS[paginaActual];
    const main = document.querySelector('main');
    if (!llista || !main) return;
    const enllac = f => Array.isArray(f)
      ? '<a href="' + f[1] + '" target="_blank" rel="noopener noreferrer">' + f[0] + '</a>'
      : '<a href="https://ca.wikipedia.org/w/index.php?search=' + encodeURIComponent(f) + '" target="_blank" rel="noopener noreferrer">' + f + '</a> <small>(Viquipèdia)</small>';
    main.insertAdjacentHTML('beforeend', '<aside class="fonts-pagina nomes-pantalla" aria-labelledby="titol-fonts"><h2 id="titol-fonts">Fonts per saber-ne més</h2><ul>' +
      llista.map(f => '<li>' + enllac(f) + '</li>').join('') + '</ul><p><a href="credits.html">Crèdits de les imatges</a></p></aside>');
  }

  /* ---------- Enllaç directe a cada «Posa-t'hi» (per a Classroom) ---------- */
  function enllacosActivitats() {
    document.querySelectorAll('.posa-thi').forEach(sec => {
      const cap = sec.querySelector('header');
      const h = cap && cap.querySelector('h2[id]');
      if (!h || cap.querySelector('.copia-enllac')) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'boto clar petit copia-enllac nomes-pantalla';
      b.textContent = 'Copia l\'enllaç';
      b.title = 'Copia l\'adreça d\'aquesta activitat per compartir-la (per exemple, a Classroom)';
      b.addEventListener('click', () => {
        const url = location.href.split('#')[0] + '#' + h.id;
        const fet = () => { b.textContent = 'Enllaç copiat ✔'; setTimeout(() => { b.textContent = 'Copia l\'enllaç'; }, 2200); };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(fet, () => prompt('Copia aquest enllaç:', url));
        else prompt('Copia aquest enllaç:', url);
      });
      cap.appendChild(b);
    });
  }

  /* ---------- Lectura en veu alta dels textos de lectura fàcil ---------- */
  function lecturaEnVeu() {
    const eines = document.querySelector('.nav-eines');
    if (!eines || !('speechSynthesis' in window) || !document.querySelector('.text-facil')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'boto-lectura boto-escolta';
    b.setAttribute('aria-pressed', 'false');
    b.title = 'Escolta els textos de lectura fàcil';
    b.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg><span class="text-boto">Escolta</span>';
    eines.insertBefore(b, eines.querySelector('.menu-toggle'));
    const atura = () => { speechSynthesis.cancel(); b.setAttribute('aria-pressed', 'false'); };
    b.addEventListener('click', () => {
      if (b.getAttribute('aria-pressed') === 'true') { atura(); return; }
      const textos = [...document.querySelectorAll('main .text-facil')]
        .filter(el => el.offsetParent !== null).map(el => el.innerText.trim()).filter(Boolean);
      if (!textos.length) return;
      const veus = speechSynthesis.getVoices();
      const veu = veus.find(v => /^ca/i.test(v.lang)) || veus.find(v => /^es/i.test(v.lang));
      b.setAttribute('aria-pressed', 'true');
      textos.forEach((t, i) => {
        const u = new SpeechSynthesisUtterance(t);
        u.lang = veu ? veu.lang : 'ca-ES';
        if (veu) u.voice = veu;
        u.rate = 0.92;
        if (i === textos.length - 1) u.onend = atura;
        speechSynthesis.speak(u);
      });
    });
    window.addEventListener('pagehide', () => speechSynthesis.cancel());
  }

  /* ---------- Funcionament sense connexió ---------- */
  function registraServiceWorker() {
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      navigator.serviceWorker.register('sw.js').catch(() => { /* sense mode fora de línia */ });
    }
  }

  /* ---------- Inici ---------- */
  ajustaEscala();
  window.addEventListener('resize', ajustaEscala);
  construeixNav();
  construeixPeus();
  afegeixOrnaments();
  preparaBotonsImatge();
  activaVisor();
  activaGlossari();
  activaReveal();
  navPortada();
  enllacosActivitats();
  fontsPagina();
  lecturaEnVeu();
  registraServiceWorker();

  /* API per a les altres pàgines */
  window.Modernisme = { ICONES, MENU, rutaImatge, midaMaxima, preparaBotonsImatge, Visor, itemDe,
    registraProgres, llegeixProgres, esborraProgres, titolPagina };
})();
