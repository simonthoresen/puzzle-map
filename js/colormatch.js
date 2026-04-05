const L = '__L__';

root.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#111;font-family:monospace;user-select:none';

const names = ['RED', 'GREEN', 'BLUE', 'YELLOW'];
const hex = ['#f44', '#4f4', '#44f', '#ff4'];

let sc = 0;
let rnd = 0;

function mk() {
  if (rnd >= 10) {
    if (sc >= 9) {
      root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
      root.textContent = L;
    } else {
      root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#f44;font:bold 5vw monospace';
      root.innerHTML = sc + '/9<div style="color:#666;font-size:3vw;margin-top:1em" onclick="location.reload()">tap to retry</div>';
    }
    return;
  }

  const wi = Math.random() * 4 | 0;
  const ci = Math.random() * 4 | 0;
  const match = wi === ci;

  root.innerHTML =
    '<div style="color:' + hex[ci] + ';font:bold 12vw monospace">' + names[wi] + '</div>' +
    '<div style="color:#888;font-size:1rem;margin:2rem 0">Does the COLOR match the WORD?</div>' +
    '<div style="display:flex;gap:2rem">' +
      '<div id="y" style="background:#060;color:#fff;padding:1rem 2rem;border-radius:8px;font-size:1.2rem">YES</div>' +
      '<div id="n" style="background:#600;color:#fff;padding:1rem 2rem;border-radius:8px;font-size:1.2rem">NO</div>' +
    '</div>' +
    '<div style="color:#666;margin-top:2rem">' + (rnd + 1) + '/10</div>';

  document.getElementById('y').onclick = () => {
    rnd++;
    if (match) sc++;
    mk();
  };

  document.getElementById('n').onclick = () => {
    rnd++;
    if (!match) sc++;
    mk();
  };
}

mk()
