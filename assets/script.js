//Start Timer
var timeEl = document.querySelector(".timer");
var startButton = document.querySelector(".startbtn");

var secondsLeft = 75;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timeEl.textContent = "Time: " + secondsLeft;
      secondsLeft--;
      
  
      if(secondsLeft < 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

startButton.addEventListener("click", setTime);