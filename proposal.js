const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');
const modal = document.getElementById('thankYouModal');
const closeModalBtn = document.getElementById('closeModalBtn');

let noClicks = 0;

const messages = [
  'Are you sure?',
  'No is not a great choice...',
  'Try that Yes button maybe?',
  'Yes is looking really good now.',
  'That Yes button is calling your name.'
];

const getViewport = () => {
  const vv = window.visualViewport;
  if (vv) {
    return {
      width: Math.floor(vv.width),
      height: Math.floor(vv.height)
    };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

yesBtn.addEventListener('click', () => {
  try {
    sessionStorage.setItem('valentineAccepted', 'yes');
  } catch (_err) {
    // Ignore storage failures and continue using window.name fallback.
  }
  window.name = 'valentineAccepted=yes';
  modal?.classList.remove('hidden');
});

closeModalBtn?.addEventListener('click', () => {
  window.location.href = 'countdown.html';
});

const moveNoButton = () => {
  const padding = 18;
  const { width, height } = getViewport();
  const rect = noBtn.getBoundingClientRect();
  const maxX = Math.max(padding, width - rect.width - padding);
  const maxY = Math.max(padding, height - rect.height - padding);
  const x = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
  const y = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
};

const tease = () => {
  noClicks += 1;
  response.textContent = messages[Math.min(noClicks - 1, messages.length - 1)];
  moveNoButton();
};

noBtn.addEventListener('mouseenter', tease);
noBtn.addEventListener('touchstart', (event) => {
  event.preventDefault();
  tease();
}, { passive: false });
noBtn.addEventListener('click', (event) => {
  event.preventDefault();
  tease();
});

window.visualViewport?.addEventListener('resize', () => {
  if (noBtn.style.position === 'fixed') {
    moveNoButton();
  }
});
