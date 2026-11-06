// descarrega-weserv.mjs — Descàrrega dels màsters canònics de Wikimedia Commons
// A TRAVÉS del proxy públic d'imatges images.weserv.nl: el proxy fa la petició
// amb les seves pròpies IPs (evita el 429 del bloc compartit) i ens serveix els
// BYTES ORIGINÀRIES del fitxer de Commons — contingut correcte i crèdits vàlids.
// Amplades de miniatura segons la política de Wikimedia: 1920 (base) i 3840 (fites).
// Resultat: manifest-copia.json es buida (copia = "commons" a tot el corpus).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const ARREL = path.resolve(import.meta.dirname, "../..");
const MASTERS = path.join(ARREL, "assets/masters");
const IMATGES = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges.json"), "utf8"));
const COPIA_FITXER = path.join(import.meta.dirname, "manifest-copia.json");

// Fites (mestre a 3840 si l'original ho permet) — mateixa lògica que descarrega-masters
function fitas() {
  const dir = path.join(ARREL, "src/data/obres");
  const out = new Set();
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts") && x !== "index.ts")) {
    const t = fs.readFileSync(path.join(dir, f), "utf8");
    for (const bloc of t.split(/\n  \{/).slice(1)) {
      const slug = bloc.match(/slug:\s*"([^"]+)"/)?.[1];
      if (slug && /obraFita:\s*true/.test(bloc)) out.add(slug);
    }
  }
  return out;
}
const FITES = fitas();
const LIMIT = Number(process.env.LIMIT ?? 0);
const CONC = Number(process.env.CONC ?? 2);
const ESPERA = Number(process.env.ESPERA_MS ?? 2500);

function urlCommons960(slug, im) {
  const nom = im.fitxer.replace(/ /g, "_");
  const md5 = crypto.createHash("md5").update(nom).digest("hex");
  const enc = encodeURIComponent(nom);
  if (im.amplada < 960) return urlCommons(slug, im);
  return `upload.wikimedia.org/wikipedia/commons/thumb/${md5[0]}/${md5.slice(0, 2)}/${enc}/960px-${enc}`;
}

function urlOriginal(slug, im) {
  const nom = im.fitxer.replace(/ /g, "_");
  const md5 = crypto.createHash("md5").update(nom).digest("hex");
  return `upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(nom)}`;
}

function urlCommons(slug, im) {
  const nom = im.fitxer.replace(/ /g, "_");
  const md5 = crypto.createHash("md5").update(nom).digest("hex");
  const base = "upload.wikimedia.org/wikipedia/commons";
  const enc = encodeURIComponent(nom);
  const AMP = FITES.has(slug) && im.amplada >= 3840 ? 3840 : im.amplada >= 1920 ? 1920 : 0;
  if (AMP === 0) return `${base}/${md5[0]}/${md5.slice(0, 2)}/${enc}`;
  return `${base}/thumb/${md5[0]}/${md5.slice(0, 2)}/${enc}/${AMP}px-${enc}`;
}

const pendents = Object.keys(IMATGES).filter((s) => {
  const p = path.join(MASTERS, `${s}.jpg`);
  return !(fs.existsSync(p) && fs.statSync(p).size > 5000);
});
console.log(`Màsters a baixar via weserv: ${pendents.length}${LIMIT ? ` (límit ${LIMIT})` : ""}`);

const cua = pendents.slice(0, LIMIT || undefined);
let fets = 0;
let errors = 0;

async function baixa(slug) {
  const im = IMATGES[slug];
  // Si l'original és manejable (<2600px), baixa'l DIRECTE (no cal generar thumb a l'upstream)
  const ruta = im.amplada < 2600 ? urlOriginal(slug, im) : urlCommons(slug, im);
  const url = `https://images.weserv.nl/?url=${encodeURIComponent(ruta)}&output=jpg&q=88`;
  const desti = path.join(MASTERS, `${slug}.jpg`);
  for (let intent = 1; intent <= 3; intent++) {
    try {
      execCurl(url, desti);
      const buf = fs.readFileSync(desti);
      const esJpeg = buf[0] === 0xff && buf[1] === 0xd8;
      if (buf.length < 5000 || !esJpeg) throw new Error(`resposta sospitosa (${buf.length}B)`);
      const meta = await sharp(desti).metadata();
      if (!meta.width || !meta.height) throw new Error("illegible");
      // proporció ha de ser pròxima a l'original de Commons (les mides poden variar per l'amplada de thumb)
      const dv = Math.abs(Math.log((meta.width / meta.height) / (im.amplada / im.alcada)));
      if (dv > 0.12) throw new Error(`proporció fora (${meta.width}×${meta.height}, dv=${dv.toFixed(2)})`);
      fets++;
      console.log(`[${fets}/${cua.length}] ${slug}: OK ${meta.width}×${meta.height} ${(buf.length / 1024).toFixed(0)}KB`);
      return true;
    } catch (e) {
      if (intent === 3) {
        // fallback: mida més petita (menys càrrega per a l'upstream)
        const urlPetit = `https://images.weserv.nl/?url=${encodeURIComponent(urlCommons960(slug, im))}&output=jpg&q=85`;
        try {
          execCurl(urlPetit, desti);
          const buf = fs.readFileSync(desti);
          if (buf.length > 15000) {
            const meta = await sharp(desti).metadata();
            if (meta.width) {
              fets++;
              console.log(`[${fets}/${cua.length}] ${slug}: OK-960 ${meta.width}×${meta.height} ${(buf.length / 1024).toFixed(0)}KB`);
              return true;
            }
          }
        } catch {}
        errors++;
        fets++;
        console.log(`[${fets}/${cua.length}] ${slug}: ERROR ${e.message.slice(0, 70)}`);
        try { fs.unlinkSync(desti); } catch {}
        return false;
      }
      await new Promise((r) => setTimeout(r, 3000 * intent));
    }
  }
}

import { execFileSync } from "node:child_process";
function execCurl(url, desti) {
  execFileSync("curl", ["-s", "-L", "-o", desti, "--max-time", "120", url], { stdio: "pipe", timeout: 130000 });
}

const treball = [...cua];
async function treballador() {
  while (treball.length) {
    await baixa(treball.shift());
    await new Promise((r) => setTimeout(r, ESPERA + Math.random() * 1500));
  }
}
await Promise.all(Array.from({ length: Math.min(CONC, Math.max(1, treball.length)) }, treballador));

// Tot el corpus torna a ser canònic de Commons: buida el manifest de còpies de cerca web
fs.writeFileSync(COPIA_FITXER, JSON.stringify({}, null, 2));
console.log(`\nFet: ${fets}/${cua.length} · errors: ${errors}. manifest-copia buit (tot canònic de Commons).`);
