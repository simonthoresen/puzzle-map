var L = '__L__';
var W = '__W__'.split(',');
var CL = '__C__'.split('|');
var MK = [__K__];
var Z = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:#0f0;padding:1em';

var cs = Math.min((innerWidth - 16) / Math.max(...W.map(w => w.length)), 30);
var S = 'width:' + cs + 'px;height:' + cs + 'px;text-align:center;font:bold ' + cs * .5 + 'px monospace;color:#fff;border:1px solid #444;text-transform:uppercase;background:';
var an = W.map(() => '');

root.style.cssText = 'display:grid;place-items:center;height:100vh;background:#111;font:11px monospace;user-select:none;overflow-y:auto;padding:4px';

root.innerHTML =
  '<div style=color:#888>Marked=answer</div>' +
  '<div id=rw></div>' +
  '<div id=rs style="color:#0f0;font:bold 4vw monospace"></div>';

W.forEach((w, i) => {
  var h = '<small style=color:#888>' + (CL[i] || '') + '</small>';

  for (var j = 0; j < w.length; j++)
    h += '<input maxlength=1 style="' + S + (j == MK[i] ? '#330' : '#222') + '">';

  var r = document.createElement('div');
  r.style.cssText = 'display:flex;align-items:center;gap:1px';
  r.innerHTML = h;

  r.oninput = () => {
    an[i] = [...r.querySelectorAll('input')].map(e => e.value.toUpperCase()).join('');
    var m = an.map((a, k) => a[MK[k]] || '').join('');
    rs.textContent = m;
    an.every((a, k) => a == W[k].toUpperCase()) && (root.style.cssText = Z, root.textContent = L);
  };

  rw.appendChild(r);
})
