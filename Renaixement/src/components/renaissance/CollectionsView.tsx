// CollectionsView.tsx — Catàleg amb cerca en viu i filtres didàctics (audit P1):
//   - Cerca amb retard controlat, normalització d'accents, suggeriments i ressaltat
//   - Sincronització immediata del text amb l'URL (replaceState, sense spam d'historial)
//   - Presets («Quattrocento», «Pintura flamenca», «Perspectiva»…)
//   - Filtres agrupats amb recompte per opció (recompte exclusiu del context actual)
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SlidersHorizontal, X, Search, CornerDownLeft } from "lucide-react";
import { useApp, type FiltresURL } from "@/lib/renaissance/store";
import { filtraObres, normalitza, OBRES } from "@/data/obres";
import { ARTISTES } from "@/data/artistes";
import { CONCEPTES } from "@/data/conceptes";
import { ESCOLES } from "@/data/escoles";
import { ETIQUETES } from "@/data/types";
import type { Obra } from "@/data/types";
import WorkCard from "./WorkCard";

type Dimensio = keyof FiltresURL;

const DIMENSIONS: { clau: Dimensio; label: string; opcions: () => { valor: string; label: string }[] }[] = [
  {
    clau: "disciplina",
    label: "Disciplina",
    opcions: () => Object.entries(ETIQUETES.disciplina).map(([valor, label]) => ({ valor, label })),
  },
  {
    clau: "periode",
    label: "Període",
    opcions: () => Object.entries(ETIQUETES.periode).map(([valor, label]) => ({ valor, label })),
  },
  {
    clau: "ambit",
    label: "Àmbit",
    opcions: () => Object.entries(ETIQUETES.ambit).map(([valor, label]) => ({ valor, label })),
  },
  {
    clau: "artista",
    label: "Artista",
    opcions: () => ARTISTES.map((a) => ({ valor: a.slug, label: a.nom })).sort((a, b) => a.label.localeCompare(b.label, "ca")),
  },
  {
    clau: "concepte",
    label: "Concepte tècnic",
    opcions: () => CONCEPTES.map((c) => ({ valor: c.slug, label: c.nom })),
  },
  {
    clau: "escola",
    label: "Escola arquitectònica",
    opcions: () => ESCOLES.map((e) => ({ valor: e.slug, label: e.nom })),
  },
];

// Presets didàctics (audit: combinacions més útils a un clic)
const PRESETS: { label: string; filtres: FiltresURL }[] = [
  { label: "Quattrocento", filtres: { periode: "quattrocento" } },
  { label: "Pintura flamenca", filtres: { disciplina: "pintura", ambit: "flandes" } },
  { label: "Perspectiva", filtres: { concepte: "perspectiva-lineal" } },
  { label: "Miquel Àngel", filtres: { artista: "miquel-angel" } },
  { label: "Escultura", filtres: { disciplina: "escultura" } },
  { label: "Arquitectura espanyola", filtres: { disciplina: "arquitectura", ambit: "espanya" } },
];

/** Ressalta la coincidència (insensible a accents) dins del text original. */
function ressalta(text: string, consulta: string) {
  const nText = normalitza(text);
  const nQ = normalitza(consulta.trim());
  const idx = nQ ? nText.indexOf(nQ) : -1;
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[rgba(166,78,50,0.25)] text-tinta rounded-sm px-0.5">
        {text.slice(idx, idx + nQ.length)}
      </mark>
      {text.slice(idx + nQ.length)}
    </>
  );
}

interface Suggeriment {
  tipus: "obra" | "artista" | "concepte";
  label: string;
  sub: string;
  desti: string;
}

export default function CollectionsView() {
  const { filtres, setFiltres, navega } = useApp();
  const [text, setText] = useState(filtres.q ?? "");
  const [debounced, setDebounced] = useState(filtres.q ?? "");
  const [panellObert, setPanellObert] = useState(false);
  const [focusCerca, setFocusCerca] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ultimQRef = useRef(filtres.q ?? "");

  // Retard controlat de la cerca (audit: resultats mentre s'escriu)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(text), 200);
    return () => clearTimeout(t);
  }, [text]);

  // Puja el debounced a l'URL (evitant el bucle: només si difereix de l'URL actual)
  useEffect(() => {
    const q = debounced.trim() || undefined;
    if (q !== (filtres.q || undefined)) {
      setFiltres({ q });
    }
  }, [debounced, filtres.q, setFiltres]);
  // Sincronitza el text amb l'URL (botó endarrere / enllaç compartit):
  // ajust d'estat durant el render (patró React recomanat per a estats derivats de props)
  const [prevQ, setPrevQ] = useState<string | undefined>(filtres.q);
  if (prevQ !== filtres.q) {
    setPrevQ(filtres.q);
    setText(filtres.q ?? "");
    setDebounced(filtres.q ?? "");
  }

  const resultats = useMemo(
    () => filtraObres({
      text: debounced,
      disciplina: (filtres.disciplina as never) ?? null,
      periode: (filtres.periode as never) ?? null,
      ambit: (filtres.ambit as never) ?? null,
      artista: filtres.artista ?? null,
      concepte: filtres.concepte ?? null,
      escola: filtres.escola ?? null,
    }),
    [filtres, debounced],
  );

  // Recompte exclusiu per opció: obres que compleixen TOTS els altres filtres (audit P1)
  const compteExclusiu = useMemo(() => {
    const comptes: Partial<Record<Dimensio, Record<string, number>>> = {};
    for (const d of DIMENSIONS) {
      comptes[d.clau] = {};
      for (const op of d.opcions()) {
        comptes[d.clau]![op.valor] = filtraObres({
          text: debounced,
          disciplina: (d.clau !== "disciplina" ? (filtres.disciplina as never) : null) ?? null,
          periode: (d.clau !== "periode" ? (filtres.periode as never) : null) ?? null,
          ambit: (d.clau !== "ambit" ? (filtres.ambit as never) : null) ?? null,
          artista: d.clau !== "artista" ? filtres.artista ?? null : null,
          concepte: d.clau !== "concepte" ? filtres.concepte ?? null : null,
          escola: d.clau !== "escola" ? filtres.escola ?? null : null,
        }).filter((o: Obra) => {
          switch (d.clau) {
            case "disciplina": return o.disciplina === op.valor;
            case "periode": return o.periode === op.valor;
            case "ambit": return o.ambit === op.valor;
            case "artista": return o.autorSlug === op.valor;
            case "concepte": return o.concepts.includes(op.valor);
            case "escola": return o.escola === op.valor;
            default: return false;
          }
        }).length;
      }
    }
    return comptes;
  }, [filtres, debounced]);

  // Suggeriments en viu (audit: resultats mentre s'escriu)
  const suggeriments = useMemo<Suggeriment[]>(() => {
    const q = normalitza(text.trim());
    if (q.length < 2 || focusCerca === false) return [];
    const out: Suggeriment[] = [];
    for (const o of OBRES) {
      const t = normalitza(`${o.titol} ${o.titolOriginal ?? ""}`);
      const a = normalitza(o.autorNom);
      if (t.includes(q) || a.includes(q)) {
        out.push({ tipus: "obra", label: o.titol, sub: `${o.autorNom} · ${o.data}`, desti: "obra/" + o.slug });
      }
      if (out.length >= 6) break;
    }
    for (const a of ARTISTES) {
      if (normalitza(a.nom).includes(q)) {
        out.push({ tipus: "artista", label: a.nom, sub: "Artista · " + a.dates, desti: "artista/" + a.slug });
        if (out.length >= 8) break;
      }
    }
    for (const c of CONCEPTES) {
      if (normalitza(c.nom).includes(q)) {
        out.push({ tipus: "concepte", label: c.nom, sub: "Concepte tècnic", desti: "concepte/" + c.slug });
        if (out.length >= 9) break;
      }
    }
    return out.slice(0, 9);
  }, [text, focusCerca]);

  const urlFiltres = (nous: Partial<FiltresURL>) => {
    setFiltres(nous, true);
  };

  const aplicaPreset = (p: (typeof PRESETS)[number]) => {
    setText("");
    setDebounced("");
    ultimQRef.current = "";
    setFiltres({ ...p.filtres, q: undefined }, true);
  };

  const esborraTot = () => {
    setText("");
    setDebounced("");
    ultimQRef.current = "";
    setFiltres({ disciplina: undefined, periode: undefined, ambit: undefined, artista: undefined, concepte: undefined, escola: undefined, q: undefined }, true);
  };

  const activa = DIMENSIONS.filter((d) => filtres[d.clau]);
  const consultable = text.trim().length >= 2;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Col·leccions</h1>
      <p className="mt-2 text-tinta-2 max-w-2xl text-[15px]">
        Catàleg complet del corpus: cercau en viu per títol, autor, museu o tècnica, i combinau
        filtres per disciplina, període, àmbit, artista, concepte tècnic o escola arquitectònica.
      </p>

      {/* Presets didàctics */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-tinta-2 mr-1">Recorreguts ràpids:</span>
        {PRESETS.map((p) => {
          const actiuP = Object.entries(p.filtres).every(([k, v]) => filtres[k as Dimensio] === v);
          return (
            <button
              key={p.label}
              onClick={() => aplicaPreset(p)}
              className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                actiuP
                  ? "border-accio bg-accio text-white font-medium"
                  : "border-border bg-superficie text-tinta hover:border-accio/50 hover:text-accio"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Barra de cerca + botó de filtres */}
      <div className="mt-4 flex gap-2 relative">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tinta-2" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={consultable && focusCerca && suggeriments.length > 0}
            aria-controls="suggeriments-cerca"
            aria-autocomplete="list"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocusCerca(true)}
            onBlur={() => setTimeout(() => setFocusCerca(false), 150)}
            placeholder="Cerca en viu: títol, autor, museu, ciutat, tècnica…"
            className="w-full rounded-md bg-superficie border border-border pl-9 pr-3 py-2.5 text-sm placeholder:text-tinta-2 focus:outline-none focus:ring-1 focus:ring-accio/50"
            aria-label="Cerca al catàleg en temps real"
          />
          {/* Suggeriments en viu */}
          {consultable && focusCerca && suggeriments.length > 0 && (
            <ul
              id="suggeriments-cerca"
              role="listbox"
              aria-label="Suggeriments de cerca"
              className="absolute z-20 left-0 right-0 top-full mt-1 rounded-md border border-border bg-card shadow-2xl overflow-hidden"
            >
              {suggeriments.map((s) => (
                <li key={s.tipus + s.desti} role="option" aria-selected="false">
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      navega(s.desti);
                      setFocusCerca(false);
                    }}
                    className="w-full text-left px-3 py-2.5 hover:bg-tinta/5 flex items-center gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-tinta truncate">{ressalta(s.label, text)}</p>
                      <p className="text-[11.5px] text-tinta-2 truncate">{s.sub}</p>
                    </div>
                    <CornerDownLeft className="size-3.5 text-tinta-2 shrink-0" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={() => setPanellObert(!panellObert)}
          className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors shrink-0 ${
            panellObert || activa.length
              ? "border-accio/50 bg-[var(--terra-suau)] text-accio"
              : "border-border bg-superficie text-tinta-2 hover:text-tinta"
          }`}
          aria-expanded={panellObert}
          aria-controls="panell-filtres"
        >
          <SlidersHorizontal className="size-4" aria-hidden />
          Filtres
          {activa.length > 0 && (
            <span className="rounded-full bg-accio text-white text-[11px] font-bold px-1.5 min-w-5">
              {activa.length}
            </span>
          )}
        </button>
      </div>

      {/* Panell de filtres amb recomptes per opció */}
      {panellObert && (
        <div
          id="panell-filtres"
          role="region"
          aria-label="Filtres del catàleg"
          className="mt-3 rounded-lg bg-superficie border border-border p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DIMENSIONS.map((d) => (
            <label key={d.clau} className="text-sm">
              <span className="block text-xs uppercase tracking-wider text-tinta-2 mb-1.5">{d.label}</span>
              <select
                value={filtres[d.clau] ?? ""}
                onChange={(e) => urlFiltres({ [d.clau]: e.target.value || undefined })}
                className="w-full rounded-md bg-paper-2 border border-border px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accio/50"
              >
                <option value="">Tots</option>
                {d.opcions().map((o) => {
                  const n = compteExclusiu[d.clau]?.[o.valor] ?? 0;
                  return (
                    <option key={o.valor} value={o.valor} disabled={n === 0 && filtres[d.clau] !== o.valor}>
                      {o.label} ({n})
                    </option>
                  );
                })}
              </select>
            </label>
          ))}
        </div>
      )}

      {/* Estat dels filtres + comptador */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <p className="text-sm text-tinta-2" aria-live="polite" role="status">
          <strong className="text-tinta">{resultats.length}</strong>{" "}
          {resultats.length === 1 ? "obra" : "obres"}
          {debounced.trim() && (
            <span> per «<span className="text-tinta">{debounced.trim()}</span>»</span>
          )}
        </p>
        {activa.map((d) => (
          <button
            key={d.clau}
            onClick={() => urlFiltres({ [d.clau]: undefined })}
            className="inline-flex items-center gap-1.5 rounded-full border border-accio/40 bg-[var(--terra-suau)] px-3 py-1 text-xs text-accio hover:bg-[rgba(166,78,50,0.18)]"
          >
            {d.label}: {DIMENSIONS.find((x) => x.clau === d.clau)!.opcions().find((o) => o.valor === filtres[d.clau])?.label}
            <X className="size-3" aria-hidden />
            <span className="sr-only">Treure el filtre</span>
          </button>
        ))}
        {(activa.length > 0 || debounced) && (
          <button
            onClick={esborraTot}
            className="text-xs text-tinta-2 underline hover:text-tinta"
          >
            Esborrar tots els filtres
          </button>
        )}
      </div>

      {/* Graella de resultats */}
      {resultats.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-border p-10 text-center">
          <p className="font-serif text-xl mb-2">Cap obra amb aquests criteris</p>
          <p className="text-sm text-tinta-2 mb-5 max-w-xl mx-auto leading-relaxed">
            {debounced.trim()
              ? "Proveu un terme més curt, sense accents (la cerca ja els ignora) o en substitueixi el nom (p. ex. «Leonardo» en lloc de «da Vinci»)."
              : "La combinació de filtres és massa restrictiva. Traieu-ne algun o comenceu de zero amb tot el corpus."}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PRESETS.slice(0, 3).map((p) => (
              <button
                key={p.label}
                onClick={() => aplicaPreset(p)}
                className="rounded-full border border-border px-3 py-1.5 text-[13px] text-tinta hover:border-accio/50 hover:text-accio"
              >
                Prova: {p.label}
              </button>
            ))}
            <button
              onClick={esborraTot}
              className="rounded-md bg-accio px-4 py-1.5 text-sm font-medium text-white"
            >
              Veure tot el corpus
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resultats.map((o) => (
            <WorkCard key={o.slug} obra={o} />
          ))}
        </div>
      )}
    </div>
  );
}
