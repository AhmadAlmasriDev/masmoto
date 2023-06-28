const APILINK = "https://mocki.io/v1/7d0a7663-95a3-40c4-be5c-a13fc7f0908e";

document.addEventListener("DOMContentLoaded", LoadMakeList);

/**
 * Loads the make list with info from the data file
 */
function LoadMakeList() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        // console.log(data);

        injectMade(getMake(data));
        // injectModel(data);
    })();
}

// --------------------------------------------------

/**
 * Loads the model list with info from the data file
 */
function LoadModelList() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        // console.log(this.value)
        injectModel(getModel(data));
    })();
}

// --------------------------------------------------

/**
 * Loads the year list with info from the data file
 */
function LoadYearList() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        // console.log(this.value)
        injectYear(getYear(data));
    })();
}

function LoadSpecs() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        // console.log(this.value)
        injectSpecs(getSpecs(data));
    })();
}

// --------------------------------------------------

/**
 * Inject the data from array in to the made list (html option list)
 */
function injectMade(list) {
    injectSpecs();
    // debugger;
    let makeList = document.getElementById("make");
    let modelList = document.getElementById("model");
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Make</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    // console.log(optionList);
    makeList.innerHTML = optionList;
    modelList.innerHTML = '<option value="" disabled selected hidden>Select Make</option>';
    yearList.innerHTML = '<option value="" disabled selected hidden>Select Make</option>';
    makeList.addEventListener("input", LoadModelList);
}


// --------------------------------------------------


/**
 * Inject the data from array in to the model list (html option list)
 */
function injectModel(list) {
    // debugger;
    injectSpecs();
    let modelList = document.getElementById("model");
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Model</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    console.log(optionList);
    modelList.innerHTML = optionList;

    yearList.innerHTML = '<option value="" disabled selected hidden>Select Model</option>';
    modelList.addEventListener("input", LoadYearList);
}


// --------------------------------------------------


/**
 * Inject the data from array in to the year list (html option list)
 */
function injectYear(list) {
    // debugger;

    injectSpecs();
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Year</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    console.log(optionList);
    yearList.innerHTML = optionList;


    yearList.addEventListener("input", LoadSpecs);
}

/**
 * Inject and reset the data from array in to the specs html container
 */
function injectSpecs(specs) {

    let image = document.getElementById("moto-image");

    let category = document.getElementById("category");
    let power = document.getElementById("power");
    let engine = document.getElementById("engine");
    let drive = document.getElementById("drive");
    let gear = document.getElementById("gear");
    let clutch = document.getElementById("clutch");
    let cooling = document.getElementById("cooling");
    let weight = document.getElementById("weight");
    // debugger;
    if (!specs) {
        image.classList.add("hidden");
        image.src = "";
        category.innerHTML = "";
        power.innerHTML = "";
        engine.innerHTML = "";
        drive.innerHTML = "";
        gear.innerHTML = "";
        clutch.innerHTML = "";
        cooling.innerHTML = "";
        weight.innerHTML = "";
    } else {
        image.classList.remove("hidden");
        image.src = `assets/images/${specs.image}`;
        category.innerHTML = specs.type ? specs.type.split(" ")[0] : "-";
        power.innerHTML = specs.power ? `${specs.power.split(" ")[0]} HP` : "-";
        engine.innerHTML = specs.engine ? specs.engine.split(",")[0] : "-";

        let driveTemp = specs.transmission ? specs.transmission.split(",")[0] : "-";
        drive.innerHTML = driveTemp.split(" ")[0];
        gear.innerHTML = specs.gearbox ? specs.gearbox : "-";
        let clutchTemp = specs.clutch ? specs.clutch.split(",")[0] : "-";
        clutch.innerHTML = clutchTemp.split(" ")[0];
        cooling.innerHTML = specs.cooling ? specs.cooling : "-";
        weight.innerHTML = specs.total_weight ? `${specs.total_weight.split(" ")[0]} KG` : "-";
    }


}



// --------------------------------------------------

/**
 * Create a makes array from the data file and returns it
 */
function getMake(data) {
    let makeList = [];
    for (let item of data) {
        if (!makeList.includes(item.make.trim())) {
            makeList.push(item.make.trim());
        }
    }
    console.log(makeList);
    return makeList.sort();
}

// --------------------------------------------------

/** 
 * Create a models array from the data file and returns it 
*/
function getModel(data) {
    // debugger
    currentMake = document.getElementById("make");

    const models = data.filter(item => item.make == currentMake.value);
    console.log(models);

    const modelsList = [];
    // debugger
    for (let item of models) {
        if (!modelsList.includes(item.model.trim())) {
            modelsList.push(item.model.trim());
        }
    }
    console.log(modelsList);
    return modelsList.sort();
}

// --------------------------------------------------
/**
 * Create a years array from the data file and returns it   
 */
function getYear(data) {
    let currentMake = document.getElementById("make");
    let currentmodel = document.getElementById("model");


    // debugger
    const models = data.filter(item => item.make.trim() == currentMake.value);
    console.log(models);
    const years = models.filter(item => item.model.trim() == currentmodel.value);
    console.log(years);
    const yearsList = [];
    // debugger
    for (let item of years) {
        if (!yearsList.includes(item.year.trim())) {
            yearsList.push(item.year.trim());
        }
    }
    console.log("this is" + yearsList);
    return yearsList;
}

/**
 * Filters the data file and returns a specs object 
 */
function getSpecs(data) {
    // debugger
    let currentMake = document.getElementById("make");
    let currentmodel = document.getElementById("model");
    let currentyear = document.getElementById("year");


    const models = data.filter(item => item.make.trim() == currentMake.value);

    const years = models.filter(item => item.model.trim() == currentmodel.value);

    const specs = years.filter(item => item.year.trim() == currentyear.value);
    console.log(specs);

    return specs[0];
}




// --------------------------------------------------


/**
 * Fetsh data file from API
 */
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



