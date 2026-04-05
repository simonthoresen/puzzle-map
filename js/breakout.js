var L = '__L__';
var c = document.createElement('canvas');
var x = c.getContext('2d');
var Z = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:';

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
c.width = innerWidth;
c.height = innerHeight;

var W = c.width;
var H = c.height;
var px = W / 2;
var bx = W / 2;
var by = H * .7;
var vx = 4;
var vy = -4;
var bk = [];

for (var r = 0; r < 4; r++)
  for (var i = 0; i < 6; i++) {
    var w = W / 6 - 4;
    bk.push({ x: i * (w + 4) + 2, y: r * 24 + 40, w, h: 20, a: 1 });
  }

document.addEventListener('touchmove', e => {
  e.preventDefault();
  px = e.touches[0].clientX;
}, { passive: false });

c.addEventListener('mousemove', e => { px = e.clientX; });

var keys = {};
document.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault();
  }
});
document.addEventListener('keyup', e => { keys[e.key] = false; });

!function f() {
  requestAnimationFrame(f);

  if (keys['ArrowLeft'] || keys['a']) px -= 10;
  if (keys['ArrowRight'] || keys['d']) px += 10;
  px = Math.max(30, Math.min(W - 30, px));

  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  bx += vx;
  by += vy;

  (bx < 6 | bx > W - 6) && (vx *= -1);
  by < 6 && (vy *= -1);

  if (by > H)
    return root.style.cssText = Z + '#f44',
      root.textContent = 'RETRY',
      void (root.onclick = () => location.reload());

  by > H - 30 & by < H - 16 & bx > px - 30 & bx < px + 30 && (vy = -Math.abs(vy), by = H - 30);

  var l = 0;
  for (var b of bk) {
    if (!b.a) continue;
    l++;

    bx > b.x & bx < b.x + b.w & by > b.y & by < b.y + b.h
      ? (b.a = 0, vy *= -1)
      : (x.fillStyle = 'hsl(' + b.y * 2 + ',70%,50%)', x.fillRect(b.x, b.y, b.w, b.h));
  }

  x.fillStyle = '#0af';
  x.fillRect(px - 30, H - 24, 60, 8);

  x.fillStyle = '#fff';
  x.fillRect(bx - 3, by - 3, 6, 6);

  l || (root.style.cssText = Z + '#0f0;padding:1em', root.textContent = L);
}()
