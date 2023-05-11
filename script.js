// TODO: Constants       // 
  

// TODO: State Variables //
let width
let height
let cellCount
let ratCount
let trapCount
let ratIdx = []
let ratArr = []
const cells = {}

// TODO: Cached Elements //
const screen = document.querySelector('section')

// TODO: Event Listeners //
document.addEventListener('click', handleClick)
document.addEventListener('contextmenu', rightClick)
  
// TODO: Functions       //
init();

function init() {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', rightClick)
    width = 10;
    height = 10;
    cellCount = width * height;
    ratCount = 10;
    trapCount = ratCount;
    createGrid();
    createRats();
    console.log(ratIdx);
    checkRats();
    render();
    console.log(ratArr);
    console.log(cells);
}

function handleClick (evt) {
    const cell = evt.target;
    if (cell.classList == "rat-hidden") {showRats()};
    if (cell.innerText == "0") {flood(cell)};
}

function rightClick (evt) {
    const cell = evt.target;

    if (cell.id in cells) {
        evt.preventDefault();
        if (cell.classList.contains('trap')) {
            cell.classList.remove('trap');
            trapCount++;
        }
        else if (trapCount > 0) {
            cell.classList.add('trap');
            trapCount--;
        }
    }
}


function render() {
    for (i = 0; i < cellCount; i++) {
        cells[i].cell.innerText = cells[i].score;
        if (cells[i].cell.classList.contains('rat-hidden')) {cells[i].cell.innerText = "rat"};
    };
}

function showRats() {
    ratArr.forEach(function(cell) {
        cell.classList.remove('rat-hidden');
        cell.classList.add('rat');
    });
    document.removeEventListener('click', handleClick)
    document.removeEventListener('contextmenu', rightClick)
}

function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.id = i
      cell.style.height = `${100 / height}%`
      cell.style.width = `${100 / width}%`
      screen.appendChild(cell)
      cells[i] = {cell};
      cells[i].score = 0;
    }
}


// ! May repeat rats, need to find a way to make sure random number doesn't repeat
function createRats() {
    for (let i = 0; i < ratCount; i++){
        let rat = Math.floor((Math.random() * 100));
        ratIdx.push(rat);
    };

    for (let i = 0; i < cellCount; i++){
        ratIdx.forEach(function(rat) {
            let hole = cells[i].cell.id;
            if (hole == rat) {
                cells[i].cell.classList.add('rat-hidden');
                ratArr.push(cells[i].cell);
            };
        });
    };
}

function checkRats() {
    let ratCheckNeutral = [];
    let ratCheckAbove = [];
    let ratCheckBelow = [];
    ratIdx.forEach(function(rat) {
        if (rat % width === 0) {                                   // Left Side
            ratCheckNeutral = [rat + 1];
            ratAbove = rat - width;
            ratCheckAbove = [ratAbove, ratAbove + 1];
            ratBelow = rat + width;
            ratCheckBelow = [ratBelow, ratBelow + 1];
        }

        else if (rat % width === width - 1) {                       // Right Side
            ratCheckNeutral = [rat - 1];
            ratAbove = rat - width;
            ratCheckAbove = [ratAbove, ratAbove - 1];
            ratBelow = rat + width;
            ratCheckBelow = [ratBelow, ratBelow - 1];
        }

        else if (rat < width) {                                     // Top Side
            ratCheckNeutral = [rat + 1, rat - 1];
            ratBelow = rat + width;
            ratCheckBelow = [ratBelow, ratBelow + 1, ratBelow - 1];
        }

        else if (rat > cellCount - width) {                         // Bottom Side
            ratCheckNeutral = [rat + 1, rat - 1];
            ratAbove = rat - width;
            ratCheckAbove = [ratAbove, ratAbove + 1, ratAbove - 1];
        }

        else {                                                      // Elsewhere
            ratCheckNeutral = [rat + 1, rat - 1];
            ratAbove = rat - width;
            ratCheckAbove = [ratAbove, ratAbove + 1, ratAbove - 1];
            ratBelow = rat + width;
            ratCheckBelow = [ratBelow, ratBelow + 1, ratBelow - 1];
        }

        findRats(ratCheckNeutral);
        findRats(ratCheckAbove);
        findRats(ratCheckBelow);
    });
}

function findRats(ratCheck) {
    ratCheck = ratCheck.filter(function(rat) {return rat > -1})
    ratCheck = ratCheck.filter(function(rat) {return rat < 100})
    for (let i = 0; i < ratCheck.length; i++) {
        cells[ratCheck[i]].score++;
    }
}

function flood(cell) {
    cell.innerText = "";
    if (cell.id == 0) {console.log("ok")};
    console.log(cell.innerText);
    newId = cell.id;
    console.log(newId);
}