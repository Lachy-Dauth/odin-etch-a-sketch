const body = document.querySelector(".main"); // the place where the grid will be placed
const main = document.createElement("div"); // this element will be the grid

// grabbing the sliders and buttons
const gridSlider = document.querySelector("#grid-slider"); // slider that controls grid size
const colorPick = document.querySelector("#color-pick"); // the color selector
const gridSizeText = document.querySelector("#grid-size"); // the place where the grid size is shown

// the current mode of the pen. eg random, picked
let colorMode = "darken";

let color = "#111111"; // the selected color (initial values doesn't get used)

// add the class with css styling to the grid
main.classList.add("grid");

// places the grid on the screen
body.appendChild(main);

// this variable tracks if the mouse is currently down
let mouseDown = 0;  
window.onmousedown = () => {  
  mouseDown = 1;  
}  
window.onmouseup = () => {  
  mouseDown = 0;  
}

// returns a color in rgb form. eg rgb(100, 250, 36)
function getRandomColor() {
  let color = []; // stores the rgb values in 'raw' form
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256)); // generates value between 0 and 255
  }
  return "rgb(" + color.join(", ") + ")"; // returns the color in the right form
}

// returns a color 25 darker in each channel than the input
function colorDarken(color) {
  let newColor = color.match(/\d{1,3}/g); // collects the raw values from the rgb string
  for (let i = 0; i < newColor.length; i++) {
    newColor[i] -= 25;
    if (newColor[i] < 0) newColor[i] = 0; // checks if values is to small and fixes it
  }

  return "rgb(" + newColor.join(", ") + ")"; // returns the color in the right form
}

// returns a color 25 lighter in each channel than the input
function colorLighten(color) {
  let newColor = color.match(/\d{1,3}/g); // collects the raw values from the rgb string
  for (let i = 0; i < newColor.length; i++) {
    newColor[i] = +newColor[i] + 25; // I am not using += because it concatenates the values
    if (newColor[i] > 255) newColor[i] = 255; // checks if values is to big and fixes it
  }
  return "rgb(" + newColor.join(", ") + ")";  // returns the color in the right form
}

// makes the grid
function makeGrid(gridSize) {
  main.style.setProperty('--grid-size', gridSize); // this is to help the css find how many rows and columns 
  main.innerHTML = ""; // clears all of the previous children
  for (let i = 0; i < gridSize; i++) {
    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell")
      cell.style.backgroundColor = "#ffffff"; // sets initial color

      // this event listener operates most of the drawing logic
      cell.addEventListener("mouseover", e => {
        if (mouseDown) { // checks if the mouse is down
          if (colorMode == "darken") { 
            previousColor = e.target.style.backgroundColor; // gets what the color was
            e.target.style.backgroundColor = colorDarken(previousColor);
          }
          else if (colorMode == "lighten") {
            previousColor = e.target.style.backgroundColor; // gets what the color was
            e.target.style.backgroundColor = colorLighten(previousColor);
          }
          else if (colorMode == "random") {
            e.target.style.backgroundColor = getRandomColor();
          }
          else e.target.style.backgroundColor = color; // this is when a specific color is selected 
        }
      });
      
      // this is basically a copy of the previous event listener but works on the initial click
      cell.addEventListener("click", e => {
        if (colorMode == "darken") {
          previousColor = e.target.style.backgroundColor; // gets what the color was
          e.target.style.backgroundColor = colorDarken(previousColor);
        }
        else if (colorMode == "lighten") {
          previousColor = e.target.style.backgroundColor; // gets what the color was
          e.target.style.backgroundColor = colorLighten(previousColor);
        }
        else if (colorMode == "random") {
          e.target.style.backgroundColor = getRandomColor();
        }
        else e.target.style.backgroundColor = color; // this is when a specific color is selected 
      });

      main.appendChild(cell); // places the cell
    }
  }
}

// switches the mode using buttons
function randomMode() {
  colorMode = "random";
}

// switches the mode using buttons
function darkenMode() {
  colorMode = "darken";
}

// switches the mode using buttons
function lightenMode() {
  colorMode = "lighten";
}

//changes the grid size
gridSlider.oninput = function() {
  let size = Math.floor((this.value / 2)**1.3); // this is so you have finer control over low numbers
  makeGrid(size); // makes the grid
  gridSizeText.textContent = size; // updates text
}

// run the function to get a value for the grid size and initialize the grid
gridSlider.oninput();

// switches the mode and changes the color value
colorPick.oninput = function() {
  colorMode = "picked";
  color = this.value;
}