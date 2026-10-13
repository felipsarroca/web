import { ARTISTES } from "@/data/artistes";
import { OBRES_CRONO } from "@/data/obres";
import { ESDEVENIMENTS, RECORREGUTS, VISTES_PREPARADES } from "@/data/esdeveniments";
import type { Artista, Disciplina, Obra } from "@/data/types";
import type { FiltresURL } from "./store";

export const EPOQUES = {
  quattrocento: { nom: "Quattrocento · segle XV", interval: [1400, 1500] },
  cinquecento: { nom: "Cinquecento · segle XVI", interval: [1500, 1600] },
} as const;
export interface FilaCronologia {
  slug: string; nom: string; artista?: Artista;
  inici: number; fi: number; tipus: "activitat" | "vida" | "obres"; obres: Obra[];
}
export function intervalArtista(a: Artista): Pick<FilaCronologia, "inici" | "fi" | "tipus"> {
  const vida = a.dates.match(/\d{4}/g)?.map(Number) ?? [];
  if (a.activitatInici !== undefined && a.activitatFi !== undefined) {
    return { inici: a.activitatInici, fi: a.activitatFi, tipus: a.estatDocumentacio === "vida_documentada" ? "vida" : "activitat" };
  }
  return { inici: vida[0] ?? 1400, fi: vida[1] ?? vida[0] ?? 1620, tipus: "vida" };
}
const coincideixDisciplina = (a: Artista, d: Disciplina) =>
  a.ambits.some((x) => x.startsWith({ pintura: "pint", escultura: "escult", arquitectura: "arquitect" }[d]));

/** Finestres temporals, no etiquetes excloents: un artista pot travessar el 1500. */
export function dadesCronologia(f: FiltresURL) {
  const vista = [...VISTES_PREPARADES, ...RECORREGUTS.map((r) => r.vista)].find((v) => v.id === f.vista);
  const epoca = EPOQUES[f.periode as keyof typeof EPOQUES];
  const interval: [number, number] = epoca ? [...epoca.interval] : vista ? [...vista.interval] : [1400, 1620];
  const disciplina = (["pintura", "escultura", "arquitectura"].includes(f.disciplina ?? "") ? f.disciplina : vista?.disciplina) as Disciplina | undefined;
  const territori = f.ambit || vista?.territori || "";
  const seleccionats = (f.artistes || f.artista || "").split(",").filter(Boolean);
  if (!epoca && !vista && seleccionats.length) {
    const dates = ARTISTES.filter((a) => seleccionats.includes(a.slug)).map(intervalArtista);
    const seves = OBRES_CRONO.filter((o) => seleccionats.includes(o.autorSlug));
    if (dates.length || seves.length) {
      interval[0] = Math.max(1400, Math.floor(Math.min(...dates.map((a) => a.inici), ...seves.map((o) => o.anyInici)) / 10) * 10);
      // Els projectes completats per successors no han d'eixamplar l'activitat de l'autor.
      interval[1] = Math.min(1640, Math.ceil(Math.max(...dates.map((a) => a.fi), ...seves.map((o) => o.anyInici)) / 10) * 10);
      if (interval[1] <= interval[0]) interval[1] = interval[0] + 10;
    }
  }
  const solapa = (inici: number, fi: number) => inici <= interval[1] && fi >= interval[0];
  const territoriOK = (t: string) => !territori || (territori === "no-italia" ? t !== "italia" : t === territori);
  const obres = OBRES_CRONO.filter((o) => solapa(o.anyInici, o.anyFi)
    && (!disciplina || o.disciplina === disciplina) && territoriOK(o.ambit)
    && (!seleccionats.length || seleccionats.includes(o.autorSlug)))
    .sort((a, b) => a.anyInici - b.anyInici || a.titol.localeCompare(b.titol, "ca"));
  const files: FilaCronologia[] = ARTISTES.flatMap((a) => {
    const dates = intervalArtista(a);
    const seves = obres.filter((o) => o.autorSlug === a.slug);
    if (!solapa(dates.inici, dates.fi) && !seves.length) return [];
    if (!territoriOK(a.ambitFiltro) || (seleccionats.length && !seleccionats.includes(a.slug))) return [];
    if (disciplina && !coincideixDisciplina(a, disciplina) && !seves.length) return [];
    return [{ slug: a.slug, nom: a.nom, artista: a, ...dates, obres: seves }];
  });
  // Les autories compartides o sense fitxa pròpia també tenen lloc a l'eix.
  for (const o of obres) {
    if (files.some((r) => r.slug === o.autorSlug)) continue;
    const seves = obres.filter((w) => w.autorSlug === o.autorSlug);
    files.push({ slug: o.autorSlug, nom: o.autorNom, inici: Math.min(...seves.map((w) => w.anyInici)), fi: Math.max(...seves.map((w) => w.anyFi)), tipus: "obres", obres: seves });
  }
  files.sort((a, b) => a.inici - b.inici || a.nom.localeCompare(b.nom, "ca"));
  const esdeveniments = ESDEVENIMENTS.filter((e) => solapa(e.anyInici, e.anyFi ?? e.anyInici) && territoriOK(e.territori)).sort((a, b) => a.anyInici - b.anyInici);
  return { files, obres, esdeveniments, interval, vista, disciplina, territori, seleccionats };
}
/** Retalla només la representació: les dates originals es conserven al text. */
export function posicioInterval(inici: number, fi: number, [min, max]: [number, number]) {
  const esquerra = Math.max(min, Math.min(max, inici));
  const dreta = Math.max(esquerra, Math.min(max, fi));
  return { left: `${100 * (esquerra - min) / (max - min)}%`, width: `${100 * (dreta - esquerra) / (max - min)}%` };
}
