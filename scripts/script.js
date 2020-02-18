'esversion: 6';

const   startButton    = document.querySelector('.start-button'),
        firstScreen    = document.querySelector('.first-screen'),
        mainForm       = document.querySelector('.main-form'),
        formCalculate  = document.querySelector('.form-calculate'),
        endButton      = document.querySelector('.end-button'),
        total          = document.querySelector('.total');

function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}




startButton.addEventListener('click', function() {
    showElem(mainForm);
    hideElem(firstScreen);
});

