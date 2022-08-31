const next = document.getElementById('next');
const prev = document.getElementById('prev');
const carousel = document.getElementById('items');
const carouselItem = document.getElementById('item');
const main = document.getElementById('main-carousel');
const carouselItemWidth = carouselItem.getBoundingClientRect().width;

let isDown = false;
let scrollLeft;
let startX;


function showHideButtons() {

    const carouselWidth = carousel.scrollWidth;
    const mainWidth = main.getBoundingClientRect().width;

    if (carouselWidth > mainWidth) {

        if (carousel.clientWidth + carousel.scrollLeft >= carousel.scrollWidth - 2) {
            next.style.visibility = "hidden";
        }
        else if (carousel.clientWidth - carousel.scrollLeft >= carousel.clientWidth - 2) {
            prev.style.visibility = "hidden";
        }
        else {
            next.style.visibility = "visible";
            prev.style.visibility = "visible";
        }
        carousel.style.justifyContent = "start";
    }
    else {
        carousel.style.margin = "0";
        carousel.style.justifyContent = "center";
    }
}
window.addEventListener('resize', showHideButtons);
onload = showHideButtons();


carousel.addEventListener('scroll', () => {
    showHideButtons();
});

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX);
    carousel.scrollLeft = scrollLeft - walk;
});

prev.addEventListener('click', (e) => {
    startX = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft -= carouselItemWidth;
});

next.addEventListener('click', (e) => {
    startX = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft += carouselItemWidth;
});