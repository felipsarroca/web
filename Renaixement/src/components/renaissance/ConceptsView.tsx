// ConceptsView.tsx — Índex de conceptes tècnics (bloc 3)
"use client";

import { useApp } from "@/lib/renaissance/store";
import { CONCEPTES } from "@/data/conceptes";
import ImgObra from "./ImgObra";

export default function ConceptsView() {
  const { navega } = useApp();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Conceptes tècnics</h1>
      <p className="mt-2 text-tinta-2 max-w-2xl text-[15px]">
        La via didàctica més potent de la web: connecten obres molt diferents amb una
        idea comuna. Cada fitxa té definició citable en examen, exemplars principals
        al visor i confusions freqüents.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONCEPTES.map((c) => {
          const repr = c.exemplarPrincipal;
          return (
            <button
              key={c.slug}
              onClick={() => navega("concepte/" + c.slug)}
              className="group text-left rounded-lg overflow-hidden bg-card border border-border hover:border-accio/50 transition-all hover:-translate-y-0.5"
            >
              <div className="flex gap-4 p-4">
                <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-paper-2 border border-border">
                  { }
                  <ImgObra
                    slug={repr}
                    amplada={160}
                    alt={`Exemplar del concepte ${c.nom}`}
                    className="size-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-[17px] leading-snug group-hover:text-accio transition-colors">
                    <em className={c.nomItalic ? "" : "not-italic"}>{c.nom}</em>
                  </h2>
                  <p className="text-[13px] text-tinta-2 mt-1 line-clamp-2 leading-snug">
                    {c.definicio}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
