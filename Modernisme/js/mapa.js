/* =========================================================
   Mapa interactiu (Leaflet + OpenStreetMap)
   Dues maneres de mirar-lo:
   - Per ciutat: window.OBRES (només les obres amb coordenades)
   - Vida d'un arquitecte: window.ARQUITECTES, obres per ordre
     cronològic unides amb una línia
   ========================================================= */
(function () {
  'use strict';
  const M = window.Modernisme;
  const COLORS = { barcelona: '#a8502f', terrassa: '#5e7150', catalunya: '#3f5f8a', fora: '#8a6a22' };
  const ORDRE = ['barcelona', 'terrassa', 'catalunya', 'fora'];
  const llista = document.getElementById('llista-llocs');
  const contenidor = document.getElementById('mapa');
  const avis = document.getElementById('avis-vida');

  if (typeof L === 'undefined') {
    contenidor.innerHTML = '<p class="requadre" style="margin:1rem">No s\'ha pogut carregar el mapa. Comprova la connexió a internet.</p>';
    return;
  }

  const OBRES = Object.fromEntries(window.OBRES.map(o => [o.id, o]));
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

  function icona(color, text) {
    return L.divIcon({
      className: '',
      html: '<div class="marcador-mapa" style="background:' + color + '"><span>' + text + '</span></div>',
      iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28]
    });
  }

  // Punt del mapa: {id, titol, autor, anys, desc, img, lat, lng, fixat, extra}
  function popup(q) {
    const img = q.img ? '<img src="' + M.rutaImatge(q.img) + '" alt="">' : '';
    const boto = q.img ? '<button type="button" class="boto petit" data-amplia="' + q.id + '">Amplia la imatge</button>' : '';
    return '<div class="popup-mapa">' + img + '<h3>' + q.titol + '</h3>' + (q.extra ? '<p class="popup-extra">' + q.extra + '</p>' : '') +
      '<p><strong>' + q.autor + '</strong> · ' + q.anys + '</p><p>' + q.desc + '</p>' + boto + '</div>';
  }

  /* ---------- Capa activa ---------- */
  let actius = [];      // punts visibles, en l'ordre de la llista
  let capa = L.layerGroup().addTo(mapa);
  const marcadors = {};

  function pinta(punts, color, numera, linia) {
    capa.clearLayers();
    actius = punts;
    punts.forEach((q, i) => {
      marcadors[q.id] = L.marker([q.lat, q.lng], { icon: icona(color(q), numera(q, i)), title: q.titol, alt: q.titol })
        .bindPopup(popup(q), { maxWidth: 260 }).addTo(capa);
    });
    if (linia) L.polyline(punts.map(q => [q.lat, q.lng]), { color: linia, weight: 3, opacity: 0.75, dashArray: '7 7' }).addTo(capa);
    mapa.invalidateSize();
    if (punts.length) mapa.fitBounds(L.latLngBounds(punts.map(q => [q.lat, q.lng])), { padding: [30, 30], maxZoom: 16 });
  }

  function deObra(o) {
    return { id: o.id, titol: o.titol, autor: o.autor, anys: o.anys, desc: o.desc, img: o.img, lat: o.lat, lng: o.lng, fixat: o.fixat, ciutat: o.ciutat };
  }

  function mostraCiutat(ciutat) {
    const sel = llocs.filter(o => ciutat === 'totes' || o.ciutat === ciutat)
      .sort((a, b) => (a.ciutat === b.ciutat ? num[a.id] - num[b.id] : ORDRE.indexOf(a.ciutat) - ORDRE.indexOf(b.ciutat)));
    pinta(sel.map(deObra), q => COLORS[q.ciutat], q => num[q.id], null);
    llista.innerHTML = sel.map(o =>
      '<li><button type="button" data-id="' + o.id + '"><span class="num" style="background:' + COLORS[o.ciutat] + '">' + num[o.id] + '</span>' +
      '<span>' + o.titol + '<small>' + o.autor + ' · ' + o.anys + '</small></span></button></li>').join('');
    if (avis) avis.hidden = true;
  }

  function mostraVida(id) {
    const a = (window.ARQUITECTES || []).find(x => x.id === id);
    if (!a) return;
    const punts = [];
    a.etapes.forEach(e => e.obres.forEach((ob, k) => {
      const o = ob.o ? OBRES[ob.o] : null;
      const lat = o ? o.lat : ob.lat, lng = o ? o.lng : ob.lng;
      if (typeof lat !== 'number') return;
      punts.push({
        id: 'vida-' + a.id + '-' + punts.length, titol: ob.titol, autor: a.nom, anys: o ? o.anys : String(ob.any),
        desc: ob.text, img: o ? o.img : ob.img, lat, lng, fixat: o ? o.fixat : null, any: ob.any,
        extra: ob.any + ' · ' + a.curt + ' tenia uns ' + (ob.any - a.neix) + ' anys · ' + e.titol
      });
    }));
    punts.sort((x, y) => x.any - y.any);
    pinta(punts, () => a.color, (q, i) => i + 1, a.color);
    llista.innerHTML = '<li class="llista-cap"><strong>' + a.nom + '</strong><small>' + a.vida + '</small></li>' + punts.map((q, i) =>
      '<li><button type="button" data-id="' + q.id + '"><span class="num" style="background:' + a.color + '">' + (i + 1) + '</span>' +
      '<span>' + q.titol + '<small>' + q.any + ' · tenia uns ' + (q.any - a.neix) + ' anys</small></span></button></li>').join('');
    const lluny = punts.filter(q => q.lng < -1 || q.lat < 40.4);
    if (avis) {
      avis.hidden = !lluny.length;
      avis.textContent = lluny.length ? 'La línia uneix les obres per ordre. Algunes són lluny de Catalunya (' + lluny.map(q => q.titol).join(', ') + '): fes clic a la llista per anar-hi.' : '';
    }
  }

  contenidor.addEventListener('click', e => {
    const b = e.target.closest('[data-amplia]');
    if (!b) return;
    const visibles = actius.filter(q => q.img);
    const items = visibles.map(q => ({ img: q.img, titol: q.titol, sub: [q.autor, q.anys].filter(Boolean).join(' · '), desc: q.desc, fixat: q.fixat || [], alt: q.titol }));
    M.Visor.obre(items, Math.max(0, visibles.findIndex(q => q.id === b.dataset.amplia)));
  });

  llista.addEventListener('click', e => {
    const b = e.target.closest('button[data-id]');
    if (!b) return;
    llista.querySelectorAll('button').forEach(x => x.classList.toggle('actiu', x === b));
    const m = marcadors[b.dataset.id];
    mapa.flyTo(m.getLatLng(), 17, { duration: 0.6 });
    setTimeout(() => m.openPopup(), 650);
    if (window.matchMedia('(max-width: 860px)').matches) contenidor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const xips = [...document.querySelectorAll('[data-ciutat], [data-vida]')];
  function marca(x) { xips.forEach(y => y.setAttribute('aria-pressed', String(y === x))); }
  xips.forEach(x => x.addEventListener('click', () => {
    marca(x);
    if (x.dataset.vida) { mostraVida(x.dataset.vida); history.replaceState(null, '', '#vida-' + x.dataset.vida); }
    else { mostraCiutat(x.dataset.ciutat); history.replaceState(null, '', '#' + x.dataset.ciutat); }
  }));

  // Enllaços directes: mapa.html#terrassa, mapa.html#vida-gaudi
  const h = location.hash.slice(1);
  const vida = h.startsWith('vida-') ? xips.find(x => x.dataset.vida === h.slice(5)) : null;
  const ciutat = xips.find(x => x.dataset.ciutat === (ORDRE.concat('totes').includes(h) ? h : 'barcelona'));
  if (vida) { marca(vida); mostraVida(vida.dataset.vida); } else { marca(ciutat); mostraCiutat(ciutat.dataset.ciutat); }
  window.addEventListener('resize', () => mapa.invalidateSize());
})();
