// JS Modernisme
document.addEventListener('DOMContentLoaded', () => {
    // Loader
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) setTimeout(() => loader.classList.add('hidden'), 500);
    });

    // Menú mòbil accessible
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'navMenu');

        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isActive));
        });
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) el.classList.add('visible');
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // =========================================
    // MODAL / POPUP GENERALITZAT
    // =========================================
    window.obrirModal = function (source) {
        const modal = document.getElementById('modal');
        const modalImatge = document.getElementById('modalImatge');
        const modalTitol = document.getElementById('modalTitol');
        const modalDesc = document.getElementById('modalDesc');
        const modalContingut = document.querySelector('.modal-contingut');
        let modalZoom = document.getElementById('modalZoom');

        if (!modal || !modalImatge || !modalContingut) return;

        let img, titol, desc;

        // Si l'origen és una imatge directa
        if (source.tagName === 'IMG') {
            img = source;
            titol = source.getAttribute('alt') || '';
            desc = '';
        } else {
            // Si és un contenidor tipus galeria-item
            img = source.querySelector('img');
            const overlay = source.querySelector('.galeria-overlay');
            if (overlay) {
                titol = overlay.querySelector('h4')?.textContent || '';
                desc = overlay.querySelector('p')?.textContent || '';
            } else if (img) {
                titol = img.alt;
                desc = '';
            }
        }

        if (!img) return;

        modalImatge.src = img.src;
        modalImatge.alt = img.alt;
        if (modalTitol) modalTitol.textContent = titol;
        if (modalDesc) modalDesc.textContent = desc;

        // Reset estat inicial
        modalImatge.classList.remove('zoomed');
        modalContingut.scrollTop = 0;
        modalContingut.classList.remove('has-zoomed-image');

        // Funció per alternar zoom
        const toggleZoom = (e) => {
            if (e) e.stopPropagation();
            const isZoomed = modalImatge.classList.toggle('zoomed');
            modalContingut.classList.toggle('has-zoomed-image', isZoomed);

            if (modalZoom) {
                modalZoom.textContent = isZoomed ? '🔍 Ajustar a la pantalla' : '🔍 Ampliar imatge';
            }
            // Canviar cursor
            modalImatge.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
        };

        // Click a la imatge per fer zoom
        modalImatge.onclick = toggleZoom;

        // Cursor inicial
        modalImatge.style.cursor = 'zoom-in';

        // Crear botó de zoom si no existeix
        if (!modalZoom) {
            modalZoom = document.createElement('button');
            modalZoom.id = 'modalZoom';
            modalZoom.type = 'button';
            modalZoom.className = 'modal-zoom-btn';
            modalImatge.insertAdjacentElement('afterend', modalZoom);
        }

        // Configurar botó
        modalZoom.textContent = '🔍 Ampliar imatge';
        modalZoom.onclick = toggleZoom;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquejar scroll
    };

    window.tancarModal = function () {
        const modal = document.getElementById('modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Events per tancar (ESC i click fora)
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') tancarModal(); });
    const modalElement = document.getElementById('modal');
    if (modalElement) {
        modalElement.addEventListener('click', (e) => {
            if (e.target.id === 'modal' || e.target.classList.contains('modal-contingut')) tancarModal();
        });
    }

    // Assignar event click a totes les imatges zoomable automàticament
    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation(); // Evitar doble click si el pare també té event
            obrirModal(this);
        });
    });

    // Lazy loading per a totes les imatges si no està definit
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // MAPA
    const mapContainer = document.getElementById('mapa');
    if (mapContainer && typeof L !== 'undefined' && !mapContainer._leaflet_id) {
        // Coordenades centrades a BCN (inicial, però s'ajustarà)
        const map = L.map('mapa').setView([41.393, 2.163], 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Markers (Exemples)
        const llocs = [
            // Barcelona
            { lat: 41.4036, lng: 2.1744, titol: "Sagrada Família" },
            { lat: 41.3916, lng: 2.1649, titol: "Casa Batlló" },
            { lat: 41.3953, lng: 2.1619, titol: "La Pedrera" },
            { lat: 41.3879, lng: 2.1753, titol: "Palau de la Música" },
            { lat: 41.4136, lng: 2.1527, titol: "Park Güell" },
            { lat: 41.4116, lng: 2.1763, titol: "Hospital Sant Pau" },
            { lat: 41.3929, lng: 2.1661, titol: "Casa Amatller" },
            { lat: 41.3980, lng: 2.1662, titol: "Casa de les Punxes" },
            { lat: 41.4030, lng: 2.1480, titol: "Casa Vicens" },
            { lat: 41.3791, lng: 2.1744, titol: "Palau Güell" },
            { lat: 41.4147, lng: 2.1230, titol: "Torre Bellesguard" },
            { lat: 41.4015, lng: 2.1352, titol: "Col·legi de les Teresianes" },
            { lat: 41.3877, lng: 2.1141, titol: "Pavellons Finca Güell" },
            { lat: 41.3943, lng: 2.1625, titol: "Palau Baró de Quadras" },

            // Terrassa
            { lat: 41.5173, lng: 2.0118, titol: "Masia Freixa (Terrassa)" },
            { lat: 41.5644, lng: 2.0232, titol: "Vapor Aymerich (Terrassa)" },
            { lat: 41.5613, lng: 2.0105, titol: "Casa Alegre de Sagrera (Terrassa)" },
            { lat: 41.5633, lng: 2.0175, titol: "Magatzem Corcoy (Terrassa)" },
            { lat: 41.5608, lng: 2.0127, titol: "Teatre Principal (Terrassa)" },
            { lat: 41.5636, lng: 2.0114, titol: "Mercat de la Independència (Terrassa)" },
            { lat: 41.5621, lng: 2.0135, titol: "Farmàcia Albinyana (Terrassa)" },
            { lat: 41.5587, lng: 2.0163, titol: "Gran Casino (Terrassa)" },
            { lat: 41.5658, lng: 2.0053, titol: "Parc de Desinfecció (Terrassa)" }
        ];

        const markers = []; // Array per guardar els marcadors

        llocs.forEach(lloc => {
            const marker = L.marker([lloc.lat, lloc.lng]).addTo(map)
                .bindPopup(`<b>${lloc.titol}</b>`);
            markers.push(marker);
        });

        // Ajustar el mapa per veure tots els punts (Barcelona + Terrassa)
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds(), { padding: [50, 50] });
        }

    }
});
