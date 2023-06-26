document.addEventListener("DOMContentLoaded", listeners);

function listeners() {
    let bodyColor = document.getElementById("body-color");
    let stripeColor = document.getElementById("stripe-color");
    bodyColor.addEventListener("input", paintBody);
    stripeColor.addEventListener("input", paintStripe);
}



function paintBody() {
    let parts = document.getElementsByClassName("body");
    for (let part of parts) {
        part.style = `color:${this.value}cc;`;
    }
}
function paintStripe() {
    let stripes = document.getElementsByClassName("stripe-2");
    for (let stripe of stripes) {
        stripe.style = `color:${this.value};`;
    }
}