const APILINK = "https://mocki.io/v1/f28fddb1-5b3b-45b9-8f17-7b7990639bc3";

document.addEventListener("DOMContentLoaded", LoadMakeList);

// Load Functions Initiate The Other Functions----------------------------------
/**
 * Load the make list with info from the data file
 */
function LoadMakeList() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        injectMade(getMake(data));
    })();
}

/**
 * Load the model list with info from the data file
 */
function LoadModelList() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        injectModel(getModel(data));
    })();
}

/**
 * Load the year list with info from the data file
 */
function LoadYearList() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        injectYear(getYear(data));
    })();
}

/**
 * Load the specs from the data file
 */
function LoadSpecs() {
    (async () => {
        const result = await getData();
        const data = await result.json();
        injectSpecs(getSpecs(data));
    })();
}

// Inject Functions Place Data In HTML Structure--------------------------------
/**
 * Inject the data from array in to the made list (html option list)
 */
function injectMade(list) {
    injectSpecs();
    let makeList = document.getElementById("make");
    let modelList = document.getElementById("model");
    let yearList = document.getElementById("year");
    let optionList = `<option value="" disabled selected hidden>Make</option>`;
    for (let item of list) {
        let tempListItem = `<option value="${item}">${item}</option>`;
        optionList += tempListItem;
    }
    makeList.innerHTML = optionList;
    modelList.innerHTML = '<option value="" disabled selected hidden>Select Make</option>';
    yearList.innerHTML = '<option value="" disabled selected hidden>Select Make</option>';
    makeList.addEventListener("input", LoadModelList);
}

/**
 * Inject the data from array in to the model list (html option list)
 */
function injectModel(list) {
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

/**
 * Inject the data from array in to the year list (html option list)
 */
function injectYear(list) {
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
    let imagePlaceHolder = document.getElementById("image-place-holder");
    let category = document.getElementById("category");
    let power = document.getElementById("power");
    let engine = document.getElementById("engine");
    let drive = document.getElementById("drive");
    let gear = document.getElementById("gear");
    let clutch = document.getElementById("clutch");
    let cooling = document.getElementById("cooling");
    let weight = document.getElementById("weight");
    if (!specs) {
        image.classList.add("hidden");
        imagePlaceHolder.classList.remove("display-non");
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
        imagePlaceHolder.classList.add("display-non");
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

// Get Functions Filters Data (return object or array)--------------------------
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

/** 
 * Create a models array from the data file and returns it 
*/
function getModel(data) {
    let currentMake = document.getElementById("make");
    const models = data.filter(item => item.make == currentMake.value);
    console.log(models);
    const modelsList = [];
    for (let item of models) {
        if (!modelsList.includes(item.model.trim())) {
            modelsList.push(item.model.trim());
        }
    }
    console.log(modelsList);
    return modelsList.sort();
}

/**
 * Create a years array from the data file and returns it   
 */
function getYear(data) {
    let currentMake = document.getElementById("make");
    let currentmodel = document.getElementById("model");
    const models = data.filter(item => item.make.trim() == currentMake.value);
    const years = models.filter(item => item.model.trim() == currentmodel.value);
    const yearsList = [];
    for (let item of years) {
        if (!yearsList.includes(item.year.trim())) {
            yearsList.push(item.year.trim());
        }
    }
    return yearsList;
}

/**
 * Filters the data file and returns a specs object 
 */
function getSpecs(data) {
    let currentMake = document.getElementById("make");
    let currentmodel = document.getElementById("model");
    let currentyear = document.getElementById("year");
    const models = data.filter(item => item.make.trim() == currentMake.value);
    const years = models.filter(item => item.model.trim() == currentmodel.value);
    const specs = years.filter(item => item.year.trim() == currentyear.value);
    console.log(specs);
    return specs[0];
}

// Fetch Data From API----------------------------------------------------------
/**
 * Fetch data file from API
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



