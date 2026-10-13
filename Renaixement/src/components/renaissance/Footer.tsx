// Footer.tsx — Peu de pàgina (enganxat al fons amb mt-auto)
"use client";

import { useApp } from "@/lib/renaissance/store";
import { OBRES } from "@/data/obres";
import { ARTISTES } from "@/data/artistes";
import { CONCEPTES } from "@/data/conceptes";

export default function Footer() {
  const { navega } = useApp();
  return (
    <footer className="mt-auto border-t border-border bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-serif text-lg mb-2">Renaixement</p>
          <p className="text-tinta-2 leading-relaxed">
            Web de referència en català per a l&apos;estudi de la pintura, l&apos;escultura
            i l&apos;arquitectura del Renaixement. Material didàctic pensat per a
            Batxillerat i consulta general.
          </p>
          <p className="text-tinta-2 text-xs mt-3">
            {OBRES.length} obres · {ARTISTES.length} artistes · {CONCEPTES.length} conceptes ·
            imatges de Wikimedia Commons amb llicència oberta
          </p>
        </div>
        <nav aria-label="Seccions del peu">
          <p className="text-concepte text-xs uppercase tracking-wider mb-3">Explora</p>
          <ul className="space-y-1.5">
            {[
              ["coleccions", "Col·leccions"],
              ["cronologia", "Eix cronològic"],
              ["conceptes", "Conceptes tècnics"],
              ["artistes", "Artistes"],
              ["arquitectura", "Arquitectura i escoles"],
              ["fora-ditalia", "Fora d'Itàlia"],
            ].map(([d, l]) => (
              <li key={d}>
                <button onClick={() => navega(d)} className="text-tinta-2 hover:text-accio transition-colors">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Informació del projecte">
          <p className="text-concepte text-xs uppercase tracking-wider mb-3">Projecte</p>
          <ul className="space-y-1.5">
            {[
              ["glossari", "Glossari"],
              ["sobre", "Sobre el projecte"],
            ].map(([d, l]) => (
              <li key={d}>
                <button onClick={() => navega(d)} className="text-tinta-2 hover:text-accio transition-colors">
                  {l}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-tinta-2 text-xs mt-4 leading-relaxed">
            Totes les obres del corpus són de domini públic. Les fotografies provenen
            de Wikimedia Commons i respecten les llicències indicades a cada fitxa.
          </p>
        </nav>
      </div>
    </footer>
  );
}
