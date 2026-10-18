// Deterministic, continuously scaled stages. Geometry stays inside the same arena.
export function createLevel(stage) {
  if(!Number.isSafeInteger(stage)||stage<1)throw new RangeError('Invalid stage');
  const rank=stage-1,zones=Math.min(4,2+Math.floor(rank/4));
  const layers=Math.min(3,1+Math.floor(rank/8));
  const rows=Math.min(5,2+Math.floor(rank/2));
  const ammo=zones*layers+Math.max(3,10-Math.floor(rank/3));
  const density=1+.65*Math.log1p(rank/8);
  const reinforcement=Math.min(.75,rank/30);
  const blocks=[];const segment=7.8/zones;
  const family=rank%6;
  function add(x,y,z,w,h,d,reinforced=false,round=false){blocks.push({x,y:y+2.6,z,w,h,d,reinforced,round});}
  for(let layer=0;layer<layers;layer++){
    const z=(layer-(layers-1)/2)*.93;
    for(let zone=0;zone<zones;zone++){
      const center=(zone-(zones-1)/2)*segment;
      const width=segment-.20;
      const pillarWidth=.36+Math.min(.22,rank*.009);
      const footHeight=.75;
      // Wider pillars and additional independent towers make later stages resist a single hit.
      for(let side of [-1,1])add(center+side*width*.32,footHeight/2,z,pillarWidth,footHeight,.82,rank>=4&&((zone+layer)%3===0));
      add(center,footHeight+.14,z,width,.28,.85,rank>=9&&(zone+layer)%2===0);
      const cols=width>2.2?3:width>1.9?2:1;
      const cw=(width-.08)/cols;
      for(let row=0;row<rows;row++){
        // A different deterministic silhouette every stage; no overlap or unsupported pieces.
        const trim=0;
        const n=cols-trim;
        for(let col=0;col<n;col++){
          const x=center+(col-(n-1)/2)*cw;
          const hardened=rank>=4&&((zone*17+row*7+col*3+layer*11)%100)/100<reinforcement;
          add(x,footHeight+.28+.36+row*.72,z,cw-.035,.72,.80,hardened,false);
        }
      }
    }
  }
  const names=['운석 전초기지','쌍둥이 위성','성운의 관문','외곽 방어탑','심우주 장벽','합금 요새'];
  return {stage,zones,layers,rows,ammo,density,reinforcement,blocks,name:names[family],difficulty:rank<4?'입문':rank<8?'도전':rank<16?'고수':rank<28?'달인':'극한',pressure:density*layers*zones*rows/ammo};
}
