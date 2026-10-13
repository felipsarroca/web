import assert from 'node:assert/strict';

process.env.NEXT_PUBLIC_BASE_PATH = '/web/Renaixement';
const { camiPublic, rutaPublica, sensePrefix } = await import('../src/lib/renaissance/camins');
const { useApp } = await import('../src/lib/renaissance/store');
const { urlImatge, urlDzi } = await import('../src/data/imatges');
const location = { pathname: '/web/Renaixement/obres/amor-sagrat-prof%C3%A0/', search: '?desDe=cronologia', hash: '' };
const history = {
  pushState: (_: unknown, __: string, target: string) => {
    const url = new URL(target, 'https://felipsarroca.github.io');
    location.pathname = url.pathname;
    location.search = url.search;
  },
  replaceState: (_: unknown, __: string, target: string) => history.pushState(_, __, target),
};
Object.defineProperty(globalThis, 'window', { configurable: true, value: { location, history } });
useApp.getState().sincronitzaRuta();
assert.deepEqual(useApp.getState().vista, { nom: 'obra', slug: 'amor-sagrat-profà' });
assert.equal(useApp.getState().filtres.desDe, 'cronologia');
useApp.getState().navega('coleccions?disciplina=escultura');
assert.equal(location.pathname, '/web/Renaixement/obres/');
assert.equal(useApp.getState().vista.nom, 'coleccions');
assert.equal(useApp.getState().filtres.disciplina, 'escultura');
useApp.getState().navega('');
assert.equal(location.pathname, '/web/Renaixement/');
assert.equal(useApp.getState().vista.nom, 'home');
location.hash = '#/obra/verge-roques';
useApp.getState().sincronitzaRuta();
assert.equal(location.pathname, '/web/Renaixement/obres/verge-roques/');
assert.equal(camiPublic('/logo.svg'), '/web/Renaixement/logo.svg');
assert.equal(rutaPublica('/obres/'), '/web/Renaixement/obres/');
assert.equal(sensePrefix('/web/Renaixement/cronologia/'), '/cronologia/');
assert.equal(sensePrefix('/web/Renaixement-extra/'), '/web/Renaixement-extra/');
assert.ok(urlImatge('verge-roques', 800).startsWith('/web/Renaixement/imatges/obres/'));
assert.equal(urlDzi('verge-roques'), '/web/Renaixement/imatges/obres/verge-roques.dzi');
console.log('pages.test.ts: 14 comprovacions · 0 errors');
