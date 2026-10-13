// WorkCard.tsx — Targeta d'obra (auditoria de catàleg):
//   · Mides d'imatge coherents: caixa uniforme 4:3 amb la reproducció sencera
//     (object-contain) sobre fons neutre — cap retall que mutili obres verticals.
//   · Tipus d'obra visible amb icona + text en color semàntic (el color no és mai
//     l'única pista) i disponibilitat REAL de zoom sense selva de xips.
//   · Enllaç HTML real (compartible, clic central, historial del navegador).
"use client";

import type { Obra } from "@/data/types";
import { estatImatge, nivellZoom } from "@/data/imatges";
import ImgObra from "./ImgObra";
import Enllac from "./Enllac";
import { etiqueta } from "@/lib/renaissance/utils";
import { MapPin, ZoomIn, Palette, Landmark, Anvil } from "lucide-react";

const ICONA_DISCIPLINA = {
  pintura: Palette,
  escultura: Anvil,
  arquitectura: Landmark,
} as const;

const CLASSE_DISCIPLINA = {
  pintura: "text-[var(--disc-pintura)]",
  escultura: "text-[var(--disc-escultura)]",
  arquitectura: "text-[var(--disc-arquitectura)]",
} as const;

export default function WorkCard({ obra: o, prioritat = false }: { obra: Obra; prioritat?: boolean }) {
  const estat = estatImatge(o.slug);
  const nivell = nivellZoom(o.slug);
  const Icona = ICONA_DISCIPLINA[o.disciplina];

  return (
    <Enllac
      desti={"obra/" + o.slug}
      className="group text-left rounded-lg overflow-hidden bg-card border border-linia hover:border-accio/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,44,45,0.12)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accio"
      ariaLabel={`${o.titol}, de ${o.autorNom}. Veure la fitxa${estat === "zoom" ? " amb visor de detall" : ""}`}
    >
      {/* Caixa d'imatge coherent: 4:3, obra sencera sobre neutre */}
      <div className="relative overflow-hidden bg-paper-2 aspect-[4/3]">
        <ImgObra
          slug={o.slug}
          amplada={640}
          sizes="(max-width: 640px) 92vw, (max-width: 768px) 46vw, (max-width: 1280px) 30vw, 24vw"
          alt={`${o.titol}, ${o.autorNom}, ${o.data}. ${etiqueta("disciplina", o.disciplina)}.`}
          loading={prioritat ? "eager" : "lazy"}
          fit="contain"
          className="absolute inset-0 w-full h-full p-2 transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {o.obraFita && (
          <span
            className="absolute top-2 right-2 rounded-full bg-paper/90 border border-concepte/50 px-2 py-0.5 text-[10px] tracking-wide text-concepte"
            title="Obra fita del corpus"
          >
            Obra fita
          </span>
        )}
        {/* Affordance evident en hover/focus */}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(37,44,45,0.55)] to-transparent px-3 pb-2 pt-6 text-[11px] text-paper opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          Obrir la fitxa →
        </span>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-serif text-[15px] sm:text-base leading-snug group-hover:text-accio transition-colors">
          {o.titol}
        </h3>
        <p className="text-[13px] text-tinta-2 mt-0.5">
          {o.autorNom} · {o.data}
        </p>
        <p className="flex items-center flex-wrap gap-x-2.5 gap-y-1 mt-2 text-[12px]">
          {/* Tipus d'obra: icona + text + color semàntic (mai només color) */}
          <span className={`inline-flex items-center gap-1 ${CLASSE_DISCIPLINA[o.disciplina]}`}>
            <Icona className="size-3.5" aria-hidden />
            {etiqueta("disciplina", o.disciplina)}
          </span>
          {estat === "zoom" && (
            <span
              className="inline-flex items-center gap-1 text-tinta-2"
              title={nivell === "alt" ? "Visor Deep Zoom amb bona resolució" : "Visor amb la resolució disponible del màster"}
            >
              <ZoomIn className="size-3.5" aria-hidden />
              {nivell === "alt" ? "Mira-hi de prop" : "Zoom limitat"}
            </span>
          )}
        </p>
        <p className="flex items-start gap-1 text-[12px] text-tinta-2 mt-1.5">
          <MapPin className="size-3 mt-0.5 shrink-0" aria-hidden />
          <span className="line-clamp-1">{o.ubicacio.museu}, {o.ubicacio.ciutat}</span>
        </p>
      </div>
    </Enllac>
  );
}
