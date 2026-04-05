const L = '__L__';
const c = document.createElement('canvas');
const x = c.getContext('2d');

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
c.width = innerWidth;
c.height = innerHeight;

const W = c.width;
const H = c.height;

let py = H / 2;
let ay = H / 2;
let bx = W / 2;
let by = H / 2;
let bvx = 4;
let bvy = 3;
let ps = 0;
let as = 0;
let ph = H * .18;
let go = 1;

document.addEventListener('touchmove', e => {
  e.preventDefault();
  py = e.touches[0].clientY;
}, { passive: false });

c.addEventListener('mousemove', e => { py = e.clientY; });

function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#000';
  x.fillRect(0, 0, W, H);

  ay += (by - ay) * .06;

  bx += bvx;
  by += bvy;

  if (by < 0 || by > H) bvy *= -1;

  if (bx < 24 && by > py - ph / 2 && by < py + ph / 2) {
    bvx = Math.abs(bvx);
    bvy += (by - py) * .1;
  }

  if (bx > W - 24 && by > ay - ph / 2 && by < ay + ph / 2) {
    bvx = -Math.abs(bvx);
    bvy += (by - ay) * .1;
  }

  if (bx < 0) {
    as++;
    bx = W / 2;
    by = H / 2;
    bvx = 4;
    bvy = 3;
  }

  if (bx > W) {
    ps++;
    bx = W / 2;
    by = H / 2;
    bvx = -4;
    bvy = 3;
  }

  x.fillStyle = '#fff';
  x.fillRect(4, py - ph / 2, 12, ph);
  x.fillRect(W - 16, ay - ph / 2, 12, ph);
  x.beginPath();
  x.arc(bx, by, 8, 0, 7);
  x.fill();

  x.font = 'bold 24px monospace';
  x.textAlign = 'center';
  x.fillText(ps + ' : ' + as, W / 2, 36);

  if (ps >= 7) {
    go = 0;
    root.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em">' + L + '</div>';
  }

  if (as >= 7) {
    go = 0;
    root.innerHTML = '<div onclick="location.reload()" style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace;text-align:center">YOU LOSE<br><span style="font-size:3vw;color:#888">tap to retry</span></div>';
  }
}

f()
