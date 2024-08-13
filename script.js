var display = document.getElementById("display");
var Calculator = document.querySelector(".calculator");
document.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
        var buttonText = button.innerText;
        if (buttonText === "AC") {
            display.value = "";
        }
        else if (buttonText === "DEL") {
            display.value = display.value.slice(0, -1);
        }
        else if (buttonText === "%") {
            display.value = (parseFloat(display.value) / 100).toString();
        }
        else if (buttonText === "x") {
            display.value += "x";
        }
        else if (buttonText === "=") {
            var expression = display.value.replace(/x/g, '*');
            try {
                display.value = eval(expression);
            }
            catch (error) {
                display.value = "Error";
            }
        }
        else {
            display.value += buttonText;
        }
    });
});
var isDragging = false;
var offsetX;
var offsetY;
Calculator.addEventListener("pointerdown", function (e) {
    isDragging = true;
    offsetX = e.clientX - Calculator.offsetLeft;
    offsetY = e.clientY - Calculator.offsetTop;
    document.addEventListener("pointermove", moveHandler);
    document.addEventListener("pointerup", upHandler);
});
var moveHandler = function (e) {
    if (isDragging) {
        Calculator.style.left = "".concat(e.clientX - offsetX, "px");
        Calculator.style.top = "".concat(e.clientY - offsetY, "px");
    }
};
var upHandler = function () {
    isDragging = false;
    document.removeEventListener("pointermove", moveHandler);
    document.removeEventListener("pointerup", upHandler);
};
