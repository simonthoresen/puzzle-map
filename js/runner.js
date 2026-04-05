const L = '__L__';
const c = document.createElement('canvas');
const x = c.getContext('2d');

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
c.width = innerWidth;
c.height = innerHeight;

const W = c.width;
const H = c.height;
const G = H * .8;

let py = G;
let vy = 0;
let obs = [];
let t0 = Date.now();
let go = 1;

document.addEventListener('touchstart', () => {
  if (go && py >= G - 1) vy = -H * .022;
});

c.addEventListener('mousedown', () => {
  if (go && py >= G - 1) vy = -H * .022;
});

document.addEventListener('keydown', e => {
  if ((e.key === ' ' || e.key === 'ArrowUp') && !e.repeat) {
    e.preventDefault();
    if (go && py >= G - 1) vy = -H * .022;
  }
});

function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  vy += H * .0008;
  py = Math.min(py + vy, G);

  if (Math.random() < .04) obs.push(W);

  x.fillStyle = '#0f0';
  x.fillRect(W * .12, py - 40, 24, 40);

  x.fillStyle = '#f44';
  for (let i = obs.length - 1; i >= 0; i--) {
    obs[i] -= W * .008;
    x.fillRect(obs[i], G - 28, 22, 28);

    if (obs[i] < -30) {
      obs.splice(i, 1);
      continue;
    }

    if (obs[i] < W * .12 + 24 && obs[i] + 22 > W * .12 && py > G - 28) {
      go = 0;
      root.innerHTML = '<div onclick="location.reload()" style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace;text-align:center">GAME OVER<br><span style="font-size:3vw;color:#888">tap to retry</span></div>';
      return;
    }
  }

  x.strokeStyle = '#444';
  x.beginPath();
  x.moveTo(0, G);
  x.lineTo(W, G);
  x.stroke();

  const s = (Date.now() - t0) / 1e3 | 0;
  x.fillStyle = '#fff';
  x.font = '16px monospace';
  x.fillText(s + 's/15s', 8, 24);

  if (s >= 15) {
    go = 0;
    root.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em">' + L + '</div>';
  }
}

f()
