// "Let's Build Your Dream Space" box: blueprint drafting on top, buildings rising along the bottom.
// Ported from the original canvas animation. Returns a function that stops it.

export function startDreamBand(band, cv, reducedMotion) {
if (!band || !cv) return () => {};
const rm = reducedMotion;
const g=cv.getContext('2d'),D=Math.min(devicePixelRatio||1,1.5),TAU=Math.PI*2;
let w=0,h=0,on=false,B=[];
const PLAN=[[0,0,1,0],[1,0,1,1],[1,1,0,1],[0,1,0,0],[.42,0,.42,.56],[.42,.56,1,.56],[0,.5,.42,.5],[.72,.56,.72,1],[.42,.56,.42,.72],[.12,0,.12,.14],[.24,1,.24,.86]];
function size(){const r=band.getBoundingClientRect(),sl=band.querySelector('.slot'),sw=innerWidth>940&&sl?sl.getBoundingClientRect().width:0;
 w=Math.max(200,Math.round(r.width-sw));h=Math.round(r.height);cv.style.width=w+'px';cv.style.height=h+'px';cv.width=w*D;cv.height=h*D;g.setTransform(D,0,0,D,0,0);
 B=[];let x=14,i=0;while(x<w-34){const bw=28+((i*37)%5)*8;B.push({x,bw,N:3+((i*53)%4),off:((i*29)%10)/10,cr:i%4===1,seed:i*7+1});x+=bw+6+((i*13)%7);i++}}
function draw(t){
 g.clearRect(0,0,w,h);const L='#9fd3f2';
 /* ---------- TOP: drafting table ---------- */
 const px=22,py=22,pw=Math.min(170,w*.32),ph=52,prog=((t/9000)%1.35);
 /* ruler with a travelling highlight */
 g.lineWidth=1;g.strokeStyle=L;g.globalAlpha=.3;g.beginPath();g.moveTo(10,8.5);g.lineTo(w-10,8.5);
 for(let x=10;x<=w-10;x+=10){g.moveTo(x+.5,8);g.lineTo(x+.5,x%50===0?15:12)}g.stroke();
 const hx=10+((t*.06)%(w-20));g.globalAlpha=.9;g.strokeStyle='#fff';g.beginPath();g.moveTo(hx,8.5);g.lineTo(hx+26,8.5);g.stroke();
 /* floor plan being drawn wall by wall */
 const tot=PLAN.reduce((a,sg)=>a+Math.hypot(sg[2]-sg[0],sg[3]-sg[1]),0);let acc=0;
 g.strokeStyle=L;g.lineWidth=1.6;g.lineCap='round';
 for(const sg of PLAN){const len=Math.hypot(sg[2]-sg[0],sg[3]-sg[1]),a=Math.min(1,Math.max(0,(prog*tot-acc)/len));acc+=len;if(a<=0)continue;
  g.globalAlpha=prog>1.15?Math.max(0,(1.35-prog)/.2)*.8:.8;g.beginPath();g.moveTo(px+sg[0]*pw,py+sg[1]*ph);g.lineTo(px+(sg[0]+(sg[2]-sg[0])*a)*pw,py+(sg[1]+(sg[3]-sg[1])*a)*ph);g.stroke()}
 /* dimension line + label */
 const dp=Math.min(1,prog*1.4);g.globalAlpha=.7*dp;g.lineWidth=1;g.beginPath();g.moveTo(px,py-6.5);g.lineTo(px+pw,py-6.5);
 g.moveTo(px,py-10);g.lineTo(px,py-3);g.moveTo(px+pw,py-10);g.lineTo(px+pw,py-3);g.moveTo(px,py-6.5);g.lineTo(px+5,py-9);g.moveTo(px,py-6.5);g.lineTo(px+5,py-4);g.moveTo(px+pw,py-6.5);g.lineTo(px+pw-5,py-9);g.moveTo(px+pw,py-6.5);g.lineTo(px+pw-5,py-4);g.stroke();
 g.globalAlpha=.75*dp;g.fillStyle='#d6edff';g.font='600 9px ui-monospace,Menlo,monospace';g.textAlign='center';g.fillText('12.00 m',px+pw/2,py-9);
 /* compass sweeping an arc */
 const cx=px+pw+58,cy=py+ph/2,r=Math.min(24,ph/2),an=(t/2600)%TAU;
 g.globalAlpha=.35;g.beginPath();g.arc(cx,cy,r,0,TAU);g.stroke();g.globalAlpha=.9;g.lineWidth=1.8;g.beginPath();g.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+an);g.stroke();
 g.lineWidth=1;g.globalAlpha=.8;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(an-Math.PI/2)*r,cy+Math.sin(an-Math.PI/2)*r);g.stroke();
 g.fillStyle='#fff';g.beginPath();g.arc(cx,cy,2,0,TAU);g.fill();
 /* set-square triangle + circles drifting */
 const sx=cx+r+46+Math.sin(t/1800)*6;g.globalAlpha=.45;g.strokeStyle=L;g.beginPath();g.moveTo(sx,py+ph);g.lineTo(sx+34,py+ph);g.lineTo(sx,py+8);g.closePath();g.stroke();
 g.beginPath();g.arc(sx+14,py+ph-12,4,0,TAU);g.stroke();
 /* ---------- BOTTOM: skyline rising floor by floor ---------- */
 const gy=h-12,fh=12,T=17000;g.globalAlpha=.4;g.strokeStyle=L;g.beginPath();g.moveTo(8,gy+.5);g.lineTo(w-8,gy+.5);g.stroke();
 for(const b of B){
  const ph2=(t/T+b.off)%1,bp=Math.min(1,Math.max(0,(ph2-.04)/.6)),al=ph2<.04?ph2/.04:ph2>.94?Math.max(0,(1-ph2)/.06):1,fb=bp*b.N,full=Math.floor(fb),part=fb-full;
  const cols=Math.max(2,Math.floor((b.bw-6)/9)),ww=4,wh=6,gap=(b.bw-cols*ww)/(cols+1);
  for(let i=0;i<full&&i<b.N;i++){const y=gy-(i+1)*fh,age=fb-i-1;
   g.globalAlpha=al*.8;g.fillStyle='#0f2639';g.fillRect(b.x,y,b.bw,fh);g.strokeStyle='#4a86a8';g.strokeRect(b.x+.5,y+.5,b.bw-1,fh-1);
   for(let c=0;c<cols;c++){const wx=Math.round(b.x+gap*(c+1)+ww*c),wy=Math.round(y+(fh-wh)/2),hs=((i*131+c*71+b.seed*29)%97)/97,lit=age>.8&&hs>.3;
    g.globalAlpha=al*(lit?.55+.35*Math.sin(t*.0016+hs*40):.8);g.fillStyle=lit?'#d6edff':'#14344d';g.fillRect(wx,wy,ww,wh)}}
  if(full<b.N&&part>0){const base=gy-full*fh,top=base-fh*part;g.globalAlpha=al*.9;g.strokeStyle='#7cc4ff';g.beginPath();
   for(let k=0;k<=cols;k++){const xx=b.x+k*b.bw/cols;g.moveTo(xx,base);g.lineTo(xx,top)}g.moveTo(b.x,top);g.lineTo(b.x+b.bw*Math.min(1,part*1.05),top);g.stroke()}
  if(full>=b.N){g.globalAlpha=al*.9;g.fillStyle='#2f6485';g.fillRect(b.x-2,gy-b.N*fh-3,b.bw+4,3)}
  if(b.cr){const mx=b.x+b.bw+7,mt=gy-(Math.min(fb,b.N)+2.4)*fh,CC='#f0b43a';g.globalAlpha=al*.85;g.strokeStyle=CC;g.beginPath();g.moveTo(mx,gy);g.lineTo(mx,mt);
   g.moveTo(mx-14,mt);g.lineTo(mx+10,mt);g.moveTo(mx,mt-8);g.lineTo(mx-14,mt);g.moveTo(mx,mt-8);g.lineTo(mx+10,mt);
   const hx2=mx-4-(b.bw*.7)*(.5+.5*Math.sin(t*.0006+b.seed)),hy=mt+10+(gy-b.N*fh-mt-14>0?(gy-b.N*fh-mt-14):4)*(.5+.5*Math.sin(t*.0009));
   g.moveTo(hx2,mt);g.lineTo(hx2,hy);g.stroke();g.fillStyle='#9fd0ee';g.fillRect(hx2-5,hy,10,3)}
 }
 g.globalAlpha=1}

size();
let ro;
if ('ResizeObserver' in window) {
  ro = new ResizeObserver(() => { size(); if (rm) draw(1e4); });
  ro.observe(band);
} else {
  window.addEventListener('resize', size);
}

let io;
let raf = 0;
let stopped = false;
if (rm) {
  draw(1e4);
} else {
  io = new IntersectionObserver((es) => es.forEach((e) => { on = e.isIntersecting; }), { rootMargin: '100px' });
  io.observe(band);
  const tick = (ts) => {
    if (stopped) return;
    raf = requestAnimationFrame(tick);
    if (!on || document.hidden) return;
    draw(ts);
  };
  tick(0);
}

return () => {
  stopped = true;
  cancelAnimationFrame(raf);
  ro?.disconnect();
  io?.disconnect();
  window.removeEventListener('resize', size);
};
}
