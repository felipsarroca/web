// ConceptsView.tsx — Índex de conceptes tècnics (bloc 3), agrupats en
// pintura i escultura i arquitectura
"use client";

import { Landmark, Palette } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { CONCEPTES } from "@/data/conceptes";
import type { Concepte } from "@/data/types";
import ImgObra from "./ImgObra";

const GRUPS: { id: string; titol: string; descripcio: string; icona: typeof Palette; conceptes: Concepte[] }[] = [
  {
    id: "pintura-escultura",
    titol: "Pintura i escultura",
    descripcio: "Com es representen l'espai, la llum i el cos humà.",
    icona: Palette,
    conceptes: CONCEPTES.filter((c) => c.grup !== "arquitectura"),
  },
  {
    id: "arquitectura",
    titol: "Arquitectura",
    descripcio: "Amb quines regles es projecten i es construeixen els edificis.",
    icona: Landmark,
    conceptes: CONCEPTES.filter((c) => c.grup === "arquitectura"),
  },
];

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

      {GRUPS.map((g) => (
        <section key={g.id} className="mt-10" aria-labelledby={`grup-${g.id}`}>
          <h2 id={`grup-${g.id}`} className="font-serif text-2xl flex items-center gap-2">
            <g.icona className="size-5 text-concepte" aria-hidden />
            {g.titol}
          </h2>
          <p className="mt-1 text-[14px] text-tinta-2">{g.descripcio}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.conceptes.map((c) => (
              <button
                key={c.slug}
                onClick={() => navega("concepte/" + c.slug)}
                className="group text-left rounded-lg overflow-hidden bg-card border border-border hover:border-accio/50 transition-all hover:-translate-y-0.5"
              >
                <div className="flex gap-4 p-4">
                  <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-paper-2 border border-border">
                    <ImgObra
                      slug={c.exemplarPrincipal}
                      amplada={160}
                      alt={`Exemplar del concepte ${c.nom}`}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-[17px] leading-snug group-hover:text-accio transition-colors">
                      <em className={c.nomItalic ? "" : "not-italic"}>{c.nom}</em>
                    </h3>
                    <p className="text-[13px] text-tinta-2 mt-1 line-clamp-2 leading-snug">
                      {c.definicio}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
