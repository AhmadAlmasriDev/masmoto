const APILINK = "https://mocki.io/v1/5fb9ecc7-22b4-4ce0-91e9-f052d5c81b35";

// document.addEventListener("DOMContentLoaded", LoadMakeList);

loadQuiz();

/**
 * Loads the make list with info from the data file
 */
function loadQuiz() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        qwestionNumber = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        currentQwestion = data[qwestionNumber];
        console.log(currentQwestion);
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