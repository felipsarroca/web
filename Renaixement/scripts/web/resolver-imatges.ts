// resolver-imatges.ts — Resol els fitxers de Wikimedia Commons per a les 68 obres
// del corpus de la programació. Verifica existència, dimensions i llicència via API.
// Sortida: src/data/imatges.json (slug → { fitxer, amplada, alcada, llicencia, autor_foto })
"use strict";

const API = "https://commons.wikimedia.org/w/api.php";

interface Candidat {
  slug: string;
  fitxers: string[];        // candidats preferits, per ordre
  cerca?: string;           // cerca de reserva si cap candidat existeix
  claus?: string[];         // paraules que el resultat de la cerca ha de contenir
}

const OBRAS: Candidat[] = [
  // ── Pintura italiana (24) ──
  { slug: "trinitat-masaccio", fitxers: ["Masaccio, Trinità.jpg", "Masaccio. Holy Trinity.jpg", "Masaccio, trinità.jpg"], cerca: "Masaccio Trinità Santa Maria Novella", claus: ["masaccio"] },
  { slug: "tribut-sant-pere", fitxers: ["Masaccio 006.jpg", "Masaccio, tributo.jpg", "Masaccio - The Tribute Money.jpg"], cerca: "Masaccio Tribute Money Brancacci", claus: ["masaccio"] },
  { slug: "expulsio-paradis", fitxers: ["Masaccio Expulsion.jpg", "Masaccio.expulsion.jpg"], cerca: "Masaccio Expulsion Garden of Eden", claus: ["masaccio"] },
  { slug: "adoracio-mags-botticelli", fitxers: ["Botticelli, adorazione dei magi uffizi.jpg", "Sandro Botticelli - Adorazione dei Magi - Google Art Project.jpg"], cerca: "Botticelli Adoration of the Magi Uffizi", claus: ["botticelli"] },
  { slug: "primavera", fitxers: ["Botticelli-primavera.jpg", "La Primavera (Botticelli).jpg"] },
  { slug: "naixement-venus", fitxers: ["Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg"] },
  { slug: "bateig-crist-piero", fitxers: ["Piero, battesimo cristo 01.jpg", "Piero della Francesca - Baptism of Christ - WGA17496.jpg"], cerca: "Piero della Francesca Baptism of Christ London", claus: ["piero"] },
  { slug: "flagellacio-piero", fitxers: ["Piero della Francesca - The Flagellation - WGA17413.jpg", "Flagellation of Christ (Piero della Francesca).jpg", "Piero, flagellazione.jpg"], cerca: "Piero della Francesca Flagellation Christ", claus: ["piero"] },
  { slug: "crist-mort-mantegna", fitxers: ["Andrea Mantegna - Dead Christ - Google Art Project.jpg", "Andrea Mantegna 070.jpg", "Mantegna, compianto.jpg"], cerca: "Mantegna Lamentation Dead Christ Brera", claus: ["mantegna"] },
  { slug: "cambra-esposats", fitxers: ["Camera degli Sposi.jpg", "Mantegna Camera Picta.jpg", "Camera degli sposi 1474.jpg"], cerca: "Mantegna Camera degli Sposi", claus: ["camera"] },
  { slug: "dama-ermini", fitxers: ["The Lady with an Ermine.jpg", "Dama z gronostajem.jpg"] },
  { slug: "verge-roques", fitxers: ["Leonardo Da Vinci - Vergine delle Rocce (Louvre).jpg", "Leonardo da Vinci, Virgin of the Rocks, 1503-1506.jpg"] },
  { slug: "ultim-sopar", fitxers: ["Última Cena - Da Vinci 5.jpg", "Leonardo's Last Supper 1498.jpg", "The Last Supper - Leonardo Da Vinci - High Resolution 32x16.jpg"], cerca: "Leonardo Last Supper Santa Maria delle Grazie", claus: ["last", "supper"] },
  { slug: "gioconda", fitxers: ["Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg"] },
  { slug: "desposoris-verge", fitxers: ["Raffaello - Spozalizio - Web Gallery of Art.jpg", "Raphael - The Marriage of the Virgin - Google Art Project.jpg"] },
  { slug: "madonna-granduca", fitxers: ["Raphael - Madonna del Granduca - WGA18736.jpg", "Madonna del Granduca (Raphael).jpg", "Raffaello, madonna del granduca.jpg"], cerca: "Raphael Madonna del Granduca", claus: ["madonna", "granduca"] },
  { slug: "escola-atenes", fitxers: ["\"The School of Athens\" by Raffaello Sanzio da Urbino.jpg", "Raffael 058.jpg"] },
  { slug: "volta-sixtina", fitxers: ["Michelangelo, volta della Cappella Sistina.jpg", "Sistine Chapel ceiling - after restoration.jpg", "Ceiling of the Sistine Chapel.jpg"], cerca: "Sistine Chapel ceiling Michelangelo", claus: ["sistine"] },
  { slug: "judici-final", fitxers: ["Judgment day by Michelangelo.jpg", "Michelangelo - Last Judgment - Sistine Chapel.jpg"] },
  { slug: "amor-sagrat-profà", fitxers: ["Amor sacro y amor profano.jpg", "Titian - Sacred and Profane Love - Google Art Project.jpg", "Tizian 034.jpg"], cerca: "Titian Sacred and Profane Love Borghese", claus: ["titian"] },
  { slug: "assumcio-frari", fitxers: ["Tizian 041.jpg", "Tiziano - Assunta dei Frari.jpg", "Titian - Assumption of the Virgin - WGA22934.jpg"], cerca: "Titian Assumption Frari Venice", claus: ["titian"] },
  { slug: "venus-urbino", fitxers: ["Tiziano - Venere di Urbino - Google Art Project.jpg"] },
  { slug: "noces-cana", fitxers: ["Paolo Veronese 008.jpg", "Les Noces de Cana (Veronese).jpg", "Paolo Veronese - The Wedding at Cana - Google Art Project.jpg"], cerca: "Veronese Wedding at Cana Louvre", claus: ["veronese"] },
  { slug: "madonna-coll-llarg", fitxers: ["Parmigianino - Madonna col collo lungo - Google Art Project.jpg", "Madonna col collo lungo, parmigianino, 1535-40 ca. 01.jpg"], cerca: "Parmigianino Madonna Long Neck", claus: ["parmigianino"] },

  // ── Pintura flamenca, francesa, espanyola i del nord (15) ──
  { slug: "retaule-gant", fitxers: ["Lamgods open.jpg", "Ghent Altarpiece open.jpg"] },
  { slug: "home-turbant", fitxers: ["Portrait of a Man by Jan Van Eyck-small.jpg", "Portrait of a Man in a Turban.jpg", "Portrait of a Man (Self Portrait?) by Jan van Eyck.jpg"], cerca: "Jan van Eyck Portrait Man Turban National Gallery", claus: ["eyck"] },
  { slug: "matrimoni-arnolfini", fitxers: ["Van Eyck - Arnolfini Portrait.jpg"] },
  { slug: "descens-creu", fitxers: ["Weyden Descent from the Cross.jpg", "Roger van der Weyden - The Descent from the Cross.jpg"] },
  { slug: "diptic-melun", fitxers: ["Jean Fouquet - Virgin and Child Surrounded by Angels - WGA08020.jpg", "Fouquet Madonna Melun.jpg", "Jean Fouquet - Diptych de Melun.jpg"], cerca: "Jean Fouquet Melun diptych Madonna", claus: ["fouquet"] },
  { slug: "jardi-delicies", fitxers: ["The Garden of earthly delights.jpg"] },
  { slug: "autoretrat-durer-1498", fitxers: ["Albrecht Dürer - 1498 self-portrait (High resolution and detail).jpg", "Selbstporträt, 1498, Museo del Prado.jpg", "Albrecht Dürer - Self-Portrait (1498) - WGA7002.jpg"], cerca: "Dürer Self-Portrait 1498 Prado", claus: ["d", "rer"] },
  { slug: "autoretrat-durer-1500", fitxers: ["Albrecht Dürer - Self-Portrait at 28 (1500) - WGA7011.jpg", "Selbstporträt im Pelzrock.jpg", "Albrecht Dürer - 1500 self-portrait (High resolution and detail).jpg"], cerca: "Dürer self-portrait 1500 Munich", claus: ["d", "rer"] },
  { slug: "retrat-francesc-i", fitxers: ["Jean Clouet - Portrait of François Ier - WGA05137.jpg", "Jean Clouet 002.jpg", "Portrait of Francis I of France, Jean Clouet.jpg"], cerca: "Jean Clouet Portrait Francis I Louvre", claus: ["clouet"] },
  { slug: "ambaixadors", fitxers: ["Hans Holbein the Younger - The Ambassadors - Google Art Project.jpg"] },
  { slug: "torre-babel", fitxers: ["Pieter Bruegel the Elder - The Tower of Babel (Vienna) - Google Art Project.jpg"] },
  { slug: "cacadors-neu", fitxers: ["Pieter Bruegel the Elder - Hunters in the Snow (Winter) - Google Art Project.jpg"] },
  { slug: "cavaller-ma-pit", fitxers: ["El caballero de la mano en el pecho (El Greco).jpg", "El caballero de la mano al pecho.jpg", "El Greco - The Nobleman with his Hand on his Chest.jpg"], cerca: "El Greco Nobleman Hand on his Chest Prado", claus: ["greco"] },
  { slug: "enterrament-orgaz", fitxers: ["El Greco - The Burial of the Count of Orgaz.JPG", "Entierro del Conde de Orgaz.jpg", "El Entierro del Conde de Orgaz, El Greco.jpg"], cerca: "El Greco Burial Count Orgaz Toledo", claus: ["greco"] },
  { slug: "vista-toledo", fitxers: ["El Greco View of Toledo.jpg", "El Greco - View of Toledo.jpg"] },

  // ── Escultura (15) ──
  { slug: "sant-jordi-donatello", fitxers: ["Donatello, San Giorgio.jpg", "Donatello St George.jpg", "Donatello, san giorgio, 1416-17 circa, 01.jpg"], cerca: "Donatello St George Bargello marble", claus: ["donatello"] },
  { slug: "portes-paradis", fitxers: ["Porte del Paradiso 2009 (003).jpg", "Lorenzo Ghiberti - Gates of Paradise.jpg", "Porte del paradiso (copy) florence.jpg"], cerca: "Gates of Paradise Ghiberti Florence Baptistery", claus: ["paradiso"] },
  { slug: "david-bronze-donatello", fitxers: ["Donatello, David.jpg", "Donatello David 2.jpg"] },
  { slug: "gattamelata", fitxers: ["Gattamelata (donatello).jpg", "Donatello 043.jpg", "Equestrian statue of Gattamelata - front right.jpg"], cerca: "Donatello Gattamelata equestrian Padua", claus: ["gattamelata"] },
  { slug: "magdalena-penitent", fitxers: ["Mary Magdalene, Donatello.jpg", "Donatello, maddalena.jpg", "Donatello Maddalena penitente.jpg"], cerca: "Donatello Penitent Magdalene wood", claus: ["donatello"] },
  { slug: "pietat-vaticana", fitxers: ["Michelangelo's Pieta 5450 cropncleaned edit.jpg", "Michelangelo's Pieta 5450.jpg"] },
  { slug: "david-marbre", fitxers: ["Michelangelo's David 2015.jpg", "'David' by Michelangelo JBU0001.JPG", "David von Michelangelo.jpg"] },
  { slug: "moises", fitxers: ["Moses by Michelangelo.jpg", "Michelangelo's Moses.jpg", "Moises de Miguel Angel.jpg"] },
  { slug: "sacrifici-isaac-berruguete", fitxers: ["Alonso Berruguete - El sacrificio de Isaac.jpg", "Berruguete sacrificio Isaac.jpg"], cerca: "Berruguete Sacrificio de Isaac Valladolid", claus: ["berruguete"] },
  { slug: "perseu-cellini", fitxers: ["Perseus Cellini Loggia dei Lanzi n2.jpg", "Cellini Perseus.jpg", "Perseo con la testa di Medusa (Cellini).jpg"] },
  { slug: "rapte-sabines", fitxers: ["Rape of Sabine Women, by Giambologna, from Loggia dei Lanzi, Firenze - overall.jpg", "Giambologna Rape of the Sabine Women.jpg", "Ratto delle sabine.jpg"], cerca: "Giambologna Rape of the Sabines Florence", claus: ["giambologna"] },
  { slug: "colleoni", fitxers: ["Verrocchio - Colleoni.jpg", "Verrocchio Bartolomeo Colleoni.jpg", "Andrea del Verrocchio - Bartolomeo Colleoni - WGA25769.jpg"], cerca: "Verrocchio Colleoni equestrian Venice", claus: ["verrocchio"] },
  { slug: "bacus", fitxers: ["Michelangelos Bacchus.jpg", "Bacchus by Michelangelo.jpg", "Michelangelo, bacco.jpg"] },
  { slug: "hercules-anteu", fitxers: ["Antonio del Pollaiolo Ercole e Anteo.jpg", "Pollaiuolo Hercules and Antaeus.jpg", "Ercole e Anteo, pollaiolo, 01.jpg"], cerca: "Pollaiuolo Hercules Antaeus bronze Bargello", claus: ["pollai"] },
  { slug: "sant-joan-desiderio", fitxers: ["Desiderio da Settignano - St. John the Baptist.jpg", "Desiderio da Settignano, giovanni battista.jpg"], cerca: "Desiderio da Settignano Saint John Baptist Bargello", claus: ["desiderio"] },

  // ── Arquitectura (14) ──
  { slug: "cupula-fiore", fitxers: ["Florence Duomo from Michelangelo hill.jpg", "Duomo Firenze Apr 2008-1.jpg", "Cupola del Duomo di Firenze.jpg"], cerca: "Brunelleschi dome Florence Cathedral", claus: ["duomo"] },
  { slug: "hospital-innocents", fitxers: ["Ospedale degli Innocenti (Florence).jpg", "Brunelleschi Ospedale degli Innocenti.jpg", "Ospedale degli Innocenti, facciata.jpg"], cerca: "Ospedale degli Innocenti loggia Brunelleschi", claus: ["innocenti"] },
  { slug: "facade-santa-maria-novella", fitxers: ["Santa Maria Novella facade.jpg", "SMN facciata.jpg", "Santa Maria Novella (Firenze) - facciata.jpg"], cerca: "Santa Maria Novella facade Alberti", claus: ["novella"] },
  { slug: "palau-rucellai", fitxers: ["Palazzo rucellai.jpg", "Palazzo Rucellai (Florence).jpg", "Firenze - Palazzo Rucellai.jpg"], cerca: "Palazzo Rucellai facade Florence", claus: ["rucellai"] },
  { slug: "sant-andreu-mantua", fitxers: ["Sant'Andrea (Mantua) facade.jpg", "Mantova Sant'Andrea.jpg", "Basilica di Sant'Andrea (Mantua).jpg"], cerca: "Sant'Andrea Mantua facade Alberti", claus: ["andrea"] },
  { slug: "templet-montorio", fitxers: ["Tempietto del Bramante (Rome).jpg", "Il Tempietto del Bramante.jpg", "Tempietto del Bramante 01.jpg"], cerca: "Tempietto Bramante San Pietro in Montorio", claus: ["tempietto"] },
  { slug: "basilica-sant-pere", fitxers: ["St Peter's Basilica from Castel Sant'Angelo, Rome.jpg", "StPetersBasilicaDay.jpg", "Rome, St. Peter's Basilica.jpg"], cerca: "St Peter's Basilica dome exterior Rome", claus: ["peter"] },
  { slug: "placa-capitoli", fitxers: ["Piazza del Campidoglio Roma.jpg", "Campidoglio, Roma.jpg", "Piazza del Campidoglio (Rome).jpg"], cerca: "Piazza del Campidoglio Michelangelo Rome", claus: ["campidoglio"] },
  { slug: "rotonda", fitxers: ["Villa Rotonda front.jpg", "La Rotonda (Vicenza).jpg", "Villa Capra La Rotonda.jpg"] },
  { slug: "universitat-salamanca", fitxers: ["Fachada de la Universidad de Salamanca.jpg", "Universidad de Salamanca fachada plateresca.jpg", "ES-salamanca-1.jpg"], cerca: "University of Salamanca facade plateresque", claus: ["salamanca"] },
  { slug: "palau-carles-v", fitxers: ["Palacio de Carlos V (Granada).jpg", "Palace of Charles V Granada.jpg", "Palacio de Carlos V, Alhambra.jpg"], cerca: "Palace of Charles V Granada Alhambra", claus: ["carlos"] },
  { slug: "escorial", fitxers: ["San Lorenzo de El Escorial 02.jpg", "Monasterio El Escorial.jpg", "El Escorial - panoramio.jpg"], cerca: "El Escorial monastery facade", claus: ["escorial"] },
  { slug: "chambord", fitxers: ["Chambord wide 2004.jpg", "Château de Chambord 2004.jpg", "Chambord castle.jpg"], cerca: "Château de Chambord castle France", claus: ["chambord"] },
  { slug: "fontainebleau", fitxers: ["Fontainebleau chateau cour henri IV.jpg", "Château de Fontainebleau 02.jpg", "Palace of Fontainebleau.jpg"], cerca: "Palace Fontainebleau facade", claus: ["fontainebleau"] },
];

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
}

// Bun fetch rep 403 de Wikimedia; curl passa el filtre d'UA.
let darreraPeticio = 0;
function httpGet(url: string): string {
  const { execSync } = require("child_process");
  let ultimError = "";
  for (let intent = 1; intent <= 5; intent++) {
    try {
      // Cadència: mínim 2 s entre peticions (etiqueta de l'API de Wikimedia)
      const ara = Date.now();
      if (ara - darreraPeticio < 2000) execSync(`sleep ${Math.ceil((2000 - (ara - darreraPeticio)) / 1000)}`);
      darreraPeticio = Date.now();
      const sortida = execSync(
        `curl -s -w "\\n__HTTP__%{http_code}" --max-time 30 -A "RenaixementWeb/1.0 (educational project)" ${JSON.stringify(url)}`,
        { maxBuffer: 20 * 1024 * 1024 },
      ).toString();
      darreraPeticio = Date.now();
      const marca = sortida.lastIndexOf("\n__HTTP__");
      const codi = sortida.slice(marca + 9).trim();
      const cos = sortida.slice(0, marca);
      if (codi === "200" && cos.startsWith("{")) return cos;
      ultimError = "HTTP " + codi + " · " + cos.slice(0, 120).replace(/\s+/g, " ");
    } catch (e: any) {
      ultimError = String(e?.message ?? e).slice(0, 150);
    }
    execSync(`sleep ${intent * 3}`);
  }
  throw new Error("httpGet falla (" + url + "): " + ultimError);
}

async function queryInfo(titles: string[]): Promise<Map<string, any>> {
  const out = new Map<string, any>();
  for (let i = 0; i < titles.length; i += 20) {
    const lot = titles.slice(i, i + 20);
    const url = API + "?action=query&format=json&prop=imageinfo&iiprop=size%7Cextmetadata&titles=" +
      encodeURIComponent(lot.map(t => "File:" + t).join("|"));
    const json: any = JSON.parse(httpGet(url));
    const pages = json?.query?.pages ?? {};
    for (const k of Object.keys(pages)) {
      const p = pages[k];
      if (p.imageinfo && p.imageinfo[0]) {
        const ii = p.imageinfo[0];
        const title = p.title.replace(/^File:/, "");
        const md = ii.extmetadata ?? {};
        out.set(title, {
          w: ii.width, h: ii.height,
          llicencia: md.LicenseShortName?.value ?? "Vegeu Commons",
          autor: stripHtml(md.Artist?.value ?? ""),
        });
      }
    }
  }
  return out;
}

async function search(q: string, limit = 10): Promise<string[]> {
  const url = API + "?action=query&format=json&list=search&srnamespace=6&srlimit=" + limit + "&srsearch=" + encodeURIComponent(q);
  const json: any = JSON.parse(httpGet(url));
  return (json?.query?.search ?? []).map((s: any) => s.title.replace(/^File:/, ""));
}

async function main() {
  const resultat: Record<string, any> = {};
  const falles: string[] = [];

  const totsCandidats: string[] = [];
  for (const o of OBRAS) for (const f of o.fitxers) totsCandidats.push(f);
  const info = await queryInfo(totsCandidats);

  for (const o of OBRAS) {
    let trobat: { file: string; dades: any } | null = null;
    for (const f of o.fitxers) {
      if (info.has(f)) { trobat = { file: f, dades: info.get(f) }; break; }
    }
    if (!trobat && o.cerca) {
      const candidatsCerca = await search(o.cerca);
      const claus = (o.claus ?? []).map(c => c.toLowerCase());
      for (const c of candidatsCerca) {
        const baix = c.toLowerCase();
        const doc = claus.length === 0 || claus.every(k => baix.includes(k));
        const noVideo = !/\.(pdf|tif|tiff|ogv|webm)$/i.test(c);
        if (doc && noVideo) {
          const d = await queryInfo([c]);
          if (d.has(c)) { trobat = { file: c, dades: d.get(c) }; break; }
        }
      }
    }
    if (trobat) {
      resultat[o.slug] = {
        fitxer: trobat.file,
        amplada: trobat.dades.w,
        alcada: trobat.dades.h,
        llicencia: trobat.dades.llicencia,
        autor_foto: trobat.dades.autor,
      };
    } else {
      falles.push(o.slug);
    }
  }

  const fs = await import("fs");
  fs.writeFileSync("/home/z/my-project/src/data/imatges.json", JSON.stringify(resultat, null, 2));
  console.log("Resoltes: " + Object.keys(resultat).length + " / " + OBRAS.length);
  if (falles.length) { console.log("FALLEN: " + falles.join(", ")); process.exit(2); }
}

main().catch(e => { console.error(e); process.exit(1); });
