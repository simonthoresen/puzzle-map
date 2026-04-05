const L = '__L__';

root.style.cssText = 'position:relative;height:100vh;background:#111;overflow:hidden;user-select:none';

let n = 0;

function mk() {
  root.innerHTML = '';

  if (n >= 10) {
    root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
    root.textContent = L;
    return;
  }

  const s = Math.min(innerWidth, innerHeight) * .14;

  const sc = document.createElement('div');
  sc.style.cssText = 'position:absolute;top:8px;left:0;width:100%;text-align:center;color:#fff;font:bold 1rem monospace';
  sc.textContent = n + '/10';
  root.appendChild(sc);

  const d = document.createElement('div');
  d.style.cssText = 'position:absolute;width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:hsl(' + Math.random() * 360 + ',70%,50%);left:' + (Math.random() * (innerWidth - s)) + 'px;top:' + (40 + Math.random() * (innerHeight - s - 50)) + 'px';
  d.onclick = () => {
    n++;
    mk();
  };
  root.appendChild(d);

  setTimeout(() => {
    if (d.parentNode && n < 10) {
      root.innerHTML = '<div onclick="location.reload()" style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace;text-align:center">TOO SLOW!<br><span style="font-size:3vw;color:#888">tap to retry</span></div>';
    }
  }, 1500);
}

mk()
