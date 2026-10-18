// Sleeping bodies stop emitting fresh Cannon contacts. Keep their last support links
// only while both bodies remain stationary; rebuild as soon as either wakes.
let retained=[];
export function resetContacts(){retained=[];}
export function rememberContacts(contacts){
  const stationary=b=>b.mass===0 || b.sleepState===2;
  retained=retained.filter(c=>stationary(c.bi)&&stationary(c.bj));
  const pairs=new Set(retained.map(c=>c.bi.id+':'+c.bj.id));
  for(const c of contacts){const key=c.bi.id+':'+c.bj.id;if(pairs.has(key))continue;pairs.add(key);retained.push({bi:c.bi,bj:c.bj,ni:{y:c.ni.y}});}
  return retained;
}
// A block is still in play while supported by the table, directly or via other blocks.
// Cannon contact normals point from body i toward body j.
export function supportedBy(contacts, root, blockIds) {
  const edges = new Map();
  for (const c of contacts) {
    let lower, upper;
    if(c.ni.y > .3) { lower=c.bi; upper=c.bj; }
    else if(c.ni.y < -.3) { lower=c.bj; upper=c.bi; }
    else continue;
    if(!blockIds.has(upper.id) || (lower.id!==root.id && !blockIds.has(lower.id))) continue;
    if(!edges.has(lower.id)) edges.set(lower.id,[]);
    edges.get(lower.id).push(upper.id);
  }
  const supported = new Set(), queue=[root.id];
  for(let i=0;i<queue.length;i++) for(const id of edges.get(queue[i])||[]) {
    if(!supported.has(id)) { supported.add(id);queue.push(id); }
  }
  return supported;
}
export function updateClearance(blocks, contacts, table, floor, tableY, dt) {
  contacts=rememberContacts(contacts);
  const ids=new Set(blocks.map(o=>o.b.id));
  const onTable=supportedBy(contacts,table,ids), onGround=supportedBy(contacts,floor,ids);
  let newly=0;
  for(const o of blocks) {
    if(o.scored) continue;
    o.b.updateAABB();
    const {lowerBound:lo,upperBound:hi}=o.b.aabb;
    const beyond=lo.x>4.4 || hi.x< -4.4 || lo.z>1.5 || hi.z< -1.5;
    const off=!onTable.has(o.b.id) && (onGround.has(o.b.id) || o.b.position.y<tableY-.45 || beyond);
    o.clearTime=off?(o.clearTime||0)+dt:0;
    if(o.clearTime>=.3) {o.scored=true;newly++;}
  }
  return newly;
}
