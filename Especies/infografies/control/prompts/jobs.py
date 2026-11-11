# Genera jobs.json amb els encàrrecs per a ChatGPT (una peça per capítol).
import json, os

S = ("Crea UNA ÚNICA infografia horitzontal 16:9 (1920x1080), una sola diapositiva completa per projectar a classe de 2n-3r d'ESO. "
     "No facis un mosaic, una graella de diapositives, una làmina de miniatures ni diverses pàgines dins la imatge. "
     "ESTIL: el mateix de les imatges de referència adjuntes al començament d'aquesta conversa (només l'estil, no el contingut): "
     "il·lustració d'aquarel·la i tinta molt acolorida, colors vius i càlids (groc safrà, ocre de canyella, vermell, terracota, verd tropical, blau oceà, tocs daurats), "
     "molts detalls, personatges expressius, llum càlida, fons de pergamí. Títol en serif blau marí sobre pergamí, de mida moderada; "
     "rètols sobre franges de pinzell de colors (verd, blau, terracota, ocre, porpra) i cartel·les de pergamí. "
     "PROHIBIT: estil 3D, plastilina, fang, clay, vinil, icones planes, dibuix infantil, contorns negres gruixuts, fons blanc buit. "
     "SENSE PARÀGRAFS: només rètols curts i frases molt breus, però cada bloc ha d'explicar alguna cosa amb una dada (no només una paraula). "
     "Ambientació dels segles XIII-XVI, sense anacronismes ni objectes moderns (excepte on s'indica explícitament «avui»). "
     "No dibuixis mapes ni contorns de continents si no s'indica. "
     "Escriu tots els textos exactament com s'indiquen, en català i amb els accents correctes; no afegeixis cap altre text, ni signatures ni números de pàgina. "
     "A baix a l'esquerra, en lletra petita però llegible, escriu exactament: «Infografia creada per Felip Sarroca · CC BY-NC-SA 4.0». ")

MAG = ("un marc daurat l'interior del qual és un rectangle MAGENTA PUR (#FF00FF) totalment pla i buit, sense cap dibuix, textura ni text a dins")

C = {}

C[1] = """DIAPOSITIVA: La paradoxa del pebre.
Títol: «La paradoxa del pebre». Franja-subtítol blava: «Per què una cosa tan barata avui valia tant?»
COMPOSICIÓ: al centre, una gran balança antiga de llautó amb dos plats.
- Plat esquerre, ambientat a Londres l'any 1438: un fuster medieval amb davantal i eines, al costat d'un petit sac obert de grans de pebre negre (grans rodons, negres i arrugats). Cartel·la: «Londres, 1438» i a sota «1 lliura de pebre (450 g) = 2 dies i quart de sou d'un fuster».
- Plat dret, ambientat avui: un pot petit de pebre negre de supermercat i una persona actual amb roba de feina. Cartel·la: «Avui» i a sota «450 g de pebre = menys d'1 hora de feina».
- La balança s'inclina clarament cap al plat de 1438 (pesa més).
A sota, dues targetes de pergamí amb dibuix:
- Botons de clau d'espècia (petits capolls florals secs, marrons, en forma de clau amb una boleta al cap; NO claus de ferro): «Clau: 4 dies i mig de sou per lliura».
- Estigmes vermells de safrà al costat d'una flor de safrà lila: «Safrà: 23 dies de sou per lliura».
A la dreta de baix, franja de pinzell terracota amb la pregunta: «Com es feia ric qui portava pebre a Europa?»
Peu petit a baix a la dreta: «Dades: J. Munro, Universitat de Toronto».
"""

C[2] = """DIAPOSITIVA: Què són les espècies i on creixen.
Títol: «Què són les espècies i on creixen». Franja-subtítol verda: «Parts de plantes tropicals, assecades per conservar-les i transportar-les».
COMPOSICIÓ: al centre, una parada d'un mercat oriental amb cistells i sacs plens d'espècies de colors. Al voltant, set targetes de pergamí connectades amb cintes a la parada. Cada targeta té un dibuix detallat de la planta viva i, al costat, el producte sec, i tres línies de text:
1. Pebre negre (liana enfilada a un arbre, amb raïms de baies verdes i vermelles; grans negres arrugats): «Pebre negre» / «Fruit sec d'una liana» / «Costa de Malabar (Índia)».
2. Clau (arbre amb capolls florals rosats; botons secs marrons en forma de clau): «Clau» / «Botó de flor assecat» / «Illes Moluques».
3. Nou moscada i macís (fruit groc obert amb la llavor marró embolicada per una xarxa vermella): «Nou moscada i macís» / «Llavor i la seva coberta vermella» / «Illes Banda».
4. Canyella (arbre i rotlles d'escorça): «Canyella» / «Escorça interior enrotllada» / «Sri Lanka (Ceilan)».
5. Gingebre (planta i rizoma nuós): «Gingebre» / «Tija subterrània (rizoma)» / «Sud d'Àsia».
6. Cardamom (planta i càpsules verdes): «Cardamom» / «Càpsules amb llavors» / «Sud de l'Índia».
7. Safrà (flor lila de safranera amb estigmes vermells): «Safrà» / «Estigmes de la flor» / «També a la Mediterrània».
A baix, franja de pinzell ocre: «Per a què serveixen? Cuina · medicina · perfums · mostrar riquesa».
"""

C[3] = """DIAPOSITIVA: Marco Polo i el que Europa sabia.
Títol: «Marco Polo i el que Europa sabia». Franja-subtítol blava: «Un mercader venecià explica a Europa d'on venen les espècies».
COMPOSICIÓ: a l'esquerra, escena gran: una cel·la de presó medieval de Gènova il·luminada per una finestra; Marco Polo, home adult amb barba i roba de mercader venecià, dicta el seu viatge a un escrivent (Rustichello de Pisa) que escriu en un pergamí. Cartel·la: «1298: dicta el seu llibre a la presó de Gènova».
A la dreta, un camí sinuós de pergamí (no un mapa) amb quatre parades il·lustrades i numerades, connectades amb fletxes:
1. Port amb vaixells àrabs i sacs: «Ormuz: mercat on arriben espècies de l'Índia».
2. Pagesos que reguen lianes de pebre: «Coilum (Malabar): el pebre es conrea i es cull al maig, juny i juliol».
3. Illa tropical exuberant: «Java: illa riquíssima en pebre, nou moscada i clau».
4. Illa amb muntanya i pedres precioses: «Ceilan: canyella i pedres precioses».
A sota de l'escena, dues targetes:
- Targeta amb un medalló romà i grans de pebre: «No les va descobrir: Roma ja comprava pebre a l'Índia».
- Targeta amb un llibre obert ple de notes al marge: «Viatge: 1271-1295 · Colom en tenia un exemplar anotat».
Al peu, franja terracota: «Europa vol arribar directament a l'Índia».
"""

C[4] = f"""DIAPOSITIVA: La xarxa de l'Índic i els monsons.
Títol: «La xarxa de l'Índic i els monsons». Franja-subtítol verda: «Les espècies passaven de mà en mà, de port en port».
COMPOSICIÓ: a l'esquerra, ocupant aproximadament el 58% de l'amplada i el 72% de l'alçada, {MAG}; proporció de l'interior: 16 d'ample per 10 d'alt. Sota el marc, una cinta de pergamí amb el text «Ruta principal de les espècies».
A la dreta, de dalt a baix:
- Una roda de vents il·lustrada amb dues meitats, amb un dhow àrab (vaixell de vela triangular) a cada una: meitat blava «Hivern: el monsó bufa de l'Índia cap a Aràbia i Àfrica»; meitat taronja «Estiu: el monsó bufa d'Aràbia cap a l'Índia». Rètol a sota: «Calia esperar mesos el vent bo».
- Una cadena de quatre mercaders de diferents orígens (malai, gujarati de l'Índia, àrab, venecià) que es passen un sac d'una mà a l'altra: «Cap mercader feia tot el camí: relleus de port en port».
- Una targeta de perills amb una tempesta i un vaixell escorat: «Riscos: tempestes, naufragis, pirates i malalties».
"""

C[5] = """DIAPOSITIVA: Ports, intermediaris i preus.
Títol: «Ports, intermediaris i preus». Franja-subtítol terracota: «Cada pas del camí encaria les espècies».
COMPOSICIÓ: una gran escala de pedra de quatre graons que puja d'esquerra a dreta. Un sac de pebre puja graó a graó. A cada graó, una escena i dues línies de text; a sobre de cada graó, una pila de monedes de plata que creix:
1. Graó baix, pagès d'una plantació de pebre a l'Índia: «On es produeix» / «1 kg de pebre: 1-2 g de plata».
2. Port d'Alexandria amb un funcionari del sultà mameluc que cobra impostos i caravanes de camells: «Alexandria» / «10-14 g de plata».
3. Galeres i mercaders de Venècia en un moll: «Venècia» / «14-18 g de plata».
4. Graó alt, botiga d'un especier europeu amb un client ric: «Botigues d'Europa» / «20-30 g de plata».
A sota de l'escala, una fila de petites vinyetes amb el rètol «Qui en cobrava una part?»: «transportistes», «ports i duanes», «el sultà mameluc», «mercaders venecians», «botiguers».
Cartel·la a la dreta: «El preu es multiplicava més de 10 vegades, però el benefici es repartia entre molts».
Peu petit: «Valors orientatius (M. N. Pearson)».
"""

C[6] = """DIAPOSITIVA: Qui comprava les espècies a Europa.
Títol: «Qui comprava les espècies a Europa». Franja-subtítol porpra: «Un luxe per als rics i un signe de prestigi».
COMPOSICIÓ: al centre, un gran banquet en un palau medieval amb nobles ben vestits i plats decorats; un criat porta una salsera. Al voltant, cinc blocs connectats:
- Cuina de luxe (cuiner remenant una salsa daurada): «Cuina: salses i dolços per als més rics».
- Apotecari medieval amb pots i balança: «Medicina: els metges les receptaven».
- Flascons de perfum i encenser d'església: «Perfums i cerimònies religioses».
- Escriptori amb un llibre de comptes: «València, 1368: una lliura de gingebre costava 12 sous».
- Port de Barcelona medieval amb naus catalanes (coques) i drassanes, mercaders carregant fardells: «Barcelona: rival de Venècia i Gènova (1330-1430)» i a sota «Portava draps, corall i safrà a Alexandria; tornava amb pebre, gingebre, canyella i clau».
A baix a la dreta, segell vermell de «FALS» sobre un tros de carn: «Mite: no servien per tapar la carn podrida».
"""

C[7] = f"""DIAPOSITIVA: Colom i Vasco da Gama.
Títol: «Colom i Vasco da Gama». Franja-subtítol blava: «Dues rutes per arribar a les espècies sense intermediaris».
COMPOSICIÓ: al centre-esquerra, ocupant aproximadament el 55% de l'amplada i el 68% de l'alçada, {MAG}; proporció de l'interior: 16 d'ample per 11 d'alt.
A la dreta, dues columnes de targetes il·lustrades, amb una caravel·la amb creu de l'Orde de Crist a la vela per a Portugal i una nau castellana per a Castella:
Columna «Portugal: cap a l'est»:
- «1488: Bartolomeu Dias passa el cap de Bona Esperança».
- «1498: Vasco da Gama arriba a Calicut, a l'Índia».
- «Èxit: torna carregat de pebre i canyella».
Columna «Castella: cap a l'oest»:
- Mapamundi antic de pergamí amb un globus: «Colom creu el món més petit del que és».
- «1492: vol arribar a Cipango i troba Amèrica».
- Planta d'ají amb fruits vermells allargats (pebrot): «L'ají "val més que pebre": era el pebrot americà».
Al peu, franja ocre: «Objectiu comú: comprar les espècies directament».
"""

C[8] = f"""DIAPOSITIVA: Magalhães, Elcano i el tractat de Saragossa.
Títol: «Magalhães, Elcano i el tractat de Saragossa». Franja-subtítol verda: «La primera volta al món buscava el clau de les Moluques».
COMPOSICIÓ: a la part superior central, ocupant aproximadament el 62% de l'amplada i el 45% de l'alçada, {MAG}; proporció de l'interior: 2 d'ample per 1 d'alt.
A la part inferior, d'esquerra a dreta, quatre blocs il·lustrats:
1. Cinc naus sortint del port i, al costat, una sola nau tornant: «1519: surten 5 naus i uns 240 homes» / «1522: torna la Victoria amb 18».
2. Mercat de Tidore: un mariner europeu dona destrals, teles vermelles i miralls a un mercader de les Moluques que li dona sacs de clau: «A Tidore: 15 destrals = uns 185 kg de clau».
3. Una balança: a un plat la bossa del cost de l'expedició, a l'altre els sacs de clau de la Victoria, que pesen una mica més: «Venda del clau: 8.750.000 maravedisos» / «Cost de tota l'expedició: 8.334.335» / «Una nau va pagar tota la flota».
4. Dues corones (Castella i Portugal) i un document segellat amb monedes d'or: «1529, tractat de Saragossa: Portugal paga 350.000 ducats per les Moluques».
A un costat del marc, petita cartel·la fosca amb una creu i un mariner malalt: «Cost humà: fam, escorbut i la mort de Magalhães (1521)».
"""

C[9] = """DIAPOSITIVA: Per què avui les espècies són barates.
Títol: «Per què avui les espècies són barates». Franja-subtítol terracota: «De pocs illots a plantacions de tot el món».
COMPOSICIÓ: al centre, un arbre de clau en un test que es reprodueix en esqueixos que viatgen en vaixells cap a diferents illes tropicals. Al voltant, quatre causes en franges de pinzell amb vinyeta:
1. Botànic del segle XVIII amb esqueixos amagats en una caixa: «1770: Pierre Poivre treu d'amagat plantes de clau i nou moscada».
2. Plantacions en diversos països tropicals: «Avui es cultiven a molts països: el Vietnam és el primer productor de pebre».
3. Vaixell portacontenidors modern (avui): «Avui: transport ràpid i barat, sense peatges ni intermediaris».
4. Grans sacs en un magatzem modern: «Producció massiva: molta oferta, preu baix».
A la dreta, un requadre «I a Catalunya, es poden plantar?» amb dues meitats:
- Liana de pebre en una selva humida amb una creu vermella: «Pebre, clau, nou moscada: NO. Necessiten clima tropical i molta pluja».
- Camp de flors liles de safrà amb pagesos collint a mà, amb un senyal verd: «Safrà: SÍ (Conca de Barberà)» / «Però és car: 200.000 flors per fer 1 kg, collides a mà».
Al peu, franja blava: «El preu depèn de la feina i de qui controla l'oferta, no només de la distància».
"""

NAMES = {1: "1-paradoxa", 2: "2-especies", 3: "3-marco-polo", 4: "4-index-monsons", 5: "5-preus",
         6: "6-compradors", 7: "7-colom-gama", 8: "8-volta-mon", 9: "9-avui"}
jobs = [{"name": NAMES[k] + ".png", "prompt": S + C[k]} for k in sorted(C)]
d = os.path.dirname(os.path.abspath(__file__))
json.dump(jobs, open(os.path.join(d, "jobs.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for j in jobs:
    open(os.path.join(d, j["name"].replace(".png", ".txt")), "w", encoding="utf-8").write(j["prompt"])
print(len(jobs), "encàrrecs")
