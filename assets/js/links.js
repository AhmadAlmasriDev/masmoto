document.addEventListener("DOMContentLoaded", createListeners);

/**
 * Create event listeners for the links
 */
function createListeners() {
    let buttons = document.getElementsByClassName("links");
    for (let button of buttons) {
        button.addEventListener("mouseenter", updateInfo);
        button.addEventListener("mouseleave", resetInfo);
    }
}

/**
 * Update the info, content taken from aria-label
 */
function updateInfo(event) {
    let infoBlock = document.getElementById("link-info");
    infoBlock.innerHTML = this.children.item(0).ariaLabel;
}

/**
 * Reset the info content
 */
function resetInfo(event) {
    let infoBlock = document.getElementById("link-info");
    infoBlock.innerHTML = "Hover over the links below for more information.";
}

