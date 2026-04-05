const L = '__L__';

root.style.cssText = 'display:flex;flex-wrap:wrap;align-content:center;justify-content:center;height:100vh;background:#222;gap:12px;padding:16px;user-select:none';

const cols = ['#c00', '#0a0', '#00c', '#cc0'];
const seq = [];
const btns = [];

let idx = 0;
let show = 1;

const s = Math.min(innerWidth, innerHeight) / 2.5;

const msg = document.createElement('div');
msg.style.cssText = 'position:fixed;top:16px;left:0;width:100%;text-align:center;font:bold 1.2rem monospace;color:#fff;z-index:1';
root.appendChild(msg);

cols.forEach((c, i) => {
  const d = document.createElement('div');
  d.style.cssText = 'width:' + s + 'px;height:' + s + 'px;background:' + c + ';opacity:.2;border-radius:12px;transition:opacity .1s';

  d.onclick = () => {
    if (show) return;

    flash(i);

    if (i === seq[idx]) {
      idx++;

      if (idx >= seq.length) {
        if (seq.length >= 7) {
          setTimeout(() => {
            root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
            root.textContent = L;
          }, 400);
          return;
        }
        msg.textContent = '';
        setTimeout(next, 800);
      }
    } else {
      root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace';
      root.innerHTML = 'WRONG<div style="color:#666;font-size:3vw;margin-top:1em" onclick="location.reload()">tap to retry</div>';
    }
  };

  btns.push(d);
  root.appendChild(d);
});

document.addEventListener('keydown', e => {
  const n = parseInt(e.key);
  if (n >= 1 && n <= 4 && !e.repeat) {
    btns[n - 1].click();
  }
});

function flash(i) {
  btns[i].style.opacity = 1;
  btns[i].style.transform = 'scale(1.05)';
  setTimeout(() => {
    btns[i].style.opacity = .2;
    btns[i].style.transform = 'scale(1)';
  }, 350);
}

function next() {
  seq.push(Math.random() * 4 | 0);
  idx = 0;
  show = 1;
  msg.textContent = 'WATCH... (' + seq.length + '/7)';

  setTimeout(() => {
    seq.forEach((s, j) => setTimeout(() => flash(s), j * 500));
    setTimeout(() => {
      show = 0;
      msg.textContent = 'YOUR TURN';
    }, seq.length * 500 + 400);
  }, 600);
}

next();
