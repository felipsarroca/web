// genera-derivats.mjs — P0: genera els actius locals a partir dels màsters.
//  · public/imatges/obres/{slug}-master.jpg  (còpia del màster per al fallback del visor)
//  · public/imatges/obres/{slug}/w{W}.webp   (derivats 480/800/1200/1600, segons màster)
//  · public/imatges/obres/{slug}.dzi + {slug}_files/  (piràmida Deep Zoom per als màsters ≥1200px)
//  · src/data/imatges-locals.json            (manifest amb amplada/alçada/amplades/tiles/copia)
// Idempotent: regenera tot a partir de assets/masters/.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

const ARREL = path.resolve(import.meta.dirname, "../..");
const MASTERS = path.join(ARREL, "assets/masters");
const SORTIDA = path.join(ARREL, "public/imatges/obres");
const MANIFEST = path.join(ARREL, "src/data/imatges-locals.json");
const IMATGES = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges.json"), "utf8"));
const COPIA = fs.existsSync(path.join(import.meta.dirname, "manifest-copia.json"))
  ? JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "manifest-copia.json"), "utf8"))
  : {};

const AMPLADES = [480, 800, 1200, 1600];
const LLINDAR_DZI = 700; // mínim d'amplada del màster per generar piràmide

fs.mkdirSync(SORTIDA, { recursive: true });

const slugs = Object.keys(IMATGES).sort();
const manifest = {
  _comentari: "Manifest generat per scripts/web/genera-derivats.mjs. No editar a mà.",
  _format: { slug: { amplada: "px del màster", alcada: "px del màster", amplades: "derivats WebP disponibles", tiles: "piràmide DZI disponible" } },
};

let ambTiles = 0;
let ambImatge = 0;
const errors = [];

for (const slug of slugs) {
  const master = path.join(MASTERS, `${slug}.jpg`);
  if (!fs.existsSync(master) || fs.statSync(master).size < 15000) {
    manifest[slug] = null; // pendent de reproduir
    errors.push(`${slug}: sense màster`);
    continue;
  }
  try {
    const meta = await sharp(master, { limitInputPixels: false }).metadata();
    const amplada = meta.width;
    const alcada = meta.height;
    if (!amplada || !alcada) throw new Error("dimensions no llegibles");

    // 1) màster al lloc públic (fallback del visor)
    fs.copyFileSync(master, path.join(SORTIDA, `${slug}-master.jpg`));

    // 2) derivats WebP
    const dirDerivats = path.join(SORTIDA, slug);
    fs.mkdirSync(dirDerivats, { recursive: true });
    const disponibles = [];
    for (const w of AMPLADES) {
      if (w > amplada && disponibles.length > 0) break; // no upscale si ja en tenim
      const objectiu = Math.min(w, amplada);
      await sharp(master, { limitInputPixels: false })
        .resize({ width: objectiu, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(dirDerivats, `w${objectiu}.webp`));
      if (!disponibles.includes(objectiu)) disponibles.push(objectiu);
      if (objectiu >= amplada) break;
    }
    disponibles.sort((a, b) => a - b);

    // 3) piràmide DZI (màsters prou grans).
    // Nota sharp: toFile(X) produeix X.dzi + X_files/ (afaegeix l'extensió), i X no
    // pot ser un directori existent (col·lisió amb el dir de derivats WebP): per això
    // escrivim a una ruta temporal i reanomenem els dos productes.
    let tiles = false;
    if (amplada >= LLINDAR_DZI) {
      const base = path.join(SORTIDA, slug);
      const tmpOut = path.join(os.tmpdir(), `dzi-${slug}`);
      fs.rmSync(`${tmpOut}.tmp.dzi`, { force: true });
      fs.rmSync(`${tmpOut}.tmp_files`, { recursive: true, force: true });
      await sharp(master, { limitInputPixels: false })
        .tile({ size: 256, overlap: 1, layout: "dz", container: "fs" })
        .toFile(`${tmpOut}.tmp`); // → tmpOut.tmp.dzi + tmpOut.tmp_files
      fs.rmSync(`${base}.dzi`, { force: true });
      fs.rmSync(`${base}_files`, { recursive: true, force: true });
      fs.renameSync(`${tmpOut}.tmp.dzi`, `${base}.dzi`);
      fs.renameSync(`${tmpOut}.tmp_files`, `${base}_files`);
      tiles = fs.existsSync(`${base}.dzi`) && fs.existsSync(`${base}_files`);
      if (tiles) ambTiles++;
    }

    manifest[slug] = {
      amplada, alcada, amplades: disponibles, tiles,
      copia: COPIA[slug] ? "cerca-web" : "commons",
      // Atribució completa del derivat local (auditoria d'imatges):
      // autor, URL del fitxer font, llicència i transformacions aplicades.
      font: {
        fitxer: IMATGES[slug].fitxer,
        url: `https://commons.wikimedia.org/wiki/File:${IMATGES[slug].fitxer.replace(/ /g, "_")}`,
        llicencia: IMATGES[slug].llicencia,
        autor_foto: IMATGES[slug].autor_foto ?? null,
        transformacions: [
          `màster local ${amplada}×${alcada} (JPG)`,
          ...disponibles.map((w) => `derivat WebP q82 w${w}`),
          ...(tiles ? ["piràmide DZI 256px tiles, overlap 1"] : []),
        ],
      },
    };
    ambImatge++;
    console.log(`[${ambImatge}/${slugs.length}] ${slug}: ${amplada}×${alcada} · webp ${disponibles.join("/")} · dzi ${tiles ? "sí" : "no"}`);
  } catch (e) {
    manifest[slug] = null;
    errors.push(`${slug}: ${e.message?.slice(0, 80)}`);
    console.error(`ERROR ${slug}: ${e.message}`);
  }
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\nFet: ${ambImatge} amb imatge local · ${ambTiles} amb Deep Zoom · ${slugs.length - ambImatge} pendents.`);
if (errors.length) console.log("Pendents/Errors:", errors.join(" | "));
