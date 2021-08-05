const numButtons = document.querySelectorAll('#numDiv button');
const operators = document.querySelectorAll("#operators");
const deleteButton = document.querySelector('#delete');
const clearButton = document.querySelector('#clear');
const numInputDiv = document.querySelector('#numInputDiv');
const resultDiv = document.querySelector('#resultDiv');

let  numStored = null;
let operator = null;
let divCero = false;
let dotPressed = false;
numInputDiv.textContent = "0";

function pressNum(numPressed){
    if(numInputDiv.textContent === "0"){
        numInputDiv.textContent = "";
    }
    if(!divCero){
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
    }
}

function pressOperator(operatorPressed){
    dotPressed = false;
    if(!operator){
        numStored = convertNum(numInputDiv.textContent);
        operator = getOperator(operatorPressed);
        resultDiv.textContent += numStored + " " + operator;
        numInputDiv.textContent = "";
    }
    else if(typeof numStored === "number"){
        numStored = calculate(numStored, convertNum(numInputDiv.textContent), operator);
        operator = getOperator(operatorPressed);
        if(typeof numStored === "string"){
            resultDiv.textContent = "";
            numInputDiv.textContent =  numStored;
            divCero = true;
        }
        else{
            resultDiv.textContent = `${numStored} ${operator}`;
            numInputDiv.textContent = "";
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
    let temporaryString = numInputDiv.textContent;
    if(temporaryString.length === 1){
        numInputDiv.textContent = "0";
    }
    else{
        numInputDiv.textContent = temporaryString.slice(0, temporaryString.length -1);
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