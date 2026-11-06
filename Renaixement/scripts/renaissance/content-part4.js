// content-part4.js — Capítols 7-8: Disseny visual i UX · Funcionalitats interactives
"use strict";

module.exports = [

  // ══════════════ 7. DISSENY VISUAL ══════════════
  { h1: "7. Disseny visual i d'experiència d'usuari" },

  { h2: "7.1 El concepte: museu fosc" },
  { p: "El disseny adopta l'estètica de **museu fosc**: fons profunds, gairebé negres, sobre els quals les obres «s'encenen» com en una sala de museu amb il·luminació escenogràfica. Aquesta elecció no és només d'estil: sobre fons fosc, les imatges d'art hi guanyen contrast i profunditat, els colors de les pintures no competeixen amb el voltant i l'usuari entra en un entorn de contemplació, no de lectura de notícies. El risc del fons fosc és la llegibilitat del text; per això la paleta reserva el blanc trencat per als textos principals, defineix grisos foscos que passen el contrast mínim d'accessibilitat per a tots els textos secundaris, i limita el color d'accent a elements funcionals (enllaços, etiquetes, destacats), mai no a grans superfícies." },
  { p: "El model de referència és l'experiència de les grans plataformes de difusió d'art d'alta resolució i les sales digitals dels grans museus: silencioses, amb molt d'espai per a la imatge i cap element competidor. La web ha de semblar **sala d'exposició**, no butlletí." },
  { table: {
    caption: "Taula 11. Paleta de la web (tokens de color)",
    headers: ["Token", "Valor (referència)", "Ús"],
    widths: [26, 24, 50],
    rows: [
      ["fons-principal", "Grafit fosc (#101216)", "Fons general de pàgina; mai no pur negre, per no devorar els nivells foscos de les obres."],
      ["fons-superficie", "Grafit suau (#1A1D24)", "Targetes de fitxa, barres de navegació, panells del visor."],
      ["text-principal", "Ivori càlid (#F2EEE6)", "Textos de lectura; contrast alt garantit sobre els fons foscos."],
      ["text-secundari", "Gris clar (#A8ADB8)", "Peus, dades tècniques, navegació; contrast mínim AA verificat."],
      ["accent-terracota", "Terracota pompeiana (#C96F4A)", "Enllaços actius, etiquetes de concepte, botons d'acció, destacats de rellevància."],
      ["accent-aur", "Or vell (#C9A84C)", "Filets, marques de la cronologia, reconeixements «obra fita»."],
      ["estat-ok / estat-avis", "Verd suau / ambre", "Validacions de fitxa i avisos de préstec o d'atribució dubtosa."],
    ],
    after: "Els hexadecimals són valors de partida; el criteri vinculant és el contrast (mínim WCAG AA 4,5:1 en tot text) i la restricció cromàtica: dos accents màxim per pantalla, sempre amb funció.",
  } },

  { h2: "7.2 Tipografia i tractament del text" },
  { p: "La parella tipogràfica enfronta **encapçalament serif d'ambient històric** (tipus Playfair Display o Fraunces, amb els originals italians en cursiva) i **text i interfície sans-serif neutra i molt llegible en pantalla** (tipus Inter o equivalent de sistema). Aquesta combinació dona identitat renaixentista als títols sense castigar la lectura de fitxes llargues. La mida base és generosa (16 px en mòbil, 17-18 px en escriptori), l'interlineat ample i la línia de text limitada a 65-75 caràcters per no fatigar l'ull." },
  { p: "El tractament del text segueix els principis editorials del capítol 2.3 i en tradueix alguns a estil concret: el destacat «Per què és rellevant» es composa sempre com a bloc distintiu (fons de superfície, filet de terracota a l'esquerra, tipografia una mica major), els termes amb entrada al glossari porten subratllat puntejat amb fitxa emergent, i els títols de secció mai no ocupen una pantalla per si sols: si un encapçalament no acompanya contingut visible, no es publica." },

  { h2: "7.3 Pàgines tipus" },
  { p: "El sistema defineix **sis plantilles de pàgina**, totes construïdes amb els mateixos components bàsics (targeta d'obra, etiqueta de concepte, bloc destacat, barra de filtres). Es descriuen aquí en l'ordre de prioritat de construcció:" },
  { bullets: [
    "**Portada.** Obra destacada a pantalla completa (canviant per setmana), títol del projecte i tres portes clares: Explora per temps (eixos), Per conceptes i Per artistes. Sota, una franja d'«Obra per descobrir» i accés directe al glossari. Cap slider innecessari ni textos de cortesia.",
    "**Fitxa d'obra.** Imatge gran (clicable al visor) amb el marc mínim; a la banda de dades immediates: autor (enllaç), data, tècnica, ubicació actual amb enllaç a la pàgina del museu; seguidament el bloc «Per què és rellevant» i les etiquetes de concepte. Desplegats més avall: context, anàlisi formal, «mira-hi de prop» i obres relacionades en graella.",
    "**Eix cronològic.** Franja temporal 1400-1610 horitzontal (vertical en mòbil) amb tres pistes paral·leles: obres (miniatures clicables), artistes (marcades amb una banda al voltant dels anys d'activitat) i esdeveniments (fites: sac de Roma, concurs del baptisteri...). Els filtres (disciplina, país, període, concepte) redueixen els pins sense recarregar la pàgina.",
    "**Fitxa d'artista.** Obra representativa com a capçalera, dades d'identitat, mini-biografia, trets d'estil com a llista curta i graella cronològica de les seves obres a la web.",
    "**Fitxa de concepte.** Definició destacada, explicació, exemplar principal obert al visor amb la zona rellevant senyalitzada, obres de contrast i bloc de «Confusions freqüents».",
    "**Índex / col·leccions.** Graelles denses de miniatures amb filtres persistents; cada miniatura ja mostra autor, data i ubicació (capa ràpida de la Taula 1).",
  ] },

  { h2: "7.4 Responsivitat, accessibilitat i rendiment" },
  { p: "El disseny és **mobile-first**: la fitxa d'obra en mòbil empila imatge, dades i rellevància en columna única, el visor funciona amb gestos de pinç i el filtre cronològic esdevé lliscant vertical. En tauleta i escriptori apareixen les columnes dobles i la franja horitzontal de temps. Tres exigències transversals condicionen totes les plantilles: **accessibilitat** (contrast AA sobre fons fosc, text alternatiu descriptiu per a cada imatge, navegació completa per teclat, focus visibles i respecte a la preferència de reduir animacions), **rendiment** (càrrega progressiva de miniatures, imatges responsives amb srcset, visor que només descarrega les tessel·les visibles) i **estabilitat visual** (reserva d'espai de les imatges per evitar salts de pàgina durant la càrrega)." },
  { callout: { label: "REGLA D'OR DEL DISSENY", text: "Cada pantalla ha de passar el test dels tres segons: en tres segons, l'usuari ha de saber on és, què mira i què hi ha de destacar. Si un element decoratiu no ajuda a aquestes tres preguntes, s'elimina. Aquesta és la traducció visual de «sense farciment»." } },

  // ══════════════ 8. FUNCIONALITATS ══════════════
  { h1: "8. Funcionalitats interactives prioritzades" },

  { h2: "8.1 Descripció i prioritats" },
  { p: "Les funcionalitats es classifiquen en **P1** (imprescindibles a la Fase 1, defineixen la identitat de la web), **P2** (valors afegits de la Fase 1 si el calendari ho permet, garantits a la Fase 2) i **P3** (ampliacions de la Fase 2-3). Tota funcionalitat ha de servir la funció didàctica: la interactivitat no és un fi en si mateix, sinó el vehicle per mirar millor i entendre més ràpid." },
  { table: {
    caption: "Taula 12. Funcionalitats, prioritat i descripció",
    headers: ["Funcionalitat", "Prioritat", "Descripció i criteri de qualitat"],
    widths: [24, 12, 64],
    rows: [
      ["Visor d'alta resolució", "P1", "Clic a qualsevol obra → visor a pantalla completa amb zoom progressiu i panoràmica (tecnologia de tessel·les, cap. 9.3). Ha de permetre arribar al detall de pinzellada sense trencar-se; inclou una franja superior amb autor, data, ubicació i botó d'informació de drets."],
      ["Eixos cronològics", "P1", "Franja 1400-1610 amb pistes d'obres, artistes i esdeveniments, filtrable per disciplina, país i concepte. Criteri: des de «Quattrocento» s'ha de veure en un segon què passa quan i amb qui."],
      ["Filtres per conceptes", "P1", "Selecció combinable per període, disciplina, àmbit, artista, concepte tècnic i escola arquitectònica, amb comptador de resultats i botó d'esborrar filtres. Criteri: qualsevol combinació respon en menys d'un segon."],
      ["Fitxa amb ubicació actual", "P1", "Museu, ciutat i país sempre visibles a la capa ràpida, amb enllaç a la institució quan existeixi. Criteri: la informació no s'amaga mai darrere d'un clic."],
      ["Glossari viu", "P2", "Els termes del glossari apareixen subratllats als textos; al passar el ratolí (o un toc) es desplega la definició curta amb enllaç a l'entrada completa. Criteri: cap terme tècnic sense explicació a un toc de distància."],
      ["Comparador d'obres", "P2", "Dues obres costat a costat amb zoom sincronitzat, per contrastos programats (perspectiva lineal vs. aèria; David de Donatello vs. David de Miquel Àngel; façana Plateresca vs. Herreriana) i per elecció lliure."],
      ["Mapa de museus", "P2", "Mapa d'Europa amb els museus i llocs del corpus; cada marcador enllaça les obres que conserva. Criteri: és el complement natural del camp «ubicació actual»."],
      ["Autoavaluació", "P3", "Qüestionaris curts generats sobre el corpus: «Saps reconèixer l'autor?», «Quina escola arquitectònica és?», amb correcció immediata i enllaç a la fitxa per repassar. Sense puntuacions globals ni comptes d'usuari."],
      ["Cerca de text", "P3", "Cerca instantània sobre títols, autors, conceptes i ubicacions, amb suggeriments. Redundant amb els filtres a la Fase 1; útil quan el corpus creixi."],
    ],
  } },

  { h2: "8.2 El viatge de l'usuari, comprovat" },
  { p: "Per validar que el conjunt funciona, es defineixen **tres recorreguts de prova** que el prototip de la Fase 1 ha de superar abans de publicar-se. Recorregut d'estudi: des de la portada, entrar a «Conceptes» → perspectiva lineal → obrir la Trinitat de Masaccio al visor → seguir l'enllaç de Masaccio → arribar a la Capella Brancacci. Recorregut de consulta: cercar per filtres «Escultura» + «Quattrocento» → obrir el David de bronze → comprovar ubicació (Bargello) i etiqueta de concepte (contrapposto, nu clàssic). Recorregut de classe: activar el filtre «Miquel Àngel», obrir tres obres al visor i mostrar-les a pantalla completa amb el projector de l'aula. Si aquests tres camins funcionen fluïts a mòbil i a escriptori, la web compleix la seva promesa bàsica." },
];
