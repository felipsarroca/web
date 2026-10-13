// ArchitectureView.tsx — Bloc 4: arquitectura del Renaixement i escoles espanyoles (model 4.4)
"use client";

import { useApp } from "@/lib/renaissance/store";
import { ESCOLES } from "@/data/escoles";
import { obresEscola } from "@/data/obres";
import { artista } from "@/data/artistes";
import { proporció } from "@/data/imatges";
import ImgObra from "./ImgObra";
import WorkCard from "./WorkCard";

export default function ArchitectureView() {
  const { navega } = useApp();
  const core = obresEscola("italiana");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Arquitectura i escoles</h1>
      <p className="mt-2 text-tinta-2 max-w-2xl text-[15px]">
        L&apos;arquitectura renaixentista torna a construir amb els ordres clàssics i
        les proporcions matemàtiques; a Espanya aquesta reforma s&apos;hi arriba en
        tres onades observables: Plateresca, Classicista i Herreriana.
      </p>

      {/* Idea-força del bloc */}
      <div className="bloc-relevancia rounded-r-lg p-5 mt-6 max-w-3xl">
        <p className="text-accio text-xs font-semibold uppercase tracking-wider mb-1.5">
          Idea-força del bloc
        </p>
        <p className="text-[16px] leading-relaxed text-tinta">
          Ordres clàssics, proporcions mesurables i la cúpula com a corona: quan una
          façana parleu amb la geometria dels antics, esteu davant del Renaixement.
        </p>
      </div>

      {/* ── La font italiana ── */}
      <section className="mt-12" aria-label="Renaixement italià">
        <h2 className="font-serif text-2xl">La font: el Renaixement italià</h2>
        <p className="mt-2 text-[15px] text-tinta-2 max-w-3xl leading-relaxed">
          De la cúpula de Brunelleschi (1420) a les vil·les de Palladio (1570), els
          tractats d&apos;Alberti i de Palladio converteixen la construcció en ciència
          escrita. Aquests són els edificis que les escoles espanyoles i francesa
          adaptaran a la seva manera.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {core.map((o) => (
            <WorkCard key={o.slug} obra={o} />
          ))}
        </div>
      </section>

      {/* ── Les cinc escoles ── */}
      <section className="mt-14" aria-label="Escoles arquitectòniques">
        <h2 className="font-serif text-2xl">Les escoles, una a una</h2>
        <div className="mt-6 space-y-6">
          {ESCOLES.filter((e) => e.slug !== "italiana").map((e) => {
            const obres = obresEscola(e.slug);
            return (
              <article key={e.slug} className="rounded-xl bg-card border border-border overflow-hidden">
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl text-concepte">{e.nom}</h3>
                    <p className="text-[13px] text-tinta-2">{e.cronologia}</p>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-tinta max-w-3xl">{e.definicio}</p>

                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-tinta-2 mb-2">Trets formals reconeixibles</p>
                      <ul className="space-y-2">
                        {e.trets.map((t, i) => (
                          <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-tinta-2">
                            <span className="mt-2 size-1.5 rounded-full bg-accio shrink-0" aria-hidden />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-tinta-2 mb-2">Com distingir-la</p>
                      <p className="text-[14px] leading-relaxed text-tinta-2">{e.comDistingirLa}</p>
                      {e.autors.length > 0 && (
                        <>
                          <p className="text-xs uppercase tracking-wider text-tinta-2 mt-4 mb-2">Autors clau</p>
                          <div className="flex flex-wrap gap-2">
                            {e.autors.map((s) => {
                              const a = artista(s);
                              if (!a) return null;
                              return (
                                <button
                                  key={s}
                                  onClick={() => navega("artista/" + s)}
                                  className="rounded-full border border-border bg-superficie px-3 py-1 text-[13px] hover:border-accio/50 hover:text-accio transition-colors"
                                >
                                  {a.nom}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {obres.length > 0 && (
                  <div className="border-t border-border p-5 sm:p-6 bg-superficie">
                    <p className="text-xs uppercase tracking-wider text-tinta-2 mb-3">
                      Obres representatives ({obres.length})
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {obres.map((o) => (
                        <WorkCard key={o.slug} obra={o} />
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Comparativa en tres columnes (la peça didàctica clau del bloc) ── */}
      <section className="mt-14" aria-label="Comparativa de les escoles espanyoles">
        <h2 className="font-serif text-2xl">Les tres escoles espanyoles, costat a costat</h2>
        <p className="mt-2 text-[15px] text-tinta-2 max-w-3xl leading-relaxed">
          L&apos;exercici d&apos;identificació clau: decoració abundant, norma clàssica
          o austeritat geomètrica. Compteu els ordres superposats del palau de Carles V,
          seguiu el ritme vertical de la façana de Salamanca, mesureu la proporció
          entre buits i plens a l&apos;Escorial.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["plateresca", "classicista", "herreriana"].map((slug, i) => {
            const e = ESCOLES.find((x) => x.slug === slug)!;
            const o = obresEscola(slug)[0];
            const colors = ["text-accio", "text-concepte", "text-tinta-2"];
            return (
              <div key={slug} className="rounded-xl bg-card border border-border p-5">
                <p className={`font-serif text-lg ${colors[i]}`}>{e.nom}</p>
                <p className="text-[12px] text-tinta-2 mt-0.5">{e.cronologia}</p>
                {o && (
                  <button
                    onClick={() => navega("obra/" + o.slug)}
                    className="mt-3 block w-full text-left rounded-lg overflow-hidden border border-border group"
                  >
                    <div className="bg-paper-2 overflow-hidden" style={{ aspectRatio: `${Math.max(proporció(o.slug), 1)}` }}>
                      { }
                      <ImgObra
                        slug={o.slug}
                        amplada={480}
                        alt={`${o.titol}, ${o.autorNom}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <p className="p-3 text-[13px] group-hover:text-accio transition-colors">
                      {o.titol} →
                    </p>
                  </button>
                )}
                <p className="mt-3 text-[13px] leading-relaxed text-tinta-2">{e.trets[0]}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-tinta-2">{e.trets[e.trets.length - 1]}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
