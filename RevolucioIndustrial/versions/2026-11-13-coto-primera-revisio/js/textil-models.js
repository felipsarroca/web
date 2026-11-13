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
  const state = (id,p)=>RI.TEXTIL_ESTATS[id](p);
  const jennyTravel=p=>state('jenny',p).travel;
  const muleTravel=p=>state('mula',p).travel;
  const project = ([x,y,z]) => [.94*x+.48*y, .12*x-.29*y-.96*z];
  const depth = ([x,y,z]) => .3*x+.8*y-.5*z;
  const palette = {oak:'#cbb79a',end:'#ac9677',iron:'#859196',brass:'#bc9755',cotton:'#eee3ca',dark:'#36454a',red:'#b85f41'};
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
    cop(x,y,z,h,r,part,angle){
      this.cyl([x,y,z-8],[x,y,z+h+18],2.8,'iron',part,10);
      const levels=[[0,.45],[.16,.95],[.65,1],[1,.12]],n=16;
      for(let j=0;j<levels.length-1;j++)for(let i=0;i<n;i++){
        const at=(level,a)=>[x+r*levels[level][1]*Math.cos(a),y+r*levels[level][1]*Math.sin(a),z+h*levels[level][0]];
        const a=i*Math.PI*2/n,b=(i+1)*Math.PI*2/n;
        this.poly([at(j,a),at(j,b),at(j+1,b),at(j+1,a)],'cotton',part,[Math.cos((a+b)/2),Math.sin((a+b)/2),.1]);
      }
      const seam=[];
      for(let i=0;i<=40;i++){
        const q=i/40,rr=r*(q<.65?lerp(.6,1,q/.65):lerp(1,.12,(q-.65)/.35)),a=angle+q*20;
        seam.push([x+rr*Math.cos(a),y+rr*Math.sin(a),z+q*h]);
      }
      this.line(seam,'#baa271',.9,part);
    }
    thread(points,t,part='fil',thick=2.8){
      const weft=part==='llancadora';
      this.line(points,weft?'#914f37':'#c2a46a',thick+2,part);
      this.line(points,weft?'#d5724e':'#fff9e9',thick,part);
      this.line(points,weft?'#f8d19b':'#b89349',1,part,'5 13');
      this.faces[this.faces.length-1].offset=-(t*32)%18;
    }
    // Fibres de longitud constant: llisquen sense allargar-se com una goma.
    fibres(a,b,q,width=8,part='metxes'){
      const direction=unit(sub(b,a)),side=unit(cross(direction,[1,0,0]));
      this.line([a,b],'#b7a079',width+3,part);
      this.line([a,b],'#f2e8d3',width,part);
      const length=Math.hypot(...sub(b,a));
      for(let i=0;i<12;i++){
        const f=((i/12+q)%1+1)%1, at=V(a,mul(direction,Math.max(0,length-30)*f));
        const off=mul(side,Math.sin(i*2.4)*width*.32);
        this.line([V(at,off),V(V(at,mul(direction,30)),off)],i===4?'#a76b30':'#c4ad81',i===4?2:1,part);
      }
    }
    yarn(a,b,q,twist=1,part='fusos',width=2.8){
      this.line([a,b],'#a47831',width+1.5,part);
      this.line([a,b],'#f5d68a',width,part);
      const dir=sub(b,a),side=unit(cross(dir,[1,0,0])),pts=[];
      for(let i=0;i<=56;i++)pts.push(V(V(a,mul(dir,i/56)),mul(side,Math.sin(i*.9-q*8)*2.2*twist)));
      this.line(pts,'#946d32',.9,part);
    }
    hand(at,part='pinca'){
      const [x,y,z]=at;
      this.cyl([x-22,y-5,z],[x+12,y-5,z],9,'#e7c5a7',part,10);
      for(let i=0;i<3;i++)this.cyl([x-15+i*10,y-5,z+2],[x-15+i*10,y+14,z-4],3.5,'#e7c5a7',part,8);
      this.cyl([x+12,y-5,z],[x+25,y+1,z-12],4,'#e7c5a7',part,8);
    }
    belt(c1,c2,r1,r2,part){
      // Tangents exteriors en el pla yz; els dos eixos són paral·lels a x.
      const dy=c2[1]-c1[1],dz=c2[2]-c1[2],d=Math.hypot(dy,dz),q=(r1-r2)/d,h=Math.sqrt(1-q*q);
      for(const sign of [-1,1]){
        const ny=q*dy/d-sign*h*dz/d,nz=q*dz/d+sign*h*dy/d;
        this.line([[c1[0],c1[1]+r1*ny,c1[2]+r1*nz],[c2[0],c2[1]+r2*ny,c2[2]+r2*nz]],'#8b7451',3,part);
      }
    }
  }
  function base(g,w=640,d=280,h=160,part='bastidor'){
    for(const x of [-w/2,w/2-28])for(const y of [-d/2,d/2-28])g.box(x,y,0,28,28,h,'oak',part);
    for(const y of [-d/2,d/2-22])g.box(-w/2,y,h-30,w,22,30,'oak',part);
    for(const x of [-w/2,w/2-22])g.box(x,-d/2,h-30,22,d,30,'oak',part);
  }
  const models={
    llancadora(g,p,t){
      const s=state('llancadora',p);
      base(g,690,380,500);
      g.cyl([-290,140,310],[290,140,310],27,'cotton','ordit');
      g.cyl([-290,-190,165],[290,-190,165],35,'cotton','tela');
      for(let i=0;i<26;i++){
        const x=-273+i*21.8,z=310+(i%2?1:-1)*45*s.shed;
        g.line([[x,140,310],[x,40,z],[x,-155,270]],i%2?'#718f96':'#aab9b2',2.2,'ordit');
      }
      for(const sign of [-1,1]){
        const z=310+sign*45*s.shed;
        g.box(-284,40+sign*9,z-65,568,7,8,'oak','llicos');
        g.box(-284,40+sign*9,z+58,568,7,8,'oak','llicos');
        for(let i=0;i<13;i++)g.line([[-260+i*43,40+sign*9,z-60],[-260+i*43,40+sign*9,z+58]],'#abb3af',.8,'llicos');
      }
      // Cloth fell is fixed; the beater travels to it after the shuttle has cleared.
      const by=s.y;
      for(const x of [-307,307])g.cyl([x,-82,490],[x,by,280],4,'iron','pinta',8);
      g.box(-344,by-18,274,688,38,10,'oak','pinta');
      g.box(-300,by+8,356,600,9,12,'oak','pinta');
      for(let i=0;i<32;i++)g.line([[-273+i*17.6,by+8,283],[-273+i*17.6,by+8,356]],'#a7b0af',1,'pinta');
      for(const side of [-1,1]){
        const x=side<0?-355:300, engaged=(side<0?p<.23:p>=.65&&p<.72);
        g.box(x,by-19,282,55,42,16,'oak','caixes');
        g.box(side*(335-(engaged&&s.pull?22:0))-8,by-10,288,16,22,18,'brass','caixes');
      }
      g.poly([[-275,-155,270],[275,-155,270],[275,-190,165],[-275,-190,165]],'cotton','tela',[0,-1,1]);
      for(let i=0;i<22;i++)g.line([[-272+i*26,-155,270],[-272+i*26,-190,168]],'#d5c7ac',.6,'tela');
      // New rows are retained after beating, including alternating over/under crossings.
      const row=(y,amount)=>{
        const z=310+(270-310)*(40-y)/195;
        for(let i=0;i<25*amount;i++){
          const x=-273+i*21.8;g.line([[x,y,z+(i%2?1.8:-1.8)],[x+21.8,y,z+(i%2?-1.8:1.8)]],'#ba684b',3.2,'tela');
        }
      };
      if(p>=.18){const y=p<.4?-82:lerp(-82,-155,s.beat1);row(y,p<.38?(s.x+288)/576:1);}
      if(p>=.67){const y=p<.86?-82:lerp(-82,-152,s.beat2);row(y,p<.85?(288-s.x)/576:1);}
      const z=s.boatZ;
      g.poly([[s.x-28,-82,z],[s.x,-94,z],[s.x+28,-82,z],[s.x,-70,z]],'brass','llancadora',[0,0,1]);
      g.cyl([s.x-12,-82,z+3],[s.x+12,-82,z+3],4,'cotton','llancadora',10);
      const grip=s.pull?228:248;
      g.line([[-340,by,298],[-150,-230,250],[0,-245,grip],[150,-230,250],[340,by,298]],'#8b7250',2.5,'cordill');
      g.cyl([0,-245,grip-15],[0,-245,grip+15],6,'brass','cordill',8);g.hand([5,-258,grip+6],'cordill');
    },
    jenny(g,p,t){
      const s=state('jenny',p),travel=s.travel;
      base(g,690,640,175);
      for(const x of [-320,295])g.box(x,-210,175,22,530,18);
      g.cyl([-310,-180,185],[360,-180,185],11,'iron','corda');
      for(let i=0;i<8;i++){
        const x=-270+i*77;
        g.cop(x,-170,200,90,s.copRadius,'fusos',s.spindleAngle);
        g.bobbin(x,298,185,42,22,'metxes',s.draw*.5);
        g.fibres([x,298,235],[x,travel,315],s.draw*.3,6,'metxes');
        const a=[x,travel,315],b=[x,-170,p<.7?305:245+12*Math.sin(s.wind*12)];
        if(p<.52)g.fibres(a,b,s.draw*.55,lerp(6,2,s.draw),'fusos');
        else g.yarn(a,b,s.spindleAngle,1,'fusos',i===3?4:2.4);
        g.cyl([x,-180,178],[x,-170,202],5,'brass','corda',8);
        g.line([[x,-180,185],[x,-170,210]],'#8f754f',3,'corda');
      }
      g.box(-309,travel-10,294,618,20,17,'oak','pinca');
      g.box(-309,travel-10,s.closed?312:327,618,20,12,'brass','pinca');
      for(const x of [-300,288])g.box(x,travel-10,175,12,20,119);
      g.hand([-30,travel-18,333],'pinca');
      g.wheel([365,-160,315],105,s.angle,'x','roda');
      g.wheel([365,-180,185],25,s.driveAngle,'x','corda','iron');
      g.belt([365,-160,315],[365,-180,185],105,25,'corda');
    },
    water(g,p,t){
      const s=state('water',p);
      base(g,620,210,560);
      g.box(-310,-105,180,620,20,20,'oak','bastidor');
      for(let i=0;i<4;i++)g.bobbin(-225+i*150,15,480,55,25,'metxa',p);
      for(let j=0;j<3;j++){
        const z=430-j*57;
        [-28,12].forEach((y,n)=>{
          const a=s.pairs[j][n];
          for(let i=0;i<4;i++){
            const x=-225+i*150,start=g.faces.length;
            g.cyl([x-42,y,z],[x+42,y,z],17,'iron','corrons');
            if(n===0)g.faces.slice(start).forEach(f=>f.alpha=.45);
            g.line([[x-42,y+17*Math.cos(a),z+17*Math.sin(a)],[x+42,y+17*Math.cos(a),z+17*Math.sin(a)]],'#e6e6d9',2,'corrons');
          }
          g.cyl([-280,y,z],[280,y,z],3,'iron','corrons',8);
        });
      }
      for(let i=0;i<4;i++){
        const x=-225+i*150,a=s.flyerAngle,b=s.bobbinAngle,r=10+12*s.fill;
        const start=g.faces.length;
        g.fibres([x,15,480],[x,-8,430],p*.3,9,'metxa');
        g.fibres([x,-8,430],[x,-8,373],p*.48,6,'corrons');
        g.fibres([x,-8,373],[x,-8,316],p*.96,3.2,'corrons');
        // The front roller is cut away; keep its fibre path legible through it.
        g.faces.slice(start).forEach(f=>f.d=-10000+i);
        g.bobbin(x,-10,190,87,r,'aleta',b);
        const arm=[x+34*Math.cos(a),-10+34*Math.sin(a),280],end=[arm[0],arm[1],194];
        g.cyl([x,-10,306],arm,3,'brass','aleta',8);
        g.cyl(arm,end,3,'brass','aleta',8);
        const hook=[arm[0],arm[1],210+50*p];
        g.yarn([x,-8,316],[x,-10,306],a,1,'aleta',2.4);
        g.thread([[x,-10,306],arm,hook,[x+r*Math.cos(a),-10+r*Math.sin(a),hook[2]]],p*3,'aleta',2.6);
      }
      g.cyl([-285,10,158],[340,10,158],10,'iron','aigua');
      g.wheel([345,10,385],116,p*6,'x','aigua','iron');
      g.wheel([345,10,158],27,p*6*116/27,'x','aigua','iron');
      g.belt([345,10,385],[345,10,158],116,27,'aigua');
      for(const x of [-280,280])g.cyl([x,10,155],[x,10,440],5,'iron','aigua',10);
    },
    mula(g,p,t){
      const s=state('mula',p),travel=s.travel;
      base(g,660,170,390);
      for(const x of [-290,270])g.box(x,-390,5,14,520,12,'iron','carro');
      for(let i=0;i<6;i++)g.bobbin(-250+i*100,45,320,60,23,'fileta',s.rollerAngle*.2);
      [-22,12].forEach((y,n)=>{
        const a=s.rollerAngle*(n?-1:1);
        g.cyl([-285,y,278],[285,y,278],16,'iron','corrons');
        g.line([[-285,y+16*Math.cos(a),278+16*Math.sin(a)],[285,y+16*Math.cos(a),278+16*Math.sin(a)]],'#e5e6df',2,'corrons');
      });
      g.box(-315,travel-28,68,630,56,22,'oak','carro');
      for(const x of [-280,280]){g.wheel([x,travel,34],28,s.wheelAngle,'x','carro','iron');g.box(x-8,travel-12,34,16,24,36,'oak','carro');}
      for(let i=0;i<6;i++){
        const x=-250+i*100;
        g.cop(x,travel,91,95,s.copRadius,'fus',s.spindleAngle);
        g.fibres([x,45,325],[x,-5,278],s.fed*.5,5,'fileta');
        const end=[x,travel,s.guideZ];
        g.yarn([x,-5,278],end,s.spindleAngle,s.fed*.7+s.last*.3,'fus',i===2?4:2.4);
        if(p>=.55)g.thread([end,[x+s.copRadius,travel,138+Math.sin(s.wind*14)*25]],s.wind*5,'fus',2.4);
      }
      g.cyl([-285,travel,s.guideZ],[285,travel,s.guideZ],2,'brass','fus');
      g.wheel([342,travel,220],125,s.spindleAngle/5,'x','roda','iron');
      g.wheel([342,travel,100],25,s.spindleAngle,'x','roda','iron');
      g.belt([342,travel,220],[342,travel,100],125,25,'roda');
      g.cyl([-285,travel,95],[342,travel,95],7,'iron','roda');
    },
    roda(g,p,t){
      const s=state('roda',p),c=[200,55,325];
      base(g,650,150,145);g.box(-325,-75,145,650,150,25);
      for(const y of [-12,100])g.box(185,y,170,25,15,158,'oak','roda');
      g.wheel(c,155,s.angle,'y','roda');
      const grip=[200+32*Math.cos(s.angle),-25,325+32*Math.sin(s.angle)];
      g.cyl([200,-15,325],grip,5,'iron','roda',8);
      for(const y of [-80,75])g.box(-260,y,170,24,16,155,'oak','fus');
      g.cyl([-248,-145,325],[-248,94,325],4,'iron','fus');
      g.cyl([-248,-65,325],[-248,20,325],s.copRadius,'cotton','fus');
      g.line([[-248+s.copRadius*Math.cos(s.spindleAngle),-65,325+s.copRadius*Math.sin(s.spindleAngle)],[-248+s.copRadius*Math.cos(s.spindleAngle),20,325+s.copRadius*Math.sin(s.spindleAngle)]],'#9b7a41',1.4,'fus');
      g.wheel([-248,55,325],18,s.spindleAngle,'y','fus','brass');
      const nx=(155-18)/448,nz=Math.sqrt(1-nx*nx);
      for(const sign of [-1,1])g.line([[200-155*nx,55,325+sign*155*nz],[-248-18*nx,55,325+sign*18*nz]],'#8c7251',2.5,'corretja');
      g.hand([s.handX,s.hand,338],'fibra');
      const end=s.atTip?[-248,-145,325]:[-248-s.copRadius,-25,325];
      if(p<.57)g.fibres([s.handX,s.hand,333],end,s.draw*.5,lerp(8,2.2,s.draw),'fibra');
      else g.yarn([s.handX,s.hand,333],end,s.spindleAngle,1,'fibra',3.8);
      for(let i=0;i<8;i++)g.line([[s.handX-58,s.hand-3+i*2,335+i],[s.handX-17,s.hand,335]],'#d7c6a4',3,'fibra');
    }
  };
  const fits={};
  const anchors={
    llancadora:[['ordit',300,108,[-200,130,310]],['pinta',1040,230,[240,-90,340]],['llancadora',1030,480,[0,-82,285]],['caixes',155,445,[-330,-85,298]],['cordill',430,555,[0,-245,248]],['tela',770,565,[0,-190,210]]],
    jenny:[['metxes',270,108,[-100,298,225]],['pinca',990,165,[0,220,315]],['fusos',500,570,[0,-170,260]],['roda',1070,405,[365,-160,270]],['corda',940,550,[160,-180,185]]],
    water:[['metxa',440,106,[-75,15,520]],['corrons',155,280,[-240,-20,380]],['aleta',660,566,[60,-10,240]],['aigua',1045,220,[345,10,385]]],
    mula:[['fileta',245,108,[-100,45,355]],['corrons',790,140,[100,0,278]],['carro',500,570,[0,-240,85]],['fus',1070,450,[180,-240,160]],['roda',1050,285,[342,-200,220]]],
    roda:[['fibra',175,220,[-390,-130,333]],['fus',340,112,[-248,-25,325]],['roda',1010,150,[200,20,390]],['corretja',650,108,[-30,55,420]]]
  };
  function getFit(id){
    if(fits[id])return fits[id];
    const points=[];
    for(const p of [0,.18,.4,.58,.8,1]){
      const g=new Scene();models[id](g,p,p*10);
      g.faces.filter(f=>f.part!=='bastidor').forEach(f=>{
        const useful=f.points.filter(v=>v[2]>=(id==='llancadora'?160:id==='mula'?68:140));
        points.push(...useful.map(project));
      });
    }
    const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
    const s=Math.min(1010/w,440/h);
    return fits[id]={s,x:600-(x+w/2)*s,y:345-(y+h/2)*s};
  }
  function render(id,p,t,k=0,sel=null,focus=[]){
    const g=new Scene();models[id](g,p,t);const fit=getFit(id);
    const mobile=window.matchMedia('(max-width:760px)').matches,font=mobile?34:15.5,labelH=mobile?50:28;
    const shapes=g.faces.sort((a,b)=>b.d-a.d).map(f=>{
      const pts=f.points.map(project).map(v=>v.map(n=>n.toFixed(2)).join(',')).join(' ');
      const attr=f.part?` data-part="${f.part}" class="${sel===f.part?'sel':focus.includes(f.part)?'foc':''}"`:'';
      return f.color?`<polyline${attr} points="${pts}" fill="none" stroke="${f.color}" stroke-width="${f.width}" stroke-linecap="round" stroke-linejoin="round"${f.dash?` stroke-dasharray="${f.dash}" stroke-dashoffset="${f.offset||0}"`:''}/>`:`<polygon${attr} points="${pts}" fill="${f.fill}" opacity="${f.alpha||1}" stroke="#554b3d" stroke-opacity=".35" stroke-width=".8" stroke-linejoin="round"/>${f.grain?`<polygon points="${pts}" fill="url(#tx-grain)" opacity=".10" pointer-events="none"/>`:''}`;
    }).join('');
    const e=RI.TEXTIL_ESCENES&&RI.TEXTIL_ESCENES[id];
    const labels=(anchors[id]||[]).map(([part,x,y,fixed])=>{
      const anchor=[...fixed];
      if(id==='jenny'&&part==='pinca')anchor[1]=jennyTravel(p);
      if(id==='mula'&&(part==='carro'||part==='fus'))anchor[1]=muleTravel(p);
      if(id==='llancadora'){
        const s=state(id,p);
        if(['pinta','caixes'].includes(part))anchor[1]=s.y;
        if(part==='llancadora'){anchor[0]=s.x;anchor[2]=s.boatZ;}
      }
      if(id==='roda'&&part==='fibra'){const s=state(id,p);anchor[0]=s.handX;anchor[1]=s.hand;}
      const at=project(anchor),ax=fit.x+at[0]*fit.s,ay=fit.y+at[1]*fit.s;
      let name=e&&e.parts[part]?e.parts[part].nom:part;
      if(id==='jenny'&&part==='pinca')name=state(id,p).closed?'Pinça tancada':'Pinça oberta';
      if(id==='mula'&&part==='corrons')name=state(id,p).rollersRunning?'Corrons alimentant':'Corrons aturats';
      if(id==='water'&&part==='aigua')name='Energia hidràulica';
      if(id==='water'&&part==='corrons')return '';
      const w=name.length*(mobile?17:7.4)+22,lx=Math.max(w/2+10,Math.min(1190-w/2,x));
      return `<g class="etq ${focus.includes(part)?'foc':''} ${sel===part?'sel':''}" data-part="${part}"><line x1="${lx}" y1="${y}" x2="${ax.toFixed(2)}" y2="${ay.toFixed(2)}"/><circle cx="${ax.toFixed(2)}" cy="${ay.toFixed(2)}" r="3"/><rect x="${lx-w/2}" y="${y-labelH/2}" width="${w}" height="${labelH}" rx="7"/><text x="${lx}" y="${y+font*.34}" style="font-size:${font}px" text-anchor="middle">${name}</text></g>`;
    }).join('');
    const speedLabels=id==='water'?['Lent','Més ràpid','Encara més ràpid'].map((name,j)=>{
      const at=project([-267,-28,430-j*57]),ax=fit.x+at[0]*fit.s,ay=fit.y+at[1]*fit.s,w=name.length*(mobile?17:7.4)+22,right=mobile?Math.max(210,w+10):210;
      return `<g class="etq ${focus.includes('corrons')?'foc':''}" data-part="corrons"><line x1="${right}" y1="${ay}" x2="${ax}" y2="${ay}"/><rect x="${right-w}" y="${ay-labelH/2}" width="${w}" height="${labelH}" rx="7"/><text x="${right-w/2}" y="${ay+font*.34}" style="font-size:${font}px" text-anchor="middle">${name}</text></g>`;
    }).join(''):'';
    return `<g clip-path="url(#tx-crop)"><g transform="translate(${fit.x.toFixed(2)} ${fit.y.toFixed(2)}) scale(${fit.s.toFixed(4)})">${shapes}</g></g>${labels}${speedLabels}`;
  }
  RI.TEXTIL_MODELS={
    svg(id){return RI.svg(`<defs><clipPath id="tx-crop"><rect x="65" y="118" width="1070" height="455"/></clipPath><pattern id="tx-grain" width="34" height="17" patternUnits="userSpaceOnUse"><path d="M0 3Q17 1 34 4M0 11Q17 14 34 10" fill="none" stroke="#fff2cd" stroke-width="1"/></pattern></defs><rect x="-60" width="1320" height="720" fill="#fcf8ef"/><g id="tx-scene">${render(id,0,0)}</g>`).replace('class="esc"','class="esc tx-model"');},
    anima(id){return ({p,t,k,svg,sel})=>{
      const frame=Math.floor(t*24),stamp=id+':'+frame+':'+k+':'+sel;
      if(svg.dataset.txFrame===stamp)return;svg.dataset.txFrame=stamp;
      const e=RI.TEXTIL_ESCENES[id],s=state(id,p);
      svg.querySelector('#tx-scene').innerHTML=render(id,p,t,k,sel,(e.fases[k]||{}).focus||[]);
      const status=document.querySelector('#tx-action'),product=document.querySelector('#tx-product');
      if(status&&status.textContent!==s.action)status.textContent=s.action;
      const out=id==='llancadora'?s.rows+' passades incorporades':id==='water'?'4 fils en producció contínua':id==='roda'?'1 fil · estirar → tòrcer → enrotllar':id==='jenny'?'8 fils moguts per una mateixa roda':'6 fusos coordinats en aquest esquema';
      if(product&&product.textContent!==out)product.textContent=out;
      svg.dataset.phase=e.fases[k].nom;
    };}
  };
})();
