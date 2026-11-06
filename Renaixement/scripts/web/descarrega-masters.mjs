// descarrega-masters.mjs — P0 audit: actius locals en lloc de dependre de Wikimedia a cada visita.
// Descarrega un màster per obra (1920px, 3840px per a fites grans, o l'original si és menor)
// DIRECTAMENT des d'upload.wikimedia.org (CDN, sense PHP) usant la ruta MD5 canònica.
// Respecta els throttle: retry-after + pacing generós. Sortida: assets/masters/{slug}.jpg
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ARREL = path.resolve(import.meta.dirname, "../..");
const IMATGES = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges.json"), "utf8"));
const MASTERS = path.join(ARREL, "assets/masters");
fs.mkdirSync(MASTERS, { recursive: true });

// Obres fites: mestre a 3840 si l'original ho permet (zoom real «mira-hi de prop»)
function fites() {
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

const FITES = fites();
const UA = "RenaixementWeb/1.0 (projecte educatiu de referència en català; càrrega única d'actius)";

function rutaMD5(nom) {
  const md5 = crypto.createHash("md5").update(nom).digest("hex");
  return md5[0] + "/" + md5.slice(0, 2);
}
import crypto from "node:crypto";

function urlPer(slug, im) {
  const nom = im.fitxer.replace(/ /g, "_");
  const base = "https://upload.wikimedia.org/wikipedia/commons";
  const ruta = rutaMD5(nom);
  const enc = encodeURIComponent(nom);
  // Política de miniatures de Wikimedia (2025+): només amplades fixes —
  // 250, 330, 500, 960, 1280, 1920 i 3840. Les altres tornen 400.
  const FITA_AMP = 3840;
  const BASE_AMP = 1920;
  let AMP = 0;
  if (FITES.has(slug) && im.amplada >= FITA_AMP) AMP = FITA_AMP;
  else if (im.amplada >= BASE_AMP) AMP = BASE_AMP;
  if (AMP === 0) return { url: `${base}/${ruta}/${enc}`, font: "original" };
  return { url: `${base}/thumb/${ruta}/${enc}/${AMP}px-${enc}`, font: `thumb-${AMP}`, amp: AMP };
}

/** Escalera d'URLs per provar: objectiu → 1920 → 960 → 500 (o original si és petita). */
function urlsPer(slug, im) {
  const nom = im.fitxer.replace(/ /g, "_");
  const base = "https://upload.wikimedia.org/wikipedia/commons";
  const ruta = rutaMD5(nom);
  const enc = encodeURIComponent(nom);
  const candidates = [];
  const { url, font, amp } = urlPer(slug, im);
  candidates.push({ url, font, amp: amp ?? 0 });
  if (amp && amp !== 1920) candidates.push({ url: `${base}/thumb/${ruta}/${enc}/1920px-${enc}`, font: "thumb-1920", amp: 1920 });
  if (im.amplada >= 960) candidates.push({ url: `${base}/thumb/${ruta}/${enc}/960px-${enc}`, font: "thumb-960", amp: 960 });
  if (im.amplada >= 500) candidates.push({ url: `${base}/thumb/${ruta}/${enc}/500px-${enc}`, font: "thumb-500", amp: 500 });
  return candidates;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Espera silenciosa inicial: el throttle de Wikimedia es reinscriu amb CADA petició,
// així que cal silenci total abans de començar (per defecte 15 min, configurable).
const QUIET = Number(process.env.QUIET_SECS ?? 900) * 1000;
if (QUIET > 0) {
  console.log(`Espera silenciosa inicial de ${QUIET / 1000}s per deixar expirar el throttle…`);
  await sleep(QUIET);
}

async function descarrega(slug, im, intents = 10) {
  const candidats = urlsPer(slug, im);
  for (const { url, font, amp } of candidats) {
    const hdr = path.join(MASTERS, `.hdr-${slug}`);
    for (let i = 1; i <= intents; i++) {
      try {
        execFileSync("curl", ["-s", "-D", hdr, "-A", UA, "-o", path.join(MASTERS, `${slug}.jpg`), "--max-time", "120", url], { stdio: "pipe" });
        const head = fs.readFileSync(hdr, "utf8");
        const estat = Number(head.match(/^HTTP\/[\d.]+ (\d+)/m)?.[1] ?? 0);
        if (estat === 200) {
          const buf = fs.readFileSync(path.join(MASTERS, `${slug}.jpg`));
          if (buf.length < 15000 || (buf[0] !== 0xff && buf[0] !== 0x89 && buf[0] !== 0x52)) {
            return { ok: false, motiu: `contingut suspecte (${buf.length}B)` };
          }
          return { ok: true, font, amp, bytes: buf.length };
        }
        if (estat === 429) {
          const espera = Math.min(120, Number(head.match(/retry-after:\s*(\d+)/i)?.[1] ?? 60)) * 1000;
          console.log(`  429 ${slug}: espere ${Math.round(espera / 1000)}s…`);
          await sleep(espera);
          continue;
        }
        if (estat >= 500 || estat === 0) {
          await sleep(4000 * i);
          continue;
        }
        break; // 400/403/etc: passa a la següent amplada de l'escalera
      } catch (e) {
        await sleep(4000 * i);
        if (i === intents) return { ok: false, motiu: e.message.slice(0, 80) };
      } finally {
        try { fs.unlinkSync(hdr); } catch {}
      }
    }
  }
  return { ok: false, motiu: "esgotat (429 o mides invàlides)" };
}

const resum = JSON.parse(fs.existsSync(path.join(import.meta.dirname, "manifest-descarrega.json"))
  ? fs.readFileSync(path.join(import.meta.dirname, "manifest-descarrega.json"), "utf8")
  : "{}");
const PACE = Number(process.env.PACE_MS ?? 8000);
const LIMIT = Number(process.env.LIMIT ?? 0); // 0 = sense límit

// Ordre de prioritat: primer les obres anotades (pilot) i les de comparacions,
// després fites i resta — així l'experiència didàctica funciona encara amb
// descàrregues parcials.
function prioritat() {
  const fitxer = path.join(import.meta.dirname, "prioritat.txt");
  if (fs.existsSync(fitxer)) {
    return fs.readFileSync(fitxer, "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}
const ORDRE = prioritat();

const slugs = Object.keys(IMATGES).filter((s) => {
  const sortida = path.join(MASTERS, `${s}.jpg`);
  return !(fs.existsSync(sortida) && fs.statSync(sortida).size > 15000);
});
const rank = (s) => {
  const i = ORDRE.indexOf(s);
  return i === -1 ? ORDRE.length + 1 : i;
};
slugs.sort((a, b) => rank(a) - rank(b));
console.log(`Pendents: ${slugs.length} màsters (pace ${PACE / 1000}s${LIMIT ? `, límit d'aquest lot: ${LIMIT}` : ""}).`);
let fets = 0;
let fallades429 = 0;
for (const slug of slugs) {
  if (LIMIT && fets >= LIMIT) break;
  const r = await descarrega(slug, IMATGES[slug]);
  resum[slug] = r;
  fets++;
  console.log(`[${fets}/${slugs.length}] ${slug}: ${r.ok ? `OK ${r.font} ${(r.bytes / 1024).toFixed(0)}KB` : "ERROR " + r.motiu}`);
  if (!r.ok && r.motiu.includes("429")) {
    fallades429++;
    if (fallades429 >= 2) {
      console.log("\nBan actiu: dos fitxers seguits amb 429 esgotat. Aturo el lot per deixar expirar la limitació.");
      break;
    }
  } else if (r.ok) {
    fallades429 = 0;
  }
  await sleep(PACE + Math.random() * 1500); // pacing lent per no reactivar el throttle
}
fs.writeFileSync(path.join(import.meta.dirname, "manifest-descarrega.json"), JSON.stringify(resum, null, 2));
const errors = Object.entries(resum).filter(([, v]) => !v.ok);
console.log(`\nFet en aquest lot: ${fets}. Errors acumulats: ${errors.length}.`);
if (errors.length) console.log("Errors:", errors.map(([k, v]) => `${k} (${v.motiu})`).join(", "));
