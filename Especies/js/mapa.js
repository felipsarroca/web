/* SPDX-License-Identifier: CC-BY-NC-SA-4.0 */
/* Mapes SVG a partir dels contorns de Natural Earth (js/mapes-dades.js) */
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  function nou(tag, attrs, pare) { const e = document.createElementNS(NS, tag); for (const k in attrs || {}) e.setAttribute(k, attrs[k]); if (pare) pare.appendChild(e); return e; }

  /* Crea el mapa dins `cont`. Retorna { svg, P(lon,lat) → [x,y], capa(nom), port(...), ruta(...) } */
  function Mapa(cont, vista, opts) {
    opts = opts || {};
    const M = window.MAPES[vista];
    const svg = nou('svg', { viewBox: `0 0 ${M.W} ${M.H}`, role: 'img', 'aria-label': opts.titol || 'Mapa' });
    nou('title', {}, svg).textContent = opts.titol || 'Mapa';
    nou('path', { d: M.d, class: 'terra' }, svg);
    cont.appendChild(svg);
    const P = (lon, lat) => [(lon - M.lon0) / (M.lon1 - M.lon0) * M.W, (M.lat1 - lat) / (M.lat1 - M.lat0) * M.H];
    const capes = {};
    const capa = (nom) => capes[nom] || (capes[nom] = nou('g', { class: 'capa-' + nom }, svg));
    const api = {
      svg, P, capa, nou,
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
      /* port clicable; dx/dy desplacen l'etiqueta */
      port(lon, lat, nom, opt) {
        opt = opt || {};
        const [x, y] = P(lon, lat);
        const g = nou('g', { class: 'port', tabindex: opt.focus === false ? '-1' : '0', role: 'button', 'aria-label': nom }, capa('ports'));
        nou('circle', { cx: x, cy: y, r: opt.r || 6.5 }, g);
        const t = nou('text', { x: x + (opt.dx != null ? opt.dx : 10), y: y + (opt.dy != null ? opt.dy : 4), 'text-anchor': opt.anchor || 'start' }, g);
        t.textContent = nom;
        if (opt.color) g.querySelector('circle').style.fill = opt.color;
        if (opt.onSel) {
          g.addEventListener('click', () => opt.onSel(g));
          g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.onSel(g); } });
        }
        return g;
      },
      fletxa(id, color) {
        let defs = svg.querySelector('defs') || nou('defs', {}, svg);
        const m = nou('marker', { id, viewBox: '0 0 10 10', refX: 7, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' }, defs);
        nou('path', { d: 'M0,0 L10,5 L0,10 z', fill: color }, m);
        return `url(#${id})`;
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
