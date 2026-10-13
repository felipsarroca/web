// fonts.ts — Font de contingut per a cada fitxa (directriu «qualitat del contingut»).
// Dues fonts per fitxa com a mínim: la institució on és l'obra (font museu) i una
// bibliografia de referència real per artista. Les fonts de tradició (Vasari, Condivi,
// Cellini) s'han de marcar sempre com a «font tradicional»: són biografies de l'època,
// útils però no documentació neutra, i cal contrastar-les.
// Tots els títols citats són publicacions reals; la validació de slugs és a tests.

import { obra } from "./obres";

export interface FontFitxa {
  tipus: "museu" | "bibliografia" | "font-tradicional";
  text: string;
  /** Nota editorial sobre l'ús de la font (p. ex. advertència sobre la tradició vasariana). */
  nota?: string;
  url?: string;
}

const GENERIC: FontFitxa[] = [
  {
    tipus: "bibliografia",
    text: "E. H. Gombrich, «La història de l'art» (Phaidon, 1950; ed. catalana revisada).",
    nota: "Introducció general de referència: marc ampliat, no anàlisi monogràfica.",
  },
];

const BIBLIOGRAFIA: Record<string, FontFitxa[]> = {
  masaccio: [
    { tipus: "bibliografia", text: "J. Poeschke, «Masaccio: Frescoes, Fragments, Paintings» (Hirmer, 2002)." },
    { tipus: "bibliografia", text: "M. Baxandall, «Painting and Experience in Fifteenth-Century Italy» (Oxford UP, 1972)." },
    { tipus: "font-tradicional", text: "G. Vasari, «Le Vite» (1550/1568), vida de Masaccio.", nota: "Tradició biogràfica del Renaixement: contrastar amb la documentació." },
  ],
  botticelli: [
    { tipus: "bibliografia", text: "R. Lightbown, «Sandro Botticelli: Life and Work» (Thames & Hudson, 1978)." },
    { tipus: "font-tradicional", text: "G. Vasari, «Le Vite» (1550/1568), vida de Botticelli.", nota: "Tradició vasariana: útil, però amb prejudicis de moral i gust del segle XVI." },
  ],
  leonardo: [
    { tipus: "bibliografia", text: "M. Kemp, «Leonardo da Vinci: The Marvellous Works of Nature and Man» (Dent, 1981)." },
    { tipus: "bibliografia", text: "K. Clark, «Leonardo da Vinci» (Penguin, 1939; ed. revisada 1988)." },
    { tipus: "font-tradicional", text: "G. Vasari, «Le Vite» (1550/1568), vida de Leonardo.", nota: "Tradició biogràfica: llegenda dorada inclosa." },
  ],
  rafael: [
    { tipus: "bibliografia", text: "J. Pope-Hennessy, «Raphael» (Phaidon, 1970)." },
    { tipus: "font-tradicional", text: "G. Vasari, «Le Vite» (1550/1568), vida de Rafael.", nota: "Tradició biogràfica del Renaixement." },
  ],
  "miquel-angel": [
    { tipus: "bibliografia", text: "R. Wittkower, «Sculpture: Processes and Principles» (Harper & Row, 1977)." },
    { tipus: "font-tradicional", text: "A. Condivi, «Vita di Michelagnolo Buonarroti» (1553).", nota: "Biografia sota control del mateix Miquel Àngel: propagandística en part." },
    { tipus: "font-tradicional", text: "G. Vasari, «Le Vite» (1550/1568), vida de Buonarroti.", nota: "Tradició biogràfica; Vasari l'apadrinava i exalta el seu mite." },
  ],
  donatello: [
    { tipus: "bibliografia", text: "H. W. Janson, «The Sculpture of Donatello» (Princeton UP, 1957)." },
    { tipus: "bibliografia", text: "J. Pope-Hennessy, «Donatello» (Phaidon, ed. revisada 1993)." },
    { tipus: "font-tradicional", text: "G. Vasari, «Le Vite» (1550/1568), vida de Donatello.", nota: "Tradició biogràfica del Renaixement." },
  ],
  "van-eyck": [
    { tipus: "bibliografia", text: "E. Panofsky, «Early Netherlandish Painting» (Harvard UP, 1953)." },
    { tipus: "bibliografia", text: "C. Harbison, «Jan van Eyck: The Play of Realism» (Reaktion, 1991)." },
  ],
  "van-der-weyden": [
    { tipus: "bibliografia", text: "L. Campbell i J. Van der Stock, «Rogier van der Weyden 1400-1464» (Brepols, 2009)." },
  ],
  bruegel: [
    { tipus: "bibliografia", text: "R. H. Marijnissen, «Bruegel» (Alpha, 1984)." },
    { tipus: "bibliografia", text: "W. Gibson, «Bruegel» (Thames & Hudson, 1977)." },
  ],
  durer: [
    { tipus: "bibliografia", text: "E. Panofsky, «The Life and Art of Albrecht Dürer» (Princeton UP, 1943)." },
  ],
  holbein: [
    { tipus: "bibliografia", text: "O. Bätschmann i P. Griener, «Hans Holbein» (Reaktion, 1997)." },
  ],
  bosch: [
    { tipus: "bibliografia", text: "W. Gibson, «Hieronymus Bosch» (Thames & Hudson, 1973)." },
  ],
  fouquet: [
    { tipus: "bibliografia", text: "F. Avril i N. Reynaud, «Les manuscrits à peintures en France 1440-1520» (Flammarion, 1993)." },
  ],
  clouet: [
    { tipus: "bibliografia", text: "A. Chastel, «French Art: The Renaissance» (Flammarion, 1995)." },
  ],
  titia: [
    { tipus: "bibliografia", text: "H. E. Wethey, «The Paintings of Titian» (Phaidon, 1969-1975, 3 vols.)." },
    { tipus: "bibliografia", text: "C. Hope i J. Fletcher (eds.), «Titian» (National Gallery, 2003)." },
  ],
  verones: [
    { tipus: "bibliografia", text: "W. R. Rearick, «The Art of Paolo Veronese 1528-1588» (Cambridge UP, 1988)." },
  ],
  parmigianino: [
    { tipus: "bibliografia", text: "S. J. Freedberg, «Parmigianino: His Works in Painting» (Harvard UP, 1950)." },
  ],
  verrocchio: [
    { tipus: "bibliografia", text: "A. Butterfield, «The Sculptures of Andrea del Verrocchio» (Yale UP, 1997)." },
  ],
  pollaiuolo: [
    { tipus: "bibliografia", text: "A. Wright, «The Pollaiuolo Brothers: The Arts of Florence and Rome» (Yale UP, 2005)." },
  ],
  mantegna: [
    { tipus: "bibliografia", text: "R. Lightbown, «Mantegna» (Phaidon, 1986)." },
  ],
  "piero-della-francesca": [
    { tipus: "bibliografia", text: "J. V. Field, «Piero della Francesca: A Mathematician's Art» (Yale UP, 2005)." },
    { tipus: "bibliografia", text: "M. Lavin, «Piero della Francesca» (Phaidon, 2002)." },
  ],
  ghiberti: [
    { tipus: "bibliografia", text: "R. Krautheimer i T. Krautheimer-Hess, «Lorenzo Ghiberti» (Princeton UP, 1956)." },
  ],
  desiderio: [
    { tipus: "bibliografia", text: "J. Pope-Hennessy, «Italian Renaissance Sculpture» (Phaidon, 1958; ed. revisada)." },
  ],
  cellini: [
    { tipus: "font-tradicional", text: "B. Cellini, «La Vita» (escrita 1558-1563, ed. 1728).", nota: "Autobiografia complida per l'artista: font viva però parcial." },
    { tipus: "bibliografia", text: "J. Pope-Hennessy, «Cellini» (Macmillan, 1985)." },
  ],
  giambologna: [
    { tipus: "bibliografia", text: "C. Avery, «Giambologna: The Complete Sculpture» (Phaidon, 1987)." },
  ],
  brunelleschi: [
    { tipus: "bibliografia", text: "H. Saalman, «Filippo Brunelleschi: The Buildings» (Pennsylvania State UP, 1993)." },
    { tipus: "bibliografia", text: "R. King, «Brunelleschi's Dome» (Bloomsbury, 2000).", nota: "Divulgació: bona porta d'entrada, contrastar les xifres amb Saalman." },
  ],
  alberti: [
    { tipus: "font-tradicional", text: "L. B. Alberti, «De re aedificatoria» (1452, impr. 1485).", nota: "Font primària teòrica: el tractat que codifica el vocabulari." },
    { tipus: "bibliografia", text: "R. Tavernor, «On Alberti and the Art of Building» (Yale UP, 1998)." },
  ],
  bramante: [
    { tipus: "bibliografia", text: "A. Bruschi, «Bramante» (Laterza, 1973)." },
  ],
  palladio: [
    { tipus: "font-tradicional", text: "A. Palladio, «I quattro libri dell'architettura» (1570).", nota: "Font primària: els gravats codifiquen el sistema, no sempre la obra construïda." },
    { tipus: "bibliografia", text: "J. Ackerman, «Palladio» (Penguin, 1966)." },
  ],
  machuca: [
    { tipus: "bibliografia", text: "F. Checa, «Pintura y escultura del Renacimiento en España 1450-1600» (Cátedra, 1983)." },
  ],
  berruguete: [
    { tipus: "bibliografia", text: "F. Checa, «Pintura y escultura del Renacimiento en España 1450-1600» (Cátedra, 1983)." },
  ],
  herrera: [
    { tipus: "bibliografia", text: "F. Marías, «El largo siglo XVI: los usos artísticos del renacimiento español» (Taurus, 1989)." },
  ],
  "el-greco": [
    { tipus: "bibliografia", text: "J. Brown (ed.), «El Greco of Toledo» (Little, Brown, 1982)." },
  ],
  anonim: [
    { tipus: "bibliografia", text: "E. H. Gombrich, «La història de l'art» (Phaidon, 1950; ed. catalana revisada)." },
  ],
};

/** Fonts editorials d'una fitxa: museu (ubicació) + bibliografia per artista. */
export function fontsDe(slug: string): FontFitxa[] {
  const o = obra(slug);
  if (!o) return [];
  const fonts: FontFitxa[] = [
    {
      tipus: "museu",
      text: `${o.ubicacio.museu}, ${o.ubicacio.ciutat} (${o.ubicacio.pais}): ubicació actual de l'obra.`,
      url: o.ubicacio.url,
    },
  ];
  fonts.push(...(BIBLIOGRAFIA[o.autorSlug] ?? GENERIC));
  return fonts;
}
