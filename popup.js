function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startClicking(interval, selector) {
  if (window.__autoClickerRunning) clearInterval(window.__autoClickerRunning);

  window.__autoClickerRunning = setInterval(() => {
    try {
      if (selector) {
        const el = document.querySelector(selector);
        if (el) el.click();
      } else {
        // выбираем случайные координаты в пределах окна
        const x = randomInt(0, window.innerWidth);
        const y = randomInt(0, window.innerHeight);

        const ev = new MouseEvent('click', {bubbles: true, cancelable: true, view: window});
        const el = document.elementFromPoint(x, y);
        if (el) el.dispatchEvent(ev);
      }
    } catch (e) {
      console.error('autoclicker:', e);
    }
  }, interval);
}
