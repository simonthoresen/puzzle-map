const L = '__L__';
const c = document.createElement('canvas');
const x = c.getContext('2d');

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
c.width = innerWidth;
c.height = innerHeight;

const W = c.width;
const H = c.height;

let by = H / 2;
let bv = 0;
let pipes = [];
let sc = 0;
let go = 1;
let fr = 0;

document.addEventListener('touchstart', () => {
  if (go) bv = -6;
});

c.addEventListener('mousedown', () => {
  if (go) bv = -6;
});

function die() {
  go = 0;
  root.innerHTML = '<div onclick="location.reload()" style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace;text-align:center">GAME OVER (' + sc + '/12)<br><span style="font-size:3vw;color:#888">tap to retry</span></div>';
}

function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#135';
  x.fillRect(0, 0, W, H);

  bv += .3;
  by += bv;
  fr++;

  if (fr % 90 === 0) {
    const g = 80 + Math.random() * (H - 240);
    pipes.push({ x: W, g: g, p: 0 });
  }

  x.fillStyle = '#0f0';
  x.beginPath();
  x.arc(50, by, 12, 0, 7);
  x.fill();

  x.fillStyle = '#4a4';
  for (let i = pipes.length - 1; i >= 0; i--) {
    const p = pipes[i];
    p.x -= 3;

    x.fillRect(p.x, 0, 40, p.g);
    x.fillRect(p.x, p.g + 100, 40, H);

    if (!p.p && p.x + 40 < 50) {
      p.p = 1;
      sc++;
    }

    if (p.x < -50) {
      pipes.splice(i, 1);
      continue;
    }

    if (50 + 12 > p.x && 50 - 12 < p.x + 40 && (by - 12 < p.g || by + 12 > p.g + 100))
      return die();
  }

  if (by < 0 || by > H) return die();

  x.fillStyle = '#fff';
  x.font = '16px monospace';
  x.fillText(sc + '/12', 8, 24);

  if (sc >= 12) {
    go = 0;
    root.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em">' + L + '</div>';
  }
}

f()
