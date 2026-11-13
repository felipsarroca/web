// SPDX-License-Identifier: AGPL-3.0-or-later
RI.RODA_ESCENA = {
  id:'roda', nom:'La roda de filar', any:'abans de la mecanització', qui:'Treball manual · roda amb pedal', durada:12,
  model:'Roda de filar amb pedal i aleta · un sol fil',
  pregunta:'Com converteixes un floc de cotó en un fil?',
  intro:'Les mans estiren la fibra; la roda fa girar l’aleta que la torça. La bobina recull el fil. Amb aquesta roda es treballa <b>un sol fil cada vegada</b>.',
  svg:()=>RI.TEXTIL_MODELS.svg('roda'), anima:RI.TEXTIL_MODELS.anima('roda'),
  fases:[
    {fins:.25,nom:'El pedal fa girar la roda',text:'El peu mou el pedal. La biela transmet aquest moviment al manubri de la roda i la fa girar.',focus:['pedal','roda']},
    {fins:.5,nom:'La corretja transmet el gir',text:'La corretja uneix la roda gran amb les politges petites del conjunt de filatura.',focus:['corretja','aleta']},
    {fins:.75,nom:'Les mans estiren; l’aleta torça',text:'La persona deixa passar poca fibra, l’estira amb els dits i controla el gruix. El gir de l’aleta dona torsió al fil.',focus:['fibra','aleta']},
    {fins:1,nom:'La bobina recull un sol fil',text:'La diferència de gir entre l’aleta i la bobina permet enrotllar el fil. Aquestes accions es combinen mentre es fila.',focus:['aleta']}
  ],
  parts:{
    bastidor:{nom:'Banc i suports',text:'Mantenen alineades la roda i el conjunt de filatura.'},
    pedal:{nom:'Pedal i biela',text:'Permeten moure la roda amb el peu i deixar les mans lliures per estirar la fibra.'},
    roda:{nom:'Roda motriu',text:'El volant manté el gir i acciona la transmissió.'},
    corretja:{nom:'Corretja',text:'Porta el moviment de la roda a les politges del conjunt d’aleta i bobina.'},
    aleta:{nom:'Aleta i bobina',text:'L’aleta torça la fibra i guia el fil; la bobina el recull. Giren amb una petita diferència de velocitat.'},
    fibra:{nom:'Fibra i fil',text:'La fibra de cotó és curta i solta. Estirant-la i torçant-la s’obté un fil continu.'}
  },
  clau:'Una roda, una persona i un sol fil: aquest és el punt de partida per entendre la Jenny.',
  batx:{titol:'Estirar, tòrcer i enrotllar',text:'El pedal allibera les mans, però el gruix del fil continua depenent de l’habilitat de la persona. La Jenny multiplicarà els fusos; els corrons de la Water Frame mecanitzaran l’estiratge.',font:'https://collection.sciencemuseumgroup.org.uk/objects/co44835/saxony-wheel-late-18th-century',fontNom:'Science Museum Group · roda de Saxònia'}
};
