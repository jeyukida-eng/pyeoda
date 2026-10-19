import * as T from './vendor/three.js';

// Use the same original character artwork as the other arcade games.
export function createHero(kind=0,camera){
 const root=new T.Group();root.position.set(0,0,10.1);
 const texture=new T.TextureLoader().load(['characters/arrow.webp','characters/stone.webp','characters/petal.webp'][kind]);
 texture.colorSpace=T.SRGBColorSpace;
 const material=new T.SpriteMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
 const sprite=new T.Sprite(material);sprite.center.set(.5,0);sprite.renderOrder=100;root.add(sprite);
 let action=0;
 const right=new T.Vector3(),up=new T.Vector3(),forward=new T.Vector3();
 function dimensions(){
  if(!camera)return {w:.85,h:1.1};
  camera.getWorldDirection(forward);
  const depth=new T.Vector3().subVectors(root.position,camera.position).dot(forward);
  const perPixel=2*Math.max(1,depth)*Math.tan(camera.fov*Math.PI/360)/Math.max(1,innerHeight);
  const image=texture.image,ratio=image?.width&&image?.height?image.width/image.height:.78;
  return {w:64*perPixel*ratio,h:64*perPixel};
 }
 return {root,kind,trigger(){action=1;},origin(out=new T.Vector3()){
  const size=dimensions();
  if(camera){right.setFromMatrixColumn(camera.matrixWorld,0);up.setFromMatrixColumn(camera.matrixWorld,1);}
  else {right.set(1,0,0);up.set(0,1,0);}
  return out.copy(root.position).addScaledVector(right,size.w*.24).addScaledVector(up,size.h*.48);
 },update(dt,time,aiming,aim){
  action=Math.max(0,action-dt*6);
  const size=dimensions(),pulse=Math.sin(action*Math.PI);
  sprite.scale.set(size.w*(1+pulse*.06),size.h*(1-pulse*.04),1);
  sprite.position.y=pulse*.08;
  material.rotation=-pulse*.12;
 },details:{articulated:false,artwork:true,weapon:['bow','stone','petal'][kind]}};
}
