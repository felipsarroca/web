// GlossaryView.tsx — Glossari: índex alfabètic de termes (Taula 5 de la programació)
"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/renaissance/store";
import { GLOSSARI_ORD } from "@/data/glossari";
import { concepte } from "@/data/conceptes";
import { TextViu } from "./Term";

export default function GlossaryView() {
  const { navega } = useApp();

  // Grup per lletra inicial
  const grups = useMemo(() => {
    const m = new Map<string, typeof GLOSSARI_ORD>();
    for (const g of GLOSSARI_ORD) {
      const lletra = g.terme[0].toLocaleUpperCase("ca");
      if (!m.has(lletra)) m.set(lletra, []);
      m.get(lletra)!.push(g);
    }
    return [...m.entries()];
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Glossari</h1>
      <p className="mt-2 text-tinta-2 text-[15px] max-w-2xl">
        Índex alfabètic de termes: cap terme tècnic sense explicació a un toc de
        distància. Aquests termes apareixen subratllats arreu de la web, amb
        definició emergent.
      </p>

      <nav className="mt-6 flex flex-wrap gap-1.5" aria-label="Índex alfabètic">
        {grups.map(([lletra]) => (
          <a
            key={lletra}
            href={"#lletra-" + lletra}
            className="size-8 grid place-items-center rounded-md bg-superficie border border-border text-sm text-concepte hover:border-accio/50 transition-colors"
          >
            {lletra}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-10">
        {grups.map(([lletra, termes]) => (
          <section key={lletra} id={"lletra-" + lletra} aria-label={"Lletra " + lletra}>
            <h2 className="font-serif text-2xl text-concepte filet-aur pb-2">{lletra}</h2>
            <dl className="mt-4 space-y-5">
              {termes.map((g) => (
                <div key={g.terme} id={"terme-" + g.terme}>
                  <dt className="font-serif text-lg">
                    <em className={g.termeItalic ? "" : "not-italic"}>{g.terme}</em>
                  </dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-tinta-2">
                    <TextViu text={g.definicio} />
                    {g.vincle && concepte(g.vincle) && (
                      <button
                        onClick={() => navega("concepte/" + g.vincle)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[13px] text-accio hover:underline"
                      >
                        Veure la fitxa del concepte →
                      </button>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
