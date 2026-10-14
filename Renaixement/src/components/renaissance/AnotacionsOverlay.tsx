// AnotacionsOverlay.tsx — Capes didàctiques sobre la imatge del visor (directriu secc. 6-8).
// Dues maneres de col·locar-se:
//  · mode "dzi": overlay situat exactament sobre la imatge projectada d'OpenSeadragon,
//    reposicionat a cada update-viewport (alineat amb zoom i panoràmica).
//  · mode "fallback": overlay dins del contenidor transformable de la imatge local
//    (les posicions en % ja segueixen el pan/zoom CSS del pare).
// Coordenades 0-1 → percentatges del contenidor de l'overlay.
// Les figures clicables (punt, etiqueta, zona) criden onSelecciona: el pare mostra
// la pregunta d'observació i la comprovació (seqüència didàctica).
"use client";

import { useEffect, useRef } from "react";
import { proporció } from "@/data/imatges";
import { COLOR_CAPA, primeraFrase, type Anotacio } from "@/data/anotacions";
import type { OSDNamespace } from "@/lib/renaissance/osd";

export default function AnotacionsOverlay({
  slug,
  anotacions,
  mode,
  osdMod = null,
  osd = null,
  destacatId = null,
  activaId = null,
  onSelecciona,
  mostraExplicacioCurta = false,
}: {
  slug: string;
  anotacions: Anotacio[];
  mode: "dzi" | "fallback";
  osdMod?: OSDNamespace | null;
  osd?: OpenSeadragon.Viewer | null;
  /** Anotació ressaltada (seqüència guiada: «clica el detall assenyalat»). */
  destacatId?: string | null;
  /** Anotació seleccionada (pregunta activa). */
  activaId?: string | null;
  onSelecciona?: (a: Anotacio) => void;
  /** Mode bàsic: les etiquetes mostren una frase, no el text sencer. */
  mostraExplicacioCurta?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Mode DZI: sincronitza l'overlay amb la imatge projectada (cada frame de viewport)
  useEffect(() => {
    if (mode !== "dzi" || !osd || !osdMod || !ref.current) return;
    const v = osd.viewport;
    const el = ref.current;

    const update = () => {
      try {
        const item = osd.world?.getItemAt(0); // OSD 6: la mida del contingut viu al TiledImage
        if (!item) return;
        const cs = item.getContentSize();
        if (!cs.x || !cs.y) return;
        const p0 = v.imageToViewerElementCoordinates(new osdMod!.Point(0, 0));
        const p1 = v.imageToViewerElementCoordinates(new osdMod!.Point(cs.x, 0));
        const amplada = p1.x - p0.x;
        if (amplada < 2) return; // massa petit per ser visible
        el.style.transform = `translate(${p0.x}px, ${p0.y}px)`;
        el.style.width = `${amplada}px`;
        el.style.height = `${amplada / (cs.x / cs.y)}px`;
      } catch {
        // el visor pot estar destruint-se durant el canvi d'obra
      }
    };
    update();
    osd.addHandler("update-viewport", update);
    return () => {
      try {
        osd.removeHandler("update-viewport", update);
      } catch {
        /* noop */
      }
    };
  }, [mode, osd, osdMod]);

  if (mode === "dzi" && (!osd || !osdMod)) return null;
  const aspect = proporció(slug); // amplada / alçada
  const vbH = 100 / aspect;

  const clic = (a: Anotacio) => {
    if (a.figura === "linia" || a.figura === "poligon") return; // figures no clicables
    onSelecciona?.(a);
  };

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 pointer-events-none"
      style={{ willChange: "transform", zIndex: 10 }}
      data-testid="anotacions-overlay"
    >
      <div className="relative w-full h-full">
        {/* Línies, polígons i rects (SVG estirat a la imatge) */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox={`0 0 100 ${vbH}`}
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.9))" }}
          aria-hidden="true"
        >
          {anotacions.map((a) => {
            const color = a.color ?? COLOR_CAPA[a.capa];
            if (a.figura === "linia") {
              const d = a.punts.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px * 100},${py * vbH}`).join(" ");
              return (
                <g key={a.id}>
                  <path d={d} fill="none" stroke="#101820" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" opacity="0.88" />
                  <path d={d} fill="none" stroke={color} strokeWidth={destacatId === a.id ? 5 : 4} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </g>
              );
            }
            if (a.figura === "poligon") {
              const pts = a.punts.map(([px, py]) => `${px * 100},${py * vbH}`).join(" ");
              return (
                <g key={a.id}>
                  <polygon points={pts} fill={color + "20"} stroke="#101820" strokeWidth="9" vectorEffect="non-scaling-stroke" />
                  <polygon points={pts} fill="none" stroke={color} strokeWidth={destacatId === a.id ? 5 : 4} vectorEffect="non-scaling-stroke" />
                </g>
              );
            }
            if (a.figura === "rect") {
              return (
                <rect
                  key={a.id}
                  x={a.x * 100}
                  y={a.y * vbH}
                  width={a.amplada * 100}
                  height={a.alcada * vbH}
                  fill={color + "1c"}
                  stroke={color}
                  strokeWidth="4"
                  vectorEffect="non-scaling-stroke"
                  rx="0.6"
                />
              );
            }
            return null;
          })}
        </svg>

        {/* Punts, etiquetes i zones (HTML: forma neta, clic i text accessible) */}
        {anotacions.map((a) => {
          const color = a.color ?? COLOR_CAPA[a.capa];
          const dest = destacatId === a.id;
          const act = activaId === a.id;
          const anim = dest ? "anotacio-pulsa" : "";

          if (a.figura === "punt") {
            return (
              <button
                key={a.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto rounded-full focus-visible:outline-none ${anim}`}
                style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  clic(a);
                }}
                aria-label={`${a.etiqueta}${a.pregunta ? `. Pregunta: ${a.pregunta}` : ""}`}
              >
                <span
                  className={`block size-4 rounded-full border-2 border-white shadow-[0_0_0_3px_#101820,0_2px_8px_#101820] ${dest ? "size-5 ring-4 ring-[#c9a84c]/70" : ""} ${act ? "ring-4 ring-white/60" : ""}`}
                  style={{ backgroundColor: color }}
                />
                {mostraExplicacioCurta && (
                  <span className="absolute left-4 -translate-y-1/2 whitespace-nowrap rounded bg-[#13191d]/90 border px-1.5 py-0.5 text-[10px] leading-tight" style={{ borderColor: color + "88", top: 0 }}>
                    {a.etiqueta}
                  </span>
                )}
              </button>
            );
          }

          if (a.figura === "etiqueta") {
            const costat = a.costat ?? "dreta";
            return (
              <button
                key={a.id}
                className={`absolute pointer-events-auto focus-visible:outline-none ${anim}`}
                style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  clic(a);
                }}
                aria-label={`${a.etiqueta}${a.pregunta ? `. Pregunta: ${a.pregunta}` : ""}`}
              >
                <span
                  className={`absolute -translate-x-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-white shadow-md ${dest ? "size-4 ring-4 ring-[#c9a84c]/70" : ""} ${act ? "ring-4 ring-white/60" : ""}`}
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                <span
                  className={`absolute -translate-y-1/2 whitespace-nowrap rounded bg-[#13191d]/92 border px-2 py-0.5 text-[11px] leading-tight ${costat === "dreta" ? "left-4" : "right-4"}`}
                  style={{ borderColor: (act || dest) ? "#c9a84c" : color + "88", top: 0 }}
                >
                  {a.etiqueta}
                  {mostraExplicacioCurta && (
                    <span className="block text-[10px] text-[#a8adb8] max-w-56 whitespace-normal">
                      {primeraFrase(a.descripcio)}
                    </span>
                  )}
                </span>
              </button>
            );
          }

          // Zones clicables: pregunta + zoom dirigit + explicació
          if (a.figura === "zona") {
            return (
              <button
                key={a.id}
                className={`absolute group pointer-events-auto focus-visible:outline-none ${anim}`}
                style={{ left: `${a.x * 100}%`, top: `${a.y * 100}%`, width: `${a.amplada * 100}%`, height: `${a.alcada * 100}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  clic(a);
                }}
                aria-label={`Detall assenyalat: ${a.etiqueta}. ${a.pregunta ?? a.descripcio}. Activeu-la per obrir la pregunta.`}
              >
                <span
                  className="absolute inset-0 rounded-md border-[3px] opacity-100 group-hover:opacity-100 transition-opacity"
                  style={{
                    borderColor: dest || act ? "#c9a84c" : color,
                    borderStyle: dest || act ? "solid" : "dashed",
                    boxShadow: dest || act ? "0 0 0 3px rgba(201,168,76,0.4), 0 1px 5px #101820" : "0 0 0 2px #101820, 0 1px 5px #101820",
                  }}
                  aria-hidden="true"
                />
                <span
                  className={`absolute left-0 ${a.y < 0.06 ? "top-1" : "bottom-full mb-1"} whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-medium text-[#13191d] shadow`}
                  style={{ backgroundColor: dest || act ? "#c9a84c" : color }}
                >
                  {dest ? "? " : "+ "}
                  {a.etiqueta}
                </span>
              </button>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
