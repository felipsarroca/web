// ViewerModal.tsx — Visor didàctic de la web Renaixement.
//  · Deep Zoom real (OpenSeadragon amb piràmides DZI locals) + fallback amb pan/zoom CSS
//    per a les obres sense piràmide, amb overlay d'anotacions en AMBÓS modes.
//  · Seqüència d'observació guiada (6 passos): mirar sense capes → activar capa →
//    llegir pregunta → clicar detall → comprovar explicació → comparar amb una altra obra.
//  · Modes de lectura: bàsic (etiquetes + una frase), intermedi (capes + explicació),
//    avançat (tot + comparació).
//  · Accessibilitat: focus trap + retorn de focus, Escape, zoom per teclat, % aria-live.
//  · El mòdul OpenSeadragon es carrega LAZY (client-only): la importació estàtica
//    explota en pre-render SSR amb «document is not defined» (error 500 del dev.log).
"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  ExternalLink,
  Layers,
  ListChecks,
  ChevronLeft,
  ChevronRight,
  GitCompareArrows,
  PlayCircle,
  HelpCircle,
  MessageCircleQuestion,
} from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { obra } from "@/data/obres";
import {
  zoomDisponible,
  urlDzi,
  urlMaster,
  urlFitxer,
  credit,
  dominiPublic,
  IMATGES,
  proporció,
} from "@/data/imatges";
import { textUbicacio } from "@/lib/renaissance/utils";
import { carregaOSD } from "@/lib/renaissance/osd";
import { comparacioAmb } from "@/data/comparacions";
import AnotacionsOverlay from "./AnotacionsOverlay";
import {
  anotacionsDe,
  capesDe,
  anotacionsPerNivell,
  primeraPreguntaDe,
  COLOR_CAPA,
  type Anotacio,
  type CapaId,
} from "@/data/anotacions";

type ModeLectura = "basico" | "intermedi" | "avancat";

const MODES_LECTURA: { id: ModeLectura; nom: string; desc: string }[] = [
  { id: "basico", nom: "Bàsic", desc: "Només etiquetes essencials i una frase." },
  { id: "intermedi", nom: "Intermedi", desc: "Capes didàctiques i explicacions breus." },
  { id: "avancat", nom: "Avançat", desc: "Perspectiva, iconografia, context i comparació." },
];

export default function ViewerModal() {
  const { viewerObra, tancaViewer } = useApp();
  if (!viewerObra) return null;
  return <ViewerInner key={viewerObra} slug={viewerObra} onTanca={tancaViewer} />;
}

function ViewerInner({ slug, onTanca }: { slug: string; onTanca: () => void }) {
  const o = obra(slug);
  const { navega } = useApp();

  const dialRef = useRef<HTMLDivElement>(null);
  const contenidorRef = useRef<HTMLDivElement>(null);
  const botoTancaRef = useRef<HTMLButtonElement>(null);
  const origenRef = useRef<HTMLElement | null>(null);
  const osdRef = useRef<OpenSeadragon.Viewer | null>(null);
  const osdNSRef = useRef<Awaited<ReturnType<typeof carregaOSD>> | null>(null);
  const osdHostRef = useRef<HTMLDivElement>(null); // host dedicat: React mai hi toca fills
  const fallbackRef = useRef<{ zoomARegio: (x: number, y: number, w: number, h: number) => void; reset: () => void } | null>(null);

  const [modes, setModes] = useState<"dzi" | "imatge" | "error">("imatge");
  const [carregant, setCarregant] = useState(() => zoomDisponible(slug)); // només hi ha càrrega si hi ha piràmide
  const [infoOberta, setInfoOberta] = useState(false);
  const [pct, setPct] = useState(100);
  const [osdLlest, setOsdLlest] = useState<OpenSeadragon.Viewer | null>(null);
  // ⚠ OpenSeadragon és CALLABLE (export = function+namespace): passar-lo directament a
  // setState faria que React l'executés com a updater durant el render (crash appendChild).
  // Sempre s'embolcalla en un objecte no cridable.
  const [osdMod, setOsdMod] = useState<{ mod: Awaited<ReturnType<typeof carregaOSD>> } | null>(null);

  // ── Didàctica ──
  const [modeLectura, setModeLectura] = useState<ModeLectura>("intermedi");
  const capesObra = capesDe(slug);
  const totesAnotacions = anotacionsDe(slug);
  const hiHaActivitat = totesAnotacions.length > 0;
  const [capesActives, setCapesActives] = useState<Set<CapaId>>(() => {
    const ini = new Set<CapaId>();
    for (const a of anotacionsDe(slug)) if (a.visible_inicialment) ini.add(a.capa);
    return ini;
  });
  const [panellObert, setPanellObert] = useState(() => {
    if (typeof window === "undefined") return true;
    return hiHaActivitat && window.innerWidth >= 1024; // al mòbil, panell tancat de sortida
  });
  const [guiat, setGuiat] = useState(false);
  const [pas, setPas] = useState(1);
  const [anotacioActiva, setAnotacioActiva] = useState<Anotacio | null>(null);
  const [faseQ, setFaseQ] = useState<"pregunta" | "resposta">("pregunta");
  const [llistaOberta, setLlistaOberta] = useState(true);

  const visibles = anotacionsPerNivell(totesAnotacions, modeLectura).filter((a) => capesActives.has(a.capa));
  const comparacio = comparacioAmb(slug);
  const destacatId = guiat && pas === 4 && anotacioActiva ? anotacioActiva.id : null;

  // ── Focus: dins del diàleg en obrir, retorn a l'element d'origen en tancar ──
  useEffect(() => {
    origenRef.current = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => botoTancaRef.current?.focus(), 30);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      origenRef.current?.focus?.();
    };
  }, []);

  // ── Focus trap (Tab cíclic) + Escape + tecles de zoom ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onTanca();
        return;
      }
      if (e.key === "Tab" && dialRef.current) {
        const focusables = dialRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const primer = focusables[0];
        const ultim = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === primer) {
          e.preventDefault();
          ultim.focus();
        } else if (!e.shiftKey && document.activeElement === ultim) {
          e.preventDefault();
          primer.focus();
        }
        return;
      }
      const v = osdRef.current?.viewport;
      if (!v) return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        v.zoomBy(1.3);
        v.applyConstraints();
      }
      if (e.key === "-") {
        e.preventDefault();
        v.zoomBy(1 / 1.3);
        v.applyConstraints();
      }
      if (e.key === "0") {
        e.preventDefault();
        v.goHome();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onTanca]);

  // ── Inicialització LAZY d'OpenSeadragon amb la piràmide local (mai en SSR) ──
  useEffect(() => {
    if (!zoomDisponible(slug)) {
      return; // fallback local: la imatge es carrega via <img onLoad>
    }
    let cancelat = false;
    let viewer: OpenSeadragon.Viewer | null = null;
    carregaOSD()
      .then((OSD) => {
        if (cancelat || !osdHostRef.current) return;
        osdNSRef.current = OSD;
        setOsdMod({ mod: OSD });
        setModes("dzi");
        try {
          viewer = OSD({
            element: osdHostRef.current,
            tileSources: urlDzi(slug),
          drawer: "canvas", // OSD 6: obligatori en entorns sense WebGL (headless/màquines modestes)
          prefixUrl: "",
          showNavigator: true,
          navigatorPosition: "BOTTOM_RIGHT",
          navigatorSizeRatio: 0.16,
          navigatorAutoFade: false,
          zoomPerScroll: 1.25,
          zoomPerClick: 2,
          minZoomImageRatio: 0.85,
          maxZoomPixelRatio: 5,
          visibilityRatio: 0.85,
          constrainDuringPan: true,
          animationTime: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.35,
          blendTime: 0.15,
          keyboardNavEnabled: true,
          showFullPageControl: false,
          showZoomControl: false,
          showHomeControl: false,
          gestureSettingsTouch: { pinchToZoom: true, flickEnabled: true, dblClickToZoom: true },
          navigatorBackground: "#0d1216",
          navigatorBorderColor: "rgba(242,238,230,0.25)",
          navigatorDisplayRegionColor: "#c96f4a",
          } as Parameters<typeof OSD>[0]);
        } catch (e) {
          setModes("error");
          setCarregant(false);
          console.error("OpenSeadragon no s'ha pogut inicialitzar:", e);
          return;
        }
        osdRef.current = viewer;
        const v = viewer.viewport;

        viewer.addHandler("open", () => {
          setCarregant(false);
          setModes("dzi");
          setOsdLlest(viewer);
          // Enllaç a detall: ?v=x,y,w (coordenades d'imatge) — compatible amb les filtres
          const params = new URLSearchParams(window.location.search);
          const m = params.get("v");
          const item = viewer?.world.getItemAt(0); // OSD 6: la mida viu al TiledImage
          const cs = item ? item.getContentSize() : null;
          if (m && cs && cs.x > 0 && cs.y > 0) {
            const [x, y, w] = m.split(",").map(Number);
            if ([x, y, w].every(Number.isFinite) && w > 0) {
              v.fitBoundsWithConstraints(new OSD.Rect(x, y, w, (w * cs.y) / cs.x));
            }
          }
        });
        viewer.addHandler("open-failed", () => {
          setModes("error");
          setCarregant(false);
        });
        const alZoom = () => {
          const hz = v.getHomeZoom() || 1;
          setPct(Math.round((v.getZoom(true) / hz) * 100));
        };
        viewer.addHandler("zoom", alZoom);
        // Serialitza la vista per poder compartir un detall concret
        // (replaceState: conserva ruta i filtres, només afegeix ?v=)
        const serialitza = () => {
          const b = v.getBounds(true);
          const params = new URLSearchParams(window.location.search);
          params.set("v", [b.x.toFixed(4), b.y.toFixed(4), b.width.toFixed(4)].join(","));
          window.history.replaceState(null, "", window.location.pathname + "?" + params.toString());
        };
        viewer.addHandler("animation-finish", serialitza);
      })
      .catch(() => {
        if (!cancelat) {
          setModes("error");
          setCarregant(false);
        }
      });

    return () => {
      cancelat = true;
      try {
        viewer?.destroy();
      } catch {
        /* noop */
      }
      osdRef.current = null;
      osdNSRef.current = null;
      setOsdLlest(null);
      setOsdMod(null);
    };
  }, [slug]);

  const zoomBtn = useCallback((factor: number) => {
    const v = osdRef.current?.viewport;
    if (v) {
      v.zoomBy(factor);
      v.applyConstraints();
      return;
    }
    if (factor > 1) fallbackRef.current?.zoomARegio(0.5, 0.5, 0.75, 0.75);
    else fallbackRef.current?.reset();
  }, []);

  const homeBtn = useCallback(() => {
    const v = osdRef.current?.viewport;
    if (v) {
      v.goHome();
      return;
    }
    fallbackRef.current?.reset();
  }, []);

  // ── Selecció d'una anotació: pregunta → zoom → comprovació ──
  const selecciona = useCallback(
    (a: Anotacio) => {
      setAnotacioActiva(a);
      setFaseQ("pregunta");
      setPanellObert(true);
      if (guiat && pas === 4) setPas(5);
      const regio = regioDe(a);
      if (modes === "dzi" && osdRef.current && osdNSRef.current) {
        const OSD = osdNSRef.current;
        const v = osdRef.current.viewport;
        const item = osdRef.current.world?.getItemAt(0);
        const cs = item ? item.getContentSize() : null;
        if (cs && cs.x > 0 && cs.y > 0) {
          v.fitBoundsWithConstraints(new OSD.Rect(regio.x * cs.x, regio.y * cs.y, regio.w * cs.x, regio.h * cs.y));
          v.applyConstraints();
        }
      } else {
        fallbackRef.current?.zoomARegio(regio.x, regio.y, regio.w, regio.h);
      }
    },
    [guiat, pas, modes],
  );

  // ── Control de la seqüència guiada ──
  const iniciaGuiat = () => {
    setGuiat(true);
    setPas(1);
    setCapesActives(new Set()); // pas 1: mirar sense capes
    setAnotacioActiva(null);
    setFaseQ("pregunta");
    setPanellObert(true);
  };
  const surtGuiat = () => {
    setGuiat(false);
    setPas(1);
    const ini = new Set<CapaId>();
    for (const a of anotacionsDe(slug)) if (a.visible_inicialment) ini.add(a.capa);
    setCapesActives(ini);
    setAnotacioActiva(null);
    setFaseQ("pregunta");
  };
  const triaCapaGuiada = (c: CapaId) => {
    setCapesActives(new Set([c]));
    const q = primeraPreguntaDe(slug, c) ?? totesAnotacions.find((a) => a.capa === c) ?? null;
    setAnotacioActiva(q);
    setFaseQ("pregunta");
    setPas(3);
  };
  const commutaCapa = (c: CapaId) => {
    setCapesActives((prev) => {
      const nova = new Set(prev);
      if (nova.has(c)) nova.delete(c);
      else nova.add(c);
      return nova;
    });
    setAnotacioActiva(null);
    setFaseQ("pregunta");
  };

  if (!o) return null;

  const im = IMATGES[slug];
  const instruaccions = zoomDisponible(slug)
    ? "Roda o doble clic per ampliar · Arrossegueu per moure · Pinçada en tàctil · Tecles +, − i 0 · Escape per tancar"
    : "Roda o doble clic per ampliar · Arrossegueu per moure · Escape per tancar";

  return (
    <div
      ref={dialRef}
      className="visor-fosc fixed inset-0 z-[100] bg-black/[0.97] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Visor de detall: ${o.titol}, de ${o.autorNom}`}
    >
      {/* Barra superior */}
      <div className="flex items-center gap-3 px-4 py-3 bg-black/80 border-b border-white/10 shrink-0">
        <div className="min-w-0 flex-1">
          <p className="font-serif italic text-[15px] sm:text-base truncate">{o.titol}</p>
          <p className="text-xs text-[#a8adb8] truncate">
            {o.autorNom} · {o.data} · {textUbicacio(o)}
            {zoomDisponible(slug) && (
              <span className="ml-2 rounded-full border border-[#c9a84c]/50 px-1.5 text-[10px] text-[#c9a84c]">
                Deep Zoom
              </span>
            )}
          </p>
        </div>
        {hiHaActivitat && (
          <button
            onClick={() => setPanellObert(!panellObert)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-[#c9a84c]/50 px-3 py-1.5 text-xs text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
            aria-expanded={panellObert}
          >
            <Layers className="size-3.5" aria-hidden />
            Capes i activitat
          </button>
        )}
        <button
          onClick={() => setInfoOberta(!infoOberta)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Informació de drets de la imatge"
          aria-expanded={infoOberta}
        >
          <Info className="size-5 text-[#a8adb8]" aria-hidden />
        </button>
        <button
          ref={botoTancaRef}
          onClick={onTanca}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Tancar el visor"
        >
          <X className="size-6 text-[#f2eee6]" aria-hidden />
        </button>
      </div>

      {/* Cos: visor + panell didàctic */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Àrea del visor */}
        <div
          ref={contenidorRef}
          className="relative flex-1 overflow-hidden visor-pannable touch-none select-none bg-[#050608]"
          data-testid="visor-area"
        >
        {/* Host dedicat d'OpenSeadragon: React no li gestiona mai els fills
            (evita el conflicte commit/appendChild entre React i OSD) */}
        <div ref={osdHostRef} className="absolute inset-0" aria-hidden={modes !== "dzi"} />

          {/* Fallback sense piràmide: màster local amb pan/zoom CSS + overlay */}
          {modes !== "dzi" && (
            <FallbackImatge
              ref={fallbackRef}
              slug={slug}
              estat={modes === "error" ? "error" : "imatge"}
              carregant={carregant}
              onCarregat={() => setCarregant(false)}
              anotacions={visibles}
              destacatId={destacatId}
              activaId={anotacioActiva?.id ?? null}
              onSelecciona={selecciona}
              mostraExplicacioCurta={modeLectura === "basico"}
            />
          )}

          {/* Overlay d'anotacions sobre OpenSeadragon */}
          {modes === "dzi" && (
            <AnotacionsOverlay
              slug={slug}
              anotacions={visibles}
              mode="dzi"
              osdMod={osdMod?.mod ?? null}
              osd={osdLlest}
              destacatId={destacatId}
              activaId={anotacioActiva?.id ?? null}
              onSelecciona={selecciona}
              mostraExplicacioCurta={modeLectura === "basico"}
            />
          )}

          {carregant && modes === "dzi" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" role="status">
              <div className="size-10 border-2 border-[#c96f4a] border-t-transparent rounded-full animate-spin" aria-hidden />
              <span className="sr-only">Carregant la piràmide d&apos;imatges</span>
            </div>
          )}
        </div>

        {/* ── Panell didàctic (desktop: columna dreta; mòbil: llàmina inferior) ── */}
        <aside
          className={`${
            panellObert
              ? "absolute inset-x-0 bottom-0 z-20 max-h-[52%] lg:relative lg:inset-auto lg:max-h-none lg:w-[360px] shrink-0"
              : "hidden"
          } border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0b0d11]/97 lg:bg-[#0b0d11] backdrop-blur-sm overflow-y-auto`}
          aria-label="Panell didàctic del visor"
          data-testid="panell-didactic"
        >
          <div className="p-4 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-[#c9a84c] font-semibold">
                Llegiu aquesta obra
              </p>
              {panellObert && (
                <button
                  onClick={() => setPanellObert(false)}
                  className="lg:hidden p-1 rounded hover:bg-white/10"
                  aria-label="Tancar el panell didàctic"
                >
                  <X className="size-4" aria-hidden />
                </button>
              )}
            </div>

            {/* Mode de lectura */}
            <section aria-label="Mode de lectura">
              <div className="grid grid-cols-3 gap-1 rounded-lg border border-white/10 p-1 bg-black/40">
                {MODES_LECTURA.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModeLectura(m.id)}
                    className={`rounded px-2 py-1.5 text-xs font-medium transition-colors ${
                      modeLectura === m.id
                        ? "bg-[#c9a84c] text-[#13191d]"
                        : "text-[#a8adb8] hover:text-ivori hover:bg-white/5"
                    }`}
                    aria-pressed={modeLectura === m.id}
                  >
                    {m.nom}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[11.5px] text-[#8a9199] leading-snug">
                {MODES_LECTURA.find((m) => m.id === modeLectura)!.desc}
              </p>
            </section>

            {/* Capes didàctiques */}
            {capesObra.length > 0 && (
              <section aria-label="Capes didàctiques">
                <p className="text-[13px] font-medium mb-2 flex items-center gap-1.5">
                  <Layers className="size-3.5 text-[#c9a84c]" aria-hidden />
                  Capes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {capesObra.map((c) => {
                    const n = anotacionsPerNivell(totesAnotacions, modeLectura).filter((a) => a.capa === c).length;
                    const actiu = capesActives.has(c);
                    return (
                      <button
                        key={c}
                        onClick={() => commutaCapa(c)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                          actiu
                            ? "border-[#c9a84c]/70 bg-[#c9a84c]/12 text-ivori"
                            : "border-white/15 text-[#8a9199] hover:text-ivori hover:border-white/30"
                        }`}
                        aria-pressed={actiu}
                      >
                        <span className="size-2 rounded-full" style={{ backgroundColor: COLOR_CAPA[c] }} aria-hidden />
                        {NOM_CAPA(c)}
                        {n > 0 && <span className="tabular-nums opacity-70">({n})</span>}
                      </button>
                    );
                  })}
                </div>
                {capesActives.size === 0 && (
                  <p className="mt-2 text-[11.5px] text-[#8a9199] italic">Cap capa activa: feu servir el visor per mirar l&apos;obra nua.</p>
                )}
              </section>
            )}

            {/* Pregunta / resposta de l'anotació activa */}
            {anotacioActiva && (
              <section aria-label="Pregunta d'observació" className="rounded-lg border border-[#c9a84c]/45 bg-[#c9a84c]/8 p-3.5" data-testid="targeta-pregunta">
                <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#c9a84c] font-semibold mb-1.5">
                  <MessageCircleQuestion className="size-3.5" aria-hidden />
                  {faseQ === "pregunta" ? "Pregunta d'observació" : "Comprovació"}
                </p>
                {faseQ === "pregunta" ? (
                  <>
                    <p className="font-serif text-[15px] leading-snug">{anotacioActiva.pregunta ?? `Observa: ${anotacioActiva.etiqueta}`}</p>
                    <p className="mt-2 text-[11.5px] text-[#a8adb8]">
                      {guiat && pas === 4
                        ? "Cliqueu el detall assenyalat a la imatge."
                        : "Mireu la zona assenyalada a la imatge i penseu la resposta."}
                    </p>
                    {guiat && pas === 4 && (
                      <button
                        onClick={() => setPas(5)}
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-[#c96f4a] px-3 py-1.5 text-xs font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
                      >
                        Ja l&apos;he trobat: comprova
                      </button>
                    )}
                    {(guiat ? pas === 5 || pas === 6 : true) && (
                      <button
                        onClick={() => setFaseQ("resposta")}
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-[#c96f4a] px-3 py-1.5 text-xs font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
                      >
                        <HelpCircle className="size-3.5" aria-hidden />
                        Comprova l&apos;explicació
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-[13.5px] leading-relaxed text-[#e6e2d8]">
                      <span className="font-medium text-ivori">{anotacioActiva.etiqueta}. </span>
                      {anotacioActiva.descripcio}
                    </p>
                    {modeLectura === "basico" && anotacioActiva.pregunta && (
                      <p className="mt-2 text-[12px] text-[#a8adb8] italic">
                        Pregunta: {anotacioActiva.pregunta}
                      </p>
                    )}
                  </>
                )}
              </section>
            )}

            {/* ── Seqüència guiada o llista lliure ── */}
            {guiat ? (
              <section aria-label="Seqüència d'observació guiada">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-medium flex items-center gap-1.5">
                    <PlayCircle className="size-4 text-[#c9a84c]" aria-hidden />
                    Seqüència guiada · pas {pas}/6
                  </p>
                </div>
                <ol className="space-y-1 mb-3" aria-hidden="true">
                  {[
                    "Mira l'obra sense capes",
                    "Activa una capa",
                    "Llegeix la pregunta",
                    "Clica el detall assenyalat",
                    "Comprova l'explicació",
                    "Compara amb una altra obra",
                  ].map((t, i) => (
                    <li
                      key={t}
                      className={`flex items-center gap-2 text-[12px] ${
                        i + 1 === pas ? "text-ivori font-medium" : i + 1 < pas ? "text-[#6f7a85] line-through" : "text-[#5d6670]"
                      }`}
                    >
                      <span
                        className={`inline-flex size-4.5 min-w-4.5 items-center justify-center rounded-full text-[10px] font-bold ${
                          i + 1 === pas ? "bg-[#c9a84c] text-[#13191d]" : "bg-white/8 text-[#8a9199]"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ol>

                {pas === 1 && (
                  <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <p className="text-[13px] leading-relaxed text-[#d8d3c8]">
                      <strong className="text-ivori">1 · Mira l&apos;obra sense capes.</strong> feu zoom, allunyeu-vos
                      i deixeu que l&apos;ull busqui: què hi fixeu primer? Què us sorprèn?
                    </p>
                    <button
                      onClick={() => setPas(2)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-[#c96f4a] px-3 py-1.5 text-xs font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
                    >
                      He mirat: activa una capa
                      <ChevronRight className="size-3.5" aria-hidden />
                    </button>
                  </div>
                )}

                {pas === 2 && (
                  <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <p className="text-[13px] leading-relaxed text-[#d8d3c8]">
                      <strong className="text-ivori">2 · Activa una capa.</strong> Trieu una sola capa per començar:
                      veureu el detall assenyalat amb una pregunta d&apos;observació.
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {capesObra.map((c) => (
                        <button
                          key={c}
                          onClick={() => triaCapaGuiada(c)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a84c]/50 px-2.5 py-1 text-xs text-ivori hover:bg-[#c9a84c]/12 transition-colors"
                        >
                          <span className="size-2 rounded-full" style={{ backgroundColor: COLOR_CAPA[c] }} aria-hidden />
                          {NOM_CAPA(c)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {pas === 3 && (
                  <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <p className="text-[13px] leading-relaxed text-[#d8d3c8]">
                      <strong className="text-ivori">3 · Llegeix la pregunta.</strong> La pregunta d&apos;observació
                      és al panell: responeu-la amb els ulls abans de clicar res.
                    </p>
                    <button
                      onClick={() => setPas(4)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-[#c96f4a] px-3 py-1.5 text-xs font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
                    >
                      Següent: troba el detall
                      <ChevronRight className="size-3.5" aria-hidden />
                    </button>
                  </div>
                )}

                {pas === 4 && (
                  <div className="rounded-lg border border-[#c9a84c]/40 bg-[#c9a84c]/8 p-3">
                    <p className="text-[13px] leading-relaxed">
                      <strong className="text-[#c9a84c]">4 · Clica el detall assenyalat.</strong> Al visor, el marc
                      en or pulsa: cliqueu-lo per fer zoom i obrir la comprovació.
                    </p>
                  </div>
                )}

                {pas === 5 && (
                  <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <p className="text-[13px] leading-relaxed text-[#d8d3c8]">
                      <strong className="text-ivori">5 · Comprova l&apos;explicació.</strong> Compareu el que pensau
                      amb l&apos;explicació de l&apos;anotació: si difereixen, feu zoom i torneu a mirar.
                    </p>
                    <button
                      onClick={() => setPas(6)}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-[#c96f4a] px-3 py-1.5 text-xs font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
                    >
                      Següent: compara
                      <ChevronRight className="size-3.5" aria-hidden />
                    </button>
                  </div>
                )}

                {pas === 6 && (
                  <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <p className="text-[13px] leading-relaxed text-[#d8d3c8]">
                      <strong className="text-ivori">6 · Compara amb una segona obra.</strong>{" "}
                      {comparacio
                        ? `Aquesta obra forma part de la comparació «${comparacio.titol}».`
                        : "Aquesta obra no té comparació preconfigurada; trobareu cinc parelles a la secció Comparacions."}
                    </p>
                    {comparacio ? (
                      <button
                        onClick={() => {
                          onTanca();
                          navega("comparacions?c=" + comparacio.id);
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded bg-[#c96f4a] px-3 py-1.5 text-xs font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
                      >
                        <GitCompareArrows className="size-3.5" aria-hidden />
                        Obrir la comparació
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onTanca();
                          navega("comparacions");
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded border border-[#c9a84c]/50 px-3 py-1.5 text-xs text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
                      >
                        <GitCompareArrows className="size-3.5" aria-hidden />
                        Veure les comparacions
                      </button>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => setPas((p) => Math.max(1, p - 1))}
                    disabled={pas === 1}
                    className="inline-flex items-center gap-1 text-xs text-[#a8adb8] hover:text-ivori disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="size-3.5" aria-hidden />
                    Anterior
                  </button>
                  <button onClick={surtGuiat} className="text-xs text-[#8a9199] hover:text-ivori underline">
                    Sortir del recorregut
                  </button>
                  {pas < 5 && (
                    <button
                      onClick={() => setPas((p) => Math.min(6, p + 1))}
                      className="inline-flex items-center gap-1 text-xs text-[#a8adb8] hover:text-ivori"
                    >
                      Següent
                      <ChevronRight className="size-3.5" aria-hidden />
                    </button>
                  )}
                  {pas >= 5 && <span className="w-14" aria-hidden />}
                </div>
              </section>
            ) : (
              hiHaActivitat && (
                <section aria-label="Llista d'anotacions">
                  <button
                    onClick={() => setLlistaOberta(!llistaOberta)}
                    className="w-full flex items-center justify-between text-[13px] font-medium mb-2"
                    aria-expanded={llistaOberta}
                  >
                    <span className="flex items-center gap-1.5">
                      <ListChecks className="size-4 text-[#c9a84c]" aria-hidden />
                      Detalls amb pregunta ({anotacionsPerNivell(totesAnotacions, modeLectura).filter((a) => !!a.pregunta).length})
                    </span>
                    <ChevronRight className={`size-3.5 transition-transform ${llistaOberta ? "rotate-90" : ""}`} aria-hidden />
                  </button>
                  {llistaOberta && (
                    <ul className="space-y-1">
                      {anotacionsPerNivell(totesAnotacions, modeLectura).map((a) => (
                        <li key={a.id}>
                          <button
                            onClick={() => selecciona(a)}
                            className={`w-full text-left rounded px-2 py-1.5 text-[12.5px] leading-snug transition-colors flex gap-2 ${
                              anotacioActiva?.id === a.id ? "bg-[#c9a84c]/12 text-ivori" : "text-[#a8adb8] hover:bg-white/5 hover:text-ivori"
                            }`}
                          >
                            <span className="mt-1 size-2 rounded-full shrink-0" style={{ backgroundColor: COLOR_CAPA[a.capa] }} aria-hidden />
                            <span>
                              {a.etiqueta}
                              {a.pregunta && (
                                <span className="block text-[11.5px] text-[#8a9199] italic">{a.pregunta}</span>
                              )}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )
            )}

            {/* Boto d'inici de la seqüència (mode lliure) */}
            {!guiat && hiHaActivitat && (
              <button
                onClick={iniciaGuiat}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#c96f4a] px-4 py-2.5 text-sm font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
                data-testid="inicia-seuencia"
              >
                <PlayCircle className="size-4" aria-hidden />
                Inicia la seqüència d&apos;observació
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* Controls de zoom */}
      <div className={`absolute bottom-4 ${panellObert ? "lg:left-[calc(50%-180px)]" : "lg:left-1/2"} left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-black/70 border border-white/10 px-2 py-1.5 backdrop-blur transition-[left]`}>
        <button
          onClick={() => zoomBtn(1 / 1.3)}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="Reduir el zoom"
        >
          <ZoomOut className="size-5" aria-hidden />
        </button>
        <span className="text-xs text-[#a8adb8] w-12 text-center tabular-nums" aria-live="polite">
          {pct}%
        </span>
        <button
          onClick={() => zoomBtn(1.3)}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="Ampliar el zoom"
        >
          <ZoomIn className="size-5" aria-hidden />
        </button>
        <div className="w-px h-5 bg-white/15 mx-1" aria-hidden />
        <button
          onClick={homeBtn}
          className="p-2 rounded-full hover:bg-white/10"
          aria-label="Restablir la vista"
        >
          <RotateCcw className="size-4" aria-hidden />
        </button>
      </div>

      {/* Instruccions anunciades */}
      <p className="absolute bottom-5 left-5 text-[11px] text-white/45 hidden lg:block max-w-72" role="status">
        {instruaccions}
      </p>

      {/* Informació de drets — específica per obra */}
      {infoOberta && (
        <div className="absolute top-4 left-4 max-w-sm rounded-lg bg-black/90 border border-white/10 p-4 text-sm space-y-2 z-30">
          <p className="font-serif italic text-[15px]">{o.titol}</p>
          <p className="text-[#a8adb8] text-xs leading-relaxed">{credit(slug)}</p>
          <p className="text-[11px] text-white/50 leading-relaxed">
            {dominiPublic(slug)
              ? "L'obra original és de domini públic. Els drets de la fotografia de reproducció són els de la llicència indicada més amunt."
              : "La reproducció té la llicència indicada més amunt; verifiqueu les condicions d'ús a la pàgina del fitxer."}
          </p>
          <a
            href={urlFitxer(slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#c96f4a] hover:underline"
          >
            Fitxer original a Wikimedia Commons
            <ExternalLink className="size-3" aria-hidden />
            <span className="sr-only">(s'obre en una pestanya nova)</span>
          </a>
        </div>
      )}
    </div>
  );
}

/** Nom curt de capa per als xips. */
function NOM_CAPA(c: CapaId): string {
  const noms: Record<CapaId, string> = {
    perspectiva: "Perspectiva",
    composicio: "Composició",
    personatges: "Personatges",
    simbols: "Símbols",
    tecnica: "Tècnica",
    arquitectura: "Arquitectura",
  };
  return noms[c];
}

/** Regió d'imatge (fractions) per enquadrar una anotació. */
function regioDe(a: Anotacio): { x: number; y: number; w: number; h: number } {
  if (a.figura === "zona" || a.figura === "rect") {
    return { x: a.x, y: a.y, w: a.amplada, h: a.alcada };
  }
  if (a.figura === "punt" || a.figura === "etiqueta") {
    const w = 0.24;
    return { x: a.x - w / 2, y: a.y - w / 2, w, h: w };
  }
  const xs = a.punts.map((p) => p[0]);
  const ys = a.punts.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);
  const m = 0.05;
  return {
    x: Math.max(0, x0 - m),
    y: Math.max(0, y0 - m),
    w: Math.min(1 - Math.max(0, x0 - m), Math.max(0.14, x1 - x0 + 2 * m)),
    h: Math.max(0.14, y1 - y0 + 2 * m),
  };
}

interface RefFallback {
  zoomARegio: (x: number, y: number, w: number, h: number) => void;
  reset: () => void;
}

/** Fallback local: màster JPG amb pan/zoom CSS quan l'obra no té piràmide DZI.
 *  Inclou l'overlay d'anotacions dins del contenidor transformable, així les
 *  marques segueixen la imatge amb el mateix pan/zoom. */
const FallbackImatge = forwardRef<RefFallback, {
  slug: string;
  estat: "imatge" | "error";
  carregant: boolean;
  onCarregat: () => void;
  anotacions: Anotacio[];
  destacatId: string | null;
  activaId: string | null;
  onSelecciona: (a: Anotacio) => void;
  mostraExplicacioCurta: boolean;
}>(function FallbackImatge(
  { slug, estat, carregant, onCarregat, anotacions, destacatId, activaId, onSelecciona, mostraExplicacioCurta },
  ref,
) {
  const contenidorRef = useRef<HTMLDivElement>(null);
  const escalaRef = useRef(1);
  const txRef = useRef(0);
  const tyRef = useRef(0);
  const puntersRef = useRef(new Map<number, { x: number; y: number }>());
  const distRef = useRef(0);
  const plaRef = useRef<HTMLDivElement>(null);
  const [intents, setIntents] = useState(0);
  const [imgError, setImgError] = useState(false);
  // Transformació en estat (els refs només es llegeixen a handlers/efectes)
  const [tf, setTf] = useState({ escala: 1, tx: 0, ty: 0 });

  const aplica = () => setTf({ escala: escalaRef.current, tx: txRef.current, ty: tyRef.current });

  const zoomAlPunt = (factor: number, cx: number, cy: number) => {
    const rect = contenidorRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = cx - rect.left - rect.width / 2;
    const py = cy - rect.top - rect.height / 2;
    const nova = Math.min(4, Math.max(0.6, escalaRef.current * factor));
    const rel = nova / escalaRef.current;
    txRef.current = px - rel * (px - txRef.current);
    tyRef.current = py - rel * (py - tyRef.current);
    escalaRef.current = nova;
    aplica();
  };

  const zoomARegio = (x: number, y: number, w: number, h: number) => {
    const rect = contenidorRef.current?.getBoundingClientRect();
    const pla = plaRef.current;
    if (!rect || !pla) return;
    const W = pla.offsetWidth; // amplada real de la imatge projectada (escala 1)
    const H = pla.offsetHeight; // alçada real (h està en fraccions d'aquesta)
    if (W < 10 || H < 10) return;
    const escNova = Math.min(4, Math.max(1, (0.85 * rect.width) / (w * W)));
    txRef.current = -escNova * ((x + w / 2) * W - W / 2);
    tyRef.current = -escNova * ((y + h / 2) * H - H / 2);
    escalaRef.current = escNova;
    aplica();
  };

  const reset = () => {
    escalaRef.current = 1;
    txRef.current = 0;
    tyRef.current = 0;
    aplica();
  };

  useImperativeHandle(ref, () => ({ zoomARegio, reset }));

  return (
    <div
      ref={contenidorRef}
      className="absolute inset-0"
      onWheel={(e) => {
        e.preventDefault();
        zoomAlPunt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY);
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
        if (puntersRef.current.size === 1) {
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
      onDoubleClick={(e) => zoomAlPunt(escalaRef.current > 1.4 ? 1 / escalaRef.current : 2.2, e.clientX, e.clientY)}
    >
      {estat === "error" || imgError ? (
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
          <div>
            <p className="font-serif text-xl mb-2">La imatge no s&apos;ha pogut carregar</p>
            <p className="text-sm text-[#a8adb8] mb-4">
              {imgError
                ? "Es pot provar de nou; si persisteix, l'obra encara no té reproducció local disponible."
                : "L'obra encara no té piràmide Deep Zoom ni reproducció local."}
            </p>
            {imgError && (
              <button
                onClick={() => {
                  setImgError(false);
                  setIntents((i) => i + 1);
                }}
                className="inline-flex items-center gap-2 rounded bg-[#c96f4a] px-4 py-2 text-sm font-medium text-[#13191d] hover:bg-[#d67e57] transition-colors"
              >
                <RotateCcw className="size-4" aria-hidden />
                Tornar-ho a provar
              </button>
            )}
          </div>
        </div>
      ) : (
        <PlacaImatge
          ref={plaRef}
          slug={slug}
          intents={intents}
          carregant={carregant}
          onCarregat={onCarregat}
          onImgError={() => setImgError(true)}
          escala={tf.escala}
          tx={tf.tx}
          ty={tf.ty}
          anotacions={anotacions}
          destacatId={destacatId}
          activaId={activaId}
          onSelecciona={onSelecciona}
          mostraExplicacioCurta={mostraExplicacioCurta}
        />
      )}
    </div>
  );
});

/** Placa de la imatge + overlay, dins del contenidor transformable. */
const PlacaImatge = forwardRef<HTMLDivElement, {
  slug: string;
  intents: number;
  carregant: boolean;
  onCarregat: () => void;
  onImgError: () => void;
  escala: number;
  tx: number;
  ty: number;
  anotacions: Anotacio[];
  destacatId: string | null;
  activaId: string | null;
  onSelecciona: (a: Anotacio) => void;
  mostraExplicacioCurta: boolean;
}>(function PlacaImatge(
  { slug, intents, carregant, onCarregat, onImgError, escala, tx, ty, anotacions, destacatId, activaId, onSelecciona, mostraExplicacioCurta },
  ref,
) {
  const ratio = proporcióLocal(slug);
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2"
      style={{
        width: `min(92vw, ${(92 * ratio).toFixed(2)}vh)`,
        aspectRatio: `${ratio}`,
        transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${escala})`,
        opacity: carregant ? 0 : 1,
        transition: "opacity 0.3s",
        willChange: "transform",
      }}
    >
      <img
        key={intents}
        src={urlMaster(slug)}
        alt=""
        draggable={false}
        onLoad={onCarregat}
        onError={onImgError}
        className="absolute inset-0 w-full h-full select-none"
      />
      <AnotacionsOverlay
        slug={slug}
        anotacions={anotacions}
        mode="fallback"
        destacatId={destacatId}
        activaId={activaId}
        onSelecciona={onSelecciona}
        mostraExplicacioCurta={mostraExplicacioCurta}
      />
    </div>
  );
});

/** Proporció de la imatge (amplada/alçada) amb fallback neutre. */
function proporcióLocal(slug: string): number {
  const r = proporció(slug);
  return Number.isFinite(r) && r > 0 ? r : 1;
}
