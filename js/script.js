const inputsController = document.querySelector('.js-inputController');

const billInput = document.querySelector('.js-billInput');
const peopleInput = document.querySelector('.js-peopleInput');
const customInput = document.querySelector('.js-custom');

const tipXPerson = document.querySelector('.js-tipxperson');
const totalXPerson = document.querySelector('.js-totalxperson');

const resetButton = document.querySelector('.btn-reset');



/**********************Event Listeners***************************/

inputsController.addEventListener('click', e => {

    const targetType = e.target.getAttribute('type');

    // We get the number of the input without "%" and in Integer
    if(targetType === 'radio') {
        const childTip = e.target.parentElement.querySelector('.tip-percentage');
        const tipNum = parseInt(childTip.innerHTML.slice(0, -1), 10);
        calculateTotal(tipNum / 100);
    } else if(targetType === 'number') {
        // Uncheck all other inputs
        clearAllInputs();

        customInput.addEventListener('input', () => {
            calculateTotal(parseInt(customInput.value, 10));
        })
    }
});

resetButton.addEventListener('click', () => {
    billInput.value = "";
    peopleInput.value = "";
    customInput.value = "";
    tipXPerson.innerHTML = "$0.00";
    totalXPerson.innerHTML = "$0.00";
    clearAllInputs();
});

/*********************Functions*************************/

const calculateTotal = function (num) {
    const peopleInputInt = parseInt(peopleInput.value, 10);
    const billInputInt = parseInt(billInput.value, 10);

    // It is NaN when there is no input in Number of People
    if(isNaN(peopleInputInt) || isNaN(num)) {
        console.log("Number of People is empty or Custom num is empty");
        tipXPerson.innerHTML = "$0.00";
        totalXPerson.innerHTML = "$0.00";
    } else { // There is an input in Number of People
        const totalTip = (billInputInt * num) / peopleInputInt;
        const totalPerson = totalTip + (billInputInt / peopleInputInt);

        if(peopleInputInt === 0) return setErrorFor('cannot be 0');

        tipXPerson.innerHTML = "$" + totalTip.toFixed(2);
        totalXPerson.innerHTML = "$" + totalPerson.toFixed(2);
        setSuccess()
    }
}

// Uncheck all % Inputs
function clearAllInputs() {
    const allTipPercentage = inputsController.querySelectorAll('input');

    allTipPercentage.forEach((el) => {
        el.checked = false;
    });
}

function setErrorFor(message) {
    const formControl = document.querySelector('.form-control');
	const small = formControl.querySelector('small');
	formControl.className = 'splitter__people form-control error';
	small.innerText = message;
    tipXPerson.innerHTML = "$0.00";
    totalXPerson.innerHTML = "$0.00";
}

function setSuccess() {
    const formControl = document.querySelector('.form-control');
    formControl.classList.remove('error')
}