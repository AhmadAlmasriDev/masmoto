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
    scoreUpdate();
    questionNumUpdate();
    gameSet(false);
    loadQuiz();

    // let gameContinue = true;
    // while (gameContinue) {


    //     let gameQustionNum = document.getElementById("question-num");

    //     let gameQustion = document.getElementById("question");
    //     let gameAnswerA = document.getElementById("answer-a");
    //     let gameAnswerB = document.getElementById("answer-b");
    //     let gameAnswerC = document.getElementById("answer-c");
    //     let gameAnswerD = document.getElementById("answer-d");



    // }
}


function scoreUpdate(res) {
    let gameScoreCorrect = document.getElementById("correct-answers");
    let gameScoreWrong = document.getElementById("wrong-answers");
    if (res) {
        if (res === true) {
            gameScoreCorrect.innerHTML = parseInt(gameScoreCorrect.innerHTML) + 1;
        } else {
            gameScoreWrong.innerHTML = parseInt(gameScoreWrong.innerHTML) + 1;
        }
    } else {
        gameScoreCorrect.innerHTML = "0";
        gameScoreWrong.innerHTML = "0";
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
        allAnswersLi[i].innerHTML = `<button class="answer" value="${Object.keys(q.answer)[i]}" data-ans="${q.correct}" type="button">${Object.keys(q.answer)[i].toUpperCase()}- <span>${q.answer[Object.keys(q.answer)[i]]}</span></button>`;
    }

    let allAnswers = document.getElementsByClassName("answer");
    for (let item of allAnswers) {
        item.addEventListener("click", showResult);
    }

}
function checkAnswer(e) {
    // console.log(this.value);
    let correctAnswer = e.getAttribute("data-ans");
    // console.log(correctAnswer);

    return e.value === correctAnswer ? true : false;
}

function showResult() {
    console.log(this);
    if (checkAnswer(this)) {
        console.log("yes");
    } else {
        console.log("no");
    }
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