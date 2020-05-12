//Selectors
const allButtons = document.querySelectorAll('button');
const operators = document.querySelector('#operators');
const operatorButtons = operators.querySelectorAll('button');
const buttons = Array.from(allButtons);
const operatorButtonsArray = Array.from(operatorButtons);
let output = document.querySelector('#output');
let backgroundAnswer = document.querySelector('#background-answer');

//Global Variables
let operator = '';
let num1 = '';
let num2 = '';
reset = true;

//Event Listeners
window.addEventListener('keydown', checkButton);

operatorButtonsArray.forEach(button => {
    if (button.innerText !== 'AC' && button.innerText !== 'CE') {
        button.addEventListener('click', checkOperator);
    }
})

buttons.forEach(button => {
    button.addEventListener('click', checkButton);
})

//Functions
function checkButton(e) {
    const target = e.key ? document.querySelector(`button[data-key='${e.key}']`) : e.target;
    if (!target) return;

    switch(target.innerText) {
        case 'AC':
            clear();
            break;
        case 'CE':
            backspace();
            break;
        case '=':
            equals();
            break;
        case '+':
            operator = '+';
            reset = true;
            break;
        case '-':
            operator = '-';
            reset = true;
            break;
        case '/':
            operator = '/';
            reset = true;
            break;
        case '*':
            operator = '*';
            reset = true;
            break;
        default:
            updateDisplay(target);
            break;
    }
}

function checkOperator(e) {
    //If there is an existing operator and second operand,
    //then evaluate that existing expression and update the display.
    if (operator !== '' && num2 !== '') {
        output.innerText = operate(operator, num1, num2);
        num1 = output.innerText;
    }
    else {
        operator = e.innerText;
    }
}

function updateDisplay(target) {
    if (reset) {
        output.innerText = '';
        reset = false;
    }
    output.innerText += target.innerText;
    //If statements for different scenarios to check
    //if the value input belongs to first operand or second.
    if (num1 === '' && operator === '') {
        num1 = target.innerText;
    }
    if (num1 !== '' && operator === ''){
        num1 = output.innerText;
    }
    if (num1 !== '' && operator !== '') {
        num2 = output.innerText;
        backgroundAnswer.innerText = operate(operator, num1, num2);
    }
}

function backspace() {
    output.innerText = output.innerText.slice(0, output.innerText.length - 1);
    //If second operand exists, implement backspace on that
    //Otherwise, implement backspace on first and only operand.
    if (num2 != '') {
        num2 = num2.slice(0, num2.length - 1);
        backgroundAnswer.innerText = operate(operator, num1, num2);
    }
    else if (num1 != '') {
        num1 = num1.slice(0, num1.length - 1);
    }
}

function clear() {
    output.innerText = '';
    num1 = '';
    num2 = '';
    operator = '';
    backgroundAnswer.innerText = '';
}

function equals() {
    output.innerText = operate(operator, num1, num2);
    num1 = output.innerText;
    num2 = '';
    operator = '';
    backgroundAnswer.innerText = '';
}

function operate(operator, num1, num2) {
    let result;
    switch(operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }
    num1 = '';
    num2 = '';
    operator = '';
    //In case of any error, return Math Error
    //Otherwise, return result.
    return (result === Infinity || result === undefined || isNaN(result)) ? 'Math ERROR' : result;
}

function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
    return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2);
}

function divide(num1, num2) {
    return parseInt(num1) / parseInt(num2);
}