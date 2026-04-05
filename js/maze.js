var L = '__L__';
var M = '111111111100010001101010101010010101000110011010000011010111011100000001111111111';
var S = 9;
var c = document.createElement('canvas');
var x = c.getContext('2d');

root.appendChild(c);
root.style.cssText = 'margin:0;overflow:hidden;touch-action:none';
c.width = innerWidth;
c.height = innerHeight;

var W = c.width;
var H = c.height;
var z = Math.min(W, H) / S;
var q = z / 5;
var v = z * .6;
var a = (W - S * z) / 2;
var b = (H - S * z) / 2;
var px = 1;
var py = 1;
var tx, ty;

root.ontouchstart = e => {
  var t = e.touches[0];
  tx = t.clientX;
  ty = t.clientY;
};

document.addEventListener('keydown', e => {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
    e.preventDefault();
  }
  var nx = px;
  var ny = py;
  if (e.key === 'ArrowLeft' || e.key === 'a') nx--;
  else if (e.key === 'ArrowRight' || e.key === 'd') nx++;
  else if (e.key === 'ArrowUp' || e.key === 'w') ny--;
  else if (e.key === 'ArrowDown' || e.key === 's') ny++;
  else return;

  nx >= 0 & nx < S & ny >= 0 & ny < S && M[ny * S + nx] < '1' && (
    px = nx,
    py = ny,
    dr(),
    px == 7 & py == 7 && (
      root.style.cssText = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:#0f0;padding:1em',
      root.textContent = L
    )
  );
});

root.ontouchend = e => {
  var t = e.changedTouches[0];
  var dx = t.clientX - tx;
  var dy = t.clientY - ty;
  var nx = px;
  var ny = py;

  Math.abs(dx) > Math.abs(dy) ? nx += dx > 0 ? 1 : -1 : ny += dy > 0 ? 1 : -1;

  nx >= 0 & nx < S & ny >= 0 & ny < S && M[ny * S + nx] < '1' && (
    px = nx,
    py = ny,
    dr(),
    px == 7 & py == 7 && (
      root.style.cssText = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:#0f0;padding:1em',
      root.textContent = L
    )
  );
};

function dr() {
  x.fillStyle = '#111';
  x.fillRect(0, 0, W, H);

  for (var r = 0; r < S; r++)
    for (var i = 0; i < S; i++)
      x.fillStyle = +M[r * S + i] ? '#444' : '#222',
      x.fillRect(a + i * z, b + r * z, z - 1, z - 1);

  x.fillStyle = '#0f0';
  x.fillRect(a + px * z + q, b + py * z + q, v, v);

  x.fillStyle = '#ff0';
  x.fillRect(a + 7 * z + q, b + 7 * z + q, v, v);
}

dr()
