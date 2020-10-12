let position = 0
const NUMBER_OF_POSITIONS = 3;
const PERCENT_OF_MOVE = -100;
const movePart = document.getElementById('scroll-cars');
const ANIMATION_TIME = 1_000 * 10;
const WAIT_TIME = 1_000 * 5;
let previous = performance.now();
let isBack = false;

window.onload = requestAnimationFrame(function scroll(time) {
    if (previous + WAIT_TIME > time) {
        if (previous > time) {
            if (!isBack) {
                animate(PERCENT_OF_MOVE * ((time - previous) / ANIMATION_TIME + position));
            } else {
                animate(PERCENT_OF_MOVE * ((previous - time) / ANIMATION_TIME + position));
            }
        } else {
            animate(PERCENT_OF_MOVE * position);
        }
    } else {
        previous = time + ANIMATION_TIME;
        animate(PERCENT_OF_MOVE * position);
        if (isBack) {
            position -= 1;
            if (position === -1) {
                isBack = false;
                position = 1;
            }
        } else {
            position = position + 1;
            if (position === NUMBER_OF_POSITIONS) {
                isBack = true;
                position = NUMBER_OF_POSITIONS - 2;
            }
        }
    }
    requestAnimationFrame(scroll);
});

function animate(percentOfMove) {
    movePart.setAttribute('style', 'margin-left: ' + percentOfMove + '%');
}

function nextCar() {
    previous = performance.now();
    position++;
    if (position === NUMBER_OF_POSITIONS) {
        isBack = true;
        position = NUMBER_OF_POSITIONS - 1;
    }
    animate(PERCENT_OF_MOVE * position);
}

function previousCar() {
    previous = performance.now();
    position--;
    if (position === -1) {
        isBack = false;
        position = 0;
    }
    animate(PERCENT_OF_MOVE * position);
}