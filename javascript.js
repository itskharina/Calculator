let input = document.querySelector(".input");
let history = document.querySelector(".history");
let numAndOp = document.querySelector(".calculator");

let operator = "";
let displayValue = "0";
let firstNumber = "";
let needNewNumber = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function updateDisplay() {
  input.value = displayValue;
  if (operator === "=" || displayValue === "0") {
    history.textContent = ""
  } else if (operator) {
    history.textContent = firstNumber + " " + operator
  }
}

function calculate(operator, a, b) {
  switch (operator) {
    case "+":
        return add(a, b);
        break;
    case "-":
        return subtract(a, b);
        break;
    case "÷":
        return divide(a, b);
        break;
    case "*":
        return multiply(a, b);
        break;
  }
  return b;
}

function inputNum(num) {
  if (needNewNumber || displayValue === "0") {
    displayValue = num;
    needNewNumber = false;
  } else {
    displayValue += num;
  }
}

function inputOperator(op) {
    let inputNumber = parseFloat(displayValue);
    
    if (operator && needNewNumber) {
    operator = op;
    return;
  }

    if (!firstNumber && !isNaN(inputNumber)) {
        firstNumber = inputNumber;
    } else if (operator) {
        let total = calculate(operator, firstNumber, inputNumber);
        console.log(total);
        displayValue = String(total);
        firstNumber = total;
    }
    needNewNumber = true;
    operator = op;
}

function resetCalculator() {
  operator = "";
  displayValue = "0";
  firstNumber = "";
  needNewNumber = false;
  history.textContent = "";
}

numAndOp.addEventListener("click", (e) => {
  if (e.target.classList.contains("number")) {
    inputNum(e.target.value);
    updateDisplay();
    return;
  }

  if (e.target.classList.contains("decimal")) {
    inputNum(e.target.value);
    updateDisplay();
    return;
  }

  if (e.target.classList.contains("operator")) {
    inputOperator(e.target.value);
    updateDisplay();
    return;
  }

  if (e.target.classList.contains("equal")) {
    inputOperator(e.target.value);
    updateDisplay();
    return;
  }

  if (e.target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
});
