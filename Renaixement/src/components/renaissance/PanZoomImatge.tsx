// PanZoomImatge.tsx — Mini visor pan/zoom (CSS) per al comparador i targetes actives.
// Reutilitza el mateix llenguatge que el fallback del visor gran, en versió continguda:
// roda per zoom al cursor, arrossegament per moure, doble clic per alternar zoom,
// pinch tàctil. Proporció sempre reservada (cap salt de layout).
"use client";

import { useRef, useState } from "react";
import { proporció, urlImatge } from "@/data/imatges";

export default function PanZoomImatge({
  slug,
  alt,
  amplada = 1200,
  sizes = "(max-width: 640px) 92vw, 46vw",
}: {
  slug: string;
  alt: string;
  amplada?: number;
  sizes?: string;
}) {
  const contenidorRef = useRef<HTMLDivElement>(null);
  const escalaRef = useRef(1);
  const txRef = useRef(0);
  const tyRef = useRef(0);
  const puntersRef = useRef(new Map<number, { x: number; y: number }>());
  const distRef = useRef(0);
  // Transforma en ESTAT (no es llegeixen refs durant el render)
  const [tf, setTf] = useState({ escala: 1, tx: 0, ty: 0 });

  const aplica = () => setTf({ escala: escalaRef.current, tx: txRef.current, ty: tyRef.current });

  const zoomAlPunt = (factor: number, cx: number, cy: number) => {
    const rect = contenidorRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = cx - rect.left - rect.width / 2;
    const py = cy - rect.top - rect.height / 2;
    const nova = Math.min(5, Math.max(1, escalaRef.current * factor));
    const rel = nova / escalaRef.current;
    txRef.current = px - rel * (px - txRef.current);
    tyRef.current = py - rel * (py - tyRef.current);
    escalaRef.current = nova;
    aplica();
  };

  const ratio = proporció(slug);

  return (
    <div
      ref={contenidorRef}
      className="relative overflow-hidden bg-[#0d1216] visor-pannable touch-none select-none"
      style={{ aspectRatio: `${ratio}` }}
      onWheel={(e) => {
        e.preventDefault();
        zoomAlPunt(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX, e.clientY);
      }}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        puntersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (puntersRef.current.size === 2) {
          const [a, b] = [...puntersRef.current.values()];
          distRef.current = Math.hypot(a.x - b.x, a.y - b.y);
        }
      }}
      onPointerMove={(e) => {
        if (!puntersRef.current.has(e.pointerId)) return;
        const prev = puntersRef.current.get(e.pointerId)!;
        const nova = { x: e.clientX, y: e.clientY };
        if (puntersRef.current.size === 1 && escalaRef.current > 1) {
          txRef.current += nova.x - prev.x;
          tyRef.current += nova.y - prev.y;
          aplica();
        } else if (puntersRef.current.size === 2) {
          puntersRef.current.set(e.pointerId, nova);
          const [a, b] = [...puntersRef.current.values()];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (distRef.current > 0) zoomAlPunt(d / distRef.current, (a.x + b.x) / 2, (a.y + b.y) / 2);
          distRef.current = d;
          return;
        }
        puntersRef.current.set(e.pointerId, nova);
      }}
      onPointerUp={(e) => {
        puntersRef.current.delete(e.pointerId);
        distRef.current = 0;
      }}
      onPointerCancel={(e) => {
        puntersRef.current.delete(e.pointerId);
        distRef.current = 0;
      }}
      onDoubleClick={(e) => zoomAlPunt(escalaRef.current > 1.4 ? 1 / escalaRef.current : 2.4, e.clientX, e.clientY)}
    >
      <img
        src={urlImatge(slug, amplada)}
        srcSet={
          [640, 960, 1200, 1600]
            .map((w) => `${urlImatge(slug, w)} ${w}w`)
            .filter((s, i, arr) => arr.indexOf(s) === i)
            .join(", ") || undefined
        }
        sizes={sizes}
        alt={alt}
        draggable={false}
        loading="lazy"
        decoding="async"
        width={amplada}
        height={Math.round(amplada / (ratio || 1))}
        className="absolute left-1/2 top-1/2 max-w-none will-change-transform"
        style={{
          width: "100%",
          height: "auto",
          transform: `translate(calc(-50% + ${tf.tx}px), calc(-50% + ${tf.ty}px)) scale(${tf.escala})`,
        }}
      />
    </div>
  );
}
