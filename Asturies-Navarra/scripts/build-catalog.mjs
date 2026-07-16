import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const shouldGeocode = process.argv.includes("--geocode");
const cachePath = path.join(root, "data", "geocoding-cache.json");
const outputPath = path.join(root, "public", "data", "activities.json");

const sources = [
  { file: "asturies.txt", region: "Astúries", prefix: "A", country: "Espanya", viewbox: "-7.3,43.8,-4.3,42.8" },
  { file: "navarra.txt", region: "Navarra", prefix: "N", country: "Espanya o França", viewbox: "-2.7,43.7,-0.7,42.5" },
];

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

const activities = [];
for (const source of sources) {
  const parsed = await parseSource(source);
  for (const activity of parsed) {
    if (shouldGeocode) {
      const location = await geocode(activity, source);
      if (location) Object.assign(activity, location, { locationPrecision: "geocodificada" });
    } else {
      const key = `${activity.region}|${activity.block}|${activity.name}`;
      if (cache[key]) Object.assign(activity, cache[key], { locationPrecision: "geocodificada" });
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
