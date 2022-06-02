const body = document.querySelector("body");
const main = document.createElement("div");

const gridSlider = document.querySelector("#grid-slider");
const colorPick = document.querySelector("#color-pick");

let randomColor = true;

let color = "#000"

main.classList.add("grid");

body.appendChild(main);

let mouseDown = 0;  
window.onmousedown = () => {  
  ++mouseDown;  
}  
window.onmouseup = () => {  
  --mouseDown;  
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
      cell.addEventListener("mouseover", e => {
        if (mouseDown) {
          if (randomColor) e.target.style.backgroundColor = getRandomColor();
          else e.target.style.backgroundColor = color;
        }
      });

      main.appendChild(cell);
      arr.push(cell)
    }
  }
}

gridSlider.oninput = function() {
  makeGrid(this.value);
}

colorPick.oninput = function() {
  randomColor = false;
  color = this.value;
}

makeGrid(16);