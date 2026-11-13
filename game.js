'use strict';
const $=s=>document.querySelector(s), canvas=$('#world'), ctx=canvas.getContext('2d');
const COLORS={red:'#ed8976',green:'#88ad65',blue:'#85b9d0'};
const sites=[
 {name:'村口記憶所',npc:'阿村・引路人',icon:'⌂',x:890,y:690,c:'#ece9c9',roof:'#718c7b',photos:[1],tag:'START HERE',text:'歡迎來到黎明新村！我是守著村口記憶的阿村。\n小隊的任務，是把十個日常片刻收進手帳。走慢一點，答案都藏在你們拍的照片裡。',q:'這趟旅程，你想怎麼開始？',options:['帶著好奇心，慢慢走','只顧著滑手機'],answer:0,reward:'第一枚記憶，是願意出發的自己。'},
 {name:'二姐的店',npc:'小麥・巷口招呼員',icon:'☕',x:360,y:390,c:'#eee0b9',roof:'#bc7761',photos:[2],tag:'A WARM HELLO',text:'嗨，聞到巷口的生活氣息了嗎？\n看看你們拍下的招牌：有些店的名字，讀起來就像認識很久的人。',q:'照片裡的招牌寫著什麼？',options:['二姐的店','三哥的屋','小村便利站'],answer:0,reward:'你收到了巷口的一聲招呼。'},
 {name:'一號祕密基地',npc:'壹壹・數字收藏家',icon:'①',x:1370,y:380,c:'#dae9e4',roof:'#669797',photos:[3],tag:'FIND A NUMBER',text:'我把一個數字藏得非常顯眼。\n它就在白色圓圈裡，紅得像小紅的臉頰。找到它，就找到今天的小小起點。',q:'圓圈裡的紅色數字是？',options:['7','1','9'],answer:1,reward:'平凡的「1」，也是冒險的第一步。'},
 {name:'老屋巷弄',npc:'屋屋・老屋觀察員',icon:'⌑',x:355,y:760,c:'#e4d6bb',roof:'#9e745b',photos:[4,5,6],tag:'LOOK A LITTLE CLOSER',text:'往前走是房子，抬頭看卻都是細節。\n斜斜的屋簷、懸掛的招牌、新舊交錯的牆面。這裡沒有標準答案，只有你停下來看見的事。',q:'這組照片最值得慢下來看的是？',options:['屋簷、招牌與房子的細節','不存在的巨大瀑布'],answer:0,reward:'你把巷弄的線條，收進了記憶。'},
 {name:'陽光水果攤',npc:'蕉蕉・水果守望員',icon:'◒',x:1380,y:755,c:'#f1dd9f',roof:'#d9a155',photos:[7],tag:'THE EVERYDAY MARKET',text:'今天的小小任務：從照片裡找出掛起來的水果！\n一攤日常，藏著好多顏色。小紅說牠最喜歡這裡，因為每一顆水果都像裝著陽光。',q:'照片裡掛起來的黃色水果是？',options:['鳳梨','香蕉','檸檬'],answer:1,reward:'陽光的顏色，原來也可以帶著走。'},
 {name:'水溝蓋綠意',npc:'苔苔・植物朋友',icon:'♧',x:850,y:300,c:'#dce4b6',roof:'#7d9661',photos:[8],tag:'GREEN IS EVERYWHERE',text:'噓，小綠躲在葉子後面。\n牠說，村子裡的綠意不一定要很大一片，有時只是一條石縫、一小段枝葉，就足夠讓人心情變好。',q:'照片裡的綠葉從哪裡探出來？',options:['石牆邊','海面上','雪地裡'],answer:0,reward:'小綠加入隊伍！一起發現微小的生命力。',unlock:'green'},
 {name:'甜甜休息站',npc:'奶霜・點心研究員',icon:'♜',x:330,y:1120,c:'#efdbd0',roof:'#bf8b89',photos:[9],tag:'A SWEET LITTLE BREAK',text:'走累了就歇一下吧。\n這張照片裡，蛋糕頂端有奶油，還有好幾種水果。把旅程切成一口一口，也是一種很棒的探索方式。',q:'蛋糕上能看見哪一組水果？',options:['草莓與奇異果','榴槤與西瓜','辣椒與蒜頭'],answer:0,reward:'這一頁記憶，甜甜的。'},
 {name:'抬頭的天空',npc:'雲朵・天空郵差',icon:'☁',x:870,y:1125,c:'#dae7ec',roof:'#86a9b5',photos:[10],tag:'LOOK UP',text:'你剛剛都在看地面，現在換一個方向。\n屋頂上方的天空，有細細的白色軌跡。小藍總是跟著雲走，也想跟著願意抬頭的你。',q:'照片裡抬頭看見的底色是？',options:['紫色星空','藍色天空','黑色山洞'],answer:1,reward:'小藍加入隊伍！把天空也裝進口袋。',unlock:'blue'},
 {name:'窗邊慢時光',npc:'椅椅・放空練習生',icon:'▤',x:1400,y:1130,c:'#e5e2ce',roof:'#898975',photos:[11],tag:'A QUIET CORNER',text:'這裡不趕時間，連椅子都在曬太陽。\n坐下來，看看窗外的小樹。探險不只要走得遠，也可以是找到一個喜歡的角落，好好停留。',q:'照片裡，椅子旁還有什麼？',options:['窗邊的盆栽','一艘太空船'],answer:0,reward:'你學會了旅途中最重要的技能：休息。'},
 {name:'花園的悄悄話',npc:'花花・色彩保管員',icon:'✿',x:1460,y:110,c:'#ecd9c9',roof:'#b87963',photos:[12],tag:'RGB TOGETHER',text:'紅、綠、藍，都是看世界的方式。\n集合三色小隊後，再一起看看花園吧。紅磚、綠葉、明亮的日光，讓平凡的門口也變成故事。',q:'三色小隊想把什麼留在這裡？',options:['對日常的好奇心','亂丟的垃圾'],answer:0,reward:'三種顏色相遇，村落的記憶完整了。',gate:true}
];
const geo=window.VILLAGE_GEO;
const METERS_LON=111320*Math.cos(24.154*Math.PI/180), PX_PER_M=3;
function project(lng,lat){return {x:(lng-geo.bounds.west)*METERS_LON*PX_PER_M,y:(geo.bounds.north-lat)*111320*PX_PER_M}}
sites.forEach((s,i)=>{s.located=false;s.originalName=s.name;const a=geo.anchors.find(a=>a.id===i);if(a){Object.assign(s,project(a.lng,a.lat),{located:true,lat:a.lat,lng:a.lng,address:a.address,mapLink:a.source,placement:a.kind||'verified'});}});
sites[0].name='小康市場';
sites[3].name='小麥菓子';
sites[3].photos=[4,5,6,9];
sites[3].text='歡迎走進小麥菓子！\n看完老屋的屋簷和招牌，別忘了留一點時間給甜點。今天有一份水果蛋糕，要送給願意慢下來的探險家。';
sites[5].text='噓，小綠躲在水溝蓋旁的葉子後面。\n牠說，不起眼的溝蓋和石縫，也有努力探出頭的小生命。低頭看一看，綠意就在腳邊。';
sites[5].q='小綠躲在照片裡哪個地方？';
sites[5].options=['水溝蓋旁的綠葉間','海面上','雪地裡'];
sites[6].name='水果蛋糕獎勵';
sites[6].parent=3;

const COMPANIONS=[['阿村芽','red'],['小麥芽','red'],['壹壹芽','red'],['屋屋芽','red'],['蕉蕉芽','red'],['小綠','green'],['奶霜芽','red'],['小藍','blue'],['椅椅芽','red'],['花花芽','green']];
function companionRoster(){return [{id:'starter',name:'小紅',color:'red'},...state.stamps.map(id=>({id,name:COMPANIONS[id][0],color:COMPANIONS[id][1]}))]}
const spawn=project(geo.anchors[0].lng,geo.anchors[0].lat);
let saved={};try{saved=JSON.parse(localStorage.getItem('limin-rgb-v1')||'{}')}catch{};
let state={mapVersion:"geo-v1",stamps:Array.isArray(saved.stamps)?saved.stamps.filter(i=>Number.isInteger(i)&&i>=0&&i<sites.length):[],colors:['red'],items:{cake:!!saved.items?.cake||saved.stamps?.includes(6)||false},x:Number.isFinite(saved.x)?saved.x:900,y:Number.isFinite(saved.y)?saved.y:860,won:!!saved.won};
if(state.stamps.includes(5))state.colors.push('green');if(state.stamps.includes(7))state.colors.push('blue');
if(saved.mapVersion!=='geo-v1'){state.x=spawn.x;state.y=spawn.y+65;}
const player={x:state.x,y:state.y},target={x:state.x,y:state.y},camera={x:player.x,y:player.y};
let W=0,H=0,dpr=1,scale=1,tick=0,last=0,near=-1,sceneIndex=-1,photoIndex=0,started=false,moving=false,music=false,audio,timer,toastTimer,keys={},followers=[];
function syncCompanions(){const roster=companionRoster();while(followers.length<roster.length){const prev=followers.at(-1)||player;followers.push({x:prev.x-26,y:prev.y+12})}followers.length=roster.length}
syncCompanions();
const world={w:Math.round((geo.bounds.east-geo.bounds.west)*METERS_LON*3),h:Math.round((geo.bounds.north-geo.bounds.south)*111320*3)};
function save(){state.x=player.x;state.y=player.y;try{localStorage.setItem('limin-rgb-v1',JSON.stringify(state))}catch{}}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500)}
function updateHUD(){syncCompanions();const roster=companionRoster();$('#squad-count').textContent=`同行夥伴 ${roster.length} 位 · 每枚新記憶 +1`;$('#squad-count').title=roster.map(c=>c.name).join('、');const n=state.stamps.length;$('#progress').textContent=`${String(n).padStart(2,'0')} / 10`;$('#bar').style.width=n*10+'%';$('#quest-title').textContent=n===10?'十段日常，完整成一個村。':'把散落的日常，找回來。';$('#quest-sub').textContent=n===10?'回到小康市場，完成旅程':!state.colors.includes('green')?'到水溝蓋綠意，找到小綠':!state.colors.includes('blue')?'到抬頭的天空，找到小藍':'RGB 小隊集結！走訪剩下的景點';for(const c of ['green','blue']){const el=$('#'+c);el.style.opacity=state.colors.includes(c)?1:.55;el.textContent=`小${c==='green'?'綠':'藍'} · ${state.colors.includes(c)?'已同行':'待發現'}`}}
function resize(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=W*dpr;canvas.height=H*dpr;scale=W<650?.85:1;ctx.setTransform(dpr,0,0,dpr,0,0)}addEventListener('resize',resize);resize();
function rect(x,y,w,h,c,r=0){ctx.fillStyle=c;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
function ellipse(x,y,rx,ry,c){ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill()}
function text(t,x,y,size=12,c='#375b42',weight=600){ctx.fillStyle=c;ctx.font=`${weight} ${size}px "Noto Sans TC",sans-serif`;ctx.textAlign='center';ctx.fillText(t,x,y)}
function line(x,y,a,b,c,w){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(a,b);ctx.stroke()}
function tree(x,y,s=1){ellipse(x+8,y+5,27*s,10*s,'#27472e16');rect(x-4*s,y-34*s,8*s,37*s,'#94775c',3);ellipse(x,y-42*s,25*s,29*s,'#7d9d60');ellipse(x-14*s,y-45*s,19*s,21*s,'#91ae70');ellipse(x+12*s,y-51*s,18*s,21*s,'#a0ba79');ellipse(x+5*s,y-64*s,16*s,15*s,'#a9c47f')}
function flower(x,y,c){line(x,y,x,y-9,'#86a36b',1.3);for(let k=0;k<5;k++){let a=k/5*Math.PI*2;ellipse(x+Math.cos(a)*3,y-10+Math.sin(a)*3,2.3,2.3,c)}ellipse(x,y-10,1.5,1.5,'#fff8ca')}
let seed=72;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
const trees=[],flowers=[],tufts=[];for(let i=0;i<95;i++){let x=rand()*1800,y=rand()*1400;if(sites.filter(s=>s.located).every(s=>Math.hypot(x-s.x,y-s.y)>150)&&Math.abs(x-900)>70&&Math.abs(y-900)>60)trees.push({x,y,s:.7+rand()*.8})}for(let i=0;i<230;i++){let x=rand()*1800,y=rand()*1400;flowers.push({x,y,c:['#f6e9b2','#e6aaa1','#fff7df'][i%3]})}for(let i=0;i<450;i++)tufts.push({x:rand()*1800,y:rand()*1400});
function building(s,i){if(i===5){drawDrain(s);return}const x=s.x,y=s.y-65;ellipse(x+10,y+27,85,32,'#335f3514');const bw=i===0?165:135,bh=i===0?108:85;rect(x-bw/2,y-bh,bw,bh+28,s.c,7);rect(x-bw/2+6,y-bh+12,bw-12,6,'#ffffff40');rect(x-bw/2-9,y-bh-10,bw+18,24,s.roof,6);for(let k=0;k<7;k++)line(x-bw/2+k*bw/6,y-bh-5,x-bw/2+k*bw/6-3,y-bh+11,'#ffffff12',2);rect(x-16,y-30,32,58,'#5e7368',2);rect(x-13,y-26,26,30,'#b7d4cb',2);ellipse(x+9,y+12,2,2,'#d7d7ab');for(let d of [-1,1]){rect(x+d*46-16,y-48,32,32,'#fff9e4',3);rect(x+d*46-12,y-44,24,24,'#9cbbb3',1);line(x+d*46,y-44,x+d*46,y-20,'#eee9cc',2);line(x+d*46-12,y-32,x+d*46+12,y-32,'#eee9cc',2)}
 if(i===4){for(let k=0;k<6;k++)rect(x-74+k*25,y-53,25,15,k%2?'#f9e7b2':'#77916d',2);for(let k=0;k<8;k++)ellipse(x-60+k*17,y+14,8,8,k%2?'#edd66e':'#9db76a')}
 if(i===5){for(let k=0;k<6;k++)flower(x-70+k*27,y+20,'#f1e5b2')}
 if(i===9){for(let k=0;k<8;k++)flower(x-78+k*22,y+20,k%2?'#ec9a9d':'#f0d26e')}
 rect(x-58,y-bh-2,116,29,'#fff9e7',4);text(s.name,x,y-bh+17,11);const visited=state.stamps.includes(i),pulse=1+Math.sin(tick*3+i)*.06;ellipse(s.x,s.y+16,30*pulse,14*pulse,visited?'#f6eec477':'#f8f5cebb');ctx.strokeStyle=visited?'#e0c378':'#fff6d1';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(s.x,s.y+16,30*pulse,14*pulse,0,0,7);ctx.stroke();
 character(s.x,s.y-3,i===5?'green':i===7?'blue':i===9?'red':'npc',.8,false);text(visited?'✓':'···',s.x,s.y-48,16,visited?'#61864e':'#fffdf3');if(near===i){rect(x-76,s.y+38,152,26,'#fffdf3',12);text('點擊或按 E 進入',x,s.y+55,10)}
}
function character(x,y,color='red',size=1,walk=false,leader=false){const c=COLORS[color]||'#d8b27d',bob=walk?Math.sin(tick*12+x*.02)*2:Math.sin(tick*2+x)*.6;ctx.save();ctx.translate(x,y);ctx.scale(size,size);ellipse(2,8,11,5,'#35513922');if(leader){rect(-9,-22+bob,18,22,'#f4edce',7);ellipse(0,-22+bob,12,9,'#365c49');ellipse(0,-29+bob,7,4,'#466c55');rect(-5,-13+bob,10,8,'#ddc7a0',4);rect(-10,0+bob,20,11,'#e7c66c',4)}else{ellipse(0,-7+bob,10,13,c);ellipse(-3,-9+bob,2.3,3,'#fff8e5');ellipse(4,-9+bob,2.3,3,'#fff8e5');ellipse(-2.4,-9+bob,1.2,1.7,'#2c4e40');ellipse(4.6,-9+bob,1.2,1.7,'#2c4e40');line(0,-19+bob,1,-29+bob,'#55774c',1.7);ctx.save();ctx.translate(1,-29+bob);ctx.rotate(Math.sin(tick*3+x)*.2);ellipse(5,-2,7,3,'#74955b');ctx.restore()}
 line(-5,10,-5+(walk?Math.sin(tick*12)*3:0),14,'#4b6652',3);line(5,10,5-(walk?Math.sin(tick*12)*3:0),14,'#4b6652',3);ctx.restore()}
let groundLayer;
function makeGround(){
 const layer=document.createElement('canvas');layer.width=world.w;layer.height=world.h;const g=layer.getContext('2d');g.fillStyle='#cad8b3';g.fillRect(0,0,world.w,world.h);
 function path(points,close=false){g.beginPath();points.forEach((p,i)=>{const q=project(p[0],p[1]);i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)});if(close)g.closePath()}
 for(const a of geo.areas){path(a.p,true);g.fillStyle=a.kind==='water'?'#a8c8be':a.kind==='pitch'?'#bad09b':'#adc98f';g.fill()}
 for(const p of geo.buildings){path(p,true);g.fillStyle='#d6d1b8';g.fill();g.strokeStyle='#bfc4a6';g.lineWidth=1;g.stroke()}
 const sorted=[...geo.roads].sort((a,b)=>(a.kind.includes('ary')?-1:1)-(b.kind.includes('ary')?-1:1));
 for(const r of sorted){const widths={primary:37,secondary:30,tertiary:25,residential:20,living_street:16,unclassified:18,service:12,footway:8,path:7,cycleway:8,steps:6};let w=widths[r.kind]||14;path(r.p);g.strokeStyle='#c9c6aa';g.lineWidth=w+3;g.lineJoin='round';g.lineCap='round';g.stroke();g.strokeStyle=r.kind==='footway'||r.kind==='path'?'#e4dfbc':'#f6f0d8';g.lineWidth=w;g.stroke()}
 const labels=new Set();g.font='11px "Noto Sans TC",sans-serif';g.textAlign='center';
 for(const r of geo.roads){if(!r.name||labels.has(r.name)||r.name.includes('弄'))continue;const a=project(...r.p[0]),b=project(...r.p[r.p.length-1]);if(Math.hypot(a.x-b.x,a.y-b.y)<85)continue;labels.add(r.name);g.save();g.translate((a.x+b.x)/2,(a.y+b.y)/2);let angle=Math.atan2(b.y-a.y,b.x-a.x);if(angle>Math.PI/2)angle-=Math.PI;if(angle< -Math.PI/2)angle+=Math.PI;g.rotate(angle);g.lineWidth=4;g.strokeStyle='#fffbed';g.strokeText(r.name,0,-2);g.fillStyle='#7d876d';g.fillText(r.name,0,-2);g.restore()}
 for(const p of geo.landmarks){const a=project(p.lng,p.lat);g.font='bold 17px sans-serif';g.fillStyle='#5b7c4e';g.fillText('♧ '+p.name,a.x,a.y)}
 return layer;
}
function ground(){if(!groundLayer)groundLayer=makeGround();ctx.drawImage(groundLayer,0,0)}
function render(){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.save();ctx.translate(W/2-camera.x*scale,H*.55-camera.y*scale);ctx.scale(scale,scale);ground();const objects=[];sites.forEach((s,i)=>{if(s.located)objects.push({y:s.y-10,draw:()=>building(s,i)})});const roster=companionRoster();followers.forEach((f,i)=>objects.push({y:f.y,draw:()=>character(f.x,f.y,roster[i].color,.85,moving)}));objects.push({y:player.y,draw:()=>character(player.x,player.y,'red',1.15,moving,true)});objects.sort((a,b)=>a.y-b.y).forEach(o=>o.draw());if(moving){ctx.strokeStyle='#ffffff90';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(target.x,target.y,9,5,0,0,7);ctx.stroke()}
 for(let k=0;k<14;k++){let x=(k*153+tick*9)%1800,y=220+(k*179)%1000+Math.sin(tick+k)*18;ellipse(x,y,2,2,'#fff5bd99')};ctx.restore();const g=ctx.createRadialGradient(W/2,H/2,H*.15,W/2,H/2,H);g.addColorStop(0,'#ffffff00');g.addColorStop(1,'#25472812');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
function blockedUI(){return $('#story-player').open||!$('#intro').hidden||!$('#scene').hidden||!$('#book').hidden}
function frame(t){const dt=Math.min((t-last)/1000||0,.05);last=t;tick+=dt;moving=false;if(started&&!blockedUI()){let dx=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0),dy=(keys.ArrowDown||keys.s?1:0)-(keys.ArrowUp||keys.w?1:0);if(dx||dy){const n=Math.hypot(dx,dy);target.x=player.x+dx/n*20;target.y=player.y+dy/n*20}let dist=Math.hypot(target.x-player.x,target.y-player.y);if(dist>3){const v=Math.min(dist,175*dt);player.x+=(target.x-player.x)/dist*v;player.y+=(target.y-player.y)/dist*v;player.x=Math.max(80,Math.min(world.w-60,player.x));player.y=Math.max(100,Math.min(world.h-60,player.y));moving=true}let prev=player;for(const f of followers){let dd=Math.hypot(prev.x-f.x,prev.y-f.y);if(dd>24){f.x+=(prev.x-f.x)*(1-Math.exp(-dt*6));f.y+=(prev.y-f.y)*(1-Math.exp(-dt*6))}prev=f}let n=-1,nd=90;sites.forEach((s,i)=>{if(!s.located)return;let d=Math.hypot(s.x-player.x,s.y-player.y);if(d<nd){n=i;nd=d}});if(n!==near){near=n;$('#interact').hidden=n<0;if(n>=0)$('#interact').innerHTML=`進入${sites[n].name} <span>E ↵</span>`}let closest=sites.filter(s=>s.located).reduce((a,s)=>Math.hypot(s.x-player.x,s.y-player.y)<Math.hypot(a.x-player.x,a.y-player.y)?s:a);$('#location').textContent='✧ '+closest.name+'附近 · 北朝上'}
 camera.x+=(player.x-camera.x)*(1-Math.exp(-dt*5));camera.y+=(player.y-camera.y)*(1-Math.exp(-dt*5));render();requestAnimationFrame(frame)}requestAnimationFrame(frame);
canvas.addEventListener('pointerdown',e=>{if(blockedUI())return;const x=(e.clientX-W/2)/scale+camera.x,y=(e.clientY-H*.55)/scale+camera.y;let found=sites.findIndex(s=>s.located&&Math.abs(x-s.x)<90&&y>s.y-185&&y<s.y+45);if(found>=0){let s=sites[found];if(Math.hypot(s.x-player.x,s.y-player.y)<95){enter(found);return}target.x=s.x;target.y=s.y+45;toast(`前往 ${s.name}`)}else{target.x=Math.max(80,Math.min(world.w-60,x));target.y=Math.max(100,Math.min(world.h-60,y))}});
addEventListener('keydown',e=>{if($('#story-player').open)return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();keys[e.key.toLowerCase().startsWith('arrow')?e.key:e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='e'&&near>=0&&!blockedUI())enter(near);if(e.key==='Escape'){closeScene();$('#book').hidden=true}});addEventListener('keyup',e=>keys[e.key.toLowerCase().startsWith('arrow')?e.key:e.key.toLowerCase()]=false);addEventListener('blur',()=>{keys={};save()});
for(const b of document.querySelectorAll('#pad button')){let k={up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight'}[b.dataset.dir];b.addEventListener('pointerdown',e=>{e.preventDefault();keys[k]=true;b.setPointerCapture(e.pointerId)});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>{keys[k]=false;target.x=player.x;target.y=player.y})}
function btn(t,fn,cls=''){const b=document.createElement('button');b.textContent=t;b.className=cls;b.onclick=fn;$('#choices').append(b)}
function showPhoto(){const s=sites[sceneIndex];$('#scene-photo').src=`assets/spot-${String(s.photos[photoIndex]).padStart(2,'0')}.jpg`;$('#scene-photo').alt=s.name+'・你們拍攝的景點照片';$('#photo-dots').replaceChildren();s.photos.forEach((p,i)=>{const b=document.createElement('button');b.ariaLabel=`第 ${i+1} 張照片`;b.className=i===photoIndex?'active':'';b.onclick=()=>{photoIndex=i;showPhoto()};$('#photo-dots').append(b)})}
function enter(i){
 if(i===6&&!state.stamps.includes(6)){travelTo(3);toast('07 蛋糕在 04 小麥菓子裡，走進去就能獲得！');return}
 if(i===3)awardCake();
 sceneIndex=i;photoIndex=0;const s=sites[i];target.x=player.x;target.y=player.y;keys={};$('#scene').hidden=false;$('#scene-name').textContent=s.name;$('#scene-type').textContent=i===6?'07 道具獎勵 · 在 04 小麥菓子取得':s.located?(s.placement==='game'?'遊戲配置點 · 非實際拍攝座標':'✓ 地址已核對 · '+s.tag):'照片待定位 · 觀察任務';$('#scene-count').textContent=`FIELD NOTE ${String(i+1).padStart(2,'0')} / 10`;$('#npc-name').textContent=s.npc;$('#portrait').textContent=s.icon;$('#scene-color').textContent=s.unlock?({green:'● GREEN',blue:'● BLUE'}[s.unlock]):'✧';$('#dialog-text').textContent=s.text+(i===3?'\n\n🎂 已獲得：07 水果蛋糕 ×1，奶霜芽已加入隊伍（可在手帳查看）':'');$('#choices').replaceChildren();$('#scene-status').textContent=i===6?'取得地點：04 小麥菓子':s.located?s.address:'尚未確認拍攝位置，不在地圖標點';showPhoto();
 if(i===6){$('#dialog-text').textContent='這是在 04 小麥菓子取得的水果蛋糕。\n奶油、草莓、奇異果，都是這段小旅行甜甜的記憶。\n道具：水果蛋糕 ×1（已收藏）';btn('看看 04 的老屋與甜點',()=>enter(3));btn('收好蛋糕，繼續散步 ↗',closeScene);return}
 if(i===0&&state.stamps.length===10){$('#dialog-text').textContent='你回來了！十段日常、三色小隊，一個完整的村落故事。\n最珍貴的不是走了多遠，而是你真的看見了這裡。謝謝你和我們一起，把日常變成冒險。';btn('完成旅程・領取村落探險家徽章',()=>{state.won=true;save();toast('✿ 恭喜！獲得「村落探險家」稱號');closeScene();openBook(false)});return}
 if(s.gate&&state.colors.length<3){$('#dialog-text').textContent='這座花園，要紅、綠、藍三色小隊一起才會開啟。\n先到「水溝蓋綠意」找小綠，再到「抬頭的天空」找小藍，回來聽花園的悄悄話！';btn('好，先去找齊朋友',closeScene);return}
 if(state.stamps.includes(i)){btn('再看一次照片裡的線索',()=>question(i));btn('繼續散步 ↗',closeScene)}else btn('聊聊照片裡的故事 →',()=>question(i));if(i===3)btn('🎂 查看獲得的 07 水果蛋糕',()=>enter(6));if([0,3,8].includes(i))btn('▷ 觀看村落故事・前往探索網站',()=>window.openVillageStory())}
function question(i){const s=sites[i];$('#dialog-text').textContent=s.q;$('#choices').replaceChildren();s.options.forEach((o,j)=>btn(o,()=>{if(j!==s.answer){$('#dialog-text').textContent='再看看照片，你一定找得到。\n'+s.q;toast('不用急，答案就在照片裡。');return}if(!state.stamps.includes(i)){state.stamps.push(i);if(s.unlock&&!state.colors.includes(s.unlock)){state.colors.push(s.unlock);syncCompanions()}save();updateHUD();tone(740,.16);toast(`✿ ${COMPANIONS[i][0]}加入！現在有 ${companionRoster().length} 位夥伴同行`)}$('#dialog-text').textContent=s.reward+`\n\n✿ ${COMPANIONS[i][0]}已加入隊伍！同行 ${companionRoster().length} 位。`+'\n\n'+(state.stamps.length===10?'十枚記憶收集完成！帶著小隊回小康市場吧。':`記憶採集 ${state.stamps.length} / 10。下一條巷子，還有新的驚喜。`);$('#scene-status').textContent='已收藏 ✓';$('#choices').replaceChildren();btn('收好記憶・繼續散步 ↗',closeScene,'correct')}))}
function closeScene(){$('#scene').hidden=true;sceneIndex=-1;save()}$('#close-scene').onclick=closeScene;$('#interact').onclick=()=>near>=0&&enter(near);
function openBook(map=false){$('#book').hidden=false;$('#reset-confirm').hidden=true;$('#book-title').textContent=map?'村落散步地圖':'日常記憶手帳';$('#book-desc').textContent=map?'北朝上、真實街廓。棕色是地址核對點，紫色是你指定的遊戲配置點；07 蛋糕在 04 店內取得，10 花園暫留手帳。':`${state.won?'✿ 村落探險家！旅程已完成。 ':''}已收藏 ${state.stamps.length} / 10 段記憶。同行夥伴 ${companionRoster().length} 位：${companionRoster().map(c=>c.name).join('、')}。所有照片來自你們的拍攝素材，NPC 對話為原創故事。`;$('#book-grid').replaceChildren();if(map)appendRealMap();sites.forEach((s,i)=>{const b=document.createElement('button');b.className='memory '+(state.stamps.includes(i)?'found':'');b.innerHTML=`<img loading="lazy" src="assets/spot-${String(s.photos[0]).padStart(2,'0')}.jpg" alt="${s.name}"><b>${String(i+1).padStart(2,'0')} ${s.name}</b><small>${i===6?(state.stamps.includes(6)?'🎂 已取得・來自 04 小麥菓子':'🎂 進入 04 即可取得'):s.located?(s.placement==='game'?'遊戲配置・':'地址核對・')+(state.stamps.includes(i)?'已採集':'前往探索'):'待定位・先玩照片觀察'}</small><em>${state.stamps.includes(i)?'✓':'↗'}</em>`;b.onclick=()=>{$('#book').hidden=true;if(i===6){enter(6);return}if(!s.located){enter(i);return}travelTo(i)};$('#book-grid').append(b)});keys={}}
$('#album').onclick=()=>openBook(false);$('#map').onclick=()=>openBook(true);$('#close-book').onclick=()=>$('#book').hidden=true;$('#reset').onclick=()=>$('#reset-confirm').hidden=false;$('#cancel-reset').onclick=()=>$('#reset-confirm').hidden=true;$('#do-reset').onclick=()=>{try{localStorage.removeItem('limin-rgb-v1')}catch{}location.reload()};
$('#start').onclick=()=>{$('#intro').hidden=true;started=true;toast('先到小康市場找阿村。走進 04 小麥菓子，還可以拿到 07 蛋糕！')};$('#help').onclick=$('#brand').onclick=e=>{e.preventDefault();$('#intro').hidden=false;$('#start').innerHTML='回到村落 <span>↗</span>'};
function tone(f,d=.25){if(!music||!audio)return;const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(audio.destination);g.gain.setValueAtTime(.035,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+d);o.start();o.stop(audio.currentTime+d)}
$('#sound').onclick=()=>{music=!music;$('#sound').textContent=music?'♫':'♪';$('#sound').ariaLabel=music?'關閉音樂':'開啟音樂';if(music){const AC=window.AudioContext||window.webkitAudioContext;if(!AC){music=false;toast('這個瀏覽器目前不支援音樂');return}audio=audio||new AC();audio.resume();let k=0;const notes=[261.6,329.6,392,523.2,440,392,329.6,293.7];tone(notes[0]);timer=setInterval(()=>tone(notes[(++k)%notes.length],.6),720);toast('♫ 開啟原創合成散步旋律')}else clearInterval(timer)};
setInterval(save,4500);updateHUD();
// Read-only snapshot for reproducible QA; no external requests or analytics.
window.gameSnapshot=()=>({player:{...player},target:{...target},stamps:[...state.stamps],colors:[...state.colors],won:state.won,items:{...state.items},near,sceneIndex,started,companions:companionRoster(),followers:followers.map(f=>({...f})),sites:sites.map((s,i)=>({id:i,name:s.name,x:s.located?s.x:null,y:s.located?s.y:null,located:s.located,placement:s.placement||null,parent:s.parent??null}))});

function appendRealMap(){
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.classList.add('real-map');svg.setAttribute('viewBox',`0 0 ${world.w} ${world.h}`);svg.setAttribute('role','img');svg.setAttribute('aria-label','黎明新村實際街廓地圖，北朝上');
 function el(type,attrs){const e=document.createElementNS(ns,type);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);svg.append(e);return e}
 el('rect',{width:world.w,height:world.h,fill:'#d2dfba'});
 for(const r of geo.roads){el('polyline',{points:r.p.map(p=>{let q=project(...p);return`${q.x},${q.y}`}).join(' '),fill:'none',stroke:'#fff9e8','stroke-width':r.name.includes('巷')?9:18,'stroke-linecap':'round'})}
 const names=new Set();for(const r of geo.roads){if(!['干城街','懷德街','博愛街','黎明路二段','市政南二路','公益路二段'].includes(r.name)||names.has(r.name))continue;let q=project(...r.p[Math.floor(r.p.length/2)]);if(q.x<0||q.y<0||q.x>world.w||q.y>world.h)continue;names.add(r.name);let t=el('text',{x:q.x,y:q.y-10,'font-size':45,fill:'#637951','text-anchor':'middle'});t.textContent=r.name}
 for(const a of [...geo.landmarks,...geo.anchors]){const q=project(a.lng,a.lat);el('circle',{cx:q.x,cy:q.y,r:17,fill:a.id!==undefined?(a.kind==='game'?'#9c80b2':'#cf8061'):'#73985b',stroke:'#fff9e4','stroke-width':5});let t=el('text',{x:q.x+24,y:q.y+9,'font-size':58,fill:'#254936','font-weight':700});t.textContent=(a.id!==undefined?String(a.id+1).padStart(2,'0')+' ':'')+a.name}
 el('circle',{cx:player.x,cy:player.y,r:14,fill:'#5e9cb8',stroke:'white','stroke-width':6});let n=el('text',{x:world.w-70,y:100,'font-size':48,fill:'#315842','text-anchor':'end'});n.textContent='N ↑';
 const wrap=document.createElement('div');wrap.className='real-map-wrap';wrap.append(svg);const zoom=document.createElement('button');zoom.className='map-zoom';zoom.textContent='＋ 放大核心街區';let zoomed=false;zoom.onclick=()=>{zoomed=!zoomed;svg.setAttribute('viewBox',zoomed?'350 380 1350 1250':`0 0 ${world.w} ${world.h}`);zoom.textContent=zoomed?'－ 查看完整街廓':'＋ 放大核心街區'};wrap.append(zoom);const c=document.createElement('p');c.textContent='北朝上 · 棕：地址核對／紫：遊戲配置／藍：你 · © OpenStreetMap';wrap.append(c);$('#book-grid').append(wrap)
}

function drawDrain(s){
 ellipse(s.x+5,s.y+12,52,20,'#3a5a3c17');rect(s.x-48,s.y-20,96,39,'#8d9a8a',5);rect(s.x-44,s.y-17,88,32,'#bcc4aa',4);
 for(let k=0;k<7;k++)line(s.x-35+k*11,s.y-13,s.x-35+k*11,s.y+10,'#6d8170',4);
 line(s.x+34,s.y-5,s.x+50,s.y-39,'#658350',3);ellipse(s.x+44,s.y-28,10,4,'#82ab60');ellipse(s.x+52,s.y-37,11,4,'#96b965');
 ellipse(s.x,s.y+24,37,15,'#f6f3cf88');character(s.x-16,s.y+25,'green',.8,false);text(state.stamps.includes(5)?'✓':'···',s.x,s.y-65,16,'#55754a');
 rect(s.x-62,s.y-61,124,24,'#fff9e7',5);text('06 水溝蓋綠意',s.x,s.y-45,10);
 if(near===5){rect(s.x-73,s.y+44,146,24,'#fffdf3',12);text('調查水溝蓋 · E',s.x,s.y+61,10)}
}
function awardCake(){
 if(state.stamps.includes(6)){state.items.cake=true;return false}
 state.stamps.push(6);state.items.cake=true;save();updateHUD();tone(880,.2);toast(`🎂 獲得蛋糕！奶霜芽加入，同行夥伴 ${companionRoster().length} 位`);return true
}
function travelTo(i){
 const s=sites[i];$('#book').hidden=true;closeScene();target.x=s.x;target.y=s.y+42;toast(`前往 ${s.name}・${s.address}`)
}

// Story media pauses movement and game music without replacing the current scene.
addEventListener('village-story-open',()=>{keys={};target.x=player.x;target.y=player.y;save();if(audio&&music)audio.suspend().catch(()=>{})});
addEventListener('village-story-close',()=>{keys={};if(audio&&music)audio.resume().catch(()=>{})});
addEventListener('village-story-watched',()=>{state.items.storyWatched=true;save()});
