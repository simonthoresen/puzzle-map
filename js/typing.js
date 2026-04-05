const L = '__L__';
const words = ['PUZZLE', 'QUEST', 'MAGIC', 'DRAGON', 'KNIGHT', 'CASTLE', 'HIDDEN', 'SECRET', 'CIPHER', 'ESCAPE'];

root.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#111;font-family:monospace;user-select:none;gap:1rem';

let sc = 0;

function mk() {
  if (sc >= 8) {
    root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
    root.textContent = L;
    return;
  }

  const cur = words[Math.random() * words.length | 0];

  root.innerHTML =
    '<div style="color:#fff;font:bold min(10vw,3rem) monospace;letter-spacing:.2em">' + cur + '</div>' +
    '<input id="inp" style="font:min(6vw,2rem) monospace;padding:.5rem;background:#222;color:#0f0;border:2px solid #444;border-radius:8px;text-align:center;width:70vw;margin-top:1rem" autocomplete="off" autocapitalize="characters" autocorrect="off">' +
    '<div style="color:#666;font-size:1rem;margin-top:.5rem">' + sc + '/8</div>';

  const inp = document.getElementById('inp');
  inp.focus();

  inp.oninput = () => {
    const v = inp.value.toUpperCase();
    if (v === cur) {
      sc++;
      mk();
    } else if (v.length && v !== cur.slice(0, v.length)) {
      inp.value = '';
      inp.style.background = '#400';
      setTimeout(() => inp.style.background = '#222', 300);
    }
  };
}

mk()
