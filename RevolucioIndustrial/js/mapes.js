// SPDX-License-Identifier: AGPL-3.0-or-later
/* Mapes de rutes: geometria projectada amb QGIS, presentació SVG accessible. */
(function () {
  'use strict';
  const geo = window.RI_MAPES;
  if (!geo || !window.RI) return;
  const line = (points) => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');
  const label = (x, y, text, opts = {}) => `<text x="${x}" y="${y}" text-anchor="${opts.anchor || 'start'}" fill="${opts.fill || '#263833'}" font-family="Figtree,Arial,sans-serif" font-size="${opts.size || 23}" font-weight="${opts.weight || 700}" paint-order="stroke" stroke="${opts.halo || '#f9f4e8'}" stroke-width="${opts.outline || 5}" stroke-linejoin="round">${text}</text>`;
  const badge = (x, y, w, heading, body, dark = false) => `<g><rect x="${x}" y="${y}" width="${w}" height="79" rx="13" fill="${dark ? '#203e48' : '#fffaf0'}" stroke="${dark ? '#203e48' : '#b7a98b'}" stroke-width="2"/><text x="${x + 17}" y="${y + 28}" fill="${dark ? '#d9eee9' : '#607068'}" font-family="Figtree,Arial,sans-serif" font-size="17" font-weight="700">${heading}</text><text x="${x + 17}" y="${y + 61}" fill="${dark ? '#fff' : '#29312f'}" font-family="Fraunces,Georgia,serif" font-size="28" font-weight="700">${body}</text></g>`;
  const dot = (x, y, color, radius = 8) => `<circle cx="${x}" cy="${y}" r="${radius + 5}" fill="#fffdf7" stroke="${color}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${radius}" fill="${color}"/>`;

  RI.mapaFerrocarril = function () {
    const m = geo.rail, p = m.places, d = line(m.route);
    const s = `
      <title>Mapa de la línia Liverpool–Manchester de 1830</title>
      <desc>Mapa geogràfic amb Liverpool, Rainhill, Parkside, Chat Moss i Manchester. El tren avança de l'oest cap a l'est. El traçat és aproximat.</desc>
      <defs><linearGradient id="mapa-rail-mar" x2="0" y2="1"><stop stop-color="#b8d8dc"/><stop offset="1" stop-color="#dbe7dc"/></linearGradient><pattern id="mapa-rail-paper" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#9d9a82" stroke-opacity=".13"/></pattern></defs>
      <rect x="-60" y="0" width="1320" height="720" fill="url(#mapa-rail-mar)"/>
      <g transform="translate(0 40)"><path d="${m.land}" fill="#e9e4ce" fill-rule="evenodd" stroke="#9ba68d" stroke-width="2"/><rect x="0" y="0" width="1200" height="640" fill="url(#mapa-rail-paper)"/></g>
      ${label(32, 56, 'Liverpool → Manchester', { size: 35, halo: '#e9e4ce', outline: 7 })}
      ${label(35, 86, 'La primera línia interurbana de vapor · 1830', { size: 17, weight: 600, fill: '#496861', outline: 4 })}
      <ellipse cx="${p['Chat Moss'][0]}" cy="${p['Chat Moss'][1] + 40}" rx="100" ry="64" fill="#91af78" opacity=".27" stroke="#5d8463" stroke-dasharray="6 7" stroke-width="2"/>
      <path d="${d}" transform="translate(0 40)" fill="none" stroke="#fff8e8" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${d}" transform="translate(0 40)" fill="none" stroke="#567c77" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".62"/>
      <path id="rail-ruta" d="${d}" transform="translate(0 40)" fill="none" stroke="#e09937" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      ${dot(p.Liverpool[0], p.Liverpool[1] + 40, '#1f6f78', 10)}
      ${dot(p.Rainhill[0], p.Rainhill[1] + 40, '#a86a22', 6)}
      ${dot(p.Parkside[0], p.Parkside[1] + 40, '#a86a22', 6)}
      ${dot(p['Chat Moss'][0], p['Chat Moss'][1] + 40, '#568760', 6)}
      ${dot(p.Manchester[0], p.Manchester[1] + 40, '#1f6f78', 10)}
      ${label(p.Liverpool[0] - 24, p.Liverpool[1] + 12, 'Liverpool', { anchor: 'end', size: 28 })}
      ${label(p.Rainhill[0], p.Rainhill[1] + 93, 'Rainhill', { anchor: 'middle', size: 20 })}
      ${label(p.Parkside[0], p.Parkside[1] - 19, 'Parkside', { anchor: 'middle', size: 19 })}
      ${label(p['Chat Moss'][0], p['Chat Moss'][1] - 28, 'Chat Moss', { anchor: 'middle', size: 20 })}
      ${label(p.Manchester[0] + 12, p.Manchester[1] - 27, 'Manchester', { anchor: 'end', size: 28 })}
      <g id="rail-tren" transform="translate(${p.Liverpool[0]} ${p.Liverpool[1] + 40})"><circle r="23" fill="#1f6f78" stroke="#fffaf0" stroke-width="4"/><path d="M-13 6V-5H4V-12H10V-5H14V6Z" fill="#fffaf0"/><circle cx="-6" cy="11" r="3" fill="#fffaf0"/><circle cx="8" cy="11" r="3" fill="#fffaf0"/></g>
      ${badge(30, 575, 205, 'DISTÀNCIA', 'uns 50 km')}
      ${badge(247, 575, 226, 'DIRECTE · 1a CLASSE', '1 h i 30 min', true)}
      <path d="M${1000 - m.scale20} 620h${m.scale20}" stroke="#344e52" stroke-width="4"/><path d="M${1000 - m.scale20} 614v12M1000 614v12" stroke="#344e52" stroke-width="3"/>
      ${label(1010, 626, '20 km', { size: 17, weight: 600 })}
      ${label(1190, 687, 'QGIS · Natural Earth · traçat aproximat', { anchor: 'end', size: 15, weight: 600, fill: '#4f655f', outline: 3 })}`;
    return RI.svg(s);
  };

  RI.animaMapaFerrocarril = function ({ p, el, svg }) {
    const route = el('rail-ruta');
    const length = svg._mapLength || (svg._mapLength = route.getTotalLength());
    const done = Math.max(0, Math.min(1, p));
    route.style.strokeDasharray = `${(length * done).toFixed(1)} ${length.toFixed(1)}`;
    const point = route.getPointAtLength(length * done);
    el('rail-tren').setAttribute('transform', `translate(${point.x.toFixed(1)} ${(point.y + 40).toFixed(1)})`);
  };

  RI.mapaAtlantic = function () {
    const m = geo.sea, p = m.places, d = line(m.route);
    const s = `
      <title>Ruta del Great Western, de Bristol a Nova York, abril de 1838</title>
      <desc>Mapa de l'Atlàntic amb els ports de Bristol i Nova York. La línia és una connexió esquemàtica i no la derrota real del vaixell.</desc>
      <defs><linearGradient id="mapa-ocea" x2="0" y2="1"><stop stop-color="#98c4d9"/><stop offset="1" stop-color="#619cbe"/></linearGradient><pattern id="mapa-ones" width="55" height="31" patternUnits="userSpaceOnUse"><path d="M0 15q14-8 28 0t27 0" fill="none" stroke="#eef8f8" stroke-opacity=".21" stroke-width="2"/></pattern></defs>
      <rect x="-60" y="0" width="1320" height="720" fill="url(#mapa-ocea)"/>
      <rect x="-60" y="0" width="1320" height="720" fill="url(#mapa-ones)"/>
      <g transform="translate(0 40)"><path d="${m.land}" fill="#e7ddbe" fill-rule="evenodd" stroke="#a5a88b" stroke-width="2"/></g>
      ${label(20, 61, 'Bristol → Nova York', { size: 35, halo: '#e7ddbe', outline: 7 })}
      ${label(22, 91, 'Primera travessia del Great Western · abril de 1838', { size: 17, weight: 600, fill: '#365c72', halo: '#e7ddbe' })}
      ${label(560, 240, 'OCEÀ ATLÀNTIC', { anchor: 'middle', size: 23, weight: 600, fill: '#2b6482', halo: '#a4cddd', outline: 3 })}
      <path d="${d}" transform="translate(0 40)" fill="none" stroke="#fffdf7" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" opacity=".86"/>
      <path d="${d}" transform="translate(0 40)" fill="none" stroke="#356d8b" stroke-width="10" stroke-dasharray="5 11" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="mar-ruta" d="${d}" transform="translate(0 40)" fill="none" stroke="#e7933c" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      ${dot(p.Bristol[0], p.Bristol[1] + 40, '#b34d2f', 10)}
      ${dot(p['Nova York'][0], p['Nova York'][1] + 40, '#b34d2f', 10)}
      ${label(p.Bristol[0] - 17, p.Bristol[1] + 19, 'Bristol', { anchor: 'end', size: 25 })}
      ${label(p['Nova York'][0] + 18, p['Nova York'][1] - 16, 'Nova York', { size: 25 })}
      <g id="mar-vaixell" transform="translate(${p.Bristol[0]} ${p.Bristol[1] + 40})"><circle r="25" fill="#b34d2f" stroke="#fffaf0" stroke-width="4"/><path d="M-15 2H16l-6 11H-9Z" fill="#fffaf0"/><path d="M-3 0v-14h8V0" fill="#fffaf0"/><path d="M-13-5h6M-13-11h6" stroke="#fffaf0" stroke-width="3"/></g>
      ${badge(38, 573, 286, 'GREAT WESTERN · 1838', '15 dies i mig', true)}
      ${badge(335, 573, 297, 'VELERS CAP A L’OEST · 1840s', 'entorn de 5 setmanes')}
      <g transform="translate(1050 611)" fill="none" stroke="#234c63" stroke-width="3"><circle r="28" fill="#d7e6e7" fill-opacity=".75"/><path d="M0 18V-18m0 0-8 10m8-10 8 10" stroke-linecap="round" stroke-linejoin="round"/></g>
      ${label(1050, 572, 'N', { anchor: 'middle', size: 18, weight: 700, halo: '#b7d4df' })}
      ${label(1190, 685, 'QGIS · Natural Earth · connexió esquemàtica entre ports', { anchor: 'end', size: 15, weight: 600, fill: '#24546e', halo: '#bbd8e2', outline: 3 })}`;
    return RI.svg(s);
  };

  RI.animaMapaAtlantic = function ({ p, el, svg }) {
    const route = el('mar-ruta');
    const length = svg._mapLength || (svg._mapLength = route.getTotalLength());
    const fraction = Math.max(0, Math.min(1, (p * 35) / 15.5));
    route.style.strokeDasharray = `${(length * fraction).toFixed(1)} ${length.toFixed(1)}`;
    const point = route.getPointAtLength(length * fraction);
    el('mar-vaixell').setAttribute('transform', `translate(${point.x.toFixed(1)} ${(point.y + 40).toFixed(1)})`);
  };
})();
