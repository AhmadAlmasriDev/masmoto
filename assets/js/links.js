document.addEventListener("DOMContentLoaded", createListeners);

function createListeners() {

    let buttons = document.getElementsByClassName("links");
    for (let button of buttons) {
        // console.log(button.id);
        button.addEventListener("mouseenter", updateInfo);
        button.addEventListener("mouseleave", resetInfo);
    }
}

function updateInfo(event) {
    let infoBlock = document.getElementById("link-info");
    console.log(this.firstChild.ariaLabel);
    infoBlock.innerHTML = this.firstChild.ariaLabel;

}
function resetInfo(event) {
    let infoBlock = document.getElementById("link-info");
    infoBlock.innerHTML = "Hover over the links below for more information.";
}

