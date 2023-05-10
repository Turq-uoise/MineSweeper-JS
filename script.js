// TODO: Constants       // 
  

// TODO: State Variables //
const width = 10
const height = 10
const cellCount = width * height
let cells = [];

// TODO: Cached Elements //
const screen = document.querySelector('section');

// TODO: Event Listeners //
  
  
// TODO: Functions       //
init();

function init() {
    createGrid();
}

function handleClick () {

}

function checkMines() {

}

function render() {

}

function createGrid(){
    // Use the cellCount to create our grid cells
    for (let i = 0; i < cellCount; i++){
      // Create div cell
      const cell = document.createElement('div')
      // Add index as an attribute
      cell.id = i
      // Add the height & width to each grid cell (div)
      cell.style.height = `${100 / height}%`
      cell.style.width = `${100 / width}%`
      // Add cell to grid
      screen.appendChild(cell)
      // Add newly created div cell to cells array
      cells.push(cell)
    }
}