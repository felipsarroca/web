// osd.ts — Carregador LAZY d'OpenSeadragon (client-only).
// El mòdul d'OpenSeadragon toca `document` a l'avaluació del mòdul; una
// importació estàtica des d'un component «use client» explota en pre-render
// SSR amb «ReferenceError: document is not defined» (error 500 a la vista).
// Aquest carregador importa el mòdul NOMÉS dins del navegador i el posa en memòria cau.

type OSD = typeof import("openseadragon");

let cache: OSD | null = null;

/** Importa OpenSeadragon només al client (mai durant el SSR). */
export async function carregaOSD(): Promise<OSD> {
  if (cache) return cache;
  const mod = await import("openseadragon");
  // Amb «export =» + esModuleInterop, la forma .default depèn del bundler.
  const m = mod as unknown as OSD & { default?: OSD };
  cache = (m.default ?? m) as OSD;
  return cache;
}

/** Tipus de l'espai de noms d'OpenSeadragon (per a props). */
export type OSDNamespace = OSD;
