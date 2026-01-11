// ----- HERO - Typed JS -----
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#typed-text', {
        strings: [
            "SUNPARK IMPORT - EXPORT",
            "Exporting Worldwide Since 1995",
            "Minerals, Fertilisers, Building Materials",
            "Spices, Fruits, Vegetables, Dry Nuts"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        loop: true
    });
});


// ----- TESTIMONIALS - Infinite Carousel -----
const track = document.getElementById("testimonialTrack");
let index = 0;
let cardWidth;

function visibleCount() {
    if (window.innerWidth >= 992) return 4;
    if (window.innerWidth >= 768) return 3;
    return 1;
}

function cloneCards() {
    const count = visibleCount();
    const cards = [...track.children];
    for (let i = 0; i < count; i++) {
        track.appendChild(cards[i].cloneNode(true));
    }
}

cloneCards();

setTimeout(() => {
    cardWidth = track.children[0].offsetWidth;
}, 200);

setInterval(() => {
    index++;
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    if (index >= 7) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = "translateX(0)";
        }, 700);
    }
}, 2500);