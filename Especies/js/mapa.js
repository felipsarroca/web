/* SPDX-License-Identifier: AGPL-3.0-or-later */
/* Mapes SVG a partir dels contorns de Natural Earth (js/mapes-dades.js) */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  function nou(tag, attrs, pare) { const e = document.createElementNS(NS, tag); for (const k in attrs || {}) e.setAttribute(k, attrs[k]); if (pare) pare.appendChild(e); return e; }

  function distKm(lon1, lat1, lon2, lat2) {
    const R = 6371, rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad, dLon = (lon2 - lon1) * rad;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(a)));
  }

  /* Crea el mapa dins `cont`. Retorna { svg, P(lon,lat) → [x,y], capa(nom), port(...), ruta(...), arc(...), vaixell(...), ... } */
  function Mapa(cont, vista, opts) {
    opts = opts || {};
    const M = window.MAPES[vista];
    const svg = nou('svg', { viewBox: `0 0 ${M.W} ${M.H}`, role: 'img', 'aria-label': opts.titol || 'Mapa' });
    nou('title', {}, svg).textContent = opts.titol || 'Mapa';
    const P = (lon, lat) => [(lon - M.lon0) / (M.lon1 - M.lon0) * M.W, (M.lat1 - lat) / (M.lat1 - M.lat0) * M.H];

    // Capa de carta nàutica subtil (paral·lels clau)
    const gCarta = nou('g', { class: 'capa-carta', 'aria-hidden': 'true' }, svg);
    const linies = [
      [0, 'Equador', 'equador'],
      [23.44, 'Tròpic de Càncer', 'tropic'],
      [-23.44, 'Tròpic de Capricorn', 'tropic']
    ];
    linies.forEach(([lat, nom, cls]) => {
      if (lat > M.lat0 + 2 && lat < M.lat1 - 2) {
        const y = P(M.lon0, lat)[1];
        nou('line', { x1: 0, y1: y.toFixed(1), x2: M.W, y2: y.toFixed(1), class: 'linia-lat ' + cls }, gCarta);
        if (opts.etiquetesLat !== false) {
          const t = nou('text', { x: 10, y: (y - 5).toFixed(1), class: 'lat-t' }, gCarta);
          t.textContent = nom;
        }
      }
    });

    // Contorns terrestres amb halo suau costaner
    nou('path', { d: M.d, class: 'terra-halo' }, svg);
    nou('path', { d: M.d, class: 'terra' }, svg);
    cont.appendChild(svg);

    // Els ports bateguen uns segons cada vegada que el mapa es mostra, fins que se'n toca un
    let tocat = false;
    const convida = () => {
      if (tocat || !cont.offsetParent || !svg.querySelector('.port.clicable')) return;
      svg.classList.remove('convida'); void svg.getBoundingClientRect(); svg.classList.add('convida');
    };
    requestAnimationFrame(convida);
    window.addEventListener('especies:tab', () => requestAnimationFrame(convida));

    const capes = {};
    const capa = (nom) => capes[nom] || (capes[nom] = nou('g', { class: 'capa-' + nom }, svg));

    // Rosa dels vents discreta en línia SVG
    if (opts.rosa !== false) {
      const pos = opts.rosa || 'bl';
      const rx = pos.includes('r') ? M.W - 38 : 38;
      const ry = pos.includes('t') ? 38 : M.H - 38;
      const gR = nou('g', { class: 'rosa-vents', transform: `translate(${rx},${ry})`, 'aria-hidden': 'true' }, svg);
      nou('circle', { r: 20, cx: 0, cy: 0 }, gR);
      nou('path', { d: 'M0,-22 L3,-4 L22,0 L3,4 L0,22 L-3,4 L-22,0 L-3,-4 Z' }, gR);
      nou('path', { d: 'M0,-22 L3,-4 L0,0 L-3,-4 Z', class: 'nord' }, gR);
      const tn = nou('text', { x: 0, y: -25, 'text-anchor': 'middle' }, gR);
      tn.textContent = 'N';
    }

    const api = {
      svg, P, capa, nou, distKm,
      text(lon, lat, t, cls, pare) { const [x, y] = P(lon, lat); const e = nou('text', { x, y, class: cls || 'mar-t', 'text-anchor': 'middle' }, pare || capa('textos')); e.textContent = t; return e; },
      /* punts: [[lon,lat],...]; corba suau amb Catmull-Rom */
      ruta(punts, attrs, pare) {
        const p = punts.map(([a, b]) => P(a, b));
        let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
        for (let i = 0; i < p.length - 1; i++) {
          const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
          const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
          const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
          d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
        }
        return nou('path', Object.assign({ d, class: 'ruta' }, attrs || {}), pare || capa('rutes'));
      },
      /* arc suau entre dos punts [lon,lat] */
      arc(p1, p2, attrs, pare) {
        const [x1, y1] = P(p1[0], p1[1]), [x2, y2] = P(p2[0], p2[1]);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const dist = Math.hypot(x2 - x1, y2 - y1);
        const curv = Math.min(90, dist * 0.18);
        const d = `M${x1.toFixed(1)},${y1.toFixed(1)} Q${mx.toFixed(1)},${(my - curv).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
        return nou('path', Object.assign({ d, class: 'ruta arc-dist' }, attrs || {}), pare || capa('rutes'));
      },
      /* port; només és clicable/interactiu si té onSel */
      port(lon, lat, nom, opt) {
        opt = opt || {};
        const [x, y] = P(lon, lat);
        const clicable = typeof opt.onSel === 'function';
        const attrs = { class: 'port' + (clicable ? ' clicable' : '') };
        if (clicable && opt.focus !== false) { attrs.tabindex = '0'; attrs.role = 'button'; attrs['aria-label'] = nom; }
        const g = nou('g', attrs, capa('ports'));
        if (clicable) nou('circle', { cx: x, cy: y, r: 14, class: 'hit' }, g);
        nou('circle', { cx: x, cy: y, r: opt.r || 6.5, class: 'punt' }, g);
        const t = nou('text', { x: x + (opt.dx != null ? opt.dx : 10), y: y + (opt.dy != null ? opt.dy : 4), 'text-anchor': opt.anchor || 'start' }, g);
        t.textContent = nom;
        if (opt.color) g.querySelector('circle.punt').style.fill = opt.color;
        if (clicable) {
          const tria = () => { tocat = true; svg.classList.remove('convida'); opt.onSel(g); };
          g.addEventListener('click', tria);
          g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tria(); } });
        }
        return g;
      },
      /* llegenda dins del mapa: [{ c: color, t: text, tipus: 'linia' | 'discont' | 'punt' | 'franja' | 'fletxa' }] */
      llegenda(items, pos) {
        const d = document.createElement('div');
        d.className = 'mapa-llegenda pos-' + (pos || 'tr');
        d.innerHTML = items.map(it => `<span class="ll-it"><i class="ll-m ${it.tipus || 'linia'}" style="--c:${it.c}"></i>${it.t}</span>`).join('');
        cont.appendChild(d);
        return d;
      },
      fletxa(id, color) {
        let defs = svg.querySelector('defs') || nou('defs', {}, svg);
        if (defs.querySelector('#' + id)) return `url(#${id})`;
        const m = nou('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' }, defs);
        nou('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, m);
        return `url(#${id})`;
      },
      /* icona minimalista de vaixell per a rutes animades */
      vaixell() {
        const g = nou('g', { class: 'vaixell-m', 'aria-hidden': 'true' }, capa('vaixell'));
        nou('circle', { r: 12, cx: 0, cy: 0, class: 'halo' }, g);
        nou('path', { d: 'M-8,3 L8,3 L5.5,7.5 L-5.5,7.5 Z', class: 'casc' }, g);
        nou('path', { d: 'M0,3 L0,-9 M0,-8 L7,1 L0,1 Z M-1,-5 L-6,1 L-1,1 Z', class: 'vela' }, g);
        return g;
      },
      posaVaixell(v, path, f) {
        const L = path.getTotalLength();
        const pt = path.getPointAtLength(Math.max(0, Math.min(L, L * f)));
        v.setAttribute('transform', `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)})`);
      },
      posaVaixellTrams(v, paths, llarg, total, f) {
        let rest = Math.max(0, Math.min(1, f)) * total;
        for (let i = 0; i < paths.length; i++) {
          const L = llarg[i];
          if (rest <= L || i === paths.length - 1) {
            const pt = paths[i].getPointAtLength(Math.max(0, Math.min(L, rest)));
            v.setAttribute('transform', `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)})`);
            return;
          }
          rest -= L;
        }
      },
      /* fracció aproximada del recorregut fins al punt d'índex k (per longitud de la poligonal) */
      fr(punts, k) {
        const p = punts.map(([a, b]) => P(a, b)); let tot = 0, fins = 0;
        for (let i = 1; i < p.length; i++) { const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); tot += d; if (i <= k) fins += d; }
        return tot ? fins / tot : 0;
      },
      /* anima el traç d'una ruta fins a la fracció f (0-1) */
      traça(path, f) {
        const L = path.getTotalLength();
        path.style.strokeDasharray = `${L} ${L}`;
        path.style.strokeDashoffset = String(L * (1 - f));
      }
    };
    return api;
  }
  window.Mapa = Mapa;
})();
