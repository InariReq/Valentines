const phrase = "I love you so much my baby ani im so lucky to have you ";

let accepted = null;
try {
  accepted = sessionStorage.getItem('valentineAccepted');
} catch (_err) {
  accepted = null;
}

if (accepted !== 'yes' && window.name !== 'valentineAccepted=yes') {
  window.location.href = 'index.html';
}

const image = document.getElementById('source');
const canvas = document.getElementById('art');
const letterModal = document.getElementById('letterModal');
const letterToggle = document.getElementById('letterToggle');
const closeLetter = document.getElementById('closeLetter');
const ctx = canvas.getContext('2d');
const offscreen = document.createElement('canvas');
const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

const showLetter = () => {
  letterModal?.classList.remove('hidden');
};

const hideLetter = () => {
  letterModal?.classList.add('hidden');
};

letterToggle?.addEventListener('click', () => {
  if (letterModal?.classList.contains('hidden')) {
    showLetter();
  } else {
    hideLetter();
  }
});

closeLetter?.addEventListener('click', hideLetter);

const getViewport = () => {
  const vv = window.visualViewport;
  if (vv) {
    return {
      width: Math.max(1, Math.floor(vv.width)),
      height: Math.max(1, Math.floor(vv.height))
    };
  }
  return {
    width: Math.max(1, document.documentElement.clientWidth || window.innerWidth),
    height: Math.max(1, document.documentElement.clientHeight || window.innerHeight)
  };
};

const fitContain = (w, h, iw, ih) => {
  const scale = Math.min(w / iw, h / ih);
  const dw = Math.floor(iw * scale);
  const dh = Math.floor(ih * scale);
  const dx = Math.floor((w - dw) / 2);
  const dy = Math.floor((h - dh) / 2);
  return { dx, dy, dw, dh };
};

const render = () => {
  if (!image.naturalWidth || !image.naturalHeight) return;

  const { width, height } = getViewport();
  const dpr = Math.min(window.devicePixelRatio || 1, 3);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  offscreen.width = canvas.width;
  offscreen.height = canvas.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

  const frame = fitContain(
    offscreen.width,
    offscreen.height,
    image.naturalWidth,
    image.naturalHeight
  );

  offCtx.drawImage(image, frame.dx, frame.dy, frame.dw, frame.dh);

  const pixels = offCtx.getImageData(0, 0, offscreen.width, offscreen.height).data;

  const cell = Math.max(2, Math.floor(2.6 * dpr));
  const fontSize = Math.max(2, Math.floor(cell * 1.05));
  ctx.font = `600 ${fontSize}px "Courier New", monospace`;
  ctx.textBaseline = 'top';

  let i = 0;
  const endY = frame.dy + frame.dh;
  const endX = frame.dx + frame.dw;
  const clamp = (v) => Math.max(0, Math.min(255, v));

  let minLum = 255;
  let maxLum = 0;
  for (let y = frame.dy; y < endY; y += cell) {
    for (let x = frame.dx; x < endX; x += cell) {
      const idx = (y * offscreen.width + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < minLum) minLum = lum;
      if (lum > maxLum) maxLum = lum;
    }
  }
  const lumRange = Math.max(1, maxLum - minLum);

  for (let y = frame.dy; y < endY; y += cell) {
    for (let x = frame.dx; x < endX; x += cell) {
      const idx = (y * offscreen.width + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const normalizedLum = (lum - minLum) / lumRange;
      const dark = 1 - normalizedLum;

      if (dark < 0.012) continue;

      const contrast = 1.18;
      const sr = (r - 128) * contrast + 128;
      const sg = (g - 128) * contrast + 128;
      const sb = (b - 128) * contrast + 128;
      const gray = (sr + sg + sb) / 3;
      const saturation = 1.2;
      const cr = clamp(gray + (sr - gray) * saturation);
      const cg = clamp(gray + (sg - gray) * saturation);
      const cb = clamp(gray + (sb - gray) * saturation);
      const alpha = Math.min(1, 0.16 + dark * 1.05);

      ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
      ctx.fillText(phrase[i % phrase.length], x, y);
      i += 1;
    }
  }
};

let timer;
const rerender = () => {
  clearTimeout(timer);
  timer = setTimeout(render, 60);
};

image.addEventListener('load', render);
window.addEventListener('resize', rerender);
window.addEventListener('orientationchange', rerender);
window.addEventListener('pageshow', rerender);
window.visualViewport?.addEventListener('resize', rerender);
window.visualViewport?.addEventListener('scroll', rerender);

if (image.complete) render();
