// ArtistDetailView.tsx — Fitxa d'artista (model 4.2 i cap. 7.3)
"use client";

import { MapPin, Quote } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { artista } from "@/data/artistes";
import { obresArtista } from "@/data/obres";
import { proporció } from "@/data/imatges";
import ImgObra from "./ImgObra";
import { etiqueta } from "@/lib/renaissance/utils";
import WorkCard from "./WorkCard";
import NotFoundView from "./NotFoundView";
import { TextViu } from "./Term";

export default function ArtistDetailView({ slug }: { slug: string }) {
  const { navega } = useApp();
  const a = artista(slug);
  if (!a) return <NotFoundView missatge="Aquest artista no té fitxa al corpus." />;

  const obres = obresArtista(a.slug);
  const capçalera = obres[obres.length - 1] ?? obres[0];

  return (
    <article className="pb-4">
      {/* ── Capçalera amb obra representativa ── */}
      <div className="relative min-h-[42vh] flex items-end overflow-hidden bg-paper-2">
        {capçalera && (
          <>
            { }
            <ImgObra
              slug={capçalera.slug}
              amplada={1600}
              alt={`Obra de ${a.nom}: ${capçalera.titol}`}
              className="absolute inset-0 size-full object-cover"
              style={{ opacity: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(37,44,45,0.7)] via-[rgba(37,44,45,0.4)] to-transparent" />
          </>
        )}
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 pb-8 pt-20">
          <p className="text-concepte text-xs uppercase tracking-[0.18em]">
            {a.ambits.join(" · ")} · {etiqueta("periode", a.periode)}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl mt-2">{a.nom}</h1>
          {a.nomOriginal && a.nomOriginal !== a.nom && (
            <p className="font-serif italic text-lg text-tinta-2 mt-1">{a.nomOriginal}</p>
          )}
          <p className="mt-2 flex items-center gap-2 text-[15px] text-tinta-2">
            <MapPin className="size-4 shrink-0 text-concepte" aria-hidden />
            {a.dates} · {a.llocs}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
        {/* Mini-biografia */}
        <section aria-label="Mini-biografia">
          <h2 className="font-serif text-2xl mb-4">Vida i aportació</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-tinta-2">
            {a.biografia.split("\n").map((p, i) => (
              <TextViu key={i} text={p} />
            ))}
          </div>

          {a.cita && (
            <blockquote className="mt-8 border-l-2 border-concepte pl-4 py-1">
              <Quote className="size-4 text-concepte mb-1.5" aria-hidden />
              <p className="font-serif italic text-[17px] leading-relaxed">«{a.cita.text}»</p>
              <cite className="block not-italic text-[12px] text-tinta-2 mt-2">— {a.cita.font}</cite>
            </blockquote>
          )}
        </section>

        {/* Trets d'estil i innovacions */}
        <aside className="space-y-8">
          <section aria-label="Trets d'estil">
            <h2 className="font-serif text-2xl mb-4">Com reconèixer l&apos;estil</h2>
            <ul className="space-y-3">
              {a.tretsEstil.map((t, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-tinta-2">
                  <span className="mt-2 size-1.5 rounded-full bg-accio shrink-0" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </section>
          <section aria-label="Innovacions">
            <h2 className="font-serif text-2xl mb-4">Va fer per primera vegada</h2>
            <ul className="space-y-3">
              {a.innovacions.map((t, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-tinta-2">
                  <span className="mt-2 size-1.5 rounded-full bg-concepte shrink-0" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* Obres a la web */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <section aria-label="Obres a la web">
          <h2 className="font-serif text-2xl mb-2">
            Obres a la web{" "}
            <span className="text-tinta-2 text-lg font-sans">({obres.length})</span>
          </h2>
          {obres.length === 0 ? (
            <p className="text-sm text-tinta-2 mt-3">
              Aquest artista encara no té obres al corpus; la seva fitxa es manté
              com a referència per a les properes ampliacions.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {obres.map((o) => (
                <WorkCard key={o.slug} obra={o} />
              ))}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
