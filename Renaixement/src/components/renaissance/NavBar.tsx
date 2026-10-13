// NavBar.tsx — Navegació reagrupada (audit P1 disseny): barra principal per a les
// àrees de contingut (Inici, Obres, Cronologia, Conceptes, Artistes), «Explora»
// agrupant Arquitectura i Fora d'Itàlia, i utilitats (Glossari, Sobre) secundàries.
// Menú mòbil amb focus management, Escape i retorn de focus (audit P1 a11y).
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useApp, type Vista } from "@/lib/renaissance/store";
import { camiPublic } from "@/lib/renaissance/camins";

interface Enllac {
  desti: string;
  label: string;
  vistes: string[];
}

const PRINCIPALS: Enllac[] = [
  { desti: "", label: "Inici", vistes: ["home"] },
  { desti: "coleccions", label: "Obres", vistes: ["coleccions", "obra"] },
  { desti: "cronologia", label: "Cronologia", vistes: ["cronologia"] },
  { desti: "conceptes", label: "Conceptes", vistes: ["conceptes", "concepte"] },
  { desti: "artistes", label: "Artistes", vistes: ["artistes", "artista"] },
];

const EXPLORA: Enllac[] = [
  { desti: "arquitectura", label: "Arquitectura", vistes: ["arquitectura"] },
  { desti: "fora-ditalia", label: "Fora d'Itàlia", vistes: ["fora"] },
  { desti: "comparacions", label: "Comparacions", vistes: ["comparacions"] },
];

const UTILITATS: Enllac[] = [
  { desti: "glossari", label: "Glossari", vistes: ["glossari"] },
  { desti: "sobre", label: "Sobre", vistes: ["sobre"] },
];

const TOTS = [...PRINCIPALS, ...EXPLORA, ...UTILITATS];

export default function NavBar() {
  const { vista, navega } = useApp();
  const [menuObert, setMenuObert] = useState(false);
  const [exploraObert, setExploraObert] = useState(false);
  const botoMenuRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const exploraRef = useRef<HTMLDivElement>(null);

  const actiu = (e: Enllac) => e.vistes.includes(vista.nom as Vista["nom"]);
  const navegar = (desti: string) => {
    navega(desti);
    setMenuObert(false);
    setExploraObert(false);
  };

  // Escape + clic fora per a «Explora»; Escape tanca el menú mòbil i retorna el focus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExploraObert(false);
        if (menuObert) {
          setMenuObert(false);
          botoMenuRef.current?.focus();
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (exploraObert && exploraRef.current && !exploraRef.current.contains(e.target as Node)) {
        setExploraObert(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [exploraObert, menuObert]);

  // Menú mòbil: focus dins del menú en obrir-lo
  useEffect(() => {
    if (menuObert) menuRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, [menuObert]);

  const classeLink = (activa: boolean) =>
    `px-2.5 py-1.5 rounded-md text-[13.5px] transition-colors ${
      activa
        ? "text-accio bg-[var(--terra-suau)]"
        : "text-tinta-2 hover:text-tinta hover:bg-tinta/5"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center gap-4">
        {/* Logo */}
        <button
          onClick={() => navegar("")}
          className="flex items-center gap-2 shrink-0"
          aria-label="Anar a l'inici"
        >
          <img src={camiPublic("/favicon.svg")} alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
          <span className="font-serif text-xl tracking-tight text-tinta">El Renaixement</span>
        </button>

        {/* Enllaços principals d'escriptori */}
        <nav className="hidden md:flex items-center gap-1 ml-auto" aria-label="Navegació principal">
          {PRINCIPALS.map((e) => (
            <button
              key={e.desti}
              onClick={() => navega(e.desti)}
              className={classeLink(actiu(e))}
              aria-current={actiu(e) ? "page" : undefined}
            >
              {e.label}
            </button>
          ))}

          {/* Agrupació «Explora» (audit: menys opcions de primer nivell) */}
          <div ref={exploraRef} className="relative">
            <button
              onClick={() => setExploraObert(!exploraObert)}
              className={classeLink(EXPLORA.some(actiu)) + " inline-flex items-center gap-1"}
              aria-expanded={exploraObert}
              aria-haspopup="true"
            >
              Explora
              <ChevronDown className={`size-3.5 transition-transform ${exploraObert ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {exploraObert && (
              <div
                className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-border bg-card shadow-xl p-1"
                role="menu"
              >
                {EXPLORA.map((e) => (
                  <button
                    key={e.desti}
                    onClick={() => navegar(e.desti)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      actiu(e) ? "text-accio bg-[var(--terra-suau)]" : "text-tinta-2 hover:text-tinta hover:bg-tinta/5"
                    }`}
                    role="menuitem"
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Utilitats: pes visual menor (audit: Glossari/Sobre no competeixen) */}
          <div className="w-px h-5 bg-tinta/10 mx-1" aria-hidden />
          {UTILITATS.map((e) => (
            <button
              key={e.desti}
              onClick={() => navega(e.desti)}
              className={`px-2 py-1.5 rounded-md text-[12.5px] text-tinta-2 transition-colors ${
                actiu(e) ? "text-accio bg-[var(--terra-suau)]" : "hover:text-tinta hover:bg-tinta/5"
              }`}
              aria-current={actiu(e) ? "page" : undefined}
            >
              {e.label}
            </button>
          ))}
        </nav>

        {/* Botó de menú mòbil */}
        <button
          ref={botoMenuRef}
          className="ml-auto md:hidden p-2 rounded-md hover:bg-tinta/5"
          onClick={() => setMenuObert(!menuObert)}
          aria-expanded={menuObert}
          aria-controls="menu-mobil"
          aria-label={menuObert ? "Tancar el menú" : "Obrir el menú"}
        >
          {menuObert ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {/* Menú mòbil: focus inicial dins, Escape retorna el focus al botó */}
      {menuObert && (
        <div
          id="menu-mobil"
          ref={menuRef}
          className="md:hidden border-t border-border bg-paper-2 px-4 py-3 grid grid-cols-2 gap-1"
          aria-label="Navegació mòbil"
        >
          {[...TOTS].map((e) => (
            <button
              key={e.desti || "inici"}
              onClick={() => navegar(e.desti)}
              className={`text-left px-3 py-2.5 rounded-md text-[15px] min-h-11 ${
                actiu(e) ? "text-accio bg-[var(--terra-suau)]" : "text-tinta-2"
              }`}
              aria-current={actiu(e) ? "page" : undefined}
            >
              {e.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
