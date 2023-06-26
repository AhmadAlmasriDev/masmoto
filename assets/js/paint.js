document.addEventListener("DOMContentLoaded", paint);

function paint() {
    let parts = document.getElementsByClassName("body");
    for (let part of parts) {
        part.style = "color:#0dff00cc;";
    }
}