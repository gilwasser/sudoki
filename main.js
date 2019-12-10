let boxSize = 9
const easy = 45;
const medium = 50;
const hard = 55;
let board = [];
let difficulty = easy;

let easyButton = document.querySelector("#easyButton");
let mediumButton = document.querySelector("#mediumButton");
let hardButton = document.querySelector("#hardButton");

let body = document.querySelector("body");


easyButton.addEventListener('click', function() {
    difficulty = easy;
    mediumButton.classList.remove("Selected");
    hardButton.classList.remove("Selected");
    this.classList.add("Selected");
    restart();

});

mediumButton.addEventListener('click', function() {
    difficulty = medium;
    easyButton.classList.remove("Selected");
    hardButton.classList.remove("Selected");
    this.classList.add("Selected");
    restart();
});

hardButton.addEventListener('click', function() {
    difficulty = hard;
    mediumButton.classList.remove("Selected");
    easyButton.classList.remove("Selected");
    this.classList.add("Selected");
    restart();
});

console.log("again");
builBoard();
createDiagonal();
slove(0, 0);
deleteRandom(difficulty);

printBoard();


let inputs = document.querySelectorAll('input');

function restart() {
    builBoard();
    createDiagonal();
    slove(0, 0);
    deleteRandom(difficulty);

    showStatus();

}

function showStatus() {
    let table = document.querySelector('table');

    table.remove();
    printBoard();
}

function boardZero() {
    for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
            board[i][j] = 0;
        }
    }
}

function builBoard() {
    for (let i = 0; i < boxSize; i++) {
        board[i] = [];
        for (let j = 0; j < boxSize; j++) {
            board[i][j] = 0;
        }
    }
}



function createDiagonal() {
    for (let i = 0; i < boxSize; i += 3) {
        for (let j = 1; j <= 9; j++) {
            let height = Math.trunc(Math.random() * 3 + i);
            let width = Math.trunc(Math.random() * 3 + i);
            while (board[height][width] != 0) {
                height = Math.trunc(Math.random() * 3 + i);
                width = Math.trunc(Math.random() * 3 + i);
            }
            board[height][width] = j;

        }
    }
}

function slove(height, width) {
    if (height >= 9) return true;

    if (width == 9) return slove(height + 1, 0);

    if (board[height][width] != 0) return slove(height, width + 1);

    for (let i = 1; i <= 9; i++) {
        if (!valid(height, width, i)) continue;
        board[height][width] = i;
        if (slove(height, width + 1)) return true;
        board[height][width] = 0;
    }
    return false;

}


function valid(height, width, num) {
    return validHorizontal(height, num) &&
        validVertical(width, num) &&
        validBox(height, width, num);
}

function validHorizontal(height, num) {
    for (let i = 0; i < 9; i++) {
        if (board[height][i] == num) return false;
    }
    return true;
}

function validVertical(width, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][width] == num) return false;
    }
    return true;
}

function validBox(height, width, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[height - (height % 3) + i][width - (width % 3) + j] == num) return false;
        }
    }
    return true;
}


function deleteRandom(difficulty) {
    let counter = difficulty

    while (counter > 0) {
        let x = Math.trunc(Math.random() * 9);
        let y = Math.trunc(Math.random() * 9);
        if (board[x][y] == 0) continue;
        board[x][y] = 0;
        counter--;
    }

}

function printBoard() {
    body = document.querySelector("body");

    let table = document.createElement("table");
    for (let i = 0; i < boxSize; i++) {
        let row = table.insertRow(i);
        table.appendChild
        for (let j = 0; j < boxSize; j++) {
            let cell = row.insertCell(j);
            var input = document.createElement('input');
            input.type = "text";
            if (board[i][j] == 0) {
                input.placeholder = ' ';
                input.disabled = false;
            } else {
                input.placeholder = board[i][j];
                input.disabled = true;
            }
            cell.appendChild(input);
        }
    }
    body.appendChild(table);
}


let tds = document.querySelectorAll('table td');
let table = document.querySelector('table');

table.addEventListener('click', function(e) {

    if (e.target.className.match('grayBackground')) {
        e.target.className = '';
    } else {
        e.target.className = 'grayBackground';
    }

});