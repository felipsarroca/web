# Versió anterior de les animacions del cotó

Còpia conservada abans de la revisió mecànica i didàctica, a petició de Felip, el 13 de novembre de 2026. Inclou els HTML, el codi, els estils i les imatges necessaris per obrir la versió anterior. `manifest.json` conserva la revisió de Git i els SHA-256 originals; els fitxers copiats s'han comprovat byte a byte.

Per comparar-la amb la nova, obre [textil.html](textil.html). Amb el servidor local del projecte al port 4173, visita:

`http://localhost:4173/versions/2026-11-13-coto-abans-revisio/textil.html`

Per restaurar només l'apartat del cotó i les seves imatges modificades, executa des de l'arrel del projecte:

```powershell
python versions/2026-11-13-coto-abans-revisio/restaura.py
python versions/2026-11-13-coto-abans-revisio/restaura.py --aplica
```

La primera ordre només enumera els fitxers. La segona comprova els originals conservats i els copia de nou a la ubicació de treball. No elimina els fitxers nous, no fa commits i no publica res. Per recuperar tota la interfície anterior, també s'han conservat `js/nucli.js` i `css/estil.css`, però no es restauren automàticament perquè són compartits pels altres capítols.
