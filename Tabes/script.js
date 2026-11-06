const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".menu-toggle");
const page = document.body.dataset.page;
const pageLinks = document.querySelectorAll("[data-page-link]");
const internalLinks = document.querySelectorAll('a[href$=".html"]');

/* ---------- Navegació ---------- */
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Tancar menú" : "Obrir menú");
  });
}

pageLinks.forEach((link) => {
  if (link.dataset.pageLink === page) {
    link.classList.add("is-current");
    link.setAttribute("aria-current", "page");
  }

  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    const current = window.location.pathname.split("/").pop() || "index.html";

    if (!href || href.startsWith("http") || href === current || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = href;
    }, 18);
  });
});

/* ---------- Amplada dels peus d'imatge ---------- */
const captionFigures = document.querySelectorAll(".hero-image, .bleed-image, .stack-image, .mini-history-card");

function syncCaptionWidths() {
  captionFigures.forEach((figure) => {
    const img = figure.querySelector("img");
    const caption = figure.querySelector("figcaption");
    if (!img || !caption) return;
    const width = Math.round(img.getBoundingClientRect().width);
    if (width > 0) {
      caption.style.width = `${width}px`;
      caption.style.maxWidth = "100%";
    }
  });
}

window.addEventListener("load", syncCaptionWidths);
window.addEventListener("resize", syncCaptionWidths);
captionFigures.forEach((figure) => figure.querySelector("img")?.addEventListener("load", syncCaptionWidths));

/* ---------- Galeria ---------- */
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImg.src = item.dataset.image || "";
      lightboxImg.alt = item.querySelector("img")?.alt || "";
      lightboxCaption.innerHTML = item.dataset.caption || "";
      lightbox.showModal();
    });
  });

  lightboxClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    const rect = lightbox.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) lightbox.close();
  });
}

/* ---------- Fitxa de les cares ---------- */
document.querySelectorAll("[data-face-explorer]").forEach((explorer) => {
  const tabs = [...explorer.querySelectorAll('[role="tab"]')];

  function select(tab, focus = false) {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (event.key in keys) {
        event.preventDefault();
        select(tabs[(index + keys[event.key] + tabs.length) % tabs.length], true);
      } else if (event.key === "Home") {
        event.preventDefault();
        select(tabs[0], true);
      } else if (event.key === "End") {
        event.preventDefault();
        select(tabs[tabs.length - 1], true);
      }
    });
  });
});

/* ---------- Veritat o mentida ---------- */
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
  });
});

/* ---------- Mapes ---------- */
const MAPS = {
  dialectal: {
    center: [40.6, 1.6],
    zoom: 6,
    points: [
      { ll: [41.39, 2.17], dir: "bottom", name: "Tabes", text: "Barcelonès i Catalunya Central: el nom més general." },
      { ll: [41.98, 2.82], dir: "right", name: "Tabes", text: "Comarques gironines." },
      { ll: [42.18, 2.49], dir: "top", name: "Carn i os", text: "Olot: un altre nom del joc." },
      { ll: [41.73, 1.83], dir: "left", name: "Carn i os", text: "Manresa: un altre nom del joc." },
      { ll: [42.70, 2.90], dir: "right", name: "Totos", text: "Catalunya del Nord (Rosselló): totos o tòtols." },
      { ll: [41.18, 0.57], dir: "left", name: "Pidos", text: "Ascó (Ribera d’Ebre): «agafar el pido»." },
      { ll: [41.15, 0.82], dir: "right", name: "Todo / marranxa", text: "Priorat." },
      { ll: [40.81, 0.52], dir: "left", name: "Ossets", text: "Algunes zones de les Terres de l’Ebre." },
      { ll: [39.47, -0.38], dir: "left", name: "Ossets / marranxes", text: "País Valencià." },
      { ll: [39.57, 2.65], name: "Ossets", text: "Mallorca i la resta de les Illes Balears." },
      { ll: [40.0, 3.84], name: "Marraquinca", text: "Menorca: joc d’aposta amb es cul i es nèpel." },
    ],
  },
  mon: {
    center: [25, 20],
    zoom: 2,
    points: [
      { ll: [41.6, 1.8], name: "Tabes", type: "teal", text: "Catalunya: habilitat, rei i botxí i atzar." },
      { ll: [46.6, 2.4], name: "Osselets", type: "teal", text: "França: habilitat amb pare i fills, figures molt complexes." },
      { ll: [43.0, -2.6], name: "Txoko", type: "teal", text: "País Basc: txoko, tortoloxak, azurrak." },
      { ll: [41.6, -4.7], name: "Tabas", type: "teal", text: "Castella i Lleó: hoyo, panza, rey i verdugo." },
      { ll: [37.98, 23.73], name: "Astragaloi", type: "teal", text: "Grècia antiga: joc, atzar i endevinació." },
      { ll: [41.9, 12.5], name: "Tali", type: "teal", text: "Roma antiga: Cop de Venus i Canis." },
      { ll: [55.75, 37.6], name: "Babki", type: "teal", text: "Rússia rural: joc d’astràgals." },
      { ll: [47.9, 106.9], name: "Shagai", type: "teal", text: "Mongòlia: cavall, ovella, camell i cabra. Patrimoni UNESCO (2014)." },
      { ll: [52.5, -1.5], name: "Knucklebones", type: "teal", text: "Món anglosaxó: knucklebones, fivestones i jacks." },
      { ll: [-25.3, 134], name: "Knucklebones", type: "teal", text: "Austràlia: ossos d’ovella bullits i tenyits." },
      { ll: [-34.6, -58.4], name: "Taba", type: "coral", text: "Argentina: taba criolla de bou, suerte o culo." },
      { ll: [-34.9, -56.2], name: "Taba", type: "coral", text: "Uruguai: joc rural d’aposta." },
      { ll: [-30.0, -51.2], name: "Jogo do osso", type: "coral", text: "Sud del Brasil." },
      { ll: [-51.7, -72.5], name: "Taba patagònica", type: "coral", text: "Patagònia xilena: taba amb plaques de metall." },
      { ll: [37.57, 126.98], name: "Gonggi", type: "gold", text: "Corea: cinc pedres o peces de plàstic." },
      { ll: [35.68, 139.69], name: "Otedama", type: "gold", text: "Japó: bossetes de tela." },
      { ll: [1.35, 103.82], name: "Batu seremban", type: "gold", text: "Singapur: bossetes farcides de sorra o arròs." },
      { ll: [39.93, 32.85], name: "Beş taş", type: "gold", text: "Turquia: «cinc pedres»." },
      { ll: [13.08, 80.27], name: "Anju kal", type: "gold", text: "Índia (tàmil): cinc pedres." },
    ],
  },
};

const MAP_COLORS = { teal: "#0f8b8d", coral: "#f05d3f", gold: "#e0a92a" };

function initMaps() {
  if (!window.L) return;
  document.querySelectorAll("[data-map]").forEach((box) => {
    const config = MAPS[box.dataset.map];
    if (!config || box.dataset.ready) return;
    box.dataset.ready = "1";

    const map = L.map(box, { scrollWheelZoom: false, worldCopyJump: true }).setView(config.center, config.zoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 12,
    }).addTo(map);

    const bounds = [];
    config.points.forEach((point) => {
      const color = MAP_COLORS[point.type || "teal"];
      L.circleMarker(point.ll, {
        radius: 8,
        color: "#fff",
        weight: 2,
        fillColor: color,
        fillOpacity: 0.95,
      })
        .addTo(map)
        .bindTooltip(point.name, {
          permanent: config.points.length < 12,
          direction: point.dir || "top",
          offset: { top: [0, -8], bottom: [0, 8], left: [-8, 0], right: [8, 0] }[point.dir || "top"],
          className: "map-label",
        })
        .bindPopup(`<strong>${point.name}</strong><br>${point.text}`);
      bounds.push(point.ll);
    });

    function fit() {
      map.invalidateSize();
      if (box.dataset.map === "mon") {
        map.setView(config.center, box.clientWidth < 520 ? 1 : 2);
      } else {
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    }

    fit();
    let timer;
    window.addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(fit, 200);
    });
  });
}

if (document.querySelector("[data-map]")) {
  if (window.L) initMaps();
  else window.addEventListener("load", initMaps);
}

/* ---------- Laboratori de probabilitat ---------- */
const FACES = [
  { id: "panxa", name: "Panxa", p: 0.4 },
  { id: "forat", name: "Forat", p: 0.38 },
  { id: "rei", name: "Rei", p: 0.11 },
  { id: "botxi", name: "Botxí", p: 0.11 },
];

const pct = (value) => `${(value * 100).toLocaleString("ca-ES", { maximumFractionDigits: 1, minimumFractionDigits: 1 })} %`;
const num = (value) => value.toLocaleString("ca-ES");

function throwTaba() {
  let r = Math.random();
  for (const face of FACES) {
    if (r < face.p) return face.id;
    r -= face.p;
  }
  return FACES[FACES.length - 1].id;
}

function buildBars(list) {
  list.innerHTML = FACES.map(
    (face) =>
      `<li><span class="bar-label">${face.name}</span><span class="bar-track"><span class="bar-fill" data-fill="${face.id}" style="width:0%"></span><span class="bar-ref" style="left:${face.p * 200}%"></span></span><span class="bar-value" data-value="${face.id}">–</span></li>`
  ).join("");
}

function paintBars(list, counts) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  FACES.forEach((face) => {
    const freq = total ? counts[face.id] / total : 0;
    list.querySelector(`[data-fill="${face.id}"]`).style.width = `${Math.min(freq * 200, 100)}%`;
    list.querySelector(`[data-value="${face.id}"]`).textContent = total ? pct(freq) : "–";
  });
  return total;
}

const lab = document.querySelector("[data-lab]");
if (lab) {
  const nameOf = Object.fromEntries(FACES.map((f) => [f.id, f.name]));
  const zero = () => Object.fromEntries(FACES.map((f) => [f.id, 0]));

  // Una taba
  const singleBars = lab.querySelector('[data-bars="single"]');
  let single = zero();
  buildBars(singleBars);

  function renderSingle(last) {
    const total = paintBars(singleBars, single);
    lab.querySelector("[data-total]").textContent = num(total);
    lab.querySelector("[data-wide]").textContent = total ? pct((single.panxa + single.forat) / total) : "–";
    lab.querySelector("[data-narrow]").textContent = total ? pct((single.rei + single.botxi) / total) : "–";
    if (last) lab.querySelector("[data-last]").textContent = last;
  }

  lab.querySelectorAll("[data-throw]").forEach((button) => {
    button.addEventListener("click", () => {
      const n = Number(button.dataset.throw);
      let face;
      for (let i = 0; i < n; i += 1) {
        face = throwTaba();
        single[face] += 1;
      }
      renderSingle(n === 1 ? `Ha sortit: ${nameOf[face]}.` : `Has llançat ${num(n)} tabes més.`);
    });
  });

  // Quatre tabes
  let four = { total: 0, venus: 0, canis: 0 };
  const theory = lab.querySelector("[data-theory]");
  const pVenus = 24 * FACES.reduce((acc, f) => acc * f.p, 1);
  const pCanis = FACES.find((f) => f.id === "rei").p ** 4;
  theory.innerHTML = `<strong>Càlcul teòric:</strong> Cop de Venus = 4! × 0,40 × 0,38 × 0,11 × 0,11 ≈ ${pct(pVenus)} (1 de cada ${Math.round(1 / pVenus)} tirades). <em>Canis</em> = 0,11<sup>4</sup> ≈ 1 de cada ${num(Math.round(1 / pCanis))} tirades.`;

  function renderFour(last) {
    lab.querySelector("[data-total4]").textContent = num(four.total);
    lab.querySelector("[data-venus]").textContent = four.total ? `${num(four.venus)} (${pct(four.venus / four.total)})` : "0";
    lab.querySelector("[data-canis]").textContent = num(four.canis);
    if (last) lab.querySelector("[data-last4]").textContent = last;
  }

  lab.querySelectorAll("[data-throw4]").forEach((button) => {
    button.addEventListener("click", () => {
      const n = Number(button.dataset.throw4);
      let result = [];
      for (let i = 0; i < n; i += 1) {
        result = [throwTaba(), throwTaba(), throwTaba(), throwTaba()];
        four.total += 1;
        if (new Set(result).size === 4) four.venus += 1;
        if (result.every((f) => f === "rei")) four.canis += 1;
      }
      let message = `Has fet ${num(n)} tirades més.`;
      if (n === 1) {
        message = result.map((f) => nameOf[f]).join(" · ");
        if (new Set(result).size === 4) message += " → Cop de Venus!";
        else if (result.every((f) => f === "rei")) message += " → Canis!";
      }
      renderFour(message);
    });
  });

  // Registre real
  const realBars = lab.querySelector('[data-bars="real"]');
  buildBars(realBars);
  let real = zero();
  try {
    const saved = JSON.parse(localStorage.getItem("tabes-registre") || "null");
    if (saved) real = { ...real, ...saved };
  } catch (error) {
    /* sense emmagatzematge: el registre funciona igualment */
  }

  function renderReal() {
    FACES.forEach((face) => {
      lab.querySelector(`[data-count="${face.id}"]`).textContent = real[face.id];
    });
    paintBars(realBars, real);
    try {
      localStorage.setItem("tabes-registre", JSON.stringify(real));
    } catch (error) {
      /* res */
    }
  }

  lab.querySelectorAll("[data-inc]").forEach((b) => b.addEventListener("click", () => { real[b.dataset.inc] += 1; renderReal(); }));
  lab.querySelectorAll("[data-dec]").forEach((b) => b.addEventListener("click", () => { real[b.dataset.dec] = Math.max(0, real[b.dataset.dec] - 1); renderReal(); }));

  lab.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      const what = button.dataset.reset;
      if (what === "single") {
        single = zero();
        renderSingle("Comptador a zero.");
      } else if (what === "four") {
        four = { total: 0, venus: 0, canis: 0 };
        renderFour("Comptador a zero.");
      } else {
        real = zero();
        renderReal();
      }
    });
  });

  renderSingle();
  renderFour();
  renderReal();
}

/* =========================================================
   Glossari emergent
   ========================================================= */

const GLOSSARI = [
  { t: "Astràgal", m: ["astràgals", "astràgal"], d: "Os petit del turmell que uneix la cama amb el peu. El de l’ovella i el de la cabra són les tabes." },
  { t: "Astragalomància", m: ["astragalomància"], d: "Manera d’endevinar el futur: es llançaven astràgals i, segons les cares que sortien, s’interpretava la resposta dels déus." },
  { t: "Astragalizontes", m: ["Astragalizontes"], d: "En grec, «els que juguen a tabes». És el títol d’una escultura de bronze de Policlet, avui perduda." },
  { t: "Turmell", m: ["turmell"], d: "Articulació que uneix la cama amb el peu." },
  { t: "Garró", m: ["garró"], d: "Articulació de la pota del darrere dels animals de quatre potes. Equival al nostre turmell i és on hi ha l’astràgal." },
  { t: "Tars", m: ["tars"], d: "Grup d’ossos petits del turmell i de la part del darrere del peu. L’astràgal n’és un." },
  { t: "Mare", m: ["mare"], d: "La cinquena taba, sovint pintada, que es llança enlaire en el joc d’habilitat. També se’n diu el pare o el comodí.", pages: ["jocs", "preparacio"] },
  { t: "Penyora", m: ["penyores", "penyora"], d: "Petita prova o càstig divertit que ha de complir qui perd en un joc." },
  { t: "Cop de Venus", m: ["Cop de Venus"], d: "La millor tirada del joc romà amb quatre tabes: cada taba mostra una cara diferent." },
  { t: "Canis", m: ["Canis"], d: "«Gos» en llatí. La pitjor tirada romana: les quatre tabes mostren la cara que val 1 punt." },
  { t: "Pentalitha", m: ["pentalitha"], d: "«Cinc pedres» en grec. Nom antic del joc d’habilitat amb cinc tabes o cinc pedretes." },
  { t: "Shagai", m: ["shagai"], d: "Nom mongol de les tabes. Les quatre cares porten nom d’animal: cavall, ovella, camell i cabra." },
  { t: "Naadam", m: ["Naadam"], d: "Gran festa tradicional de Mongòlia, amb lluita, curses de cavalls, tir amb arc i competicions de tir de shagai." },
  { t: "Osselets", m: ["osselets"], d: "Nom francès de les tabes. Vol dir «ossets»." },
  { t: "Babki", m: ["babki"], d: "Joc tradicional rus amb astràgals. Es jugava sobretot al carrer i als pobles." },
  { t: "Gonggi", m: ["gonggi"], d: "Joc coreà semblant a les tabes. Avui es juga amb cinc peces petites de plàstic o amb pedretes." },
  { t: "Otedama", m: ["otedama"], d: "Joc japonès semblant a les tabes que es juga amb bossetes de roba plenes de grans." },
  { t: "Taba criolla", m: ["taba criolla"], d: "Joc d’atzar de l’Argentina, l’Uruguai i Xile. Es juga amb un sol astràgal de bou, sovint reforçat amb metall." },
  { t: "Probabilitat", m: ["probabilitats", "probabilitat"], d: "Mesura de com de possible és un resultat. Va del 0 % (impossible) al 100 % (segur)." },
  { t: "Freqüència", m: ["freqüència"], d: "Nombre de vegades que surt un resultat. La freqüència relativa és aquest nombre dividit pel total de tirades." },
  { t: "Llei dels grans nombres", m: ["llei dels grans nombres"], d: "Com més vegades es repeteix un experiment d’atzar, més s’acosten els resultats a les probabilitats teòriques." },
  { t: "Patrimoni immaterial", m: ["patrimoni cultural immaterial", "patrimoni immaterial"], d: "Tradicions vives que una comunitat es transmet: jocs, festes, músiques, oficis o sabers. La UNESCO en protegeix alguns." },
  { t: "Patrimoni lúdic", m: ["patrimoni lúdic"], d: "Conjunt de jocs i joguines tradicionals que formen part de la cultura d’un poble." },
  { t: "UNESCO", m: ["UNESCO"], d: "Organització de les Nacions Unides per a l’Educació, la Ciència i la Cultura. Elabora les llistes del patrimoni de la humanitat." },
  { t: "Neolític", m: ["Neolític"], d: "Darrer període de la prehistòria, quan els humans van començar a conrear i a criar animals com ovelles i cabres." },
  { t: "Mil·lenni", m: ["mil·lenni"], d: "Període de mil anys. El V mil·lenni aC va de l’any 5000 al 4001 aC." },
  { t: "Jaciment", m: ["jaciments", "jaciment"], d: "Lloc on es troben restes del passat i on treballen els arqueòlegs." },
  { t: "Santuari", m: ["santuaris", "santuari"], d: "Lloc sagrat on la gent anava a pregar o a fer ofrenes a un déu." },
  { t: "Terracota", m: ["terracota"], d: "Argila cuita al forn. Se’n feien figuretes, gerres i teules." },
  { t: "Hel·lenístic", m: ["hel·lenística", "hel·lenístic"], d: "Període de la història grega que va de la mort d’Alexandre el Gran (323 aC) a la conquesta romana d’Egipte (30 aC)." },
  { t: "Dialectal", m: ["dialectal", "dialectes"], d: "Relacionat amb els dialectes, les varietats d’una llengua que es parlen a cada territori." },
  { t: "Desgreixar", m: ["desgreixar"], d: "Treure el greix." },
  { t: "Aigua oxigenada", m: ["aigua oxigenada"], d: "Nom comú del peròxid d’hidrogen. Blanqueja i desinfecta. Cal fer-la servir amb guants i amb un adult al costat." },
  { t: "Lleixiu", m: ["lleixiu"], d: "Producte de neteja amb clor. Blanqueja, però fa malbé l’os i el torna trencadís." }
];

function initGlossari() {
  const main = document.querySelector("main");
  if (!main || page === "fonts" || page === "galeria") return;

  const SKIP = "a, button, summary, label, h1, h2, h3, h4, .kicker, .skill-level, dt, svg, script, style, .lightbox, .leaflet-container, [data-no-gloss]";
  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pending = GLOSSARI.filter((g) => !g.pages || g.pages.includes(page));
  const used = new Set();

  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return node.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  pending.forEach((entry, index) => {
    const re = new RegExp(`(?<![\\p{L}·’'-])(${entry.m.map(escape).join("|")})(?![\\p{L}·-])`, "iu");
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (!node.parentNode || node.parentElement.closest(".gloss")) continue;
      const match = re.exec(node.nodeValue);
      if (!match) continue;
      const after = node.splitText(match.index);
      const rest = after.splitText(match[0].length);
      const term = document.createElement("button");
      term.type = "button";
      term.className = "gloss";
      term.dataset.gloss = String(index);
      term.textContent = after.nodeValue;
      after.replaceWith(term);
      nodes.splice(i, 1, node, rest);
      used.add(index);
      break;
    }
  });

  if (!used.size) return;

  const pop = document.createElement("div");
  pop.className = "gloss-pop";
  pop.id = "gloss-pop";
  pop.setAttribute("role", "tooltip");
  pop.hidden = true;
  pop.innerHTML = '<strong class="gloss-term"></strong><span class="gloss-def"></span>';
  document.body.appendChild(pop);

  let current = null;
  let hideTimer = 0;
  let showTimer = 0;

  function place() {
    if (!current) return;
    const r = current.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    pop.style.left = "0px";
    pop.style.top = "0px";
    const w = pop.offsetWidth;
    const h = pop.offsetHeight;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), vw - w - 8);
    const below = r.bottom + 10;
    const top = below + h > vh - 8 && r.top - h - 10 > 8 ? r.top - h - 10 : below;
    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
    pop.style.setProperty("--arrow", `${r.left + r.width / 2 - left}px`);
    pop.dataset.side = top < r.top ? "top" : "bottom";
  }

  function show(term) {
    clearTimeout(hideTimer);
    if (current && current !== term) {
      current.removeAttribute("aria-describedby");
      current.setAttribute("aria-expanded", "false");
    }
    const entry = pending[Number(term.dataset.gloss)];
    pop.querySelector(".gloss-term").textContent = entry.t;
    pop.querySelector(".gloss-def").textContent = entry.d;
    current = term;
    term.setAttribute("aria-describedby", "gloss-pop");
    term.setAttribute("aria-expanded", "true");
    pop.hidden = false;
    place();
  }

  function hide() {
    clearTimeout(showTimer);
    if (current) {
      current.removeAttribute("aria-describedby");
      current.setAttribute("aria-expanded", "false");
    }
    current = null;
    pop.hidden = true;
  }

  document.querySelectorAll(".gloss").forEach((term) => {
    term.setAttribute("aria-expanded", "false");
    term.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      clearTimeout(hideTimer);
      showTimer = setTimeout(() => show(term), 120);
    });
    term.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      clearTimeout(showTimer);
      hideTimer = setTimeout(hide, 220);
    });
    term.addEventListener("click", () => {
      if (current === term && !pop.hidden && term.dataset.justShown !== "1") hide();
      else show(term);
    });
    term.addEventListener("focus", () => {
      show(term);
      term.dataset.justShown = "1";
      setTimeout(() => { delete term.dataset.justShown; }, 300);
    });
    term.addEventListener("blur", () => { hideTimer = setTimeout(hide, 150); });
  });

  pop.addEventListener("pointerenter", () => clearTimeout(hideTimer));
  pop.addEventListener("pointerleave", () => { hideTimer = setTimeout(hide, 220); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && current) hide();
  });
  document.addEventListener("pointerdown", (event) => {
    if (current && !event.target.closest(".gloss, .gloss-pop")) hide();
  });
  window.addEventListener("scroll", place, { passive: true });
  window.addEventListener("resize", place);
}

initGlossari();

/* =========================================================
   Animació del joc d'habilitat
   ========================================================= */

function initPlay(root) {
  const svg = root.querySelector("[data-play-svg]");
  const NS = "http://www.w3.org/2000/svg";
  const hand = svg.querySelector("[data-hand]");
  const mare = svg.querySelector("[data-mare]");
  const shadow = svg.querySelector("[data-shadow]");
  const done = svg.querySelector("[data-done]");
  const tabesLayer = svg.querySelector("[data-tabes]");
  const caption = root.querySelector("[data-play-caption]");
  const round = root.querySelector("[data-play-round]");
  const runButton = root.querySelector("[data-play-run]");
  const levelButtons = root.querySelectorAll("[data-level]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const GROUND = 240;
  const HOME = { x: 320, y: 196 };
  const TOP = 46;
  const LEVELS = [
    { name: "Primeres", xs: [110, 220, 440, 540], groups: [[0], [1], [2], [3]], verb: ["Agafa una taba", "Agafa una altra taba", "Agafa la tercera", "Agafa l’última"] },
    { name: "Segones", xs: [150, 186, 464, 500], groups: [[0, 1], [2, 3]], verb: ["Agafa dues tabes alhora", "Agafa les dues que queden"] },
    { name: "Terceres", xs: [130, 166, 202, 500], groups: [[0, 1, 2], [3]], verb: ["Agafa tres tabes alhora", "Agafa la que queda"] },
    { name: "Quartes", xs: [164, 200, 236, 272], groups: [[0, 1, 2, 3]], verb: ["Agafa les quatre de cop"] }
  ];

  const tabes = [0, 1, 2, 3].map(() => {
    const g = document.createElementNS(NS, "g");
    const use = document.createElementNS(NS, "use");
    use.setAttribute("href", "#taba");
    use.setAttribute("x", "-18");
    use.setAttribute("y", "-12");
    use.setAttribute("width", "36");
    use.setAttribute("height", "24");
    use.setAttribute("fill", "#f6ead0");
    use.setAttribute("stroke", "#b79f73");
    use.setAttribute("stroke-width", "1.4");
    g.appendChild(use);
    tabesLayer.appendChild(g);
    return { g, use, x: 0, y: 0, r: 0 };
  });

  const state = { hand: { x: HOME.x, y: HOME.y }, mare: { x: HOME.x, y: HOME.y - 14 } };
  let level = 0;
  let token = 0;
  let held = [];

  const set = (el, p, r = 0) => el.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${r.toFixed(1)})`);
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
  const easeOut = (t) => 1 - (1 - t) ** 2;
  const easeIn = (t) => t * t;
  const lerp = (a, b, t) => a + (b - a) * t;

  function heldPos(i) {
    return { x: state.hand.x - 22 + i * 13, y: state.hand.y - 12 - (i % 2) * 5 };
  }

  function draw() {
    set(hand, state.hand);
    set(mare, state.mare);
    held.forEach((tb, i) => { const p = heldPos(i); tb.x = p.x; tb.y = p.y; tb.r = -8 + i * 6; });
    tabes.forEach((tb) => set(tb.g, tb, tb.r));
    const h = Math.max(0, Math.min(1, (GROUND - state.mare.y) / (GROUND - TOP)));
    shadow.setAttribute("cx", state.mare.x.toFixed(1));
    shadow.setAttribute("rx", (20 - h * 10).toFixed(1));
    shadow.setAttribute("fill-opacity", (0.18 - h * 0.1).toFixed(2));
  }

  function tween(ms, fn, my) {
    return new Promise((resolve, reject) => {
      const start = performance.now();
      function frame(now) {
        if (my !== token) { reject(new Error("stop")); return; }
        const t = Math.min(1, (now - start) / ms);
        fn(t);
        draw();
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  const wait = (ms, my) => tween(ms, () => {}, my);

  function say(text, step) {
    caption.textContent = text;
    round.textContent = step || "";
  }

  function highlight(ids, on) {
    ids.forEach((i) => {
      tabes[i].use.setAttribute("stroke", on ? "#0f8b8d" : "#b79f73");
      tabes[i].use.setAttribute("stroke-width", on ? "2.6" : "1.4");
    });
  }

  function reset() {
    const L = LEVELS[level];
    held = [];
    state.hand = { ...HOME };
    state.mare = { x: HOME.x, y: HOME.y - 14 };
    tabes.forEach((tb, i) => { tb.x = L.xs[i]; tb.y = GROUND; tb.r = [-6, 10, -12, 4][i]; });
    highlight([0, 1, 2, 3], false);
    done.setAttribute("opacity", "0");
    draw();
  }

  async function play() {
    token += 1;
    const my = token;
    const L = LEVELS[level];
    reset();
    try {
      held = [0, 1, 2, 3].map((i) => tabes[i]);
      draw();
      say(`Nivell ${level + 1} · ${L.name}. Es llancen les quatre tabes a terra.`);
      await wait(700, my);
      const from = held.map((tb) => ({ x: tb.x, y: tb.y }));
      const flying = held;
      held = [];
      await tween(900, (t) => {
        const k = easeOut(t);
        flying.forEach((tb, i) => {
          tb.x = lerp(from[i].x, L.xs[i], k);
          tb.y = lerp(from[i].y, GROUND, k) - Math.sin(Math.PI * t) * 60;
          tb.r = lerp(0, [-6, 10, -12, 4][i], k) + Math.sin(t * 9 + i) * 20 * (1 - t);
        });
      }, my);
      await wait(600, my);

      for (let g = 0; g < L.groups.length; g += 1) {
        const ids = L.groups[g];
        const step = L.groups.length > 1 ? `Tirada ${g + 1} de ${L.groups.length}` : "Una sola tirada";
        highlight(ids, true);
        say("Llança la mare enlaire…", step);
        const targetX = ids.reduce((s, i) => s + L.xs[i], 0) / ids.length;
        const start = { ...state.hand };

        // Pujada de la mare (la mà la impulsa)
        await tween(1100, (t) => {
          state.mare.y = lerp(HOME.y - 14, TOP, easeOut(t));
          state.hand.y = start.y - Math.sin(Math.PI * Math.min(1, t * 3)) * 14;
        }, my);

        // Baixada: mentrestant, la mà recull i torna
        say(`${L.verb[g]}…`, step);
        const picked = ids.map((i) => tabes[i]);
        await tween(1500, (t) => {
          state.mare.y = lerp(TOP, HOME.y - 14, easeIn(t));
          if (t < 0.42) {
            const k = ease(t / 0.42);
            state.hand.x = lerp(HOME.x, targetX + 10, k);
            state.hand.y = lerp(HOME.y, GROUND + 6, k);
          } else if (t < 0.5) {
            if (!held.includes(picked[0])) held = held.concat(picked);
          } else {
            const k = ease(Math.min(1, (t - 0.5) / 0.4));
            state.hand.x = lerp(targetX + 10, HOME.x, k);
            state.hand.y = lerp(GROUND + 6, HOME.y, k);
          }
        }, my);
        highlight(ids, false);
        say("…i atrapa la mare abans que toqui a terra!", step);
        await tween(260, (t) => { state.hand.y = HOME.y + Math.sin(Math.PI * t) * 8; state.mare.y = state.hand.y - 14; }, my);
        await wait(900, my);
      }

      say(`Nivell ${level + 1} superat! Ara es pot passar al nivell següent.`, "");
      await tween(400, (t) => done.setAttribute("opacity", t.toFixed(2)), my);
    } catch (error) {
      /* animació aturada */
    }
  }

  function choose(index) {
    level = index;
    levelButtons.forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.level) === index)));
    play();
  }

  levelButtons.forEach((b) => b.addEventListener("click", () => choose(Number(b.dataset.level))));
  runButton.addEventListener("click", play);

  reset();
  if (reduce.matches || !("IntersectionObserver" in window)) {
    say("Tria un nivell o prem «Torna-ho a veure» per reproduir l’animació.");
    runButton.textContent = "Reprodueix";
    return;
  }
  say("Nivell 1 · Primeres.");
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      play();
    }
  }, { threshold: 0.6 });
  io.observe(svg);
}

document.querySelectorAll("[data-play]").forEach(initPlay);

/* Impressió: obre els desplegables i després els torna a l'estat inicial */
let printOpened = [];
window.addEventListener("beforeprint", () => {
  printOpened = [...document.querySelectorAll("details:not([open])")];
  printOpened.forEach((d) => { d.open = true; });
});
window.addEventListener("afterprint", () => {
  printOpened.forEach((d) => { d.open = false; });
  printOpened = [];
});
