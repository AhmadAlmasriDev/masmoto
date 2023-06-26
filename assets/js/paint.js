document.addEventListener("DOMContentLoaded", listeners);

function listeners() {
    let bodyColor = document.getElementById("body-color");
    let stripeColor = document.getElementById("stripe-color");
    bodyColor.addEventListener("input", paintBody);
}



function paintBody() {
    let parts = document.getElementsByClassName("body");
    for (let part of parts) {
        part.style = `color:${this.value}cc;`;
    }
}
function paintstripe() {
    let stripes = document.getElementsByClassName("body");
    for (let stripe of stripes) {
        stripe.style = `color:${this.value};`;
    }
}