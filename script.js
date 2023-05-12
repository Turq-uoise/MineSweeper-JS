// TODO: Constants       // 
const Size = [10, 20, 30]

// TODO: State Variables //
let width
let height
let cellCount
let ratCount
let trapCount
let seconds
let timerVariable
let ratIdx = []
let ratArr = []
let cells = {}

// TODO: Cached Elements //
const screen = document.querySelector('section')
const leftFlag = document.querySelector('.left')
const rightTimer = document.querySelector('.right')
const resetBtn = document.querySelector('.reset')
const easy = document.querySelector('.easy')
const medium = document.querySelector('.medium')
const hard = document.querySelector('.hard')
const result = document.querySelector('.middle')

// TODO: Event Listeners //
easy.addEventListener('click', choice)
medium.addEventListener('click', choice)
hard.addEventListener('click', choice)
  
// TODO: Functions       //
function choice(choice) {
    let sizeChoice;
    if (choice.target.className == "easy") {sizeChoice = Size[0]}
    if (choice.target.className == "medium") {sizeChoice = Size[1]}
    if (choice.target.className == "hard") {sizeChoice = Size[2]}
    width = sizeChoice;
    height = sizeChoice;
    ratCount = (sizeChoice * sizeChoice/10);
    init();
}


function init() {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', rightClick)
    screen.innerHTML = "";
    clearInterval(timerVariable);
    timerVariable = setInterval(startTimer, 1000);
    seconds = -1;
    cellCount = width * height;
    trapCount = ratCount;
    ratIdx = [];
    ratArr = [];
    leftFlag.innerText = trapCount;
    rightTimer.innerText = seconds;
    result.innerText = "Clear the Plague!";
    cells = {};

    createGrid();
    createRats();
    startTimer();
    checkRats();
    console.log("Rats placed at: " + ratIdx);
}


function startTimer() {
    ++seconds;
    rightTimer.innerHTML = seconds;
}


function handleClick (evt) {
    const cell = evt.target;
    if (cell.classList == "rat-hidden") {showRats()}
    else if (cells[cell.id].score == 0) {
        flood(cell)
    }
    else if (cells[cell.id].score !== 7){
        cell.innerText = cells[cell.id].score
    };
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
        leftFlag.innerText = trapCount;
    }
    checkWin();
}


function checkWin() {
    let ratsFound = 0;
    for (let i = 0; i < cellCount; i++) {
        if (cells[i].cell.classList.contains('trap') && cells[i].cell.classList.contains('rat-hidden')) {
            ratsFound++;
        }
        if (ratsFound === ratCount) {
            result.innerText = `YOU WIN!`;
            stopGame();
        }
    }
}


function showRats() {
    ratArr.forEach(function(cell) {
        cell.classList.remove('rat-hidden');
        cell.classList.add('rat');
    });
    result.innerText = `YOU LOSE!`;
    stopGame();
}


function stopGame() {
    document.removeEventListener('click', handleClick)
    document.removeEventListener('contextmenu', rightClick)
    clearInterval(timerVariable);
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


function createRats() {
    ratIdx = Array(cellCount).fill().map((_, index) => index + 1);
    ratIdx.sort(() => Math.random() - 0.5);
    ratIdx = ratIdx.slice(0, ratCount)

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

        else if (rat === width - 1) {
            ratCheckNeutral = [rat - 1];
            ratBelow = rat + width;
            ratCheckBelow = [ratBelow, ratBelow - 1];
        }

        else if (rat === cellCount - width + 1) {
            ratCheckNeutral = [rat + 1];
            ratAbove = rat - width;
            ratCheckAbove = [ratAbove, ratAbove + 1];
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
    ratCheck = ratCheck.filter(function(rat) {return rat > -1});
    ratCheck = ratCheck.filter(function(rat) {return rat < cellCount});
    for (let i = 0; i < ratCheck.length; i++) {
        cells[ratCheck[i]].score++;
    };
}


function flood(cell) {
    cell.style.backgroundColor = "rgba(0,0,0,0)"; 
    cell.style.borderColor = "darkgrey";
    cells[cell.id].score = 7;

    let rainCheck = [];

    let up = +cell.id - width;
    let right = +cell.id + 1;
    let down = +cell.id + width;
    let left = +cell.id - 1;

    if (cell.id % width === 0) {rainCheck = [up, right, down]}

    else if (cell.id % width === width - 1) {rainCheck = [up, down, left]}

    else if (cell.id > cellCount - width) {rainCheck = [up, right, left]} 

    else if (cell.id === width - 1) {rainCheck = [left, down]}

    else if (cell.id === cellCount - width + 1) {rainCheck = [up, right]}

    else {rainCheck = [up, right, down, left]};

    rainCheck = rainCheck.filter(function(rain) {return rain > -1});
    rainCheck = rainCheck.filter(function(rain) {return rain < cellCount});
    for (let i = 0; i < rainCheck.length; i++) {
        if (cells[rainCheck[i]].score == 0) {flood(cells[rainCheck[i]].cell)}
        else if (cells[rainCheck[i]].score > 0 && cells[rainCheck[i]].score < 7) {
            cells[rainCheck[i]].cell.innerText = cells[rainCheck[i]].score
        }
    }
}