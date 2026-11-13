// SPDX-License-Identifier: AGPL-3.0-or-later
/* La Revolució Industrial per dins — nucli compartit.
   Construeix la interfície de cada capítol, fa córrer les animacions
   i ofereix peces de dibuix reutilitzables (rodes, engranatges, foc...). */
(function () {
  'use strict';
  const RI = (window.RI = {});
  const TINTA = '#2a2420';

  /* ---------- capítols ---------- */
  RI.CAPITOLS = [
    { id: 'camp', nom: 'El camp', color: '#5b8c35', pregunta: 'Com alimentes més gent amb la mateixa terra?', epoca: 'segle XVIII',
      ico: '<path d="M12 21V8"/><path d="M12 8c-3 0-4-2-4-5 3 0 4 2 4 5zM12 8c3 0 4-2 4-5-3 0-4 2-4 5zM12 14c-3 0-4-2-4-5 3 0 4 2 4 5zM12 14c3 0 4-2 4-5-3 0-4 2-4 5z"/>' },
    { id: 'vapor', nom: 'El vapor', color: '#d9482b', pregunta: 'Com converteixes la calor en força?', epoca: '1712 – 1788',
      ico: '<rect x="5" y="9" width="9" height="11" rx="1"/><path d="M5 14h9M9.500 14V4M3 4h13M19 9v11"/><path d="M19 6c-2-2 2-3 0-5"/>' },
    { id: 'textil', nom: 'El cotó', color: '#b9722a', pregunta: 'Com fas més fil i més tela en menys temps?', epoca: '1733 – 1785',
      ico: '<path d="M7 4h10M7 20h10M9 4v16M15 4v16"/><path d="M9 7l6 2M9 10l6 2M9 13l6 2M9 16l6 2"/>' },
    { id: 'fabrica', nom: 'La fàbrica', color: '#a8452f', pregunta: 'Com mous cent màquines amb un sol motor?', epoca: '1771 – 1850',
      ico: '<path d="M3 21V11l5 3v-3l5 3v-3l5 3V4h3v17z"/><path d="M7 17h2M12 17h2"/>' },
    { id: 'metalls', nom: 'Ferro i acer', color: '#c9621c', pregunta: 'Com treus ferro d’una pedra?', epoca: '1709 – 1856',
      ico: '<path d="M8 3h8l3 18H5z"/><path d="M7 12h10M12 16v5"/>' },
    { id: 'tren', nom: 'La locomotora', color: '#1f6f78', pregunta: 'Com mous un tren sense cavalls?', epoca: '1804 – 1830',
      ico: '<path d="M3 15V9h9V6h3v3h3l3 6z"/><circle cx="7" cy="18" r="2.500"/><circle cx="16" cy="18" r="2.500"/><path d="M6 6V3"/>' },
    { id: 'vaixell', nom: 'El vaixell de vapor', color: '#2c6fa8', pregunta: 'Com navegues sense esperar el vent?', epoca: '1807 – 1845',
      ico: '<path d="M2 14h20l-3 6H5z"/><path d="M9 14V8h5v6M11 8V3"/><circle cx="16" cy="16" r="3"/>' },
    { id: 'capital', nom: 'El capital', color: '#7a4f9a', pregunta: 'Qui paga una fàbrica o un ferrocarril?', epoca: 'segles XVIII – XIX',
      ico: '<circle cx="12" cy="12" r="8.500"/><path d="M14.500 9.500c-.5-1-1.500-1.500-2.500-1.500-1.500 0-2.500.8-2.500 2s1 1.700 2.500 2 2.500.8 2.500 2-1 2-2.500 2c-1.200 0-2.200-.6-2.500-1.500M12 6.500v11"/>' }
  ];
  RI.icona = (c, mida) => `<svg class="ico" viewBox="0 0 24 24" width="${mida || 22}" height="${mida || 22}" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${c.ico.replace(/\.(\d)00/g, '.$1')}</svg>`;

  /* ---------- definicions SVG compartides ---------- */
  RI.DEFS = `<defs>
  <linearGradient id="g-ferro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9b4bb"/><stop offset="1" stop-color="#5d6a73"/></linearGradient>
  <linearGradient id="g-ferroh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5d6a73"/><stop offset=".35" stop-color="#b4bec4"/><stop offset="1" stop-color="#56636c"/></linearGradient>
  <linearGradient id="g-coure" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0ab68"/><stop offset="1" stop-color="#b3622c"/></linearGradient>
  <linearGradient id="g-llauto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6da7c"/><stop offset="1" stop-color="#c2952a"/></linearGradient>
  <linearGradient id="g-fusta" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7935c"/><stop offset="1" stop-color="#8f6038"/></linearGradient>
  <linearGradient id="g-cel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3f0"/><stop offset="1" stop-color="#f3ecd9"/></linearGradient>
  <linearGradient id="g-aigua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb9e0"/><stop offset="1" stop-color="#2f7fb5"/></linearGradient>
  <radialGradient id="g-foc" cx=".5" cy=".9" r=".9"><stop offset="0" stop-color="#fff6b0"/><stop offset=".45" stop-color="#ffb02e"/><stop offset="1" stop-color="#e2501f"/></radialGradient>
  <radialGradient id="g-roent" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fff3a0"/><stop offset=".6" stop-color="#ff9a2e"/><stop offset="1" stop-color="#d9482b"/></radialGradient>
  <pattern id="p-tall" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="9" fill="#c5ccd0"/><line x1="0" y1="0" x2="0" y2="9" stroke="${TINTA}" stroke-width="1.6"/></pattern>
  <pattern id="p-mao" width="34" height="20" patternUnits="userSpaceOnUse"><rect width="34" height="20" fill="#c9694a"/><path d="M0 0h34M0 10h34M0 0v10M17 10v10" stroke="#f1d9c0" stroke-width="1.6"/></pattern>
  <pattern id="p-maof" width="34" height="20" patternUnits="userSpaceOnUse"><rect width="34" height="20" fill="#e4c9a0"/><path d="M0 0h34M0 10h34M0 0v10M17 10v10" stroke="#b99468" stroke-width="1.6"/></pattern>
  <pattern id="p-terra" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#8a6a4a"/><circle cx="8" cy="9" r="2.4" fill="#6f5338"/><circle cx="27" cy="22" r="3" fill="#a17f5c"/><circle cx="14" cy="31" r="1.8" fill="#6f5338"/><circle cx="34" cy="6" r="1.6" fill="#a17f5c"/></pattern>
  <pattern id="p-pedra" width="44" height="30" patternUnits="userSpaceOnUse"><rect width="44" height="30" fill="#a9a59a"/><path d="M0 0h44M0 15h44M0 0v15M22 15v15" stroke="#7f7b70" stroke-width="1.6"/></pattern>
  <pattern id="p-carbo" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#2b2826"/><path d="M3 5l5-2 4 4-3 4-5-1zM13 14l6-1 1 5-5 2z" fill="#4a4541"/></pattern>
  <pattern id="p-mineral" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#9a4f32"/><path d="M3 5l5-2 4 4-3 4-5-1zM13 14l6-1 1 5-5 2z" fill="#c0704a"/></pattern>
  <pattern id="p-calc" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#d9d4c5"/><path d="M3 5l5-2 4 4-3 4-5-1zM13 14l6-1 1 5-5 2z" fill="#f4f0e4"/></pattern>
  <marker id="m-fl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0l10 5-10 5z" fill="context-stroke"/></marker>
  <filter id="f-ombra" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2a2420" flood-opacity=".25"/></filter>
</defs>`;
  RI.svg = (inner, vb) => `<svg class="esc" viewBox="${vb || '-60 0 1320 720'}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${RI.DEFS}${inner}</svg>`;

  /* ---------- peces de dibuix ---------- */
  const f1 = (n) => Math.round(n * 10) / 10;
  RI.roda = (cx, cy, r, o = {}) => {
    const n = o.raigs || 8, g = o.gruix || Math.max(5, r * 0.13), rg = o.raig || Math.max(3, r * 0.075);
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (i * 2 * Math.PI) / n;
      s += `<line x1="${f1(cx + Math.cos(a) * r * 0.12)}" y1="${f1(cy + Math.sin(a) * r * 0.12)}" x2="${f1(cx + Math.cos(a) * (r - g))}" y2="${f1(cy + Math.sin(a) * (r - g))}" stroke="${o.raigColor || TINTA}" stroke-width="${f1(rg)}" stroke-linecap="round"/>`;
    }
    return `<g ${o.attr || ''}><circle cx="${cx}" cy="${cy}" r="${f1(r - g / 2)}" fill="${o.fons || 'none'}" stroke="${TINTA}" stroke-width="${f1(g + 5)}"/><circle cx="${cx}" cy="${cy}" r="${f1(r - g / 2)}" fill="none" stroke="${o.color || '#7d8a92'}" stroke-width="${f1(g)}"/>${s}<circle cx="${cx}" cy="${cy}" r="${f1(Math.max(5, r * 0.17))}" fill="${o.boto || '#c79a2c'}" stroke="${TINTA}" stroke-width="2.5"/>${o.extra || ''}</g>`;
  };
  RI.engranatge = (cx, cy, r, n, o = {}) => {
    const h = o.dent || r * 0.16, pts = [];
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * 2 * Math.PI, st = (2 * Math.PI) / n;
      [[0.08, r - h / 2], [0.3, r + h / 2], [0.58, r + h / 2], [0.8, r - h / 2]].forEach(([k, rr]) => {
        pts.push(f1(cx + Math.cos(a0 + st * k) * rr) + ',' + f1(cy + Math.sin(a0 + st * k) * rr));
      });
    }
    return `<g ${o.attr || ''}><polygon points="${pts.join(' ')}" fill="${o.color || '#7d8a92'}" stroke="${TINTA}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy}" r="${f1(r * 0.55)}" fill="none" stroke="${TINTA}" stroke-width="2" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="${f1(Math.max(4, r * 0.2))}" fill="${o.boto || '#c79a2c'}" stroke="${TINTA}" stroke-width="2.5"/><line x1="${cx}" y1="${cy}" x2="${f1(cx + r * 0.5)}" y2="${cy}" stroke="${TINTA}" stroke-width="2.5"/></g>`;
  };
  RI.foc = (x, y, w, h) => {
    const fl = (ww, hh, c, d) => `<path class="flama" style="animation-delay:${d}s;transform-origin:${x}px ${y}px" d="M${f1(x - ww / 2)} ${y}C${f1(x - ww / 2)} ${f1(y - hh * 0.5)} ${f1(x - ww * 0.12)} ${f1(y - hh * 0.6)} ${x} ${f1(y - hh)}C${f1(x + ww * 0.12)} ${f1(y - hh * 0.6)} ${f1(x + ww / 2)} ${f1(y - hh * 0.5)} ${f1(x + ww / 2)} ${y}Z" fill="${c}"/>`;
    return `<g class="foc-g">${fl(w, h, '#e2501f', 0)}${fl(w * 0.68, h * 0.72, '#ff9a2e', -0.3)}${fl(w * 0.36, h * 0.45, '#ffe07a', -0.55)}</g>`;
  };
  RI.focs = (x, y, n, pas, w, h) => { let s = ''; for (let i = 0; i < n; i++) s += RI.foc(x + i * pas, y, w, h * (0.8 + 0.2 * ((i * 7) % 3) / 2)); return s; };
  RI.persona = (x, y, h, o = {}) => {
    const k = h / 100, c = o.color || '#3d5a80';
    return `<g transform="translate(${x} ${y}) scale(${f1(k * (o.gir ? -1 : 1) * 100) / 100} ${f1(k * 100) / 100})" ${o.attr || ''}><path d="M-7 0v-36M7 0v-36" stroke="${TINTA}" stroke-width="7" stroke-linecap="round"/><path d="M-11-34h22l-3-38h-16z" fill="${c}" stroke="${TINTA}" stroke-width="3" stroke-linejoin="round"/><path d="${o.brac || 'M-8-68l-8 26M8-68l8 26'}" stroke="${TINTA}" stroke-width="5.5" stroke-linecap="round" fill="none"/><circle cx="0" cy="-84" r="10" fill="#e9b98f" stroke="${TINTA}" stroke-width="3"/>${o.barret ? `<path d="M-13-90h26M-8-90v-8h16v8" fill="${TINTA}" stroke="${TINTA}" stroke-width="3" stroke-linejoin="round"/>` : ''}</g>`;
  };
  RI.nuvol = (x, y, k, o) => `<path transform="translate(${x} ${y}) scale(${k})" d="M0 0c-14 0-16-18-2-20 2-16 26-18 32-4 10-8 26 0 22 12 12 2 10 14-2 12z" fill="#fff" opacity="${o || 0.85}"/>`;
  RI.txt = (x, y, s, cls, extra) => `<text x="${x}" y="${y}" class="${cls || 'tx'}" ${extra || ''}>${s}</text>`;
  RI.fletxa = (d, color, gruix, extra) => `<path d="${d}" fill="none" stroke="${color || TINTA}" stroke-width="${gruix || 4}" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#m-fl)" ${extra || ''}/>`;
  /* nota amb fons (rètol dins del dibuix) */
  RI.retol = (x, y, s, o = {}) => {
    const w = o.w || s.length * 8.6 + 24, h = o.h || 30;
    return `<g ${o.attr || ''}><rect x="${f1(x - w / 2)}" y="${y - h / 2}" width="${f1(w)}" height="${h}" rx="${h / 2}" fill="${o.fons || TINTA}" ${o.vora ? `stroke="${o.vora}" stroke-width="2.5"` : ''}/><text x="${x}" y="${y + 5.5}" text-anchor="middle" class="tx-r" fill="${o.color || '#fff'}">${s}</text></g>`;
  };
  RI.lerp = (a, b, k) => a + (b - a) * k;
  RI.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  RI.suau = (k) => { k = RI.clamp(k, 0, 1); return k * k * (3 - 2 * k); };
  /* tram: valor interpolat de a→b quan p va de p0 a p1 */
  RI.tram = (p, p0, p1, a, b, recte) => { const k = RI.clamp((p - p0) / (p1 - p0), 0, 1); return a + (b - a) * (recte ? k : RI.suau(k)); };
  RI.color = (c1, c2, k) => {
    const h = (c) => [1, 3, 5].map((i) => parseInt(c.substr(i, 2), 16));
    const a = h(c1), b = h(c2); k = RI.clamp(k, 0, 1);
    return 'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',') + ')';
  };

  /* ---------- estat ---------- */
  const st = { cap: null, esc: null, iEsc: 0, p: 0, voltes: 0, play: true, vel: 1, fiPas: null, iFase: -1, sel: null, capes: {}, etq: true, brut: true, repte: false };
  let svgEl = null, auto = null, els = {}, darrer = 0;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (t) => String(t).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const desa = (k, v) => { try { localStorage.setItem('ri:' + k, v); } catch (e) { /* sense emmagatzematge */ } };
  const llegeix = (k) => { try { return localStorage.getItem('ri:' + k); } catch (e) { return null; } };

  RI.capitol = (def) => { st.cap = def; };

  /* ---------- escala de la interfície ---------- */
  const BASE_W = 1440, BASE_H = 800;
  function ajusta() {
    const w = window.innerWidth, h = window.innerHeight, root = document.documentElement;
    const mobil = w < 980 || (w < 1180 && h > w);
    let z = 1;
    if (!mobil) { z = Math.min(w / BASE_W, h / BASE_H); z = RI.clamp(Math.floor(z * 40) / 40, 0.62, 1.6); }
    root.style.setProperty('--z', String(z));
    root.classList.toggle('mobil', mobil);
    root.classList.toggle('escriptori', !mobil);
  }

  /* ---------- peu i capçalera ---------- */
  const peu = () => `<footer class="felip-app-footer"><a class="felip-license-image-link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer" aria-label="Llicència Creative Commons BY-NC-SA 4.0"><img class="felip-license-image" src="assets/CC_BY-NC-SA.png" alt="Creative Commons BY-NC-SA"></a><div class="felip-footer-text"><p>Aplicació creada per <a href="https://ja.cat/felipsarroca" target="_blank" rel="noopener noreferrer">Felip Sarroca</a> amb assistència de la IA</p><p>Obra sota llicència <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a> · Codi AGPL-3.0-or-later · <a href="https://github.com/felipsarroca/web/issues/new?template=revolucio-industrial.yml" target="_blank" rel="noopener noreferrer">Suggeriments i errors</a></p></div></footer>`;
  const marca = () => `<a class="marca" href="index.html" aria-label="Torna a la portada"><span class="marca-roda" aria-hidden="true">${RI.svgMarca()}</span><span class="marca-text"><strong>La Revolució Industrial</strong><em>per dins</em></span></a>`;
  RI.svgMarca = () => `<svg viewBox="0 0 40 40" width="38" height="38"><g class="gira-lent" style="transform-origin:20px 20px">${RI.engranatge(20, 20, 14, 10, { color: '#d9482b', boto: '#f6da7c' })}</g></svg>`;
  function eines() {
    return `<div class="eines"><div class="nivell" role="group" aria-label="Nivell de lectura"><button type="button" data-nivell="eso">4t ESO</button><button type="button" data-nivell="batx">+ Batxillerat</button></div><button type="button" class="boto-ico" id="b-pantalla" title="Pantalla completa (per projectar)" aria-label="Pantalla completa"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button></div>`;
  }
  function activaEines() {
    const posa = (n) => { document.body.classList.toggle('batx', n === 'batx'); $$('.nivell button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.nivell === n)); desa('nivell', n); };
    posa(llegeix('nivell') === 'batx' ? 'batx' : 'eso');
    $$('.nivell button').forEach((b) => b.addEventListener('click', () => posa(b.dataset.nivell)));
    const bp = $('#b-pantalla');
    if (bp) bp.addEventListener('click', () => { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {}); });
  }
  RI.peu = peu; RI.marca = marca; RI.eines = eines; RI.activaEines = activaEines; RI.ajusta = ajusta;

  /* ---------- pàgina de capítol ---------- */
  function munta() {
    const id = document.body.dataset.capitol, meta = RI.CAPITOLS.find((c) => c.id === id), cap = st.cap, idx = RI.CAPITOLS.indexOf(meta);
    document.documentElement.style.setProperty('--cap', meta.color);
    const ant = RI.CAPITOLS[idx - 1], seg = RI.CAPITOLS[idx + 1];
    $('#app').innerHTML = `
    <header class="cap">${marca()}
      <nav class="caps" aria-label="Capítols">${RI.CAPITOLS.map((c, i) => `<a href="${c.id}.html" class="cap-xip${c === meta ? ' actual' : ''}" style="--c:${c.color}" title="${esc(c.nom)}"${c === meta ? ' aria-current="page"' : ''}><span class="n">${i + 1}</span>${RI.icona(c, 20)}<span class="nom">${esc(c.nom)}</span></a>`).join('')}</nav>
      ${eines()}
    </header>
    <div class="subcap">
      <div class="titol-cap"><span class="num">${idx + 1}</span><div><h1>${esc(cap.titol || meta.nom)}</h1><p>${esc(meta.pregunta)}</p></div></div>
      <nav class="escenes" id="escenes" aria-label="Escenes del capítol">${cap.escenes.map((e, i) => `<button type="button" data-esc="${i}"><span class="pas">${i + 1}</span><span>${esc(e.nom)}</span>${e.any ? `<small>${esc(e.any)}</small>` : ''}</button>`).join('')}<button type="button" data-esc="repte" class="tab-repte"><span class="pas">?</span><span>Repte</span></button></nav>
    </div>
    <main class="cos" id="cos"></main>
    ${peu()}`;
    activaEines();
    $('#escenes').addEventListener('click', (ev) => { const b = ev.target.closest('[data-esc]'); if (!b) return; if (b.dataset.esc === 'repte') obreRepte(); else obreEscena(+b.dataset.esc); });
    document.addEventListener('keydown', tecles);
    RI._nav = { ant, seg };
    const h = location.hash.slice(1);
    if (h === 'repte') obreRepte();
    else { const i = cap.escenes.findIndex((e) => e.id === h); obreEscena(i >= 0 ? i : 0); }
    requestAnimationFrame(bucle);
  }

  function marcaTab(v) { $$('#escenes button').forEach((b) => b.setAttribute('aria-selected', b.dataset.esc === String(v))); }

  function obreEscena(i) {
    const cap = st.cap, e = cap.escenes[i];
    st.repte = false; st.esc = e; st.iEsc = i; st.p = 0; st.voltes = 0; st.fiPas = null; st.iFase = -1; st.sel = null; st.capes = {}; st.vel = 1;
    (e.capes || []).forEach((c) => { st.capes[c.id] = !!c.on; });
    st.play = !e.estatica && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    marcaTab(i);
    history.replaceState(null, '', '#' + e.id);
    const fases = e.fases || [];
    $('#cos').className = 'cos';
    $('#cos').innerHTML = `
    <section class="escenari">
      <div class="tela" id="tela">${typeof e.svg === 'function' ? e.svg() : e.svg}
        <div class="capes" id="capes">${e.etiquetes ? '<button type="button" data-capa="_etq" aria-pressed="true" title="Amaga les etiquetes i comprova si recordes cada peça">Etiquetes</button>' : ''}${(e.capes || []).map((c) => `<button type="button" data-capa="${c.id}" aria-pressed="${!!c.on}">${esc(c.nom)}</button>`).join('')}</div>
        ${e.model ? `<div class="model">${esc(e.model)}</div>` : ''}
      </div>
      <div class="comandament${e.estatica ? ' sense' : ''}">
        <div class="botons"><button type="button" id="b-ant" title="Fase anterior (←)" aria-label="Fase anterior"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 5v14M19 5l-10 7 10 7z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg></button><button type="button" id="b-play" class="principal" title="Reprodueix o atura (espai)" aria-label="Reprodueix o atura"></button><button type="button" id="b-seg" title="Fase següent (→)" aria-label="Fase següent"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 5v14M5 5l10 7-10 7z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg></button></div>
        <div class="linia"><div class="trams" id="trams">${fases.map((f, k) => { const a = k ? fases[k - 1].fins : 0; return `<span style="flex:${(f.fins - a).toFixed(3)}" data-k="${k}"><i>${k + 1}</i></span>`; }).join('')}</div><input type="range" id="lliscador" min="0" max="1000" value="0" aria-label="Moment del cicle"></div>
        <button type="button" id="b-vel" class="vel" title="Velocitat de l’animació">×1</button>
      </div>
      <div class="ara" id="ara" aria-live="polite"></div>
    </section>
    <aside class="panell" id="panell">
      <div class="p-cap">${e.any ? `<span class="segell">${esc(e.any)}</span>` : ''}${e.qui ? `<span class="qui">${esc(e.qui)}</span>` : ''}</div>
      <h2 class="pregunta">${esc(e.pregunta)}</h2>
      ${e.intro ? `<p class="intro">${e.intro}</p>` : ''}
      ${fases.length ? `<h3 class="p-t">Pas a pas</h3><ol class="fases" id="fases">${fases.map((f, k) => `<li data-k="${k}"><button type="button"><span class="k">${k + 1}</span><span class="f-nom">${esc(f.nom)}</span></button><p>${f.text}</p></li>`).join('')}</ol>` : ''}
      <div class="peca" id="peca"></div>
      ${e.clau ? `<div class="clau"><span>La idea clau</span><p>${e.clau}</p></div>` : ''}
      ${e.batx ? `<div class="batx-bloc"><span>Per aprofundir · 1r de Batxillerat</span><h4>${esc(e.batx.titol)}</h4><p>${e.batx.text}</p>${e.batx.font ? `<a href="${e.batx.font}" target="_blank" rel="noopener noreferrer">${esc(e.batx.fontNom || 'Consulta la font')} ↗</a>` : ''}</div>` : ''}
      <div class="p-nav">${i > 0 ? `<button type="button" data-va="${i - 1}">← ${esc(cap.escenes[i - 1].nom)}</button>` : '<span></span>'}${i < cap.escenes.length - 1 ? `<button type="button" class="seg" data-va="${i + 1}">${esc(cap.escenes[i + 1].nom)} →</button>` : '<button type="button" class="seg" data-va="repte">Repte final →</button>'}</div>
    </aside>`;
    svgEl = $('#tela svg'); els = {};
    posaEtiquetes(e); prepara(); pintaPeca();
    $('#b-play').addEventListener('click', () => { st.fiPas = null; st.play = !st.play; botoPlay(); });
    $('#b-seg').addEventListener('click', () => vesFase(st.iFase + 1));
    $('#b-ant').addEventListener('click', () => vesFase(st.iFase - 1));
    $('#b-vel').addEventListener('click', () => { st.vel = st.vel === 1 ? 0.4 : st.vel === 0.4 ? 2 : 1; $('#b-vel').textContent = st.vel === 0.4 ? 'lent' : '×' + st.vel; });
    $('#lliscador').addEventListener('input', (ev) => { st.play = false; st.fiPas = null; st.p = Math.min(0.9999, ev.target.value / 1000); st.brut = true; botoPlay(); });
    $('#trams').addEventListener('click', (ev) => { const s = ev.target.closest('[data-k]'); if (s) vesFase(+s.dataset.k); });
    const lf = $('#fases'); if (lf) lf.addEventListener('click', (ev) => { const li = ev.target.closest('li'); if (li) vesFase(+li.dataset.k); });
    $('#capes').addEventListener('click', (ev) => { const b = ev.target.closest('[data-capa]'); if (!b) return; const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); if (b.dataset.capa === '_etq') { st.etq = on; svgEl.classList.toggle('sense-etq', !on); } else { st.capes[b.dataset.capa] = on; svgEl.classList.toggle('capa-' + b.dataset.capa, on); mostraCapes(); } st.brut = true; });
    (e.capes || []).forEach((c) => svgEl.classList.toggle('capa-' + c.id, !!c.on));
    mostraCapes();
    st.etq = true;
    svgEl.addEventListener('click', (ev) => { const g = ev.target.closest('[data-part],[data-etq]'); tria(g ? g.dataset.part || g.dataset.etq : null); });
    $('.p-nav').addEventListener('click', (ev) => { const b = ev.target.closest('[data-va]'); if (!b) return; if (b.dataset.va === 'repte') obreRepte(); else obreEscena(+b.dataset.va); });
    $('#peca').addEventListener('click', (ev) => { const b = ev.target.closest('[data-tria]'); if (b) tria(b.dataset.tria === st.sel ? null : b.dataset.tria); });
    botoPlay(); st.brut = true;
  }

  /* els elements amb data-capa="id" només es veuen si la capa és activa */
  function mostraCapes() { $$('[data-capa]', svgEl).forEach((n) => { n.style.display = st.capes[n.dataset.capa] ? '' : 'none'; }); }

  function posaEtiquetes(e) {
    if (!e.etiquetes) return;
    const NS = 'http://www.w3.org/2000/svg', g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'etqs');
    g.innerHTML = e.etiquetes.map(([part, x, y, ax, ay, text, segueix]) => {
      const nom = text || (e.parts[part] ? e.parts[part].nom : part);
      return `<g class="etq" data-etq="${part}"${segueix ? ` data-seg="${segueix}"` : ''} tabindex="0" role="button" aria-label="${esc(nom)}"><line x1="${x}" y1="${y}" x2="${ax}" y2="${ay}"/><circle cx="${ax}" cy="${ay}" r="5"/><rect x="${x}" y="${y - 15}" width="10" height="30" rx="15"/><text x="${x}" y="${y + 5.5}" text-anchor="middle">${esc(nom)}</text></g>`;
    }).join('');
    svgEl.appendChild(g);
    $$('.etq', g).forEach((n) => {
      const t = $('text', n), r = $('rect', n), w = t.getComputedTextLength() + 26, x = +t.getAttribute('x');
      r.setAttribute('x', x - w / 2); r.setAttribute('width', w);
      n.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); tria(n.dataset.etq); } });
    });
  }

  function prepara() {
    const rang = (s) => s.split(',').map((r) => r.split('-').map(Number));
    auto = {
      flux: $$('[data-flux]', svgEl).map((el) => ({ el, v: +el.dataset.flux })),
      fase: $$('[data-fase]', svgEl).map((el) => ({ el, r: rang(el.dataset.fase) })),
      en: $$('[data-en]', svgEl).map((el) => ({ el, k: el.dataset.en.split(',').map(Number) })),
      gira: $$('[data-gira]', svgEl).map((el) => { const a = el.dataset.gira.split(/\s+/).map(Number); return { el, cx: a[0], cy: a[1], k: a[2], d: a[3] || 0 }; }),
      girat: $$('[data-girat]', svgEl).map((el) => { const a = el.dataset.girat.split(/\s+/).map(Number); return { el, cx: a[0], cy: a[1], v: a[2] }; }),
      puf: $$('[data-puf]', svgEl).map((el) => {
        const a = el.dataset.puf.split(/\s+/).map(Number), n = a[4] || 5, cs = [];
        for (let i = 0; i < n; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); el.appendChild(c); cs.push(c); }
        return { el, x: a[0], y: a[1], dx: a[2], dy: a[3], n, r: a[5] || 10, per: a[6] || 2.4, cs };
      })
    };
  }

  function faseDe(p) { const f = st.esc.fases || []; for (let k = 0; k < f.length; k++) if (p < f[k].fins) return k; return f.length - 1; }
  function vesFase(k) {
    const f = st.esc.fases || []; if (!f.length) return;
    k = ((k % f.length) + f.length) % f.length;
    st.p = k ? f[k - 1].fins : 0; st.fiPas = f[k].fins; st.play = true; st.brut = true; botoPlay();
  }
  function botoPlay() {
    const b = $('#b-play'); if (!b) return;
    b.innerHTML = st.play ? '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 5v14M17 5v14" stroke="currentColor" stroke-width="4.500" stroke-linecap="round"/></svg>' : '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 4l13 8-13 8z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
    b.setAttribute('aria-pressed', st.play);
  }
  function tria(part) {
    if (part && !(st.esc.parts && st.esc.parts[part])) part = null;
    st.sel = part === st.sel ? null : part; pintaPeca(); st.brut = true;
  }
  function pintaPeca() {
    const e = st.esc, box = $('#peca'); if (!box) return;
    const parts = e.parts || {}, claus = Object.keys(parts);
    if (!claus.length) { box.innerHTML = ''; return; }
    const p = st.sel ? parts[st.sel] : null;
    box.innerHTML = `<h3 class="p-t">Les peces <small>toca’n una al dibuix</small></h3><div class="xips">${claus.map((k) => `<button type="button" data-tria="${k}" aria-pressed="${k === st.sel}">${esc(parts[k].nom)}</button>`).join('')}</div>${p ? `<div class="fitxa"><strong>${esc(p.nom)}</strong><p>${p.text}</p></div>` : ''}`;
    if (svgEl) {
      svgEl.classList.toggle('te-sel', !!st.sel);
      $$('[data-part],[data-etq]', svgEl).forEach((n) => n.classList.toggle('sel', (n.dataset.part || n.dataset.etq) === st.sel));
      focus();
    }
  }
  /* cada fase pot posar el focus en unes peces (la resta s'atenua una mica) */
  function focus() {
    if (!svgEl || !st.esc) return;
    const f = (st.esc.fases || [])[st.iFase], llista = !st.sel && f && f.focus ? f.focus : null;
    svgEl.classList.toggle('te-focus', !!llista);
    $$('[data-part],[data-etq]', svgEl).forEach((n) => n.classList.toggle('foc', !!llista && llista.indexOf(n.dataset.part || n.dataset.etq) >= 0));
  }

  function tecles(ev) {
    if (st.repte || !st.esc || ev.target.closest('input,textarea')) return;
    if (ev.key === 'ArrowRight') { vesFase(st.iFase + 1); ev.preventDefault(); }
    else if (ev.key === 'ArrowLeft') { vesFase(st.iFase - 1); ev.preventDefault(); }
    else if (ev.key === ' ' && !ev.target.closest('button,a,[role=button]')) { st.fiPas = null; st.play = !st.play; botoPlay(); ev.preventDefault(); }
  }

  /* ---------- bucle d'animació ---------- */
  function bucle(ara) {
    const dt = Math.min(0.05, (ara - darrer) / 1000 || 0); darrer = ara;
    const e = st.esc;
    if (e && !st.repte && svgEl) {
      if (st.play && !e.estatica) {
        let np = st.p + (dt * st.vel) / (e.durada || 8);
        if (st.fiPas != null && np >= st.fiPas - 0.0005) { np = st.fiPas - 0.0005; st.play = false; st.fiPas = null; botoPlay(); }
        if (np >= 1) { np -= 1; st.voltes++; }
        st.p = np; st.brut = true;
      }
      if (st.brut) { st.brut = false; pinta(); }
    }
    requestAnimationFrame(bucle);
  }
  const el = (id) => els[id] || (els[id] = svgEl.querySelector('#' + id));
  function pinta() {
    const e = st.esc, p = st.p, t = (st.voltes + p) * (e.durada || 8), k = faseDe(p);
    if (k !== st.iFase) {
      st.iFase = k;
      $$('#fases li').forEach((li) => li.classList.toggle('activa', +li.dataset.k === k));
      $$('#trams span').forEach((s) => s.classList.toggle('activa', +s.dataset.k === k));
      const f = (e.fases || [])[k];
      $('#ara').innerHTML = f ? `<span class="k">${k + 1}</span><strong>${esc(f.nom)}</strong>` : '';
      focus();
      const li = $('#fases li.activa'); if (li && li.scrollIntoView && !document.documentElement.classList.contains('mobil')) li.scrollIntoView({ block: 'nearest' });
    }
    const ll = $('#lliscador'); if (ll && document.activeElement !== ll) ll.value = Math.round(p * 1000);
    auto.flux.forEach((a) => { a.el.style.strokeDashoffset = (-t * a.v * 40).toFixed(1); });
    auto.fase.forEach((a) => { a.el.style.opacity = a.r.some(([x, y]) => p >= x && p < y) ? 1 : 0; });
    auto.en.forEach((a) => { a.el.style.opacity = a.k.indexOf(k) >= 0 ? 1 : 0; });
    auto.gira.forEach((a) => a.el.setAttribute('transform', `rotate(${(360 * a.k * p + a.d).toFixed(2)} ${a.cx} ${a.cy})`));
    auto.girat.forEach((a) => a.el.setAttribute('transform', `rotate(${((t * a.v) % 360).toFixed(2)} ${a.cx} ${a.cy})`));
    auto.puf.forEach((a) => {
      for (let i = 0; i < a.n; i++) {
        let f = (t / a.per + i / a.n) % 1; if (f < 0) f += 1;
        const c = a.cs[i];
        c.setAttribute('cx', (a.x + a.dx * f + Math.sin(f * 7 + i * 2.1) * a.r * 0.5).toFixed(1));
        c.setAttribute('cy', (a.y + a.dy * f).toFixed(1));
        c.setAttribute('r', (a.r * (0.45 + f * 1.3)).toFixed(1));
        c.setAttribute('opacity', (Math.min(1, f * 6) * (1 - f) * 0.9).toFixed(2));
      }
    });
    if (e.anima) e.anima({ p, t, k, el, capes: st.capes, svg: svgEl, sel: st.sel });
    /* etiquetes que acompanyen una peça mòbil */
    if (!svgEl._seg) svgEl._seg = $$('.etq[data-seg]', svgEl);
    svgEl._seg.forEach((n) => n.setAttribute('transform', el(n.dataset.seg).getAttribute('transform') || ''));
  }

  /* ---------- repte final ---------- */
  function obreRepte() {
    const cap = st.cap, idx = RI.CAPITOLS.findIndex((c) => c.id === cap.id), seg = RI.CAPITOLS[idx + 1];
    st.repte = true; marcaTab('repte'); history.replaceState(null, '', '#repte');
    const qs = cap.repte || [];
    $('#cos').className = 'cos repte';
    $('#cos').innerHTML = `<div class="repte-cap"><h2>Ho has entès?</h2><p>Respon sense mirar els dibuixos. Si falles, torna a l’escena i observa-la de nou.</p><div class="marcador" id="marcador">0 / ${qs.length}</div></div><div class="preguntes">${qs.map((q, i) => `<article class="q" data-i="${i}"><h3><span>${i + 1}</span>${esc(q.q)}</h3><div class="ops">${q.o.map((o, j) => `<button type="button" data-j="${j}">${esc(o)}</button>`).join('')}</div><p class="exp" hidden></p></article>`).join('')}</div><div class="repte-peu"><button type="button" id="r-torna">← Torna a les escenes</button>${seg ? `<a class="boto" href="${seg.id}.html">Capítol següent: ${esc(seg.nom)} →</a>` : '<a class="boto" href="index.html">Torna a la portada →</a>'}</div>`;
    let encerts = 0, fets = 0;
    $('#r-torna').addEventListener('click', () => obreEscena(0));
    $('.preguntes').addEventListener('click', (ev) => {
      const b = ev.target.closest('button[data-j]'); if (!b) return;
      const art = b.closest('.q'); if (art.classList.contains('feta')) return;
      const q = qs[+art.dataset.i], ok = +b.dataset.j === q.c;
      art.classList.add('feta', ok ? 'be' : 'malament'); b.classList.add('triada');
      $$('button', art).forEach((x) => { x.disabled = true; if (+x.dataset.j === q.c) x.classList.add('bona'); });
      const ex = $('.exp', art); ex.hidden = false; ex.innerHTML = (ok ? '<b>Correcte.</b> ' : '<b>No és això.</b> ') + q.e;
      fets++; if (ok) encerts++;
      $('#marcador').textContent = `${encerts} / ${qs.length}` + (fets === qs.length ? (encerts === qs.length ? ' · Perfecte!' : ' · Repassa i torna-hi') : '');
    });
  }

  /* accés directe a una escena i un moment (proves i enllaços) */
  RI.ves = (i, p) => { obreEscena(i); if (p != null) { st.play = false; st.p = p; st.brut = true; botoPlay(); } };

  /* ---------- arrencada ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    ajusta(); window.addEventListener('resize', ajusta);
    if (document.body.dataset.capitol === 'portada') { if (RI.portada) RI.portada(); }
    else if (st.cap) munta();
  });
})();
