// TODO: Constants       // 
  

// TODO: State Variables //
let width
let height
let cellCount
let ratCount
let trapCount
let seconds
let ratIdx = []
let ratArr = []
let cells = {}
let timerVariable = setInterval(startTimer, 1000);

// TODO: Cached Elements //
const screen = document.querySelector('section')
const leftFlag = document.querySelector('.left')
const rightTimer = document.querySelector('.right')
const resetBtn = document.querySelector('button')

// TODO: Event Listeners //
document.addEventListener('click', handleClick)
document.addEventListener('contextmenu', rightClick)
resetBtn.addEventListener('click', init)
  
// TODO: Functions       //
init();

function init() {
    document.addEventListener('click', handleClick)
    document.addEventListener('contextmenu', rightClick)
    screen.innerHTML = "";

    seconds = -1;
    width = 10;
    height = 10;
    cellCount = width * height;
    ratCount = 10;
    trapCount = ratCount;
    leftFlag.innerText = trapCount;
    rightTimer.innerText = seconds;
    
    createGrid();
    createRats();
    startTimer();
    checkRats();
    render();
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
        console.log("not rat or empty")
        console.log("clicked text: " + cell.innerText)
        console.log("clicked score: " + cells[cell.id].score)
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
}


function render() {
    // for (i = 0; i < cellCount; i++) {
    //     cells[i].cell.innerText = cells[i].score;
    //     if (cells[i].cell.innerText == "0") {cells[i].cell.innerText = "empty"};
    //     if (cells[i].cell.classList.contains('rat-hidden')) {cells[i].cell.innerText = "rat"};
    // };
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
    ratCheck = ratCheck.filter(function(rat) {return rat > -1});
    ratCheck = ratCheck.filter(function(rat) {return rat < 100});
    for (let i = 0; i < ratCheck.length; i++) {
        cells[ratCheck[i]].score++;
    };
}

function flood(cell) {
    console.log("flood start: " + cell.id);
    cell.innerText = "free";
    cells[cell.id].score = 7;
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
    rainCheck = rainCheck.filter(function(rain) {return rain < 100});
    console.log(rainCheck);
    for (let i = 0; i < rainCheck.length; i++) {
        console.log(cells[rainCheck[i]].cell);
        if (cells[rainCheck[i]].score == 0) {flood(cells[rainCheck[i]].cell)}
        else if (cells[rainCheck[i]].score > 0 && cells[rainCheck[i]].score < 7) {
            console.log("touch");
            console.log(cells[rainCheck[i]].cell.innerText);
            console.log(cells[rainCheck[i]].score);
            cells[rainCheck[i]].cell.innerText = cells[rainCheck[i]].score
        }
        else (console.log("no flood"));
    }
}