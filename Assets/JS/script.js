var quizArea = document.getElementById("quiz");
var endGame = document.getElementById("endGame");
var startBtn = document.getElementById("startBtn");
var timerEl = document.getElementById("timer");
var scoreEl = document.getElementById("scoreDisplay");
var scoreForm = document.getElementById("scoreForm");
var scoreInput = document.getElementById("initials");
var timeLeft = 60;
var score = 0;
var currentQuestion = 0;
var timerInterval;

// Questions Array
var questions = [
    {
        question: "What does CSS stand for?", 
        answerChoices: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Spread", "Computer Style Spread"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "What is the correct syntax for defining a hyperlink in HTML?",
        answerChoices: ["<a href=”url”> Link text <a>", "<ref=”url”> Link text <a>", "<a=”url”> Link Text<a>", "<a href=”url”> Link text </a>"],
        correctAnswer: "<a href=”url”> Link text </a>"
    },
    {
        question: "What is the default horizontal alignment for elements on a webpage?",
        answerChoices: ["Left", "Center", "Right", "Wherever you type it"],
        correctAnswer: "Left"
    },
    {
        question: "Which symbol is used as an abbreviation for the jQuery function?",
        answerChoices: ["%", "&", "$", "@"],
        correctAnswer: "$"
    },
    {
        question: "Which of the variables below is an array?",
        answerChoices: ["var names=[];", "var names=array;", "var names='array'", "var names[]"],
        correctAnswer: "var names=[];"
    }
];

// This function will start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// start the game
function startGame() {

// this function will start the timer
startTimer();

// this function start the quiz
generateQuestion();
}

function generateQuestion() {
// clear out the quiz area
quizArea.textContent = "";
var question = questions[currentQuestion].question;
// create an element (p, div)
var questionEl = document.createElement("div");
// write into that element using our question variable (textContent)
questionEl.textContent = question;
// append that question element into our quiz area (appendChild)
quizArea.appendChild(questionEl);
// generate AnswerChoices
generateAnswerChoices();
}

function generateAnswerChoices() {
// for loop i < questions[currentQuestion].answerChoices.length
for (var i = 0; i < questions[currentQuestion].answerChoices.length; i++) {
    // create an element (button)
    var btn = document.createElement("button");
    // write into that element using our answerChoices variable (textContent)
    btn.textContent = questions[currentQuestion].answerChoices[i];
    // add event listener btn.addEventListener("click", validateAnswer)
    btn.addEventListener("click", validateAnswer);
    // append that question element into our quiz area (appendChild)
    quizArea.appendChild(btn);
}
}

function validateAnswer(event) {
event.preventDefault();
// grab text of button that was clicked (event.target.textContent)
var userChoice = event.target.textContent;
// conditional statement test userChoice === correctAnswer
if (userChoice === questions[currentQuestion].correctAnswer) {
    // true
    setTimeout(function () {
        document.body.style.backgroundColor = "#f2f2f2";
    }, 500);
    document.body.style.backgroundColor = "green";
    score = score + 10;

    // correct answer code
} else {
    // false
    // incorrect answer screen flash red
    setTimeout(function () {
        document.body.style.backgroundColor = "#f2f2f2";
    }, 500);
    document.body.style.backgroundColor = "red";
    
    // decrease timer by 10 secs
    timeLeft = timeLeft - 10;
}
// move onto the next question
currentQuestion++;

// conditional statement to check if you've reached the end of the questions array if(currentQuestion === questions.length)
if (currentQuestion === questions.length || timeLeft === 0) {
    timeLeft = 0;
    timerEl.textContent = timeLeft;
    clearInterval(timerInterval);
    scoreEl.textContent = score;
    quizArea.style.display = "none";
    endGame.style.display = "block";
    // end the game
} else {
    generateQuestion();
}
}
startBtn.addEventListener("click", startGame);
scoreForm.addEventListener("submit", function (event) {
event.preventDefault();
var initials = scoreInput.value;
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
highScores.push({ initials: initials, score: score });
localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.href = "index.html"
});