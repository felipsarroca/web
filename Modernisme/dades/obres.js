/* =========================================================
   Obres del Modernisme
   Font única per a la galeria d'obres, el mapa, l'itinerari de
   Terrassa i el visor. Coordenades: Wikidata. Dades: Viquipèdia
   en català (fitxes de cada edifici), consultades el novembre de 2026.
   ========================================================= */
window.OBRES = [
  /* ---------- Barcelona · arquitectura ---------- */
  {
    id: 'sagrada-familia', titol: 'Sagrada Família', autor: 'Antoni Gaudí', anys: '1882 – avui',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'sagrada-familia', lat: 41.40369, lng: 2.17433, ciutat: 'barcelona',
    desc: 'Temple començat el 1882 en estil neogòtic. Gaudí en va assumir la direcció el 1883 i el va transformar en el projecte de la seva vida fins que va morir el 1926. Encara està en construcció.',
    fixat: ['La façana del Naixement, la part que Gaudí va dirigir personalment.', 'Les escultures plenes de plantes i animals: la natura com a llibre sagrat.', 'Les torres altes i buides, pensades també com a campanars.']
  },
  {
    id: 'casa-batllo', titol: 'Casa Batlló', autor: 'Antoni Gaudí', anys: '1904 – 1906',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'casa-batllo', lat: 41.39158, lng: 2.16492, ciutat: 'barcelona',
    desc: 'Reforma radical d\'un edifici del passeig de Gràcia encarregada per l\'industrial tèxtil Josep Batlló. Jujol va col·laborar en el color de la façana.',
    fixat: ['La façana de trencadís i vidres de colors que sembla aigua.', 'Els balcons en forma de màscara o d\'os.', 'La teulada corbada que molts interpreten com l\'esquena d\'un drac.']
  },
  {
    id: 'casa-mila', titol: 'Casa Milà, «la Pedrera»', autor: 'Antoni Gaudí', anys: '1906 – 1912',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'casa-mila', lat: 41.39528, lng: 2.16167, ciutat: 'barcelona',
    desc: 'Edifici d\'habitatges amb una façana de pedra ondulada que no fa de paret de càrrega: l\'estructura s\'aguanta amb pilars, i això permet distribuir els pisos amb llibertat. El 1984 va ser declarat Patrimoni de la Humanitat.',
    fixat: ['La façana de pedra que ondula com una onada o una muntanya.', 'Els balcons de ferro forjat que semblen algues.', 'Els terrats amb xemeneies en forma de guerrers.']
  },
  {
    id: 'park-guell', titol: 'Parc Güell', autor: 'Antoni Gaudí', anys: '1900 – 1914',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'park-guell', lat: 41.41361, lng: 2.15278, ciutat: 'barcelona',
    desc: 'Projecte de ciutat jardí per a l\'empresari Eusebi Güell que no va tenir èxit com a urbanització. Es va inaugurar com a parc públic el 1926.',
    fixat: ['El drac (o salamandra) de trencadís de l\'escalinata.', 'El banc ondulat de la plaça, fet amb trencadís amb la col·laboració de Jujol.', 'Els viaductes de pedra que imiten troncs i coves.']
  },
  {
    id: 'casa-vicens', titol: 'Casa Vicens', autor: 'Antoni Gaudí', anys: '1883 – 1888',
    lloc: 'Barcelona (Gràcia)', tipus: 'arquitectura', img: 'casa-vicens', lat: 41.40349, lng: 2.15064, ciutat: 'barcelona',
    desc: 'La primera casa important de Gaudí, feta com a residència d\'estiueig de la família Vicens. Encara no és plenament modernista, però ja mostra el seu gust pel color i la influència oriental.',
    fixat: ['Les rajoles amb flors de clavell de moro.', 'Les torretes i els detalls d\'inspiració àrab.']
  },
  {
    id: 'palau-guell', titol: 'Palau Güell', autor: 'Antoni Gaudí', anys: '1886 – 1890',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'palau-guell', lat: 41.37882, lng: 2.17439, ciutat: 'barcelona',
    desc: 'Residència de l\'empresari i mecenes Eusebi Güell al carrer Nou de la Rambla. Patrimoni de la Humanitat des de 1984.',
    fixat: ['Les dues portes amb arcs parabòlics.', 'La reixa de ferro forjat amb l\'escut de Catalunya.']
  },
  {
    id: 'bellesguard', titol: 'Torre Bellesguard', autor: 'Antoni Gaudí', anys: '1900 – 1909',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'bellesguard', lat: 41.40956, lng: 2.12686, ciutat: 'barcelona',
    desc: 'Casa construïda on hi havia hagut el palau del rei Martí l\'Humà; Gaudí s\'inspira en el gòtic català.'
  },
  {
    id: 'teresianes', titol: 'Col·legi de les Teresianes', autor: 'Antoni Gaudí', anys: '1888 – 1889',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'teresianes', lat: 41.39977, lng: 2.1332, ciutat: 'barcelona',
    desc: 'Escola amb llargs passadissos d\'arcs parabòlics de maó.'
  },
  {
    id: 'pavellons-guell', titol: 'Pavellons de la Finca Güell', autor: 'Antoni Gaudí', anys: '1884 – 1887',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'pavellons-guell', lat: 41.38932, lng: 2.11927, ciutat: 'barcelona',
    desc: 'Entrada i quadres d\'una finca dels Güell. La porta del drac és de ferro forjat.'
  },
  {
    id: 'palau-musica', titol: 'Palau de la Música Catalana', autor: 'Lluís Domènech i Montaner', anys: '1905 – 1908',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'palau-musica', lat: 41.38767, lng: 2.17528, ciutat: 'barcelona',
    desc: 'Sala de concerts per a l\'Orfeó Català. Una estructura de ferro permet obrir grans parets de vidre: és una «capsa de llum». Patrimoni de la Humanitat des de 1997.',
    fixat: ['La claraboia central de vidre, com un sol invertit.', 'Les escultures que surten de l\'escenari.', 'Els mosaics i les columnes de ceràmica amb flors.']
  },
  {
    id: 'hospital-sant-pau', titol: 'Hospital de la Santa Creu i Sant Pau', autor: 'Lluís Domènech i Montaner', anys: '1902 – 1913 (primera fase)',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'hospital-sant-pau', lat: 41.41278, lng: 2.17444, ciutat: 'barcelona',
    desc: 'Una ciutat hospital formada per pavellons separats entre jardins, connectats per galeries subterrànies, perquè els malalts tinguessin aire, llum i vegetació. Patrimoni de la Humanitat des de 1997.',
    fixat: ['Els pavellons separats: una idea higienista.', 'El maó vist combinat amb ceràmica de colors.']
  },
  {
    id: 'casa-lleo-morera', titol: 'Casa Lleó i Morera', autor: 'Lluís Domènech i Montaner', anys: '1902 – 1905',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'casa-lleo-morera', lat: 41.39124, lng: 2.16553, ciutat: 'barcelona',
    desc: 'Reforma d\'un edifici del passeig de Gràcia. Forma part de l\'anomenada Illa de la Discòrdia, amb la Casa Amatller i la Casa Batlló.',
    fixat: ['El templet de la cantonada.', 'Les escultures femenines amb invents moderns: fonògraf, telèfon, càmera…']
  },
  {
    id: 'tres-dragons', titol: 'Castell dels Tres Dragons', autor: 'Lluís Domènech i Montaner', anys: '1888',
    lloc: 'Barcelona (Parc de la Ciutadella)', tipus: 'arquitectura', img: 'tres-dragons', lat: 41.38807, lng: 2.18339, ciutat: 'barcelona',
    desc: 'Cafè-restaurant de l\'Exposició Universal de 1888. Sovint es considera el punt de partida de l\'arquitectura modernista: maó vist, ferro i ceràmica deixats a la vista.',
    fixat: ['El maó vist sense arrebossar.', 'Els escuts de ceràmica de la part alta.']
  },
  {
    id: 'casa-amatller', titol: 'Casa Amatller', autor: 'Josep Puig i Cadafalch', anys: '1898 – 1900',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'casa-amatller', lat: 41.39145, lng: 2.16501, ciutat: 'barcelona',
    desc: 'Reforma per al xocolater Antoni Amatller. La façana esglaonada recorda les cases de Flandes.',
    fixat: ['El frontó esglaonat amb ceràmica brillant.', 'Les escultures de Sant Jordi i el drac a la porta.']
  },
  {
    id: 'casa-punxes', titol: 'Casa Terrades, «de les Punxes»', autor: 'Josep Puig i Cadafalch', anys: '1903 – 1905',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'casa-punxes', lat: 41.39798, lng: 2.16378, ciutat: 'barcelona',
    desc: 'Tres habitatges units en un sol edifici que sembla un castell. Combina el gòtic del nord d\'Europa amb motius populars catalans.',
    fixat: ['Les torres còniques acabades en punxa.', 'El plafó ceràmic de Sant Jordi amb el lema «Sant Patró de Catalunya, torneu-nos la llibertat».']
  },
  {
    id: 'baro-quadras', titol: 'Palau del Baró de Quadras', autor: 'Josep Puig i Cadafalch', anys: '1904 – 1906',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'baro-quadras', lat: 41.39675, lng: 2.16138, ciutat: 'barcelona',
    desc: 'Palau amb una façana plena d\'escultura gòtica. Avui és la seu de l\'Institut Ramon Llull.'
  },
  {
    id: 'quatre-gats', titol: 'Els Quatre Gats (Casa Martí)', autor: 'Josep Puig i Cadafalch', anys: 'Edifici 1896 · local obert el 1897',
    lloc: 'Barcelona', tipus: 'arquitectura', img: 'quatre-gats', lat: 41.38578, lng: 2.17367, ciutat: 'barcelona',
    desc: 'Cerveseria inspirada en el cabaret parisenc Le Chat Noir. De 1897 a 1903 hi van coincidir Casas, Rusiñol, Utrillo, Nonell i un jove Picasso.',
    fixat: ['Les finestres d\'arcs gòtics de l\'edifici de Puig i Cadafalch.', 'El rètol de ferro forjat.']
  },

  /* ---------- Terrassa · arquitectura ---------- */
  {
    id: 'masia-freixa', titol: 'Masia Freixa', autor: 'Lluís Muncunill', anys: '1907 – 1914 (reforma)',
    lloc: 'Terrassa (Parc de Sant Jordi)', tipus: 'arquitectura', img: 'masia-freixa', lat: 41.563, lng: 2.00422, ciutat: 'terrassa', ruta: 7,
    desc: 'Construïda el 1896 com a fàbrica de filats, Muncunill la va transformar en la residència de l\'industrial Josep Freixa. És el símbol de la Terrassa modernista.',
    fixat: ['Les voltes i els arcs que ondulen com una tela.', 'El blanc de la façana, que fa destacar les formes.', 'La torre-mirador.']
  },
  {
    id: 'vapor-aymerich', titol: 'Vapor Aymerich, Amat i Jover', autor: 'Lluís Muncunill', anys: '1907 – 1909',
    lloc: 'Terrassa (Rambla d\'Ègara)', tipus: 'arquitectura', img: 'vapor-aymerich', lat: 41.56541, lng: 2.00805, ciutat: 'terrassa', ruta: 1,
    desc: 'Fàbrica de teixits de llana, avui Museu de la Ciència i de la Tècnica de Catalunya (mNACTEC). Una sola nau immensa coberta de voltes de maó que deixen entrar la llum.',
    fixat: ['La coberta ondulada de voltes de maó amb lluernes.', 'La xemeneia de la sala de calderes.', 'El maó vist: un material humil tractat amb art.']
  },
  {
    id: 'mercat-independencia', titol: 'Mercat de la Independència', autor: 'Antoni Pascual i Melcior Vinyals', anys: '1904 – 1908',
    lloc: 'Terrassa (Raval de Montserrat)', tipus: 'arquitectura', img: 'mercat-independencia', lat: 41.5632, lng: 2.00834, ciutat: 'terrassa', ruta: 2,
    desc: 'Mercat central de la ciutat, amb tres naus en forma de ventall. Les 50 columnes de ferro colat sostenen una coberta amb milers de vidres: és l\'estructura de ferro més gran de Terrassa.',
    fixat: ['Les columnes de ferro colat.', 'La gran lluerna on s\'uneixen les naus.']
  },
  {
    id: 'farmacia-albinyana', titol: 'Farmàcia Albinyana', autor: 'Decoració de Joaquim Vancells', anys: '1908',
    lloc: 'Terrassa (Raval de Montserrat)', tipus: 'arquitectura', img: 'farmacia-albinyana', lat: 41.56335, lng: 2.00887, ciutat: 'terrassa', ruta: 3,
    desc: 'Botiga amb façana de majòliques i trencadís, i un interior de ferro forjat, ceràmica i pintures murals del pintor terrassenc Joaquim Vancells.',
    fixat: ['El portal decorat amb majòliques i petxines de trencadís.', 'El coronament esglaonat de ceràmica vidriada.']
  },
  {
    id: 'societat-electricitat', titol: 'Societat General d\'Electricitat', autor: 'Lluís Muncunill', anys: '1906',
    lloc: 'Terrassa (c. de la Unió)', tipus: 'arquitectura', img: 'societat-electricitat', lat: 41.5625, lng: 2.00966, ciutat: 'terrassa', ruta: 4,
    desc: 'Edifici industrial de maó vist cobert amb voltes catalanes atirantades, que dibuixen una coberta ondulada.'
  },
  {
    id: 'casa-alegre', titol: 'Casa Alegre de Sagrera', autor: 'Reforma de Melcior Vinyals', anys: 'Reforma a l\'inici del segle XX',
    lloc: 'Terrassa (c. de la Font Vella)', tipus: 'arquitectura', img: 'casa-alegre', lat: 41.5628, lng: 2.01233, ciutat: 'terrassa', ruta: 5,
    desc: 'Casa d\'una família d\'industrials tèxtils, reformada amb balcons i interiors modernistes. Avui és una secció del Museu de Terrassa: s\'hi pot veure com vivia la burgesia.',
    fixat: ['Els balcons de ferro forjat del primer pis.', 'Els interiors i els jardins (visitables).']
  },
  {
    id: 'teatre-principal', titol: 'Teatre Principal', autor: 'Enric Catà i Francesc Guàrdia', anys: 'Reforma de 1911',
    lloc: 'Terrassa (plaça de Maragall)', tipus: 'arquitectura', img: 'teatre-principal', lat: 41.5645, lng: 2.01307, ciutat: 'terrassa', ruta: 6,
    desc: 'Teatre del 1866 reformat el 1911 per dos col·laboradors de Domènech i Montaner al Palau de la Música.',
    fixat: ['L\'escut de la ciutat a la façana.']
  },
  {
    id: 'magatzem-corcoy', titol: 'Magatzem Corcoy', autor: 'Melcior Vinyals', anys: 'Principi del segle XX',
    lloc: 'Terrassa (pl. de Mossèn Jacint Verdaguer)', tipus: 'arquitectura', img: 'magatzem-corcoy', lat: 41.5661, lng: 2.01305, ciutat: 'terrassa',
    desc: 'Antic magatzem de teixits a l\'engròs. Edifici senzill, simètric, amb finestres d\'arc de ferradura i remats modernistes.'
  },
  {
    id: 'casa-baumann', titol: 'Casa Baumann', autor: 'Josep Maria Coll i Bacardí', anys: '1913',
    lloc: 'Terrassa (av. de Jacquard)', tipus: 'arquitectura', img: 'casa-baumann', lat: 41.5638, lng: 2.0189, ciutat: 'terrassa',
    desc: 'Habitatge modernista al barri de Vallparadís.'
  },
  {
    id: 'parc-desinfeccio', titol: 'Parc de Desinfecció', autor: 'Josep Maria Coll i Bacardí', anys: 'c. 1915',
    lloc: 'Terrassa (Roc Blanc)', tipus: 'arquitectura', img: 'parc-desinfeccio', lat: 41.55599, lng: 1.99697, ciutat: 'terrassa',
    desc: 'Edifici municipal per desinfectar roba i objectes durant les epidèmies: fins i tot un servei d\'higiene es feia bonic.'
  },

  /* ---------- Resta de Catalunya i fora ---------- */
  {
    id: 'casa-navas', titol: 'Casa Navàs', autor: 'Lluís Domènech i Montaner', anys: '1901 – 1908',
    lloc: 'Reus (plaça del Mercadal)', tipus: 'arquitectura', img: 'casa-navas', lat: 41.15526, lng: 1.10854, ciutat: 'catalunya',
    desc: 'Casa d\'un comerciant de teixits. És un dels interiors modernistes més ben conservats: vitralls, mosaics, escultura i mobles de Gaspar Homar encara són al seu lloc.',
    fixat: ['Els arcs i les columnes esculpides de la planta baixa.', 'Els vitralls i els mobles originals (visita guiada).']
  },
  {
    id: 'institut-pere-mata', titol: 'Institut Pere Mata', autor: 'Lluís Domènech i Montaner', anys: '1898 – 1912',
    lloc: 'Reus', tipus: 'arquitectura', img: 'ceramica-pere-mata', lat: 41.16696, lng: 1.08481, ciutat: 'catalunya',
    desc: 'Hospital psiquiàtric format per pavellons separats enmig de jardins, una idea que Domènech va repetir a l\'Hospital de Sant Pau. Hi destaca la ceràmica de Pujol i Bausis i els mosaics de Lluís Bru.',
    fixat: ['Els pavellons separats, pensats per a la higiene i la calma.', 'La decoració de ceràmica del Pavelló dels Distingits.']
  },
  {
    id: 'cau-ferrat-casa', titol: 'Cau Ferrat', autor: 'Santiago Rusiñol', anys: 'Casa-taller des del 1893',
    lloc: 'Sitges', tipus: 'arquitectura', img: 'cau-ferrat', lat: 41.23507, lng: 1.81274, ciutat: 'catalunya',
    desc: 'Casa-taller de Rusiñol, on va reunir la seva col·lecció de ferro forjat, ceràmica i pintura. Va acollir les Festes Modernistes (1892–1899) i des del 1933 és museu.',
    fixat: ['La col·lecció de ferros forjats que dona nom a la casa.', 'Les pintures de Rusiñol i Casas.']
  },
  {
    id: 'casa-museu-canet', titol: 'Casa Museu Domènech i Montaner', autor: 'Lluís Domènech i Montaner', anys: 'Museu des del 1998',
    lloc: 'Canet de Mar', tipus: 'arquitectura', img: 'casa-museu-canet', lat: 41.58834, lng: 2.58135, ciutat: 'catalunya',
    desc: 'Canet de Mar era el poble de la família de Domènech i Montaner. La casa museu explica la seva obra i el treball dels artesans que hi col·laboraven.'
  },
  {
    id: 'capricho-comillas', titol: 'El Capricho', autor: 'Antoni Gaudí', anys: '1883 – 1885',
    lloc: 'Comillas (Cantàbria) · fora de Catalunya', tipus: 'arquitectura', img: 'capricho-comillas', lat: 43.38368, lng: -4.29274, ciutat: 'fora',
    desc: 'Una de les primeres obres de Gaudí, una casa d\'estiueig revestida de rajoles amb gira-sols. Mostra que el Modernisme català va arribar a altres llocs d\'Espanya.',
    fixat: ['Les rajoles verdes i grogues amb gira-sols.', 'La torre-minaret coberta de ceràmica.']
  },

  /* ---------- Pintura, cartells i arts decoratives ---------- */
  {
    id: 'casas-tandem', titol: 'Ramon Casas i Pere Romeu en un tàndem', autor: 'Ramon Casas', anys: '1897',
    lloc: 'Museu Nacional d\'Art de Catalunya', tipus: 'pintura', img: 'casas-tandem',
    desc: 'Pintura que decorava Els Quatre Gats. Casas i el propietari del local, Pere Romeu, pedalen junts: la bicicleta era un símbol de modernitat.',
    fixat: ['El fons gairebé buit, que fa destacar les figures.', 'L\'humor: els dos amics semblen cansats de pedalar.']
  },
  {
    id: 'rusinol-aranjuez', titol: 'Jardí d\'Aranjuez. Glorieta II', autor: 'Santiago Rusiñol', anys: '1907',
    lloc: 'Museo Nacional Centro de Arte Reina Sofía, Madrid', tipus: 'pintura', img: 'rusinol-aranjuez',
    desc: 'Rusiñol va pintar jardins tota la vida: espais tranquils i melancòlics, sense persones, on la llum i el color són els protagonistes.',
    fixat: ['El camí central que porta la mirada cap al fons.', 'Les flors pintades amb taques de color.']
  },
  {
    id: 'nonell-pelona', titol: 'La Pelona', autor: 'Isidre Nonell', anys: '1904',
    lloc: 'Museu Nacional d\'Art de Catalunya', tipus: 'pintura', img: 'nonell-pelona',
    desc: 'Nonell va pintar gitanes i persones marginades, temes que no agradaven a la burgesia. Mostra la cara menys brillant de la Barcelona modernista.',
    fixat: ['Les pinzellades curtes i gruixudes.', 'Els colors foscos i la figura replegada.']
  },
  {
    id: 'cartell-anis-mono', titol: 'Anís del Mono', autor: 'Ramon Casas', anys: '1898',
    lloc: 'Cartell publicitari', tipus: 'cartell', img: 'cartell-anis-mono',
    desc: 'Cartell guanyador del concurs que va convocar la marca el 1898. La dona amb mantó de Manila i el mico de la marca són els protagonistes.',
    fixat: ['El mantó de Manila amb colors plans.', 'Les lletres que formen part del dibuix.']
  },
  {
    id: 'cartell-codorniu', titol: 'Champagne Codorniu', autor: 'Ramon Casas', anys: 'c. 1898',
    lloc: 'Cartell publicitari', tipus: 'cartell', img: 'cartell-codorniu',
    desc: 'Casas presenta el producte amb una dona elegant i moderna. La publicitat associa la marca a la bellesa i al luxe.',
    fixat: ['La butaca verda, que ocupa gran part del cartell.', 'Les caixes amb el nom de la marca.']
  },
  {
    id: 'cartell-4gats', titol: 'Cartell d\'Els Quatre Gats', autor: 'Ramon Casas', anys: 'c. 1897',
    lloc: 'Cartell', tipus: 'cartell', img: 'cartell-4gats',
    desc: 'Retrat de Pere Romeu, el propietari d\'Els Quatre Gats, davant del local. Amb la pipa i l\'abric llarg, era la imatge del bohemi.',
    fixat: ['La silueta allargada de Pere Romeu.', 'L\'interior del local, ple de gent, al fons.']
  },
  {
    id: 'cartell-cigarrillos-paris', titol: 'Cigarrillos París', autor: 'Ramon Casas', anys: '1901',
    lloc: 'Cartell publicitari', tipus: 'cartell', img: 'cartell-cigarrillos-paris',
    desc: 'Un dels cartells més elegants de Casas: la figura femenina, la línia i la taca de color venen el producte.',
    fixat: ['El contrast entre la figura i el fons.']
  },
  {
    id: 'riquer-sant-lluc', titol: 'Cartell del Cercle Artístic de Sant Lluc', autor: 'Alexandre de Riquer', anys: '1899',
    lloc: 'Cartell', tipus: 'cartell', img: 'riquer-sant-lluc',
    desc: 'Riquer és el cartellista català més proper al gust anglès i a l\'Art Nouveau: figures femenines, flors i línies que ho emmarquen tot.',
    fixat: ['El format molt allargat.', 'La figura envoltada de flors i de línies corbes.']
  },
  {
    id: 'pel-ploma', titol: 'Portada de «Pèl & Ploma»', autor: 'Ramon Casas', anys: '1899 – 1903',
    lloc: 'Revista', tipus: 'cartell', img: 'pel-ploma',
    desc: 'Revista d\'art fundada per Ramon Casas i Miquel Utrillo el 1899. Va difondre el gust modernista i l\'art europeu.'
  },
  {
    id: 'cau-ferrat', titol: 'Interior del Cau Ferrat', autor: 'Miquel Utrillo', anys: '1895',
    lloc: 'Museus de Sitges', tipus: 'pintura', img: 'cau-ferrat',
    desc: 'El Cau Ferrat era la casa-taller de Rusiñol a Sitges, plena de ferros forjats, ceràmica i pintura. Allà es van celebrar les Festes Modernistes (1892–1899).'
  },
  {
    id: 'trencadis', titol: 'Trencadís del Parc Güell', autor: 'Antoni Gaudí i Josep Maria Jujol', anys: '1900 – 1914',
    lloc: 'Barcelona', tipus: 'decoratives', img: 'trencadis',
    desc: 'El trencadís cobreix superfícies corbes amb trossos de rajola i de vaixella trencats: reciclatge convertit en art.'
  },
  {
    id: 'vitrall-palau', titol: 'Claraboia del Palau de la Música', autor: 'Lluís Domènech i Montaner · vitralls d\'Antoni Rigalt', anys: '1908',
    lloc: 'Barcelona', tipus: 'decoratives', img: 'vitrall-palau',
    desc: 'La gran claraboia de vidre de colors penja del sostre com un sol. Arquitectura, vidre, ceràmica i escultura formen una sola obra: l\'art total.'
  },

  {
    id: 'homar-sofa', titol: 'Sofà amb vitrines i marqueteria', autor: 'Gaspar Homar', anys: 'c. 1905',
    lloc: 'Museu Nacional d\'Art de Catalunya', tipus: 'decoratives', img: 'homar-sofa',
    desc: 'Moble de luxe que uneix sofà, vitrines i un plafó de marqueteria fet amb fustes de colors naturals.'
  },
  {
    id: 'masriera-fermall', titol: 'Fermall penjant amb nimfa', autor: 'Lluís Masriera', anys: 'Primer quart del segle XX',
    lloc: 'Barcelona', tipus: 'decoratives', img: 'joia-masriera-fermall',
    desc: 'Joia d\'or amb esmalt translúcid: una figura femenina amb ales, un tema típic de l\'Art Nouveau.'
  },
  {
    id: 'rosassa-gaudi', titol: 'Rosassa de vitrall', autor: 'Antoni Gaudí', anys: 'Final del segle XIX',
    lloc: 'Museu Nacional d\'Art de Catalunya', tipus: 'decoratives', img: 'vitrall-gaudi-rosassa',
    desc: 'Vitrall rodó de vidres de colors units amb plom.'
  },
  {
    id: 'barana-pedrera', titol: 'Barana de la Casa Milà', autor: 'Gaudí i Jujol · forja dels germans Badia', anys: '1906 – 1910',
    lloc: 'Museu Nacional d\'Art de Catalunya', tipus: 'decoratives', img: 'ferro-pedrera-barana',
    desc: 'Barana de ferro forjat de la Pedrera: planxes i barres retorçades que semblen algues.'
  },

  /* ---------- Europa ---------- */
  {
    id: 'horta-tassel', titol: 'Casa Tassel', autor: 'Victor Horta', anys: '1893',
    lloc: 'Brussel·les', tipus: 'europa', img: 'horta-tassel', moviment: 'Art Nouveau',
    desc: 'Considerada el primer edifici Art Nouveau. L\'escala, amb columnes de ferro que es tornen tiges i línies pintades a les parets, és una mostra del «colp de fuet».'
  },
  {
    id: 'guimard-metro', titol: 'Entrada del metro de París', autor: 'Hector Guimard', anys: 'c. 1900',
    lloc: 'París', tipus: 'europa', img: 'guimard-metro', moviment: 'Art Nouveau',
    desc: 'Guimard va dissenyar les entrades del metro amb ferro colat que imita plantes. L\'art arriba a un servei públic de cada dia.'
  },
  {
    id: 'mucha-salammbo', titol: 'Salammbô', autor: 'Alfons Mucha', anys: '1896',
    lloc: 'Il·lustració', tipus: 'europa', img: 'mucha-salammbo', moviment: 'Art Nouveau',
    desc: 'Mucha, txec establert a París, va crear l\'«estil Mucha»: dones idealitzades, cabells que formen arabescos i orles de flors.'
  },
  {
    id: 'mucha-job', titol: 'Cartell de JOB', autor: 'Alfons Mucha', anys: '1896',
    lloc: 'Cartell publicitari', tipus: 'europa', img: 'mucha-job', moviment: 'Art Nouveau',
    desc: 'Anunci de paper de fumar. Els cabells de la noia i el fum dibuixen corbes que omplen tot el cartell: el model de molts cartellistes catalans.'
  },
  {
    id: 'klimt-peto', titol: 'El petó', autor: 'Gustav Klimt', anys: '1907 – 1908',
    lloc: 'Österreichische Galerie Belvedere, Viena', tipus: 'europa', img: 'klimt-peto', moviment: 'Secessió vienesa',
    desc: 'La parella es fon en un mantell d\'or ple de dibuixos geomètrics i florals. Klimt va usar pa d\'or, com en els mosaics bizantins.'
  },
  {
    id: 'wagner-majolica', titol: 'Majolikahaus', autor: 'Otto Wagner', anys: '1898 – 1899',
    lloc: 'Viena', tipus: 'europa', img: 'wagner-majolica', moviment: 'Secessió vienesa',
    desc: 'Bloc de pisos amb la façana coberta de rajoles de majòlica amb flors: decoració plana i ordenada, típica de Viena.'
  },
  {
    id: 'jugend-revista', titol: 'Revista «Jugend»', autor: 'Portada de Ludwig von Zumbusch', anys: '1896',
    lloc: 'Munic', tipus: 'europa', img: 'jugend-revista', moviment: 'Jugendstil',
    desc: 'La revista Jugend («joventut») va donar nom al Jugendstil, la versió alemanya del moviment.'
  },
  {
    id: 'hokusai-onada', titol: 'La gran onada de Kanagawa', autor: 'Katsushika Hokusai', anys: 'c. 1830 – 1832',
    lloc: 'Gravat japonès (ukiyo-e)', tipus: 'europa', img: 'hokusai-onada', moviment: 'Influència japonesa',
    desc: 'Els gravats japonesos van arribar a Europa a la segona meitat del segle XIX i van inspirar els artistes: colors plans, contorns marcats i composicions asimètriques.'
  }
];
