// escoles.ts — Les escoles arquitectòniques (bloc 4 i model 4.4 de la programació)
import type { Escola } from "./types";

export const ESCOLES: Escola[] = [
  {
    slug: "italiana",
    nom: "Renaixement italià",
    cronologia: "1420-1600 · Florència, Roma, Venècia, Vicenza",
    definicio:
      "La font: l'arquitectura que recupera els ordres clàssics, les proporcions matemàtiques i la planta centralitzada, de la cúpula de Brunelleschi a les vil·les de Palladio.",
    trets: [
      "Ordres clàssics (dòric, jònic, corinti) com a sistema decoratiu i estructural, superposats per pisos",
      "Plantes centralitzades (círculo, creu grega) com a símbol de l'ordre ideal, o plantes de saló clares",
      "Bicromia florentina: pietra serena gris sobre estuc blanc (Brunelleschi, Alberti)",
      "Façanes amb arc de triomf i entaulament complet",
      "La cúpula com a corona del paisatge urbà",
      "Tractats teòrics: Alberti (1452) i Palladio (1570) fan de l'arquitectura una ciència escrita",
    ],
    autors: ["brunelleschi", "alberti", "bramante", "miquel-angel", "palladio"],
    comDistingirLa:
      "És l'origen de totes: ordres clàssics ben articulats, proporcions calculades i cap decoració que no estigui sotmesa a la geometria. Les escoles espanyoles i francesa en són adaptacions locals; per reconèixer-les, compareu-les amb la font italiana.",
  },
  {
    slug: "plateresca",
    nom: "Escola Plateresca",
    cronologia: "aprox. 1500-1560 · Castella i Andalusia",
    definicio:
      "La façana tractada com un retaule d'argent (plata): decoració minuciosa que fusiona el gòtic flamíger espanyol amb els motius clàssics importats d'Itàlia. La primera manera del Renaixement espanyol.",
    trets: [
      "Superfície de façana coberta de decoració a manera d'obra d'argent: candelers, grutescos, medallons, baldaquins",
      "Motius clàssics (pilastres, medallons, cornucòpies) barrejats amb restes gòtiques (flamíger) i arabo-andaluses",
      "Heràldica dels Reis Catòlics i de l'Imperi: jou i fletxes, granada, escuts imperials",
      "Estructura de retaule: la façana dividida en pisos i registres com un altar",
      "Pedra daurada de Villamayor i altres materials locals fosos com a metall",
      "Ornament dominant sobre estructura: l'edifici és el marc, la decoració és el subjecte",
    ],
    autors: [],
    comDistingirLa:
      "Davant de la Plateresca pregunteu-vos: hi ha més decoració que paret? Si la façana sembla un retaule tallat a l'argent, amb candelers i grutescos per tot arreu, és Plateresca. La Classicista rebaixa aquesta decoració a la norma italiana; la Herreriana l'elimina completament.",
  },
  {
    slug: "classicista",
    nom: "Escola Classicista",
    cronologia: "aprox. 1526-1560 · Granada, Madrid",
    definicio:
      "La norma italiana aplicada amb rigor erudit a Espanya: plantes centrals, ordres clàssics purs i cap concessió a la decoració local. El palau de Carles V és el manifest.",
    trets: [
      "Plantes geomètriques pures: quadrat amb pati circular (palau de Carles V)",
      "Ordres clàssics superposats amb rigor de tractat (dòric i jònic)",
      "Façanes d'arc de triomf romà com a declaració d'imperi",
      "Rústiques polides i finestres travadades al ritme italià",
      "Absència de decoració fantàstica: la geometria és tota l'ornamentació",
      "Arquitectes formats a Itàlia que traslladen la teoria d'Alberti i Bramante",
    ],
    autors: ["machuca"],
    comDistingirLa:
      "La Classicista és l'italianisme sense filtres: si l'edifici sembla que podria ser de Roma (ordres purs, planta central, arc de triomf) i és a Espanya, és Classicista. La diferència amb la Plateresca és total: aquí l'estructura domina; allà, l'ornament.",
  },
  {
    slug: "herreriana",
    nom: "Escola Herreriana",
    cronologia: "aprox. 1560-1600 · Madrid i Castella",
    definicio:
      "Geometria austeríssima i escala monumental: l'estil de l'Escorial, on l'edifici és un reticle de granit sense cap ornament superflu. El llenguatge oficial de la monarquia de Felip II.",
    trets: [
      "Austeritat decorativa absoluta: cap filigrana, cap grutesc, cap color més que el gris del granit",
      "Reticles ordenats: ritmes de finestres idèntiques, façanes de reticle matemàtic",
      "Granit gris i valls de grill simple (llimes de grill)",
      "Escalament monumental: palau, monestir, panteó i biblioteca en un sol conjunt",
      "Torres piramidals a les cantonades i cúpules de tambor sobre tambor",
      "L'ordenació com a expressió de poder: l'edifici és el diagrama de l'imperi",
    ],
    autors: ["herrera"],
    comDistingirLa:
      "La Herreriana és el contrari de la Plateresca: si veieu un edifici gegant, gris, sense cap decoració més que el ritme de finestres i les torres cantoneres, és Herreriana. La comparació en tres columnes —decoració abundant (Plateresca) / norma clàssica (Classicista) / austeritat geomètrica (Herreriana)— és l'exercici clau del bloc d'arquitectura.",
  },
  {
    slug: "francesa",
    nom: "Primer Renaixement francès",
    cronologia: "aprox. 1515-1560 · Vall del Loira i Fontainebleau",
    definicio:
      "L'adaptació cortesana: el Renaixement italià es posa al servei de la majestat francesa, amb cossos de castell medieval i ala italiana (pòrtics, loggies, escales). Chambord i Fontainebleau n'hi són els documents.",
    trets: [
      "Cos de castell francès (torres, fossats, teulades amb xemeneies) amb elements italians inserits",
      "Cobertes urbanes: la silueta de xemeneies i llanternes com una ciutat",
      "Pòrtics temple i loggies italianes com a façanes d'entrada",
      "Escales monumentals (Chambord: doble hèlix atribuïda a Leonardo)",
      "Interiors decorats per artistes italians (Escola de Fontainebleau: Rosso, Primaticcio)",
      "Traducció, no còpia: cada element italià serveix la cerimònia de la cort francesa",
    ],
    autors: [],
    comDistingirLa:
      "El Renaixement francès és una història de doble signe: castell medieval per fora, temple italià per dintre. Si la coberta és una selva de xemeneies i el pòrtic un frontó clàssic, és França. Compareu Chambord amb qualsevol vil·la palladiana: la diferència és entre majestat feudal i ordre racional.",
  },
];

export const ESCOLES_PER_SLUG: Record<string, Escola> = Object.fromEntries(
  ESCOLES.map((e) => [e.slug, e]),
);

export function escola(slug: string): Escola | undefined {
  return ESCOLES_PER_SLUG[slug];
}
