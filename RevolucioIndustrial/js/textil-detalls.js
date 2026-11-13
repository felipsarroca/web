// SPDX-License-Identifier: AGPL-3.0-or-later
/* Un detall funcional ampliat i una referència del conjunt, amb la mateixa
   projecció obliqua. Sense canvis de càmera durant el cicle. */
(function(){
  'use strict';
  const {Scene,project,models}=RI.TEXTIL_GEOMETRIA;
  const lerp=(a,b,q)=>a+(b-a)*q;
  const S=(id,p)=>RI.TEXTIL_ESTATS[id](p);
  const mobile=()=>document.documentElement.classList.contains('mobil');
  function roller(g,x,y,z,angle,width=90,part='corrons',cut=false){
    const start=g.faces.length,r=17;
    g.cyl([x-width/2,y,z],[x+width/2,y,z],r,'iron',part,32);
    if(cut)g.faces.slice(start).forEach(f=>f.alpha=.35);
    // Tres marques mostren el gir, també quan el cilindre és llis.
    for(let i=0;i<3;i++){
      const a=angle+i*Math.PI*2/3;
      if(Math.cos(a)*-.9024+Math.sin(a)*.3302>0)
        g.line([[x-width/2,y+r*Math.cos(a),z+r*Math.sin(a)],[x+width/2,y+r*Math.cos(a),z+r*Math.sin(a)]],'#d6dfd7',1.7,part);
    }
  }
  function spindle(g,x,y,z,h,r,angle,part){
    g.cop(x,y,z,h,r,part,angle);
    g.cyl([x,y,z-22],[x,y,z-12],12,'brass',part,20);
  }
  const details={
    water(g,p){
      const s=S('water',p),x=0;
      g.box(-67,-10,60,12,300,12,'oak','bastidor');
      g.box(55,-10,60,12,300,12,'oak','bastidor');
      for(const x of [-67,55]){
        g.box(x,-8,310,12,300,12,'oak','bastidor');
        g.box(x,-8,60,12,15,250,'oak','bastidor');
        g.box(x,270,60,12,15,350,'oak','bastidor');
      }
      g.box(-67,270,402,134,20,12,'oak','bastidor');
      g.bobbin(x,280,420,52,24,'metxa',p);
      [220,115,10].forEach((y,j)=>{
        roller(g,x,y,331,s.pairs[j][1],100);
        roller(g,x,y,369,s.pairs[j][0],100,'corrons',true);
        for(const side of [-1,1])g.box(side*58-4,y-12,315,8,24,69,'brass','corrons');
      });
      const start=g.faces.length;
      g.fibres([x,280,420],[x,220,350],p*2,15,'metxa');
      g.fibres([x,220,350],[x,115,350],p*3.2,10,'corrons');
      g.fibres([x,115,350],[x,10,350],p*6.4,5,'corrons');
      g.faces.slice(start).forEach(f=>f.d=-10000);
      const a=s.flyerAngle,r=10+s.fill*13;
      g.bobbin(x,-8,78,105,r,'aleta',s.bobbinAngle);
      const arm=[x+40*Math.cos(a),-8+40*Math.sin(a),202],hook=[arm[0],arm[1],94+p*75];
      const opposite=[x-40*Math.cos(a),-8-40*Math.sin(a),202];
      for(const side of [arm,opposite]){
        g.cyl([x,-8,223],side,4,'brass','aleta',16);
        g.cyl(side,[side[0],side[1],75],4,'brass','aleta',16);
      }
      g.yarn([x,10,350],[x,-8,223],a,1,'aleta',4.2);
      g.thread([[x,-8,223],arm,hook,[x+r*Math.cos(a),-8+r*Math.sin(a),hook[2]]],p*3,'aleta',3.2);
    },
    jenny(g,p){
      const s=S('jenny',p),y=s.travel;
      for(const x of [-64,60])g.box(x,-210,175,7,535,9,'oak','bastidor');
      g.box(-68,-194,174,136,38,15,'oak','bastidor');
      g.box(-68,280,174,136,38,15,'oak','bastidor');
      g.bobbin(0,298,185,42,25,'metxes',s.draw*.5);
      spindle(g,0,-170,200,90,s.copRadius,s.spindleAngle,'fusos');
      g.fibres([0,298,235],[0,y,315],s.draw*.3,14,'metxes');
      const end=[0,-170,s.guideZ+15*Math.sin(s.wind*12)];
      if(p<.52){
        const from=[0,y,315],middle=from.map((n,i)=>lerp(n,end[i],.65-.4*s.draw));
        g.fibres(from,middle,s.draw*.55,lerp(13,5,s.draw),'fusos');
        g.yarn(middle,end,s.spindleAngle,s.draw,'fusos',3.6);
      }
      else g.yarn([0,y,315],end,s.spindleAngle,1,'fusos',4.2);
      g.box(-64,y-11,294,128,22,16,'oak','pinca');
      g.box(-64,y-11,s.closed?312:337,128,22,12,'brass','pinca');
      for(const x of [-60,52])g.box(x,y-11,185,8,22,109,'oak','pinca');
      g.cyl([-80,-180,185],[80,-180,185],7,'iron','corda');
      g.line([[0,-180,192],[0,-170,187]],'#987a49',4,'corda');
    },
    mula(g,p){
      const s=S('mula',p),y=s.travel;
      g.bobbin(0,45,320,60,24,'fileta',s.rollerAngle*.2);
      roller(g,0,12,278,s.rollerAngle,115);
      roller(g,0,-22,278,-s.rollerAngle,115,'corrons',true);
      for(const x of [-72,65]){
        g.box(x,-395,5,7,520,12,'iron','carro');
        g.box(x,8,25,7,65,285,'oak','bastidor');
        g.wheel([x+4,y,34],28,s.wheelAngle,'x','carro','iron');
      }
      g.box(-80,y-25,68,160,50,19,'oak','carro');
      spindle(g,0,y,91,95,s.copRadius,s.spindleAngle,'fus');
      g.fibres([0,45,325],[0,-5,278],s.fed*.5,12,'fileta');
      g.yarn([0,-5,278],[0,y,s.guideZ],s.spindleAngle,s.fed*.7+s.last*.3,'fus',4.5);
      g.cyl([-62,y,s.guideZ],[62,y,s.guideZ],2,'brass','fus');
      if(p>=.55)g.thread([[0,y,s.guideZ],[s.copRadius,y,138+Math.sin(s.wind*14)*25]],s.wind*5,'fus',3.8);
    },
    roda(g,p){
      const s=S('roda',p),x=-248;
      g.box(-292,-100,170,90,240,13,'oak','bastidor');
      for(const y of [-80,75])g.box(x-13,y,183,26,16,143,'oak','fus');
      g.cyl([x,-147,325],[x,94,325],3.5,'iron','fus',32);
      // Con de fil al fus horitzontal, amb la punta davantera nua.
      for(let i=0;i<14;i++){
        const y=-60+i*5,r=s.copRadius*(.25+.75*i/13);
        g.cyl([x,y,325],[x,y+5,325],r,'cotton','fus',24);
      }
      g.wheel([x,55,325],18,s.spindleAngle,'y','fus','brass');
      g.line([[x-6,55,342],[x+128,55,382]],'#9e8055',2.4,'corretja');
      g.line([[x+128,55,286],[x-6,55,308]],'#9e8055',2.4,'corretja');
      const tip=[x-s.copRadius*s.guide,lerp(-147,-25,s.guide),325];
      const from=[s.handX,s.hand,333];
      if(p<.57){
        const middle=from.map((n,i)=>lerp(n,tip[i],.65-.4*s.draw));
        g.fibres(from,middle,s.draw*.5,lerp(15,5,s.draw),'fibra');
        g.yarn(middle,tip,s.spindleAngle,s.draw,'fibra',3.6);
      }
      else g.yarn(from,tip,s.spindleAngle,1,'fibra',4.2);
      // La pinça dels dits és un signe funcional discret, sense cos ni personatge.
      g.cyl([s.handX-19,s.hand-12,340],[s.handX+7,s.hand+3,337],6,'#e1b99b','fibra',16);
      g.cyl([s.handX-19,s.hand-12,324],[s.handX+7,s.hand+3,329],6,'#e1b99b','fibra',16);
      for(let i=0;i<8;i++)g.line([[s.handX-58,s.hand-3+i*2,335+i],[s.handX-17,s.hand,335]],'#b6c2ab',3,'fibra');
    },
    llancadora(g,p,provided){
      const s=provided||S('llancadora',p),by=s.y;
      g.cyl([-290,140,310],[290,140,310],21,'cotton','ordit',28);
      g.cyl([-290,-190,165],[290,-190,165],26,'cotton','tela',28);
      // Deu fils fan visible l'entrecreuament, sense una malla atapeïda.
      for(let i=0;i<10;i++){
        const x=-270+i*60,z=310+(i%2?1:-1)*45*s.shed;
        g.line([[x,140,310],[x,40,z],[x,-155,270]],i%2?'#568b91':'#a4b6a2',3.3,'ordit');
      }
      for(const sign of [-1,1]){
        const z=310+sign*45*s.shed;
        g.box(-285,40+sign*9,z+26,570,7,7,'oak','llicos');
        for(let i=0;i<5;i++)g.line([[-270+i*120+(sign>0?60:0),40+sign*9,z-12],[-270+i*120+(sign>0?60:0),40+sign*9,z+30]],'#aab7aa',1,'llicos');
      }
      g.poly([[-275,-155,270],[275,-155,270],[275,-190,165],[-275,-190,165]],'cotton','tela',[0,-1,1]);
      for(let i=0;i<10;i++)g.line([[-270+i*60,-155,270],[-270+i*60,-190,165]],'#9fb29f',1.8,'tela');
      for(let j=0;j<9;j++)g.line([[-273,-157-j*3.6,264-j*10.5],[273,-157-j*3.6,264-j*10.5]],'#d1c5a4',1.4,'tela');
      g.box(-355,by-19,274,710,38,9,'oak','pinta');
      g.box(-300,by+8,346,600,9,9,'oak','pinta');
      for(let i=0;i<21;i++)g.line([[-285+i*28.5,by+8,284],[-285+i*28.5,by+8,346]],'#9ba9a7',1.2,'pinta');
      for(const side of [-1,1]){
        const engaged=(side<0?p<.23:p>=.65&&p<.72);
        g.box(side<0?-355:300,by-19,282,55,42,15,'oak','caixes');
        const shift=provided?(side<0?s.pickerLeft:s.pickerRight):(engaged&&s.pull?22:0);
        g.box(side*((provided?360:335)-shift)-7,by-11,290,14,24,17,'brass','caixes');
      }
      const row=(y,amount,reverse=false)=>{
        amount=Math.max(0,Math.min(1,amount));
        const z=310+(270-310)*(40-y)/195;
        const from=reverse?270-540*amount:-270,to=reverse?270:-270+540*amount;
        for(let i=0;i<18;i++){
          const x=-270+i*30,lo=Math.max(x,from),hi=Math.min(x+30,to);
          if(hi>lo)g.line([[lo,y,z+(i%2?2:-2)],[hi,y,z+(i%2?-2:2)]],'#b6593f',4,'llancadora');
        }
      };
      if(provided)s.wefts.forEach(w=>row(w.y,w.amount,w.reverse));
      else{
        if(p>=.18)row(p<.4?-82:lerp(-82,-155,s.beat1),p<.38?(s.x+270)/540:1);
        if(p>=.67)row(p<.86?-82:lerp(-82,-152,s.beat2),p<.85?(270-s.x)/540:1,true);
      }
      const x=s.x,z=s.boatZ,y=s.boatY;
      g.poly([[x-28,y,z],[x,y-12,z],[x+28,y,z],[x,y+12,z]],'brass','llancadora',[0,0,1]);
      g.poly([[x-28,y,z],[x,y+12,z],[x+28,y,z],[x+22,y,z-5],[x,y+9,z-6],[x-22,y,z-5]],'oak','llancadora',[0,-1,0]);
      g.cyl([x-12,y,z+3],[x+12,y,z+3],4,'cotton','llancadora',16);
      if(!provided){
        const grip=s.pull?228:248;
        g.line([[-340,by,298],[-150,-230,250],[0,-245,grip],[150,-230,250],[340,by,298]],'#9b7f52',2.8,'cordill');
        g.cyl([0,-245,grip-13],[0,-245,grip+13],6,'brass','cordill',16);
      }
    }
  };
  const fits=new Map();
  function fit(id,small){
    const key=id+':'+small;if(fits.has(key))return fits.get(key);
    const pts=[];
    for(const p of [0,.18,.4,.58,.8,1]){const g=new Scene();details[id](g,p);g.faces.forEach(f=>f.points.forEach(v=>pts.push(project(v))));}
    const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
    const s=Math.min((small?760:735)/w,420/h),value={s,x:(small?450:452)-(x+w/2)*s,y:350-(y+h/2)*s};
    fits.set(key,value);return value;
  }
  function paint(g,selected,focus=[],context=false){
    return g.faces.sort((a,b)=>b.d-a.d).map(f=>{
      const pts=f.points.map(project).map(v=>v.map(n=>n.toFixed(2)).join(',')).join(' ');
      const attr=` data-part="${f.part}" class="${context?'tx-in-context ':''}${selected===f.part?'sel':focus.includes(f.part)?'foc':''}"`;
      const alpha=f.alpha||(f.part==='bastidor'&&!context ? .3 : 1);
      return f.color?`<polyline${attr} points="${pts}" fill="none" stroke="${f.color}" stroke-width="${f.width}" stroke-linecap="round" stroke-linejoin="round"${f.dash?` stroke-dasharray="${f.dash}" stroke-dashoffset="${f.offset||0}"`:''}/>`:`<polygon${attr} points="${pts}" fill="${f.fill}" style="--tx-opacity:${alpha}" opacity="${alpha}" stroke="${f.smooth?'none':'#4d5954'}" stroke-opacity=".27" stroke-width=".7" stroke-linejoin="round"/>`;
    }).join('');
  }
  const labels={
    water:[['metxa','Metxa gruixuda',[-8,280,445],660,125],['corrons','Lent',[0,220,350],180,220],['corrons','Més ràpid',[0,115,350],140,290],['corrons','Encara més ràpid',[0,10,350],120,360],['aleta','Fil torçut i recollit',[0,-8,130],700,500]],
    jenny:[['metxes','Cotó encara sense filar',[0,298,230],260,130],['pinca','Pinça',[0,180,325],710,225],['fusos','Fus i fil recollit',[0,-170,250],230,550]],
    mula:[['corrons','Corrons',[0,-8,278],620,160],['carro','Carro i fus',[0,-220,85],200,540],['fus','Fil que es torça',[0,-170,210],710,380]],
    roda:[['fibra','Fibres entre els dits',[-275,-300,333],160,460],['fus','Fus i con de fil',[-248,-25,325],650,500],['corretja','Gir des de la roda',[-190,55,360],690,180]],
    llancadora:[['ordit','Dos grups de fils',[0,40,355],300,125],['llancadora','Trama nova',[0,-82,285],700,350],['caixes','Taco d’impuls',[-332,-82,298],170,350],['pinta','Pinta i batà',[200,-82,346],740,180],['tela','Tela ja feta',[0,-190,200],550,560],['cordill','Mànec del cordill',[0,-245,248],180,550]]
  };
  function callouts(id,p,f,selected,focus){
    const size=mobile()?25:19;
    return labels[id].map(([part,title,point,x,y])=>{
      point=[...point];const s=S(id,p);
      if(id==='jenny'&&part==='pinca'){point[1]=s.travel;title=s.closed?'Pinça tancada':'Pinça oberta';}
      if(id==='jenny'&&part==='fusos')title=p<.70?'El fus dona torsió':'El fus recull el fil';
      if(id==='mula'){
        if(part==='corrons')title=s.rollersRunning?'Alimenten metxa':'Corrons aturats';
        if(part==='carro'){point[1]=s.travel;title=p<.55?'El carro s’allunya':p<.67?'El carro espera':'El carro torna';}
        if(part==='fus'){point=[0,s.travel,s.guideZ];title=p<.55?'Fil que es torça':p<.67?'Guia de recollida':'Fil que s’enrotlla';}
      }
      if(id==='roda'&&part==='fibra'){point[0]=s.handX;point[1]=s.hand;}
      if(id==='llancadora'||id==='cartwright'){
        if(part==='llancadora')point=[s.x,s.boatY,s.boatZ];
        if(part==='pinta')point[1]=s.y;
      }
      const at=project(point),ax=f.x+at[0]*f.s,ay=f.y+at[1]*f.s,w=title.length*size*.52+20;
      x=Math.max(w/2+12,Math.min(888-w/2,x));
      return `<g class="etq ${focus.includes(part)?'foc':''} ${selected===part?'sel':''}" data-part="${part}"><path d="M${x} ${y}H${(x+ax)/2}L${ax} ${ay}" fill="none" stroke="#829087" stroke-width="1.2"/><circle cx="${ax}" cy="${ay}" r="3"/><rect x="${x-w/2}" y="${y-size*.85}" width="${w}" height="${size*1.6}" rx="5"/><text x="${x}" y="${y+size*.3}" text-anchor="middle" style="font-size:${size}px;font-weight:500">${title}</text></g>`;
    }).join('');
  }
  const contextFits=new Map();
  function contextFit(id){
    if(contextFits.has(id))return contextFits.get(id);
    const pts=[];
    for(const p of [0,.2,.5,.8,1]){const g=new Scene();models[id](g,p,p*10);g.faces.forEach(f=>f.points.forEach(v=>pts.push(project(v))));}
    const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
    const s=Math.min(212/w,176/h),dx=1040-(x+w/2)*s,dy=260-(y+h/2)*s;
    const value={s,dx,dy};contextFits.set(id,value);return value;
  }
  function whole(id,p,selected,focus){
    const {s,dx,dy}=contextFit(id),g=new Scene();models[id](g,p,p*10);
    return `<g transform="translate(${dx} ${dy}) scale(${s})" opacity=".72">${paint(g,selected,focus,true)}</g>`;
  }
  function contextHTML(id){
    const {s,dx,dy}=contextFit(id),centre={water:[-75,90,300],jenny:[-39,70,290],mula:[-50,-100,230],roda:[-248,-40,325],llancadora:[0,-82,285],cartwright:[0,-100,250]}[id],at=project(centre);
    return `<g class="tx-context" pointer-events="none"><text x="1040" y="140" text-anchor="middle" fill="#7d8980" style="font-size:17px">Situació del detall</text><g id="tx-whole">${whole(id,0,null,[])}</g><ellipse cx="${dx+at[0]*s}" cy="${dy+at[1]*s}" rx="${id==='llancadora'?87:22}" ry="${id==='water'?58:32}" fill="#d4a759" fill-opacity=".12" stroke="#ba965c" stroke-width="1.2"/><g id="tx-multiple"></g></g>`;
  }
  function multiple(id,s){
    if(id==='cartwright')return `<text x="1040" y="390" text-anchor="middle" fill="#886c49" style="font-size:20px">Un eix coordina el teler</text>${['Calada','Llançadora','Batuda'].map((name,i)=>`<circle cx="955" cy="${422+i*30}" r="5" fill="${s.step===i?'#b98b42':'#ded9cb'}"/><text x="970" y="${428+i*30}" fill="${s.step===i?'#78603e':'#939a8d'}" style="font-size:18px">${name}</text>`).join('')}`;
    const n={roda:1,jenny:8,water:4,mula:6}[id];
    if(!n)return `<text x="1040" y="390" text-anchor="middle" fill="#886c49" style="font-size:20px">Una mà impulsa la trama</text>`;
    const fill=id==='water'?s.fill:s.wind;
    const title=id==='roda'?'Un sol fil':id==='jenny'?'1 roda → 8 fusos':id==='water'?'4 caps treballant en continu':'6 fusos coordinats';
    const pitch=Math.min(28,188/n),start=1040-(n-1)*pitch/2;
    return `<text x="1040" y="390" text-anchor="middle" fill="#886c49" style="font-size:21px">${title}</text>${Array.from({length:n},(_,i)=>`<rect x="${start+i*pitch-7}" y="414" width="14" height="48" rx="5" fill="#ede8d9"/><rect x="${start+i*pitch-7}" y="${462-48*fill}" width="14" height="${48*fill}" rx="4" fill="#c09a55"/>`).join('')}<text x="1040" y="488" text-anchor="middle" fill="#8a9388" style="font-size:15px">${id==='water'?'Recollida contínua':'Recollida en aquest cicle'}</text>`;
  }
  function buildScene(id,p,provided){const g=new Scene();details[id](g,p,provided);return g;}
  RI.TEXTIL_DETALLS={
    buildScene,
    register(id,spec){details[id]=spec.build;labels[id]=spec.labels;models[id]=spec.context||spec.build;},
    svg(id){
      const small=mobile(),f=fit(id,small),g=buildScene(id,0);
      let svg=RI.svg(`<rect x="-60" width="1320" height="720" fill="#fcf8ef"/><g id="tx-detail"><g transform="translate(${f.x} ${f.y}) scale(${f.s})">${paint(g)}</g></g>${contextHTML(id)}`,`0 0 ${small?900:1200} 720`);
      return svg.replace('class="esc"','class="esc tx-model tx-detail"');
    },
    anima(id){return ({p,t,k,svg,sel})=>{
      const small=mobile(),stamp=[Math.floor(t*24),k,sel,small].join(':');
      if(svg.dataset.txFrame===stamp)return;svg.dataset.txFrame=stamp;
      const e=RI.TEXTIL_ESCENES[id],focus=e.fases[k].focus||[],s=S(id,p),f=fit(id,small),g=buildScene(id,p);
      svg.setAttribute('viewBox',`0 0 ${small?900:1200} 720`);
      svg.querySelector('#tx-detail').innerHTML=`<g transform="translate(${f.x} ${f.y}) scale(${f.s})">${paint(g,sel,focus)}</g>${callouts(id,p,f,sel,focus)}`;
      if(!small)svg.querySelector('#tx-whole').innerHTML=whole(id,p,sel,focus);
      svg.querySelector('#tx-multiple').innerHTML=multiple(id,s);
      const action=document.querySelector('#tx-action'),product=document.querySelector('#tx-product');
      if(action&&action.textContent!==s.action)action.textContent=s.action;
      const out=id==='llancadora'||id==='cartwright'?s.rows+' passades incorporades a la tela':id==='roda'?'Fibres soltes → fil torçut → fil recollit':id==='jenny'?'Detall d’un fus · 8 treballen alhora':id==='water'?'Detall d’un cap · producció contínua':'Detall d’un fus · 6 coordinats en aquest esquema';
      if(product&&product.textContent!==out)product.textContent=out;
      svg.dataset.phase=e.fases[k].nom;
    };}
  };
})();
