// Last-shot outcomes use simulated time, so slow frames cannot shorten collapse.
export function resetRoundSettlement(state) { state.quiet=0; }
export function shouldFinishRound(state, blocks, sinceShot, dt, newly=0) {
  if(sinceShot<3) {state.quiet=0;return false;}
  const moving=blocks.some(o=>!o.scored && o.b.sleepState!==2 &&
    (o.b.velocity.lengthSquared()>.015 || o.b.angularVelocity.lengthSquared()>.025));
  state.quiet=(moving||newly)?0:state.quiet+dt;
  // Keep a ceiling for endlessly rocking pieces, but let normal collapses finish.
  return state.quiet>=1 || sinceShot>=15;
}
