
let display = document.getElementById("display") as HTMLInputElement;
let Calculator = document.querySelector(".calculator") as HTMLElement;

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    let buttonText = button.innerText;
    
    if (buttonText === "AC") {
      display.value = "";
    } else if (buttonText === "DEL") {
      display.value = display.value.slice(0, -1);
    } else if (buttonText === "%") {
        display.value = (parseFloat(display.value)/100).toString();
    }
    else if (buttonText === "x") { 
      display.value += "x"; 
    } else if (buttonText === "=") {
      
      const expression = display.value.replace(/x/g, '*');

      try {
        display.value = eval(expression);
      } catch (error) {
        display.value = "Error";
      }
    } else {
      display.value += buttonText;
    }
  });
});


let isDragging = false;
let offsetX: number;
let offsetY: number;

Calculator.addEventListener("pointerdown", (e: PointerEvent) => {
  isDragging = true;
  offsetX = e.clientX - Calculator.offsetLeft;
  offsetY = e.clientY - Calculator.offsetTop;

  document.addEventListener("pointermove", moveHandler);
  document.addEventListener("pointerup", upHandler);
});

const moveHandler = (e: PointerEvent) => {
  if (isDragging) {
    Calculator.style.left = `${e.clientX - offsetX}px`;
    Calculator.style.top = `${e.clientY - offsetY}px`;
  }
};

const upHandler = () => {
  isDragging = false;
  document.removeEventListener("pointermove", moveHandler);
  document.removeEventListener("pointerup", upHandler);
};

