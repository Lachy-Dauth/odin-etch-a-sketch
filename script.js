const body = document.querySelector("body");
const main = document.createElement("div");

const gridSlider = document.querySelector("#grid-slider");
const colorPick = document.querySelector("#color-pick");

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
          e.target.style.backgroundColor = color;
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
  color = this.value;
}

makeGrid(16);