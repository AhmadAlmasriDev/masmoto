const APILINK = "https://mocki.io/v1/5fb9ecc7-22b4-4ce0-91e9-f052d5c81b35";

document.addEventListener("DOMContentLoaded", test);

function test() {
    // debugger;
    gameset(true);

}



function gameset(res) {
    const options = {
        once: true,
    };
    let gameStartButton = document.getElementById("start");
    let answersBlock = document.getElementById("answers");
    if (res) {
        gameStartButton.classList.remove("hidden");
        answersBlock.classList.add("hidden");
        gameStartButton.addEventListener("click", gameStart);
    } else {
        gameStartButton.classList.add("hidden");
        answersBlock.classList.remove("hidden");
    }


}

function gameStart() {
    console.log("game start2");
    // scoreUpdate();
    // questionNumUpdate();
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