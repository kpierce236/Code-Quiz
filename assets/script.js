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

var questions = ["Commonly used data types DO NOT include:","The condtions in an if / else statement is enclosed within ____.", "Arrays in javaScript can be used to store ____.","String values must be enclosed within _____ when being assigned to variables.","A very useful tool used during development and debugging for printing content to the debugger is:"];

var q1 = ["strings", "booleans", "alerts", "numbers"];
var q2 = ["quotes", "curly brackets", "parentheses", "square brackets"];
var q3 = ["numbers and strings","other arrays","booleans","all of the above"];
var q4 = ["commas","curly brackets","quotes","parenthese"];
var q5 = ["JavaScript","terminal/bash","for loops","console.log"];

var answers = ["alerts","parenthese","all of the above","quotes","console.log"];
//Make questions