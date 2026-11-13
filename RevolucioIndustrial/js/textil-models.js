// SPDX-License-Identifier: AGPL-3.0-or-later
/* Una sola projecció obliqua, compartida per totes les peces del mecanisme.
   Les rotacions es calculen en l'espai: una roda obliqua conserva el seu pla. */
(function () {
  'use strict';
  const V = (a,b) => a.map((v,i)=>v+b[i]);
  const sub = (a,b) => a.map((v,i)=>v-b[i]);
  const mul = (a,k) => a.map(v=>v*k);
  const dot = (a,b) => a.reduce((s,v,i)=>s+v*b[i],0);
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const unit = a => mul(a,1/(Math.hypot(...a)||1));
  const lerp = (a,b,t) => a+(b-a)*t;
  const smooth = t => { t=Math.max(0,Math.min(1,t)); return t*t*(3-2*t); };
  const jennyTravel=p=>p<.2?lerp(80,110,smooth(p/.2)):p<.6?lerp(110,265,smooth((p-.2)/.4)):lerp(265,80,smooth((p-.6)/.4));
  const muleTravel=p=>p<.45?lerp(-85,-300,smooth(p/.45)):p<.6?lerp(-300,-335,smooth((p-.45)/.15)):lerp(-335,-85,smooth((p-.6)/.4));
  const project = ([x,y,z]) => [.94*x+.48*y, .12*x-.29*y-.96*z];
  const depth = ([x,y,z]) => .3*x+.8*y-.5*z;
  const palette = {oak:'#b7824c',end:'#89603a',iron:'#687780',brass:'#c5a35d',cotton:'#f4ecda',dark:'#36454a',red:'#b85f41'};
  function shade(hex,n){ const k=.83+.30*Math.max(0,dot(unit(n),unit([-.4,-.5,1]))); return '#'+hex.slice(1).match(/../g).map(c=>Math.min(255,Math.round(parseInt(c,16)*k)).toString(16).padStart(2,'0')).join(''); }
  class Scene {
    constructor(){this.faces=[];}
    poly(points,mat='oak',part='',normal=[0,-1,0]){
      if(dot(normal,[-.3,-.8,.5]) < -.001) return;
      this.faces.push({points,fill:shade(palette[mat]||mat,normal),part,grain:mat==='oak',d:points.reduce((s,p)=>s+depth(p),0)/points.length});
    }
    line(points,color='#735c3c',width=3,part='',dash=''){
      this.faces.push({points,color,width,part,d:points.reduce((s,p)=>s+depth(p),0)/points.length-.15,dash});
    }
    box(x,y,z,w,d,h,mat='oak',part=''){
      const p=[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z],[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]];
      this.poly([p[0],p[3],p[7],p[4]],mat,part,[-1,0,0]);
      this.poly([p[0],p[4],p[5],p[1]],mat,part,[0,-1,0]);
      this.poly([p[4],p[7],p[6],p[5]],mat,part,[0,0,1]);
    }
    cyl(a,b,r,mat='iron',part='',n=20){
      const axis=unit(sub(b,a)), u=unit(cross(axis,Math.abs(axis[2])<.8?[0,0,1]:[0,1,0])),v=cross(axis,u), rings=[[],[]];
      for(let i=0;i<n;i++){const off=V(mul(u,r*Math.cos(i*2*Math.PI/n)),mul(v,r*Math.sin(i*2*Math.PI/n)));rings[0].push(V(a,off));rings[1].push(V(b,off));}
      for(let i=0;i<n;i++){const j=(i+1)%n;this.poly([rings[0][i],rings[0][j],rings[1][j],rings[1][i]],mat,part,sub(V(rings[0][i],rings[0][j]),mul(a,2)));}
      this.poly(rings[0],mat,part,mul(axis,-1));this.poly(rings[1],mat,part,axis);
    }
    wheel(c,r,angle,axis='y',part='roda',mat='oak'){
      const at=(a,rr,off=0)=>axis==='y'?V(c,[Math.cos(a)*rr,off,Math.sin(a)*rr]):V(c,[off,Math.cos(a)*rr,Math.sin(a)*rr]);
      const n=40;
      for(let i=0;i<n;i++){
        const a=i*2*Math.PI/n,b=(i+1)*2*Math.PI/n;
        this.poly([at(a,r,-8),at(b,r,-8),at(b,r-12,-8),at(a,r-12,-8)],mat,part,axis==='y'?[0,-1,0]:[-1,0,0]);
        this.poly([at(a,r,-8),at(a,r,8),at(b,r,8),at(b,r,-8)],mat,part,sub(at((a+b)/2,r),c));
      }
      for(let i=0;i<8;i++)this.cyl(at(angle+i*Math.PI/4,14),at(angle+i*Math.PI/4,r-12),5,mat,part,8);
      this.cyl(at(0,0,-17),at(0,0,17),19,'brass',part);
    }
    bobbin(x,y,z,h=90,r=18,part='fusos',angle=0){
      this.cyl([x,y,z-12],[x,y,z+h+15],4,'iron',part,10);
      this.cyl([x,y,z],[x,y,z+h],r,'cotton',part);
      this.cyl([x,y,z-4],[x,y,z+2],r+6,'brass',part);
      this.cyl([x,y,z+h],[x,y,z+h+5],r+6,'brass',part);
      const a=angle;
      this.line([[x+Math.cos(a)*r,y+Math.sin(a)*r,z+5],[x+Math.cos(a+.4)*r,y+Math.sin(a+.4)*r,z+h-4]],'#bdb19a',1.3,part);
    }
    thread(points,t,part='fil',thick=2.8){
      const weft=part==='llancadora';
      this.line(points,weft?'#914f37':'#c2a46a',thick+2,part);
      this.line(points,weft?'#d5724e':'#fff9e9',thick,part);
      this.line(points,weft?'#f8d19b':'#b89349',1,part,'5 13');
      this.faces[this.faces.length-1].offset=-(t*32)%18;
    }
  }
  function base(g,w=640,d=280,h=160,part='bastidor'){
    for(const x of [-w/2,w/2-28])for(const y of [-d/2,d/2-28])g.box(x,y,0,28,28,h,'oak',part);
    for(const y of [-d/2,d/2-22])g.box(-w/2,y,h-30,w,22,30,'oak',part);
    for(const x of [-w/2,w/2-22])g.box(x,-d/2,h-30,22,d,30,'oak',part);
  }
  const models={
    llancadora(g,p,t){
      base(g,640,330,500);
      for(const x of [-320,295])g.box(x,-165,65,25,330,22);
      g.cyl([-290,135,295],[290,135,295],33,'cotton','ordit');
      g.cyl([-290,-150,175],[290,-150,175],38,'cotton','tela');
      const signed=p<.12?lerp(-25,25,smooth(p/.12)):p<.46?25:p<.62?lerp(25,-25,smooth((p-.46)/.16)):-25;
      const shed=Math.sign(signed)||1;
      const beat=p>.36&&p<.5?Math.sin((p-.36)/.14*Math.PI)*34:p>.86?Math.sin((p-.86)/.14*Math.PI)*34:0;
      const open=Math.abs(signed);
      const shuttle=p<.17?-300:p<.36?lerp(-300,300,smooth((p-.17)/.19)):p<.67?300:p<.86?lerp(300,-300,smooth((p-.67)/.19)):-300;
      for(let i=0;i<26;i++){
        const x=-273+i*21.8,z=300+(i%2?1:-1)*open*shed;
        g.thread([[x,130,298],[x,40,z],[x,-80,298],[x,-146,277]],t,'ordit',1.8);
      }
      for(const sign of [-1,1]){
        const z=300+sign*open*shed;
        g.box(-284,40+sign*14,z-67,568,7,8,'oak','llicos');
        g.box(-284,40+sign*14,z+58,568,7,8,'oak','llicos');
        for(let i=0;i<13;i++)g.line([[-260+i*43,40+sign*14,z-60],[-260+i*43,40+sign*14,z+58]],'#82786a',1,'llicos');
      }
      const by=-82-beat;
      for(const x of [-292,292])g.cyl([x,-82,480],[x,by,285],5,'iron','pinta',8);
      g.box(-304,by-12,271,608,28,18,'oak','pinta');
      g.box(-284,by,365,568,10,13,'oak','pinta');
      for(let i=0;i<32;i++)g.line([[-273+i*17.6,by,289],[-273+i*17.6,by,365]],'#7d8583',1.5,'pinta');
      for(const x of [-345,300]){g.box(x,by-18,290,45,40,30,'oak','caixes');g.box(x+7,by-10,297,31,26,23,'dark','caixes');}
      g.poly([[-275,-140,277],[275,-140,277],[275,-151,177],[-275,-151,177]],'cotton','tela',[0,-1,1]);
      for(let i=0;i<15;i++)g.line([[-270+i*38,-141,277],[-270+i*38,-151,180]],'#d8c8a6',.7,'tela');
      g.poly([[shuttle-30,by-3,299],[shuttle,by-14,299],[shuttle+30,by-3,299],[shuttle,by+9,299]],'brass','llancadora',[0,0,1]);
      g.cyl([shuttle-14,by-3,303],[shuttle+14,by-3,303],5,'cotton','llancadora',10);
      g.thread([[-277,by,298],[shuttle,by,300]],t,'llancadora',2.2);
      g.line([[-320,by,305],[-150,-210,240],[0,-210,235],[150,-210,240],[320,by,305]],'#725f43',2.4,'cordill');
    },
    jenny(g,p,t){
      base(g,690,500,170);
      for(const x of [-320,295])g.box(x,-210,170,22,450,18);
      const travel=jennyTravel(p);
      g.cyl([-310,-180,185],[360,-180,185],14,'iron','corda');
      for(let i=0;i<8;i++){
        const x=-270+i*77;
        g.bobbin(x,-170,200,105,13,'fusos',t*4);
        g.bobbin(x,220,175,45,22,'metxes',t*.2);
        g.thread([[x,220,228],[x,travel,315]],t,'metxes',4);
        g.thread([[x,travel,315],[x,-170,316]],t,'fusos',p<.2?3:1.8);
        g.cyl([x,-180,178],[x,-170,202],5,'brass','corda',8);
      }
      g.box(-309,travel-10,294,618,20,17,'oak','pinca');
      g.box(-309,travel-10,313+(p<.2?10:0),618,20,12,'oak','pinca');
      for(const x of [-300,288])g.box(x,travel-10,170,12,20,124);
      g.wheel([365,-160,270],125,t*2,'x','roda');
      g.wheel([365,-180,185],25,t*10,'x','corda','iron');
      g.line([[365,-284,270],[365,-203,185]],'#715a36',3,'corda');
      g.line([[365,-35,270],[365,-155,185]],'#715a36',3,'corda');
    },
    water(g,p,t){
      base(g,620,210,560);
      g.box(-310,-105,200,620,25,25,'oak','bastidor');
      for(let i=0;i<4;i++)g.bobbin(-225+i*150,15,480,70,28,'metxa',t*.3);
      for(let j=0;j<3;j++){
        const z=430-j*57;
        for(const y of [-28,12]){
          g.cyl([-280,y,z],[280,y,z],17,'iron','corrons');
          // La marca gira dins del pla del corró, sense deformar-ne l'eix.
          const a=t*(j+1)*1.8;
          g.line([[-278,y+17*Math.cos(a),z+17*Math.sin(a)],[278,y+17*Math.cos(a),z+17*Math.sin(a)]],'#b5bfc2',2,'corrons');
        }
      }
      for(let i=0;i<4;i++){
        const x=-225+i*150,a=t*5;
        g.bobbin(x,-10,190,87,20,'aleta',a);
        const arm=[x+34*Math.cos(a),-10+34*Math.sin(a),280];
        g.cyl([x,-10,306],arm,3,'brass','aleta',8);
        g.cyl(arm,[arm[0],arm[1],187],3,'brass','aleta',8);
        g.thread([[x,15,482],[x,-8,430],[x,-8,373],[x,-8,316],[x,-10,306],arm,[x+20*Math.cos(a),-10+20*Math.sin(a),235]],t,'aleta',2.1);
      }
      g.cyl([-285,10,158],[340,10,158],11,'iron','aigua');
      g.wheel([345,10,385],116,t*1.4,'x','aigua','iron');
      g.wheel([345,10,158],27,t*5,'x','aigua','iron');
      g.line([[345,-106,385],[345,-17,158]],'#705b3a',4,'aigua');g.line([[345,126,385],[345,37,158]],'#705b3a',4,'aigua');
      for(const x of [-280,280])g.cyl([x,10,155],[x,10,440],6,'iron','aigua',10);
    },
    mula(g,p,t){
      const travel=muleTravel(p);
      base(g,660,170,390);
      for(const x of [-290,270])g.box(x,-390,5,14,520,12,'iron','carro');
      for(let i=0;i<6;i++)g.bobbin(-250+i*100,45,320,60,23,'fileta',p<.45?t*.3:0);
      for(const y of [-22,12])g.cyl([-285,y,278],[285,y,278],18,'iron','corrons');
      const angle=p<.45?t*3:4;
      g.line([[-285,-22+18*Math.cos(angle),278+18*Math.sin(angle)],[285,-22+18*Math.cos(angle),278+18*Math.sin(angle)]],'#b7c2c5',3,'corrons');
      g.box(-315,travel-28,68,630,56,22,'oak','carro');
      for(const x of [-280,280]){g.wheel([x,travel,34],28,t,'x','carro','iron');g.box(x-8,travel-12,34,16,24,36,'oak','carro');}
      for(let i=0;i<6;i++){
        const x=-250+i*100;
        g.bobbin(x,travel,91,95,13,'fus',t*5);
        g.thread([[x,45,325],[x,-5,278],[x,travel,197]],t,'fus',1.8);
      }
      g.wheel([342,travel,220],125,t*1.5,'x','roda','iron');
      g.cyl([-285,travel,75],[342,travel,75],8,'iron','carro');
    },
    roda(g,p,t){
      base(g,650,150,145);
      g.box(-325,-75,145,650,150,25);
      const c=[200,55,325],a=t*1.1;
      for(const y of [-12,100])g.box(185,y,170,25,15,158,'oak','roda');
      g.wheel(c,155,a,'y','roda');
      const crank=[200+32*Math.cos(a),-12,325+32*Math.sin(a)];
      const foot=[180,-12,crank[2]-Math.sqrt(275*275-(crank[0]-180)**2)];
      g.cyl([200,-12,325],crank,5,'iron','pedal',10);g.cyl(crank,foot,5,'oak','pedal',10);
      g.cyl([-180,-12,45],foot,10,'oak','pedal',10);
      g.poly([[-180,-48,45],[180,-48,foot[2]],[180,24,foot[2]],[-180,24,45]],'oak','pedal',[0,0,1]);
      for(const y of [-112,90])g.box(-260,y,170,24,16,160,'oak','aleta');
      g.cyl([-248,-105,325],[-248,110,325],4,'iron','aleta');
      g.cyl([-248,-60,325],[-248,20,325],15,'cotton','aleta');
      for(const y of [-65,20])g.cyl([-248,y,325],[-248,y+5,325],24,'brass','aleta');
      g.cyl([-248,48,325],[-248,54,325],25,'oak','aleta');
      g.cyl([-248,62,325],[-248,68,325],22,'oak','aleta');
      const rot=t*6,hook=[-248+36*Math.cos(rot),-20,325+36*Math.sin(rot)];
      g.cyl([-248,-100,325],[hook[0],-80,hook[2]],3,'iron','aleta',8);
      g.cyl([hook[0],-80,hook[2]],[hook[0],40,hook[2]],3,'iron','aleta',8);
      g.cyl([hook[0],40,hook[2]],[-248,68,325],3,'iron','aleta',8);
      // Corretja oberta: tangents exteriors de les dues politges.
      for(const [y,r] of [[51,25],[65,22]]){
        const nx=(155-r)/448,nz=Math.sqrt(1-nx*nx);
        for(const sign of [-1,1])g.line([[200-155*nx,y,325+sign*155*nz],[-248-r*nx,y,325+sign*r*nz]],'#705a38',2.2,'corretja');
      }
      g.thread([[-430,-100,335],[-325,-100,330],[-248,-100,325],hook,[-248+15*Math.cos(rot),-20,325+15*Math.sin(rot)]],t,'fibra',3);
      for(let i=0;i<7;i++)g.line([[-446,-105+i*2,330+i*2],[-387,-85,333]],'#d6c7aa',2.5,'fibra');
    }
  };
  const fits={};
  const anchors={
    llancadora:[['ordit',250,76,[-200,130,298]],['pinta',1030,220,[240,-90,340]],['llancadora',1010,445,[0,-85,300]],['caixes',135,430,[-320,-85,305]],['tela',590,640,[0,-150,210]]],
    jenny:[['metxes',270,76,[-100,220,225]],['pinca',980,145,[0,220,315]],['fusos',500,640,[0,-170,280]],['roda',1080,405,[365,-160,270]],['corda',920,610,[160,-180,185]]],
    water:[['metxa',440,65,[-75,15,520]],['corrons',155,280,[-240,-20,380]],['aleta',650,635,[60,-10,240]],['aigua',1050,220,[345,10,385]]],
    mula:[['fileta',245,70,[-100,45,355]],['corrons',740,100,[100,0,278]],['carro',500,640,[0,-240,85]],['fus',1080,430,[180,-240,160]]],
    roda:[['fibra',170,190,[-390,-85,333]],['aleta',330,70,[-248,35,325]],['roda',1010,150,[200,20,390]],['corretja',630,65,[-30,20,420]],['pedal',650,640,[100,-12,70]]]
  };
  function getFit(id){
    if(fits[id])return fits[id];
    const points=[];
    for(const p of [0,.18,.4,.58,.8]){const g=new Scene();models[id](g,p,p*10);g.faces.forEach(f=>points.push(...f.points.map(project)));}
    const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
    const s=Math.min(1060/w,550/h);
    return fits[id]={s,x:600-(x+w/2)*s,y:350-(y+h/2)*s};
  }
  function render(id,p,t,k=0,sel=null,focus=[]){
    const g=new Scene();models[id](g,p,t);const fit=getFit(id);
    const shapes=g.faces.sort((a,b)=>b.d-a.d).map(f=>{
      const pts=f.points.map(project).map(v=>v.map(n=>n.toFixed(2)).join(',')).join(' ');
      const attr=f.part?` data-part="${f.part}" class="${sel===f.part?'sel':focus.includes(f.part)?'foc':''}"`:'';
      return f.color?`<polyline${attr} points="${pts}" fill="none" stroke="${f.color}" stroke-width="${f.width}" stroke-linecap="round" stroke-linejoin="round"${f.dash?` stroke-dasharray="${f.dash}" stroke-dashoffset="${f.offset||0}"`:''}/>`:`<polygon${attr} points="${pts}" fill="${f.fill}" stroke="#554b3d" stroke-opacity=".5" stroke-width="1.1" stroke-linejoin="round"/>${f.grain?`<polygon points="${pts}" fill="url(#tx-grain)" opacity=".12" pointer-events="none"/>`:''}`;
    }).join('');
    const e=RI.TEXTIL_ESCENES&&RI.TEXTIL_ESCENES[id];
    const labels=(anchors[id]||[]).map(([part,x,y,fixed])=>{
      const anchor=[...fixed];
      if(id==='jenny'&&part==='pinca')anchor[1]=jennyTravel(p);
      if(id==='mula'&&(part==='carro'||part==='fus'))anchor[1]=muleTravel(p);
      if(id==='llancadora'){
        const beat=p>.36&&p<.5?Math.sin((p-.36)/.14*Math.PI)*34:p>.86?Math.sin((p-.86)/.14*Math.PI)*34:0;
        if(['pinta','caixes','llancadora'].includes(part))anchor[1]=-82-beat;
        if(part==='llancadora')anchor[0]=p<.17?-300:p<.36?lerp(-300,300,smooth((p-.17)/.19)):p<.67?300:p<.86?lerp(300,-300,smooth((p-.67)/.19)):-300;
      }
      const at=project(anchor),ax=fit.x+at[0]*fit.s,ay=fit.y+at[1]*fit.s;
      const name=e&&e.parts[part]?e.parts[part].nom:part,w=name.length*7.4+22;
      return `<g class="etq ${focus.includes(part)?'foc':''} ${sel===part?'sel':''}" data-part="${part}"><line x1="${x}" y1="${y}" x2="${ax.toFixed(2)}" y2="${ay.toFixed(2)}"/><circle cx="${ax.toFixed(2)}" cy="${ay.toFixed(2)}" r="3"/><rect x="${x-w/2}" y="${y-14}" width="${w}" height="28" rx="7"/><text x="${x}" y="${y+5}" text-anchor="middle">${name}</text></g>`;
    }).join('');
    return `<g transform="translate(${fit.x.toFixed(2)} ${fit.y.toFixed(2)}) scale(${fit.s.toFixed(4)})">${shapes}</g>${labels}`;
  }
  RI.TEXTIL_MODELS={
    svg(id){return RI.svg(`<defs><pattern id="tx-grain" width="34" height="17" patternUnits="userSpaceOnUse"><path d="M0 3Q17 1 34 4M0 11Q17 14 34 10" fill="none" stroke="#fff2cd" stroke-width="1"/></pattern></defs><rect x="-60" width="1320" height="720" fill="#fcf8ef"/><ellipse cx="600" cy="631" rx="420" ry="22" fill="#9b8058" opacity=".10"/><g id="tx-scene">${render(id,0,0)}</g>`).replace('class="esc"','class="esc tx-model"');},
    anima(id){return ({p,t,k,svg,sel})=>{const frame=Math.floor(t*24),stamp=id+':'+frame+':'+k+':'+sel;if(svg.dataset.txFrame===stamp)return;svg.dataset.txFrame=stamp;const e=RI.TEXTIL_ESCENES[id];svg.querySelector('#tx-scene').innerHTML=render(id,p,t,k,sel,(e.fases[k]||{}).focus||[]);};}
  };
})();
