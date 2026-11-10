// Hero: a night photo of the villa that slowly "switches its lights on" and sways its trees.
// It is drawn with a small WebGL shader that blends the night photo, the lit photo and a hand-made
// mask (hero-map.png: red = switch-on time, green = wind sway, blue = fade length).
// If WebGL is not available the same effect is done with a plain CSS cross-fade (class names fbgo / fbdone).
// Ported from the original script; the shader code is unchanged.

export function createHeroShader({ stage, canvas, imgNight, imgLit, imgMap, reducedMotion }) {
const st = stage, cv = canvas, imN = imgNight, imL = imgLit, imM = imgMap, rm = reducedMotion;
let gl = null, U = {}, mode = 'init', t0 = 0, started = false, vis = true, raf = 0, dbg = null, still = rm;
let destroyed = false, io = null;
const VS='attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
const FS=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 v;uniform sampler2D uN,uL,uM;uniform float uT,uS,uZ,uA;uniform vec2 uVis,uC;
void main(){
 vec2 b=uC+(v-.5)*uVis;vec2 f=vec2(.58,.5);vec2 uv=f+(b-f)/uZ;float edge=smoothstep(0.,.06,uv.y)*smoothstep(0.,.06,1.-uv.y);
 float w=texture2D(uM,uv).g;float t=uS;
 float gust=.65+.35*sin(t*.37+uv.x*3.);
 float a1=sin(t*1.45+uv.x*14.+uv.y*9.),a2=sin(t*2.35+uv.x*31.-uv.y*17.+1.7),a3=sin(t*.9+uv.y*23.+uv.x*6.);
 vec2 d=vec2(.62*a1+.38*a2,.45*a3+.25*a2)*vec2(.0030,.0036)*w*gust*uA;
 float wat=smoothstep(.73,.76,uv.x)*(1.-smoothstep(.985,1.,uv.x))*smoothstep(.06,.08,uv.y)*(1.-smoothstep(.16,.18,uv.y));
 d.x+=sin(uv.y*260.-t*1.7+uv.x*40.)*.0011*wat*uA;d.y+=sin(uv.x*180.+t*1.3)*.0006*wat*uA;
 uv+=d;
 vec3 m=texture2D(uM,uv).rgb;float T0=m.r*12.,D=.4+m.b*3.6;
 float a=smoothstep(T0,T0+D,uT);
 vec3 cn=texture2D(uN,uv).rgb,cl=texture2D(uL,uv).rgb;
 vec3 c=mix(cn,cl,a);
 float pop=4.*a*(1.-a)*(1.-smoothstep(1.6,3.,D));
 c+=cl*pop*smoothstep(.5,.95,dot(cl,vec3(.299,.587,.114)))*.24;
 c=mix(uv.y>.5?vec3(.03,.04,.075):vec3(.045,.032,.025),c,edge);
 gl_FragColor=vec4(c,1.);}`;
function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o}
function tex(i,img){const o=gl.createTexture();gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,o);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,img);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)}
function fallback(){mode='fb';cv.style.display='none';st.classList.remove('gl');if(started)st.classList.add(still?'fbdone':'fbgo')}
function size(){if(mode!=='gl')return;const w=st.clientWidth,h=st.clientHeight;if(!w||!h)return;let k=Math.min(devicePixelRatio||1,1.5);if(w*h*k*k>2.3e6)k=Math.sqrt(2.3e6/(w*h));
 cv.width=Math.max(2,Math.round(w*k));cv.height=Math.max(2,Math.round(h*k));gl.viewport(0,0,cv.width,cv.height);
 const ca=w/h,ia=imN.naturalWidth/imN.naturalHeight;let vx=1,vy=1,cy;if(ca>ia){vy=ia/ca;cy=vy*.5+(1-vy)*.5}else{vx=ca/ia;cy=.5}
 gl.uniform2f(U.vis,vx,vy);gl.uniform2f(U.c,vx*.5+(1-vx)*.6,cy);draw()}
const ease=x=>1-Math.pow(1-Math.min(1,Math.max(0,x)),3);
function state(now){const s=now/1000;if(dbg)return{T:dbg.T,S:dbg.S!=null?dbg.S:s,Z:1+.07*(1-ease(dbg.T/12)),A:dbg.A!=null?dbg.A:1};
 if(still)return{T:99,S:0,Z:1,A:0};
 const el=started?(now-t0)/1000:0;return{T:started?Math.max(0,el-.8):-1,S:s,Z:1+.07*(1-ease(el/13)),A:1}}
function draw(now){if(mode!=='gl')return;const q=state(now==null?performance.now():now);
 gl.uniform1f(U.T,q.T);gl.uniform1f(U.S,q.S);gl.uniform1f(U.Z,q.Z);gl.uniform1f(U.A,q.A);gl.drawArrays(gl.TRIANGLES,0,6)}
function loop(now){raf=0;draw(now);sched()}
function sched(){if(mode==='gl'&&started&&!still&&!dbg&&vis&&!document.hidden&&!raf)raf=requestAnimationFrame(loop)}
function start(){if(started)return;started=true;t0=performance.now();if(mode==='fb')st.classList.add(still?'fbdone':'fbgo');else{draw();sched()}}
async function init(){
 try{
  await Promise.all([imN.decode(),imL.decode(),imM.decode()]);
  if(destroyed)return;
  gl=cv.getContext('webgl',{antialias:false,alpha:false,powerPreference:'high-performance'})||cv.getContext('experimental-webgl');
  if(!gl)throw new Error('no webgl');
  const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));
  gl.useProgram(pr);const bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const lp=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
  ['uT','uS','uZ','uA'].forEach(n=>U[n.slice(1)]=gl.getUniformLocation(pr,n));U.vis=gl.getUniformLocation(pr,'uVis');U.c=gl.getUniformLocation(pr,'uC');
  tex(0,imN);tex(1,imL);tex(2,imM);gl.uniform1i(gl.getUniformLocation(pr,'uN'),0);gl.uniform1i(gl.getUniformLocation(pr,'uL'),1);gl.uniform1i(gl.getUniformLocation(pr,'uM'),2);
  mode='gl';size();st.classList.add('gl');
  cv.addEventListener('webglcontextlost',e=>{e.preventDefault();still=true;fallback()});
  window.addEventListener('resize',size);
  io=new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)sched()});io.observe(st.parentElement);
  document.addEventListener('visibilitychange',sched);
  if(started){draw();sched()}
 }catch(e){console.warn('hero fallback:',e&&e.message);fallback()}}

const onVisibility = () => sched();
document.addEventListener('visibilitychange', onVisibility);
init();

return {
  /** Call once the intro is over – this is when the lights start to come on. */
  start,
  destroy() {
    destroyed = true;
    cancelAnimationFrame(raf);
    raf = 0;
    window.removeEventListener('resize', size);
    document.removeEventListener('visibilitychange', onVisibility);
    io?.disconnect();
  },
};
}
