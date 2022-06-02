const body = document.querySelector("body");
const main = document.createElement("div");

const gridSlider = document.querySelector("#grid-slider");

main.classList.add("grid");

body.appendChild(main);

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
        e.target.style.backgroundColor = "rgb(100, 100, 100)";
      });

      main.appendChild(cell);
      arr.push(cell)
    }
  }
}

gridSlider.oninput = function() {
  makeGrid(this.value);
}

makeGrid(16);