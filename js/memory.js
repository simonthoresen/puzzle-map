const L = '__L__';

root.style.cssText = 'display:flex;flex-wrap:wrap;align-content:center;justify-content:center;height:100vh;background:#111;gap:6px;padding:12px;user-select:none';

const syms = 'ABCDEFGH'.split('');
const cards = [...syms, ...syms].sort(() => Math.random() - .5);

let f1 = null;
let f2 = null;
let mt = 0;
let busy = 0;

const s = Math.min(innerWidth / 4.5, innerHeight / 4.5);

cards.forEach((v, i) => {
  const d = document.createElement('div');
  d.style.cssText = 'width:' + s + 'px;height:' + s + 'px;display:flex;align-items:center;justify-content:center;background:#444;color:#444;font:bold ' + (s * .4) + 'px monospace;border-radius:6px';
  d.dataset.v = v;

  d.onclick = () => {
    if (busy || d.dataset.done || d === f1) return;

    d.style.color = '#fff';
    d.style.background = '#336';

    if (!f1) {
      f1 = d;
    } else {
      f2 = d;
      busy = 1;

      if (f1.dataset.v === f2.dataset.v) {
        f1.dataset.done = f2.dataset.done = 1;
        f1.style.background = f2.style.background = '#060';
        mt++;
        f1 = f2 = null;
        busy = 0;

        if (mt >= 8)
          setTimeout(() => {
            root.style.cssText = 'display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#0f0;font:bold min(6vw,2rem) monospace;text-align:center;padding:1em';
            root.textContent = L;
          }, 500);
      } else {
        setTimeout(() => {
          f1.style.cssText = f1.style.cssText.replace(/#fff/, '#444').replace(/#336/, '#444');
          f2.style.cssText = f2.style.cssText.replace(/#fff/, '#444').replace(/#336/, '#444');
          f1 = f2 = null;

          const rem = [...root.children].filter(c => !c.dataset.done);
          const vals = rem.map(c => c.dataset.v).sort(() => Math.random() - .5);
          rem.forEach((c, i) => {
            c.dataset.v = vals[i];
            c.textContent = vals[i];
          });

          busy = 0;
        }, 700);
      }
    }
  };

  d.textContent = v;
  root.appendChild(d);
})
