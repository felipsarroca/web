// conceptes.ts — Fitxes de concepte (bloc 3 i model 4.3 de la programació):
// 12 de pintura i escultura i 4 d'arquitectura (grup "arquitectura").
import type { Concepte } from "./types";

export const CONCEPTES: Concepte[] = [
  {
    slug: "perspectiva-lineal",
    nom: "Perspectiva lineal",
    definicio:
      "Sistema geomètric que representa la profunditat sobre una superfície plana fent convergir totes les ortogonals en punts de fuga situats a la línia d'horitzó, a l'altura de l'ull de l'espectador.",
    explicacio:
      "La perspectiva lineal (o geomètrica) és una convenció matemàtica, no una imitació de la vista: el món no té punts de fuga, però la pintura renaixentista decideix representar-lo com si l'espai fos un sòlid mesurable. El mecanisme té tres peces: la línia d'horitzó, que se situa a l'altura dels ulls de l'espectador i defineix tot el que és vist des de dalt o des de baix; el punt o els punts de fuga, cap on convergixen les línies ortogonals (les paral·leles del món real que s'allunyen de nosaltres); i la quadrícula o cadratura, la graella del paviment que mesura el recés de cada element. Brunelleschi en fa la demostració experimental cap a 1415 amb miralls davant del baptisteri de Florència; Masaccio l'aplica per primera vegada a un fresc monumental a la Santíssima Trinitat; Alberti la escriu com a sistema a De pictura (1435); Piero della Francesca la fa objecte d'un tractat complet (De prospectiva pingendi). Resultat: l'espai del quadre esdevé racional, mesurable i comprovat per l'espectador, que se sent dins de l'escena perquè el quadre està construït amb el seu mateix punt de vista.",
    exemplarPrincipal: "trinitat-masaccio",
    zonaExemplar: "els cassetons de la volta i les arestes de les cornises: si les prolongues, convergeixen a l'altura de la plataforma on s'agenollen els donants, al peu de la creu",
    exemplarsSecundaris: ["escola-atenes", "desposoris-verge", "flagellacio-piero", "ultim-sopar"],
    confusions: [
      { amb: "Perspectiva aèria", diferencia: "La perspectiva lineal és geometria (línia, mesura, punts de fuga); la perspectiva aèria és color i atmosfera (dessaturació i contorns difusos a mesura que les coses s'allunyen). Es poden donar juntes en el mateix quadre." },
      { amb: "Escorç", diferencia: "L'escorç és la representació d'un cos en posició obliqua o curta (un peu de front, un cos des dels peus); és una aplicació concreta de la perspectiva, no el sistema complet." },
    ],
    relacionats: ["perspectiva-aeria", "escorc", "composicio-piramidal"],
  },
  {
    slug: "perspectiva-aeria",
    nom: "Perspectiva aèria",
    definicio:
      "Convenció que simula l'efecte de l'atmosfera sobre la visió: com més lluny és una cosa, més es dessatura el color, més es refreda el to, més es perd la nitidesa del contorn.",
    explicacio:
      "La perspectiva aèria (o atmosfèrica) no es dibuixa: es pinta. On la perspectiva lineal ordena l'espai amb geometria, l'aèria descriu com la capa d'aire modifica el que veiem a distància. Leonardo la formula amb claredat als seus quaderns: els colors a llunyania s'aproximen al blau de l'atmosfera, els contorns es difuminen i les parts menys il·luminades es perden primer. La prova és observar qualsevol serralada: els turons propers són verds i nítids; els llunyans, blaus i difusos. A la pintura renaixentista apareix primer als fons flamenca (la serralada de Van Eyck darrere dels Arnolfini) i es fa sistema a Itàlia amb Leonardo: la Gioconda, la Verge de les roques, i darrere d'ells tota la pintura del Cinquecento. Bruegel n'és el mestre nòrdic: a Caçadors a la neu el paisatge perd color en capes successives fins als turons blancs de l'horitzó. La lliçó didàctica és doble: és una tècnica concreta i verificable, i és una manera de pensar la pintura com a física de la llum, no només com a dibuix.",
    exemplarPrincipal: "gioconda",
    zonaExemplar: "el paisatge del fons: compareu la nitidesa de les roques del primer pla amb el blau verdós de les serralades llunyanes",
    exemplarsSecundaris: ["cacadors-neu", "verge-roques", "torre-babel", "vista-toledo"],
    confusions: [
      { amb: "Perspectiva lineal", diferencia: "Lineal: geometria dels punts de fuga. Aèria: física del color i l'atmosfera. Un quadre pot usar les dues alhora (l'Escola d'Atenes ho fa)." },
      { amb: "Sfumato", diferencia: "El sfumato és la tècnica de difuminar les transicions tonals (una cara sense contorns); la perspectiva aèria afecta els objects llunyans del paisatge. El sfumato pot aplicar-se sense paisatge; la perspectiva aèria no és sfumato." },
    ],
    relacionats: ["perspectiva-lineal", "sfumato", "clarobscur"],
  },
  {
    slug: "sfumato",
    nom: "Sfumato",
    nomItalic: true,
    definicio:
      "Tècnica de Leonardo: fumar el color, difuminar les transicions entre llum i ombra sense línies dures, fins que els contorns desapareixen i la forma emergeix com de la boira.",
    explicacio:
      "La paraula ve del fum: com la boira, el sfumato no té vores. Leonardo el descriu com el remat del pintor: «els contorns i les parts no arrodonides de qualsevol objecte, si es miren de prop, seran confuses i incertes; per això defineix-les amb judici i amb mans en fum». Tècnicament consisteix en capes molt primes de pintura translúcida superposades (veladures), cada una una ombra imperceptible; amb desenes d'aquestes capes, la transició entre llum i foscor és contínua, sense salt. L'aplicació més famosa és la cara de la Gioconda: els racons dels ulls i de la boca —els músculs de l'expressió— no tenen contorn definit, i per això el somriure sembla canviar segons on mirem. El sfumato no és només tècnica: és psicologia. Leonardo descobreix que l'expressió humana és ambigua per naturalesa, i el pintor que difumina els límits deixa l'espectador completar el gest. Com a terme, no confondre amb el general «efecte boira»: és un mètode de capes, pacient i calculat, que només l'oli permet.",
    exemplarPrincipal: "gioconda",
    zonaExemplar: "els racons dels ulls i de la boca: tapau una banda i mireu l'altra per veure com el somriure depèn de la zona observada",
    exemplarsSecundaris: ["verge-roques", "dama-ermini", "madonna-granduca"],
    confusions: [
      { amb: "Clarobscur", diferencia: "El clarobscur crea contrast: llums fortes contra ombres fortes per donar volum i drama. El sfumato suavitza: elimina les línies de transició. Leonardo usa els dos, però són maneres oposades de tractar la llum." },
      { amb: "Perspectiva aèria", diferencia: "La perspectiva aèria afecta el paisatge llunyà; el sfumato, les figures i els seus contorns. Una cara sfumatada no és pas un paisatge atmosfèric." },
    ],
    relacionats: ["clarobscur", "perspectiva-aeria", "oli-tempera"],
  },
  {
    slug: "clarobscur",
    nom: "Clarobscur",
    definicio:
      "Contrast fort de llums i ombres per donar volum a les figures i drama a l'escena: la llum es converteix en l'eina que modela el cos i narra la història.",
    explicacio:
      "El clarobscur (de clar i obscur) és la manera renaixentista de tractar la llum com a protagonista. Naix quan Masaccio pinta les seves figures amb una única llum coherent —com si el sol entrés per la finestra real de la capella— i projectés ombres al terra: el cos sencer s'omple de volum, no de línia. El seu desenvolupament passa per tres fases: al Quattrocento és modelatge (donar pes i volum amb contrastos mesurats, com a la Brancacci); amb Leonardo, el contrast es suavitza cap al sfumato; amb Miquel Àngel del Judici Final i amb El Greco, es fa dramatisme: la llum no descriu, decideix —il·lumina allò que importa i ténye la resta. A l'escultura, el clarobscur és el comportament de la llum sobre el material: bronze polit, marbre translúcid i fusta policromada responen a la llum de maneres completament diferents, i els escultors ho saben. La lliçó per a l'aula és simple: mireu d'on ve la llum del quadre i pregunteu-vos per què el pintor l'hi ha posat allà.",
    exemplarPrincipal: "tribut-sant-pere",
    zonaExemplar: "els cossos dels apòstols i les ombres projectades al terra: la llum ve de l'esquerra i cada figura en té el volum coherent",
    exemplarsSecundaris: ["judici-final", "expulsio-paradis", "assumcio-frari", "cavaller-ma-pit"],
    confusions: [
      { amb: "Sfumato", diferencia: "Contrast (clarobscur) versus difusió (sfumato): maneres oposades de tractar la transició llum-ombra. El Judici Final és clarobscur; la cara de la Gioconda, sfumato." },
      { amb: "Tenebrisme", diferencia: "El tenebrisme és el clarobscur extrem del Barroc (Caravaggio): fons completament negre i figures il·luminades com per un focus. El Renaixement no el practica: els seus foscos sempre tenen detalls visibles." },
    ],
    relacionats: ["sfumato", "escorc", "fresc"],
  },
  {
    slug: "escorc",
    nom: "Escorç",
    definicio:
      "Representació d'un cos en posició obliqua o curta (un peu de front, un braç endinsat, un cos vist des dels peus) per suggerir profunditat i moviment dins de l'espai pintat.",
    explicacio:
      "L'escorç (de l'italià scorcio, tall curt) és l'exercici de virtuosisme de la perspectiva aplicat al cos humà: com pintar un peu que surt cap a l'espectador, o un cos mort vist des dels peus, sense que sembli deformit. Exigeix conèixer l'anatomia en tres dimensions i projectar-la sobre el pla amb rigor. Els grans documents del Renaixement: el Crist mort de Mantegna (el cos vist des dels peus, amb les plantes com a centre emocional), el David de Donatello i de Miquel Àngel (cossos amb els peus en diagonal), la Volta de la Sixtina (figures vistes des de 20 metres avall, amb correccions calculades) i els ambaixadors de Holbein (l'anamorfosi del crani és l'escorç portat a l'extrem). A l'escultura, l'escorç és el comportament de la figura quan l'espectador camina: el rapte de les sabines de Giambologna és una escultura que és tota d'escorços, perquè cada angle és diferent. La regla didàctica: quan una figura us sembli «curta» o «estranya», pregunteu-vos des de quin punt de vista està construida.",
    exemplarPrincipal: "crist-mort-mantegna",
    zonaExemplar: "els peus de Crist: el cos complet està comprimit en diagonal i les plantes, amb les ferides, són el centre",
    exemplarsSecundaris: ["judici-final", "cambra-esposats", "rapte-sabines", "ambaixadors"],
    confusions: [
      { amb: "Contrapposto", diferencia: "El contrapposto és una postura (pes en una cama); l'escorç és un punt de vista (veure el cos en curt). Un David té contrapposto; un cos vist des dels peus és escorç." },
      { amb: "Perspectiva lineal", diferencia: "La perspectiva lineal ordena l'espai de l'escena; l'escorç és la deformació calculada d'un cos dins d'aquell espai. És l'aplicació al cos de la mateixa geometria." },
    ],
    relacionats: ["perspectiva-lineal", "contrapposto", "nu-classic"],
  },
  {
    slug: "contrapposto",
    nom: "Contrapposto",
    nomItalic: true,
    definicio:
      "Postura en què el pes del cos recau en una cama i l'altra es relaxa, oposant lleugerament malucs i espatlles: la figura «viva» dels clàssics, recuperada per Donatello.",
    explicacio:
      "El contrapposto és la restauració del cos antic a l'escultura del Quattrocento. Les estàtues gòtiques eren verticals i rígides; les clàssiques —el Dorífor de Policleto és el model que els florentins coneixien per còpies i descripcions— equilibraven el cos sobre una cama, i aquest simple gest feia que el maluc s'inclinés, les espatlles s'oposessin i tot el tors entrés en una rotació orgànica: el cos semblava a punt de moure's. Donatello el recupera sistemàticament (Sant Jordi, 1415; David de bronze, 1440) i Miquel Àngel el porta al màxim (David de marbre, 1504): la tensió abans de l'acció. En pintura, Masaccio i Rafael en fan ús continu per donar a les figures el pes d'estàtues vives. La lectura didàctica és doble: és una convenció tècnica fàcil de reconèixer (mireu on recau el pes i si malucs i espatlles s'oposen), i és un símbol: el contrapposto és la figura que pensa i decideix, no la icona immòbil. Per això els teòrics del Manierisme l'aniran exagerant fins a la figura serpentinata.",
    exemplarPrincipal: "david-marbre",
    zonaExemplar: "el pes recau a la cama dreta: observeu com el maluc s'inclina i les espatlles giren en direcció oposada",
    exemplarsSecundaris: ["david-bronze-donatello", "sant-jordi-donatello", "moises", "bacus"],
    confusions: [
      { amb: "Escorç", diferencia: "Contrapposto és postura; escorç és punt de vista. El David té contrapposto, però no és escorç; el Crist mort de Mantegna és escorç sense contrapposto." },
      { amb: "Figura serpentinata", diferencia: "La serpentinata és el contrapposto exagerat del Manierisme: rotacions dobles, espirals. El contrapposto clàssic és equilibrat; la serpentinata, deliberadament inestable." },
    ],
    relacionats: ["nu-classic", "escorc", "composicio-piramidal"],
  },
  {
    slug: "composicio-piramidal",
    nom: "Composició piramidal",
    definicio:
      "Disposició de les figures en un triangle estable, amb el vèrtex al cap de la figura principal: l'estructura que dona claredat, serenitat i equilibri a la pintura del Cinquecento.",
    explicacio:
      "La composició piramidal és la resposta del Cinquecento a la pregunta «on poso les figures perquè l'escena sigui clara i estable?». Un triangle té la base ampla i el vèrtex únic: les mirades, els gestos i els cossos pugen cap a un punt que l'espectador troba de seguida. Leonardo la fa sistema: la Verge de les roques, la Gioconda (el bust i les mans creuades formen la piràmide) i l'Últim Sopar (Crist al vèrtex dels quatre grups d'apòstols) són els models. Rafael la perfecciona (les Madonnas de Florència, l'Escola d'Atenes) i esdevé el cànon acadèmic: durant segles, qualsevol altar o retrat oficial «correcte» té estructura piramidal. La seva contrapartida és la piràmide trencada: el Judici Final de Miquel Àngel substitueix l'estabilitat pel vòrtex, i això és exactament el que el Manierisme farà norma. A l'aula, és l'exercici més rendible: agafeu qualsevol Madonna del Cinquecento i traceu mentalment el triangle —després feu-ho amb un quadre manierista i compareu.",
    exemplarPrincipal: "verge-roques",
    zonaExemplar: "el grup de les quatre figures: la Mare de Déu al vèrtex i les mans que es toten al centre formen el triangle",
    exemplarsSecundaris: ["gioconda", "madonna-granduca", "pietat-vaticana", "ultim-sopar"],
    confusions: [
      { amb: "Simetria", diferencia: "La piràmide no exigeix simetria: els braços del triangle poden ser desiguals. La simetria és relació entre costats; la piràmide és jerarquia entre figures." },
      { amb: "Contrapposto", diferencia: "El contrapposto organiza un cos; la piràmide organitza un grup. Es combinen constantment (el David té contrapposto i estructura piramidal)." },
    ],
    relacionats: ["contrapposto", "perspectiva-lineal", "iconografia"],
  },
  {
    slug: "retrat-humanista",
    nom: "Retrat humanista",
    definicio:
      "Tipus de retrat del Renaixement que representa l'individu concret —el seu rostre, el seu rang, la seva intel·ligència— en lloc del tipus social: la persona com a centre del món representat.",
    explicacio:
      "L'humanisme posa l'ésser humà al centre, i el retrat és la seva traducció pictòrica: pintar una cara concreta, reconeixible, amb la seva història als objectes que l'envolten. El Camí el marca Van Eyck: el Retrat d'home amb turbant (1433) mira l'espectador directament, sense jerarquia medieval; els Arnolfini (1434) documenten un matrimoni concret amb el seu espai i els seus símbols. Itàlia afegeix la lectura cívica i intel·lectual: Botticelli retrata la cort dels Mèdici a l'Adoració dels mags; Leonardo inventa el retrat psicològic amb la Dama de l'ermini (una noia en el moment de ser distreta); Holbein fa del retrat un inventari del saber (els Ambaixadors). Els símbols (el llibre, l'instrument, el gos, l'ermini) no són decoració: són l'auto-presentació del subjecte. La lliçó didàctica: en un retrat renaixentista, pregunteu-vos qui mira, què sostenen les mans i què hi ha al fons —cada resposta és una part de la biografia pintada.",
    exemplarPrincipal: "dama-ermini",
    zonaExemplar: "la rotació del cap i els ulls: el retrat captura l'instant en què la dama és distreta per alguna cosa fora del quadre",
    exemplarsSecundaris: ["matrimoni-arnolfini", "ambaixadors", "cavaller-ma-pit", "home-turbant"],
    confusions: [
      { amb: "Retrat de poder medieval", diferencia: "El retrat medieval representa el rang (rei, bisbe, sant) amb atributs fixes i rostre tipificat; el retrat humanista representa una persona concreta, amb la seva fisonomia i la seva interioritat." },
      { amb: "Retrat psicològic modern", diferencia: "El retrat renaixentista suggereix interioritat (mirades, gests, símbols) però no explora el conflicte íntim com el farà el retrat del segle XIX i XX." },
    ],
    relacionats: ["iconografia", "composicio-piramidal", "oli-tempera"],
  },
  {
    slug: "nu-classic",
    nom: "Nu clàssic",
    definicio:
      "Recuperació del cos humà nu com a tema digna de l'art, segons els models de l'escultura antiga: el nu no és pecat, és la forma perfecta de la creació i el laboratori de la bellesa.",
    explicacio:
      "L'edat mitjana no pinta nus (excepte Adam i Eva com a pecadors); l'antiguitat els feia déus i atletes. El Renaixement fa la reversió: des de Donatello (David de bronze, aprox. 1440, el primer nu exempt a mida natural des de l'antiguitat) el nu torna a ser el subjecte central de l'escultura i, aviat, de la pintura. Botticelli posa la Venus nuda en el centre d'un quadre de col·leccionista; Miquel Àngel fa del nu el llenguatge absolut: el David, els Ignudi de la Sixtina, els cossos del Judici, on fins i tot els sants estan nus. La teoria és neoplatònica: la bellesa és la forma pura, i el cos nu és la seva manifestació més directa; per això els artistes estudien anatomia (Pollaiuolo dissecciona; Leonardo fa més de trenta autòpsies) i proporció (Dürer escriu el tractat). El nu clàssic té dos registres: l'ideal (la Venus, l'Apol·lo: formes perfectes, càlmes) i l'heroic (els cossos tensos de Miquel Àngel, Pollaiuolo). Per a l'aula: distingir quan el nu és mitologia, quan és devoció (la Pietà no és nu) i quan és studi anatòmic.",
    exemplarPrincipal: "david-bronze-donatello",
    zonaExemplar: "el cos adolescent: el contrapposto suau i el barret de fulles, l'única roba —el nu com a afirma­ció del cos antic",
    exemplarsSecundaris: ["naixement-venus", "david-marbre", "venus-urbino", "judici-final"],
    confusions: [
      { amb: "Nus acadèmic posterior", diferencia: "L'estudi del nu continua fins avui, però el nu renaixentista té una funció cosmològica (el cos com a mesura del món), no només exercici tècnic." },
      { amb: "Despullat devocional medieval", diferencia: "Adam i Eva medieval són pecadors avergonyits; el nu renaixentista és dignificat. La comparació entre l'Expulsió de Masaccio (nu que plora) i el David (nu que decideix) resumeix el canvi." },
    ],
    relacionats: ["contrapposto", "iconografia", "escorc"],
  },
  {
    slug: "iconografia",
    nom: "Iconografia i símbols",
    definicio:
      "L'estudi del significat dels temes i dels símbols d'una obra: què representa cada objecte, cada gest i cada escena, i per a qui està construït aquest significat.",
    explicacio:
      "La pintura renaixentista és un sistema de senyals: el gos és fidelitat, la granada fecunditat i resurrecció, el llibre saviesa, el lliri puresa, l'ermini puresa i rang, el crani mort, el pomeri pecat. Aquest codi, heretat del medieval, s'enriqueix amb la mitologia antiga (Venus, Cupido, les Gràcies) i amb l'al·legoria neoplatònica (l'amor terrenal i diví). La lliçó didàctica és que la iconografia no és un inventari: és la manera com l'obra parla al seu temps. El matrimoni Arnolfini és un contracte pintat: cada objecte (les sabatotes llevades, el cirerer encès, el mirall de la Passió) té funció legal o devocional. El jardí de les delícies és un sermonari pintat on cada monstre és una metàfora del pecat. Els ambaixadors és un inventari del saber europeu amb un crani amagat. I quan el programa és neoplatònic (la Primavera), la lectura exacta es pot discutir —i és aquesta discussió la que ensenya a llegir imatges. Per a l'aula: mai no n'hi ha prou amb identificar símbols; cal preguntar-se per què estan allà i qui els veuria.",
    exemplarPrincipal: "retaule-gant",
    zonaExemplar: "el panell central: cada flor, cada font i cada vestimenta del prat del xai té funció teològica exacta",
    exemplarsSecundaris: ["matrimoni-arnolfini", "jardi-delicies", "primavera", "ambaixadors"],
    confusions: [
      { amb: "Iconologia", diferencia: "La iconografia identifica els símbols; la iconologia interpreta el programa complet d'una obra en el seu context cultural. Primera etapa: llegir; segona: entendre per què." },
      { amb: "Simbolisme decoratiu", diferencia: "Un símbol no és un ornament: a la pintura renaixentista cada detall iconogràfic té funció argumentativa. Si és només decoració, no és iconografia." },
    ],
    relacionats: ["retrat-humanista", "composicio-piramidal", "nu-classic"],
  },
  {
    slug: "fresc",
    nom: "Fresc",
    definicio:
      "Tècnica mural que pinta sobre arrebossat fresc: el pigment s'integra a la paret en assecar-se, i l'obra esdevé part de l'arquitectura per sempre.",
    explicacio:
      "El fresc (de l'italià affresco, «en fresc») és la tècnica reina de la pintura mural italiana. El procés: es projecta el dibuix sobre la paret, s'arrebossa només la porció del dia (giornata) i es pinta amb pigments diluïts en aigua mentre l'arrebossat és humit; en assecar-se, el carbonat de calç fixa el pigment dins de la paret mateixa. El resultat és extraordinàriament durador —la Capella Sixtina té 500 anys— però implacable: no es pot corregir, i el pintor ha de treballar ràpid i decidit, jornada per jornada. Les giornates són visibles a prop (les juntes entre sessions de treball) i permeten als historiadors reconstruir el ritme de treball. Els grans cicles: la Brancacci de Masaccio (l'escola de tots els florentins), la Cambra dels Esposats de Mantegna (la sala il·lusionista), l'Escola d'Atenes de Rafael i la Sixtina de Miquel Àngel (500 m² en quatre anys). Alternativa: pintar «en sec» (sobre arrebossat sec), més còmode però més fràgil —és el que va fer Leonardo a l'Últim Sopar, i per això l'obra es degrada des del primer segle.",
    exemplarPrincipal: "volta-sixtina",
    zonaExemplar: "les juntes entre jornades (giornate), visibles de prop, i els colors recuperats després de la restauració",
    exemplarsSecundaris: ["trinitat-masaccio", "cambra-esposats", "escola-atenes", "judici-final"],
    confusions: [
      { amb: "Pintura sobre taula", diferencia: "La taula (fusta) permet corregir, treballar lentament i viatjar; el fresc és únic, vinculat a la paret i executat al ritme de l'assecat. Els temes i els formats difereixen." },
      { amb: "Tempera", diferencia: "La tempera és el lligant (ou) usat per pintar en taula; el fresc usa aigua i calç. Una «tempera sobre taula» i un «fresc» són dues tècniques completament diferents amb noms que s'hi confonen sovint." },
    ],
    relacionats: ["oli-tempera", "clarobscur", "perspectiva-lineal"],
  },
  {
    slug: "oli-tempera",
    nom: "Oli i tempera",
    definicio:
      "Les dues grans tècniques de la pintura renaixentista: la tempera (lligant d'ou, ràpida, nítida, dominant a Itàlia fins al 1480) i l'oli (lligant d'oli, lenta, translúcida, portada a Itàlia des de Flandes).",
    explicacio:
      "La elecció de la tècnica condiciona tota l'estètica d'una escola. La tempera (pigment + rovell d'ou) s'asseca en minuts: no es pot corregir, exigeix hatching (ratlles paral·leles) per modelar i produeix superfícies nítides i mates. És la tècnica de Botticelli i Piero della Francesca: línies precises, color plan, lluminositat de fresc. L'oli (pigment + oli de lli) s'asseca en dies: permet capes translúcides (veladures), correccions, fusions suaus i colors profunds. Perfeccionada pels flamencs (Van Eyck), viatja a Itàlia amb els comerciants: Antonello da Messina la difon a Venècia, i des de 1480 és la tècnica universal. El resultat és una dualitat d'escoles: Itàlia del dibuix (tempera, línia, geometria) contra Flandes del color (oli, llum, detall); a partir de Leonardo i Ticià, l'oli domina tota Europa i fa possible el sfumato, el colorisme venecià i, amb el temps, tota la pintura moderna. La lliçó: quan mireu un quadre, pregunteu-vos quina tècnica hi ha —la superfície mateixa (mate o brillant, nítida o fosa) és la resposta.",
    exemplarPrincipal: "naixement-venus",
    zonaExemplar: "els fils d'or del cabell pintats fil a fil: la precisió joiera que només la tempera permet",
    exemplarsSecundaris: ["matrimoni-arnolfini", "gioconda", "primavera", "retaule-gant"],
    confusions: [
      { amb: "Fresc", diferencia: "El fresc pinta sobre paret humida amb aigua; la tempera i l'oli pinta sobre fusta o llenç amb lligants. Tres tècniques, tres superfícies, tres estètiques." },
      { amb: "Veladura", diferencia: "La veladura no és una tècnica sinó un recurs de l'oli: capa fina translúcida que modifica el to de la capa inferior. És el que fa brillar la Gioconda i el que la tempera no pot fer." },
    ],
    relacionats: ["sfumato", "fresc", "retrat-humanista"],
  },
  // ── Arquitectura ─────────────────────────────────────────────────────────
  {
    slug: "ordres-classics",
    nom: "Ordres clàssics",
    grup: "arquitectura",
    definicio:
      "Sistemes de columna i entaulament heretats de Grècia i Roma —toscà, dòric, jònic, corinti i compost— que es reconeixen sobretot pel capitell i que fixen les proporcions de tot l'edifici.",
    explicacio:
      "Un ordre no és només una columna decorada: és un conjunt format per base, fust, capitell i entaulament, amb unes proporcions pròpies. Vitruvi, arquitecte romà del segle I aC, en descriu quatre; els humanistes del Quattrocento rellegeixen el seu tractat i mesuren les ruïnes de Roma, i Sebastiano Serlio, el 1537, en fixa cinc amb el compost. Per reconèixer-los, cal mirar el capitell: el toscà és llis i el fust no té estries; el dòric té un capitell senzill i un fris amb tríglifs i mètopes; el jònic té volutes en espiral; el corinti, fulles d'acant; el compost combina volutes jòniques i fulles d'acant. Al Colosseu, els ordres s'apilen del més robust al més lleuger, i el Renaixement copia aquesta regla: Alberti l'aplica a la façana del Palau Rucellai i Pedro Machuca al pati del Palau de Carles V. Sovint no són columnes sinó pilastres, columnes aplanades i adossades al mur que ordenen la façana. Miquel Àngel, al Capitoli, inventa l'ordre gegant, que abasta dos pisos alhora. Fora d'Itàlia, els ordres arriben primer com a decoració (Salamanca, Fontainebleau) i més tard com a sistema complet (l'Escorial).",
    exemplarPrincipal: "palau-rucellai",
    zonaExemplar: "els capitells de les pilastres, pis per pis: toscans a la planta baixa, un ordre lliure proper al compost al pis noble i corintis a dalt",
    exemplarsSecundaris: ["palau-carles-v", "placa-capitoli", "templet-montorio", "fontainebleau"],
    confusions: [
      { amb: "Columna i pilastra", diferencia: "La columna és exempta i de secció circular; la pilastra és plana i adossada al mur. Al Palau Rucellai totes són pilastres: ordenen la façana, però el pes el porta el mur." },
      { amb: "Decoració a l'antiga", diferencia: "Posar motius antics (medallons, grotescos, candelers) no és fer servir un ordre. La façana de la Universitat de Salamanca és plena de decoració a la italiana, però no s'organitza amb un sistema d'ordres i proporcions." },
    ],
    relacionats: ["proporcio-modul", "planta-central", "cupula"],
  },
  {
    slug: "proporcio-modul",
    nom: "Proporció i mòdul",
    grup: "arquitectura",
    definicio:
      "Principi que fa dependre totes les mides d'un edifici d'una unitat de mesura, el mòdul, i de relacions numèriques senzilles (1:1, 1:2, 2:3), de manera que cada part està en harmonia amb el tot.",
    explicacio:
      "Per als arquitectes del Renaixement, la bellesa es pot mesurar. Alberti, a De re aedificatoria, la defineix com l'harmonia de totes les parts, de manera que no s'hi pugui afegir, treure ni canviar res sense fer-la pitjor. A la pràctica, això vol dir triar una unitat i repetir-la. A l'Hospital dels Innocents, Brunelleschi fa coincidir l'amplada de cada arc, l'alçada de les columnes i la profunditat de la lògia: cada tram és un cub cobert amb una volta. A Santa Maria Novella, Alberti inscriu tota la façana en un quadrat i la divideix en quadrats més petits; el pis superior és un altre quadrat, i els plafons de marbre repeteixen la figura a escala menor. Alberti relaciona aquestes proporcions amb els intervals musicals (l'octava és 1:2; la quinta, 2:3): per als humanistes, era la prova que la proporció és una llei de la natura. Per observar-la, cal buscar repeticions iguals, quadrats i meitats, i comprovar si l'edifici es pot dividir en parts que es repeteixen. El gòtic també fa servir la geometria, però busca alçada i llum; el Renaixement busca equilibri, horitzontalitat i una mesura a escala humana.",
    exemplarPrincipal: "facade-santa-maria-novella",
    zonaExemplar: "la façana sencera cap en un quadrat; el pis superior és un altre quadrat, i els plafons de marbre repeteixen la mateixa figura a escala menor",
    exemplarsSecundaris: ["hospital-innocents", "palau-rucellai", "sant-andreu-mantua", "escorial"],
    confusions: [
      { amb: "Simetria", diferencia: "Un edifici pot ser simètric sense proporcions modulars: dues meitats iguals amb mides arbitràries. La proporció és una relació numèrica entre les parts; la simetria, la igualtat entre dos costats." },
      { amb: "Perspectiva lineal", diferencia: "Totes dues neixen de la geometria de Brunelleschi i d'Alberti, però la perspectiva representa l'espai sobre una superfície plana, i la proporció ordena l'espai real que es construeix." },
    ],
    relacionats: ["ordres-classics", "perspectiva-lineal", "planta-central"],
  },
  {
    slug: "planta-central",
    nom: "Planta central",
    grup: "arquitectura",
    definicio:
      "Planta organitzada al voltant d'un punt central —cercle, quadrat, octògon o creu grega—, igual en totes direccions, que el Renaixement considera la forma més perfecta.",
    explicacio:
      "L'església medieval habitual té planta basilical: una nau llarga que porta de la porta a l'altar. Els arquitectes del Renaixement, que llegeixen Vitruvi i estudien el Panteó de Roma, admiren una altra idea: un edifici que, des del centre, és igual en totes direccions. Alberti recomana el cercle com la forma preferida per la natura, i Leonardo omple quaderns de dibuixos d'esglésies centrals. El Tempietto de Bramante, a Roma, n'és el manifest: un cilindre envoltat de columnes i coronat per una cúpula, construït en el lloc on la tradició situava el martiri de sant Pere. Bramante projecta la nova Basílica de Sant Pere en creu grega i Miquel Àngel hi torna, però a començament del segle XVII Maderno l'allarga amb una nau. La planta central passa també a l'arquitectura civil: el pati circular del Palau de Carles V, la Villa Rotonda de Palladio, amb quatre pòrtics iguals, o el donjon de Chambord, ordenat al voltant d'una escala. Per reconèixer-la, cal buscar un eix vertical (cúpula, llanterna, escala) i comprovar si l'edifici es veu igual des de diversos costats. El seu inconvenient és pràctic: la litúrgia necessita una nau on se situïn els fidels.",
    exemplarPrincipal: "templet-montorio",
    zonaExemplar: "els graons i el peristil circulars: l'edifici és igual des de qualsevol costat, i la cúpula en marca el centre",
    exemplarsSecundaris: ["rotonda", "palau-carles-v", "basilica-sant-pere", "chambord"],
    confusions: [
      { amb: "Planta basilical", diferencia: "La planta basilical és longitudinal (nau central, naus laterals i absis) i dirigeix el recorregut cap a l'altar; la planta central no té cap direcció privilegiada." },
      { amb: "Cúpula", diferencia: "Una cúpula pot cobrir el creuer d'una església longitudinal, com a Santa Maria del Fiore. La planta central es refereix a la forma de tot l'edifici, no només a la coberta." },
    ],
    relacionats: ["cupula", "proporcio-modul", "ordres-classics"],
  },
  {
    slug: "cupula",
    nom: "Cúpula",
    grup: "arquitectura",
    definicio:
      "Coberta corba que tanca un espai de planta circular, octogonal o quadrada. Al Renaixement esdevé el signe més visible de la ciutat i de la capacitat tècnica dels arquitectes.",
    explicacio:
      "Les cúpules existien des de l'antiguitat (el Panteó de Roma), però la de Santa Maria del Fiore planteja un problema nou: cobrir un buit octogonal de més de 40 metres de diàmetre sense poder construir una cintra de fusta prou gran per sostenir-la mentre s'aixecava. Brunelleschi el resol entre 1420 i 1436 amb una doble closca —una interior més gruixuda i una exterior més lleugera—, amb maons col·locats en espiga, que es travaven a mesura que pujaven, i amb un perfil apuntat, que empeny menys cap als costats que un de semicircular. Vuit costelles de marbre blanc marquen les arestes, i la llanterna, a dalt de tot, fa de pes que estabilitza el conjunt. Més endavant, la cúpula s'eleva sobre un tambor, un cilindre amb finestres que hi deixa entrar la llum: Bramante ho fa al Tempietto, Miquel Àngel a Sant Pere (la cúpula l'acaba Giacomo della Porta el 1590) i Juan de Herrera a l'Escorial. Per observar-la, cal identificar quatre parts: tambor, closca, costelles i llanterna. I preguntar-se quin paper té a la ciutat: la cúpula de Florència domina el paisatge des de qualsevol turó.",
    exemplarPrincipal: "cupula-fiore",
    zonaExemplar: "les costelles de marbre blanc, el perfil apuntat i la llanterna que corona el conjunt, damunt del tambor octogonal amb ulls de bou",
    exemplarsSecundaris: ["basilica-sant-pere", "templet-montorio", "escorial"],
    confusions: [
      { amb: "Volta", diferencia: "La volta cobreix un espai allargat (volta de canó, volta d'aresta); la cúpula cobreix un espai centrat i es tanca en un punt." },
      { amb: "Tambor", diferencia: "El tambor és el cilindre o prisma amb finestres que eleva la cúpula, no la cúpula mateixa. A Santa Maria del Fiore és octogonal i té ulls de bou circulars." },
    ],
    relacionats: ["planta-central", "proporcio-modul", "ordres-classics"],
  },
];

export const CONCEPTES_PER_SLUG: Record<string, Concepte> = Object.fromEntries(
  CONCEPTES.map((c) => [c.slug, c]),
);

export function concepte(slug: string): Concepte | undefined {
  return CONCEPTES_PER_SLUG[slug];
}
