/* Lorosae Legends: original Mahjong-solitaire pair-matching engine. */
export const MAX_LEVEL=50;
export const FACE_NAMES=['Sunrise','Mountain','Tais','Wave','Coffee','Drum','Star','Shell','Flower','Boat','Palm','Bird'];
export function hash(s){let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
export function random(seed){let x=seed>>>0;return ()=>{x+=0x6d2b79f5;let t=x;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
export function shuffle(a,r){for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function levelConfig(level){if(!Number.isInteger(level)||level<1||level>50)throw Error('Invalid level');return {pairs:Math.min(12+Math.floor((level-1)*1.15),68),columns:8,layers:level<4?1:level<17?2:level<35?3:4,types:Math.min(6+Math.floor(level/7),12)}}
export function playable(tile,tiles){if(tile.removed)return false;const remaining=tiles.filter(t=>!t.removed&&t.id!==tile.id);if(remaining.some(t=>t.x===tile.x&&t.y===tile.y&&t.z>tile.z))return false;const left=remaining.some(t=>t.z===tile.z&&t.y===tile.y&&t.x===tile.x-1);const right=remaining.some(t=>t.z===tile.z&&t.y===tile.y&&t.x===tile.x+1);return !left||!right}
export function visibleTiles(s){return s.tiles.filter(t=>playable(t,s.tiles))}
export function clone(s){return JSON.parse(JSON.stringify(s))}
export function generate(level,seed=`campaign-${level}`){
 const cfg=levelConfig(level),rng=random(hash(seed)),count=cfg.pairs*2,spots=[];
 const rows=Math.ceil(count/8);for(let i=0;i<count;i++)spots.push({id:i,x:i%8,y:Math.floor(i/8),z:0});
 if(cfg.layers>1){let top=Math.min(Math.floor(count*.24),16);for(let i=0;i<top;i++){const p=spots[count-top+i];p.z=1;p.x=1+i%6;p.y=1+Math.floor(i/6)}}
 if(cfg.layers>2){let top=Math.min(Math.floor(count*.08),8);for(let i=0;i<top;i++){const p=spots[count-top+i];p.z=2;p.x=2+i%4;p.y=2+Math.floor(i/4)}}
 if(cfg.layers>3){let top=Math.min(Math.floor(count*.03),4);for(let i=0;i<top;i++){const p=spots[count-top+i];p.z=3;p.x=3+i%2;p.y=3+Math.floor(i/2)}}
 const remaining=new Set(spots.map(t=>t.id)),solution=[];
 while(remaining.size){const avail=shuffle(spots.filter(t=>remaining.has(t.id)&&playable(t,spots.filter(x=>remaining.has(x.id)))),rng);if(avail.length<2)throw Error('Cannot construct level');const pair=avail.slice(0,2).map(t=>t.id);solution.push(pair);pair.forEach(id=>remaining.delete(id))}
 const assigned=Array(count);const faces=shuffle(Array.from({length:cfg.pairs},(_,i)=>i%cfg.types),rng);solution.forEach((pair,i)=>pair.forEach(id=>assigned[id]=faces[i]));
 return {version:2,id:String(seed),level,tiles:spots.map((p,i)=>({...p,face:assigned[i],removed:false})),solution,moves:0,selected:null,undos:[],used:{hint:0,undo:0,shuffle:0},completed:false};
}
export function pairs(s){const vis=visibleTiles(s),out=[];for(let i=0;i<vis.length;i++)for(let j=i+1;j<vis.length;j++)if(vis[i].face===vis[j].face)out.push([vis[i].id,vis[j].id]);return out}
export function pick(s,id){if(s.completed)return {state:s,reason:'complete'};const tile=s.tiles.find(t=>t.id===id);if(!tile||!playable(tile,s.tiles))return {state:s,reason:'blocked'};const next=clone(s);if(next.selected===id){next.selected=null;return {state:next,reason:'deselected'}};if(next.selected===null){next.selected=id;return {state:next,reason:'selected'}};const previous=next.tiles.find(t=>t.id===next.selected);if(!previous||previous.removed||previous.face!==tile.face){next.selected=id;return {state:next,reason:'different'}};next.undos.push({ids:[previous.id,tile.id]});if(next.undos.length>100)next.undos.shift();previous.removed=true;next.tiles.find(t=>t.id===id).removed=true;next.selected=null;next.moves++;next.completed=next.tiles.every(t=>t.removed);return {state:next,reason:next.completed?'won':'matched'}}
export function undo(s){if(!s.undos.length)return s;const next=clone(s),last=next.undos.pop();last.ids.forEach(id=>next.tiles.find(t=>t.id===id).removed=false);next.selected=null;next.completed=false;next.moves--;next.used.undo++;return next}
export function shuffleRemaining(s){if(s.completed)return s;const next=clone(s),rng=random(hash(next.id+':shuffle:'+next.used.shuffle+':'+next.moves));const remaining=next.tiles.filter(t=>!t.removed);const faces=shuffle(remaining.map(t=>t.face),rng);remaining.forEach((t,i)=>t.face=faces[i]);next.selected=null;next.undos=[];next.used.shuffle++;return next}
export function hint(s){return pairs(s)[0]??null}
export function dateKey(date=new Date()){return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-')}
export function validate(s){return !!(s&&s.version===2&&Array.isArray(s.tiles)&&s.tiles.length>0&&s.tiles.length%2===0&&s.tiles.every(t=>Number.isInteger(t.face)&&t.face>=0&&t.face<12&&typeof t.removed==='boolean')&&Array.isArray(s.undos)&&s.tiles.map(t=>t.id).every((v,i,a)=>a.indexOf(v)===i))}
