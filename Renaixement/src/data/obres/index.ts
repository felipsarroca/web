// obres/index.ts — Fusió i índexs del corpus de 68 obres (cap. 6 de la programació)
import type { Obra, Disciplina, Periode, Ambit } from "../types";
import { PINTURA_ITALIA_1 } from "./pintura-italia-1";
import { PINTURA_ITALIA_2 } from "./pintura-italia-2";
import { PINTURA_NORD } from "./pintura-nord";
import { ESCULTURA } from "./escultura";
import { ARQUITECTURA } from "./arquitectura";

export const OBRES: Obra[] = [
  ...PINTURA_ITALIA_1,
  ...PINTURA_ITALIA_2,
  ...PINTURA_NORD,
  ...ESCULTURA,
  ...ARQUITECTURA,
];

export const OBRAS_PER_SLUG: Record<string, Obra> = Object.fromEntries(
  OBRES.map((o) => [o.slug, o]),
);

export function obra(slug: string): Obra | undefined {
  return OBRAS_PER_SLUG[slug];
}

/** Obres ordenades per any d'inici (per a graelles i cronologia). */
export const OBRES_CRONO: Obra[] = [...OBRES].sort((a, b) => a.anyInici - b.anyInici || a.anyFi - b.anyFi);

/** Obres d'un artista, ordenades cronològicament. */
export function obresArtista(autorSlug: string): Obra[] {
  return OBRES_CRONO.filter((o) => o.autorSlug === autorSlug);
}

/** Obres que exemplifiquen un concepte. */
export function obresConcepte(concepteSlug: string): Obra[] {
  return OBRES_CRONO.filter((o) => o.concepts.includes(concepteSlug));
}

/** Obres d'una escola arquitectònica. */
export function obresEscola(escola: string): Obra[] {
  return OBRES_CRONO.filter((o) => o.escola === escola);
}

/** Filtre combinable (la taxonomia de 6 dimensions del cap. 3.2). */
export interface FiltresObres {
  text: string;
  disciplina: Disciplina | null;
  periode: Periode | null;
  ambit: Ambit | null;
  artista: string | null;
  concepte: string | null;
  escola: string | null;
}

/** Normalitza text per a la cerca: minúscules i sense diacrítics (audit P1 cerca). */
export function normalitza(t: string): string {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filtraObres(f: FiltresObres): Obra[] {
  const tokens = normalitza(f.text.trim()).split(/\s+/).filter(Boolean);
  return OBRES_CRONO.filter((o) => {
    if (f.disciplina && o.disciplina !== f.disciplina) return false;
    if (f.periode && o.periode !== f.periode) return false;
    if (f.ambit && o.ambit !== f.ambit) return false;
    if (f.artista && o.autorSlug !== f.artista) return false;
    if (f.concepte && !o.concepts.includes(f.concepte)) return false;
    if (f.escola && o.escola !== f.escola) return false;
    if (tokens.length > 0) {
      const hay = normalitza(
        [
          o.titol,
          o.titolOriginal ?? "",
          o.autorNom,
          o.data,
          o.tecnica,
          o.ubicacio.museu,
          o.ubicacio.ciutat,
          o.ubicacio.pais,
        ].join(" "),
      );
      // Tots els tokens han de coincidir ( tolerant amb accents i variants)
      if (!tokens.every((t) => hay.includes(t))) return false;
    }
    return true;
  });
}

/** Obres destacades per a la portada (rotació per setmana, cap. 7.3). */
export function obraDestacada(): Obra {
  const fita = OBRES.filter((o) => o.obraFita);
  const setmana = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return fita[setmana % fita.length];
}

export function obraPerDescobrir(): Obra {
  const dia = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  return OBRES[dia % OBRES.length];
}

/** Slugs d'artista que tenen fitxa pròpia (caps. 5.8 i 6). */
export const AUTORS_AMB_FITXA = new Set(
  OBRES.map((o) => o.autorSlug).filter(Boolean),
);
