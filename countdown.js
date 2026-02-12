// countdown.js

let countdownTimer;
let secondsRemaining = 60;

function startCountdown() {
    countdownTimer = setInterval(function() {
        if (secondsRemaining <= 0) {
            clearInterval(countdownTimer);
            alert('Countdown Finished!');
        } else {
            console.log(secondsRemaining + ' seconds remaining');
            secondsRemaining--;
        }
    }, 1000);
}

function setupSecretButton() {
    let tapCount = 0;
    let lastTapTime = 0;

    document.addEventListener('keypress', function(event) {
        const currentTime = new Date().getTime();

        if (event.key === 'c') {
            if (currentTime - lastTapTime <= 1000) {
                tapCount++;
                if (tapCount === 5) {
                    alert('Secret activated!');
                    tapCount = 0; // reset tap count
                }
            } else {
                tapCount = 1; // reset tap count since too much time has passed
            }
            lastTapTime = currentTime;
        }
    });
}

startCountdown();
setupSecretButton();