import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const base = (process.env.WEB_BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
const routes = ['/', '/obres/', '/cronologia/', '/artistes/', '/conceptes/',
  '/arquitectura/', '/fora-ditalia/', '/comparacions/', '/glossari/', '/sobre/',
  '/obres/verge-roques/', '/obres/amor-sagrat-prof%C3%A0/'];
let checks = 0;
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.ok(html.includes('Renaixement'), route);
  if (route.includes('prof%C3%A0')) assert.ok(html.includes('Amor sagrat i amor profà'));
  checks++;
}
const manifest = JSON.parse(readFileSync('src/data/imatges-locals.json', 'utf8'));
for (const [slug, item] of Object.entries(manifest)) {
  if (slug.startsWith('_') || !item) continue;
  const prefix = '/imatges/obres/' + encodeURIComponent(slug);
  const dzi = readFileSync(`public/imatges/obres/${slug}.dzi`, 'utf8');
  const format = /Format="([^"]+)"/.exec(dzi)[1];
  for (const path of [prefix + '/w800.webp', prefix + '.dzi', prefix + '_files/0/0_0.' + format]) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.ok((await response.arrayBuffer()).byteLength > 0, path);
    checks++;
  }
}
console.log(`Web en producció: ${checks} comprovacions HTTP · 0 errors`);
