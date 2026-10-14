// anotacions.ts — Anotacions didàctiques estructurades (directriu secc. 6-8).
// Dades, mai configuració dins de components. Coordenades PROPORTIONALS (0-1)
// respecte a la imatge completa: s'escalen amb el visor i el zoom.
// El pilot inicial (secc. 9) cobreix 10 obres; el corpus complet s'anotarà progressivament.

export type CapaId =
  | "perspectiva"     // punts de fuga, línies d'horitzó i ortogonals
  | "composicio"      // eixos, triangles, ritmes, marc
  | "personatges"     // identificació de figures
  | "simbols"         // iconografia, atributs, símbols
  | "tecnica"         // sfumato, llum/ombra, pinzellada, matèria
  | "arquitectura";   // ordres, proporcions, elements constructius

export const CAPES: { id: CapaId; nom: string; descripcio: string }[] = [
  { id: "perspectiva", nom: "Perspectiva", descripcio: "Punt de fuga, línia d'horitzó i línies ortogonals" },
  { id: "composicio", nom: "Composició", descripcio: "Eixos, estructures i ritmes de la imatge" },
  { id: "personatges", nom: "Personatges", descripcio: "Identificació de les figures representades" },
  { id: "simbols", nom: "Símbols i iconografia", descripcio: "Atributs, al·lusions i significats" },
  { id: "tecnica", nom: "Tècnica i llum", descripcio: "Sfumato, pinzellada, tractament de la llum" },
  { id: "arquitectura", nom: "Arquitectura", descripcio: "Ordres, proporcions i elements constructius" },
];

interface AnotacioBase {
  id: string;
  capa: CapaId;
  etiqueta: string;
  /** Rètol breu sobre la imatge; el panell conserva l'etiqueta completa. */
  etiquetaCurta?: string;
  /**
   * Pregunta d'observació: es mostra ABANS de l'explicació (seqüència didàctica
   * «pregunta → mira → comprova»). Si no hi és, l'anotació només té explicació.
   */
  pregunta?: string;
  descripcio: string;
  /** Color d'acord amb la capa (fallback del tema). No és l'única via d'informació: sempre hi ha text. */
  color?: string;
  nivell?: "basico" | "intermedi" | "avancat";
  visible_inicialment?: boolean;
}

/** Primera frase d'un text (per al mode bàsic: «etiqueta essencial + una frase»). */
export function primeraFrase(text: string): string {
  const fi = text.search(/[.!?]([\s»"']|$)/);
  return fi >= 0 ? text.slice(0, fi + 1) : text;
}

/** Anotacions visibles segons el mode de lectura (bàsic ⊂ intermedi ⊂ avançat). */
export function anotacionsPerNivell(
  llista: Anotacio[],
  mode: "basico" | "intermedi" | "avancat",
): Anotacio[] {
  if (mode === "avancat") return llista;
  const max = mode === "basico" ? 1 : 2;
  const rang: Record<string, number> = { basico: 1, intermedi: 2, avancat: 3 };
  return llista.filter((a) => (rang[a.nivell ?? "basico"] ?? 1) <= max);
}

export type Anotacio =
  | (AnotacioBase & { figura: "punt"; x: number; y: number })
  | (AnotacioBase & { figura: "etiqueta"; x: number; y: number; costat?: "esquerra" | "dreta" })
  | (AnotacioBase & { figura: "rect"; x: number; y: number; amplada: number; alcada: number })
  | (AnotacioBase & { figura: "zona"; x: number; y: number; amplada: number; alcada: number })
  | (AnotacioBase & { figura: "linia"; punts: [number, number][]; discontinua?: boolean })
  | (AnotacioBase & { figura: "poligon"; punts: [number, number][] });

// Colors per capa (més el text sempre accessible)
export const COLOR_CAPA: Record<CapaId, string> = {
  perspectiva: "#c96f4a",
  composicio: "#c9a84c",
  personatges: "#7fb069",
  simbols: "#b57edc",
  tecnica: "#e08d3c",
  arquitectura: "#6fa8dc",
};

export const ANOTACIONS: Record<string, Anotacio[]> = {};

// Fusiona el pilot d'anotacions (anotacions-pilot.ts només importa TIPUS d'aquest
// fitxer, per evitar cicles en temps d'execució)
import { ANOTACIONS as PILOT } from "./anotacions-pilot";
import { ANOTACIONS as ARQUITECTURA } from "./anotacions-arquitectura";
import { ANOTACIONS as LECTURES_VISUALS } from "./anotacions-lectures-visuals";
Object.assign(ANOTACIONS, PILOT, ARQUITECTURA, LECTURES_VISUALS);

export function anotacionsDe(slug: string): Anotacio[] {
  return ANOTACIONS[slug] ?? [];
}

export function capesDe(slug: string): CapaId[] {
  const set = new Set(anotacionsDe(slug).map((a) => a.capa));
  return CAPES.map((c) => c.id).filter((id) => set.has(id));
}

/** Primera anotació d'una capa que té pregunta d'observació (seqüència guiada, pas 3). */
export function primeraPreguntaDe(slug: string, capa: CapaId): Anotacio | null {
  return anotacionsDe(slug).find((a) => a.capa === capa && !!a.pregunta) ?? null;
}

/** Hi ha anotacions (pilot didàctic) per a aquesta obra? */
export function teAnotacions(slug: string): boolean {
  return anotacionsDe(slug).length > 0;
}

/** Número d'anotacions amb pregunta d'observació d'una capa (per als comptadors del panell). */
export function preguntesPerCapa(slug: string, capa: CapaId): number {
  return anotacionsDe(slug).filter((a) => a.capa === capa && !!a.pregunta).length;
}

/** Valida les coordenades de totes les anotacions (0 ≤ valor ≤ 1). */
export function validaAnotacions(): string[] {
  const errors: string[] = [];
  for (const [slug, llista] of Object.entries(ANOTACIONS)) {
    for (const a of llista) {
      const check = (nom: string, v: number) => {
        if (typeof v !== "number" || Number.isNaN(v) || v < 0 || v > 1) {
          errors.push(`${slug}/${a.id}: ${nom} fora de rang (0-1): ${v}`);
        }
      };
      if ("x" in a) check("x", a.x);
      if ("y" in a) check("y", a.y);
      if ("amplada" in a) check("amplada", a.amplada);
      if ("alcada" in a) check("alcada", a.alcada);
      if ("punts" in a) for (const [px, py] of a.punts) { check("punt x", px); check("punt y", py); }
    }
  }
  return errors;
}
