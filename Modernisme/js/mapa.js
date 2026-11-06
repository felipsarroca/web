/* =========================================================
   Mapa interactiu (Leaflet + OpenStreetMap)
   Dades: window.OBRES (només les obres amb coordenades)
   ========================================================= */
(function () {
  'use strict';
  const M = window.Modernisme;
  const COLORS = { barcelona: '#a8502f', terrassa: '#5e7150', catalunya: '#3f5f8a', fora: '#8a6a22' };
  const ORDRE = ['barcelona', 'terrassa', 'catalunya', 'fora'];
  const llista = document.getElementById('llista-llocs');
  const contenidor = document.getElementById('mapa');

  if (typeof L === 'undefined') {
    contenidor.innerHTML = '<p class="requadre" style="margin:1rem">No s\'ha pogut carregar el mapa. Comprova la connexió a internet.</p>';
    return;
  }

  const llocs = window.OBRES.filter(o => typeof o.lat === 'number');
  // Numeració per ciutat: Terrassa segueix l'ordre de l'itinerari
  const num = {};
  ORDRE.forEach(c => {
    const g = llocs.filter(o => o.ciutat === c);
    if (c === 'terrassa') g.sort((a, b) => (a.ruta || 99) - (b.ruta || 99));
    g.forEach((o, i) => { num[o.id] = i + 1; });
  });

  const mapa = L.map(contenidor, { scrollWheelZoom: true, zoomControl: true });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);

  function icona(o) {
    return L.divIcon({
      className: '',
      html: '<div class="marcador-mapa" style="background:' + COLORS[o.ciutat] + '"><span>' + num[o.id] + '</span></div>',
      iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28]
    });
  }

  function popup(o) {
    const img = o.img ? '<img src="' + M.rutaImatge(o.img) + '" alt="">' : '';
    const boto = o.img ? '<button type="button" class="boto petit" data-amplia="' + o.id + '">Amplia la imatge</button>' : '';
    return '<div class="popup-mapa">' + img + '<h3>' + o.titol + '</h3><p><strong>' + o.autor + '</strong> · ' + o.anys + '</p><p>' + o.desc + '</p>' + boto + '</div>';
  }

  const marcadors = {};
  llocs.forEach(o => {
    marcadors[o.id] = L.marker([o.lat, o.lng], { icon: icona(o), title: o.titol, alt: o.titol })
      .bindPopup(popup(o), { maxWidth: 260 });
  });

  contenidor.addEventListener('click', e => {
    const b = e.target.closest('[data-amplia]');
    if (!b) return;
    const visibles = llocs.filter(o => o.img && mapa.hasLayer(marcadors[o.id]));
    const items = visibles.map(o => M.itemDe({ dataset: { obra: o.id } }));
    M.Visor.obre(items, Math.max(0, visibles.findIndex(o => o.id === b.dataset.amplia)));
  });

  function mostra(ciutat) {
    const sel = llocs.filter(o => ciutat === 'totes' || o.ciutat === ciutat)
      .sort((a, b) => (a.ciutat === b.ciutat ? num[a.id] - num[b.id] : ORDRE.indexOf(a.ciutat) - ORDRE.indexOf(b.ciutat)));
    llocs.forEach(o => marcadors[o.id].remove());
    sel.forEach(o => marcadors[o.id].addTo(mapa));
    llista.innerHTML = sel.map(o =>
      '<li><button type="button" data-id="' + o.id + '"><span class="num" style="background:' + COLORS[o.ciutat] + '">' + num[o.id] + '</span>' +
      '<span>' + o.titol + '<small>' + o.autor + ' · ' + o.anys + '</small></span></button></li>').join('');
    mapa.invalidateSize();
    mapa.fitBounds(L.latLngBounds(sel.map(o => [o.lat, o.lng])), { padding: [30, 30], maxZoom: 16 });
  }

  llista.addEventListener('click', e => {
    const b = e.target.closest('button[data-id]');
    if (!b) return;
    llista.querySelectorAll('button').forEach(x => x.classList.toggle('actiu', x === b));
    const m = marcadors[b.dataset.id];
    mapa.flyTo(m.getLatLng(), 17, { duration: 0.6 });
    setTimeout(() => m.openPopup(), 650);
    if (window.matchMedia('(max-width: 860px)').matches) contenidor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const xips = document.querySelectorAll('[data-ciutat]');
  xips.forEach(x => x.addEventListener('click', () => {
    xips.forEach(y => y.setAttribute('aria-pressed', String(y === x)));
    mostra(x.dataset.ciutat);
  }));

  // Permet obrir directament una ciutat: mapa.html#terrassa
  const inicial = ORDRE.concat('totes').includes(location.hash.slice(1)) ? location.hash.slice(1) : 'barcelona';
  xips.forEach(y => y.setAttribute('aria-pressed', String(y.dataset.ciutat === inicial)));
  mostra(inicial);
  window.addEventListener('resize', () => mapa.invalidateSize());
})();
