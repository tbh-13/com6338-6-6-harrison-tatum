// questions array
var questionsArr = [
    {
        question: 'Who wrote the novel Wuthering Heights?',
        answer: 'Emily Brontë',
        options: [
            'Jane Austen',
            'Charlotte Brontë',
            'Emily Brontë',
            'Mary Shelley',
        ]
    },
    {
        question: 'Who sang the song "Army Dreamers"?',
        answer: 'Kate Bush',
        options: [
            'Cher',
            'Celine Dion',
            'Kate Bush',
            'ABBA',
        ]
    },
    {
        question: 'Who wrote the novel The Handmaid\'s Tale?',
        answer: 'Margaret Atwood',
        options: [
            'Margaret Atwood',
            'Virginia Woolf',
            'Toni Morrison',
            'Simone de Beauvoir',
        ]
    },
    {
        question: 'Who sang the song "Dancing Queen"?',
        answer: 'ABBA',
        options: [
            'ABBA',
            'Prince',
            'Madonna',
            'The B-52s',
        ]
    },
    {
        question: 'Who wrote the novel The Bell Jar?',
        answer: 'Sylvia Plath',
        options: [
            'Sylvia Plath',
            'Virginia Woolf',
            'Joan Didion',
            'Bell Hooks',
        ]
    },
];

// if user has played before, display previous score

// at quiz start, display first question + add timer

// when user selects answer or time runs out, display next question

// reset timer

// after last question, display final score + start quiz button

// persist user score from localStorage

// on page load, display start quiz button
var quiz = document.getElementById("quiz")
if (!quiz) {
    quiz = document.createElement("div");
    quiz.id = "quiz";
    document.body.appendChild(quiz);
}

var startBtn = document.getElementById("start-quiz");
if (!startBtn) {
    startBtn = document.createElement("button");
    startBtn.id = "start-quiz";
    startBtn.innerText = "Start Quiz";
    document.body.appendChild(startBtn);
}

var index = 0;
var score = 0;
var time = 30;
var interval = null;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    index = 0;
    score = 0;
    startBtn.style.display = "none";
    showQuestion();
}

function showQuestion() {
    clearInterval(interval);
    time = 30;
    clearQuiz();

    var currentQuestion = questionsArr[index]
    var questionEL = document.createElement("h2")
    questionEL.textContent = currentQuestion.question;
    quiz.appendChild(questionEL);

    var timerEl = document.createElement("p");
    timerEl.textContent = time;
    quiz.appendChild(timerEl);

    currentQuestion.options.forEach(option => {
        var optionBtn = document.createElement("button");
        optionBtn.textContent = option;
        optionBtn.addEventListener("click", function () {
            if (option === currentQuestion.answer) {
                score++
            }
            nextQuestion();
        })

        quiz.appendChild(optionBtn);
    });

    interval = setInterval(function () {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            clearInterval(interval);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(interval);
    if (index === questionsArr.length - 1) {
        endGame();
        return;
    }
    index++;
    showQuestion();
}

function endGame() {
    clearInterval(interval);
    clearQuiz();
    var percent = Math.round((score / questionsArr.length) * 100);
    localStorage.setItem("previous-score", percent + "%");
    
    var scoreEl = document.createElement("h2");
    scoreEl.textContent = 'Your score: ' + percent + '%';
    quiz.appendChild(scoreEl);

    startBtn.style.display = "block";   
} 

function clearQuiz() {
    while (quiz.firstChild) {
        quiz.removeChild(quiz.firstChild);
    }
}