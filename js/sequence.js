const L = '__L__';

root.style.cssText = 'display:flex;flex-wrap:wrap;align-content:center;justify-content:center;height:100vh;background:#111;gap:8px;padding:16px;user-select:none';

let c = 1;
const sz = Math.min(innerWidth, innerHeight) / 3.5;
const tiles = [];

const hd = document.createElement('div');
hd.style.cssText = 'position:fixed;top:8px;left:0;width:100%;text-align:center;color:#fff;font:bold 1rem monospace;z-index:1';
hd.textContent = 'Next: 1';
root.appendChild(hd);

for (let i = 0; i < 9; i++) {
  const d = document.createElement('div');
  d.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;display:flex;align-items:center;justify-content:center;background:#333;color:#fff;font:bold min(8vw,2.5rem) monospace;border-radius:8px';
  tiles.push(d);
  root.appendChild(d);
}

function shuffle() {
  const nums = [...Array(9)].map((_, i) => i + 1).sort(() => Math.random() - .5);
  tiles.forEach((d, i) => {
    d.dataset.n = nums[i];
    d.textContent = nums[i];
    d.style.background = '#333';
    d.style.color = '#fff';
  });
}

shuffle();

root.onclick = e => {
  const d = tiles.find(t => t === e.target);
  if (!d) return;

  const n = +d.dataset.n;

  if (n === c) {
    d.style.background = '#0a0';
    d.style.color = '#000';
    c++;
    hd.textContent = 'Next: ' + c;

    if (c > 9)
      setTimeout(() => {
        root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
        root.textContent = L;
      }, 300);
  } else {
    d.style.background = '#f00';
    c = 1;
    setTimeout(shuffle, 300);
  }
};
