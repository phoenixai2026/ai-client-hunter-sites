/* Lorosae Legends: deterministic, original triple-collection puzzle engine. */
export const FACE_NAMES=['Sunrise','Mountain','Tais','Wave','Coffee','Drum','Star','Shell','Flower','Boat','Palm','Bird'];
export const MAX_LEVEL=50;
export function hash(s){let h=2166136261;for(const c of String(s)){h=Math.imul(h^c.charCodeAt(0),16777619)}return h>>>0}
export function random(seed){let x=seed>>>0;return ()=>{x+=0x6d2b79f5;let t=x;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function shuffle(a,r){for(let i=a.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function levelConfig(level){if(!Number.isInteger(level)||level<1||level>MAX_LEVEL)throw Error('Invalid level');const sets=Math.min(6+Math.floor((level-1)*0.30),19);return {sets,columns:6,rows:Math.ceil(sets*3/6),layers:level<4?1:level<15?2:3,types:Math.min(4+Math.floor(level/6),12)};}
export function generate(level,seed=`campaign-${level}`){const cfg=levelConfig(level),r=random(hash(seed)),total=cfg.sets*3;
  const positions=[];for(let i=0;i<total;i++){const x=i%cfg.columns,y=Math.floor(i/cfg.columns);positions.push({x,y,z:0});}
  let count=0;if(cfg.layers>1){const candidates=shuffle(positions.map((_,i)=>i).filter(i=>i>=cfg.columns && i<total-cfg.columns),r);for(const i of candidates){if(count>=Math.floor(total*(cfg.layers===2?.16:.25)))break;let x=positions[i].x,y=positions[i].y;if(positions.some((p,j)=>j!==i&&p.x===x&&p.y===y))continue;positions[i].z=1;positions[i].x=(x+1)%cfg.columns;positions[i].y=y-1;count++;}}
  // Build a selectable winning sequence, then assign each consecutive three tiles a matching face.
  const pending=new Set(positions.map((_,i)=>i)),order=[];
  while(pending.size){const exposed=[...pending].filter(i=>!positions.some((p,j)=>pending.has(j)&&j!==i&&p.x===positions[i].x&&p.y===positions[i].y&&p.z>positions[i].z));if(!exposed.length)throw Error('Inaccessible board');const chosen=exposed[Math.floor(r()*exposed.length)];pending.delete(chosen);order.push(chosen);}
  const groupFaces=shuffle(Array.from({length:cfg.sets},(_,i)=>i%cfg.types),r),faces=Array(total);
  order.forEach((i,n)=>faces[i]=groupFaces[Math.floor(n/3)]);
  return {id:String(seed),level,solution:order,tiles:positions.map((p,i)=>({id:i,...p,face:faces[i],removed:false})),tray:[],moves:0,undos:[],used:{hint:0,undo:0,shuffle:0},completed:false,failed:false};
}
export function playable(tile,tiles){return !tile.removed&&!tiles.some(t=>!t.removed&&t.id!==tile.id&&t.x===tile.x&&t.y===tile.y&&t.z>tile.z)}
export function visibleTiles(state){return state.tiles.filter(t=>playable(t,state.tiles))}
export function clone(s){return JSON.parse(JSON.stringify(s))}
export function pick(state,id){if(state.completed||state.failed) return {state,reason:'finished'};const t=state.tiles.find(t=>t.id===id);if(!t||!playable(t,state.tiles))return {state,reason:'blocked'};const s=clone(state);s.undos.push({tiles:state.tiles.map(x=>x.removed),tray:[...state.tray],moves:state.moves});if(s.undos.length>60)s.undos.shift();s.tiles.find(x=>x.id===id).removed=true;s.tray.push(t.face);s.moves++;
  if(s.tray.filter(f=>f===t.face).length===3)s.tray=s.tray.filter(f=>f!==t.face);
  s.completed=s.tiles.every(t=>t.removed)&&s.tray.length===0;s.failed=!s.completed&&s.tray.length>=7;return {state:s,reason:s.completed?'won':s.failed?'full':'picked'};
}
export function undo(state){if(!state.undos.length)return state;const s=clone(state),p=s.undos.pop();s.tiles.forEach((t,i)=>t.removed=p.tiles[i]);s.tray=p.tray;s.moves=p.moves;s.failed=false;s.completed=false;s.used.undo++;return s}
export function shuffleRemaining(state){if(state.completed)return state;const s=clone(state),r=random(hash(s.id+':shuffle:'+s.moves+':'+s.used.shuffle)),pool=s.tiles.filter(t=>!t.removed).map(t=>t.face);shuffle(pool,r);s.tiles.filter(t=>!t.removed).forEach((t,i)=>t.face=pool[i]);s.undos=[];s.used.shuffle++;return s}
export function hint(state){const vis=visibleTiles(state);const matches=vis.filter(t=>state.tray.includes(t.face));if(matches.length)return matches[0].id;const counts=new Map();vis.forEach(t=>counts.set(t.face,(counts.get(t.face)||0)+1));return vis.find(t=>counts.get(t.face)>=2)?.id??vis[0]?.id??null}
export function dateKey(date=new Date()){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
export function validate(s){if(!s||!Array.isArray(s.tiles)||!Array.isArray(s.tray))return false;const ids=new Set(s.tiles.map(t=>t.id));if(ids.size!==s.tiles.length||s.tray.length>7)return false;return s.tiles.every(t=>Number.isInteger(t.face)&&t.face>=0&&t.face<12&&typeof t.removed==='boolean')}
