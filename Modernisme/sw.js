/* =========================================================
   El Modernisme · funcionament sense connexió
   - Pàgines, estils, scripts i dades: primer la xarxa (per tenir
     sempre la versió nova) i, si no n'hi ha, la còpia desada.
   - Imatges, tipografies i mapes: primer la còpia desada.
   - En instal·lar-se, desa totes les pàgines i les imatges petites
     (img/mini), de manera que la web es pot fer servir a l'aula o
     a la sortida per Terrassa sense internet.
   ========================================================= */
const VERSIO = 'modernisme-v5';
const NUCLI = [
  './', 'index.html', 'que-es.html', 'catalunya.html', 'ciutats.html', 'mon.html', 'temps.html', 'llegat.html',
  'arquitectura.html', 'arts.html', 'cartellisme.html', 'oficis.html', 'objectes.html',
  'autors.html', 'arquitectes.html', 'obres.html', 'mapa.html', 'terrassa.html', 'glossari.html', 'repte.html',
  'dossier.html', 'progres.html', 'credits.html',
  'style.css?v=5', 'fonts/fonts.css', 'js/comu.js', 'js/activitats.js', 'js/mapa.js', 'js/catenaria.js',
  'dades/imatges.js', 'dades/obres.js', 'dades/glossari.js', 'dades/preguntes.js', 'dades/arquitectes.js',
  'favicon.svg', 'manifest.webmanifest', 'assets/CC_BY-NC-SA.png', 'assets/icona-192.png', 'assets/icona-512.png'
];
const MAX_MAPA = 400;

self.window = self;
try { importScripts('dades/imatges.js'); } catch (e) { self.IMATGES = {}; }
const MINIS = Object.keys(self.IMATGES || {}).map(id => 'img/mini/' + id + '.webp');

self.addEventListener('install', ev => {
  ev.waitUntil((async () => {
    const c = await caches.open(VERSIO);
    await c.addAll(NUCLI);
    // Les imatges petites es desen una a una: si alguna falla, no s'atura la instal·lació
    await Promise.all(MINIS.map(u => c.add(u).catch(() => null)));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', ev => {
  ev.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSIO && k !== 'modernisme-mapa') await caches.delete(k);
    await self.clients.claim();
  })());
});

async function primerXarxa(req) {
  const c = await caches.open(VERSIO);
  try {
    const r = await fetch(req);
    if (r.ok) c.put(req, r.clone());
    return r;
  } catch (e) {
    return (await c.match(req, { ignoreSearch: true })) || (await c.match('index.html'));
  }
}

async function primerCache(req, nom, limit) {
  const c = await caches.open(nom);
  const desat = await c.match(req, { ignoreSearch: true });
  if (desat) return desat;
  const r = await fetch(req);
  if (r.ok || r.type === 'opaque') {
    c.put(req, r.clone());
    if (limit) {
      const claus = await c.keys();
      if (claus.length > limit) await c.delete(claus[0]);
    }
  }
  return r;
}

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('tile.openstreetmap.org')) { ev.respondWith(primerCache(req, 'modernisme-mapa', MAX_MAPA)); return; }
  if (url.hostname === 'unpkg.com') { ev.respondWith(primerCache(req, VERSIO)); return; }
  if (url.origin !== location.origin) return;
  if (/\.(webp|png|jpg|svg|woff2|mp3)$/.test(url.pathname)) { ev.respondWith(primerCache(req, VERSIO)); return; }
  ev.respondWith(primerXarxa(req));
});
