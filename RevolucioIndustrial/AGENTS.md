# La Revolució Industrial

- Llegeix `VISIO-I-GUIO.md` abans de canviar el web; conserva-hi les decisions i l'estat del projecte.
- Web publicat a `https://ja.cat/revindustrial`, per projectar a l'aula i consultar a casa.
- Explica el funcionament intern de les innovacions amb animacions, infografies i vistes detallades; prioritza claredat i rigor històric.
- Dos nivells: 4t d'ESO visual i 1r de Batxillerat amb anàlisi de fonts.
- El moviment obrer i les condicions de vida queden fora de l'abast, llevat del context imprescindible per entendre fàbrica i economia.
- Contrasta les reconstruccions i els esquemes amb models històrics; diferencia visualment les fonts reals de les recreacions.
- Conserva l'adaptació a pantalla gran, 1366 × 768 i mòbil. Verifica els canvis visualment.
- El `README.md` conté l'enllaç públic i les captures. Respecta la llicència doble, els identificadors SPDX i el formulari d'errors.
- Les làmines de màquina muntada i vista explotada són imatges generades; un SVG no és prou realista per representar la «màquina real». Les vistes explotades conserven la forma de l'objecte, separen clarament els conjunts principals i indiquen només el nom i la funció breu de les parts importants.
- Els esquemes animats de «Moviment» es milloren dins la mateixa vista: no hi afegeixis comparacions «Abans i ara», modes ni pestanyes noves. Abans d'un canvi gran, conserva la versió anterior a `versions/AAAA-MM-DD-…` sense enllaçar-la des del web.
- No afegeixis cap comparador entre diagrama i fotografia ni selector de punts de vista. Usa una sola perspectiva obliqua per màquina.
- El visor 3D usa models Blender en `.glb`: botó «3D» a la dreta de «Moviment» i finestra emergent amb pantalla completa. Tota la web ha de funcionar amb tacte. Les animacions són lentes i tenen una barra de progrés lliscant i un control de velocitat visible. Comprimeix els models nous amb `python assets/optimitza_models.py`.
- Mantén l'estètica actual de colors pastel i línies fines. «La idea clau» va en lletra fina, no en negreta.
- Els mapes fets amb QGIS s'han d'entendre d'un cop d'ull. Si un mapa nou no supera l'anterior, conserva l'anterior.
- Hi poden treballar diversos agents alhora: abans de tocar res, mira `git status` i `REDISSENY.md`; no desfacis ni comprimeixis fitxers d'un altre agent. Només publica canvis d'altres agents quan Felip ho demani.
