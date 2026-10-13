// actius.test.ts — Comprova que CADA ruta d'imatge declarada al manifest existeix
// de veritat al disc (derivats WebP, màster del fallback i piràmide DZI amb tiles).
// Execució: bun tests/actius.test.ts
import fs from "node:fs";
import path from "node:path";

const ARREL = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ARREL, "public/imatges/obres");
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges-locals.json"), "utf8"));

let comprovacions = 0;
const errors: string[] = [];

function existeix(ruta: string, cosa: string) {
  comprovacions++;
  if (!fs.existsSync(ruta)) errors.push(`Falta ${cosa}: ${ruta.replace(ARREL + "/", "")}`);
}

for (const [slug, dada] of Object.entries(MANIFEST) as [string, any][]) {
  if (slug.startsWith("_")) continue;
  if (!dada) continue; // pendent: no ha de tenir actius; se'n fa càrrec dades.test.ts
  existeix(path.join(PUBLIC, `${slug}-master.jpg`), `màster de ${slug}`);
  for (const w of dada.amplades) {
    existeix(path.join(PUBLIC, slug, `w${w}.webp`), `derivat w${w} de ${slug}`);
  }
  if (dada.tiles) {
    existeix(path.join(PUBLIC, `${slug}.dzi`), `DZI de ${slug}`);
    const files = path.join(PUBLIC, `${slug}_files`);
    if (!fs.existsSync(files)) errors.push(`Falta el directori de tiles de ${slug}`);
    // El DZI ha de declarar la mida del màster
    const dzi = fs.readFileSync(path.join(PUBLIC, `${slug}.dzi`), "utf8");
    comprovacions++;
    if (!dzi.includes(`Width="${dada.amplada}"`)) {
      errors.push(`El DZI de ${slug} no declara Width=${dada.amplada}`);
    }
  }
}

// El manifest ha de cobrir TOTES les obres del corpus d'imatges
const CORPUS = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges.json"), "utf8"));
for (const slug of Object.keys(CORPUS)) {
  comprovacions++;
  if (!(slug in MANIFEST)) errors.push(`El manifest no té entrada per a ${slug}`);
}

console.log(`actius.test.ts: ${comprovacions} comprovacions · ${errors.length} errors`);
if (errors.length) {
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}
console.log("  ✓ Tots els actius declarats existeixen.");
