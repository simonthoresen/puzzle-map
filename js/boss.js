const L = '__L__';
const c = document.createElement('canvas');
const x = c.getContext('2d');
const Z = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:';
const E = c => { root.style.cssText = Z + c };

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden';
c.width = innerWidth;
c.height = innerHeight;

const W = c.width;
const H = c.height;

let px = W / 2;
let py = H * .8;
let bx = W / 2;
let bh = 30;
let ph = 2;
let P = [];
let A = [];
let go = 1;
let fr = 0;

root.ontouchmove = e => {
  e.preventDefault();
  px = e.touches[0].clientX;
};

root.onclick = () => go && P.push({ x: px, y: py - 20 });

!function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  bx = W / 2 + Math.sin(++fr * .02) * W * .35;

  fr % 25 || A.push({ x: bx, y: 80, v: 4 });

  x.fillStyle = '#f44';
  x.fillRect(bx - 30, 40, 60, 40);

  x.fillStyle = '#0af';
  x.beginPath();
  x.moveTo(px, py - 12);
  x.lineTo(px - 10, py + 10);
  x.lineTo(px + 10, py + 10);
  x.fill();

  for (let i = P.length; i--;) {
    let p = P[i];
    p.y -= 6;
    x.fillStyle = '#ff0';
    x.fillRect(p.x - 1, p.y, 3, 8);

    if (p.y < 0) {
      P.splice(i, 1);
      continue;
    }

    p.x > bx - 30 && p.x < bx + 30 && p.y < 80 && p.y > 30 && (P.splice(i, 1), bh--);
  }

  for (let i = A.length; i--;) {
    let a = A[i];
    a.y += a.v;
    x.fillStyle = '#f84';
    x.beginPath();
    x.arc(a.x, a.y, 5, 0, 7);
    x.fill();

    a.y > H
      ? A.splice(i, 1)
      : Math.hypot(a.x - px, a.y - py) < 18 && (A.splice(i, 1), ph--);
  }

  if (ph <= 0) {
    go = 0;
    E('#f44');
    root.innerHTML = 'GAME OVER<br><small style=color:#888>tap</small>';
    root.onclick = () => location.reload();
  }

  if (bh <= 0) {
    go = 0;
    E('#0f0;padding:1em');
    root.textContent = L;
  }
}()
