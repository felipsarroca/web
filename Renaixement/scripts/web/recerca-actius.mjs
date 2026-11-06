import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const ARREL = "/home/z/my-project";
const MASTERS = path.join(ARREL, "assets/masters");
const IMATGES = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges.json"), "utf8"));
const copia = JSON.parse(fs.readFileSync(path.join(ARREL, "scripts/web/manifest-copia.json"), "utf8"));
const UA = "RenaixementWeb/1.0";
const STOCK = ["alamy", "dreamstime", "shutterstock", "getty", "istockphoto", "123rf", "adobe", "depositphotos", "bigstock", "agefotostock", "fine art america", "artmajeur", "stockphoto", "fotolia", "vectorstock"];

const pendents = Object.keys(IMATGES).filter((s) => {
  const p = path.join(MASTERS, `${s}.jpg`);
  return !(fs.existsSync(p) && fs.statSync(p).size > 15000);
});

function cerca(slug, intent) {
  const im = IMATGES[slug];
  const base = im.fitxer.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  const consulta = intent === 0 ? base
    : intent === 1 ? `${base} wikipedia`
    : `${base} wikimedia commons public domain`;
  const sortida = execFileSync("z-ai", ["image-search", "-q", consulta, "--count", "10", "--gl", "us", "--no-rank"], { stdio: "pipe", timeout: 150000, encoding: "utf8" });
  const json = JSON.parse(sortida.slice(sortida.indexOf("{")));
  if (!json.success || !json.results?.length) return null;
  const objectiu = im.amplada / im.alcada;
  let millor = null;
  for (const r of json.results) {
    const w = parseInt(r.original_width), h = parseInt(r.original_height);
    const font = (r.source || "").toLowerCase();
    if (!w || !h || w < 700) continue;
    if (STOCK.some((s) => font.includes(s))) continue;
    const dv = Math.abs(Math.log(w / h / objectiu));
    if (dv > 0.35) continue;
    // preferencia de font: wikipedia/museu > resta
    const bona = /wikipedia|wikimedia|wikimedia|lookandlearn|galler|muzeo|museum|nga\.|met\.|mfa\.|rijks|prado|louvre|uffizi|khan/.test(font) ? -0.6 : 0;
    const puntuacio = dv * 2 + bona - Math.min(w, 2400) / 2400 * 0.5;
    if (!millor || puntuacio < millor.puntuacio) millor = { url: r.original_url, w, h, puntuacio, font: r.source, dv };
  }
  return millor;
}

(async () => {
  for (const slug of pendents) {
    let fet = false;
    for (let intent = 0; intent < 3 && !fet; intent++) {
      try {
        const millor = cerca(slug, intent);
        if (!millor) continue;
        const desti = path.join(MASTERS, `${slug}.jpg`);
        execFileSync("curl", ["-s", "-L", "-A", UA, "-o", desti, "--max-time", "90", millor.url], { stdio: "pipe", timeout: 100000 });
        const buf = fs.readFileSync(desti);
        if (buf.length < 15000) { fs.unlinkSync(desti); continue; }
        const meta = await sharp(desti).metadata();
        const dv = Math.abs(Math.log(meta.width / meta.height / (IMATGES[slug].amplada / IMATGES[slug].alcada)));
        if (!meta.width || dv > 0.4) { fs.unlinkSync(desti); continue; }
        copia[slug] = { font: "cerca-web", origen: millor.font, url: millor.url, amplada: meta.width, alcada: meta.height, bytes: buf.length };
        console.log(`${slug}: OK ${meta.width}×${meta.height} (${millor.font}, dv=${dv.toFixed(2)}, intent ${intent})`);
        fet = true;
      } catch (e) { console.log(`${slug} intent ${intent}: ${(e.message || "").slice(0, 60)}`); }
    }
    if (!fet) console.log(`${slug}: SENSE SOLUCIÓ`);
  }
  fs.writeFileSync(path.join(ARREL, "scripts/web/manifest-copia.json"), JSON.stringify(copia, null, 2));
  const total = fs.readdirSync(MASTERS).filter((f) => f.endsWith(".jpg") && fs.statSync(path.join(MASTERS, f)).size > 15000).length;
  console.log(`\nMàsters totals: ${total}/68`);
})();
