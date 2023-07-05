document.addEventListener("DOMContentLoaded", createListeners);

/**
 * Create event listeners for utility cards
 */
function createListeners() {
    let buttons = document.getElementsByClassName("utility-card");
    for (let button of buttons) {
        button.addEventListener("mouseenter", updateInfo);
        button.addEventListener("mouseleave", resetInfo);
    }
}

/**
 *Update the utility info, content taken from aria-label 
 */
function updateInfo(event) {
    let infoBlock = document.getElementById("utility-info");
    infoBlock.innerHTML = this.children.item(0).ariaLabel;
}

/**
 * Reset the utility info content
 */
function resetInfo(event) {
    let infoBlock = document.getElementById("utility-info");
    infoBlock.innerHTML = "";
}