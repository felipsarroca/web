document.addEventListener('DOMContentLoaded', () => {
    const webs = [
        {
            title: 'El Modernisme',
            folder: 'https://ja.cat/elmodernisme',
            image: 'Modernisme/img/masia-freixa.jpg',
            icon: 'Modernisme/favicon.svg',
            label: 'Art, història i patrimoni',
            description: 'Recurs educatiu per descobrir el Modernisme: context, arquitectura, arts, autors, obres i mapa interactiu.'
        },
        {
            title: 'Terrassa lúdic',
            folder: 'https://ja.cat/terrassaludic',
            image: 'Terrassa-Lúdic/assets/parc-vallparadis.jpg',
            icon: 'Terrassa-Lúdic/assets/favicon.svg',
            label: 'Sortides i activitats',
            description: 'Propostes d’activitats lúdiques a Terrassa, agrupades per espais i pensades per comparar opcions de sortida.'
        }
    ];

    const container = document.getElementById('webs-container');
    if (!container) return;

    webs.forEach((web) => {
        const article = document.createElement('article');
        article.className = 'web-card';

        article.innerHTML = `
            <a href="${web.folder}" class="web-card-link" aria-label="Obrir ${web.title}">
                <div class="web-card-content">
                    <img src="${web.icon}" alt="" class="web-card-icon" loading="lazy">
                    <p class="web-card-label">${web.label}</p>
                    <h2>${web.title}</h2>
                    <p>${web.description}</p>
                    <span class="web-card-action">Obrir el web</span>
                </div>
            </a>
        `;

        container.appendChild(article);
    });
});
