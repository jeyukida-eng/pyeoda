/* PYODA Galaxy Defense — Korean / English game UI, v1.2.3.
   No external translation service or network request is used. Player data remains untouched. */
(()=>{
'use strict';
const STORAGE_KEY='galaxy-defense-language';
let saved='';
try{saved=localStorage.getItem(STORAGE_KEY)||''}catch(_){}
const systemLocale=(navigator.languages&&navigator.languages[0])||navigator.language||'ko';
let locale=saved==='ko'||saved==='en'?saved:(/^ko(?:-|$)/i.test(systemLocale)?'ko':'en');

// Prefer whole sentences. Short phrases and dynamic score/stage fragments are handled below.
const lexicon=[
['무료 체험판 · 게임별 첫 1단계','Free Demo · Stage 1 of each game'],
['세 게임의 1단계 체험이 완료됐어요!','You have completed stage 1 of all three games!'],
['첫 단계 체험을 완료했어요!','You completed stage 1!'],
['모든 단계와 보스전은 Google Play 정식판에서 만날 수 있어요.','Enjoy all stages and boss battles in the full Google Play version.'],
['정식판 출시 준비 중','Full version coming to Google Play'],
['온라인 랭킹은 정식판에서 제공됩니다.','Online rankings are available in the full version.'],
['웹 체험판은 서버에 기록을 전송하지 않습니다. 내 기록은 기기에만 저장됩니다.','The web demo does not upload scores. Scores stay on this device.'],
['무료 체험판 · 내 기록만 저장됩니다','Free demo · Local scores only'],
['체험 완료!','Demo Complete!'],
['첫 단계 클리어','Stage 1 Cleared!'],
['필살기 사용','Use special attack'],
['게임 메뉴','Game Menu'],
['◇ 실드 없음','◇ No shield'],
['강화 ','Boost '],
['난이도 ','Difficulty '],
['↩ 처음으로','↩ Back to Start'],
['최종 ','Final '],
[' 게임 화면',' game screen'],
['별 ','Stars '],
['온라인 랭킹을 켜면 닉네임, 임의 생성한 기기 식별자, 점수와 단계가 서버에 전송되고 닉네임·기록이 공개됩니다. 켤까요?','Enable online rankings? Your nickname, randomly generated device ID, score and stage will be sent to the server. Your nickname and scores will be public. Continue?'],
['전체 순위는 각 플레이어의 최고 기록으로 집계됩니다. 로그인 없는 베타 순위로 점수 위변조 방지는 제한적입니다.','Global rankings use each player’s best score. This beta leaderboard has limited score verification.'],
['내 최근 기록은 이 기기의 브라우저에 최대 12회까지 저장됩니다. 브라우저 데이터를 지우면 사라질 수 있습니다.','Up to 12 recent plays are saved on this device. Clearing browser data may remove them.'],
['전체 순위는 인터넷 연결 시 표시됩니다. 비로그인 베타 기록으로 별도의 부정 점수 인증은 없습니다.','Online rankings require an internet connection. Scores are not independently verified.'],
['3명의 영웅 중 하나를 선택하세요.','Choose one of the three heroes.'],
['웨이브마다 적은 진화하고, 무기는 더욱 강해집니다.','Enemies evolve each wave, and your weapons grow stronger.'],
['적·보스·무기가 웨이브마다 진화합니다.','Enemies, bosses and weapons evolve each wave.'],
['3D 영웅 선택 · 5 · 10 · 15 · 20 WAVE마다 진화한 보스 등장','Choose a 3D hero · Evolving bosses at waves 5, 10, 15 and 20'],
['세 가지 독창적인 PYODA 미니게임','Three original PYODA mini-games'],
['세 친구의 우주 아케이드','A cosmic arcade with three friends'],
['세 친구의 아케이드','Arcade of three heroes'],
['캐릭터를 고른 뒤 게임을 선택하세요.','Choose a character, then choose a game.'],
['함께할 친구를 골라주세요.','Choose your companion.'],
['와 함께할 게임을 고르세요.',' — choose a game to play.'],
['손끝으로 별을 연결','Connect stars with your finger'],
['다른 영웅 고르기','Choose another hero'],
['나가기 · 캐릭터 선택으로','Exit · Choose character'],
['게임 종료하고 캐릭터 선택으로 돌아가기','Exit game and return to character select'],
['좌우로 캐릭터를 움직이는 자동 발사 우주 슈팅 게임','Auto-firing space shooter: move left and right'],
['손가락을 좌우로 움직여 캐릭터 조종','Swipe left or right to control your hero'],
['휴대폰: 손가락 좌우 이동 · 자동 발사 · 필살기 버튼','Mobile: Swipe to move · Auto-fire · Special attack'],
['PC: ← → 또는 A D 이동 · B 폭탄 · P 일시정지','PC: ← → or A D to move · B special · P pause'],
['종료 시 최고점 자동 등록','Your best score is saved automatically'],
['온라인 랭킹 켜짐','Online rankings: ON'],
['온라인 랭킹 꺼짐','Online rankings: OFF'],
['개인정보처리방침','Privacy Policy'],
['전체 순위는 인터넷 연결 시 표시됩니다.','Online rankings require an internet connection.'],
['전체 순위 불러오는 중…','Loading global rankings…'],
['순위 불러오는 중…','Loading rankings…'],
['순위 가져오는 중…','Loading rankings…'],
['연결 안 됨 · 내 기록은 저장됩니다','Offline · Your scores are saved locally'],
['연결 안 됨','Offline'],
['인터넷 연결을 확인해 주세요.','Please check your internet connection.'],
['첫 번째 기록의 주인공이 되어주세요','Set the first high score!'],
['내 기기에 기록이 저장됩니다','Scores are saved on this device'],
['아직 등록된 기록이 없습니다.','No scores have been submitted yet.'],
['아직 플레이한 기록이 없어요.','No play history yet.'],
['이 게임의 첫 기록을 만들어 보세요','Be the first to set a record in this game'],
[' 기록은 이 기기에 저장됩니다. 게임별 최근 12회 기록입니다.',' records are saved on this device, up to 12 plays per game.'],
['황금 화살 미사일','Golden Arrow Missiles'],
['몽돌 관통탄','Piercing Pebble Shots'],
['꽃잎 유도탄','Homing Petal Shots'],
['황금화살 · 폭발','Golden Arrow · Explosion'],
['몽돌 · 충격파','Pebble · Shockwave'],
['꽃잎 · 회복','Petal · Recovery'],
['황금 길잡이','Golden Guide'],
['시간 지킴이','Time Keeper'],
['꽃빛 점수','Petal Bonus'],
['시간 +5초','Time +5s'],
['꽃빛 추가점수','Petal Bonus Points'],
['부이 · 황금화살 / 연결 범위 확대','Bui · Golden Arrow / Wider connection range'],
['몽돌이 · 몽돌 / 시간 +5초','Mongdori · Pebble / +5 seconds'],
['소랑이 · 꽃잎 / 점수 +30%','Sorangi · Petal / +30% score'],
['화염 탄환과 폭발 특화','Fire shots and explosions'],
['적의 공격에 주의 · 발판을 이동하세요','Watch enemy attacks · Move between platforms'],
['가까운 별빛구슬을 연결해 콤보 공명!!','Link nearby light orbs for a combo resonance!'],
['적의 이동과 공격이 빨라집니다','Enemies move and attack faster'],
['빛나는 문양부터 차례로 연결하세요','Connect the glowing symbols in order'],
['잠시 후 다음 별자리','Next constellation coming soon'],
['빛나는 ','Glowing '],
['부터 차례로 이어주세요',' — connect in order'],
['부터 차례로 연결',' — connect in order'],
['↔ 손가락으로 좌우 이동','↔ Swipe left or right'],
['↔ 이곳을 밀어 좌우 이동','↔ Swipe here to move'],
['↖ ↗ 이동+점프 · 가까운 별빛구슬은 콤보 공명!','↖ ↗ Move + jump · Link nearby light orbs!'],
['↖ ↗ 이동+점프 · 공명! 길게 · 콤보 공명!','↖ ↗ Move + jump · Hold Resonance for combos!'],
['닿거나 공명! 버튼으로 콤보 공명!','Get closer or press Resonance to start a combo!'],
['콤보 공명! · +','Combo Resonance! · +'],
['콤보 공명! ×','Combo Resonance! ×'],
['별자리 완성!','Constellation Complete!'],
['다음 단계 · STAGE ','Next Stage · STAGE '],
['성운 코어 · ','Nebula Core · '],
['성장 준비','Ready to grow'],
['쉴드 없음','No shield'],
['◇ 실드 ','◇ Shield '],
['공격에 가까이!','Get closer!'],
['무기 성장 진행','Weapon upgrades in progress'],
['적 공격력','Enemy power'],
['새로운 공격 패턴','New attack pattern'],
['광폭화 · 공격 가속','Frenzy · Faster attacks'],
['격파 · 다음 무기 진화','Defeated · Weapon upgrade next'],
['연사 속도 강화 · 12초','Rapid fire · 12s'],
['15초 보호막','Shield · 15s'],
['필살기 충전','Special attack charged'],
['체력 회복','HP restored'],
['보스 클리어','Boss Defeated'],
['보스 등장','Boss Incoming'],
['한계 돌파','Limit Break'],
['궁극 무기','Ultimate Weapon'],
['레벨업!','Level Up!'],
['필살기 +1','Special +1'],
['필살기!','Special Attack!'],
['별자리 잇기','Connect the Stars'],
['별빛대작전','Starlight Mission'],
['우주방어전','Space Defense'],
['은하 방어선','Galaxy Defense'],
['황금화살','Golden Arrow'],
['황금 화살','Golden Arrow'],
['몽돌이','Mongdori'],
['소랑이','Sorangi'],
['부이','Bui'],
['몽돌','Pebble'],
['꽃잎','Petal'],
['별여행자','StarTraveler'],
['일시 정지','Paused'],
['잠깐 쉬어가기','Take a Break'],
['준비되면 계속해요','Resume when ready'],
['계속하거나 게임을 종료하세요.','Resume or exit the game.'],
['영웅을 바꾸거나 다시 도전하세요.','Change heroes or try again.'],
['다시 한 판?','One more round?'],
['다시 플레이','Play Again'],
['계속하기','Resume'],
['플레이 기록','Play History'],
['게임 종료','Game Over'],
['작전 종료','Mission Complete'],
['게임 고르기','Choose Game'],
['게임 시작','Start Game'],
['캐릭터 변경','Change Hero'],
['캐릭터 선택','Choose Hero'],
['선택한 영웅','Selected hero'],
['선택','Select'],
['플레이','Play'],
['랭킹 TOP 3','Ranking TOP 3'],
['랭킹','Ranking'],
['전체 TOP 10','Global TOP 10'],
['내 최고 TOP 10','My Best TOP 10'],
['내 TOP 3','My TOP 3'],
['내 최근 기록','My Recent Scores'],
['내 기록','My Score'],
['내 최고 ','Personal Best '],
['순위·기록','Rankings · Scores'],
['순위 · 기록','Rankings · Scores'],
['닉네임','Nickname'],
['나가기','Exit'],
['닫기','Close'],
['일시정지','Pause'],
['사운드 켜짐','Sound On'],
['사운드 꺼짐','Sound Off'],
['필살기','Special'],
['준비 완료','Ready'],
['단계 · ','Tier · '],
[' · 단계 ',' · Stage '],
['단계','Stage'],
['형태','Form'],
['웨이브','Wave'],
['초 보호막','s shield'],
['초','s'],
['개 연결',' connected'],
[' 연결 · ',' linked · '],
['연결 범위 확대','Wider connection range'],
[' 연결',' linked'],
['격파!','Defeated!'],
['연사','Rapid Fire'],
['쉴드','Shield'],
['점프','Jump'],
['발판 내려가기','Drop through platform'],
['왼쪽','Left'],
['오른쪽','Right'],
['방향 패드','D-pad'],
['방향 ','Direction '],
['콤보 공명!','Combo Resonance!'],
['콤보','Combo'],
['공명!','Resonate!'],
['성운 코어','Nebula Core'],
['사운드','Sound'],
['캐릭터','Hero'],
['생명','Lives'],
['점수','Score'],
['순위','Rank'],
['슈팅','Shooter'],
['점 ','pts '],
['점',' pts'],
['위','th'],
['게임','Game'],
['별자리','Constellation'],
['시작','Start'],
['다음','Next'],
['최근','Recent'],
['내','My']
].sort((a,b)=>b[0].length-a[0].length);

function english(source){
 if(!source||!/[가-힣]/.test(source))return source;
 let value=source;
 for(const [ko,en] of lexicon)if(value.includes(ko))value=value.split(ko).join(en);
 return value;
}
const originalText=new WeakMap();
const originalAttributes=new WeakMap();
const attrNames=['aria-label','placeholder','alt','title'];
function translateText(node){
 if(node.nodeType!==3)return;
 const now=node.nodeValue;
 if(!now||!now.trim())return;
 let source=originalText.get(node);
 if(source===undefined||(now!==source&&now!==english(source))){
  source=now;
  originalText.set(node,source);
 }
 const wanted=locale==='en'?english(source):source;
 if(now!==wanted)node.nodeValue=wanted;
}
function translateAttrs(el){
 if(el.nodeType!==1)return;
 let original=originalAttributes.get(el);
 if(!original){original={};originalAttributes.set(el,original)}
 for(const attr of attrNames){
  if(!el.hasAttribute(attr))continue;
  const now=el.getAttribute(attr);
  let source=original[attr];
  if(source===undefined||(now!==source&&now!==english(source))){source=now;original[attr]=source}
  const wanted=locale==='en'?english(source):source;
  if(now!==wanted)el.setAttribute(attr,wanted);
 }
}
function apply(node){
 if(node.nodeType===3){translateText(node);return}
 if(node.nodeType!==1&&node.nodeType!==9)return;
 if(node.nodeType===1)translateAttrs(node);
 const walker=document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const item=walker.currentNode;
  if(item.nodeType===3)translateText(item);
  else translateAttrs(item);
 }
}
const game=document.querySelector('.shell');
if(!game)return;
const overlay=document.getElementById('overlay');
const switcher=document.createElement('div');
switcher.className='galaxy-lang-switch';
switcher.setAttribute('role','group');
switcher.setAttribute('aria-label','Language / 언어');
const koButton=document.createElement('button');
const enButton=document.createElement('button');
for(const [button,code,name] of [[koButton,'ko','한국어'],[enButton,'en','EN']]){
 button.type='button';button.dataset.lang=code;button.textContent=name;
 button.setAttribute('aria-label',code==='ko'?'한국어로 표시':'Show game in English');
 button.addEventListener('click',event=>{event.stopPropagation();setLanguage(code,true)});
 switcher.append(button);
}
overlay.append(switcher);
const css=document.createElement('style');
css.textContent='.galaxy-lang-switch{position:absolute;z-index:15;right:12px;top:calc(10px + env(safe-area-inset-top));display:flex;align-items:center;gap:3px;padding:3px;border:1px solid #77c4de59;border-radius:999px;background:#07172ada;backdrop-filter:blur(6px)}.galaxy-lang-switch button{min-width:40px;height:27px;padding:0 9px;border:none;border-radius:999px;background:transparent;color:#a4bbd2;font-size:10px;font-weight:850;white-space:nowrap;touch-action:manipulation}.galaxy-lang-switch button[aria-pressed="true"]{background:#6aefd9;color:#051b24}.galaxy-lang-switch button:focus-visible{outline:2px solid #fff;outline-offset:1px}';
document.head.append(css);
function updateButtons(){
 for(const button of [koButton,enButton])button.setAttribute('aria-pressed',String(button.dataset.lang===locale));
 document.documentElement.lang=locale;
 document.title=locale==='en'?'Galaxy Defense · PYODA':'은하 방어선 · PYODA';
 for(const [name,value] of [['apple-mobile-web-app-title',locale==='en'?'Galaxy Defense':'은하 방어선'],['application-name',locale==='en'?'Galaxy Defense':'은하 방어선']]){
  const el=document.querySelector('meta[name="'+name+'"]');if(el)el.content=value;
 }
}
function setLanguage(next,persist){
 locale=next;
 if(persist)try{localStorage.setItem(STORAGE_KEY,locale)}catch(_){}
 updateButtons();
 apply(game);
}
const observer=new MutationObserver(mutations=>{
 const dirty=new Set();
 for(const m of mutations){
  if(m.type==='characterData'||m.type==='attributes')dirty.add(m.target);
  else if(m.type==='childList')for(const n of m.addedNodes)dirty.add(n);
 }
 for(const n of dirty)apply(n);
});
observer.observe(game,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attrNames});
if(typeof CanvasRenderingContext2D!=='undefined'){
 for(const name of ['fillText','strokeText']){
  const native=CanvasRenderingContext2D.prototype[name];
  if(typeof native==='function')CanvasRenderingContext2D.prototype[name]=function(label,...args){
   return native.call(this,locale==='en'?english(String(label)):label,...args);
  };
 }
}
const nativeConfirm=window.confirm.bind(window);
window.confirm=function(message){return nativeConfirm(locale==='en'?english(String(message)):message)};
setLanguage(locale,false);
window.galaxyLanguage={get current(){return locale},set:(code)=>{if(code==='ko'||code==='en')setLanguage(code,true)}};
})();