// imatges.ts — Servei d'imatges LOCALS amb crèdits de Commons com a font.
// Audit P0-1: res d'URLs remotes en calent; tot es serveix des de /imatges/obres/.
//   - Derivats WebP (480/800/1200/1600 px) per a targetes i fitxes (srcset/sizes)
//   - Piràmides DZI per al visor Deep Zoom (OpenSeadragon)
//   - Estat per obra: "zoom" | "local" | "pendent" (transparència del corpus, P0-4)
import { camiPublic } from "@/lib/renaissance/camins";
import raw from "./imatges.json";
import localsRaw from "./imatges-locals.json";
import lqipRaw from "./imatges-lqip.json";
import type { ImatgeObra } from "./types";

export const IMATGES: Record<string, ImatgeObra> = raw as Record<string, ImatgeObra>;

interface ImatgeLocal {
  amplada: number;
  alcada: number;
  amplades: number[];
  tiles: boolean;
  /** Procedència de la còpia digital: "commons" (descàrrega directa) o "cerca-web". */
  copia?: string;
  /** Versió de l'actiu per evitar que el navegador mostri una imatge substituïda. */
  versio?: string;
}

// El manifest té claus "_..." de documentació: es filtren.
export const LOCALS: Record<string, ImatgeLocal> = Object.fromEntries(
  Object.entries(localsRaw as Record<string, unknown>).filter(([k]) => !k.startsWith("_")),
) as Record<string, ImatgeLocal>;

const BASE = camiPublic("/imatges/obres");

function versionaUrl(url: string, slug: string): string {
  const versio = LOCALS[slug]?.versio;
  return versio ? `${url}?v=${encodeURIComponent(versio)}` : url;
}

/** Estat honest de la imatge d'una obra (P0-4: no anunciar "alta resolució" uniforme). */
export function estatImatge(slug: string): "zoom" | "local" | "pendent" {
  const l = LOCALS[slug];
  if (!l) return "pendent";
  return l.tiles ? "zoom" : "local";
}

/** Nivell de zoom per RESOLUCIÓ EFECTIVA del màster (auditoria d'imatges):
 *  un .dzi fet a partir de 960 px és navegable per tiles, però no revela detalls
 *  que el fitxer original no conté. La UI etiqueta segons aquesta mida. */
export type NivellZoom = "alt" | "mitja" | "baix";
export function nivellZoom(slug: string): NivellZoom {
  const l = LOCALS[slug];
  if (!l || !l.tiles) return "baix";
  if (l.amplada >= 1600) return "alt";
  if (l.amplada >= 960) return "mitja";
  return "baix";
}

/** Hi ha piràmide Deep Zoom per a aquesta obra? */
export function zoomDisponible(slug: string): boolean {
  return Boolean(LOCALS[slug]?.tiles);
}

/** URL del document DZI del visor. */
export function urlDzi(slug: string): string {
  return versionaUrl(`${BASE}/${slug}.dzi`, slug);
}

/** Màster local (JPG) per al fallback del visor quan no hi ha piràmide. */
export function urlMaster(slug: string): string {
  return versionaUrl(`${BASE}/${slug}-master.jpg`, slug);
}

/** Derivat WebP més proper a l'amplada demanada (mai superior, excepte si no queda remei). */
export function urlImatge(slug: string, amplada: number): string {
  const l = LOCALS[slug];
  if (!l || l.amplades.length === 0) return "";
  const candidata = [...l.amplades].reverse().find((w) => w <= amplada) ?? l.amplades[0];
  return versionaUrl(`${BASE}/${slug}/w${candidata}.webp`, slug);
}

/** Miniatura minúscula en base64 (scripts/genera-lqip.mjs) per mostrar mentre carrega. */
const LQIP: Record<string, string> = lqipRaw as Record<string, string>;
export function lqipImatge(slug: string): string | undefined {
  return LQIP[slug];
}

/** String srcset amb tots els derivats disponibles. */
export function srcsetImatge(slug: string): string {
  const l = LOCALS[slug];
  if (!l) return "";
  return l.amplades.map((w) => `${versionaUrl(`${BASE}/${slug}/w${w}.webp`, slug)} ${w}w`).join(", ");
}

/** Proporció amplada/alcada de l'original (per reservar espai i evitar salts de layout). */
export function proporció(slug: string): number {
  const im = IMATGES[slug];
  if (!im || !im.amplada || !im.alcada) return 1;
  return im.amplada / im.alcada;
}

/** Procedència de la còpia digital servida (honestetat editorial). */
export function fontCopia(slug: string): "commons" | "cerca-web" {
  return LOCALS[slug]?.copia === "cerca-web" ? "cerca-web" : "commons";
}

/** Crèdit complet i específic de la imatge (audit: res de frases genèriques). */
export function credit(slug: string): string {
  const im = IMATGES[slug];
  if (!im) return "Imatge no disponible";
  const foto = im.autor_foto ? `Fotografia: ${im.autor_foto}. ` : "";
  const base = `Reproducció digital: Wikimedia Commons (${im.fitxer}). ${foto}Llicència: ${im.llicencia}.`;
  if (fontCopia(slug) === "cerca-web") {
    return (
      base +
      " Còpia servida localment obtinguda de font web pública i verificada com a obra de domini públic; contrasteu el fitxer de referència a Commons per al crèdit fotogràfic exacte."
    );
  }
  return base;
}

/** L'obra és de domini públic? (l'obra sempre; la foto pot tenir llicència pròpia) */
export function dominiPublic(slug: string): boolean {
  return IMATGES[slug]?.llicencia.toLowerCase().includes("public domain") ?? false;
}

/** URL del fitxer original a Commons (font i crèdit, no càrrega en calent). */
export function urlFitxer(slug: string): string {
  const im = IMATGES[slug];
  if (!im) return "";
  return "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(im.fitxer.replace(/ /g, "_"));
}

/** Recomptes reals del corpus (P0-4: mai xifres escrites a mà). */
export const COMPTES = {
  obres: Object.keys(IMATGES).length,
  ambZoom: Object.keys(LOCALS).filter((k) => LOCALS[k]?.tiles).length,
  ambImatge: Object.keys(LOCALS).length,
};
