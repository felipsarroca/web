"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, X, RotateCcw, ZoomIn } from "lucide-react";
import { ARTISTES } from "@/data/artistes";
import { RECORREGUTS } from "@/data/esdeveniments";
import { ETIQUETES, precisioDeData, type Obra } from "@/data/types";
import { useApp, filtresACerca, type FiltresURL } from "@/lib/renaissance/store";
import { dadesCronologia, EPOQUES, posicioInterval, type FilaCronologia } from "@/lib/renaissance/cronologia";
import Enllac from "./Enllac";
import ImgObra from "./ImgObra";
import styles from "./TimelineView.module.css";

const COLORS = { pintura: "var(--disc-pintura)", escultura: "var(--disc-escultura)", arquitectura: "var(--disc-arquitectura)" };
const OPCIONS_ARTISTES = [...ARTISTES].sort((a, b) => a.nom.localeCompare(b.nom, "ca"));

export default function TimelineView() {
  const { filtres, setFiltres } = useApp();
  const dades = dadesCronologia(filtres);
  const { files, obres, interval, seleccionats } = dades;
  const [desplega, setDesplega] = useState(false);
  const [obertes, setObertes] = useState<string[]>(() => seleccionats);
  const [obraSeleccionada, setObraSeleccionada] = useState<string | null>(null);
  const [context, setContext] = useState(true);
  const [detallContext, setDetallContext] = useState<number | null>(null);
  const eixRef = useRef<HTMLDivElement>(null);
  const [ampladaEix, setAmpladaEix] = useState(600);
  useEffect(() => {
    const node = eixRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setAmpladaEix(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const nombreArtistes = files.filter((f) => f.artista).length;
  const altresAutories = files.length - nombreArtistes;
  const coincideixen = seleccionats.length > 1 && files.length === seleccionats.length && files.every((f) => f.tipus === "activitat")
    ? [Math.max(interval[0], ...files.map((f) => f.inici)), Math.min(interval[1], ...files.map((f) => f.fi))] : null;
  const recorregut = RECORREGUTS.find((r) => r.vista.id === filtres.vista);
  const canvia = (nous: Partial<FiltresURL>) => {
    setFiltres({ vista: undefined, periode: filtres.periode, ambit: dades.territori, disciplina: dades.disciplina, artistes: seleccionats.join(","), artista: undefined, ...nous });
    if (nous.artistes !== undefined) setObertes(nous.artistes.split(",").filter(Boolean));
    setObraSeleccionada(null); setDetallContext(null);
  };
  const neteja = () => {
    setFiltres({ vista: undefined, periode: undefined, ambit: undefined, disciplina: undefined, artistes: undefined, artista: undefined });
    setObraSeleccionada(null); setDetallContext(null); setObertes([]);
  };
  const anys: number[] = [interval[0]];
  const pasMinim = (interval[1] - interval[0]) / Math.max(2, Math.floor(ampladaEix / 65));
  const pas = [5, 10, 20, 25, 50, 100].find((p) => p >= pasMinim) ?? 100;
  for (let a = Math.ceil((interval[0] + pas * .7) / pas) * pas; a <= interval[1] - pas * .7; a += pas) anys.push(a);
  anys.push(interval[1]);
  const cerca = filtresACerca({ ...filtres, desDe: "cronologia" });

  return <div className="mx-auto max-w-7xl px-4 sm:px-6 py-7 text-tinta">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div><h1 className="font-serif text-3xl sm:text-4xl">Cronologia</h1><p className="mt-2 text-tinta-2">Qui treballava al mateix temps? Situa els artistes i les seves obres en un mateix eix.</p></div>
      <span className="text-sm text-tinta-2">{interval[0]}–{interval[1]}</span>
    </div>
    <section className="mt-5 rounded-xl border border-linia bg-card p-4" aria-label="Filtres de la cronologia">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
        <label className={`${styles.selector} col-span-2 sm:col-span-1`}>Artistes<select value="" onChange={(e) => { if (e.target.value) canvia({ artistes: [...seleccionats, e.target.value].join(",") }); }}>
          <option value="">{seleccionats.length ? "Afegeix un artista per comparar" : "Tots els artistes · tria’n un"}</option>
          {OPCIONS_ARTISTES.filter((a) => !seleccionats.includes(a.slug)).map((a) => <option key={a.slug} value={a.slug}>{a.nom}</option>)}
        </select></label>
        <label className={styles.selector}>Època<select value={filtres.periode || ""} onChange={(e) => canvia({ periode: e.target.value })}>
          <option value="">Tot el Renaixement</option>{Object.entries(EPOQUES).map(([v, e]) => <option key={v} value={v}>{e.nom}</option>)}
        </select></label>
        <label className={styles.selector}>Tipus d’art<select value={dades.disciplina || ""} onChange={(e) => canvia({ disciplina: e.target.value })}>
          <option value="">Tots els tipus d’art</option>{Object.entries(ETIQUETES.disciplina).map(([v, nom]) => <option key={v} value={v}>{nom}</option>)}
        </select></label>
        <label className={styles.selector}>Territori<select value={dades.territori} onChange={(e) => canvia({ ambit: e.target.value })}>
          <option value="">Tots els territoris</option><option value="italia">Itàlia</option><option value="no-italia">Fora d’Itàlia</option>
          {["flandes", "franca", "espanya", "nord", "europa"].includes(dades.territori) && <option value={dades.territori}>{dades.territori}</option>}
        </select></label>
        <button onClick={neteja} className="self-end flex items-center justify-center gap-1.5 rounded-lg border border-linia px-3 py-2.5 text-sm hover:bg-paper-2"><RotateCcw className="size-4" aria-hidden />Restableix</button>
      </div>
      {!!seleccionats.length && <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Artistes seleccionats">
        {seleccionats.map((slug) => <button key={slug} onClick={() => canvia({ artistes: seleccionats.filter((s) => s !== slug).join(",") })} className="inline-flex items-center gap-2 rounded-full bg-paper-2 px-3 py-1.5 text-sm" aria-label={`Treure ${ARTISTES.find((a) => a.slug === slug)?.nom || slug}`}>
          {ARTISTES.find((a) => a.slug === slug)?.nom || slug}<X className="size-3.5" aria-hidden /></button>)}
        <button className="text-sm underline" onClick={() => canvia({ artistes: "" })}>Mostrar tots els artistes</button>
      </div>}
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-linia pt-3 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={desplega} onChange={(e) => setDesplega(e.target.checked)} />Desplega els títols de les obres</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={context} onChange={(e) => setContext(e.target.checked)} />Mostra el context històric</label>
        <span role="status" className="sm:ml-auto text-tinta-2">{nombreArtistes} {nombreArtistes === 1 ? "artista" : "artistes"}{altresAutories ? " + altres autories" : ""} · {obres.length} {obres.length === 1 ? "obra" : "obres"}</span>
      </div>
    </section>
    {recorregut && <aside className="mt-3 rounded-lg bg-paper-2 p-4 text-sm"><h2 className="font-semibold">{recorregut.pregunta}</h2><p className="mt-1">{recorregut.explicacio}</p></aside>}
    <div className="mt-5 mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-tinta-2">
      <span className="font-medium">De més antic a més modern, per inici d’activitat o de vida.</span>
      <span className="flex items-center gap-1.5"><span className={styles.keyActivity} />Activitat</span><span className="flex items-center gap-1.5"><span className={styles.keyLife} />Vida, si no hi ha dates d’activitat</span>
      {Object.entries(COLORS).map(([d, color]) => <span key={d} className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: color }} />{ETIQUETES.disciplina[d as keyof typeof COLORS]}</span>)}
    </div>
    <p className="mb-3 text-sm text-tinta-2">Els números situen les obres: prem-los per veure-les. Desplega un artista amb la fletxa. Els artistes que travessen el 1500 poden aparèixer als dos segles.</p>
    {coincideixen && <p className="mb-3 rounded-lg bg-paper-2 px-4 py-2 text-sm"><strong>{coincideixen[0] <= coincideixen[1] ? `Activitat coincident: ${coincideixen[0]}–${coincideixen[1]}.` : "No hi ha activitat coincident dins d’aquesta franja."}</strong> Compara les obres per veure com responen a problemes semblants.</p>}
    <section className={styles.timeline} aria-label="Eix cronològic d’artistes i obres">
      <div className={styles.axis}><div className={styles.axisLabel}>Artistes / obres</div><div className={styles.axisTrack} ref={eixRef}>
        <div className={styles.periods}>{[[1400, 1500, "Quattrocento"], [1500, 1600, "Cinquecento"]].map(([inici, fi, nom]) => Number(inici) < interval[1] && Number(fi) > interval[0] && <span key={nom} style={posicioInterval(Number(inici), Number(fi), interval)}>{nom}</span>)}</div>
        <div className={styles.ticks}>{anys.map((a, i) => <span key={a} style={{ left: posicioInterval(a, a, interval).left, transform: i === 0 ? "none" : i === anys.length - 1 ? "translateX(-100%)" : "translateX(-50%)" }}>{a}</span>)}</div>
      </div></div>
      {context && <details className={styles.context}><summary>Context històric · {dades.esdeveniments.length} fites de la franja {interval[0]}–{interval[1]}</summary>
        <div className={styles.contextList}>{dades.esdeveniments.map((e, i) => <div key={`${e.anyInici}-${e.titol}`}><button aria-expanded={detallContext === i} onClick={() => setDetallContext(detallContext === i ? null : i)}><strong>{e.precisioData === "aproximada" ? "c. " : ""}{e.anyInici}{e.anyFi ? `–${e.anyFi}` : ""}</strong> {e.titol}</button>
          {detallContext === i && <p className="mt-1 text-sm text-tinta-2">{e.descripcio}<span className="mt-1 block text-xs">Font: {e.fontData}</span></p>}
        </div>)}</div>
      </details>}
      {!files.length && <div className="p-8 text-center"><p>No hi ha resultats amb aquests filtres.</p><p className="mt-1 text-sm text-tinta-2">Treu un artista o amplia l’època, el territori o el tipus d’art.</p><button onClick={neteja} className="mt-3 text-accio underline">Mostrar tot el Renaixement</button></div>}
      {files.map((fila) => <Fila key={fila.slug} fila={fila} interval={interval} anys={anys} separacio={100 * 33 / Math.max(ampladaEix, 100)} expandida={desplega || obertes.includes(fila.slug)}
        toggle={() => { if (desplega) { setDesplega(false); setObertes(files.filter((f) => f.slug !== fila.slug).map((f) => f.slug)); } else setObertes(obertes.includes(fila.slug) ? obertes.filter((s) => s !== fila.slug) : [...obertes, fila.slug]); }}
        seleccionada={obraSeleccionada} selecciona={(slug) => setObraSeleccionada(obraSeleccionada === slug ? null : slug)} cerca={cerca} />)}
    </section>
    <details className="mt-4 rounded-lg border border-linia px-4 py-3 text-sm"><summary className="cursor-pointer font-medium">Comparacions guiades per treballar a classe</summary>
      <div className="mt-3 flex flex-wrap gap-2">{RECORREGUTS.map((r) => <button key={r.id} onClick={() => { neteja(); setFiltres({ vista: r.vista.id }); setDesplega(true); }} className="rounded-lg border border-linia bg-card px-3 py-2 hover:border-accio">{r.pregunta}</button>)}</div>
    </details>
    <aside className="mt-4 rounded-lg bg-paper-2 p-4 text-sm"><h2 className="font-semibold">Llegeix, compara i explica</h2><p className="mt-1">Tria dos artistes. En quins anys coincideix la seva activitat? Situa una obra de cadascun i explica què tenen en comú i què els diferencia.</p>
      <p className="mt-2 text-xs text-tinta-2">Les barres mostren intervals; els punts indiquen anys. «c.» i el contorn discontinu indiquen una datació aproximada. Les dates completes es mantenen encara que la franja només en mostri una part.</p>
    </aside>
  </div>;
}

function Fila({ fila, interval, anys, separacio, expandida, toggle, seleccionada, selecciona, cerca }: {
  fila: FilaCronologia; interval: [number, number]; anys: number[]; separacio: number; expandida: boolean; toggle: () => void; seleccionada: string | null; selecciona: (slug: string) => void; cerca: string;
}) {
  const o = fila.obres.find((w) => w.slug === seleccionada);
  const finals: number[] = [];
  const marcadors = fila.obres.map((w, i) => {
    const x = parseFloat(posicioInterval(w.anyInici, w.anyInici, interval).left);
    let carril = finals.findIndex((fi) => x - fi >= separacio);
    if (carril === -1) carril = finals.length;
    finals[carril] = x;
    return { w, i, x, carril };
  });
  return <article className={styles.artist} data-artista={fila.slug} data-inici={fila.inici}>
    <div className={styles.row}><div className={styles.name}><div className="flex items-start gap-1.5">
      {fila.obres.length > 0 && <button onClick={toggle} aria-label={`Obres de ${fila.nom}`} aria-expanded={expandida} className="shrink-0 rounded p-1 hover:bg-paper-2">{expandida ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}</button>}
      <div>{fila.artista ? <Enllac desti={`artista/${fila.slug}`} className="font-semibold hover:text-accio hover:underline">{fila.nom}</Enllac> : <strong>Altres autories</strong>}<span className="mt-1 block text-xs text-tinta-2">{fila.artista ? `${/act\./.test(fila.artista.dates) ? "Dates conegudes" : "Vida"}: ${fila.artista.dates}` : "Obres sense fitxa d’artista"}</span></div>
    </div></div>
    <div className={styles.track} style={{ minHeight: expandida ? 52 : 62 + Math.max(0, finals.length - 1) * 29 }}><Graella anys={anys} interval={interval} />
      <div className={`${styles.activity} ${fila.tipus === "vida" ? styles.life : ""}`} style={posicioInterval(fila.inici, fila.fi, interval)} />
      <span className={styles.activityDate} style={{ left: `${Math.min(70, Math.max(0, parseFloat(posicioInterval(fila.inici, fila.fi, interval).left)))}%` }}>{fila.tipus === "vida" ? "Vida" : fila.tipus === "obres" ? "Obres" : "Activitat"}: {fila.inici}–{fila.fi}</span>
      {!expandida && marcadors.map(({ w, i, x, carril }) => <button key={w.slug} className={`${styles.marker} ${precisioDeData(w.data) === "aproximada" ? styles.approx : ""}`} style={{ left: `${x}%`, top: 35 + carril * 29, background: COLORS[w.disciplina] }} onClick={() => selecciona(w.slug)} aria-pressed={seleccionada === w.slug} aria-label={`${w.titol}, ${w.data}, ${ETIQUETES.disciplina[w.disciplina]}`} title={`${w.titol} · ${w.data}`}>{i + 1}</button>)}
    </div></div>
    {expandida && fila.obres.map((w) => <div key={w.slug} className={`${styles.row} ${styles.workRow}`}><button className={styles.workName} onClick={() => selecciona(w.slug)} aria-pressed={seleccionada === w.slug}>
      <ImgObra slug={w.slug} alt="" amplada={96} sizes="40px" fit="contain" className="size-10 shrink-0" /><span>{w.titol}<small>{w.data} · {ETIQUETES.disciplina[w.disciplina]}</small></span>
    </button><div className={styles.track}><Graella anys={anys} interval={interval} /><button className={`${styles.workInterval} ${precisioDeData(w.data) === "aproximada" ? styles.approx : ""}`} style={{ ...posicioInterval(w.anyInici, w.anyFi, interval), background: COLORS[w.disciplina], transform: w.anyInici === w.anyFi ? "translateX(-6px)" : "none" }} aria-label={`Veure ${w.titol}, ${w.data}`} onClick={() => selecciona(w.slug)} aria-pressed={seleccionada === w.slug} />{w.anyFi > interval[1] && <span className={styles.continua} title={`Continua fins al ${w.anyFi}`} aria-label={`Continua fins al ${w.anyFi}`}>›</span>}</div></div>)}
    {o && <DetallObra obra={o} cerca={cerca} tanca={() => selecciona(o.slug)} />}
  </article>;
}
function Graella({ anys, interval }: { anys: number[]; interval: [number, number] }) {
  return <div className={styles.grid} aria-hidden>{anys.map((a) => <span key={a} style={{ left: posicioInterval(a, a, interval).left }} />)}</div>;
}
function DetallObra({ obra: o, cerca, tanca }: { obra: Obra; cerca: string; tanca: () => void }) {
  const obreViewer = useApp((s) => s.obreViewer);
  return <div className={styles.detail}><ImgObra slug={o.slug} alt={o.titol} amplada={320} sizes="120px" fit="contain" className="w-24 sm:w-32 h-32 shrink-0" />
    <div className="min-w-0 flex-1"><h3 className="font-serif text-xl">{o.titol}</h3><p className="mt-1 text-sm text-tinta-2">{o.autorNom} · {o.data} · {ETIQUETES.disciplina[o.disciplina]}</p><p className="mt-2 text-sm">{o.relevancia}</p>
      {o.fontData && <p className="mt-2 text-xs text-tinta-2">Datació: {o.fontData}</p>}<div className="mt-3 flex flex-wrap gap-4 text-sm"><Enllac desti={`obra/${o.slug}?${cerca}`} className="text-accio underline">Veure la fitxa</Enllac><button onClick={() => obreViewer(o.slug)} className="inline-flex items-center gap-1 text-accio underline"><ZoomIn className="size-4" aria-hidden />Ampliar la imatge</button></div>
    </div><button onClick={tanca} aria-label="Tancar el detall de l’obra" className="self-start rounded p-1 hover:bg-paper-2"><X className="size-5" /></button>
  </div>;
}
