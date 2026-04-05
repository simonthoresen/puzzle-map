const L = '__L__';
const c = document.createElement('canvas');
const x = c.getContext('2d');

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
c.width = innerWidth;
c.height = innerHeight;

const W = c.width;
const H = c.height;

let px = W / 2;
let py = H * .75;
let ast = [];
let t0 = Date.now();
let go = 1;

document.addEventListener('touchmove', e => {
  e.preventDefault();
  px = e.touches[0].clientX;
  py = e.touches[0].clientY;
}, { passive: false });

c.addEventListener('mousemove', e => {
  px = e.clientX;
  py = e.clientY;
});

const keys = {};
document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
    e.preventDefault();
  }
});
document.addEventListener('keyup', e => { keys[e.key] = false; });

function f() {
  if (!go) return;
  requestAnimationFrame(f);

  if (keys['ArrowLeft'] || keys['a']) px -= 10;
  if (keys['ArrowRight'] || keys['d']) px += 10;
  if (keys['ArrowUp'] || keys['w']) py -= 10;
  if (keys['ArrowDown'] || keys['s']) py += 10;
  px = Math.max(0, Math.min(W, px));
  py = Math.max(0, Math.min(H, py));

  x.fillStyle = '#000';
  x.fillRect(0, 0, W, H);

  for (let i = 0; i < 20; i++) {
    x.fillStyle = '#fff';
    x.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }

  if (Math.random() < .08)
    ast.push({
      x: Math.random() * W,
      y: -30,
      r: 10 + Math.random() * 20,
      v: 3 + Math.random() * 4
    });

  x.fillStyle = '#0af';
  x.beginPath();
  x.moveTo(px, py - 14);
  x.lineTo(px - 10, py + 10);
  x.lineTo(px + 10, py + 10);
  x.fill();

  for (let i = ast.length - 1; i >= 0; i--) {
    const a = ast[i];
    a.y += a.v;
    x.strokeStyle = '#888';
    x.lineWidth = 2;
    x.beginPath();
    x.arc(a.x, a.y, a.r, 0, 7);
    x.stroke();

    if (a.y > H + 40) {
      ast.splice(i, 1);
      continue;
    }

    if (Math.hypot(a.x - px, a.y - py) < a.r + 10) {
      go = 0;
      root.innerHTML = '<div onclick="location.reload()" style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace;text-align:center">GAME OVER<br><span style="font-size:3vw;color:#888">tap to retry</span></div>';
      return;
    }
  }

  const s = (Date.now() - t0) / 1e3 | 0;
  x.fillStyle = '#fff';
  x.font = '14px monospace';
  x.fillText(s + 's/20s', 8, 20);

  if (s >= 20) {
    go = 0;
    root.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em">' + L + '</div>';
  }
}

f()
