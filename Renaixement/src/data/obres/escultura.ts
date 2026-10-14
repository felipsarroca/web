// obres/escultura.ts — Escultura del Renaixement (15 obres)
import type { Obra } from "../types";

export const ESCULTURA: Obra[] = [
  {
    slug: "sant-jordi-donatello",
    titol: "Sant Jordi (per al nínxol d'Orsanmichele)",
    autorSlug: "donatello",
    autorNom: "Donatello",
    data: "1415-1417",
    anyInici: 1415, anyFi: 1417,
    tecnica: "Marbre",
    dimensions: "209 cm",
    ubicacio: { museu: "Museo Nazionale del Bargello", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["contrapposto", "nu-classic"],
    relevancia:
      "És la primera figura del Renaixement que pensa: Donatello no pinta un sant heroïc, sinó un cavaller jove, tens, que mira abans d'actuar. El contrapposto i la mirada defineixen un caràcter —i obren la porta a l'escultura psicològica moderna.",
    context:
      "L'estatua va ser encarregada pel gremi dels espasers (Arte dei Spadai) per a un nínxol de l'església d'Orsanmichele, on cada gremi de Florència exhibia el seu sant patró en marbre o bronze. Sant Jordi, patró dels espasers i de la cavalleria, apareix dempeus, amb l'armadura i l'escut, abans de matar el drac que fou tallat en el pedestal (avui al Bargello, amb el relleu de sant Jordi allibera la princesa). L'obra es va traslladar al Bargello el 1892 per protegir-la de la meteorització; al nínxol hi ha avui una còpia.",
    analisi:
      "La figura és dempeus en contrapposto: el pes recau a la cama dreta, el maluc s'inclina i les espatlles s'oposen, cosa que dona al cos una vida orgànica nova respecte a la rigidesa gòtica. El cap gira lleugerament cap a l'esquerra i els ulls, profunds sota les celles, miren un enemic que està fora del nínxol: és l'atenció, no l'acció, el subjecte de l'estàtua. La drapéria té plecs profunds i angulosos que descriuen el cos sota la roba, herència de l'escultura clàssica que Donatello coneixia per les còpies florentines. La cara jove, amb el front arrugat per la concentració, és el primer retrat psicològic de la escultura renaixentista.",
    miraHiDeProp: [
      "Els ulls: les celles frunyides i les pupiles buides creen una atenció que el bronze original completava amb cristall pintat.",
      "El contrapposto de les cames: el pes a la dreta i el maluc inclinat són la gramàtica clàssica recuperada.",
      "El relleu del pedestal, amb sant Jordi muntat sobre el drac: el primer relleu en perspectiva de Donatello.",
    ],
    curiositats: [
      "La còpia del nínxol d'Orsanmichele és de fosa en resina pintada amb marbre artificial; l'original va passar 500 anys a l'aire lliure.",
      "El relleu del pedestal és considerat el primer experiment en perspectiva d'escultura en la història: la princesa és pintada en escorç perfecte.",
    ],
    relacionades: ["david-bronze-donatello", "gattamelata", "david-marbre"],
    bloc: 5,
  },
  {
    slug: "portes-paradis",
    titol: "Portes del Paradís (baptisteri)",
    autorSlug: "ghiberti",
    autorNom: "Lorenzo Ghiberti",
    data: "1425-1452",
    anyInici: 1425, anyFi: 1452,
    tecnica: "Bronze daurat",
    dimensions: "10 panells de 79,5 × 79,5 cm",
    ubicacio: { museu: "Museo dell'Opera del Duomo", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "fresc"],
    relevancia:
      "És l'obra on el relleu gòtic esdevé escena construïda en perspectiva: Ghiberti, amb la tècnica dels relleus aplanats (schiacciato), crea profunditats d'arquitectura i d'espai dins de plaques de bronze de pocs centímetres. Miquel Àngel les va anomenar «dignes de ser les Portes del Paradís».",
    context:
      "Ghiberti guanya el concurs del baptisteri de 1401 (contra Brunelleschi) amb la porta nord, i el 1425 rep l'encàrrec de la porta est, la tercera i última, davant de la catedral. El programa de deu panells és del Gènesi, des de la Creació fins a la història de Josep i de Moisès. Ghiberti hi treballa vint-i-set anys, amb un taller que inclou Donatello, Michelozzo i el jove Uccello. Les portes originals es van traslladar al Museo dell'Opera del Duomo el 1990 per protegir-les de la contaminació; al baptisteri hi ha còpies.",
    analisi:
      "Cada panell és una escena aprofundida: Ghiberti combina figures de diferent relleu (les del primer pla gairebé exemptes, les del fons aplanades) per crear una perspectiva atmosfèrica en bronze. L'arquitectura del fons —porxos, escalinates, arcs— és construïda amb perspectiva central que convergeix en punts de fuga reals. La història de Josep és la més complexa: quatre moments narratius en un sol panell, amb més de vint figures i un interior domèstic complet. La dauradura, polida amb pedra de foc i daurada al foc de mercuri, fa que les figures canviïn de llum segons l'hora del dia: les portes són un mecanisme òptic viu.",
    miraHiDeProp: [
      "El panell de la història de Josep: quatre escenes en una, amb l'arquitectura del palau construïda en perspectiva.",
      "La creació d'Adam: el primer relleu de la porta, amb Déu Pare en escorç i Adam ja despertat.",
      "La profunditat dels edificis: les columnes del primer pla tenen un relleu gairebé total, les del fons són gairebé planades.",
    ],
    curiositats: [
      "Miquel Àngel, quan les va veure acabades, va dir que eren «tan belles que serien dignes de les Portes del Paradís»: el nom es va quedar.",
      "Les bombes alemanyes de 1944 i la riuada de Florència de 1966 van danyar alguns panells; la restauració de 1990-2012 els va tornar al seu esplendor original.",
    ],
    relacionades: ["trinitat-masaccio", "david-bronze-donatello", "cupula-fiore"],
    obraFita: true,
    bloc: 5,
  },
  {
    slug: "david-bronze-donatello",
    titol: "David de bronze",
    autorSlug: "donatello",
    autorNom: "Donatello",
    data: "aprox. 1440",
    anyInici: 1440, anyFi: 1440,
    tecnica: "Bronze",
    dimensions: "158 cm",
    ubicacio: { museu: "Museo Nazionale del Bargello", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["nu-classic", "contrapposto"],
    relevancia:
      "És el primer nu exempt a mida natural des de l'antiguitat: un David adolescent, després de la victòria sobre Goliat, amb un contrapposto suau i una nuesa sensual que escandalitzà els seus contemporanis. Tota l'escultura renaixentista hi naix.",
    context:
      "L'estàtua es fa per al pati del palau Mèdici a la via Larga, i Cosme el Vell la manté a l'interior: era la figura privada de la família, no una obra pública. El tema és la victòria de la mesura sobre la força: David, el jove pastor, amb el barret de fulles i l'espasa de Goliat a la mà, trepitja el cap del gegant. La interpretació és múltiple: al·legoria política de Florència (la república petita que venç els tirans), al·legoria neoplatònica de l'ànima, o simplement la glorificació de la bellesa clàssica. El 1495, quan els Mèdici foren expulsats, l'estàtua fou col·locada al pati del Palazzo Vecchio com a símbol republicà.",
    analisi:
      "La postura és un contrapposto relaxat: el pes a la cama dreta, el maluc inclinat, la cama esquerra doblegada sobre el cap de Goliat. El cos és un adolescent real, no un heroi: els malucs foscos, el pit jove, la cara de somriure triomfador amb el barret de fulles. La drapéria és mínima: un mantell i botes amb gavardines, que emfatitzen la nuesa. La llum del bronze polit genera reflexos que modelen la superfície com una pell. La torsió del cos és el gran tema: David mira la seva victòria, no l'espectador, i el cap girat a la dreta crea una rotació que fa que l'estàtua sigui diferent des de cada punt de vista.",
    miraHiDeProp: [
      "El barret de fulles i les botes amb gavardines: l'única roba de l'estàtua, pintades amb detall de pastor.",
      "El rostre de David: el somriure subtil i la mirada cap avall cap al cap de Goliat.",
      "El contrapposto: la rotació del maluc i el pes a la cama dreta són la gramàtica clàssica aplicada a un adolescent real.",
    ],
    curiositats: [
      "L'estàtua va ser la primera nu renaixentista: abans no s'havia pensat que un cos nu pogués ser subjecte d'escultura des de l'antiguitat.",
      "La base té una inscripció en llatí: «Els vencedors són els déus; el vencedor és Déu» —la doble lectura política i religiosa de la victòria de Florència.",
    ],
    relacionades: ["david-marbre", "sant-jordi-donatello", "naixement-venus"],
    obraFita: true,
    bloc: 5,
  },
  {
    slug: "gattamelata",
    titol: "Monument eqüestre al Gattamelata",
    autorSlug: "donatello",
    autorNom: "Donatello",
    data: "1445-1453",
    anyInici: 1445, anyFi: 1453,
    tecnica: "Bronze",
    dimensions: "340 × 390 cm (amb pedestal)",
    ubicacio: { museu: "Piazza del Santo", ciutat: "Pàdua", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["retrat-humanista", "nu-classic"],
    relevancia:
      "És el primer monument eqüestre de bronze des de l'antiguitat: Donatello recupera el tipus de l'emperador romà a cavall per al condottiere Erasmo da Narni, i funda el model del monument públic modern. Tota estàtua eqüestre d'Europa deriva d'aquesta.",
    context:
      "La república de Venècia encarrega el monument a Pàdua per honorar Erasmo da Narni, conegut com el Gattamelata (la gata lletera), un condottiere que havia servit Venècia i havia mort el 1443. La família i la república volien un monument eqüestre com els emperadors romans: el marc Aureli de Roma era l'únic model que es coneixia en bronze. Donatello hi treballa vuit anys, i l'estàtua es col·loca el 1453 davant la basílica de sant Antoni (el Santo), sobre un pedestal alt dissenyat per ell mateix.",
    analisi:
      "La composició és una piràmide de poder: el cavall camina amb la cama dreta alçada, el genet lidera amb la mà que aguanta la batuta i la mirada cap a l'horitzó. El cavall és un retrat anatòmic exacte: les venes del coll, la musculatura de les potes, la boca amb el mos. El genet és un retrat físic i moral: el cap calb i arrugat del Gattamelata, la mirada serena i ferma, la drapéria amb plecs profunds. La llum del bronze crea els contrastos que fan viu el conjunt: el cavall llis i brillant, la roba fosca i rugosa. És la síntesi del retrat psicològic i del monument públic.",
    miraHiDeProp: [
      "El rostre del genet: el retrat del Gattamelata, amb els plecs del coll i la serenitat de la victòria.",
      "El mos del cavall: cada cadena i cada corretja és pintada amb precisió d'armer.",
      "La cama dreta del cavall alçada: el gest de l'emperador romà, recuperat per a un capità modern.",
    ],
    curiositats: [
      "És el primer cavall eqüestre de bronze des del marc Aureli de Roma: la fosa d'una estàtua d'aquesta escala era un problema tècnic que ningú no havia resolt des de l'antiguitat.",
      "La inscripció del pedestal descriu el Gattamelata com a «un home incomparable»: la glorificació del mèrit individual és el naixement de la fama moderna.",
    ],
    relacionades: ["colleoni", "sant-jordi-donatello", "david-bronze-donatello"],
    obraFita: true,
    bloc: 5,
  },
  {
    slug: "magdalena-penitent",
    titol: "Magdalena penitent",
    autorSlug: "donatello",
    autorNom: "Donatello",
    data: "aprox. 1455",
    anyInici: 1455, anyFi: 1455,
    tecnica: "Fusta de pollancre blanc policromada",
    dimensions: "188 cm",
    ubicacio: { museu: "Museo dell'Opera del Duomo", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["retrat-humanista", "iconografia"],
    relevancia:
      "És l'expressió més extrema de l'escultura del segle XV: una Magdalena emaciat, amb els cabells llargs que li cobreixen el cos, tallada en fusta i policromada amb pell de color real, dents de marbre i vidre a l'ull. L'ascetisme portat a l'extrem físic.",
    context:
      "L'estàtua es fa per al baptisteri de Florència, possiblement per a la Confraria dei Disciplinati, que practicava la penitència pública. La Magdalena penitent era un tema devocional popular: la pecadora que passa trenta anys al desert fent penitència. Donatello la talla en fusta, material més fràgil que el marbre però més expressiu, i la policroma amb la mà pròpia o amb col·laboradors. La talla original es va cremar parcialment a la riuada de 1966 i va ser restaurada amb resultats discutits.",
    analisi:
      "El cos és una anatomia de fam: les costelles marcades, els braços allargats, les cames primes, la pell penjosa. Els cabells llargs, pintats en or, són l'única roba: cobreixen el cos com un mantell, però deixen veure l'estructura òssia. La cara és el centre: els ulls enfonsats, amb la boca oberta en un gest de dolor, i les dents visibles. La policromia és una tècnica d'engany: la pell pintada amb color real, els ulls amb vidre, les dents de marbre. És l'anti-Venus: el cos com a instrument de penitència, no de bellesa. La postura és dempeus, amb les mans unides i els braços oberts: el gest d'una dona que resa amb tot el cos.",
    miraHiDeProp: [
      "Els ulls: els vidre pintats que donen a la mirada una intensitat de dolor físic.",
      "Les costelles i els braços: l'anatomia de fam és pintada amb precisió mèdica.",
      "Els cabells d'or: cada trenat és pintat fil a fil, amb un daurat que contrasta amb la pell.",
    ],
    curiositats: [
      "L'estàtua va estar 400 anys al baptisteri, en una capella lateral; la riuada de 1966 la va treure del seu lloc i la va danyar greument.",
      "És l'única gran escultura en fusta de Donatello conservada: la fusta era el material de l'expressivitat extrema, no de la bellesa.",
    ],
    relacionades: ["david-bronze-donatello", "sant-jordi-donatello", "sacrifici-isaac-berruguete"],
    bloc: 5,
  },
  {
    slug: "pietat-vaticana",
    titol: "Pietà vaticana",
    autorSlug: "miquel-angel",
    autorNom: "Miquel Àngel Buonarroti",
    data: "1498-1499",
    anyInici: 1498, anyFi: 1499,
    tecnica: "Marbre",
    dimensions: "174 × 195 cm",
    ubicacio: { museu: "Basílica de sant Pere", ciutat: "Ciutat del Vaticà", pais: "Vaticà", url: "https://www.museivaticani.va" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["composicio-piramidal", "nu-classic"],
    relevancia:
      "És la primera obra mestra de Miquel Àngel, acabada quan tenia 24 anys: el poliment absolut del marbre, la composició piramidal perfecta i una bellesa serena que fan d'aquesta Pietà el model de la devoció clàssica. És l'única obra que el mestre va firmar.",
    context:
      "El cardenal francès Jean Bilhères de Lagraulas, ambaixador de Carles VIII a Roma, encarrega l'estàtua el 1498 per al seu sepulcre a la capella de santa Petronilla, avui a la basílica de sant Pere. Miquel Àngel, de 23 anys, va viatjar a Carrara per triar el bloc de marbre personalment i va treballar un any a la talla. El tema és la Mare de Déu sostenint el cos mort del fill després del Davallament. L'únic defecte documentat va ser la firma: Miquel Àngel, escoltant que altres es van atribuir l'obra, la va tallar al davant del pit de la Mare de Déu (l'única firma que va posar mai a cap obra).",
    analisi:
      "La composició té una forma aproximadament piramidal: el cap de Maria en forma el vèrtex i l'amplada del mantell, la base. El cos de Crist, estès en diagonal sobre les cames de la Mare de Déu, travessa i anima aquesta estructura estable. Les draperies eixamplen visualment la figura de Maria i permeten encaixar-hi el cos adult del fill. El poliment del marbre diferencia els plecs profunds del mantell i la pell llisa de Crist. La serenitat dels rostres i el gest obert de la mà de Maria expressen el dolor de manera continguda.",
    miraHiDeProp: [
      "La firma de Miquel Àngel al davant del pit de la Mare de Déu: l'única firma que el mestre va posar a cap obra.",
      "Les mans de la Mare de Déu: la mà esquerra s'obre en un gest d'ofrena, la dreta sosté el cos del fill.",
      "El plec del mantell: la drapéria és una escultura en si mateixa, amb un pes físic real.",
    ],
    curiositats: [
      "El 1972 un home va atacar l'estàtua amb un martell i va danyar el braç de la Mare de Déu, el nas i la parpella; l'estàtua es va restaurar amb els fragments originals conservats.",
      "L'estàtua és ara protegida amb vidre blindat: és una de les escultures més visitades del món.",
    ],
    relacionades: ["david-marbre", "moises", "descens-creu"],
    obraFita: true,
    bloc: 5,
  },
  {
    slug: "david-marbre",
    titol: "David de marbre",
    autorSlug: "miquel-angel",
    autorNom: "Miquel Àngel Buonarroti",
    data: "1501-1504",
    anyInici: 1501, anyFi: 1504,
    tecnica: "Marbre de Carrara",
    dimensions: "410 cm (amb peanya)",
    ubicacio: { museu: "Galleria dell'Accademia", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "cinquecento", ambit: "italia",
    concepts: ["contrapposto", "nu-classic", "escorc"],
    relevancia:
      "És l'estàtua més famosa del món i la síntesi de l'escultura renaixentista: el moment de tensió màxima abans de l'acció, amb un contrapposto portat a la perfecció i una anatomia que és alhora ideal i real. Miquel Àngel, amb 26 anys, converteix un bloc abandonat en el símbol de Florència.",
    context:
      "El bloc de marbre de Carrara havia estat tallat per altres escultors (Agostino di Duccio, Antonio Rossellino) i abandonat durant 25 anys al pati de l'Opera del Duomo; l'anomenaven «el gegant». El 1501 la senyoria florentina encarrega a Miquel Àngel l'escultura per al contrafort de la catedral, però quan s'acaba el 1504 una comissió (amb Leonardo, Botticelli i Perugino) decideix col·locar-la al davant del Palazzo Vecchio: és el símbol de la república contra els tirans. El 1873 es trasllada a la Galleria dell'Accademia per protegir-la de la meteorització; a la plaça hi ha una còpia.",
    analisi:
      "La postura és el contrapposto màxim: el pes a la cama dreta, el maluc inclinat a la dreta, les espatlles girades a l'esquerra, el cap girat cap a la dreta, amb els ulls fixos en Goliat, que no és pintat: és la presència imaginària. El cos és un atleta real, no un heroi ideal: les mans grans (amb les venes visibles a la dreta, que aguanta la pedra), el tors de músculs marcats, la cara concentrada amb el front arrugat. El moment és precis: David ja ha triat la pedra i ha decidit lluitar, però encara no s'ha mogut: és la tensió, no l'acció, el subjecte. Les proporcions del cap i de les mans són deliberadament grans perquè l'estàtua, vista des de baix, semblés correcta (mai no es va col·locar al contrafort previst).",
    miraHiDeProp: [
      "Els ulls de David: el front arrugat i la mirada fixa cap a la dreta, cap a un enemic que està fora de l'estàtua.",
      "La mà dreta: les venes i els tendons marcats, amb la pedra imaginària que sosté.",
      "El contrapposto: la rotació del maluc i les espatlles, amb el pes a la cama dreta, és la gramàtica clàssica portada al màxim.",
    ],
    curiositats: [
      "El bloc de marbre estava abandonat i considerat «arruïnat» per talla anteriors; Miquel Àngel el va recuperar sense afegir cap peça nova.",
      "El 1991 un home va atacar l'estàtua amb un martell i va danyar el peu esquerre; els fragments es van conservar i restaurar.",
    ],
    relacionades: ["david-bronze-donatello", "pietat-vaticana", "moises"],
    obraFita: true,
    bloc: 5,
  },
  {
    slug: "moises",
    titol: "Moisès",
    autorSlug: "miquel-angel",
    autorNom: "Miquel Àngel Buonarroti",
    data: "aprox. 1513-1515",
    anyInici: 1513, anyFi: 1515,
    tecnica: "Marbre",
    dimensions: "235 cm",
    ubicacio: { museu: "San Pietro in Vincoli", ciutat: "Roma", pais: "Itàlia" },
    disciplina: "escultura", periode: "cinquecento", ambit: "italia",
    concepts: ["contrapposto", "nu-classic"],
    relevancia:
      "És la terribilitat de Miquel Àngel feta marbre: el profeta en l'instant precís de la ira, amb els corns de la tradició bíblica, el tors en espiral i una energia continguda que sembla a punt d'esclatar. És la peça central del projecte mai acabat del sepulcre de Juli II.",
    context:
      "El sepulcre de Juli II és el projecte frustrat de la vida de Miquel Àngel: encarregat el 1505, suspendit el 1506 (el papa volia la Sixtina), reprès amb contractes reduïts diverses vegades. El Moisès es talla entre 1513 i 1515 per a la versió monumental del sepulcre, que havia de tenir més de quaranta estàtues. Finalment, el 1545, es col·loca la versió reduïda a l'església de san Pietro in Vincoli, amb el Moisès com a peça central. Els corns no són pas un error: la tradició bíblica (Èxode 34) descriu Moisès amb «corns de llum» (el terme hebreu keren significa tant corn com raig).",
    analisi:
      "La postura és un espiral: el cos de front, el cap girat cap a l'esquerra, la cama dreta doblegada i la barra de la taula sota el braç. El moment és precís: Moisès, tornant del Sinaí amb les taules, veu el poble adorant el vedell d'or i està a punt de saltar: és la ira continguda. Els braços i el tors són d'una musculatura veterana: les venes del braç dret, els tendons del coll, la barba llarga amb cabells separats un a un. Les dues taules de la llei estan sota el braç dret, que les aguanta amb un gest de tensió. La llum de la capella toca el marbre amb un clarobscur que fa viure l'espiral del cos.",
    miraHiDeProp: [
      "Els corns: el doble sentit hebreu de keren (corn/raig) fa de Moisès un profeta radiós, no un dimoni.",
      "La barba: cada cabell és tallat individualment, i els fils que s'enrotllen al voltant dels dits de la mà dreta mostren el gest tensat.",
      "Les venes del braç: la musculatura veterana d'un home de vuitanta anys que ha portat un poble pel desert.",
    ],
    curiositats: [
      "Freud va escriure un famós assaig sobre el Moisès (1914) on sosté que la postura és el moment posterior a la ira: Moisès retingués la pedra, no la va tirar.",
      "El sepulcre de Juli II, amb el Moisès com a peça central, és l'única part del projecte mai acabada: Miquel Àngel el va anomenar «la tragèdia del sepulcre».",
    ],
    relacionades: ["david-marbre", "pietat-vaticana", "judici-final"],
    obraFita: true,
    bloc: 5,
  },
  {
    slug: "sacrifici-isaac-berruguete",
    titol: "El sacrifici d'Isaac (retaule major de sant Benet)",
    autorSlug: "berruguete",
    autorNom: "Alonso Berruguete",
    data: "1532-1536",
    anyInici: 1532, anyFi: 1536,
    tecnica: "Fusta de pi policromada",
    dimensions: "63 × 29 × 36 cm",
    ubicacio: { museu: "Museu Nacional d'Escultura", ciutat: "Valladolid", pais: "Espanya", url: "https://www.cultura.gob.es/mnescalutura" },
    disciplina: "escultura", periode: "manierisme", ambit: "espanya",
    concepts: ["escorc", "iconografia"],
    relevancia:
      "És el moment més dramàtic de l'escultura espanyola del Renaixement: Abraham, amb el ganivet aixecat, i Isaac agenollat, en un grup de fusta policromada que converteix l'ansietat religiosa castellana en forma manierista. Berruguete, format a Itàlia amb Miquel Àngel, porta el Manierisme a l'extrem espiritual.",
    context:
      "Berruguete, fill del pintor castellà Pere Berruguete, viatja a Itàlia el 1508 i treballa a Florència i Roma, on coneix el Manierisme i, segons la tradició, el taller de Miquel Àngel. Torna a Espanya el 1518 i és nomenat pintor i escultor reial per Carles V. El retaule major del monestir de sant Benet el Real de Valladolid (avui al Museu Nacional d'Escultura) és el seu projecte més important: més de trenta estàtues i relleus de fusta policromada, entre les quals el Sacrifici d'Isaac és una de les més celebrades.",
    analisi:
      "El grup és una diagonal de violència: Abraham, amb el genoll sobre Isaac, alça el ganivet amb la mà dreta mentre sosté el cap del fill amb l'altra; Isaac, agenollat i nu, mira al pare amb una acceptació que és més dolorosa que el plor. Les figures estan allargades i anguloses: el cos d'Abraham és una estructura de tendons, el d'Isaac un gest de resignació. La fusta policromada és el llenguatge espanyol: la pell pintada amb carn de color real, la roba daurada, el detall dels cabells i la barba pintats fil a fil. La llum de la sala del museu activa el contrast entre el fons fosc del grup i els colors de la pell: és el drama castellà, no el classicisme italià.",
    miraHiDeProp: [
      "El rostre d'Isaac: els ulls clars i la boca entreoberta, la resignació que és més intensa que el crit.",
      "La mà d'Abraham amb el ganivet: el gest està congelat en l'instant anterior al cop, amb tota la tensió al colze.",
      "La policromia: la pell pintada, la roba daurada i els cabells fil a fil són el llenguatge espanyol del retaule.",
    ],
    curiositats: [
      "El retaule de sant Benet és considerat el manifest de l'escultura espanyola del Renaixement: Berruguete va fusionar el Manierisme italià amb la tradició del retaule policromat castellà.",
      "Berruguete va firmar el contracte del retaule el 1526 amb clàusules que li donaven llibertat total de disseny: és el primer contracte espanyol que reconeix l'autoria creativa.",
    ],
    relacionades: ["magdalena-penitent", "judici-final", "enterrament-orgaz"],
    bloc: 6,
  },
  {
    slug: "perseu-cellini",
    titol: "Perseu amb el cap de Medusa",
    autorSlug: "cellini",
    autorNom: "Benvenuto Cellini",
    data: "1545-1554",
    anyInici: 1545, anyFi: 1554,
    tecnica: "Bronze",
    dimensions: "320 cm (amb pedestal)",
    ubicacio: { museu: "Loggia dei Lanzi", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "manierisme", ambit: "italia",
    concepts: ["nu-classic", "escorc"],
    relevancia:
      "És el bronze de precisió joiera més famós del Manierisme: Perseu aixeca el cap de Medusa amb un braç tensat, sobre el cos decapitat, i el duc Cosme I de Mèdici establia així el seu poder sobre la república. La fosa, documentada per Cellini a la seva Vida, és una aventura tècnica èpica.",
    context:
      "El duc Cosme I de Mèdici encarrega l'estàtua el 1545 per a la Loggia dei Lanzi, davant del Palazzo Vecchio, com a contrapès al David de Miquel Àngel i al Judith de Donatello: mentre aquells simbolitzaven la república, el Perseu simbolitza el duc que decapita la tirania. Cellini, orfebre de formació, hi treballa nou anys i explica la fosa a la seva Vida: el forn es va trencar, la casa va calar foc, i Cellini, malalt, va fer abocar tots els estris de peltre per recuperar la lliga. L'estàtua es va col·locar el 1554 i és una de les peces mestres de la plaça de la Signoria.",
    analisi:
      "La postura és un contrapposto heroïc: Perseu, nu i elegant, amb el cap de Medusa alçat a la mà dreta i l'espasa a l'esquerra, trepitja el cos decapitat. La postura és elegant però tensa: el braç alçat és una estructura de tendons, i el cos té una rotació lleu. La Medusa decapitada és el contrapès: el cos retort, amb la sang que vessa del coll i les serps dels cabells que s'escampen. El pedestal té quatre nínxols amb déus menors i un cos de Júpiter al davant. La precisió joiera és absoluta: cada escala dels cabells, cada vena del braç, cada detall de l'espasa és de fosa perfecta.",
    miraHiDeProp: [
      "El cap de Medusa a la mà: les serps dels cabells i la cara amb els ulls buits són pintades amb precisió de joier.",
      "El cos de Medusa al pedestal: la sang que vessa del coll és una demostració de fosa en escala petita.",
      "La rotació del cos de Perseu: el contrapposto tensat que fa que l'estàtua sigui diferent des de cada angle.",
    ],
    curiositats: [
      "Cellini conta a la seva Vida que, durant la fosa, la casa es va calar foc i ell, malalt, va fer abocar tots els estris de peltre de la cuina per recuperar la lliga: la fosa va sortir perfecta.",
      "L'estàtua és el contrapunt ideològic del David de Miquel Àngel: mentre David és la república que venç el tirà, el Perseu és el duc que decapita la república.",
    ],
    relacionades: ["david-marbre", "rapte-sabines", "david-bronze-donatello"],
    bloc: 5,
  },
  {
    slug: "rapte-sabines",
    titol: "El rapte de les sabines",
    autorSlug: "giambologna",
    autorNom: "Giambologna",
    data: "1579-1583",
    anyInici: 1579, anyFi: 1583,
    tecnica: "Marbre",
    dimensions: "410 cm",
    ubicacio: { museu: "Loggia dei Lanzi", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "manierisme", ambit: "italia",
    concepts: ["escorc", "nu-classic"],
    relevancia:
      "Es considera l'obra summà del Manierisme escultòric: tres cossos entrellaçats en una espiral pensada per ser vista des de tots els punts de vista, sense davant ni darrere. La figura serpentina (figura serpentinata) del rapte és la demostració màxima de la virtud tècnica de l'escultura tardorenaixentista.",
    context:
      "Giambologna, nascut a Flandes (Jean de Boulogne) i format a Anvers i Roma, treballa per a la cort Mèdici des de 1561. El grup és una obra d'exhibició tècnica: Giambologna volia demostrar que podia superar l'antiguitat i Miquel Àngel amb un grup de tres figures entrellaçades en marbre. El tema va ser decidit després de la talla (originalment era «Art que roba la bellesa»): el rapte de les sabines, fundació mítica de Roma, donava pretext narratiu a la composició. El grup es col·loca a la Loggia dei Lanzi el 1583, davant del Perseu de Cellini.",
    analisi:
      "La composició és una espiral vertical: el jove romà, al basament, alça la dona sabina amb el braç dret mentre el seu cos gira; la dona, amb el braç esquerre estès cap al cel, es gira al davant del seu rapteur; el vell sabí, sota, amb el braç alçat, implora. Els tres cossos formen una unitat dinàmica que s'observa igualment des de qualsevol angle: és la primera escultura pensada per ser volta. El contrapès de les dues figures principals (el jove i la dona) crea un moviment helicoïdal que fa que el grup «giri» quan l'espectador camina al seu voltant. El poliment és brillant, amb la llum del marbre que crea contrastos entre els cossos.",
    miraHiDeProp: [
      "L'espiral dels tres cossos: feu una volta al voltant de l'estàtua —cada angle és una composició diferent i completa.",
      "La mà de la dona estesa cap al cel: el gest d'imploració que anima la part superior del grup.",
      "La roba sabina: el drap que envolta la dona i el vell crea el contrapès entre pell nua i tèxtil.",
    ],
    curiositats: [
      "Giambologna va dir que el grup no tenia tema: va ser «una demostració de saber fer» que va rebre el nom del rapte de les sabines quan ja estava acabat.",
      "L'estàtua va inspirar el terme «figura serpentina», que defineix la rotació del cos al Manierisme: Rafael, Miquel Àngel i tota la tradició acadèmica en van fer teoria.",
    ],
    relacionades: ["perseu-cellini", "madonna-coll-llarg", "david-marbre"],
    obraFita: true,
    bloc: 5,
  },
  {
    slug: "colleoni",
    titol: "Retrat eqüestre de Col·leoni",
    autorSlug: "verrocchio",
    autorNom: "Andrea del Verrocchio",
    data: "1481-1496",
    anyInici: 1481, anyFi: 1496,
    tecnica: "Bronze",
    dimensions: "395 cm (amb pedestal)",
    ubicacio: { museu: "Campo Santi Giovanni e Paolo", ciutat: "Venècia", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["retrat-humanista", "nu-classic"],
    relevancia:
      "És la rèplica veneciana al Gattamelata de Donatello, però amb una energia nova: el condottiere Bartolomeo Colleoni, amb el cap girat i els músculs tensats, és la imatge del poder militar actiu. Verrocchio, mestre de Leonardo, fa del bronze un instrument de voluntat.",
    context:
      "El condottiere Bartolomeo Colleoni, en morir el 1475, va deixar la seva fortuna a la república de Venècia amb la condició que s'erigís una estàtua eqüestre en el seu honor a la plaça de sant Marc. Com que no es permetia monument eqüestre a sant Marc, la república el va col·locar al camp Santi Giovanni e Paolo. Verrocchio guanya el concurs el 1479 i treballa el model a Florència; mor el 1488 abans de la fosa, que fa el seu deixeble Alessandro Leopardi. L'estàtua es col·loca el 1496.",
    analisi:
      "La composició és una diagonal de força: el cavall camina amb les tres potes a terra i la dreta alçada, amb el coll arquejat cap a l'esquerra; el genet, amb el tors girat, mira cap a l'esquerra amb una tensió que és l'oposat de la serenitat del Gattamelata. Col·leoni és un retrat físic i moral: la cara esgarrapada, el front arrugat, la barba dura, el vestit de pell amb armadura. La fosa de Leopardi és d'una precisió excepcional: cada detall de l'armadura, cada plec del vestit, cada tendó del cavall és de bronze nítit. El pedestal de Leopardi, amb la porta de bronze i les esferes de decoració, és una obra arquitectònica pròpia.",
    miraHiDeProp: [
      "El rostre de Col·leoni: la tensió dels músculs del coll i la mirada cap a l'esquerra és l'anti-serenitat de Donatello.",
      "L'armadura del genet: cada petxina i cada corretja és de fosa nítida, amb el detall de l'armer.",
      "La pota dreta del cavall: el gest dinàmic que crea la diagonal de força de tota la composició.",
    ],
    curiositats: [
      "Verrocchio va guanyar el concurs contra Venècia sencera; el seu model de fusta encara es conserva al museu Correr de Venècia.",
      "Leonardo, deixeble de Verrocchio, potser va contribuir a alguns detalls del model: el cavall del monument és contemporani dels seus estudis eqüestres.",
    ],
    relacionades: ["gattamelata", "dama-ermini", "david-bronze-donatello"],
    bloc: 5,
  },
  {
    slug: "bacus",
    titol: "Bacus",
    autorSlug: "miquel-angel",
    autorNom: "Miquel Àngel Buonarroti",
    data: "1496-1497",
    anyInici: 1496, anyFi: 1497,
    tecnica: "Marbre",
    dimensions: "203 cm",
    ubicacio: { museu: "Museo Nazionale del Bargello", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["nu-classic", "contrapposto"],
    relevancia:
      "És la primera escultura important de Miquel Àngel a Roma, a 21 anys: un Bacus amb el cos de contrapposto trèmul, la mirada perduda i una ambigüitat de gènere (els malucs femenins, el tors masculí) que ha fascinat i desconcertat cinc segles d'espectadors.",
    context:
      "El cardenal Riario, nebot del papa Sixt IV, encarrega l'estàtua el 1496 després de veure les vendes de Miquel Àngel a Roma; el tema, un Bacus, era una prova de domini de l'antiguitat. Miquel Àngel la talla en un any, amb un marbre de Carrara de qualitat excepcional. El cardenal la rebutja (segons Vasari, perquè no la va entendre) i passa a mans del banquer Jacopo Galli, que la col·loca al seu jardí de Roma: és el primer «museu privat» d'escultura moderna. El 1572 és comprada pels Mèdici i portada a Florència.",
    analisi:
      "La postura és un contrapposto trèmul: el pes a la cama dreta, el maluc inclinat, la cama esquerra doblegada amb el peu damunt d'un tronc que fa de suport. El cos és una ambigüitat deliberada: el tors musculós masculí, els malucs suaus femenins, la cara jove i andrògina. La mirada és perduda, cap avall i cap a l'esquerra, amb els ulls mig tancats: és l'ebrietat com a estat d'anim. Un petit satir infant, sota el braç esquerra, es menja un raïm: és la duplicitat del plaer (Bacus la gaudeix, el satir la devora). La mà dreta sosté una copa amb el gest d'algú que la presenta, no que la beu: el déu ofereix el vi al visitant.",
    miraHiDeProp: [
      "La cara: els ulls mig tancats i la boca entreoberta són l'ebrietat més persuasiva de la escultura occidental.",
      "El satir que es menja el raïm: la síntesi del plaer animal que contrapunt el déu elegant.",
      "La mà dreta amb la copa: el gest de presentar el vi, no de beure'l, fa de l'espectador convidat.",
    ],
    curiositats: [
      "Vasari conta que el cardenal Riario la va rebutjar perquè «no entenia» el tema; el jardí del banquer Galli era la primera col·lecció d'escultura antiga i moderna de Roma.",
      "L'estàtua té un defecte deliberat: el peu dret descansa sobre un tronc que sembla a punt de caure —l'equilibri precari és part del tema d'ebrietat.",
    ],
    relacionades: ["david-marbre", "naixement-venus", "perseu-cellini"],
    bloc: 5,
  },
  {
    slug: "hercules-anteu",
    titol: "Hèrcules i Anteu",
    autorSlug: "pollaiuolo",
    autorNom: "Antonio del Pollaiuolo",
    data: "aprox. 1475",
    anyInici: 1475, anyFi: 1475,
    tecnica: "Bronze",
    dimensions: "45 cm (amb base)",
    ubicacio: { museu: "Museo Nazionale del Bargello", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["escorc", "nu-classic"],
    relevancia:
      "És una demostració d'anatomia en bronze: Pollaiuolo, el primer escultor que dissecciona cossos per aprendre els músculs, captura el combat d'Hèrcules amb el gegant Anteu en el moment exacte en què el campió alça el rival de terra. Un grup petit amb una energia fora de mida.",
    context:
      "Pollaiuolo, pintor, escultor i gravador florentí, és el primer artista documentat que practica la dissecció per estudiar l'anatomia: els seus estudis de nuus lluitadors són els documents anatòmics més complets del Quattrocento. El grup de bronze és una peça de col·leccionista, possiblement per als Mèdici: el tema d'Hèrcules (el patró de Florència) contra Anteu (el gegant fill de la Terra que recupera forces tocant el sòl) és l'al·legoria de la ciutat que venç els enemics aixecant-los del seu suport.",
    analisi:
      "La composició és un nus de dues figures en tensió màxima: Hèrcules, dempeus, abraça Anteu per la cintura i l'alça del terra; Anteu, amb el cap girat i la boca oberta, lluita per tornar a tocar el sòl, la font de la seva força. Cada múscul és definit: les espatlles d'Hèrcules, les cames d'Anteu que es retorcen, els peus que busquen el terra. La fosa és d'una precisió excepcional: cada tendó i cada vena és nítit. La base, amb tres figures grotesques que observen el combat, dona una escala de petit monument. És l'anti-David: no és un heroi serè, és un atleta que patineix amb tots els músculs.",
    miraHiDeProp: [
      "Les cames d'Anteu: els peus no toquen el sòl, i els músculs de les cuixes mostren l'esforç de tornar-hi.",
      "El tors d'Hèrcules: cada múscul de l'espatlla i del pit està definit, resultat de les disseccions del taller.",
      "La cara d'Anteu: la boca oberta i els ulls enfonsats són el dolor del gegant alçat.",
    ],
    curiositats: [
      "Pollaiuolo és el primer artista renaixentista amb disseccions documentades: els seus dibuixos de nuus lluitadors són la primera anatomia artística moderna.",
      "El tema d'Hèrcules i Anteu va ser pintat també per Pollaiuolo en un llenç avui als Uffizi: és el tema favorit del taller.",
    ],
    relacionades: ["david-bronze-donatello", "perseu-cellini", "bacus"],
    bloc: 5,
  },
  {
    slug: "sant-joan-desiderio",
    titol: "Sant Joan Baptista adolescent (atribuït)",
    autorSlug: "desiderio",
    autorNom: "Desiderio da Settignano (atr.)",
    data: "aprox. 1455",
    anyInici: 1455, anyFi: 1455,
    tecnica: "Marbre",
    dimensions: "85 cm",
    ubicacio: { museu: "Museo Nazionale del Bargello", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "escultura", periode: "quattrocento", ambit: "italia",
    concepts: ["retrat-humanista", "nu-classic"],
    relevancia:
      "És la gràcia lírica del Quattrocento: un sant Joan adolescent, amb el cos delicat i la cara serena, tallat amb un poliment que fa semblar el marbre pell. L'atribució discutida (Desiderio o el seu taller) és el testament del gust florentí per la bellesa suau.",
    context:
      "Desiderio da Settignano, mestre del relleu delicat i dels retrats infantils, mor jove el 1464; el seu taller continua el seu estil. Aquest Sant Joan adolescent, possiblement per a una capella privada, correspon al tipus de joventut benigna que Desiderio va definir: la cara dolça, el cos de proporcions suaus, la drapéria lleugera. L'atribució oscil·la entre el mestre i el cercle immediat (Antonio Rossellino, Mino da Fiesole), cosa que és document de com el gust de Desiderio es va convertir en la manera florentina de la segona meitat del segle.",
    analisi:
      "El cos és un adolescent de proporcions suaus: les cames creuades, el tors lleugerament girat, el gest de la mà que aguanta el bastó creuat amb la banda. La cara és el centre: els ulls serens, el somriure subtil, el cabell ondulat tallat en fines ondulacions. El marbre és polit fins a una translucidesa que fa semblar pell, però la drapéria té plecs profunds i ombres fosques. El contraste entre el poliment del cos i el relleu de la roba és la tècnica típica del taller: la bellesa és al rostre i al cos, el pes és a la roba.",
    miraHiDeProp: [
      "El poliment del rostre: la pell de marbre translúcida que fa semblar viu el gest serè.",
      "El cabell: les ondulacions fines tallades amb el buril, fil a fil.",
      "El contraste de materials: la suavitat de la pell contra el pes de la drapéria.",
    ],
    curiositats: [
      "L'atribució oscil·la entre Desiderio i el seu cercle: és el cas típic de les obres de taller florentí, on el gust del mestre es transmet als col·laboradors.",
      "El Bargello custodia la millor col·lecció d'escultura florentina del món: aquesta peça és un exemple del «gost dolç» que precedeix el Verrocchio i el jove Leonardo.",
    ],
    relacionades: ["david-bronze-donatello", "madonna-granduca", "pietat-vaticana"],
    bloc: 5,
  },
];
