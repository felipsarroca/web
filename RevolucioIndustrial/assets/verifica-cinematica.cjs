// SPDX-License-Identifier: AGPL-3.0-or-later
// Run: node assets/verifica-cinematica.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{RI:{}}};vm.createContext(context);
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../js/textil-estats.js'),'utf8'),context);
const states=context.window.RI.TEXTIL_ESTATS;
let samples=0;
for(let i=0;i<=1000;i++){
  const p=i/1000,l=states.llancadora(p),w=states.water(p),m=states.mula(p);
  if(l.weaving){
    assert(l.boatZ+5<l.upperZ && l.boatZ-5>l.lowerZ,'shuttle collides with warp');
    assert.equal(l.y,l.boatY,'reed beats while shuttle is crossing');
  }
  for(const [front,back] of w.pairs){assert(Math.abs(front+back)<1e-10);assert(front<=0&&back>=0,'nip must feed downwards');}
  assert(w.speeds[0]<w.speeds[1]&&w.speeds[1]<w.speeds[2]);
  assert.notEqual(w.flyerAngle || 1,w.bobbinAngle || 2,'bobbin and flyer need differential speed');
  if(p>=.38)assert.equal(m.rollerAngle,states.mula(.38).rollerAngle,'stopped rollers rotate');
  assert(Math.abs(m.wheelAngle+(m.travel+90)/28)<1e-10,'carriage wheels slip');
  for(const id of ['roda','jenny','mula']){
    const s=states[id](p);
    if(s.wind===0)assert.equal(s.copRadius,states[id](0).copRadius,'cop grows before winding');
    if(i){
      const prev=states[id](p-.001);
      const a=s.spindleAngle,b=prev.spindleAngle;
      assert(Math.abs(a-b)<.6,`${id}: angular discontinuity`);
    }
  }
  samples++;
}
assert.equal(states.roda(1).output,1);assert.equal(states.jenny(1).output,8);
assert.equal(states.mula(1).output,6);assert.equal(states.llancadora(1).rows,2);
console.log(JSON.stringify({samples,checks:'shed clearance, beat timing, opposite roller rotation and feed, stopped rollers, rolling contact, winding, angular continuity'}));
