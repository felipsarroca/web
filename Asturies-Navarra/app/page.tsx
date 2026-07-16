"use client";

import { useEffect, useMemo, useState } from "react";

type Region = "Astúries" | "Navarra";
type Activity = { id:string; region:Region; block:string; name:string; drive:string; minutes:number; duration:string; type:string; appeal:string; cost:string; };

const regionMeta = {
  "Astúries": { base:"Fuente Aldea", count:88, clusters:13, color:"#176b87", hero:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=82" },
  "Navarra": { base:"Azpilkueta", count:72, clusters:11, color:"#b85c3d", hero:"https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1800&q=82" },
};

const clusterData = {
  "Astúries": [
    ["A1","Villaviciosa i Amandi","0–15 min",26,"Vila, patrimoni, granja i ria"], ["A2","Ria, Rodiles i Tazones","20–30 min",4,"Costa, platja i poble mariner"],
    ["A3","Valdediós, Cabranes, Nava i Siero","20–45 min",8,"Patrimoni, sidra i activitats"], ["A4","Colunga, MUJA, La Griega i Lastres","25–38 min",5,"Dinosaures, petjades i costa"],
    ["A5","Caravia, La Isla, Espasa i el Sueve","35–55 min",4,"Platges, miradors i muntanya"], ["A6","Gijón est: Botànic i cultura","30–45 min",5,"Jardí, cultura i ciutat"],
    ["A7","Gijón oest, centre i platges","35–48 min",8,"Aquari, museus i mar"], ["A8","Piloña i Infiesto","35–55 min",3,"Natura i passejos"],
    ["A9","Ribadesella i Arriondas","45–60 min",8,"Coves, mar i riu"], ["A10","Cangas i vall baixa de Covadonga","50–60 min",2,"Mercat i porta dels Picos"],
    ["A11","Oviedo i preromànic","45–58 min",6,"Art, història i parcs"], ["A12","Conques mineres","45–60 min",6,"Tren i patrimoni miner"],
    ["A13","Avilés, Luanco i costa central","55–60 min",3,"Viles marineres i patrimoni"],
  ],
  "Navarra": [
    ["N1","Azpilkueta, Arizkun i Amaiur","0–18 min",6,"Pobles i Santxotena"], ["N2","Elizondo i Baztan central","12–30 min",24,"Pobles, riu i aventures"],
    ["N3","Erratzu i Xorroxin","18–30 min",3,"Cascada i passeig"], ["N4","Urdax, Zugarramurdi i Trikuharri","20–38 min",5,"Coves, llegendes i animals"],
    ["N5","Bertiz, Oieregi i Doneztebe","25–42 min",11,"Jardí i bosc"], ["N6","Etxalar, Lesaka i Igantzi","38–58 min",7,"Pobles i Irrisarri Land"],
    ["N7","Sare i Xareta francesa","35–60 min",5,"Coves, animals i gastronomia"], ["N8","Saint-Pée i Souraïde","45–60 min",2,"Llac i parc de jocs"],
    ["N9","Ultzama: granja, bosc i mel","50–60 min",3,"Granja Escola + Orgi"], ["N10","Costa del Bidasoa","55–60 min",4,"Hondarribia"],
    ["N11","Malerreka i Leurtza","45–60 min",2,"Embassaments i natura"],
  ],
} as const;

const highlights: Record<Region,string[]> = {
  "Astúries":["MUJA · Museu del Juràssic","Ecomuseu Miner de la Vall de Samuño","Platja de Rodiles","Los Caserinos · granja i formatgeria","Museu de la Mineria MUMI","Tito Bustillo"],
  "Navarra":["Parc-Museu Santxotena","Señorío de Bertiz · Jardí Històric","Trikuharri Natural Center / Fauna Halcón","Granja Escola Ultzama","Coves d’Urdax / Ikaburu","Amaiur/Maya · poble i castell"],
};

function parseMinutes(s:string){ const m=[...s.matchAll(/(\d+)/g)].map(x=>+x[1]); return m.length?Math.min(...m):60; }
function parseTable(raw:string, region:Region):Activity[]{
  const prefix=region==="Astúries"?"A":"N"; const start=raw.indexOf("Taula mestra de totes les activitats"); const end=raw.indexOf("Fitxes",start);
  const lines=raw.slice(start,end>start?end:undefined).split(/\r?\n/).map(x=>x.trim()).filter(Boolean); const out:Activity[]=[];
  for(let i=0;i<lines.length;i++) if(new RegExp(`^${prefix}\\d+$`).test(lines[i])){
    const [block,name,drive,duration,type,appeal,cost]=lines.slice(i,i+7); if(name && drive && duration) out.push({id:`${region}-${out.length}`,region,block,name,drive,minutes:parseMinutes(drive),duration,type,appeal,cost}); i+=7;
  }
  return out;
}

const icons:Record<string,string>={"Animals":"♞","Platja":"≈","Natura/ruta":"⌁","Visita":"◇","Poble/cultura":"⌂","Parc":"♧"};
const photoPool={
  dinosaur:"https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=700&q=78",
  mine:"https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=700&q=78",
  beach:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=78",
  forest:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=78",
  animals:"https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=700&q=78",
  cave:"https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=700&q=78",
  village:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=78",
  museum:"https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=700&q=78",
  food:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=78",
  adventure:"https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=700&q=78",
};
function imageFor(a:Activity){const t=(a.name+" "+a.appeal+" "+a.type).toLowerCase();if(/jurà|dinosa|muja|petjad/.test(t))return photoPool.dinosaur;if(/min[ae]|pou|sotón|samuño|mumi|carbó/.test(t))return photoPool.mine;if(/animal|granja|fauna|halcón|ocell|formatgeria/.test(t))return photoPool.animals;if(/cova|cueva|caverna|gruta|tito bustillo|urdax|zugarramurdi/.test(t))return photoPool.cave;if(/platja|mar|costa|ria|arenal|llac|embassament/.test(t))return photoPool.beach;if(/bosc|sender|ruta|cascada|natura|parc natural|fitu/.test(t))return photoPool.forest;if(/sidra|tast|formatge|mel|talo|pastís|gastronom/.test(t))return photoPool.food;if(/aventura|tirolina|caiac|surf|descens|bicicleta/.test(t))return photoPool.adventure;if(/museu|centre d.interpretació|exposició|aquari/.test(t))return photoPool.museum;return photoPool.village}

export default function Home(){
  const [region,setRegion]=useState<Region>("Astúries"); const [tab,setTab]=useState("Resum"); const [activities,setActivities]=useState<Activity[]>([]);
  const [query,setQuery]=useState(""); const [drive,setDrive]=useState("60"); const [kind,setKind]=useState("Tots"); const [weather,setWeather]=useState("Qualsevol");
  const [page,setPage]=useState(1); const [selected,setSelected]=useState<Activity|null>(null); const [saved,setSaved]=useState<string[]>([]); const perPage=9;
  useEffect(()=>{ const basePath=process.env.NEXT_PUBLIC_BASE_PATH??""; Promise.all([fetch(`${basePath}/data/asturies.txt`).then(r=>r.text()),fetch(`${basePath}/data/navarra.txt`).then(r=>r.text())]).then(([a,n])=>setActivities([...parseTable(a,"Astúries"),...parseTable(n,"Navarra")])); },[]);
  const types=useMemo(()=>["Tots",...Array.from(new Set(activities.filter(a=>a.region===region).map(a=>a.type))).sort()], [activities,region]);
  const filtered=useMemo(()=>activities.filter(a=>a.region===region && a.minutes<=+drive && (kind==="Tots"||a.type===kind) && (!query||`${a.name} ${a.appeal} ${a.block}`.toLowerCase().includes(query.toLowerCase())) && (weather==="Qualsevol" || (weather==="Pluja" ? /museu|visita|cova|celler|aquari|centre/i.test(a.name+" "+a.appeal) : weather==="Calor" ? /platja|cova|bosc|riu|llac/i.test(a.name+" "+a.appeal) : true))),[activities,region,query,drive,kind,weather]);
  const shown=filtered.slice((page-1)*perPage,page*perPage); const totalPages=Math.max(1,Math.ceil(filtered.length/perPage)); const meta=regionMeta[region];
  const choose=(name:string)=>activities.find(a=>a.region===region&&a.name.toLowerCase().includes(name.toLowerCase().split(" · ")[0])) || activities.find(a=>a.region===region);
  return <main className="app-shell">
    <header className="topbar"><button className="brand" onClick={()=>setTab("Resum")}>Astúries i Navarra <span>en família 2026</span></button><nav>{["Resum","Explora","Clústers","Planificador"].map(x=><button className={tab===x?"active":""} onClick={()=>setTab(x)} key={x}>{x}{x==="Planificador"&&saved.length>0?<b>{saved.length}</b>:null}</button>)}</nav><div className="region-switch"><button className={region==="Astúries"?"active":""} onClick={()=>{setRegion("Astúries");setQuery("");setKind("Tots");setPage(1)}}>Astúries</button><button className={region==="Navarra"?"active":""} onClick={()=>{setRegion("Navarra");setQuery("");setKind("Tots");setPage(1)}}>Navarra</button></div></header>

    {tab==="Resum"&&<><section className="hero"><div className="hero-copy"><p className="eyebrow">IDEES PER AVUI · BASE A {meta.base.toUpperCase()}</p><h1>Què fem avui?</h1><p>Tria una activitat àncora i afegeix només un complement proper si encara queda energia.</p><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")setTab("Explora")}} placeholder="Busca un lloc, una activitat o una zona…"/><button onClick={()=>setTab("Explora")}>Explora</button></label></div><div className="hero-image" style={{backgroundImage:`linear-gradient(90deg,rgba(20,49,40,.08),rgba(20,49,40,.02)),url('${meta.hero}')`}}><span>Nord atlàntic · imatge d’ambient</span></div></section>
    <section className="quick"><div><strong>{meta.count}</strong><span>propostes</span></div><div><strong>{meta.clusters}</strong><span>blocs de proximitat</span></div><div><strong>≤ 60′</strong><span>radi recomanat</span></div><button onClick={()=>setTab("Clústers")}>Veure el mapa de clústers →</button></section>
    <section className="recommend"><div className="section-title"><div><p className="eyebrow">SELECCIÓ EDITORIAL</p><h2>Tres bons punts de partida</h2></div><button onClick={()=>setTab("Explora")}>Veure les {meta.count} propostes</button></div><div className="feature-grid">{highlights[region].slice(0,3).map((h,i)=>{const a=choose(h);return <article onClick={()=>a&&setSelected(a)} key={h} className="feature-card"><div className={`place-art art-${region==="Astúries"?i:i+3}`}><span>{i===0?"ÀNCORA":"RECOMANADA"}</span></div><div className="feature-body"><p>{a?.block}</p><h3>{h}</h3><div className="facts"><span>⌖ {a?.drive||"A prop"}</span><span>◷ {a?.duration||"Mig dia"}</span></div><p>{a?.appeal}</p></div></article>})}</div></section></>}

    {tab==="Explora"&&<section className="workspace explore-workspace"><div className="workspace-head"><div><p className="eyebrow">CATÀLEG COMPLET · {region.toUpperCase()}</p><h1>Explora al teu ritme</h1><p>{meta.count} idees ordenades per proximitat.</p></div><div className="result-count"><strong>{filtered.length}</strong><span>resultats</span></div></div><div className="filters"><label className="wide">⌕<input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Cerca per nom, atractiu o bloc…"/></label><label>🚗<select value={drive} onChange={e=>{setDrive(e.target.value);setPage(1)}}><option value="15">Fins a 15 min</option><option value="30">Fins a 30 min</option><option value="45">Fins a 45 min</option><option value="60">Fins a 60 min</option><option value="70">Incloure límit</option></select></label><label>⌁<select value={kind} onChange={e=>{setKind(e.target.value);setPage(1)}}>{types.map(t=><option key={t}>{t}</option>)}</select></label><label>☁<select value={weather} onChange={e=>{setWeather(e.target.value);setPage(1)}}><option>Qualsevol</option><option>Pluja</option><option>Calor</option></select></label><button className="clear" onClick={()=>{setQuery("");setDrive("60");setKind("Tots");setWeather("Qualsevol");setPage(1)}}>Neteja</button></div><div className="catalog">{shown.map(a=><article className="activity-card" key={a.id} onClick={()=>setSelected(a)}><div className="activity-photo" style={{backgroundImage:`url('${imageFor(a)}')`}}><span>{icons[a.type]||"✦"}</span></div><div className="activity-main"><div><span className="block-tag">{a.block}</span><span className="type-tag">{a.type}</span></div><h3>{a.name}</h3><p>{a.appeal}</p><div className="facts"><span>🚗 {a.drive}</span><span>◷ {a.duration}</span></div></div><button onClick={e=>{e.stopPropagation();setSaved(s=>s.includes(a.id)?s.filter(x=>x!==a.id):[...s,a.id])}} aria-label="Desa al pla">{saved.includes(a.id)?"★":"☆"}</button></article>)}</div><div className="pagination"><button disabled={page===1} onClick={()=>setPage(p=>p-1)}>← Anterior</button><span>{page} / {totalPages}</span><button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Següent →</button></div></section>}

    {tab==="Clústers"&&<section className="workspace cluster-workspace"><div className="workspace-head"><div><p className="eyebrow">PROXIMITAT DES DE {meta.base.toUpperCase()}</p><h1>Combina sense fer quilòmetres de més</h1><p>Clica un bloc per veure totes les activitats que conté.</p></div><div className="legend"><span><i></i> base</span><span><i></i> clúster</span></div></div><div className="cluster-layout"><div className={`cluster-map ${region==="Navarra"?"navarra":""}`}><div className="rings"><i></i><i></i><i></i></div><div className="base-node"><b>{meta.base}</b><span>BASE</span></div>{clusterData[region].map((c,i)=><button key={c[0]} className="cluster-node" style={{"--x":`${14+(i*23)%76}%`,"--y":`${15+(i*37)%72}%`,"--size":`${34+Math.min(c[3],12)}px`} as React.CSSProperties} onClick={()=>{setKind("Tots");setQuery(c[0]);setTab("Explora")}}><b>{c[0]}</b><span>{c[3]}</span></button>)}</div><div className="cluster-list">{clusterData[region].map(c=><button key={c[0]} onClick={()=>{setQuery(c[0]);setTab("Explora")}}><span className="cluster-code">{c[0]}</span><span><b>{c[1]}</b><small>{c[2]} · {c[3]} idees</small><em>{c[4]}</em></span><strong>→</strong></button>)}</div></div></section>}

    {tab==="Planificador"&&<section className="workspace planner"><div className="workspace-head"><div><p className="eyebrow">PLA FAMILIAR FLEXIBLE</p><h1>Una àncora, un complement</h1><p>Les vacances funcionen millor quan el pla deixa espai per improvisar.</p></div><button className="primary" onClick={()=>setTab("Explora")}>+ Afegir activitats</button></div><div className="decision-grid"><article><span>01</span><h3>Comproveu el temps real</h3><p>Els minuts són orientatius. Si el navegador supera una hora, canvieu de clúster.</p></article><article><span>02</span><h3>Reserveu només l’àncora</h3><p>La resta són opcions properes, no obligacions.</p></article><article><span>03</span><h3>Adapteu-vos a l’energia</h3><p>Baixa: 60–90 min. Mitjana: àncora + complement. Alta: dues activitats.</p></article></div>{saved.length===0?<div className="empty-plan"><strong>Encara no hi ha activitats desades</strong><p>Prem l’estrella d’una proposta per afegir-la aquí.</p><button onClick={()=>setTab("Explora")}>Explora activitats</button></div>:<div className="saved-list"><h2>El vostre pla provisional</h2>{saved.map(id=>activities.find(a=>a.id===id)).filter(Boolean).map(a=><article key={a!.id}><div><span>{a!.block} · {a!.drive}</span><h3>{a!.name}</h3><p>{a!.duration} · {a!.type}</p></div><button onClick={()=>setSaved(s=>s.filter(x=>x!==a!.id))}>Retira</button></article>)}</div>}<aside className="specials"><h2>Especials que no convé perdre de vista</h2><div><article><b>⛏ Astúries minera</b><p>MUMI: la més fàcil amb els cinc. Samuño: tren real i galeria. Sotón exterior: més autenticitat. Arnao i Bustiello: opcions límit.</p></article><article><b>🦅 Trikuharri</b><p>Refugi i educació ambiental a Urdax; Fauna Halcón forma part de la mateixa proposta. Cal confirmar per telèfon.</p></article><article><b>🐄 Ultzama</b><p>Granja Escola (90 min, taller de quallada) + bosc d’Orgi; el Museu de la Mel és un bon tercer complement.</p></article></div></aside></section>}

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><aside className="detail" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><p className="eyebrow">{selected.block} · {selected.region.toUpperCase()}</p><h2>{selected.name}</h2><div className="detail-facts"><span>🚗<b>{selected.drive}</b></span><span>◷<b>{selected.duration}</b></span><span>✦<b>{selected.type}</b></span></div><h3>Per què val la pena</h3><p>{selected.appeal}</p><h3>Cost orientatiu</h3><p>{selected.cost}</p><div className="notice"><b>Abans de sortir</b><p>Comprova l’horari, la reserva i el temps de conducció real. Les dades de la guia van ser verificades el 15 de juliol de 2026.</p></div><button className="primary" onClick={()=>setSaved(s=>s.includes(selected.id)?s:[...s,selected.id])}>{saved.includes(selected.id)?"✓ Ja és al pla":"☆ Afegeix al pla"}</button></aside></div>}
    <footer className="felip-app-footer">
      <a className="felip-license-image-link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer" aria-label="Llicència Creative Commons BY-NC-SA 4.0">
        <img className="felip-license-image" src={`${process.env.NEXT_PUBLIC_BASE_PATH??""}/CC_BY-NC-SA.png`} alt="Creative Commons BY-NC-SA" />
      </a>
      <div className="felip-footer-text">
        <p>Aplicació creada per <a href="https://ja.cat/felipsarroca" target="_blank" rel="noopener noreferrer">Felip Sarroca</a> amb assistència de la IA</p>
        <p>Obra sota llicència <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ca" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a></p>
      </div>
    </footer>
  </main>
}
