# El comerç de les espècies

- Web públic de contingut a `web/Especies`, publicat a `https://ja.cat/especies`. La targeta és a `web/script.js`.
- Consulta `README.md` i el quadern NotebookLM del tema per a l'abast dels continguts.
- Mantén els capítols en pestanyes (`data-tab`), amb poc desplaçament vertical. Capçaleres compactes: il·lustració dreta de 340 px en pantalla gran i 150 px en mòbil; sense etiquetes sota el títol ni peu de fonts. Les fonts són a «Glossari i fonts».
- Usa icones de línia coherents, sense emojis. Els símbols tipogràfics funcionals es poden mantenir.
- `js/comu.js` adapta la vista a la finestra (`fitScale`) i desa el progrés a `localStorage` amb la clau `especies:v1`. Verifica 1920, 1366 × 768 i mòbil sense desplaçament horitzontal.
- Els mapes són dades i codi (`mapa.js`, `mapes-dades.js`). No generis geografia amb IA.
- Versiona els enllaços CSS i JS amb `?v=` perquè es vegin els canvis publicats.
- `.gitignore` exclou originals de generació i composició; publica només els recursos finals lleugers. Respecta la llicència doble, els identificadors SPDX, `LICENSE` i el formulari d'errors.
- Si GitHub Pages queda encallat, comprova l'execució abans de tornar-la a llançar.
