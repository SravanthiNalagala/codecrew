// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let sliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');
let body = document.querySelector('body');

// Append the first thumbnail to ensure correct initial display
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

// Set up event listeners for navigation
nextDom.onclick = function() {
    showSlider('next');
}

prevDom.onclick = function() {
    showSlider('prev');
}

// Auto slide functionality
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext)

function showSlider(type) {
    let sliderItemsDom = sliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        sliderDom.appendChild(sliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext)
}

// Expand/Collapse functionality
function addImageClickHandlers() {
    let allImages = document.querySelectorAll('.carousel .list .item img, .carousel .thumbnail .item img');

    allImages.forEach(img => {
        img.onclick = function() {
            let parentItem = this.parentElement;
            let expandedClass = 'expanded';

            // Toggle 'expanded' class on click
            if (parentItem.classList.contains(expandedClass)) {
                parentItem.classList.remove(expandedClass);
            } else {
                // Remove 'expanded' class from all items
                document.querySelectorAll('.carousel .list .item, .carousel .thumbnail .item').forEach(item => {
                    item.classList.remove(expandedClass);
                });
                // Add 'expanded' class to the clicked image's parent
                parentItem.classList.add(expandedClass);
            }
            // Set clicked image as the background for the body
            body.style.backgroundImage = `url('${this.src}')`;
        }
    });
}



// Initialize image click handlers
addImageClickHandlers( );


