const L = '__L__';
const S = __A__;
const T = '__X__';

root.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#111;font-family:monospace;user-select:none;gap:1.5rem;padding:1rem';

root.innerHTML =
  '<div style="color:#0f0;font-size:min(6vw,1.8rem);letter-spacing:.2em;text-align:center;word-break:break-all">' + T + '</div>' +
  '<div style="color:#888;font-size:min(4vw,1rem)">Shift each letter back. A = ?</div>' +
  '<input id="inp" style="font:min(5vw,1.5rem) monospace;padding:.5rem;background:#222;color:#0f0;border:2px solid #444;border-radius:8px;text-align:center;width:80vw;text-transform:uppercase" autocomplete="off" autocapitalize="characters" autocorrect="off" placeholder="Your answer">' +
  '<div id="fb" style="color:#f44;font-size:1rem;min-height:1.5em"></div>';

const inp = document.getElementById('inp');
const fb = document.getElementById('fb');

function dec(t, s) {
  return t.replace(/[A-Z]/g, c =>
    String.fromCharCode((c.charCodeAt(0) - 65 - s + 26) % 26 + 65)
  );
}

inp.oninput = () => {
  const v = inp.value.toUpperCase().replace(/[^A-Z]/g, '');
  const ans = dec(T.replace(/[^A-Z]/g, ''), S);

  if (v === ans) {
    root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
    root.textContent = L;
  } else if (v.length >= ans.length) {
    fb.textContent = 'Not quite\u2026';
  } else {
    fb.textContent = '';
  }
}
