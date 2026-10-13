// WorkDetailView.tsx — Fitxa d'obra (auditoria de composició i didàctica):
//   · Reproducció sencera sobre fons neutre; enquadrament diferent per a obres
//     verticals (columna estreta) i horitzontals (ample complet).
//   · Dades en una columna ben ordenada; «Per què és rellevant» encapçalat per la
//     seva primera frase com a lead; anàlisi i activitat en blocs amb aire.
//   · Datació amb precisió i font explícita; zoom etiquetat per resolució efectiva.
//   · Enllaços HTML reals a artistes, conceptes i obres relacionades.
"use client";

import { MapPin, ExternalLink, Maximize2, Eye, ZoomIn, PlayCircle, ArrowLeft } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { obra } from "@/data/obres";
import { artista } from "@/data/artistes";
import { concepte } from "@/data/conceptes";
import { credit, urlFitxer, estatImatge, nivellZoom, dominiPublic, IMATGES, proporció } from "@/data/imatges";
import { teAnotacions, anotacionsDe } from "@/data/anotacions";
import { fontsDe } from "@/data/fonts";
import { precisioDeData, ETIQUETES, type PrecisioData } from "@/data/types";
import ImgObra from "./ImgObra";
import Enllac from "./Enllac";
import { etiqueta, textUbicacio } from "@/lib/renaissance/utils";
import WorkCard from "./WorkCard";
import { TextViu } from "./Term";
import NotFoundView from "./NotFoundView";

const ETIQUETA_PRECISIO: Record<PrecisioData, string> = {
  exacta: "any exacte",
  any: "any de referència",
  rang: "interval de dates",
  aproximada: "datació aproximada",
  iniciada: "obra iniciada, anys en curs",
};

export default function WorkDetailView({ slug }: { slug: string }) {
  const { obreViewer, filtres } = useApp();
  const o = obra(slug);
  if (!o) return <NotFoundView missatge="Aquesta obra no és al corpus." />;

  // Context cronològic: si s'ha arribat des de la cronologia, el botó de retorn hi torna
  const desDeCronologia = filtres.desDe === "cronologia";

  const a = artista(o.autorSlug);
  const ratio = proporció(o.slug);
  const estat = estatImatge(o.slug);
  const nivell = nivellZoom(o.slug);
  const vertical = ratio < 0.95; // obres verticals: marc més estret (auditoria)
  const precisio = precisioDeData(o.data);

  // «Per què és rellevant» com a frase curta: la primera frase és el lead
  const rel = o.relevancia.trim();
  const punt = rel.search(/[.!?](\s|$)/);
  const relLead = punt > 0 ? rel.slice(0, punt + 1) : rel;
  const relResta = punt > 0 ? rel.slice(punt + 1).trim() : "";

  const relacionades = o.relacionades.map((r) => obra(r)).filter(Boolean);

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {desDeCronologia ? (
        <Enllac
          desti={filtres.vista ? `cronologia?vista=${filtres.vista}` : "cronologia"}
          className="inline-flex items-center gap-1.5 text-sm text-tinta-2 hover:text-accio mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Tornar a la cronologia
        </Enllac>
      ) : (
        <Enllac
          desti="coleccions"
          className="inline-flex items-center gap-1.5 text-sm text-tinta-2 hover:text-accio mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Tornar al catàleg
        </Enllac>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* ── Reproducció sobre fons neutre; la vertical en columna estreta ── */}
        <div>
          <div
            className={`rounded-lg border border-linia bg-superficie p-3 sm:p-4 ${vertical ? "mx-auto max-w-[540px]" : ""}`}
          >
            <button
              onClick={() => obreViewer(o.slug)}
              className="group relative block w-full overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accio"
              aria-label={`Obrir ${o.titol} al visor${estat === "zoom" ? " de detall" : " d'imatge ampliada"}`}
            >
              <ImgObra
                slug={o.slug}
                amplada={1200}
                sizes="(max-width: 1024px) 92vw, 56vw"
                alt={`${o.titol}, ${o.autorNom}, ${o.data}. ${o.tecnica}`}
                loading="eager"
                className="w-full h-auto mx-auto max-h-[72vh]"
                style={{ aspectRatio: `${ratio}` }}
                fit="contain"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 group-focus-visible:bg-black/30 transition-colors">
                <span className="inline-flex items-center gap-2 rounded-full bg-paper/95 border border-linia px-4 py-2 text-sm text-tinta opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                  {estat === "zoom" ? <ZoomIn className="size-4" aria-hidden /> : <Maximize2 className="size-4" aria-hidden />}
                  {estat === "zoom" ? "Obrir el visor de detall" : "Ampliar la imatge"}
                </span>
              </span>
            </button>
          </div>
          <p className="mt-2 text-[12px] text-tinta-2">
            {credit(o.slug)} ·{" "}
            <a href={urlFitxer(o.slug)} target="_blank" rel="noopener noreferrer" className="underline hover:text-accio">
              fitxer original
            </a>
          </p>
          {estat !== "zoom" && (
            <p className="mt-1.5 rounded-md border border-linia bg-card px-3 py-2 text-[12.5px] text-tinta-2 leading-relaxed" role="note">
              {estat === "pendent"
                ? "Aquesta obra encara no té reproducció local: la imatge s'afegirà en properes actualitzacions."
                : "Aquesta obra té reproducció local, però no piràmide Deep Zoom: el visor amplia fins al màxim del fitxer."}
            </p>
          )}
          {estat === "zoom" && nivell === "mitja" && (
            <p className="mt-1.5 rounded-md border border-concepte/40 bg-[var(--concepte-suau)] px-3 py-2 text-[12.5px] text-tinta-2 leading-relaxed" role="note">
              El visor navega per tiles, però el màster local és de resolució mitjana: el zoom no
              revela més detalls dels que té el fitxer original servit.{" "}
              <a href={urlFitxer(o.slug)} target="_blank" rel="noopener noreferrer" className="underline">
                Comparau amb l&apos;original a Commons
              </a>.
            </p>
          )}
        </div>

        {/* ── Dades en una columna ben ordenada ── */}
        <div>
          <p className="text-concepte text-xs uppercase tracking-[0.18em]">
            {etiqueta("disciplina", o.disciplina)} · {ETIQUETES_BLOC(o.bloc)}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl mt-2 leading-tight">{o.titol}</h1>
          {o.titolOriginal && (
            <p className="font-serif italic text-lg text-tinta-2 mt-1">{o.titolOriginal}</p>
          )}

          <dl className="mt-5 space-y-2 text-[15px]">
            <div className="flex gap-2">
              <dt className="text-tinta-2 w-24 shrink-0">Autor</dt>
              <dd>
                {a ? (
                  <Enllac desti={"artista/" + a.slug} className="text-accio hover:underline">
                    {o.autorNom}
                  </Enllac>
                ) : (
                  <span>{o.autorNom}</span>
                )}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-tinta-2 w-24 shrink-0">Data</dt>
              <dd>
                {o.data}{" "}
                <span
                  className="ml-1 inline-block rounded border border-concepte/40 px-1.5 text-[10px] uppercase tracking-wide text-concepte"
                  title="Precisió de la datació"
                >
                  {ETIQUETA_PRECISIO[precisio]}
                </span>
                {o.fontData && (
                  <span className="block text-[12px] text-tinta-2 mt-0.5">Font de la data: {o.fontData}</span>
                )}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-tinta-2 w-24 shrink-0">Tècnica</dt>
              <dd>{o.tecnica}</dd>
            </div>
            {o.dimensions && (
              <div className="flex gap-2">
                <dt className="text-tinta-2 w-24 shrink-0">Dimensions</dt>
                <dd>{o.dimensions}</dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="text-tinta-2 w-24 shrink-0">Període</dt>
              <dd>
                <Enllac desti={"coleccions?periode=" + o.periode} className="text-accio hover:underline">
                  {etiqueta("periode", o.periode)}
                </Enllac>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-tinta-2 w-24 shrink-0">Ubicació</dt>
              <dd>
                <span className="flex items-start gap-1.5">
                  <MapPin className="size-4 mt-1 shrink-0 text-concepte" aria-hidden />
                  <span>
                    {o.ubicacio.url ? (
                      <a href={o.ubicacio.url} target="_blank" rel="noopener noreferrer" className="underline decoration-concepte/50 hover:decoration-concepte">
                        {textUbicacio(o)}
                      </a>
                    ) : (
                      textUbicacio(o)
                    )}
                    {o.ubicacio.url && (
                      <ExternalLink className="inline size-3 ml-1 text-tinta-2" aria-hidden />
                    )}
                  </span>
                </span>
              </dd>
            </div>
          </dl>

          {/* Per què és rellevant — lead com a frase curta (auditoria) */}
          <div className="bloc-relevancia rounded-r-lg p-4 mt-6">
            <p className="etiqueta-tipus etiqueta-tipus-aur mb-1.5">Per què és rellevant</p>
            <p className="font-serif text-[17px] leading-snug text-tinta">{relLead}</p>
            {relResta && <p className="text-[14px] leading-relaxed text-tinta-2 mt-2">{relResta}</p>}
          </div>

          {/* Etiquetes de concepte */}
          {o.concepts.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {o.concepts.map((c) => {
                const con = concepte(c);
                if (!con) return null;
                return (
                  <Enllac
                    key={c}
                    desti={"concepte/" + c}
                    className="rounded-full border border-concepte/45 bg-[var(--concepte-suau)] px-3 py-1 text-[13px] text-concepte hover:bg-[rgba(128,101,39,0.18)] transition-colors"
                  >
                    {con.nom}
                  </Enllac>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Capa d'estudi: context (dada) i anàlisi (interpretació), blocs amb aire ── */}
      <div className="mt-20 grid gap-12 lg:grid-cols-2 max-w-6xl">
        <section aria-label="Context històric" className="bloc-dada pl-4">
          <p className="etiqueta-tipus mb-1">Dada · fet documentat</p>
          <h2 className="font-serif text-2xl mb-4">Context històric</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2 prose-llegible">
            <TextViu text={o.context} />
          </div>
        </section>
        <section aria-label="Anàlisi formal" className="bloc-interpretacio pl-4">
          <p className="etiqueta-tipus etiqueta-tipus-aur mb-1">Interpretació</p>
          <h2 className="font-serif text-2xl mb-4">Anàlisi formal</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2 prose-llegible">
            <TextViu text={o.analisi} />
          </div>
          <p className="mt-3 text-[12.5px] text-tinta-2 leading-relaxed prose-llegible">
            L&apos;anàlisi formal és lectura interpretativa de la imatge: contrasteu-la amb el que veu
            l&apos;ull al visor i amb les fonts de la fitxa.
          </p>
        </section>
      </div>

      {/* ── Activitat: seqüència al visor + mira-hi de prop ── */}
      {((o.miraHiDeProp && o.miraHiDeProp.length > 0) || teAnotacions(o.slug)) && (
      <section className="mt-20 max-w-6xl" aria-label="Detalls per observar al visor">
        <div className="bloc-activitat rounded-lg p-5 sm:p-6">
          <h2 className="font-serif text-2xl mb-3 flex items-center gap-2">
            <Eye className="size-5 text-concepte" aria-hidden />
            Mira-hi de prop
          </h2>
          <p className="text-sm text-tinta-2 mb-4 max-w-2xl prose-llegible">
            {teAnotacions(o.slug)
              ? "Aquesta obra té anotacions didàctiques amb pregunta d'observació: obriu el visor i seguiu la seqüència guiada (primer la pregunta, després la comprovació)."
              : "Detalls dignes de zoom. Obriu el visor i cerqueu aquestes zones: el visor no és decoratiu, és argumentatiu."}
          </p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {(o.miraHiDeProp ?? []).map((detall, i) => (
              <li key={i} className="rounded-lg bg-card border border-linia p-4 text-[14px] leading-relaxed">
                <span className="text-concepte font-serif italic mr-1.5">{i + 1}.</span>
                {detall}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => obreViewer(o.slug)}
              className="inline-flex items-center gap-2 rounded-md bg-accio px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accio-fort)] transition-colors"
            >
              <PlayCircle className="size-4" aria-hidden />
              {teAnotacions(o.slug) ? "Obrir la seqüència d'observació" : estat === "zoom" ? "Obrir el visor de detall" : "Obrir el visor"}
            </button>
            {teAnotacions(o.slug) && (
              <span className="text-[12.5px] text-tinta-2">
                {anotacionsDe(o.slug).filter((an) => !!an.pregunta).length} anotacions amb pregunta d&apos;observació
              </span>
            )}
          </div>
        </div>
      </section>
      )}

      {/* ── Curiositats ── */}
      {o.curiositats && o.curiositats.length > 0 && (
        <section className="mt-16 max-w-6xl" aria-label="Curiositats">
          <h2 className="font-serif text-2xl mb-4">Curiositats</h2>
          <ul className="space-y-3 max-w-3xl">
            {o.curiositats.map((c, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-tinta-2 prose-llegible">
                <span className="mt-2.5 size-1.5 rounded-full bg-concepte shrink-0" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Fonts i crèdits (bloc «font»: contingut + imatge) ── */}
      <section className="mt-16 max-w-6xl rounded-lg bg-card border border-linia p-5 bloc-font" aria-label="Fonts i crèdits">
        <h2 className="font-serif text-lg mb-3">Fonts d&apos;aquesta fitxa</h2>
        <ul className="space-y-2.5 text-[13.5px] text-tinta-2 leading-relaxed">
          {fontsDe(o.slug).map((f, i) => (
            <li key={i} className="flex flex-wrap gap-x-2 items-baseline">
              <span className="etiqueta-tipus shrink-0" aria-hidden>
                {f.tipus === "museu" ? "Museu" : f.tipus === "font-tradicional" ? "Tradició" : "Bibliografia"}
              </span>
              <span>
                {f.url ? (
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[rgba(79,91,92,0.4)] hover:decoration-accio">
                    {f.text}
                    <ExternalLink className="inline size-3 ml-1 text-tinta-2" aria-hidden />
                  </a>
                ) : (
                  f.text
                )}
                {f.nota && <span className="block text-[12px] text-tinta-2 italic">{f.nota}</span>}
              </span>
            </li>
          ))}
          <li className="flex flex-wrap gap-x-2 items-baseline">
            <span className="etiqueta-tipus shrink-0" aria-hidden>Imatge</span>
            <span>
              Reproducció digital: Wikimedia Commons ({IMATGES[o.slug]?.fitxer ?? "sense fitxer"}).{" "}
              {dominiPublic(o.slug)
                ? "L'obra original és de domini públic; la fotografia conserva la llicència del seu autor."
                : "La fotografia té la llicència indicada pel seu autor."}{" "}
              <a href={urlFitxer(o.slug)} target="_blank" rel="noopener noreferrer" className="underline hover:text-accio">
                Pàgina del fitxer amb el crèdit complet
              </a>
            </span>
          </li>
          <li className="flex flex-wrap gap-x-2 items-baseline">
            <span className="etiqueta-tipus shrink-0" aria-hidden>Corpus</span>
            <span>Contingut didàctic i anàlisi: corpus editorial propi de la web, redactat en català per a l&apos;aula i revisat contra les fonts citades.</span>
          </li>
        </ul>
      </section>

      {/* ── Obres relacionades ── */}
      {relacionades.length > 0 && (
        <section className="mt-16" aria-label="Obres relacionades">
          <h2 className="font-serif text-2xl mb-5">Segueix explorant</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relacionades.map((r) => r && <WorkCard key={r.slug} obra={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}

function ETIQUETES_BLOC(bloc: number): string {
  const map: Record<number, string> = {
    1: "Quattrocento",
    2: "Cinquecento",
    3: "Conceptes tècnics",
    4: "Arquitectura",
    5: "Escultura",
    6: "Fora d'Itàlia",
  };
  return map[bloc] ?? "";
}
