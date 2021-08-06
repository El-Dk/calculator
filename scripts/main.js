const numButtons = document.querySelectorAll('#numDiv button');
const operators = document.querySelectorAll("#operators button");
const deleteButton = document.querySelector('#delete');
const clearButton = document.querySelector('#clear');
const numInputDiv = document.querySelector('#numInputDiv');
const resultDiv = document.querySelector('#resultDiv');

let numStored = null;
let operator = null;
let divCero = false;
let dotPressed = false;

numInputDiv.textContent = "0";

function pressKey(keyPressed){
    switch(keyPressed.key){
        case "0":
            numButtons[9].click();
            numButtons[9].classList.add('keyForButton');
            break;
        case "1":
            numButtons[0].click();
            numButtons[0].classList.add('keyForButton');
            break;
        case "2":
            numButtons[1].click();
            numButtons[1].classList.add('keyForButton');
            break;
        case "3":
            numButtons[2].click();
            numButtons[2].classList.add('keyForButton');
            break;
        case "4":
            numButtons[3].click();
            numButtons[3].classList.add('keyForButton');
            break;
        case "5":
            numButtons[4].click();
            numButtons[4].classList.add('keyForButton');
            break;
        case "6":
            numButtons[5].click();
            numButtons[5].classList.add('keyForButton');
            break;
        case "7":
            numButtons[6].click();
            numButtons[6].classList.add('keyForButton');
            break;
        case "8":
            numButtons[7].click();
            numButtons[7].classList.add('keyForButton');
            break;
        case "9":
            numButtons[8].click();
            numButtons[8].classList.add('keyForButton');
            break;
        case ".":
            numButtons[10].click();
            numButtons[10].classList.add('keyForButton');
            break;
        case "+":
            operators[0].click();
            operators[0].classList.add('keyForButton');
            break;
        case "-":
            operators[1].click();
            operators[1].classList.add('keyForButton');
            break;
        case "*":
            operators[2].click();
            operators[2].classList.add('keyForButton');
            break;
        case "/":
            operators[3].click();
            operators[3].classList.add('keyForButton');
            break;
        case "Enter":
            operators[4].click();
            operators[4].classList.add('keyForButton');
            break;
        case "Backspace":
            deleteButton.click();
            deleteButton.classList.add('keyForButton');
            break;
    }
}
function releaseKey(keyReleased){
    switch(keyReleased.key){
        case "0":
            numButtons[9].classList.remove('keyForButton');
            break;
        case "1":
            numButtons[0].classList.remove('keyForButton');
            break;
        case "2":
            numButtons[1].classList.remove('keyForButton');
            break;
        case "3":
            numButtons[2].classList.remove('keyForButton');
            break;
        case "4":
            numButtons[3].classList.remove('keyForButton');
            break;
        case "5":
            numButtons[4].classList.remove('keyForButton');
            break;
        case "6":
            numButtons[5].classList.remove('keyForButton');
            break;
        case "7":
            numButtons[6].classList.remove('keyForButton');
            break;
        case "8":
            numButtons[7].classList.remove('keyForButton');
            break;
        case "9":
            numButtons[8].classList.remove('keyForButton');
            break;
        case ".":
            numButtons[10].classList.remove('keyForButton');
            break;
        case "+":
            operators[0].classList.remove('keyForButton');
            break;
        case "-":
            operators[1].classList.remove('keyForButton');
            break;
        case "*":
            operators[2].classList.remove('keyForButton');
            break;
        case "/":
            operators[3].classList.remove('keyForButton');
            break;
        case "Enter":
            operators[4].classList.remove('keyForButton');
            break;
        case "Backspace":
            deleteButton.classList.remove('keyForButton');
            break;
    }
}
function pressNum(numPressed){
    if(numInputDiv.textContent === "0" && numPressed.target.value !== "."){
        numInputDiv.textContent = "";
    }
    if(!divCero && numInputDiv.textContent.length < 10){
        if(numPressed.target.value === "."){
            if(!dotPressed){
                dotPressed = true;
                numInputDiv.textContent += numPressed.target.value;
            }
            
        }
        else{
            numInputDiv.textContent += numPressed.target.value;
        }
    } 
}

function convertNum(textNum){
    let num = Number(textNum);
    return num;
}

function getOperator(operation){
    switch(operation.target.value){
        case "plus":
            return "+";
        case "minus":
            return "-";
        case "multiply":
            return "x";
        case "divide":
            return "/";
        case "equals":
            return "=";
    }
}

function calculate(a, b, operation){
    switch(operation){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "=":
            return convertNum(numInputDiv.textContent);    
    }
}

function pressOperator(operatorPressed){
    dotPressed = false;
    if(!operator){
        numStored = convertNum(numInputDiv.textContent);
        operator = getOperator(operatorPressed);
        if(operator === "="){
            resultDiv.textContent = `${numStored}`;
        }
        else{
            resultDiv.textContent = `${numStored} ${operator}`;
        }
        numInputDiv.textContent = "0";
    }
    else if(typeof numStored === "number"){
        numStored = calculate(numStored, convertNum(numInputDiv.textContent), operator);
        operator = getOperator(operatorPressed);
        if(divCero){
            resultDiv.textContent = "";
            numInputDiv.textContent =  numStored;
        }
        else{
            if(operator === "="){
                resultDiv.textContent = `${numStored}`;
            }
            else{
                resultDiv.textContent = `${numStored} ${operator}`;
            }
            numInputDiv.textContent = "0";
        }
    }
}

function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    if(b === 0){
        divCero = true;
        return "Not Today!";
    }
    return a / b;
}

function clear(){
    numStored = null;
    operator = null;
    divCero = false;
    dotPressed = false;
    resultDiv.textContent = "";
    numInputDiv.textContent = "0";
}

function deleteLast(){
    if(!divCero){
        let temporaryString = numInputDiv.textContent;
        if(temporaryString.length === 1){
            numInputDiv.textContent = "0";
        }
        else{
            numInputDiv.textContent = temporaryString.slice(0, temporaryString.length -1);
        }
    }
}

numButtons.forEach(numButton => {
    numButton.addEventListener('click',pressNum);
})

operators.forEach(operatorButton =>{
    operatorButton.addEventListener('click', pressOperator);
});

clearButton.addEventListener('click', clear);

deleteButton.addEventListener('click', deleteLast);

window.addEventListener('keydown', pressKey);
window.addEventListener('keyup', releaseKey);