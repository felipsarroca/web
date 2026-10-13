import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Genera una miniatura minúscula (24 px d'amplada, WebP) de cada obra i la desa en
// base64 a src/data/imatges-lqip.json. ImgObra la mostra ampliada com a fons mentre
// carrega el derivat real: les targetes no apareixen buides en connexions lentes o
// abans que la càrrega diferida arribi a la imatge.
// Cal tornar-lo a executar després de substituir una imatge (substitueix-imatge.mjs).
const folder = 'public/imatges/obres';
const locals = JSON.parse(fs.readFileSync('src/data/imatges-locals.json', 'utf8'));
const sortida = {};
for (const [slug, dada] of Object.entries(locals)) {
  if (slug.startsWith('_') || !dada?.amplades?.length) continue;
  const origen = path.join(folder, slug, `w${dada.amplades[0]}.webp`);
  if (!fs.existsSync(origen)) continue;
  const buffer = await sharp(origen).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  sortida[slug] = 'data:image/webp;base64,' + buffer.toString('base64');
}
fs.writeFileSync('src/data/imatges-lqip.json', JSON.stringify(sortida, null, 2) + '\n');
const mida = Object.values(sortida).reduce((total, v) => total + v.length, 0);
console.log(`${Object.keys(sortida).length} miniatures LQIP (${Math.round(mida / 1024)} KB en total).`);
