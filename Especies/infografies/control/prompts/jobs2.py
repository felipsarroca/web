# Versió 2 (11/11/2026): estil més lleuger, tipus mapa mental / esquema, segons el capítol.
import json, os

S = ("Crea UNA ÚNICA infografia horitzontal 16:9 (1920x1080), una sola diapositiva per projectar a classe d'ESO. "
     "No facis un mosaic ni diverses pàgines dins la imatge. "
     "CANVI D'ESTIL respecte de totes les imatges anteriors d'aquesta conversa: ara ha de ser MOLT MÉS LLEUGERA, ELEGANT I POC CARREGADA, "
     "com un MAPA MENTAL il·lustrat o un esquema net. "
     "ESTIL: aquarel·la lleugera i delicada amb traç fi de tinta sepia, colors càlids però suaus (safrà, canyella, terracota, verd sàlvia, blau oceà), "
     "fons de paper de pergamí molt clar i net, MOLT ESPAI BUIT (com a mínim el 40% del fons sense res). "
     "Poques il·lustracions: un sol dibuix central més gran i petites vinyetes d'aquarel·la (com a objectes aïllats, sense fons d'escena) al costat de cada idea. "
     "Connexions amb branques corbes d'aquarel·la o línies fines de tinta. Text gran, ben llegible i escàs: "
     "cada idea és una paraula clau en negreta més una dada o frase molt curta. "
     "Títol en serif blau marí, elegant, a dalt; sense franges gruixudes ni marcs recarregats; sense escenes plenes de personatges; sense fons decorats a les vores. "
     "PROHIBIT: 3D, plastilina, clay, vinil, icones planes de colors, dibuix infantil, contorns negres gruixuts, textures recarregades, ornaments daurats. "
     "Ambientació dels segles XIII-XVI, sense anacronismes (excepte on s'indica «avui»). No dibuixis mapes si no s'indica. "
     "Escriu els textos exactament com s'indiquen, en català i amb els accents correctes; no afegeixis cap altre text. "
     "A baix a l'esquerra, en lletra petita però llegible, escriu exactament: «Infografia creada per Felip Sarroca · CC BY-NC-SA 4.0». ")

MAG = ("un rectangle MAGENTA PUR (#FF00FF) totalment pla i buit, sense marc decoratiu, sense dibuix, textura ni text a dins")

C = {}

C[1] = """ESTRUCTURA: mapa mental. Títol: «La paradoxa del pebre».
Al centre, un petit cercle d'aquarel·la amb grans de pebre negre (rodons, negres, arrugats) i el text «Per què valia tant?».
Quatre branques corbes cap als costats, cadascuna amb una vinyeta petita:
- Amunt a l'esquerra, vinyeta d'eines de fuster medievals: «Londres, 1438» / «1 lliura de pebre = 2 dies i quart de sou».
- Avall a l'esquerra, vinyeta de botons de clau d'espècia (capolls secs marrons, NO claus de ferro): «Clau» / «4 dies i mig de sou».
- Avall a la dreta, vinyeta d'estigmes vermells de safrà i una flor lila: «Safrà» / «23 dies de sou».
- Amunt a la dreta, vinyeta d'un pot de pebre actual: «Avui» / «menys d'1 hora de feina».
A baix al centre, frase en cursiva terracota: «Com es feia ric qui portava pebre a Europa?»
Peu petit a baix a la dreta: «Dades: J. Munro, Universitat de Toronto».
"""

C[2] = """ESTRUCTURA: mapa mental. Títol: «Què són les espècies i on creixen».
Al centre, un cercle amb un petit cistell d'espècies i el text «Parts de plantes tropicals, assecades».
Set branques corbes al voltant, cadascuna amb una vinyeta petita del producte sec (sense escenes) i dues línies:
- Grans de pebre negre: «Pebre negre» / «fruit · Índia (Malabar)».
- Botons de clau (capolls secs, NO claus de ferro): «Clau» / «botó de flor · Moluques».
- Nou moscada amb el macís vermell: «Nou moscada» / «llavor · illes Banda».
- Rotlles de canyella: «Canyella» / «escorça · Ceilan».
- Rizoma de gingebre: «Gingebre» / «tija subterrània · sud d'Àsia».
- Càpsules verdes de cardamom: «Cardamom» / «càpsules · sud de l'Índia».
- Flor lila amb estigmes vermells: «Safrà» / «estigmes · també a la Mediterrània».
A baix, línia fina: «Per a què? cuina · medicina · perfums · prestigi».
"""

C[3] = """ESTRUCTURA: esquema en flux, d'esquerra a dreta. Títol: «Marco Polo i el que Europa sabia».
A l'esquerra, un retrat petit d'aquarel·la de Marco Polo (mercader venecià amb barba) i un llibre obert: «1298: dicta el seu llibre a la presó de Gènova».
D'aquí surt una línia corba fina de tinta (un camí, no un mapa) amb quatre parades, cadascuna amb una vinyeta petita:
1. Vaixell àrab: «Ormuz» / «mercat d'espècies».
2. Liana de pebre: «Coilum (Malabar)» / «on es cull el pebre».
3. Illa tropical: «Java» / «pebre, nou moscada i clau».
4. Rotlles de canyella: «Ceilan» / «canyella i pedres precioses».
A baix, dues notes curtes en cursiva: «No les va descobrir: Roma ja comprava pebre a l'Índia» i «Colom en tenia un exemplar anotat».
"""

C[4] = f"""ESTRUCTURA: mapa amb dues notes. Títol: «La xarxa de l'Índic i els monsons».
A l'esquerra, ocupant aproximadament el 62% de l'amplada i el 75% de l'alçada, {MAG}.
A la dreta, dues idees separades amb molt d'espai:
- Vinyeta d'un dhow àrab (vela triangular) amb dues fletxes de vent corbes, una blava i una taronja: «Monsons» / «hivern: de l'Índia cap a Aràbia» / «estiu: d'Aràbia cap a l'Índia».
- Vinyeta de dues mans que es passen un sac: «Relleus» / «ningú feia tot el camí: de port en port».
"""

C[5] = """ESTRUCTURA: esquema en flux. Títol: «Ports, intermediaris i preus».
Una línia corba ascendent d'esquerra a dreta amb quatre punts. A cada punt, una vinyeta petita i una pila de monedes de plata que creix:
1. Liana de pebre: «On es cull» / «1-2 g de plata».
2. Camell: «Alexandria» / «10-14 g».
3. Galera veneciana: «Venècia» / «14-18 g».
4. Balança d'especier: «Europa» / «20-30 g».
Rètol sobre la línia: «Preu d'1 kg de pebre».
A baix, frase destacada en terracota: «El preu es multiplicava més de 10 vegades» i a sota, més petit: «Cada intermediari en cobrava una part».
Peu petit: «Valors orientatius (M. N. Pearson)».
"""

C[6] = """ESTRUCTURA: mapa mental. Títol: «Qui comprava les espècies a Europa».
Al centre, un cercle amb una copa i un plat de banquet medieval i el text «Un luxe per als rics».
Quatre branques amb vinyetes petites:
- Cassola amb salsa: «Cuina» / «salses i dolços».
- Morter d'apotecari: «Medicina» / «remeis dels metges».
- Encenser: «Perfums i culte».
- Nau catalana (coca): «Barcelona» / «rival de Venècia (1330-1430)».
Una cinquena nota apartada, amb un segell vermell «FALS»: «Mite: no tapaven la carn podrida».
"""

C[7] = f"""ESTRUCTURA: mapa amb dues columnes. Títol: «Colom i Vasco da Gama».
A l'esquerra, ocupant aproximadament el 58% de l'amplada i el 75% de l'alçada, {MAG}.
A la dreta, dues columnes molt netes:
- Columna amb una caravel·la petita (creu de l'Orde de Crist a la vela): «Portugal: cap a l'est» / «1498: Gama arriba a Calicut» / «torna amb pebre i canyella».
- Columna amb una nau castellana petita: «Castella: cap a l'oest» / «1492: Colom troba Amèrica» / «l'ají era el pebrot, no pebre».
A baix: «Objectiu: comprar les espècies directament».
"""

C[8] = f"""ESTRUCTURA: mapa amb tres dades. Títol: «Magalhães, Elcano i el tractat de Saragossa».
A dalt al centre, ocupant aproximadament el 80% de l'amplada i el 50% de l'alçada, {MAG}.
A sota, tres idees separades amb molt d'espai, cada una amb una vinyeta petita:
- Una nau: «1519-1522» / «surten 5 naus i 240 homes; tornen 1 nau i 18».
- Sacs de clau (botons secs, NO claus de ferro): «Clau de Tidore» / «la venda va pagar tota l'expedició».
- Un document segellat: «Tractat de Saragossa, 1529» / «Portugal paga 350.000 ducats per les Moluques».
"""

C[9] = """ESTRUCTURA: mapa mental. Títol: «Per què avui les espècies són barates».
Al centre, un cercle amb un petit arbre de clau en un test i el text «De pocs illots a tot el món».
Tres branques amb vinyetes petites:
- Caixa d'esqueixos: «1770» / «Pierre Poivre treu plantes d'amagat».
- Camp de plantació: «Avui» / «es cultiven a molts països».
- Vaixell portacontenidors (avui): «Transport barat» / «sense intermediaris».
Una quarta branca, amb una flor de safrà lila: «A Catalunya?» / «Safrà: sí (Conca de Barberà)» / «Pebre i clau: no, cal clima tropical».
"""

NAMES = {1: "1-paradoxa", 2: "2-especies", 3: "3-marco-polo", 4: "4-index-monsons", 5: "5-preus",
         6: "6-compradors", 7: "7-colom-gama", 8: "8-volta-mon", 9: "9-avui"}
jobs = [{"name": "v2-" + NAMES[k] + ".png", "prompt": S + C[k]} for k in sorted(C)]
d = os.path.dirname(os.path.abspath(__file__))
json.dump(jobs, open(os.path.join(d, "jobs2.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for j in jobs:
    open(os.path.join(d, j["name"].replace(".png", ".txt")), "w", encoding="utf-8").write(j["prompt"])
print(len(jobs), "encàrrecs")
