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
let items = [];
let sc = 0;
let miss = 0;
let go = 1;
let pw = 50;

document.addEventListener('touchmove', e => {
  e.preventDefault();
  px = e.touches[0].clientX;
}, { passive: false });

c.addEventListener('mousemove', e => { px = e.clientX; });

const keys = {};
document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault();
  }
});
document.addEventListener('keyup', e => { keys[e.key] = false; });

function f() {
  if (!go) return;
  requestAnimationFrame(f);

  if (keys['ArrowLeft'] || keys['a']) px -= 10;
  if (keys['ArrowRight'] || keys['d']) px += 10;
  px = Math.max(0, Math.min(W, px));

  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  if (Math.random() < .03)
    items.push({
      x: Math.random() * (W - 20),
      y: -20,
      v: 2 + Math.random() * 2
    });

  x.fillStyle = '#0af';
  x.fillRect(px - pw / 2, H - 50, pw, 14);

  x.fillStyle = '#ff0';
  for (let i = items.length - 1; i >= 0; i--) {
    const o = items[i];
    o.y += o.v;
    x.beginPath();
    x.arc(o.x + 10, o.y + 10, 10, 0, 7);
    x.fill();

    if (o.y > H) {
      items.splice(i, 1);
      miss++;

      if (miss >= 1) {
        go = 0;
        root.innerHTML = '<div onclick="location.reload()" style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace;text-align:center">GAME OVER<br><span style="font-size:3vw;color:#888">tap to retry</span></div>';
        return;
      }
      continue;
    }

    if (o.y + 20 > H - 50 && o.y < H - 36 && o.x + 20 > px - pw / 2 && o.x < px + pw / 2) {
      items.splice(i, 1);
      sc++;
    }
  }

  x.fillStyle = '#fff';
  x.font = 'bold 14px monospace';
  x.textAlign = 'left';
  x.shadowColor = '#000';
  x.shadowBlur = 4;
  x.fillText('Caught: ' + sc + '/20   Lives: ' + (1 - miss), 10, 20);
  x.shadowBlur = 0;

  if (sc >= 20) {
    go = 0;
    root.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em">' + L + '</div>';
  }
}

f()
