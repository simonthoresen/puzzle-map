const L = '__L__';
const E = '__E__';
const H = '__H__';

root.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#111;font-family:monospace;user-select:none;gap:1.5rem;padding:1rem';

root.innerHTML =
  '<div style="font-size:min(15vw,5rem);text-align:center">' + E + '</div>' +
  (H ? '<div style="color:#888;font-size:min(3.5vw,1rem);text-align:center">' + H + '</div>' : '') +
  '<input id="inp" style="font:min(5vw,1.5rem) monospace;padding:.5rem;background:#222;color:#0f0;border:2px solid #444;border-radius:8px;text-align:center;width:80vw;text-transform:uppercase" autocomplete="off" autocapitalize="characters" autocorrect="off" placeholder="What does it mean?">' +
  '<div id="fb" style="color:#f44;font-size:1rem;min-height:1.5em"></div>';

document.getElementById('inp').oninput = function () {
  const v = this.value.toUpperCase().replace(/[^A-Z]/g, '');

  if (v === L.replace(/[^A-Z]/g, '')) {
    root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
    root.textContent = L;
  }
}
