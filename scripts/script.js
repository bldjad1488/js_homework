'use strict';

const DAY_STRING = ['день', 'дня', 'дней'];

const DATA = {
    whichSite:          ['landing', 'multiPage', 'onlineStore'],
    price:              [4000, 8000, 26000], // в рублях
    desktopTemplates:   [50, 40, 30], // в процентах 
    adapt:              20, // в процентах
    mobileTemplates:    15, // в процентах
    editable:           10, // в процентах
    metrikaYandex:      [500, 1000, 2000], // в рублях
    analyticsGoogle:    [850, 1350, 3000], // в рублях
    sendOrder:          500, // в рублях
    deadlineDay:        [[2, 7], [3, 10], [7, 14]], // в днях
    deadlinePercent:    [20, 17, 15] // в процентах
};

const startButton             = document.querySelector('.start-button'),
      firstScreen             = document.querySelector('.first-screen'),
      mainForm                = document.querySelector('.main-form'),
      formCalculate           = document.querySelector('.form-calculate'),
      endButton               = document.querySelector('.end-button'),
      total                   = document.querySelector('.total'),
      fastRange               = document.querySelector('.fast-range'),
      totalPriceSum           = document.querySelector('.total_price__sum'),
      typeSite                = document.querySelector('.type-site'),
      maxDeadLine             = document.querySelector('.max-deadline'),
      rangeDeadLine           = document.querySelector('.range-deadline'),
      deadLineValue           = document.querySelector('.deadline-value'),

      desktopTemplatesCheck   = document.querySelector('#desktopTemplates'),
      adaptCheckBox           = document.querySelector('#adapt'),
      mobileTemplatesCheckBox = document.querySelector('#mobileTemplates'),
      editableCheck           = document.querySelector('#editable'),
      checkboxLabel           = document.querySelectorAll('.checkbox-label');
      
function checkboxCheck(elemId, labelNum) {
    if (elemId.checked) {
        checkboxLabel[labelNum].textContent = 'Да';
    } else {
        checkboxLabel[labelNum].textContent = 'Нет';
    }
}
    
function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
                            0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}

function renderTextContent(total, site, maxDay, minDay) {
    totalPriceSum.textContent = total;   
    typeSite.textContent = site;
    maxDeadLine.textContent = declOfNum(maxDay, DAY_STRING);
    rangeDeadLine.min = minDay;
    rangeDeadLine.max = maxDay;
    deadLineValue.textContent = declOfNum(rangeDeadLine.value, DAY_STRING);
}

function priceCalculation(elem) {
    let result  = 0,
        index   = 0,
        options = [],
        site = '',
        maxDeadLineDay = DATA.deadlineDay[index][1],
        minDeadLineDay = DATA.deadlineDay[index][0];

    if (elem.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
            }
        }
        hideElem(fastRange);
    }

    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value);
            site = item.dataset.site;
            maxDeadLineDay = DATA.deadlineDay[index][1];
            
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        }
    }

    options.forEach(function(key) {
        if (typeof(DATA[key]) === 'number') {
            if (key === 'sendOrder') {
                result += DATA[key];
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA.desktopTemplates[index] / 100;
            } else {
                result += DATA[key][index];
            }
        } 
    });

    result += DATA.price[index];

    renderTextContent(result, site, maxDeadLineDay, minDeadLineDay);  
}

function handlerCallBackForm(event) {
    const target = event.target;
    
    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }

    if (target.classList.contains('calc-handler')) {
        priceCalculation(target);
    }

    if (adaptCheckBox.checked) {
        mobileTemplatesCheckBox.disabled = false; 
    } else {
        mobileTemplatesCheckBox.disabled = true; 
        mobileTemplatesCheckBox.checked = false;
    }    

    checkboxCheck(desktopTemplatesCheck, 0);
    checkboxCheck(adaptCheckBox, 1);
    checkboxCheck(mobileTemplatesCheckBox, 2);
    checkboxCheck(editableCheck, 3);
}

startButton.addEventListener('click', function() {
    showElem(mainForm);
    hideElem(firstScreen);
});

endButton.addEventListener('click', function() {
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET') {
            hideElem(elem);
        }

        showElem(total);
    }
});

formCalculate.addEventListener('change', handlerCallBackForm);