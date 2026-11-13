// SPDX-License-Identifier: AGPL-3.0-or-later
/* Teler mecànic: principi horitzontal de les millores de Cartwright,
   1787–1790. La data de 1785 identifica la primera patent, no aquest model. */
(function(){
  'use strict';
  const TAU=Math.PI*2;
  const clamp=q=>Math.max(0,Math.min(1,q));
  const ease=q=>{q=clamp(q);return q*q*(3-2*q);};
  const seg=(p,a,b)=>ease((p-a)/(b-a));
  const mix=(a,b,q)=>a+(b-a)*q;
  function state(p){
    p=clamp(p);const half=p<.5?0:1,q=p===1?1:p*2-half,sign=half===0?1:-1;
    const angle=TAU*2*p+Math.PI;
    const crank=[430,-297+35*Math.cos(angle),100+35*Math.sin(angle)];
    const y=crank[1]+Math.sqrt(180*180-(100-crank[2])**2);
    const x=mix(-325*sign,325*sign,seg(q,.30,.60));
    const shed=mix(-sign,sign,seg(q,0,.20));
    const centre=310-40*(40-y)/195,halfGap=45*Math.abs(shed)*(1-(40-y)/195);
    const kick=12*(seg(q,.30,.34)-seg(q,.34,.40));
    const wefts=[];
    if(p>=.15)wefts.push({y:p>=.5?-155:y,amount:p>=.5?1:clamp((x+270)/540),reverse:false});
    if(p>=.65)wefts.push({y:p===1?-152:y,amount:clamp((270-x)/540),reverse:true});
    const step=q<.30?0:q<.60?1:2;
    return {x,y,shed,boatY:y,boatZ:centre,upperZ:centre+halfGap,lowerZ:centre-halfGap,
      angle,camAngle:-TAU*p,crank,rodEnd:[430,y,100],half,q,step,
      pickerLeft:half===0?kick:0,pickerRight:half===1?kick:0,
      weaving:q>=.30&&q<.60,rows:Number(p>=.5)+Number(p===1),wefts,
      action:step===0?'Les lleves canvien els lliços i obren la calada':step===1?'La transmissió impulsa la llançadora':'La biela mou el batà i atapeeix la trama'};
  }
  RI.TEXTIL_ESTATS.cartwright=state;
  function camRadius(beta,sign){
    const phase=((beta-Math.PI/2)/TAU%1+1)%1;
    return 40+11*sign*state(phase).shed;
  }
  function cam(g,x,s,sign){
    const front=[],back=[],n=80;
    for(let i=0;i<n;i++){
      const b=TAU*i/n,a=b+s.camAngle,r=camRadius(b,sign);
      front.push([x+6,-210+r*Math.cos(a),100+r*Math.sin(a)]);
      back.push([x-6,-210+r*Math.cos(a),100+r*Math.sin(a)]);
    }
    g.poly(front,'iron','eix',[1,0,0],true);g.poly(back,'iron','eix',[-1,0,0],true);
    for(let i=0;i<n;i++){
      const j=(i+1)%n,a=TAU*(i+.5)/n+s.camAngle;
      g.poly([front[i],back[i],back[j],front[j]],'iron','eix',[0,Math.cos(a),Math.sin(a)],true);
    }
    const z=140+11*sign*s.shed;
    g.cyl([x,-210,z],[x,-210,z+56],3.5,'brass','eix',12);
    g.box(x-7,-218,164,14,16,10,'iron','eix');
    g.cyl([x,-210,z+56],[x,40,310+45*sign*s.shed],3,'iron','eix',12);
  }
  function gear(g,x,y,z,r,angle,teeth){
    const front=[],back=[];
    for(let i=0;i<teeth*4;i++){
      const a=angle+TAU*i/(teeth*4),rr=r+(i%4<2?2:-2);
      front.push([x+4,y+rr*Math.cos(a),z+rr*Math.sin(a)]);
      back.push([x-4,y+rr*Math.cos(a),z+rr*Math.sin(a)]);
    }
    g.poly(front,'brass','transmissio',[1,0,0],true);
    for(let i=0;i<front.length;i++){
      const j=(i+1)%front.length,a=angle+TAU*(i+.5)/front.length;
      g.poly([front[i],back[i],back[j],front[j]],'brass','transmissio',[0,Math.cos(a),Math.sin(a)],true);
    }
  }
  function build(g,p){
    const s=state(p),weaving=RI.TEXTIL_DETALLS.buildScene('llancadora',p,s);
    g.faces.push(...weaving.faces);
    for(const x of [-365,355]){
      g.box(x,-330,30,14,500,15,'oak','bastidor');
      g.box(x,-100,30,14,25,375,'oak','bastidor');
      g.box(x,-100,380,14,270,14,'oak','bastidor');
    }
    g.box(-365,-240,30,735,18,15,'oak','bastidor');
    g.cyl([-325,-297,100],[430,-297,100],7,'iron','eix',16);
    g.cyl([-325,-210,100],[385,-210,100],7,'iron','eix',16);
    for(const x of [-310,310]){
      for(const y of [-297,-210])g.box(x-10,y-13,45,20,26,55,'oak','eix');
    }
    cam(g,-300,s,-1);cam(g,300,s,1);
    gear(g,385,-297,100,29,s.angle,16);
    gear(g,385,-210,100,58,s.camAngle+Math.PI/32,32);
    g.wheel([410,-297,100],75,s.angle,'x','transmissio');
    for(const y of [-372,-222])g.line([[410,y,100],[410,y,405]],'#8d7652',3,'transmissio');
    g.cyl([430,-297,100],s.crank,5,'brass','pinta',12);
    g.cyl(s.crank,s.rodEnd,4,'iron','pinta',16);
    g.cyl(s.rodEnd,[430,s.y,278],4,'iron','pinta',12);
    g.cyl([430,s.y,278],[350,s.y,278],4,'iron','pinta',12);
    // Els mecanismes laterals actuen sobre els impulsors, sense cordill de mà.
    for(const sign of [-1,1]){
      const x=sign*350;
      g.cyl([x,-210,100],[x,s.y,272],3,'iron','caixes',10);
    }
  }
  function context(g,p){
    build(g,p);
    for(const x of [-365,355])for(const y of [-100,150])g.box(x,y,30,14,18,465,'oak','bastidor');
    for(const y of [-100,150])g.box(-365,y,480,734,18,15,'oak','bastidor');
  }
  RI.TEXTIL_DETALLS.register('cartwright',{build,context,labels:[
    ['eix','Eix i lleves',[0,-210,100],260,560],
    ['llicos','Lliços accionats',[0,40,340],300,125],
    ['llancadora','Llançadora impulsada',[0,-82,285],730,270],
    ['pinta','Biela i batà',[350,-110,180],760,450],
    ['tela','Tela entreteixida',[0,-190,210],180,390],
    ['transmissio','Energia exterior',[410,-297,140],750,150]
  ]});
  RI.CARTWRIGHT_GEOMETRIA={state,camRadius};
  RI.CARTWRIGHT_ESCENA={
    id:'cartwright',nom:'Teler mecànic',any:'1785 · patent',qui:'Edmund Cartwright',durada:18,
    pregunta:'I si la màquina coordina les tres accions de teixir?',
    intro:'Amb Kay, la persona encara mou el teler. Cartwright aplica <b>energia motriu</b> a la calada, la llançadora i la batuda. Un eix i les transmissions coordinen tot el cicle.',
    model:'Principi del teler mecànic horitzontal · millores de 1787–1790',
    innovacio:{abans:'La persona coordina mans i peus',ara:'Un mecanisme coordina el cicle de teixit'},
    fases:[
      {fins:.15,nom:'Obrir la calada',text:'L’eix gira. Les lleves actuen sobre els lliços i separen els dos grups de fils.',focus:['eix','llicos']},
      {fins:.30,nom:'Impulsar la llançadora',text:'La transmissió activa l’impulsor lateral. La llançadora travessa la calada i deixa una passada de trama.',focus:['llancadora','transmissio']},
      {fins:.50,nom:'Atapeir la trama',text:'La biela transforma el gir en moviment del batà. La pinta porta el fil nou contra la tela.',focus:['pinta','eix']},
      {fins:1,nom:'Repetir a l’altre costat',text:'S’inverteixen els lliços i la llançadora torna. El mecanisme repeteix la seqüència; la persona vigila, reposa el fil i resol les incidències.',focus:['llancadora','tela']}
    ],
    parts:{
      transmissio:{nom:'Transmissió motriu',text:'La corretja i els engranatges porten energia exterior al teler. El model no pressuposa que tots els primers telers funcionessin amb vapor.'},
      eix:{nom:'Eix i lleves',text:'L’eix sincronitza el mecanisme. Les lleves converteixen el gir en moviments alternatius que accionen els lliços.'},
      llicos:{nom:'Lliços',text:'Separar els fils de l’ordit obre la calada per a la llançadora.'},
      llancadora:{nom:'Llançadora i impulsors',text:'La barqueta porta el fil de trama. Els impulsors la llancen mecànicament d’una caixa a l’altra.'},
      pinta:{nom:'Pinta, batà i biela',text:'La biela mou el batà; la pinta atapeeix cada passada de trama.'},
      ordit:{nom:'Ordit',text:'Els fils llargs, tensats, que s’entrecreuen amb la trama.'},
      tela:{nom:'Tela',text:'La successió de passades entrecreuades forma el teixit.'},
      bastidor:{nom:'Bastidor',text:'Subjecta i alinea els elements del teler.'}
    },
    clau:'La innovació és coordinar mecànicament el cicle de teixit. La seva difusió va necessitar dècades de millores.',
    batx:{titol:'1785 és la primera patent',text:'El primer prototip tenia l’ordit vertical. Aquí es representa el principi horitzontal de les millores de 1787–1790, amb dimensions i transmissions simplificades. Els primers telers eren poc fiables i l’expansió va ser gradual. Mecanitzar no eliminava la necessitat de treballadors ni millorava automàticament les seves condicions.',font:'https://www.fadedpage.com/books/20180140/html.php',fontNom:'J. M. Strickland (1843) · descripció i gravat de 1790'},
    real:{img:'img/real-cartwright-1790.jpg',titol:'Part del teler de Cartwright de 1790',museu:'Gravat publicat a la memòria de J. M. Strickland (1843)',lic:'Obra de domini públic · digitalització de Faded Page'}
  };
})();
