document.addEventListener("DOMContentLoaded", LoadMakeList);


function LoadMakeList(){(async () => {
    const result = await getData();
    const data = await result.json();
    // console.log(data);
    
    injectMade(getMake(data))
    // injectModel(data);
})();
}



function LoadModelList(){(async () => {
    const result = await getData();
    const data = await result.json();
    console.log(this.value)
    // getModel(data,this.value)



})();
}


function injectMade(list) {
    // debugger;
    let makeList = document.getElementById("make");
    let modelList = document.getElementById("model");
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Make</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    console.log(optionList);
    makeList.innerHTML=optionList;
    modelList.innerHTML='<option value="" disabled selected hidden>Select Make</option>';
    yearList.innerHTML='<option value="" disabled selected hidden>Select Make</option>';
    makeList.addEventListener( "input", LoadModelList)
}

function getMake(data){
    let makeList=[];    
    for(let item of data){
        if (!makeList.includes(item.make)){
            makeList.push(item.make);
        }
    }
    console.log(makeList);
    return makeList.sort();
}

function getModel(data,make){
    const models = data.filter(data.make === make);
    const modelsList = []
    for (let item in models){
        if (!modelsList.includes(item.model)){
            modelList.push(item.model);
        }
    }
    console.log(modelsList);
}



function getData() {

    let url = "https://mocki.io/v1/7c81d58a-972b-4113-9271-e8dc2d95dfc2";
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



