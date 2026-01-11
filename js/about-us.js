// COUNTER SCRIPT 
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function runCounter() {
    counters.forEach(counter => {
        counter.innerText = "0";
        let target = +counter.getAttribute("data-target");
        let speed = target / 100;

        function updateCounter() {
            let value = +counter.innerText.replace('+', ''); // remove + while calculating
            if (value < target) {
                counter.innerText = Math.ceil(value + speed) + "+";
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target + "+";
            }
        }
        updateCounter();
    });
}

// Trigger when in viewport
window.addEventListener("scroll", () => {
    let section = document.getElementById("counter-section");
    let position = section.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;

    if (position < screenHeight - 100 && !counterStarted) {
        runCounter();
        counterStarted = true;
    }
});