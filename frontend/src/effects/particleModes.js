// Particle "modes" used for the ambient canvas layers behind every section.
// Each mode has:  n(area) -> how many particles,  init(w,h,n) -> state,  draw(ctx,w,h,time,dt,pointer,state)
// Ported 1:1 from the original MM Builders animation engine.

const TAU = Math.PI * 2;
const R = (a, b) => a + Math.random() * (b - a);

/* ---------- glow sprites (cheap soft light) ---------- */
const SP={};
function spr(col,s=64){const k=col+s;if(SP[k])return SP[k];const c=document.createElement('canvas');c.width=c.height=s;const g=c.getContext('2d');
 const r=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);r.addColorStop(0,col);r.addColorStop(.3,col+'88');r.addColorStop(1,col+'00');g.fillStyle=r;g.fillRect(0,0,s,s);return SP[k]=c}

/* ---------- animation modes ---------- */
const M={
 /* HERO + INTRO: warm fireflies / dust that drift and twinkle, lean towards the cursor */
 fire:{n:a=>Math.max(16,Math.min(46,a/36000|0)),
  init:(w,h,n)=>Array.from({length:n},()=>({x:R(0,w),y:R(0,h),r:R(5,15),ph:R(0,TAU),sp:R(.4,1.2),a:R(.45,1),c:Math.random()<.7?'#ffd98a':'#fff1c9'})),
  draw(g,w,h,t,dt,P,S){for(const p of S){p.x+=Math.sin(t*.0006*p.sp+p.ph)*.35+(P.on?(P.x-p.x)*.0002:0);p.y+=Math.cos(t*.0005*p.sp+p.ph*2)*.28-.07*p.sp;
   if(p.y<-20){p.y=h+20;p.x=R(0,w)}if(p.x<-20)p.x=w+20;if(p.x>w+20)p.x=-20;
   const tw=.3+.7*Math.abs(Math.sin(t*.0014*p.sp+p.ph));g.globalAlpha=tw*p.a;const s=p.r*2*(.85+.3*tw);g.drawImage(spr(p.c),p.x-s/2,p.y-s/2,s,s)}}},

 /* ABOUT: architect's constellation — gold nodes joined by drafting lines */
 net:{n:a=>Math.max(18,Math.min(64,a/22000|0)),
  init:(w,h,n)=>Array.from({length:n},()=>({x:R(0,w),y:R(0,h),vx:R(-.18,.18),vy:R(-.14,.14),r:R(1.1,2.4),sq:Math.random()<.35})),
  draw(g,w,h,t,dt,P,S){const L=150;
   for(const p of S){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
    if(P.on){const dx=p.x-P.x,dy=p.y-P.y,d=Math.hypot(dx,dy);if(d<130&&d>1){p.x+=dx/d*.7;p.y+=dy/d*.7}}}
   g.lineWidth=1;
   for(let i=0;i<S.length;i++)for(let j=i+1;j<S.length;j++){const a=S[i],b=S[j],d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<L){g.globalAlpha=(1-d/L)*.38;g.strokeStyle='#9cc8e8';g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}}
   for(const p of S){const tw=.55+.45*Math.sin(t*.002+p.x);g.globalAlpha=.75*tw;g.fillStyle='#cfe6ff';
    if(p.sq){g.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2)}else{g.beginPath();g.arc(p.x,p.y,p.r,0,TAU);g.fill()}
    g.globalAlpha=.25*tw;g.drawImage(spr('#9cc8e8'),p.x-12,p.y-12,24,24)}}},

 /* SERVICES: gold + teal embers rising like sparks from a construction forge */
 ember:{n:a=>Math.max(18,Math.min(60,a/20000|0)),
  init:(w,h,n)=>Array.from({length:n},()=>({x:R(0,w),y:R(0,h),r:R(4,12),vy:R(.25,.8),ph:R(0,TAU),c:Math.random()<.78?'#f6c96a':'#5ee0d0',a:R(.4,.95)})),
  draw(g,w,h,t,dt,P,S){for(const p of S){p.y-=p.vy;p.x+=Math.sin(t*.0009+p.ph)*.45+(P.on?(P.x-p.x)*.00018:0);
   if(p.y<-20){p.y=h+20;p.x=R(0,w)}const f=Math.min(1,Math.max(0,p.y/h));
   g.globalAlpha=p.a*Math.min(1,f*1.6)*(.65+.35*Math.sin(t*.003+p.ph));const s=p.r*2;g.drawImage(spr(p.c),p.x-s/2,p.y-s/2,s,s)}}},

 /* BLUEPRINTS: live drafting grid with electric / water "packets" running along the lines */
 flow:{n:a=>Math.max(16,Math.min(44,a/30000|0)),G:44,
  init(w,h,n){const G=this.G;return {pk:Array.from({length:n},()=>this.mk(w,h)),G}},
  mk(w,h){const G=this.G,d=(Math.random()*4)|0;return {x:Math.round(R(0,w)/G)*G,y:Math.round(R(0,h)/G)*G,d,s:R(.7,1.8),len:R(50,130),c:Math.random()<.7?'#7cc4ff':'#9fe6ff',tr:[]}},
  draw(g,w,h,t,dt,P,S){const G=S.G;
   g.globalAlpha=.07;g.strokeStyle='#7cc4ff';g.lineWidth=1;g.beginPath();
   for(let x=0;x<=w;x+=G){g.moveTo(x+.5,0);g.lineTo(x+.5,h)}for(let y=0;y<=h;y+=G){g.moveTo(0,y+.5);g.lineTo(w,y+.5)}g.stroke();
   /* pulsing junction nodes */
   for(let i=0;i<14;i++){const gx=((i*7919)%Math.floor(w/G))*G,gy=((i*104729)%Math.floor(h/G))*G,ph=(t*.0012+i)%TAU;
    g.globalAlpha=.25+.25*Math.sin(ph);g.fillStyle='#7cc4ff';g.fillRect(gx-2,gy-2,5,5);g.globalAlpha=.1+.1*Math.sin(ph);g.strokeStyle='#7cc4ff';g.strokeRect(gx-7.5,gy-7.5,15,15)}
   for(const p of S.pk){const dx=[1,0,-1,0][p.d],dy=[0,1,0,-1][p.d];p.x+=dx*p.s;p.y+=dy*p.s;p.tr.push(p.x,p.y);if(p.tr.length>p.len*2/p.s)p.tr.splice(0,2);
    /* turn at intersections */
    const ax=((p.x%G)+G)%G,ay=((p.y%G)+G)%G;if((ax<p.s||ax>G-p.s)&&(ay<p.s||ay>G-p.s)&&Math.random()<.04){p.x=Math.round(p.x/G)*G;p.y=Math.round(p.y/G)*G;p.d=(p.d+(Math.random()<.5?1:3))%4}
    if(p.x<-20||p.x>w+20||p.y<-20||p.y>h+20){Object.assign(p,this.mk(w,h));continue}
    const tr=p.tr;if(tr.length>4){const x0=tr[0],y0=tr[1],gr=g.createLinearGradient(x0,y0,p.x,p.y);gr.addColorStop(0,p.c+'00');gr.addColorStop(1,p.c+'dd');
     g.globalAlpha=.9;g.strokeStyle=gr;g.lineWidth=1.6;g.beginPath();g.moveTo(tr[0],tr[1]);for(let k=2;k<tr.length;k+=2)g.lineTo(tr[k],tr[k+1]);g.stroke()}
    g.globalAlpha=.95;g.drawImage(spr(p.c),p.x-9,p.y-9,18,18)}}},

 /* CONCEPTS: warm interior bokeh — big soft lights floating like pendant lamps out of focus */
 bokeh:{n:a=>Math.max(8,Math.min(20,a/90000|0)),
  init:(w,h,n)=>Array.from({length:n},()=>({x:R(0,w),y:R(0,h),r:R(34,110),vx:R(-.12,.12),vy:R(-.1,.1),ph:R(0,TAU),c:['#ffd98a','#e8a85a','#5ec4c4','#f6dc8e'][(Math.random()*4)|0],a:R(.07,.2)})),
  draw(g,w,h,t,dt,P,S){for(const p of S){p.x+=p.vx;p.y+=p.vy;if(p.x<-p.r)p.x=w+p.r;if(p.x>w+p.r)p.x=-p.r;if(p.y<-p.r)p.y=h+p.r;if(p.y>h+p.r)p.y=-p.r;
   g.globalAlpha=p.a*(.6+.4*Math.sin(t*.0008+p.ph));const s=p.r*2*(1+.06*Math.sin(t*.001+p.ph));g.drawImage(spr(p.c,96),p.x-s/2,p.y-s/2,s,s)}}},

 /* APPROACH: little bricks / plates rising and tumbling gently — "building up" step by step */
 brick:{n:a=>Math.max(14,Math.min(34,a/42000|0)),
  init:(w,h,n)=>Array.from({length:n},()=>({x:R(0,w),y:R(0,h),w:R(16,38),h:R(9,18),vy:R(.18,.5),rot:R(-.5,.5),vr:R(-.003,.003),fill:Math.random()<.35,a:R(.18,.45),c:Math.random()<.8?'#e8c26a':'#5ee0d0'})),
  draw(g,w,h,t,dt,P,S){for(const p of S){p.y-=p.vy;p.rot+=p.vr;p.x+=Math.sin(t*.0007+p.rot*6)*.18;if(p.y<-30){p.y=h+30;p.x=R(0,w)}
   const f=Math.min(1,Math.max(0,p.y/h));g.save();g.translate(p.x,p.y);g.rotate(p.rot);g.globalAlpha=p.a*Math.min(1,f*1.8);g.strokeStyle=p.c;g.fillStyle=p.c;g.lineWidth=1;
   if(p.fill){g.globalAlpha*=.35;g.fillRect(-p.w/2,-p.h/2,p.w,p.h)}g.strokeRect(-p.w/2,-p.h/2,p.w,p.h);g.beginPath();g.moveTo(-p.w/2,0);g.lineTo(p.w/2,0);g.moveTo(0,-p.h/2);g.lineTo(0,0);g.stroke();g.restore()}}},

 /* none: no particle layer (keeps the soft colour blobs only) */
 none:{n:()=>0,init:()=>null,draw(){}},

 /* APPROACH + WHY CHOOSE US: construction sites - cranes lift beams while buildings rise floor by floor,
    windows are laid out on an exact grid and switch on once each floor is finished */
 build:{n:()=>0,
  init(w,h){const mob=w<760,fh=mob?24:30,gy=h-18,maxH=Math.min(h*.5,mob?300:520);
   const def=mob?[[.12,84,0,1,'r'],[.88,80,.5,1,'l']]
               :[[.07,118,0,1,'r'],[.19,84,.55,0,''],[.81,90,.3,0,''],[.93,116,.72,1,'l']];
   const sites=def.map(([fx,bw,off,cr,side],i)=>{const cx=Math.min(w-bw/2-6,Math.max(bw/2+6,fx*w));
    let cols=Math.max(3,Math.floor((bw-12)/19));if(cols%2===0)cols--;
    return {cx,bw,off,cr,side,cols,seed:i*17+3,N:Math.max(6,Math.floor(maxH*(.72+.28*(((i*37)%5)/4))/fh))}});
   return {sites,fh,gy,mob}},
  draw(g,w,h,t,dt,P,S){
   const {fh,gy,mob}=S,K=mob?.42:.62,T=34000,TAU2=Math.PI*2;
   g.lineWidth=1;g.strokeStyle='#4a7b99';g.globalAlpha=.35*K/.62;g.beginPath();g.moveTo(0,gy+.5);g.lineTo(w,gy+.5);g.stroke();
   for(const s of S.sites){
    const ph=(t/T+s.off)%1,bp=Math.min(1,Math.max(0,(ph-.05)/.62)),
      al=(ph<.04?ph/.04:ph>.93?Math.max(0,(1-ph)/.07):1)*K*(s.cr?1:.7),
      fb=bp*s.N,full=Math.min(s.N,Math.floor(fb)),part=fb-full,x0=s.cx-s.bw/2,
      ww=10,wh=15,gap=(s.bw-s.cols*ww)/(s.cols+1);
    if(al<=.003)continue;
    /* finished floors: wall, slab line and an aligned window grid */
    for(let i=0;i<full;i++){
     const y=gy-(i+1)*fh,age=fb-i-1;
     g.globalAlpha=al*.95;g.fillStyle='#0e2335';g.fillRect(x0,y,s.bw,fh);
     g.strokeStyle='#3f7394';g.strokeRect(x0+.5,y+.5,s.bw-1,fh-1);
     for(let c=0;c<s.cols;c++){
      const wx=Math.round(x0+gap*(c+1)+ww*c),wy=Math.round(y+(fh-wh)/2);
      if(i===0&&c===(s.cols-1)/2){ /* entrance door */
       g.globalAlpha=al*.95;g.fillStyle=age>.8?'#9fd3f2':'#14344d';g.fillRect(wx-2,y+fh-fh*.78,ww+4,fh*.78);
       g.strokeStyle='#6aa3c4';g.strokeRect(wx-1.5,y+fh-fh*.78+.5,ww+3,fh*.78-1);continue}
      const hs=((i*131+c*71+s.seed*29)%97)/97;let lit=age>.9&&hs>.28;
      if(lit&&hs>.86&&Math.sin(t*.0007+hs*90)>.7)lit=false;
      g.globalAlpha=al*(lit?.62+.3*Math.sin(t*.0016+hs*40):.9);g.fillStyle=lit?'#d6edff':'#12304a';g.fillRect(wx,wy,ww,wh);
      g.globalAlpha=al;g.strokeStyle='#6aa3c4';g.strokeRect(wx+.5,wy+.5,ww-1,wh-1);
      g.beginPath();g.moveTo(wx+ww/2,wy);g.lineTo(wx+ww/2,wy+wh);g.moveTo(wx,wy+wh/2);g.lineTo(wx+ww,wy+wh/2);g.stroke()}
    }
    /* floor being built: rising steel columns, bracing, top beam */
    if(full<s.N&&part>0){
     const base=gy-full*fh,top=base-fh*part,cw=s.bw/s.cols;
     g.globalAlpha=al*.9;g.strokeStyle='#7cc4ff';g.lineWidth=1.3;g.beginPath();
     for(let k=0;k<=s.cols;k++){g.moveTo(x0+k*cw,base);g.lineTo(x0+k*cw,top)}g.stroke();
     if(part>.45){g.globalAlpha=al*.45*Math.min(1,(part-.45)*3);g.lineWidth=1;g.beginPath();
      for(let k=0;k<s.cols;k++){g.moveTo(x0+k*cw,base);g.lineTo(x0+(k+1)*cw,top);g.moveTo(x0+(k+1)*cw,base);g.lineTo(x0+k*cw,top)}g.stroke()}
     g.globalAlpha=al*.9;g.lineWidth=1.3;g.beginPath();g.moveTo(x0,top);g.lineTo(x0+s.bw*Math.min(1,part*1.05),top);g.stroke();g.lineWidth=1}
    const roofY=gy-full*fh;
    if(full>=s.N){ /* roof parapet + beacon */
     g.globalAlpha=al;g.fillStyle='#2a5675';g.fillRect(x0-3,roofY-4,s.bw+6,4);
     g.strokeStyle='#6aa3c4';g.beginPath();g.moveTo(s.cx,roofY-4);g.lineTo(s.cx,roofY-26);g.stroke();
     g.globalAlpha=al*(.4+.6*Math.abs(Math.sin(t*.003+s.seed)));g.fillStyle='#ff7a7a';g.beginPath();g.arc(s.cx,roofY-27,2.2,0,TAU2);g.fill()}
    /* tower crane */
    if(s.cr){
     const dir=s.side==='r'?-1:1,mx=s.cx-dir*(s.bw/2+24),topY=gy-Math.min(fb+.2,s.N)*fh,
       mt=Math.max(12,gy-(Math.min(fb,s.N)+3.4)*fh),Lj=s.bw/2+24+34,CC='#f0b43a';
     g.globalAlpha=al*.85;g.strokeStyle=CC;g.lineWidth=1.2;
     g.beginPath();g.moveTo(mx-5,gy);g.lineTo(mx-5,mt);g.moveTo(mx+5,gy);g.lineTo(mx+5,mt);
     let up=false;for(let y=gy;y>mt+12;y-=12){g.moveTo(up?mx+5:mx-5,y);g.lineTo(up?mx-5:mx+5,y-12);up=!up}
     g.stroke();
     /* jib + counter-jib trusses */
     const x1=mx+dir*Lj,x2=mx-dir*34;g.beginPath();g.moveTo(x2,mt);g.lineTo(x1,mt);g.moveTo(x2,mt+7);g.lineTo(x1,mt+7);
     const a=Math.min(x1,x2),b=Math.max(x1,x2);let z=false;for(let x=a;x<b-14;x+=14){g.moveTo(z?x+14:x,mt);g.lineTo(z?x:x+14,mt+7);z=!z}
     g.moveTo(mx,mt-26);g.lineTo(x1,mt);g.moveTo(mx,mt-26);g.lineTo(x2,mt);g.moveTo(mx,mt-26);g.lineTo(mx,mt);g.stroke();
     g.fillStyle=CC;g.globalAlpha=al*.7;g.fillRect(mx-8,mt+8,16,12);g.fillRect(x2-(dir>0?0:12),mt+7,12,10);
     /* trolley, rope and a steel beam swinging on the hook */
     const u=.35+.55*(.5+.5*Math.sin(t*.00035+s.seed)),tx=mx+dir*Lj*u,
       hy=mt+34+Math.max(0,topY-6-(mt+34))*(.5+.5*Math.sin(t*.0006+1)),bx=tx+Math.sin(t*.0012+s.seed)*4;
     g.globalAlpha=al*.9;g.strokeStyle=CC;g.lineWidth=1;g.beginPath();g.moveTo(tx,mt+7);g.lineTo(bx,hy-8);g.moveTo(bx,hy-8);g.lineTo(bx-12,hy);g.moveTo(bx,hy-8);g.lineTo(bx+12,hy);g.stroke();
     g.fillStyle='#9fd0ee';g.fillRect(bx-13,hy,26,5);g.fillStyle=CC;g.fillRect(tx-3,mt+7,6,4);
    }
   }
   g.globalAlpha=1}}
,

 /* CONTACT: signal ripples radiating from the card + drifting dust */
 wave:{n:a=>Math.max(12,Math.min(30,a/30000|0)),
  init:(w,h,n)=>({d:Array.from({length:n},()=>({x:R(0,w),y:R(0,h),r:R(4,10),vy:R(.15,.5),ph:R(0,TAU)})),t0:0}),
  draw(g,w,h,t,dt,P,S){const ox=w*.3,oy=h*.52,per=1500,mx=Math.max(w,h)*.55;
   for(let k=0;k<4;k++){const f=((t+k*per)%(per*4))/(per*4);const r=f*mx;g.globalAlpha=(1-f)*.28;g.strokeStyle=k%2?'#7cc4ff':'#5ee0d0';g.lineWidth=1.4;g.beginPath();g.arc(ox,oy,r,0,TAU);g.stroke()}
   for(const p of S.d){p.y-=p.vy;p.x+=Math.sin(t*.0008+p.ph)*.3;if(p.y<-10){p.y=h+10;p.x=R(0,w)}g.globalAlpha=.5*(.5+.5*Math.sin(t*.002+p.ph));const s=p.r*2;g.drawImage(spr('#9fe6ff'),p.x-s/2,p.y-s/2,s,s)}}},

 /* FOOTER: twinkling night sky with an occasional shooting star */
 star:{n:a=>Math.max(30,Math.min(90,a/5000|0)),
  init:(w,h,n)=>({s:Array.from({length:n},()=>({x:R(0,w),y:R(0,h),r:R(.5,1.6),ph:R(0,TAU),sp:R(.8,2.4)})),sh:null,nx:2500}),
  draw(g,w,h,t,dt,P,S){g.fillStyle='#fff6d6';for(const p of S.s){g.globalAlpha=.15+.75*Math.abs(Math.sin(t*.0009*p.sp+p.ph));g.fillRect(p.x,p.y,p.r,p.r)}
   if(!S.sh&&t>S.nx){S.sh={x:R(w*.3,w),y:R(0,h*.4),l:0};S.nx=t+R(4500,9000)}
   if(S.sh){const s=S.sh;s.x-=7;s.y+=3.4;s.l+=1;const gr=g.createLinearGradient(s.x,s.y,s.x+90,s.y-43);gr.addColorStop(0,'#fff6d6');gr.addColorStop(1,'#fff6d600');
    g.globalAlpha=Math.max(0,1-s.l/50);g.strokeStyle=gr;g.lineWidth=1.6;g.beginPath();g.moveTo(s.x,s.y);g.lineTo(s.x+90,s.y-43);g.stroke();if(s.l>50)S.sh=null}}}
};

export default M;
