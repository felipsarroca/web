// SPDX-License-Identifier: AGPL-3.0-or-later
/* Dibuixos tècnics 3D hiper-realistes en alta resolució per al mode «Màquina real».
   Cada làmina es renderitza en SVG vectorial nítid (viewBox 1200x805) sobre fons d'estudi. */
(function () {
  'use strict';
  const T = '#221c18';

  const DEFS = `<defs>
    <radialGradient id="rl-fons" cx=".5" cy=".46" r=".68"><stop offset="0" stop-color="#fdfaf0"/><stop offset=".75" stop-color="#f5ecd6"/><stop offset="1" stop-color="#eadcbb"/></radialGradient>
    <radialGradient id="rl-ombra" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#221c18" stop-opacity=".28"/><stop offset=".65" stop-color="#221c18" stop-opacity=".1"/><stop offset="1" stop-color="#221c18" stop-opacity="0"/></radialGradient>
    <linearGradient id="rl-roure" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99052"/><stop offset=".4" stop-color="#9e622d"/><stop offset="1" stop-color="#693c16"/></linearGradient>
    <linearGradient id="rl-roure-h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7c481c"/><stop offset=".35" stop-color="#be8245"/><stop offset=".7" stop-color="#9b5f2a"/><stop offset="1" stop-color="#5d3311"/></linearGradient>
    <linearGradient id="rl-roure-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfb277"/><stop offset=".55" stop-color="#b87e42"/><stop offset="1" stop-color="#804f22"/></linearGradient>
    <linearGradient id="rl-roure-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c4a21"/><stop offset="1" stop-color="#47260d"/></linearGradient>
    <linearGradient id="rl-ferro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b97a0"/><stop offset=".42" stop-color="#4e5860"/><stop offset="1" stop-color="#252b30"/></linearGradient>
    <linearGradient id="rl-ferro-cil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#31383e"/><stop offset=".28" stop-color="#94a1ab"/><stop offset=".55" stop-color="#58636b"/><stop offset="1" stop-color="#22272c"/></linearGradient>
    <linearGradient id="rl-acer" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7e8992"/><stop offset=".32" stop-color="#eef3f6"/><stop offset=".6" stop-color="#a8b4bc"/><stop offset="1" stop-color="#5a656e"/></linearGradient>
    <linearGradient id="rl-coure" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6be86"/><stop offset=".45" stop-color="#cb7434"/><stop offset="1" stop-color="#7d3b13"/></linearGradient>
    <linearGradient id="rl-coure-cil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7e3c14"/><stop offset=".3" stop-color="#f8c896"/><stop offset=".58" stop-color="#cb7434"/><stop offset="1" stop-color="#69300e"/></linearGradient>
    <linearGradient id="rl-llauto" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a6"/><stop offset=".42" stop-color="#d5a334"/><stop offset="1" stop-color="#7d560f"/></linearGradient>
    <linearGradient id="rl-llauto-cil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#875e12"/><stop offset=".32" stop-color="#fff2ad"/><stop offset=".65" stop-color="#cfa032"/><stop offset="1" stop-color="#6e4b0a"/></linearGradient>
    <linearGradient id="rl-groc-loc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fae078"/><stop offset=".45" stop-color="#e2b429"/><stop offset="1" stop-color="#997210"/></linearGradient>
    <linearGradient id="rl-coto" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfc7b7"/><stop offset=".35" stop-color="#fffdf8"/><stop offset=".75" stop-color="#efe8d9"/><stop offset="1" stop-color="#beb39d"/></linearGradient>
    <linearGradient id="rl-lona" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf5"/><stop offset=".6" stop-color="#eee2c7"/><stop offset="1" stop-color="#c9b691"/></linearGradient>
    <linearGradient id="rl-mar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#62a8cc"/><stop offset=".45" stop-color="#2b6e9c"/><stop offset="1" stop-color="#174162"/></linearGradient>
    <linearGradient id="rl-cel-estudi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dceef5"/><stop offset=".7" stop-color="#f3ecdb"/><stop offset="1" stop-color="#eadec3"/></linearGradient>
    <radialGradient id="rl-brasa" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#fff8bf"/><stop offset=".45" stop-color="#ff9924"/><stop offset="1" stop-color="#c73514"/></radialGradient>
    <pattern id="rl-mao" width="28" height="16" patternUnits="userSpaceOnUse"><rect width="28" height="16" fill="#be5f41"/><path d="M0 0h28M0 8h28M0 0v8M14 8v8" stroke="#e9cfa9" stroke-width="1.2"/><rect x="1" y="1" width="12" height="6" fill="#a84e33" opacity=".35"/></pattern>
    <pattern id="rl-pedra" width="38" height="24" patternUnits="userSpaceOnUse"><rect width="38" height="24" fill="#9e998d"/><path d="M0 0h38M0 12h38M0 0v12M19 12v12" stroke="#6d695e" stroke-width="1.4"/><rect x="2" y="2" width="15" height="8" fill="#b3aea2" opacity=".4"/></pattern>
    <pattern id="rl-fusta-p" width="36" height="14" patternUnits="userSpaceOnUse"><rect width="36" height="14" fill="none"/><path d="M0 4q18-3 36 0M0 10q18 3 36 0" stroke="#47260d" stroke-opacity=".22" stroke-width="1" fill="none"/></pattern>
    <filter id="rl-drop" x="-12%" y="-12%" width="124%" height="124%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#221c18" flood-opacity=".18"/></filter>
  </defs>`;

  function wrap(body, escala) {
    const ex = (escala && escala.x) || 1070, ey = (escala && escala.y) || 675;
    const esc = escala ? `<g transform="translate(${ex} ${ey})" opacity=".68">
      <line x1="0" y1="0" x2="0" y2="-${escala.px}" stroke="#5b5146" stroke-width="1.6" stroke-dasharray="3 3"/>
      <path d="M-5 -${escala.px}h10M-5 0h10" stroke="#5b5146" stroke-width="1.6"/>
      <circle cx="24" cy="-${escala.px - 9}" r="8" fill="#706558"/><path d="M13 -${escala.px - 20}q11-5 22 0l3 34h-7l-2 36h-10l-2-36h-7z" fill="#706558"/>
      <text x="-8" y="-${Math.round(escala.px / 2) - 4}" text-anchor="end" font-size="13" font-weight="700" fill="#5b5146" font-family="Figtree,sans-serif">${escala.txt}</text>
    </g>` : '';
    return `<svg class="real-svg" viewBox="0 0 1200 805" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${DEFS}<rect width="1200" height="805" fill="url(#rl-fons)"/>${body}${esc}</svg>`;
  }

  /* Ajuda de caixa 3D amb tres cares (frontal, superior, lateral) */
  function caixa3D(x, y, w, h, dx, dy, fillF, fillT, fillS) {
    return `<polygon points="${x},${y} ${x + dx},${y + dy} ${x + w + dx},${y + dy} ${x + w},${y}" fill="${fillT}" stroke="${T}" stroke-width="1.8" stroke-linejoin="round"/>
      <polygon points="${x + w},${y} ${x + w + dx},${y + dy} ${x + w + dx},${y + h + dy} ${x + w},${y + h}" fill="${fillS}" stroke="${T}" stroke-width="1.8" stroke-linejoin="round"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fillF}" stroke="${T}" stroke-width="1.9" stroke-linejoin="round"/>`;
  }

  function rodaIso(cx, cy, rx, ry, raigs, colR, colB) {
    let s = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${T}" stroke-width="13"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${colR || 'url(#rl-roure)'}" stroke-width="9"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${(rx - 4).toFixed(1)}" ry="${(ry - 4).toFixed(1)}" fill="none" stroke="#fff" stroke-width="1.2" opacity=".28"/>`;
    for (let i = 0; i < raigs; i++) {
      const a = (i * Math.PI * 2) / raigs;
      const x2 = cx + Math.cos(a) * (rx - 4), y2 = cy + Math.sin(a) * (ry - 4);
      s += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${T}" stroke-width="6.5" stroke-linecap="round"/>
        <line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${colR || '#b87e42'}" stroke-width="3.6" stroke-linecap="round"/>`;
    }
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${(rx * 0.22).toFixed(1)}" ry="${(ry * 0.22).toFixed(1)}" fill="${colB || 'url(#rl-llauto)'}" stroke="${T}" stroke-width="2"/>`;
    return s;
  }

  const REALS = {
    /* 1 · Teler de llançadora volant (Kay, 1733) */
    llancadora() {
      let orditFils = '', telaRatlles = '';
      for (let i = 0; i <= 26; i++) {
        const t = i / 26, x1 = 310 + t * 390, x2 = 435 + t * 380;
        orditFils += `<line x1="${x1.toFixed(1)}" y1="455" x2="${x2.toFixed(1)}" y2="305" stroke="${i % 2 ? '#e9dec7' : '#fffdf7'}" stroke-width="1.6" opacity=".88"/>`;
        orditFils += `<line x1="${x1.toFixed(1)}" y1="455" x2="${(375 + t * 384).toFixed(1)}" y2="380" stroke="#fffdf7" stroke-width="1.2" opacity=".7"/>`;
      }
      for (let i = 0; i < 10; i++) {
        const y = 458 + i * 7.5;
        telaRatlles += `<line x1="298" y1="${y}" x2="688" y2="${y}" stroke="${i % 3 === 0 ? '#8c442d' : '#d8cbb0'}" stroke-width="1.8"/>`;
      }
      let s = `<ellipse cx="600" cy="655" rx="430" ry="62" fill="url(#rl-ombra)"/>`;
      // Muntants posteriors
      s += caixa3D(410, 175, 28, 405, 16, -10, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(800, 175, 28, 405, 16, -10, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      // Travessers posteriors i corró d'ordit
      s += caixa3D(424, 175, 386, 26, 16, -10, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += `<rect x="422" y="290" width="398" height="36" rx="14" fill="url(#rl-coto)" stroke="${T}" stroke-width="2"/>`;
      s += `<ellipse cx="820" cy="308" rx="10" ry="18" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.8"/>`;
      // Bigues laterals del bastidor
      s += `<polygon points="278,215 410,175 428,184 298,225" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.8"/>`;
      s += `<polygon points="278,215 298,225 298,252 278,242" fill="url(#rl-roure-f)" stroke="${T}" stroke-width="1.8"/>`;
      s += `<polygon points="694,215 800,175 818,184 714,225" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.8"/>`;
      s += `<polygon points="278,565 410,515 426,522 296,574" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.8"/>`;
      s += `<polygon points="694,565 800,515 816,522 712,574" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.8"/>`;
      // Ordit i lliços suspesos
      s += orditFils;
      s += `<rect x="385" y="255" width="370" height="10" rx="3" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.5"/>`;
      s += `<line x1="465" y1="220" x2="465" y2="255" stroke="#5b4328" stroke-width="2.5"/><line x1="675" y1="220" x2="675" y2="255" stroke="#5b4328" stroke-width="2.5"/>`;
      s += `<circle cx="465" cy="222" r="9" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.6"/><circle cx="675" cy="222" r="9" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.6"/>`;
      // Lliços (marcs amb fils verticals)
      s += `<rect x="392" y="280" width="356" height="142" fill="none" stroke="url(#rl-roure)" stroke-width="7"/>`;
      for (let i = 0; i < 36; i++) {
        const lx = 402 + i * 9.6;
        s += `<line x1="${lx}" y1="283" x2="${lx}" y2="419" stroke="#6f5a44" stroke-width="1" opacity=".55"/>`;
      }
      // Pinta batent amb caixes laterals de cuir i cordill de llançadora
      s += `<g filter="url(#rl-drop)">`;
      s += caixa3D(258, 380, 72, 40, 12, -8, 'url(#rl-roure-f)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(650, 380, 72, 40, 12, -8, 'url(#rl-roure-f)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += `<rect x="315" y="388" width="350" height="28" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.8"/>`;
      for (let i = 0; i < 42; i++) {
        const px = 322 + i * 8;
        s += `<line x1="${px}" y1="365" x2="${px}" y2="388" stroke="#c8d0d6" stroke-width="1.5"/>`;
      }
      s += `<rect x="315" y="358" width="350" height="9" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.6"/>`;
      s += `</g>`;
      // Llançadora de boix polit amb rodetes i canilla de fil vermell
      s += `<g transform="translate(530 398)">
        <path d="M-48 0Q-24 -16 0 -16Q24 -16 48 0Q24 16 0 16Q-24 16 -48 0Z" fill="url(#rl-llauto)" stroke="${T}" stroke-width="2"/>
        <path d="M-54 0l10 -4v8zM54 0l-10 -4v8z" fill="url(#rl-acer)" stroke="${T}" stroke-width="1.2"/>
        <rect x="-24" y="-6" width="48" height="12" rx="4" fill="#3b2615"/>
        <rect x="-18" y="-4" width="36" height="8" rx="3" fill="#d9482b"/>
      </g>`;
      // Cordill i mànec del teixidor
      s += `<path d="M294 380Q490 288 686 380" fill="none" stroke="#3c2f23" stroke-width="2.4"/>`;
      s += `<rect x="483" y="330" width="14" height="34" rx="5" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.8"/>`;
      // Muntants frontals i corró de tela teixida
      s += caixa3D(268, 215, 30, 440, 16, -10, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(684, 215, 30, 440, 16, -10, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(280, 212, 418, 28, 16, -10, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      // Tela acabada enrotllant-se al corró frontal
      s += `<polygon points="298,455 688,455 688,530 298,530" fill="#efe6d1" stroke="${T}" stroke-width="1.8"/>${telaRatlles}`;
      s += `<rect x="294" y="514" width="398" height="36" rx="14" fill="url(#rl-roure)" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="296" y="516" width="392" height="18" rx="8" fill="#efe6d1" opacity=".88"/>`;
      // Pedaleres i banqueta
      s += `<path d="M405 636l40 -42h150l-40 42z" fill="url(#rl-roure-f)" stroke="${T}" stroke-width="1.6"/>`;
      s += `<rect x="430" y="618" width="44" height="10" rx="2" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.5"/>`;
      s += `<rect x="505" y="608" width="44" height="10" rx="2" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.5"/>`;
      return wrap(s, { px: 190, txt: '~2,1 m' });
    },

    /* 2 · Spinning Jenny de 8 fusos (Hargreaves, 1764) */
    jenny() {
      let s = `<ellipse cx="600" cy="645" rx="450" ry="60" fill="url(#rl-ombra)"/>`;
      // Potes posteriors i bastiment base inclinat
      s += caixa3D(780, 250, 26, 360, 14, -8, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(910, 285, 26, 325, 14, -8, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      // Longuers laterals
      s += `<polygon points="210,550 810,410 822,424 222,566" fill="url(#rl-roure)" stroke="${T}" stroke-width="2"/>`;
      s += `<polygon points="340,605 935,455 947,469 352,621" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="2"/>`;
      // Potes frontals
      s += caixa3D(205, 535, 26, 95, 14, -8, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(335, 588, 26, 95, 14, -8, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      // Fileta inclinada amb 8 bobines gruixudes de metxa blanca assentada sobre les bigues
      s += `<polygon points="225,525 420,478 430,496 235,543" fill="url(#rl-roure-f)" stroke="${T}" stroke-width="1.8"/>`;
      for (let i = 0; i < 8; i++) {
        const bx = 258 + i * 21, by = 528 - i * 5.8;
        s += `<line x1="${bx}" y1="${by - 28}" x2="${bx}" y2="${by + 28}" stroke="url(#rl-acer)" stroke-width="3"/>`;
        s += `<rect x="${bx - 9}" y="${by - 22}" width="18" height="42" rx="7" fill="url(#rl-coto)" stroke="${T}" stroke-width="1.5"/>`;
        // Metxa cap al carro pinça i després als fusos
        const fx = 698 + i * 23, fy = 285 + i * 6.5;
        const cxp = 382 + i * 21, cyp = 468 - i * 4;
        s += `<path d="M${bx} ${by - 22}L${cxp} ${cyp}L${fx} ${fy + 16}" fill="none" stroke="#fffdf7" stroke-width="2.1" opacity=".92"/>`;
      }
      // Tambor de transmissió inferior i cordes cap als fusos
      s += `<ellipse cx="645" cy="435" rx="34" ry="72" fill="url(#rl-roure-h)" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="645" y="363" width="135" height="144" fill="url(#rl-roure)" stroke="${T}" stroke-width="2"/>`;
      s += `<ellipse cx="780" cy="435" rx="34" ry="72" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="2"/>`;
      // Carro pinça mòbil assentat físicament sobre els rails amb rodetes de ferro
      s += `<g filter="url(#rl-drop)">
        <polygon points="358,478 525,438 565,452 398,494" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.8"/>
        <polygon points="358,478 398,494 398,536 358,520" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.8"/>
        <polygon points="398,494 565,452 565,494 398,536" fill="url(#rl-roure-f)" stroke="${T}" stroke-width="1.8"/>
        <rect x="368" y="468" width="166" height="10" rx="3" transform="rotate(-13 450 473)" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.4"/>
        <circle cx="385" cy="526" r="10" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.8"/>
        <circle cx="535" cy="492" r="10" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.8"/>
      </g>`;
      // Bastidor elevat dels 8 fusos d'acer verticals (suportat per peus fins a la bancada)
      s += caixa3D(675, 345, 215, 22, 14, -8, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      for (let i = 0; i < 8; i++) {
        const fx = 698 + i * 23, fy = 296 + i * 6.2;
        s += `<line x1="710" y1="430" x2="${fx}" y2="${fy + 45}" stroke="#8d6d46" stroke-width="1.3" opacity=".7"/>`;
        s += `<line x1="${fx}" y1="${fy - 44}" x2="${fx}" y2="${fy + 56}" stroke="url(#rl-acer)" stroke-width="3.6" stroke-linecap="round"/>`;
        s += `<ellipse cx="${fx}" cy="${fy + 44}" rx="6" ry="3.2" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.2"/>`;
        s += `<path d="M${fx - 8} ${fy + 36}Q${fx} ${fy - 14} ${fx + 8} ${fy + 36}Z" fill="url(#rl-coto)" stroke="${T}" stroke-width="1.4"/>`;
      }
      // Fil-guia de llautó muntat amb suports sobre el bastidor dels fusos
      s += `<line x1="690" y1="276" x2="690" y2="345" stroke="url(#rl-ferro)" stroke-width="4"/>
            <line x1="870" y1="316" x2="870" y2="365" stroke="url(#rl-ferro)" stroke-width="4"/>
            <line x1="684" y1="274" x2="876" y2="318" stroke="url(#rl-llauto)" stroke-width="4.5" stroke-linecap="round"/>`;
      // Gran roda manual dreta i corda de cànem fins al tambor
      s += `<path d="M775 375L928 320M782 496L960 546" stroke="#6c5234" stroke-width="4.2"/>`;
      s += `<g filter="url(#rl-drop)">${rodaIso(945, 434, 88, 128, 10, 'url(#rl-roure-c)', 'url(#rl-llauto)')}</g>`;
      s += `<line x1="945" y1="434" x2="995" y2="412" stroke="url(#rl-ferro)" stroke-width="6" stroke-linecap="round"/>`;
      s += `<rect x="990" y="400" width="28" height="12" rx="5" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.8"/>`;
      return wrap(s, { px: 165, txt: '~1,3 m' });
    },

    /* 3 · Water Frame (Richard Arkwright, 1769) */
    water() {
      let s = `<ellipse cx="600" cy="660" rx="340" ry="52" fill="url(#rl-ombra)"/>`;
      // Bastidor principal de roure d'alçada vertical (tipus màquina original de Manchester)
      s += caixa3D(330, 145, 36, 495, 22, -12, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(810, 145, 36, 495, 22, -12, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(310, 130, 560, 28, 22, -12, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(330, 325, 515, 26, 18, -10, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(330, 565, 515, 26, 18, -10, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      // Roda i arbre d'engranatges motriu a la base
      s += `<g transform="translate(275 500)">${rodaIso(0, 0, 58, 92, 8, 'url(#rl-ferro)', 'url(#rl-llauto)')}</g>`;
      s += `<rect x="275" y="492" width="560" height="14" fill="url(#rl-ferro-cil)" stroke="${T}" stroke-width="1.8"/>`;
      // 4 bobines superiors grans de metxa
      for (let i = 0; i < 4; i++) {
        const bx = 420 + i * 110;
        s += `<line x1="${bx}" y1="158" x2="${bx}" y2="255" stroke="url(#rl-ferro)" stroke-width="4"/>`;
        s += `<ellipse cx="${bx}" cy="175" rx="30" ry="8" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.5"/>`;
        s += `<rect x="${bx - 24}" y="177" width="48" height="62" rx="6" fill="url(#rl-coto)" stroke="${T}" stroke-width="1.8"/>`;
        s += `<ellipse cx="${bx}" cy="240" rx="30" ry="8" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.5"/>`;
        // Metxa baixant cap als corrons
        s += `<path d="M${bx} 248Q${bx - 4} 285 ${bx} 312" fill="none" stroke="#fffdf7" stroke-width="4.5" stroke-linecap="round"/>`;
      }
      // Tren triple de corrons d'estiratge acanalats amb pesos penjants i engranatge lateral
      s += `<rect x="372" y="294" width="430" height="16" rx="5" fill="url(#rl-ferro-cil)" stroke="${T}" stroke-width="1.6"/>`;
      s += `<rect x="372" y="312" width="430" height="14" rx="4" fill="url(#rl-llauto-cil)" stroke="${T}" stroke-width="1.6"/>`;
      s += `<rect x="372" y="330" width="430" height="16" rx="5" fill="url(#rl-acer)" stroke="${T}" stroke-width="1.6"/>`;
      // Pesos de pressió penjant sota els corrons
      for (let i = 0; i < 4; i++) {
        const wx = 420 + i * 110;
        s += `<line x1="${wx - 16}" y1="338" x2="${wx - 16}" y2="392" stroke="#3c4348" stroke-width="2.5"/>`;
        s += `<rect x="${wx - 24}" y="388" width="16" height="28" rx="3" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.6"/>`;
        // Fil estirat fi baixant a l'aleta
        s += `<line x1="${wx}" y1="346" x2="${wx}" y2="448" stroke="#fffdf7" stroke-width="2"/>`;
      }
      // Engranatges laterals visibles de velocitats creixents
      s += `<circle cx="378" cy="316" r="26" fill="url(#rl-llauto)" stroke="${T}" stroke-width="2" stroke-dasharray="6 4"/>`;
      s += `<circle cx="378" cy="316" r="10" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.6"/>`;
      // 4 aletes giratòries i bobines de fil acabat
      for (let i = 0; i < 4; i++) {
        const ax = 420 + i * 110;
        s += `<path d="M${ax - 24} 540v-74q0-14 24-14t24 14v74" fill="none" stroke="url(#rl-acer)" stroke-width="5" stroke-linecap="round"/>`;
        s += `<line x1="${ax}" y1="440" x2="${ax}" y2="575" stroke="url(#rl-ferro-cil)" stroke-width="4.5"/>`;
        s += `<rect x="${ax - 14}" y="472" width="28" height="62" rx="4" fill="url(#rl-coto)" stroke="${T}" stroke-width="1.7"/>`;
        s += `<ellipse cx="${ax}" cy="472" rx="18" ry="5" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="1.4"/>`;
        s += `<ellipse cx="${ax}" cy="534" rx="18" ry="5" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.4"/>`;
        // Politja de transmissió inferior
        s += `<ellipse cx="${ax}" cy="555" rx="16" ry="6" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.6"/>`;
      }
      return wrap(s, { px: 205, txt: '~1,8 m' });
    },

    /* 4 · Mula de Crompton (1779) */
    mula() {
      let s = `<ellipse cx="600" cy="645" rx="475" ry="60" fill="url(#rl-ombra)"/>`;
      // Fileta posterior de dos pisos amb bobines
      s += caixa3D(145, 195, 22, 390, 14, -8, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(355, 155, 22, 390, 14, -8, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(158, 250, 205, 14, 14, -8, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += caixa3D(158, 375, 205, 14, 14, -8, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      for (let row = 0; row < 2; row++) {
        for (let i = 0; i < 6; i++) {
          const bx = 185 + i * 31, by = 225 + row * 124 - i * 6.2;
          s += `<rect x="${bx - 9}" y="${by}" width="18" height="44" rx="7" fill="url(#rl-coto)" stroke="${T}" stroke-width="1.4"/>`;
        }
      }
      // Capçal fix metàl·lic i banc de corrons
      s += `<g filter="url(#rl-drop)">
        ${caixa3D(350, 295, 130, 255, 24, -12, 'url(#rl-ferro)', 'url(#rl-acer)', 'url(#rl-ferro)')}
        <rect x="374" y="302" width="120" height="16" rx="5" fill="url(#rl-llauto-cil)" stroke="${T}" stroke-width="1.6"/>
        <rect x="374" y="324" width="120" height="16" rx="5" fill="url(#rl-acer)" stroke="${T}" stroke-width="1.6"/>
        ${rodaIso(392, 415, 42, 62, 6, 'url(#rl-ferro)', 'url(#rl-llauto)')}
      </g>`;
      // Rails de ferro al terra sobre els quals corre el carro
      s += `<line x1="485" y1="620" x2="985" y2="545" stroke="url(#rl-acer)" stroke-width="9" stroke-linecap="round"/>`;
      s += `<line x1="635" y1="660" x2="1085" y2="578" stroke="url(#rl-acer)" stroke-width="9" stroke-linecap="round"/>`;
      // Carro mòbil amb 8 fusos inclinats en perspectiva
      s += `<g filter="url(#rl-drop)">
        <polygon points="620,490 985,425 1020,445 655,512" fill="url(#rl-roure-c)" stroke="${T}" stroke-width="2"/>
        <polygon points="620,490 655,512 655,585 620,562" fill="url(#rl-roure-h)" stroke="${T}" stroke-width="2"/>
        <polygon points="655,512 1020,445 1020,518 655,585" fill="url(#rl-roure)" stroke="${T}" stroke-width="2"/>
      </g>`;
      // Rodes del carro sobre rails
      s += rodaIso(675, 598, 26, 36, 6, 'url(#rl-ferro)', 'url(#rl-llauto)');
      s += rodaIso(965, 535, 22, 32, 6, 'url(#rl-ferro)', 'url(#rl-llauto)');
      // Gran roda motriu muntada al carro i 8 fusos inclinats
      s += rodaIso(845, 410, 56, 86, 8, 'url(#rl-ferro)', 'url(#rl-llauto)');
      for (let i = 0; i < 8; i++) {
        const fx = 682 + i * 40, fy = 492 - i * 7.5;
        s += `<line x1="${fx}" y1="${fy + 16}" x2="${fx - 18}" y2="${fy - 98}" stroke="url(#rl-acer)" stroke-width="3.6" stroke-linecap="round"/>`;
        s += `<path d="M${fx - 15} ${fy - 16}Q${fx - 18} ${fy - 74} ${fx + 2} ${fy - 18}Z" fill="url(#rl-coto)" stroke="${T}" stroke-width="1.3"/>`;
        // Fils fins tensats des dels corrons fins a la punta de cada fus!
        s += `<line x1="478" y1="${318 + (i % 3) * 4}" x2="${fx - 18}" y2="${fy - 94}" stroke="#fffdf7" stroke-width="1.7" opacity=".9"/>`;
      }
      return wrap(s, { px: 195, txt: '~2,5 m' });
    },

    /* 5 · Màquina atmosfèrica de Newcomen (1712) */
    newcomen() {
      let s = `<rect width="1200" height="805" fill="url(#rl-cel-estudi)"/>`;
      s += `<rect x="0" y="620" width="1200" height="185" fill="#d9cca8"/>`;
      s += `<path d="M0 620h1200" stroke="${T}" stroke-width="2.5"/>`;
      // Pou miner dret i canal d'aigua
      s += `<rect x="815" y="620" width="108" height="175" fill="#463e37" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="780" y="595" width="178" height="25" fill="url(#rl-pedra)" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="835" y="535" width="54" height="235" fill="url(#rl-ferro-cil)" stroke="${T}" stroke-width="2"/>`;
      s += `<path d="M889 585h130v18H889z" fill="url(#rl-roure)" stroke="${T}" stroke-width="1.8"/>`;
      // Casa de màquines de maó en perspectiva 3/4 oberta
      s += `<polygon points="150,240 480,145 565,190 565,620 150,620" fill="#efe3c6" stroke="${T}" stroke-width="2.2"/>`;
      s += `<rect x="125" y="235" width="38" height="385" fill="url(#rl-mao)" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="520" y="200" width="56" height="420" fill="url(#rl-mao)" stroke="${T}" stroke-width="2"/>`;
      s += `<polygon points="102,245 360,122 595,205 565,222 360,146 125,260" fill="#9c3f2a" stroke="${T}" stroke-width="2.2"/>`;
      // Caldera de coure reblat en obra de maó amb llar encesa
      s += `<rect x="245" y="510" width="210" height="110" fill="url(#rl-mao)" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="290" y="545" width="120" height="72" rx="8" fill="#2c241f" stroke="${T}" stroke-width="2"/>`;
      s += `<ellipse cx="350" cy="596" rx="46" ry="18" fill="url(#rl-brasa)"/>`;
      s += `<path d="M255 510C255 418 445 418 445 510Z" fill="url(#rl-coure)" stroke="${T}" stroke-width="2.2"/>`;
      s += `<path d="M262 490h176M275 466h150" stroke="#7d3b13" stroke-width="2" stroke-dasharray="3 10" opacity=".65"/>`;
      // Cilindre vertical de llautó muntat a sobre de la caldera
      s += `<rect x="305" y="295" width="90" height="150" fill="url(#rl-llauto-cil)" stroke="${T}" stroke-width="2.2"/>`;
      s += `<ellipse cx="350" cy="295" rx="45" ry="12" fill="url(#rl-llauto)" stroke="${T}" stroke-width="2"/>`;
      s += `<ellipse cx="350" cy="295" rx="34" ry="8" fill="#2b2622"/>`;
      s += `<rect x="297" y="438" width="106" height="12" rx="3" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.8"/>`;
      // Dipòsit d'aigua freda elevat i canonades
      s += caixa3D(180, 260, 74, 52, 12, -7, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      s += `<path d="M215 312V430H305" fill="none" stroke="url(#rl-coure)" stroke-width="10"/>`;
      // Tija del pistó i cadena
      s += `<rect x="345" y="210" width="10" height="85" fill="url(#rl-acer)" stroke="${T}" stroke-width="1.5"/>`;
      s += `<path d="M350 112v98" stroke="${T}" stroke-width="5" stroke-dasharray="6 4"/>`;
      // Gegantí balancí de roure reblat amb doble arc de fusta
      s += `<g transform="rotate(-5 552 175)">
        <path d="M342 96A185 185 0 0 0 342 254" fill="none" stroke="url(#rl-roure)" stroke-width="18"/>
        <path d="M342 96A185 185 0 0 0 342 254" fill="none" stroke="${T}" stroke-width="20" opacity=".2"/>
        <path d="M858 96A185 185 0 0 1 858 254" fill="none" stroke="url(#rl-roure)" stroke-width="18"/>
        ${caixa3D(342, 152, 516, 46, 18, -10, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)')}
        <path d="M350 105L430 165M350 245L430 185M850 105L770 165M850 245L770 185" stroke="url(#rl-roure-f)" stroke-width="9" stroke-linecap="round"/>
        <circle cx="548" cy="175" r="16" fill="url(#rl-llauto)" stroke="${T}" stroke-width="2.2"/>
      </g>`;
      // Cadena i vareta fins al pou
      s += `<path d="M854 148v95" stroke="${T}" stroke-width="5" stroke-dasharray="6 4"/>`;
      s += `<rect x="846" y="242" width="16" height="315" fill="url(#rl-roure-h)" stroke="${T}" stroke-width="2"/>`;
      return wrap(s, { px: 112, txt: '~7,5 m' });
    },

    /* 6 · Màquina de Watt amb condensador separat (1769) */
    watt() {
      let s = `<ellipse cx="600" cy="655" rx="440" ry="56" fill="url(#rl-ombra)"/>`;
      // Peanya i murs seccionats de pedra grisa
      s += `<rect x="115" y="610" width="970" height="40" fill="url(#rl-pedra)" stroke="${T}" stroke-width="2.2"/>`;
      s += caixa3D(505, 195, 58, 415, 22, -12, 'url(#rl-mao)', 'url(#rl-mao)', 'url(#rl-roure-f)');
      // Caldera tipus carruatge a l'esquerra en obra de maó amb cúpula de coure
      s += caixa3D(135, 455, 210, 155, 26, -14, 'url(#rl-mao)', 'url(#rl-mao)', 'url(#rl-roure-f)');
      s += `<path d="M150 455C150 375 335 375 335 455Z" fill="url(#rl-coure)" stroke="${T}" stroke-width="2.2"/>`;
      s += `<rect x="198" y="510" width="84" height="90" rx="6" fill="#2c241f" stroke="${T}" stroke-width="2"/>`;
      s += `<ellipse cx="240" cy="568" rx="34" ry="14" fill="url(#rl-brasa)"/>`;
      // Canonada de vapor cap a la camisa del cilindre
      s += `<path d="M242 395V282H388V322" fill="none" stroke="${T}" stroke-width="18" stroke-linejoin="round"/>`;
      s += `<path d="M242 395V282H388V322" fill="none" stroke="url(#rl-coure)" stroke-width="12" stroke-linejoin="round"/>`;
      // Cilindre tancat amb camisa de fusta/coure encerclada amb tires de llautó sobre pedestal
      s += `<rect x="374" y="520" width="108" height="90" fill="url(#rl-pedra)" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="382" y="325" width="92" height="195" rx="6" fill="url(#rl-roure-h)" stroke="${T}" stroke-width="2.2"/>`;
      s += `<rect x="378" y="348" width="100" height="8" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.3"/>`;
      s += `<rect x="378" y="425" width="100" height="8" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.3"/>`;
      s += `<rect x="378" y="495" width="100" height="8" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.3"/>`;
      s += `<rect x="372" y="314" width="112" height="14" rx="4" fill="url(#rl-ferro)" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="414" y="294" width="28" height="20" fill="url(#rl-llauto-cil)" stroke="${T}" stroke-width="1.8"/>`;
      // Tub d'equilibri frontal i caixa de vàlvules
      s += `<rect x="478" y="335" width="22" height="175" rx="4" fill="url(#rl-ferro-cil)" stroke="${T}" stroke-width="1.8"/>`;
      // Tija del pistó i cadena
      s += `<rect x="423" y="218" width="10" height="76" fill="url(#rl-acer)" stroke="${T}" stroke-width="1.5"/>`;
      // Condensador separat i bomba d'aire dins de tina de fusta amb cèrcols de ferro
      s += `<rect x="595" y="465" width="195" height="145" fill="url(#rl-roure)" stroke="${T}" stroke-width="2.2"/>`;
      s += `<ellipse cx="692" cy="465" rx="97" ry="16" fill="#76bfe4" stroke="${T}" stroke-width="2"/>`;
      s += `<rect x="592" y="492" width="201" height="9" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.4"/>`;
      s += `<rect x="592" y="565" width="201" height="9" fill="url(#rl-ferro)" stroke="${T}" stroke-width="1.4"/>`;
      s += `<path d="M474 510H642V558" fill="none" stroke="${T}" stroke-width="16" stroke-linejoin="round"/>`;
      s += `<path d="M474 510H642V558" fill="none" stroke="url(#rl-ferro-cil)" stroke-width="10" stroke-linejoin="round"/>`;
      s += `<rect x="625" y="492" width="46" height="95" rx="8" fill="url(#rl-coure-cil)" stroke="${T}" stroke-width="1.8"/>`;
      s += `<rect x="708" y="478" width="42" height="108" rx="6" fill="url(#rl-llauto-cil)" stroke="${T}" stroke-width="1.8"/>`;
      s += `<line x1="729" y1="228" x2="729" y2="482" stroke="url(#rl-acer)" stroke-width="6"/>`;
      // Balancí amb arcs de tracció i columna
      s += `<g transform="rotate(4 540 175)">
        <path d="M420 104A170 170 0 0 0 420 246" fill="none" stroke="url(#rl-roure)" stroke-width="16"/>
        <path d="M890 104A170 170 0 0 1 890 246" fill="none" stroke="url(#rl-roure)" stroke-width="16"/>
        ${caixa3D(420, 154, 470, 42, 16, -9, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)')}
        <circle cx="536" cy="175" r="14" fill="url(#rl-llauto)" stroke="${T}" stroke-width="2"/>
      </g>`;
      s += `<path d="M428 118v100M886 118v110" stroke="${T}" stroke-width="4.5" stroke-dasharray="5 3"/>`;
      s += `<rect x="878" y="228" width="16" height="382" fill="url(#rl-roure-h)" stroke="${T}" stroke-width="2"/>`;
      return wrap(s, { px: 130, txt: '~5,8 m' });
    },

    /* ── 7. BOULTON & WATT ROTATIVA (1784) ── */
    rotativa() {
      let s = `<ellipse cx="600" cy="655" rx="440" ry="52" fill="url(#rl-ombra)"/>`;
      // Base de pedra i bancada de ferro fos (x, y, w, h, dx, dy, fillF, fillT, fillS)
      s += caixa3D(240, 565, 680, 74, 34, -18, 'url(#rl-pedra)', '#b5aa98', '#786f62');
      s += caixa3D(275, 535, 610, 32, 28, -14, 'url(#rl-ferro)', '#566068', '#22282d');
      // Columna de fusta de roure central + tirants diagonals fins a la bancada
      s += `<line x1="305" y1="535" x2="565" y2="250" stroke="#492e18" stroke-width="16" stroke-linecap="round"/>
            <line x1="865" y1="535" x2="595" y2="250" stroke="#492e18" stroke-width="16" stroke-linecap="round"/>`;
      s += caixa3D(552, 232, 52, 305, 16, -10, 'url(#rl-roure-h)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      // Balancí doble de roure reforçat amb tires de ferro
      s += `<g filter="url(#rl-drop)" transform="translate(578,242) rotate(-7)">
              <rect x="-250" y="-20" width="500" height="36" rx="14" fill="url(#rl-roure)" stroke="#3e2716" stroke-width="2.5"/>
              <rect x="-230" y="-12" width="460" height="7" fill="url(#rl-ferro)" opacity="0.8"/>
              <rect x="-230" y="9" width="460" height="7" fill="url(#rl-ferro)" opacity="0.8"/>
              <circle cx="0" cy="0" r="14" fill="url(#rl-llauto)" stroke="#3e2716" stroke-width="2"/>
              <circle cx="-215" cy="0" r="10" fill="url(#rl-acer)" stroke="#23282c" stroke-width="1.5"/>
              <circle cx="215" cy="0" r="10" fill="url(#rl-acer)" stroke="#23282c" stroke-width="1.5"/>
            </g>`;
      // Paral·lelogram articulat esquerre (guia rectilínia)
      s += `<g stroke="#2a3036" stroke-width="4.5" fill="none">
              <line x1="365" y1="268" x2="365" y2="345"/>
              <line x1="418" y1="260" x2="418" y2="338"/>
              <line x1="365" y1="345" x2="418" y2="338"/>
              <line x1="418" y1="338" x2="495" y2="322" stroke="#606a73" stroke-width="3.2"/>
            </g>
            <circle cx="365" cy="345" r="5.5" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.2"/>
            <circle cx="418" cy="338" r="5.5" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.2"/>
            <line x1="365" y1="345" x2="365" y2="415" stroke="url(#rl-acer)" stroke-width="10"/>`;
      // Cilindre de vapor folrat de roure i cèrcols de llautó
      s += `<rect x="315" y="405" width="102" height="132" rx="8" fill="url(#rl-roure-h)" stroke="#3e2716" stroke-width="2.2"/>
            <rect x="310" y="398" width="112" height="16" rx="4" fill="url(#rl-ferro)" stroke="#1b2024" stroke-width="1.8"/>
            <rect x="310" y="524" width="112" height="16" rx="4" fill="url(#rl-ferro)" stroke="#1b2024" stroke-width="1.8"/>
            <rect x="323" y="424" width="86" height="6" fill="url(#rl-llauto)"/>
            <rect x="323" y="468" width="86" height="6" fill="url(#rl-llauto)"/>
            <rect x="323" y="508" width="86" height="6" fill="url(#rl-llauto)"/>`;
      // Regulador centrífug de boles (Flyball governor) recolzat a la bancada
      s += `<line x1="482" y1="345" x2="482" y2="535" stroke="url(#rl-acer)" stroke-width="6"/>
            <circle cx="482" cy="350" r="8" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.4"/>
            <line x1="482" y1="352" x2="442" y2="395" stroke="#2c3136" stroke-width="3.5"/>
            <line x1="482" y1="352" x2="522" y2="395" stroke="#2c3136" stroke-width="3.5"/>
            <circle cx="440" cy="398" r="14" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="1.6"/>
            <circle cx="524" cy="398" r="14" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="1.6"/>
            <line x1="448" y1="406" x2="482" y2="435" stroke="#2c3136" stroke-width="2.5"/>
            <line x1="516" y1="406" x2="482" y2="435" stroke="#2c3136" stroke-width="2.5"/>
            <rect x="472" y="428" width="20" height="14" rx="3" fill="url(#rl-coure)" stroke="${T}" stroke-width="1.4"/>`;
      // Condensador separat de coure sota el cilindre
      s += `<rect x="435" y="484" width="60" height="52" rx="6" fill="url(#rl-coure-cil)" stroke="#532812" stroke-width="2"/>
            <path d="M417,518 H436" stroke="url(#rl-coure)" stroke-width="8"/>`;
      // Biela dreta unida al planeta i transmissió sol-planeta
      s += `<line x1="792" y1="215" x2="792" y2="390" stroke="url(#rl-ferro)" stroke-width="14" stroke-linecap="round"/>
            <circle cx="792" cy="215" r="9" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.4"/>`;
      // Gran volant d'inèrcia de ferro fos en perspectiva lleu (rx=124, ry=138!)
      s += `<g filter="url(#rl-drop)">${rodaIso(792, 435, 124, 138, 6, '#3a4148', 'url(#rl-ferro)')}</g>`;
      s += `<circle cx="792" cy="435" r="26" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="2" stroke-dasharray="6,4"/>
            <circle cx="792" cy="435" r="12" fill="url(#rl-ferro)"/>
            <circle cx="792" cy="390" r="22" fill="url(#rl-acer)" stroke="#20252a" stroke-width="2" stroke-dasharray="5,4"/>
            <circle cx="792" cy="390" r="8" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.2"/>`;
      // Corretja cap a l'arbre de transmissió
      s += `<path d="M768,415 L960,356 M775,455 L960,396" stroke="#5b3b1e" stroke-width="5.5" opacity="0.88"/>
            <ellipse cx="962" cy="376" rx="16" ry="28" fill="url(#rl-roure)" stroke="#3e2716" stroke-width="2"/>`;
      // Escala de servei de ferro forjat des del terra fins a la bancada
      s += `<g stroke="#2a2f34" stroke-width="3.2" fill="none">
              <line x1="205" y1="638" x2="255" y2="535"/><line x1="228" y1="638" x2="275" y2="535"/>
              <path d="M214,616 h18 M224,592 h18 M234,568 h18 M244,544 h18"/>
              <line x1="255" y1="535" x2="255" y2="482"/><line x1="295" y1="535" x2="295" y2="482"/><path d="M250,482 H300"/>
            </g>`;
      return wrap(s, { px: 140, txt: '~4,8 m' });
    },

    /* ── 8. SEMBRADORA MECÀNICA DE JETHRO TULL (c. 1701) ── */
    sembradora() {
      let s = `<ellipse cx="590" cy="610" rx="410" ry="50" fill="url(#rl-ombra)"/>`;
      // Vares de tracció davanteres (de fusta de freixe amb argolles)
      s += `<line x1="150" y1="440" x2="430" y2="455" stroke="url(#rl-roure)" stroke-width="14" stroke-linecap="round"/>
            <line x1="165" y1="415" x2="445" y2="430" stroke="url(#rl-roure)" stroke-width="12" stroke-linecap="round"/>
            <circle cx="152" cy="439" r="9" fill="none" stroke="url(#rl-ferro)" stroke-width="4"/>`;
      // Xassís principal de fusta assemblada
      s += caixa3D(410, 405, 370, 48, 36, -18, 'url(#rl-roure)', 'url(#rl-roure-c)', 'url(#rl-roure-f)');
      // Rodes posteriors grans de raigs de fusta i cèrcol de ferro
      s += `<g filter="url(#rl-drop)">${rodaIso(475, 468, 96, 118, 10, 'url(#rl-roure)', 'url(#rl-ferro)')}</g>`;
      s += `<ellipse cx="475" cy="468" rx="96" ry="118" fill="none" stroke="#2c3237" stroke-width="5"/>`;
      s += `<g filter="url(#rl-drop)">${rodaIso(760, 444, 86, 106, 10, 'url(#rl-roure)', 'url(#rl-ferro)')}</g>`;
      s += `<ellipse cx="760" cy="444" rx="86" ry="106" fill="none" stroke="#2c3237" stroke-width="4.5"/>`;
      // Tres relles d'arada i tubs de descens metàl·lics sota el xassís
      [485, 575, 665].forEach((x, idx) => {
        const y = 472 - idx * 8;
        s += `<path d="M${x},${y - 30} L${x - 14},${y + 60} L${x - 42},${y + 78} L${x + 6},${y + 74} Z" fill="url(#rl-ferro)" stroke="#1b2024" stroke-width="1.8"/>
              <path d="M${x + 12},${y - 45} C${x + 14},${y} ${x + 4},${y + 28} ${x},${y + 52}" fill="none" stroke="url(#rl-coure)" stroke-width="8" stroke-linecap="round"/>`;
      });
      // Rascle posterior per tapar el solc
      s += `<path d="M770,455 L865,482 L910,476" fill="none" stroke="url(#rl-roure)" stroke-width="11" stroke-linecap="round"/>
            <path d="M875,482 V532 M895,479 V529" stroke="#2f353b" stroke-width="6" stroke-linecap="round"/>`;
      // Tremuja (caixa de fusta inclinada per al gra) amb llavor visible
      s += `<polygon points="480,260 690,260 655,405 515,405" fill="url(#rl-roure)" stroke="#3e2716" stroke-width="2.5"/>
            <polygon points="690,260 745,232 710,375 655,405" fill="url(#rl-roure-f)" stroke="#3e2716" stroke-width="2"/>
            <polygon points="480,260 535,232 745,232 690,260" fill="url(#rl-roure-c)" stroke="#3e2716" stroke-width="2"/>
            <ellipse cx="612" cy="248" rx="75" ry="12" fill="#d9ad45" stroke="#856318" stroke-width="1.5"/>`;
      // Mecanisme dosificador lateral
      s += `<circle cx="515" cy="405" r="28" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="2" stroke-dasharray="5,4"/>
            <circle cx="515" cy="405" r="9" fill="url(#rl-ferro)"/>
            <line x1="475" y1="468" x2="515" y2="405" stroke="#492e18" stroke-width="7"/>`;
      // Mànecs del pagès (esteves) a la part posterior
      s += `<path d="M760,405 Q845,355 935,342" fill="none" stroke="url(#rl-roure)" stroke-width="13" stroke-linecap="round"/>
            <path d="M790,390 Q865,345 950,332" fill="none" stroke="#8d623b" stroke-width="11" stroke-linecap="round"/>`;
      return wrap(s, { px: 170, txt: '~2,1 m' });
    },

    /* ── 9. RODA HIDRÀULICA I FÀBRICA TÈXTIL (c. 1785) ── */
    hidraulica() {
      let s = `<ellipse cx="590" cy="645" rx="450" ry="50" fill="url(#rl-ombra)"/>`;
      // Teulada de pissarra a dues aigües sobre l'edifici de maó
      s += `<polygon points="404,158 700,88 994,158" fill="#46525c" stroke="${T}" stroke-width="2.2"/>
            <polygon points="700,88 738,68 1030,136 994,158" fill="#323b42" stroke="${T}" stroke-width="2"/>`;
      // Edifici industrial de maó i pedra en perspectiva (x, y, w, h, dx, dy)
      s += caixa3D(410, 155, 580, 440, 38, -22, 'url(#rl-mao)', '#ad5b49', '#612d22');
      // Forjats de fusta interiors de 3 plantes visibles en secció
      [255, 365, 475].forEach((y) => {
        s += `<rect x="422" y="${y}" width="556" height="14" fill="url(#rl-roure)" stroke="#3e2716" stroke-width="1.5"/>`;
      });
      // Finestrals amb siluetes subtils de màquines tèxtils a dins
      [188, 294, 404].forEach((y) => {
        for (let wx = 455; wx <= 910; wx += 110) {
          s += `<rect x="${wx}" y="${y}" width="64" height="56" rx="6" fill="#2a3542" stroke="#d8cfc0" stroke-width="2.4"/>
                <rect x="${wx + 12}" y="${y + 30}" width="40" height="22" rx="3" fill="#c89448" opacity="0.45"/>
                <line x1="${wx + 32}" y1="${y}" x2="${wx + 32}" y2="${y + 56}" stroke="#d8cfc0" stroke-width="1.4"/>
                <line x1="${wx}" y1="${y + 28}" x2="${wx + 64}" y2="${y + 28}" stroke="#d8cfc0" stroke-width="1.4"/>`;
        }
      });
      // Arbre vertical mestre i embarrats horitzontals amb politges
      s += `<rect x="476" y="185" width="16" height="340" fill="url(#rl-ferro-cil)" stroke="#1b2024" stroke-width="1.5"/>`;
      [228, 338, 448].forEach((y) => {
        s += `<rect x="475" y="${y}" width="490" height="8" fill="url(#rl-acer)" stroke="#1b2024" stroke-width="1"/>`;
        [555, 680, 805, 925].forEach((px) => {
          s += `<rect x="${px - 10}" y="${y - 11}" width="20" height="30" rx="3" fill="url(#rl-roure)" stroke="#3e2716" stroke-width="1.3"/>
                <line x1="${px - 4}" y1="${y + 18}" x2="${px - 10}" y2="${y + 42}" stroke="#5b3b1e" stroke-width="2.5"/>
                <line x1="${px + 4}" y1="${y + 18}" x2="${px + 10}" y2="${y + 42}" stroke="#5b3b1e" stroke-width="2.5"/>`;
        });
      });
      // Canal hidràulic de pedra portant aigua des de l'esquerra
      s += `<polygon points="80,255 315,295 315,332 80,295" fill="url(#rl-pedra)" stroke="#4c453c" stroke-width="2"/>
            <path d="M85,270 L318,308" stroke="#3688b5" stroke-width="16" opacity="0.88"/>
            <path d="M312,306 Q348,332 342,388" fill="none" stroke="#62b4df" stroke-width="22" stroke-linecap="round" opacity="0.82"/>`;
      // Canal de desguàs inferior amb escuma
      s += `<rect x="145" y="555" width="280" height="40" rx="6" fill="#2c6f96" opacity="0.85"/>
            <path d="M165,570 Q235,562 305,574 T415,568" fill="none" stroke="#c8ecff" stroke-width="3" opacity="0.75"/>`;
      // Gran roda hidràulica de calaixos (Overshot wheel) de fusta i ferro (rx=118, ry=136!)
      s += `<g filter="url(#rl-drop)">${rodaIso(305, 438, 118, 136, 12, 'url(#rl-roure-f)', 'url(#rl-ferro)')}</g>`;
      for (let a = 0; a < 16; a++) {
        const ang = (a / 16) * Math.PI * 2;
        const x1 = 305 + Math.cos(ang) * 100, y1 = 438 + Math.sin(ang) * 116;
        const x2 = 305 + Math.cos(ang + 0.14) * 120, y2 = 438 + Math.sin(ang + 0.14) * 138;
        s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#3b2615" stroke-width="6"/>`;
      }
      // Eix motriu i engranatge cònic d'entrada
      s += `<rect x="305" y="429" width="180" height="16" fill="url(#rl-ferro-cil)" stroke="#1b2024" stroke-width="1.8"/>
            <circle cx="484" cy="437" r="24" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="2" stroke-dasharray="5,4"/>`;
      return wrap(s, { px: 110, txt: '~8 m' });
    },

    /* ── 10. ALT FORN DE CARBÓ DE COC (DARBY, c. 1709–1780) ── */
    altforn() {
      let s = `<ellipse cx="590" cy="640" rx="440" ry="50" fill="url(#rl-ombra)"/>`;
      // Turó natural de roca amb relleu i passarel·la de càrrega amb barana fins a la boca del forn
      s += `<path d="M60,595 L75,235 Q160,192 270,200 L405,200 L428,595 Z" fill="#6f6657" stroke="#4b4338" stroke-width="2"/>
            <path d="M85,220 L405,200 L405,212 L85,232 Z" fill="#5b7c3e" opacity="0.65"/>
            <rect x="85" y="186" width="420" height="14" fill="url(#rl-roure)" stroke="#3e2716" stroke-width="2"/>
            <path d="M120,186 v-28 h375 v28 M210,186 v-28 M310,186 v-28 M405,186 v-28" fill="none" stroke="#492e18" stroke-width="3"/>
            <line x1="435" y1="200" x2="418" y2="335" stroke="#492e18" stroke-width="10"/>
            <rect x="245" y="150" width="58" height="34" rx="4" fill="url(#rl-ferro)" stroke="#1b2024" stroke-width="1.5"/>
            <circle cx="258" cy="186" r="8" fill="#23282c"/><circle cx="290" cy="186" r="8" fill="#23282c"/>`;
      // Piràmide truncada exterior de maó refractari amb cara lateral en perspectiva
      s += `<polygon points="435,595 495,165 735,165 795,595" fill="url(#rl-mao)" stroke="#4a281d" stroke-width="3"/>
            <polygon points="735,165 815,140 875,565 795,595" fill="#6f392a" stroke="#4a281d" stroke-width="2.5"/>`;
      // Cèrcols de reforç de ferro
      [230, 320, 415, 510].forEach((y) => {
        const t = (y - 165) / 430;
        const x1 = 495 - t * 60, x2 = 735 + t * 60;
        s += `<line x1="${x1.toFixed(1)}" y1="${y}" x2="${x2.toFixed(1)}" y2="${y}" stroke="#2b3136" stroke-width="8"/>`;
      });
      // Cavitat interior (tall anatòmic del crisol i cuba)
      s += `<polygon points="545,175 685,175 720,380 680,480 670,565 560,565 550,480 510,380" fill="#241c1a" stroke="#181210" stroke-width="2"/>
            <polygon points="547,195 683,195 692,245 538,245" fill="#464b4f"/>
            <polygon points="537,252 693,252 702,300 528,300" fill="#8b4f34"/>
            <polygon points="527,308 703,308 714,375 516,375" fill="#d9671e"/>
            <polygon points="516,380 714,380 680,480 550,480" fill="url(#rl-brasa)"/>
            <polygon points="555,480 675,480 670,545 560,545" fill="#fff09a"/>
            <rect x="560" y="545" width="110" height="20" fill="#ff7315"/>`;
      // Tobera de bufat i canal de colada
      s += `<rect x="780" y="472" width="180" height="32" rx="6" fill="url(#rl-ferro)" stroke="#1b2024" stroke-width="2"/>
            <path d="M685,500 L785,488" stroke="url(#rl-coure)" stroke-width="18" stroke-linecap="round"/>
            <path d="M595,565 L520,595 L430,595" fill="none" stroke="#ff9524" stroke-width="14" stroke-linecap="round"/>
            <rect x="330" y="582" width="110" height="18" rx="4" fill="#ff6614" stroke="#531b04" stroke-width="1.5"/>
            <path d="M580,165 Q615,88 650,165 Q628,125 615,165 Q598,128 580,165 Z" fill="#ff9e22" opacity="0.92"/>`;
      return wrap(s, { px: 105, txt: '~11 m' });
    },

    /* ── 11. CONVERTIDOR BESSEMER (1856) ── */
    bessemer() {
      let s = `<ellipse cx="570" cy="645" rx="410" ry="50" fill="url(#rl-ombra)"/>`;
      // Columnes de suport de ferro fos (x, y, w, h, dx, dy)
      s += caixa3D(270, 295, 62, 305, 24, -14, 'url(#rl-ferro)', '#566068', '#22282d');
      s += caixa3D(785, 295, 62, 305, 24, -14, 'url(#rl-ferro)', '#566068', '#22282d');
      // Corona dentada de bolcatge i eix continu de munyons connectant pilars i convertidor
      s += `<rect x="290" y="348" width="155" height="34" fill="url(#rl-acer)" stroke="#1b2024" stroke-width="2"/>
            <rect x="690" y="348" width="145" height="34" fill="url(#rl-acer)" stroke="#1b2024" stroke-width="2"/>
            <circle cx="385" cy="365" r="44" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="2.5" stroke-dasharray="7,4"/>
            <circle cx="385" cy="365" r="16" fill="url(#rl-ferro)"/>
            <path d="M835,365 H935 V565" fill="none" stroke="url(#rl-coure)" stroke-width="20" stroke-linejoin="round"/>`;
      // Cos basculant del convertidor en secció oberta
      s += `<g filter="url(#rl-drop)" transform="translate(565,365) rotate(-14)">
              <path d="M-128,-25 C-138,110 -85,170 0,175 C85,170 138,110 128,-25 L92,-160 C82,-195 35,-215 18,-235 L-56,-215 C-45,-185 -105,-155 -128,-25 Z" fill="url(#rl-ferro-cil)" stroke="#15191d" stroke-width="3.5"/>
              <rect x="-142" y="-22" width="284" height="44" rx="8" fill="#5b656e" stroke="#15191d" stroke-width="2.5"/>
              <path d="M-92,-5 C-96,95 -52,135 0,138 C52,135 96,95 92,-5 L68,-135 L-68,-135 Z" fill="url(#rl-mao)" stroke="#3e1b10" stroke-width="2"/>
              <path d="M-74,10 C-74,90 -38,118 0,120 C38,118 74,90 74,10 Z" fill="url(#rl-brasa)"/>
              <ellipse cx="0" cy="10" rx="74" ry="12" fill="#fff09a"/>
              <rect x="-65" y="138" width="130" height="32" rx="6" fill="url(#rl-coure-cil)" stroke="#3e1b10" stroke-width="2"/>
              ${[-42, -21, 0, 21, 42].map((tx) => `<line x1="${tx}" y1="138" x2="${tx}" y2="25" stroke="#ffdf70" stroke-width="3" stroke-dasharray="5,5"/>`).join('')}
              <path d="M-38,-222 Q-10,-335 35,-275 Q65,-340 20,-212 Z" fill="#fff3aa" opacity="0.95"/>
              <path d="M-28,-220 Q0,-295 25,-225" fill="#ffffff" opacity="0.85"/>
            </g>`;
      // Cullera de colada a sota
      s += `<path d="M510,518 L525,584 L615,584 L630,518 Z" fill="url(#rl-ferro-cil)" stroke="#1b2024" stroke-width="2.5"/>
            <ellipse cx="570" cy="518" rx="60" ry="10" fill="#ff9824" stroke="#612808" stroke-width="2"/>`;
      return wrap(s, { px: 120, txt: '~4,2 m' });
    },

    /* ── 12. LOCOMOTORA «ROCKET» DE STEPHENSON (1829) ── */
    rocket() {
      let s = `<ellipse cx="600" cy="635" rx="480" ry="44" fill="url(#rl-ombra)"/>`;
      // Balast i rails
      s += `<rect x="85" y="575" width="1030" height="32" fill="#776d5f" rx="4"/>`;
      for (let rx = 110; rx <= 1070; rx += 55) {
        s += `<rect x="${rx}" y="566" width="28" height="12" rx="2" fill="#4f351e"/>`;
      }
      s += `<rect x="85" y="558" width="1030" height="9" fill="url(#rl-acer)" stroke="#1b2024" stroke-width="1.2"/>`;
      // Xassís de ferro negre (x, y, w, h, dx, dy)
      s += caixa3D(250, 445, 595, 26, 28, -14, 'url(#rl-ferro)', '#3d454c', '#15181b');
      // Caixa de focs posterior (Firebox de coure i ferro reblonat) + plataforma
      s += caixa3D(695, 320, 145, 128, 28, -14, 'url(#rl-coure-cil)', '#bf683b', '#5d2d14');
      s += `<rect x="840" y="420" width="64" height="35" fill="url(#rl-roure)" stroke="#3e2716" stroke-width="2"/>`;
      // Gran caldera cilíndrica groga icona de la Rocket
      s += `<rect x="335" y="305" width="370" height="126" rx="18" fill="url(#rl-groc-loc)" stroke="#3b2d0a" stroke-width="2.8"/>`;
      [395, 480, 565, 650].forEach((bx) => {
        s += `<rect x="${bx}" y="304" width="10" height="128" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="1"/>`;
      });
      // Caixa de fums frontal + xemeneia alta
      s += `<rect x="265" y="305" width="76" height="126" rx="8" fill="url(#rl-ferro-cil)" stroke="#14181b" stroke-width="2.5"/>
            <ellipse cx="265" cy="368" rx="18" ry="52" fill="#2d343a" stroke="#14181b" stroke-width="2"/>
            <rect x="278" y="102" width="44" height="205" fill="#f3efe6" stroke="#222629" stroke-width="2.5"/>
            <rect x="278" y="102" width="44" height="28" fill="url(#rl-ferro)"/>
            <path d="M272,102 L328,102 L322,86 L278,86 Z" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="1.8"/>`;
      // Cúpula de vapor i vàlvula de seguretat
      s += `<rect x="595" y="258" width="42" height="50" rx="16" fill="url(#rl-llauto-cil)" stroke="#5c4012" stroke-width="2"/>
            <rect x="445" y="275" width="22" height="32" rx="6" fill="url(#rl-coure)"/>`;
      // Rodes posteriors petites i RODA MOTRIU DAVANTERA GEGANT (rx === ry per vista lateral pura!)
      s += `<g filter="url(#rl-drop)">${rodaIso(760, 488, 70, 70, 10, '#c89116', 'url(#rl-ferro)')}</g>`;
      s += `<g filter="url(#rl-drop)">${rodaIso(415, 456, 104, 104, 16, '#d69c18', 'url(#rl-llauto)')}</g>`;
      s += `<circle cx="415" cy="456" r="106" fill="none" stroke="url(#rl-acer)" stroke-width="7"/>`;
      // Cilindre inclinat extern (+28°: de dalt a la caixa de focs cap avall a la roda motriu!) + creuera i biela en línia recta
      s += `<g transform="translate(650,356) rotate(-25)">
              <rect x="-46" y="-22" width="92" height="44" rx="6" fill="url(#rl-coure)" stroke="#4c230e" stroke-width="2.5"/>
              <rect x="-36" y="-26" width="72" height="7" fill="url(#rl-llauto)"/>
            </g>
            <line x1="608" y1="376" x2="462" y2="444" stroke="url(#rl-acer)" stroke-width="10" stroke-linecap="round"/>
            <rect x="536" y="395" width="22" height="16" rx="3" transform="rotate(-25 547 403)" fill="url(#rl-llauto)" stroke="${T}" stroke-width="1.4"/>
            <circle cx="462" cy="444" r="10" fill="url(#rl-llauto)" stroke="#3e2716" stroke-width="1.8"/>`;
      // Tènder posterior (carbó i aigua)
      s += `<g transform="translate(915,360)">
              <rect x="0" y="38" width="185" height="90" rx="8" fill="url(#rl-roure-f)" stroke="#2c1a0c" stroke-width="2.5"/>
              <ellipse cx="95" cy="36" rx="74" ry="26" fill="#2c3135" stroke="#14181b" stroke-width="2"/>
              <ellipse cx="95" cy="34" rx="45" ry="12" fill="#1b1f22"/>
              <rect x="-15" y="128" width="215" height="22" fill="url(#rl-ferro)"/>
              ${rodaIso(38, 164, 36, 36, 8, '#3b4248', 'url(#rl-ferro)')}
              ${rodaIso(148, 164, 36, 36, 8, '#3b4248', 'url(#rl-ferro)')}
            </g>
            <line x1="890" y1="468" x2="915" y2="495" stroke="#1b2024" stroke-width="7"/>`;
      return wrap(s, { px: 135, txt: '~7,3 m (amb tènder)', x: 1125, y: 295 });
    },

    /* ── 13. VAPOR TRANSATLÀNTIC «SS GREAT WESTERN» (1838) ── */
    western() {
      let s = '';
      // Aigua marina tranquil·la en tall d'estudi
      s += `<path d="M55,468 Q220,458 380,468 T720,468 T1145,468 L1145,635 L55,635 Z" fill="url(#rl-mar)" opacity="0.28"/>
            <path d="M55,468 Q220,458 380,468 T720,468 T1145,468" fill="none" stroke="#1d6285" stroke-width="3" opacity="0.7"/>`;
      // Bauprès frontal
      s += `<line x1="120" y1="305" x2="295" y2="388" stroke="url(#rl-roure)" stroke-width="11" stroke-linecap="round"/>`;
      // Obra viva de coure i buc negre amb banda blanca
      s += `<path d="M235,468 L985,468 L962,532 C850,552 380,552 272,526 Z" fill="#8b3428" stroke="#3c1510" stroke-width="2.5"/>
            <path d="M198,370 L1022,382 L985,468 L235,468 Z" fill="#1e242b" stroke="#0c1014" stroke-width="3"/>
            <path d="M214,418 L1006,426" stroke="#efe9dc" stroke-width="14"/>`;
      for (let px = 250; px <= 965; px += 46) {
        s += `<circle cx="${px}" cy="${418 + (px - 250) * 0.01}" r="4.5" fill="#1e242b"/>`;
      }
      // Quatre pals amb vergues i xàrcia
      [[350, 125], [530, 95], [725, 118], [900, 148]].forEach(([mx, ty], idx) => {
        s += `<line x1="${mx}" y1="382" x2="${mx}" y2="${ty}" stroke="url(#rl-roure)" stroke-width="${idx === 1 ? 11 : 9}" stroke-linecap="round"/>`;
        if (idx < 3) {
          s += `<line x1="${mx - 58}" y1="${ty + 48}" x2="${mx + 58}" y2="${ty + 48}" stroke="#6a4629" stroke-width="5"/>
                <line x1="${mx - 44}" y1="${ty + 96}" x2="${mx + 44}" y2="${ty + 96}" stroke="#6a4629" stroke-width="4.5"/>`;
        }
        s += `<line x1="${mx}" y1="${ty + 18}" x2="${mx - 38}" y2="380" stroke="#4a4036" stroke-width="1.3" opacity="0.65"/>
              <line x1="${mx}" y1="${ty + 18}" x2="${mx + 38}" y2="380" stroke="#4a4036" stroke-width="1.3" opacity="0.65"/>`;
      });
      // Veles triangulars (flocs) a proa
      s += `<path d="M135,310 L345,148 L345,355 Z" fill="url(#rl-lona)" stroke="#8b7d64" stroke-width="1.5" opacity="0.88"/>
            <path d="M210,342 L345,198 L345,365 Z" fill="#efe6d3" stroke="#8b7d64" stroke-width="1.2" opacity="0.75"/>`;
      // Xemeneia alta central
      s += `<rect x="608" y="192" width="38" height="190" fill="url(#rl-ferro-cil)" stroke="#111518" stroke-width="2.2"/>
            <rect x="608" y="230" width="38" height="58" fill="#d9a12b"/>
            <path d="M625,186 Q665,135 745,140" fill="none" stroke="#b9c3cb" stroke-width="14" stroke-linecap="round" opacity="0.45"/>`;
      // Tambor de roda de pales en tall tècnic
      s += `<path d="M475,455 A112,112 0 0,1 699,455 Z" fill="#323940" stroke="#15191d" stroke-width="3"/>
            <circle cx="587" cy="455" r="95" fill="#1e242b" stroke="#d8cfc0" stroke-width="2"/>`;
      for (let a = 0; a < 16; a++) {
        const ang = (a / 16) * Math.PI * 2;
        const x2 = 587 + Math.cos(ang) * 90, y2 = 455 + Math.sin(ang) * 90;
        s += `<line x1="587" y1="455" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="url(#rl-ferro)" stroke-width="4.5"/>`;
        const px = 587 + Math.cos(ang) * 82, py = 455 + Math.sin(ang) * 82;
        s += `<rect x="${(px - 10).toFixed(1)}" y="${(py - 4).toFixed(1)}" width="20" height="8" transform="rotate(${((ang * 180) / Math.PI + 90).toFixed(1)},${px.toFixed(1)},${py.toFixed(1)})" fill="#a8432b" stroke="#22100a" stroke-width="1"/>`;
      }
      s += `<circle cx="587" cy="455" r="22" fill="url(#rl-llauto)" stroke="#5c4012" stroke-width="2"/>
            <path d="M510,485 Q620,498 765,484" fill="none" stroke="#ffffff" stroke-width="5" opacity="0.82"/>
            <polygon points="975,470 998,470 992,530 968,528" fill="#5e3d21" stroke="#2a1b0d" stroke-width="2"/>`;
      return wrap(s, { px: 132, txt: '~72 m d’eslora' });
    }
  };

  window.RI = window.RI || {};
  RI.REALS = REALS;
  RI._realWrap = wrap;
  RI._realCaixa = caixa3D;
  RI._realRoda = rodaIso;
})();
