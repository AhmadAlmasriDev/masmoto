const APILINK = "https://mocki.io/v1/33f0ff85-bfa9-4d5b-99f9-1034af1a1a9e";

document.addEventListener("DOMContentLoaded", test);

function test() {

    gameSet(true);

}



function gameSet(res) {
    const options = {
        once: true,
    };
    let gameStartButton = document.getElementById("start");
    let answersBlock = document.getElementById("answers");
    if (res) {
        gameStartButton.classList.remove("hidden");
        answersBlock.classList.add("hidden");
        gameStartButton.addEventListener("click", gameStart, options);
    } else {
        gameStartButton.classList.add("hidden");
        answersBlock.classList.remove("hidden");
    }


}

function gameStart() {
    console.log("game start");
    scoreUpdate("reset");
    questionNumUpdate();
    gameSet(false);
    loadQuiz();

}


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

function questionNumUpdate(res) {
    let gameQustionNum = document.getElementById("question-num");
    if (res) {
        gameQustionNum.innerHTML = parseInt(gameQustionNum.innerHTML) + 1;
    } else {
        gameQustionNum.innerHTML = "0";
    }
}

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


function checkAnswer(e) {
    // console.log(this.value);
    let correctAnswer = e.getAttribute("data-ans");
    // console.log(correctAnswer);

    return e.id === correctAnswer ? true : false;
}

function showResult() {
    console.log(this);
    let allAnswers = document.getElementsByClassName("answer");
    let gameQuestion = document.getElementById("question");
    if (checkAnswer(this)) {
        this.classList.add("correct");
        gameQuestion.innerHTML = "Yes, this is the correct answer.";
        scoreUpdate("correct");
    } else {

        let correct = document.getElementById(this.getAttribute("data-ans"));
        console.log(correct);
        this.classList.add("wrong");
        correct.classList.add("correct");
        gameQuestion.innerHTML = "No, you got it wrong. \n The correct answer is -";
        scoreUpdate("wrong");
    }
    for (let item of allAnswers) {
        item.removeEventListener("click", showResult);
    }

    console.log("new one");

    setTimeout(checkCount, 3000);


}
function checkCount() {
    let gameQustionNum = document.getElementById("question-num");
    // debugger;
    parseInt(gameQustionNum.innerHTML) !== 3 ? loadQuiz() : finish();
}

function finish() {
    console.log("finish");
    gameSet(true);
    let gameQuestion = document.getElementById("question");
    let gameScoreCorrect = document.getElementById("correct-answers");
    let gameScoreWrong = document.getElementById("wrong-answers");
    gameQuestion.innerHTML = `You got ${gameScoreCorrect.innerHTML} correct and ${gameScoreWrong.innerHTML} wrong answers`;

}




/**
 * Loads the make list with info from the data file
 */
function loadQuiz() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        dataLength = data.length;
        questionNumber = Math.floor(Math.random() * (dataLength));
        console.log(questionNumber);
        currentQuestion = data[questionNumber];
        // console.log(currentQuestion);
        injectQuiz(currentQuestion);

    })();
}


function getData() {

    let url = APILINK;
    const options = {
        method: 'GET',
        contentType: 'application/json'
    };

    try {
        const response = fetch(url, options);
        // const result = await response.text();
        return response;
    } catch (error) {
        console.error(error);
    }
}    