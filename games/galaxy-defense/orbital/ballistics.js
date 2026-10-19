// Match the same gravity and damping used by the projectile physics bodies.
export const SHOT_GRAVITY=12;
export function shotRadius(type){return type==='stone'?.34:.25;}
export function planShot(origin,target,type){
 const radius=shotRadius(type),rimZ=1.5+radius+.04;
 let duration=type==='stone'?.78:.62;
 const dz=origin.z-target.z;
 if(dz>0&&origin.z>rimZ&&target.z<rimZ){
  const s=(origin.z-rimZ)/dz,linear=origin.y+(target.y-origin.y)*s;
  const required=2.6+radius+.09;
  if(linear<required)duration=Math.max(duration,Math.sqrt((required-linear)/(6*s*(1-s)))+.05);
 }
 // Cannon applies linear damping before integrating; compensate at the endpoint.
 const damping=.015,rate=-Math.log(1-damping),steps=Math.ceil(duration*120),dt=duration/steps;
 let travel=0,gravityDrop=0,unitSpeed=1,fallSpeed=0;
 const decay=Math.pow(1-damping,dt);
 for(let i=0;i<steps;i++){
  unitSpeed*=decay;fallSpeed=(fallSpeed-SHOT_GRAVITY*dt)*decay;
  travel+=unitSpeed*dt;gravityDrop+=fallSpeed*dt;
 }
 return {duration,velocity:{x:(target.x-origin.x)/travel,y:(target.y-origin.y-gravityDrop)/travel,z:(target.z-origin.z)/travel}};
}
export function sampleShot(origin,velocity,time){
 const rate=-Math.log(1-.015),travel=(1-Math.exp(-rate*time))/rate;
 return {x:origin.x+velocity.x*travel,y:origin.y+(velocity.y+SHOT_GRAVITY/rate)*travel-SHOT_GRAVITY*time/rate,z:origin.z+velocity.z*travel};
}
