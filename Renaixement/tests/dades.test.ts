// dades.test.ts — Integritat editorial del corpus:
//  · anotacions: coordenades 0-1, pregunta d'observació present, nivell vàlid, IDs únics per obra
//  · comparacions: tots els slugs existeixen, 5 presets amb pregunta comparativa
//  · fonts: bibliografia per als autors principals, fonts de tradició marcades
//  · manifest: entrada per a cada obra del corpus d'imatges
// Execució: bun tests/dades.test.ts
import fs from "node:fs";
import path from "node:path";

const ARREL = path.resolve(import.meta.dirname, "..");
let comprovacions = 0;
const errors: string[] = [];
const ok = (cond: boolean, missatge: string) => {
  comprovacions++;
  if (!cond) errors.push(missatge);
};

// ── Anotacions (estructura del fitxer TS: un bloc per obra) ──
const anotacionsPilot = ["anotacions-pilot.ts", "anotacions-arquitectura.ts"]
  .map((f) => fs.readFileSync(path.join(ARREL, "src/data", f), "utf8"))
  .join("\n")
  .replace(/\r\n/g, "\n"); // checkouts de Windows amb CRLF
// Blocs per obra: després de cada clau "slug": [ fins a la següent clau o final.
const claus = [...anotacionsPilot.matchAll(/\n\s{2}"?([a-z0-9-]+)"?:\s\[\n/g)];
const blocsObra: { slug: string; cos: string }[] = [];
for (let i = 0; i < claus.length; i++) {
  const inici = (claus[i].index ?? 0) + claus[i][0].length;
  const fi = i + 1 < claus.length ? (claus[i + 1].index ?? anotacionsPilot.length) : anotacionsPilot.length;
  blocsObra.push({ slug: claus[i][1], cos: anotacionsPilot.slice(inici, fi) });
}
let totalAnots = 0;
const idsDuplicats: string[] = [];
let ambPregunta = 0;
const coordFora: string[] = [];
const nivellsTots: string[] = [];
const capesTotes: string[] = [];
for (const { slug, cos } of blocsObra) {
  const ids = [...cos.matchAll(/id:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
  totalAnots += ids.length;
  for (const id of ids) {
    if (ids.filter((x) => x === id).length > 1 && !idsDuplicats.includes(id)) idsDuplicats.push(`${slug}/${id}`);
  }
  ambPregunta += [...cos.matchAll(/\bpregunta:\s*"/g)].length;
  for (const m of cos.matchAll(/(x|y|amplada|alcada):\s*(-?[\d.]+)/g)) {
    const v = Number(m[2]);
    if (Number.isNaN(v) || v < -0.01 || v > 1.01) coordFora.push(`${slug}/${m[1]}=${m[2]}`);
  }
  for (const m of cos.matchAll(/nivell:\s*"([a-z]+)"/g)) nivellsTots.push(m[1]);
  for (const m of cos.matchAll(/capa:\s*"([a-z]+)"/g)) capesTotes.push(m[1]);
}
ok(blocsObra.length >= 8, `Hauria d'haver ≥8 obres anotades (són ${blocsObra.length})`);
ok(totalAnots >= 60, `Les anotacions pilot haurien de ser ≥60 (són ${totalAnots})`);
ok(idsDuplicats.length === 0, `IDs d'anotació duplicats dins d'una obra: ${idsDuplicats.join(", ")}`);
ok(ambPregunta === totalAnots, `Tota anotació hauria de tenir pregunta: ${ambPregunta}/${totalAnots}`);
ok(coordFora.length === 0, `Coordenades fora de rang 0-1: ${coordFora.slice(0, 8).join(", ")}`);
ok(nivellsTots.every((n) => ["basico", "intermedi", "avancat"].includes(n)), "Hi ha nivells de lectura desconeguts a les anotacions");
const CAPES_VALIDES = ["perspectiva", "composicio", "personatges", "simbols", "tecnica", "arquitectura"];
ok(capesTotes.every((c) => CAPES_VALIDES.includes(c)), "Hi ha capes desconegudes a les anotacions");

// ── Comparacions ──
const comparacions = fs.readFileSync(path.join(ARREL, "src/data/comparacions.ts"), "utf8");
const slugsObres = new Set(
  fs
    .readdirSync(path.join(ARREL, "src/data/obres"))
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .flatMap((f) => [...fs.readFileSync(path.join(ARREL, "src/data/obres", f), "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1])),
);
ok(slugsObres.size >= 60, `Corpus d'obres massa petit: ${slugsObres.size}`);
const slugsComparacio = [...comparacions.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
ok(slugsComparacio.length >= 12, `Les comparacions haurien de tenir ≥12 obres (són ${slugsComparacio.length})`);
for (const s of slugsComparacio) ok(slugsObres.has(s), `Comparació amb obra inexistent: ${s}`);
const presets = [...comparacions.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
ok(presets.length === 5, `Hauria d'haver 5 comparacions preconfigurades (són ${presets.length})`);
ok([...comparacions.matchAll(/\bpregunta:\s*"/g)].length === 5, "Cada comparació ha de tenir pregunta comparativa");
// Els conceptes referenciats han d'existir
const slugsConceptes = new Set(
  [...fs.readFileSync(path.join(ARREL, "src/data/conceptes.ts"), "utf8").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]),
);
for (const c of [...comparacions.matchAll(/concepte:\s*"([a-z0-9-]+)"/g)].map((m) => m[1])) {
  ok(slugsConceptes.has(c), `Comparació amb concepte inexistent: ${c}`);
}

// ── Fonts ──
const fonts = fs.readFileSync(path.join(ARREL, "src/data/fonts.ts"), "utf8");
for (const autor of ["masaccio", "leonardo", "rafael", "miquel-angel", "donatello", "van-eyck", "bruegel", "durer", "titia", "brunelleschi", "alberti", "el-greco"]) {
  ok(new RegExp(`"?${autor}"?:`).test(fonts), `fonts.ts no té bibliografia per a ${autor}`);
}
ok(fonts.includes("font-tradicional"), "fonts.ts ha de marcar les fonts de tradició (Vasari, Condivi, Cellini)");
ok((fonts.match(/nota:/g) ?? []).length >= 3, "Les fonts de tradició han de portar nota de contrast");

// ── Manifest vs corpus ──
const manifest = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges-locals.json"), "utf8"));
const corpus = JSON.parse(fs.readFileSync(path.join(ARREL, "src/data/imatges.json"), "utf8"));
for (const slug of Object.keys(corpus)) ok(slug in manifest, `Manifest sense entrada per a ${slug}`);

// ── Model temporal explícit (auditoria de cronologia) ──
const esdeveniments = fs.readFileSync(path.join(ARREL, "src/data/esdeveniments.ts"), "utf8");
const artistesSrc = fs.readFileSync(path.join(ARREL, "src/data/artistes.ts"), "utf8");

// L'entrada falsa del 1541 («Mort de Carles I...» amb descripció que començava per «No:»)
// i les mutacions posteriors han d'haver desaparegut: una única entrada correcta.
ok(!/anyInici: 1541[\s\S]{0,300}?Mort de Carles/.test(esdeveniments), "esdeveniments.ts encara té l'entrada falsa del 1541");
ok(!/descripcio: "No:/.test(esdeveniments), "esdeveniments.ts té descripcions que corregixen altres entrades (patró de mutació)");
ok(!/ESDEVENIMENTS\.find\([^)]*\)!?\./.test(esdeveniments), "esdeveniments.ts encara muta entrades després de la declaració");
const entrada1541 = esdeveniments.match(/anyInici: 1541,[\s\S]{0,600}?titol: "([^"]+)"/);
ok(Boolean(entrada1541), "Falta l'entrada del 1541");
ok(/Judici Final/.test(entrada1541?.[1] ?? ""), `L'entrada del 1541 no és el desvelament del Judici Final («${entrada1541?.[1]}»)`);

// Cada esdeveniment té precisió, font i territori; n'hi ha de prioritàries per al panorama
const blocsEvents = esdeveniments.match(/anyInici: [\s\S]{0,700}?\n  \},/g) ?? [];
for (const bloc of blocsEvents) {
  const tit = bloc.match(/titol: "([^"]+)"/)?.[1] ?? "?";
  ok(bloc.includes("precisioData:"), `Esdeveniment sense precisioData: ${tit}`);
  ok(bloc.includes("fontData:"), `Esdeveniment sense fontData: ${tit}`);
  ok(bloc.includes("territori:"), `Esdeveniment sense territori: ${tit}`);
}
const prioritats = (esdeveniments.match(/prioritatPanorama: true/g) ?? []).length;
ok(prioritats >= 12 && prioritats <= 18, `Vista panorama: ${prioritats} fites prioritàries (hi caben 12-18)`);

// Vistes preparades i recorreguts didàctics
ok((esdeveniments.match(/VISTES_PREPARADES[\s\S]*?\];/) ?? [""])[0].includes("Panorama general"), "Falta la vista «Panorama general»");
ok((esdeveniments.match(/RECORREGUTS[\s\S]*?\];/) ?? [""])[0].includes("roma-1508-1512"), "Falta el recorregut «Roma 1508-1512»");
ok((esdeveniments.match(/RECORREGUTS[\s\S]*?\];/) ?? [""])[0].includes("flandes-italia-xv"), "Falta el recorregut «Flandes i Itàlia al segle XV»");

// Artistes: activitat documentada explícita, mai calculada amb «naixement + 20»
const nActivitat = (artistesSrc.match(/activitatInici:/g) ?? []).length;
const nEstat = (artistesSrc.match(/estatDocumentacio:/g) ?? []).length;
ok(nActivitat >= 30, `Només ${nActivitat} artistes amb activitatInici (n'hi ha 33)`);
ok(nEstat >= 30, `Només ${nEstat} artistes amb estatDocumentacio`);
ok(!/naixement \+ 20/.test(artistesSrc), "Càlcul de «naixement + 20» detectat");
// Llengua: formes errades que l'auditoria va detectar
ok(!esdeveniments.includes("el esdeveniment"), "Errada de llengua «el esdeveniment»");
ok(!/tipus: "fita"[\s\S]{0,50}el esdeveniment/.test(esdeveniments), "Errada de llengua a esdeveniments.ts");

// ── Crèdits fotogràfics: l'autor de la foto no pot ser l'artista de l'obra ──
// (Commons posa l'artista al camp «Artist» de les reproduccions de domini públic)
const { OBRES } = await import("../src/data/obres/index.ts");
const normalitza = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const ALIES: Record<string, string[]> = {
  titia: ["titian", "tiziano"], rafael: ["raphael", "raffaello"], "miquel-angel": ["michelangelo"],
  "el-bosch": ["bosch"], bruegel: ["brueghel"],
};
for (const o of OBRES) {
  const foto = normalitza(corpus[o.slug]?.autor_foto ?? "");
  if (!foto) continue;
  const noms = normalitza(o.autorNom).split(/[\s,()]+/).filter((w: string) => w.length > 3);
  const coincideix = noms.some((w: string) => foto.includes(w)) || (ALIES[o.autorSlug] ?? []).some((w) => foto.includes(w));
  ok(!coincideix && !foto.includes("unknown"), `Crèdit fotogràfic erroni a ${o.slug}: «${corpus[o.slug].autor_foto}»`);
}
// Totes les obres d'arquitectura tenen almenys un concepte vinculat i anotacions
const arquitectura = OBRES.filter((o: { disciplina: string }) => o.disciplina === "arquitectura");
for (const o of arquitectura) {
  ok(o.concepts.length > 0, `Obra d'arquitectura sense concepte: ${o.slug}`);
  for (const c of o.concepts) ok(slugsConceptes.has(c), `Concepte inexistent a ${o.slug}: ${c}`);
  ok(blocsObra.some((b) => b.slug === o.slug), `Obra d'arquitectura sense anotacions: ${o.slug}`);
}

console.log(`dades.test.ts: ${comprovacions} comprovacions · ${errors.length} errors`);
if (errors.length) {
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}
console.log("  ✓ Dades, anotacions, comparacions i fonts coherents.");
