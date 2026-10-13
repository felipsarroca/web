// TimelineView.tsx — Cronologia didàctica (auditoria de cronologia, redisseny complet).
//
// Model pedagògic: respondre «què passava al mateix temps?» — primer una visió de
// conjunt (vistes preparades), després el detall. Tres carrils fixats i amb nom
// permanent (context · artistes · obres), color semàntic NOMÉS per a la disciplina
// de les obres (pintura petroli, escultura terracota, arquitectura oliva; context
// gris fosc, artistes violeta discret) sempre acompanyat de forma o icona.
//
// Regles clau de l'auditoria implementades aquí:
//   · L'entrada NO comença amb 68 obres: 6 vistes preparades amb frase explicativa.
//   · Filtres combinables en xips + «Neteja» + recompte d'elements.
//   · Banda de períodes amb solapaments (Quattrocento/Cinquecento/manierisme).
//   · Esdeveniments: marca gràfica 12-16 px, objectiu tàctil ≥ 44 px, fites
//     prioritàries etiquetades directament; les secundàries s'obren amb clic/focus
//     (mai dependents del hover).
//   · Artistes: interval d'activitat DOCUMENTAT (mai «naixement + 20»); si només
//     es coneix la vida, s'etiqueta com a vida.
//   · Obres: agrupades per decenni en un marcador amb recompte que obre una
//     targeta (miniatura, autor, data, concepte, enllaç); intervals com a barra.
//   · Zoom temporal en dos nivells (segles/decennis) + barra de conjunt +
//     Anterior/Següent. En mòbil, cronologia vertical (cap scroll horitzontal).
//   · Recorreguts didàctics: Roma 1508-1512, perspectiva lineal, Flandes i Itàlia XV.
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, Filter, ChevronLeft, ChevronRight, Layers, Users, Image as ImageIcon, Landmark, Anvil, Palette, History, CircleHelp } from "lucide-react";
import { useApp } from "@/lib/renaissance/store";
import { OBRES_CRONO } from "@/data/obres";
import { ARTISTES } from "@/data/artistes";
import { ESDEVENIMENTS, VISTES_PREPARADES, RECORREGUTS } from "@/data/esdeveniments";
import { BANDES_PERIODE, ETIQUETES, precisioDeData, type Disciplina, type Esdeveniment, type Obra, type Artista, type VistaPreparada } from "@/data/types";
import { proporció, estatImatge } from "@/data/imatges";import ImgObra from "./ImgObra";
import Enllac from "./Enllac";

// proporció s'usa a les targetes de mòbil via aspect-ratio fix; estatImatge al detall

const ANY_MIN = 1400;
const ANY_MAX = 1610;
const PX_SEGLES = 6.6; // segles: la franja sencera cap gairebé sense scroll
const PX_DECENNIS = 42; // decennis: detall
const MAX_ARTISTES_BARRA = 10;
const ETIQUETA_W = 148; // columna d'etiquetes de carril (fixa, sempre visible)

type Nivell = "segles" | "decennis";

interface Filtre {
  territori: "italia" | "no-italia" | "";
  disciplina: Disciplina | "";
  prioritats: boolean;
  artistes: string[]; // mode «comparar artistes» (màxim 3)
}

const FILTRE_NET: Filtre = { territori: "", disciplina: "", prioritats: false, artistes: [] };

// ── Colors semàntics + forma (el color no és mai l'única pista) ──
const DISC_META: Record<Disciplina, { color: string; forma: string; icona: typeof Palette; nom: string }> = {
  pintura: { color: "var(--disc-pintura)", forma: "cercle", icona: Palette, nom: "Pintura" },
  escultura: { color: "var(--disc-escultura)", forma: "triangle", icona: Anvil, nom: "Escultura" },
  arquitectura: { color: "var(--disc-arquitectura)", forma: "quadrat", icona: Landmark, nom: "Arquitectura" },
};

export default function TimelineView() {
  const { filtres, setFiltres } = useApp();

  // Vista preparada activa (compartible per ?vista=id); inclou les vistes dels recorreguts
  const TOTES_VISTES = useMemo(() => [...VISTES_PREPARADES, ...RECORREGUTS.map((r) => r.vista)], []);
  const vistaInicial = TOTES_VISTES.find((v) => v.id === filtres.vista) ?? VISTES_PREPARADES[0];
  const [vista, setVista] = useState<VistaPreparada>(vistaInicial);
  const [filtre, setFiltre] = useState<Filtre>(() => ({
    territori: vistaInicial.territori === "no-italia" ? "no-italia" : vistaInicial.territori === "italia" ? "italia" : "",
    disciplina: (vistaInicial.disciplina ?? "") as Filtre["disciplina"],
    prioritats: Boolean(vistaInicial.nomesPrioritats),
    artistes: filtres.artistes ? filtres.artistes.split(",").slice(0, 3) : [],
  }));
  const [interval_, setInterval_] = useState<[number, number]>(vistaInicial.interval);
  const [nivell, setNivell] = useState<Nivell>(vistaInicial.nivell);
  const recorregutActiu = RECORREGUTS.find((r) => r.vista.id === vista.id) ?? null;

  // NOTA: els filtres interns (disciplina, artistes triats) NO s'escriuen mai a l'URL
  // des d'aquí: els efectes del fill corren abans que el pare sincronitzi la ruta
  // (sincronitzaRuta) i esborrarien la query (?vista=…) en el doble muntatge de dev.
  // L'estat compartible de la cronologia viu al paràmetre ?vista=.

  // Sincronitza amb la URL quan arriba després del primer render (recàrrega,
  // enllaç compartit, «Tornar a la cronologia?vista=…» des d'una fitxa).
  // Patró React d'ajust d'estat DURANT el render (com CollectionsView amb q):
  // la regla react-hooks/set-state-in-effect prohibeix fer-ho en un efecte.
  const vistaDeURL = TOTES_VISTES.find((v) => v.id === filtres.vista) ?? null;
  const [darreraVistaURL, setDarreraVistaURL] = useState<string | null>(filtres.vista ?? null);
  if (vistaDeURL && vistaDeURL.id !== vista.id && vistaDeURL.id !== darreraVistaURL) {
    setDarreraVistaURL(vistaDeURL.id);
    setVista(vistaDeURL);
    setInterval_(vistaDeURL.interval);
    setNivell(vistaDeURL.nivell);
    setFiltre({
      territori: vistaDeURL.territori === "no-italia" ? "no-italia" : vistaDeURL.territori === "italia" ? "italia" : "",
      disciplina: (vistaDeURL.disciplina ?? "") as Filtre["disciplina"],
      prioritats: Boolean(vistaDeURL.nomesPrioritats),
      artistes: filtres.artistes ? filtres.artistes.split(",").slice(0, 3) : [],
    });
  }

  /** Aplica una vista preparada (botons grans d'entrada). */
  const aplicaVista = (v: VistaPreparada) => {
    setVista(v);
    setInterval_(v.interval);
    setNivell(v.nivell);
    setFiltre({
      territori: v.territori === "no-italia" ? "no-italia" : v.territori === "italia" ? "italia" : "",
      disciplina: (v.disciplina ?? "") as Filtre["disciplina"],
      prioritats: Boolean(v.nomesPrioritats),
      artistes: v.id === "comparar" ? filtre.artistes : [],
    });
    setFiltres({ vista: v.id, artistes: v.id === "comparar" ? filtre.artistes.join(",") || undefined : undefined });
  };

  const guia = vista.guia;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="font-serif text-3xl sm:text-4xl">Cronologia</h1>
        <p className="mt-2 text-tinta-2 max-w-3xl prose-llegible text-[15px]">
          Què passava al mateix temps? Trieu una vista per començar — primer la visió de conjunt,
          després el detall. Tres carrils sempre amb el mateix nom: context històric, artistes i obres.
        </p>

        {/* ── Vistes preparades: botons grans amb frase explicativa ── */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Vistes preparades de la cronologia">
          {VISTES_PREPARADES.map((v) => {
            const activa = v.id === vista.id;
            return (
              <button
                key={v.id}
                onClick={() => aplicaVista(v)}
                aria-pressed={activa}
                className={`text-left rounded-lg border p-4 transition-colors min-h-[44px] ${
                  activa
                    ? "border-accio bg-[var(--terra-suau)]"
                    : "border-linia bg-card hover:border-accio/50"
                }`}
              >
                <p className={`font-serif text-[16px] ${activa ? "text-accio" : ""}`}>{v.nom}</p>
                <p className="text-[13px] text-tinta-2 leading-snug mt-1">{v.frase}</p>
              </button>
            );
          })}
        </div>

        {/* ── Guia del recorregut didàctic (si la vista n'és una) ── */}
        {recorregutActiu && (
          <div className="mt-5 rounded-lg border border-concepte/50 bg-[var(--concepte-suau)] p-4 sm:p-5" role="note">
            <p className="etiqueta-tipus etiqueta-tipus-aur mb-1.5">Recorregut didàctic</p>
            <p className="font-serif text-lg leading-snug">{recorregutActiu.guia?.titol ?? recorregutActiu.pregunta}</p>
            <p className="text-[14px] leading-relaxed text-tinta-2 mt-1.5 prose-llegible">{recorregutActiu.guia?.text ?? recorregutActiu.explicacio}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {recorregutActiu.obresDestacades.map((slug) => (
                <ObraXipDestacada key={slug} slug={slug} />
              ))}
            </div>
          </div>
        )}

        {/* ── Guia genèrica de les vistes sense recorregut ── */}
        {!recorregutActiu && guia && (
          <div className="mt-5 rounded-lg border border-concepte/50 bg-[var(--concepte-suau)] p-4" role="note">
            <p className="font-serif text-[15.5px]">{guia.titol}</p>
            <p className="text-[13.5px] text-tinta-2 mt-1">{guia.text}</p>
          </div>
        )}

        {/* ── Filtres combinables: xips actius + Neteja + recompte ── */}
        <BarraFiltres filtre={filtre} setFiltre={setFiltre} vista={vista} aplicaVista={aplicaVista} />
      </div>

      <Legenda />

      {/* ── Escriptori: franja horitzontal amb 3 carrils ── */}
      <div className="hidden md:block mx-auto max-w-7xl px-4 sm:px-6 mt-4">
        <CronologiaEscriptori
          interval_={interval_}
          nivell={nivell}
          setNivell={setNivell}
          filtre={filtre}
          destacades={recorregutActiu?.obresDestacades ?? []}
        />
      </div>

      {/* ── Mòbil: cronologia vertical (cap desplaçament horitzontal) ── */}
      <div className="md:hidden mt-4">
        <CronologiaMobil filtre={filtre} destacades={recorregutActiu?.obresDestacades ?? []} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6">
        <p className="text-[12.5px] text-tinta-2 leading-relaxed max-w-3xl">
          Les dates aproximades i els intervals es representen diferent d&apos;un any exacte.
          Cada esdeveniment indica la font de la seva data. Feu clic a una obra per anar a la
          fitxa conservant el context cronològic, o a un artista per veure la seva activitat documentada.
        </p>
      </div>
    </div>
  );
}

/** Xip d'obra destacada dins d'un recorregut didàctic. */
function ObraXipDestacada({ slug }: { slug: string }) {
  const { obreViewer } = useApp();
  const o = OBRES_CRONO.find((w) => w.slug === slug);
  if (!o) return null;
  return (
    <button
      onClick={() => obreViewer(slug)}
      className="inline-flex items-center gap-1.5 rounded-full border border-concepte bg-card px-3 py-1.5 text-[13px] text-tinta hover:bg-[var(--concepte-suau)] transition-colors"
      title="Obrir al visor amb les anotacions"
    >
      <Layers className="size-3.5 text-concepte" aria-hidden />
      {o.titol}
    </button>
  );
}

// ══════════════ FILTRES ══════════════

function BarraFiltres({
  filtre,
  setFiltre,
  vista,
  aplicaVista,
}: {
  filtre: Filtre;
  setFiltre: (f: Filtre) => void;
  vista: VistaPreparada;
  aplicaVista: (v: VistaPreparada) => void;
}) {
  const { setFiltres } = useApp();
  const neta = !filtre.territori && !filtre.disciplina && !filtre.prioritats && filtre.artistes.length === 0;

  const xips: { label: string; treu: () => void }[] = [];
  if (filtre.territori) xips.push({ label: filtre.territori === "italia" ? "Itàlia" : "Fora d'Itàlia", treu: () => setFiltre({ ...filtre, territori: "" }) });
  if (filtre.disciplina) xips.push({ label: ETIQUETES.disciplina[filtre.disciplina], treu: () => setFiltre({ ...filtre, disciplina: "" }) });
  if (filtre.prioritats) xips.push({ label: "Només fites principals", treu: () => setFiltre({ ...filtre, prioritats: false }) });
  for (const slug of filtre.artistes) {
    const a = ARTISTES.find((ar) => ar.slug === slug);
    if (a) xips.push({ label: a.nom, treu: () => setFiltre({ ...filtre, artistes: filtre.artistes.filter((s) => s !== slug) }) });
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filtres de la cronologia">
      <Filter className="size-4 text-tinta-2" aria-hidden />

      {/* Mode «una disciplina»: selector */}
      {vista.id === "disciplina" && (
        <label className="text-sm">
          <span className="sr-only">Tria la disciplina</span>
          <select
            value={filtre.disciplina}
            onChange={(e) => setFiltre({ ...filtre, disciplina: e.target.value as Filtre["disciplina"] })}
            className="rounded-md bg-card border border-linia px-2.5 py-2 text-sm"
          >
            <option value="">Disciplina: totes</option>
            {Object.entries(ETIQUETES.disciplina).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </label>
      )}

      {/* Mode «comparar artistes»: fins a 3 seleccions */}
      {vista.id === "comparar" && (
        <SelectorArtistes filtre={filtre} setFiltre={setFiltre} />
      )}

      {xips.map((x) => (
        <button
          key={x.label}
          onClick={x.treu}
          className="inline-flex items-center gap-1.5 rounded-full border border-accio/40 bg-[var(--terra-suau)] px-3 py-1 text-xs text-accio hover:bg-[rgba(166,78,50,0.18)]"
        >
          {x.label}
          <X className="size-3" aria-hidden />
          <span className="sr-only">Treure el filtre</span>
        </button>
      ))}

      {!neta && (
        <button
          onClick={() => {
            setFiltre({ ...FILTRE_NET, artistes: [] });
            aplicaVista(VISTES_PREPARADES[0]);
            setFiltres({ vista: "panorama" });
          }}
          className="text-xs text-tinta-2 underline hover:text-accio"
        >
          Neteja
        </button>
      )}

      <span className="ml-auto text-sm text-tinta-2" aria-live="polite" role="status">
        <Comptador filtre={filtre} vista={vista} />
      </span>
    </div>
  );
}

function Comptador({ filtre, vista }: { filtre: Filtre; vista: VistaPreparada }) {
  const { esdev, artistes, obres } = dadesFiltrades(filtre, vista);
  return (
    <>
      {esdev.length} esdeveniment{esdev.length !== 1 ? "s" : ""} · {artistes.length} artiste
      {artistes.length !== 1 ? "s" : ""} · {obres.length} obra{obres.length !== 1 ? "s" : ""}
    </>
  );
}

function SelectorArtistes({ filtre, setFiltre }: { filtre: Filtre; setFiltre: (f: Filtre) => void }) {
  const afegits = filtre.artistes;
  const opcions = ARTISTES.filter((a) => !afegits.includes(a.slug)).sort((a, b) => a.nom.localeCompare(b.nom, "ca"));
  return (
    <div className="flex flex-wrap items-center gap-2">
      {afegits.length < 3 && (
        <label className="text-sm">
          <span className="sr-only">Afegeix un artista (màxim 3)</span>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) setFiltre({ ...filtre, artistes: [...afegits, e.target.value] });
            }}
            className="rounded-md bg-card border border-linia px-2.5 py-2 text-sm"
          >
            <option value="">Afegeix artista ({afegits.length}/3)</option>
            {opcions.map((a) => (
              <option key={a.slug} value={a.slug}>{a.nom}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

// ══════════════ DADES FILTRADES ══════════════

function dadesFiltrades(filtre: Filtre, vista: VistaPreparada) {
  const temes = RECORREGUTS.find((r) => r.vista.id === vista.id)?.conceptes ?? [];

  const esdev = ESDEVENIMENTS.filter((e) => {
    if (e.anyInici < ANY_MIN - 15 || e.anyInici > ANY_MAX) return false;
    if (filtre.prioritats && !e.prioritatPanorama) return false;
    if (filtre.territori === "italia" && e.territori !== "italia") return false;
    if (filtre.territori === "no-italia" && e.territori === "italia") return false;
    if (filtre.disciplina && e.tipus !== "art") return false;
    return true;
  });

  const artistes = ARTISTES.filter((a) => {
    if (filtre.artistes.length > 0) return filtre.artistes.includes(a.slug);
    if (filtre.disciplina && !a.ambits.some((x) => x.includes(filtre.disciplina === "arquitectura" ? "arquitect" : filtre.disciplina.slice(0, 8)))) return false;
    if (filtre.territori === "italia" && a.ambitFiltro !== "italia") return false;
    if (filtre.territori === "no-italia" && a.ambitFiltro === "italia") return false;
    return true;
  });

  const obres = OBRES_CRONO.filter((o) => {
    if (filtre.artistes.length > 0) return filtre.artistes.includes(o.autorSlug);
    if (filtre.disciplina && o.disciplina !== filtre.disciplina) return false;
    if (filtre.territori === "italia" && o.ambit !== "italia") return false;
    if (filtre.territori === "no-italia" && o.ambit === "italia") return false;
    return true;
  });

  void temes;
  return { esdev, artistes, obres };
}

// ══════════════ LLEGENDA ══════════════

function Legenda() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-linia bg-card px-4 py-2.5 text-[12.5px] text-tinta-2" aria-label="Llegenda de colors i formes">
        <span className="font-medium text-tinta">Llegenda:</span>
        {Object.entries(DISC_META).map(([k, m]) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <FormaDisciplina d={k as Disciplina} />
            {m.nom}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-2.5 rotate-45 rounded-[2px] bg-[var(--context-visual)]" aria-hidden />
          Context històric
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-5 rounded-full bg-[var(--artista-visual)]" aria-hidden />
          Artistes (activitat documentada)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block size-3 rounded-full border-2 border-dashed border-tinta-2" aria-hidden />
          Datació aproximada
        </span>
      </div>
    </div>
  );
}

function FormaDisciplina({ d, size = 10 }: { d: Disciplina; size?: number }) {
  const m = DISC_META[d];
  if (m.forma === "cercle") return <span className="inline-block rounded-full" style={{ width: size, height: size, background: m.color }} aria-hidden />;
  if (m.forma === "quadrat") return <span className="inline-block rounded-[2px]" style={{ width: size, height: size, background: m.color }} aria-hidden />;
  return (
    <span
      className="inline-block"
      style={{ width: 0, height: 0, borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderBottom: `${size}px solid ${m.color}` }}
      aria-hidden
    />
  );
}

// ══════════════ ESCRIPTORI ══════════════

function CronologiaEscriptori({
  interval_,
  nivell,
  setNivell,
  filtre,
  destacades,
}: {
  interval_: [number, number];
  nivell: Nivell;
  setNivell: (n: Nivell) => void;
  filtre: Filtre;
  destacades: string[];
}) {
  const vista = useVistaActual();
  const { esdev, artistes, obres } = useMemo(() => dadesFiltrades(filtre, vista), [filtre, vista]);
  const pxPerAny = nivell === "segles" ? PX_SEGLES : PX_DECENNIS;
  const [inici, fi] = interval_;
  const totalPx = Math.round((fi - inici) * pxPerAny);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [viewportAny, setViewportAny] = useState<number>(inici);

  const x = (any: number) => (any - inici) * pxPerAny;

  // Centra el scroll a l'inici de la vista en canviar interval/nivell
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = Math.max(0, x(inici) - 40);
  }, [inici, fi, nivell]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setViewportAny(inici + el.scrollLeft / pxPerAny);
  };

  const saltaA = (any: number) => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: Math.max(0, x(any) - el.clientWidth / 2), behavior: "smooth" });
  };
  const mou = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const artistesBarra = artistes.slice(0, MAX_ARTISTES_BARRA);
  const artistesRestants = artistes.slice(MAX_ARTISTES_BARRA);
  const alcaArtistes = Math.max(artistesBarra.length * 28 + 8, 36);

  // Grup per decenni de les obres (sempre, als dos nivells)
  const decennis = useMemo(() => {
    const g = new Map<number, Obra[]>();
    for (const o of obres) {
      const d = Math.floor(o.anyInici / 10) * 10;
      if (!g.has(d)) g.set(d, []);
      g.get(d)!.push(o);
    }
    return [...g.entries()].sort((a, b) => a[0] - b[0]);
  }, [obres]);

  const [targetaOberta, setTargetaOberta] = useState<number | null>(null);

  return (
    <div className="rounded-lg border border-linia bg-card overflow-hidden">
      {/* Barra de controls: nivell de zoom + Anterior/Següent */}
      <div className="flex items-center gap-2 border-b border-linia px-3 py-2 bg-paper-2">
        <div className="inline-flex rounded-md border border-linia overflow-hidden" role="group" aria-label="Nivell de zoom temporal">
          {(["segles", "decennis"] as Nivell[]).map((n) => (
            <button
              key={n}
              onClick={() => setNivell(n)}
              aria-pressed={nivell === n}
              className={`px-3 py-1.5 text-[12.5px] ${nivell === n ? "bg-accio text-white font-medium" : "bg-card hover:bg-paper-2"}`}
            >
              {n === "segles" ? "Segles" : "Decennis"}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-md border border-linia overflow-hidden ml-1">
          <button onClick={() => mou(-1)} className="px-2.5 py-1.5 hover:bg-paper-2" aria-label="Anterior: moure cap enrere en el temps">
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button onClick={() => mou(1)} className="px-2.5 py-1.5 hover:bg-paper-2 border-l border-linia" aria-label="Següent: avançar en el temps">
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
        <span className="text-[12px] text-tinta-2 ml-1">
          {inici}-{fi} · {nivell === "segles" ? "visió de conjunt" : "detall per decennis"}
        </span>
      </div>

      {/* Barra de conjunt (mini-mapa 1400-1610 amb la finestra visible) */}
      <MiniMapa totalPx={totalPx} inici={inici} viewportAny={viewportAny} pxPerAny={pxPerAny} saltaA={saltaA} />

      <div className="flex">
        {/* Etiquetes de carril fixades (auditoria: nom permanent visible) */}
        <div className="shrink-0 border-r border-linia bg-paper-2" style={{ width: ETIQUETA_W }}>
          <div className="h-[52px] border-b border-linia" aria-hidden />
          <LaneLabel height={112} icona={History} nom="Context històric" color="var(--context-visual)" />
          <LaneLabel height={alcaArtistes} icona={Users} nom="Artistes" color="var(--artista-visual)" sub="activitat documentada" />
          <LaneLabel height={168} icona={ImageIcon} nom="Obres" color="var(--tinta)" sub="agrupades per decenni" />
        </div>

        {/* Zona temporal amb scroll horitzontal (només aquí) */}
        <div ref={scrollRef} onScroll={onScroll} className="overflow-x-auto overflow-y-hidden flex-1 visor-pannable" style={{ height: 52 + 112 + alcaArtistes + 168 }} tabIndex={0} aria-label="Zona temporal: desplaça horitzontalment per veure més anys">
          <div style={{ width: totalPx, position: "relative" }}>
            {/* Capçalera temporal (visòria de 25 anys + segles, queda fixada en desplaçar verticalment) */}
            <div className="sticky top-0 z-20 h-[52px] border-b border-linia bg-paper" style={{ minWidth: totalPx }}>
              {BANDES_PERIODE.map((b) => (
                <div
                  key={b.nom}
                  className="absolute top-0 h-[22px] rounded-b-sm"
                  style={{ left: Math.max(x(b.inici), 0), width: Math.min(x(b.fi), totalPx) - Math.max(x(b.inici), 0), background: b.color }}
                  title={b.descripcio}
                >
                  <span className="pl-1.5 text-[10px] uppercase tracking-wider text-tinta leading-[22px] whitespace-nowrap">{b.nom}</span>
                </div>
              ))}
              {/* Marques de 25 anys + etiquetes de segle */}
              {Array.from({ length: Math.floor((fi - inici) / 25) + 1 }, (_, i) => inici + i * 25).map((any) => (
                <div key={any} className="absolute bottom-0 h-[30px] w-px bg-linia" style={{ left: x(any) }}>
                  <span className="absolute bottom-0.5 left-1 text-[10px] text-tinta-2 tabular-nums">{any}</span>
                </div>
              ))}
              {[1450, 1550].map((any) => (
                <span key={any} className="absolute top-[24px] text-[11px] font-medium text-tinta -translate-x-1/2" style={{ left: x(any) }}>
                  segle {any < 1500 ? "XV" : "XVI"}
                </span>
              ))}
            </div>

            {/* CARRIL 1: context històric (esdeveniments) */}
            <div className="relative border-b border-linia" style={{ height: 112 }} aria-label="Context històric: esdeveniments">
              <PistaEsdeveniments esdev={esdev} x={x} nivell={nivell} />
            </div>

            {/* CARRIL 2: artistes */}
            <div className="relative border-b border-linia" style={{ height: alcaArtistes }} aria-label="Artistes: intervals d'activitat documentada">
              {artistesBarra.map((a, i) => (
                <BandaArtista key={a.slug} artista={a} x={x} top={4 + i * 28} nivell={nivell} />
              ))}
            </div>

            {/* CARRIL 3: obres agrupades per decenni */}
            <div className="relative" style={{ height: 168 }} aria-label="Obres agrupades per decenni">
              {decennis.map(([dec, llista]) => (
                <MarcadorDecenni
                  key={dec}
                  any={dec}
                  obres={llista}
                  x={x}
                  obert={targetaOberta === dec}
                  onObre={() => setTargetaOberta(targetaOberta === dec ? null : dec)}
                  destacades={destacades}
                  nivell={nivell}
                  totalPx={totalPx}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artistes restants (auditoria: llista dels que no caben) */}
      {artistesRestants.length > 0 && (
        <div className="border-t border-linia px-4 py-3 bg-paper-2">
          <p className="etiqueta-tipus mb-2">Altres artistes de la vista ({artistesRestants.length})</p>
          <div className="flex flex-wrap gap-2">
            {artistesRestants.map((a) => (
              <Enllac
                key={a.slug}
                desti={"artista/" + a.slug}
                className="rounded-full border border-linia bg-card px-3 py-1 text-[12.5px] text-tinta-2 hover:border-accio/50 hover:text-accio"
              >
                {a.nom} <span className="text-[11px]">{a.activitatInici}-{a.activitatFi}</span>
              </Enllac>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Vista preparada actual llegida del store (per als components nets). */
function useVistaActual(): VistaPreparada {
  const vistaFiltre = useApp((s) => s.filtres.vista);
  return VISTES_PREPARADES.find((v) => v.id === vistaFiltre) ?? VISTES_PREPARADES[0];
}

function LaneLabel({ height, icona: Icona, nom, color, sub }: { height: number; icona: typeof History; nom: string; color: string; sub?: string }) {
  return (
    <div className="border-b border-linia px-3 flex flex-col justify-center" style={{ height }}>
      <p className="flex items-center gap-1.5 text-[12px] font-medium leading-tight">
        <Icona className="size-3.5 shrink-0" style={{ color }} aria-hidden />
        {nom}
      </p>
      {sub && <p className="text-[10.5px] text-tinta-2 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Esdeveniments: fites etiquetades directament; secundàries amb clic/focus ──

function PistaEsdeveniments({ esdev, x, nivell }: { esdev: Esdeveniment[]; x: (a: number) => number; nivell: Nivell }) {
  const [obert, setObert] = useState<Esdeveniment | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Amplada real estimada de l'etiqueta directa («1508-12 · Miquel Àngel pinta la Volta…»)
  const ampladaEtiqueta = (e: Esdeveniment) => {
    const prefix = String(e.anyInici).length + (e.anyFi ? 4 : 0) + 3;
    return Math.min((prefix + e.titol.length) * 5.4 + 14, 280);
  };
  // A vista de conjunt, retalla els títols llargs per evitar col·lisions
  const titolEtiqueta = (e: Esdeveniment) =>
    nivell === "segles" && e.titol.length > 26 ? e.titol.slice(0, 24).replace(/[,\s]+$/, "") + "…" : e.titol;

  // Col·lisió: dues files dins del carril (fita = fila 1; resta = fila 2)
  const collocades: { e: Esdeveniment; fila: number }[] = [];
  const ultimX: [number, number] = [-9999, -9999];
  for (const e of [...esdev].sort((a, b) => a.anyInici - b.anyInici)) {
    const px = x(e.anyInici);
    const amp = (e.anyFi ? x(e.anyFi) - px : 0) + ampladaEtiqueta(e);
    let fila = e.prioritatPanorama ? 0 : 1;
    if (px < ultimX[fila]) fila = fila === 0 ? 1 : 0;
    if (px < ultimX[fila]) continue; // solapament irresoluble: el recompte i el mòbil el mostren
    collocades.push({ e, fila });
    ultimX[fila] = px + amp;
  }

  return (
    <div ref={ref}>
      {collocades.map(({ e, fila }) => {
        const top = fila === 0 ? 14 : 62;
        const aprox = e.precisioData === "aproximada";
        return (
          <div key={e.anyInici + e.titol} className="absolute" style={{ left: x(e.anyInici), top }}>
            <button
              onClick={() => setObert(obert === e ? null : e)}
              onFocus={() => setObert(e)}
              aria-expanded={obert === e}
              aria-label={`${e.anyInici}: ${e.titol}. ${e.prioritatPanorama ? "Fita principal." : "Esdeveniment secundari."} Mostra la descripció i la font de la data`}
              className="relative flex size-11 -m-2 items-center justify-center rounded-full hover:bg-[var(--terra-suau)] focus-visible:bg-[var(--terra-suau)] focus-visible:outline-none"
            >
              {/* Marca gràfica 12-16 px: rombe (context); fita plena, secundària buida; aproximada discontínua */}
              <span
                className={`block size-3.5 rotate-45 rounded-[2px] transition-transform ${
                  e.prioritatPanorama || obert === e ? "scale-125" : ""
                } ${aprox ? "border-2 border-dashed" : ""}`}
                style={{
                  background: e.prioritatPanorama ? "var(--context-visual)" : "transparent",
                  borderColor: "var(--context-visual)",
                }}
                aria-hidden
              />
            </button>
            {/* Etiqueta directa de les fites (mai hover-only) */}
            {e.prioritatPanorama && (
              <span
                className="absolute top-[46px] -translate-x-1/2 whitespace-nowrap text-[10.5px] leading-tight text-tinta bg-paper/90 px-1 rounded pointer-events-none"
                style={{ left: e.anyFi ? (x(e.anyFi) - x(e.anyInici)) / 2 : 0 }}
              >
                <span className="tabular-nums">{e.anyInici}</span>
                {e.anyFi && <span className="tabular-nums">-{String(e.anyFi).slice(2)}</span>} · {titolEtiqueta(e)}
              </span>
            )}
            {e.anyFi && (
              <span
                className="absolute top-[16px] h-[3px] rounded-full"
                style={{ left: 18, width: Math.max(x(e.anyFi) - x(e.anyInici) - 18, 4), background: "rgba(62,70,71,0.35)" }}
                aria-hidden
              />
            )}
            {obert === e && (
              <div role="dialog" aria-label={`Esdeveniment: ${e.titol}`} className="absolute z-40 top-6 w-72 rounded-lg bg-card border border-linia shadow-xl p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] uppercase tracking-wider text-tinta-2 tabular-nums">
                    {e.anyInici}{e.anyFi ? `-${e.anyFi}` : ""}
                    {aprox && <span className="ml-1.5 normal-case tracking-normal">(datació aproximada)</span>}
                  </p>
                  <button onClick={() => setObert(null)} className="p-0.5 rounded hover:bg-tinta/5" aria-label="Tancar">
                    <X className="size-3.5" aria-hidden />
                  </button>
                </div>
                <p className="font-serif text-[15px] leading-snug mt-0.5">{e.titol}</p>
                <p className="text-[12.5px] text-tinta-2 leading-relaxed mt-1">{e.descripcio}</p>
                <p className="text-[11px] text-tinta-2 mt-2 pt-2 border-t border-linia">
                  <span className="etiqueta-tipus">Font de la data:</span> {e.fontData}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Artistes: barres d'activitat DOCUMENTADA (mai naixement + 20) ──

function BandaArtista({ artista: a, x, top, nivell }: { artista: Artista; x: (a: number) => number; top: number; nivell: Nivell }) {
  const esVida = a.estatDocumentacio === "vida_documentada" || a.estatDocumentacio === "estimacio";
  const inici = Math.max(a.activitatInici ?? ANY_MIN, ANY_MIN);
  const fi = Math.min(a.activitatFi ?? ANY_MAX, ANY_MAX);
  const left = x(inici);
  const width = Math.max(x(fi) - left, 14);
  const mostraNom = width > 90 && nivell === "decennis";

  return (
    <div className="absolute group" style={{ left, width, top }}>
      <Enllac
        desti={"artista/" + a.slug}
        title={`${a.nom}: ${esVida ? `vida ${a.dates}` : `activitat documentada ${inici}-${fi}`}. Anar a la fitxa`}
        className="flex h-[20px] items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accio rounded-full"
      >
        <span
          className={`h-2.5 w-full rounded-full bg-[var(--artista-visual)] group-hover:brightness-110 transition-all ${
            esVida ? "border border-dashed border-[var(--artista-visual)] bg-transparent" : ""
          }`}
          aria-hidden
        />
        <span className="sr-only">
          {a.nom}, {esVida ? `dates de vida ${a.dates}` : `activitat documentada de ${inici} a ${fi}`}
        </span>
      </Enllac>
      {mostraNom && (
        <span className="absolute left-1 top-[3px] text-[9.5px] whitespace-nowrap text-paper pointer-events-none">
          {a.nom}
        </span>
      )}
      {!mostraNom && (
        <span className="absolute left-0 top-[22px] text-[9.5px] whitespace-nowrap text-tinta-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
          {a.nom}
        </span>
      )}
    </div>
  );
}

// ── Obres: marcador per decenni amb recompte → targeta amb miniatura ──

function MarcadorDecenni({
  any,
  obres,
  x,
  obert,
  onObre,
  destacades,
  nivell,
  totalPx,
}: {
  any: number;
  obres: Obra[];
  x: (a: number) => number;
  obert: boolean;
  onObre: () => void;
  destacades: string[];
  nivell: Nivell;
  totalPx: number;
}) {
  const centre = x(any) + Math.max((x(any + 10) - x(any)) / 2, 0);
  const primer = obres[0];
  const mostraDirecta = nivell === "decennis" && obres.length <= 2;

  if (mostraDirecta) {
    // Pocs elements en detall: pins individuals (les dades en interval com a barra)
    return (
      <>
        {obres.map((o, i) => {
          const rang = precisioDeData(o.data) === "rang" || precisioDeData(o.data) === "iniciada";
          const left = x(o.anyInici);
          const width = rang ? Math.max(x(o.anyFi) - left, 10) : 0;
          const meta = DISC_META[o.disciplina];
          return (
            <div key={o.slug} className="absolute" style={{ left: centre + i * 30, top: 18 }}>
              <button
                onClick={onObre}
                aria-label={`${o.titol}, ${o.autorNom}, ${o.data}. Obrir la targeta`}
                className="relative flex size-11 -m-2 items-center justify-center rounded-md hover:bg-[var(--terra-suau)] focus-visible:bg-[var(--terra-suau)] focus-visible:outline-none"
              >
                {rang && (
                  <span className="absolute h-[5px] rounded-full opacity-60" style={{ left: 12, width: width + 20, background: meta.color }} aria-hidden />
                )}
                <FormaDisciplina d={o.disciplina} size={12} />
                {destacades.includes(o.slug) && (
                  <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-concepte ring-2 ring-paper" aria-hidden />
                )}
              </button>
              {obert && <TargetaObres obres={obres} onTanca={onObre} alinear={centre > totalPx - 320 ? "dreta" : "esquerra"} />}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="absolute" style={{ left: centre, top: 30 }}>
      <button
        onClick={onObre}
        aria-expanded={obert}
        aria-label={`${obres.length} obra${obres.length !== 1 ? "s" : ""} del decenni ${any}-${any + 9}. Obre la targeta`}
        className="relative flex size-11 -m-2.5 items-center justify-center rounded-full hover:bg-[var(--terra-suau)] focus-visible:bg-[var(--terra-suau)] focus-visible:outline-none"
      >
        <span
          className="flex items-center justify-center min-w-7 h-6 px-1.5 rounded-full border-2 text-[11px] font-semibold tabular-nums bg-paper shadow-sm"
          style={{ borderColor: DISC_META[primer.disciplina].color, color: "var(--tinta)" }}
          aria-hidden
        >
          {obres.length}
        </span>
        {/* forma de la primera obra per pista semàntica */}
        <span className="absolute -bottom-1.5" aria-hidden>
          <FormaDisciplina d={primer.disciplina} size={7} />
        </span>
      </button>
      {obert && <TargetaObres obres={obres} onTanca={onObre} alinear={centre > totalPx - 340 ? "dreta" : "esquerra"} />}
    </div>
  );
}

/** Targeta del decenni: miniatura, autor, data, concepte i enllaç a la fitxa. */
function TargetaObres({ obres, onTanca, alinear }: { obres: Obra[]; onTanca: () => void; alinear: "esquerra" | "dreta" }) {
  const vistaActual = useVistaActual();
  const destiObra = (slug: string) => "obra/" + slug + "?desDe=cronologia" + (vistaActual.id !== "panorama" ? "&vista=" + vistaActual.id : "");
  return (
    <div
      role="dialog"
      aria-label={`Obres del decenni`}
      className={`absolute z-40 top-10 w-[320px] max-h-[300px] overflow-y-auto rounded-lg bg-card border border-linia shadow-xl p-2 ${
        alinear === "dreta" ? "-translate-x-[88%]" : "-translate-x-1/3"
      }`}
    >
      <div className="flex items-center justify-between px-1.5 pt-1 pb-1.5">
        <p className="text-[11px] uppercase tracking-wider text-tinta-2">{obres.length} obra{obres.length !== 1 ? "s" : ""}</p>
        <button onClick={onTanca} className="p-0.5 rounded hover:bg-tinta/5" aria-label="Tancar la targeta">
          <X className="size-3.5" aria-hidden />
        </button>
      </div>
      <ul className="space-y-1.5">
        {obres.map((o) => (
          <li key={o.slug}>
            <Enllac
              key={o.slug}
              desti={destiObra(o.slug)}
              className="flex gap-2.5 rounded-md p-1.5 hover:bg-paper-2 transition-colors"
            >
              <span className="w-12 h-12 shrink-0 rounded border border-linia overflow-hidden bg-paper-2 flex items-center justify-center">
                <ImgObra slug={o.slug} amplada={96} alt="" className="w-12 h-12 object-contain" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-[13.5px] leading-tight truncate">{o.titol}</span>
                <span className="block text-[11.5px] text-tinta-2">{o.autorNom} · {o.data}</span>
                <span className="flex items-center gap-1 text-[10.5px] mt-0.5">
                  <FormaDisciplina d={o.disciplina} size={6} />
                  <span className="text-tinta-2">{DISC_META[o.disciplina].nom}</span>
                  {o.concepts[0] && (
                    <>
                      <span className="text-tinta-2">·</span>
                      <span className="text-concepte truncate">{o.concepts[0].replace(/-/g, " ")}</span>
                    </>
                  )}
                  {estatImatge(o.slug) === "zoom" && <span className="text-tinta-2">· zoom</span>}
                </span>
              </span>
            </Enllac>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Mini-mapa de conjunt (auditoria: barra de navegació de conjunt) ──

function MiniMapa({ totalPx, inici, viewportAny, pxPerAny, saltaA }: { totalPx: number; inici: number; viewportAny: number; pxPerAny: number; saltaA: (a: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onClick = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const any = ANY_MIN + ((e.clientX - rect.left) / rect.width) * (ANY_MAX - ANY_MIN);
    saltaA(any);
  };
  const posVista = ((viewportAny - ANY_MIN) / (ANY_MAX - ANY_MIN)) * 100;

  return (
    <div className="px-3 py-2 bg-paper-2 border-b border-linia">
      <div
        ref={ref}
        onClick={onClick}
        className="relative h-7 rounded-md cursor-pointer overflow-hidden border border-linia bg-paper"
        role="button"
        tabIndex={0}
        aria-label="Barra de conjunt 1400-1610: feu clic per saltar a un any"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") saltaA(viewportAny - 20);
          if (e.key === "ArrowRight") saltaA(viewportAny + 20);
        }}
      >
        {BANDES_PERIODE.map((b) => (
          <div
            key={b.nom}
            className="absolute inset-y-0"
            style={{
              left: `${((b.inici - ANY_MIN) / (ANY_MAX - ANY_MIN)) * 100}%`,
              width: `${((b.fi - b.inici) / (ANY_MAX - ANY_MIN)) * 100}%`,
              background: b.color,
            }}
            title={b.descripcio}
            aria-hidden
          />
        ))}
        <div
          className="absolute inset-y-0 w-1 rounded bg-accio shadow"
          style={{ left: `calc(${posVista}% - 2px)` }}
          aria-hidden
        />
        <span className="absolute left-1.5 top-0.5 text-[9.5px] text-tinta-2 tabular-nums">1400</span>
        <span className="absolute right-1.5 top-0.5 text-[9.5px] text-tinta-2 tabular-nums">1610</span>
      </div>
      <p className="mt-1 text-[10.5px] text-tinta-2 flex items-center gap-1">
        <CircleHelp className="size-3" aria-hidden />
        La marca terracota indica on esteu dins de la franja 1400-1610; feu clic per saltar.
        {(totalPx / pxPerAny) > 200 && " En aquest nivell es desplaça horitzontalment la zona temporal."}
      </p>
    </div>
  );
}

// ══════════════ MÒBIL: cronologia vertical ══════════════

function CronologiaMobil({ filtre, destacades }: { filtre: Filtre; destacades: string[] }) {
  const vista = useVistaActual();
  const { esdev, artistes, obres } = useMemo(() => dadesFiltrades(filtre, vista), [filtre, vista]);

  // Seccions per període (no caixes hermètiques: els límits són aproximats)
  const seccions: { nom: string; inici: number; fi: number; nota: string }[] = [
    { nom: "Quattrocento", inici: 1400, fi: 1499, nota: "El llenguatge neix a Itàlia; a Flandes, l'oli" },
    { nom: "Cinquecento", inici: 1500, fi: 1549, nota: "Apogeu romà i venecià" },
    { nom: "Manierisme i difusió", inici: 1550, fi: 1610, nota: "Vies alternatives i Europa sencera" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
      {seccions.map((s) => {
        const eSecc = esdev.filter((e) => e.anyInici >= s.inici && e.anyInici <= s.fi);
        const aSecc = artistes.filter((a) => (a.activitatFi ?? 1610) >= s.inici && (a.activitatInici ?? 1400) <= s.fi);
        const oSecc = obres.filter((o) => o.anyInici >= s.inici && o.anyInici <= s.fi);
        if (eSecc.length + aSecc.length + oSecc.length === 0) return null;
        return (
          <section key={s.nom} aria-label={`${s.nom}, ${s.inici}-${s.fi}`}>
            <div className="flex items-baseline gap-2 mb-3">
              <h2 className="font-serif text-xl">{s.nom}</h2>
              <span className="text-[12px] text-tinta-2 tabular-nums">{s.inici}-{s.fi}</span>
              <span className="text-[11.5px] text-tinta-2 hidden sm:inline">· {s.nota}</span>
            </div>

            {/* Esdeveniments (context) */}
            {eSecc.length > 0 && (
              <ul className="mb-4 space-y-0" aria-label="Esdeveniments">
                {eSecc.map((e) => (
                  <EsdevenimentMobil key={e.anyInici + e.titol} e={e} />
                ))}
              </ul>
            )}

            {/* Artistes */}
            {aSecc.length > 0 && (
              <div className="mb-4">
                <p className="etiqueta-tipus mb-1.5 flex items-center gap-1.5">
                  <Users className="size-3.5" style={{ color: "var(--artista-visual)" }} aria-hidden /> Artistes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {aSecc.map((a) => (
                    <Enllac
                      key={a.slug}
                      desti={"artista/" + a.slug}
                      className="rounded-full border border-linia bg-card px-2.5 py-1 text-[12px] text-tinta-2"
                    >
                      {a.nom}{" "}
                      <span className="tabular-nums text-[10.5px]">
                        {a.estatDocumentacio === "activitat_documentada" ? `${a.activitatInici}-${a.activitatFi}` : `vida ${a.dates}`}
                      </span>
                    </Enllac>
                  ))}
                </div>
              </div>
            )}

            {/* Obres (targetes amb miniatura) */}
            {oSecc.length > 0 && (
              <div>
                <p className="etiqueta-tipus mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="size-3.5" aria-hidden /> Obres ({oSecc.length})
                </p>
                <ul className="grid grid-cols-2 gap-2.5">
                  {oSecc.map((o) => (
                    <li key={o.slug}>
                      <Enllac
                        desti={"obra/" + o.slug + "?desDe=cronologia"}
                        className={`block rounded-lg border bg-card overflow-hidden ${destacades.includes(o.slug) ? "border-concepte" : "border-linia"}`}
                      >
                        <span className="block aspect-[4/3] bg-paper-2 relative">
                          <ImgObra slug={o.slug} amplada={320} alt="" fit="contain" className="absolute inset-0 w-full h-full p-1.5" />
                          {destacades.includes(o.slug) && (
                            <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full bg-concepte" aria-label="Obra del recorregut" />
                          )}
                        </span>
                        <span className="block p-2">
                          <span className="flex items-center gap-1 text-[10px]">
                            <FormaDisciplina d={o.disciplina} size={6} />
                            <span className="text-tinta-2">{DISC_META[o.disciplina].nom}</span>
                          </span>
                          <span className="block font-serif text-[13px] leading-tight mt-0.5">{o.titol}</span>
                          <span className="block text-[11px] text-tinta-2">{o.autorNom} · {o.data}</span>
                        </span>
                      </Enllac>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function EsdevenimentMobil({ e }: { e: Esdeveniment }) {
  const [obert, setObert] = useState(false);
  const aprox = e.precisioData === "aproximada";
  return (
    <li className="relative pl-6 pb-3 border-l-2 border-linia last:border-l-transparent">
      <button
        onClick={() => setObert(!obert)}
        aria-expanded={obert}
        className="text-left w-full min-h-[44px] flex flex-col justify-center focus-visible:outline-none"
      >
        <span className="absolute -left-[7px] top-4">
          <span className={`block size-3 rotate-45 rounded-[2px] ${aprox ? "border-2 border-dashed" : ""}`} style={{ background: e.prioritatPanorama ? "var(--context-visual)" : "transparent", borderColor: "var(--context-visual)" }} aria-hidden />
        </span>
        <span className="text-[13px] leading-snug">
          <span className="tabular-nums font-medium">{e.anyInici}{e.anyFi ? `-${e.anyFi}` : ""}</span>
          {" · "}
          {e.titol}
          {e.prioritatPanorama && <span className="ml-1.5 rounded border border-concepte/40 px-1 text-[9.5px] uppercase text-concepte">fita</span>}
        </span>
      </button>
      {obert && (
        <div role="status" className="mt-1 rounded-md bg-card border border-linia p-2.5 text-[12.5px] leading-relaxed text-tinta-2">
          {e.descripcio}
          <span className="block mt-1.5 text-[11px]"><span className="etiqueta-tipus">Font:</span> {e.fontData}</span>
        </div>
      )}
    </li>
  );
}
