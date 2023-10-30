//Start Timer
var timeEl = document.querySelector(".timer");
var startButton = document.querySelector(".startbtn");
var containerEl= document.querySelector(".container");
var viewScoresEl= document.querySelector(".high-scores");

var secondsLeft = 75;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timeEl.textContent = "Time: " + secondsLeft;
      secondsLeft--;
      
  
      if(secondsLeft < 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        endGame();
      }
  
    }, 1000);
  }

startButton.addEventListener("click", setTime);
startButton.addEventListener("click", init);

//array of questions, selections, and anwsers

var questions = ["Commonly used data types DO NOT include:","The condtions in an if / else statement is enclosed within ____.", "Arrays in javaScript can be used to store ____.","String values must be enclosed within _____ when being assigned to variables.","A very useful tool used during development and debugging for printing content to the debugger is:"];
var selectionObject = {
    q0 : ["strings", "booleans", "alerts", "numbers"],
    q1 : ["quotes", "curly brackets", "parentheses", "square brackets"],
    q2 : ["numbers and strings","other arrays","booleans","all of the above"],
    q3 : ["commas","curly brackets","quotes","parenthese"],
    q4 : ["JavaScript","terminal/bash","for loops","console.log"] 
}

var answers = ["alerts","parentheses","all of the above","quotes","console.log"];

var position = 0;

var score = 0;

var titleEl = document.querySelector(".title");
var subjectEl = document.querySelector(".subject");
var list = document.createElement("ol");

//Post inital question when start button is clicked
function init() {
    startButton.remove();
    titleEl.setAttribute("class","question");
    subjectEl.setAttribute("class","answer");
    subjectEl.replaceWith(list);

    titleEl.textContent = questions[position];
    
    for (var i = 0; i < selectionObject.q0.length; i++) {
       var answerBtn = document.createElement("li");
       list.appendChild(answerBtn);
       answerBtn.setAttribute("class","answer-btn");
       answerBtn.textContent= selectionObject.q0[i];

       answerBtn.addEventListener("click", checkAnswer);
       
    };
    
}
// Creates the next question when you answer the previous one

function nextQuestion() {
   position += 1;
   
   titleEl.textContent = questions[position];
   list.innerHTML = "";

   if (position === 5) {
    endGame();
   }

   var selection = selectionObject["q"+ position];

   for (var i = 0; i < selection.length; i++) {
    var answerBtn = document.createElement("li");
    list.appendChild(answerBtn);
    answerBtn.setAttribute("class","answer-btn");
    answerBtn.textContent= selection[i];

    answerBtn.addEventListener("click", checkAnswer);
    
 };

   
 };


//function checks anwser of clicked selection

function checkAnswer (event) {
    if (event.target.textContent === answers[position]) {
        correctAnswer();
        nextQuestion();
    }
    else {
        wrongAnswer();
        nextQuestion();
    }
}

// Function that runs when answer selected is wrong
// Displays message and takes away 10 seconds from timer

function wrongAnswer () {
    var wrong = document.createElement("div");
    wrong.textContent = "Wrong!";
    wrong.setAttribute("class","response");
    
    secondsLeft = secondsLeft - 10;

    
    wrongSeconds = 2;
    var timer = setInterval(function() {
        list.append(wrong);
        wrongSeconds--;
        
    
        if(wrongSeconds === 0) {
          // Stops execution of action at set interval
          clearInterval(timer);
          wrong.remove()
        }
    
      }, 1000);


}

function correctAnswer () {
    score += 10;
    var correct = document.createElement("div");
    correct.textContent = "Correct!";
    correct.setAttribute("class","response");
    

    correctSeconds = 2;
    var timerTwo = setInterval(function() {
        list.append(correct);
        correctSeconds--;
        
    
        if(correctSeconds === 0) {
          // Stops execution of action at set interval
          clearInterval(timerTwo);
          correct.remove()
        }
    
      }, 1000);


}

function endGame() {
    secondsLeft = 0;

    titleEl.textContent = "All done!"
    var statementEl = document.createElement("p");
    statementEl.setAttribute("style","text-align:left;")
    statementEl.textContent = "Your final score is " + score + ".";
    list.replaceWith(statementEl);
    var submitEl = '<span> Enter initials: <input class="input"></input><button class="submit">Submit</button>';
    var submitContainerEl = document.createElement("div");
    statementEl.append(submitContainerEl);
    submitContainerEl.setAttribute("style","margin-top:20px; text-align: left;");

    submitContainerEl.innerHTML = submitEl;

    var submitButton = document.querySelector(".submit");
    var intialEl = document.querySelector(".input");

    submitButton.addEventListener ("click", function (event) {
        event.preventDefault();
        var intial = intialEl.value;
        localStorage.setItem(intial , intial+ ": " + score);

        displayHighScores();
        
    });
    
}
viewScoresEl.addEventListener("click",displayHighScores);

function displayHighScores() {
    secondsLeft = 0;
    containerEl.innerHTML = '<h1 class="highscore">Highscores</h1>';
    var highscoreTitle = document.querySelector(".highscore");
    var scoreListEl = document.createElement("ol");
    highscoreTitle.append(scoreListEl);

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];


        var score = document.createElement("li");
        scoreListEl.appendChild(score);
        score.setAttribute("class","scores");
        score.textContent= value;
    
        
     };

    var btnContainer = document.createElement("div");
    scoreListEl.append(btnContainer);
    btnContainer.innerHTML = "<button class='back'>Go Back</button> <button class='clear'>Clear Highscores</button>";

    var clearBtn = document.querySelector(".clear");
    var backBtn = document.querySelector(".back");

    clearBtn.addEventListener("click", function () {
        localStorage.clear();
        //scoreListEl.innerHTML = "";
    })

    backBtn.addEventListener("click", function () {
       location.reload();

    })
}