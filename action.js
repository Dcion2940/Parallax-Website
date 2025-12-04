// Select the class bubble
time = document.getElementsByClassName('bubbles')[0];

// padding values for desktop
var fish2move = 100;
var fish3move = 900;
var fish4move = 1200;

// Helpers to control automatic fish movement
const fishConfig = [
    { id: 'fish1', axis: 'right', offset: 100 },
    { id: 'fish2', axis: 'left', offset: fish2move },
    { id: 'fish3', axis: 'right', offset: fish3move },
    { id: 'fish4', axis: 'left', offset: fish4move },
];

function setFishOffset(id, offset) {
    const target = fishConfig.find((fish) => fish.id === id);
    if (target) {
        target.offset = offset;
    }
}

if (screen.width < 400) {

    //Change transformation duration and translatey for mobile view
    time.style.setProperty('--transform-duration', '15s')
    time.style.setProperty('--transform-y', '-700vh')

    // padding values for mobile
    fish2move = 1680;
    fish3move = 3000;
    fish4move = 4300;

    setFishOffset('fish2', fish2move);
    setFishOffset('fish3', fish3move);
    setFishOffset('fish4', fish4move);
}



// Enable fish dragging inside the underwater section
const underwaterSection = document.querySelector('.sec');
const movableFishes = Array.from(document.querySelectorAll('.fishes'));

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function makeFishDraggable(fish) {
    fish.addEventListener('pointerdown', (event) => {
        if (!underwaterSection) return;

        event.preventDefault();

        const pointerId = event.pointerId;
        fish.dataset.manual = 'true';
        fish.classList.add('dragging');
        fish.setPointerCapture(pointerId);

        const containerRect = underwaterSection.getBoundingClientRect();
        const fishRect = fish.getBoundingClientRect();
        const offsetX = event.clientX - fishRect.left;
        const offsetY = event.clientY - fishRect.top;

        const onPointerMove = (e) => {
            const x = clamp(e.clientX - containerRect.left - offsetX, 0, containerRect.width - fishRect.width);
            const y = clamp(e.clientY - containerRect.top - offsetY, 0, containerRect.height - fishRect.height);

            fish.style.left = `${x}px`;
            fish.style.top = `${y}px`;
            fish.style.right = 'auto';
        };

        const onPointerUp = () => {
            fish.releasePointerCapture(pointerId);
            fish.classList.remove('dragging');
            fish.removeEventListener('pointermove', onPointerMove);
            fish.removeEventListener('pointerup', onPointerUp);
            fish.removeEventListener('pointercancel', onPointerUp);
        };

        fish.addEventListener('pointermove', onPointerMove);
        fish.addEventListener('pointerup', onPointerUp);
        fish.addEventListener('pointercancel', onPointerUp);
    });
}

movableFishes.forEach(makeFishDraggable);

window.addEventListener('scroll', function () {

    let value = window.scrollY;   //Get Scroll Value (Mobile - High)

    text.style.top = 50 + value * -0.2 + '%';
    cloud.style.left = value * 2 + 'px';

    bird1.style.top = value * 0.1 + 'px';
    bird1.style.left = value * 1 + 'px';

    bird2.style.top = value * -0.1 + 'px';
    bird2.style.left = value * -2 + 'px';

    explore.style.marginTop = value * 1.5 + 'px';

    rocks.style.top = value * -0.14 + 'px';

    forest.style.top = value * 0.4 + 'px';
    sky.style.top = value * 0.25 + 'px';
    mountains.style.top = value * 0.25 + 'px';

    header.style.top = value * 0.7 + 'px';
    sun.style.top = value * 1 + 'px';

    //To prevent splash to move above sea water
    if (value < 380) {
        splash.style.top = 20 + value * -0.3 + 'px';
    }

    // Move fishes horizontally unless manually repositioned
    fishConfig.forEach(({ id, axis, offset }) => {
        const fish = document.getElementById(id);

        if (!fish || fish.dataset.manual === 'true') return;

        if (axis === 'left') {
            fish.style.left = (value - offset) + 'px';
            fish.style.right = 'auto';
        } else {
            fish.style.right = (value - offset) + 'px';
            fish.style.left = 'auto';
        }
    });
})


// Contains the link for all social media handles
var links = document.getElementsByClassName("social-media");

links[0].addEventListener("click", () => { openlink(1) });
links[1].addEventListener("click", () => { openlink(2) });
links[2].addEventListener("click", () => { openlink(3) });
links[3].addEventListener("click", () => { openlink(4) });

function openlink(x) {
    if (x == 1) {
        window.open("https://www.instagram.com/_.vini._02_/", "_blank");
    }
    if (x == 2) {
        window.open("https://www.linkedin.com/in/vineet-kumar-gupta-2833ab196/", "_blank");
    }
    if (x == 3) {
        window.open("https://github.com/VineetKumar02", "_blank");
    }
    if (x == 4) {
        window.open("https://vineet-portfolio-site.netlify.app/", "_blank");
    }
}