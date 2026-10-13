// ArtistsView.tsx — Índex de fitxes d'artista amb filtres (cap. 5.8)
"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/renaissance/store";
import { ARTISTES } from "@/data/artistes";
import { obresArtista } from "@/data/obres";
import { proporció } from "@/data/imatges";
import ImgObra from "./ImgObra";
import { ETIQUETES } from "@/data/types";

export default function ArtistsView() {
  const { navega } = useApp();
  const [periode, setPeriode] = useState("");
  const [ambit, setAmbit] = useState("");

  const artistes = useMemo(
    () =>
      ARTISTES.filter((a) => {
        if (periode && a.periode !== periode && !(periode === "cinquecento" && a.periode === "manierisme") && !(periode === "flamenc" && a.periode === "nord")) return false;
        if (ambit && a.ambitFiltro !== ambit) return false;
        return true;
      }),
    [periode, ambit],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Artistes</h1>
      <p className="mt-2 text-tinta-2 max-w-2xl text-[15px]">
        Índex biogràfic del corpus: cada fitxa explica qui és, què aporta i per què
        el recordem, amb els trets d&apos;estil que fan de filtre mental i la graella
        de les seves obres a la web.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <select
          value={periode}
          onChange={(e) => setPeriode(e.target.value)}
          className="rounded-md bg-superficie border border-border px-2.5 py-2 text-sm"
          aria-label="Filtrar per període"
        >
          <option value="">Període: tots</option>
          {Object.entries(ETIQUETES.periode).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <select
          value={ambit}
          onChange={(e) => setAmbit(e.target.value)}
          className="rounded-md bg-superficie border border-border px-2.5 py-2 text-sm"
          aria-label="Filtrar per àmbit"
        >
          <option value="">Àmbit: tots</option>
          {Object.entries(ETIQUETES.ambit).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <span className="ml-auto text-sm text-tinta-2" aria-live="polite">
          {artistes.length} artistes
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artistes.map((a) => {
          const obres = obresArtista(a.slug);
          // Obra representativa: la més antiga amb imatge
          const repr = obres[0];
          return (
            <button
              key={a.slug}
              onClick={() => navega("artista/" + a.slug)}
              className="group text-left rounded-lg overflow-hidden bg-card border border-border hover:border-accio/50 transition-all hover:-translate-y-0.5"
            >
              <div className="flex gap-4 p-4">
                {repr && (
                  <div
                    className="w-16 shrink-0 rounded overflow-hidden bg-paper-2 border border-border"
                    style={{ aspectRatio: `${proporció(repr.slug)}` }}
                  >
                    { }
                    <ImgObra
                      slug={repr.slug}
                      amplada={128}
                      alt={`Obra representativa de ${a.nom}`}
                      className="size-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="font-serif text-[17px] leading-snug group-hover:text-accio transition-colors">
                    {a.nom}
                  </h2>
                  <p className="text-[12.5px] text-tinta-2 mt-0.5">
                    {a.dates} · {a.llocs}
                  </p>
                  <p className="text-[12px] text-tinta-2 mt-1.5">
                    {a.ambits.join(" · ")} · {obres.length} {obres.length === 1 ? "obra" : "obres"}
                  </p>
                </div>
              </div>
              <p className="px-4 pb-4 text-[13px] text-tinta-2 line-clamp-2 leading-relaxed">
                {a.tretsEstil[0]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
