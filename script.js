let isRunning = false;
let workTime = 25 * 60;
let breakTime = 5 * 60;
let currentTime = workTime;
let intervalId;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const workTimeSlider = document.getElementById('work-time');
const breakTimeSlider = document.getElementById('break-time');
const workTimeDisplay = document.getElementById('work-time-display');
const breakTimeDisplay = document.getElementById('break-time-display');
const notification = document.getElementById('notification');
const beepSound = document.getElementById('beep-sound');
const closeNotificationButton = document.getElementById('close-notification');

function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        intervalId = setInterval(() => {
            currentTime--;
            updateDisplay(currentTime);

            if (currentTime <= 0) {
                clearInterval(intervalId);
                showNotification();
                playBeep();
                isRunning = false;
                toggleStartPause();
                currentTime = breakTime;
                updateDisplay(currentTime);
            }
        }, 1000);
        isRunning = true;
        toggleStartPause();
    }
}

function pauseTimer() {
    clearInterval(intervalId);
    isRunning = false;
    toggleStartPause();
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    currentTime = workTime;
    updateDisplay(currentTime);
    toggleStartPause();
}

function toggleStartPause() {
    if (isRunning) {
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.add('pause');
    } else {
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('pause');
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
}

// Hide notification
function hideNotification() {
    notification.classList.remove('show');
    beepSound.pause();
    beepSound.currentTime = 0;
}

// Play beep sound
function playBeep() {
    beepSound.play();
    beepSound.loop = true;
}

// Handle notification close button
closeNotificationButton.addEventListener('click', hideNotification);

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

workTimeSlider.addEventListener('input', (e) => {
    workTime = e.target.value * 60;
    currentTime = workTime;
    updateDisplay(currentTime);
    workTimeDisplay.textContent = e.target.value;
});

breakTimeSlider.addEventListener('input', (e) => {
    breakTime = e.target.value * 60;
    breakTimeDisplay.textContent = e.target.value;
});
