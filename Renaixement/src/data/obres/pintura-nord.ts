// obres/pintura-nord.ts — Pintura flamenca, francesa, espanyola i alemanya (15 obres)
import type { Obra } from "../types";

export const PINTURA_NORD: Obra[] = [
  {
    slug: "retaule-gant",
    titol: "Retaule de Gant (Adoració del xai místic)",
    autorSlug: "van-eyck",
    autorNom: "Hubert i Jan van Eyck",
    data: "1432",
    anyInici: 1426, anyFi: 1432,
    tecnica: "Oli sobre taula (retaule de 12 panells)",
    dimensions: "350 × 460 cm obert",
    ubicacio: { museu: "Catedral de Sant Bavó", ciutat: "Gant", pais: "Bèlgica" },
    disciplina: "pintura", periode: "flamenc", ambit: "flandes",
    concepts: ["iconografia", "oli-tempera"],
    relevancia:
      "És l'obra cabdal dels primitius flamencs i una de les pintures més importants del món: dotze panells pintats per les dues cares, amb una precisió òptica possible gràcies a l'oli, on cada detall —una rosa, un reflex, una joia— és alhora descripció i símbol teològic.",
    context:
      "El retaule es pinta per a la capella de Joos Vijd a l'església de sant Joan de Gant (avui catedral de Sant Bavó) i s'acaba el 1432. La inscripció del marc atribueix l'inici a Hubert van Eyck i l'acabament al seu germà Jan, després de la mort de Hubert el 1426. El programa és teològicament complet: l'adoració del xai místic (Crist sacrificat) al centre de l'obertura, amb Déu Pare o Crist vestit de papa al vèrtex, la Mare de Déu i Joan Baptista als costats, Adam i Eva nus als extrems, i l'Anunciació pintada a la cara exterior quan el retaule és tancat.",
    analisi:
      "L'obertura central desplega el món vist amb una lupa: el prat del Xai està poblat de desenes de sants, màrtirs i jutges que pugen o arriben en peregrinació, amb una vegetació botànicament identificable i fonts de marbre que reflecteixen la llum. La llum unifica l'espai: ve d'una sola direcció i toca cada matèria —pedra, metall, pell, aigua— amb un comportament físic exacte, que és el gran demostrador de l'oli. La cara exterior de l'Anunciació és un interior burgès vist a través d'una finestra, amb la ciutat de Gant al fons: el sagrat passa a l'espai quotidià del mecenes. Adam i Eva, als extrems, són els primers nus realistes de la pintura europea moderna, pintats com a cossos humans concrets, no com a tipus idealitzats.",
    miraHiDeProp: [
      "El xai sobre l'altar, amb la sang vessant al calze: el centre teològic i pictòric de tot el retaule.",
      "Adam i Eva: la musculatura i el ventre d'Adam estan pintats amb un realisme que escandalitzà els contemporanis.",
      "La corona i el ceptre del Déu Pare del vèrtex: cada pedra de la corona té el seu reflex pròpi.",
    ],
    curiositats: [
      "El retaule és l'obra d'art més robada de la història: un panell (Els jutges justos) va ser robat el 1934 i mai no s'ha recuperat; la resta va passar per Napoleó, la Primera Guerra Mundial i dos episodis de magnificació nazi.",
      "El panell robat és substituït per una còpia: la caceria del lladre (l'anomenat «Home de la barba grisa») és el misteri criminal més famós de l'art.",
    ],
    relacionades: ["matrimoni-arnolfini", "home-turbant", "jardi-delicies"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "home-turbant",
    titol: "Retrat d'home amb turbant vermell",
    autorSlug: "van-eyck",
    autorNom: "Jan van Eyck",
    data: "1433",
    anyInici: 1433, anyFi: 1433,
    tecnica: "Oli sobre taula de roure",
    dimensions: "33 × 26 cm",
    ubicacio: { museu: "National Gallery", ciutat: "Londres", pais: "Regne Unit", url: "https://www.nationalgallery.org.uk" },
    disciplina: "pintura", periode: "flamenc", ambit: "flandes",
    concepts: ["retrat-humanista", "oli-tempera"],
    relevancia:
      "És probablement el primer autoretrat modern: un home anònim —o el mateix Van Eyck— que mira l'espectador directament, amb una llibertat i una introspecció que cap retrat medieval no havia tingut. La inscripció al marc, «Com jo puc» (Als ich can), és el lema del pintor com a individu.",
    context:
      "La taula és petita (33 × 26 cm) i pintada per a gaudir de prop: el tema és la identitat, no l'escena. La inscripció al marc superior diu «Als ich can» («Com jo puc», el lema de Van Eyck), i a la part inferior «Joannes de Eyck me fecit anno 1433» («Joan van Eyck em va fer l'any 1433»). La majoria dels historiadors identifiquen el model amb el mateix pintor, tot i que alguns defensen que és un retrat del germà o d'un colla. La moda del turant —un chaperon flamenc— era corrent entre els homes cultes de Bruges.",
    analisi:
      "El rostre es pinta amb una precisió de fisiognomista: cada arruga, cada vora dels llavis, cada porus de la pell té la seva llum. La llum entra per l'esquerra i toca el rostre amb un contrast suau que modela l'estructura facial sota la pell. El turbant vermell és una demostració de matèria: la tela es plega sobre el cap amb uns plecs pintats fil a fil, amb els reflexs que descriuen la llana i la llum interior. El fons fosc, uniforme, elimina qualsevol context: tot és rostre. La mirada directa, cap a l'espectador, és la novetat revolucionària: el subjecte del retrat ja no és un tipus social, és una persona que sap que és mirada.",
    miraHiDeProp: [
      "Les arruges al voltant dels ulls i el signe de la barbeta: cada detall anatòmic és el resultat de l'observació directa.",
      "Els plecs del turbant: cada solc de la tela té la seva ombra i el seu reflex, sense cap línia de contorn.",
      "La inscripció del marc, gravada i pintada com si fos una escultura: el marc forma part de la taula.",
    ],
    curiositats: [
      "El lema «Als ich can» apareix també al matrimoni Arnolfini i a altres obres de Van Eyck: és la signatura estilística de l'artista.",
      "La taula va passar per col·leccions angleses privades fins que la National Gallery la va comprar el 1851 per la suma de 630 lliures.",
    ],
    relacionades: ["matrimoni-arnolfini", "retaule-gant", "autoretrat-durer-1500"],
    bloc: 6,
  },
  {
    slug: "matrimoni-arnolfini",
    titol: "El matrimoni Arnolfini",
    autorSlug: "van-eyck",
    autorNom: "Jan van Eyck",
    data: "1434",
    anyInici: 1434, anyFi: 1434,
    tecnica: "Oli sobre taula de roure",
    dimensions: "82 × 60 cm",
    ubicacio: { museu: "National Gallery", ciutat: "Londres", pais: "Regne Unit", url: "https://www.nationalgallery.org.uk" },
    disciplina: "pintura", periode: "flamenc", ambit: "flandes",
    concepts: ["iconografia", "retrat-humanista", "oli-tempera"],
    relevancia:
      "És el quadre més analitzat dels primitius flamencs: un interior burgès on cada objecte —el mirall, les sabatotes, el gos, el cirerer— és alhora descripció fidel i símbol. Van Eyck pinta el món visible amb una precisió possible gràcies a l'oli, i cada detall té el seu paper.",
    context:
      "El quadre és datat i signat al mur: «Johannes de Eyck fuit hic 1434» («Jan van Eyck hi va ser el 1434»), cosa que suggeria la presència del pintor com a testimoni. Els historiadors discuteixen el tema: la lectura classica és un matrimoni (el mercader de Lucca Giovanni di Nicolao Arnolfini i la seva esposa), amb el gest del marit que aixeca la mà dreta com a promesa pública; altres llegeixen un retrat de matrimoni commemoratiu, un testament visual o una escena de poder domèstic. El més acceptat avui és la primera lectura: és un document d'un acte civil i sagrat, pintat amb tots els símbols del contracte.",
    analisi:
      "L'espai és un interior burgès amb finestra a l'esquerra i llit a la dreta: la llum de la finestra toca cada objecte amb una lluminositat física exacta. El mirall circular del fons és el miracle tècnic de la taula: reflecteix tota la sala, incloses dues figures que entren per la porta (possiblement el pintor mateix), i el seu marc té deu medallons amb escenes de la Passió pintades en miniatura. Els objectes parlen: les sabatotes del primer pla tirades (sòl sagrat davant d'un acte solemne), el gos (fidelitat), les taronges al davant de la finestra (riquesa), el llum de canya amb un únic cirerer encés (presència de Déu o vida que s'apaga), la gata de la dona (fecunditat). La perspectiva del paviment és empírica, no matemàtica: Van Eyck pinta el que veu, no el que calcula.",
    miraHiDeProp: [
      "El mirall del fons: els deu medallons de la Passió, cada un amb més de cinquanta detalls pintats.",
      "La firma al mur sobre el mirall, escrita amb lletra gòtica i caligràfia notarial: «Jan van Eyck hi va ser 1434».",
      "Les sabatotes del primer pla i les de la dama: cada corda, cada plegada del cuir és pintada.",
    ],
    curiositats: [
      "El quadre és el més fotografiat i analitzat de la National Gallery: s'hi han fet radiografies, reflectografies i estudis infrarojos que han recuperat dibuixos preparatoris.",
      "Erasme conta que Van Eyck «no pintava res que no fos al davant dels seus ulls»: el quadre és la prova màxima d'aquesta màxima.",
    ],
    relacionades: ["retaule-gant", "home-turbant", "ambaixadors"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "descens-creu",
    titol: "El descens de la creu",
    autorSlug: "van-der-weyden",
    autorNom: "Roger van der Weyden",
    data: "aprox. 1435",
    anyInici: 1435, anyFi: 1438,
    tecnica: "Oli sobre taula de roure",
    dimensions: "220 × 262 cm",
    ubicacio: { museu: "Museu Nacional del Prado", ciutat: "Madrid", pais: "Espanya", url: "https://www.museodelprado.es" },
    disciplina: "pintura", periode: "flamenc", ambit: "flandes",
    concepts: ["composicio-piramidal", "iconografia"],
    relevancia:
      "És el retaule més important de Van der Weyden i una de les grans pintures del Prado: deu figures en un compartiment com una caixa d'or, amb un patetisme controlat que converteix el dolor en coreografia. És el model europeu de la pietat dramàtica durant dos segles.",
    context:
      "El retaule es pinta a Lovaina, possiblement per al gremi dels arquers, que hi surten representats a l'escena (els arcs a les cantonades del compartiment). La composició omple tot l'espai d'un reliquiari daurat: cap figura no surt del marc. Maria de Gueldre, esposa del duc Felip el Bo de Borgonya, el va portar a Espanya al segle XV, i el monestir d'Escorial el va custodiar fins que Felip II el va portar al Prado.",
    analisi:
      "La composició és una escultura pintada: deu figures en tres nivells verticals, amb el cos de Crist al centre i la Mare de Déu desmaiada que és la rèplica exacta del seu fill, cadàver parell al cadàver de la mare. El fons és un panell daurat: cap profunditat, cap paisatge, només espai sagrat on les figures es col·loquen com en un retaule. Les llàgrimes són pintades una per una, amb un realisme que no té equivalent a Itàlia: cada gota té el seu reflex. Les expressions són el gran tema: cada figura plora d'una manera diferent (sant Joan, amb el gest de Maria Magdalena; Maria Salomé, amb el mocador), i la contenció es romp només en la Magdalena, amb el cos girat i els braços desesperats. La línia de els draps és trencada i precisa, com l'escultura de fusta policromada flamenca.",
    miraHiDeProp: [
      "La Mare de Déu desmaiada: la coincidència exacta de la seva postura amb la del fill és la clau simbòlica del retaule.",
      "Les llàgrimes de cada figura: cada gota és diferent, pintada amb el pinzell més fi del taller.",
      "Els arcs i els escuts a les cantonades del fons: la marca dels arquers de Lovaina, el gremi del comitent.",
    ],
    curiositats: [
      "Felip II el va col·locar a la capella del castell de l'Escorial sota un altar daurat dissenyat per al retaule: era l'única pintura no espanyola que el rei va exhibir a la seva càmera principal.",
      "El retaule va sobreviure intacte a la travessia d'Alcalà a Madrid en 6 capses blindades el 1939, durant la Guerra Civil.",
    ],
    relacionades: ["crist-mort-mantegna", "desposoris-verge", "enterrament-orgaz"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "diptic-melun",
    titol: "Díptic de Melun (Mare de Déu entre verges i sants)",
    autorSlug: "fouquet",
    autorNom: "Jean Fouquet",
    data: "aprox. 1452",
    anyInici: 1452, anyFi: 1455,
    tecnica: "Oli sobre taula",
    dimensions: "93 × 85 cm (panell esquerra)",
    ubicacio: { museu: "Koninklijk Museum voor Schone Kunsten", ciutat: "Anvers", pais: "Bèlgica" },
    disciplina: "pintura", periode: "flamenc", ambit: "franca",
    concepts: ["retrat-humanista", "iconografia"],
    relevancia:
      "És l'obra més estranya i moderna del segle XV: la Mare de Déu amb el rostre de la favorita del rei Carles VII, Agnès Sorel, amb els pits descoberts i un cor d'àngels de color vermell i de marbre. Fouquet, format a Itàlia i a Flandes, sintetitza les dues escoles en una imatge que sembla del segle XX.",
    context:
      "Fouquet, pintor del rei de França, viatja a Roma el 1447 i veu els frescos d'Angelico i les perspectives florentines; quan torna, pinta aquest díptic per al sepulcre d'Étienne Chevalier, tresorer del rei, a l'església de Notre-Dame de Melun. El panell esquerre (a Anvers) mostra la Mare de Déu i el nen amb el cor d'àngels vermells i serafins de marbre; el panell dret (a Berlín) mostra Étienne Chevalier presentat per sant Esteve. El rostre de la Mare de Déu és el retrat d'Agnès Sorel, morta el 1450, la primera amant oficial d'un rei de França.",
    analisi:
      "El panell de la Mare de Déu és una escultura en marbre pintada: la cara i els pits són d'una lluminositat de perla, i la vestimenta —capa vermella, ermini, cor de joies— és una cortina escultòrica. El cor d'àngels és el miracle: àngels vermells, sense rostres individuals, com una escuma de color, i serafins de marbre verd i blau a la fila inferior, amb rostres de pedra tallada. La geometria és severa: l'esfericitat dels pits, la curvatura del cor, la vertical del cos centralitzat. És una pintura que ni Itàlia ni Flandes no haurien fet: és França, amb les dues tradicions fundides.",
    miraHiDeProp: [
      "El rostre de la Mare de Déu: el retrat d'Agnès Sorel, amb els ulls baixos i el front llis, és un document de la bellesa cortesana francesa del segle XV.",
      "El cor d'àngels vermells: cap rostre individual, només una massa de color que envolta la Mare de Déu com una aurèola de sang.",
      "Els medallons de la corona: cada gemma té la seva llum pròpia, amb el reflex precís.",
    ],
    curiositats: [
      "El díptic va ser separat el segle XVIII: la part del donant va anar a parar a Berlín, i les parts es veuen avui a dos museus diferents.",
      "El rostre d'Agnès Sorel com a Mare de Déu va ser considerat escandalós durant segles; avui és el document més famós de la imatge reial francesa.",
    ],
    relacionades: ["home-turbant", "retrat-francesc-i", "madonna-granduca"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "jardi-delicies",
    titol: "El jardí de les delícies",
    autorSlug: "bosch",
    autorNom: "El Bosch",
    data: "aprox. 1500-1505",
    anyInici: 1500, anyFi: 1505,
    tecnica: "Oli sobre taula de roure (tríptic)",
    dimensions: "220 × 389 cm obert",
    ubicacio: { museu: "Museu Nacional del Prado", ciutat: "Madrid", pais: "Espanya", url: "https://www.museodelprado.es" },
    disciplina: "pintura", periode: "flamenc", ambit: "flandes",
    concepts: ["iconografia", "oli-tempera"],
    relevancia:
      "És el tríptic més enigmàtic de la pintura universal: el paradís, el jardí dels plaers (pecats) i l'infern en tres panells, amb una imaginació que no té precedent ni successor fins al surrealisme. Cap obra no ha generat tantes interpretacions ni tant desitgi d'observar-la de prop.",
    context:
      "El tríptic es pinta a 's-Hertogenbosch, als Països Baixos, per a un col·leccionista noble; el 1593 Felip II el va comprar i el va portar a l'Escorial, on es va conèixer com «la pintura del madroño» pels fruits vermells del panell central. El programa és una exhortació moral: el panell esquerre mostra el Paradís (Déu presenta Eva a Adam), el central el jardí dels plaers (la humanitat consumida pel desig), el dretà l'infern (el castig musical, amb un home-clau i un ocell amb cap d'olla que es menja els condemnats). Felip II el col·locava a la seva cambra de treball: era la seva meditació diària sobre el pecat.",
    analisi:
      "El panell central és una geografia inventada: fonts de cristall, llacs plens de banyistes, animals gegants que s'empassen homes, cavallers que circulen en cercle al voltant d'una dona de flor. Cada detall és una metàfora sexual o moral: el madroño (l'ambigüitat del plaer), la torre de vidre (fragilitat), les parelles dins de boles transparents (l'esperit captiu). L'infern és una sinfonia negra: llums tècniques (espases-talents, orgues que sotmeten), menjar humà, una cara pintada al fons del paisatge que és el retrat mateix de Bosch, segons alguns. La tècnica és transparent: capes fines d'oli sobre dibuix precís, amb un detall que es descobreix només de prop. La llum és freda i uniforme: és la llum del somni, no la del món.",
    miraHiDeProp: [
      "La torre central del paradís: una font de cristall envaïda per la vegetació, amb ocells que entren i surten.",
      "L'home-arbre de l'infern: el cos és un tronc buit on figures petites dansen i un camí puja fins a la capçalera-torre.",
      "La cara al fons de l'infern: uns reflexos del paisatge nocturn s'han identificat com el rostre mateix de Bosch.",
    ],
    curiositats: [
      "Felip II va pagar 750 ducats per el tríptic i el va col·locar a la seva cambra: era el quadre més car del monestir d'Escorial.",
      "El surrealisme (Dalí, Breton) el va reivindicar com a precedent: Dalí va pintar «El gran masturbador» amb un paisatge del jardí al fons.",
    ],
    relacionades: ["retaule-gant", "torre-babel", "cacadors-neu"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "autoretrat-durer-1498",
    titol: "Autoretrat amb guants (de 1498)",
    autorSlug: "durer",
    autorNom: "Albrecht Dürer",
    data: "1498",
    anyInici: 1498, anyFi: 1498,
    tecnica: "Oli sobre taula de til·ler",
    dimensions: "52 × 41 cm",
    ubicacio: { museu: "Museu Nacional del Prado", ciutat: "Madrid", pais: "Espanya", url: "https://www.museodelprado.es" },
    disciplina: "pintura", periode: "nord", ambit: "alemanya",
    concepts: ["retrat-humanista", "oli-tempera"],
    relevancia:
      "És el primer autoretrat «a la moda» de la història: Dürer, de 27 anys, es pinta com un noble elegant al mode italià, amb cabell arrissat, guants elegants i una finestra sobre un paisatge alpí. És la declaració del pintor com a home culte i cosmopolita, no com a artesà.",
    context:
      "Dürer pinta l'autoretrat després del seu primer viatge a Itàlia (1494-1495), on descobreix la Renaixença italiana i el prestigi social del pintor. La inscripció al fons diu: «He pintat així d'acord amb la meva figura, a l'edat de vint-i-sis anys, Albrecht Dürer». És un manifesto: un artesà alemany no es pintava mai dempeus, amb finestra i paisatge, com un senyor. El quadre va anar a parar a la col·lecció de Felip IV d'Espanya, i des del segle XVII és al Prado.",
    analisi:
      "El bust es pinta en tres quarts, amb el cap girat cap a l'espectador i una mirada serena i segura. La llum és freda i clara, alemanya: modula el rostre amb precisió, però sense el sfumato italià. El paisatge de la finestra, amb els Alps pintats a la dreta, és el document del viatge italià i la prova que el món exterior és part del retrat. El vestit —un abric amb cordons i borles, la camisa brodada, els guants de pell de carnet— és una demostració de moda i de rang social. La signatura, a la finestra, és la proclamació: «Albrecht Dürer de Nuremberg».",
    miraHiDeProp: [
      "La finestra i el paisatge alpí: la primera finestra real de la pintura alemanya, amb perspectiva d'interior i exterior.",
      "Els guants: cada dit té la seva pell pintada amb precisió de tabac.",
      "La inscripció a la finestra: «Albrecht Dürer de Nuremberg, 26 anys».",
    ],
    curiositats: [
      "És un dels tres autoretrats pintats de Dürer que sobreviuen (1493, 1498, 1500); el de 1500, de front com a Crist, és a Múnic.",
      "El quadre va ser comprat per Felip IV el 1630 i va ser un dels autoretrats favorits del rei, que el tenia a la seva cambra.",
    ],
    relacionades: ["autoretrat-durer-1500", "dama-ermini", "home-turbant"],
    bloc: 6,
  },
  {
    slug: "autoretrat-durer-1500",
    titol: "Autoretrat en forma d'ecce Homo (de 1500)",
    autorSlug: "durer",
    autorNom: "Albrecht Dürer",
    data: "1500",
    anyInici: 1500, anyFi: 1500,
    tecnica: "Oli sobre taula de til·ler",
    dimensions: "67 × 49 cm",
    ubicacio: { museu: "Alte Pinakothek", ciutat: "Múnic", pais: "Alemanya" },
    disciplina: "pintura", periode: "nord", ambit: "alemanya",
    concepts: ["retrat-humanista", "iconografia"],
    relevancia:
      "És l'autoretrat més audaç de la història: Dürer es pinta de front, amb la mà dreta alçada en gest de benedicció, exactament com els retrats de Crist. Ni Leonard ni Miquel Àngel no s'havien permès mai això. El pintor alemany s'assumeix com a creador a imatge de Déu.",
    context:
      "Dürer pinta aquesta taula el 1500, any simbòlic del canvi de mil·lenni, quan era el pintor més famós del nord d'Europa. La inscripció diu: «Així em vaig fer Albrecht Dürer de Nuremberg, a l'edat de vint-i-vuit anys, amb colors permanents». La postura de front i la mà aixecada citen l'ecce Homo i el Crist Salvator Mundi de la tradició romana d'Orient; els cabells llargs i la barba central complet el tipus. La lectura més acceptada és teològica: l'artista com a imago Dei, creador per subrogació divina, no és blasfèmia sinó afirmació de la dignitat del geni.",
    analisi:
      "La frontalitat és absoluta: cap altre autoretrat de la història fins al segle XX no ha estat tan simètric. La cara és pintada amb una precisió dermatològica: cada pèl de la barba, cada arruga del front, cada cabell del rínxol. El fons fosc concentra tota l'atenció en el rostre i en la mà alçada, que té la precisió d'una mà de sants. La llum ve del davant, sense ombres dramàtiques: és una llum sagrada, com la dels icones. El vestit fosc, amb pell de marmot, és modest: tot és rostre i gest.",
    miraHiDeProp: [
      "La mà dreta alçada en gest de benedicció: la precisió de cada dit és la mateixa de les mans dels sants dels retaules alemanys.",
      "La inscripció a la part superior: la data 1500, amb la informació de l'edat i el lloc, es converteix en un segell oficial.",
      "Els ulls: la mirada directa i frontal, que no és pas arrogança sinó introspecció.",
    ],
    curiositats: [
      "Dürer va escriure que «aquí jo, Albrecht Dürer de Nuremberg, em vaig pintar amb colors eterns a l'edat de vint-i-vuit anys».",
      "El quadre va ser adquirirt pel príncep elector de Baviera el 1805; l'Alte Pinakothek el considera la peça central de la col·lecció Dürer.",
    ],
    relacionades: ["autoretrat-durer-1498", "home-turbant", "gioconda"],
    bloc: 6,
  },
  {
    slug: "retrat-francesc-i",
    titol: "Retrat de Francesc I",
    autorSlug: "clouet",
    autorNom: "Jean Clouet",
    data: "aprox. 1530",
    anyInici: 1527, anyFi: 1530,
    tecnica: "Oli i tempera sobre taula",
    dimensions: "96 × 74 cm",
    ubicacio: { museu: "Museu del Louvre", ciutat: "París", pais: "França", url: "https://www.louvre.fr" },
    disciplina: "pintura", periode: "nord", ambit: "franca",
    concepts: ["retrat-humanista"],
    relevancia:
      "És el retrat oficial del Renaixement francès: Francesc I, el rei mecenes que va portar Leonardo a França, pintat amb tota la pompa del poder i la intel·ligència d'un monarca que s'assumeix com a rei-renaixentista. Clouet defineix el tipus de retrat de cort francès per a un segle.",
    context:
      "Francesc I regnava des de 1515 i havia portat a França el Renaixement italià: va convidar Leonardo el 1516 (que va morir a Amboise el 1519 amb la Gioconda a les seves mans), va construir Chambord i Fontainebleau, i va protegir les arts amb un programa real. Clouet, pintor del rei, era el retratista oficial de la cort, format a la tradició flamenca i en contacte amb la italiana. El retrat és una obra d'Estat: el rei apareix amb el vestit daurat, la lliure (collar) de l'Orde de sant Miquel, i tots els símbols de la majestat.",
    analisi:
      "El bust es pinta en tres quarts, amb el cos orientat cap a l'espectador i el rostre serè. El vestit daurat, brodat amb fils d'or i plata, i les mànigues trencades són pintades amb una precisió joiera: cada fil de brodat, cada borla és diferent. El rostre, amb la barba negra i el nas llarg, és un document de fisonomia: el rei no és idealitzat, però és dignificat. El fons fosc elimina l'ambient: tot és presència. La llum és freda i precisa, flamenca, i modula la cara i les mans amb un realisme que contrasta amb el lux del vestit.",
    miraHiDeProp: [
      "El brodat del vestit: cada fils daurat és diferent i cada borla té la seva llum.",
      "El collar de l'Orde de sant Miquel, amb les petxines: el símbol principal del poder reial.",
      "Les mans, creuades: una sosté el guant, l'altra es recolza amb l'autoritat d'un retrat de poder.",
    ],
    curiositats: [
      "El retrat va passar de la col·lecció reial al Louvre sense sortir de França: és el document visual del «rei cavaller» que va capturar Pavia el 1525.",
      "Clouet pintava també miniatures i dibuixos preparatoris: més de 130 retrats dibuixats de la cort francesa es conserven, el corpus més complet del segle.",
    ],
    relacionades: ["dama-ermini", "ambaixadors", "chambord"],
    bloc: 6,
  },
  {
    slug: "ambaixadors",
    titol: "Els ambaixadors",
    autorSlug: "holbein",
    autorNom: "Hans Holbein el Jove",
    data: "1533",
    anyInici: 1533, anyFi: 1533,
    tecnica: "Oli sobre taula de roure",
    dimensions: "207 × 209 cm",
    ubicacio: { museu: "National Gallery", ciutat: "Londres", pais: "Regne Unit", url: "https://www.nationalgallery.org.uk" },
    disciplina: "pintura", periode: "nord", ambit: "alemanya",
    concepts: ["retrat-humanista", "iconografia", "escorc"],
    relevancia:
      "És el retrat doble més intel·ligent del Renaixement: dos ambaixadors amb tots els símbols del saber i del poder, i al davant, un crani anamòrfic que només es veu quan t'apropes. Ciència, religió i mort en un quadre que sembla un inventari i és una meditació.",
    context:
      "Holbein pinta el quadre a Londres el 1533, quan treballava per a Enric VIII: els models són Jean de Dinteville, ambaixador francès a Anglaterra (a l'esquerra), i el seu amic Georges de Selve, bisbe de Lavaur (a la dreta). El quadre es penjava en un passadís alt, cosa que explica l'anamorfosi del crani: quan es passa pel costat, el crani es veu normal. Els objectes de l'espai entre les figures és un inventari dels sabers del Renaixement: globus celeste i terrestre, regle i compas, llibres de comptabilitat, la lira de sant Martí, un llibre d'himnes luterà obert, i una corda trencada de llaüt (la discordia religiosa del temps).",
    analisi:
      "La composició és simètrica: els dos ambaixadors flanquegen una prestatgeria de dos nivells, amb els objectes de les ciències (a dalt) i de les arts i la música (a sota). Els retrats són d'una precisió fotogràfica: el vestit de vellut de Dinteville amb el puny de l'Orde de sant Miquel, la toga fosca del bisbe amb el llibre. El detall dels objectes és una demostració de domini de l'oli: el globus amb les línies de latitud, el llibre de luter amb la tipografia exacta, el llaüt amb la corda trencada. L'anamorfosi del crani, pintada a la diagonal del davant, és la intervenció més intel·ligent: la mort (memento mori) travessa tota la pompa del saber quan l'espectador canvia de punt de vista.",
    miraHiDeProp: [
      "El crani anamòrfic: apropiat a la cantonada dreta del quadre, el crani es reconstitueix; és la lliçó memento mori.",
      "El globus celeste i el globus terrestre: el terrestre marca les terres de Dinteville (Chisleu) i el celeste té els estels de la constel·lació de la Corona.",
      "El llibre d'himnes luterà: la pàgina oberta i les dues cançons (una sobre la llei, l'altra sobre la gràcia) són llegibles: és la marca de la Reforma.",
    ],
    curiositats: [
      "El crani anamòrfic és una de les primeres anamorfosis pintades de la història; la tècnica es desenvoluparà al segle XVII.",
      "El quadre va ser comprat per la National Gallery el 1890: avui és una de les obres més visitades del museu, i la National Gallery ofereix un mirall anamòrfic per veure el crani.",
    ],
    relacionades: ["retrat-francesc-i", "matrimoni-arnolfini", "crist-mort-mantegna"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "torre-babel",
    titol: "La torre de Babel",
    autorSlug: "bruegel",
    autorNom: "Pieter Bruegel el Vell",
    data: "1563",
    anyInici: 1563, anyFi: 1563,
    tecnica: "Oli sobre taula de roure",
    dimensions: "114 × 155 cm",
    ubicacio: { museu: "Kunsthistorisches Museum", ciutat: "Viena", pais: "Àustria" },
    disciplina: "pintura", periode: "nord", ambit: "flandes",
    concepts: ["perspectiva-aeria", "iconografia"],
    relevancia:
      "És la imatge més famosa del projecte humà fracassat: Bruegel pinta la torre bíblica com una obra en construcció real, amb guies i cuines, a l'estil del Coliseu de Roma, dins d'un port flandenc. És el document més precís de com es construïa al segle XVI i una meditació sobre l'orgull.",
    context:
      "Bruegel pinta la torre el 1563, l'any del seu matrimoni, quan torna d'Itàlia (1552-1555) on havia vist el Coliseu i els ports mediterranis. La torre bíblica és una construcció romana: les arcs i la maçonaria són del Coliseu, i el port és un port de Flandes amb vaixells de comerç. El rei Nimrod, amb el seguici, baixa a inspeccionar la construcció: és la metàfora de l'orgull imperial que Déu castigarà amb la confusió de les llengües. Existeix una segona versió, més petita, al Museu Boijmans de Rotterdam.",
    analisi:
      "La composició és una piràmide construïda: la torre puja des del port fins al cel, amb la majestuositat d'una muntanya artificial. Bruegel pinta la construcció amb una precisió d'enginyer: cada finestra, cada escala, cada forn de pa, cada part del procés és visible. El color és brunyit i daurat: la torre és un organisme viu, amb la humitat de la costa i la llum del migdia. La perspectiva aèria és decisiva: el port del davant és nítid, però el camp del davant s'apaga en blaus verdosos, i el cel superior, amb núvols, és la frontera on la torre no arribarà. El contrast entre la minúscula figuina humana i la grandària de la torre és la lecció moral.",
    miraHiDeProp: [
      "La construcció de la torre: els forns de pa, les grues de fusta, els vaixells amb pedra que descarreguen: tot el procés tecnològic del segle XVI.",
      "El rei Nimrod baixant a la torre, amb el seguici: és l'únic moment narratiu del quadre.",
      "Les cases del davant de la torre: la ciutat humana, amb els seus teulats i les seves vidrieres, davant del projecte col·lectiu.",
    ],
    curiositats: [
      "Bruegel va pintar dues versions de la torre; la de Viena és la més gran i la més detallada, i la de Rotterdam és més fosca i compacta.",
      "La torre té un doble gir: l'estil del Coliseu romà (la tradició classica) i el port de Flandes (la realitat nòrdica): és la síntesi del Renaixement nòrdic.",
    ],
    relacionades: ["cacadors-neu", "jardi-delicies", "assumcio-frari"],
    bloc: 6,
  },
  {
    slug: "cacadors-neu",
    titol: "Caçadors a la neu",
    autorSlug: "bruegel",
    autorNom: "Pieter Bruegel el Vell",
    data: "1565",
    anyInici: 1565, anyFi: 1565,
    tecnica: "Oli sobre taula de roure",
    dimensions: "117 × 162 cm",
    ubicacio: { museu: "Kunsthistorisches Museum", ciutat: "Viena", pais: "Àustria" },
    disciplina: "pintura", periode: "nord", ambit: "flandes",
    concepts: ["perspectiva-aeria", "retrat-humanista"],
    relevancia:
      "És la pintura de paisatge més famosa de la història: Bruegel pinta el desembre flamenc amb els caçadors tornant al poble, els patinadors sobre el gel, i un paisatge que s'obren en capes atmosfèriques fins a l'horitzó. És el document de la vida camperola i la síntesi de la perspectiva aèria.",
    context:
      "El quadre és un dels sis del cicle dels Mesos, encarregat per Nicolaes Jonghelinck, un col·leccionista d'Anvers, per decorar la seva casa: cada quadre representa un mes o una època de l'any, amb les activitats camperoles corresponents. «Caçadors a la neu» és el gener-desembre del hivern. Bruegel, que s'havia format a Anvers i viatjat a Itàlia, converteix el paisatge en el protagonista: els homes són petits en un món natural immens. El cicle es va dispersar; cinc quadres són a Viena i un (la Vendimia) ha desaparegut.",
    analisi:
      "La composició divideix el quadre en tres capes atmosfèriques: el davant, amb els caçadors, els gossos i el poble (foscos, nítids); el mitjà, amb els patinadors sobre el gel dels estanys i els turons amb arbres cremats; el fons, amb les muntanyes nevades dissoltes en blau grisós. La perspectiva aèria és aplicada amb rigor científic: cada capa perd color i nitidesa. El color és fred: blancs, grisos, verds foscos, amb el negre dels corbs i la roba dels caçadors com a accents. La narrativa és mínima però exacta: els caçadors tornen amb una sola guineu (dia dolent), els gossos esgotats, el poble que treballa (la matança del porc, el foc de la llar), els patinadors i els trineus. Cada detall del poble és un document de la vida flamenca del segle XVI.",
    miraHiDeProp: [
      "Els caçadors i els gossos: el ritme de les passes, la càrrega de la guineu, la fatiga dels gossos.",
      "El patinador que fa una pirueta al centre: el petit detall de vida que converteix el paisatge en escena.",
      "Les muntanyes del fons: dissoltes en blau grisós, són la demostració màxima de la perspectiva aèria aplicada.",
    ],
    curiositats: [
      "El cicle dels Mesos estava pensat per a una casa d'Anvers: cada quadre s'enganyava a una paret amb una finestra, i la llum canviava amb l'hora.",
      "El quadre es va comprar el 1594 per a l'emperador Rodolf II, i des del segle XVII és al Kunsthistorisches Museum de Viena.",
    ],
    relacionades: ["torre-babel", "jardi-delicies", "vista-toledo"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "cavaller-ma-pit",
    titol: "El cavaller amb la mà al pit",
    autorSlug: "el-greco",
    autorNom: "El Greco (Doménikos Theotokópoulos)",
    data: "aprox. 1580",
    anyInici: 1580, anyFi: 1580,
    tecnica: "Oli sobre llenç",
    dimensions: "82 × 66 cm",
    ubicacio: { museu: "Museu Nacional del Prado", ciutat: "Madrid", pais: "Espanya", url: "https://www.museodelprado.es" },
    disciplina: "pintura", periode: "manierisme", ambit: "espanya",
    concepts: ["retrat-humanista", "clarobscur"],
    relevancia:
      "És el retrat espanyol per excel·lència: un cavaller de Toledo, anònim, amb la mà al pit en gest de jurament, pintat amb una llum freda i una dignitat silenciosa que defineix l'honor castellà. És la síntesi del Manierisme venecià i de l'espiritualitat espanyola.",
    context:
      "El Greco arriba a Toledo el 1577, després de formar-se a Creta (tradició romana d'Orient), Venècia (Ticià, Tintoretto) i Roma. El quadre pertany a la sèrie de retrats de cavallers toledans que pinta durant la dècada de 1580; la identificació tradicional (el marquès de Villena, don Álvaro de la Cueva) no és documentada. El gest de la mà al pit és el jurament de fidelitat a l'honor: és el document pictòric del nobiliari espanyol del segle XVI. El quadre va entrar al Prado el 1930.",
    analisi:
      "El bust és frontal i monumental: el cavaller mira directament l'espectador amb una serenitat que no és pas orgull, és autoritat. La mà dreta, amb el polze alçat i els dits junts, toca el pit en el gest del jurament: és l'únic moviment del quadre. El color és restrictiu: negre, blanc de la gorguera, el bru de la cara i les mans. La llum és freda i veneciana, però el tractament és espanyol: el contrast entre la cara il·luminada i el fons fosc és un clarobscur que anticipa el Barroc. El detall del coll de gorguera, amb cada plec pintat, és la demostració tècnica: cada roba té el seu comportament de llum.",
    miraHiDeProp: [
      "La mà al pit: el gest del jurament, amb el polze alçat i els dits junts, és el centre emocional del retrat.",
      "La gorguera: cada plec té la seva ombra, i la tecla blanca contrasta amb el negre del vestit.",
      "Els ulls: la serenitat és la mateixa que la dels santors romans d'Orient, però amb una introspecció moderna.",
    ],
    curiositats: [
      "El quadre és el retrat espanyol més reproduït del segle XVI: és la imatge de «l'honor» en tots els manuals.",
      "El Greco va pintar diverses versions del tema; la del Prado és la millor conservada i la més monumental.",
    ],
    relacionades: ["enterrament-orgaz", "vista-toledo", "dama-ermini"],
    bloc: 6,
  },
  {
    slug: "enterrament-orgaz",
    titol: "L'enterrament del comte d'Orgaz",
    autorSlug: "el-greco",
    autorNom: "El Greco (Doménikos Theotokópoulos)",
    data: "1586-1588",
    anyInici: 1586, anyFi: 1588,
    tecnica: "Oli sobre llenç",
    dimensions: "480 × 360 cm",
    ubicacio: { museu: "Església de Santo Tomé", ciutat: "Toledo", pais: "Espanya" },
    disciplina: "pintura", periode: "manierisme", ambit: "espanya",
    concepts: ["retrat-humanista", "composicio-piramidal", "iconografia"],
    relevancia:
      "És la obra cabdal d'El Greco i una de les pintures més importants d'Espanya: la divisió del món en dues zones (la terra, amb els nobles toledans; el cel, amb Crist, la Mare de Déu i els sants) i més de cinquanta retrats contemporanis en un sol fresc monumental.",
    context:
      "Andrés Núñez, rector de Santo Tomé, encarrega el quadre el 1586 per a la capella del comte d'Orgaz, un noble toledà del segle XIV que, segons la llegenda, va ser enterrat per sant Esteve i sant Agustí en persona, que van baixar del cel per fer-li els honors. El Greco pinta la llegenda a la zona inferior i el cel al superior, amb un contracte detallat. Els retrats contemporanis —clergues, nobles, cavallers de Santiago— són el document social més complet de la Toledo del segle XVI, i el fill del pintor, Jorge Manuel, apareix al davant.",
    analisi:
      "La composició divideix el llenç en dos móns: el terrestre (inferior), amb l'enterrament de sant Esteve i sant Agustí davant de la multitud de retrats; el celestial (superior), on Crist, la Mare de Déu, sant Joan Baptista i els sants reben l'ànima del comte. Els dos móns estan connectats per la vertical: l'ànima del comte, com un nen, puja cap a Crist, i el bisbe de l'esquerra, amb el gest de les mans, rep l'accent de la llum celestial. La zona terrestre és pintada amb un realisme detallista: cada roba, cada ornament, cada rostre és identificable. La zona celestial és pintada amb un llenguatge entirely diferent: figures allargades, núvols de transparència, colors violats i verdets, una llum freda i mística. És la síntesi de dues tradicions: el retrat venecià-flamenc i la visió romana d'Orient d'El Greco.",
    miraHiDeProp: [
      "La línia de contacte entre els dos móns: les ànimes dels nens i els àngels que pugen i baixen connecten terra i cel.",
      "Els retrats del davant: el canonge Rodrigo de la Fuente, l'home amb el barret negre, i el nen del davant (el fill d'El Greco) amb el paper on està escrita la firma.",
      "La armadura de Sant Esteve: el detall de la cadena i de la pedra és pintat amb precisió d'armorer.",
    ],
    curiositats: [
      "El Greco va signar el contracte amb clàusules exactes sobre la quantitat de figures i la qualitat de l'ultramar: és un dels contractes artístics més complets del segle XVI.",
      "El quadre mai no ha sortit de la seva capella: és el monument pictòric de Toledo, i la capella va ser ampliada per contenir-lo.",
    ],
    relacionades: ["cavaller-ma-pit", "vista-toledo", "judici-final"],
    obraFita: true,
    bloc: 6,
  },
  {
    slug: "vista-toledo",
    titol: "Vista de Toledo",
    autorSlug: "el-greco",
    autorNom: "El Greco (Doménikos Theotokópoulos)",
    data: "aprox. 1599-1600",
    anyInici: 1599, anyFi: 1600,
    tecnica: "Oli sobre llenç",
    dimensions: "121 × 109 cm",
    ubicacio: { museu: "Metropolitan Museum of Art", ciutat: "Nova York", pais: "EUA", url: "https://www.metmuseum.org" },
    disciplina: "pintura", periode: "manierisme", ambit: "espanya",
    concepts: ["perspectiva-aeria", "clarobscur"],
    relevancia:
      "És un dels primers paisatges autònoms de la pintura occidental i el primer retrat d'una ciutat espanyola: Toledo sota un cel de tempesta, amb les cases girades, les muralles i l'Alcasser, pintats amb una energia cromàtica que converteix el paisatge en visió espiritual.",
    context:
      "El Greco pinta la vista de Toledo al final de la seva vida, quan ja era el pintor més important de la ciutat. El quadre és probablement un encàrrec privat: el paisatge urbà com a tema, sense figures sagrades, era una novetat absoluta a Espanya. Toledo, la ciutat imperial, apareix vista des del sud, amb el Tajo i l'Alcasser, sota un cel de núvols que no és pas un decorat: és la força que dona sentit a tot el quadre. El quadre va passar a la col·lecció de la família de Gómez de Toledo fins que el Metropolitan el va comprar el 1904.",
    analisi:
      "La composició divideix el llenç en dues zones desiguals: la ciutat, al davant i a l'esquerra, i el cel, que ocupa més de la meitat. El detall urbà és precís: les cases, les muralles, l'Alcasser, el monestir de sant Juan de los Reyes, el pont d'Alcántara. Però la geografia és imaginària: El Greco trasllada l'Alcasser a l'esquerra i barreja elements per crear una ciutat ideal, no documental. El cel és el protagonista: núvols de tempesta, verdets i ocre, amb una llum que trenca per una esquerda i il·lumina les cases. El color és fred i vibràtil: verds foscos, ocre, azur, amb els llums de les cases com a punts càlids. És una pintura que anticipa el paisatge romàntic i expressionista: la ciutat com a ànima.",
    miraHiDeProp: [
      "El cel de tempesta: els núvols girats, amb la llum que trenca al centre, és la força expressiva del quadre.",
      "L'Alcasser, a l'esquerra: el trasllat deliberat de la geografia real per crear una ciutat simbòlica.",
      "Les cases de color verd foscos: la paleta d'El Greco, que converteix la pedra en matèria orgànica.",
    ],
    curiositats: [
      "És un dels tres paisatges urbans que El Greco va pintar (els altres dos, Vista i plànol de Toledo, són al Museu El Greco de Toledo).",
      "El quadre va ser adquirit pel Metropolitan el 1904 per la suma de 35.000 dòlars: avui és una de les peces claus de la col·lecció espanyola.",
    ],
    relacionades: ["enterrament-orgaz", "cacadors-neu", "cavaller-ma-pit"],
    bloc: 6,
  },
];
