// comparacions.ts — Comparacions preconfigurades d'obres (directriu «comparació»).
// Cada preset connecta 2-3 obres del corpus al voltant d'una mateixa qüestió didàctica:
// l'aula no ha de buscar les parelles, ja estan preparades amb una pregunta comparativa.
// Auditoria didàctica: cada comparació té resposta MODEL (plegada a la UI) i
// criteris mínims d'èxit formulats amb elements visibles.
// Els slugs es validen contra el corpus a tests/dades.test.ts.

export interface ComparacioObra {
  slug: string;
  /** Què hi ha de mirar en aquesta obra dins de la comparació. */
  rol: string;
  text: string;
}

export interface Comparacio {
  id: string;
  titol: string;
  /** Slug del concepte associat (enllaç a la fitxa didàctica), si n'hi ha. */
  concepte?: string;
  /** Què cal mirar, en una o dues frases. */
  intro: string;
  /** Pregunta comparativa que estructura l'activitat. */
  pregunta: string;
  obres: ComparacioObra[];
  /** Resposta model, plegada per defecte: primer l'alumne hi respon, després la comprova. */
  respostaModel: string;
  /** Criteris mínims d'èxit: què ha de contenir una resposta completa. */
  criteris: string[];
}

export const COMPARACIONS: Comparacio[] = [
  {
    id: "perspectiva-lineal",
    titol: "Perspectiva lineal en tres moments",
    concepte: "perspectiva-lineal",
    intro:
      "El mateix sistema geomètric —un punt de fuga, ortogonals i horitzó— aplicat amb intencions diferents durant un segle: per fer plausible una capella, per ordenar un relat i per sostenir la pintura com a espai intel·lectual.",
    pregunta: "On cau el punt de fuga en cada obra, i quin contingut (religiós, narratiu, intel·lectual) hi deixa convergir?",
    obres: [
      {
        slug: "trinitat-masaccio",
        rol: "La fundació (Quattrocento)",
        text: "Masaccio col·loca el punt de fuga al peu de la creu: la geometria serveix a la teologia i l'espai pintat continua l'espai real del fidel.",
      },
      {
        slug: "ultim-sopar",
        rol: "L'ordenació del relat (Cinquecento)",
        text: "Leonardo fa del punt de fuga el cap de Crist: totes les ortogonals de sostre i tapissos porten l'ull cap a ell, i la perspectiva organitza la psicologia de dotze figures.",
      },
      {
        slug: "escola-atenes",
        rol: "La síntesi culminant",
        text: "Rafael desplega voltes successives amb precisió de tractat i col·loca Plató i Aristòtil al punt de fuga: l'espai ideal de la filosofia clàssica dins del palau del papa.",
      },
    ],
    respostaModel:
      "A la Trinitat el punt de fuga és al peu de la creu, a l'alçada de l'ull del fidel que mira el fresc: la revelació cristiana descansa sobre la geometria. A l'Últim Sopar cau al cap de Crist, i totes les línies del sostre i dels tapissos hi conflueixen: el sistema ordena el relat i converteix el gest de Crist en el centre emocional de la taula. A l'Escola d'Atenes el punt de fuga s'obre entre Plató i Aristòtil, sota l'arc central: la filosofia clàssica ocupa el lloc del sagrat i la pintura demostra que pot construir un espai tan ordenat com l'arquitectura real.",
    criteris: [
      "Esmenta on cau el punt de fuga en almenys dues de les tres obres",
      "Relaciona cada punt de fuga amb un contingut (religiós, narratiu o intel·lectual)",
      "Fa servir els termes punt de fuga i ortogonals",
    ],
  },
  {
    id: "perspectiva-aeria",
    titol: "Perspectiva aèria: la distància com a color",
    concepte: "perspectiva-aeria",
    intro:
      "Com es pinta la distància? No amb línies, sinó amb el color i la nitidesa que l'aire lleva a allò llunyà. Leonardo ho teoritza des del paisatge italià; Bruegel l'aplica a l'escala d'una muntanya.",
    pregunta: "Què perden els elements quan s'allunyen en cada quadre: color, contorn, mida? Com sap l'ull que aquell fons és lluny?",
    obres: [
      {
        slug: "gioconda",
        rol: "Leonardo: la distància en veladures",
        text: "El paisatge de la Gioconda perd contorn i color cap a l'horitzó: cada pla és més blau, més fred i més indefinit que el precedent — perspectiva aèria pintada a veladures primes.",
      },
      {
        slug: "cacadors-neu",
        rol: "Bruegel: la distància com a món",
        text: "El vall dels Cacadors a la neu s'escala en plans cada vegada més pàl·lids fins a muntanyes que es fonen amb el cel: la fórmula de Leonardo aplicada a la visió panoràmica del nord.",
      },
    ],
    respostaModel:
      "A la Gioconda, el pont i el camí del fons perden contorn a mesura que s'allunyen: els colors es tornen blaus i freds per les veladures, i les formes s'endolcen fins a quasi dissoldre's. A Els cacadors a la neu passa el mateix amb una escala molts cops més gran: el vall baixa en plans cada cop més pàl·lids, el bosc mitjà encara té taques fosques reconeixibles, i les muntanyes del fons ja només són tonalitats fredes que es confonen amb el cel. En els dos casos, l'ull llegeix la distància perquè l'aire «roba» color, nitidesa i contrast; la mida i la posició al quadre hi confirmen.",
    criteris: [
      "Esmenta dos elements visibles que canvien amb la distància (p. ex. color i contorn)",
      "Compara com es veu el primer pla i el fons en almenys una obra",
      "Fa servir el terme perspectiva aèria",
    ],
  },
  {
    id: "contrapposto",
    titol: "El contrapposto: dos David, dos segles",
    concepte: "contrapposto",
    intro:
      "El pes en una cama, el maluc contraposat: la fórmula clàssica del cos viu. Donatello la recupera al Quattrocento amb un bronze pastoril; Miquel Àngel la fa monumental al Cinquecento amb un bloc abandonat durant 40 anys.",
    pregunta: "Com es distribueix el pes en cada figura, i què canvia en l'actitud del cap i de les mans?",
    obres: [
      {
        slug: "david-bronze-donatello",
        rol: "Donatello (≈1440): la gràcia",
        text: "El David de bronze pesa sobre la cama dreta amb el maluc escombrat: corba en S de Praxíteles, cos adolescent i triomfant, contemplat des de baix amb delicadesa cortesana.",
      },
      {
        slug: "david-marbre",
        rol: "Miquel Àngel (1501-1504): la tensió",
        text: "El David de marbre activa el mateix contrapposto però amb tensió acumulada: el cap gira cap a Goliat abans de l'acció, i l'anatomia amplificada està pensada per ser vista des de sota.",
      },
    ],
    respostaModel:
      "Els dos David pesen sobre la cama dreta i deixen l'altra relaxada, amb el maluc escombrat cap a un costat i les espatlles contraposades: és la corba en S del contrapposto clàssic. La diferència és l'actitud: el bronze de Donatello mira avall, descansat, amb l'espasa a una mà i el cap de Goliat als peus — victòria ja consumada, cos adolescent. El marbre de Miquel Àngel gira el cap cap a Goliat abans de lluitar, les mans tensen la fona i el ventre conté la respiració: contrapposto, però carregat d'acció imminent.",
    criteris: [
      "Identifica sobre quina cama pesa cada figura",
      "Esmenta el maluc o la corba del cos (contrapposto)",
      "Compara l'actitud del cap o de les mans entre els dos David",
    ],
  },
  {
    id: "arquitectura",
    titol: "Arquitectura: de Brunelleschi a Fontainebleau",
    intro:
      "El vocabulari clàssic —ordre, proporció, simetria— viatja de Florència a Roma i després més enllà dels Alps. Tres moments: la invenció de l'espai ordenat, la seva codificació teòrica i la seva adaptació francesa.",
    pregunta: "Quins elements del vocabulari clàssic reconeixes a cada monument, i què hi afegeix cada regió pròpia (teulades, massa, decoració)?",
    obres: [
      {
        slug: "cupula-fiore",
        rol: "Brunelleschi: la fórmula florentina",
        text: "La cúpula de Santa Maria del Fiore resol amb ogiva doble i maó en espiga un problema que ningú sabia plantejar: l'enginyeria com a art i la geometria com a fonament del Renaixement.",
      },
      {
        slug: "palau-rucellai",
        rol: "Alberti: la teoria a la façana",
        text: "El Palau Rucellai superposa ordres clàssics en tres pisos sobre una graella proporcional: l'arquitectura escrita en el llenguatge dels antics, com codificarà De re aedificatoria.",
      },
      {
        slug: "fontainebleau",
        rol: "Fontainebleau: la variant francesa",
        text: "L'ala de Francesc I munta pilastres, fronts i medallons italians sobre massa francesa i teulada alta: el Renaixement adaptat a la tradició constructora del nord.",
      },
    ],
    respostaModel:
      "A Florència, Brunelleschi aporta l'enginyeria: ogiva doble, espina de peix i un mòdul geomètric que sosté la cúpula sense cimbrà. Al Palau Rucellai, Alberti aplica el vocabulari clàssic literal: pilastres d'ordre superposat (tosc, compost, corinti) sobre una trama proporcional amb entaulaments continus. A Fontainebleau, els mateixos elements italians (pilastres, fronts, medallons) es posen sobre un cos francès: murs massissos, finestres travades i teulada alta amb xemeneies. El vocabulari viatja; la massa i la coberta indiquen cada territori.",
    criteris: [
      "Nomena almenys dos elements clàssics (pilastres, ordres, entaulament, frontó…)",
      "Diu què és propi de cada regió (teulada alta, massa del mur, material)",
      "Ordena els tres monuments del més teòric al més adaptat (o justifica l'ordre)",
    ],
  },
  {
    id: "retrat",
    titol: "Retratar una persona: tres invencions",
    concepte: "retrat-humanista",
    intro:
      "Un matrimoni documentat, un retrat ideal d'estatus, un autoretrat com a manifest: tres maneres de dir «aquest és» i, alhora, «val la pena ser recordat».",
    pregunta: "Què mira cada model, on posa les mans, i quants símbols d'estatus pots comptar en cada imatge?",
    obres: [
      {
        slug: "matrimoni-arnolfini",
        rol: "Van Eyck (1434): el testimoni",
        text: "El retrat com a document: gest juramental, espelma, firma i mirall que afegeix dos testimonis més. La fidelitat microscòpica de l'oli fa possible la prova visual.",
      },
      {
        slug: "gioconda",
        rol: "Leonardo (1503-?): l'atmosfera",
        text: "El retrat com a món: sfumato al rostre, paisatge geològic al fons i una relació viva entre model i espectador. Menys objecte, més presència.",
      },
      {
        slug: "autoretrat-durer-1500",
        rol: "Dürer (1500): la declaració",
        text: "Dürer es retrata de front, amb gest de Crist: l'artista com a creador, el retrat com a declaració de drets professionals. El nord diu la seva paraula al debat humanista.",
      },
    ],
    respostaModel:
      "Els Arnolfini es miren de front cap a nosaltres (o cap al mirall), amb mans entretallades al centre: hi comptes símbols d'estatus i de testimoniatge — espelma, mirall, sabots, gos, fruites, firma sobre el mur. La Gioconda mira l'espectador amb mig somriure, mans creuades que tanquen la composició: els símbols són només el vestit fosc i el paisatge; l'estatus passa per l'atmosfera i la manera, no per objectes. Dürer, de front com un salvador, una mà al pit i l'altra tocant la pell: el símbol és la pròpia postura i la inscripció llatina. Tres estratègies: document, presència i manifest.",
    criteris: [
      "Diu què mira i on posa les mans el model en almenys dues obres",
      "Compta almenys un símbol d'estatus o de testimoniatge per obra",
      "Fa servir una paraula de contrast (document, atmosfera, manifest)",
    ],
  },
];

/** Comparació preconfigurada que inclou una obra (per al pas 6 de la seqüència del visor). */
export function comparacioAmb(slug: string): Comparacio | null {
  return COMPARACIONS.find((c) => c.obres.some((o) => o.slug === slug)) ?? null;
}

/** Comparacions d'un concepte (per al bloc «activitat visual» de la fitxa de concepte). */
export function comparacionsDeConcepte(concepteSlug: string): Comparacio[] {
  return COMPARACIONS.filter((c) => c.concepte === concepteSlug);
}
