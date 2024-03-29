const setting_b = document.querySelector('.settings');
const pomodoro_b = document.querySelector('.pomodoro');
const short_b = document.querySelector('.short');
const long_b = document.querySelector('.long');
const start_b = document.querySelector('.playStop');
const timer = document.querySelector('.time');
const counter = document.querySelector('.counter');
const focusText = document.querySelector('.focus');
const progressBar = document.querySelector('.timeBar .progress');
const dialog = document.querySelector('dialog');
const close = document.querySelector('.close');
const inputP = document.getElementById('pomodoro');
const inputS = document.getElementById('short');
const inputL = document.getElementById('long');
let interval;
let minutes = 25;
let seconds = 0;
let currMin = 0;
let currSec = 0;
let isPaused = true;
let counteR = 0;



function changeSettings() {
    minutes = parseInt(inputP.value); // Parse the input value to an integer
    timer.textContent = `${minutes}:00`;
    currMin = minutes;
    currSec = 0;
    progressBar.style.width = "0%";
}
changeSettings(); // Call the function to initialize the timer

// Then continue with the rest of your code




function updateTimer() {
    if (!isPaused) {
        if (currSec === 0) {
            if (currMin === 0) {
                clearInterval(interval);
                counter.textContent = counteR++;
                new Notification('помоВанюша', {
                    body: 'time is out'
                })
                return;
            }
            currSec = 59;
            currMin--;
        } else {
            currSec--;
        }
        const formattedTime = `${currMin}:${currSec < 10 ? '0' : ''}${currSec}`;
        document.title = `помідорчик | ${formattedTime}`;
        timer.textContent = formattedTime;
    }
}

function startTimer() {
    interval = setInterval(updateTimer, 1000);
}

function updateProgress() {
    if (!isPaused) {
        const totalSeconds = minutes * 60; // розрахунок загальної кількості часу в СЕКУНДАХ
        
        const remainingSeconds = currMin * 60 + currSec; // розрахунок часу який залишився СЕКУНДАХ
        console.log(remainingSeconds)
        const progressWidth = ((totalSeconds - remainingSeconds) / totalSeconds) * 100; //це не вимір секунд,
        //це вимір відсотку який пройшов, тому / тоталСек
        progressBar.style.width = progressWidth + "%";
        if (remainingSeconds > 0) {
            setTimeout(updateProgress, 1000);
        } else {
            
            progressBar.style.width = "100%";
        }
    }
}

const start = () => {
    start_b.textContent = "Пауза";
    isPaused = false;
    updateTimer(); // Update the timer immediately
    startTimer(); // Start the timer
    updateProgress(); // Update the progress bar
}

start_b.addEventListener('click', () => {
    if (start_b.textContent === 'Старт') {
        //.then(perm => {
        // //     if (perm === 'granted'){
        // //         console.log('abdula')
        // //         new Notification('u got it')
        // //     }
        // });
        start();
    } else if (start_b.textContent === 'Пауза') {
        //console.log('Pausing...');
        clearInterval(interval);
        start_b.textContent = 'Плей';
        isPaused = true;
    } else if (start_b.textContent === 'Плей') {
        console.log('Resuming...');
        startTimer();
        start_b.textContent = 'Пауза';
        isPaused = false;
        updateProgress(); // Resume updating progress bar
    }
});

// Function to switch between Pomodoro, Short Break, and Long Break
function switching(background, min, focusText) {
    if (background === 'undefined'){
        background = 'black';
    }
    clearInterval(interval);
    document.body.style.background = `#${background}`;
    start_b.textContent = 'Старт'; // Reset button text to 'Старт'
    timer.textContent = `${min}:00`;
    minutes = min;
    seconds = 0;
    currMin = minutes;
    currSec = seconds;
    focusText.textContent = focusText;
}

document.addEventListener("DOMContentLoaded", function() {
    Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            // You can now display notifications
        } else if (permission === "denied") {
            console.log("Notification permission denied.");
            // Handle the case where permission is denied
        } else {
            console.log("Notification permission not yet requested.");
            // Handle the case where permission is not yet requested
        }
    });
});


pomodoro_b.addEventListener('click', () => {
    switching('274C77', 25, 'працюй, блять');
});

short_b.addEventListener('click', () => {
    switching('475841', 5, 'чіллінг');
});

long_b.addEventListener('click', () => {
    switching('36393B', 15, 'ультрачілл');
});

setting_b.addEventListener('click', () => {
    changeSettings();
});

setting_b.addEventListener('click', ()=>{
    dialog.showModal();
    
});

// Add event listener to the close button of the dialog
close.addEventListener('click', () => {
    dialog.close();
    // Set the timer value to the input value after closing the dialog
    timer.textContent = `${inputP.value}:00`;
    // Update the timer only after the dialog is closed
    dialog.addEventListener('close', () => {
        changeSettings();
    });
});


timer.textContent = `${minutes}:00`;