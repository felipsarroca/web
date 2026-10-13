// utils.ts — Ajudants de presentació
import { ETIQUETES } from "@/data/types";
import type { Obra } from "@/data/types";
import { obra as obraPerSlug } from "@/data/obres";
import { artista } from "@/data/artistes";
import { GLOSSARI } from "@/data/glossari";

export function etiqueta(dimensio: string, valor: string): string {
  return ETIQUETES[dimensio]?.[valor] ?? valor;
}

/** «Galeria dels Uffizi, Florència (Itàlia)» */
export function textUbicacio(o: Obra): string {
  return `${o.ubicacio.museu}, ${o.ubicacio.ciutat} (${o.ubicacio.pais})`;
}

/** Autor: amb enllaç si té fitxa, text pla si no (autors de Fase 2 / anònims). */
export function autorTeFitxa(o: Obra): boolean {
  return o.autorSlug !== "anonim" && Boolean(artista(o.autorSlug));
}

/** Divisió del text en paràgrafs (doble salt de línia). */
export function paragrafs(t: string): string[] {
  return t.split("\n").filter(Boolean);
}

/** Mapa de termes del glossari per a la detecció de termes vius. */
export const TERMES_MAP = new Map(GLOSSARI.map((g) => [g.terme.toLowerCase(), g]));

/** Itera un text i detecta termes del glossari (només primer aparegut de cada terme). */
export function segmentaTermes(text: string): { tipus: "text" | "terme"; valor: string; terme?: string }[] {
  const trobats: { index: number; terme: string }[] = [];
  for (const [terme] of TERMES_MAP) {
    const re = new RegExp(`(?<![\\p{L}])${terme.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}])`, "iu");
    const m = re.exec(text);
    if (m) trobats.push({ index: m.index, terme: m[0] });
  }
  trobats.sort((a, b) => a.index - b.index);
  // descartar solapaments
  const nets = trobats.filter((t, i) => {
    const prev = trobats[i - 1];
    return !prev || prev.index + prev.terme.length <= t.index;
  });
  const segments: { tipus: "text" | "terme"; valor: string; terme?: string }[] = [];
  let cursor = 0;
  for (const t of nets) {
    if (t.index > cursor) segments.push({ tipus: "text", valor: text.slice(cursor, t.index) });
    segments.push({ tipus: "terme", valor: t.terme, terme: TERMES_MAP.get(t.terme.toLowerCase())!.terme });
    cursor = t.index + t.terme.length;
  }
  if (cursor < text.length) segments.push({ tipus: "text", valor: text.slice(cursor) });
  return segments;
}

/** URL del museu genèrica per als casos sense URL explícita. */
export function urlMuseu(o: Obra): string | undefined {
  return o.ubicacio.url;
}

export function obraExisteix(slug: string): boolean {
  return Boolean(obraPerSlug(slug));
}
