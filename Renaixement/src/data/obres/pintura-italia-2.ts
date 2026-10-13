// obres/pintura-italia-2.ts — Pintura italiana II: Leonardo, Rafael, Miquel Àngel, Ticià, Veronès, Parmigianino (12 obres)
import type { Obra } from "../types";

export const PINTURA_ITALIA_2: Obra[] = [
  {
    slug: "ultim-sopar",
    titol: "L'Últim Sopar",
    autorSlug: "leonardo",
    autorNom: "Leonardo da Vinci",
    data: "1495-1498",
    anyInici: 1495, anyFi: 1498,
    tecnica: "Tempera i oli sobre guix, en mur",
    dimensions: "460 × 880 cm",
    ubicacio: { museu: "Refetor de Santa Maria delle Grazie", ciutat: "Milà", pais: "Itàlia" },
    disciplina: "pintura", periode: "quattrocento", ambit: "italia",
    concepts: ["perspectiva-lineal", "composicio-piramidal", "fresc"],
    relevancia:
      "És el fresc més famós del món i una de les demostracions més clares que la perspectiva pot servir la narració: totes les línies convergeixen en el cap de Crist, i tots els apòstols reaccionen a la mateixa frase —«un de vosaltres em trairà»— amb un gest diferent. Drama i geometria en un sol sistema.",
    context:
      "Ludovico Sforza encarrega a Leonardo la decoració del refetor dels dominics de Santa Maria delle Grazie, al costat del seu sepulcre. El tema és l'instant posterior a l'anunci de la traïció de Judes, no la institució de l'eucaristia tradicional. Leonardo treballa-hi entre 1495 i 1498 amb un mètode experimental: en lloc del fresc clàssic (pintar sobre arrebossat fresc), pinta en sec sobre dues capes de guix, cosa que li permetia corregir i treballar lentament, però condemna l'obra a degradar-se ràpidament.",
    analisi:
      "La composició és un mecanisme de rellotgeria: Crist, al centre, forma un triangle estable amb els braços estesos, i la finestra central del fons li serveix d'aureola natural. Els dotze apòstols es reparteixen en quatre grups de tres, cadascú amb una reacció emocional diferent a l'anunci: sorpresa, indignació, dubte, desmentiment. Judes, dins del grup de la dreta, retira el braç i enfonsa el colze a la taula: és el punt fosc de la composició, amb el sarró de la moneda i el tros de pa. Les ortogonals del sostre i dels tapissos converteixen la sala real del refetor en una prolongació pintada: els monjos menjaven com si soparessin amb Crist. La perspectiva lineal no és aquí ornament, és teologia visual.",
    miraHiDeProp: [
      "Les mans de Crist i de Judes, que estenen alhora cap al mateix plat: és la signatura visual de la traïció.",
      "Sant Pere, amb el ganivet a la mà dreta, girat cap a Judes: anticipa la violència de Getsemaní.",
      "La finestra del paisatge darrere de Crist: un cel serè i impossible, que contrasta amb el drama de la taula.",
    ],
    curiositats: [
      "Al segle XVII els frares van obrir una porta a la paret que va eliminar els peus de Crist; Napoleó hi va instal·lar cavalls durant la seva ocupació.",
      "L'obra va sobreviure al bombardeig de 1943 que va destruir el refetor: la paret va quedar protegida per un munt de sacs de sorra.",
    ],
    relacionades: ["gioconda", "volta-sixtina", "escola-atenes"],
    obraFita: true,
    bloc: 2,
  },
  {
    slug: "gioconda",
    titol: "La Gioconda",
    titolOriginal: "Monna Lisa",
    autorSlug: "leonardo",
    autorNom: "Leonardo da Vinci",
    data: "aprox. 1503-1519",
    anyInici: 1503, anyFi: 1519,
    tecnica: "Oli sobre taula de pollancre",
    dimensions: "77 × 53 cm",
    ubicacio: { museu: "Museu del Louvre", ciutat: "París", pais: "França", url: "https://collections.louvre.fr/ark:/53355/cl010062370" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["sfumato", "perspectiva-aeria", "retrat-humanista"],
    relevancia:
      "És el retrat més famós de la història i el manifest del sfumato: la cara de la dama està construïda amb transicions de llum sense contorns, i el paisatge del fons aplica la perspectiva aèria amb rigor científic. Aquí Leonardo fusiona ciència, pintura i psique.",
    context:
      "El retrat correspon probablement a Lisa Gherardini, esposa del mercader florentí Francesco del Giocondo (d'aquí el nom italià, Monna Lisa o La Gioconda). Leonardo el va portar amb ell tota la vida: va treballar-hi anys, el va dur de Florència a Milà, a Roma i finalment a França, on el rei Francesc I el va adquirir. No és un retrat d'encàrrec convencional sinó un laboratori personal de totes les seves teories pictòriques.",
    analisi:
      "La composició és una piràmide serena: el bust, les mans creuades i el rostre s'ordenen en un triangle estable que transmet calma. El sfumato actua sobre els racons dels ulls i de la boca: sense contorns definits, el somriure sembla canviar segons on mirem. Al paisatge, les formes properes conserven més detall, mentre els turons llunyans perden contrast i adopten tons freds i blavosos; així Leonardo suggereix l'aire entre la figura i el fons. El relleu amaga trams del nivell de l'aigua, però no justifica parlar de dos horitzons diferents, com aclareix el catàleg del Louvre. Les mans creuades tanquen la composició amb un gest tranquil.",
    miraHiDeProp: [
      "Els racons dels ulls i de la boca: tapa't un moment la boca i mira només els ulls; observa com les ombres suaus fan ambigua l'expressió.",
      "Compara les roques i els camins més propers amb les muntanyes pàl·lides del fons: com canvien el color, el contrast i la definició?",
      "Les mans creuades: observa com el gest tranquil tanca la composició per sota del rostre.",
    ],
    curiositats: [
      "El quadre va ser robat del Louvre el 1911 per un treballador italià que pensava tornar-lo a Itàlia: dos anys de recerca mundial el van convertir en el quadre més famós del món.",
      "Leonardo no va cobrar mai l'encàrrec: el va conservar fins a la mort, retocant-lo durant més de quinze anys.",
    ],
    relacionades: ["verge-roques", "dama-ermini", "vista-toledo"],
    obraFita: true,
    bloc: 2,
  },
  {
    slug: "desposoris-verge",
    titol: "Els desposoris de la Verge",
    autorSlug: "rafael",
    autorNom: "Rafael Sanzio",
    data: "1504",
    anyInici: 1504, anyFi: 1504,
    tecnica: "Oli sobre taula",
    dimensions: "170 × 118 cm",
    ubicacio: { museu: "Pinacoteca di Brera", ciutat: "Milà", pais: "Itàlia" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["perspectiva-lineal", "composicio-piramidal"],
    relevancia:
      "És la perspectiva cèntrica perfecta: un temple circular pintat amb tantes portes com línies de fuga, i un escenari on l'arquitectura i la geometria serveixen la claredat narrativa. Rafael, amb vint-i-un anys, ja escriu la gramàtica del classicisme.",
    context:
      "Rafael, format al taller d'Umbertide amb Perugino, pinta aquest retaule per a l'església de san Francesco de Città di Castello el 1504, any en què deixa l'Umbria cap a Florència. El tema és el matrimoni de Maria i Josep, amb la prova dels barrots: els pretendents fracassats, Josep porta el barrot florit que el designa marit. El model directe és el retaule del mateix tema que Perugino havia pintat per a la catedral de Perusa: Rafael, alumne brillant, supera el mestre amb l'ordre, la llum i l'espai.",
    analisi:
      "La composició divideix el quadre en dos registres: el grup nupcial al primer pla i el temple de planta octogonal al fons, obert amb porxos i cúpula. El punt de fuga està situat a la porta central del temple, exactament a l'altura dels ulls de l'espectador: cada línia del paviment hi conflueix, i la profunditat es mesura com un plànol d'arquitecte. Josep i Maria són el centre del semicercle de figures; el jove que trenca el seu barrot contra el genoll anima el grup amb un gest de rotació. La llum és clara i uniforme, els colors nets: és el classicisme en estat pur, abans que Rafael el portés a Roma.",
    miraHiDeProp: [
      "El punt de fuga a la porta central del temple: comptau les portes i els porxos, tots segueixen la mateixa fuga.",
      "El jove que trenca el barrot: el gest és l'única diagonal activa de tota la composició serena.",
      "El temple: una reproducció fidel del Templet de Bramante, ja present a Roma des de 1502.",
    ],
    curiositats: [
      "El quadre es va vendre a Milà el 1798 i va arribar a la Brera en canvi de colla d'obres amb França; va salvar-se dels bombardejos de 1943.",
      "Rafael va copiar deliberadament la postura del sacerdot i el grup del seu mestre Perugino per demostrar que ja l'havia superat.",
    ],
    relacionades: ["escola-atenes", "trinitat-masaccio", "madonna-granduca"],
    bloc: 2,
  },
  {
    slug: "madonna-granduca",
    titol: "Madonna del Granduca",
    autorSlug: "rafael",
    autorNom: "Rafael Sanzio",
    data: "aprox. 1505",
    anyInici: 1505, anyFi: 1506,
    tecnica: "Oli sobre taula",
    dimensions: "84 × 55 cm",
    ubicacio: { museu: "Galleria Palatina, Palau Pitti", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["composicio-piramidal", "clarobscur"],
    relevancia:
      "És la síntesi de Leonardo i Perugino feta per un jove de vint-i-dos anys: la composició piramidal de la Mare de Déu i el nen, el sfumato dels contorns i una dolçor que esdevindrà el model acadèmic de la Mare de Déu durant quatre segles.",
    context:
      "Rafael pinta aquesta Mare de Déu a Florència, poc arribat d'Umbria, en plena febre de les Madonnas dels anys 1504-1508, quan estudia Leonardo i Miquel Àngel directament. El nom li ve del gran duc Ferran III de Toscana, que la va comprar el 1799: la devoció popular li atribuïa miracles i el pintor Ingres en va fer còpies famoses. És una imatge de devoció privada, del tipus que els col·leccionistes florentins demanaven als tallers.",
    analisi:
      "La Mare de Déu de cos sencer, dempeus, sosté el nen: el grup forma una piràmide perfecta sobre fons fosc, sense paisatge ni arquitectura. El fons fosc és l'aportació decisiva: elimina qualsevol distracció i converteix les figures en presència pura, amb un clarobscur suau que modela el vel i la túnica. El rostre de Maria, inclinat cap al nen, i el del nen, mirant el llibre o la mà de la mare, creen un diàleg de mirades de tradició leonardesca. El color és contingut: blau profund, vermell suau, carn lluminosa. La precisió del dibuix és deguda al treball previ sobre paper, conservat en part.",
    miraHiDeProp: [
      "El contrast entre el vel translúcid i el mantell blau fosc: una sola llum domina tota la taula.",
      "La mà de la Mare de Déu que suporta el nen: cada dit té la seva ombra pròpia.",
      "El rostre del nen: la seriositat adulta d'una criatura que sap el seu destí.",
    ],
    curiositats: [
      "Va pertànyer a un monjo de Pescia que la va vendre per una suma petita; el gran duc la va pagar 3.000 escuts anys més tard.",
      "És una de les Madonnas més copiades de la història: Ingres, i després milers d'estudiants, la van fer model de devoció acadèmica.",
    ],
    relacionades: ["desposoris-verge", "escola-atenes", "verge-roques"],
    bloc: 2,
  },
  {
    slug: "escola-atenes",
    titol: "L'escola d'Atenes",
    autorSlug: "rafael",
    autorNom: "Rafael Sanzio",
    data: "1509-1511",
    anyInici: 1509, anyFi: 1511,
    tecnica: "Fresc",
    dimensions: "500 × 770 cm",
    ubicacio: { museu: "Estança de la Signatura, Museus Vaticans", ciutat: "Ciutat del Vaticà", pais: "Vaticà", url: "https://www.museivaticani.va" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["perspectiva-lineal", "perspectiva-aeria", "retrat-humanista"],
    relevancia:
      "És el manifest del Cinquecento: la filosofia antiga reunida en una arquitectura monumental, amb Plató i Aristòtil al centre i els grans pensadors disposats com una cort. El passat clàssic i el present papal es funden en una sola imatge que defineix l'ideal renaixentista.",
    context:
      "El papa Juli II encarrega a Rafael la decoració de les seves estances privades del Vaticà el 1509, quan Miquel Àngel treballava a la Sixtina de l'altra banda. L'Estança de la Signatura, sala de la signatura de gràcies, correspon a laIntel·ligència: el fresc contraposa la filosofia (aquesta paret) a la teologia (Disputa del Santíssim Sagrament), a la poesia (Parnàs) i al dret (Les virtuts i el dret). Els filòsofs antics tenen els rostres dels contemporanis: Leonardo és Plató, Miquel Àngel és Heràclit, el propi Rafael es pinta a la vora dreta amb el barret negre.",
    analisi:
      "L'espai és un temple clàssic monumental, amb voltes de canó cassetonades inspirades en el projecte de Bramante per a sant Pere: cada arc, cada cornisa segueix la perspectiva central cap al punt de fuga situat entre Plató i Aristòtil. Els dos filòsofs caminen al centre exacte: Plató assenyala el cel (el món de les idees) amb el Timeu a la mà; Aristòtil estén la mà cap a terra (el món de l'experiència) amb l'Ètica. A l'esquerra, Pitàgores escriu, i Epicur, Empèdocles i Averrois conversen; a la dreta, Euclides compàs a la mà dibuixa en una pissarra, Ptolemeu i Zoroastre sostenen globus. El paisatge del fons, obert per les finestres dels arcs, dissol l'horitzó amb perspectiva aèria. Més de cinquanta figures de grandària natural formen una cort intel·lectual sense jerarquia visual fora del centre.",
    miraHiDeProp: [
      "El punt de fuga entre Plató i Aristòtil: totes les voltes i els paviments hi conflueixen.",
      "Heràclit (Miquel Àngel), assegut sol al davant, amb el bloc de marbre: afegit després de veure la Sixtina, amb una còpia directa de l'estil del rival.",
      "L'autoretrat de Rafael, al costat dret, amb barret negre, mirant l'espectador: el testimoni del seu temps.",
    ],
    curiositats: [
      "Juli II va veure els primers esborranys i va manar destruir frescos ja acabats d'altres pintors per deixar tota la sala a Rafael.",
      "La figura de Plató té el rostre de Leonardo, mort el 1519: és el monument pictòric més bell que es va fer mai a un mestre.",
    ],
    relacionades: ["desposoris-verge", "volta-sixtina", "ultim-sopar"],
    obraFita: true,
    bloc: 2,
  },
  {
    slug: "volta-sixtina",
    titol: "Volta de la Capella Sixtina",
    autorSlug: "miquel-angel",
    autorNom: "Miquel Àngel Buonarroti",
    data: "1508-1512",
    anyInici: 1508, anyFi: 1512,
    tecnica: "Fresc",
    dimensions: "aprox. 40 × 13 m",
    ubicacio: { museu: "Capella Sixtina, Museus Vaticans", ciutat: "Ciutat del Vaticà", pais: "Vaticà", url: "https://www.museivaticani.va" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["escorc", "nu-classic", "fresc"],
    relevancia:
      "És la cimera de la pintura occidental: més de 500 m² de frescos pintats dempeus, amb més de 300 figures que converteixen una volta en un sistema arquitectònic pintat. El naixement d'Adam és la imatge més reproduïda de la història de l'art.",
    context:
      "Juli II encarrega la volta a Miquel Àngel el 1508, contra la seva voluntat: ell es considerava escultor, no pintor. El programa original (els dotze apòstols) el considera insuficient i el substitueix per una cosmologia completa: la Creació del món, Adan i Eva, el pecat original, Noè, i una multitud de profetes, sibil·les i avantpassats de Crist. Quatre anys de treball físic brut, amb els braços alçats sobre capçals i escafandres propis, arruïnen la seva salut i la seva vista. El 1534 hi afegirà el Judici Final a la paret de l'altar.",
    analisi:
      "La volta és arquitectura pintada: cornises, pilastres i medallions esculpits en fresc creen un sistema fictici que organitza les escenes centrals en nou compartiments, des de la Separació de la llum i les tenebres fins a l'Embriaguesa de Noè. Les figures creixen de grandària i simplicitat a mesura que avança el treball: els profetes i sibil·les dels laterals són estàtues vives, amb escorç de plorants i nuus heròics. El naixement d'Adam és la síntesi: dos braços que es toquen amb un espai d'aire entre els dits, Déu vell i actiu envoltat d'àngels en una forma cerebral vermella, Adam jove i passiu sobre la terra. La perspectiva d'escorç és calculada des de la planta: cada figura corregeix la deformació que patirà vista des de 20 metres avall.",
    miraHiDeProp: [
      "El dit de Déu i el d'Adam: l'espai entre els dos és el centre simbòlic de tot el sistema.",
      "La sibil·la de Delfos: el gir del cos i el rostre jove, pintats amb una frescor que sembla fet ahir.",
      "Les figures dels ignudi (nuus heròics) que emmarquen les escenes: cada postura és una demostració d'anatomia.",
    ],
    curiositats: [
      "Miquel Àngel va escriure un poema còmic sobre les condicions de treball: «la barba cap al cel, el coll penjat com un gat d'Àustria, el pinzell degotint-me damunt la cara».",
      "La restauració de 1980-1994 va eliminar el bistre que tapava els colors: la Sixtina va tornar als colors vius que Miquel Àngel va pintar, per sorpresa del món.",
    ],
    relacionades: ["judici-final", "escola-atenes", "david-marbre"],
    obraFita: true,
    bloc: 2,
  },
  {
    slug: "judici-final",
    titol: "El Judici Final",
    autorSlug: "miquel-angel",
    autorNom: "Miquel Àngel Buonarroti",
    data: "1536-1541",
    anyInici: 1536, anyFi: 1541,
    tecnica: "Fresc",
    dimensions: "1.370 × 1.220 cm",
    ubicacio: { museu: "Capella Sixtina, Museus Vaticans", ciutat: "Ciutat del Vaticà", pais: "Vaticà", url: "https://www.museivaticani.va" },
    disciplina: "pintura", periode: "manierisme", ambit: "italia",
    concepts: ["escorc", "nu-classic", "clarobscur"],
    relevancia:
      "És el fresc més gran i més violent del Renaixement: 400 figures nues que cauen i s'aixequen en un remolí sense arquitectura, pintades vint anys després de la volta. La diferència entre la Sixtina jovial i aquest Judici és la diferència entre el Cinquecento clàssic i el món de postguerra del Manierisme.",
    context:
      "Clem VII i després Pau III encarreguen el Judici a Miquel Àngel el 1534, quan el món havia canviat: el sac de Roma (1527), la ruptura protestant i el turc a les portes havien acabat amb la serenitat altrenacentista. Miquel Àngel, amb seixanta anys, pinta quatre anys el mur de l'altar, sobre els frescos anteriors de Perugino. La iconografia és apocalíptica: Crist jutge, amb la Mare de Déu, rodejat de sants i màrtirs amb els instruments del seu martiri, jutja els homes que pugen o cauen cap a l'infern amb Caront i Minos, de la Divina Comèdia.",
    analisi:
      "La composició és un vòrtex: dues onades de figures pugen i baixen al voltant del Crist jutge, que amb el braç aixecat marca l'instant exacte del veredicte. Les figures són nues i escultòriques, construïdes amb torsions (figura serpentina) i escorços heroics: cap ordin no hi té lloc, l'arquitectura de la volta ha desaparegut. Sant Bartomeu sosté la seva pròpia pell, amb el rostre autoretratat de Miquel Àngel: la confessió personal d'un home que se sent massa fràgil per al judici. El color és diferent de la volta: blaus lapislàtzuli, verds fred i carn de cobre, amb un clarobscur dramàtic que anticipa el Barroc.",
    miraHiDeProp: [
      "La pell de sant Bartomeu: el rostre penjat és l'autoretrat de Miquel Àngel, un home desollat pel seu art.",
      "Crist jutge: el braç aixecat no és una benedicció, és un cop: la diferència entre el Crist de la volta (20 anys abans) i aquest.",
      "Caront i el seu bot, a l'infern de sota: la citació literal de la Divina Comèdia de Dante.",
    ],
    curiositats: [
      "Al Concili de Trento es va discutir si tapar el fresc: el 1564 Daniele da Volterra va pintar les nueses amb bragues i va rebre el malnom «Il Braghettone» (el bragues).",
      "Quan Pau III va veure el fresc, el mestre de cerimònies Biagio da Cesena el va considerar indecent per a un lloc papal; Miquel Àngel el va pintar com a Minos, jutge de l'infern, amb orelles d'ase i una serp que li mossega els genitals.",
    ],
    relacionades: ["volta-sixtina", "crist-mort-mantegna", "enterrament-orgaz"],
    obraFita: true,
    bloc: 2,
  },
  {
    slug: "amor-sagrat-profà",
    titol: "Amor sagrat i amor profà",
    autorSlug: "titia",
    autorNom: "Ticià",
    data: "aprox. 1514",
    anyInici: 1514, anyFi: 1515,
    tecnica: "Oli sobre llenç",
    dimensions: "118 × 279 cm",
    ubicacio: { museu: "Galleria Borghese", ciutat: "Roma", pais: "Itàlia" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["nu-classic", "iconografia"],
    relevancia:
      "És l'obra on la pintura veneciana troba la seva veu: dos Venus, una vestida i una nua, assegudes sobre una font, amb un colorit càlid i una pincellada lliure que fan del color —i no del dibuix— l'eina principal de la pintura. Tota la tradició veneciana hi comença.",
    context:
      "El quadre és un encàrrec de noces: Niccolò Aurelio, canceller de Venècia, el demana per al seu matrimoni amb Laura Bagarotto el 1514. L'escut del nuvi és al costat de la font, i el tema d'ambdues Venus correspon a la lectura neoplatònica de les noces: l'amor terrenal (la Venus vestida, amb roses i música) i l'amor diví (la Venus nua, amb la làmpada eterna) són dos nivells del mateix sentiment. El 1608 es trobava a la col·lecció del cardenal Scipione Borghese, on ha romès.",
    analisi:
      "La composició és simètrica i serena: dues dones assegudes sobre el mateix taulell de marbre que tanca la font, amb el paisatge venecià del fons dividit en dues meitats —una castell i una església, un pastor i uns caçadors. La Venus vestida, amb el guant i el ram de flors, representa l'amor governat per la raó; la Venus nua, amb la làmpada de foc, l'amor que il·lumina. Ticià pinta la pell com una matèria lluminosa: capes d'oli translúcides que fan veure el cos sota la superfície. El paisatge, amb la seva llum crepuscular i els seus núvols rossos, és tan important com les figures: és el naixement del paisatge venecià com a gènere emocional.",
    miraHiDeProp: [
      "Les dues qualitats de pell: la vestida té un to més fred i metàl·lic; la nua, una càlidesa translúcida.",
      "La font de marbre amb l'escut d'Aurelio: el detalls dels objectes (metall, vidre, aigua) mostren el domini tècnic de l'oli.",
      "El paisatge del fons: la llum daurada que toca els núvols i els arbres és la signatura de l'escola veneciana.",
    ],
    curiositats: [
      "Al segle XVII es va interpretar com a retrat de dues esposes del mateix home; el títol actual és del 1693, i encara es discuteix el programa exacte.",
      "El quadre va ser restaurat el 1916 amb resultats discutits: les aurèoles de foc de les capçaleres són afegits dels restauradors.",
    ],
    relacionades: ["venus-urbino", "naixement-venus", "assumcio-frari"],
    bloc: 2,
  },
  {
    slug: "assumcio-frari",
    titol: "Assumpció de la Verge (els Frari)",
    autorSlug: "titia",
    autorNom: "Ticià",
    data: "1516-1518",
    anyInici: 1516, anyFi: 1518,
    tecnica: "Oli sobre taula",
    dimensions: "690 × 360 cm",
    ubicacio: { museu: "Santa Maria Gloriosa dei Frari", ciutat: "Venècia", pais: "Itàlia" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["composicio-piramidal", "clarobscur"],
    relevancia:
      "És el retaule més gran de Venècia i la revolució del color en escala monumental: tres nivells d'escena (apòstols, assumció, Déu Pare) units per un moviment ascensional i un colorit que crea llum sense dibuix. Quan es va destapar, Venècia sencera va comprendre que havia nascut una nova manera de pintar.",
    context:
      "Ticià, amb uns vint-i-cinc anys, guanya l'encàrrec del retaule major dels Frari el 1516, superant els mestres establerts. El tema és l'assumpció de la Mare de Déu, patrocinadora de l'església franciscana, amb els apòstols estupefactos davant del sepulcre buit. És el primer retaule monumental venecià pensat per a ser vist de lluny, dins del contrast de llum de l'església gòtica: Ticià dissenya la composició perquè funcioni a 30 metres de distància.",
    analisi:
      "La composició es divideix en tres registres superposats però units per una diagonal ascensional: els apòstols del basament, amb els braços aixecats en gest heroics; la Mare de Déu alçada per àngels en remolí; Déu Pare al vèrtex, dins de l'arc del cel obert. El color crea l'estructura: el vermell i el blau de la Mare de Déu, el daurat del cel, les teles fosques dels apòstols —cap línia de dibuix domina, tot és llum i matèria. La perspectiva no és lineal sinó atmosfèrica: les figures del basament estan en penombra i la Mare de Déu és la font de llum de tot el retaule. És el naixement del colorisme venecià a gran escala.",
    miraHiDeProp: [
      "Les mans dels apòstols del basament: cada gest és diferent i forma un cor escultòric.",
      "El remolí d'àngels al voltant de la Mare de Déu: cossos petits, girats i amb roba ventada, que creen el moviment ascensional.",
      "La cara de Déu Pare, vista de front entre els àngels: la serenitat del vèrtex contra el moviment del basament.",
    ],
    curiositats: [
      "El retaule va ser portat a Milà per Napoleó el 1797 i va tornar a Venècia el 1817; la relíquia de la Mare de Déu va romre al seu lloc original.",
      "El frare cronista de l'època conta que quan es va destapar, «tots els pintors venecians van comprendre que s'havia obert una nova era».",
    ],
    relacionades: ["amor-sagrat-profà", "venus-urbino", "noces-cana"],
    bloc: 2,
  },
  {
    slug: "venus-urbino",
    titol: "Venus d'Urbino",
    autorSlug: "titia",
    autorNom: "Ticià",
    data: "1538",
    anyInici: 1538, anyFi: 1538,
    tecnica: "Oli sobre llenç",
    dimensions: "119 × 165 cm",
    ubicacio: { museu: "Galeria dels Uffizi", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["nu-classic", "retrat-humanista"],
    relevancia:
      "És el nu femení llançat a la modernitat: Ticià converteix la Venus mitològica en una dona real que mira l'espectador als ulls, dins d'una habitació domèstica veneciana. Manet farà de la seva Olimpia una còpia directa i escandalosa quatre segles més tard.",
    context:
      "El quadre és un encàrrec del duc Guidobaldo II della Rovere d'Urbino, possiblement per celebrar el seu matrimoni el 1534. El tema és la Venus tradicional, però l'ambient és domèstic: el cofre de les núvies (cassone) al fons, les criades al davant del maquillatge, la gosseta fidel. El quadre va passar als Mèdici el 1637 i és una de les peces mestres dels Uffizi.",
    analisi:
      "La dona reposa sobre un llit blanc, amb el cos d'ivori pintat amb capes translúcides d'oli que li donen una càlidesa carnal. La mà dreta cobreix el sexe amb un gest que cita la Venus pudica antiga, però la mirada directa i el somriure subtil la fan complice de l'espectador: és la Venus que sap que és mirada. La composició divideix el llenç en dues zones: el cos en primer pla i l'escena domèstica del fons, amb les dues criades agenollades davant del cofre. El detall dels objectes (les sabatilles, el ram de flors, el gos que dorm) és una demostració de domini de l'oli: cada matèria té la seva llum pròpia.",
    miraHiDeProp: [
      "La mirada de la Venus: no és pas reverent ni distant, és una mirada convidant que trenca la distància.",
      "La mà dreta i el plec del llençol: la llum atravessa la roba i fa veure el cos sota la superfície.",
      "El gos al peu del llit: símbol domèstic de fidelitat, contraposat al tema del matrimoni del comitent.",
    ],
    curiositats: [
      "Mark Twain va escriure que era «la pintura més bruta, més vil i més obscena del món» en una diatriba famosa que va fer augmentar-ne la fama.",
      "El 1863 Manet va pintar la seva Olimpia amb la mateixa postura i mirada: va ser l'escàndol del Saló de París i una declaració de dependència de Ticià.",
    ],
    relacionades: ["amor-sagrat-profà", "naixement-venus", "madonna-coll-llarg"],
    obraFita: true,
    bloc: 2,
  },
  {
    slug: "noces-cana",
    titol: "Les noces de Canà",
    autorSlug: "verones",
    autorNom: "Paolo Veronese",
    data: "1563",
    anyInici: 1562, anyFi: 1563,
    tecnica: "Oli sobre llenç",
    dimensions: "677 × 994 cm",
    ubicacio: { museu: "Museu del Louvre", ciutat: "París", pais: "França", url: "https://www.louvre.fr" },
    disciplina: "pintura", periode: "cinquecento", ambit: "italia",
    concepts: ["perspectiva-lineal", "retrat-humanista"],
    relevancia:
      "És el quadre més gran del Louvre i la festa suprema de la pintura veneciana: 130 personatges en un escenari arquitectònic monumental, on el miracle bíblic és pretext per a un banquet de cort. Cap obra no explica millor el gust venecià per l'ostentació i la pageant.",
    context:
      "El monestir benedictí de san Giorgio Maggiore de Venècia encarrega a Veronese el quadre per al refetor el 1562. El contracte especifica les dimensions exactes i els materials dels colors (ultramar, lapislàtzuli, or) i dona al pintor llibertat total de composició. Veronese converteix el miracle de Canà (Crist transforma l'aigua en vi) en un banquet de cort venecià: al centre, Crist i Maria; al voltant, més d'un centenar de comensals elegants, amb els arquitectes Sansovino i Palladio, i el mateix Veronese com a músic de viola da gamba.",
    analisi:
      "La composició és una arquitectura teatral: balustrades, galeries i capitells clàssics emmarquen una terrassa oberta al cel, amb la perspectiva construïda amb rigor (els punts de fuga de les balustrades convergeixen darrere de Crist). Els comensals s'agrupen en nuclis conversadors, amb la taula de Crist com a eix: el gest de Crist, que assenyala les àmfores, és l'únic vincle explícit amb el miracle. El color és festiu: vermelles, daurats, azurs, verds —cap color no predomina, tot és harmonia de festa. La llum és uniforme i clara, sense dramatisme: és la llum de la Venècia de migdia, no la de la Sixtina.",
    miraHiDeProp: [
      "El músics del davant (la viola da gamba): el segon músic és el mateix Veronese, el primer és el seu germà Benedetto; el tercer i el quart, Sansovino i Tintoretto.",
      "El criat que serveix el vi davant de Crist: el vincle visual entre el miracle i la festa.",
      "Les arquitectures pintades: les columnes de la balustrada tenen capitells corintis i sota-basos amb escuts del monestir.",
    ],
    curiositats: [
      "Napoleó va portar el quadre a París el 1797 després de desbancar-lo del refetor de san Giorgio; la inquisició veneciana ja havia acusat Veronese d'indecència per la festa (li va respondre pintant el mateix tema amb menys comensals: el Crist a la casa de Levi).",
      "El llenç va travessar el mar en cinc peces i va ser cosit de nou al Louvre; durant el trasllat de 1797 un oficial va contar que «cada peça es plegava com un drap».",
    ],
    relacionades: ["assumcio-frari", "amor-sagrat-profà", "escola-atenes"],
    bloc: 2,
  },
  {
    slug: "madonna-coll-llarg",
    titol: "La Madonna del coll llarg",
    autorSlug: "parmigianino",
    autorNom: "Parmigianino",
    data: "1535-1540",
    anyInici: 1535, anyFi: 1540,
    tecnica: "Oli sobre taula",
    dimensions: "216 × 132 cm",
    ubicacio: { museu: "Galeria dels Uffizi", ciutat: "Florència", pais: "Itàlia" },
    disciplina: "pintura", periode: "manierisme", ambit: "italia",
    concepts: ["composicio-piramidal", "retrat-humanista"],
    relevancia:
      "És el manifest pictòric del Manierisme: el coll de la Mare de Déu allargat fins a l'impossible, el nen mort com a premonició de la Passió, i una elegància freda que substitueix l'harmonia natural del classicisme per la bellesa artificial. La norma clàssica manipulada amb intel·ligència.",
    context:
      "Parmigianino pinta aquest retaule a Parma per a Elena Baiardi, entre 1535 i la seva mort el 1540: el quadre va quedar inacabat. La columna única del fons i el grup d'àngels al costat són elements simbòlics: la columna és el lloc de la flagel·lació, i els àngels, que sostenen un gerro amb aigua tèrbola, són la metàfora de la humanitat tèrbola davant del misteri diví. El quadre és el document més citat del Manierisme italià a tots els manuals.",
    analisi:
      "La Mare de Déu, de cos allargat, sosté el nen que dorm amb un braç fluix: el coll és una càscara d'ivori, els dits són falanges de perla. A la dreta, sant Jeroni amb el pergamí i un home gran agenollat (el comitent probable); a l'esquerra, cinc àngels apinyats sobre un podi de marbre. La columna única, sense capítol ni base visible, divideix el fons: és l'espai irracional del Manierisme, on l'arquitectura serveix el símbol i no la versemblança. El color és fred i metàl·lic: ivoris, grisos, azurs suaus. La llum és uniforme, sense drama: és la bellesa gelada, no la devoció calenta.",
    miraHiDeProp: [
      "El coll de la Mare de Déu: la curvatura impossible que dona nom al quadre és la signatura del Manierisme.",
      "El nen dormint: la postura és idèntica a la del Davallament de la creu —és un nen mort en potència, premonició de la Passió.",
      "El gerro d'àngels: el reflex tèrbol de la superfície és pintat amb una precisió de mirall.",
    ],
    curiositats: [
      "El quadre va quedar inacabat per la mort de Parmigianino el 1540, a 37 anys, obsessionat amb l'alquímia que el va arruïnar.",
      "El poeta i crític Anton Artaud va escriure el 1931 un assaig on el coll de la Madonna era la metàfora de la bellesa inhumana del Manierisme.",
    ],
    relacionades: ["judici-final", "venus-urbino", "rapte-sabines"],
    bloc: 2,
  },
];
