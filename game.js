
const fog=document.getElementById('fog'),ctx=fog.getContext('2d');
const pc=document.getElementById('particles'),px=pc.getContext('2d');
const sq=document.getElementById('squirrel');
const story=document.getElementById('story');
const bar=document.getElementById('bar');
const btn=document.getElementById('donate');
let down=false,last={x:0,y:0},pts=[];
function resize(){fog.width=pc.width=innerWidth;fog.height=pc.height=innerHeight;paint();}
addEventListener('resize',resize);
function paint(){ctx.globalCompositeOperation='source-over';const i=new Image();i.src='assets/fog.png';i.onload=()=>ctx.drawImage(i,0,0,fog.width,fog.height);i.onerror=()=>{ctx.fillStyle='rgba(230,230,230,.98)';ctx.fillRect(0,0,fog.width,fog.height);};}
function spark(x,y){for(let i=0;i<8;i++)pts.push({x,y,vx:(Math.random()-.5)*3,vy:(Math.random()-.5)*3,l:40});}
(function anim(){px.clearRect(0,0,pc.width,pc.height);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l--;px.fillStyle=`rgba(255,245,180,${p.l/40})`;px.beginPath();px.arc(p.x,p.y,2,0,6.28);px.fill()});pts=pts.filter(p=>p.l>0);requestAnimationFrame(anim)})();
function erase(x,y){ctx.globalCompositeOperation='destination-out';ctx.lineWidth=160;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(x,y);ctx.stroke();ctx.beginPath();ctx.arc(x,y,80,0,6.28);ctx.fill();last={x,y};spark(x,y);update();}
function update(){const d=ctx.getImageData(0,0,fog.width,fog.height).data;let c=0,t=0;for(let i=3;i<d.length;i+=1500){t++;if(d[i]<20)c++;}const p=Math.round(c/t*100);bar.style.width=p+'%';
if(p>=80&&sq.style.opacity!=1){sq.style.opacity=1;story.textContent='🐿️ 你找到森林裡的小松鼠了！';}
if(p>=95){story.textContent='✨ 因為有你，故事有了不同的結局。';btn.style.opacity=1;}
}
fog.onpointerdown=e=>{down=true;last={x:e.clientX,y:e.clientY};erase(last.x,last.y)}
fog.onpointermove=e=>{if(down)erase(e.clientX,e.clientY)}
onpointerup=()=>down=false;
btn.onclick=()=>location.href='https://www.rainbowkids.org.tw/product_info?id=207';
resize();
