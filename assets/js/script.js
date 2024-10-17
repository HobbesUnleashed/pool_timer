// Variables for the various screen views by ID
const options = document.getElementById("home");
const clock = document.getElementById("clocks");
// Set the timer id to a variable
const timer = document.getElementById("timer");
//startPause button
const startPauseBtn = document.getElementById("startPause");
// Set constants for the elements to call regularly
var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
// Initialize the countdown time in seconds
let timeLeft;
let initialsetTime;
// Variable to store the interval ID
let countdown;
// Flag to check if the timer is running
let isRunning = false;
// Flag to check if the add time button has been used
let yellowExtUsed = false;
// Flag to check if the add time button has been used
let redExtUsed = false;
// Flag to check if dark mode already active
let dark = false;
// Counters to track if the extension buttons have been pressed
var redcount = 0;
var yellcount = 0;

function setTimer(time) {
    options.style.display = "none";
    clocks.style.display = "grid";
    timeLeft = time;
    initialsetTime = time;
    document.getElementById("timer").innerHTML = time+1;
}

function startPause() {
    if (!isRunning) {

        countdown = setInterval(function() {
            timer.innerHTML = timeLeft+1;
            timeLeft--;

            if (timeLeft < 5) {
                timer.style.color = "red";
            }

            if (timeLeft < 0) {
                clearInterval(countdown);
                timer.innerHTML = "X";
            }
        }, 1000);
        startPauseBtn.innerHTML = "Pause";
    } else {
        clearInterval(countdown);
        startPauseBtn.innerHTML = "Resume"
    }

    isRunning = !isRunning;
    // console.log(timeLeft);
}

function addTime(buttonPressed) {
    if(buttonPressed == "red") {
        redcount++;
        timeLeft += 16;
        timer.innerHTML = timeLeft;
        timer.style.color = "white";
        redExtUsed =true;
        // console.log("redExtUsed");
        timeLeft--;
    } else {
        yellcount++;
        timeLeft += 16;
        timer.innerHTML = timeLeft;
        timer.style.color = "white";
        yellowExtUsed = true;
        // console.log("yellowExtUsed");
        timeLeft--;
    }
    red.disabled = true;
    yellow.disabled = true;
}

function showDisabled() {
    if(redcount > 0 && yellcount > 0) {
        console.log("both used");
        return;
    }
    if(redcount > 0) {
        yellow.disabled = false;
    }
    if(yellcount > 0) {
        red.disabled = false;
    }
}


function reset() {
    clearInterval(countdown);
    isRunning = false;
    timeLeft = initialsetTime;
    timer.innerHTML = initialsetTime+1;
    startPauseBtn.innerHTML = "Start";
    showDisabled();
    // console.log(timeLeft);
    // console.log(redcount);
    // console.log(yellcount);
}

function resetFrame() {
    reset();
    yellcount = 0;
    redcount = 0;
    redExtUsed = false;
    yellowExtUsed = false;
    red.disabled = false;
    yellow.disabled = false;
    // console.log(timeLeft);
    // console.log("red count: " + redcount);
    // console.log("Yellow count: " + yellcount);
    // console.log("Yellow disabled: " + yellow.disabled);
    // console.log("red disabled: " + red.disabled);
    // console.log("Yellow used: " + yellowExtUsed);
    // console.log("red used: " + redExtUsed);
}

// Add an event listener for the color mode
document.getElementById("modeBtn").addEventListener("click", function() {
    if (!dark) {
        // Set the attributes to be changed to variables
        document.querySelector('img[name="primaryLogo"]').src="assets/images/wo-glasses.svg";
        document.querySelector('img[name="secondaryLogo"]').src="assets/images/Cousins-logo.webp";
        document.body.style.backgroundImage = "url(assets/images/Cousins.webp"
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundSize = "cover";
        document.getElementById("header").style.backgroundImage = "linear-gradient(135deg, green, blue)";
        dark=true;
        this.innerHTML = `Dark mode`
    } else {
        document.querySelector('img[name="primaryLogo"]').src="assets/images/wo-glasses-bw.svg";
        document.querySelector('img[name="secondaryLogo"]').src="assets/images/Cousins-logo-bw.webp";
        document.body.style.backgroundImage = "url(assets/images/Cousins-bw.webp"
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundSize = "cover";
        document.getElementById("header").style.backgroundImage = "linear-gradient(135deg, black, darkgrey)";
        dark=false;
        this.innerHTML = `Colour mode`
    }
});

function beginning() {
    clock.style.display = "none";
    options.style.display = "grid";
    resetFrame();
}