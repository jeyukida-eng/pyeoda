// Six supported silhouettes repeat with increasing height, depth and reinforcement.
export function createLevel(stage) {
 if(!Number.isSafeInteger(stage)||stage<1)throw new RangeError('Invalid stage');
 const rank=stage-1,family=rank%6,cycle=Math.floor(rank/6);
 const layers=Math.min(3,1+Math.floor(rank/8)),ammo=30;
 const density=1+.65*Math.log1p(rank/8),reinforcement=Math.min(.65,rank/40);
 const blocks=[],height=Math.min(5,3+Math.floor(cycle/2));
 function add(x,y,z,w,h,d=.8){
  const i=blocks.length;
  blocks.push({x,y:y+2.6,z,w,h,d,round:false,reinforced:rank>=6&&((i*37+stage*11)%100)/100<reinforcement});
 }
 function column(x,z,rows,width=.9,base=0,step=.68){for(let r=0;r<rows;r++)add(x,base+(r+.5)*step,z,width,step);}
 for(let layer=0;layer<layers;layer++){
  const z=(layer-(layers-1)/2)*.93;
  if(family===0){ // Three slim towers, with a higher central spire.
   for(const x of [-2.65,0,2.65]){
    const rows=height+(x===0?1:0);
    column(x,z,rows,.95);
    add(x,rows*.68+.13,z,1.65,.26);
    add(x,rows*.68+.26+.3,z,.63,.6);
   }
  }else if(family===1){ // Each pyramid row rests across the row below.
   const rows=height+1,unit=7.4/rows;
   for(let r=0;r<rows;r++)for(let c=0;c<rows-r;c++)add((c-(rows-r-1)/2)*unit,(r+.5)*.64,z,unit-.025,.64);
  }else if(family===2){ // Open bridge: break either stacked pier to drop its deck.
   const rows=height-1,top=rows*.68;
   for(const x of [-2.7,2.7])column(x,z,rows,.75);
   add(0,top+.16,z,6.5,.32);
   for(const x of [-2.7,0,2.7])column(x,z,2,.7,top+.32,.6);
  }else if(family===3){ // Broad wall and crenellations rather than separate towers.
   for(let r=0;r<height;r++)for(let c=0;c<7;c++)add((c-3)*1.03,(r+.5)*.62,z,1.01,.62);
   for(const c of [-3,-1,1,3])add(c*1.03,height*.62+.25,z,.68,.5);
  }else if(family===4){ // Two hollow towers and a narrow bridge high above the opening.
   const rows=height+1,top=rows*.62;
   for(const centre of [-2.55,2.55]){
    for(const dx of [-.53,.53])column(centre+dx,z,rows,.58,0,.62);
    add(centre,top+.14,z,1.95,.28);
    add(centre,top+.28+.29,z,.68,.58);
   }
   add(0,top+.28+.13,z,4.15,.26);
  }else{ // Two opposed staircases, with an open valley in the centre.
   for(let c=0;c<8;c++){
    const rows=1+Math.floor(Math.abs(c-3.5)/3.5*(height-1));
    column((c-3.5)*.95,z,rows,.92,0,.66);
   }
  }
 }
 const names=['별빛 첨탑','운석 피라미드','성운 다리','은하 성벽','쌍둥이 요새','궤도 계단'];
 const hints=['높은 첨탑 아래를 노려 연쇄 붕괴!','피라미드 아래층부터 쓸어보세요','다리 양끝 받침을 무너뜨려보세요','성벽의 한쪽 아래를 집중 공격!','두 요새의 가느다란 기둥을 노려보세요','양쪽 높은 계단부터 무너뜨려보세요'];
 return {stage,family,zones:family===0?3:family===4?2:1,layers,rows:height,ammo,density,reinforcement,blocks,name:names[family],hint:hints[family],difficulty:rank<4?'입문':rank<8?'도전':rank<16?'고수':rank<28?'달인':'극한',pressure:density*blocks.length/ammo};
}
