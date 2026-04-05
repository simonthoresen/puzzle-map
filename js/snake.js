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
var G = 20;
var co = W / G | 0;
var ro = H / G | 0;
var s = [{ x: co / 2 | 0, y: ro / 2 | 0 }];
var dx = 1;
var dy = 0;
var fd;
var sc = 0;
var go = 1;
var tx, ty;

function rf() {
  fd = { x: Math.random() * co * .8 + 1 | 0, y: Math.random() * ro * .8 + 1 | 0 };
}

rf();

document.addEventListener('touchstart', e => {
  var t = e.touches[0];
  tx = t.clientX;
  ty = t.clientY;
});

document.addEventListener('keydown', e => {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
    e.preventDefault();
  }
  if ((e.key === 'ArrowLeft' || e.key === 'a') && dy !== 0) { dx = -1; dy = 0; }
  if ((e.key === 'ArrowRight' || e.key === 'd') && dy !== 0) { dx = 1; dy = 0; }
  if ((e.key === 'ArrowUp' || e.key === 'w') && dx !== 0) { dy = -1; dx = 0; }
  if ((e.key === 'ArrowDown' || e.key === 's') && dx !== 0) { dy = 1; dx = 0; }
});

document.addEventListener('touchend', e => {
  var t = e.changedTouches[0];
  var a = t.clientX - tx;
  var b = t.clientY - ty;

  Math.abs(a) > Math.abs(b)
    ? dy && (dx = a > 0 ? 1 : -1, dy = 0)
    : dx && (dy = b > 0 ? 1 : -1, dx = 0);
});

setInterval(() => {
  if (!go) return;

  var h = { x: s[0].x + dx, y: s[0].y + dy };

  if (h.x < 0 | h.x >= co | h.y < 0 | h.y >= ro || s.some(p => p.x == h.x & p.y == h.y))
    return go = 0,
      root.style.cssText = Z + '#f44',
      root.textContent = 'TAP',
      root.onclick = _ => location.reload();

  s.unshift(h);

  h.x == fd.x & h.y == fd.y
    ? (++sc > 11
        ? (go = 0, root.style.cssText = Z + '#0f0;padding:1em', root.textContent = L)
        : rf())
    : s.pop();

  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  x.fillStyle = '#0f0';
  s.map(p => x.fillRect(p.x * G, p.y * G, G - 1, G - 1));

  x.fillStyle = 'red';
  x.fillRect(fd.x * G, fd.y * G, G - 1, G - 1);
}, 120)
