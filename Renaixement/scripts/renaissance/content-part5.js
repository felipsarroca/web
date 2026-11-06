// content-part5.js — Capítols 9-11: Arquitectura tècnica · Prompts · Full de ruta
"use strict";

module.exports = [

  // ══════════════ 9. TÈCNICA ══════════════
  { h1: "9. Arquitectura tècnica i fonts d'imatges" },

  { h2: "9.1 Pila tecnològica recomanada" },
  { p: "La web és, per naturalesa, un **catàleg de consulta de contingut majoritàriament estàtic** amb funcionalitats de filtratge i visor, sense transaccions ni comptes d'usuari. La pila recomanada ho reflecteix: un marc de generació de llocs estàtics (Next.js amb exportació estàtica, o equivalent), on el contingut viu en **fitxers de dades estructurats (JSON)** versionats en un repositori Git, i les pàgines es generen a partir de les plantilles del capítol 7. Aquesta elecció converteix el model de creixement en una operació trivial: **afegir una obra = afegir un JSON + una imatge + un commit**, sense desplegar res nou ni tocar cap component." },
  { p: "Els components interactius (visor de zoom, eix cronològic, filtres) s'implementen amb llibreries estàndard provades: OpenSeadragon per al deep zoom, una llibreria lleugera de cerca client (per exemple Fuse.js) quan calgui, i el mínim JavaScript possible a la resta de pàgines. La cerca, els filtres i el glossari viu funcionen sobre l'índex de les dades, generat en temps de construcció. Sense bases de dades ni serveis de tercers per al contingut: el repositori és la font de veritat, cosa que garanteix durabilitat, còpies de seguretat implícites i historial de canvis de cada fitxa —requisit coherent amb una web de referència que vol créixer durant anys." },

  { h2: "9.2 Fonts legals d'imatges d'alta resolució" },
  { p: "Tot el corpus del Renaixement és de **domini públic** (els autors morien fa més de quatre segles), i per això hi ha fonts d'imatge d'excel·lència amb llicències obertes. La font de referència és **Wikimedia Commons**, que custodia les digitalitzacions originals d'alta resolució de moltes de les obres del corpus i ofereix la seva API per descarregar-les a mida; com a fonts complementàries, els museus amb programes d'imatge oberta (entre d'altres, el Rijksmuseum, el Metropolitan Museum o la National Gallery de Londres) publiquen arxius de molt alta qualitat dels seus fons. Cada fitxa documentarà font exacta, autor de la fotografia si escau i llicència al camp de crèdits (model 4.1): és una exigència de transparència i, a la vegada, la protecció legal del projecte." },
  { p: "Cal una nota de prudència professional: algunes institucions reclamen drets sobre les **fotografies noves** de les seves obres. La regla del projecte és usar només imatges amb llicència explícitament oberta (domini públic, CC0, CC BY o CC BY-SA) i reproduir el crèdit exigit per la llicència. Si una obra no disposa d'imatge lliure de qualitat suficient, s'hi manté la fitxa amb una marca d'«imatge pendent» en comptes d'usar una còpia il·legal o de baixa qualitat." },

  { h2: "9.3 Alta resolució: tessel·les i rendiment" },
  { p: "El visor amb deep zoom no carrega mai l'arxiu complet: sobre la imatge original es genera una **piràmide de tessel·les** (terrossos de p.ex. 256 × 256 px a cada nivell de resolució) que el visor demana segons el que es veu i el zoom aplicat. El flux de producció per obra serà: descarregar l'original des de la font lliure → generar la piràmide amb una eina de processament per lots → publicar-la al servei estàtic → apuntar el visor al manifest. Per a la interoperabilitat futura, els manifests seguiran el model conceptual de la **IIIF Image API**, l'estàndard de facto del patrimoni cultural, que deixa la porta oberta a col·laboracions museístiques." },
  { p: "El complement del visor és la disciplina de càrrega de la resta de pàgines: miniatures en tres mides amb srcset, càrrega mandrissa fora de la finestra visible, reserva d'espai per evitar salts, i format modern (WebP/AVIF) amb reversió compatible. L'objectiu de rendiment es fixa: **la capa ràpida de qualsevol fitxa és utilitzable en menys de dos segons en connexió mòbil mitjana**, i el visor mostra el primer nivell de zoom de manera immediata, carregant el detall sota demanda." },

  { h2: "9.4 El model de creixement" },
  { p: "L'escalabilitat exigeix formalitzar el **cicle d'alta de contingut**. Nou contingut entra sempre pel mateix camí: (1) redacció de la fitxa seguint el model del capítol 4 amb la plantilla de prompt del capítol 10; (2) validació amb la checklist del capítol 11.2 (dades, ubicació, imatge legal, etiquetes del vocabulari); (3) inclusió al repositori, que actualitza automàticament catàleg, eixos, filtres i enllaços d'artista. Cap element del sistema depèn de la quantitat d'obres: si demà el corpus duplica, cap pàgina no canvia d'estructura. Els únics documents «vius» fora del repositori són la taxonomia (Taula 3) i la taula de correspondència concepte-exemplar (cap. 6.6), que es revisen quan s'afegeixen conceptes o escoles noves." },
  { callout: { label: "DECISIÓ CLAU D'ARQUITECTURA", text: "El contingut és dades, no codi. Si una fitxa necessita un camp nou (per exemple, «restauracions»), s'afegeix al model, s'omple quan cal i les plantilles el mostren si existeix. Aquesta és la garantia tècnica que la web accepti «més informació allà on calgui» sense refactoritzacions." } },

  // ══════════════ 10. PROMPTS ══════════════
  { h1: "10. Prompts d'ampliació de contingut" },

  { h2: "10.1 Regles d'or abans de cap prompt" },
  { p: "Aquestes plantilles permeten generar fitxes noves (o revisar-ne d'existents) amb una coherència total amb el que ja hi ha. Abans d'executar-ne cap, cal tenir presents cinc regles d'or. **Primera:** l'assistent sempre coneix el context —cal donar-li el model de fitxa del capítol 4 i, si existeixen, exemples de fitxes ja publicades— perquè imiti el to i l'extensió. **Segona:** les dades històriques (dates, ubicacions, atribucions) s'han de **verificar sempre** contra una font fiable abans de publicar; si l'assistent dubta, la fitxa s'envia a revisió manual amb el camp marcat. **Tercera:** les etiquetes només poden prendre valors del vocabulari controlat (Taula 3); un concepte nou exigeix actualitzar primer la taxonomia. **Quarta:** la sortida es demana en el format exacte de fitxa (JSON amb els camps del model 4.1). **Cinquena:** tota fitxa generada passa la checklist del capítol 11.2 abans de publicar-se; el prompt accelera la redacció, no substitueix la validació." },

  { h2: "10.2 Plantilla P1 — Nova fitxa d'obra" },
  { prompt: [
    "Actua com a historiador de l'art especialitzat en el Renaixement i redactor de contingut didàctic en català normatiu.",
    "",
    "CONTEXT: La web «Renaixement» és una web de referència didàctica. Les fitxes segueixen aquest model i estil: [ENGANXAR UNA FITXA D'OBRA PUBLICADA COM A MODEL].",
    "",
    "TASCA: Redacta la fitxa completa de l'obra: [TÍTOL I AUTOR].",
    "",
    "FORMAT DE SORTIDA: JSON amb aquests camps exactes (model 4.1): identificador, titol, autor, data, tecnica, dimensions (si escau), ubicacio_actual (institució, ciutat, país), periode, ambit, concepts (màxim 3 del vocabulari aprovat: [ENGANXAR VOCABULARI]), per_que_es_relevant (1-2 frases), context_historic (3-5 frases), analisi_formal (4-6 frases), mira_hi_de_prop (1-3 detalls), curiositats (0-3), obres_relacionades (2-4 de la web).",
    "",
    "REGLES: Cada paràgraf ha de tenir 3-5 frases completes; proscrits els adjectius buits («impressionant», «magnífic»); tota afirmació estilística s'ha de poder comprovar mirant l'obra; termes tècnics en cursiva amb definició; si no estàs segur d'una data, una atribució o una ubicació, escriu-hi «VERIFICAR:» davant i explica el dubte en una nota final.",
  ] },

  { h2: "10.3 Plantilla P2 — Nova fitxa d'artista" },
  { prompt: [
    "Actua com a historiador de l'art especialitzat en el Renaixement i redactor de contingut didàctic en català normatiu.",
    "",
    "CONTEXT: [ENGANXAR FITXA D'ARTISTA PUBLICADA COM A MODEL + LLISTA D'ARTISTES JA EXISTENTS].",
    "",
    "TASCA: Redacta la fitxa de l'artista [NOM] seguint el model 4.2 de la programació.",
    "",
    "FORMAT: nom_ca, nom_original, dates_i_llocs, ambits (pintor/escultor/arquitecte/teòric), mestres_i_influencies, mini_biografia (120-180 paraules, 2-4 paràgrafs), trets_d_estil (3-5 afirmacions reconeixibles visualment), innovacions (1-2 frases per punt), cita_curta (opcional, documentada).",
    "",
    "REGLES: La biografia explica qui és, què aporta i per què el recordem, no una cronologia exhaustiva; els trets d'estil han de servir per reconèixer una seva obra a primera vista; no inventis dates ni anècdotes: marca «VERIFICAR:» davant de qualsevol dada dubtosa; indica quines obres d'aquest autor caldria incorporar a continuació al corpus (màxim 5, amb justificació d'una línia cadascuna).",
  ] },

  { h2: "10.4 Plantilla P3 — Nova fitxa de concepte" },
  { prompt: [
    "Actua com a professor d'Història de l'Art a Batxillerat i redactor de contingut didàctic en català normatiu.",
    "",
    "CONTEXT: [ENGANXAR FITXA DE CONCEPTE PUBLICADA COM A MODEL + LLISTA DE CONCEPTES I OBRES DEL CORPUS].",
    "",
    "TASCA: Redacta la fitxa del concepte [NOM DEL CONCEPTE] seguint el model 4.3.",
    "",
    "FORMAT: definicio (1-2 frases memorables), explicacio_didactica (150-250 paraules), exemplar_principal (obra del corpus + zona exacta a observar al visor), exemplars_secundaris (2-4 obres del corpus), confusions_freqüents (mínim 2, amb la diferència clara), termes_relacionats.",
    "",
    "REGLES: Usa el vocabulari i els exemples de la web (no inventis obres que no hi són); si al corpus no hi ha exemplar suficient, proposa'n un de nou amb la plantilla P1; l'explicació ha de ser comprensible sense coneixements previs i útil per estudiar (definició citable en examen).",
  ] },

  { h2: "10.5 Plantilla P4 — Revisió de coherència" },
  { prompt: [
    "Actua com a editor cap de la web «Renaixement».",
    "",
    "CONTEXT: [ENGANXAR UN LOT DE 3-5 FITXES NOVES A REVISAR + LA CHECKLIST DE QUALITAT + EL VOCABULARI CONTROLAT].",
    "",
    "TASCA: Revisa les fitxes com si haguessin de publicar-se avui. Comprova: (1) compliment de la checklist; (2) coherència de to, extensió i format entre elles i amb les fitxes publicades [ENGANXAR UNA DE PUBLICADA]; (3) validesa de les etiquetes contra el vocabulari; (4) qualitat dels enllaços interns (tota obra esmentada existeix a la web?); (5) detecció de repeticions o contradiccions entre fitxes.",
    "",
    "SORTIDA: Per cada fitxa, un veredicte (PUBLICABLE / A AJUSTAR / A VERIFICAR), la llista de canvis concrets proposats i, si cal, el text ja corregit. No canvis de contingut històric sense senyalitzar-ho: qualsevol modificació de dades s'ha de marcar amb «VERIFICAR:».",
  ] },

  // ══════════════ 11. FULL DE RUTA ══════════════
  { h1: "11. Full de ruta i control de qualitat" },

  { h2: "11.1 Fases del projecte" },
  { p: "El projecte avança en **tres fases** amb sortides verificables. La Fase 1 construeix la web de referència amb el corpus d'aquest document; la Fase 2 amplia corpus i funcionalitats; la Fase 3 obre la web a l'ús docent intensiu i a la col·laboració. El criteri que separa les fases no és el calendari sinó la **qualitat de sortida**: no es comença la fase següent sense tancar la checklist de l'anterior." },
  { table: {
    caption: "Taula 13. Fases, abast i criteri de sortida",
    headers: ["Fase", "Abast", "Criteri de sortida"],
    widths: [16, 48, 36],
    rows: [
      ["Fase 1 — Nucli", "Web completa amb el corpus d'aquest document: 68 obres, fitxes dels 24 artistes, 12 conceptes, escoles arquitectòniques, eixos cronològics, filtres, visor d'alta resolució, glossari inicial i disseny «museu fosc» responsiu.", "Els tres recorreguts de prova (cap. 8.2) funcionen en mòbil i escriptori; totes les fitxes passen la checklist; les imatges tenen drets documentats."],
      ["Fase 2 — Ampliació", "Corpus fins a ~120 obres; fitxes d'artista per a tots els autors de les obres secundàries; comparador d'obres; mapa de museus; glossari viu complet; cerca de text; primeres vistes temàtiques per unitats didàctiques.", "Cada concepte amb 3+ exemplars; navegació de fitxes sense carrerons sense sortida; rendiment objectiu mantingut amb el corpus duplicat."],
      ["Fase 3 — Comunitat i aula", "Autoavaluació amb banc de preguntes; guies didàctiques per unitat; possible versió castellana o anglesa; flux de proposta de fitxes externes amb revisió editorial.", "Procés de revisió documentat; guia d'ús per a docents publicada; el flux d'alta externa passa per les mateixes plantilles i checklist."],
    ],
  } },

  { h2: "11.2 Checklist de qualitat per fitxa (bloquejant)" },
  { p: "Cap fitxa no es publica sense superar íntegrament aquesta llista, que és la materialització operativa de tots els principis del document. És també la llista que els prompts del capítol 10 demanen comprovar al final." },
  { numbered: { ref: "num-checklist", items: [
    "Tots els camps obligatoris del model complets, sense «per completar» ni text genèric.",
    "Data, tècnica i **ubicació actual verificades** contra font fiable; dubtes d'atribució o de préstec senyalitzats amb el seu avís.",
    "Imatge amb llicència oberta documentada (font, autor de la fotografia si escau, llicència) i qualitat suficient per al visor.",
    "El destacat «Per què és rellevant» és concret, comprès en una lectura i no repeteix el títol.",
    "Context i anàlisi formal en frases completes (3-5 frases per paràgraf), sense adjectivació buida ni repeticions.",
    "Etiquetes (període, àmbit, conceptes, escola) preses només del vocabulari controlat; màxim 3 conceptes.",
    "Enllaços interns comprovats: autor, conceptes i obres relacionades existeixen o estan programats.",
    "Almenys un «mira-hi de prop» en obres pictòriques i escultòriques (si l'obra ho permet).",
    "Cap terme tècnic sense entrada de glossari (existent o creada en el mateix lot).",
    "Ortografia i tipografia catalanes revisades (guillemets «», cursives per als originals italians).",
  ] } },

  { h2: "11.3 Manteniment i viabilitat" },
  { p: "Una web de referència viu pel manteniment. Es fixen quatre tasques periòdiques: **revisió semestral** d'enllaços externs (museus) i de la disponibilitat d'imatges; **actualització d'ubicacions** quan es coneguin préstecs o trasllats (és un fenomen normal dels museus i la fitxa ha de reflectir-ho amb data); **revisió anual del contingut** per corregir errades detectades i incorporar canvis d'atribució o de datació publicats per la recerca; i **còpia de seguretat del repositori** contínua, inherent al model Git. El cost de manteniment és deliberadament baix perquè el sistema s'ha dissenyat per a una vida llarga: dades en fitxers, plantilles estables i cap dependència de serveis que puguin desaparèixer." },
  { p: "Amb aquest document, el projecte té tot el necessari per començar la construcció de la Fase 1: el guió editorial complet, el corpus seleccionat amb les seves ubicacions, el disseny definit, la tecnologia decidida i el mecanisme de creixement garantit. El pas següent és tècnic: muntar l'esquelet de la web amb les plantilles del capítol 7 i les dades dels capítols 5 i 6, i omplir-lo seguint les plantilles i la checklist d'aquest programa." },
];
