import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const shouldGeocode = process.argv.includes("--geocode");
const shouldGeocodePhoton = process.argv.includes("--geocode-photon");
const cachePath = path.join(root, "data", "geocoding-cache.json");
const outputPath = path.join(root, "public", "data", "activities.json");

const sources = [
  { file: "asturies.txt", region: "Astúries", prefix: "A", country: "Espanya", viewbox: "-7.3,43.8,-4.3,42.8", bbox: "-7.3,42.8,-4.3,43.8" },
  { file: "navarra.txt", region: "Navarra", prefix: "N", country: "Espanya o França", viewbox: "-2.7,43.7,-0.7,42.5", bbox: "-2.7,42.5,-0.7,43.7" },
];

const clusterCenters = {
  A1:[43.4814,-5.4357],A2:[43.5304,-5.3933],A3:[43.3577,-5.5066],A4:[43.4852,-5.2707],A5:[43.4637,-5.1854],A6:[43.5248,-5.6150],A7:[43.5357,-5.6615],A8:[43.3476,-5.3647],A9:[43.4615,-5.0592],A10:[43.3501,-5.1290],A11:[43.3614,-5.8494],A12:[43.2945,-5.6814],A13:[43.5560,-5.9220],
  N1:[43.2004,-1.4809],N2:[43.1452,-1.5170],N3:[43.1745,-1.4531],N4:[43.2671,-1.5038],N5:[43.1674,-1.6107],N6:[43.2467,-1.7023],N7:[43.3120,-1.5800],N8:[43.3562,-1.5506],N9:[42.9817,-1.6768],N10:[43.3635,-1.7900],N11:[43.1330,-1.6900],
};
// Coincidències homònimes o de categoria retornades pel geocodificador que no
// corresponen a l'indret descrit. Es prefereix el centre honest del clúster.
const rejectedGeocodes = new Set(["A-017","A-024","A-026","A-027","A-069","A-078","N-011","N-026","N-027","N-059","N-070"]);

const clean = (value = "") => value.replace(/\s+/g, " ").trim();
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const parseMinutes = (value) => {
  const matches = [...value.matchAll(/(\d+)/g)].map((match) => Number(match[1]));
  return matches.length ? Math.min(...matches) : 60;
};

const anchorPattern = /MUJA|Tito Bustillo|Aquari|Jardí Botànic|MUMI|Samuño|Bodegues El Gaitero|Villaviciosa històrica|Museu de la Sidra|Fitu|Cangas de Onís|Santxotena|Señorío de Bertiz|Trikuharri|Granja Escola Ultzama|Coves d’Urdax|Zugarramurdi|Irrisarri|Xorroxin|Amaiur/i;
function classify(name, type, appeal, duration) {
  const text = `${name} ${type} ${appeal}`.toLowerCase();
  const weather = [];
  if (/museu|aquari|cova|celler|centre d.interpretació|taller|exposició/.test(text)) weather.push("pluja");
  if (/platja|riu|llac|cova|bosc|ombra|piscina/.test(text)) weather.push("calor");
  if (/mirador|muntanya|costa|platja|sender|ruta|cascada/.test(text)) weather.push("bon temps");
  return {
    role: anchorPattern.test(name) ? "àncora" : "complement",
    setting: /museu|aquari|cova|celler|centre|taller|exposició/.test(text) ? "interior o cobert" : "exterior",
    weather: [...new Set(weather)],
    bookingRecommended: /reserva|visita guiada|taller|cova|aquari|museu/.test(text),
    picnicFriendly: /parc|platja|bosc|àrea|jardí|llac|riu/.test(text),
    familyNote: /desnivell|escales|onatge|penya-segat|fang|difícil/.test(text) ? "Revisa les condicions i l’adequació per a l’infant de 4 anys." : "Proposta inclosa segons els criteris familiars de la guia.",
  };
}

function findRichDetails(raw, name) {
  const pattern = new RegExp(escapeRegExp(name), "g");
  const candidates = [];
  for (const match of raw.matchAll(pattern)) {
    const excerpt = raw.slice(match.index, match.index + 3200);
    const appeal = excerpt.match(/ATRACTIU\s*·\s*([\s\S]*?)\s*Horari\s*\/\s*reserva/i)?.[1];
    const notes = excerpt.match(/Horari\s*\/\s*reserva\s+Aparcament\s+([\s\S]*?)\s+web\s*\/\s*reserva/i)?.[1];
    if (appeal) candidates.push({ appeal: clean(appeal), practicalNotes: clean(notes) });
  }
  return candidates
    .filter((candidate) => candidate.appeal.length >= 12 && candidate.appeal.length <= 700)
    .sort((a, b) => b.appeal.length - a.appeal.length)[0] ?? null;
}

async function parseSource(source) {
  const raw = await readFile(path.join(root, "public", "data", source.file), "utf8");
  const start = raw.indexOf("Taula mestra de totes les activitats");
  const end = raw.indexOf("Fitxes", start);
  const lines = raw.slice(start, end > start ? end : undefined).split(/\r?\n/).map(clean).filter(Boolean);
  const activities = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (!new RegExp(`^${source.prefix}\\d+$`).test(lines[index])) continue;
    const [block, name, drive, duration, type, appealShort, cost] = lines.slice(index, index + 7);
    if (!name || !drive || !duration) continue;
    const rich = findRichDetails(raw, name);
    const classification = classify(name, type, rich?.appeal ?? appealShort, duration);
    activities.push({
      id: `${source.prefix}-${String(activities.length + 1).padStart(3, "0")}`,
      region: source.region,
      block,
      name,
      drive,
      minutes: parseMinutes(drive),
      duration,
      type,
      appeal: rich?.appeal ?? appealShort,
      appealShort,
      cost,
      practicalNotes: rich?.practicalNotes ?? "",
      ...classification,
      officialUrl: null,
      latitude: null,
      longitude: null,
      locationPrecision: null,
      image: null,
      imageAlt: null,
      imageCredit: null,
    });
    index += 6;
  }
  return activities;
}

const cache = JSON.parse(await readFile(cachePath, "utf8").catch(() => "{}"));
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function geocode(activity, source) {
  const key = `${activity.region}|${activity.block}|${activity.name}`;
  if (Object.hasOwn(cache, key)) return cache[key];
  const query = `${activity.name}, ${activity.region === "Astúries" ? "Asturias" : "Navarra"}, ${source.country}`;
  const params = new URLSearchParams({ q: query, format: "jsonv2", limit: "1", countrycodes: "es,fr", viewbox: source.viewbox, bounded: "1" });
  const request = () => fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: { "User-Agent": "AsturiesNavarraFamilia/1.0 (+https://felipsarroca.github.io/web/Asturies-Navarra/)" },
  });
  let response = await request();
  if (response.status === 429) {
    await sleep(12000);
    response = await request();
  }
  if (!response.ok) throw new Error(`Nominatim ${response.status}: ${query}`);
  const [result] = await response.json();
  const value = result ? { latitude: Number(result.lat), longitude: Number(result.lon), displayName: result.display_name, osmType: result.type } : null;
  cache[key] = value;
  await writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
  await sleep(2200);
  return value;
}

const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 ]/g, " ");
const significantTokens = (value) => normalize(value).split(/\s+/).filter((token) => token.length > 3 && !["museu","centre","parc","platja","ruta","passeig","visita","asturies","navarra"].includes(token));
async function geocodePhoton(activity, source) {
  const query = `${activity.name}, ${activity.region === "Astúries" ? "Asturias" : activity.block.startsWith("N7") || activity.block.startsWith("N8") ? "France" : "Navarra"}`;
  const params = new URLSearchParams({ q: query, limit: "5", bbox: source.bbox });
  const response = await fetch(`https://photon.komoot.io/api/?${params}`, { headers: { "User-Agent": "AsturiesNavarraFamilia/1.0 (+https://felipsarroca.github.io/web/Asturies-Navarra/)" } });
  if (!response.ok) return null;
  const data = await response.json();
  const tokens = significantTokens(activity.name);
  const ranked = (data.features ?? []).map((feature) => {
    const label = `${feature.properties?.name ?? ""} ${feature.properties?.city ?? ""} ${feature.properties?.district ?? ""}`;
    const normalizedLabel = normalize(label);
    const matches = tokens.filter((token) => normalizedLabel.includes(token)).length;
    return { feature, score: tokens.length ? matches / Math.min(tokens.length, 3) : 0 };
  }).sort((a,b) => b.score-a.score);
  const best = ranked[0];
  if (!best || best.score < 0.34) return null;
  const [longitude, latitude] = best.feature.geometry.coordinates;
  return { latitude, longitude, displayName: [best.feature.properties.name,best.feature.properties.city,best.feature.properties.state].filter(Boolean).join(", "), osmType: best.feature.properties.osm_value, provider: "Photon/OSM" };
}

const activities = [];
for (const source of sources) {
  const parsed = await parseSource(source);
  for (const activity of parsed) {
    if (shouldGeocodePhoton) {
      const key = `${activity.region}|${activity.block}|${activity.name}`;
      let location = cache[key];
      if (!location) {
        location = await geocodePhoton(activity, source);
        if (location) { cache[key] = location; await writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`, "utf8"); }
        await sleep(650);
      }
      if (location) Object.assign(activity, location, { locationPrecision: "geocodificada" });
    } else if (shouldGeocode) {
      const location = await geocode(activity, source);
      if (location) Object.assign(activity, location, { locationPrecision: "geocodificada" });
    } else {
      const key = `${activity.region}|${activity.block}|${activity.name}`;
      if (cache[key]) Object.assign(activity, cache[key], { locationPrecision: "geocodificada" });
    }
    if (rejectedGeocodes.has(activity.id)) Object.assign(activity, { latitude:null, longitude:null, displayName:null, provider:null, locationPrecision:null });
    if (activity.latitude == null) {
      const center = clusterCenters[activity.block];
      if (center) Object.assign(activity, { latitude:center[0], longitude:center[1], displayName:`Centre aproximat del clúster ${activity.block}`, locationPrecision:"clúster aproximat", provider:"Clúster editorial" });
    }
    activities.push(activity);
  }
}

const catalog = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  verifiedAt: "2026-07-15",
  attribution: "Coordenades geocodificades amb dades d’OpenStreetMap, disponibles sota ODbL.",
  activities,
};

await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
console.log(`Catàleg creat: ${activities.length} activitats (${activities.filter((item) => item.latitude).length} amb coordenades).`);
