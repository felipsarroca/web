"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

type Region = "Astúries" | "Navarra";
type Tab = "Resum" | "Explora" | "Mapa" | "Clústers" | "Planificador";
type Activity = {
  id: string; region: Region; block: string; name: string; drive: string; minutes: number;
  duration: string; type: string; appeal: string; appealShort: string; cost: string;
  practicalNotes: string; officialUrl: string | null; latitude: number | null; longitude: number | null;
  locationPrecision: "geocodificada" | "clúster aproximat" | null;
  role: "àncora" | "complement"; setting: string; weather: string[]; bookingRecommended: boolean;
  picnicFriendly: boolean; familyNote: string;
};

const maximumDriveMinutes = (drive: string) => Math.max(...(drive.match(/\d+/g) ?? ["0"]).map(Number));
type Catalog = { verifiedAt: string; activities: Activity[] };

const ActivityMap = dynamic(() => import("./ActivityMap"), { ssr: false });
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const regionMeta = {
  Astúries: { base: "Fuente Aldea", count: 88, clusters: 13, hero: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=82" },
  Navarra: { base: "Azpilkueta", count: 72, clusters: 11, hero: "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1800&q=82" },
};

const clusterData = {
  Astúries: [
    ["A1", "Villaviciosa i Amandi", "0–15 min", 26, "Vila, patrimoni, granja i ria"], ["A2", "Ria, Rodiles i Tazones", "20–30 min", 4, "Costa, platja i poble mariner"],
    ["A3", "Valdediós, Cabranes, Nava i Siero", "20–45 min", 8, "Patrimoni, sidra i activitats"], ["A4", "Colunga, MUJA, La Griega i Lastres", "25–38 min", 5, "Dinosaures, petjades i costa"],
    ["A5", "Caravia, La Isla, Espasa i el Sueve", "35–55 min", 4, "Platges, miradors i muntanya"], ["A6", "Gijón est: Botànic i cultura", "30–45 min", 5, "Jardí, cultura i ciutat"],
    ["A7", "Gijón oest, centre i platges", "35–48 min", 8, "Aquari, museus i mar"], ["A8", "Piloña i Infiesto", "35–55 min", 3, "Natura i passejos"],
    ["A9", "Ribadesella i Arriondas", "45–60 min", 8, "Coves, mar i riu"], ["A10", "Cangas i vall baixa de Covadonga", "50–60 min", 2, "Mercat i porta dels Picos"],
    ["A11", "Oviedo i preromànic", "45–58 min", 6, "Art, història i parcs"], ["A12", "Conques mineres", "45–60 min", 6, "Tren i patrimoni miner"],
    ["A13", "Avilés, Luanco i costa central", "55–60 min", 3, "Viles marineres i patrimoni"],
  ],
  Navarra: [
    ["N1", "Azpilkueta, Arizkun i Amaiur", "0–18 min", 6, "Pobles i Santxotena"], ["N2", "Elizondo i Baztan central", "12–30 min", 24, "Pobles, riu i aventures"],
    ["N3", "Erratzu i Xorroxin", "18–30 min", 3, "Cascada i passeig"], ["N4", "Urdax, Zugarramurdi i Trikuharri", "20–38 min", 5, "Coves, llegendes i animals"],
    ["N5", "Bertiz, Oieregi i Doneztebe", "25–42 min", 11, "Jardí i bosc"], ["N6", "Etxalar, Lesaka i Igantzi", "38–58 min", 7, "Pobles i Irrisarri Land"],
    ["N7", "Sare i Xareta francesa", "35–60 min", 5, "Coves, animals i gastronomia"], ["N8", "Saint-Pée i Souraïde", "45–60 min", 2, "Llac i parc de jocs"],
    ["N9", "Ultzama: granja, bosc i mel", "50–60 min", 3, "Granja Escola + Orgi"], ["N10", "Costa del Bidasoa", "55–60 min", 4, "Hondarribia"],
    ["N11", "Malerreka i Leurtza", "45–60 min", 2, "Embassaments i natura"],
  ],
};

const highlightedNames: Record<Region, string[]> = {
  Astúries: ["MUJA", "Ecomuseu Miner", "Platja de Rodiles"],
  Navarra: ["Parc-Museu Santxotena", "Señorío de Bertiz", "Coves d’Urdax"],
};

const realImages = [
  { match: /MUJA/i, src: `${basePath}/images/muja.jpg`, alt: "Museu del Juràssic d’Astúries", credit: "D. Rovchak · CC · Commons", href: "https://commons.wikimedia.org/wiki/File:MUJA_Museo.jpg" },
  { match: /Rodiles/i, src: `${basePath}/images/rodiles.jpg`, alt: "Platja de Rodiles", credit: "Adolfobrigido · CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Playa_de_Rodiles.jpg" },
  { match: /Bertiz/i, src: `${basePath}/images/bertiz.jpg`, alt: "Bosc del Senyoriu de Bertiz", credit: "Olisacu · CC · Commons", href: "https://commons.wikimedia.org/wiki/File:Bosque_del_Se%C3%B1or%C3%ADo_de_Bertiz.jpg" },
  { match: /Urdax|Ikaburu/i, src: `${basePath}/images/urdax.jpg`, alt: "Cova d’Ikaburu a Urdax", credit: "Javier Martinlo · CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:CuevaIkaburuUrdax.jpg" },
];

const fallbackImages: Record<string, string> = {
  Animals: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=78",
  Platja: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=78",
  "Natura/ruta": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=78",
  Visita: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=800&q=78",
  "Poble/cultura": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=78",
  Parc: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=78",
};

function imageFor(activity: Activity) {
  return realImages.find((image) => image.match.test(activity.name)) ?? { src: fallbackImages[activity.type] ?? fallbackImages.Visita, alt: "Imatge d’ambient", credit: "Imatge d’ambient · Unsplash", href: null };
}

export default function Home() {
  const [region, setRegion] = useState<Region>("Astúries");
  const [tab, setTab] = useState<Tab>("Resum");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [query, setQuery] = useState("");
  const [drive, setDrive] = useState("60");
  const [kind, setKind] = useState("Tots");
  const [weather, setWeather] = useState("Qualsevol");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Activity | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [anchorId, setAnchorId] = useState<string | null>(null);
  const [mapSavedOnly, setMapSavedOnly] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const perPage = 9;

  useEffect(() => {
    fetch(`${basePath}/data/activities.json`).then((response) => response.json()).then((catalog: Catalog) => setActivities(catalog.activities));
    const stored = localStorage.getItem("asturies-navarra-plan");
    if (stored) try { setSaved(JSON.parse(stored)); } catch { /* dada local invàlida */ }
    setAnchorId(localStorage.getItem("asturies-navarra-anchor"));
  }, []);
  useEffect(() => { localStorage.setItem("asturies-navarra-plan", JSON.stringify(saved)); }, [saved]);
  useEffect(() => { if (anchorId) localStorage.setItem("asturies-navarra-anchor", anchorId); else localStorage.removeItem("asturies-navarra-anchor"); }, [anchorId]);
  useEffect(() => {
    if (selected) closeButton.current?.focus();
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected]);

  const types = useMemo(() => ["Tots", ...Array.from(new Set(activities.filter((item) => item.region === region).map((item) => item.type))).sort()], [activities, region]);
  const filtered = useMemo(() => activities.filter((item) => item.region === region && item.minutes <= Number(drive) && (kind === "Tots" || item.type === kind) && (!query || `${item.name} ${item.appeal} ${item.block}`.toLowerCase().includes(query.toLowerCase())) && (weather === "Qualsevol" || item.weather.includes(weather.toLowerCase()))), [activities, region, drive, kind, query, weather]);
  const shown = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const meta = regionMeta[region];
  const featured = highlightedNames[region].map((name) => activities.find((item) => item.region === region && item.name.toLowerCase().includes(name.toLowerCase()))).filter(Boolean) as Activity[];
  const savedActivities = saved.map((id) => activities.find((item) => item.id === id)).filter(Boolean) as Activity[];
  const savedBlocks = new Set(savedActivities.map((item) => item.block));

  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const moveSaved = (index: number, direction: -1 | 1) => setSaved((current) => { const next = [...current]; const target = index + direction; if (target < 0 || target >= next.length) return current; [next[index], next[target]] = [next[target], next[index]]; return next; });
  const changeRegion = (next: Region) => { setRegion(next); setQuery(""); setKind("Tots"); setPage(1); };
  const openCluster = (code: string) => { setKind("Tots"); setQuery(code); setPage(1); setTab("Explora"); };

  return <main className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setTab("Resum")}><img src={`${basePath}/favicon.svg`} alt="" aria-hidden="true"/> <span className="brand-title">Astúries i Navarra <small>en família 2026</small></span></button>
      <nav aria-label="Navegació principal">{(["Resum", "Explora", "Mapa", "Clústers", "Planificador"] as Tab[]).map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}{item === "Planificador" && saved.length > 0 ? <b>{saved.length}</b> : null}</button>)}</nav>
      <div className="region-switch" aria-label="Destinació"><button className={region === "Astúries" ? "active" : ""} onClick={() => changeRegion("Astúries")}>Astúries</button><button className={region === "Navarra" ? "active" : ""} onClick={() => changeRegion("Navarra")}>Navarra</button></div>
    </header>

    {tab === "Resum" && <>
      <section className="hero"><div className="hero-copy"><p className="eyebrow">IDEES PER AVUI · BASE A {meta.base.toUpperCase()}</p><h1>Què fem avui?</h1><p>Tria una activitat àncora i afegeix només un complement proper si encara queda energia.</p><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") setTab("Explora"); }} placeholder="Busca un lloc, una activitat o una zona…"/><button onClick={() => setTab("Explora")}>Explora</button></label></div><div className="hero-image" style={{ backgroundImage: `linear-gradient(90deg,rgba(20,49,40,.08),rgba(20,49,40,.02)),url('${meta.hero}')` }}><span>Nord atlàntic · imatge d’ambient</span></div></section>
      <aside className="downloads" aria-label="Descarrega les guies definitives"><span>Guies completes en PDF</span><div className="download-actions"><a href={`${basePath}/documents/guia-asturies-2026.pdf`} download>↓ Astúries <small>2,4 MB</small></a><a href={`${basePath}/documents/guia-navarra-2026.pdf`} download>↓ Navarra <small>2,0 MB</small></a></div></aside>
      <section className="recommend"><div className="section-title"><div><p className="eyebrow">SELECCIÓ EDITORIAL</p><h2>Tres bons punts de partida</h2></div><button onClick={() => setTab("Explora")}>Veure les {meta.count} propostes</button></div><div className="feature-grid">{featured.map((activity, index) => { const image = imageFor(activity); return <article onClick={() => setSelected(activity)} key={activity.id} className="feature-card"><div className="place-art"><img src={image.src} alt={image.alt}/><span>{index === 0 ? "ÀNCORA" : "RECOMANADA"}</span>{image.href ? <a className="image-credit" href={image.href} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>{image.credit}</a> : <small>{image.credit}</small>}</div><div className="feature-body"><p>{activity.block}</p><h3>{activity.name}</h3><div className="facts"><span>⌖ {activity.drive}</span><span>◷ {activity.duration}</span></div><p>{activity.appeal}</p></div></article>; })}</div></section>
    </>}

    {tab === "Explora" && <section className="workspace explore-workspace"><div className="workspace-head"><div><p className="eyebrow">CATÀLEG COMPLET · {region.toUpperCase()}</p><h1>Explora al teu ritme</h1><p>Informació resumida de les guies definitives, ordenada per proximitat.</p></div><div className="result-count"><strong>{filtered.length}</strong><span>resultats</span></div></div><div className="filters"><label className="wide">⌕<input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Cerca per nom, atractiu o bloc…"/></label><label>🚗<select value={drive} onChange={(event) => { setDrive(event.target.value); setPage(1); }} aria-label="Temps màxim de conducció"><option value="15">Fins a 15 min</option><option value="30">Fins a 30 min</option><option value="45">Fins a 45 min</option><option value="60">Fins a 60 min</option><option value="70">Incloure el límit</option></select></label><label>⌁<select value={kind} onChange={(event) => { setKind(event.target.value); setPage(1); }} aria-label="Tipus d’activitat">{types.map((type) => <option key={type}>{type}</option>)}</select></label><label>☁<select value={weather} onChange={(event) => { setWeather(event.target.value); setPage(1); }} aria-label="Meteorologia"><option>Qualsevol</option><option>Pluja</option><option>Calor</option></select></label><button className="clear" onClick={() => { setQuery(""); setDrive("60"); setKind("Tots"); setWeather("Qualsevol"); setPage(1); }}>Neteja</button></div><div className="catalog">{shown.map((activity) => { const image = imageFor(activity); return <article className="activity-card" key={activity.id} onClick={() => setSelected(activity)}><div className="activity-photo"><img src={image.src} alt=""/><span aria-hidden="true">{activity.type === "Animals" ? "♞" : activity.type === "Platja" ? "≈" : "✦"}</span></div><div className="activity-main"><div><span className="block-tag">{activity.block}</span><span className="type-tag">{activity.type}</span></div><h3>{activity.name}</h3><p>{activity.appeal}</p><div className="facts"><span>🚗 {activity.drive}</span><span>◷ {activity.duration}</span></div></div><button onClick={(event) => { event.stopPropagation(); toggleSaved(activity.id); }} aria-label={saved.includes(activity.id) ? `Retira ${activity.name} del pla` : `Desa ${activity.name} al pla`}>{saved.includes(activity.id) ? "★" : "☆"}</button></article>; })}</div><div className="pagination"><button disabled={page === 1} onClick={() => setPage((current) => current - 1)}>← Anterior</button><span>{page} / {totalPages}</span><button disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>Següent →</button></div></section>}

    {tab === "Mapa" && <section className="workspace map-workspace"><div className="workspace-head"><div><p className="eyebrow">MAPA D’INDRETS · {region.toUpperCase()}</p><h1>Descobreix què teniu a prop</h1><p>Obre qualsevol punt per consultar la fitxa. Confirma sempre l’accés final i l’aparcament.</p></div><div className="map-actions"><label><input type="checkbox" checked={mapSavedOnly} onChange={(event) => setMapSavedOnly(event.target.checked)}/> Només el meu pla</label><button className="primary" onClick={() => setTab("Explora")}>Veure el catàleg</button></div></div><ActivityMap activities={activities.filter((item) => item.region === region && (!mapSavedOnly || saved.includes(item.id)))} region={region} onSelect={(id) => { const activity = activities.find((item) => item.id === id); if (activity) setSelected(activity); }}/><aside className="map-note"><strong>Sobre el mapa</strong><p>Cartografia d’OpenStreetMap. La web no geocodifica ni descarrega mapes en segon pla.</p><a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener noreferrer">Comunica un error del mapa</a></aside></section>}

    {tab === "Clústers" && <section className="workspace cluster-workspace"><div className="workspace-head"><div><p className="eyebrow">PROXIMITAT DES DE {meta.base.toUpperCase()}</p><h1>Què queda més a prop?</h1><p>Els blocs estan ordenats per temps de trajecte. La barra compara el límit superior estimat de cada desplaçament.</p></div></div><div className="cluster-base"><span>Base</span><strong>{meta.base}</strong><small>Temps orientatius en cotxe</small></div><div className="cluster-scale" aria-hidden="true"><span>0 min</span><span>30 min</span><span>60 min</span></div><div className="cluster-cards">{clusterData[region].map((cluster) => { const maxMinutes = maximumDriveMinutes(cluster[2]); return <button key={cluster[0]} onClick={() => openCluster(cluster[0])} className="cluster-card"><span className="cluster-code">{cluster[0]}</span><span className="cluster-content"><span className="cluster-heading"><b>{cluster[1]}</b><strong>{cluster[2]}</strong></span><span className="cluster-track"><i style={{ width: `${Math.min(100, maxMinutes / 60 * 100)}%` }} /></span><span className="cluster-meta"><em>{cluster[4]}</em><small>{cluster[3]} {cluster[3] === 1 ? "proposta" : "propostes"}</small></span></span><span className="cluster-arrow" aria-hidden="true">→</span></button>; })}</div></section>}

    {tab === "Planificador" && <section className="workspace planner"><div className="workspace-head"><div><p className="eyebrow">PLA FAMILIAR PERSISTENT</p><h1>Una àncora, un complement</h1><p>Ordena el dia, marca l’activitat principal i prioritza un sol clúster.</p></div><button className="primary" onClick={() => setTab("Explora")}>+ Afegir activitats</button></div>{savedBlocks.size > 1 && <div className="plan-warning"><b>Atenció: heu barrejat {savedBlocks.size} clústers.</b><span>Comproveu el temps total de carretera abans de considerar-ho un únic dia.</span></div>}{savedActivities.length === 0 ? <div className="empty-plan"><strong>Encara no hi ha activitats desades</strong><p>Prem l’estrella d’una proposta per afegir-la aquí.</p><button onClick={() => setTab("Explora")}>Explora activitats</button></div> : <div className="saved-list"><h2>El vostre pla provisional</h2>{savedActivities.map((activity, index) => <article className={anchorId === activity.id ? "is-anchor" : ""} key={activity.id}><span className="plan-order">{String(index + 1).padStart(2, "0")}</span><div><span>{activity.block} · {activity.drive}</span><h3>{activity.name}</h3><p>{activity.duration} · {activity.type}{anchorId === activity.id ? " · ÀNCORA" : ""}</p></div><div className="plan-controls"><button onClick={() => setAnchorId(anchorId === activity.id ? null : activity.id)}>{anchorId === activity.id ? "Desmarca àncora" : "Fes-la àncora"}</button><button disabled={index === 0} onClick={() => moveSaved(index, -1)} aria-label={`Puja ${activity.name}`}>↑</button><button disabled={index === savedActivities.length - 1} onClick={() => moveSaved(index, 1)} aria-label={`Baixa ${activity.name}`}>↓</button><button onClick={() => toggleSaved(activity.id)}>Retira</button></div></article>)}</div>}<aside className="specials"><h2>Regla pràctica</h2><div><article><b>1. Trieu l’àncora</b><p>La visita que justifica el desplaçament i pot ocupar mig dia.</p></article><article><b>2. Mireu el temps real</b><p>Canvieu de clúster si el navegador supera una hora.</p></article><article><b>3. Afegiu un complement</b><p>Només si queda energia i és realment a prop.</p></article></div></aside></section>}

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><aside className="detail" role="dialog" aria-modal="true" aria-labelledby="activity-title" onClick={(event) => event.stopPropagation()}><button ref={closeButton} className="close" onClick={() => setSelected(null)} aria-label="Tanca la fitxa">×</button><p className="eyebrow">{selected.block} · {selected.region.toUpperCase()}</p><h2 id="activity-title">{selected.name}</h2><div className="detail-facts"><span>🚗<b>{selected.drive}</b></span><span>◷<b>{selected.duration}</b></span><span>✦<b>{selected.type}</b></span></div><h3>Per què val la pena</h3><p>{selected.appeal}</p><h3>Cost orientatiu</h3><p>{selected.cost}</p>{selected.practicalNotes && <><h3>Informació pràctica</h3><p>{selected.practicalNotes}</p></>}<a className="osm-link" href={selected.latitude ? `https://www.openstreetmap.org/?mlat=${selected.latitude}&mlon=${selected.longitude}#map=16/${selected.latitude}/${selected.longitude}` : `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${selected.name}, ${selected.region}`)}`} target="_blank" rel="noopener noreferrer">⌖ {selected.latitude ? "Obre la ubicació" : "Cerca l’indret"} a OpenStreetMap</a><div className="notice"><b>Abans de sortir</b><p>Comprova horari, reserva, meteorologia i temps de conducció real. Informació verificada el 15 de juliol de 2026.</p></div><button className="primary" onClick={() => toggleSaved(selected.id)}>{saved.includes(selected.id) ? "★ Retira del pla" : "☆ Afegeix al pla"}</button></aside></div>}

    <footer className="felip-app-footer"><a className="felip-license-image-link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer" aria-label="Llicència Creative Commons BY-NC-SA 4.0"><img className="felip-license-image" src={`${basePath}/CC_BY-NC-SA.png`} alt="Creative Commons BY-NC-SA"/></a><div className="felip-footer-text"><p>Aplicació creada per <a href="https://ja.cat/felipsarroca" target="_blank" rel="noopener noreferrer">Felip Sarroca</a> amb assistència de la IA</p><p>Obra sota llicència <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a></p></div></footer>
  </main>;
}
