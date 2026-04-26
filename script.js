document.addEventListener('DOMContentLoaded', () => {
    const webs = [
        {
            name: 'El Modernisme',
            path: 'https://ja.cat/elmodernisme',
            category: 'Webs educatives',
            description: 'Recurs educatiu per descobrir el Modernisme: context, arquitectura, arts, autors, obres i mapa interactiu.',
            icon: 'Modernisme/favicon.svg'
        },
        {
            name: 'Les tabes',
            path: 'https://ja.cat/tabes',
            category: 'Webs educatives',
            description: 'Web visual sobre l’origen, la preparació, les formes de joc i el valor cultural de les tabes.',
            icon: 'Tabes/assets/favicon-principal.png'
        },
        {
            name: 'Terrassa lúdic',
            path: 'https://ja.cat/terrassaludic',
            category: 'Webs educatives',
            description: 'Propostes d’activitats lúdiques a Terrassa, agrupades per espais i pensades per comparar opcions de sortida.',
            icon: 'Terrassa-Lúdic/assets/favicon.svg'
        }
    ];

    const mainContainer = document.getElementById('apps-container');
    if (!mainContainer) return;

    const websByCategory = webs.reduce((acc, web) => {
        if (!acc[web.category]) {
            acc[web.category] = [];
        }
        acc[web.category].push(web);
        return acc;
    }, {});

    Object.keys(websByCategory).forEach((category) => {
        const section = document.createElement('section');
        section.className = 'category-section mb-5';

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        section.appendChild(categoryTitle);

        const grid = document.createElement('div');
        grid.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4';

        websByCategory[category].forEach((web) => {
            const col = document.createElement('div');
            col.className = 'col d-flex';

            const fallbackIcon = `https://via.placeholder.com/64/3498db/ffffff?text=${web.name.charAt(0)}`;

            col.innerHTML = `
                <a href="${web.path}" class="card-link" target="_blank" rel="noopener noreferrer">
                    <div class="card h-100">
                        <img src="${web.icon}" class="card-img-top" alt="Icona de ${web.name}" onerror="this.onerror=null;this.src='${fallbackIcon}';">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${web.name}</h5>
                            <p class="card-text flex-grow-1">${web.description}</p>
                            <span class="card-action">Obrir el web</span>
                        </div>
                    </div>
                </a>
            `;

            grid.appendChild(col);
        });

        section.appendChild(grid);
        mainContainer.appendChild(section);
    });
});
