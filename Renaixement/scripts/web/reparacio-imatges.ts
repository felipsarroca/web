// reparacio-imatges.ts — Reintenta els 7 slugs fallits amb candidats alternatius.
"use strict";

const API = "https://commons.wikimedia.org/w/api.php";
let darreraPeticio = 0;

function httpGet(url: string): string {
  const { execSync } = require("child_process");
  let ultimError = "";
  for (let intent = 1; intent <= 5; intent++) {
    try {
      const ara = Date.now();
      if (ara - darreraPeticio < 2500) execSync(`sleep ${Math.ceil((2500 - (ara - darreraPeticio)) / 1000)}`);
      darreraPeticio = Date.now();
      const sortida = execSync(
        `curl -s -w "\\n__HTTP__%{http_code}" --max-time 30 -A "RenaixementWeb/1.0 (educational project)" ${JSON.stringify(url)}`,
        { maxBuffer: 20 * 1024 * 1024 },
      ).toString();
      darreraPeticio = Date.now();
      const marca = sortida.lastIndexOf("\n__HTTP__");
      const codi = sortida.slice(marca + 9).trim();
      const cos = sortida.slice(0, marca);
      if (codi === "200" && cos.startsWith("{")) return cos;
      ultimError = "HTTP " + codi;
    } catch (e: any) {
      ultimError = String(e?.message ?? e).slice(0, 120);
    }
    execSync(`sleep ${intent * 3}`);
  }
  throw new Error("httpGet falla: " + ultimError);
}

function queryInfo(title: string): any | null {
  const url = API + "?action=query&format=json&prop=imageinfo&iiprop=size%7Cextmetadata&titles=" +
    encodeURIComponent("File:" + title);
  const json: any = JSON.parse(httpGet(url));
  const pages = json?.query?.pages ?? {};
  for (const k of Object.keys(pages)) {
    const p = pages[k];
    if (p.imageinfo && p.imageinfo[0]) {
      const ii = p.imageinfo[0];
      const md = ii.extmetadata ?? {};
      return {
        fitxer: title,
        amplada: ii.width,
        alcada: ii.height,
        llicencia: md.LicenseShortName?.value ?? "Vegeu Commons",
        autor_foto: (md.Artist?.value ?? "").replace(/<[^>]*>/g, "").trim(),
      };
    }
  }
  return null;
}

function search(q: string): string[] {
  const url = API + "?action=query&format=json&list=search&srnamespace=6&srlimit=12&srsearch=" + encodeURIComponent(q);
  const json: any = JSON.parse(httpGet(url));
  return (json?.query?.search ?? []).map((s: any) => s.title.replace(/^File:/, ""));
}

const PENDENTS: Record<string, { fitxers: string[]; cerques: string[] }> = {
  "judici-final": {
    fitxers: ["Michelangelo, giudizio universale.jpg", "Giudizio Universale (Michelangelo).jpg", "Last Judgment (Michelangelo).jpg", "Michelangelo Buonarroti - Last Judgment (detail).jpg"],
    cerques: ["Michelangelo Last Judgment Sistine fresco", "Giudizio universale Michelangelo Cappella Sistina"],
  },
  "descens-creu": {
    fitxers: ["Rogier van der Weyden - The Descent from the Cross - Google Art Project.jpg", "El descendimiento, por Rogier van der Weyden.jpg", "Rogier van der Weyden 008.jpg", "The Descent from the Cross (Van der Weyden).jpg"],
    cerques: ["Rogier van der Weyden Descent from the Cross Prado", "Weyden descendimiento cruz"],
  },
  "david-bronze-donatello": {
    fitxers: ["David by Donatello.jpg", "Donatello David Bronze.jpg", "David di Donatello (bronzo).jpg", "Donatello, david, 1440 circa 02.jpg", "'David' by Donatello JBU0001.JPG"],
    cerques: ["Donatello David bronze Bargello bronze statue", "David de Donatello Bargello bronce"],
  },
  "perseu-cellini": {
    fitxers: ["Perseo con la testa di Medusa, benvenuto cellini, loggia dei lanzi, 1545-53, 01.jpg", "Cellini's Perseus.jpg", "Perseus with the Head of Medusa (Cellini).jpg", "Perseo Cellini.jpg"],
    cerques: ["Cellini Perseus Medusa Loggia Lanzi statue", "Perseo Cellini Firenze"],
  },
  "bacus": {
    fitxers: ["Bacco (Michelangelo).jpg", "Bacchus Michelangelo.jpg", "Michelangelo, bacco, 1496-97, 01.jpg", "Baccus Michelangelo.jpg"],
    cerques: ["Michelangelo Bacchus Bargello sculpture marble", "Bacco Michelangelo Bargello"],
  },
  "hercules-anteu": {
    fitxers: ["Ercole e Anteo (Pollaiolo).jpg", "Hercules and Antaeus (Pollaiuolo).jpg", "Antonio del Pollaiuolo - Hercules and Antaeus - WGA18043.jpg", "Ercole e Anteo, Antonio del Pollaiolo.jpg"],
    cerques: ["Pollaiuolo Hercules Antaeus bronze Bargello", "Ercole e Anteo Pollaiolo Bargello"],
  },
  "sant-andreu-mantua": {
    fitxers: ["Sant'Andrea (Mantua).jpg", "Mantua, Sant'Andrea.jpg", "Facciata di Sant'Andrea (Mantova).jpg", "Sant'Andrea, Mantova, facciata.jpg"],
    cerques: ["Sant'Andrea Mantova facciata Leon Battista Alberti", "Sant Andrea Mantua church facade"],
  },
};

async function main() {
  const fs = await import("fs");
  const ruta = "/home/z/my-project/src/data/imatges.json";
  const actual = JSON.parse(fs.readFileSync(ruta, "utf8"));

  for (const [slug, c] of Object.entries(PENDENTS)) {
    let trobat: any = null;
    for (const f of c.fitxers) {
      try {
        const r = queryInfo(f);
        if (r) { trobat = r; break; }
      } catch (e) { console.log("  (err " + f + ")"); }
    }
    if (!trobat) {
      for (const q of c.cerques) {
        try {
          const candidats = search(q);
          console.log("[" + slug + "] cerca «" + q + "»: " + candidats.slice(0, 5).join(" | "));
          for (const f of candidats) {
            if (/\.(jpg|jpeg|png)$/i.test(f)) {
              const r = queryInfo(f);
              if (r) { trobat = r; break; }
            }
          }
          if (trobat) break;
        } catch (e) { console.log("  (err cerca: " + q + ")"); }
      }
    }
    if (trobat) {
      actual[slug] = trobat;
      console.log("OK   " + slug + " → " + trobat.fitxer + " (" + trobat.amplada + "×" + trobat.alcada + ")");
    } else {
      console.log("FAIL " + slug);
    }
  }

  fs.writeFileSync(ruta, JSON.stringify(actual, null, 2));
  console.log("Total: " + Object.keys(actual).length + "/68");
}

main().catch(e => { console.error(e); process.exit(1); });
