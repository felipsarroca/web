import assert from 'node:assert/strict';
import { useApp } from '../src/lib/renaissance/store';
import { descodificaSegment } from '../src/lib/renaissance/rutes';
import { obra } from '../src/data/obres';

// Reprodueix la ruta que genera el navegador en clicar la fitxa de Ticià.
Object.defineProperty(globalThis, 'window', {
  configurable: true,
  value: { location: {
    pathname: '/obres/amor-sagrat-prof%C3%A0',
    search: '?desDe=cronologia',
    hash: '',
  } },
});
useApp.getState().sincronitzaRuta();
const { vista, filtres } = useApp.getState();
assert.equal(vista.nom, 'obra');
assert.ok('slug' in vista && obra(vista.slug), 'La ruta amb accent ha de trobar una obra real');
assert.equal(filtres.desDe, 'cronologia');
assert.equal(descodificaSegment('verge-roques'), 'verge-roques');
assert.equal(descodificaSegment('%invalid'), '%invalid');
console.log('rutes.test.ts: 5 comprovacions - 0 errors');
