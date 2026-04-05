const L = '__L__';

root.style.cssText = 'display:flex;flex-wrap:wrap;align-content:center;justify-content:center;height:100vh;background:#2a1506;gap:8px;padding:12px;user-select:none';

let sc = 0;
let ms = 0;
let holes = [];

const s = Math.min(innerWidth, innerHeight) / 3.5;

for (let i = 0; i < 9; i++) {
  const d = document.createElement('div');
  d.style.cssText = 'width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:#3a2a18;display:flex;align-items:center;justify-content:center;font:bold ' + (s * .5) + 'px monospace;color:#f44;user-select:none;transition:background .1s';

  d.onclick = () => {
    if (sc >= 15) return;

    if (d.dataset.up) {
      d.dataset.up = '';
      d.textContent = '';
      d.style.background = '#4a3a28';
      setTimeout(() => d.style.background = '#3a2a18', 150);
      sc++;
      hd.textContent = sc + '/15  miss:' + ms + '/3';

      if (sc >= 15) {
        root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
        root.textContent = L;
      }
    } else {
      ms++;
      d.style.background = '#600';
      setTimeout(() => d.style.background = '#3a2a18', 200);
      hd.textContent = sc + '/15  miss:' + ms + '/3';

      if (ms >= 3) {
        root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace';
        root.innerHTML = 'GAME OVER<br><small style="color:#888" onclick="location.reload()">tap to retry</small>';
      }
    }
  };

  holes.push(d);
  root.appendChild(d);
}

const hd = document.createElement('div');
hd.style.cssText = 'position:fixed;top:8px;left:0;width:100%;text-align:center;color:#fff;font:bold 1rem monospace';
hd.textContent = '0/15  miss:0/3';
root.appendChild(hd);

setInterval(() => {
  holes.forEach(h => {
    h.dataset.up = '';
    h.textContent = '';
  });

  if (sc < 15 && ms < 3) {
    const r = holes[Math.random() * 9 | 0];
    r.dataset.up = '1';
    r.textContent = 'X';
  }
}, 600)
