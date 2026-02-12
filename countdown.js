// Countdown JS

let tapCount = 0;
let lastTapTime = 0;
const maxTaps = 5;
const timeFrame = 1000; // 1 second
const secretButton = document.getElementById("c");

secretButton.addEventListener("click", () => {
    const currentTime = Date.now();
    if (currentTime - lastTapTime <= timeFrame) {
        tapCount++;
    } else {
        tapCount = 1; // reset tap count
    }
    lastTapTime = currentTime;
    
    if (tapCount === maxTaps) {
        activateSecret();
        tapCount = 0; // reset for next use
    }
});

function activateSecret() {
    alert("Secret Activated!");
    // Additional secret functionality here
}
