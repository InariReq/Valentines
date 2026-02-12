// Updated countdown.js for improved touch event handling

// Improved iOS mobile touch event handling for secret 'c' button
const secretButton = document.getElementById('secret-c-button');

function handleTouchEnd(event) {
    event.preventDefault();
    event.stopPropagation();
    // Your logic for the 'c' button goes here
}

function handleKeyDown(event) {
    if (event.key === 'c') {
        // Your logic for the 'c' button goes here
    }
}

secretButton.addEventListener('touchend', handleTouchEnd);
window.addEventListener('keydown', handleKeyDown);

// Set touch-action and user-select styles to prevent unwanted behavior
secretButton.style.touchAction = 'manipulation';
secretButton.style.userSelect = 'none';