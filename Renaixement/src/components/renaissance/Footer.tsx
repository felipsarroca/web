"use client";

import Image from "next/image";
import { useApp } from "@/lib/renaissance/store";
import { camiPublic } from "@/lib/renaissance/camins";

const URL_LLICENCIA = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca";

export default function Footer() {
  const { navega } = useApp();

  return (
    <footer className="mt-auto border-t border-border bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <p className="font-serif text-lg">Renaixement</p>
            <p className="mt-1 text-sm leading-relaxed text-tinta-2">
              Web de referència en català per a l&apos;estudi de la pintura,
              l&apos;escultura i l&apos;arquitectura del Renaixement.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navega("sobre")}
            className="self-start whitespace-nowrap text-sm font-medium text-accio transition-colors hover:text-tinta hover:underline"
          >
            Sobre el projecte
          </button>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <div className="flex items-start gap-3">
            <a
              href={URL_LLICENCIA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Llicència Creative Commons BY-NC-SA 4.0"
              className="mt-0.5 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accio"
            >
              <Image
                src={camiPublic("/CC_BY-NC-SA.png")}
                alt="Creative Commons BY-NC-SA"
                width={83}
                height={29}
                className="h-auto w-[83px]"
              />
            </a>
            <div className="space-y-1 text-xs leading-relaxed text-tinta-2">
              <p>
                Web creada per{" "}
                <a
                  href="https://ja.cat/felipsarroca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accio no-underline hover:text-tinta"
                >
                  Felip Sarroca
                </a>{" "}
                amb assistència de la IA.
              </p>
              <p>
                Obra sota llicència{" "}
                <a
                  href={URL_LLICENCIA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accio no-underline hover:text-tinta"
                >
                  CC BY-NC-SA 4.0
                </a>
                .
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-tinta-2">
            Totes les obres del corpus són de domini públic. Les fotografies provenen de
            Wikimedia Commons i respecten les llicències indicades a cada fitxa.
          </p>
        </div>
      </div>
    </footer>
  );
}
