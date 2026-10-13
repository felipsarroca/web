// obres/arquitectura.ts — Arquitectura del Renaixement i escoles espanyoles (14 obres)
import type { Obra } from "../types";

export const ARQUITECTURA: Obra[] = [
  {
    slug: "cupula-fiore",
    titol: "Cúpula de Santa Maria del Fiore",
    autorSlug: "brunelleschi",
    autorNom: "Filippo Brunelleschi",
    data: "1420-1436",
    anyInici: 1420, anyFi: 1436,
    tecnica: "Maó i pedra",
    dimensions: "42 m de diàmetre, 114 m d'alçada total",
    ubicacio: { museu: "Catedral de Santa Maria del Fiore (lloc mateix)", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "quattrocento", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "És l'obra que obre el Renaixement: la cúpula més gran construïda des de l'antiguitat, resolta sense bastida central ni plànol previ, amb una doble pell de maó i una maquinària inventada per a l'ocasió. El problema tècnic del segle XV i el símbol de Florència.",
    context:
      "La catedral de Florència portava des de 1296 sense cúpula: el tambor octogonal de 42 metres de diàmetre estava obert al cel des de 1418, i ningú no sabia com cobrir-lo. El 1420 l'Opera del Duomo va convocar un concurs; Brunelleschi, orfebre format a Roma entre les ruïnes antigues, va proposar una solució sense cimbrà (bastida central) que semblava impossible: dues pells de maó, l'una dins de l'altra, construïdes en anells successius que es sostenen entre si. Va guanyar el concurs contra Ghiberti (el seu rival del baptisteri) i va dirigir l'obra fins a la mort, inventant grues, cabrestants i mètodes de fosa per a la llanterna. La cúpula es va acabar el 1436 i la llanterna el 1461.",
    analisi:
      "La solució tècnica és el sistema de la doble pell: una carcassa interna de maó en espina de peix (herringbone) que distribueix les forces, i una carcassa externa de maó i pedra que protegeix i dona forma. Les costelles principals (vuit exteriors i sis internes) són el sistema estructural, i la corba apuntada (no hemisfèrica) redueix les forces laterals. Les obertures del tambor i les finestres de la llanterna il·luminen l'interior, amb els frescos del Judici de Vasari i Zuccari al sostre. La cúpula corona el paisatge urbà de Florència: es veu des de tota la ciutat i des dels turons veïns, i és el marc de referència de totes les vistes renaixentistes.",
    miraHiDeProp: [
      "La pell externa de maó: el patró d'espina de peix (herringbone) és visible des de prop i és el sistema que sustenta els anells.",
      "Les vuit costelles de pedra blanca: són l'esquelet visible de la cúpula i defineixen la forma octogonal.",
      "La llanterna: dissenyada per Brunelleschi, és la corona que il·lumina l'interior i marca el cim del paisatge.",
    ],
    curiositats: [
      "Brunelleschi no va deixar cap plànol ni document tècnic: els constructors han de reedificar el mètode a partir de l'obra mateixa.",
      "La cúpula és la més gran de maó del món: 4 milions de maons, i la fusta de les grues dissenyades per Brunelleschi encara es conserva al Museu dell'Opera del Duomo.",
    ],
    relacionades: ["hospital-innocents", "facade-santa-maria-novella", "basilica-sant-pere"],
    obraFita: true,
    bloc: 4,
  },
  {
    slug: "hospital-innocents",
    titol: "Hospital dels Innocents (pòrtic)",
    autorSlug: "brunelleschi",
    autorNom: "Filippo Brunelleschi",
    data: "des de 1419",
    anyInici: 1419, anyFi: 1445,
    tecnica: "Pedra calcària grisenc (pietra serena) i estuc blanc",
    dimensions: "Facciada de 9 arcs",
    ubicacio: { museu: "Piazza della Santissima Annunziata (lloc mateix)", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "quattrocento", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "Se'l considera el primer edifici renaixentista: un pòrtic d'arcs de mig punt sobre columnes corínties, amb proporcions modulades i la pietra serena grisenca sobre parets blanques que defineix la gramàtica de l'arquitectura florentina durant quatre segles.",
    context:
      "L'Arte della Seta (gremi de la seda) encarrega a Brunelleschi un orfenat (ospedale degli Innocenti) el 1419, com a obra benèfica i com a decoració de la plaça nova de la Santissima Annunziata. El pòrtic, amb nou arcs, defineix la plaça i crea un espai públic cobert per als nens i les famílies. És un dels primers edificis on la perspectiva i la proporció clàssica són el sistema, no el decorat: cada arc, cada columneta, cada rematada està calculada amb un mòdul comú. Els tondos de majòlica blava amb nadons, d'Andrea della Robbia, coronen cada arc.",
    analisi:
      "La gramàtica és clàssica i modulada: cada arc és un semicerc perfecte sobre dues columnes corínties, amb l'entaulament complet (arquitrau, fris, cornisa) i una banyera d'estuc blanc. La pietra serena grisenc dels elements arquitectònics contrasta amb l'estuc blanc de les parets: és la bi-cromia florentina que definiran Alberti i tots els següents. La proporció està modulada: l'alçada de la columna és igual a la meitat de la distància entre eixos dels arcs, i l'espai és matemàticament serè. Els tondos de della Robbia, amb els nadons embolcallats, són l'únic element figuratiu: la resta és puresa arquitectònica.",
    miraHiDeProp: [
      "Els tondos de majòlica d'Andrea della Robbia: cada nadó té una postura diferent i una llum pròpia.",
      "La bi-cromia: pietra serena gris i estuc blanc, la paleta arquitectònica florentina per excel·lència.",
      "La proporció del pòrtic: compteu els arcs i mesureu la distància entre columnes —tot és mòdul.",
    ],
    curiositats: [
      "L'hospital funciona com a orfenat des de 1445 fins a 1996: és l'institució benèfica més antiga en funcionament continuat d'Europa.",
      "Les rodetes de ferro amb el qual les mares deixaven els nadons encara es conserven: era el «tupino», el passarelle anònima d'entrada.",
    ],
    relacionades: ["cupula-fiore", "facade-santa-maria-novella", "palau-rucellai"],
    bloc: 4,
  },
  {
    slug: "facade-santa-maria-novella",
    titol: "Façana de Santa Maria Novella",
    autorSlug: "alberti",
    autorNom: "Leon Battista Alberti",
    data: "1458-1470",
    anyInici: 1458, anyFi: 1470,
    tecnica: "Pedra i marbre",
    dimensions: "Facciada de 34 m d'amplada",
    ubicacio: { museu: "Santa Maria Novella (lloc mateix)", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "quattrocento", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "És la façana teòrica perfecta: Alberti resol el problema de unir una basílica gòtica amb la proporció clàssica mitjançant un sistema de quadrats i la màquina voladora de geometria —el clàssic manat pel raonament, no per la imitació.",
    context:
      "El mercat Giovanni Rucellai, veí de l'església, encarrega a Alberti la remodelació de la façana gòtica de la basílica dominica el 1458, amb la condició de conservar els elements existents (el marbre verd i blanc, els portals, les tombes del costat). Alberti, autor del tractat De re aedificatoria (1452, el primer tractat d'arquitectura des de Vitruvi), resol el problema amb raonament geomètric: una façana enquadernada per un quadrat, amb el pis inferior (el gòtic conservat) i el superior (dissenyat per ell) units per unes volutes de connexió que seran el model de les façanes renaixentistes posteriors.",
    analisi:
      "La composició és un sistema de proporcions: el quadrat de la façana és mòdul de tota la superfície, i les relacions entre parts segueixen el mateix sistema que Alberti explica al tractat. El pis inferior és el gòtic conservat, amb els portals arquejats i el marbre verd i blanc; el pis superior és completament albertià: un àtic amb les volutes de la nau i les volutes laterals que cobreixen la transició (les primeres volutes de la història de les façanes). El remat amb el sol de la família Rucellai corona el conjunt. Les volutes són la solució formal que Palladio, Vignola i tota la tradició acadèmica copiaran per a les façanes de basíliques.",
    miraHiDeProp: [
      "Les volutes laterals: la solució d'Alberti per connectar la nau central amb els passatges laterals, copiada durant quatre segles.",
      "El sol daurat de la família Rucellai al coronament: la signatura del comitent en el lloc exacte.",
      "La proporció de la façana: la relació entre l'àtic i el pis inferior és la mateixa que entre la nau i els passatges laterals.",
    ],
    curiositats: [
      "Alberti mai no va dirigir l'obra: era teòric i matemàtic, no arquitecte pràctic; la realització correspon a un taller local.",
      "Les tombes gòtiques dels costats, conservades per encàrrec del comitent, són els únics elements medievals de la façana acabada.",
    ],
    relacionades: ["palau-rucellai", "sant-andreu-mantua", "cupula-fiore"],
    bloc: 4,
  },
  {
    slug: "palau-rucellai",
    titol: "Palau Rucellai",
    autorSlug: "alberti",
    autorNom: "Leon Battista Alberti",
    data: "aprox. 1452-1470",
    anyInici: 1452, anyFi: 1470,
    tecnica: "Pedra calcària",
    dimensions: "Tres plantes, façana de 80 m",
    ubicacio: { museu: "Via della Vigna Nuova (lloc mateix)", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "quattrocento", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "És el palau renaixentista per excel·lència: tres plantes amb ordres superposats (dòric, jònic, corinti) i una façana de rústica polida que defineix el tipus del palau urbà italià. Alberti transllada el Coliseu de Roma a la via de Florència.",
    context:
      "Giovanni Rucellai, el mercat enriquit que va finançar també la façana de Santa Maria Novella, encarrega a Alberti la remodelació de diverses cases familiars per crear un palau unificat. El tipus de palau florentí (façana de pedra amb tres plantes, pati central, loggia) existia ja (palau Mèdici, palau Pitti), però Alberti hi introdueix la gramàtica clàssica: cada planta té el seu ordre (dòric a baix, jònic al mig, corinti amunt), com el Coliseu, i la rústica polida uneix les plantes amb un ritme continu. És el palau més teòric de Florència: cada element és un article del tractat d'Alberti fet pedra.",
    analisi:
      "La façana es divideix en tres registres horitzontals, cadascú amb el seu ordre clàssic en les pilastres adossades: dòric a la planta baixa (amb el banc i les finestres arquejades), jònic al pis noble (amb les finestres travadades) i corinti a la planta superior. La cornisa corona el conjunt amb un voladís pronunciat. La rústica polida, amb blocs de pedra llisos i finament ajustats, és la materialització de l'ordre i la dignitat: és més refinada que la rústica de qualsevol palau anterior. La proporció entre les tres plantes és exacta: cada pis és una mica més baix que l'inferior, començant des de la planta noble.",
    miraHiDeProp: [
      "Els tres ordres superposats: dòric, jònic i corinti, com al Coliseu de Roma —la citació antiga aplicada a un palau burgès.",
      "La rústica polida: els blocs de pedra llis que donen a la façana un aspecte de vestimenta elegant.",
      "Les finestres travadades del pis noble: la simetria que ordena el ritme de la façana.",
    ],
    curiositats: [
      "El palau és avui un hotel de luxe i un museu: és un dels pocs palaus florentins que manté la funció residencial contínua des del segle XV.",
      "Rucellai va escriure al seu dietari que volia «un palau que fos de gust més magnífic que qualsevol altre de Florència, però sense extravagància».",
    ],
    relacionades: ["facade-santa-maria-novella", "hospital-innocents", "palau-carles-v"],
    bloc: 4,
  },
  {
    slug: "sant-andreu-mantua",
    titol: "Església de Sant Andreu",
    autorSlug: "alberti",
    autorNom: "Leon Battista Alberti",
    data: "des de 1472",
    anyInici: 1472, anyFi: 1790,
    tecnica: "Maó i estuc",
    dimensions: "Facciada de 47 × 18 m",
    ubicacio: { museu: "Piazza Andrea Mantegna (lloc mateix)", ciutat: "Màntua", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "quattrocento", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "És el testament arquitectònic d'Alberti: una façana temple que uneix el pòrtic romà amb l'arc de triomf, i una planta de creu llatina amb una nau de 18 metres d'amplada que acull la relíquia de la Sang de Crist. El primer edifici on la teoria d'Alberti es fa arquitectura total.",
    context:
      "El marquès Ludovico Gonzaga encarrega a Alberti l'església el 1472 per acollir la relíquia de la Sang de Crist, que la tradició feia arribar a Màntua amb un got del sotmetiment de Longí. Alberti, amb 68 anys, dissenya l'edifici complet —façana, planta, interior— però mor dos anys després; l'obra continua segons els seus plànols fins al segle XVIII, amb la cúpula i el cor. La façana temple amb l'arc de triomf és el model que copiaran Vignola, Della Porta i tota la Contrarreforma per a les esglésies urbanes.",
    analisi:
      "La façana és un sistema de proporcions matemàtiques: un pòrtic temple de quatre columnes amb frontó, inserit dins d'una façana de dos pisos amb l'arc de triomf central. Les proporcions estan calculades perquè la façana sigui un quadrat duplicat, amb la relació 1:2 entre els elements. L'interior és una nau única amb capelles laterals, sense passatges: la llum entra de manera uniforme i l'espai és una sala serena, sense la verticalitat gòtica. La cúpula, del segle XVIII, és l'única part que no correspon al disseny d'Alberti (que havia previst una volta de canó).",
    miraHiDeProp: [
      "La façana temple: el frontó clàssic inserit dins de l'arc de triomf és la síntesi de dues tradicions romanes.",
      "La proporció 1:2: cada element de la façana segueix la mateixa relació —comptau els pisos i mesurau.",
      "La nau interior: 18 metres d'amplada sense passatges laterals, la sala més àmplia del Quattrocento.",
    ],
    curiositats: [
      "La relíquia de la Sang de Crist es guarda sota l'altar major, en un criptes d'entrada restringida: és el motiu de peregrinació de l'església des del segle XV.",
      "Alberti va dissenyar l'església sense veure mai l'obra acabada: els plànols es van seguir fidelment fins al segle XVIII.",
    ],
    relacionades: ["facade-santa-maria-novella", "templet-montorio", "palau-rucellai"],
    bloc: 4,
  },
  {
    slug: "templet-montorio",
    titol: "Templet de Sant Pietro in Montorio",
    autorSlug: "bramante",
    autorNom: "Donato Bramante",
    data: "1502",
    anyInici: 1502, anyFi: 1502,
    tecnica: "Trauered travertí",
    dimensions: "8 m de diàmetre, 10,3 m d'alçada",
    ubicacio: { museu: "San Pietro in Montorio (lloc mateix)", ciutat: "Roma", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "cinquecento", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "És el manifest del Cinquecento: un temple circular clàssic de traçat perfecte, amb un perímetre de columnes toscanes i una cúpula, construït sobre el lloc on es creia que sant Pere havia estat crucificat. La primera arquitectura del Cinquecento i el model de tota la tradició del temple centralitzat.",
    context:
      "Els reis catòlics Ferran i Isabel encarreguen a Bramante el templet el 1502 per a la cimera del pati del convent franciscà de San Pietro in Montorio, sobre el lloc tradicional del martiri de sant Pere. Bramante, de Milà, havia estudiat Vitruvi i les ruïnes romanes: el templet és la reconstrucció ideal del temple de Hèrcules Victor, un temple circular perípter romà. És una obra petita (8 metres de diàmetre) però perfecta: cada proporció està calculada amb relacions simples, i l'edifici es pensa per ser vist de manera panoràmica, des de tots els angles.",
    analisi:
      "La planta és circular, amb un perímetre de 16 columnes tosques que sostenen un entaulament dòric complet (triglifs i metopes) i una cúpula semiesfèrica amb llanterna. La proporció és exacta: la relació entre el diàmetre i l'alçada és la mateixa que entre l'espai interior i l'exterior. L'edifici està pensat per ser observat des de totes les perspectives: cada angle és una composició completa, sense davant ni darrere. El subsòl té una cripta circular amb el lloc del martiri, i l'edifici té una doble escala: és un monument que és també un observatori del paisatge de Roma.",
    miraHiDeProp: [
      "Les 16 columnes tosques: l'entaulament dòric amb triglifs és la cita exacta dels temples romans.",
      "La proporció entre la cúpula i la base: cada element segueix relacions simples 1:2 i 1:3.",
      "La balustrada superior: el punt de mira que ofereix una vista panoràmica de Roma, pensada per Bramante.",
    ],
    curiositats: [
      "És la primera obra de Bramante a Roma, que li obre les portes del projecte de sant Pere (1506): el templet és el prototip reduït de la gran basílica.",
      "L'edifici és tan petit que sembla una maqueta: és el prototip idealitzat, no una construcció funcional.",
    ],
    relacionades: ["basilica-sant-pere", "sant-andreu-mantua", "rotonda"],
    obraFita: true,
    bloc: 4,
  },
  {
    slug: "basilica-sant-pere",
    titol: "Basílica de sant Pere (plantes i cúpula)",
    autorSlug: "bramante",
    autorNom: "Bramante i Miquel Àngel",
    data: "1506-1626",
    anyInici: 1506, anyFi: 1626,
    tecnica: "Travertí, maó i estuc",
    dimensions: "Cúpula de 42 m de diàmetre, 136 m d'alçada",
    ubicacio: { museu: "Ciutat del Vaticà (lloc mateix)", ciutat: "Ciutat del Vaticà", pais: "Vaticà", url: "https://www.museivaticani.va" },
    disciplina: "arquitectura", periode: "cinquecento", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "És l'obra més gran del Renaixement i l'església més important del cristianisme: planta centralitzada de Bramante, convertida en creu llatina per Miquel Àngel, amb la cúpula més famosa del món. Dos dels majors arquitectes de la història van treballar-hi; vint arquitectes més hi van morir abans d'acabar-la.",
    context:
      "Juli II encarrega la nova basílica el 1506 per substituir la basílica constantiniana, de mil anys d'antiguitat. Bramante dissenya una planta de creu grega (quatre braços iguals) amb una cúpula central, i comença la demolició de l'antiga basílica. El projecte passa per diverses mans: Rafael (que proposa una planta de creu llatina), Peruzzi, Sangallo el Jove (que dissenya un model gegant de fusta conservat avui). Miquel Àngel, nomenat el 1547 amb 72 anys, fa la síntesi: recupera la planta centralitzada de Bramante, dissenya el tambor i la cúpula, i mor el 1564 deixant-la gairebé acabada. Della Porta la corona el 1590, i la nau i la façana (Maderno, Bernini) s'acaben el 1626.",
    analisi:
      "La planta final és una síntesi: la creu grega de Bramante, amb quatre braços iguals i capelles als cantons, modificada per Miquel Àngel amb un pòrtic afegit al davant (finalment, per Maderno). La cúpula de Miquel Àngel és la síntesi del sistema: tambor amb 16 finestres i 16 costelles de travertí, cúpula ovoïda de doble pell, llanterna amb llum central. La proporció és majestuosa: la cúpula és tan alta com la de Brunelleschi, però més àmplia, i el tambor eleva-la sobre el paisatge de Roma. L'interior és una sala de proporcions matemàtiques: cada detall està calculat perquè la llum, l'espai i el so funcionin com una unitat.",
    miraHiDeProp: [
      "La cúpula de Miquel Àngel: les 16 costelles de travertí i la llanterna corona el paisatge de Roma des de qualsevol angle.",
      "El tambor: les 16 finestres donen llum a l'interior i fan que la cúpula sembli surada.",
      "La plaça de Bernini: els dos braços de colones que envolten la plaça són un afegit barroc del segle XVII.",
    ],
    curiositats: [
      "La basílica va trigar 120 anys a construir-se: hi van treballar almenys dotze arquitectes principals, des de Bramante fins a Bernini.",
      "El model de fusta de Sangallo, de 6 metres, és el document del projecte mai realitzat: és una obra d'art en si mateixa, al Musei Vaticani.",
    ],
    relacionades: ["templet-montorio", "cupula-fiore", "placa-capitoli"],
    obraFita: true,
    bloc: 4,
  },
  {
    slug: "placa-capitoli",
    titol: "Plaça del Capitoli (Piazza del Campidoglio)",
    autorSlug: "miquel-angel",
    autorNom: "Miquel Àngel Buonarroti",
    data: "des de 1536",
    anyInici: 1536, anyFi: 1650,
    tecnica: "Travertí i marbre",
    dimensions: "Plaça oval de 79 × 40 m",
    ubicacio: { museu: "Turó del Capitoli (lloc mateix)", ciutat: "Roma", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "manierisme", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "Se'l considera el primer espai urbà dissenyat com una unitat escultòrica: Miquel Àngel ordena tres palaus al voltant d'una plaça ovalada amb una estàtua al centre, i defineix el model de «plaça renaixentista» que seguirà l'urbanisme europeu durant segles.",
    context:
      "El papa Pau IV i el senat romà encarreguen a Miquel Àngel la remodelació del Capitoli el 1536, quan Carles V visitava Roma: el turó sagrat de l'antiga Roma, on hi havia el temple de Júpiter, estava en estat d'abandonament. Miquel Àngel gira l'orientació de la plaça (que abans mirava el Fòrum) cap a l'església de sant Pere, dissenya les dues façanes dels palaus del Senat i dels Museus, i col·loca al centre l'estàtua eqüestre de Marc Aureli, traslladada de la piazza d'Aracoeli. L'obra continua fins al segle XVII segons els seus plànols; el paviment oval, dissenyat per ell, no es fa fins a 1940.",
    analisi:
      "La composició és una coreografia arquitectònica: la plaça ovalada, amb el paviment dissenyat com una estrella incrustada, envolta l'estàtua eqüestre de Marc Aureli, que és el centre exacte. Els tres palaus (el Senat, amb la torre i les escales del davant; el Palazzo dei Conservatori i el Palazzo Nuovo, amb façanes idèntiques) formen un teatre obert cap a l'oest, amb la vista de la ciutat moderna. L'ordre gegant (columnes de dues plantes d'alçada) és la innovació d'Miquel Àngel: fa que les façanes tinguin una unitat monumental nova. Les escales d'accés (cordonata) són dissenyades perquè la cavalleria pugui pujar: cada esglaó és prou ample per a un cavall.",
    miraHiDeProp: [
      "El paviment oval: l'estrella de travertí incrustada al basalt, dissenyada per Miquel Àngel, s'executa el 1940 segons els plànols originals.",
      "L'ordre gegant: les columnes que travessen dues plantes són la innovació que definirà l'arquitectura barroca.",
      "L'estàtua eqüestre de Marc Aureli (una còpia; l'original és als Museus Capitolins): el centre exacte de la coreografia urbana.",
    ],
    curiositats: [
      "La cordonata del davant és tan ampla que Carles V va pujar a cavall fins a la plaça el 1536: l'urbanisme al servei de la cerimònia.",
      "El Palazzo Nuovo, dissenyat per Miquel Àngel, és un dels dos edificis que tanquen la plaça; els Museus Capitolins, el museu més antic del món (1471), hi tenen la seu.",
    ],
    relacionades: ["basilica-sant-pere", "cambra-esposats", "perseu-cellini"],
    bloc: 4,
  },
  {
    slug: "rotonda",
    titol: "Vil·la Capra «La Rotonda»",
    autorSlug: "palladio",
    autorNom: "Andrea Palladio",
    data: "1566-1571",
    anyInici: 1566, anyFi: 1571,
    tecnica: "Estuc i maó",
    dimensions: "Façades de 30 × 30 m",
    ubicacio: { museu: "Via della Rotonda (lloc mateix)", ciutat: "Vicenza", pais: "Itàlia" },
    disciplina: "arquitectura", periode: "manierisme", ambit: "italia",
    escola: "italiana",
    concepts: [],
    relevancia:
      "És l'edifici més imitat de la història de l'arquitectura: una vil·la suburbana amb planta central quadrada, cúpula i quatre pòrtics temple idèntics, pensada per ser observada des de tots els angles com una escultura habitable. Tota l'arquitectura neoclàssica d'Europa i d'Amèrica deriva d'aquesta vil·la.",
    context:
      "Palladio, nascut al nord d'Itàlia (el seu nom real, Andrea di Pietro, fou italianitzat per l'humanista Trissino), dissenya la vil·la per al premonarque Paolo Almerico el 1566, al davant de la ciutat de Vicenza. La planta és un quadrat perfecte amb un saló central circular, i les quatre façanes tenen pòrtics temple idèntics amb escales amples i frontons. Palladio el descriu als seus Quattro Libri dell'Architettura (1570), el tractat més influent de la història de l'arquitectura; la vil·la es copia a Anglaterra, França, Alemanya i Amèrica (la Casa Blanca, Monticello).",
    analisi:
      "La planta és una síntesi perfecta: un quadrat central amb un saló circular, envoltat per habitacions de proporcions variades però ordenades, i quatre pòrtics temple idèntics que fan de la vil·la un edifici complet des de qualsevol punt de vista. Les escales amples (cada pòrtic té una escala de múltiples graons) connecten l'edifici amb el paisatge dels turons de Vicenza. El saló central, amb la cúpula, és el cor de la casa: la llum entra per les finestres i l'espai és una unitat serena. La proporció és exacta: cada habitació segueix relacions matemàtiques (1:1, 1:2, 1:3, 2:3) que Palladio explica al tractat.",
    miraHiDeProp: [
      "Els quatre pòrtics temple: cada façana és idèntica i completa —l'edifici no té davant, és una escultura habitable.",
      "El saló central circular: la cúpula que ilumina des de dalt és el cor de la planta quadrada.",
      "Les escales amples: el pòrtic temple portat a escala domèstica, amb graons que fan de la casa un escenari.",
    ],
    curiositats: [
      "Palladio no va veure la vil·la acabada: mor el 1580 i l'edifici es completa segons els plànols; el nom «La Rotonda» ve del saló circular.",
      "És l'edifici més copiat de la història: la Casa Blanca de Washington, Monticello de Jefferson, el Panteó de París i milers d'edificis neoclàssics són descendents directes.",
    ],
    relacionades: ["templet-montorio", "basilica-sant-pere", "chambord"],
    obraFita: true,
    bloc: 4,
  },
  {
    slug: "universitat-salamanca",
    titol: "Façana de la Universitat de Salamanca",
    autorSlug: "anonim",
    autorNom: "Anònim",
    data: "aprox. 1515-1533",
    anyInici: 1515, anyFi: 1533,
    tecnica: "Pedra arenisca daurada (Villamayor)",
    dimensions: "Facciada de 30 × 30 m",
    ubicacio: { museu: "Patio de Escuelas Mayores (lloc mateix)", ciutat: "Salamanca", pais: "Espanya" },
    disciplina: "arquitectura", periode: "quattrocento", ambit: "espanya",
    escola: "plateresca",
    concepts: [],
    relevancia:
      "És el manifest de l'escola plateresca: una façana tractada com un retaule d'argent, amb dos pisos de decoració minuciosa que fusiona el gòtic flamíger, els motius clàssics i l'heràldica dels Reis Catòlics. És la cara més famosa de l'educació espanyola del Renaixement.",
    context:
      "La Universitat de Salamanca, fundada el 1218, és la més antiga d'Espanya i una de les més prestigioses d'Europa. El 1411 el papa Benet XIII atorga les càtedres de teologia i dret; el 1415 es comença el nou edifici d'escoles majors, acabat el 1433. La façana actual es pinta entre 1515 i 1533, en el moment de màxima esplendor de la universitat, quan hi ensenyen els humanistes espanyols i els reformadors europeus. La decoració combina els emblemes dels Reis Catòlics (el jou i les fletxes, la granada), els escuts de Carles I, i un programa iconogràfic de temes clàssics i bíblics.",
    analisi:
      "La façana es divideix en tres pisos horitzontals, cadascú amb un registre decoratiu complet: el pis inferior amb els escuts dels Reis Catòlics i les fletxes; el pis mitjà amb l'escut imperial de Carles I i les fletxes; el pis superior amb el papa, els bisbes i els sants universitaris. Els elements platerescos són els detalls: candelers, grutescs, medallons, baldaquins, figures grotesques, inscripcions llatines. La pedra daurada de Villamayor, amb la seva textura suau, fa que la decoració sembli treballada a l'argent: d'aquí el nom de plateresca. La porta central, amb els timpans tallats, és l'element més ric: un baldaquí amb els escuts i un programa iconogràfic complet.",
    miraHiDeProp: [
      "La raneta amb la granada: el símbol dels Reis Catòlics, amb el jou i les fletxes, es repeteix a tota la façana.",
      "Els candelers i grutescs dels pisos superiors: la decoració minuciosa a manera d'obra d'argent és la marca plateresca.",
      "La pedra daurada de Villamayor: la textura suau que fa que la façana canviï de color amb la llum del dia.",
    ],
    curiositats: [
      "La llegenda estudiantil diu que cal trobar la granada amagada entre els ornaments per aprovar l'any: és la tradició més famosa de la universitat.",
      "La façana és el document visual més complet del programa polític dels Reis Catòlics: cada emblema és una afirmació del poder reial sobre l'educació.",
    ],
    relacionades: ["palau-carles-v", "escorial", "palau-rucellai"],
    obraFita: true,
    bloc: 4,
  },
  {
    slug: "palau-carles-v",
    titol: "Palau de Carles V",
    autorSlug: "machuca",
    autorNom: "Pedro Machuca",
    data: "des de 1527",
    anyInici: 1527, anyFi: 1957,
    tecnica: "Pedra calcària",
    dimensions: "Plaça de 63 m de costat, pati circular de 30 m",
    ubicacio: { museu: "Alhambra (lloc mateix)", ciutat: "Granada", pais: "Espanya", url: "https://www.alhambra-patronato.es" },
    disciplina: "arquitectura", periode: "cinquecento", ambit: "espanya",
    escola: "classicista",
    concepts: [],
    relevancia:
      "És el manifest de l'escola classicista espanyola: una planta quadrada amb un pati circular, façana d'arc romà i ordres superposats, construït dins de l'Alhambra nassarita com a declaració del nou imperi sobre l'antic. L'edifici més pur i més discutit del Renaixement espanyol.",
    context:
      "Carles V, després del seu casament amb Isabel de Portugal a Sevilla el 1526, decideix construir un palau reial permanent a Granada, la ciutat conquerida el 1492. Encarrega l'obra a Pedro Machuca, un pintor toledà format a Itàlia (segles després es descobriria que va treballar amb Giulio Romano a Màntua). El palau s'insereix dins del recinte de l'Alhambra, davant del palau nassarita de Comares, com a declaració política: l'imperi cristià sobre el palau musulmà. L'obra queda inacabada al segle XVII i no es cobreix fins al 1957.",
    analisi:
      "La planta és un quadrat amb un pati circular, una solució geomètrica pura que és el document teòric del classicisme espanyol: l'ordre (quadrat) envolta la rotació (cercle), com a l'ideal platònic. La façana exterior és un arc de triomf romà: dos pisos amb ordres superposats (dòric a la planta baixa, jònic al pis noble), amb el mateix sistema de rústiques i finestres travadades. El pati circular és l'obra mestra: dues galeries d'ordres superposats envolten l'espai circular, amb la llum que entra de manera uniforme. És la primera construcció espanyola que segueix la teoria d'Alberti i Bramante amb rigor total, sense elements de tradició local.",
    miraHiDeProp: [
      "El pati circular: dues galeries d'ordres superposats (dòric i jònic) envolten l'espai circular, amb la llum uniforme.",
      "La façana d'arc de triomf: el pòrtic romà amb dos pisos és la declaració de l'imperi nou sobre l'antic.",
      "El contrast amb l'Alhambra: la pedra llisa i la geometria clàssica contra la filigrana nassarita és la lectura política de l'edifici.",
    ],
    curiositats: [
      "El palau queda sense cobrir durant 330 anys: l'interior es manté obert al cel fins a la restauració de 1957, quan es cobreix amb un sostre modern.",
      "Machuca era pintor de formació, no arquitecte: l'atribució del disseny s'ha discutit, però els documents del patronat confirmen la seva autoria.",
    ],
    relacionades: ["universitat-salamanca", "escorial", "palau-rucellai"],
    obraFita: true,
    bloc: 4,
  },
  {
    slug: "escorial",
    titol: "Monestir de Sant Llorenç de l'Escorial",
    autorSlug: "herrera",
    autorNom: "J. B. de Toledo i Juan de Herrera",
    data: "1563-1584",
    anyInici: 1563, anyFi: 1584,
    tecnica: "Granit gris",
    dimensions: "207 × 161 m",
    ubicacio: { museu: "San Lorenzo de El Escorial (lloc mateix)", ciutat: "San Lorenzo de El Escorial", pais: "Espanya" },
    disciplina: "arquitectura", periode: "cinquecento", ambit: "espanya",
    escola: "herreriana",
    concepts: [],
    relevancia:
      "És el monument més gran del Renaixement espanyol i el manifest de l'escola herreriana: un reticle de granit de 207 × 161 metres, amb torres, patis i la basílica al centre, sense cap element decoratiu superflu. Felip II hi va construir el palau, el monestir, el panteó reial i la biblioteca: és el centre de poder més important del seu imperi.",
    context:
      "Felip II encarrega el monestir el 1563 per commemorar la victòria de Sant Quintí (1557, dia de sant Llorenç) i per construir el panteó dels reis d'Espanya. Juan Bautista de Toledo, arquitecte format a Itàlia (a Nàpols i Roma, amb Sangallo) dissenya el projecte general; mor el 1567 i el seu deixeble Juan de Herrera el substitueix i desenvolupa el llenguatge auster que porta el seu nom. Felip II, que va residir-hi els últims anys de la seva vida, supervisava cada detall: és el projecte arquitectònic més personal d'un monarca europeu. L'edifici inclou el monestir jerònim, la basílica, el palau reial, el panteó dels reis, la biblioteca, el col·legi i milers d'espais secundaris.",
    analisi:
      "El conjunt és un reticle ordenat: quatre façanes de granit gris, amb torres a les cantonades i un ritme de finestres idèntic que dona a l'edifici una austeritat monumental. La basílica, al centre, té una cúpula de tambor sobre tambor, amb dues torres campanar als costats. El pati dels Reis, el claustre major i el pati dels Evangelistes són els espais de circulació, amb el detall arquitectònic mínim: cap filigrana, cap grutesc, cap color més que el gris del granit i el blanc de la llum. La biblioteca, dissenyada per Herrera, és anomenada sovint la primera biblioteca reial moderna: els frescos del sostre (Tibaldi) i les prestatgeries de fusta fan de la sala un espai enciclopèdic. És la síntesi de l'ordre matemàtic de Vitruvi aplicada a escala imperial.",
    miraHiDeProp: [
      "La façana principal: el ritme de finestres idèntiques i les torres de les cantonades fan de l'edifici un reticle matemàtic.",
      "La cúpula de la basílica: el tambor sobre tambor és la síntesi del llenguatge herreria.",
      "La biblioteca: els frescos del sostre i les prestatgeries de fusta s'han presentat com la primera biblioteca moderna d'Europa.",
    ],
    curiositats: [
      "Felip II va triar el lloc personalment, a 45 km de Madrid, perquè el clima era saludable i l'entorn era silenciós; va residir-hi els últims anys de la seva vida i hi va morir el 1598.",
      "El panteó dels reis, sota l'altar major, acull els sobirans espanyols des de Carles V: és el centre simbòlic de la monarquia espanyola fins avui.",
    ],
    relacionades: ["universitat-salamanca", "palau-carles-v", "basilica-sant-pere"],
    obraFita: true,
    bloc: 4,
  },
  {
    slug: "chambord",
    titol: "Castell de Chambord",
    autorSlug: "anonim",
    autorNom: "Obra de la corona (trad. Domenico da Cortona)",
    data: "1519-1547",
    anyInici: 1519, anyFi: 1547,
    tecnica: "Pedra calcària blanca (tuffeau)",
    dimensions: "156 m de façana, 440 habitacions",
    ubicacio: { museu: "Dominis reials de Chambord (lloc mateix)", ciutat: "Chambord", pais: "França" },
    disciplina: "arquitectura", periode: "cinquecento", ambit: "franca",
    escola: "francesa",
    concepts: [],
    relevancia:
      "És el castell més gran de la vall del Loira i el manifest del Renaixement francès: un cos de castell medieval amb l'ala italiana (pòrtics, loggies, escales) i una escala de doble hèlix atribuïda a Leonardo. La síntesi de dues tradicions que defineix el Renaixement fora d'Itàlia.",
    context:
      "Francesc I comença Chambord el 1519, dos anys després de portar Leonardo a França: és el castell de caça i la declaració de poder del rei que ha vist els palaus italians. La tradició francesa atribueix el disseny a Domenico da Cortona, un arquitecte florentí al servei de la corona; els historiadors discuteixen la participació de Leonardo, que vivia a Amboise fins a la seva mort el 1519 i va dissenyar el projecte d'escala central de doble hèlix per al castell de Romorantin. L'obra triga 28 anys i s'acaba el 1547, any de la mort del rei: és el projecte més ambiciós de la corona francesa del segle.",
    analisi:
      "El cos central és un quadrat amb quatre torres a les cantonades i un mur de cortina, amb el sistema defensiu medieval (fossats, torres, matacans) conservat com a estètica. La coberta és una selva de xemeneies, llanternes i torretes que sembla una ciutat: és la «ciutat de la corona» que els contemporanis descrivien. El pòrtic d'entrada, amb les loggies i els frontons, és l'element italià: un temple renaixentista inserit dins d'un castell francès. L'escala central de doble hèlix (la més famosa del castell) fa que dues persones puguin pujar sense creuar-se mai: és la solució atribuïda a Leonardo, encara discutida. Les 440 habitacions i els 84 apartaments fan de Chambord la residència més gran de la corona francesa.",
    miraHiDeProp: [
      "L'escala de doble hèlix: dos espirals concèntrics al voltant d'un eix central, que fan que dues persones puguin pujar i baixar sense veure's.",
      "La coberta: la selva de xemeneies i llanternes és una ciutat imaginària que els contemporanis descrivien amb meravella.",
      "El pòrtic d'entrada: el temple italià amb frontons i loggies dins d'un castell medieval francès.",
    ],
    curiositats: [
      "Francesc I només va viure a Chambord 42 dies en tota la seva vida: el castell era una declaració de poder més que una residència.",
      "L'escala de doble hèlix és l'atribució més famosa de Leonardo a la construcció, tot i que no hi ha cap document que la confirmi.",
    ],
    relacionades: ["fontainebleau", "rotonda", "retrat-francesc-i"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "fontainebleau",
    titol: "Palau de Fontainebleau",
    autorSlug: "anonim",
    autorNom: "Gilles Le Breton; Rosso i Primaticcio",
    data: "des de 1528",
    anyInici: 1528, anyFi: 1630,
    tecnica: "Pedra i estuc",
    dimensions: "Pati del Cavall blanc, galeria Francesc I",
    ubicacio: { museu: "Palau de Fontainebleau (lloc mateix)", ciutat: "Fontainebleau", pais: "França" },
    disciplina: "arquitectura", periode: "cinquecento", ambit: "franca",
    escola: "francesa",
    concepts: [],
    relevancia:
      "És la seu de l'Escola de Fontainebleau, el principal centre de difusió del Renaixement italià a França: arquitectura francesa, decoració italiana (Rosso Fiorentino, Primaticcio) i un programa que defineix el gust de la cort francesa durant un segle. La galeria de Francesc I és el primer interior renaixentista complet de França.",
    context:
      "Francesc I decideix reconstruir Fontainebleau el 1528, després del seu captiveri a Espanya, com a seu de caça i com a palau alternatiu a París. Encarrega l'obra a Gilles Le Breton, arquitecte francès, però porta de Roma dos pintors italians: Rosso Fiorentino (1529) i Primaticcio (1532), que treballen amb tallers de francesos i flamencs. L'Escola de Fontainebleau és el resultat: un estil decoratiu italià (grutescos, estucs, marcs arquitectònics pintats) aplicat a interiors francesos, amb pintures al·legòriques i mitològiques. La galeria de Francesc I (1530-1535), decorada per Rosso, és considerat el primer interior completament renaixentista de França.",
    analisi:
      "L'arquitectura és francesa: patis de tradició medieval, sostres alts, finestres travades, materials locals. La decoració és italiana: la galeria de Francesc I és un sistema de marcs arquitectònics pintats i estucs daurats que envolten pintures al·legòriques de Rosso, amb una unitat total entre arquitectura, pintura i escultura. Els grutescos són la marca italiana: figures fantàstiques, candelers, mascarons que cobreixen cada superfície. El pati del Cavall blanc, amb l'escala de ferradura, és el teatre de la cort: va ser el lloc de recepció de Carles V el 1539 i d'abdicació de Napoleó el 1814.",
    miraHiDeProp: [
      "La galeria de Francesc I: els marcs arquitectònics pintats i els estucs daurats de Rosso són el primer interior renaixentista complet de França.",
      "Els grutescos: la decoració fantàstica italiana que cobreix cada superfície és la marca de l'Escola.",
      "L'escala de ferradura: el teatre de la cort, on Carles V va entrar el 1539 i Napoleó es va acomiadar de la vella guàrdia el 1814.",
    ],
    curiositats: [
      "L'Escola de Fontainebleau és el primer cas documentat de taller internacional: italians, francesos i flamencs treballen sota el mateix programa decoratiu.",
      "El palau conserva el mobiliari i la decoració del segle XVI: és el palau francès més completament decorat del Renaixement, millor conservat que Chambord.",
    ],
    relacionades: ["chambord", "retrat-francesc-i", "noces-cana"],
    bloc: 6,
  },
];
