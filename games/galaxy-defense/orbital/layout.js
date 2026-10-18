import * as T from './vendor/three.js';
// Fit both the complete target and the foreground launcher between the HUD bands.
export function fitCamera(camera,width,height,safeTop=0,safeBottom=0){
 const landscape=width>height&&height<600;
 const mobile=width<=700||landscape,short=height<600;
 const top=(landscape?82:mobile?(short?106:126):165)+safeTop;
 const bottom=(landscape?76:mobile?(short?86:116):142)+safeBottom;
 camera.aspect=width/height;
 camera.setViewOffset(width,height,0,(bottom-top)/2,width,height);
 const points=[];
 for(const [xs,ys,zs] of [ [[-4.8,4.8],[.05,8.0],[-1.6,1.6]],[[-1,1],[.05,2.1],[9.4,11.6]] ])
  for(const x of xs)for(const y of ys)for(const z of zs)points.push(new T.Vector3(x,y,z));
 const margin=mobile?12:24,target=new T.Vector3(0,4.0,0);
 let distance=15;
 for(;distance<160;distance+=.25){
  camera.position.set(0,4+distance*.12,distance);camera.lookAt(target);camera.updateMatrixWorld();camera.updateProjectionMatrix();
  const fits=points.every(p=>{const q=p.clone().project(camera);const x=(q.x+1)*width/2,y=(1-q.y)*height/2;return x>=margin&&x<=width-margin&&y>=top&&y<=height-bottom});
  if(fits)break;
 }
 return {width,height,top,bottom,margin,distance,points};
}
