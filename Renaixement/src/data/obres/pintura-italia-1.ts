// obres/pintura-italia-1.ts — Pintura italiana I: Masaccio, Botticelli, Piero della Francesca, Mantegna, Leonardo (12 obres)
import type { Obra } from "../types";

export const PINTURA_ITALIA_1: Obra[] = [
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
      "És el primer fresc construït amb la perspectiva lineal matemàtica de Brunelleschi: per primera vegada una pintura es planta com un espai mesurable i racional, amb el punt de fuga situat a l'altura exacta de l'ull de l'espectador. Tot el sistema de representació europeu posterior hi té l'arrel.",
    context:
      "El fresc decora la nau de la basílica florentina de Santa Maria Novella, probablement per encàrrec de la família Lenzi, el sepulcre de la qual ocupa la base del compartiment. Es pinta entre 1425 i 1428, en els anys en què Brunelleschi aixecava la cúpula de la catedral i Florència es pensava com la nova Roma. El tema respon a una devoció concreta: la Trinitat —Déu Pare que sosté la creu, amb la colometa de l'Esperit Sant—, flanquejada per la Mare de Déu i sant Joan, amb els comitents agenollats fora de l'espai sagrat. Al davant, un esquelet tombat sobre el sarcòfag recorda al visitant que davant la mort només la fe salva: «Jo ja era allò que sou, i allò que sou encara sóc».",
    analisi:
      "La composició organitza l'espai com una capella real: un nínxol amb volta de canó conformada per cassetons, amb la profunditat calculada mitjançant la quadrícula de Brunelleschi i el punt de fuga sota la mirada de l'espectador, al peu de la creu. Les figures s'ordenen en piràmide: Déu Pare al vèrtex, la Mare de Déu assenyalant el Fill i dirigint la mirada de l'espectador cap a ell. Els cossos tenen pes escultòric, amb llums i ombres construïdes com si la llum entrés per la finestra real de la nau. La diferència d'escala i de posició separa amb precisió el món diví (dins de la capella), els comitents (agenollats sobre el graó) i l'esquelet (a sota, en el temps de la mort).",
    miraHiDeProp: [
      "Els cassetons de la volta: cada reducció de mida està calculada per forçar la sensació de profunditat real.",
      "El gest de la Mare de Déu: els seus ulls dirigeixen l'espectador cap a Crist, l'única figura que no mira cap a dins de l'escena.",
      "L'esquelet del sarcòfag amb la inscripció sobre la caducitat de la vida humana.",
    ],
    curiositats: [
      "Al segle XVI el fresc va quedar tapat per un retaule i no es va redescobrir fins al 1861; la perspectiva completa es va veure de nou després de la restauració de 1952.",
      "Vasari, quan va col·locar el retaule que amagava el fresc, va descriure'l amb detall: gràcies a ell sabem com era abans de ser tapat.",
    ],
    relacionades: ["escola-atenes", "desposoris-verge", "expulsio-paradis"],
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
      "És la lliçó mestra de la narració renaixentista: tres moments d'una mateixa història (cobrar el tribut, trobar la moneda, pagar-lo) en una sola escena unida, amb figures que tenen pes real i una llum única com en el món físic. Tota la pintura narrativa europea hi naixerà.",
    context:
      "El fresc pertany al cicle de la Capella Brancacci, començat per Masolino i Masaccio el 1425 i acabat per Filippino Lippi el 1480, per encàrrec de Felice Brancacci, ric mercader de seda i membre del govern florentí. El tema del tribut miracle de Mateu era d'actualitat: el 1427 Florència va instituir el catasto, el primer impost personal modern, i l'escena del pagament a l'autoritat es llegia com una al·legoria cívica. L'acció es desenvolupa a Cafarnaüm, davant el llac on Pere trobarà la moneda a la boca d'un peix.",
    analisi:
      "L'escena central agrupa Crist i els apòstols en semicercle davant de la població; Crist, al centre geomètric, és el node de la narració: amb la mà envia Pere cap a l'esquerra —on el veiem agenollat a la vora del llac recollint la moneda— i amb l'altra assenyala el recaptador, a la dreta —on Pere paga. La llum ve d'una única font exterior, a l'esquerra, i modula els volums amb una coherència que cap pintura gòtica no tenia: les figures projecten ombres reals sobre el terra. El contrast entre siluetes fosques i zones il·luminades (clarobscur) construeix profunditat sense necessitat d'un paviment en perspectiva. El paisatge del fons, amb la seva gradació tonal, ja anuncia la perspectiva aèria.",
    miraHiDeProp: [
      "El recaptador de tributs de la dreta, de llom curt i túnica vermella: és un retrat contemporani, possiblement el propi Masaccio.",
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
    data: "aprox. 1480",
    anyInici: 1474, anyFi: 1483,
    tecnica: "Tempera sobre llenç",
    dimensions: "68 × 81 cm",
    ubicacio: { museu: "Pinacoteca di Brera", ciutat: "Milà", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["escorc", "perspectiva-lineal"],
    relevancia:
      "És l'exercici d'escorç més famós de la història de la pintura: un cos mort vist des dels peus, amb el furat de les ferides descrit amb una geometria implacable. Cap obra no ha ensenyat mai tant, amb tan poques eines, com es construeix la profunditat.",
    context:
      "El llenç es trobava a l'estudi de Mantegna quan va morir el 1506, i els seus fills el van vendre: probablement era una obra d'estudi i devoció personal, no un encàrrec. La meditació sobre el Crist mort aïllat, sense dolors visibles ni presència divina, és típica de l'espiritualitat del nord d'Itàlia de la segona meitat del segle XV, centrada en la humanitat i la soledat de Crist.",
    analisi:
      "El cos de Crist es projecta en diagonal sobre la pedra de la unció, comprimint el tronc i el rostre i amplificant el pla dels peus, on les ferides dels claus són el centre emocional i visual. L'escorç és tractat com un problema de geometria: cada volum del cos segueix la lògica de la perspectiva central, i el forat de les ferides pintat als peus és una demostració tècnica. Dues figures de plorants, tallades pel marc, amplifiquen la soledat: la Mare de Déu, sant Joan i Maria Magdalena no miren el cos, ploren cap a dins. La llum freda i lateral, sense drama cromàtic, reforça el silenci.",
    miraHiDeProp: [
      "Els peus de Crist: les dues ferides dels claus són el centre exacte de la composició, i la cera de l'ungció és pintada amb precisió d'escultor.",
      "El rostre de Crist: una paleta de grisos i verds amb la llum tallada per les orelles i el nas.",
      "Les llàgrimes de les plorants: cada gota té la seva llum pròpia.",
    ],
    curiositats: [
      "El llenç es va vendre a la subhasta posterior de l'estudi de Mantegna per 2 ducats, segons els documents conservats: un preu irrisori per a una obra cabdal.",
      "Mantegna va pintar una versió anterior del mateix tema, avui perduda, citada pels inventaris dels Gonzaga.",
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
