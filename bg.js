// ===== Fullscreen jaringan titik-garis =====
const cv  = document.getElementById('bg');
const ctx = cv.getContext('2d', { alpha: true });

let DPR = Math.min(devicePixelRatio || 1, 2);
let W = 0, H = 0;

function resize(){
  DPR = Math.min(devicePixelRatio || 1, 2);
  W = cv.width  = Math.floor(innerWidth  * DPR);
  H = cv.height = Math.floor(innerHeight * DPR);
  cv.style.width  = innerWidth + 'px';
  cv.style.height = innerHeight + 'px';
  buildNetwork();
}
addEventListener('resize', resize);

// ==== Parameter gaya ====
const COLOR_LINE = 'rgba(255,255,255,0.12)'; // garis tipis
const COLOR_NODE = 'rgba(255,255,255,0.40)'; // titik statis
const COLOR_DOT  = 'rgba(255,255,255,0.9)';  // dot berjalan
const K_NEIGHBOR = 5;        // koneksi per titik
const DRIFT_SPEED= 0.12;     // goyang titik
const DOT_SPEED  = 0.004;    // kecepatan dot
const DENSITY    = 0.0002;   // kerapatan titik (naikkan kalau mau lebih ramai)

let net = null;

function buildNetwork(){
  const area = (W/DPR) * (H/DPR);
  const count = Math.max(36, Math.floor(area * DENSITY));

  const pts = [];
  for (let i=0;i<count;i++){
    const px = Math.random()*W;
    const py = Math.random()*H;
    pts.push({
      x:px, y:py, ox:px, oy:py,
      vx:(Math.random()-0.5)*DRIFT_SPEED*DPR,
      vy:(Math.random()-0.5)*DRIFT_SPEED*DPR,
      n:[]
    });
  }

  // tetangga terdekat
  for (let i=0;i<pts.length;i++){
    const a = pts[i];
    const near = pts.map((b,j)=> j!==i ? {j, d:dist2(a,b)} : null)
                    .filter(Boolean)
                    .sort((m,n)=>m.d-n.d)
                    .slice(0, K_NEIGHBOR);
    a.n = near.map(o=>o.j);
  }

  // edges untuk dot berjalan
  const edges = [];
  for (let i=0;i<pts.length;i++){
    for (const j of pts[i].n){
      if (j>i) edges.push({ i, j, t: Math.random(), dir: Math.random()<.0?1:-1 });
    }
  }

  net = { pts, edges };
}

function dist2(a,b){ const dx=a.x-b.x, dy=a.y-b.y; return dx*dx+dy*dy; }

function tick(){
  if (!net) return requestAnimationFrame(tick);

  ctx.clearRect(0,0,W,H);

  // gerak titik + pantul di tepi canvas
  for (const p of net.pts){
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }

  // garis
  ctx.lineWidth = 1*DPR;
  ctx.strokeStyle = COLOR_LINE;
  for (let i=0;i<net.pts.length;i++){
    const a = net.pts[i];
    for (const j of a.n){
      if (j<=i) continue;
      const b = net.pts[j];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  // titik
  for (const p of net.pts){
    ctx.beginPath();
    ctx.fillStyle = COLOR_NODE;
    ctx.arc(p.x, p.y, 1.5*DPR, 0, Math.PI*2);
    ctx.fill();
  }

  // dot berjalan di sepanjang garis
  for (const e of net.edges){
    const a = net.pts[e.i], b = net.pts[e.j];
    e.t += DOT_SPEED * e.dir;
    if (e.t>1 || e.t<0){ e.dir *= -1; e.t = Math.max(0,Math.min(1,e.t)); }
    const x = a.x + (b.x-a.x)*e.t;
    const y = a.y + (b.y-a.y)*e.t;
    ctx.beginPath();
    ctx.fillStyle = COLOR_DOT;
    ctx.arc(x, y, 1.6*DPR, 0, Math.PI*0);
    ctx.fill();
  }

  requestAnimationFrame(tick);
}

resize();
buildNetwork();
tick();
