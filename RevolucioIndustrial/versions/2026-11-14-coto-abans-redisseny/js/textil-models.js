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
  const state = (id,p)=>RI.TEXTIL_ESTATS[id](p);
  const project = ([x,y,z]) => [.94*x+.48*y, .12*x-.29*y-.96*z];
  // La profunditat és perpendicular als dos eixos de la projecció.
  const camera=[.4608,-.9024,.3302];
  const depth = p => -dot(p,camera);
  const palette = {oak:'#cbb79a',end:'#ac9677',iron:'#859196',brass:'#bc9755',cotton:'#eee3ca',dark:'#36454a',red:'#b85f41'};
  function shade(hex,n){ const k=.83+.30*Math.max(0,dot(unit(n),unit([-.4,-.5,1]))); return '#'+hex.slice(1).match(/../g).map(c=>Math.min(255,Math.round(parseInt(c,16)*k)).toString(16).padStart(2,'0')).join(''); }
  class Scene {
    constructor(){this.faces=[];}
    poly(points,mat='oak',part='',normal=[0,-1,0],smooth=false){
      if(dot(normal,camera) < -.001) return;
      this.faces.push({points,fill:shade(palette[mat]||mat,normal),part,smooth,grain:mat==='oak',d:points.reduce((s,p)=>s+depth(p),0)/points.length});
    }
    line(points,color='#735c3c',width=3,part='',dash=''){
      this.faces.push({points,color,width,part,d:points.reduce((s,p)=>s+depth(p),0)/points.length-.15,dash});
    }
    box(x,y,z,w,d,h,mat='oak',part=''){
      const p=[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z],[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]];
      this.poly([p[0],p[3],p[7],p[4]],mat,part,[-1,0,0]);
      this.poly([p[1],p[5],p[6],p[2]],mat,part,[1,0,0]);
      this.poly([p[0],p[4],p[5],p[1]],mat,part,[0,-1,0]);
      this.poly([p[3],p[2],p[6],p[7]],mat,part,[0,1,0]);
      this.poly([p[4],p[7],p[6],p[5]],mat,part,[0,0,1]);
      this.poly([p[0],p[1],p[2],p[3]],mat,part,[0,0,-1]);
    }
    cyl(a,b,r,mat='iron',part='',n=20){
      const axis=unit(sub(b,a)), u=unit(cross(axis,Math.abs(axis[2])<.8?[0,0,1]:[0,1,0])),v=cross(axis,u), rings=[[],[]];
      for(let i=0;i<n;i++){const off=V(mul(u,r*Math.cos(i*2*Math.PI/n)),mul(v,r*Math.sin(i*2*Math.PI/n)));rings[0].push(V(a,off));rings[1].push(V(b,off));}
      for(let i=0;i<n;i++){const j=(i+1)%n;this.poly([rings[0][i],rings[0][j],rings[1][j],rings[1][i]],mat,part,sub(V(rings[0][i],rings[0][j]),mul(a,2)),true);}
      this.poly(rings[0],mat,part,mul(axis,-1));this.poly(rings[1],mat,part,axis);
    }
    wheel(c,r,angle,axis='y',part='roda',mat='oak'){
      const at=(a,rr,off=0)=>axis==='y'?V(c,[Math.cos(a)*rr,off,Math.sin(a)*rr]):V(c,[off,Math.cos(a)*rr,Math.sin(a)*rr]);
      const n=40;
      for(let i=0;i<n;i++){
        const a=i*2*Math.PI/n,b=(i+1)*2*Math.PI/n;
        this.poly([at(a,r,-8),at(b,r,-8),at(b,r-12,-8),at(a,r-12,-8)],mat,part,axis==='y'?[0,-1,0]:[-1,0,0],true);
        this.poly([at(a,r,8),at(a,r-12,8),at(b,r-12,8),at(b,r,8)],mat,part,axis==='y'?[0,1,0]:[1,0,0],true);
        this.poly([at(a,r,-8),at(a,r,8),at(b,r,8),at(b,r,-8)],mat,part,sub(at((a+b)/2,r),c),true);
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
        this.poly([at(j,a),at(j,b),at(j+1,b),at(j+1,a)],'cotton',part,[Math.cos((a+b)/2),Math.sin((a+b)/2),.1],true);
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
      this.line([a,b],'#9eafa5',width+3,part);
      this.line([a,b],'#e7eee1',width,part);
      const length=Math.hypot(...sub(b,a));
      for(let i=0;i<12;i++){
        const f=((i/12+q)%1+1)%1, at=V(a,mul(direction,Math.max(0,length-30)*f));
        const off=mul(side,Math.sin(i*2.4)*width*.32);
        this.line([V(at,off),V(V(at,mul(direction,30)),off)],i===4?'#347e77':'#aab9a6',i===4?2.5:1,part);
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
      const row=(y,amount,reverse=false)=>{
        amount=Math.max(0,Math.min(1,amount));
        const z=310+(270-310)*(40-y)/195;
        const from=reverse?273-546*amount:-273,to=reverse?273:-273+546*amount;
        for(let i=0;i<25;i++){
          const x=-273+i*21.84,lo=Math.max(x,from),hi=Math.min(x+21.84,to);
          if(hi>lo)g.line([[lo,y,z+(i%2?1.8:-1.8)],[hi,y,z+(i%2?-1.8:1.8)]],'#ba684b',3.2,'tela');
        }
      };
      if(p>=.18){const y=p<.4?-82:lerp(-82,-155,s.beat1);row(y,p<.38?(s.x+273)/546:1);}
      if(p>=.67){const y=p<.86?-82:lerp(-82,-152,s.beat2);row(y,p<.85?(273-s.x)/546:1,true);}
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
        const a=[x,travel,315],b=[x,-170,s.guideZ+15*Math.sin(s.wind*12)];
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
      base(g,620,600,550);
      for(let i=0;i<4;i++)g.bobbin(-225+i*150,280,420,52,24,'metxa',p);
      for(let j=0;j<3;j++){
        const y=220-j*105;
        [369,331].forEach((z,n)=>{
          const angle=s.pairs[j][n],start=g.faces.length;
          g.cyl([-280,y,z],[280,y,z],17,'iron','corrons');
          if(n===0)g.faces.slice(start).forEach(f=>f.alpha=.35);
          g.line([[-278,y+17*Math.cos(angle),z+17*Math.sin(angle)],[278,y+17*Math.cos(angle),z+17*Math.sin(angle)]],'#e6e6d9',2,'corrons');
        });
      }
      for(let i=0;i<4;i++){
        const x=-225+i*150,a=s.flyerAngle,r=10+13*s.fill,start=g.faces.length;
        g.fibres([x,280,420],[x,220,350],p*2,15,'metxa');
        g.fibres([x,220,350],[x,115,350],p*3.2,10,'corrons');
        g.fibres([x,115,350],[x,10,350],p*6.4,5,'corrons');
        g.faces.slice(start).forEach(f=>f.d=-10000+i);
        g.bobbin(x,-8,78,105,r,'aleta',s.bobbinAngle);
        const arm=[x+40*Math.cos(a),-8+40*Math.sin(a),202],hook=[arm[0],arm[1],94+75*p];
        for(const side of [arm,[x-40*Math.cos(a),-8-40*Math.sin(a),202]]){
          g.cyl([x,-8,223],side,3,'brass','aleta',8);
          g.cyl(side,[side[0],side[1],75],3,'brass','aleta',8);
        }
        g.yarn([x,10,350],[x,-8,223],a,1,'aleta',2.4);
        g.thread([[x,-8,223],arm,hook,[x+r*Math.cos(a),-8+r*Math.sin(a),hook[2]]],p*3,'aleta',2.6);
      }
      g.cyl([-285,10,108],[340,10,108],10,'iron','aigua');
      g.wheel([345,10,385],116,p*6,'x','aigua','iron');
      g.wheel([345,10,108],27,p*6*116/27,'x','aigua','iron');
      g.belt([345,10,385],[345,10,108],116,27,'aigua');
      for(const x of [-280,280])g.cyl([x,10,105],[x,10,440],5,'iron','aigua',10);
    },
    mula(g,p,t){
      const s=state('mula',p),travel=s.travel;
      base(g,660,170,390);
      for(const x of [-290,270])g.box(x,-390,5,14,520,12,'iron','carro');
      for(let i=0;i<6;i++)g.bobbin(-250+i*100,45,320,60,23,'fileta',s.rollerAngle*.2);
      [-22,12].forEach((y,n)=>{
        const a=s.rollerAngle*(n?1:-1);
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
      const end=[-248-s.copRadius*s.guide,lerp(-145,-25,s.guide),325];
      if(p<.57)g.fibres([s.handX,s.hand,333],end,s.draw*.5,lerp(8,2.2,s.draw),'fibra');
      else g.yarn([s.handX,s.hand,333],end,s.spindleAngle,1,'fibra',3.8);
      for(let i=0;i<8;i++)g.line([[s.handX-58,s.hand-3+i*2,335+i],[s.handX-17,s.hand,335]],'#d7c6a4',3,'fibra');
    }
  };
  RI.TEXTIL_GEOMETRIA={Scene,project,depth,camera,models};
})();
