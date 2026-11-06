// helpers.js — Builders, paleta i recepta de portada R1 (GO-1) adaptada a text llatí
// Document: "Web de referència del Renaixement" — programació de continguts
"use strict";

const {
  Paragraph, TextRun, Table, TableRow, TableCell, TableLayoutType,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
} = require("docx");

// ── Paleta GO-1 (Graphite Orange) — tokens de cover + taula (design-system.md) ──
const GO1 = {
  bg: "1A2330", accent: "D4875A",
  cover: { titleColor: "FFFFFF", subtitleColor: "B0B8C0", metaColor: "90989F", footerColor: "687078" },
  table: { headerBg: "D4875A", headerText: "FFFFFF", accentLine: "D4875A", innerLine: "DDD0C8", surface: "F8F0EB" },
};
const PRIMARY = "1A2330"; // encapçalaments i text destacat
const BODY = "000000";    // perfil A formal: negre pur
const GRAY = "808080";

// ── Fonts (text llatí: ascii + hAnsi imprescindibles per a accents catalans) ──
const F_BODY = { ascii: "Times New Roman", hAnsi: "Times New Roman", eastAsia: "Times New Roman" };
const F_HEAD = { ascii: "Times New Roman", hAnsi: "Times New Roman", eastAsia: "Times New Roman" };
const F_MONO = { ascii: "Courier New", hAnsi: "Courier New", eastAsia: "Courier New" };

// ── Vores ──
const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

// ── Parser de negrites inline: "text **bold** text" → TextRuns ──
function runs(text, opts = {}) {
  const out = [];
  const parts = String(text).split("**");
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "") continue;
    out.push(new TextRun({
      text: parts[i], bold: i % 2 === 1 ? true : (opts.bold || false),
      italics: opts.italics || false,
      size: opts.size || 24, color: opts.color || BODY, font: opts.font || F_BODY,
    }));
  }
  if (out.length === 0) out.push(new TextRun({ text: "", size: opts.size || 24, color: opts.color || BODY, font: opts.font || F_BODY }));
  return out;
}

// ── Paràgraf de cos (llatí: alineat a l'esquerra, sense sagnat, 1,3x) ──
function para(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 312, after: opts.after !== undefined ? opts.after : 120 },
    keepNext: opts.keepNext || false,
    children: runs(text, opts),
  });
}

// ── Encapçalaments (Heading real — obligatori per al TOC) ──
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, keepNext: true,
    spacing: { before: 360, after: 160, line: 312 },
    children: [new TextRun({ text, bold: true, size: 32, color: PRIMARY, font: F_HEAD })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2, keepNext: true,
    spacing: { before: 240, after: 120, line: 312 },
    children: [new TextRun({ text, bold: true, size: 30, color: PRIMARY, font: F_HEAD })],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3, keepNext: true,
    spacing: { before: 200, after: 100, line: 312 },
    children: [new TextRun({ text, bold: true, size: 26, color: PRIMARY, font: F_HEAD })],
  });
}

// ── Llistes (alineació esquerra, un element per línia) ──
function bullets(items) {
  return items.map((t) => new Paragraph({
    alignment: AlignmentType.LEFT, bullet: { level: 0 },
    spacing: { line: 312, after: 60 },
    children: runs(t),
  }));
}
function numbered(items, ref) {
  return items.map((t) => new Paragraph({
    alignment: AlignmentType.LEFT, numbering: { reference: ref, level: 0 },
    spacing: { line: 312, after: 60 },
    children: runs(t),
  }));
}

// ── Destacat pedagògic ("PER QUÈ ÉS RELLEVANT") — fons suau + vora esquerra terracota ──
function callout(label, text) {
  const shade = { type: ShadingType.CLEAR, fill: GO1.table.surface };
  const bar = { style: BorderStyle.SINGLE, size: 16, color: GO1.accent, space: 10 };
  return [
    new Paragraph({
      alignment: AlignmentType.LEFT, shading: shade,
      border: { left: bar }, keepNext: true,
      indent: { left: 200, right: 200 }, spacing: { before: 160, after: 0, line: 312 },
      children: [new TextRun({ text: label, bold: true, size: 20, color: "8A5A38", font: F_HEAD })],
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT, shading: shade,
      border: { left: bar },
      indent: { left: 200, right: 200 }, spacing: { after: 200, line: 312 },
      children: runs(text, { size: 22 }),
    }),
  ];
}

// ── Bloc de prompt (Courier New, fons suau, vora esquerra grafit) ──
function promptBox(lines) {
  const shade = { type: ShadingType.CLEAR, fill: "F2F4F7" };
  const bar = { style: BorderStyle.SINGLE, size: 16, color: PRIMARY, space: 10 };
  return lines.map((ln, i) => new Paragraph({
    alignment: AlignmentType.LEFT, shading: shade, border: { left: bar },
    indent: { left: 200, right: 200 },
    spacing: { before: i === 0 ? 160 : 0, after: i === lines.length - 1 ? 200 : 20, line: 312 },
    children: [new TextRun({ text: ln === "" ? " " : ln, size: 19, color: PRIMARY, font: F_MONO })],
  }));
}

// ── Taula Horizontal-Only (GO-1) amb zebra suau ──
// spec: { caption, headers[], rows[][], widths[], intro?, after? }
function table(spec, counter) {
  const els = [];
  if (spec.caption) {
    els.push(new Paragraph({
      keepNext: true, alignment: AlignmentType.LEFT,
      spacing: { before: 200, after: 80, line: 312 },
      children: [new TextRun({ text: spec.caption, bold: true, size: 21, color: PRIMARY, font: F_HEAD })],
    }));
  }
  const widths = spec.widths;
  const headerRow = new TableRow({
    tableHeader: true, cantSplit: true,
    children: spec.headers.map((htxt, i) => new TableCell({
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.CLEAR, fill: GO1.table.headerBg },
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [new Paragraph({
        alignment: AlignmentType.LEFT, spacing: { line: 312 },
        children: [new TextRun({ text: htxt, bold: true, size: 21, color: GO1.table.headerText, font: F_HEAD })],
      })],
    })),
  });
  const dataRows = spec.rows.map((r, ri) => new TableRow({
    cantSplit: true,
    children: r.map((cell, ci) => new TableCell({
      width: { size: widths[ci], type: WidthType.PERCENTAGE },
      shading: ri % 2 === 1 ? { type: ShadingType.CLEAR, fill: GO1.table.surface } : undefined,
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [new Paragraph({
        alignment: AlignmentType.LEFT, spacing: { line: 312 },
        children: runs(cell, { size: 21 }),
      })],
    })),
  }));
  els.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: GO1.table.accentLine },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: GO1.table.accentLine },
      left: NB, right: NB,
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: GO1.table.innerLine },
      insideVertical: NB,
    },
    rows: [headerRow, ...dataRows],
  }));
  if (spec.after) {
    els.push(new Paragraph({
      alignment: AlignmentType.LEFT, spacing: { before: 80, after: 160, line: 312 },
      children: runs(spec.after, { size: 21, color: "444444" }),
    }));
  }
  return els;
}

// ── Despatxador d'elements del DSL de contingut ──
function render(elements) {
  const out = [];
  for (const el of elements) {
    if (el.h1 !== undefined) out.push(h1(el.h1));
    else if (el.h2 !== undefined) out.push(h2(el.h2));
    else if (el.h3 !== undefined) out.push(h3(el.h3));
    else if (el.p !== undefined) out.push(para(el.p, el.opts || {}));
    else if (el.bullets !== undefined) out.push(...bullets(el.bullets));
    else if (el.numbered !== undefined) out.push(...numbered(el.numbered.items, el.numbered.ref));
    else if (el.callout !== undefined) out.push(...callout(el.callout.label, el.callout.text));
    else if (el.prompt !== undefined) out.push(...promptBox(el.prompt));
    else if (el.table !== undefined) out.push(...table(el.table));
    else throw new Error("Element de contingut desconegut: " + JSON.stringify(el).slice(0, 80));
  }
  return out;
}

// ── Amplada estimada de text llatí/CJK (twips) ──
function estimateTextWidth(text, pt) {
  let w = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    const isCJK = (code >= 0x4e00 && code <= 0x9fff) || (code >= 0x3000 && code <= 0x303f) || (code >= 0xff00 && code <= 0xffef);
    w += isCJK ? pt * 20 : pt * 11;
  }
  return w;
}

// ── calcTitleLayout (versió llatina: divisió per paraules, validació d'amplada) ──
function calcTitleLayout(title, maxWidthTwips, preferredPt = 40, minPt = 24, overrideLines = null) {
  if (overrideLines && overrideLines.length) {
    let pt = preferredPt;
    while (pt > minPt && overrideLines.some((ln) => estimateTextWidth(ln, pt) > maxWidthTwips)) pt -= 2;
    if (overrideLines.length <= 3 && overrideLines.every((ln) => estimateTextWidth(ln, pt) <= maxWidthTwips)) {
      return { titlePt: pt, titleLines: overrideLines };
    }
  }
  const words = title.split(/\s+/);
  const wrap = (pt) => {
    const lines = []; let cur = "";
    for (const w of words) {
      const cand = cur ? cur + " " + w : w;
      if (estimateTextWidth(cand, pt) <= maxWidthTwips) cur = cand;
      else { if (cur) lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
  };
  let titlePt = preferredPt, lines = wrap(titlePt);
  while (titlePt > minPt && (lines.length > 3 || lines.some((ln) => estimateTextWidth(ln, titlePt) > maxWidthTwips))) {
    titlePt -= 2; lines = wrap(titlePt);
  }
  // no orfe d'1-2 caràcters a l'última línia
  if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
    const last = lines.pop(); lines[lines.length - 1] += " " + last;
  }
  return { titlePt, titleLines: lines };
}

// ── calcCoverSpacing (còpia fidel del design-system.md) ──
function calcCoverSpacing(params) {
  const {
    titleLineCount = 1, titlePt = 36, hasSubtitle = false,
    hasEnglishLabel = false, metaLineCount = 0,
    fixedHeight = 800, pageHeight = 16838,
    marginTop = 0, marginBottom = 0,
  } = params;
  const SAFETY = 1200;
  const usableHeight = pageHeight - marginTop - marginBottom - SAFETY;
  const titleHeight = titleLineCount * (titlePt * 23 + 200);
  const subtitleHeight = hasSubtitle ? (12 * 23 + 600) : 0;
  const englishLabelHeight = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaHeight = metaLineCount * (10 * 23 + 100);
  const implicitParaHeight = 3 * 300;
  const contentHeight = titleHeight + subtitleHeight + englishLabelHeight + metaHeight + fixedHeight + implicitParaHeight;
  const remainingSpace = usableHeight - contentHeight;
  const safeRemaining = Math.max(remainingSpace, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(safeRemaining * 0.45);
  const rawBottom = Math.floor(safeRemaining * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  const midSpacing = Math.max(safeRemaining - topSpacing - bottomSpacing, 0);
  return { topSpacing, midSpacing, bottomSpacing };
}

// ── Recepta R1: Pure Paragraph Cover (esquerra) — zero taules niades ──
function buildCoverR1(config) {
  const P = config.palette;
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 40, 24, config.titleLinesOverride || null);
  const titleSize = titlePt * 2;
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length,
    fixedHeight: 400, marginTop: 0, marginBottom: 0,
  });
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: P.accent, space: 12 };
  const children = [];

  // 1. Espai superior dinàmic
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));

  // 2. Etiqueta superior amb vora inferior accent
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500, line: 312 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: P.accent, space: 8 } },
      children: [new TextRun({
        text: config.englishLabel.split("").join("  "),
        size: 18, color: P.accent, font: { ascii: "Calibri", hAnsi: "Calibri" }, characterSpacing: 40,
      })],
    }));
  }

  // 3. Títol (mida dinàmica + salts semàntics + line spacing explícit — Regla 8)
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({
        text: titleLines[i], size: titleSize, bold: true,
        color: P.cover.titleColor, font: { ascii: "Arial", hAnsi: "Arial" },
      })],
    }));
  }

  // 4. Subtítol
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL }, spacing: { after: 800, line: 312 },
      children: [new TextRun({
        text: config.subtitle, size: 24, color: P.cover.subtitleColor,
        font: { ascii: "Arial", hAnsi: "Arial" },
      })],
    }));
  }

  // 5. Línies meta amb vora esquerra accent
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80, line: 312 },
      border: { left: accentLeft },
      children: [new TextRun({
        text: line, size: 24, color: P.cover.metaColor,
        font: { ascii: "Arial", hAnsi: "Arial" },
      })],
    }));
  }

  // 6. Espai inferior dinàmic
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));

  // 7. Peu amb separador superior accent
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: P.accent, space: 8 } },
    spacing: { before: 200, line: 312 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: P.cover.footerColor, font: { ascii: "Arial", hAnsi: "Arial" } }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: P.cover.footerColor, font: { ascii: "Arial", hAnsi: "Arial" } }),
    ],
  }));

  // Embolcall únic 16838 exacte — l'ÚNICA taula de la portada
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.bg }, borders: noBorders,
        verticalAlign: "top",
        children,
      })],
    })],
  })];
}

module.exports = {
  GO1, PRIMARY, BODY, GRAY, F_BODY, F_HEAD, F_MONO, NB, noBorders, allNoBorders,
  runs, para, h1, h2, h3, bullets, numbered, callout, promptBox, table, render,
  calcTitleLayout, calcCoverSpacing, buildCoverR1,
};
