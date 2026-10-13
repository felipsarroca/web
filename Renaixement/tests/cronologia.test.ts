import assert from "node:assert/strict";
import { ARTISTES } from "../src/data/artistes";
import { OBRES_CRONO } from "../src/data/obres";
import { dadesCronologia, intervalArtista, posicioInterval } from "../src/lib/renaissance/cronologia";

const tot = dadesCronologia({});
assert.equal(tot.files.filter((f) => f.artista).length, ARTISTES.length, "Cap límit arbitrari d'artistes al panorama");
assert.equal(new Set(tot.files.flatMap((f) => f.obres.map((o) => o.slug))).size, OBRES_CRONO.length, "Totes les obres tenen una fila");
assert.ok(tot.files.some((f) => f.slug === "leonardo"), "Leonardo visible al panorama");
assert.ok(tot.files.every((f, i, rows) => i === 0 || rows[i - 1].inici <= f.inici), "Ordre cronològic, no ordre del catàleg");
assert.deepEqual(dadesCronologia({ artistes: "leonardo" }).interval, [1470, 1520], "Eix ajustat a l'artista per aprofitar l'espai");
assert.deepEqual(dadesCronologia({ artistes: "leonardo,miquel-angel" }).interval, [1470, 1570], "L'activitat no s'allarga per projectes continuats per successors");
for (const periode of ["quattrocento", "cinquecento"]) {
  const d = dadesCronologia({ periode, artistes: "leonardo", disciplina: "pintura" });
  assert.deepEqual(d.files.map((f) => f.slug), ["leonardo"], "Artista que travessa el 1500");
  assert.ok(d.obres.length > 0);
  assert.ok(d.obres.every((o) => o.autorSlug === "leonardo" && o.disciplina === "pintura" && o.anyFi >= d.interval[0] && o.anyInici <= d.interval[1]));
}
assert.equal(dadesCronologia({ artistes: "leonardo", disciplina: "escultura" }).files.length, 0, "Els filtres s'intersequen");
const escultura = dadesCronologia({ artistes: "miquel-angel,donatello", disciplina: "escultura" });
assert.ok(escultura.obres.length > 0);
assert.ok(escultura.obres.every((o) => o.disciplina === "escultura" && ["miquel-angel", "donatello"].includes(o.autorSlug)));
assert.equal(dadesCronologia({ artistes: ARTISTES.slice(0, 5).map((a) => a.slug).join(",") }).files.length, 5, "Comparació sense límit de tres artistes");
assert.ok(dadesCronologia({ ambit: "no-italia" }).files.every((f) => !f.artista || f.artista.ambitFiltro !== "italia"));
assert.deepEqual(dadesCronologia({ vista: "recorregut-roma" }).interval, [1503, 1519]);
assert.deepEqual(posicioInterval(1377, 1446, [1400, 1500]), { left: "0%", width: "46%" });
const a = ARTISTES[0];
assert.deepEqual(intervalArtista({ ...a, activitatInici: undefined, activitatFi: undefined, dates: "1377-1446" }), { inici: 1377, fi: 1446, tipus: "vida" }, "No inventar activitat a partir del naixement");
console.log(`cronologia.test.ts: filtres combinats, ordre, períodes i cobertura de ${ARTISTES.length} artistes / ${OBRES_CRONO.length} obres · 0 errors`);
