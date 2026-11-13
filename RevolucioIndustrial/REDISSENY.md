# Redisseny del web — estat i procediment per continuar

**Iniciat:** 13-11-2026. **Encàrrec de Felip:** el web anterior (un sol HTML amb molt scroll, fosc, amb diagrames de caixes) no li agrada. Vol que l'alumnat **vegi** com funcionen i de què es componen màquines, fàbriques i transports: imatges potents, clares i molt pedagògiques.

Aquest fitxer és la guia per reprendre la feina des de qualsevol ordinador. **Actualitza la taula d'estat cada vegada que acabis una peça.**

## 1. Decisions preses

- **Diverses pàgines, sense scroll a l'ordinador.** `index.html` (portada amb un paisatge clicable) i una pàgina per capítol: `camp.html`, `vapor.html`, `textil.html`, `fabrica.html`, `metalls.html`, `tren.html`, `vaixell.html`, `capital.html`. Cada capítol té pestanyes d'**escenes** i una pestanya final **Repte** (preguntes).
- **Imatges: SVG dibuixat a mà i animat amb JavaScript**, no imatges generades amb IA. Motiu: el mecanisme ha de ser correcte (pistó, bieles, vàlvules), s'ha de poder aturar, etiquetar en català i clicar peça a peça. No cal instal·lar res ni pagar res.
- **Estètica:** atles il·lustrat sobre paper clar, traç de tinta gruixut, colors plans, ombra dura. Tipografies Fraunces (títols) i Figtree (text). Codi de colors: taronja = calor/vapor, blau = aigua/fred, vermell = focus.
- **Cada escena:** pregunta inicial, dibuix gran animat, control de reproducció (play, fase anterior/següent, lliscador per «aturar el temps», velocitat), «Pas a pas», peces clicables amb fitxa, botó «Etiquetes» (amagar-les per autoavaluar-se), «La idea clau» i bloc de Batxillerat (només visible amb el nivell «+ Batxillerat»).
- **Escala:** com `edu-apps/Equacions`: disseny base 1440 × 800 i `zoom` a `<html>` (funció `ajusta()` de `js/nucli.js`). Per sota de 980 px d'amplada passa a disposició mòbil amb scroll vertical.
- Es mantenen: peu corporatiu, llicències (AGPL + CC BY-NC-SA), formulari d'errors, enllaç `ja.cat/revindustrial`.
- **Publicació de seguiment autoritzada per Felip el 13-11-2026.** El redisseny encara requereix revisió visual i de contingut.

## 2. Arquitectura dels fitxers

| Fitxer | Funció |
|---|---|
| `css/estil.css` | Tot l'estil: interfície i classes de dibuix SVG (`.t` traç, `.ferro`, `.coure`, `.fusta`, `.mao`, `.aigua`, `.flux`...). |
| `js/nucli.js` | Motor comú: llista de capítols (`RI.CAPITOLS`), capçalera, pestanyes, bucle d'animació, etiquetes, peces, repte, escala. També peces de dibuix: `RI.roda`, `RI.engranatge`, `RI.foc`, `RI.focs`, `RI.persona`, `RI.nuvol`, `RI.retol`, `RI.fletxa`, `RI.tram`, `RI.color`. |
| `js/<capitol>.js` | Un per capítol. Crida `RI.capitol({id, titol, escenes:[...], repte:[...]})`. |
| `js/portada.js` | Defineix `RI.portada()` (portada). |
| `<capitol>.html`, `index.html` | Carcasses idèntiques (només canvien `data-capitol`, el títol i el script). |
| `app.js`, `styles.css` | **Web antic. S'han d'esborrar** quan el nou estigui complet (`git rm app.js styles.css`). |

### Com es defineix una escena

```js
{ id:'newcomen', nom:'Newcomen', any:'1712', qui:'...', durada:11,   // segons per cicle
  model:'text petit sota el dibuix', pregunta:'...', intro:'html',
  svg: () => RI.svg(`...`),            // dibuix; zona útil 0–1200 × 0–720, fons de −60 a 1260
  anima: ({p,t,k,el}) => {...},        // p = moment del cicle (0–1), t = segons, k = fase, el('id')
  fases:[{fins:0.34, nom:'...', text:'html', focus:['caldera']}],   // «fins» = final de la fase
  parts:{caldera:{nom:'Caldera', text:'...'}},        // lligades a <g data-part="caldera">
  etiquetes:[['caldera', x, y, ancoraX, ancoraY, 'text opcional']],
  capes:[{id:'forca', nom:'Segueix la força', on:false}],  // posa la classe capa-forca a l'SVG
  clau:'...', batx:{titol, text, font, fontNom} }
```

Atributs automàtics dins l'SVG: `data-flux="v"` (guions que corren), `data-fase="0.2-0.5"` (visible només en aquell tram del cicle), `data-en="0,2"` (visible en aquelles fases), `data-gira="cx cy voltes"`, `data-girat="cx cy graus/s"`, `data-puf="x y dx dy n r període"` (bafarades de vapor o fum; classes `vap`, `fum`, `calor`).

## 3. Com provar-ho

1. Obre un terminal a la carpeta del projecte i executa `python -m http.server 4173`.
2. Visita `http://localhost:4173/` (si no veus els canvis, força la recàrrega amb Ctrl+F5).
3. Per saltar a una escena i un moment concrets, a la consola del navegador: `RI.ves(1, 0.2)` (escena 2, 20 % del cicle).
4. Comprova sempre a 1920 × 1080, 1366 × 768 i mòbil (390 × 844), i que la consola no mostri errors.

## 4. Estat de la feina

| Peça | Estat | Notes |
|---|---|---|
| `css/estil.css`, `js/nucli.js` | Fet i revisat visualment | Gradients metàl·lics/fusta/mar, ajudes realistes (`arbre`, `cavall`, `ovella`, `vaca`), focus legible i etiquetes que segueixen punts rotats (`id@lx,ly`). |
| Carcasses HTML (9) | Fet | |
| `js/vapor.js` | Fet i revisat visualment | Newcomen, condensador de Watt, màquina rotativa (sol i planeta amb etiqueta dinàmica) + repte. |
| `js/tren.js` | Fet i revisat visualment | Rocket en tall + cursa Liverpool–Manchester (cavalls amb arnés) + repte. |
| `js/fabrica.js` | Fet i revisat visualment | Filatura hidràulica i de vapor, capes «força» i «cotó», etiquetes ajustades + repte. |
| `js/textil.js` | Fet i revisat visualment | Balança, llançadora volant, Jenny, Water Frame (bastidor eixamplat i canal continu), mula + repte. |
| `js/metalls.js` | Fet i revisat visualment | Carbonera/forn de coc, alt forn amb bufadora i escòria, pudelador i convertidor Bessemer basculant + repte. |
| `js/vaixell.js` | Fet i revisat visualment | Tall net del *Great Western* amb eixàrcia i folre de coure, *Rattler*–*Alecto*, mapa Atlàntic real + repte. |
| `js/camp.js` | Fet i revisat visualment | Rotació Norfolk detallada, sembradora de Tull amb transmissió i ocells, arada de Rotherham amb gleves i tàndem + repte. |
| `js/capital.js` | Fet i revisat visualment | Societat anònima amb viaducte i estació, banc/borsa i cotització annotada, càrtel/trust/holding + repte. |
| `js/portada.js` + estil | Fet i revisat visualment | Paisatge complet amb 8 fites històriques detallades i tots els pins visibles a escriptori i mòbil. |
| `js/reals.js` | Fet i revisat visualment | 13 làmines tècniques vectorials d’estudi (`RI.REALS`) d’alta resolució per a «Màquina real» amb escala humana i zoom interactiu. |
| Esborrar `app.js` i `styles.css` | Pendent | |
| Verificació a 3 mides | Fet | Comprovat sense errors de consola ni desbordaments a 1440×900, 1366×768 i 390×844 (panell dret sense scroll a escriptori). |
| `README.md`, captures noves, `VISIO-I-GUIO.md` | Pendent | |
| Commit, push i comprovació del web publicat | Fet / actualitzat | Pujat a `main` amb totes les làmines vectorials, mode pas a pas i autoauditoria visual. |

## 5. Guió de les escenes que falten

- **Tren (`tren.js`)** — 1) *Rocket* de Stephenson (1829) en tall: fogar, caldera multitubular, cilindre inclinat, biela, roda motriu, escapament a la xemeneia, tènder; rodes i biela amb cinemàtica real i via que corre. 2) Cursa Liverpool–Manchester (~50 km, cap al 1830): barcassa de canal (~12 h), diligència (~4 h), tren (menys de 2 h); xifres aproximades, dir-ho.
- **Fàbrica (`fabrica.js`)** — tall d'una filatura de diversos pisos: 1) hidràulica (roda → eix vertical → eixos de cada pis → corretges → màquines; el cotó puja de planta en planta); 2) de vapor (mateix edifici amb sala de màquines, caldera i xemeneia). Capes «Segueix la força» i «Segueix el cotó».
- **Cotó (`textil.js`)** — 1) la cursa entre filar i teixir (balança que es decanta: 1733 Kay, 1764 Jenny, 1769 Water Frame, 1779 mula, 1785 teler mecànic); 2) teler i llançadora volant; 3) Spinning Jenny; 4) Water Frame (corrons que giren cada cop més de pressa); 5) mula de Crompton.
- **Ferro i acer (`metalls.js`)** — 1) del carbó al coc (Darby, 1709); 2) alt forn en tall (càrrega per dalt, aire calent, ferro colat i escòria); 3) pudelació i laminatge (Cort, 1784); 4) convertidor Bessemer (1856) que bascula. Explicar ferro colat / ferro forjat / acer.
- **Vaixell (`vaixell.js`)** — 1) *Great Western* (1838) en tall: calderes, màquina de palanques laterals, roda de pales, carboneres, veles auxiliars; 2) pales contra hèlix (prova *Rattler*–*Alecto*, 1845); 3) travessar l'Atlàntic: veler (5–6 setmanes) contra vapor (unes 2 setmanes el 1838).
- **Camp (`camp.js`)** — 1) guaret contra rotació Norfolk (quatre parcel·les que giren + cicle farratge → bestiar → fems); 2) sembradora de Jethro Tull (c. 1701) en tall contra sembra a eixam; 3) arada de Rotherham (1730) amb les peces.
- **Capital (`capital.js`)** — 1) societat anònima (inversors → accions → empresa → dividends; responsabilitat limitada); 2) banc i borsa; 3) càrtel, trust i holding (finals del XIX).
- **Portada (`portada.js`)** — un sol paisatge SVG animat (camps → mina → fàbrica → alt forn → tren → port → banc) on cada element porta al seu capítol, més les vuit targetes amb la pregunta de cada capítol. Tot en una pantalla.

## 6. Per acabar (quan tot estigui dibuixat)

1. Revisió lingüística de tots els textos i revisió de dates.
2. `git rm app.js styles.css`; refer captures a `captures/`; actualitzar `README.md` i afegir un apartat 12 a `VISIO-I-GUIO.md`.
3. Ensenyar-ho a Felip en local. Amb el seu vistiplau: commit, push a `main`, esperar GitHub Pages i comprovar `https://ja.cat/revindustrial` tal com ho veu l'usuari.
4. **Actualització tèxtils, múltiples punts de vista i vista explotada (13/11/2026)**:
   - Suport natiu a `nucli.js` i `estil.css` per a **vistes explotades** (`[data-exp]`, guies discontínues `[data-guia]` i desplaçament coordinat d'etiquetes `.etq-e`) i **múltiples punts de vista** (`.vistes`, `data-vista`, sincronitzats amb `p`).
   - Nous gradients i textures de roure, ferro fos, llautó i cotó a `RI.DEFS`.
   - Reconstrucció 3D i multi-vista completa de les 4 màquines de `js/textil.js` (`Llançadora volant`, `Spinning Jenny`, `Water Frame`, `La mula`), més vistes explotades a `sembradora`, `arada`, `watt`, `rotativa`, `rocket`, `bessemer` i `western`.
   - Enllaç de `AGPL-3.0-or-later` al peu de pàgina cap a `LICENSE` a GitHub.
5. **Làmines tècniques 3D explotades, comparació amb «Màquina real» i segona passada SVG (13/11/2026)**:
   - 12 làmines tècniques en vista explotada 3D estil enciclopèdic (`img/exp-*.webp`), integrades amb fusió sobre pergamí (`#lamina-exp`), zones interactives (`.exp-zona`) i etiquetes en català que es poden amagar com a autoavaluació.
   - Botó «Màquina real» (`#lamina-real`, `data-capa="_real"`) en 13 escenes clau amb cartela de museu i il·lustració d'alta resolució.
   - Segona passada de realisme metàl·lic i estructural (`RI.roda`, `RI.engranatge`, reblons de caldera, cilindres i palanques en `vapor.js`, `tren.js`, `vaixell.js`, `metalls.js`, `fabrica.js` i `camp.js`), més correcció d'ID duplicat `#capes` a `metalls.js` (`#fcapes`).
6. **Làmines reals vectorials d’estudi, mode «Pas a pas», zoom ×1,8 i auditoria UI (13/11/2026)**:
   - Substitució de les fotografies de baixa resolució per **13 làmines tècniques vectorials d’estudi** (`js/reals.js`, `RI.REALS`) amb il·luminació, materials i escala humana (100 % crisp a qualsevol resolució), carregades als 7 capítols.
   - **Control de reproducció «Pas a pas» / «Continu»** (`#b-pas` a `nucli.js`): per defecte, l’animació s’atura al final de cada pas (`#b-play.espera`) fins que l’alumnat prem `▶` per continuar o activa el mode `Continu`.
   - **Desactivació de la barra de reproducció en làmines estàtiques** (`.comandament.inactiva` quan és activa `Vista explotada`, `Màquina real` o un repte): atura el bucle de reproducció, bloqueja tecles/botons i indica tornar al diagrama per animar.
   - **Zoom ×1,8 interactiu** (`[data-zoom]` + seguiment del ratolí a `.lamina-zoom`) tant a `Vista explotada` com a `Màquina real`, i navegació reactiva per `hashchange`.
   - **Ajust del panell dret sense scroll vertical innecessari** en escriptori (`1440×900` i `1366×768`) i reforços visuals pedagògics a `vapor.js` (fletxes de pressió/buit a Newcomen i força del vapor a Watt) i `metalls.js` (equació d’oxidació `C + O₂ → CO₂ ↑` i reducció del carboni `4 % → 0,5 %` al Bessemer).
7. **Redisseny lleuger i sense scroll del panell dret (13/11/2026)**:
   - Columna `.panell` equilibrada (`clamp(370px, 27.5vw, 410px)`), tipografia més continguda i separacions visuals més clares entre pregunta, fases, peces i idea clau.
   - Fitxa de peça tancable (`.fitxa-tanca`) i bloc `+ Batxillerat` convertit en desplegable flotant (`.batx-wrap` / `.batx-bloc`) perquè totes les escenes i els botons inferiors (`.p-nav`) càpiguen sempre sense scroll vertical a `1440×900` i `1366×768`.
   - Pendent de generar per quota/saldo extern: substitució de `js/reals.js` per 13 il·lustracions realistes en format imatge (`img/real-*.webp`) i refinament d’algunes `img/exp-*.webp` (com `exp-newcomen` i `exp-arada`).
8. **Comprensió interna i focus explícit «on és la innovació» (13/11/2026)**:
   - Nou helper `RI.innova` a `js/nucli.js` (càpsula destacada amb punter i halo opcional sobre el mecanisme innovador).
   - Millores a totes 25 escenes dels 8 capítols (`camp.js`, `vapor.js`, `textil.js`, `fabrica.js`, `metalls.js`, `tren.js`, `vaixell.js`, `capital.js`): càpsules `★ INNOVACIÓ` sense solapaments, enllaços mecànics animats (roda→dosador a la sembradora, flux giratori a l'orelló de Rotherham, columna d'aigua ascendent i tirant+papallona al regulador centrífug de Watt, fletxes de doble efecte, ràtios `×1/×2/×4` als corrons de la Water Frame, contrast de temperatures `~100 °C / ~20 °C` i de càrregues `30 t → centenars de t`).
