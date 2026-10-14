// obres/pintura-italia-1.ts — Pintura italiana I: Masaccio, Botticelli, Piero della Francesca, Mantegna, Leonardo (12 obres)
import type { Obra } from "../types";

export const PINTURA_ITALIA_1: Obra[] = [
  {
    slug: "anunciacio-fra-angelico",
    titol: "L'Anunciació",
    autorSlug: "fra-angelico",
    autorNom: "Fra Angelico",
    data: "cap a 1425-1426",
    anyInici: 1425, anyFi: 1426,
    tecnica: "Tempera i or sobre taula",
    dimensions: "190,3 × 191,5 cm",
    ubicacio: { museu: "Museu del Prado", ciutat: "Madrid", pais: "Espanya", url: "https://www.museodelprado.es/coleccion/obra-de-arte/la-anunciacion/9b02b6c9-3618-4a92-a6b7-26f9076fcb67" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "oli-tempera", "iconografia"],
    relevancia: "Una obra de transició ideal per comparar amb la Trinitat de Masaccio: Fra Angelico obre un espai arquitectònic cap a l'habitació de Maria, però la representació dels plans interiors encara és forçada i no té la coherència geomètrica del fresc florentí.",
    context: "Pintada per al convent dominic de San Domenico de Fiesole, l'obra combina l'Anunciació sota el pòrtic amb l'expulsió d'Adam i Eva al jardí. La imatge d'aquesta fitxa mostra la taula principal; la predel·la narrativa no hi apareix.",
    analisi: "Les columnes, l'arcada i les diagonals del pòrtic intenten donar profunditat i orienten la mirada cap a l'habitació del fons. El Prado hi reconeix un punt de fuga i un primer ús de la perspectiva renaixentista, però també una resolució forçada dels tres plans de la cambra de Maria. No és una perspectiva sense punt de fuga ni simplement un fracàs: és un assaig primerenc en què conviuen espai mesurable i convencions gòtiques. Compara'l amb la volta de cassetons i les ortogonals més sistemàtiques de la Trinitat de Masaccio.",
    miraHiDeProp: [
      "Segueix les vores del pòrtic i localitza la porta que deixa entreveure l'habitació de Maria: què ajuda a imaginar-hi al darrere?",
      "Compara les línies de la cambra del fons: totes descriuen un espai tan coherent com el de la volta de Masaccio?",
      "Observa Adam i Eva al jardí i l'àngel i Maria sota el pòrtic: quin contrast narratiu uneix les dues escenes?",
    ],
    curiositats: ["El Prado descriu aquesta Anunciació com una de les primeres grans obres renaixentistes de Florència que fa ús de la perspectiva."],
    relacionades: ["trinitat-masaccio", "tribut-sant-pere", "desposoris-verge"],
    bloc: 1,
  },
  {
    slug: "trinitat-masaccio",
    titol: "La Santíssima Trinitat",
    autorSlug: "masaccio",
    autorNom: "Masaccio",
    data: "1425-1428",
    anyInici: 1425, anyFi: 1428,
    tecnica: "Fresc",
    dimensions: "667 × 317 cm",
    ubicacio: { museu: "Santa Maria Novella", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "fresc", "composicio-piramidal"],
    relevancia:
      "És una de les primeres grans aplicacions pictòriques de la perspectiva lineal associada als experiments de Brunelleschi: una capella fictícia sembla prolongar l'espai real gràcies a un punt de fuga situat a l'altura dels ulls de l'espectador.",
    context:
      "El fresc decora la nau de la basílica florentina de Santa Maria Novella, probablement per encàrrec de la família Lenzi, el sepulcre de la qual ocupa la base del compartiment. Es pinta entre 1425 i 1428, en els anys en què Brunelleschi aixecava la cúpula de la catedral i Florència es pensava com la nova Roma. El tema respon a una devoció concreta: la Trinitat —Déu Pare que sosté la creu, amb la colometa de l'Esperit Sant—, flanquejada per la Mare de Déu i sant Joan, amb els comitents agenollats fora de l'espai sagrat. Al davant, un esquelet tombat sobre el sarcòfag recorda al visitant que davant la mort només la fe salva: «Jo ja era allò que sou, i allò que sou encara sóc».",
    analisi:
      "La composició fa semblar real una capella pintada: l'arc i la volta de canó cassetonada reculen cap a un punt de fuga al centre del graó dels donants, aproximadament a l'altura dels ulls d'un espectador que mira des de la nau. Les vores dels cassetons marquen les direccions de profunditat; si les prolonguem, conflueixen en aquell punt. Aquesta coherència geomètrica és més sistemàtica que l'assaig de l'habitació de Fra Angelico. Les figures formen un eix vertical, de Déu Pare a Crist i fins al nivell dels comitents. Maria assenyala el Fill; la llum modela els cossos amb pes escultòric. Sota el graó, el sepulcre recorda la mortalitat humana.",
    miraHiDeProp: [
      "Els cassetons de la volta: cada reducció de mida està calculada per forçar la sensació de profunditat real.",
      "El gest de la Mare de Déu: els seus ulls dirigeixen l'espectador cap a Crist, l'única figura que no mira cap a dins de l'escena.",
      "Les columnes jòniques que sostenen l'arc i les pilastres corínties que emmarquen el conjunt: Masaccio pinta l'arquitectura clàssica de Brunelleschi.",
    ],
    curiositats: [
      "Al segle XVI el fresc va quedar tapat per un retaule i no es va redescobrir fins al 1861; la perspectiva completa es va veure de nou després de la restauració de 1952.",
      "Vasari, quan va col·locar el retaule que amagava el fresc, va descriure'l amb detall: gràcies a ell sabem com era abans de ser tapat.",
    ],
    relacionades: ["anunciacio-fra-angelico", "desposoris-verge", "expulsio-paradis"],
    obraFita: true,
    bloc: 1,
  },
  {
    slug: "tribut-sant-pere",
    titol: "El tribut de sant Pere",
    autorSlug: "masaccio",
    autorNom: "Masaccio",
    data: "1425-1428",
    anyInici: 1425, anyFi: 1428,
    tecnica: "Fresc",
    dimensions: "255 × 598 cm",
    ubicacio: { museu: "Capella Brancacci, Santa Maria del Carmine", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["clarobscur", "fresc", "perspectiva-lineal"],
    relevancia:
      "Una lliçó de narració renaixentista: tres moments d'una mateixa història —la reclamació, la troballa de la moneda i el pagament— conviuen en un únic paisatge. Les figures tenen volum i la perspectiva de l'edifici dirigeix l'atenció cap a Crist.",
    context:
      "El fresc pertany al cicle de la Capella Brancacci, començat per Masolino i Masaccio el 1425 i acabat per Filippino Lippi el 1480, per encàrrec de Felice Brancacci, ric mercader de seda i membre del govern florentí. El tema del tribut miracle de Mateu era d'actualitat: el 1427 Florència va instituir el catasto, el primer impost personal modern, i l'escena del pagament a l'autoritat es llegia com una al·legoria cívica. L'acció es desenvolupa a Cafarnaüm, davant el llac on Pere trobarà la moneda a la boca d'un peix.",
    analisi:
      "Al centre, el recaptador reclama el tribut i Crist indica a Pere el llac. A l'esquerra, Pere troba la moneda al peix; a la dreta, paga al recaptador. El mateix personatge apareix tres vegades en un paisatge continu. Les ortogonals de l'edifici de la dreta, prolongades visualment, condueixen cap al cap de Crist i reforcen el centre narratiu. Una llum coherent modela els cossos i fa que projectin ombres al terra. Les muntanyes del fons perden intensitat i contrast: és un altre recurs de profunditat, atmosfèric, diferent de la geometria de l'edifici.",
    miraHiDeProp: [
      "Segueix les vores de l'edifici de la dreta fins al cap de Crist: la perspectiva ajuda a identificar el centre de l'episodi.",
      "La mirada dels apòstols: cadascú reacciona amb un gest diferent a la notícia del tribut.",
      "Sant Pere agenollat al llac: l'escala de la figura segueix la perspectiva del paisatge.",
    ],
    curiositats: [
      "Miquel Àngel, adolescent, copiava aquestes figures al Carmine; allà va rebre el cop de puny de Pietro Torrigiano que li va trencar el nas.",
      "La restauració de 1984-1990 va recuperar els colors originals, molt més vius que els tons foscos que es veien durant segles.",
    ],
    relacionades: ["trinitat-masaccio", "expulsio-paradis", "enterrament-orgaz"],
    bloc: 1,
  },
  {
    slug: "expulsio-paradis",
    titol: "L'expulsió del paradís terrenal",
    autorSlug: "masaccio",
    autorNom: "Masaccio",
    data: "aprox. 1425",
    anyInici: 1425, anyFi: 1427,
    tecnica: "Fresc",
    dimensions: "208 × 88 cm",
    ubicacio: { museu: "Capella Brancacci, Santa Maria del Carmine", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["nu-classic", "clarobscur", "fresc"],
    relevancia:
      "El primer nu de la pintura moderna: Adam i Eva surten del paradís amb cossos construïts sobre l'observació anatòmica real i una emoció humana vertadera, el plor i el crit. Res de semblant no es pintava des de l'antiguitat.",
    context:
      "El fresc decora el costat esquerre de la Capella Brancacci, davant de La temptació de Masolino, que representa la mateixa parella abans del pecat. La comparació entre els dos frescs és el programa didàctic del comitent: Masolino pinta Adam i Eva com a figures refinades de tradició gòtica, mentre Masaccio els pinta com a éssers humans de carn i desesperació. L'escena correspon al Gènesi, amb l'àngel vermell que, amb l'espasa, talla la sortida del paradís.",
    analisi:
      "Els dos cossos es contraposen com a estudis antítics del dolor: Adam, amb el rostre tapat per la vergonya, arrossega un cos de musculatura clara i tensa; Eva, amb el rostre alçat i la boca oberta en un crit, té la silueta pesada d'una dona, construïda sobre el tipus de la Venus pudica antiga. La llum ve de dalt i cap a la dreta, contrària a la de la resta de la capella, perquè és una llum divina que els expulsa; les ombres projectades sobre el terra mesuren aquesta llum nova. No hi ha paisatge: un fons fosc buit concentra tota l'atenció en el gest i en el cos.",
    miraHiDeProp: [
      "El rostre d'Eva: la boca oberta i els ulls en blanc són l'expressió més extrema de tota la pintura del primer Quattrocento.",
      "La musculatura del braç i la cama d'Adam, construïda com una estàtua clàssica vista de perfil.",
      "L'àngel: només el braç i l'espasa, sense cap detall superflu —síntesi màxima.",
    ],
    curiositats: [
      "Al segle XVII les nueses es van tapar amb fulles de figuera pintades; la restauració del segle XX les va eliminar per recuperar l'original.",
      "Miquel Àngel va copiar aquestes figures per al Judici Final: comparar-les és una lliçó d'evolució de l'anatomia en un segle.",
    ],
    relacionades: ["trinitat-masaccio", "judici-final", "david-bronze-donatello"],
    bloc: 1,
  },
  {
    slug: "adoracio-mags-botticelli",
    titol: "L'adoració dels mags",
    autorSlug: "botticelli",
    autorNom: "Botticelli",
    data: "aprox. 1475",
    anyInici: 1475, anyFi: 1476,
    tecnica: "Tempera sobre taula",
    dimensions: "111 × 134 cm",
    ubicacio: { museu: "Galeria dels Uffizi", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["retrat-humanista", "composicio-piramidal"],
    relevancia:
      "És el manifest pictòric del poder dels Mèdici: la família mecenes apareix retratada com els mags que veneren el nen Jesús, i el mateix Botticelli es pinta a la vora mirant l'espectador. Una obra religiosa que és, en realitat, el retrat de grup més ambiciós del Quattrocento.",
    context:
      "El quadre es pinta per a Gaspare di Zanobi del Lama, ric canviador florentí, per a la seva capella de Santa Maria Novella. El tema és doble: l'adoració del nen i l'escena pública del poder florentí. Cosme el Vell, el «Pare de la Pàtria», és el mag agenollat davant del nen; els seus fills Pere i Joan, i el seu net el Magnífic, completen la cort. Incloure els membres vius d'una família dins d'una escena sagrada era una manera de legitimar públicament el seu domini.",
    analisi:
      "Les figures s'obren en un escenari amb arquitectura clàssica enrunada al fons: el món pagà antic ha cedit el lloc al nou ordre cristià. El grup central forma un triangle estable amb la Mare de Déu i el nen al vèrtex, protegits pel mag agenollat. Botticelli desplega el seu tipus de figura elegant, amb línies harmonioses, cabells clars i teles descrites amb minucia. A la dreta, la figura coberta d'un mantell daurat que mira l'espectador és l'autoretrat del pintor: la signatura moderna que substitueix la firma escrita.",
    miraHiDeProp: [
      "L'autoretrat de Botticelli, a l'extrem dret: el gest de mirar l'espectador trenca la quarta paret.",
      "Cosme el Vell agenollat: el rostre coincideix amb el dels busts i les monedes del «Pare de la Pàtria».",
      "L'arquitectura enrunada del fons: les pedres clàssiques han estat reaprofitades per construir el pessebre.",
    ],
    curiositats: [
      "S'ha identificat la majoria dels retratats: és el document visual més complet de la cort mèdica de la segona meitat del segle XV.",
      "Vasari explica que després d'aquest quadre Botticelli va esdevenir el pintor de moda dels Mèdici.",
    ],
    relacionades: ["primavera", "naixement-venus", "matrimoni-arnolfini"],
    bloc: 1,
  },
  {
    slug: "primavera",
    titol: "La Primavera",
    autorSlug: "botticelli",
    autorNom: "Botticelli",
    data: "aprox. 1482",
    anyInici: 1482, anyFi: 1482,
    tecnica: "Tempera sobre taula",
    dimensions: "203 × 314 cm",
    ubicacio: { museu: "Galeria dels Uffizi", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["iconografia", "composicio-piramidal"],
    relevancia:
      "És una de les primeres grans obres laiques del Renaixement: un quadre de gran format per a una habitació privada, sense tema religiós, que converteix la mitologia pagana i la poesia neoplatònica en llenguatge visual. Cap pintura medieval no s'hauria permès això.",
    context:
      "El quadre es pinta per a Lorenzo di Pierfrancesco de' Mèdici, cosí del Magnífic, per a una sala de la seva casa de Florència, on aviat compartiria paret amb El naixement de Venus. La cultura neoplatònica de la cort mèdica, amb el filòsof Marsilio Ficino al capdavant, llegia els mites antics com a al·legories de l'ànima humana: l'amor terrenal que es transforma en amor diví. El programa exacte no està documentat, cosa que ha generat un segle i mig d'interpretacions acadèmiques.",
    analisi:
      "Venus, al centre, dins d'un hort de tarongers, presideix el bosquet sagrat: a la seva esquerra, les tres Gràcies dansen i Mercuri aparta els núvols amb el caduceu; a la seva dreta, Flora, deessa de la primavera, avança escampant flors, mentre Zèfir, el vent blau, segresta la nimfa Cloris, que es transforma en Flora: el cicle de l'amor que mortifica i regenera. Sobre el cap de Venus, el seu fill Cupido apunta amb les fletxes. La composició és una coreografia horitzontal, sense perspectiva: les figures tenen la immaterialitat del tapís, i el dibuix de línia nítida domina sobre el color. Més de 500 espècies vegetals identificables omplen el prat.",
    miraHiDeProp: [
      "La transformació de Cloris: la mateixa figura té dues boques, una d'on surt el vent i una altra d'on surten flors.",
      "Les teles translúcides de les Gràcies: el dibuix travessa la roba per descriure el cos.",
      "Els tarongers: fruita d'or, al·lusió heràldica dels Mèdici.",
    ],
    curiositats: [
      "Fins al 1919 el quadre va estar pràcticament amagat a la vil·la de Castello; avui és una de les imatges més reproduïdes de l'art universal.",
      "El nom «La Primavera» és modern: el posa Vasari el 1550 quan la veu a Castello.",
    ],
    relacionades: ["naixement-venus", "adoracio-mags-botticelli", "venus-urbino"],
    obraFita: true,
    bloc: 1,
  },
  {
    slug: "naixement-venus",
    titol: "El naixement de Venus",
    autorSlug: "botticelli",
    autorNom: "Botticelli",
    data: "aprox. 1485",
    anyInici: 1484, anyFi: 1486,
    tecnica: "Tempera sobre llenç",
    dimensions: "172,5 × 278,5 cm",
    ubicacio: { museu: "Galeria dels Uffizi", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["nu-classic", "iconografia", "oli-tempera"],
    relevancia:
      "És la primera Venus monumental del Renaixement pintada per a un col·leccionista privat i no per a una església: la bellesa pagana recuperada es converteix en tema digne per si mateixa. A més, resumeix el llenguatge de línia de Botticelli, l'últim gran mestre del Quattrocento florentí abans de l'auge del classicisme.",
    context:
      "Encàrrec de la família Mèdici, per a la mateixa sala que La Primavera. La iconografia combina dues fonts clàssiques: l'Himne homèric a Afrodita, que descriu la deessa nascuda de l'escuma del mar portada a la riba pels vents, i la lectura neoplatònica que la converteix en imatge de la Humanitat nascuda de Déu i mare del sentiment humà. A la Florència del Magnífic, pintar una dea nua a gran escala era una declaració cultural: l'antiguitat tornava a ser model viu.",
    analisi:
      "Venus avança sobre una petxina empesa pels vents Zèfir i Aura, mentre una de les Hores l'espera a la riba amb una capa florida. La postura cita la Venus pudica de l'escultura antiga, però Botticelli allarga el coll, les mans i el cabell fins a una elegància irreal: el cos és geometria de bellesa, no anatomia. El dibuix de contorn nítid, amb absència gairebé total d'ombres, domina sobre el color; el paisatge, amb els arbres formats com a elements d'orlar i el mar estriat, és convencional però precís. La composició divideix el llenç en dues zones de vent i una de terra, amb la deessa com a eix.",
    miraHiDeProp: [
      "El cabell de Venus: els fils daurats es pinten fil a fil, amb una precisió joiera que l'oli no permetia.",
      "Les roses que cauen dels vents: cada flor té un perfil diferent, com si fossin estudiades del natural.",
      "El coll allargat i l'espatlla caiguda: la deformació deliberada al servei de la gràcia, no de l'anatomia.",
    ],
    curiositats: [
      "És pintada sobre llenç, cosa rara a Florència, on dominava la taula; es creu que va viatjar o que es va pensar per a una sala humida.",
      "Simonetta Vespucci, la bellesa més famosa de la Florència del temps, és el model tradicional de la deessa, tot i que no està documentat.",
    ],
    relacionades: ["primavera", "venus-urbino", "amor-sagrat-profà"],
    obraFita: true,
    bloc: 1,
  },
  {
    slug: "bateig-crist-piero",
    titol: "El bateig de Crist",
    autorSlug: "piero-della-francesca",
    autorNom: "Piero della Francesca",
    data: "aprox. 1450",
    anyInici: 1448, anyFi: 1452,
    tecnica: "Tempera sobre taula de pollancre",
    dimensions: "167 × 116 cm",
    ubicacio: { museu: "National Gallery", ciutat: "Londres", pais: "Regne Unit", url: "https://www.nationalgallery.org.uk" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "oli-tempera"],
    relevancia:
      "És la pintura pensada com a matemàtica: Piero, autor del primer tractat de perspectiva de la història, ordena cada figura i cada llum d'aquesta taula amb una geometria que genera una serenitat absoluta. És la cara més pura del Quattrocento culte.",
    context:
      "La taula es pinta per a l'església de sant Joan Baptista del monestir de Santa Maria dei Servi de Borgo San Sepolcro, la ciutat natal de Piero. El tema, el bateig de Crist al riu Jordà, es resol amb la solemnitat d'una aparició més que amb la narrativa d'un fet. La datació discutida (entre 1448 i 1452) la situa en el moment en què Piero torna de Florència, on coneix Domenico Veneziano i l'herència de Masaccio.",
    analisi:
      "Crist ocupa el centre exacte de la taula, en vertical, amb el cos de proporcions mètriques i la postura de la columna clàssica; la colometa de l'Esperit Sant li plana a sobre com a eix de simetria. Al costat, Joan Baptista amb el vas d'aigua; a la dreta, tres àngels units per una coreografia suau. El paisatge, format per planes i turons de l'Umbria i de la Toscana, s'obre amb una llum matinal dessaturada que s'apropa a la perspectiva aèria. La llum uniforme, sense contrastos, i el color limitat a blancs, cels i terres emmarquen tota l'escena dins d'una calma de mosaic. Cada figura està construïda amb sòlids geomètrics: cilindres, esferes i cons.",
    miraHiDeProp: [
      "La colometa: és exactament el centre de la taula, sobre l'eix vertical del cos de Crist.",
      "L'arbre daurat del fons, a l'esquerra: cita els arbres sagrats de les icones primitives.",
      "Les mans de Joan: la precisió del gest de servir l'aigua, sense drama.",
    ],
    curiositats: [
      "Piero va escriure tres tractats matemàtics, entre els quals De prospectiva pingendi, que fan d'ell el teòric més important del segle XV.",
      "El quadre va passar desapercebut fins al segle XIX, quan els pintors anglesos el van descobrir; la National Gallery el va comprar el 1861.",
    ],
    relacionades: ["flagellacio-piero", "trinitat-masaccio", "madonna-granduca"],
    bloc: 1,
  },
  {
    slug: "flagellacio-piero",
    titol: "La flagel·lació de Crist",
    autorSlug: "piero-della-francesca",
    autorNom: "Piero della Francesca",
    data: "aprox. 1455-1460",
    anyInici: 1455, anyFi: 1460,
    tecnica: "Tempera sobre taula",
    dimensions: "58,4 × 81,5 cm",
    ubicacio: { museu: "Galleria Nazionale delle Marche, Palau ducal", ciutat: "Urbino", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "retrat-humanista"],
    relevancia:
      "És el quadre més enigmàtic del Quattrocento i la demostració suprema de la perspectiva lineal: un format petit amb una arquitectura calculada al mil·límetre i un misteri iconogràfic encara obert. Tota lectura de la pintura renaixentista passa per aquesta taula.",
    context:
      "La taula es pinta a Urbino, la cort més matemàtica d'Europa, on Piero treballava per a Federico da Montefeltro. El tema és doble i desconcertant: a l'esquerra, Crist és flagellat dins d'un pròtex clàssic; a la dreta, tres joves contemporanis conversen, indiferents. Les interpretacions són nombroses: al·legoria de la caiguda de Constantinoble (1453) i del perill turc, plor per un príncep mort, exhortació a la croada, memòria d'una família urbinesa… Cap teoria no és demostrable, i això forma part del magnetisme de l'obra.",
    analisi:
      "La construcció en perspectiva és rigorosa: cada ortogonal convergeix en un punt de fuga situat a la columna de la dreta, i la quadrícula del paviment mesura l'espai com un plànol d'arquitecte. La llum és interior i matemàtica: entra per l'esquerra i toca cada superfície amb una constància que només Piero aconsegueix. La separació entre els dos grups de figures crea una distància temporal deliberada: l'escena sagrada passa dins del passat pintat, mentre els tres joves ocupen el present de l'espectador. Les figures de Piero, estatuàries i silencioses, no busquen l'emoció sinó la mesura.",
    miraHiDeProp: [
      "El punt de fuga a la columna de la dreta: seguiu les línies del sostre i del paviment fins a trobar-lo.",
      "La llum del cos de Crist, que il·lumina el frontal de la figura mentre la resta del pròtex rep la llum des de l'esquerra.",
      "El jove del mig, de llom: vestit i pentinat han estat identificats amb el jove Oddantonio da Montefeltro o amb el seu entorn.",
    ],
    curiositats: [
      "Kenneth Clark la va anomenar «el més gran petit quadre del món»; John Pope-Hennessy, «la més perfecta obra d'art de tot el Renaixement italià».",
      "El tema ha generat més de trenta interpretacions acadèmiques diferents publicades entre el 1900 i avui.",
    ],
    relacionades: ["bateig-crist-piero", "escola-atenes", "desposoris-verge"],
    bloc: 1,
  },
  {
    slug: "crist-mort-mantegna",
    titol: "El Crist mort (Lamentació sobre Crist mort)",
    autorSlug: "mantegna",
    autorNom: "Andrea Mantegna",
    data: "aprox. 1483",
    anyInici: 1480, anyFi: 1486,
    fontData: "Pinacoteca di Brera, fitxa de l'obra, datada cap al 1483.",
    tecnica: "Tempera sobre llenç",
    dimensions: "68 × 81 cm",
    ubicacio: { museu: "Pinacoteca di Brera", ciutat: "Milà", pais: "Itàlia", url: "https://pinacotecabrera.org/en/collezioni/collezione-on-line/lamentation-over-the-dead-christ/" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["escorc", "perspectiva-lineal"],
    relevancia:
      "És un dels escorços més cèlebres de la pintura: el cos de Crist, vist des dels peus, sembla penetrar en l'espai del quadre. Les plantes en primer terme, les cames escurçades i el rostre més llunyà permeten entendre visualment com funciona aquest recurs.",
    context:
      "La Pinacoteca di Brera data l'obra cap al 1483 i considera probable, però no segur, que sigui el Crist en escorç trobat a l'estudi de Mantegna després de la seva mort el 1506. Potser estava destinada a la devoció privada del pintor. Tres plorants a l'esquerra acompanyen el cos preparat per a la sepultura sobre la pedra de la unció.",
    analisi:
      "La mirada entra pels peus ferits del primer pla i recorre les cames fins al tors i el rostre: el cos, col·locat gairebé perpendicular al marc, s'escurça visualment. Les plantes són molt visibles, però Mantegna no les engrandeix tant com dictaria una projecció geomètrica estricta; l'efecte és alhora versemblant i expressiu. Les ferides de les mans i dels peus i els plecs del sudari obliguen a mirar de prop. Els tres plorants, tallats pel marge esquerre, intensifiquen el dolor sense apartar l'atenció del cos. L'escorç no és simplement un cos petit: és la representació d'un cos que avança o retrocedeix en profunditat.",
    miraHiDeProp: [
      "Compara la mida aparent de les plantes, els genolls i el rostre: quina part és més pròxima a tu?",
      "Segueix l'eix dels peus fins al cap i observa com el cos sembla escurçar-se sobre la llosa.",
      "Mira les tres figures plorants del marge esquerre: quina diferència hi ha entre la seva posició i la del cos de Crist?",
    ],
    curiositats: [
      "La identificació amb el Crist en escorç conservat al taller de Mantegna és la hipòtesi més acceptada per Brera, però la documentació de la seva trajectòria posterior és incompleta.",
      "La pintura va arribar a la Pinacoteca di Brera el 1824.",
    ],
    relacionades: ["judici-final", "desposoris-verge", "descens-creu"],
    obraFita: true,
    bloc: 1,
  },
  {
    slug: "cambra-esposats",
    titol: "Cambra dels esposats (cicle de frescos)",
    autorSlug: "mantegna",
    autorNom: "Andrea Mantegna",
    data: "1465-1474",
    anyInici: 1465, anyFi: 1474,
    tecnica: "Fresc",
    dimensions: "sala de 8 × 8 m",
    ubicacio: { museu: "Palau ducal", ciutat: "Màntua", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "escorc", "fresc"],
    relevancia:
      "És la primera sala del món pintada com un entorn virtual: les parets s'obren amb cortines i balcons i la volta es converteix en cel. L'òcul central és l'avançada més agosarada de la pintura del Quattrocento: la il·lusió arquitectònica total.",
    context:
      "Ludovico III Gonzaga, marquès de Màntua, encarrega a Mantegna la decoració de la torre nord-est del seu palau com a cambra oficial de recepció. El programa combina el retrat dinàstic (la trobada del marquès amb el cardenal Francesco Gonzaga) i la glòria de la família, envoltada pels busts d'emperadors romans pintats a la franja superior. La cort de Màntua, petita però sofisticada, feia de l'art una eina diplomàtica: els frescos, acabats el 1474, van impressionar tots els visitants europeus.",
    analisi:
      "Les parets es divideixen amb arquitectura pintada (pilastres, cortines, plints) que obre el mur cap a paisatges i interiors: la cambra real es converteix en una lògia imaginària. El fresc principal, la trobada de Ludovico amb el cardenal, organitza més de trenta retrats contemporanis amb una naturalitat de gènere de cort. La volta culmina en l'òcul circular, obert sobre un cel: al seu voltant, un balcó pintat on dones, un cupido i testos es recolzen per mirar cap a dins, mentre una taula amenaça de caure sobre l'espectador. L'escorç de les figures vistes des de baix, amb el tall deliberat dels cossos, és el primer ús sistemàtic de la perspectiva de sostre de la pintura occidental.",
    miraHiDeProp: [
      "L'òcul: la taula verda i les dones del balcó, vistes des de sota, violen deliberadament la frontera entre pintura i realitat.",
      "El retrat de Ludovico Gonzaga al costat del seu secretari: el perfil del marquès és un document físic, sense idealització.",
      "Les cortines pintades: la vora té un pes real dins de la sala que desorienta la mirada.",
    ],
    curiositats: [
      "Mantegna va ser armat cavaller per Ludovico i va signar els frescos com a «cav. Andrea».",
      "La sala va ser danyada el 1630 durant el saqueig de Màntua pels mercenaris imperials; els frescos van sobreviure amb petites pèrdues.",
    ],
    relacionades: ["crist-mort-mantegna", "escola-atenes", "placa-capitoli"],
    bloc: 1,
  },
  {
    slug: "crist-claus-sant-pere",
    titol: "Crist lliurant les claus a sant Pere",
    titolOriginal: "Consegna delle chiavi a san Pietro",
    autorSlug: "perugino",
    autorNom: "Pietro Perugino",
    data: "1481-1482",
    anyInici: 1481, anyFi: 1482,
    fontData: "Museus Vaticans, fitxa del fresc de la Capella Sixtina.",
    tecnica: "Fresc",
    dimensions: "335 × 550 cm",
    ubicacio: { museu: "Capella Sixtina, Museus Vaticans", ciutat: "Vaticà", pais: "Ciutat del Vaticà", url: "https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina/parete-nord/storie-di-cristo/consegna-delle-chiavi.html" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "fresc", "perspectiva-aeria"],
    relevancia:
      "És una lliçó visual de perspectiva lineal: el paviment i l'arquitectura condueixen la mirada fins a un punt de fuga dins la porta central. La mida de les figures i els buits dels arcs reforcen la profunditat; el paisatge llunyà anticipa els efectes atmosfèrics que Leonardo desenvoluparà.",
    context:
      "Perugino pinta aquest fresc a la paret nord de la Capella Sixtina durant la campanya de 1481-1482 impulsada per Sixt IV. Al primer pla, Crist lliura les claus del regne del cel a Pere agenollat: és una imatge de la transmissió de l'autoritat a l'apòstol. Al fons es representen altres episodis de la vida de Crist. L'escenari bíblic, però, pren la forma d'una plaça i d'uns edificis concebuts amb llenguatge renaixentista.",
    analisi:
      "La quadrícula del paviment no és només decorativa: les línies que s'allunyen convergeixen a la porta de l'edifici central, aproximadament a l'altura de l'horitzó. Els trams transversals del terra semblen comprimir-se en la distància. Les figures del primer pla són grans i detallades; les que passegen per la plaça, més petites, fan llegible la profunditat. Els arcs laterals i les portes deixen veure espai al darrere, mentre el temple central fixa l'eix de simetria. Alguns personatges vesteixen com a italians del segle XV, al costat dels apòstols amb túniques d'inspiració antiga: no és una reconstrucció de la Judea del segle I. Les muntanyes blavoses del fons també perden contrast amb la distància.",
    miraHiDeProp: [
      "Segueix les juntes del paviment fins a la porta fosca del temple: on es trobarien si les prolonguessis?",
      "Compara les persones que envolten Crist i Pere amb les del centre de la plaça; observa també què es veu a través dels arcs.",
      "Busca els barrets i els vestits ajustats del Quattrocento entre les túniques dels apòstols: què ens diu aquesta barreja sobre el temps dels pintors?",
    ],
    curiositats: [
      "Les claus fan referència al passatge de l'Evangeli de Mateu 16,19 i a l'autoritat atribuïda a Pere.",
      "Els Museus Vaticans identifiquen l'edifici central amb el Temple de Jerusalem idealitzat i els arcs laterals amb l'arquitectura triomfal romana.",
    ],
    relacionades: ["trinitat-masaccio", "desposoris-verge", "gioconda"],
    obraFita: true,
    bloc: 1,
  },
  {
    slug: "dama-ermini",
    titol: "La dama de l'ermini",
    autorSlug: "leonardo",
    autorNom: "Leonardo da Vinci",
    data: "aprox. 1489",
    anyInici: 1489, anyFi: 1490,
    tecnica: "Oli sobre taula de noguera",
    dimensions: "54,8 × 40,3 cm",
    ubicacio: { museu: "Museu Nacional, col·lecció Czartoryski", ciutat: "Cracòvia", pais: "Polònia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["retrat-humanista", "sfumato"],
    relevancia:
      "És el primer retrat psicològic modern: Leonardo captura una noia en l'instant precís en què és distreta per alguna cosa fora del quadre, i l'ermini que sosté converteix el retrat cortesà en un enigma d'intel·ligència i sensibilitat.",
    context:
      "La dama és Cecilia Gallerani, jove noble milanesa i favorita de Ludovico Sforza, el duc de Milà, que havia encarregat el retrat. L'ermini no és cap decoració: és una al·legoria triple de Ludovico, anomenat l'Ermini Blanc (ermellino) pel fet de rebre l'Orde de l'Ermini, i símbol de puresa i moderació. La pintura es realitza quan Cecilia tenia uns setze anys, poc abans que el duc es casés amb Beatriu d'Este i Cecilia fos apartada de la cort.",
    analisi:
      "Leonardo rota el bust en tres quarts i fa girar el cap cap a l'esquerra mentre els ulls miren cap a la dreta: aquesta dislocació crea la sensació d'un moment viscut, no d'una posa. La llum modula la cara amb transicions suaus, primer esborrany del sfumato madur, i el detall del vestit, les cintes i els cabells trenats és de precisió joiera. L'ermini, pintat amb un realisme gairebé metafísic, té el mateix pes simbòlic que la dama: els seus ulls també miren fora del quadre. El fons fosc, afegit posteriorment, concentra tota l'atenció en la figura.",
    miraHiDeProp: [
      "La rotació del cap: els ulls no coincideixen exactament amb l'eix del cap, perquè la sensació sigui d'atenció viva.",
      "L'ermini: el pelatge pintat pèl a pèl i la garriga tensa, com si l'animal s'adaptés a la mà que l'aguanta.",
      "La cinta que tanca el cabell i el nus del davant: la moda refinada de la cort sforzesca.",
    ],
    curiositats: [
      "És un dels quatre retrats femenins de Leonardo conservats, i l'únic que es pot veure fora dels grans museus estatals.",
      "El fons fosc i el vestit van ser repintats al segle XIX; l'anàlisi tècnica ha recuperat el fons blau-gris original amb una finestra.",
    ],
    relacionades: ["gioconda", "retrat-francesc-i", "home-turbant"],
    bloc: 1,
  },
  {
    slug: "verge-roques",
    titol: "La verge de les roques",
    autorSlug: "leonardo",
    autorNom: "Leonardo da Vinci",
    data: "1483-1486",
    anyInici: 1483, anyFi: 1486,
    tecnica: "Oli sobre taula, traspassada a llenç",
    dimensions: "199 × 122 cm",
    ubicacio: { museu: "Museu del Louvre", ciutat: "París", pais: "França", url: "https://www.louvre.fr" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["sfumato", "composicio-piramidal", "perspectiva-aeria"],
    relevancia:
      "És l'obra on el sfumato neix com a sistema: les figures emergeixen de la penombra d'una cova gràcies a transicions de llum i ombra que no tenen contorns, i el paisatge del fons s'apaga en blaus atmosfèrics. Aquí comença la pintura moderna.",
    context:
      "La Confraria de la Immaculada Concepció de Milà encarrega a Leonardo un retaule per a la capella de sant Francesc de San Francesco Grande. El contracte especifica el tema —la Mare de Déu amb el nen, sant Joan Baptista nen i un àngel— i detalla el pagament, però també documenta una llarga disputa amb la confraria per preu i contingut: Leonardo va vendre l'obra a un altre comprador (probablement Ludovico Sforza) i va haver de pintar una segona versió per a la confraria, avui a la National Gallery de Londres.",
    analisi:
      "Les quatre figures s'ordenen en una composició piramidal compacta, amb la Mare de Déu al vèrtex i la mà dreta, que protegeix el nen Jesús, com a eix. L'espai és una cova de roques calcàries, que substitueix el pessebre bíblic per un escenari geològic estudiat del natural: Leonardo, com a científic, dibuixava estrats, coves i plantes. La llum entra per dues obertures i es modula sobre la pell amb transicions suaus: és el naixement del clarobscur i del sfumato com a sistemes. Al fons, el paisatge rocallós s'apaga en blaus i verdets: la perspectiva aèria aplicada amb rigor. L'àngel Uriel, amb la mirada cap a l'espectador i el gest que assenyala sant Joan, unifica la composició.",
    miraHiDeProp: [
      "La mà dreta de la Mare de Déu: el perfil de la mà que protegeix Jesús és una lliçó d'anatomia i de sfumato alhora.",
      "El paisatge del fons: cada serralada s'apaga en un blau més fred que l'anterior, aplicant la teoria de la perspectiva aèria que Leonardo escriu als seus quaderns.",
      "Les flors del primer pla: cada espècie és botànicament identificable.",
    ],
    curiositats: [
      "La disputa amb la confraria es va arrossegar vint-i-cinc anys i inclou documents notarials sobre preus i qualitat dels materials.",
      "La versió del Louvre, més antiga, és considerada gairebé unànimament obra total de Leonardo; la de Londres té parts d'assistents.",
    ],
    relacionades: ["gioconda", "ultim-sopar", "desposoris-verge"],
    obraFita: true,
    bloc: 2,
  },
];
