// TODO: Constants       // 
  

// TODO: State Variables //
let width
let height
let cellCount
let ratCount
let trapCount
let cells = []
let ratIdx = []
let ratArr = []

// TODO: Cached Elements //
const screen = document.querySelector('section')

// TODO: Event Listeners //
document.addEventListener('click', handleClick)
document.addEventListener('contextmenu', rightClick)
  
// TODO: Functions       //
init();

function init() {
    width = 10;
    height = 10;
    cellCount = width * height;
    ratCount = 10;
    trapCount = ratCount;
    createGrid();
    createBombs();
    console.log(cells);
}

function handleClick (evt) {
    const cell = evt.target;
    console.log(cell.id);
    console.log(cell.classList);
    if (cell.classList == "rat-hidden") {
        ratArr.forEach(function(cell) {
            console.log(cell.classList);
            cell.classList.remove('rat-hidden');
            cell.classList.add('rat');
        });
    }
}

function rightClick (evt) {
    const cell = evt.target;
    if (cell.id in cells && trapCount > 0) {
        evt.preventDefault();
        cell.classList.toggle('trap');
        trapCount--;
    }

}

function checkMines() {

}

function render() {

}

function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.id = i
      cell.style.height = `${100 / height}%`
      cell.style.width = `${100 / width}%`
      screen.appendChild(cell)
      cells.push(cell)
    }
}


// ! May repeat rats, need to find a way to make sure random number doesn't repeat

function createBombs() {
    for (let i = 0; i < ratCount; i++){
        let rat = Math.floor((Math.random() * 100));
        ratIdx.push(rat);
    };
    console.log(ratIdx);
    for (let i = 0; i < cellCount; i++){
        ratIdx.forEach(function(rat) {
            let cell = cells[i].id;
            if (cell == rat) {
                cells[i].classList.add('rat-hidden');
                ratArr.push(cells[i]);
            };
        });
    };
}