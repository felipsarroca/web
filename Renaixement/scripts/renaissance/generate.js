// generate.js — Assemblatge del document: portada R1 + índex (romans) + cos (aràbiga)
"use strict";

const {
  Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber,
  AlignmentType, HeadingLevel, NumberFormat, SectionType, LevelFormat,
  TableOfContents, PageOrientation,
} = require("docx");
const fs = require("fs");
const path = require("path");

const H = require("./helpers.js");
const content = [
  ...require("./content-part1.js"),
  ...require("./content-part2.js"),
  ...require("./content-part3.js"),
  ...require("./content-part4.js"),
  ...require("./content-part5.js"),
];

const OUT = "/home/z/my-project/download/Programacio_web_Renaixement.docx";
const DOC_TITLE = "Web de referència del Renaixement";
const DOC_SUBTITLE = "Programació de continguts, estructura i disseny";

// ── Pàgina i marges estàndard ──
const pgSize = { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

// ── Peu de pàgina (només número, sense denominador) ──
function pageNumFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: 312 },
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080", font: H.F_BODY })],
    })],
  });
}

// ── Capçalera del cos ──
function bodyHeader() {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: 312 },
      children: [new TextRun({
        text: "Web de referència del Renaixement · Programació de continguts",
        size: 18, color: "888888", font: H.F_BODY,
      })],
    })],
  });
}

// ── Secció d'índex ──
function frontMatterChildren() {
  return [
    // Títol de l'índex — SENSE HeadingLevel (evita autoindexació)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 480, after: 360, line: 312 },
      children: [new TextRun({ text: "Índex", bold: true, size: 32, color: H.PRIMARY, font: H.F_HEAD })],
    }),
    // Camp TOC real
    new TableOfContents("Índex", { hyperlink: true, headingStyleRange: "1-3" }),
    // Nota d'actualització (obligatòria)
    new Paragraph({
      spacing: { before: 200, line: 312 },
      children: [new TextRun({
        text: "Nota: aquest índex es genera mitjançant camps. Per garantir l'exactitud dels números de pàgina després d'editar el document, feu clic dret sobre l'índex i trieu «Actualitza els camps».",
        italics: true, size: 18, color: "888888", font: H.F_BODY,
      })],
    }),
    // Sense PageBreak final: la ruptura de secció NEXT_PAGE ja separa índex i cos
  ];
}

// ── Configuració de la portada (R1 + GO-1) ──
const coverConfig = {
  title: DOC_TITLE,
  titleLinesOverride: ["Web de referència", "del Renaixement"],
  subtitle: DOC_SUBTITLE,
  englishLabel: "RENAISSANCE WEB PROJECT",
  metaLines: [
    "Document de programació prèvia al desenvolupament",
    "Audiència: Batxillerat i ESO · Idioma: català",
    "Fase 1: 68 obres · 24 artistes · 12 conceptes",
    "Versió 1.0 · Octubre de 2026",
  ],
  footerLeft: "Projecte Renaixement · Document de treball",
  footerRight: "v1.0 · 2026",
  palette: {
    bg: H.GO1.bg, accent: H.GO1.accent,
    cover: H.GO1.cover,
  },
};

// ── Document ──
const doc = new Document({
  creator: "Projecte Renaixement",
  title: DOC_TITLE + " — " + DOC_SUBTITLE,
  description: "Programació de continguts i plànol mestre de la web de referència del Renaixement",
  styles: {
    default: {
      document: {
        run: { font: H.F_BODY, size: 24, color: H.BODY },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: H.F_HEAD, size: 32, bold: true, color: H.PRIMARY },
        paragraph: { spacing: { before: 360, after: 160, line: 312 } },
      },
      heading2: {
        run: { font: H.F_HEAD, size: 30, bold: true, color: H.PRIMARY },
        paragraph: { spacing: { before: 240, after: 120, line: 312 } },
      },
      heading3: {
        run: { font: H.F_HEAD, size: 26, bold: true, color: H.PRIMARY },
        paragraph: { spacing: { before: 200, after: 100, line: 312 } },
      },
    },
  },
  numbering: {
    config: [
      {
        reference: "num-principis",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "num-checklist",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  sections: [
    // ── Secció 1: PORTADA (marges 0, sense folre ni capçalera, sense pageNumbers) ──
    {
      properties: {
        page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } },
      },
      children: H.buildCoverR1(coverConfig),
    },
    // ── Secció 2: ÍNDEX (romans I, II, ...) ──
    {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          size: pgSize, margin: pgMargin,
          pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN },
        },
      },
      footers: { default: pageNumFooter() },
      children: frontMatterChildren(),
    },
    // ── Secció 3: COS (aràbiga des de 1) ──
    {
      properties: {
        type: SectionType.NEXT_PAGE,
        page: {
          size: pgSize, margin: pgMargin,
          pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
        },
      },
      headers: { default: bodyHeader() },
      footers: { default: pageNumFooter() },
      children: H.render(content),
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, buf);
  console.log("OK — generat:", OUT, "(" + Math.round(buf.length / 1024) + " KB)");
}).catch((e) => {
  console.error("ERROR de generació:", e.message);
  process.exit(1);
});
