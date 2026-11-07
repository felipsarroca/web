/* =========================================================
   Els grans arquitectes: vida i obres per ordre cronològic
   Font comuna per a arquitectes.html i per al mapa («Vida d'un
   arquitecte»). Cada obra porta:
     any: any d'inici · titol · text
     o:   id a dades/obres.js (si l'obra hi és, d'allà en surten la
          imatge, els anys, el lloc i les coordenades)
     img, lloc, lat, lng: només per a les obres que no són a obres.js
   Dades: Viquipèdia en català i Wikidata, consultades el novembre de 2026.
   ========================================================= */
window.ARQUITECTES = [
  {
    id: 'gaudi', nom: 'Antoni Gaudí i Cornet', curt: 'Gaudí', color: '#a8502f', neix: 1852,
    vida: 'Reus, 1852 – Barcelona, 1926', retrat: 'gaudi-retrat',
    intro: 'Fill d\'una família de caldarers de Reus, va créixer veient com el seu pare donava forma a les planxes de coure. Va estudiar arquitectura a Barcelona i es va titular el 1878. La seva obra passa per diverses etapes: dels estils orientals i gòtics a un llenguatge propi inspirat en la natura i en l\'estructura dels éssers vius. Els últims dotze anys de la seva vida els va dedicar només a la Sagrada Família.',
    facil: 'Gaudí va néixer a Reus. Al principi copiava estils antics. Després va inventar una manera nova de construir, inspirada en les plantes i els animals.',
    etapes: [
      { titol: 'Formació i primers encàrrecs', anys: '1852–1882', obres: [
        { any: 1878, titol: 'Fanals de la plaça Reial', img: 'fanal-placa-reial', lloc: 'Barcelona', lat: 41.38000, lng: 2.17500, text: 'Acabat de titular, rep el seu primer encàrrec públic de l\'Ajuntament de Barcelona: uns fanals de ferro colat i bronze.' }
      ] },
      { titol: 'L\'etapa oriental', anys: '1883–1888', text: 'Maó, rajoles de colors, torres i cúpules que recorden l\'art islàmic i l\'Orient.', obres: [
        { any: 1883, titol: 'Casa Vicens', o: 'casa-vicens', text: 'La seva primera gran casa: maó i rajoles amb clavells de moro, la flor que creixia al solar.' },
        { any: 1883, titol: 'El Capricho', o: 'capricho-comillas', text: 'Casa d\'estiueig a Comillas (Cantàbria), coberta de rajoles amb gira-sols i una torre esvelta.' },
        { any: 1884, titol: 'Pavellons de la Finca Güell', o: 'pavellons-guell', text: 'Primer encàrrec d\'Eusebi Güell, el seu gran mecenes. La porta del drac és de ferro forjat.' }
      ] },
      { titol: 'Mirant el gòtic', anys: '1886–1900', text: 'Gaudí estudia el gòtic i el transforma: arcs parabòlics, ferro i espais plens de llum.', obres: [
        { any: 1886, titol: 'Palau Güell', o: 'palau-guell', text: 'Residència de la família Güell al Raval. Els arcs parabòlics de l\'entrada i les xemeneies de trencadís anuncien el Gaudí madur.' },
        { any: 1888, titol: 'Col·legi de les Teresianes', o: 'teresianes', text: 'Una escola amb poc pressupost: maó i llargs passadissos d\'arcs parabòlics.' },
        { any: 1889, titol: 'Palau Episcopal d\'Astorga', o: 'palau-astorga', text: 'Encàrrec d\'un bisbe amic, també de Reus. Gaudí s\'hi emporta paletes catalans que ja havien treballat amb ell.' },
        { any: 1891, titol: 'Casa Botines', o: 'casa-botines', text: 'Magatzem i habitatges a Lleó, amb torres cilíndriques als angles com un castell.' },
        { any: 1898, titol: 'Casa Calvet', img: 'cadira-calvet', lloc: 'Barcelona', lat: 41.39083, lng: 2.17306, text: 'Edifici d\'habitatges de l\'Eixample. Gaudí en dissenya fins i tot els mobles, com aquesta cadira. El 1900 guanya el premi de l\'Ajuntament al millor edifici de l\'any.' },
        { any: 1900, titol: 'Torre Bellesguard', o: 'bellesguard', text: 'On hi havia hagut el palau del rei Martí l\'Humà: un homenatge al gòtic català.' }
      ] },
      { titol: 'La plenitud: la natura com a model', anys: '1900–1914', text: 'Columnes inclinades com arbres, façanes que ondulen, colors i trencadís. Gaudí calcula les estructures amb maquetes de cordes i pesos.', obres: [
        { any: 1900, titol: 'Park Güell', o: 'park-guell', text: 'Una ciutat jardí que va acabar sent parc públic. El banc ondulat de trencadís és obra de Jujol.' },
        { any: 1904, titol: 'Casa Batlló', o: 'casa-batllo', text: 'Reforma total d\'una casa del passeig de Gràcia: una façana que sembla aigua i una teulada amb esquena de drac.' },
        { any: 1906, titol: 'Casa Milà, «la Pedrera»', o: 'casa-mila', text: 'Façana de pedra ondulada que no aguanta l\'edifici: els pisos reposen sobre pilars i es poden distribuir lliurement.' },
        { any: 1908, titol: 'Cripta de la Colònia Güell', o: 'cripta-colonia-guell', text: 'El laboratori de Gaudí: la va calcular amb una maqueta de cordes i pesos. Columnes inclinades, sense contraforts. De l\'església només se\'n va fer la cripta.' }
      ] },
      { titol: 'Només la Sagrada Família', anys: '1914–1926', text: 'Gaudí deixa els altres encàrrecs i viu pràcticament a l\'obra. Mor el 10 de juny de 1926, tres dies després de ser atropellat per un tramvia.', obres: [
        { any: 1914, titol: 'Sagrada Família', o: 'sagrada-familia', text: 'Gaudí en dirigia les obres des del 1883. En total hi va treballar 43 anys. Només va veure acabada una torre, la de sant Bernabé (1925). Avui encara s\'hi construeix.' }
      ] }
    ]
  },
  {
    id: 'domenech', nom: 'Lluís Domènech i Montaner', curt: 'Domènech i Montaner', color: '#3f5f8a', neix: 1850,
    vida: 'Barcelona, 1850 – 1923', retrat: 'domenech-retrat', retall: '--retall:1.7;--focus:50% 22%',
    intro: 'Arquitecte, professor, historiador i polític. Va dirigir l\'Escola d\'Arquitectura de Barcelona i el 1878 va publicar «A la recerca d\'una arquitectura nacional». És el gran mestre de l\'art total: als seus edificis hi treballaven ceramistes, vidriers, mosaïcistes i escultors.',
    facil: 'Domènech feia edificis plens de colors, vidres i escultures. Hi treballaven molts artesans junts.',
    etapes: [ { titol: 'Obres principals', obres: [
      { any: 1888, titol: 'Castell dels Tres Dragons', o: 'tres-dragons', text: 'Cafè-restaurant de l\'Exposició Universal: maó vist i ferro deixats a la vista. Un dels primers edificis modernistes.' },
      { any: 1898, titol: 'Institut Pere Mata', o: 'institut-pere-mata', text: 'Hospital psiquiàtric de Reus en pavellons separats enmig de jardins.' },
      { any: 1900, titol: 'Casa Rull', o: 'casa-rull', text: 'Casa d\'un notari de Reus, de gust medieval, amb jardí. Avui és un equipament cultural de la ciutat.' },
      { any: 1901, titol: 'Casa Navàs', o: 'casa-navas', text: 'A Reus, amb un interior que conserva vitralls, mosaics i mobles d\'Homar.' },
      { any: 1902, titol: 'Casa Lleó Morera', o: 'casa-lleo-morera', text: 'Al passeig de Gràcia. Hi treballen Arnau, Bru, Rigalt i Homar: un catàleg dels oficis.' },
      { any: 1902, titol: 'Hospital de Sant Pau', o: 'hospital-sant-pau', text: 'Una ciutat-hospital de pavellons connectats per túnels. El va acabar el seu fill Pere el 1930.' },
      { any: 1903, titol: 'Gran Hotel de Palma', o: 'gran-hotel-palma', text: 'El Modernisme arriba a Mallorca: maó, pedra, ceràmica i ferro forjat. Avui és un centre cultural.' },
      { any: 1905, titol: 'Palau de la Música Catalana', o: 'palau-musica', text: 'La seva obra mestra (1905–1908): una caixa de vidre plena de llum, música i color.' }
    ] } ]
  },
  {
    id: 'puig', nom: 'Josep Puig i Cadafalch', curt: 'Puig i Cadafalch', color: '#5e7150', neix: 1867,
    vida: 'Mataró, 1867 – Barcelona, 1956', retrat: 'puig-cadafalch-retrat', retall: 'object-position:center 0%;--retall:1.6;--focus:52% 4%',
    intro: 'Arquitecte, historiador de l\'art romànic i polític: va presidir la Mancomunitat de Catalunya entre 1917 i 1923. Va barrejar el gòtic català amb elements de l\'arquitectura del nord d\'Europa: torres, punxes, frontons esglaonats i esgrafiats.',
    facil: 'Puig i Cadafalch feia cases que semblen castells, amb torres i punxes.',
    etapes: [ { titol: 'Obres principals', obres: [
      { any: 1896, titol: 'Casa Martí (Els Quatre Gats)', o: 'quatre-gats', text: 'Edifici neogòtic on va obrir la famosa cerveseria dels artistes el 1897.' },
      { any: 1898, titol: 'Casa Amatller', o: 'casa-amatller', text: 'Façana amb frontó esglaonat i un Sant Jordi d\'Eusebi Arnau. Al costat de la Casa Batlló.' },
      { any: 1903, titol: 'Casa de les Punxes', o: 'casa-punxes', text: 'Un sol edifici per a tres germanes Terrades que sembla un castell, amb sis torres punxegudes.' },
      { any: 1904, titol: 'Palau del Baró de Quadras', o: 'baro-quadras', text: 'Façana plena d\'escultura d\'inspiració gòtica. Avui és la seu de l\'Institut Ramon Llull.' }
    ] } ]
  },
  {
    id: 'muncunill', nom: 'Lluís Muncunill i Parellada', curt: 'Muncunill', color: '#8a6a22', neix: 1868,
    vida: 'Sant Vicenç de Fals, 1868 – Terrassa, 1931', retrat: 'muncunill-retrat', retall: '--retall:1.5',
    intro: 'Arquitecte municipal de Terrassa (1892–1903), va transformar una ciutat industrial. Va fer servir la volta catalana i el maó vist per cobrir grans naus de fàbrica amb ones de llum.',
    facil: 'Muncunill va fer fàbriques i cases a Terrassa. Els sostres fan ones.',
    etapes: [ { titol: 'Obres principals', obres: [
      { any: 1906, titol: 'Societat General d\'Electricitat', o: 'societat-electricitat', text: 'Coberta ondulada de voltes catalanes atirantades.' },
      { any: 1907, titol: 'Vapor Aymerich, Amat i Jover', o: 'vapor-aymerich', text: 'Fàbrica de llana amb una sola nau immensa coberta de voltes amb lluernes. Avui és el mNACTEC.' },
      { any: 1907, titol: 'Masia Freixa', o: 'masia-freixa', text: 'Una antiga fàbrica convertida en residència, amb arcs parabòlics i voltes que ondulen.' }
    ] } ]
  }
];

/* Altres arquitectes: una obra representativa de cadascun (id a obres.js) */
window.ALTRES_ARQUITECTES = [
  { nom: 'Josep Maria Jujol', vida: 'Tarragona, 1879 – Barcelona, 1949', o: 'torre-creu',
    text: 'Col·laborador de Gaudí: va posar el color al banc del Park Güell i a la façana de la Casa Batlló. Com a arquitecte municipal de Sant Joan Despí, hi va fer cases plenes d\'imaginació.' },
  { nom: 'Francesc Berenguer', vida: 'Reus, 1866 – Barcelona, 1914', o: 'celler-guell',
    text: 'La mà dreta de Gaudí durant gairebé trenta anys. No va obtenir el títol d\'arquitecte, i per això altres signaven els seus projectes: encara avui es discuteix l\'autoria d\'algunes obres.' },
  { nom: 'Joan Rubió i Bellver', vida: 'Reus, 1871 – Barcelona, 1952', o: 'casa-golferichs',
    text: 'Deixeble de Gaudí. La Casa Golferichs, «el Xalet», es va salvar de l\'enderroc als anys setanta gràcies a la lluita dels veïns.' },
  { nom: 'Enric Sagnier', vida: 'Barcelona, 1858 – 1931', o: 'casa-garriga-nogues',
    text: 'L\'arquitecte de l\'alta burgesia: va signar centenars d\'edificis a Barcelona, entre ells cases, escoles i esglésies. Combinava el gust tradicional dels seus clients amb detalls modernistes.' },
  { nom: 'Antoni Maria Gallissà', vida: 'Barcelona, 1861 – 1903', o: 'casa-llopis-bofill',
    text: 'Deixeble de Domènech i Montaner, va recuperar l\'esgrafiat i la ceràmica com a ornament de façana.' },
  { nom: 'Salvador Valeri', vida: 'Barcelona, 1873 – 1954', o: 'casa-comalat',
    text: 'La Casa Comalat té dues façanes molt diferents: una de pedra, que mira a la Diagonal, i una altra plena de ceràmica i fusta, al carrer de Còrsega.' },
  { nom: 'Rafael Masó', vida: 'Girona, 1880 – 1935', o: 'farinera-teixidor',
    text: 'El gran arquitecte de Girona. Va passar del Modernisme al Noucentisme. A la Farinera Teixidor hi va dissenyar fins i tot la ceràmica i el ferro.' },
  { nom: 'Cèsar Martinell', vida: 'Valls, 1888 – Barcelona, 1973', o: 'celler-pinell',
    text: 'Deixeble de Gaudí, va fer una quarantena de cellers cooperatius per als pagesos. Els van batejar com les «catedrals del vi».' }
];
