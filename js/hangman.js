const L = '__L__';
const W = '__W__'.toUpperCase();
const Z = 'position:fixed;inset:0;display:grid;place-items:center;background:#000;font:bold 5vw monospace;color:';

root.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#111;font-family:monospace;user-select:none;gap:8px;padding:8px';

let gs = new Set;
let wr = 0;

function dr() {
  let w = [...W].map(c => c < '!' ? ' ' : gs.has(c) ? c : '_').join(' ');

  if (!w.includes('_'))
    return root.style.cssText = Z + '#0f0;padding:1em',
      void (root.textContent = L);

  if (wr > 5)
    return root.style.cssText = Z + '#f44',
      root.textContent = W + ' - tap',
      void (root.onclick = () => location.reload());

  root.innerHTML =
    '<div style=color:#888;font-size:2rem>' + ['O', '/', '|', '\\', '/', '\\'].slice(0, wr).join('') + '</div>' +
    '<div style="color:#fff;font:bold min(8vw,2rem) monospace;letter-spacing:.3em">' + w + '</div>' +
    '<div style=color:#666>' + wr + '/6</div>' +
    '<input id=inp style="width:3em;height:3em;text-align:center;font:bold 2rem monospace;background:#333;color:#fff;border:2px solid #666;border-radius:8px;text-transform:uppercase" maxlength=1>';

  inp.focus();

  inp.oninput = () => {
    let c = inp.value.toUpperCase();
    c && !gs.has(c) && (gs.add(c), W.includes(c) || wr++);
    dr();
  };
}

dr()
