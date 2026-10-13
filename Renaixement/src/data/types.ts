// types.ts — Model de dades de la web Renaixement (cap. 4 de la programació)
// + model temporal explícit de l'auditoria de cronologia: cap data derivada
// («naixement + 20»), cap data sense precisió ni font.
export type Disciplina = "pintura" | "escultura" | "arquitectura";
export type Periode = "quattrocento" | "cinquecento" | "manierisme" | "flamenc" | "nord";
export type Ambit = "italia" | "flandes" | "franca" | "espanya" | "alemanya";
export type EscolaArq = "italiana" | "plateresca" | "classicista" | "herreriana" | "francesa";

/** Precisió d'una datació. Es mostra a la UI: un any exacte no es representa igual que un interval. */
export type PrecisioData =
  | "exacta"        // un únic any documentat (p. ex. «1503»)
  | "any"           // any de referència acceptat per la bibliografia, amb matisos
  | "rang"          // interval documentat (p. ex. «1425-1428»)
  | "aproximada"    // datació aproximada o debatuda («aprox. 1485»)
  | "iniciada";     // començada en una data i en curs durant anys («des de 1528»)

/** Com de bé està documentada l'activitat d'un artista. */
export type EstatDocumentacio =
  | "activitat_documentada" // existeixen encàrrecs, inscripcions de gremi o pagaments datats
  | "vida_documentada"      // només es coneixen amb certesa les dates de naixement i mort
  | "estimacio";            // l'activitat s'estima per obres conservades, sense documents

/**
 * Precisió inferida de la cadena de data canònica. Única font de veritat:
 * les fitxes només escriuen `data`, i aquesta funció evita divergència
 * entre el text llegible i el camp estructurat.
 */
export function precisioDeData(data: string): PrecisioData {
  if (/^des de /i.test(data)) return "iniciada";
  if (/aprox|ca\.|segle|discutida|anys abans|anys després/i.test(data)) return "aproximada";
  if (/\d{4}\s*[–-]\s*\d{4}/.test(data)) return "rang";
  if (/^\d{4}$/.test(data.trim())) return "exacta";
  return "any";
}

/** Territoris de les vistes preparades de cronologia (camps `territori`). */
export type Territori = "italia" | "flandes" | "franca" | "espanya" | "nord" | "europa";

/** Banda de períodes per a la cronologia: límits aproximats i amb solapament.
 *  No són caixes hermètiques: Quattrocento i Cinquecento se solapen amb el manierisme. */
export const BANDES_PERIODE: { nom: string; inici: number; fi: number; color: string; descripcio: string }[] = [
  {
    nom: "Quattrocento",
    inici: 1400, fi: 1500, color: "var(--color-crono-quattrocento)",
    descripcio: "Naixement i consolidació del llenguatge renaixentista a Itàlia.",
  },
  {
    nom: "Cinquecento",
    inici: 1500, fi: 1560, color: "var(--color-crono-cinquecento)",
    descripcio: "Alt Renaixement romà i venecià, amb el manierisme emergint des del 1520.",
  },
  {
    nom: "Manierisme",
    inici: 1520, fi: 1610, color: "var(--color-crono-manierisme)",
    descripcio: "Vies alternatives al classicisme, fins a les primeres dècades del segle XVII.",
  },
];

export interface Ubicacio {
  museu: string;
  ciutat: string;
  pais: string;
  url?: string; // pàgina de la institució, si existeix
}

export interface ImatgeObra {
  fitxer: string;      // nom del fitxer a Wikimedia Commons
  amplada: number;     // píxels de l'original
  alcada: number;
  llicencia: string;   // p. ex. "Public domain", "CC BY 3.0"
  autor_foto?: string; // autor de la fotografia, si escau
}

export interface Obra {
  slug: string;
  titol: string;
  titolOriginal?: string;      // denominació original (cursiva)
  autorSlug: string;
  autorNom: string;
  data: string;                // "1425-1428" | "aprox. 1485" — cadena llegible canònica
  anyInici: number;            // per a l'ordenació cronològica
  anyFi: number;
  /** Precisió de la datació (derivada de `data`; vegeu precisioDeData). */
  precisioData?: PrecisioData;
  /** Font de la datació: museu, catàleg raonat o debat historiogràfic. */
  fontData?: string;
  tecnica: string;
  dimensions?: string;
  ubicacio: Ubicacio;
  disciplina: Disciplina;
  periode: Periode;
  ambit: Ambit;
  escola?: EscolaArq;          // només arquitectura
  concepts: string[];          // màxim 3 (regla d'or, cap. 3.2)
  relevancia: string;          // «Per què és rellevant» — mai no es retalla
  context: string;             // 3-5 frases
  analisi: string;             // 4-6 frases
  miraHiDeProp?: string[];     // 1-3 detalls dignes de zoom
  curiositats?: string[];      // fets verificables
  relacionades: string[];      // 2-4 slugs d'obres
  obraFita?: boolean;          // marca d'or «obra fita»
  bloc: number;                // bloc temàtic del guió (cap. 5)
}

export interface Artista {
  slug: string;
  nom: string;
  nomOriginal?: string;
  dates: string;               // dates de VIDA: "1475-1564"
  /** Inici de l'activitat DOCUMENTADA: primera inscripció de gremi, encàrrec o obra datada. */
  activitatInici?: number;
  /** Fi de l'activitat documentada (per defecte, l'any de mort si és conegut). */
  activitatFi?: number;
  /** Com està documentada l'activitat: mai no es calcula com «naixement + 20». */
  estatDocumentacio?: EstatDocumentacio;
  llocs: string;               // "Caprese · Roma"
  ambits: string[];            // pintor / escultor / arquitecte / teòric
  ambitFiltro: Ambit;
  periode: Periode;
  biografia: string;           // 120-180 paraules, 2-4 paràgrafs
  tretsEstil: string[];        // 3-5 afirmacions reconeixibles visualment
  innovacions: string[];       // 1-2 frases per punt
  cita?: { text: string; font: string };
}

export interface Concepte {
  slug: string;
  nom: string;
  nomItalic?: boolean;         // termes italians en cursiva (sfumato, contrapposto...)
  /** Grup de l'índex de conceptes: per defecte, pintura i escultura. */
  grup?: "arquitectura";
  definicio: string;           // 1-2 frases memorables, citables en examen
  explicacio: string;          // 150-250 paraules
  exemplarPrincipal: string;   // slug d'obra + zona
  zonaExemplar: string;
  exemplarsSecundaris: string[]; // 2-4 slugs
  confusions: { amb: string; diferencia: string }[]; // mínim 2
  relacionats: string[];       // slugs de conceptes/glossari
}

export interface Escola {
  slug: EscolaArq;
  nom: string;
  cronologia: string;
  definicio: string;
  trets: string[];             // 4-6 elements observables amb exemple
  autors: string[];            // slugs d'artista
  comDistingirLa: string;
}

export interface Esdeveniment {
  anyInici: number;            // any de referència (o inici de l'interval)
  anyFi?: number;              // fi de l'interval, si l'esdeveniment dura anys
  titol: string;
  descripcio: string;
  tipus: "fita" | "politica" | "art";
  /** Precisió de la datació: un esdeveniment aproximat es representa diferent d'un exacte. */
  precisioData: PrecisioData;
  /** Font verificable de la data (obra de referència o font documental). */
  fontData: string;
  /** Es mostra a la vista «Panorama general» (12-18 fites visibles). */
  prioritatPanorama?: boolean;
  territori: Territori;        // per a les vistes «Itàlia», «Europa»…
  /** Temes per als recorreguts didàctics (p. ex. "perspectiva-lineal"). */
  tema?: string[];
}

/** Vista preparada de la cronologia: l'entrada no comença amb 68 obres alhora. */
export interface VistaPreparada {
  id: string;
  nom: string;
  frase: string;               // frase explicativa del botó
  interval: [number, number];
  nivell: "segles" | "decennis";
  /** Filtres que aplica en obrir-la. */
  territori?: Territori | "no-italia";
  disciplina?: Disciplina;
  /** Si només es mostren les fites prioritàries (panorama). */
  nomesPrioritats?: boolean;
  /** Recorregut didàctic: mostra una guia d'observació a dalt. */
  guia?: { titol: string; text: string };
}

export interface TermeGlossari {
  terme: string;
  definicio: string;           // entrada curta de glossari viu
  termeItalic?: boolean;
  vincle?: string;             // slug de concepte relacionat
}

// ── Vocabulari amb etiqueta presentable ──
export const ETIQUETES: Record<string, Record<string, string>> = {
  disciplina: {
    pintura: "Pintura",
    escultura: "Escultura",
    arquitectura: "Arquitectura",
  },
  periode: {
    quattrocento: "Quattrocento",
    cinquecento: "Cinquecento",
    manierisme: "Manierisme",
    flamenc: "Renaixement flamenc",
    nord: "Renaixement del nord",
  },
  ambit: {
    italia: "Itàlia",
    flandes: "Flandes",
    franca: "França",
    espanya: "Espanya",
    alemanya: "Alemanya",
  },
  escola: {
    italiana: "Renaixement italià",
    plateresca: "Plateresca",
    classicista: "Classicista",
    herreriana: "Herreriana",
    francesa: "Primer Renaixement francès",
  },
};

export const ETIQUETES_BLOCS: Record<number, string> = {
  0: "Marc històric",
  1: "Quattrocento",
  2: "Cinquecento",
  3: "Conceptes tècnics",
  4: "Arquitectura i escoles",
  5: "Escultura",
  6: "Fora d'Itàlia",
};
