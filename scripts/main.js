const numButtons = document.querySelectorAll('#numDiv button');
const resultDiv = document.querySelector('#resultDiv');

function calculated(pressed){
    resultDiv.textContent += pressed.target.value;
}

numButtons.forEach(numButton => {
    numButton.addEventListener('click',calculated);
})