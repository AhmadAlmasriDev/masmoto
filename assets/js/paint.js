document.addEventListener("DOMContentLoaded", listeners);
/**
 * Creat event listeners for the color control (color picker and radio)
 */
function listeners() {
    let bodyColor = document.getElementById("body-color");
    let stripeColor = document.getElementById("stripe-color");
    let stripeTypes = document.getElementsByName("stripe");
    bodyColor.addEventListener("input", paintBody);
    stripeColor.addEventListener("input", paintStripe);
    for (let stripeType of stripeTypes)
        stripeType.addEventListener("input", stripeKind);
}
/**
 * Paint the body
 */
function paintBody() {
    let parts = document.getElementsByClassName("body");
    for (let part of parts) {
        part.style = `color:${this.value}cc;`;
    }
}
/**
 * Color the stripe
 */
function paintStripe() {
    let stripes1 = document.getElementsByClassName("stripe-1");
    let stripes2 = document.getElementsByClassName("stripe-2");
    for (let stripe of stripes1) {
        stripe.style = `color:${this.value};`;
    }
    for (let stripe of stripes2) {
        stripe.style = `color:${this.value};`;
    }
}
/**
 * Stripe type 
 */
function stripeKind() {
    let allSt1 = document.getElementsByClassName("stripe-1");
    let allSt2 = document.getElementsByClassName("stripe-2");
    switch (this.value) {
        case "1":
            for (let st1 of allSt1) {
                st1.classList.remove("hidden");
            }
            for (let st2 of allSt2) {
                st2.classList.add("hidden");
            }
            break;
        case "2":
            for (let st1 of allSt1) {
                st1.classList.add("hidden");
            }
            for (let st2 of allSt2) {
                st2.classList.remove("hidden");
            }
            break;
        default:
            for (let st1 of allSt1) {
                st1.classList.add("hidden");
            }
            for (let st2 of allSt2) {
                st2.classList.add("hidden");
            }
    }
}




