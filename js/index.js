var difficulty = null;
var duration = null;
var timeLeft = null;
var initialTime;
var circleTimeout;
var timerInterval;
var showRandomObjectInterval;
var spike;
var mode;

var pauseEl = document.querySelector("#pause");
var pauseMenuEl = document.querySelector("#pause-menu");
var menuEl = document.querySelector("#menu");
var gameEl = document.querySelector("#game");

var timerElement = document.getElementById("timer");
var timerDisplay = timerElement.querySelector("h1");


function startGame(m){
    let difficultyEl = document.querySelector("#difficulty");
    let durationEl = document.querySelector("#duration");
    mode = m;

    difficulty = difficultyEl.value;
    duration = durationEl.value;
    initialTime = parseInt(duration) * 60;
    timeLeft = initialTime;

    togglePause();
    toggleMenu();
    toggleGame();
    startTimer();

    // alert(difficulty + " " + duration);
    if(difficulty == "easy"){
        spike = 2000;
    }
    else if(difficulty == "medium"){
        spike = 1000;
    }
    else{
        spike = 500;
    }

    if(mode == "shadow"){
        showRandomObjectInterval = setInterval(showRandomCircle, spike);
    }
    else{
        showRandomObjectInterval = setInterval(showRandomCell, spike);
    }
}

function pauseGame() {
    clearInterval(showRandomObjectInterval); // Pause showing random circles
    clearTimeout(circleTimeout); // Clear the circle timeout to pause circle movement
}

function resumeGame() {
    if(mode == "shadow"){
        showRandomObjectInterval = setInterval(showRandomCircle, spike);
    }
    else{
        showRandomObjectInterval = setInterval(showRandomCell, spike);
    }
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = displayMinutes + ":" + displaySeconds;
}

// Function to start the timer
function startTimer() {
    // Update the timer display initially
    updateTimerDisplay();

    // Update the timer display every second
    timerInterval = setInterval(function() {
        // Decrease the time left by 1 second
        timeLeft--;

        // Update the timer display
        updateTimerDisplay();

        // Check if the timer has reached 0
        if (timeLeft === 0) {
            // Stop the game and display the finish message
            stopGame();
        }
    }, 1000);
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    pauseGame();
}

// Function to resume the timer
function resumeTimer() {
    startTimer();
    resumeGame();
}

function stopGame() {
    clearInterval(timerInterval); // Stop the timer
    clearInterval(showRandomObjectInterval);

    // Hide the game and show the finish message
    toggleFinish();
    
    setTimeout(function() {
        toggleFinish();
        toggleMenu();
        togglePause();
        toggleGame();
    }, 2000);
}

function toggleFinish() {
    let finishElement = document.querySelector("#finish");
    finishElement.classList.toggle("hide");
    finishElement.classList.toggle("show");
}

function resetTimer() {
    // Stop the timer
    clearInterval(timerInterval);
    
    // Reset the time left to the initial value
    timeLeft = initialTime;
    
    // Update the timer display
    updateTimerDisplay();
}

function restart(){
    toggleMenu();
    togglePause();
    togglePauseMenu();
    toggleGame();
}

function togglePause(){
    pauseEl.classList.toggle("show");
    pauseEl.classList.toggle("hide");
}

function togglePauseMenu(){
    pauseMenuEl.classList.toggle("show");
    pauseMenuEl.classList.toggle("hide");
}

function toggleMenu(){
    menuEl.classList.toggle("show");
    menuEl.classList.toggle("hide");
}

function toggleGame(){
    gameEl.classList.toggle("show");
    gameEl.classList.toggle("hide");
}

function showRandomCircle() {
    let circles = document.querySelectorAll(".circle");
    let timeout;

    circles.forEach(function(circle) {
        circle.style.display = "none";
    });

    let randomIndex = Math.floor(Math.random() * circles.length);
    let randomCircle = circles[randomIndex];

    randomCircle.style.display = "block";

    timeout = Math.random() * 2000 + 1500;
    circleTimeout = setTimeout(function() {
        randomCircle.style.display = "none";
    }, timeout);
}

function showRandomCell() {
    let cells = document.querySelectorAll(".grid td");
    let timeout;

    cells.forEach(function(cell) {
        cell.classList.remove("highlight");
    });

    let randomIndex = Math.floor(Math.random() * cells.length);
    let randomCell = cells[randomIndex];

    randomCell.classList.add("highlight");

    timeout = Math.random() * 2000 + 1500;

    circleTimeout = setTimeout(function() {
        randomCell.classList.remove("highlight");
    }, timeout);
}