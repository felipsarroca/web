// SPDX-License-Identifier: AGPL-3.0-or-later
// Reconstruccions il·lustrades amb ChatGPT. Les fotografies històriques són a cada capítol.
RI.ILLUSTRACIONS = {
  roda: '../../img/illustration-roda-fus.webp',
  newcomen: '../../img/illustration-newcomen.webp',
  watt: '../../img/illustration-watt.webp',
  rotativa: '../../img/illustration-rotativa.webp',
  llancadora: '../../img/illustration-llancadora.webp',
  jenny: '../../img/illustration-jenny.webp',
  water: '../../img/illustration-water.webp',
  mula: '../../img/illustration-mula.webp',
  cartwright: '../../img/illustration-cartwright.webp',
  rocket: '../../img/illustration-rocket.webp',
  sembradora: '../../img/illustration-sembradora.webp',
  arada: '../../img/illustration-arada.webp',
  bessemer: '../../img/illustration-bessemer.webp',
  western: '../../img/illustration-western.webp',
};

// Posicions sobre la làmina completa, en percentatge. Màxim cinc conjunts.
RI.LAMINA_PARTS = {
  roda:[['roda',73,31],['fus',19,54],['fibra',40,64,'Cotó cardat'],['corretja',44,24],['bastidor',42,70]],
  llancadora:[['ordit',22,34,"Plegador d’ordit"],['llicos',52,28],['pinta',54,46],['llancadora',59,52],['tela',58,65]],
  jenny:[['metxes',48,12,'Guia de metxa'],['pinca',48,23],['fusos',41,54],['roda',80,60],['corda',48,68]],
  water:[['metxa',47,12],['corrons',45,32],['aleta',44,63],['aigua',81,32,'Transmissió'],['aleta',47,80,'Banc de fusos']],
  mula:[['fileta',22,13],['corrons',23,29],['carro',56,75],['fus',53,54],['roda',83,46]],
  cartwright:[['transmissio',89,60],['eix',48,83,'Eix i lleves'],['llicos',50,27],['pinta',51,47],['tela',48,62]],
  newcomen:[['balanci',50,12],['piston',24,40],['cilindre',26,48],['caldera',26,65],['bombamina',81,68]],
  watt:[['balanci',48,12],['piston',30,43],['cilindre',31,55],['condensador',45,71],['caldera',13,63]],
  rotativa:[['balanci',43,13],['cilindre',19,61],['biela',69,38],['volant',85,54],['regulador',55,42]],
  rocket:[['caldera',33,54],['cilindre',40,58],['biela',30,70],['roda',25,75],['fogar',54,65]],
  sembradora:[['tremuja',48,28],['dosador',48,48],['roda',23,63],['tub',53,64],['rella',53,80]],
  arada:[['cama',54,59],['ganivet',46,66],['rella',51,77],['orello',64,68]],
  bessemer:[['convertidor',44,35],['eix',67,47],['toveres',50,83],['eix',79,43,'Engranatge de basculació']],
  western:[['roda',41,78],['veles',56,28],['xemeneia',42,51],['cabines',62,64]]
};
RI.EXPLOTADES = {};
for(const id of Object.keys(RI.ILLUSTRACIONS))RI.EXPLOTADES[id]={img:`../../img/exploded-${id}.webp`,parts:RI.LAMINA_PARTS[id]};
RI.EXPLOTADES.llancadora.parts=[['ordit',18,29,"Plegador d’ordit"],['llicos',52,28],['pinta',54,46],['llancadora',91,51],['tela',61,67,'Plegador de tela']];
RI.EXPLOTADES.jenny.parts=[['metxes',48,24,'Guia de metxa'],['pinca',57,11],['fusos',35,68],['roda',82,60],['corda',40,80]];
RI.EXPLOTADES.water.parts=[['metxa',48,10],['corrons',45,41],['aleta',45,66],['aigua',86,50,'Transmissió'],['aleta',43,84,'Banc de fusos']];
RI.EXPLOTADES.mula.parts=[['fileta',21,16],['corrons',23,35],['carro',54,73],['fus',52,60],['roda',86,58]];
RI.EXPLOTADES.cartwright.parts=[['transmissio',90,61],['eix',49,85,'Eix i lleves'],['llicos',50,24],['pinta',51,50],['tela',49,66]];
RI.EXPLOTADES.newcomen.parts=[['balanci',52,13],['piston',24,33],['cilindre',25,45],['caldera',25,67],['bombamina',82,69]];
RI.EXPLOTADES.watt.parts=[['balanci',52,13],['piston',29,40],['cilindre',29,55],['condensador',47,59],['caldera',13,64]];
RI.EXPLOTADES.rocket.parts=[['caldera',35,45],['cilindre',45,48],['biela',30,66],['roda',25,76],['fogar',58,51]];
RI.EXPLOTADES.sembradora.parts=[['tremuja',51,26],['dosador',51,50],['roda',20,63],['tub',55,74],['rella',55,85]];
RI.EXPLOTADES.arada.parts=[['cama',53,59],['ganivet',46,77],['rella',55,85],['orello',79,75]];
RI.EXPLOTADES.bessemer.parts=[['convertidor',46,40],['eix',69,50],['toveres',52,77],['eix',84,47,'Engranatge de basculació']];
RI.EXPLOTADES.western.parts=[['calderes',43,61],['maquina',51,62],['roda',42,84],['veles',56,28]];
RI.EXPLOTADES.roda={img:'../../img/exploded-roda-fus.webp',parts:[['roda',74,30],['fus',19,53],['fibra',40,65,'Cotó cardat'],['corretja',44,24],['bastidor',42,70]]};

RI.laminaHTML = function(e,mode){
  const mounted=mode==='muntada', data=mounted?e.laminaMuntada:e.explotada;
  if(!data)return '';
  const safe=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const items=(data.parts||[]).filter(p=>e.parts&&e.parts[p[0]]);
  const name=p=>p[3]||e.parts[p[0]].nom;
  return `<div class="lamina-plate ${mounted?'lamina-real':'lamina-exp'}" id="${mounted?'lamina-real':'lamina-exp'}" aria-label="${mounted?'Màquina muntada':'Vista explotada'}">
    <ol class="lamina-clau">${items.map((p,i)=>`<li><button type="button" data-tria="${p[0]}"><i>${i+1}</i>${safe(name(p))}</button></li>`).join('')}</ol>
    <div class="lamina-camp"><div class="lamina-zoom"><img src="${safe(data.img)}" alt="${safe(e.nom)} · ${mounted?'màquina muntada':'vista explotada amb els conjunts principals separats'}" loading="eager"><svg class="exp-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">${items.map((p,i)=>`<g class="plate-mark" data-part="${p[0]}" tabindex="0" role="button" aria-label="${safe(name(p))}"><circle cx="${p[1]*12}" cy="${p[2]*8}" r="15"/><text x="${p[1]*12}" y="${p[2]*8+5}">${i+1}</text></g>`).join('')}</svg></div></div>
  </div>`;
};
