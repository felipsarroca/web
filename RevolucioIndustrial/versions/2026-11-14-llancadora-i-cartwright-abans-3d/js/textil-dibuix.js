// SPDX-License-Identifier: AGPL-3.0-or-later
/* La Revolució Industrial — El cotó: talls tècnics animats en 2D.
   Substitueix el renderitzador oblic anterior per seccions i vistes netes
   amb textures reals (RI.MATS) perquè s'hi vegi amb claredat cada mecanisme
   i la innovació històrica que aporta. */
(function () {
  'use strict';
  const RI = window.RI;
  const INK = '#2e221a';
  const f1 = (n) => Math.round(n * 10) / 10;
  const lerp = (a, b, k) => a + (b - a) * k;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const S = (id, p) => RI.TEXTIL_ESTATS[id](p);
  const { caixa, cami, tub, brida, reblons, rodaR, engranatgeR, ombra, cartell, fletxa } = RI;

  const EXTRA_DEFS = `<defs>
    <linearGradient id="tx-cotobob" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9bfa6"/><stop offset=".35" stop-color="#fffdf5"/><stop offset=".75" stop-color="#ebe1c8"/><stop offset="1" stop-color="#b4a78b"/></linearGradient>
    <linearGradient id="tx-cotometxa" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b4c2ad"/><stop offset=".4" stop-color="#eef5e6"/><stop offset="1" stop-color="#9fb198"/></linearGradient>
    <linearGradient id="tx-tela" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7efe0"/><stop offset="1" stop-color="#dfd2b4"/></linearGradient>
    <linearGradient id="tx-peça-fons" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf7"/><stop offset="1" stop-color="#f5ecd8"/></linearGradient>
  </defs>`;

  function taller(floorY = 562) {
    return `${RI.fons(0)}<rect x="-60" y="${floorY}" width="1320" height="${720 - floorY}" fill="#e6dac0" opacity=".78"/><line x1="-60" y1="${floorY}" x2="1260" y2="${floorY}" stroke="#b9a988" stroke-width="2"/>`;
  }

  function badge(x, y, text, fons = '#2e221a', color = '#fff', extra = '') {
    const w = Math.max(54, text.length * 7.8 + 20);
    return `<g ${extra}><rect x="${f1(x - w / 2)}" y="${f1(y - 13)}" width="${f1(w)}" height="26" rx="13" fill="${fons}" stroke="#fffcf5" stroke-width="1.5"/><text x="${f1(x)}" y="${f1(y + 4.5)}" text-anchor="middle" font-size="13" font-weight="700" fill="${color}">${text}</text></g>`;
  }

  /* Corretja tangent exterior entre dues politges (centres x1,y1,r1 i x2,y2,r2). */
  function tangents(x1, y1, r1, x2, y2, r2) {
    const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1;
    const q = clamp((r1 - r2) / d, -0.99, 0.99), h = Math.sqrt(1 - q * q);
    const ux = dx / d, uy = dy / d;
    return [-1, 1].map((s) => {
      const nx = q * ux - s * h * uy, ny = q * uy + s * h * ux;
      return [x1 + r1 * nx, y1 + r1 * ny, x2 + r2 * nx, y2 + r2 * ny];
    });
  }
  function corretjaHTML(x1, y1, r1, x2, y2, r2, id, part) {
    const [[ax1, ay1, ax2, ay2], [bx1, by1, bx2, by2]] = tangents(x1, y1, r1, x2, y2, r2);
    const d1 = `M${f1(ax1)} ${f1(ay1)}L${f1(ax2)} ${f1(ay2)}`;
    const d2 = `M${f1(bx2)} ${f1(by2)}L${f1(bx1)} ${f1(by1)}`;
    return `<g data-part="${part}">
      <path d="${d1}" stroke="${INK}" stroke-width="6.5" stroke-linecap="round" fill="none"/>
      <path d="${d1}" stroke="#7a4e2c" stroke-width="4.2" stroke-linecap="round" fill="none"/>
      <path id="${id}-a" d="${d1}" stroke="#e7cca0" stroke-width="2" stroke-dasharray="7 13" stroke-linecap="round" fill="none"/>
      <path d="${d2}" stroke="${INK}" stroke-width="6.5" stroke-linecap="round" fill="none"/>
      <path d="${d2}" stroke="#7a4e2c" stroke-width="4.2" stroke-linecap="round" fill="none"/>
      <path id="${id}-b" d="${d2}" stroke="#e7cca0" stroke-width="2" stroke-dasharray="7 13" stroke-linecap="round" fill="none"/>
    </g>`;
  }

  /* Corró d'estiratge en secció lateral amb línies de gir visibles i engranatge opcional. */
  function corroHTML(cx, cy, r, id, part, opts = {}) {
    const tex = opts.cuir ? 'fustaf' : 'ferro';
    return `<g data-part="${part}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#tx-${tex})" stroke="${INK}" stroke-width="1.8"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sh-bola)" opacity=".55"/>
      <g id="${id}">
        <line x1="${cx - r + 3}" y1="${cy}" x2="${cx + r - 3}" y2="${cy}" stroke="#fff" stroke-width="2.2" stroke-opacity=".75" stroke-linecap="round"/>
        <line x1="${cx}" y1="${cy - r + 3}" x2="${cx}" y2="${cy + r - 3}" stroke="${INK}" stroke-width="2" stroke-opacity=".55" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy - r * 0.52}" r="2.6" fill="#d97706"/>
      </g>
      <circle cx="${cx}" cy="${cy}" r="5.5" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
    </g>`;
  }

  /* Mà senzilla i neta de taller (origen al canell o palmell). */
  function maHTML(id, part, flip = false) {
    const sx = flip ? -1 : 1;
    return `<g id="${id}" data-part="${part}"><g transform="scale(${sx} 1)">
      <path d="M-24 -7C-10 -12 8 -10 17 -3L24 3C26 6 22 10 17 8L9 4L14 10C15 13 11 16 7 13L-2 8C-9 11 -18 10 -24 5Z" fill="#e6bc98" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-8 -4L10 -1" stroke="#c8946d" stroke-width="1.4" stroke-linecap="round"/>
    </g></g>`;
  }

  /* Bobina vertical vista de costat. */
  function bobinaHTML(cx, cy, w, h, metxa, part) {
    const bw = w + 12, fill = metxa ? 'url(#tx-cotometxa)' : 'url(#tx-cotobob)';
    return `<g data-part="${part}">
      ${caixa(cx - w / 2, cy - h / 2, w, h, 'fustac', 'cil', { vora: 0.01 })}
      <rect x="${f1(cx - w / 2)}" y="${f1(cy - h / 2)}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${INK}" stroke-width="1.4"/>
      <path d="M${f1(cx - w / 2 + 3)} ${f1(cy - h * 0.25)}H${f1(cx + w / 2 - 3)}M${f1(cx - w / 2 + 3)} ${cy}H${f1(cx + w / 2 - 3)}M${f1(cx - w / 2 + 3)} ${f1(cy + h * 0.25)}H${f1(cx + w / 2 - 3)}" stroke="#8d8167" stroke-width="1" opacity=".55"/>
      ${caixa(cx - bw / 2, cy - h / 2 - 7, bw, 7, 'fustaf', 'tub', { rx: 2 })}
      ${caixa(cx - bw / 2, cy + h / 2, bw, 7, 'fustaf', 'tub', { rx: 2 })}
      <circle cx="${cx}" cy="${f1(cy - h / 2 - 11)}" r="4" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.1"/>
    </g>`;
  }

  /* Con de fil (cop) sobre un fus: es dibuixa el contorn i les línies espirals dinàmiques dins d'un grup. */
  function copPath(cx, baseY, h, r) {
    const tipY = baseY - h, midY = baseY - h * 0.24;
    return `M${f1(cx - r * 0.55)} ${baseY}Q${f1(cx - r * 1.05)} ${f1(midY)} ${f1(cx - 2.5)} ${tipY}H${f1(cx + 2.5)}Q${f1(cx + r * 1.05)} ${f1(midY)} ${f1(cx + r * 0.55)} ${baseY}Z`;
  }
  function copSpiral(cx, baseY, h, r, ang) {
    let s = '';
    for (let i = 0; i < 6; i++) {
      const f = 0.14 + i * 0.13, y = baseY - h * f;
      const rw = r * (f < 0.24 ? lerp(0.55, 1, f / 0.24) : lerp(1, 0.12, (f - 0.24) / 0.76));
      const x = cx + Math.sin(ang + i * 1.1) * rw * 0.82;
      s += `<path d="M${f1(cx - rw * 0.85)} ${f1(y + 2)}Q${f1(x)} ${f1(y - 3)} ${f1(cx + rw * 0.85)} ${f1(y + 1)}" fill="none" stroke="#a68a4d" stroke-width="1.1" opacity=".7"/>`;
    }
    return s;
  }

  /* Metxa de cotó cardat (amb fibres individuals de longitud constant que llisquen). */
  function fibresHTML(x1, y1, x2, y2, w1, w2, q) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
    const p = [
      [x1 + nx * w1 * 0.5, y1 + ny * w1 * 0.5],
      [x2 + nx * w2 * 0.5, y2 + ny * w2 * 0.5],
      [x2 - nx * w2 * 0.5, y2 - ny * w2 * 0.5],
      [x1 - nx * w1 * 0.5, y1 - ny * w1 * 0.5]
    ].map((pt) => pt.map(f1).join(',')).join(' ');
    let s = `<polygon points="${p}" fill="#e6efe0" stroke="#6d8768" stroke-width="1.6" stroke-linejoin="round"/>`;
    const fl = Math.min(28, len * 0.45);
    for (let i = 0; i < 9; i++) {
      const f = ((i / 9 + q) % 1 + 1) % 1;
      const d = Math.max(0, len - fl) * f;
      const wHere = lerp(w1, w2, d / len) * 0.34;
      const off = Math.sin(i * 2.1) * wHere;
      const sx = x1 + ux * d + nx * off, sy = y1 + uy * d + ny * off;
      s += `<line x1="${f1(sx)}" y1="${f1(sy)}" x2="${f1(sx + ux * fl)}" y2="${f1(sy + uy * fl)}" stroke="${i === 3 ? '#2c6f68' : '#8ea688'}" stroke-width="${i === 3 ? 2.4 : 1.2}" stroke-linecap="round"/>`;
    }
    return s;
  }

  /* Fil torçut amb ona helicoïdal visible. */
  function filTorcutHTML(x1, y1, x2, y2, ang, twist = 1, thick = 3.2) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
    const steps = Math.max(18, Math.round(len / 9));
    let wave = '';
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, px = lerp(x1, x2, t), py = lerp(y1, y2, t);
      const off = Math.sin(i * 0.85 - ang * 2.4) * 2.3 * twist;
      wave += (i ? 'L' : 'M') + `${f1(px + nx * off)} ${f1(py + ny * off)}`;
    }
    return `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#8c6724" stroke-width="${thick + 2.2}" stroke-linecap="round"/>
      <line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#f6d88a" stroke-width="${thick}" stroke-linecap="round"/>
      <path d="${wave}" fill="none" stroke="#855e18" stroke-width="1.2" opacity=".88"/>`;
  }

  /* ==================== 1. LA RODA DE FILAR ==================== */
  function svgRoda() {
    let s = EXTRA_DEFS + taller(558);
    s += ombra(595, 565, 420, 9);

    // Banc i suports (bastidor)
    s += `<g data-part="bastidor">
      ${caixa(238, 468, 22, 90, 'fustaf', 'cil')}${caixa(892, 468, 22, 90, 'fustaf', 'cil')}
      ${caixa(204, 464, 26, 94, 'fusta-v', 'cil')}${caixa(922, 464, 26, 94, 'fusta-v', 'cil')}
      ${caixa(182, 444, 792, 26, 'fusta', 'tub', { rx: 3 })}
      ${reblons(216, 457, 216, 457, 1, 3, '#6b4423')}${reblons(935, 457, 935, 457, 1, 3, '#6b4423')}
      ${caixa(266, 286, 20, 160, 'fusta-v', 'cil')}${caixa(368, 286, 20, 160, 'fusta-v', 'cil')}
      ${caixa(816, 272, 24, 174, 'fusta-v', 'cil')}
      ${cami('M786 444L816 382V444Z', 'fustaf', 'pla')}
    </g>`;

    // Corretja de transmissió (roda r=148 a (828,288) -> politja r=18 a (348,308))
    s += corretjaHTML(828, 288, 148, 348, 308, 18, 'rd-belt', 'corretja');
    s += badge(578, 174, '1 volta roda → ~9 voltes fus', '#6f4e28', '#fff');

    // Roda gran amb manovella
    s += `<g data-part="roda">
      <g id="rd-wheel">${rodaR(828, 288, 156, { raigs: 10, tex: 'fusta', gruix: 17, raig: 8, boto: 24, pern: 'llauto' })}
        <line x1="828" y1="288" x2="870" y2="288" stroke="#3c4349" stroke-width="7" stroke-linecap="round"/>
        <circle cx="870" cy="288" r="9" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.6"/>
      </g>
      <path d="M998 232A180 180 0 0 1 1006 336" fill="none" stroke="#b45309" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#m-fl)"/>
      <text x="1028" y="286" class="tx-p" fill="#92400e">gir a mà</text>
    </g>`;

    // Fus horitzontal, politja petita i con de fil que creix
    s += `<g data-part="fus">
      ${tub('M174 308H398', 7, 'plom', { cap: 'round' })}
      <polygon points="154,308 176,304 176,312" fill="#bfc8cf" stroke="${INK}" stroke-width="1.2"/>
      ${caixa(266, 298, 20, 20, 'llauto', 'cil', { rx: 3 })}${caixa(368, 298, 20, 20, 'llauto', 'cil', { rx: 3 })}
      <g id="rd-cop"></g>
      <circle cx="348" cy="308" r="18" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.8"/>
      <g id="rd-whorl"><line x1="333" y1="308" x2="363" y2="308" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><circle cx="348" cy="296" r="2.8" fill="#d97706"/></g>
      <circle cx="348" cy="308" r="5" fill="#2e221a"/>
    </g>`;

    // Fibra, fil i mà que estira i canvia d'angle
    s += `<g data-part="fibra">
      <path id="rd-angle-arc" d="M126 320A48 48 0 0 1 142 260" fill="none" stroke="#d97706" stroke-width="2.4" stroke-dasharray="4 4" opacity="0"/>
      <g id="rd-fibre"></g>
      <g id="rd-floc">
        <path d="M-48 -6C-58 -18 -40 -28 -26 -20C-18 -30 4 -26 6 -12C14 -8 10 8 -4 10C-18 14 -42 12 -48 -6Z" fill="#eef4e6" stroke="#7d9678" stroke-width="1.6"/>
        <path d="M-38 -8Q-22 -14 -8 -4M-32 2Q-18 -2 -6 4" stroke="#99b093" stroke-width="1.2" fill="none"/>
      </g>
      ${maHTML('rd-hand', 'fibra')}
    </g>`;

    // Detall explicatiu a la dreta (com es fa un fil)
    s += `<g transform="translate(1035, 385)">
      <rect x="-15" y="-22" width="215" height="156" rx="12" fill="url(#tx-peça-fons)" stroke="#d6cbb5" stroke-width="1.5"/>
      <text x="92" y="2" text-anchor="middle" font-size="13.5" font-weight="800" fill="#6f4e28">Un fil en dos temps</text>
      <g id="rd-detall-pass"></g>
    </g>`;

    return RI.svg(s);
  }

  function animaRoda() {
    return ({ p, el }) => {
      const s = S('roda', p);
      const deg = (s.angle * 180) / Math.PI;
      const sdeg = (s.spindleAngle * 180) / Math.PI;
      el('rd-wheel').setAttribute('transform', `rotate(${f1(deg)} 828 288)`);
      el('rd-whorl').setAttribute('transform', `rotate(${f1(sdeg)} 348 308)`);
      const beltOff = (-s.angle * 150).toFixed(1);
      el('rd-belt-a').style.strokeDashoffset = beltOff;
      el('rd-belt-b').style.strokeDashoffset = beltOff;

      // Con de fil al fus horitzontal (x=252..330, y=308)
      const r = 10 + 17 * s.wind;
      const copEl = el('rd-cop');
      let cs = `<path d="M330 ${f1(308 - r * 0.55)}Q288 ${f1(308 - r * 1.05)} 248 304V312Q288 ${f1(308 + r * 1.05)} 330 ${f1(308 + r * 0.55)}Z" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.5"/>`;
      for (let i = 0; i < 6; i++) {
        const f = 0.18 + i * 0.13, x = lerp(248, 330, f);
        const rw = r * (f < 0.72 ? lerp(0.18, 1, f / 0.72) : lerp(1, 0.58, (f - 0.72) / 0.28));
        const y = 308 + Math.sin(s.spindleAngle + i * 1.2) * rw * 0.8;
        cs += `<path d="M${f1(x)} ${f1(308 - rw * 0.82)}Q${f1(x + 3)} ${f1(y)} ${f1(x)} ${f1(308 + rw * 0.82)}" fill="none" stroke="#9e8245" stroke-width="1.1" opacity=".7"/>`;
      }
      copEl.innerHTML = cs;

      // Posició de la mà: estira a l'esquerra (p<.57), puja en angle (.57-.72), acosta al con (.72-.97)
      let hx, hy;
      if (p < 0.57) {
        hx = lerp(136, 28, s.draw);
        hy = lerp(332, 392, s.draw);
      } else if (p < 0.72) {
        hx = lerp(28, 128, s.guide);
        hy = lerp(392, 232, s.guide);
      } else {
        hx = lerp(128, 212, s.wind);
        hy = lerp(232, 278, s.wind);
      }
      el('rd-hand').setAttribute('transform', `translate(${f1(hx)} ${f1(hy)})`);
      el('rd-floc').setAttribute('transform', `translate(${f1(hx - 4)} ${f1(hy - 2)})`);
      el('rd-angle-arc').setAttribute('opacity', p >= 0.56 && p < 0.74 ? '1' : '0');

      const endX = lerp(158, 294, s.guide), endY = 308;
      if (p < 0.57) {
        const midX = lerp(hx + 14, endX, 0.55 - 0.35 * s.draw);
        const midY = lerp(hy - 2, endY, 0.55 - 0.35 * s.draw);
        el('rd-fibre').innerHTML =
          fibresHTML(hx + 14, hy - 2, midX, midY, 13, lerp(11, 4.5, s.draw), s.draw * 0.6) +
          filTorcutHTML(midX, midY, endX, endY, s.spindleAngle * 0.25, Math.max(0.25, s.draw), 3.4);
      } else {
        el('rd-fibre').innerHTML = filTorcutHTML(hx + 14, hy - 2, endX, endY, s.spindleAngle * 0.25, 1, 3.6);
      }

      // Quadre resum d'estiratge vs recollida
      const winding = p >= 0.68;
      el('rd-detall-pass').innerHTML = `
        <rect x="0" y="18" width="185" height="44" rx="8" fill="${!winding ? '#edf4e7' : '#f7f1e1'}" stroke="${!winding ? '#5b8c35' : '#d6cbb5'}" stroke-width="1.5"/>
        <text x="92" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="${!winding ? '#355c1c' : '#787166'}">1 · Estirar i tòrcer</text>
        <text x="92" y="54" text-anchor="middle" font-size="11.5" fill="#4a4139">El fil rellisca per la punta</text>
        <rect x="0" y="72" width="185" height="44" rx="8" fill="${winding ? '#fff2cc' : '#f7f1e1'}" stroke="${winding ? '#b45309' : '#d6cbb5'}" stroke-width="1.5"/>
        <text x="92" y="91" text-anchor="middle" font-size="13" font-weight="800" fill="${winding ? '#92400e' : '#787166'}">2 · Canviar angle i recollir</text>
        <text x="92" y="108" text-anchor="middle" font-size="11.5" fill="#4a4139">S’enrotlla al con del fus</text>`;
    };
  }

  /* ==================== 2. LLANÇADORA VOLANT (JOHN KAY, 1733) ==================== */
  function svgLlancadora() {
    let s = EXTRA_DEFS + taller(565);
    s += ombra(660, 572, 460, 9);

    // Marc exterior del teler (fora de la zona dels fils, res no tapa el teixit)
    s += `<g data-part="bastidor">
      ${caixa(265, 134, 18, 415, 'fustaf', 'cil')}${caixa(1055, 134, 18, 415, 'fustaf', 'cil')}
      ${caixa(228, 120, 24, 445, 'fusta-v', 'cil')}${caixa(1088, 120, 24, 445, 'fusta-v', 'cil')}
      ${caixa(220, 114, 900, 22, 'fusta', 'tub', { rx: 3 })}
      ${caixa(228, 542, 884, 22, 'fusta', 'tub', { rx: 2 })}
      ${reblons(240, 125, 240, 125, 1, 3, '#6b4423')}${reblons(1100, 125, 1100, 125, 1, 3, '#6b4423')}
    </g>`;

    // Plegador d'ordit (darrere-dalt) + fils inferiors de l'ordit
    s += `<g data-part="ordit">
      ${caixa(274, 152, 792, 34, 'fustaf', 'tub', { rx: 4 })}
      <rect x="294" y="148" width="752" height="42" rx="6" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.6"/>
      <g id="ll-warp-low"></g>
      <polygon id="ll-shed-glow" points="305,270 1035,270 1035,342 305,342" fill="#fff3b8" opacity=".32"/>
    </g>`;

    // Lliços (dos marcs que pugen i baixen en oposició)
    s += `<g data-part="llicos">
      <circle cx="440" cy="128" r="11" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.4"/>
      <circle cx="900" cy="128" r="11" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.4"/>
      <g id="ll-heddle-1"></g>
      <g id="ll-heddle-2"></g>
    </g>`;

    // Tela ja teixida + plegador de tela a baix
    s += `<g data-part="tela">
      <polygon points="305,428 1035,428 1035,516 305,516" fill="url(#tx-tela)" stroke="${INK}" stroke-width="1.6"/>
      <g id="ll-cloth-grid"></g>
      <g id="ll-wefts"></g>
      ${caixa(274, 424, 792, 11, 'fustaf', 'tub', { rx: 2 })}
      <rect x="294" y="502" width="752" height="34" rx="6" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.6"/>
      ${caixa(274, 505, 22, 28, 'llauto', 'cil', { rx: 2 })}${caixa(1044, 505, 22, 28, 'llauto', 'cil', { rx: 2 })}
    </g>`;

    // Batà i pinta (oscil·la per atapeir la trama) + caixes laterals amb tacos tallats
    s += `<g id="ll-beater-group">
      <g data-part="pinta">
        <line x1="262" y1="136" x2="262" y2="342" stroke="#474f56" stroke-width="7" stroke-linecap="round"/>
        <line x1="1078" y1="136" x2="1078" y2="342" stroke="#474f56" stroke-width="7" stroke-linecap="round"/>
        <g id="ll-reed"></g>
        ${caixa(256, 338, 828, 16, 'fusta', 'tub', { rx: 2 })}
      </g>
      <g data-part="caixes">
        ${caixa(190, 326, 98, 32, 'fustaf', 'tub', { rx: 3 })}
        <rect x="198" y="332" width="84" height="18" rx="3" fill="#2c2219" stroke="${INK}" stroke-width="1.2"/>
        <g id="ll-taco-l">${caixa(204, 333, 20, 16, 'llauto', 'cil', { rx: 2 })}</g>
        ${caixa(1052, 326, 98, 32, 'fustaf', 'tub', { rx: 3 })}
        <rect x="1058" y="332" width="84" height="18" rx="3" fill="#2c2219" stroke="${INK}" stroke-width="1.2"/>
        <g id="ll-taco-r">${caixa(1116, 333, 20, 16, 'llauto', 'cil', { rx: 2 })}</g>
      </g>
    </g>`;

    // Trama volant + barqueta llançadora (entre ordit inferior i superior)
    s += `<g data-part="llancadora">
      <g id="ll-active-weft"></g>
      <g id="ll-shuttle">
        <path d="M-34 0Q-18 -11 0 -11Q18 -11 34 0Q18 11 0 11Q-18 11 -34 0Z" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.8"/>
        <polygon points="-34,0 -24,-4 -24,4" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1"/>
        <polygon points="34,0 24,-4 24,4" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1"/>
        <rect x="-15" y="-5" width="30" height="10" rx="4" fill="#3a2a1d"/>
        <rect x="-12" y="-3.5" width="24" height="7" rx="3" fill="url(#tx-cotobob)" stroke="#8d8167" stroke-width=".9"/>
      </g>
    </g>`;

    // Fils superiors de l'ordit (passen PER DAMUNT de la llançadora!)
    s += `<g data-part="ordit" id="ll-warp-up" pointer-events="none"></g>`;

    // Cordill i mànec (una sola mà impulsa la llançadora!)
    s += `<g data-part="cordill">
      <line id="ll-cord-l" x1="214" y1="333" x2="670" y2="490" stroke="#8b6f47" stroke-width="2.6"/>
      <line id="ll-cord-r" x1="1126" y1="333" x2="670" y2="490" stroke="#8b6f47" stroke-width="2.6"/>
      <g id="ll-handle">
        ${caixa(663, 478, 14, 28, 'llauto', 'cil', { rx: 4 })}
        ${maHTML('ll-hand', 'cordill')}
      </g>
      <text x="670" y="528" text-anchor="middle" font-size="13" font-weight="700" fill="#6f4e28">Una sola mà estira el mànec</text>
    </g>`;

    // Tall lateral sincronitzat a l'esquerra (x = -35..175, y = 155..385) per veure la calada de perfil
    s += `<g transform="translate(-35, 160)">
      <rect x="0" y="0" width="200" height="215" rx="12" fill="url(#tx-peça-fons)" stroke="#d6cbb5" stroke-width="1.5"/>
      <text x="100" y="22" text-anchor="middle" font-size="13.5" font-weight="800" fill="#2f6f68">Secció lateral · la calada</text>
      <g id="ll-side"></g>
    </g>`;

    return RI.svg(s);
  }

  function animaLlancadora() {
    return ({ p, el }) => {
      const s = S('llancadora', p);
      // Lliços i ordit: 18 fils alternats
      const h1y = 228 - 26 * s.shed, h2y = 228 + 26 * s.shed;
      const drawHeddle = (g, y, col) => {
        let h = `<rect x="302" y="${f1(y - 18)}" width="736" height="6" rx="2" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.2"/>
          <rect x="302" y="${f1(y + 12)}" width="736" height="6" rx="2" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.2"/>`;
        for (let i = 0; i < 9; i++) {
          const x = 324 + i * 84;
          h += `<line x1="${x}" y1="${f1(y - 12)}" x2="${x}" y2="${f1(y + 12)}" stroke="${col}" stroke-width="1.5"/><circle cx="${x}" cy="${f1(y)}" r="2.6" fill="#fff" stroke="${col}" stroke-width="1.2"/>`;
        }
        g.innerHTML = h;
      };
      drawHeddle(el('ll-heddle-1'), h1y, '#3d747a');
      drawHeddle(el('ll-heddle-2'), h2y, '#6f8769');

      // Fils d'ordit: el grup superior passa per sobre la llançadora, l'inferior per sota
      let up = '', low = '';
      for (let i = 0; i < 18; i++) {
        const x = 315 + i * 41.7, odd = i % 2 === 1;
        const hy = odd ? h1y : h2y;
        const isUp = (odd && s.shed >= 0) || (!odd && s.shed < 0);
        const line = `<line x1="${f1(x)}" y1="186" x2="${f1(x)}" y2="${f1(hy)}" stroke="${odd ? '#3d747a' : '#859c7f'}" stroke-width="${odd ? 2.2 : 1.9}"/>
          <line x1="${f1(x)}" y1="${f1(hy)}" x2="${f1(x)}" y2="428" stroke="${odd ? '#3d747a' : '#859c7f'}" stroke-width="${odd ? 2.2 : 1.9}"/>`;
        if (isUp) up += line; else low += line;
      }
      el('ll-warp-up').innerHTML = up;
      el('ll-warp-low').innerHTML = low;
      el('ll-shed-glow').setAttribute('opacity', (0.38 * Math.abs(s.shed)).toFixed(2));

      // Batà i pinta (s.y va de -82 a -152 → dy = 0 a +84 px cap avall/endavant fins a y=428)
      const beatNorm = (-82 - s.y) / 70;
      const by = beatNorm * 82;
      el('ll-beater-group').setAttribute('transform', `translate(0 ${f1(by)})`);
      let reed = '';
      for (let i = 0; i < 35; i++) {
        const x = 305 + i * 21.4;
        reed += `<line x1="${f1(x)}" y1="296" x2="${f1(x)}" y2="338" stroke="#7c878e" stroke-width="1.5"/>`;
      }
      reed += `<rect x="296" y="290" width="748" height="8" rx="2" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.2"/>`;
      el('ll-reed').innerHTML = reed;

      // Graella de tela + trames incorporades
      let cg = '';
      for (let i = 0; i < 18; i++) cg += `<line x1="${f1(315 + i * 41.7)}" y1="428" x2="${f1(315 + i * 41.7)}" y2="502" stroke="#cfc2a4" stroke-width="1.3"/>`;
      for (let j = 1; j < 7; j++) cg += `<line x1="305" y1="${428 + j * 11}" x2="1035" y2="${428 + j * 11}" stroke="#cfc2a4" stroke-width="1.2"/>`;
      el('ll-cloth-grid').innerHTML = cg;

      const rowHTML = (y, xFrom, xTo) => {
        let r = '';
        for (let i = 0; i < 17; i++) {
          const xA = 315 + i * 41.7, xB = xA + 41.7, lo = Math.max(xA, Math.min(xFrom, xTo)), hi = Math.min(xB, Math.max(xFrom, xTo));
          if (hi > lo) r += `<line x1="${f1(lo)}" y1="${f1(y + (i % 2 ? 1.4 : -1.4))}" x2="${f1(hi)}" y2="${f1(y + (i % 2 ? -1.4 : 1.4))}" stroke="#c84b31" stroke-width="3.6" stroke-linecap="round"/>`;
        }
        return r;
      };
      let actW = '', wefts = '';
      const sx = 670 + (s.x / 325) * 435; // -325..+325 -> 235..1105
      if (p >= 0.18 && p < 0.50) {
        const wy = p < 0.40 ? 334 : lerp(334, 430, s.beat1);
        actW += rowHTML(wy, 315, p < 0.38 ? sx : 1035);
      }
      if (p >= 0.50) wefts += rowHTML(430, 315, 1035);
      if (p >= 0.67 && p < 0.95) {
        const wy = p < 0.86 ? 334 : lerp(334, 435, s.beat2);
        actW += rowHTML(wy, 1035, p < 0.85 ? sx : 315);
      }
      if (p >= 0.95) wefts += rowHTML(436, 315, 1035);
      el('ll-active-weft').innerHTML = actW;
      el('ll-wefts').innerHTML = wefts;

      // Llançadora i tacos
      const sy = 334 + by;
      el('ll-shuttle').setAttribute('transform', `translate(${f1(sx)} ${f1(sy)})`);
      const kickL = s.pull && p < 0.3 ? 34 : 0, kickR = s.pull && p >= 0.6 ? -34 : 0;
      el('ll-taco-l').setAttribute('transform', `translate(${kickL} 0)`);
      el('ll-taco-r').setAttribute('transform', `translate(${kickR} 0)`);

      // Cordill i mà
      const hx = kickL ? 26 : kickR ? -26 : 0, hy = (kickL || kickR) ? 14 : 0;
      el('ll-handle').setAttribute('transform', `translate(${hx} ${hy})`);
      el('ll-hand').setAttribute('transform', `translate(684, 492)`);
      el('ll-cord-l').setAttribute('x1', f1(214 + kickL)); el('ll-cord-l').setAttribute('y1', f1(333 + by));
      el('ll-cord-l').setAttribute('x2', f1(670 + hx)); el('ll-cord-l').setAttribute('y2', f1(482 + hy));
      el('ll-cord-l').setAttribute('stroke', kickL ? '#d97706' : '#8b6f47');
      el('ll-cord-l').setAttribute('stroke-width', kickL ? '3.8' : '2.4');
      el('ll-cord-r').setAttribute('x1', f1(1126 + kickR)); el('ll-cord-r').setAttribute('y1', f1(333 + by));
      el('ll-cord-r').setAttribute('x2', f1(670 + hx)); el('ll-cord-r').setAttribute('y2', f1(482 + hy));
      el('ll-cord-r').setAttribute('stroke', kickR ? '#d97706' : '#8b6f47');
      el('ll-cord-r').setAttribute('stroke-width', kickR ? '3.8' : '2.4');

      // Secció lateral sincronitzada
      const sideShed = 26 * s.shed, reedX = 114 + beatNorm * 32;
      const inShed = (p >= 0.18 && p < 0.38) || (p >= 0.67 && p < 0.85);
      el('ll-side').innerHTML = `
        <circle cx="24" cy="112" r="14" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.4"/>
        <polygon points="32,112 146,112 78,${f1(112 - sideShed)}" fill="#fff3b8" opacity=".5"/>
        <polygon points="32,112 146,112 78,${f1(112 + sideShed)}" fill="#fff3b8" opacity=".5"/>
        <polyline points="32,112 78,${f1(112 - sideShed)} 146,112" fill="none" stroke="#3d747a" stroke-width="2.4"/>
        <polyline points="32,112 78,${f1(112 + sideShed)} 146,112" fill="none" stroke="#859c7f" stroke-width="2.4"/>
        <rect x="74" y="${f1(112 - sideShed - 18)}" width="7" height="36" rx="2" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1"/>
        <rect x="74" y="${f1(112 + sideShed - 18)}" width="7" height="36" rx="2" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1"/>
        <line x1="${f1(reedX)}" y1="68" x2="${f1(reedX)}" y2="148" stroke="#5a6269" stroke-width="3.2" stroke-linecap="round"/>
        <ellipse cx="104" cy="112" rx="10" ry="6" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.3" opacity="${inShed ? 1 : 0.25}"/>
        <line x1="146" y1="112" x2="180" y2="136" stroke="#c8b996" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="180" cy="144" r="11" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.4"/>
        <text x="100" y="182" text-anchor="middle" font-size="11.5" font-weight="700" fill="#4a4139">${inShed ? 'La llançadora passa pel mig' : beatNorm > 0.2 ? 'La pinta atapeeix la trama' : 'Els lliços obren el pas'}</text>`;
    };
  }

  /* ==================== 3. SPINNING JENNY (HARGREAVES, 1764) ==================== */
  function svgJenny() {
    let s = EXTRA_DEFS + taller(562);
    s += ombra(430, 568, 370, 9);

    // Bastidor lateral net (sense barres que creuin davant del fus o la pinça)
    s += `<g data-part="bastidor">
      ${caixa(78, 250, 22, 312, 'fusta-v', 'cil')}${caixa(668, 250, 22, 312, 'fusta-v', 'cil')}
      ${caixa(70, 505, 626, 20, 'fusta', 'tub', { rx: 2 })}
      ${caixa(70, 244, 626, 20, 'fusta', 'tub', { rx: 3 })}
      ${caixa(148, 264, 18, 241, 'fustaf', 'cil')}
    </g>`;

    // Bobines de metxa sota el bastidor
    s += `<g data-part="metxes">
      ${caixa(270, 466, 130, 14, 'fustaf', 'tub', { rx: 2 })}
      ${bobinaHTML(325, 434, 34, 48, true, 'metxes')}
      <g id="jn-roving-feed"></g>
    </g>`;

    // Tambor i corretja de transmissió fins al fus i la roda
    s += `<g data-part="corda">
      ${corretjaHTML(705, 362, 102, 238, 456, 26, 'jn-belt1', 'corda')}
      ${corretjaHTML(238, 456, 26, 128, 396, 14, 'jn-belt2', 'corda')}
      <circle cx="238" cy="456" r="26" fill="url(#tx-ferro)" stroke="${INK}" stroke-width="1.8"/>
      <g id="jn-drum"><line x1="216" y1="456" x2="260" y2="456" stroke="#d8e0e6" stroke-width="2.4"/></g>
      <circle cx="238" cy="456" r="6" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
    </g>`;

    // Roda gran a la dreta
    s += `<g data-part="roda">
      <g id="jn-wheel">${rodaR(705, 362, 108, { raigs: 8, tex: 'fusta', gruix: 14, raig: 7, boto: 20, pern: 'llauto' })}
        <line x1="705" y1="362" x2="740" y2="362" stroke="#3c4349" stroke-width="6" stroke-linecap="round"/>
        <circle cx="740" cy="362" r="7.5" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.5"/>
      </g>
    </g>`;

    // Fus inclinat a l'esquerra + fil-guia mòbil + con que creix
    s += `<g data-part="fusos">
      <g transform="rotate(11 128 396)">
        ${tub('M128 212V412', 6.5, 'plom', { cap: 'round' })}
        <polygon points="128,196 124,214 132,214" fill="#c7d0d6" stroke="${INK}" stroke-width="1.1"/>
        <g id="jn-cop"></g>
        <circle cx="128" cy="396" r="14" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.6"/>
        <g id="jn-whorl"><line x1="117" y1="396" x2="139" y2="396" stroke="${INK}" stroke-width="2.2"/></g>
      </g>
      <g id="jn-faller">
        <line x1="168" y1="268" x2="162" y2="225" stroke="#b88928" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="162" cy="225" r="4.5" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.1"/>
      </g>
      <g id="jn-yarn"></g>
    </g>`;

    // Pinça mòbil sobre els rails superiors
    s += `<g id="jn-clasp" data-part="pinca">
      <rect x="-26" y="238" width="52" height="14" rx="3" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.6"/>
      <g id="jn-jaw">
        <rect x="-26" y="220" width="52" height="13" rx="3" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.6"/>
        <rect x="-12" y="206" width="24" height="14" rx="4" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.4"/>
      </g>
      <circle cx="-18" cy="256" r="6" fill="url(#g-esf-ferro)" stroke="${INK}" stroke-width="1.2"/>
      <circle cx="18" cy="256" r="6" fill="url(#g-esf-ferro)" stroke="${INK}" stroke-width="1.2"/>
      <g transform="translate(8 205)">${maHTML('jn-hand', 'pinca', true)}</g>
      <g id="jn-clasp-badge"></g>
    </g>`;

    // Quadre dret sincronitzat: 1 roda -> 8 fusos alhora!
    s += `<g transform="translate(848, 128)">
      <rect x="0" y="0" width="374" height="436" rx="14" fill="url(#tx-peça-fons)" stroke="#d6cbb5" stroke-width="1.6"/>
      <text x="187" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#6f4e28">1 roda → 8 fusos alhora</text>
      <text x="187" y="50" text-anchor="middle" font-size="12.5" fill="#5b6258">La pinça estira tots els fils d’un sol cop</text>
      <g id="jn-multi"></g>
    </g>`;

    return RI.svg(s);
  }

  function animaJenny() {
    return ({ p, el }) => {
      const s = S('jenny', p);
      // travel: 82..265 -> cx de la pinça de 240 a 595
      const cx = lerp(240, 595, (s.travel - 82) / (265 - 82));
      const wdeg = (s.angle * 180) / Math.PI;
      const ddeg = (s.driveAngle * 180) / Math.PI;
      const sdeg = (s.spindleAngle * 180) / Math.PI;

      el('jn-wheel').setAttribute('transform', `rotate(${f1(wdeg)} 705 362)`);
      el('jn-drum').setAttribute('transform', `rotate(${f1(ddeg)} 238 456)`);
      el('jn-whorl').setAttribute('transform', `rotate(${f1(sdeg)} 128 396)`);
      el('jn-belt1-a').style.strokeDashoffset = (-s.angle * 102).toFixed(1);
      el('jn-belt1-b').style.strokeDashoffset = (-s.angle * 102).toFixed(1);
      el('jn-belt2-a').style.strokeDashoffset = (-s.driveAngle * 26).toFixed(1);
      el('jn-belt2-b').style.strokeDashoffset = (-s.driveAngle * 26).toFixed(1);

      // Pinça i estat oberta/tancada
      el('jn-clasp').setAttribute('transform', `translate(${f1(cx)} 0)`);
      el('jn-jaw').setAttribute('transform', `translate(0 ${s.closed ? 0 : -14})`);
      el('jn-clasp-badge').innerHTML = badge(0, 178, s.closed ? 'PINÇA TANCADA' : 'PINÇA OBERTA', s.closed ? '#92400e' : '#2f6f68', '#fff');

      // Con de fil sobre el fus inclinat (en coordenades locals del fus rotades)
      const r = 7 + 12 * (s.copRadius - 7) / 10;
      el('jn-cop').innerHTML = `<path d="${copPath(128, 368, 92, r)}" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.4"/>${copSpiral(128, 368, 92, r, s.spindleAngle)}`;

      // Fil-guia (baixa a p=0.64..0.70)
      const fall = (306 - s.guideZ) / 54; // 0..1
      el('jn-faller').setAttribute('transform', `rotate(${f1(-fall * 48)} 168 268)`);
      const tipX = lerp(164, 148, fall), tipY = lerp(212, 294, fall);

      // Alimentació des de la bobina fins a la pinça
      el('jn-roving-feed').innerHTML = fibresHTML(325, 404, cx - 12, 240, 12, 10, s.draw * 0.4);

      // Tram estirat entre la pinça i el fus
      if (p < 0.52) {
        const midX = lerp(cx - 22, tipX, 0.55 - 0.35 * s.draw);
        const midY = lerp(238, tipY, 0.55 - 0.35 * s.draw);
        el('jn-yarn').innerHTML =
          fibresHTML(cx - 22, 238, midX, midY, 10, lerp(9, 3.8, s.draw), s.draw * 0.5) +
          filTorcutHTML(midX, midY, tipX, tipY, s.spindleAngle * 0.25, Math.max(0.25, s.draw), 3.4);
      } else {
        el('jn-yarn').innerHTML = filTorcutHTML(cx - 22, 238, tipX, tipY, s.spindleAngle * 0.25, 1, 3.5);
      }

      // 8 fusos simultanis a la dreta
      const barY = lerp(188, 104, s.draw) + (p >= 0.70 ? lerp(0, 84, s.wind) : 0);
      const claspY = p < 0.70 ? lerp(188, 104, s.draw) : lerp(104, 188, s.wind);
      let m = `<rect x="26" y="${f1(claspY)}" width="322" height="12" rx="3" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.3"/>
        <rect x="26" y="378" width="322" height="14" rx="3" fill="url(#tx-ferro)" stroke="${INK}" stroke-width="1.3"/>`;
      for (let i = 0; i < 8; i++) {
        const x = 44 + i * 40.8;
        m += `<line x1="${f1(x)}" y1="${f1(claspY + 12)}" x2="${f1(x)}" y2="262" stroke="${p < 0.52 ? '#6d8768' : '#b88928'}" stroke-width="${p < 0.52 ? 2.4 : 2}"/>
          <line x1="${f1(x)}" y1="248" x2="${f1(x)}" y2="380" stroke="#7c878e" stroke-width="3.5" stroke-linecap="round"/>
          <path d="${copPath(x, 358, 72, r * 0.78)}" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.1"/>
          ${copSpiral(x, 358, 72, r * 0.78, s.spindleAngle + i * 0.5)}`;
      }
      m += `<text x="187" y="416" text-anchor="middle" font-size="12.5" font-weight="700" fill="#897142">${s.wind > 0.05 ? 'Tots vuit cons creixen alhora' : 'Un mateix moviment estira vuit fils'}</text>`;
      el('jn-multi').innerHTML = m;
    };
  }

  /* ==================== 4. WATER FRAME (ARKWRIGHT, 1769) ==================== */
  function svgWater() {
    let s = EXTRA_DEFS + taller(565);
    s += ombra(560, 572, 470, 9);

    // Canal d'aigua i roda hidràulica a la dreta (aigua)
    s += `<g data-part="aigua">
      <rect x="860" y="492" width="390" height="73" fill="url(#g-aiguat)"/>
      <path d="M862 494q18-6 36 0t36 0 36 0 36 0 36 0 36 0 36 0 36 0 36 0 36 0" fill="none" stroke="#fff" stroke-width="2" opacity=".75"/>
      <path d="M876 525H1220" class="flux2 s-blanc" stroke-width="3.5" data-flux="2.2"/>
      <g id="wt-waterwheel">${rodaR(1055, 378, 138, { raigs: 8, tex: 'fustaf', gruix: 18, raig: 9, boto: 26, pern: 'ferro' })}</g>
      <path d="M1175 450A148 148 0 0 1 1105 510" fill="none" stroke="#2f7fb5" stroke-width="4" marker-end="url(#m-fl)"/>
      <text x="1055" y="218" text-anchor="middle" class="tx-p" fill="#1d5f8f">Força hidràulica exterior</text>
      ${caixa(846, 138, 34, 427, 'pedra', 'pla')}
      ${tub('M728 378H1055', 11, 'ferro')}
      <circle cx="863" cy="378" r="14" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.6"/>
      ${corretjaHTML(728, 378, 34, 728, 502, 20, 'wt-belt-a', 'aigua')}
      ${corretjaHTML(728, 378, 34, 578, 260, 22, 'wt-belt-b', 'aigua')}
      <circle cx="728" cy="378" r="34" fill="url(#tx-ferro)" stroke="${INK}" stroke-width="1.8"/>
      <g id="wt-mainpulley"><line x1="698" y1="378" x2="758" y2="378" stroke="#d8e0e6" stroke-width="3"/><line x1="728" y1="348" x2="728" y2="408" stroke="#d8e0e6" stroke-width="3"/></g>
      <circle cx="728" cy="378" r="9" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.4"/>
      ${tub('M600 502H742', 9, 'ferro')}
    </g>`;

    // Bastidor de fusta de la màquina (a l'esquerra del mur de pedra)
    s += `<g data-part="bastidor">
      ${caixa(140, 140, 22, 425, 'fusta-v', 'cil')}${caixa(768, 140, 22, 425, 'fusta-v', 'cil')}
      ${caixa(130, 132, 670, 20, 'fusta', 'tub', { rx: 3 })}
      ${caixa(140, 272, 646, 18, 'fusta', 'tub', { rx: 2 })}
      ${caixa(140, 520, 646, 20, 'fusta', 'tub', { rx: 2 })}
    </g>`;

    // Bobina superior de metxa
    s += `<g data-part="metxa">
      ${bobinaHTML(195, 194, 42, 60, true, 'metxa')}
    </g>`;

    // Tres parelles de corrons d'estiratge en secció lateral clara (x=295, 435, 575)
    s += `<g data-part="corrons">
      <g id="wt-fibres"></g>
      ${[295, 435, 575].map((cx, j) => `
        ${corroHTML(cx, 208, 19, `wt-rt-${j}`, 'corrons', { cuir: true })}
        ${corroHTML(cx, 250, 19, `wt-rb-${j}`, 'corrons')}
        <rect x="${cx - 10}" y="272" width="20" height="26" rx="2" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.2"/>
        ${badge(cx, 162, ['×1', '×2', '×4'][j], j === 0 ? '#5b6258' : j === 1 ? '#2f6f68' : '#b45309', '#fff')}
      `).join('')}
      <path d="M325 162H405M465 162H545" stroke="#b45309" stroke-width="2.2" marker-end="url(#m-fl)"/>
    </g>`;

    // Aleta giratòria i bobina contínua (x=635, y=340..515)
    s += `<g data-part="aleta">
      <circle cx="635" cy="240" r="8" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.4"/>
      <g id="wt-yarn-in"></g>
      <g id="wt-flyer-back"></g>
      <g id="wt-bobbin"></g>
      <g id="wt-flyer-front"></g>
      ${badge(635, 316, 'Torça i recull sense parar', '#2f6f68', '#fff')}
    </g>`;

    // Finestra de detall: 4 caps treballant en continu
    s += `<g transform="translate(185, 342)">
      <rect x="0" y="0" width="320" height="162" rx="12" fill="url(#tx-peça-fons)" stroke="#d6cbb5" stroke-width="1.5"/>
      <text x="160" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="#6f4e28">4 caps filant en continu</text>
      <g id="wt-four"></g>
    </g>`;

    return RI.svg(s);
  }

  function animaWater() {
    return ({ p, el }) => {
      const s = S('water', p);
      const wwDeg = (p * 360 * 1.4).toFixed(1);
      el('wt-waterwheel').setAttribute('transform', `rotate(${wwDeg} 1055 378)`);
      el('wt-mainpulley').setAttribute('transform', `rotate(${(p * 360 * 3).toFixed(1)} 728 378)`);
      const boff = (-p * 360 * 2).toFixed(1);
      ['wt-belt-a-a', 'wt-belt-a-b', 'wt-belt-b-a', 'wt-belt-b-b'].forEach((id) => { el(id).style.strokeDashoffset = boff; });

      // Gir de les tres parelles de corrons (oposat: superior antihorari, inferior horari!)
      s.pairs.forEach(([aTop, aBot], j) => {
        const cx = [295, 435, 575][j];
        el(`wt-rt-${j}`).setAttribute('transform', `rotate(${f1((aTop * 180) / Math.PI)} ${cx} 208)`);
        el(`wt-rb-${j}`).setAttribute('transform', `rotate(${f1((aBot * 180) / Math.PI)} ${cx} 250)`);
      });

      // Estiratge progressiu entre les parelles de corrons (17 px -> 10 px -> 4.5 px!)
      el('wt-fibres').innerHTML =
        fibresHTML(214, 198, 295, 229, 17, 15, p * 1.5) +
        fibresHTML(295, 229, 435, 229, 14, 8.5, p * 2.4) +
        fibresHTML(435, 229, 575, 229, 8.5, 4.2, p * 4.8);
      el('wt-yarn-in').innerHTML = filTorcutHTML(575, 229, 635, 240, s.flyerAngle * 0.4, 0.8, 3.2);

      // Aleta i bobina en 2D amb pas per davant i per darrere
      const a = s.flyerAngle, dx = 46 * Math.cos(a), front = Math.sin(a) >= 0;
      const bobR = 13 + 14 * s.fill, lift = Math.sin(p * Math.PI * 4) * 14;
      const armX = 635 + dx, oppX = 635 - dx, hookY = 438 + lift;

      el('wt-bobbin').innerHTML = `
        <line x1="635" y1="338" x2="635" y2="515" stroke="#5a6269" stroke-width="5"/>
        <rect x="${f1(635 - bobR)}" y="392" width="${f1(bobR * 2)}" height="94" rx="4" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.5"/>
        ${caixa(635 - 26, 384, 52, 8, 'fustaf', 'tub', { rx: 2 })}${caixa(635 - 26, 486, 52, 8, 'fustaf', 'tub', { rx: 2 })}`;

      const flyerArms = `<path d="M635 352Q${f1(armX)} 354 ${f1(armX)} 380V498" fill="none" stroke="${INK}" stroke-width="7.5" stroke-linecap="round"/>
        <path d="M635 352Q${f1(armX)} 354 ${f1(armX)} 380V498" fill="none" stroke="#d4a742" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M635 352Q${f1(oppX)} 354 ${f1(oppX)} 380V498" fill="none" stroke="${INK}" stroke-width="7.5" stroke-linecap="round"/>
        <path d="M635 352Q${f1(oppX)} 354 ${f1(oppX)} 380V498" fill="none" stroke="#b88928" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="${f1(armX)}" cy="${f1(hookY)}" r="4.5" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
        <line x1="635" y1="240" x2="635" y2="352" stroke="#b4892c" stroke-width="3.2"/>
        <polyline points="635,352 ${f1(armX)},380 ${f1(armX)},${f1(hookY)} ${f1(635 + Math.cos(a) * bobR)},${f1(hookY)}" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linejoin="round"/>`;

      el('wt-flyer-back').innerHTML = front ? '' : flyerArms;
      el('wt-flyer-front').innerHTML = front ? flyerArms : '';

      // 4 caps en continu
      let four = '<line x1="28" y1="138" x2="292" y2="138" stroke="#5a6269" stroke-width="5"/>';
      for (let i = 0; i < 4; i++) {
        const x = 58 + i * 68, ia = a + i * 0.9, idx = 24 * Math.cos(ia), br = 8 + 9 * s.fill;
        four += `<line x1="${x}" y1="36" x2="${x}" y2="140" stroke="#b4892c" stroke-width="2.2"/>
          <rect x="${f1(x - br)}" y="76" width="${f1(br * 2)}" height="48" rx="3" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.2"/>
          <path d="M${x} 54Q${f1(x + idx)} 56 ${f1(x + idx)} 70V128M${x} 54Q${f1(x - idx)} 56 ${f1(x - idx)} 70V128" fill="none" stroke="#b88928" stroke-width="2.8" stroke-linecap="round"/>`;
      }
      el('wt-four').innerHTML = four;
    };
  }

  /* ==================== 5. LA MULA DE CROMPTON (1779) ==================== */
  function svgMula() {
    let s = EXTRA_DEFS + taller(564);
    s += ombra(590, 572, 480, 9);

    // Bastidor fix i fileta a l'esquerra
    s += `<g data-part="bastidor">
      ${caixa(66, 152, 22, 412, 'fusta-v', 'cil')}${caixa(226, 152, 22, 412, 'fusta-v', 'cil')}
      ${caixa(56, 142, 202, 20, 'fusta', 'tub', { rx: 3 })}${caixa(66, 336, 182, 16, 'fusta', 'tub')}
    </g>`;

    // Fileta amb bobines de metxa
    s += `<g data-part="fileta">
      ${bobinaHTML(126, 208, 36, 54, true, 'fileta')}
      ${bobinaHTML(126, 294, 36, 54, true, 'fileta')}
      <g id="ml-roving-in"></g>
    </g>`;

    // Dades i dues parelles de corrons en tall lateral net (x=220, 286)
    s += `<g data-part="corrons">
      ${caixa(196, 276, 120, 14, 'fustaf', 'tub')}
      <g id="ml-roving-mid"></g>
      ${corroHTML(218, 226, 18, 'ml-rt-0', 'corrons', { cuir: true })}
      ${corroHTML(218, 264, 18, 'ml-rb-0', 'corrons')}
      ${corroHTML(286, 226, 18, 'ml-rt-1', 'corrons', { cuir: true })}
      ${corroHTML(286, 264, 18, 'ml-rb-1', 'corrons')}
      <g id="ml-roller-badge"></g>
    </g>`;

    // Rails de ferro a terra + marca d'estiratge fi (quan els corrons s'aturen)
    s += `<g data-part="carro">
      ${caixa(246, 546, 760, 12, 'ferro', 'tub')}
      <g id="ml-afterdraft" opacity="0">
        <line x1="762" y1="532" x2="875" y2="532" stroke="#d97706" stroke-width="3" stroke-dasharray="5 4"/>
        ${badge(818, 514, '+ estiratge fi (corrons aturats)', '#b45309', '#fff')}
      </g>
    </g>`;

    // Fil que s'estira entre corrons fixos i carro mòbil
    s += `<g data-part="fus" id="ml-yarn"></g>`;

    // Carro mòbil sobre rodes amb fus inclinat, fil-guia i roda manual
    s += `<g id="ml-carro">
      <g data-part="carro">
        ${caixa(-128, 412, 236, 30, 'fusta', 'tub', { rx: 3 })}
        ${caixa(-95, 442, 22, 62, 'fustaf', 'cil')}${caixa(65, 442, 22, 62, 'fustaf', 'cil')}
        <g id="ml-w1">${rodaR(-84, 516, 29, { raigs: 6, tex: 'ferro', gruix: 7, raig: 4, boto: 9, pern: 'llauto' })}</g>
        <g id="ml-w2">${rodaR(76, 516, 29, { raigs: 6, tex: 'ferro', gruix: 7, raig: 4, boto: 9, pern: 'llauto' })}</g>
      </g>
      <g data-part="roda">
        ${corretjaHTML(62, 326, 66, -56, 396, 18, 'ml-belt', 'roda')}
        <g id="ml-wheel">${rodaR(62, 326, 70, { raigs: 8, tex: 'ferro', gruix: 10, raig: 4.5, boto: 14, pern: 'llauto' })}
          <line x1="62" y1="326" x2="88" y2="326" stroke="#2e221a" stroke-width="5" stroke-linecap="round"/>
          <circle cx="88" cy="326" r="5.5" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.3"/>
        </g>
      </g>
      <g data-part="fus">
        <g transform="rotate(-14 -56 396)">
          ${tub('M-56 225V414', 6, 'plom', { cap: 'round' })}
          <polygon points="-56,210 -60,226 -52,226" fill="#c7d0d6" stroke="${INK}" stroke-width="1"/>
          <g id="ml-cop"></g>
          <circle cx="-56" cy="396" r="14" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.5"/>
        </g>
        <g id="ml-faller">
          <line x1="-18" y1="292" x2="-15" y2="234" stroke="#b88928" stroke-width="3.4" stroke-linecap="round"/>
          <circle cx="-15" cy="234" r="4.5" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
        </g>
      </g>
    </g>`;

    // Finestra dalt-dreta: 6 fusos coordinats
    s += `<g transform="translate(865, 104)">
      <rect x="0" y="0" width="352" height="142" rx="12" fill="url(#tx-peça-fons)" stroke="#d6cbb5" stroke-width="1.5"/>
      <text x="176" y="22" text-anchor="middle" font-size="14" font-weight="800" fill="#6f4e28">6 fusos coordinats sobre el carro</text>
      <g id="ml-six"></g>
    </g>`;

    return RI.svg(s);
  }

  function animaMula() {
    return ({ p, el }) => {
      const s = S('mula', p);
      // travel: -90..-360 -> carroX de 435 a 875 (a p=0.38 és ~775)
      const cx = lerp(435, 875, (-90 - s.travel) / 270);
      const dx = cx - 435;
      el('ml-carro').setAttribute('transform', `translate(${f1(cx)} 0)`);

      const wDeg = ((dx / 29) * 180) / Math.PI;
      el('ml-w1').setAttribute('transform', `rotate(${f1(wDeg)} -84 516)`);
      el('ml-w2').setAttribute('transform', `rotate(${f1(wDeg)} 76 516)`);

      const wheelDeg = ((s.spindleAngle / 4.2) * 180) / Math.PI;
      el('ml-wheel').setAttribute('transform', `rotate(${f1(wheelDeg)} 62 326)`);
      el('ml-belt-a').style.strokeDashoffset = (-s.spindleAngle * 18).toFixed(1);
      el('ml-belt-b').style.strokeDashoffset = (-s.spindleAngle * 18).toFixed(1);

      // Corrons (girant fins a p=0.38, aturats després!)
      const rDeg = (s.rollerAngle * 180) / Math.PI;
      el('ml-rt-0').setAttribute('transform', `rotate(${f1(-rDeg)} 218 226)`);
      el('ml-rb-0').setAttribute('transform', `rotate(${f1(rDeg)} 218 264)`);
      el('ml-rt-1').setAttribute('transform', `rotate(${f1(-rDeg * 1.8)} 286 226)`);
      el('ml-rb-1').setAttribute('transform', `rotate(${f1(rDeg * 1.8)} 286 264)`);
      el('ml-roller-badge').innerHTML = badge(252, 168, s.rollersRunning ? 'CORRONS GIRANT' : 'CORRONS ATURATS!', s.rollersRunning ? '#2f6f68' : '#b45309', '#fff');
      el('ml-afterdraft').setAttribute('opacity', p >= 0.38 && p < 0.57 ? '1' : '0');

      el('ml-roving-in').innerHTML = fibresHTML(145, 208, 218, 245, 13, 10, s.fed * 0.5);
      el('ml-roving-mid').innerHTML = fibresHTML(218, 245, 286, 245, 10, 4.5, s.fed * 0.9);

      // Con de fil al fus inclinat
      const r = 7 + 12 * (s.copRadius - 7) / 10;
      el('ml-cop').innerHTML = `<path d="${copPath(-56, 372, 96, r)}" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.4"/>${copSpiral(-56, 372, 96, r, s.spindleAngle)}`;

      // Fil-guia (s.guideZ: 203 -> 133)
      const fall = (203 - s.guideZ) / 70;
      el('ml-faller').setAttribute('transform', `rotate(${f1(-fall * 48)} -18 292)`);
      const tipX = cx + lerp(-98, -74, fall), tipY = lerp(220, 294, fall);
      el('ml-yarn').innerHTML = filTorcutHTML(302, 245, tipX, tipY, s.spindleAngle * 0.25, Math.max(0.4, s.fed * 0.7 + s.last * 0.3), 3.3);

      // 6 fusos coordinats
      let six = '<line x1="36" y1="112" x2="316" y2="112" stroke="#7a542f" stroke-width="8" stroke-linecap="round"/>';
      for (let i = 0; i < 6; i++) {
        const x = 58 + i * 47;
        six += `<line x1="${x}" y1="36" x2="${x}" y2="114" stroke="#7c878e" stroke-width="3.2" stroke-linecap="round"/>
          <path d="${copPath(x, 108, 56, r * 0.7)}" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.1"/>
          ${copSpiral(x, 108, 56, r * 0.7, s.spindleAngle + i * 0.4)}`;
      }
      six += `<text x="176" y="132" text-anchor="middle" font-size="11.5" font-weight="700" fill="#897142">${s.wind > 0.05 ? 'Tots sis cons creixen en tornar' : 'Corrons i carro coordinats'}</text>`;
      el('ml-six').innerHTML = six;
    };
  }

  /* ==================== 6. TELER MECÀNIC DE CARTWRIGHT (1785 / 1787-1790) ==================== */
  function svgCartwright() {
    let s = EXTRA_DEFS + taller(565);
    s += ombra(385, 572, 355, 9);

    // Bastidor exterior net (sense muntants centrals que creuin ordit, batà o biela)
    s += `<g data-part="bastidor">
      ${caixa(44, 146, 20, 418, 'fustaf', 'cil')}${caixa(668, 146, 20, 418, 'fustaf', 'cil')}
      ${caixa(36, 134, 668, 18, 'fusta', 'tub', { rx: 3 })}${caixa(44, 540, 646, 22, 'fusta', 'tub', { rx: 2 })}
      ${caixa(190, 474, 16, 66, 'fustaf', 'cil')}${caixa(476, 474, 16, 66, 'fustaf', 'cil')}
    </g>`;

    // Transmissió exterior des d'un eix de fàbrica superior fins a l'eix principal
    s += `<g data-part="transmissio">
      <line x1="686" y1="142" x2="730" y2="142" stroke="#474f56" stroke-width="9" stroke-linecap="round"/>
      <circle cx="712" cy="142" r="30" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.8"/>
      <circle cx="712" cy="142" r="7" fill="url(#g-esf-ferro)" stroke="${INK}" stroke-width="1.2"/>
      ${corretjaHTML(712, 142, 30, 622, 466, 60, 'cw-belt', 'transmissio')}
      <path d="M676 116A42 42 0 0 1 746 132" fill="none" stroke="#b45309" stroke-width="2.6" stroke-dasharray="5 4" marker-end="url(#m-fl)"/>
      <g id="cw-flywheel">${rodaR(622, 466, 64, { raigs: 6, tex: 'ferro', gruix: 10, raig: 5, boto: 15, pern: 'llauto' })}</g>
    </g>`;

    // Plegador d'ordit a l'esquerra + barra guia + calada lateral
    s += `<g data-part="ordit">
      <circle cx="102" cy="248" r="35" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="102" cy="248" r="10" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.2"/>
      <circle cx="152" cy="248" r="7" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.3"/>
      <g id="cw-shed"></g>
    </g>`;

    // Eix principal (1 volta = 1 passada), reductor 2:1 i eix de lleves amb rodet seguidor
    s += `<g data-part="eix">
      ${tub('M568 466H628', 10, 'ferro')}
      ${tub('M192 466H520', 10, 'ferro')}
      <g id="cw-gear-main">${engranatgeR(574, 466, 23, 12, { tex: 'llauto', pern: 'ferro' })}</g>
      <g id="cw-gear-cam">${engranatgeR(503, 466, 46, 24, { tex: 'llauto', pern: 'ferro' })}</g>
      ${badge(538, 524, 'Relació 2:1', '#6f4e28', '#fff')}
      <g id="cw-cams"></g>
    </g>`;

    // Lliços accionats en oposició per un balancí superior i les dues lleves
    s += `<g data-part="llicos" id="cw-heddles"></g>`;

    // Batà basculant, pinta i biela (en el pla inferior lliure de fils)
    s += `<g data-part="pinta" id="cw-beater"></g>`;

    // Llançadora dins la calada + impulsor mecànic articulat
    s += `<g data-part="llancadora" id="cw-shuttle-side"></g>`;

    // Tela teixida i plegador de tela a la dreta
    s += `<g data-part="tela">
      <g id="cw-cloth"></g>
      <circle cx="564" cy="250" r="8" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.3"/>
      <circle cx="564" cy="364" r="28" fill="url(#tx-cotobob)" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="564" cy="364" r="9" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.2"/>
    </g>`;

    // Panell dret ampli i sincronitzat: vista frontal del cicle complet
    s += `<g transform="translate(766, 126)">
      <rect x="0" y="0" width="458" height="440" rx="14" fill="url(#tx-peça-fons)" stroke="#d6cbb5" stroke-width="1.6"/>
      <text x="229" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#6f4e28">Vista frontal · les tres accions alhora</text>
      <text x="229" y="48" text-anchor="middle" font-size="12.5" fill="#5b6258">Un sol eix motriu coordina calada, llançadora i batuda</text>
      <g id="cw-front"></g>
    </g>`;

    return RI.svg(s);
  }

  function animaCartwright() {
    return ({ p, el }) => {
      const s = S('cartwright', p);
      const mainDeg = (s.angle * 180) / Math.PI;
      const camDeg = (s.camAngle * 180) / Math.PI;
      el('cw-flywheel').setAttribute('transform', `rotate(${f1(mainDeg)} 622 466)`);
      el('cw-gear-main').setAttribute('transform', `rotate(${f1(mainDeg)} 574 466)`);
      el('cw-gear-cam').setAttribute('transform', `rotate(${f1(camDeg + 7.5)} 503 466)`);
      const boff = (-s.angle * 60).toFixed(1);
      el('cw-belt-a').style.strokeDashoffset = boff;
      el('cw-belt-b').style.strokeDashoffset = boff;

      // Perfil excèntric ben llegible basat en RI.CARTWRIGHT_GEOMETRIA.camRadius
      const scaleCamR = (r) => 33 + (r - 40) * 1.65;
      const drawCam = (cx, sign) => {
        let d = '';
        for (let i = 0; i < 48; i++) {
          const b = (Math.PI * 2 * i) / 48, a = b + s.camAngle;
          const rr = scaleCamR(RI.CARTWRIGHT_GEOMETRIA.camRadius(b, sign));
          d += (i ? 'L' : 'M') + `${f1(cx + rr * Math.cos(a))} ${f1(466 - rr * Math.sin(a))}`;
        }
        return d + 'Z';
      };
      const lift1 = 30 * s.shed, lift2 = -30 * s.shed;
      const fol1Y = 466 - scaleCamR(40 + 11 * s.shed);
      const fol2Y = 466 - scaleCamR(40 - 11 * s.shed);
      el('cw-cams').innerHTML = `
        <path d="${drawCam(224, 1)}" fill="url(#tx-ferro)" stroke="${INK}" stroke-width="1.6"/>
        <circle cx="224" cy="466" r="7" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
        <path d="${drawCam(288, -1)}" fill="url(#tx-plom)" stroke="${INK}" stroke-width="1.6"/>
        <circle cx="288" cy="466" r="7" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
        <line x1="224" y1="${f1(fol1Y)}" x2="224" y2="${f1(296 - lift1)}" stroke="#4b5258" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="288" y1="${f1(fol2Y)}" x2="288" y2="${f1(296 - lift2)}" stroke="#4b5258" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="224" cy="${f1(fol1Y)}" r="6.5" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.3"/>
        <circle cx="288" cy="${f1(fol2Y)}" r="6.5" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.3"/>`;

      // Lliços amb finestres i balancí superior basculant + calada clara
      const y1 = 248 - lift1, y2 = 248 - lift2;
      el('cw-heddles').innerHTML = `
        <line x1="256" y1="148" x2="256" y2="172" stroke="#5a6269" stroke-width="4.5"/>
        <line x1="224" y1="${f1(172 + (y1 - 248) * 0.35)}" x2="288" y2="${f1(172 + (y2 - 248) * 0.35)}" stroke="#7a542f" stroke-width="6.5" stroke-linecap="round"/>
        <circle cx="256" cy="172" r="5" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
        <line x1="224" y1="${f1(y1 - 38)}" x2="224" y2="${f1(172 + (y1 - 248) * 0.35)}" stroke="#8b6f47" stroke-width="2.2"/>
        <line x1="288" y1="${f1(y2 - 38)}" x2="288" y2="${f1(172 + (y2 - 248) * 0.35)}" stroke="#8b6f47" stroke-width="2.2"/>
        <rect x="216" y="${f1(y1 - 38)}" width="16" height="76" rx="3" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.4"/>
        <circle cx="224" cy="${f1(y1)}" r="4.5" fill="#fffcf5" stroke="#2f6f68" stroke-width="2"/>
        <rect x="280" y="${f1(y2 - 38)}" width="16" height="76" rx="3" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.4"/>
        <circle cx="288" cy="${f1(y2)}" r="4.5" fill="#fffcf5" stroke="#b45309" stroke-width="2"/>`;

      el('cw-shed').innerHTML = `
        <polygon points="152,248 224,${f1(y1)} 484,248 288,${f1(y2)}" fill="#fff3b8" opacity="${(0.55 * Math.abs(s.shed)).toFixed(2)}"/>
        <polyline points="152,248 224,${f1(y1)} 484,248" fill="none" stroke="#2f6f68" stroke-width="3.2" stroke-linejoin="round"/>
        <polyline points="152,248 288,${f1(y2)} 484,248" fill="none" stroke="#b45309" stroke-width="3.2" stroke-linejoin="round"/>`;

      // Tela amb passades vermelles i plegador girant amb les passades fetes
      let cl = `<line x1="484" y1="248" x2="564" y2="248" stroke="#c8b996" stroke-width="7" stroke-linecap="round"/>
        <line x1="564" y1="248" x2="564" y2="352" stroke="#c8b996" stroke-width="7" stroke-linecap="round"/>`;
      for (let i = 0; i < 4 + s.rows; i++) {
        const wx = 492 + i * 12;
        if (wx < 556) cl += `<circle cx="${wx}" cy="248" r="2.2" fill="#c84b31"/>`;
      }
      el('cw-cloth').innerHTML = cl;

      // Manovella i biela horitzontal en la zona baixa + batà penjant amb pinta metàl·lica
      const beatNorm = (-82 - s.y) / 70; // 0 enrere -> 1 endavant fins a x=480
      const crankX = 622 - 28 * Math.cos(s.angle), crankY = 466 - 28 * Math.sin(s.angle);
      const reedX = 414 + beatNorm * 66;
      el('cw-beater').innerHTML = `
        <line x1="622" y1="466" x2="${f1(crankX)}" y2="${f1(crankY)}" stroke="#b88928" stroke-width="6" stroke-linecap="round"/>
        <line x1="${f1(crankX)}" y1="${f1(crankY)}" x2="${f1(reedX)}" y2="338" stroke="${INK}" stroke-width="8.5" stroke-linecap="round"/>
        <line x1="${f1(crankX)}" y1="${f1(crankY)}" x2="${f1(reedX)}" y2="338" stroke="#7c878e" stroke-width="5.2" stroke-linecap="round"/>
        <circle cx="${f1(crankX)}" cy="${f1(crankY)}" r="6" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
        <line x1="414" y1="146" x2="${f1(reedX)}" y2="338" stroke="${INK}" stroke-width="10.5" stroke-linecap="round"/>
        <line x1="414" y1="146" x2="${f1(reedX)}" y2="338" stroke="url(#tx-fusta)" stroke-width="7.5" stroke-linecap="round"/>
        <circle cx="414" cy="146" r="5.5" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>
        <rect x="${f1(reedX - 4.5)}" y="210" width="9" height="76" rx="2" fill="url(#tx-ferro)" stroke="${INK}" stroke-width="1.4"/>
        <line x1="${f1(reedX)}" y1="216" x2="${f1(reedX)}" y2="280" stroke="#e5ecef" stroke-width="1.8" stroke-dasharray="3 4"/>
        <circle cx="${f1(reedX)}" cy="338" r="6" fill="url(#g-esf-llauto)" stroke="${INK}" stroke-width="1.2"/>`;

      // Llançadora en secció dins la calada i palanca impulsora animada
      const kick = Math.max(s.pickerLeft, s.pickerRight);
      const kickActive = kick > 1;
      const leverTip = 356 - kick * 2.2;
      el('cw-shuttle-side').innerHTML = `
        <line x1="356" y1="466" x2="${f1(leverTip)}" y2="296" stroke="${kickActive ? '#d97706' : '#5a6269'}" stroke-width="${kickActive ? 5.5 : 4.2}" stroke-linecap="round"/>
        <circle cx="356" cy="466" r="7.5" fill="url(#g-esf-ferro)" stroke="${INK}" stroke-width="1.2"/>
        <ellipse cx="386" cy="248" rx="18" ry="8.5" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.5" opacity="${s.weaving ? 1 : 0.24}"/>
        ${s.weaving ? `<path d="M360 232H412" stroke="#d97706" stroke-width="2.4" stroke-dasharray="4 3" marker-end="url(#m-fl)"/>` : ''}`;

      // Panell dret frontal: lliços, braços impulsors, pinta amb dents, llançadora i tela creixent
      const sx = 229 + (s.x / 325) * 165;
      const pickL = s.pickerLeft * 1.6, pickR = s.pickerRight * 1.6;
      const heddleOff = s.shed * 7;
      let fr = '';
      // Lliços frontals animats
      fr += `<rect x="52" y="${f1(72 - heddleOff)}" width="354" height="10" rx="3" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.2"/>
        <rect x="52" y="${f1(88 + heddleOff)}" width="354" height="10" rx="3" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.2"/>`;
      for (let i = 0; i < 14; i++) {
        const x = 66 + i * 25;
        fr += `<line x1="${f1(x)}" y1="${f1(i % 2 ? 78 - heddleOff : 93 + heddleOff)}" x2="${f1(x)}" y2="314" stroke="${i % 2 ? '#2f6f68' : '#b45309'}" stroke-width="1.9"/>`;
      }
      // Tela inferior creixent amb passades anteriors + les passades del cicle
      const bShift = beatNorm * 50;
      fr += `<rect x="46" y="256" width="366" height="72" rx="4" fill="url(#tx-tela)" stroke="${INK}" stroke-width="1.4"/>`;
      for (let b = 0; b < 5; b++) {
        fr += `<line x1="60" y1="${272 + b * 11}" x2="398" y2="${272 + b * 11}" stroke="#d68b76" stroke-width="2.2" opacity=".55"/>`;
      }
      s.wefts.forEach((w, idx) => {
        const wy = w.y <= -150 ? 259 + idx * 6.5 : 186 + bShift;
        const xA = w.reverse ? 398 - 338 * w.amount : 60;
        const xB = w.reverse ? 398 : 60 + 338 * w.amount;
        fr += `<line x1="${f1(xA)}" y1="${f1(wy)}" x2="${f1(xB)}" y2="${f1(wy)}" stroke="#c84b31" stroke-width="3.8" stroke-linecap="round"/>`;
      });
      // Batà frontal amb dents metàl·liques de la pinta i braços impulsors mecànics laterals
      let teeth = '';
      for (let tx = 58; tx <= 400; tx += 9) {
        teeth += `<line x1="${tx}" y1="${f1(168 + bShift)}" x2="${tx}" y2="${f1(188 + bShift)}" stroke="#687279" stroke-width="1.4"/>`;
      }
      fr += `${teeth}
        <rect x="40" y="${f1(164 + bShift)}" width="378" height="6" rx="2" fill="url(#tx-fustaf)" stroke="${INK}" stroke-width="1.1"/>
        <rect x="28" y="${f1(188 + bShift)}" width="402" height="12" rx="3" fill="url(#tx-fusta)" stroke="${INK}" stroke-width="1.3"/>
        <line x1="26" y1="${f1(240)}" x2="${f1(34 + pickL)}" y2="${f1(184 + bShift)}" stroke="${s.pickerLeft > 1 ? '#d97706' : '#5a6269'}" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="432" y1="${f1(240)}" x2="${f1(424 - pickR)}" y2="${f1(184 + bShift)}" stroke="${s.pickerRight > 1 ? '#d97706' : '#5a6269'}" stroke-width="4.5" stroke-linecap="round"/>
        <rect x="${f1(32 + pickL)}" y="${f1(176 + bShift)}" width="13" height="17" rx="2" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.2"/>
        <rect x="${f1(413 - pickR)}" y="${f1(176 + bShift)}" width="13" height="17" rx="2" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.2"/>
        <g transform="translate(${f1(sx)} ${f1(182 + bShift)})">
          <path d="M-24 0Q-12 -8 0 -8Q12 -8 24 0Q12 8 0 8Q-12 8 -24 0Z" fill="url(#tx-llauto)" stroke="${INK}" stroke-width="1.5"/>
          <rect x="-9" y="-3" width="18" height="6" rx="2" fill="url(#tx-cotobob)"/>
        </g>`;
      const steps = ['1 · Calada', '2 · Llançadora', '3 · Batuda'];
      steps.forEach((nom, i) => {
        const on = s.step === i;
        fr += `<rect x="${28 + i * 138}" y="352" width="126" height="32" rx="16" fill="${on ? '#b9722a' : '#efe7d4'}" stroke="${on ? INK : '#d6cbb5'}" stroke-width="1.4"/>
          <text x="${91 + i * 138}" y="372" text-anchor="middle" font-size="13" font-weight="700" fill="${on ? '#fff' : '#6c655c'}">${nom}</text>`;
      });
      const stepNotes = [
        'Les lleves alternen els lliços i obren pas',
        'El braç mecànic llança la trama sense mà',
        'La biela porta la pinta fins a la tela'
      ];
      fr += `<text x="229" y="414" text-anchor="middle" font-size="12.5" font-weight="700" fill="#6f4e28">${stepNotes[s.step]}</text>`;
      el('cw-front').innerHTML = fr;
    };
  }

  /* ==================== REGISTRE D'ESCENES, ETIQUETES I SORTIDA ==================== */
  const BUILDERS = {
    roda: svgRoda,
    llancadora: svgLlancadora,
    jenny: svgJenny,
    water: svgWater,
    mula: svgMula,
    cartwright: svgCartwright
  };
  const ANIMATORS = {
    roda: animaRoda(),
    llancadora: animaLlancadora(),
    jenny: animaJenny(),
    water: animaWater(),
    mula: animaMula(),
    cartwright: animaCartwright()
  };

  /* Etiquetes posicionades amb precisió i seguiment dinàmic (data-seg). */
  const ETIQUETES = {
    roda: [
      ['roda', 935, 130, 880, 175],
      ['corretja', 588, 138, 588, 224],
      ['fus', 292, 198, 292, 304],
      ['fibra', 108, 185, 108, 290],
      ['bastidor', 540, 520, 540, 466]
    ],
    llancadora: [
      ['ordit', 495, 118, 495, 168],
      ['llicos', 345, 168, 345, 228],
      ['caixes', 180, 412, 232, 342],
      ['llancadora', 670, 292, 670, 334, null, 'll-shuttle@0,0'],
      ['pinta', 965, 292, 965, 340],
      ['cordill', 845, 505, 676, 492],
      ['tela', 460, 505, 460, 465],
      ['bastidor', 1125, 430, 1098, 430]
    ],
    jenny: [
      ['metxes', 442, 420, 340, 434],
      ['pinca', 415, 146, 415, 230, null, 'jn-clasp@0,230'],
      ['fusos', 108, 152, 138, 260],
      ['corda', 455, 515, 455, 418],
      ['roda', 715, 212, 715, 265],
      ['bastidor', 225, 550, 225, 515]
    ],
    water: [
      ['metxa', 195, 124, 195, 170],
      ['corrons', 435, 124, 435, 208],
      ['aleta', 625, 124, 635, 355],
      ['aigua', 1055, 168, 1055, 245],
      ['bastidor', 112, 460, 150, 460]
    ],
    mula: [
      ['fileta', 126, 120, 126, 182],
      ['corrons', 252, 120, 252, 226],
      ['carro', 435, 495, 435, 432, null, 'ml-carro@0,432'],
      ['fus', 345, 332, 379, 285, null, 'ml-carro@-56,285'],
      ['roda', 565, 375, 515, 338, null, 'ml-carro@80,338'],
      ['bastidor', 140, 512, 140, 440]
    ],
    cartwright: [
      ['ordit', 102, 182, 102, 214],
      ['llicos', 246, 108, 256, 168],
      ['eix', 292, 518, 256, 466],
      ['pinta', 540, 178, 456, 224],
      ['llancadora', 352, 178, 386, 244],
      ['tela', 590, 316, 564, 360],
      ['transmissio', 712, 98, 712, 142],
      ['bastidor', 112, 514, 112, 548]
    ]
  };

  const SORTIDA = {
    roda: () => 'Fibres soltes → fil torçut → fil recollit',
    jenny: () => 'Una roda, vuit fusos: vuit fils alhora',
    water: () => 'Quatre caps filant en continu',
    mula: () => 'Corrons i carro coordinats: sis fusos',
    llancadora: (s) => (s.rows === 1 ? '1 passada incorporada a la tela' : s.rows + ' passades incorporades a la tela'),
    cartwright: (s) => (s.rows === 1 ? '1 passada incorporada a la tela' : s.rows + ' passades incorporades a la tela')
  };

  function svg(id) {
    return BUILDERS[id]();
  }
  function anima(id) {
    const fn = ANIMATORS[id];
    return (ctx) => {
      fn(ctx);
      const estat = RI.TEXTIL_ESTATS[id];
      if (!estat) return;
      const s = estat(ctx.p);
      const action = document.querySelector('#tx-action');
      const product = document.querySelector('#tx-product');
      if (action && action.textContent !== s.action) action.textContent = s.action;
      const out = (SORTIDA[id] || (() => ''))(s);
      if (product && product.textContent !== out) product.textContent = out;
    };
  }

  const MODELS = {
    roda: 'Roda manual de fus · tall lateral animat',
    llancadora: 'Teler manual amb llançadora volant · vista frontal i secció lateral',
    jenny: 'Spinning Jenny de vuit fusos · tall lateral i vista simultània',
    water: 'Water Frame d’Arkwright · corrons, aleta i força hidràulica',
    mula: 'Mula de Crompton · tall lateral de corrons i carro mòbil',
    cartwright: 'Teler mecànic (1787–1790) · eix de lleves 2:1, biela i vista frontal'
  };

  RI.TEXTIL_DIBUIX = { svg, anima, ETIQUETES, MODELS };
})();
