// AboutView.tsx — Sobre el projecte (criteris, fonts d'imatges, ús docent)
"use client";

import { useApp } from "@/lib/renaissance/store";
import { OBRES } from "@/data/obres";
import { ARTISTES } from "@/data/artistes";
import { CONCEPTES } from "@/data/conceptes";
import { IMATGES } from "@/data/imatges";

const LLICENCIES: Record<string, number> = {};
for (const [, im] of Object.entries(IMATGES)) {
  LLICENCIES[im.llicencia] = (LLICENCIES[im.llicencia] ?? 0) + 1;
}

export default function AboutView() {
  const { navega } = useApp();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Sobre el projecte</h1>

      <section className="mt-8" aria-label="Què és aquesta web">
        <h2 className="font-serif text-2xl mb-3">Què és aquesta web</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2">
          <p>
            «Renaixement» és un material didàctic i de consulta bàsica sobre pintura,
            escultura i arquitectura del Renaixement, pensat com a referència en
            català. Funciona alhora com a material d&apos;aula (suport visual per a
            explicacions i activitats), com a consulta individual (fitxes completes
            i navegació lliure) i com a eina de repàs (recorreguts per concepte).
          </p>
          <p>
            Cada obra es presenta en tres capes de lectura: la capa ràpida (imatge,
            dades, ubicació i el destacat «Per què és rellevant»), la capa d&apos;estudi
            (context històric i anàlisi formal) i la capa d&apos;ampliació (mira-hi de
            prop, curiositats i obres relacionades). La mateixa estructura serveix
            per a la pantalla del mòbil i per al projector de l&apos;aula.
          </p>
        </div>
      </section>

      <section className="mt-10" aria-label="Criteris de selecció">
        <h2 className="font-serif text-2xl mb-3">Criteris de selecció del corpus</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2">
          <p>
            Les {OBRES.length} obres del corpus no són una acumulació de famoses sinó
            un conjunt coherent per explicar els blocs temàtics. Cada obra hi entra per
            un d&apos;aquests criteris: és exemplar d&apos;una fitxa de concepte
            (perspectiva lineal, sfumato, contrapposto…), és obra fita de l&apos;autor
            imprescindible, amplia la cobertura territorial o disciplinària (escoles
            espanyoles, França, escultura, arquitectura) o documenta una comparació
            didàctica necessària.
          </p>
          <p>
            El corpus creix per disseny: afegir una obra és afegir un registre de
            dades i la seva imatge, sense tocar res de l&apos;existent. {ARTISTES.length}{" "}
            artistes tenen fitxa pròpia i {CONCEPTES.length} conceptes tenen
            exemplars verificats al corpus.
          </p>
        </div>
      </section>

      <section className="mt-10" aria-label="Fonts d'imatges i drets">
        <h2 className="font-serif text-2xl mb-3">Fonts d&apos;imatges i drets</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2">
          <p>
            Tot el corpus del Renaixement és de domini públic (els autors morien fa
            més de quatre segles) i les imatges provenen de{" "}
            <a
              href="https://commons.wikimedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accio hover:underline"
            >
              Wikimedia Commons
            </a>
            , la font de referència de digitalitzacions d&apos;alta resolució amb
            llicències obertes. La regla del projecte és usar només imatges amb
            llicència explícitament oberta i reproduir el crèdit exigit: cada fitxa
            indica la font, la llicència i, quan escau, l&apos;autor de la fotografia.
          </p>
          <div className="rounded-lg bg-card border border-border p-4">
            <p className="text-xs uppercase tracking-wider text-tinta-2 mb-2">
              Llicències del corpus actual
            </p>
            <ul className="space-y-1.5">
              {Object.entries(LLICENCIES)
                .sort((a, b) => b[1] - a[1])
                .map(([l, n]) => (
                  <li key={l} className="flex justify-between text-sm">
                    <span>{l}</span>
                    <span className="text-tinta-2 tabular-nums">{n} imatges</span>
                  </li>
                ))}
            </ul>
          </div>
          <p className="text-[13px] text-tinta-2">
            Nota de prudència: algunes institucions reclamen drets sobre les fotografies
            noves de les seves obres. Les imatges seleccionades són digitalitzacions
            amb llicència oberta; el visor d&apos;alta resolució serveix el fitxer
            mitjançant el servei oficial de miniatures de Wikimedia Commons.
          </p>
        </div>
      </section>

      <section className="mt-10" aria-label="Guia d'ús per a docents">
        <h2 className="font-serif text-2xl mb-3">Guia d&apos;ús per a docents</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2">
          <p>
            Tres recorreguts de prova resumeixen els usos d&apos;aula. Recorregut
            d&apos;estudi: des de Conceptes, obriu la perspectiva lineal, seguiu
            l&apos;enllaç a la Trinitat de Masaccio, obriu el visor i examineu els
            cassetons; des d&apos;allà, aneu a la fitxa de Masaccio i continueu a la
            Capella Brancacci. Recorregut de consulta: filtreu Escultura +
            Quattrocento al catàleg i obriu el David de bronze: comproveu la ubicació
            (Bargello) i les etiquetes de concepte. Recorregut de classe: activeu el
            filtre «Miquel Àngel», obriu tres obres al visor a pantalla completa i
            mostreu-les amb el projector.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={() => navega("concepte/perspectiva-lineal")}
              className="rounded-md bg-accio px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accio-fort)] transition-colors"
            >
              Provar el recorregut d&apos;estudi
            </button>
            <button
              onClick={() => navega("coleccions?disciplina=escultura&periode=quattrocento")}
              className="rounded-md border border-border px-4 py-2 text-sm text-tinta hover:bg-tinta/5 transition-colors"
            >
              Provar el recorregut de consulta
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-label="Ampliació del projecte">
        <h2 className="font-serif text-2xl mb-3">Com creixerà</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2">
          <p>
            El creixement és modular per disseny: més obres, més autors i més
            informació s&apos;incorporen afegint continguts al sistema, sense canviar
            l&apos;estructura. El full de ruta preveu tres fases: aquesta web completa
            amb el corpus de referència; l&apos;ampliació fins a un corpus més gran amb
            comparador d&apos;obres, mapa de museus i glossari viu complet; i la fase
            d&apos;aula intensiva amb autoavaluació i guies per unitats didàctiques.
          </p>
        </div>
      </section>
    </div>
  );
}
