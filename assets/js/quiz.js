const APILINK = "https://mocki.io/v1/33f0ff85-bfa9-4d5b-99f9-1034af1a1a9e";

document.addEventListener("DOMContentLoaded", initial);

/**
 * Initializing function 
 */
function initial() {
    gameSet(true);
}

/**
 * Set and reset the game (true shows start playing and false shows the questions)
 */
function gameSet(res) {
    const options = {
        once: true,
    };
    let gameStartButton = document.getElementById("start");
    let answersBlock = document.getElementById("answers");
    if (res) {
        gameStartButton.classList.remove("display-non");
        answersBlock.classList.add("display-non");
        gameStartButton.addEventListener("click", gameStart, options);
    } else {
        gameStartButton.classList.add("display-non");
        answersBlock.classList.remove("display-non");
    }
}

/**
 * Starts the game by resetting the score and question num and loads a random question from API 
 */
function gameStart() {
    scoreUpdate("reset");
    questionNumUpdate();
    gameSet(false);
    loadQuiz();
}

/**
 * Updates or resets the score (correct, wrong , reset)
 */
function scoreUpdate(res) {
    let gameScoreCorrect = document.getElementById("correct-answers");
    let gameScoreWrong = document.getElementById("wrong-answers");
    switch (res) {
        case "correct":
            gameScoreCorrect.innerHTML = parseInt(gameScoreCorrect.innerHTML) + 1;
            break;
        case "wrong":
            gameScoreWrong.innerHTML = parseInt(gameScoreWrong.innerHTML) + 1;
            break;
        case "reset":
            gameScoreCorrect.innerHTML = "0";
            gameScoreWrong.innerHTML = "0";
            break;
    }
}

/**
 * Increase or reset the question num (true increase, false decrease)
 */
function questionNumUpdate(res) {
    let gameQustionNum = document.getElementById("question-num");
    if (res) {
        gameQustionNum.innerHTML = parseInt(gameQustionNum.innerHTML) + 1;
    } else {
        gameQustionNum.innerHTML = "0";
    }
}

/**
 * Injects the question and answers to the html and adds event listiners and increase question num 
 */
function injectQuiz(q) {
    let allAnswersLi = document.getElementsByClassName("answer-li");
    let gameQuestion = document.getElementById("question");
    gameQuestion.innerHTML = q.question;
    for (let i = 0; i < allAnswersLi.length; i++) {
        allAnswersLi[i].innerHTML = `<button id = "${Object.keys(q.answer)[i]}" class="answer" value="${Object.keys(q.answer)[i]}" data-ans="${q.correct}" type="button">${Object.keys(q.answer)[i].toUpperCase()}- <span>${q.answer[Object.keys(q.answer)[i]]}</span></button>`;
    }
    let allAnswers = document.getElementsByClassName("answer");
    for (let item of allAnswers) {
        item.addEventListener("click", showResult);
    }
    questionNumUpdate(true);
}

/**
 * Check the answer and return true or false
 */
function checkAnswer(e) {
    let correctAnswer = e.getAttribute("data-ans");
    return e.id === correctAnswer ? true : false;
}

/**
 * Show the result correct or wrong and update the score, and remove event listiners
 */
function showResult() {
    let allAnswers = document.getElementsByClassName("answer");
    let gameQuestion = document.getElementById("question");
    if (checkAnswer(this)) {
        this.classList.add("correct");
        gameQuestion.innerHTML = "Yes, this is the correct answer.";
        scoreUpdate("correct");
    } else {
        let correct = document.getElementById(this.getAttribute("data-ans"));
        this.classList.add("wrong");
        correct.classList.add("correct");
        gameQuestion.innerHTML = "No, you got it wrong. \n The correct answer is -";
        scoreUpdate("wrong");
    }
    for (let item of allAnswers) {
        item.removeEventListener("click", showResult);
    }
    setTimeout(checkCount, 3000);
}

/**
 * Check the current question num and either continue or finish 
 */
function checkCount() {
    let gameQustionNum = document.getElementById("question-num");
    parseInt(gameQustionNum.innerHTML) !== 10 ? loadQuiz() : finish();
}

/**
 * finish the game and show the result
 */
function finish() {
    gameSet(true);
    let gameQuestion = document.getElementById("question");
    let gameScoreCorrect = document.getElementById("correct-answers");
    let gameScoreWrong = document.getElementById("wrong-answers");
    gameQuestion.innerHTML = `You got ${gameScoreCorrect.innerHTML} correct and ${gameScoreWrong.innerHTML} wrong answers`;
}

/**
 * Load the make list with info from the data file
 */
function loadQuiz() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        let questionNumber = Math.floor(Math.random() * (data.length));
        injectQuiz(data[questionNumber]);
    })();
}

/**
 * Get data from API
 */
function getData() {
    let url = APILINK;
    const options = {
        method: 'GET',
        contentType: 'application/json'
    };
    try {
        const response = fetch(url, options);
        return response;
    } catch (error) {
        console.error(error);
    }
}    