const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const statusEl = document.getElementById('status');
const openSurpriseEl = document.getElementById('openSurprise');
const secretSkipEl = document.getElementById('secretSkip');

let accepted = null;
try {
  accepted = sessionStorage.getItem('valentineAccepted');
} catch (_err) {
  accepted = null;
}

if (accepted !== 'yes' && window.name !== 'valentineAccepted=yes') {
  window.location.href = 'index.html';
}

const pad = (n) => String(n).padStart(2, '0');

const getNextValentines = (now) => {
  const year = now.getFullYear();
  const valentines = new Date(year, 1, 14, 0, 0, 0, 0);
  if (now >= valentines) {
    return new Date(year + 1, 1, 14, 0, 0, 0, 0);
  }
  return valentines;
};

const target = getNextValentines(new Date());
let countdownComplete = false;

let secretTapCount = 0;
let secretTapTimer = null;

if (secretSkipEl) {
  const handleSecretTap = () => {
    secretTapCount += 1;
    clearTimeout(secretTapTimer);
    secretTapTimer = setTimeout(() => {
      secretTapCount = 0;
    }, 1000);

    if (secretTapCount >= 3) {
      window.location.href = 'portrait.html';
    }
  };

  secretSkipEl.addEventListener('click', handleSecretTap);
  secretSkipEl.addEventListener('touchstart', (event) => {
    event.preventDefault();
    handleSecretTap();
  }, { passive: false });
  secretSkipEl.addEventListener('pointerdown', handleSecretTap);
}

if (openSurpriseEl) {
  openSurpriseEl.addEventListener('click', () => {
    window.location.href = 'portrait.html';
  });
}

const tick = () => {
  if (countdownComplete) {
    return;
  }

  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    countdownComplete = true;
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    statusEl.textContent = "Happy Valentine's Day. Tap the button to open your surprise.";
    if (openSurpriseEl) {
      openSurpriseEl.hidden = false;
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
};

tick();
setInterval(tick, 1000);
