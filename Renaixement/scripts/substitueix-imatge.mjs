import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Substitueix la imatge d'una obra per un fitxer descarregat de Wikimedia Commons:
// màster local, derivats WebP, piràmide DZI i entrades dels dos manifests.
// Ús: node scripts/substitueix-imatge.mjs <slug> <jpg-local> "<fitxer Commons>" "<llicència>" <url-llicència> "<autor de la foto>"
// L'autor de la foto és qui ha fet la fotografia, no l'autor de l'obra: si Commons
// només indica l'artista (reproduccions de domini públic), cal deixar-lo buit ("").
const [slug, source, filename, llicencia, urlLlicencia, autorFoto = ''] = process.argv.slice(2);
if (!slug || !source || !filename || !llicencia || !urlLlicencia) {
  throw new Error('Ús: substitueix-imatge.mjs <slug> <jpg> "<fitxer Commons>" "<llicència>" <url-llicència> "<autor foto>"');
}
const MAX = 5000; // costat llarg màxim del màster servit
const folder = 'public/imatges/obres';
const master = path.join(folder, slug + '-master.jpg');
const original = await sharp(source).metadata();
const escala = Math.min(1, MAX / Math.max(original.width, original.height));
await sharp(source).rotate()
  .resize({ width: Math.round(original.width * escala), withoutEnlargement: true })
  .jpeg({ quality: 90, mozjpeg: true }).toFile(master);
const info = await sharp(master).metadata();

// Els derivats i els tiles antics s'eliminen: una imatge nova més petita deixaria
// fitxers orfes (és el que va passar amb derivats d'una baixada errònia anterior).
fs.rmSync(path.join(folder, slug), { recursive: true, force: true });
fs.rmSync(path.join(folder, slug + '_files'), { recursive: true, force: true });
fs.mkdirSync(path.join(folder, slug), { recursive: true });
const widths = [480, 800, 1200, 1600].filter((w) => w <= info.width);
for (const width of widths) {
  await sharp(master).resize({ width, withoutEnlargement: true }).webp({ quality: 82 })
    .toFile(path.join(folder, slug, `w${width}.webp`));
}
await sharp(master).jpeg({ quality: 90 })
  .tile({ size: 256, overlap: 1, layout: 'dz', depth: 'onepixel' })
  .toFile(path.join(folder, slug));

const provenance = {
  fitxer: filename,
  url: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename.replaceAll(' ', '_')),
  llicencia,
  url_llicencia: urlLlicencia,
  autor_foto: autorFoto,
  transformacions: [
    `Original de Commons ${original.width}×${original.height}` +
      (escala < 1 ? `, reduït a ${info.width}×${info.height} (costat llarg ${MAX} px), sense retall` : ', sense retall ni ampliació'),
    ...widths.map((width) => `Derivat WebP q82 w${width}`),
    'Piràmide DZI JPEG q90, fragments de 256 px, solapament 1',
  ],
};
const imagesPath = 'src/data/imatges.json';
const images = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
images[slug] = {
  fitxer: filename, amplada: original.width, alcada: original.height,
  llicencia, autor_foto: autorFoto,
};
fs.writeFileSync(imagesPath, JSON.stringify(images, null, 2) + '\n');
const localsPath = 'src/data/imatges-locals.json';
const locals = JSON.parse(fs.readFileSync(localsPath, 'utf8'));
locals[slug] = {
  amplada: info.width, alcada: info.height, amplades: widths,
  tiles: true, copia: 'commons',
  versio: crypto.createHash('sha256').update(fs.readFileSync(master)).digest('hex').slice(0, 12),
  font: provenance,
};
fs.writeFileSync(localsPath, JSON.stringify(locals, null, 2) + '\n');
console.log(`${slug}: ${info.width}×${info.height}, ${widths.length} derivats i zoom preparats. Executeu ara scripts/genera-lqip.mjs.`);
