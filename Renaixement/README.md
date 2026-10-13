# El Renaixement

Web educativa en català amb 68 obres, 33 artistes, 12 conceptes, arquitectura, cronologia i visor Deep Zoom.

- Web: https://felipsarroca.github.io/web/Renaixement/
- Enllaç curt: https://ja.cat/renaixement

## Desenvolupament local

Cal Node.js 22 i Bun 1.3.14.

```powershell
bun install --frozen-lockfile
bun run dev
bun run test
```

## Publicació

El workflow del repositori publica l'exportació estàtica a GitHub Pages amb els canvis a `main`.

```powershell
$env:GITHUB_PAGES='true'
$env:NEXT_PUBLIC_SITE_URL='https://felipsarroca.github.io/web/Renaixement/'
bun run build:pages
```

Cada secció, obra, artista i concepte té el seu `index.html`, de manera que es pot obrir directament i recarregar. La navegació, les imatges i les piràmides del visor incorporen el prefix `/web/Renaixement`. Els filtres es llegeixen al navegador.

Per preparar una instal·lació amb servidor, elimina la variable `GITHUB_PAGES`, executa `bun run build` i després `bun run start`.
