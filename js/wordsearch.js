var L = '__L__';
var WD = '__W__'.toUpperCase();
var Z = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:#0f0;padding:1em';

root.style.cssText = 'display:grid;place-items:center;height:100vh;background:#111;font-family:monospace;user-select:none;gap:8px;padding:4px';

var rw = '__G__'.split(',');
var C = rw[0].length;
var z = Math.min((innerWidth - 16) / C, (innerHeight - 80) / rw.length, 40);
var sl = [];

var h =
  '<div style=color:#888>Find:' + WD.length + '</div>' +
  '<div id=g style="display:inline-grid;grid-template-columns:repeat(' + C + ',' + z + 'px);gap:2px">';

rw.forEach(r =>
  [...r].forEach(c => {
    var u = c.toUpperCase();
    h += '<div style="width:' + z + 'px;height:' + z + 'px;display:grid;place-items:center;background:#333;color:#fff;font:bold ' + z * .5 + 'px monospace" data-l=' + u + '>' + u + '</div>';
  })
);

root.innerHTML = h + '</div><div id=p style="color:#0f0;font:bold 5vw monospace"></div>';

g.onclick = e => {
  var d = e.target;
  if (!d.dataset.l) return;

  d.dataset.on
    ? (d.dataset.on = '', d.style.background = '#333', sl = sl.filter(s => s.e != d))
    : (d.dataset.on = 1, d.style.background = '#063', sl.push({ c: d.dataset.l, e: d }));

  var w = sl.map(s => s.c).join('');
  p.textContent = w;

  w == WD && setTimeout(() => {
    root.style.cssText = Z;
    root.textContent = L;
  }, 400);
}
