const body = document.querySelector(".main");
const main = document.createElement("div");

const gridSlider = document.querySelector("#grid-slider");
const colorPick = document.querySelector("#color-pick");
const gridSizeText = document.querySelector("#grid-size");

let colorMode = "darken";

let color = "#111111"

main.classList.add("grid");

body.appendChild(main);

let mouseDown = 0;  
window.onmousedown = () => {  
  mouseDown = 1;  
}  
window.onmouseup = () => {  
  mouseDown = 0;  
}

function getRandomColor() {
  let color = [];
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return "rgb(" + color.join(", ") + ")";
}

function colorDarken(color) {
  let newColor = color.match(/\d{1,3}/g);
  for (let i = 0; i < newColor.length; i++) {
    newColor[i] -= 25;
    if (newColor[i] < 0) newColor[i] = 0;
  }

  return "rgb(" + newColor.join(", ") + ")";
}

function colorLighten(color) {
  let newColor = color.match(/\d{1,3}/g);
  for (let i = 0; i < newColor.length; i++) {
    newColor[i] = +newColor[i] + 25;
    if (newColor[i] > 255) newColor[i] = 255;
  }
  return "rgb(" + newColor.join(", ") + ")";
}

function makeGrid(gridSize) {
  main.style.setProperty('--grid-size', gridSize);
  main.innerHTML = "";
  const gridArray = [];
  for (let i = 0; i < gridSize; i++) {
    const arr = [];
    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell")
      cell.style.backgroundColor = "#ffffff";
      cell.addEventListener("mouseover", e => {
        if (mouseDown) {
          if (colorMode == "darken") {
            previousColor = e.target.style.backgroundColor;
            e.target.style.backgroundColor = colorDarken(previousColor);
          }
          else if (colorMode == "lighten") {
            previousColor = e.target.style.backgroundColor;
            e.target.style.backgroundColor = colorLighten(previousColor);
          }
          else if (colorMode == "random") {
            e.target.style.backgroundColor = getRandomColor();
          }
          else e.target.style.backgroundColor = color;
        }
      });
      cell.addEventListener("click", e => {
        if (colorMode == "darken") {
          previousColor = e.target.style.backgroundColor;
          e.target.style.backgroundColor = colorDarken(previousColor);
        }
        else if (colorMode == "lighten") {
          previousColor = e.target.style.backgroundColor;
          e.target.style.backgroundColor = colorLighten(previousColor);
        }
        else if (colorMode == "random") {
          e.target.style.backgroundColor = getRandomColor();
        }
        else e.target.style.backgroundColor = color;
      });

      main.appendChild(cell);
      arr.push(cell)
    }
  }
}

function randomMode() {
  colorMode = "random";
}

function darkenMode() {
  colorMode = "darken";
}

function lightenMode() {
  colorMode = "lighten";
}

gridSlider.oninput = function() {
  let size = Math.floor((this.value / 2)**1.3);
  makeGrid(size);
  gridSizeText.textContent = size;
}

gridSlider.oninput();

colorPick.oninput = function() {
  colorMode = "picked";
  color = this.value;
}

makeGrid(16);