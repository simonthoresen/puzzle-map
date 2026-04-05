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
var bl = [];
var en = [];
var sc = 0;
var go = 1;
var hp = 2;
var fr = 0;

document.addEventListener('touchmove', e => {
  e.preventDefault();
  px = e.touches[0].clientX;
}, { passive: false });

document.addEventListener('touchstart', e => {
  if (!go) return;
  px = e.touches[0].clientX;
  bl.push({ x: px, y: H - 40 });
});

c.addEventListener('mousemove', e => { px = e.clientX; });
c.addEventListener('mousedown', () => { go && bl.push({ x: px, y: H - 40 }); });

!function f() {
  if (!go) return;
  requestAnimationFrame(f);

  x.fillStyle = '#000';
  x.fillRect(0, 0, W, H);

  ++fr % 18 || en.push({ x: Math.random() * W, y: -20, v: 1 + Math.random() * 2 });

  x.fillStyle = '#0af';
  x.fillRect(px - 10, H - 30, 20, 14);

  for (var i = bl.length; i--;) {
    bl[i].y -= 7;
    x.fillStyle = '#ff0';
    x.fillRect(bl[i].x, bl[i].y, 2, 8);
    bl[i].y < 0 && bl.splice(i, 1);
  }

  for (var i = en.length; i--;) {
    var e = en[i];
    e.y += e.v;
    x.fillStyle = '#f44';
    x.fillRect(e.x - 8, e.y, 16, 16);

    if (e.y > H) {
      en.splice(i, 1);
      if (--hp < 1)
        return go = 0,
          root.style.cssText = Z + '#f44',
          root.textContent = 'TAP',
          root.onclick = _ => location.reload();
      continue;
    }

    for (var j = bl.length; j--;)
      (bl[j].x - e.x) ** 2 < 144 & bl[j].y < e.y + 16 & bl[j].y > e.y && (en.splice(i, 1), bl.splice(j, 1), sc++);
  }

  sc > 14 && (go = 0, root.style.cssText = Z + '#0f0;padding:1em', root.textContent = L);
}()
