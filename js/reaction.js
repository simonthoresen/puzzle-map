const L = '__L__';

root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#b00;font:bold min(6vw,2rem) monospace;color:#fff;text-align:center;user-select:none';
root.textContent = 'Wait for GREEN\u2026';

let s = 0;
let ok = 1;

function go() {
  setTimeout(() => {
    if (!ok) return;
    root.style.background = '#0a0';
    root.textContent = 'TAP NOW!';
    s = Date.now();
  }, 1e3 + Math.random() * 4e3);
}

go();

document.addEventListener('keydown', e => {
  if (e.key === ' ' && !e.repeat) {
    e.preventDefault();
    root.click();
  }
});

root.onclick = () => {
  if (!ok) return;

  if (!s) {
    ok = 0;
    root.style.background = '#a00';
    root.textContent = 'Too early! Game over.';
    root.onclick = null;
    return;
  }

  const t = Date.now() - s;

  if (t < 300) {
    ok = 0;
    root.style.background = '#000';
    root.style.color = '#0f0';
    root.textContent = L;
  } else {
    s = 0;
    root.style.background = '#b00';
    root.textContent = t + 'ms \u2014 too slow!';
    go();
  }
}
