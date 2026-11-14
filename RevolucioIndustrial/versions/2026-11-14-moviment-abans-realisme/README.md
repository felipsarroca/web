# Esquemes en moviment abans de la revisió de realisme

Còpia de seguretat del 14 de novembre de 2026, feta a petició de Felip abans de refer els esquemes animats (SVG). No s'enllaça des del web: només serveix per no perdre els dissenys anteriors si els nous no els milloren.

- `originals/`: còpia exacta de tots els fitxers HTML, JS i CSS de la revisió de Git indicada a `manifest.json`, amb les empremtes SHA-256.
- La resta de la carpeta és la mateixa versió, navegable: obre [`index.html`](index.html). Fa servir les imatges de `../../img/`, que aquesta revisió no modifica.

## Recuperar un esquema

Copia el fitxer corresponent d'`originals/js/` a `js/` (per exemple, `originals/js/vapor.js` per als tres esquemes del vapor). Per recuperar-ho tot, copia el contingut d'`originals/` a l'arrel del projecte. També es pot recuperar amb Git: `git checkout 4a5c8d6 -- RevolucioIndustrial/js RevolucioIndustrial/css`.
