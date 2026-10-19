import assert from 'node:assert/strict';
import * as C from '../games/galaxy-defense/orbital/vendor/cannon.js';
import {planShot,shotRadius} from '../games/galaxy-defense/orbital/ballistics.js';
let cases=0;
for(const type of ['stone','arrow','petal'])for(const y of [.25,.6,1.2])for(const z of [-.93,0,.93])for(const x of [-3,0,3]){
 const origin={x:.15,y,z:10.1},target={x,y:2.6+shotRadius(type)+.09,z:z+.4};
 const plan=planShot(origin,target,type);
 const world=new C.World({gravity:new C.Vec3(0,-12,0)});
 const table=new C.Body({mass:0,shape:new C.Box(new C.Vec3(4.4,.2,1.5)),position:new C.Vec3(0,2.4,0)});
 const block=new C.Body({mass:0,shape:new C.Box(new C.Vec3(.45,.34,.4)),position:new C.Vec3(x,2.94,z)});
 world.addBody(table);world.addBody(block);
 const shot=new C.Body({mass:6,shape:new C.Sphere(shotRadius(type)),position:new C.Vec3(origin.x,origin.y,origin.z),linearDamping:.015});
 shot.velocity.set(plan.velocity.x,plan.velocity.y,plan.velocity.z);world.addBody(shot);
 let first=null;shot.addEventListener('collide',e=>{first??=e.body===table?'table':'block'});
 for(let t=0;t<plan.duration+.2&&!first;t+=1/120)world.step(1/120);
 assert.equal(first,'block',`${type}, origin ${y}, low block (${x},${z}) first hits ${first}`);cases++;
}
console.log(`PASS: ${cases} low-block shots hit the block before the platform`);
