var quizArea = document.getElementById("quiz");
var endGame = document.getElementById("endGame");
var startBtn = document.getElementById("startBtn");
var timerEl = document.getElementById("timer");
var scoreEl = document.getElementById("scoreDisplay");
var scoreForm = document.getElementById("scoreForm");
var scoreInput = document.getElementById("initials");
var timeLeft = 60;
var score = 0;

var questions = [
    {
        question: "1st question", 
        answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
        correctAnswer: "2nd"
    },
    {
        question: "2nd question",
        answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
        correctAnswer: "1st"
    },
    {
        question: "3rd question",
        answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
        correctAnswer: "3rd"
    },
    {
        question: "4th question",
        answerChoices: ["1st answer choice", "2nd", "3rd", "4th"],
        correctAnswer: "4th"
    },
    {
        question: "5th question",
        answerChoices: ["1st answer choice", "2nd", "3rd", "4th", "5th"],
        correctAnswer: "5th"
    }
];

var currentQuestion = 0;
var timerInterval;

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}


function startGame(event) {
    event.preventDefault();
    // start the quiz!
    // 1. Start timer
    // 2. create a question
    // 3. create answer choices
    // 4. add event listeners to my answer choice buttons and that will validate whether they chose the right answer or not
    // 5. move on to next question

    // this function will start your timer
    startTimer();
    // this function will kick off rendering the question and answers to the page
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
    // generateAnswerChoices
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
        // incorrect answer
        setTimeout(function () {
            document.body.style.backgroundColor = "#f2f2f2";
        }, 500);
        document.body.style.backgroundColor = "red";
     
        // decrease timer by 10 secs
        timeLeft -= 10;
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
    window.location.href = "scores.html";
});