const L = '__L__';
const cv = document.createElement('canvas');
const x = cv.getContext('2d');
const Z = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:';
const E = c => { root.style.cssText = Z + c };

root.appendChild(cv);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
cv.width = innerWidth;
cv.height = innerHeight;

const W = cv.width;
const H = cv.height;

let px = W / 2;
let py = H * 0.8;
let bx = W / 2;
let bossHp = 30;
let playerHp = 2;
let shots = [];
let attacks = [];
let go = 1;
let fr = 0;

document.addEventListener('touchmove', e => {
  e.preventDefault();
  px = e.touches[0].clientX;
}, { passive: false });

document.addEventListener('touchstart', e => {
  if (!go) return;
  px = e.touches[0].clientX;
  shots.push({ x: px, y: py - 20 });
});

cv.addEventListener('mousedown', e => {
  if (!go) return;
  px = e.clientX;
  shots.push({ x: px, y: py - 20 });
});

cv.addEventListener('mousemove', e => {
  px = e.clientX;
});

const bossW = 60;
const bossH = 40;
const bossY = 40;

!function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  bx = W / 2 + Math.sin(++fr * 0.02) * W * 0.35;

  if (fr % 25 === 0) {
    attacks.push({ x: bx, y: bossY + bossH, v: 4 });
  }

  x.fillStyle = '#f44';
  x.fillRect(bx - bossW / 2, bossY, bossW, bossH);

  x.fillStyle = '#f00';
  x.fillRect(bx - bossW / 2, bossY - 10, bossW * (bossHp / 30), 6);

  x.fillStyle = '#0af';
  x.beginPath();
  x.moveTo(px, py - 14);
  x.lineTo(px - 12, py + 12);
  x.lineTo(px + 12, py + 12);
  x.fill();

  x.fillStyle = '#0f0';
  for (let i = 0; i < playerHp; i++) {
    x.fillRect(10 + i * 20, H - 20, 14, 10);
  }

  for (let i = shots.length; i--;) {
    let p = shots[i];
    p.y -= 8;
    x.fillStyle = '#ff0';
    x.fillRect(p.x - 2, p.y, 4, 10);

    if (p.y < 0) {
      shots.splice(i, 1);
      continue;
    }

    if (p.x > bx - bossW / 2 && p.x < bx + bossW / 2 &&
        p.y < bossY + bossH && p.y > bossY - 10) {
      shots.splice(i, 1);
      bossHp--;
    }
  }

  for (let i = attacks.length; i--;) {
    let a = attacks[i];
    a.y += a.v;
    x.fillStyle = '#f84';
    x.beginPath();
    x.arc(a.x, a.y, 7, 0, 7);
    x.fill();

    if (a.y > H + 10) {
      attacks.splice(i, 1);
    } else if (Math.abs(a.x - px) < 24 && Math.abs(a.y - py) < 24) {
      attacks.splice(i, 1);
      playerHp--;
    }
  }

  if (playerHp <= 0) {
    go = 0;
    E('#f44');
    root.innerHTML = 'GAME OVER<br><small style=color:#888>tap to retry</small>';
    root.onclick = () => location.reload();
  }

  if (bossHp <= 0) {
    go = 0;
    E('#0f0;padding:1em');
    root.textContent = L;
  }
}();
