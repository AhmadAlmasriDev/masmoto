document.addEventListener("DOMContentLoaded", createListeners);

function createListeners() {

    let buttons = document.getElementsByClassName("utility-card");
    for (let button of buttons) {
        // console.log(button.id);
        button.addEventListener("mouseenter", updateInfo);
        button.addEventListener("mouseleave", resetInfo);
    }
}

// function updateInfo(event) {
//     let infoBlock = document.getElementById("utility-info");
//     console.log(event.target.id);
//     switch (event.target.id) {
//         case "specs":
//             infoBlock.innerHTML = "Information on all motorcycles by make, mode, and year.";
//             break;
//         case "quiz":
//             infoBlock.innerHTML = "A small quiz to test your motorcycle knowledge.";
//             break;
//         case "paint":
//             infoBlock.innerHTML = "Check how your motorcycle will look like with new paint job.";
//             break;
//         case "links":
//             infoBlock.innerHTML = "Some useful motorcycle links";

//     }

// }
// function resetInfo(event) {
//     let infoBlock = document.getElementById("utility-info");
//     infoBlock.innerHTML = "";
// }

function updateInfo(event) {
    // console.log(this.children.item(0).ariaLabel);
    let infoBlock = document.getElementById("utility-info");
    infoBlock.innerHTML = this.children.item(0).ariaLabel;

}
function resetInfo(event) {
    let infoBlock = document.getElementById("utility-info");
    infoBlock.innerHTML = "";
}