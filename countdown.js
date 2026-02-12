// Countdown timer logic
let countdown;  // variable for countdown
let targetDate = new Date('2026-02-12T12:04:20Z').getTime();

function startCountdown() {
    countdown = setInterval(function() {
        let now = new Date().getTime();
        let distance = targetDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements with id="countdown"
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If the countdown is over, write some text
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}

// Secret 'c' button logic
let tapCount = 0;
let tapTimeout;

function handleTap() {
    tapCount++;
    if (tapCount === 5) {
        alert('Secret feature activated!');
        tapCount = 0; // Reset tap count
    }
    // Reset tap count after 1 second
    clearTimeout(tapTimeout);
    tapTimeout = setTimeout(() => {
        tapCount = 0;
    }, 1000);
}

document.addEventListener('touchend', handleTap);

// Start countdown on load
startCountdown();

// Basic styling for mobile compatibility
const style = document.createElement('style');
style.innerHTML = `
    #countdown {
        font-family: Arial, sans-serif;
        font-size: 2em;
        text-align: center;
        padding: 20px;
        color: #333;
        background-color: #f2f2f2;
        border-radius: 10px;
        margin: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);