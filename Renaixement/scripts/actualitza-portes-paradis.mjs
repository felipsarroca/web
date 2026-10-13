import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Fotografia frontal de les portes originals, de Sailko (CC BY 3.0).
// Cal passar el JPG descarregat de la pàgina de Commons indicada a sota.
const source = process.argv[2];
if (!source) throw new Error('Indiqueu el JPG original de Commons.');
const slug = 'portes-paradis';
const folder = 'public/imatges/obres';
const master = path.join(folder, slug + '-master.jpg');
fs.copyFileSync(source, master);
const info = await sharp(master).metadata();
const widths = [480, 800, 1200, 1600];
for (const width of widths) {
  await sharp(master).resize({ width, withoutEnlargement: true }).webp({ quality: 82 })
    .toFile(path.join(folder, slug, `w${width}.webp`));
}
await sharp(master).jpeg({ quality: 90 })
  .tile({ size: 256, overlap: 1, layout: 'dz', depth: 'onepixel' })
  .toFile(path.join(folder, slug));

const filename = 'Lorenzo ghiberti, porta del paradiso, 1425-52, 00.JPG';
const provenance = {
  fitxer: filename,
  url: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename.replaceAll(' ', '_')),
  llicencia: 'CC BY 3.0',
  url_llicencia: 'https://creativecommons.org/licenses/by/3.0/',
  autor_foto: 'Sailko',
  transformacions: [
    `Original local ${info.width}×${info.height} (JPG), sense retall ni ampliació`,
    ...widths.map(width => `Derivat WebP q82 w${width}`),
    'Piràmide DZI JPEG q90, fragments de 256 px, solapament 1',
  ],
};
const imagesPath = 'src/data/imatges.json';
const images = JSON.parse(fs.readFileSync(imagesPath, 'utf8'));
images[slug] = {
  fitxer: filename, amplada: info.width, alcada: info.height,
  llicencia: provenance.llicencia, autor_foto: provenance.autor_foto,
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
console.log(`${slug}: fotografia ${info.width}×${info.height}, derivats i zoom preparats.`);
