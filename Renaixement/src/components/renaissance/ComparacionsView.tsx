// ComparacionsView.tsx — Comparacions preconfigurades d'obres (directriu «comparació»).
// Cada activitat: context breu, pregunta comparativa (daurat) i les obres al costat
// de l'altra amb mini visor pan/zoom i text de què cal mirar. Auditoria didàctica:
// resposta MODEL plegada + criteris mínims d'èxit; el progrés NO es registra.
// Oberta amb ?c=id des del pas 6 de la seqüència del visor o des dels conceptes.
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, GitCompareArrows, MapPin, Maximize2, ChevronDown, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { obra } from "@/data/obres";
import { COMPARACIONS, type Comparacio } from "@/data/comparacions";
import { estatImatge } from "@/data/imatges";
import PanZoomImatge from "./PanZoomImatge";

export default function ComparacionsView() {
  const { navega, filtres } = useApp();
  const id = filtres.c;
  const activa = id ? COMPARACIONS.find((c) => c.id === id) ?? null : null;
  const activaRef = useRef<HTMLDivElement>(null);

  // Quan s'obre amb ?c=id, fes scroll fins a l'activitat
  useEffect(() => {
    if (activa) activaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activa?.id]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <header className="max-w-3xl mb-10">
        <p className="text-concepte text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          <GitCompareArrows className="size-4" aria-hidden />
          Activitats de comparació
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl leading-tight">Mireu les obres en parella</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-tinta-2">
          Cinc comparacions preparades per a l&apos;aula: mateixa qüestió, obres diferents. Amplieu
          cada imatge amb la roda o la pinçada, llegiu el que cal mirar i responeu la pregunta
          comparativa abans de llegir els textos.
        </p>
      </header>

      <div className="space-y-10">
        {COMPARACIONS.map((c) => (
          <ComparacioBloc
            key={c.id}
            c={c}
            refCu={activa?.id === c.id ? activaRef : undefined}
            obreObra={(slug) => navega("obra/" + slug)}
            obreConcepte={(slug) => navega("concepte/" + slug)}
          />
        ))}
      </div>
    </div>
  );
}

function ComparacioBloc({
  c,
  refCu,
  obreObra,
  obreConcepte,
}: {
  c: Comparacio;
  refCu?: React.RefObject<HTMLDivElement | null>;
  obreObra: (slug: string) => void;
  obreConcepte: (slug: string) => void;
}) {
  const { obreViewer } = useApp();
  const obres = c.obres.map((o) => ({ ...o, obra: obra(o.slug) })).filter((o) => o.obra);
  const cols = obres.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <article ref={refCu} className="rounded-xl border border-border bg-card overflow-hidden scroll-mt-20" data-comparacio={c.id}>
      <div className="p-5 sm:p-6 border-b border-border">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h2 className="font-serif text-xl sm:text-2xl">{c.titol}</h2>
          {c.concepte && (
            <button
              onClick={() => obreConcepte(c.concepte!)}
              className="inline-flex items-center gap-1 rounded-full border border-concepte/45 px-2.5 py-0.5 text-[11px] text-concepte hover:bg-[var(--concepte-suau)] transition-colors"
            >
              concepte: {c.concepte.replace(/-/g, " ")}
              <ArrowRight className="size-3" aria-hidden />
            </button>
          )}
        </div>
        <p className="text-[14.5px] leading-relaxed text-tinta-2 max-w-3xl">{c.intro}</p>

        {/* Pregunta comparativa — bloc «activitat» */}
        <div className="mt-4 rounded-lg border border-dashed border-concepte/50 bg-[var(--concepte-suau)] p-3.5" role="note">
          <p className="text-[10px] uppercase tracking-wider text-concepte font-semibold mb-1">
            Pregunta comparativa
          </p>
          <p className="font-serif text-[15px] leading-snug">{c.pregunta}</p>
        </div>

        {/* Criteris mínims d'èxit + resposta model plegada (auditoria didàctica) */}
        <RespostaModel resposta={c.respostaModel} criteris={c.criteris} />
      </div>

      <div className={`grid gap-px bg-border ${cols}`}>
        {obres.map(({ slug, rol, text, obra: o }) => (
          <div key={slug} className="bg-card p-4 sm:p-5">
            <PanZoomImatge slug={slug} alt={`${o!.titol}, ${o!.autorNom}, ${o!.data}`} />
            <p className="mt-3 text-[10px] uppercase tracking-wider text-concepte font-semibold">{rol}</p>
            <h3 className="font-serif italic text-[16px] leading-snug mt-1">{o!.titol}</h3>
            <p className="text-[12.5px] text-tinta-2 mt-0.5">
              {o!.autorNom} · {o!.data}
              <span className="mx-1.5" aria-hidden>·</span>
              <MapPin className="inline size-3 -mt-0.5" aria-hidden /> {o!.ubicacio.museu}, {o!.ubicacio.ciutat}
            </p>
            <p className="text-[13.5px] leading-relaxed text-tinta-2 mt-2.5">{text}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => obreObra(slug)}
                className="inline-flex items-center gap-1.5 rounded border border-border px-2.5 py-1 text-[12px] text-tinta-2 hover:text-tinta hover:border-accio/50 transition-colors"
              >
                Fitxa completa
                <ArrowRight className="size-3" aria-hidden />
              </button>
              <button
                onClick={() => obreViewer(slug)}
                className="inline-flex items-center gap-1.5 rounded bg-accio px-2.5 py-1 text-[12px] font-medium text-white hover:bg-[var(--accio-fort)] transition-colors"
              >
                <Maximize2 className="size-3" aria-hidden />
                {estatImatge(slug) === "zoom" ? "Visor Deep Zoom" : "Ampliar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

/** Criteris d'èxit visibles + resposta model plegada (clic per obrir). */
function RespostaModel({ resposta, criteris }: { resposta: string; criteris: string[] }) {
  const [oberta, setOberta] = useState(false);
  return (
    <div className="mt-3">
      <details
        open={oberta}
        onToggle={(e) => setOberta((e.target as HTMLDetailsElement).open)}
        className="group rounded-lg border border-linia bg-paper-2"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 select-none">
          <span>
            <span className="etiqueta-tipus etiqueta-tipus-aur block">Resposta model</span>
            <span className="block text-[12.5px] text-tinta-2 mt-0.5">
              Respon primer amb les vostres paraules; els criteris d&apos;èxit us diuen què s&apos;hi valora.
            </span>
          </span>
          <ChevronDown className="size-4 shrink-0 text-tinta-2 transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="border-t border-linia px-4 py-3.5">
          <p className="etiqueta-tipus mb-2">Criteris mínims d&apos;èxit</p>
          <ul className="space-y-1 mb-4">
            {criteris.map((cr) => (
              <li key={cr} className="flex items-start gap-2 text-[13.5px] leading-snug text-tinta-2">
                <CheckCircle2 className="size-3.5 mt-0.5 shrink-0 text-concepte" aria-hidden />
                {cr}
              </li>
            ))}
          </ul>
          <p className="etiqueta-tipus mb-2">Una resposta que compleix els criteris</p>
          <p className="text-[14px] leading-relaxed text-tinta-2 prose-llegible">{resposta}</p>
        </div>
      </details>
    </div>
  );
}
