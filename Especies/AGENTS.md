# El comerç de les espècies

- Web públic de contingut a `web/Especies`, publicat a `https://ja.cat/especies`. La targeta és a `web/script.js`.
- Consulta `README.md` i el quadern NotebookLM del tema per a l'abast dels continguts.
- Mantén els capítols en pestanyes (`data-tab`), amb poc desplaçament vertical. Capçaleres compactes: il·lustració dreta de 340 px en pantalla gran i 150 px en mòbil, i uns 180 px en portàtils baixos (`max-height: 860px`); a sota del títol només hi va la mini cronologia (`cronos`, dades `t` i `et` de `CAPS`); sense etiquetes sota el títol ni peu de fonts. Les fonts són a «Glossari i fonts».
- Cada capítol tanca amb la resposta a la seva pregunta (`sint` de `CAPS`) i les proves del banc (`window.BANC`, amb argument `eco`, `geo` o `hum`) que es guarden per al repte. Si afegeixes una pregunta al «Posa-t’hi», indica amb `on: 'pN'` la pestanya on hi ha la resposta.
- Usa icones de línia coherents, sense emojis. Els símbols tipogràfics funcionals es poden mantenir.
- `js/comu.js` adapta la vista a la finestra (`fitScale`) i desa el progrés a `localStorage` amb la clau `especies:v1`. Verifica 1920, 1366 × 768 i mòbil sense desplaçament horitzontal.
- Les quantitats en monedes antigues porten `data-avui="quantitat moneda"` (monedes de `MONEDES` a `js/comu.js`: `dies`, `d-lon`, `sous-val`, `g-plata`, `mrs`, `ducat`). Es converteixen en temps de feina i en euros amb 1.200 € i 1.500 € al mes; el mètode es documenta a la pestanya «Monedes» de `fonts.html`. Les conversions sempre porten «≈».
- Els mapes són dades i codi (`mapa.js`, `mapes-dades.js`). No generis geografia amb IA.
- Versiona els enllaços CSS i JS amb `?v=` perquè es vegin els canvis publicats.
- `.gitignore` exclou originals de generació i composició; publica només els recursos finals lleugers. Respecta la llicència doble, els identificadors SPDX, `LICENSE` i el formulari d'errors.
- Si GitHub Pages queda encallat, comprova l'execució abans de tornar-la a llançar.
