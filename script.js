let gridSize = 10;

const body = document.querySelector("body");
const main = document.createElement("div");
main.classList.add("grid")

body.appendChild(main);

function makeGrid(gridSize) {
  main.style.setProperty('--grid-size', gridSize);
  const gridArray = [];
  for (let i = 0; i < gridSize; i++) {
    const arr = [];
    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell")
      main.appendChild(cell);
      arr.push(cell)
    }
  }
}
makeGrid(gridSize)
