const L = '__L__';
const c = document.createElement('canvas');
const x = c.getContext('2d');
const Z = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:';
const E = c => { root.style.cssText = Z + c };

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
c.width = innerWidth;
c.height = innerHeight;

const W = c.width;
const H = c.height;

let px = W / 2;
let bl = [];
let en = [];
let go = 1;
let dr = 1;
let fr = 0;

for (let r = 0; r < 4; r++)
  for (let j = 0; j < 6; j++)
    en.push({ x: j * 50 + 40, y: r * 36 + 40, a: 1 });

document.addEventListener('touchmove', e => {
  e.preventDefault();
  px = e.touches[0].clientX;
}, { passive: false });

document.addEventListener('touchstart', e => {
  if (!go) return;
  px = e.touches[0].clientX;
  bl.push({ x: px, y: H - 50 });
});

c.addEventListener('mousemove', e => { px = e.clientX; });
c.addEventListener('mousedown', () => { go && bl.push({ x: px, y: H - 50 }); });

!function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#000';
  x.fillRect(0, 0, W, H);

  fr++;
  if (!(fr % 2)) {
    let m = 0;
    en.forEach(e => {
      e.a && (e.x += dr * 2, e.x > W - 30 || e.x < 10 ? m = 1 : 0);
    });
    m && (dr *= -1, en.forEach(e => e.y += 18));
  }

  x.fillStyle = '#0f0';
  x.fillRect(px - 15, H - 30, 30, 10);

  for (let i = bl.length; i--;) {
    bl[i].y -= 6;
    x.fillStyle = '#ff0';
    x.fillRect(bl[i].x - 1, bl[i].y, 3, 10);
    bl[i].y < 0 && bl.splice(i, 1);
  }

  let lf = 0;
  for (const e of en) {
    if (!e.a) continue;
    lf++;

    x.fillStyle = '#f44';
    x.fillRect(e.x, e.y, 24, 18);

    if (e.y > H - 50) {
      go = 0;
      E('#f44');
      root.innerHTML = 'INVADED!<br><small style=color:#888>tap</small>';
      root.onclick = () => location.reload();
      return;
    }

    for (let i = bl.length; i--;)
      bl[i].x > e.x && bl[i].x < e.x + 24 && bl[i].y > e.y && bl[i].y < e.y + 18 && (e.a = 0, bl.splice(i, 1));
  }

  if (!lf) {
    go = 0;
    E('#0f0;padding:1em');
    root.textContent = L;
  }
}()
