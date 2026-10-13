// glossari.ts — Glossari viu (bloc 3, Taula 5 de la programació)
import type { TermeGlossari } from "./types";

export const GLOSSARI: TermeGlossari[] = [
  { terme: "Quattrocento", definicio: "Etapa del segle XV (aprox. 1400-1500), centrada a Florència, en què es creen el llenguatge i les tècniques fonamentals del Renaixement.", vincle: "perspectiva-lineal" },
  { terme: "Cinquecento", definicio: "Etapa del segle XVI (1500-1600), amb Roma com a centre durant el primer terç i Leonardo, Rafael i Miquel Àngel com a figures culminants." },
  { terme: "Manierisme", definicio: "Corrent d'aprox. 1520-1600 que manipula deliberadament el cànon clàssic: formes allargades, composicions complexes, colors freds i irreals." },
  { terme: "Perspectiva lineal", definicio: "Sistema geomètric per representar la profunditat amb punts de fuga sobre la línia d'horitzó.", vincle: "perspectiva-lineal" },
  { terme: "Perspectiva aèria", definicio: "Convenció que simula l'efecte de l'atmosfera: a distància, colors dessaturats i contorns difusos.", vincle: "perspectiva-aeria" },
  { terme: "Sfumato", termeItalic: true, definicio: "Tècnica de Leonardo: fumar el color, difuminar les transicions sense línies dures.", vincle: "sfumato" },
  { terme: "Clarobscur", definicio: "Contrast fort de llums i ombres per donar volum i drama.", vincle: "clarobscur" },
  { terme: "Escorç", definicio: "Representació d'un cos en posició obliqua o curta per suggerir profunditat i moviment.", vincle: "escorc" },
  { terme: "Contrapposto", termeItalic: true, definicio: "Postura en què el pes recau en una cama, oposant lleugerament malucs i espatlles: la figura «viva» dels clàssics.", vincle: "contrapposto" },
  { terme: "Composició piramidal", definicio: "Figures disposades en triangle estable amb vèrtex al cap: estabilitat i claredat.", vincle: "composicio-piramidal" },
  { terme: "Fresc", definicio: "Tècnica mural que pinta sobre arrebossat fresc; el pigment penetra en la paret en assecar-se.", vincle: "fresc" },
  { terme: "Tempera", definicio: "Tècnica amb lligant d'ou: ràpida i nítida, dominant a Itàlia fins a l'arribada massiva de l'oli.", vincle: "oli-tempera" },
  { terme: "Oli", definicio: "Tècnica amb lligant d'oli de lli: permet transparències, retocs i colors profunds. Vinguda de Flandes.", vincle: "oli-tempera" },
  { terme: "Veladura", definicio: "Capa fina de pintura translúcida que modifica el to de la capa inferior; recurs bàsic de l'oli." },
  { terme: "Cadratura", definicio: "Quadrícula de paviment construïda en perspectiva per mesurar el recés de l'espai pintat." },
  { terme: "Punt de fuga", definicio: "Punt de la línia d'horitzó cap on convergixen les ortogonals de l'espai representat." },
  { terme: "Mecenes", definicio: "Persona o institució que finança l'obra d'art: els Mèdici, els papes, les corts i els gremis són els mecenes del Renaixement." },
  { terme: "Retaule", definicio: "Conjunt de pintures o relleus organitzats per a un altar; és el format principal de la pintura flamenca i espanyola." },
  { terme: "Condottiere", termeItalic: true, definicio: "Capità de mercenaris al servei de les ciutats italianes; els monuments eqüestres de Donatello i Verrocchio els glorifiquen." },
  { terme: "Terribilità", termeItalic: true, definicio: "Terme del segle XVI per descriure l'energia impressionant de les figures de Miquel Àngel: grandesa que infon espant i admiració." },
  { terme: "Figura serpentinata", termeItalic: true, definicio: "Figura en espiral, amb rotacions dobles del tors i el maluc: la prolongació manierista del contrapposto." },
  { terme: "Giornata", termeItalic: true, definicio: "Porció d'arrebossat fresc que es pinta en un dia de treball; les juntes entre giornate revelen el ritme de l'artista." },
  { terme: "Humanisme", definicio: "Corrent intel·lectual del Renaixement que posa l'ésser humà al centre del saber: transforma els temes de l'art i el lloc de l'artista." },
  { terme: "Pietà", termeItalic: true, definicio: "Tema de devoció: la Mare de Déu sostenint el cos mort de Crist. La Pietà vaticana de Miquel Àngel n'és el model." },
  { terme: "Ordre clàssic", definicio: "Sistema de columna i entaulament amb proporcions pròpies (toscà, dòric, jònic, corinti o compost); es reconeix sobretot pel capitell.", vincle: "ordres-classics" },
  { terme: "Ordre gegant", definicio: "Pilastres o columnes que abasten dos o més pisos d'una façana; Miquel Àngel l'aplica al Capitoli.", vincle: "ordres-classics" },
  { terme: "Pilastra", definicio: "Columna aplanada i adossada al mur, amb base i capitell: ordena la façana més que no pas sosté.", vincle: "ordres-classics" },
  { terme: "Capitell", definicio: "Part superior d'una columna o pilastra; la seva forma permet identificar l'ordre clàssic." },
  { terme: "Entaulament", definicio: "Conjunt horitzontal que reposa sobre les columnes: arquitrau, fris i cornisa." },
  { terme: "Frontó", definicio: "Remat triangular o corbat que corona una façana, una porta o una finestra, a la manera dels temples antics." },
  { terme: "Finestra bífora", definicio: "Finestra dividida en dues obertures per una columneta; és habitual als palaus florentins." },
  { terme: "Mòdul", definicio: "Unitat de mesura que es repeteix per fixar totes les proporcions d'un edifici.", vincle: "proporcio-modul" },
  { terme: "Planta central", definicio: "Planta organitzada al voltant d'un punt central, igual en totes direccions (cercle, octògon, creu grega).", vincle: "planta-central" },
  { terme: "Tambor", definicio: "Cilindre o prisma, normalment amb finestres, sobre el qual s'aixeca una cúpula.", vincle: "cupula" },
  { terme: "Llanterna", definicio: "Petita torre amb obertures que corona una cúpula i hi deixa entrar la llum.", vincle: "cupula" },
];

export const GLOSSARI_ORD: TermeGlossari[] = [...GLOSSARI].sort((a, b) =>
  a.terme.localeCompare(b.terme, "ca"),
);

export function terme(t: string): TermeGlossari | undefined {
  return GLOSSARI.find((g) => g.terme.toLowerCase() === t.toLowerCase());
}
