const L = '__L__';
const W = '__W__'.toUpperCase();

root.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#111;font-family:monospace;user-select:none;gap:1.5rem;padding:1rem';

const tiles = W.split('').sort(() => Math.random() - .5);
let sel = [];

function draw() {
  const s = Math.min(innerWidth / (W.length + 1), 60);

  root.innerHTML =
    '<div style="color:#888;font-size:min(4vw,1rem)">Tap tiles in order to spell the word</div>' +
    '<div id="ans" style="min-height:' + (s + 8) + 'px;display:flex;gap:4px;border-bottom:2px solid #444;padding-bottom:8px">' +
      sel.map((c, i) =>
        '<div style="width:' + s + 'px;height:' + s + 'px;display:flex;align-items:center;justify-content:center;background:#060;color:#fff;font:bold ' + (s * .5) + 'px monospace;border-radius:6px" data-i="' + i + '">' + c + '</div>'
      ).join('') +
    '</div>' +
    '<div id="pool" style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center"></div>';

  const pool = document.getElementById('pool');

  tiles.forEach((c, i) => {
    if (sel.length > i) return;

    const d = document.createElement('div');
    d.textContent = tiles[i];
    d.style.cssText = 'width:' + s + 'px;height:' + s + 'px;display:flex;align-items:center;justify-content:center;background:#444;color:#fff;font:bold ' + (s * .5) + 'px monospace;border-radius:6px';

    d.onclick = () => {
      sel.push(tiles.splice(i, 1)[0]);

      if (sel.join('') === W) {
        root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
        root.textContent = L;
        return;
      }

      if (sel.length === W.length) {
        tiles.push(...sel);
        tiles.sort(() => Math.random() - .5);
        sel = [];
      }

      draw();
    };

    pool.appendChild(d);
  });
}

draw()
