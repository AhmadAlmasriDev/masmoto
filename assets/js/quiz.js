const APILINK = "https://mocki.io/v1/5fb9ecc7-22b4-4ce0-91e9-f052d5c81b35";

document.addEventListener("DOMContentLoaded", test);

function test() {
    debugger;
    for (let i = 0; i < 10; i++) {
        questionNumUpdate();
    }

}



function game() {
    let gameContinue = True;

    while (gameContinue) {

        let gameQustionNum = document.getElementById("question-num");
        let gameStart = document.getElementById("start");
        let gameQustion = document.getElementById("question");
        let gameAnswerA = document.getElementById("answer-a");
        let gameAnswerB = document.getElementById("answer-b");
        let gameAnswerC = document.getElementById("answer-c");
        let gameAnswerD = document.getElementById("answer-d");



    }
}
function scoreUpdate(res) {
    let gameScoreCorrect = document.getElementById("correct-answers");
    let gameScoreWrong = document.getElementById("wrong-answers");


    if (res === true) {
        gameScoreCorrect.innerHTML = parseInt(gameScoreCorrect.innerHTML) + 1;

    } else {
        gameScoreWrong.innerHTML = parseInt(gameScoreWrong.innerHTML) + 1;
    }

}

function questionNumUpdate() {
    let gameQustionNum = document.getElementById("question-num");
    gameQustionNum.innerHTML = parseInt(gameQustionNum.innerHTML) + 1;
}
/**
 * Loads the make list with info from the data file
 */
function loadQuiz() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        questionNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        currentQuestion = data[questionNumber];
        console.log(currentQuestion);
        // injectMade(getMake(data));
        // injectModel(data);
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