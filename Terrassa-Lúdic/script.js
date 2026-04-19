const tabButtons = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".panel");

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabId;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});

const mapPoints = [
  {
    title: "Opció A · Gravetat Zero",
    lat: 41.546224,
    lon: 2.030689,
    text: "Escalada amb corda. Carrer de l'Anoia, zona Parc Vallès."
  },
  {
    title: "Opció A · Parc de les Nacions Unides",
    lat: 41.582446,
    lon: 2.012092,
    text: "Espai de pícnic i jocs."
  },
  {
    title: "Opció B · Emocions / Vallparadís",
    lat: 41.557447,
    lon: 2.02224,
    text: "Multiaventura al parc de Vallparadís."
  },
  {
    title: "Opció C · Parc Vallès",
    lat: 41.545648,
    lon: 2.026523,
    text: "Urban Planet i New Park Bowling."
  },
  {
    title: "Opció D · Geo Boulder",
    lat: 41.562302,
    lon: 1.998506,
    text: "Boulder indoor al carrer de Murillo, 18."
  },
  {
    title: "Alternativa · HiJump Park",
    lat: 41.555753,
    lon: 2.031253,
    text: "Salting i tobogans al carrer del Duero."
  }
];

function createMap() {
  if (!window.L) {
    return;
  }

  const map = L.map("map", {
    scrollWheelZoom: false
  }).setView([41.561, 2.018], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  const markers = mapPoints.map((point) => {
    return L.marker([point.lat, point.lon])
      .addTo(map)
      .bindPopup(`<strong>${point.title}</strong><br>${point.text}`);
  });

  const group = L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.18));
}

createMap();
