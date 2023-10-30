//Selected Elements for manipulation
var timeEl = document.querySelector(".timer");
var startButton = document.querySelector(".startbtn");
var containerEl= document.querySelector(".container");
var viewScoresEl= document.querySelector(".high-scores");

//Timer seconds variable
var secondsLeft = 75;

//Function that sets timer for quiz
function setTime() {
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

//Event listners that run seperate functions for the start quiz buttpn
startButton.addEventListener("click", setTime);
startButton.addEventListener("click", init);

//Arrays of questions, selections, and anwsers
var questions = ["Commonly used data types DO NOT include:","The condtions in an if / else statement is enclosed within ____.", "Arrays in javaScript can be used to store ____.","String values must be enclosed within _____ when being assigned to variables.","A very useful tool used during development and debugging for printing content to the debugger is:"];
var selectionObject = {
    q0 : ["strings", "booleans", "alerts", "numbers"],
    q1 : ["quotes", "curly brackets", "parentheses", "square brackets"],
    q2 : ["numbers and strings","other arrays","booleans","all of the above"],
    q3 : ["commas","curly brackets","quotes","parenthese"],
    q4 : ["JavaScript","terminal/bash","for loops","console.log"] 
}

var answers = ["alerts","parentheses","all of the above","quotes","console.log"];

//Position variable that sets directs the program to which set of question, selections, and answer we are on
var position = 0;

//Holds the current score of the quiz
var score = 0;

//Selects and stores the title, and subject element of the page
var titleEl = document.querySelector(".title");
var subjectEl = document.querySelector(".subject");

//Creates a list element to store the selections for the question in
var list = document.createElement("ol");

//Posts inital question when start button is clicked
function init() {
    //Removes start button
    startButton.remove();

    //Changes the class of the title and subject elements
    titleEl.setAttribute("class","question");
    subjectEl.setAttribute("class","answer");

    //Replaces the subject element with the created list element declared outside the function
    subjectEl.replaceWith(list);

    //Sets the title element equal to the first question
    titleEl.textContent = questions[position];
    
    //For loop that iterates over the selections for the given question and then creates list elements
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


//Function checks anwser of clicked selection and then brings you the next question
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

    
    wrongSeconds = 1;
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

// Function that runs when answer selected is correct
// Displays message and addes ten points to your score

function correctAnswer () {
    score += 10;
    var correct = document.createElement("div");
    correct.textContent = "Correct!";
    correct.setAttribute("class","response");
    

    correctSeconds = 1;
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
//This function is run when either time runs out or you answer all questions
//This functions creates an HTMl that has a input field where you submit your intial with the given score.
function endGame() {
    //resets seconds to zero
    secondsLeft = 0;

    //Changes title
    titleEl.textContent = "All done!"

    //Adds statement with your final score stated
    var statementEl = document.createElement("p");
    statementEl.setAttribute("style","text-align:left;")
    statementEl.textContent = "Your final score is " + score + ".";
    //replaces list element with statement
    list.replaceWith(statementEl);

    //Appends HTML to the statement element that includes an input field and submit button
    var submitEl = '<span> Enter initials: <input class="input"></input><button class="submit">Submit</button>';
    var submitContainerEl = document.createElement("div");
    statementEl.append(submitContainerEl);
    submitContainerEl.setAttribute("style","margin-top:20px; text-align: left;");

    submitContainerEl.innerHTML = submitEl;

    var submitButton = document.querySelector(".submit");
    var intialEl = document.querySelector(".input");

    //Event listener for the newly created submit button that posts the given score and intial to local storage
    // After storing the intial and score the displayHighScores function is run
    submitButton.addEventListener ("click", function (event) {
        event.preventDefault();
        var intial = intialEl.value;
        localStorage.setItem(intial , intial+ ": " + score);

        displayHighScores();
        
    });
    
}

// Runs the displayHighScores function when the element that contains View highscores text is clicked
viewScoresEl.addEventListener("click",displayHighScores);

//Renders new HTML that displays the highscores stored in localstorage

function displayHighScores() {
    //resets timer to zero
    secondsLeft = 0;

    //Creates highscores title and an ordered list to store the scores
    containerEl.innerHTML = '<h1 class="highscore">Highscores</h1>';
    var highscoreTitle = document.querySelector(".highscore");
    var scoreListEl = document.createElement("ol");
    highscoreTitle.append(scoreListEl);

    //for loop that goes through local storage and then posts a list element to append the score list element 
    //that contains the highscore with intial
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];


        var score = document.createElement("li");
        scoreListEl.appendChild(score);
        score.setAttribute("class","scores");
        score.textContent= value;
    
        
     };

     //creates container that holds the two curated buttons for the display highscores page
    var btnContainer = document.createElement("div");
    scoreListEl.append(btnContainer);
    btnContainer.innerHTML = "<button class='back'>Go Back</button> <button class='clear'>Clear Highscores</button>";

    var clearBtn = document.querySelector(".clear");
    var backBtn = document.querySelector(".back");
    
    //when clear highscores is clicked then local sotrage is cleared
    clearBtn.addEventListener("click", function () {
        localStorage.clear();
        //scoreListEl.innerHTML = "";
    })

    //when the back button is clicked then the browser reloads to the startpage
    backBtn.addEventListener("click", function () {
       location.reload();

    })
}