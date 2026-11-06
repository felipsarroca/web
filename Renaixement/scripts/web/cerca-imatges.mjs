// cerca-imatges.mjs — Pla B de reproduccions: cerca web via z-ai image-search (OSS reachable)
// quan el CDN de Wikimedia està sota 429 persistent.
// Selecció: minimitza la desviació de proporció respecte a l'original de Commons
// (guarda contra retalls i detalls) i prefereix amplades grans.
// HONESTETAT EDITORIAL: cada obra descarregada així es marca a manifest-copia.json
// amb font "cerca-web"; el crèdit de la fitxa ho indicarà mentre sigui així.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import sharp from "sharp";

const ARREL = path.resolve(import.meta.dirname, "../..");
const MASTERS = path.join(ARREL, "assets/masters");
const IMATGES = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges.json"), "utf8"));
const FITXER_COPIA = path.join(import.meta.dirname, "manifest-copia.json");
const copia = fs.existsSync(FITXER_COPIA) ? JSON.parse(fs.readFileSync(FITXER_COPIA, "utf8")) : {};

const LIMIT = Number(process.env.LIMIT ?? 20);
const CONC = Number(process.env.CONC ?? 3);
const UA = "RenaixementWeb/1.0 (projecte educatiu; càrrega única d'actius)";

function prioritat() {
  const fitxer = path.join(import.meta.dirname, "prioritat.txt");
  return fs.existsSync(fitxer)
    ? fs.readFileSync(fitxer, "utf8").split("\n").map((s) => s.trim()).filter(Boolean)
    : [];
}
const ORDRE = prioritat();
const rank = (s) => (ORDRE.indexOf(s) === -1 ? ORDRE.length + 1 : ORDRE.indexOf(s));

const pendents = Object.keys(IMATGES)
  .filter((s) => !(fs.existsSync(path.join(MASTERS, `${s}.jpg`)) && fs.statSync(path.join(MASTERS, `${s}.jpg`))?.size > 15000))
  .sort((a, b) => rank(a) - rank(b))
  .slice(0, LIMIT);

console.log(`Cerques pendents: ${pendents.length} (concurrència ${CONC}).`);

function cerca(slug) {
  const im = IMATGES[slug];
  // Consulta a partir del nom del fitxer de Commons (descriptiu, en anglès)
  const consulta = im.fitxer.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  try {
    const sortida = execFileSync(
      "z-ai",
      ["image-search", "-q", consulta, "--count", "6", "--gl", "us", "--no-rank"],
      { stdio: "pipe", timeout: 150000, encoding: "utf8" },
    );
    // El CLI imprimeix línies de log amb emojis abans del JSON: agafa des del primer {
    const inici = sortida.indexOf("{");
    if (inici < 0) return { slug, ok: false, motiu: "sortida sense JSON" };
    const json = JSON.parse(sortida.slice(inici));
    if (!json.success || !json.results?.length) return { slug, ok: false, motiu: json.error ?? "sense resultats" };
    const objectiu = im.amplada / im.alcada;
    let millor = null;
    for (const r of json.results) {
      const w = parseInt(r.original_width);
      const h = parseInt(r.original_height);
      if (!w || !h || w < 600) continue;
      const desviacio = Math.abs(Math.log(w / h / objectiu));
      if (desviacio > 0.35) continue; // massa retallat/crop
      const puntuacio = desviacio * 2 - Math.min(w, 2400) / 2400 * 0.5;
      if (!millor || puntuacio < millor.puntuacio) millor = { url: r.original_url, w, h, desviacio, puntuacio, font: r.source };
    }
    if (!millor) return { slug, ok: false, motiu: "cap resultat amb proporció adequada" };
    // Descarrega
    const desti = path.join(MASTERS, `${slug}.jpg`);
    execFileSync("curl", ["-s", "-L", "-A", UA, "-o", desti, "--max-time", "90", millor.url], { stdio: "pipe", timeout: 100000 });
    const buf = fs.readFileSync(desti);
    if (buf.length < 15000 || (buf[0] !== 0xff && buf[0] !== 0x89 && buf[0] !== 0x52)) {
      fs.unlinkSync(desti);
      return { slug, ok: false, motiu: `baixada sospitosa (${buf.length}B)` };
    }
    // Verificació amb sharp: dimensions reals i proporció
    return sharp(desti)
      .metadata()
      .then((meta) => {
        if (!meta.width || !meta.height) throw new Error("illegible");
        const dv = Math.abs(Math.log(meta.width / meta.height / (im.amplada / im.alcada)));
        if (dv > 0.4) {
          fs.unlinkSync(desti);
          return { slug, ok: false, motiu: `proporció final fora (${meta.width}×${meta.height})` };
        }
        copia[slug] = { font: "cerca-web", origen: millor.font, url: millor.url, amplada: meta.width, alcada: meta.height, bytes: buf.length };
        return { slug, ok: true, info: `${meta.width}×${meta.height} (${millor.font})` };
      })
      .catch((e) => ({ slug, ok: false, motiu: `sharp: ${e.message.slice(0, 60)}` }));
  } catch (e) {
    return { slug, ok: false, motiu: e.message?.slice(0, 80) ?? "cerca fallida" };
  }
}

// Pool senzill
const cua = [...pendents];
let fets = 0;
const resultats = [];
async function treballador() {
  while (cua.length) {
    const slug = cua.shift();
    const r = await cerca(slug);
    resultats.push(r);
    fets++;
    console.log(`[${fets}/${pendents.length}] ${r.slug}: ${r.ok ? "OK " + r.info : "ERROR " + r.motiu}`);
  }
}
await Promise.all(Array.from({ length: Math.min(CONC, cua.length) }, treballador));
fs.writeFileSync(FITXER_COPIA, JSON.stringify(copia, null, 2));
const bones = resultats.filter((r) => r.ok).length;
console.log(`\nFet: ${bones}/${pendents.length} amb reproducció.`);
