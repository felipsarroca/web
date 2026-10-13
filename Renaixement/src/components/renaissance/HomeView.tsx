// HomeView.tsx — Portada editorial (auditoria de composició):
//   · Capçalera en dues columnes: titular + proposta d'ús a l'esquerra, obra
//     destacada visible en bona part a la dreta. Res de text imprès sobre la pintura.
//   · Mòbil: primer l'obra, després el text sobre paper.
//   · «Mira-hi de prop» és la crida destacada.
//   · Els recomptes perden protagonisme: el valor és saber què aprendràs i per on.
"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, GraduationCap, Search, ZoomIn, GitCompareArrows, Shapes, Users, Clock } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { obraDestacada, obraPerDescobrir } from "@/data/obres";
import { proporció, estatImatge, credit } from "@/data/imatges";
import ImgObra from "./ImgObra";
import WorkCard from "./WorkCard";
import Term from "./Term";
import Enllac from "./Enllac";

export default function HomeView() {
  const { obreViewer } = useApp();
  const destacada = obraDestacada();
  const descoberta = obraPerDescobrir();
  const ambZoom = estatImatge(destacada.slug) === "zoom";
  const ratio = proporció(destacada.slug);

  return (
    <div>
      {/* ── Capçalera editorial: text sobre paper + obra en un marc neutre ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-14 pb-4">
        <div className="grid lg:grid-cols-[minmax(0,11fr)_minmax(0,12fr)] gap-8 lg:gap-12 items-center">
          {/* Obra destacada — PRIMER en mòbil (audit: mostrar l'obra abans del text) */}
          <motion.figure
            className="order-1 lg:order-2 apareix"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="rounded-lg border border-linia bg-superficie p-3 sm:p-4">
              <Enllac
                desti={"obra/" + destacada.slug}
                className="group relative block overflow-hidden rounded-md"
                ariaLabel={`${destacada.titol}, de ${destacada.autorNom}. Veure la fitxa completa`}
              >
                <ImgObra
                  slug={destacada.slug}
                  amplada={1200}
                  sizes="(max-width: 1024px) 94vw, 54vw"
                  alt={`${destacada.titol}, ${destacada.autorNom}, ${destacada.data}`}
                  loading="eager"
                  className="mx-auto w-full h-auto max-h-[52vh] lg:max-h-[62vh] object-contain"
                  style={{ aspectRatio: `${ratio}` }}
                  fit="contain"
                />
              </Enllac>
            </div>
            <figcaption className="mt-2.5 text-[13px] text-tinta-2 leading-relaxed">
              <span className="font-serif text-[15px] text-tinta">{destacada.titol}</span>
              {" "}· {destacada.autorNom} · {destacada.data} · {destacada.ubicacio.museu}, {destacada.ubicacio.ciutat}
              <span className="block mt-0.5 text-[11.5px]">{credit(destacada.slug)}</span>
            </figcaption>
          </motion.figure>

          {/* Titular + proposta d'ús */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            <p className="text-concepte text-xs uppercase tracking-[0.2em]">
              Referència en català · Batxillerat i ESO
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.9rem] leading-[1.12] mt-3 max-w-[22ch]">
              El Renaixement, per mirar-hi de prop
            </h1>
            <p className="mt-4 prose-llegible text-[15.5px] sm:text-base leading-relaxed text-tinta-2">
              Obres amb visor de detall, fitxes amb preguntes d&apos;observació i una cronologia
              que ensenya què passava al mateix temps. Cada fitxa separa fet documentat,
              interpretació i font: ho que necessites per estudiar i per a classe.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {ambZoom ? (
                <button
                  onClick={() => obreViewer(destacada.slug)}
                  className="inline-flex items-center gap-2 rounded-md bg-accio px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accio-fort)] transition-colors"
                >
                  <ZoomIn className="size-4" aria-hidden />
                  Mira-hi de prop: {destacada.titol}
                </button>
              ) : (
                <Enllac
                  desti={"obra/" + destacada.slug}
                  className="inline-flex items-center gap-2 rounded-md bg-accio px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--accio-fort)] transition-colors"
                >
                  <ZoomIn className="size-4" aria-hidden />
                  Comença per l&apos;obra destacada
                </Enllac>
              )}
              <Enllac
                desti="coleccions"
                className="inline-flex items-center gap-2 rounded-md border border-[#c4baa8] px-5 py-2.5 text-sm text-tinta hover:border-accio hover:text-accio transition-colors"
              >
                <Shapes className="size-4" aria-hidden />
                Explora el catàleg
              </Enllac>
            </div>
            <p className="mt-4 text-[13px] text-tinta-2">
              No saps per on començar?{" "}
              <Enllac desti="conceptes" className="text-accio underline underline-offset-2 hover:no-underline">
                Segueix un itinerari de tres passos
              </Enllac>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Quatre portes: què aprendràs, no pas quantitats ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icona: Clock,
              titol: "Explora per temps",
              desc: "Artistes i obres ordenats en el temps: filtra per època i tipus d’art i compara qui treballava al mateix temps.",
              desti: "cronologia",
            },
            {
              icona: GitCompareArrows,
              titol: "Compara obres",
              desc: "Cinc activitats preparades amb pregunta i resposta model: perspectiva lineal i aèria, contrapposto, arquitectura i retrat.",
              desti: "comparacions",
            },
            {
              icona: Shapes,
              titol: "Apren els conceptes",
              desc: "Perspectiva lineal i aèria, sfumato, contrapposto, clarobscur: definició citable, exemplar per mirar i activitat guiada.",
              desti: "conceptes",
            },
            {
              icona: Users,
              titol: "Segueix els artistes",
              desc: "Fitxes amb l'activitat documentada de cada autor i les seves obres enllaçades, del taller al mecenes.",
              desti: "artistes",
            },
          ].map((p) => (
            <Enllac
              key={p.desti}
              desti={p.desti}
              className="group rounded-xl bg-card border border-linia p-6 hover:border-accio/50 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accio"
            >
              <p.icona className="size-6 text-accio mb-4" aria-hidden />
              <h2 className="font-serif text-xl mb-2 group-hover:text-accio transition-colors">{p.titol}</h2>
              <p className="text-[14px] text-tinta-2 leading-relaxed">{p.desc}</p>
            </Enllac>
          ))}
        </div>
      </section>

      {/* ── Per començar: itineraris curts ── */}
      <section className="border-t border-linia bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="size-5 text-concepte" aria-hidden />
            <h2 className="font-serif text-2xl">Per començar</h2>
          </div>
          <p className="text-sm text-tinta-2 mb-6 max-w-2xl prose-llegible">
            Tres itineraris curts, pensats per a l&apos;estudi i l&apos;aula: cada pas és un enllaç que conserva el fil.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icona: GraduationCap,
                titol: "Entén la perspectiva",
                passos: ["Fitxa del concepte: perspectiva lineal", "L'obra que la funda: la Trinitat de Masaccio", "El mateix sistema a l'Últim Sopar"],
                destins: ["concepte/perspectiva-lineal", "obra/trinitat-masaccio", "obra/ultim-sopar"],
              },
              {
                icona: Search,
                titol: "Troba obres per examen",
                passos: ["Filtra escultura + Quattrocento", "El David de Donatello i el contrapposto", "Compara amb el David de Miquel Àngel"],
                destins: ["coleccions?disciplina=escultura&periode=quattrocento", "obra/david-bronze-donatello", "obra/david-marbre"],
              },
              {
                icona: ZoomIn,
                titol: "Mira-hi de prop",
                passos: ["Filtra per Miquel Àngel", "Obre la Pietà vaticana amb Deep Zoom", "Segueix els detalls de la fitxa"],
                destins: ["coleccions?artista=miquel-angel", "obra/pietat-vaticana", "obra/volta-sixtina"],
              },
            ].map((it) => (
              <div key={it.titol} className="rounded-xl bg-card border border-linia p-5">
                <p className="flex items-center gap-2 font-serif text-lg mb-3">
                  <it.icona className="size-4 text-concepte" aria-hidden />
                  {it.titol}
                </p>
                <ol className="space-y-1.5">
                  {it.passos.map((pas, i) => (
                    <li key={pas} className="flex items-start gap-2 text-[13.5px] leading-snug">
                      <span className="mt-0.5 inline-flex size-4.5 min-w-4.5 items-center justify-center rounded-full bg-[var(--terra-suau)] text-[10px] text-accio font-bold">
                        {i + 1}
                      </span>
                      <Enllac
                        desti={it.destins[i]}
                        className="text-left text-tinta-2 hover:text-accio hover:underline transition-colors"
                      >
                        {pas}
                      </Enllac>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Obra per descobrir ── */}
      <section className="border-t border-linia bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="size-4 text-concepte" aria-hidden />
            <h2 className="font-serif text-2xl">Obra per descobrir</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-[280px_1fr] items-start">
            <div className="w-full max-w-[280px]">
              <WorkCard obra={descoberta} prioritat />
            </div>
            <div>
              <p className="font-serif italic text-xl mb-3">{descoberta.titol}</p>
              <p className="text-[15px] leading-relaxed text-tinta-2 prose-llegible">
                {descoberta.relevancia}
              </p>
              <p className="flex items-start gap-2 text-sm text-tinta-2 mt-4">
                <MapPin className="size-4 mt-0.5 shrink-0 text-concepte" aria-hidden />
                {descoberta.ubicacio.museu}, {descoberta.ubicacio.ciutat} ({descoberta.ubicacio.pais})
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Introducció al fenomen (bloc 0) ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <h2 className="font-serif text-2xl sm:text-3xl max-w-2xl">
          Què és el Renaixement, i com mirar-lo
        </h2>
        <div className="grid gap-8 md:grid-cols-3 mt-8 text-[15px] leading-relaxed text-tinta-2">
          <div>
            <p className="text-concepte text-xs uppercase tracking-wider mb-2">1 · L&apos;antiguitat</p>
            <p className="prose-llegible">
              Itàlia vivia literalment damunt de Roma: des del <Term terme="Quattrocento">Quattrocento</Term>,
              els artistes estudien ruïnes, escultures i textos clàssics com a model a emular, no com a record llunyà.
            </p>
          </div>
          <div>
            <p className="text-concepte text-xs uppercase tracking-wider mb-2">2 · L&apos;humanisme</p>
            <p className="prose-llegible">
              L&apos;ésser humà esdevé mesura de totes les coses: canvien els temes (retrats, mitologia, nu)
              i el lloc de l&apos;artista, que passa d&apos;artesà a figura intel·lectual.
            </p>
          </div>
          <div>
            <p className="text-concepte text-xs uppercase tracking-wider mb-2">3 · La revolució tècnica</p>
            <p className="prose-llegible">
              La <Term terme="perspectiva lineal">perspectiva lineal</Term> dona espai mesurable a la imatge;
              l&apos;<Term terme="oli">oli</Term>, vingut de Flandes, permet transparències i colors profunds;
              l&apos;anatomia observada completa les eines noves.
            </p>
          </div>
        </div>
        <Enllac
          desti="conceptes"
          className="mt-8 inline-flex items-center gap-2 text-accio hover:underline text-sm"
        >
          Veure totes les explicacions didàctiques
          <ArrowRight className="size-4" aria-hidden />
        </Enllac>
      </section>
    </div>
  );
}
