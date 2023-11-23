let input = document.querySelector(".input");
let history = document.querySelector(".history");
let numAndOp = document.querySelector(".calculator");
let decimalBtn = document.querySelector(".decimal")

document.addEventListener("DOMContentLoaded", function(event) {
  decimalBtn.disabled = false;
});

let operator = "";
let displayValue = "";
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
  input.value = String(Number(displayValue));
  if (operator === "=" || displayValue === "0") {
    history.textContent = "";
  } else if (operator && !needNewNumber) {
    history.textContent = parseFloat(firstNumber) + " " + operator;
  }

    if (displayValue.includes(".")) {
      input.value = displayValue.replace(/[^0-9.]+/g, "");
      decimalBtn.disabled = true;
    } else {
      decimalBtn.disabled = false;
    }
}
updateDisplay();

function deletePreviousNum() {
  displayValue = displayValue.substring(0, displayValue.length - 1);
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
  if (needNewNumber) {
    displayValue = num;
    needNewNumber = false;
  } else if (!needNewNumber && displayValue == "0" && num == "0") {
    displayValue = "0";
  } else {
    displayValue += num;
  }
}

function inputDecimal(dot) {
  if (!displayValue.includes(dot)) {
    displayValue += dot;
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
    displayValue = parseFloat(total.toFixed(5));
    firstNumber = displayValue;
  }
  needNewNumber = true;
  operator = op;
}

function resetCalculator() {
  operator = "";
  displayValue = "";
  firstNumber = "";
  needNewNumber = false;
  history.textContent = "";
}

function percentage() {
  let percent = displayValue / 100;
  console.log(percent);
  displayValue = percent;
}

numAndOp.addEventListener("click", (e) => {
  if (e.target.classList.contains("number")) {
    inputNum(e.target.value);
    updateDisplay();
    return;
  }

  if (e.target.classList.contains("decimal")) {
    inputDecimal(e.target.value);
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

  if (e.target.classList.contains("backspace")) {
    deletePreviousNum();
    updateDisplay();
    return;
  }

  if (e.target.classList.contains("percent")) {
    percentage();
    updateDisplay();
    return;
  }
});
