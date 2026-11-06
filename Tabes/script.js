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
