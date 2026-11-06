// content-part1.js — Capítols 1-4: Resum executiu · Objectius · Arquitectura · Model de dades
"use strict";

module.exports = [

  // ══════════════ 1. RESUM EXECUTIU ══════════════
  { h1: "1. Resum executiu" },
  { p: "Aquest document fixa la **programació completa de continguts** de la futura web de referència sobre el Renaixement: què s'hi explicarà, com s'estructurarà, quines obres s'hi mostraran i amb quin disseny. És el plànol mestre previ al desenvolupament, pensat perquè la programació de la web pugui començar amb totes les decisions preses i amb un sistema de creixement definit des del primer dia. No és un esborrany provisional: cada secció inclou les explicacions redactades, els camps de dades, les plantilles i els prompts necessaris per construir i, sobretot, per continuar creixent." },
  { p: "La web es planteja com un **material didàctic i de consulta bàsic** sobre pintura, escultura i arquitectura del Renaixement, amb tres trets diferencials. Primer, l'observació directa en **alta resolució**: cada obra es podrà obrir en un visor amb zoom que permeti examinar la pinzellada, el detall i la matèria. Segon, l'**organització múltiple dels mateixos continguts**: per períodes (Quattrocento, Cinquecento), per artistes, per conceptes tècnics (perspectiva lineal, perspectiva aèria), per disciplines i per àmbits geogràfics, amb eixos cronològics interactius que connecten obres, períodes i biografies. Tercer, un **filtratge didàctic**: l'usuari podrà triar què veure segons el concepte que està estudiant, per exemple tot allò que il·lustra el Quattrocento o totes les obres de Miquel Àngel." },
  { p: "La **Fase 1** defineix un nucli de referència d'aproximadament **60 obres** (pintura italiana, pintura flamenca i del nord, escultura i arquitectura), **18 artistes** amb fitxa pròpia i **12 conceptes** explicats, organitzats en set blocs temàtics que cobreixen des del marc històric fins al Renaixement fora d'Itàlia, incloent-hi les escoles arquitectòniques espanyoles (Plateresca, Classicista i Herreriana) i la presència renaixentista a Flandes i França. Per a cada obra s'indicarà la **ubicació actual** (museu o lloc de conservació) a més de la fitxa tècnica, el context, una anàlisi breu i l'apartat destacat «Per què és rellevant»." },
  { p: "El document també inclou la **guia de disseny** (estil «museu fosc», responsiu i accessible), les especificacions tècniques (model de dades, fonts legals d'imatges de domini públic, visor de zoom per tessel·les), les **plantilles de prompts** per generar noves fitxes mantenint coherència total, i el **full de ruta en tres fases**. Amb aquesta base, el desenvolupament es pot iniciar immediatament i qualsevol ampliació futura —més obres, més autors, més informació— es farà afegint continguts al sistema, sense haver de refer res." },

  // ══════════════ 2. OBJECTIUS, PÚBLIC I PRINCIPIS ══════════════
  { h1: "2. Objectius, públic i principis editorials" },

  { h2: "2.1 Què ha de ser aquesta web" },
  { p: "La web neix amb una ambició clara: esdevenir una **referència en català** per a l'estudi del Renaixement artístic, comparable en rigor a les grans plataformes museístiques però amb un tractament pedagògic propi. No és una galeria d'imatges amb peus de foto, ni un manual digitalitzat: és un entorn d'aprenentatge i consulta on cada obra, cada artista i cada concepte disposen d'una fitxa completa, enllaçada entre si i ubicada en el temps. L'usuari hi ha d'arribar per tres camins igual de vàlids: navegant pels blocs temàtics com qui llegeix un manual, explorant l'eix cronològic com qui visita una exposició, o cercant directament per concepte o autor com qui consulta un diccionari." },
  { p: "Els objectius concrets del projecte són els següents:" },
  { bullets: [
    "**Mostrar el canon del Renaixement en alta resolució**, amb visor de zoom i panoràmica, de manera que l'estudi de la tècnica es faci sobre l'obra mateixa i no sobre reproduccions mínimes.",
    "**Explicar els conceptes centrals** —Quattrocento, Cinquecento, perspectiva lineal, perspectiva aèria, sfumato, contrapposto i altres— amb definicions precises, exemples visuals enllaçats i un llenguatge a l'abast de l'aula.",
    "**Retratar els principals artistes** (Miquel Àngel, Donatello, Rafael, El Greco i altres) amb fitxes biogràfiques i estilístiques que connectin cada autor amb les seves obres a la web.",
    "**Cobrir les escoles i els àmbits geogràfics**: Itàlia (Florència, Roma, Venècia), les escoles arquitectòniques espanyoles (Plateresca, Classicista, Herreriana), el Renaixement a Flandes i a França, i el nord d'Europa (Dürer, Holbein).",
    "**Permetre seleccions didàctiques** per concepte, període, artista, disciplina o país, així com eixos cronològics on apareguin simultàniament obres, períodes i artistes.",
    "**Indicar sempre la ubicació actual** de cada obra (museu, ciutat, país) i oferir l'accés al visor d'alta resolució amb un sol clic sobre la imatge.",
    "**Creixer de forma modular**: afegir una obra, un autor o un apartat nou ha de ser una operació simple, documentada i sense efectes col·laterals sobre l'existent.",
  ] },
  { p: "En resum, la web ha de funcionar alhora com a **material d'aula** (suport visual per a explicacions i activitats), com a **consulta individual** (fitxes completes i navegació lliure) i com a **eina de repàs** (recorreguts per concepte i, en fases posteriors, qüestionaris). Aquesta triple funció condiciona totes les decisions d'estructura i disseny que conté aquest document." },

  { h2: "2.2 Públic destinatari i nivells de lectura" },
  { p: "El públic principal és l'alumnat de **Batxillerat i cicles de secundària**, especialment en les matèries d'Història de l'Art i d'Educació Visual i Plàstica. El llenguatge ha de ser rigorós però accessible: cada terme tècnic s'explica en primera instància, es recull al glossari i es presenta el terme italià original (en cursiva) quan és la denominació consolidada. El públic secundari són els docents (que hi trobaran un banc d'imatges i explicacions ordenades per unitats), les famílies i el públic general culte, que ha de poder llegir les fitxes sense sensació de manual acadèmic." },
  { p: "Per atendre aquesta diversitat sense duplicar contingut, cada obra presenta la informació en **tres capes de lectura**, de la més visual a la més profunda. La capa ràpida resolt la pregunta «què és això?»; la capa d'estudi respon «per què importa i com està feta?»; la capa d'ampliació convida a seguir explorant. La taula següent fixa aquestes capes, que el disseny haurà de fer perceptibles sense configuració per part de l'usuari." },
  { table: {
    caption: "Taula 1. Les tres capes de lectura de cada fitxa",
    headers: ["Capa", "Què conté", "On es veu"],
    widths: [22, 48, 30],
    rows: [
      ["1. Vista ràpida", "Imatge, títol, autor, data, tècnica, període, ubicació actual i el destacat «Per què és rellevant» en una o dues frases.", "Principal de la fitxa, sense clic; també a les graelles i a l'eix cronològic."],
      ["2. Estudi", "Context històric (3-5 frases), anàlisi formal breu (composició, color, llum, tècnica) i relació amb els conceptes etiquetats.", "Desplegada a sota de la capa ràpida, amb els conceptes com a enllaços."],
      ["3. Ampliació", "Curiositats i detalls dignes de zoom, obres relacionades de la mateixa web, enllaç a l'artista i al museu.", "Peu de la fitxa i bloc «Segueix explorant»."],
    ],
    after: "La capa ràpida mai no es sacrifica: si l'espai és escars (mòbil), es redueix primer l'anàlisi formal i sempre al final el destacat de rellevància.",
  } },

  { h2: "2.3 Principis editorials" },
  { p: "Aquestes regles són **vinculants** per a tot contingut present i futur, i les plantilles de prompts del capítol 10 les incorporen explícitament. El seu objectiu comú és que la web sigui àgil, visual i sense farciment: cada línia publicada ha de portar informació." },
  { numbered: { ref: "num-principis", items: [
    "**La rellevància primer.** Cada fitxa comença pel «Per què és rellevant»: la idea que cal recordar, destacada visualment i llegible en un cop d'ull.",
    "**Cap subtítol buit.** Els encapçalaments informen («Perspectiva lineal: com es construeix l'espai»), mai no reomplen («Introducció», «Altres coses»). Si un subtítol no aporta, s'elimina.",
    "**Frases completes, paràgrafs denses.** Cada paràgraf desenvolupa una idea completa amb 3-5 frases; es prohibeixen els paràgrafs d'una sola frase i les llistes sense context explicatiu.",
    "**Vocabulari explicat.** Qualsevol terme tècnic apareix en cursiva, es defineix en primera instància i té entrada al glossari viu (capítol 8).",
    "**Dades verificades.** Data, tècnica, dimensions i ubicació actual només s'hi posen si són verificables; si una obra és en préstec o hi ha dubte d'atribució, s'indica. Mai no s'inventa res.",
    "**Ubicació sempre visible.** On és l'obra avui (museu, ciutat, país) és un camp obligatori i sempre present, perquè és informació de consulta essencial.",
    "**Català normatiu amb originals en italià.** Es conserven les denominacions italianes consolidades (Quattrocento, Cinquecento, sfumato) en cursiva, i les traduccions catalanes dels títols amb l'original entre parèntesis quan aporti claredat.",
    "**Zoom amb propòsit.** Quan un detall mereix observació (una mà, un reflex, una signatura), la fitxa hi apunta explícitament: el visor no és decoratiu, és argumentatiu.",
  ] } },

  // ══════════════ 3. ARQUITECTURA DE LA INFORMACIÓ ══════════════
  { h1: "3. Arquitectura de la informació i navegació" },

  { h2: "3.1 Mapa del lloc (versió 1)" },
  { p: "L'estructura de primer nivell respon a les tres maneres naturals d'accedir al contingut: per **tema** (blocs i conceptes), per **temps** (eixos cronològics) i per **autor** (artistes). El catàleg complet d'obres és transversal i s'hi arriba des de qualsevol punt. Aquesta estructura és estable per a totes les fases: les ampliacions s'incorporen dins dels blocs existents o com a nous blocs dins de «Conceptes», sense canviar la navegació de primer nivell." },
  { table: {
    caption: "Taula 2. Seccions de primer nivell i contingut de cada una",
    headers: ["Secció", "Contingut", "Ampliable amb"],
    widths: [24, 48, 28],
    rows: [
      ["Inici", "Presentació visual (obra destacada rotativa), accés directe als eixos, als conceptes i a les col·leccions; bloc «Obra per descobrir».", "Noves entrades destacables sense canviar la plantilla."],
      ["Eixos cronològics", "Franja 1400-1600 amb pins d'obres, artistes i esdeveniments; filtres per disciplina, país i període.", "Nous eixos temàtics (p. ex. «La cúpula», «El retrat») com a vistes preconfigurades."],
      ["Conceptes", "Fitxes de concepte (Quattrocento, Cinquecento, perspectiva lineal i aèria, sfumato, contrapposto...) amb obres exemplars enllaçades.", "Nous conceptes i subconceptes com a fitxes noves."],
      ["Artistes", "Índex de fitxes d'artista amb filtres per període i àmbit; cada fitxa enllaça les seves obres a la web.", "Nous autors i ampliacions biogràfiques."],
      ["Col·leccions", "Catàleg complet d'obres amb filtres combinables (disciplina, període, país, escola, museu).", "Obres noves; subcol·leccions temàtiques."],
      ["Arquitectura i escoles", "Bloc especialitzat: principis, mestres, obres i les escoles Plateresca, Classicista i Herreriana.", "Nov escoles o territoris (p. ex. Portugal, Bohèmia)."],
      ["Fora d'Itàlia", "Flandes, França, Espanya i el nord d'Europa: context, autors i obres.", "Nous territoris amb la mateixa plantilla."],
      ["Glossari", "Índex alfabètic de termes amb definicions curtes; els termes apareixen subratllats arreu de la web.", "Noves entrades; sinònims que apunten a l'entrada principal."],
      ["Sobre el projecte", "Criteris de selecció, crèdits, fonts d'imatges i guia d'ús per a docents.", "Guies didàctiques per unitat."],
    ],
  } },

  { h2: "3.2 Sistema de filtres: la taxonomia" },
  { p: "El filtratge és el cor interactiu de la web: seleccionar «Quattrocento» o «Miquel Àngel» ha de produir, en un instant, un conjunt coherent d'obres i fitxes. Per aconseguir-ho, cada obra porta **etiquetes controlades** de sis dimensions, definides en el model de dades del capítol 4. Les etiquetes no es poden improvisar: només existiran els valors del vocabulari aprovat, i qualsevol valor nou s'ha d'afegir primer a la taxonomia. Així es garanteix que els filtres sempre retornin resultats complets i sense duplicats." },
  { table: {
    caption: "Taula 3. Dimensions de la taxonomia i valors inicials",
    headers: ["Dimensió", "Valors (vocabulari inicial)", "Serveix per a"],
    widths: [20, 52, 28],
    rows: [
      ["Període", "Quattrocento (1400-1500) · Cinquecento (1500-1600) · Manierisme (aprox. 1520-1600) · Renaixement flamenc (1420-1500) · Renaixement del nord (1500-1600)", "Selecció ràpida; eix cronològic; estudis comparatius."],
      ["Disciplina", "Pintura · Escultura · Arquitectura · Artes decoratives (reserva)", "Filtratge de catàleg i de l'eix."],
      ["Àmbit", "Itàlia (Florència, Roma, Venècia, Umbria, nord d'Itàlia) · Flandes · França · Espanya · Alemanya", "Vistes «Fora d'Itàlia»; mapes."],
      ["Artista", "Llista de fitxes d'artista (cap. 5.8 i 6)", "Obra per obra; recorreguts d'autor."],
      ["Concepte tècnic", "Perspectiva lineal · Perspectiva aèria · Sfumato · Clarobscur · Escorç · Contrapposto · Composició piramidal · Retrat humanista · Nu clàssic · Iconografia · Cimabue... (llista tancada, cap. 5.3)", "Aprendre per concepte; connectar obres entre si."],
      ["Escola arquitectònica", "Plateresca · Classicista · Herreriana · Renaixement italià · Primer Renaixement francès", "Bloc d'arquitectura; comparacions d'escoles."],
    ],
    after: "Regla d'or: cada obra porta 1-3 conceptes tècnics com a màxim, i només els que realment exemplifiquen bé. La precisió val més que l'exhaustivitat: un filtre per concepte ha de retornar sempre obres que serveixen per explicar-lo a l'aula.",
  } },

  { h2: "3.3 Adreces, plantilles i escalabilitat" },
  { p: "Cada tipus de fitxa disposa d'una plantilla única i d'un patró d'adreça estable: **/obra/nom-slug**, **/artista/nom-slug**, **/concepte/nom-slug**, **/escola/nom-slug**, i vistes llistes com **/col·leccions?disciplina=pintura&periode=quattrocento**. Les adreces són permanents i llegibles (amb el nom normalitzat, sense accents ni espais), cosa que convé a la consulta i al posicionament d'una web de referència. El mateix contingut es compon des de la mateixa base de dades en totes les vistes: una obra nova apareix automàticament al catàleg, a l'eix cronològic, als filtres dels seus conceptes i a la fitxa del seu artista." },
  { p: "La condició d'escalabilitat es fixa així: **afegir contingut mai no ha d'exigir tocar codi**. Una obra nova és un registre de dades (JSON) més la seva imatge; un autor nou és un registre més; un concepte nou, una fitxa més al vocabulari. Les plantilles cobreixen tots els estats (amb o sense curiositats, amb o sense obres relacionades) i el disseny s'ha de provar tant amb deu elements com amb dos-cents. Aquest principi, assumit des de la Fase 1, és el que farà possible el creixement continu que el projecte demana." },

  // ══════════════ 4. MODEL DE DADES I PLANTILLES ══════════════
  { h1: "4. Model de dades i plantilles de fitxes" },

  { h2: "4.1 Fitxa d'obra" },
  { p: "La fitxa d'obra és la unitat bàsica de la web i el model més complet. Els camps obligatoris garanteixen que cap obra es publiqui incompleta; els opcionals permeten graduar la profunditat segons la rellevància de cada peça. Tots els textos es redacten en català seguint els principis del capítol 2.3, i el camp d'ubicació actual és insubstituïble: és exactament la informació de consulta que l'usuari demana («on puc veure-la?»)." },
  { table: {
    caption: "Taula 4. Camps de la fitxa d'obra",
    headers: ["Camp", "Tipus", "Contingut i regla de redacció"],
    widths: [26, 14, 60],
    rows: [
      ["identificador (slug)", "Obligatori", "Nom normalitzat sense accents ni espais; clau estable per a enllaços i dades."],
      ["títol", "Obligatori", "Denominació catalana consolidada; si el títol original italià és el d'ús general, aquest mateix en cursiva."],
      ["autor", "Obligatori", "Enllaç a la fitxa d'artista; «Anònim (escola de...)» si cal."],
      ["data", "Obligatori", "Any o interval, amb la datació més acceptada; si es discuteix, «aprox.»."],
      ["tècnica i suport", "Obligatori", "P. ex. «tempera sobre taula», «oli sobre llenç», «fresc», «marbre»."],
      ["dimensions", "Opcional", "Alçada × amplada en cm quan sigui significativa (obres monumentals, retaules)."],
      ["ubicació actual", "Obligatori", "Institució, ciutat i país (p. ex. «Galeria dels Uffizi, Florència, Itàlia»). Per a arquitectura: el lloc mateix."],
      ["imatge alta resolució", "Obligatori", "Fitxer d'origen (Wikimedia Commons o museu), crèdit i llicència; per al visor, piràmide de tessel·les (cap. 9.3)."],
      ["període, àmbit, concepts", "Obligatori", "Etiquetes del vocabulari controlat (Taula 3); màxim 3 conceptes."],
      ["per què és rellevant", "Obligatori", "1-2 frases que resumeixen la idea a recordar. És el destacat principal i mai no es retalla."],
      ["context històric", "Obligatori", "3-5 frases: qui ho va manar, on i per què, per a què servia, què suposava en el seu temps."],
      ["anàlisi formal", "Obligatori", "4-6 frases: composició, espai i perspectiva, llum i color, figures i gest, tècnica. Concreta, sense adjectivació buida."],
      ["mira-hi de prop", "Opcional", "1-3 detalls dignes de zoom, amb indicació de la zona (p. ex. «els sabatots de l'esquerra»). Referència per al visor."],
      ["curiositats", "Opcional", "Fets verificables que enganxen: històries de l'obra, robatoris, restauracions, llegenda."],
      ["obres relacionades", "Opcional", "2-4 enllaços interns (mateix autor, mateix concepte, contrast de període)."],
      ["crèdits", "Obligatori", "Font de la imatge i llicència; font de la informació quan no sigui d'elaboració pròpia."],
    ],
  } },
  { callout: { label: "EXEMPLE REDACTAT — APARTAT «PER QUÈ ÉS RELLEVANT»", text: "El naixement de Venus (Botticelli, aprox. 1485, Galeria dels Uffizi): «És la primera gran Venus monumental del Renaixement pintada per a un col·leccionista privat i no per a una església: la bellesa pagana recuperada es converteix aquí en tema digne per si mateixa. A més, resumeix el llenguatge de línia de Botticelli, l'últim gran mestre del Quattrocento florentí abans de l'auge del classicisme.»" } },

  { h2: "4.2 Fitxa d'artista" },
  { p: "La fitxa d'artista ha de permetre llegir «l'autor» sense sortir de la web i, alhora, funcionar com a centre de gravetat de les seves obres. La mini-biografia no és una cronologia exhaustiva: explica qui és, què aporta i per què el recordem, en una extensió controlada. Els trets d'estil fan de filtre mental: l'alumne ha de ser capaç, després de llegir la fitxa, de reconèixer una obra d'aquest autor pel que hi veu." },
  { bullets: [
    "**Camps d'identitat:** nom complet en català i denominació original, dates i llocs de naixement i mort, àmbits (pintor, escultor, arquitecte, teòric), mestres i influències rebudes i exercides.",
    "**Mini-biografia (120-180 paraules):** formació, mecenes principals, obra fites i llegenda postuma. Tres a cinc paràgrafs curts com a màxim.",
    "**Trets d'estil (3-5):** afirmacions concretes i reconeixibles visualment (p. ex. «dibuix de línia nítida i contorns exactes», «figures de volum escultòric», «color de Venècia sobre dibuix florentí»).",
    "**Innovacions:** què va fer per primera vegada o millor que ningú, en una o dues frases per punt.",
    "**Obres a la web:** graella enllaçada, ordenada cronològicament.",
    "**Cita curta (opcional):** una frase documentada de l'autor o sobre l'autor, amb font.",
  ] },

  { h2: "4.3 Fitxa de concepte" },
  { p: "Els conceptes (Quattrocento, perspectiva lineal, sfumato...) són la via didàctica més potent de la web: connecten obres molt diferents amb una idea comuna. Cada fitxa de concepte segueix un esquema fix pensat per a l'aula: definició primer, explicació després, exemplars visuals immediats i una nota de confusions freqüents, que és on l'aprenentatge real es consolida." },
  { bullets: [
    "**Definició (1-2 frases):** precisa i memorable, apta per a citar en un examen.",
    "**Explicació didàctica (150-250 paraules):** com funciona el concepte, en quin context va sorgir i amb quin vocabulari es descriu (punt de fuga, línia d'horitzó, gradació tonal...).",
    "**Exemplar principal i secundaris:** 1 obra que ho il·lustra perfectament (oberta al visor amb la zona rellevant indicada) i 2-4 de contrast.",
    "**Confusions freqüents:** p. ex. perspectiva lineal vs. perspectiva aèria; sfumato vs. clarobscur; Quattrocento vs. Cinquecento en gust i manera.",
    "**Termes relacionats:** enllaços al glossari i a altres fitxes de concepte.",
  ] },

  { h2: "4.4 Fitxa d'escola o estil arquitectònic" },
  { p: "Les escoles arquitectòniques (Plateresca, Classicista, Herreriana) reben una plantilla pròpia perquè el seu objecte no és una obra sinó una manera de construir compartida. La fitxa ha de permetre **identificar** l'escola davant una façana o un pati: per això els trets formals es descriuen sempre sobre elements observables —plantes, ordres, ritme de finestres, decoració— i no sobre fórmules abstractes. La comparació final amb les escoles veïnes és l'apartat que més serveix a l'aula." },
  { bullets: [
    "**Definició i cronologia:** quan i on es dona, amb dates de començament i extinció de l'estil.",
    "**Trets formals (4-6):** elements recognoscibles amb exemple visual de cadascun (p. ex. «decoració minuciosa a manera d'obra de plata: motius heràldics, candelers, escates»).",
    "**Obres representatives:** enllaçades al catàleg, amb ubicació actual.",
    "**Autors clau:** fitxes d'artista enllaçades.",
    "**Com distingir-la:** contraposició explícita amb les escoles veïnes en el temps (Plateresca vs. Classicista vs. Herreriana; italianisme vs. tradició local a França).",
  ] },

  { h2: "4.5 Regles transversals de redacció" },
  { p: "Totes les fitxes comparteixen unes normes de tall: el destacat de rellevància va **sempre** al capdavant i és independent de la resta; el context i l'anàlisi es redacten amb frases completes de 3-5 elements, sense punts de vista en cadena ni adjectivació buida («impressionant», «magnífic» estan vetats: s'ha d'explicar per què); cada afirmació estilística s'ha de poder comprovar mirant l'obra, i quan el visor hi ajudi, la fitxa indicarà on mirar. Finalment, l'extensió és un límit dur, no una aspiració: si un apartat creix, es divideix en paràgrafs curts en comptes d'allargar-se indefinidament." },
];
