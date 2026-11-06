// afinar-imatges.ts — Millora 4 fitxers amb alternatives de més qualitat/correctes.
"use strict";
const API = "https://commons.wikimedia.org/w/api.php";
let darreraPeticio = 0;

function httpGet(url: string): string {
  const { execSync } = require("child_process");
  for (let intent = 1; intent <= 5; intent++) {
    try {
      const ara = Date.now();
      if (ara - darreraPeticio < 2500) execSync(`sleep ${Math.ceil((2500 - (ara - darreraPeticio)) / 1000)}`);
      darreraPeticio = Date.now();
      const sortida = execSync(
        `curl -s -w "\\n__HTTP__%{http_code}" --max-time 30 -A "RenaixementWeb/1.0 (educational project)" ${JSON.stringify(url)}`,
        { maxBuffer: 20 * 1024 * 1024 },
      ).toString();
      const marca = sortida.lastIndexOf("\n__HTTP__");
      const codi = sortida.slice(marca + 9).trim();
      const cos = sortida.slice(0, marca);
      if (codi === "200" && cos.startsWith("{")) return cos;
    } catch { /* retry */ }
    execSync(`sleep ${intent * 3}`);
  }
  throw new Error("httpGet falla");
}

function info(title: string): any | null {
  const url = API + "?action=query&format=json&prop=imageinfo&iiprop=size%7Cextmetadata&titles=" + encodeURIComponent("File:" + title);
  const json: any = JSON.parse(httpGet(url));
  for (const k of Object.keys(json?.query?.pages ?? {})) {
    const p = json.query.pages[k];
    if (p.imageinfo?.[0]) {
      const ii = p.imageinfo[0];
      const md = ii.extmetadata ?? {};
      return { fitxer: title, amplada: ii.width, alcada: ii.height, llicencia: md.LicenseShortName?.value ?? "Vegeu Commons", autor_foto: (md.Artist?.value ?? "").replace(/<[^>]*>/g, "").trim() };
    }
  }
  return null;
}

function search(q: string): string[] {
  const url = API + "?action=query&format=json&list=search&srnamespace=6&srlimit=15&srsearch=" + encodeURIComponent(q);
  const json: any = JSON.parse(httpGet(url));
  return (json?.query?.search ?? []).map((s: any) => s.title.replace(/^File:/, ""));
}

const DIRECTES: Record<string, string[]> = {
  "hercules-anteu": ["Ercole e Anteo, pollaiuolo, 01.jpg", "Ercole e Anteo (Firenze).jpg", "Antonio del Pollaiolo, Ercole e Anteo, bargello.jpg", "Pollaiolo, ercole e anteo, 1475 ca., 01.jpg", "Hercules and Antaeus, Bargello.jpg"],
};

const CERQUES: Record<string, { q: string; exclou?: string[] }> = {
  "perseu-cellini": { q: "Perseo con la testa di Medusa Cellini", exclou: ["pdf", "detail", "testa"] },
  "descens-creu": { q: "descendimiento Rogier van der Weyden Prado table", exclou: ["detail", "estudio"] },
  "sant-andreu-mantua": { q: "Sant'Andrea Mantova facciata", exclou: ["pdf"] },
};

async function main() {
  const fs = await import("fs");
  const ruta = "/home/z/my-project/src/data/imatges.json";
  const dades = JSON.parse(fs.readFileSync(ruta, "utf8"));

  for (const [slug, cands] of Object.entries(DIRECTES)) {
    for (const f of cands) {
      const r = info(f);
      if (r) { dades[slug] = r; console.log("OK " + slug + " → " + f + " (" + r.amplada + "×" + r.alcada + ")"); break; }
    }
  }

  for (const [slug, c] of Object.entries(CERQUES)) {
    const res = search(c.q);
    console.log("[" + slug + "] " + res.slice(0, 12).join(" | "));
    let millor: any = null;
    for (const f of res) {
      const baix = f.toLowerCase();
      if (c.exclou?.some(e => baix.includes(e))) continue;
      if (!/\.(jpg|jpeg|png)$/i.test(f)) continue;
      const r = info(f);
      if (r && r.amplada >= 1200) { millor = r; break; }
    }
    if (millor) { dades[slug] = millor; console.log("OK " + slug + " → " + millor.fitxer + " (" + millor.amplada + "×" + millor.alcada + ")"); }
  }

  fs.writeFileSync(ruta, JSON.stringify(dades, null, 2));
}
main().catch(e => { console.error(e); process.exit(1); });
