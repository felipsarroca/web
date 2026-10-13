// store.ts — Estat global: vista actual (rutes reals via History API), filtres i visor
// Audit P0-3: substitueix el router de hash per URL de camí real (/obres/[slug], …).
// Els hash antics (#/obra/x) es migren automàticament a la ruta nova.
"use client";

import { rutaPublica, sensePrefix } from "./camins";
import { create } from "zustand";
import { descodificaSegment } from "./rutes";

export type Vista =
  | { nom: "home" }
  | { nom: "coleccions" }
  | { nom: "obra"; slug: string }
  | { nom: "cronologia" }
  | { nom: "artistes" }
  | { nom: "artista"; slug: string }
  | { nom: "conceptes" }
  | { nom: "concepte"; slug: string }
  | { nom: "arquitectura" }
  | { nom: "fora" }
  | { nom: "glossari" }
  | { nom: "comparacions" }
  | { nom: "sobre" };

export interface FiltresURL {
  q?: string;
  disciplina?: string;
  periode?: string;
  ambit?: string;
  artista?: string;
  concepte?: string;
  escola?: string;
  c?: string; // id de comparació preconfigurada (?c=perspectiva-lineal)
  vista?: string; // id de vista preparada de cronologia (?vista=panorama)
  desDe?: string; // context d'origen (?desDe=cronologia): la fitxa mostra «Tornar a la cronologia»
  artistes?: string; // slugs separats per comes per al mode «comparar artistes»
}

interface Estat {
  vista: Vista;
  filtres: FiltresURL;
  viewerObra: string | null; // slug de l'obra oberta al visor
  navega: (desti: string) => void; // "obra/x", "conceptes", "/obres", …
  setFiltres: (nous: Partial<FiltresURL>, push?: boolean) => void;
  obreViewer: (slug: string) => void;
  tancaViewer: () => void;
  sincronitzaRuta: () => void;
}

/** Mapa destí intern → ruta real (canònica i compartible). */
export function destiARuta(desti: string): { cami: string; cerca: string } {
  const [cam, query] = desti.split("?");
  const cerca = query ? "?" + query : "";
  const cami = cam.replace(/^\/+/, "");
  if (cami === "") return { cami: "/", cerca };
  const [capsa, slug] = cami.split("/");
  switch (capsa) {
    case "coleccions": return { cami: "/obres", cerca };
    case "obra": return { cami: "/obres/" + (slug ?? ""), cerca };
    case "artista": return { cami: "/artistes/" + (slug ?? ""), cerca };
    case "concepte": return { cami: "/conceptes/" + (slug ?? ""), cerca };
    case "fora-ditalia": return { cami: "/fora-ditalia", cerca };
    case "comparacions": return { cami: "/comparacions", cerca };
    default: return { cami: "/" + cami, cerca };
  }
}

/** Migra enllaços antics basats en hash (#/obra/x) a la ruta nova. */
function migraHashAntic(): void {
  if (typeof window === "undefined") return;
  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return;
  const { cami, cerca } = destiARuta(hash.replace(/^#\//, ""));
  window.history.replaceState(null, "", rutaPublica(cami) + cerca);
}

const CLAUS_FILTRE: (keyof FiltresURL)[] = [
  "q", "disciplina", "periode", "ambit", "artista", "concepte", "escola", "c", "vista", "desDe", "artistes",
];

function parseRuta(): { vista: Vista; filtres: FiltresURL } {
  if (typeof window === "undefined") return { vista: { nom: "home" }, filtres: {} };
  const filtres: FiltresURL = {};
  for (const [k, v] of new URLSearchParams(window.location.search)) {
    // NOTA: `k in filtres` sobre l'objecte buit no coincideix mai (error preexistent):
    // els enllaços compartits amb query mai es carregaven en càrrega freda.
    if ((CLAUS_FILTRE as string[]).includes(k)) filtres[k as keyof FiltresURL] = v;
  }
  const parts = sensePrefix(window.location.pathname).split("/").filter(Boolean).map(descodificaSegment);
  if (parts.length === 0) return { vista: { nom: "home" }, filtres };
  const [capsa, slug] = parts;
  switch (capsa) {
    case "obres": return slug ? { vista: { nom: "obra", slug }, filtres } : { vista: { nom: "coleccions" }, filtres };
    case "cronologia": return { vista: { nom: "cronologia" }, filtres };
    case "artistes": return slug ? { vista: { nom: "artista", slug }, filtres } : { vista: { nom: "artistes" }, filtres };
    case "conceptes": return slug ? { vista: { nom: "concepte", slug }, filtres } : { vista: { nom: "conceptes" }, filtres };
    case "arquitectura": return { vista: { nom: "arquitectura" }, filtres };
    case "fora-ditalia": return { vista: { nom: "fora" }, filtres };
    case "comparacions": return { vista: { nom: "comparacions" }, filtres };
    case "glossari": return { vista: { nom: "glossari" }, filtres };
    case "sobre": return { vista: { nom: "sobre" }, filtres };
    default: return { vista: { nom: "home" }, filtres };
  }
}

export const useApp = create<Estat>((set, get) => ({
  vista: { nom: "home" },
  filtres: {},
  viewerObra: null,
  navega: (desti: string) => {
    if (typeof window === "undefined") return;
    const { cami, cerca } = destiARuta(desti);
    const destiComplet = rutaPublica(cami) + cerca;
    if (window.location.pathname + window.location.search !== destiComplet) {
      window.history.pushState(null, "", destiComplet);
    }
    set(() => ({ ...parseRuta(), viewerObra: null }));
  },
  setFiltres: (nous, push = false) => {
    if (typeof window === "undefined") return;
    const f = { ...get().filtres, ...nous };
    for (const [k, v] of Object.entries(f)) if (!v) delete f[k as keyof FiltresURL];
    const params = new URLSearchParams(f as Record<string, string>);
    const cerca = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (cerca ? "?" + cerca : ""));
    set({ filtres: f });
    void push;
  },
  obreViewer: (slug: string) => set({ viewerObra: slug }),
  tancaViewer: () => set({ viewerObra: null }),
  sincronitzaRuta: () => {
    migraHashAntic();
    set(() => parseRuta());
  },
}));

/** Filtres serialitzats com a query string (sense buits). */
export function filtresACerca(f: FiltresURL): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(f)) if (v) params.set(k, v);
  return params.toString();
}
