// Term.tsx — Terme amb entrada de glossari viu (P2): subratllat puntejat i definició emergent
"use client";

import { useState, type ReactNode } from "react";
import { useApp } from "@/lib/renaissance/store";
import { terme as buscaTerme } from "@/data/glossari";
import { segmentaTermes } from "@/lib/renaissance/utils";

export default function Term({ terme, children }: { terme: string; children?: ReactNode }) {
  const [obert, setObert] = useState(false);
  const { navega } = useApp();
  const dada = buscaTerme(terme);
  if (!dada) return <>{children ?? terme}</>;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setObert(true)}
      onMouseLeave={() => setObert(false)}
      onFocus={() => setObert(true)}
      onBlur={() => setObert(false)}
    >
      <button
        type="button"
        className="term-glossari inline"
        onClick={() => navega("glossari#" + encodeURIComponent(dada.terme))}
        aria-label={`Terme: ${dada.terme}. Definició: ${dada.definicio}`}
      >
        <em className={dada.termeItalic ? "" : "not-italic"}>{children ?? dada.terme}</em>
      </button>
      {obert && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 rounded-md bg-card border border-border shadow-xl p-3 text-[13px] leading-snug text-left normal-case"
        >
          <span className="block font-serif italic mb-1">{dada.terme}</span>
          {dada.definicio}
          {dada.vincle && (
            <span
              className="block mt-2 text-[12px] text-accio cursor-pointer hover:underline"
              onClick={(e) => { e.stopPropagation(); navega("concepte/" + dada.vincle); }}
            >
              Anar a la fitxa del concepte →
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/**
 * Text viu: detecta automàticament els termes del glossari en un paràgraf
 * i els converteix en termes amb definició emergent (cap. 8.1, glossari viu).
 */
export function TextViu({ text, className }: { text: string; className?: string }) {
  const segments = segmentaTermes(text);
  return (
    <p className={className}>
      {segments.map((s, i) =>
        s.tipus === "text" ? (
          <span key={i}>{s.valor}</span>
        ) : (
          <Term key={i} terme={s.terme!}>
            {s.valor}
          </Term>
        ),
      )}
    </p>
  );
}
