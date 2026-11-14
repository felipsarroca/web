// SPDX-License-Identifier: AGPL-3.0-or-later
/* El cotó · pintor realista dels sis mecanismes.
   Fa servir la mateixa geometria i els mateixos estats que el model verificat
   (textil-models.js i textil-estats.js), però dibuixa la màquina sencera, gran,
   amb fusta, ferro i llautó texturats i il·luminats segons l'orientació de cada cara. */
(function () {
  'use strict';
  const G = RI.TEXTIL_GEOMETRIA; if (!G || !RI.TEX) return;
  const { Scene, project, depth, camera, models } = G;
  const INK = '#2e221a';
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const unit = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const LLUM = unit([-0.5, -0.62, 0.6]);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const n1 = (v) => Math.round(v * 10) / 10;

  /* cada cara recorda el material i la normal, per poder-la il·luminar */
  if (!Scene.prototype._ri) {
    const orig = Scene.prototype.poly;
    Scene.prototype.poly = function (points, mat, part, normal, smooth) {
      const n = this.faces.length; orig.call(this, points, mat === undefined ? 'oak' : mat, part === undefined ? '' : part, normal === undefined ? [0, -1, 0] : normal, !!smooth);
      if (this.faces.length > n) { const f = this.faces[n]; f.mat = mat === undefined ? 'oak' : mat; f.normal = normal === undefined ? [0, -1, 0] : normal; }
    };
    Scene.prototype._ri = true;
  }

  /* patrons de textura en cinc nivells de llum */
  const TEXS = { oak: 'fusta', end: 'fustaf', iron: 'ferro', brass: 'llauto', dark: 'ferro' };
  const NIV = [['#000', 0.42], ['#000', 0.22], ['#000', 0], ['#fff', 0.14], ['#fff', 0.3]];
  const defs = (() => {
    let s = '';
    ['fusta', 'fustaf', 'ferro', 'llauto'].forEach((n) => { const t = RI.TEX[n], k = n === 'ferro' || n === 'llauto' ? 0.5 : 0.62; NIV.forEach(([c, a], i) => { ['', 'v'].forEach((v) => { s += `<pattern id="t3-${n}${v}-${i}" width="${t.w}" height="${t.h}" patternUnits="userSpaceOnUse" patternTransform="${v ? 'rotate(90) ' : ''}scale(${k})"><image href="${t.url}" width="${t.w}" height="${t.h}" preserveAspectRatio="none"/>${a ? `<rect width="${t.w}" height="${t.h}" fill="${c}" opacity="${a}"/>` : ''}</pattern>`; }); }); });
    return `<defs>${s}</defs>`;
  })();
  const PLA = { cotton: [244, 236, 214], red: [200, 85, 58] };
  /* els fils del model original són molt pàl·lids: aquí guanyen contrast */
  const FILS = { '#9eafa5': '#5f7a58', '#e7eee1': '#dcebd0', '#aab9a6': '#7f9a78', '#347e77': '#2f6f68', '#a47831': '#7a5a1c', '#f5d68a': '#f0c552', '#946d32': '#7a5a1c', '#c2a46a': '#7a5a1c', '#fff9e9': '#f6e2a4', '#b89349': '#9a7424', '#718f96': '#3f6670', '#aab9b2': '#7f9ea6', '#ba684b': '#c8553a', '#914f37': '#8a2f1c', '#d5724e': '#d9583a', '#8b7451': '#6b4a2c', '#8c7251': '#6b4a2c', '#8b7250': '#6b4a2c', '#8f754f': '#6b4a2c', '#d5c7ac': '#b9a988', '#abb3af': '#7d8a92', '#a7b0af': '#7d8a92', '#bdb19a': '#a8996f', '#baa271': '#a8893f', '#d7c6a4': '#e9ead8' };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16));
  const rgb = (c, k) => `rgb(${c.map((v) => Math.round(clamp(v * k, 0, 255))).join(',')})`;

  /* encaix de la màquina sencera dins del quadre */
  const fits = new Map();
  function fit(id) {
    if (fits.has(id)) return fits.get(id);
    const pts = [];
    for (const p of [0, 0.2, 0.45, 0.6, 0.8, 0.98]) { const g = new Scene(); models[id](g, p, p * 10); g.faces.forEach((f) => f.points.forEach((v) => pts.push(project(v)))); }
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]), x = Math.min(...xs), y = Math.min(...ys), w = Math.max(...xs) - x, h = Math.max(...ys) - y;
    const s = Math.min(850 / w, 468 / h), v = { s, dx: 600 - (x + w / 2) * s, dy: 352 - (y + h / 2) * s, x0: 600 - (w * s) / 2, x1: 600 + (w * s) / 2, y1: 352 + (h * s) / 2 };
    fits.set(id, v); return v;
  }

  function pinta(g, f, sel, focus) {
    const T = (v) => { const q = project(v); return [f.dx + q[0] * f.s, f.dy + q[1] * f.s]; };
    return g.faces.slice().sort((a, b) => a.d - b.d).map((c) => {
      const pts = c.points.map(T), cls = c.part ? ` data-part="${c.part}" class="${focus.includes(c.part) ? 'foc' : ''}${sel === c.part ? ' sel' : ''}"` : '';
      const ps = pts.map((q) => n1(q[0]) + ',' + n1(q[1])).join(' ');
      if (c.color) { // fils, corretges i vores
        const fil = /^#(f|e|d|c)/i.test(c.color) && c.width > 1.6, w = Math.max(1.1, c.width * f.s * (fil ? 1.5 : 1.3));
        return `<polyline${cls} points="${ps}" fill="none" stroke="${FILS[c.color] || c.color}" stroke-width="${n1(w)}" stroke-linecap="round" stroke-linejoin="round"${c.dash ? ` stroke-dasharray="${c.dash}" stroke-dashoffset="${c.offset || 0}"` : ''}/>`;
      }
      const k = dot(unit(c.normal || [0, -1, 0]), LLUM), niv = clamp(Math.round((k + 0.35) * 3.1), 0, 4), tex = TEXS[c.mat];
      let fill;
      if (tex) {
        // la veta segueix l'aresta més llarga de la cara
        let v = '';
        if (tex.indexOf('fusta') === 0 && !c.smooth) { let m = 0; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length], l = Math.hypot(b[0] - a[0], b[1] - a[1]); if (l > m) { m = l; v = Math.abs(b[1] - a[1]) > Math.abs(b[0] - a[0]) * 1.2 ? 'v' : ''; } } }
        fill = `url(#t3-${tex}${v}-${niv})`;
      } else fill = rgb(PLA[c.mat] || (/^#/.test(c.mat || '') ? hex(c.mat) : hex(c.fill || '#cbb79a')), 0.6 + 0.11 * niv);
      const a = c.alpha ? ` opacity="${c.alpha}"` : '';
      return `<polygon${cls} points="${ps}" fill="${fill}"${a} stroke="${c.smooth ? fill : INK}" stroke-width="${c.smooth ? 0.7 : 1.1}" stroke-linejoin="round"${c.smooth ? '' : ' stroke-opacity=".75"'}/>`;
    }).join('');
  }

  /* etiquetes: una per peça, a banda i banda de la màquina */
  function etiquetes(id, e, f) {
    const g = new Scene(); models[id](g, 0.3, 3);
    const acc = {};
    g.faces.forEach((c) => { if (!c.part || !e.parts || !e.parts[c.part]) return; const a = acc[c.part] || (acc[c.part] = { x: 0, y: 0, n: 0 }); c.points.forEach((v) => { const q = project(v); a.x += f.dx + q[0] * f.s; a.y += f.dy + q[1] * f.s; a.n++; }); });
    const ll = Object.keys(acc).map((k) => ({ k, x: acc[k].x / acc[k].n, y: acc[k].y / acc[k].n })), out = [];
    [ll.filter((p) => p.x < 600), ll.filter((p) => p.x >= 600)].forEach((col, dreta) => {
      col.sort((a, b) => a.y - b.y); let prev = 110;
      col.forEach((p) => { const y = clamp(Math.max(prev, p.y - 20), 120, 590); prev = y + 36; out.push([p.k, dreta ? Math.min(1150, f.x1 + 90) : Math.max(50, f.x0 - 90), y, n1(p.x), n1(p.y)]); });
    });
    return out;
  }

  const SORTIDA = {
    roda: () => 'Fibres soltes → fil torçut → fil recollit', jenny: () => 'Una roda, vuit fusos: vuit fils alhora', water: () => 'Quatre caps filant en continu', mula: () => 'Corrons i carro coordinats: sis fusos',
    llancadora: (s) => (s.rows === 1 ? '1 passada incorporada a la tela' : s.rows + ' passades incorporades a la tela'), cartwright: (s) => (s.rows === 1 ? '1 passada incorporada a la tela' : s.rows + ' passades incorporades a la tela')
  };
  function svg(id) {
    const e = RI.TEXTIL_ESCENES[id], f = fit(id), g = new Scene(); models[id](g, 0, 0);
    e.etiquetes = etiquetes(id, e, f); e.model = 'Màquina sencera en moviment · reconstrucció didàctica amb proporcions simplificades';
    const s = `${defs}${RI.fons(0)}<ellipse cx="600" cy="${n1(f.y1 + 6)}" rx="${n1((f.x1 - f.x0) * 0.56)}" ry="22" fill="#2e221a" opacity=".13" filter="url(#f-difus)"/><g id="tx-detail">${pinta(g, f, null, [])}</g>`;
    return RI.svg(s).replace('class="esc"', 'class="esc tx3"');
  }
  function anima(id) {
    return ({ p, t, k, svg: arrel, sel }) => {
      const stamp = [Math.floor(t * 24), k, sel, p >= 0.999].join(':');
      if (arrel.dataset.txFrame === stamp) return; arrel.dataset.txFrame = stamp;
      const e = RI.TEXTIL_ESCENES[id], focus = (e.fases[k] && e.fases[k].focus) || [], f = fit(id), g = new Scene(); models[id](g, p, t);
      arrel.querySelector('#tx-detail').innerHTML = pinta(g, f, sel, focus);
      const estat = RI.TEXTIL_ESTATS[id]; if (!estat) return;
      const s = estat(p), action = document.querySelector('#tx-action'), product = document.querySelector('#tx-product');
      if (action && action.textContent !== s.action) action.textContent = s.action;
      const out = (SORTIDA[id] || (() => ''))(s); if (product && product.textContent !== out) product.textContent = out;
      arrel.dataset.phase = e.fases[k] ? e.fases[k].nom : '';
    };
  }
  RI.TEXTIL_REALISTA = { svg, anima, fit };
  Object.keys(RI.TEXTIL_ESCENES || {}).forEach((id) => { if (!models[id]) return; const e = RI.TEXTIL_ESCENES[id]; e.svg = () => svg(id); e.anima = anima(id); });
})();
