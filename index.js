// Initialize Swiper
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});

const addTextBtn = document.getElementById('addTextBtn');
const textControls = document.getElementById('textControls');
const textInput = document.getElementById('textInput');
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const fontWeight = document.getElementById('fontWeight');
const fontStyle = document.getElementById('fontStyle');
const textColor = document.getElementById('textColor');


const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');
const colorCircle = document.getElementById('colorCircle');


let currentText = null;

addTextBtn.addEventListener('click', () => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const text = document.createElement('div');
    text.classList.add('draggable-text');
    text.textContent = 'Click to edit';
    text.style.position = 'absolute';
    text.style.left = '50%';
    text.style.top = '50%';
    text.style.transform = 'translate(-50%, -50%)';
    text.style.color = 'black';
    activeSlide.appendChild(text);

    makeDraggable(text);
    selectText(text);
});


function selectText(text) {
    if (currentText) {
        currentText.style.border = 'none';
    }

    currentText = text;
    text.style.border = '2px solid blue';
    textControls.style.display = 'flex';


    textInput.value = text.textContent;
    textInput.oninput = () => {
        text.textContent = textInput.value;
    };
    fontFamily.value = text.style.fontFamily || 'Arial';
    fontFamily.onchange = () => text.style.fontFamily = fontFamily.value;

    fontSize.value = parseInt(text.style.fontSize) || '16'; // Default to 16
    fontSize.onchange = () => text.style.fontSize = fontSize.value + 'px';


    textColor.value = rgbToHex(text.style.color || 'rgb(0,0,0)');


    colorCircle.style.backgroundColor = textColor.value;

    colorCircle.onclick = () => textColor.click(); // Open color picker
    textColor.oninput = () => {
        text.style.color = textColor.value;
        colorCircle.style.backgroundColor = textColor.value;
    };

    boldBtn.onclick = () => {
        text.style.fontWeight = text.style.fontWeight === 'bold' ? 'normal' : 'bold';
    };

    italicBtn.onclick = () => {
        text.style.fontStyle = text.style.fontStyle === 'italic' ? 'normal' : 'italic';
    };


    underlineBtn.onclick = () => {
        text.style.textDecoration = text.style.textDecoration === 'underline' ? 'none' : 'underline';
    };

}


function makeDraggable(element) {
    let isDragging = false;
    let startX, startY;
    let offsetX, offsetY;

    element.classList.add('swiper-no-swiping'); // Prevent Swiper from interfering

    // Add event listeners directly to the element
    element.addEventListener('mousedown', startDrag);

    // Add event listeners to document to handle drag and stop
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    function startDrag(e) {
        console.log('Start drag triggered');
        // Prevent text selection and other default behaviors
        e.preventDefault();

        // Ensure we're working with the clicked element
        const target = e.target;

        // Calculate the offset within the element
        offsetX = e.clientX - target.offsetLeft;
        offsetY = e.clientY - target.offsetTop;

        isDragging = true;
        target.style.cursor = 'grabbing';

        console.log(`Start drag - Offset X: ${offsetX}, Offset Y: ${offsetY}`);
    }

    function drag(e) {
        if (!isDragging) return;

        console.log('Drag in progress');

        const slide = element.closest('.swiper-slide');
        if (!slide) {
            console.error('No slide found');
            return;
        }

        const slideRect = slide.getBoundingClientRect();

        // Calculate new position
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Restrict movement within slide boundaries
        newX = Math.max(0, Math.min(newX, slideRect.width - element.offsetWidth));
        newY = Math.max(0, Math.min(newY, slideRect.height - element.offsetHeight));

        element.style.position = 'absolute';
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;

        console.log(`Dragging - New X: ${newX}, New Y: ${newY}`);
    }

    function stopDrag() {
        if (!isDragging) return;

        console.log('Stop dragging');
        isDragging = false;
        element.style.cursor = 'move';
    }

    // Add a click event to ensure text selection works
    element.addEventListener('click', (e) => {
        console.log('Element clicked');
        selectText(element);
    });

    return {
        destroy: () => {
            element.removeEventListener('mousedown', startDrag);
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }
    };
}

function rgbToHex(rgb) {
    if (!rgb.startsWith('rgb')) return rgb;
    const nums = rgb.match(/\d+/g).map(Number);
    return '#' + nums.map(x => x.toString(16).padStart(2, '0')).join('');
}

const imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        addNewSlideWithImage(event.target.result); // Call the new function
    };

    reader.readAsDataURL(file);
});


function addNewSlideWithImage(imageUrl) {
    // 1. Create a new slide element
    const newSlide = document.createElement('div');
    newSlide.classList.add('swiper-slide');

    // 2. Create an image element and set its source
    const newImage = document.createElement('img');
    newImage.src = imageUrl;
    newImage.alt = 'Uploaded Image'; // Add alt text for accessibility

    // 3. Append the image to the new slide
    newSlide.appendChild(newImage);

    // 4. Append the new slide to the Swiper wrapper
    swiper.appendSlide(newSlide);

    // 5. Update Swiper (important!)
    swiper.update();

    // Optional: Go to the newly added slide
    swiper.slideTo(swiper.slides.length - 1);


}

document.addEventListener('click', (e) => {
    if (currentText && !currentText.contains(e.target) && !textControls.contains(e.target)) {
        currentText.style.border = 'none';
        textControls.style.display = 'none';
        currentText = null;
    }
});

