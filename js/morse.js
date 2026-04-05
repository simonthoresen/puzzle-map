const L = '__L__';
const M = '__M__';

root.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#111;font-family:monospace;user-select:none;gap:1rem;padding:1rem';

const mc = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
  '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
  '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
  '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
  '--..': 'Z'
};

const ans = M.split(' / ')
  .map(w => w.split(' ').map(c => mc[c] || '?').join(''))
  .join(' ');

root.innerHTML =
  '<div style="color:#ff0;font-size:min(5vw,1.2rem);text-align:center;line-height:2;word-break:break-all">' + M.replace(/ \/ /g, '<br><br>') + '</div>' +
  '<div style="color:#555;font-size:.8rem;margin-top:.5rem">. = short &nbsp; - = long &nbsp; / = space</div>' +
  '<input id="inp" style="font:min(5vw,1.5rem) monospace;padding:.5rem;background:#222;color:#0f0;border:2px solid #444;border-radius:8px;text-align:center;width:80vw;text-transform:uppercase;margin-top:1rem" autocomplete="off" autocapitalize="characters" autocorrect="off" placeholder="Decoded message">' +
  '<div id="fb" style="color:#f44;font-size:1rem;min-height:1.5em"></div>';

const inp = document.getElementById('inp');
const fb = document.getElementById('fb');

inp.oninput = () => {
  const v = inp.value.toUpperCase().trim();

  if (v === ans.toUpperCase()) {
    root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
    root.textContent = L;
  } else if (v.length >= ans.length) {
    fb.textContent = 'Not quite\u2026';
  } else {
    fb.textContent = '';
  }
}
