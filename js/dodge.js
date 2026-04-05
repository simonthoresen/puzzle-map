const L = '__L__';
const c = document.createElement('canvas');
const x = c.getContext('2d');

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden';
c.width = innerWidth;
c.height = innerHeight;

const W = c.width;
const H = c.height;

let px = W / 2;
let obs = [];
let t0 = Date.now();
let go = 1;

root.ontouchmove = e => {
  e.preventDefault();
  px = e.touches[0].clientX;
};

root.onmousemove = e => px = e.clientX;

function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  if (Math.random() < .09)
    obs.push({
      x: Math.random() * W,
      y: -20,
      s: 16 + Math.random() * 20,
      v: 3 + Math.random() * 4
    });

  x.fillStyle = '#0f0';
  x.fillRect(px - 18, H - 60, 36, 20);

  x.fillStyle = '#f44';
  for (let i = obs.length - 1; i >= 0; i--) {
    const o = obs[i];
    o.y += o.v;
    x.fillRect(o.x, o.y, o.s, o.s);

    if (o.y > H) {
      obs.splice(i, 1);
      continue;
    }

    if (o.y + o.s > H - 60 && o.y < H - 40 && o.x + o.s > px - 18 && o.x < px + 18) {
      go = 0;
      root.innerHTML = '<div onclick="location.reload()" style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace;text-align:center">GAME OVER<br><span style="font-size:3vw;color:#888">tap to retry</span></div>';
      return;
    }
  }

  const s = (Date.now() - t0) / 1e3 | 0;
  x.fillStyle = '#fff';
  x.font = '16px monospace';
  x.fillText(s + 's/20s', 8, 24);

  if (s >= 20) {
    go = 0;
    root.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em">' + L + '</div>';
  }
}

f()
