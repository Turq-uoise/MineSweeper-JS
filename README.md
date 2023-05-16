# MineSweeper-JS
An attempt at minesweeper, using the plague as the theme

Here was an attempt to fix the corner issue but it didn't end up working:

/*
function floodCorner(cell) {
    let up = +cell.id - width;
    let right = +cell.id + 1;
    let down = +cell.id + width;
    let left = +cell.id - 1;
    let diagRightUp = +cell.id - width + 1;
    let diagRightDown = +cell.id + width + 1;
    let diagLeftUp = +cell.id - 1 - width;
    let diagLeftDown = +cell.id -1 + width;

    if ((cells[up].score > 0 && cells[up].score < 7) && (cells[left].score > 0 && cells[left].score < 7)) {
        cells[diagLeftUp].cell.innerText = cells[diagLeftUp].score;
        cells[diagLeftUp].cell.style.backgroundColor = "rgba(0,0,0,0)"; 
        cells[diagLeftUp].cell.style.borderColor = "darkgrey";
    }

    else if ((cells[up].score > 0 && cells[up].score < 7) && (cells[right].score > 0 && cells[right].score < 7)) {
        cells[diagRightUp].cell.innerText = cells[diagRightUp].score;
        cells[diagRightUp].cell.style.backgroundColor = "rgba(0,0,0,0)"; 
        cells[diagRightUp].cell.style.borderColor = "darkgrey";
    }

    else if ((cells[down].score > 0 && cells[down].score < 7) && (cells[left].score > 0 && cells[left].score < 7)) {
        cells[diagLeftDown].cell.innerText = cells[diagLeftDown].score;
        cells[diagLeftDown].cell.style.backgroundColor = "rgba(0,0,0,0)"; 
        cells[diagLeftDown].cell.style.borderColor = "darkgrey";
    }

    else if ((cells[down].score > 0 && cells[down].score < 7) && (cells[right].score > 0 && cells[right].score < 7)) {
        cells[diagDownRight].cell.innerText = cells[diagDownRight].score;
        cells[diagDownRight].cell.style.backgroundColor = "rgba(0,0,0,0)"; 
        cells[diagDownRight].cell.style.borderColor = "darkgrey";
    }
}
*/