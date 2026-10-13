// ImgObra.tsx — Imatge d'obra servida localment (WebP + srcset), sense reintents automàtics.
// Estètica: esquelet que CONSERVA LA PROPORCIÓ de la imatge mentre carrega (cap targeta
// negra ni salt de layout); l'error sempre amb acció manual de reintent (cap temporitzador).
// El className i el style s'apliquen al contenidor (manté el comportament dels usos
// existents: «absolute inset-0», «size-11», aspectRatio…); l'imatge sempre l'omple.
"use client";

import { useState } from "react";
import { ImageOff, RotateCcw } from "lucide-react";
import { urlImatge, srcsetImatge, proporció, lqipImatge } from "@/data/imatges";

export default function ImgObra({
  slug,
  amplada = 800,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw",
  alt,
  className,
  style,
  fit = "cover",
  loading = "lazy",
  draggable = false,
}: {
  slug: string;
  amplada?: number; // amplada CSS de referència per triar el derivat
  sizes?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  /** object-fit de la imatge dins del contenidor (cover per defecte). */
  fit?: "cover" | "contain";
  loading?: "lazy" | "eager";
  draggable?: boolean;
}) {
  const [err, setErr] = useState(false);
  const [intents, setIntents] = useState(0);
  const [carregada, setCarregada] = useState(false);

  const ratio = proporció(slug);
  const src = urlImatge(slug, amplada);
  const srcset = srcsetImatge(slug);
  const lqip = lqipImatge(slug);

  if (err || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-paper-2 text-tinta-2 px-4 text-center ${className ?? ""}`}
        style={{ aspectRatio: `${ratio}`, ...style }}
        role="status"
      >
        <ImageOff className="size-6" aria-hidden />
        <p className="text-xs leading-snug">
          {src ? "La imatge no s'ha pogut carregar." : "Imatge encara pendent de reproduir."}
        </p>
        {src && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setErr(false);
              setCarregada(false);
              setIntents((i) => i + 1);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-linia px-2 py-1 text-[11px] text-tinta-2 hover:text-tinta hover:border-accio/50"
          >
            <RotateCcw className="size-3" aria-hidden />
            Tornar-ho a provar
          </button>
        )}
      </div>
    );
  }

  // Posició per defecte del contenidor si el caller no en dona cap
  // (l'::after del esquelet necessita un avantpassat posicionat)
  const posicio = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "") ? "" : "relative";

  return (
    <div
      className={`esquelet-obra ${posicio} ${className ?? ""}`}
      style={{
        aspectRatio: `${ratio}`,
        // La miniatura LQIP ampliada (borrosa) fa de fons: es veu mentre carrega i durant
        // el fos d'entrada, i la imatge real la tapa quan és opaca
        ...(lqip
          ? {
              backgroundImage: `url(${lqip})`,
              backgroundSize: fit === "contain" ? "contain" : "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {}),
        ...style,
      }}
      data-carregada={carregada || undefined}
    >
      <img
        key={intents}
        ref={(el) => {
          // Race de caché: si la imatge ja va arribar abans de la hidratació,
          // onLoad no es dispararà mai — marca carregada immediatament.
          if (el?.complete && el.naturalWidth > 0) setCarregada(true);
        }}
        src={src}
        srcSet={srcset || undefined}
        sizes={sizes}
        width={amplada}
        height={Math.round(amplada / ratio)}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable={draggable}
        onLoad={() => setCarregada(true)}
        onError={() => setErr(true)}
        className={`absolute inset-0 w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-300 ${carregada ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
