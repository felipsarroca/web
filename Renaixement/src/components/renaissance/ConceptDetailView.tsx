// ConceptDetailView.tsx — Fitxa de concepte amb la seqüència de l'auditoria:
//   1 · Definició citable → 2 · Mira l'exemplar (Prou GRAN per observar sense sortir
//   de la pàgina) → 3 · Activa la capa d'anotacions al visor → 4 · Explicació
//   didàctica → 5 · Compara amb segones obres → exercici de TRANSFERÈNCIA:
//   identificar el concepte en una obra que no és l'exemplar principal.
"use client";

import { AlertTriangle, ArrowRight, GitCompareArrows, Maximize2, PlayCircle, Layers } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { concepte } from "@/data/conceptes";
import { obra } from "@/data/obres";
import { teAnotacions } from "@/data/anotacions";
import { comparacionsDeConcepte } from "@/data/comparacions";
import ImgObra from "./ImgObra";
import WorkCard from "./WorkCard";
import Enllac from "./Enllac";
import NotFoundView from "./NotFoundView";
import { TextViu } from "./Term";

export default function ConceptDetailView({ slug }: { slug: string }) {
  const { obreViewer } = useApp();
  const c = concepte(slug);
  if (!c) return <NotFoundView missatge="Aquest concepte no és al vocabulari." />;

  const principal = obra(c.exemplarPrincipal);
  const secundaris = c.exemplarsSecundaris.map((s) => obra(s)).filter(Boolean);
  const comparacions = comparacionsDeConcepte(slug);

  // Exercici de transferència: una obra que NO és l'exemplar principal
  const transferencia = secundaris[0];
  const teCapa = principal && teAnotacions(c.exemplarPrincipal);

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <Enllac
        desti="conceptes"
        className="inline-flex items-center gap-1.5 text-sm text-tinta-2 hover:text-accio mb-6 transition-colors"
      >
        ← Tots els conceptes
      </Enllac>

      <h1 className="font-serif text-3xl sm:text-4xl">
        <em className={c.nomItalic ? "" : "not-italic"}>{c.nom}</em>
      </h1>

      {/* ── PAS 1 · Definició citable ── */}
      <div className="bloc-relevancia rounded-r-lg p-5 mt-6 max-w-4xl">
        <p className="etiqueta-tipus etiqueta-tipus-aur mb-1.5">1 · Definició (citable en examen)</p>
        <p className="text-[17px] leading-relaxed text-tinta">{c.definicio}</p>
      </div>

      {/* ── PAS 2 · Mira: exemplar prou gran per observar-lo aquí mateix ── */}
      {principal && (
        <section className="mt-12" aria-label="Exemplar principal">
          <p className="etiqueta-tipus etiqueta-tipus-aur mb-2">2 · Mira l&apos;exemplar</p>
          <h2 className="font-serif text-2xl mb-4">
            {principal.titol}
            <span className="text-tinta-2 text-base font-sans"> · {principal.autorNom} · {principal.data}</span>
          </h2>
          <div className="rounded-lg overflow-hidden border border-linia bg-superficie p-3 sm:p-5">
            <button
              onClick={() => obreViewer(principal.slug)}
              className="group relative block w-full"
              aria-label={`Obrir ${principal.titol} al visor, zona: ${c.zonaExemplar}`}
            >
              <ImgObra
                slug={principal.slug}
                amplada={1200}
                alt={`${principal.titol}, ${principal.autorNom}`}
                fit="contain"
                className="w-full max-h-[62vh] bg-paper-2"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                <span className="inline-flex items-center gap-2 rounded-full bg-paper/95 border border-linia px-4 py-2 text-sm text-tinta opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="size-4" aria-hidden />
                  Obrir al visor
                </span>
              </span>
            </button>
          </div>
          <p className="mt-2.5 text-[14px] leading-relaxed text-tinta-2 max-w-3xl prose-llegible">
            <span className="text-concepte font-medium">On mirar:</span> {c.zonaExemplar} ·{" "}
            {principal.ubicacio.museu}, {principal.ubicacio.ciutat}
          </p>

          {/* ── PAS 3 · Activa la capa d'anotacions ── */}
          {teCapa && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => obreViewer(principal.slug)}
                className="inline-flex items-center gap-2 rounded-md bg-accio px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accio-fort)] transition-colors"
              >
                <Layers className="size-4" aria-hidden />
                Activa la capa d&apos;anotacions al visor
              </button>
              <span className="text-[12.5px] text-tinta-2">
                Primer llegeixes la pregunta d&apos;observació; la comprovació ve després.
              </span>
            </div>
          )}
        </section>
      )}

      {/* ── PAS 4 · Explicació didàctica ── */}
      <section className="mt-16" aria-label="Explicació didàctica">
        <p className="etiqueta-tipus etiqueta-tipus-aur mb-2">4 · Explicació</p>
        <h2 className="font-serif text-2xl mb-4">Com funciona</h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2 prose-llegible max-w-4xl">
          <TextViu text={c.explicacio} />
        </div>
      </section>

      {/* ── PAS 5 · Exercici de transferència (auditoria: segona obra) ── */}
      {transferencia && (
        <section className="mt-14 max-w-4xl" aria-label="Exercici de transferència">
          <div className="bloc-activitat rounded-lg p-5 sm:p-6">
            <p className="etiqueta-tipus etiqueta-tipus-aur mb-2">5 · Exercici de transferència</p>
            <h2 className="font-serif text-xl mb-2 flex items-center gap-2">
              <ArrowRight className="size-5 text-concepte" aria-hidden />
              Identifica el concepte en una segona obra
            </h2>
            <p className="text-[14.5px] leading-relaxed text-tinta-2 mb-4 prose-llegible">
              Obre <strong>{transferencia.titol}</strong> ({transferencia.autorNom},{" "}
              {transferencia.data}) al visor i troba on apareix <em className={c.nomItalic ? "" : "not-italic"}>{c.nom}</em>{" "}
              sense que ningú t&apos;ho senyali. Si te n&apos;even dos llocs, encara millor: això és el que
              vol dir que has interioritzat el concepte.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => obreViewer(transferencia.slug)}
                className="inline-flex items-center gap-2 rounded-md bg-accio px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accio-fort)] transition-colors"
              >
                <PlayCircle className="size-4" aria-hidden />
                Obrir {transferencia.titol} al visor
              </button>
              <span className="text-[12.5px] text-tinta-2">
                Pista: recorda la definició del pas 1 i el que has vist a l&apos;exemplar principal.
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ── Comparacions connectades ── */}
      {comparacions.length > 0 && (
        <section className="mt-12 max-w-4xl" aria-label="Comparacions d'aquest concepte">
          <h2 className="font-serif text-xl mb-3 flex items-center gap-2">
            <GitCompareArrows className="size-5 text-concepte" aria-hidden />
            Compara&apos;l amb activitat preparada
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {comparacions.map((cmp) => (
              <Enllac
                key={cmp.id}
                desti={"comparacions?c=" + cmp.id}
                className="inline-flex items-center gap-2 rounded-md border border-concepte/55 px-4 py-2 text-sm text-concepte hover:bg-[var(--concepte-suau)] transition-colors"
              >
                <GitCompareArrows className="size-4" aria-hidden />
                {cmp.titol}
              </Enllac>
            ))}
          </div>
        </section>
      )}

      {/* Obres de contrast */}
      {secundaris.length > 0 && (
        <section className="mt-14" aria-label="Obres de contrast">
          <h2 className="font-serif text-2xl mb-5">Obres de contrast</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {secundaris.map((o) => o && <WorkCard key={o.slug} obra={o} />)}
          </div>
        </section>
      )}

      {/* Confusions freqüents */}
      {c.confusions.length > 0 && (
        <section className="mt-14 max-w-4xl" aria-label="Confusions freqüents">
          <h2 className="font-serif text-2xl mb-4 flex items-center gap-2">
            <AlertTriangle className="size-5 text-concepte" aria-hidden />
            Confusions freqüents
          </h2>
          <div className="space-y-3">
            {c.confusions.map((conf, i) => (
              <div key={i} className="rounded-lg bg-card border border-linia p-4">
                <p className="text-[14px] leading-relaxed">
                  <strong className="text-accio">{conf.amb}:</strong>{" "}
                  <span className="text-tinta-2">{conf.diferencia}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Termes relacionats */}
      {c.relacionats.length > 0 && (
        <section className="mt-12" aria-label="Termes relacionats">
          <h2 className="font-serif text-2xl mb-4">Segueix amb</h2>
          <div className="flex flex-wrap gap-2">
            {c.relacionats.map((r) => {
              const con = concepte(r);
              if (!con) return null;
              return (
                <Enllac
                  key={r}
                  desti={"concepte/" + r}
                  className="inline-flex items-center gap-1.5 rounded-full border border-linia bg-superficie px-4 py-2 text-sm text-tinta-2 hover:border-accio/45 hover:text-accio transition-colors"
                >
                  <em className={con.nomItalic ? "" : "not-italic"}>{con.nom}</em>
                  <ArrowRight className="size-3.5" aria-hidden />
                </Enllac>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
