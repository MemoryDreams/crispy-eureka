let sideBlocks = 0;
let moves = 0;
let field = document.getElementById("playfield");
let player = ["cross", "zero"];
let currentIndex = player.indexOf('cross');
let gameOn = true;
let AIisOn = false;

function drawField(pix) {
    document.documentElement.style.setProperty('--number', pix);
    sideBlocks = pix;
    for (let i = 1; i <= pix; i++) {
        for (let l = 1; l <= pix; l++) {
            let div = document.createElement('div');
            div.setAttribute('id', i + ' ' + l); //id is the coordinate of each square.
            div.addEventListener("click", function(){ playerAction(); });
            field.appendChild(div);
        }
    }
    return 0;
}

function fillCell(player, coord) {
    let image = document.createElement('img');
    switch (player) {
        case 'cross':
            image.src = "cross.png";
            break;
        case 'zero':
            image.src = "zero.png";
            break;
    }
    image.className = player;
    document.getElementById(coord).appendChild(image);
}

function playerAction() {
    if (!gameOn) {
        return 1;
    }
    moves++;
    //this is how we know where our cell is and can pass this knowladge to other functions.
    let coord = event.target.id; 
    if (!isCellEmpty(coord)) {
        return 2
    }
    fillCell(player[currentIndex], coord);
    document.getElementById(coord).className = player[currentIndex];
    //here we check if the player wins
    if (considerWinning(coord, player[currentIndex])) {
        resultMessage(player[currentIndex]);
        return 0;
    }
    if (moves === sideBlocks * sideBlocks) {
        resultMessage("draw");
    }
    changePlayer()
    if (AIisOn) {
        computerMove();
    }
}

function changePlayer() {
    if (currentIndex + 1 >= player.length) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
}

function isCellEmpty(coord) {
    if (document.getElementById(coord).childNodes.length === 0) {
        return true;
    } else {
        return false;
    }
}

function resultMessage(result) {
    let div = document.createElement('div');
    div.setAttribute('id', 'result');
    let message = document.createElement('h2');
    div.appendChild(message);
    let button = document.createElement('button');
    button.addEventListener("click", function(){ reset(); })
    button.innerText = "Reset";
    div.appendChild(button);
    document.querySelector('body').appendChild(div);
    console.log(result);
    gameOn = false;
    switch (result) {
        case "draw":
            message.innerText = "It's a draw!";
            break;
        case "cross":
            message.innerText = "Player 1 wins!";
            break;
        case "zero":
            message.innerText = "Player 2 wins!";
            break;
    }
}

function reset() {
    gameOn = true;
    if (exists(document.getElementById('result'))){
        document.getElementById('result').remove();
    }
    while (field.childNodes.length > 1) {
        field.querySelector('div').remove();
    }
    drawField(3);
    moves = 0;
}

function exists(element) {
    if(typeof(element) != 'undefined' && element != null){
        return true;
    } else{
        return false;
    }
}

function checkCell(coord, item) {
    if (!exists(document.getElementById(coord))) {
        return false;
    }
    if (document.getElementById(coord).className == item) {
        return true;
    } else {
        return false;
    }
}

function considerWinning(coord, item) {
    let ident = coord.trim().split(/\s+/);
    let y = parseInt(ident[0]);
    let x = parseInt(ident[1]);
    switch (true) {
        case (checkHorizontally(x, y, item)):
            return true;
        case (checkVertically(x, y, item)):
            return true;
        case (checkDiagonally(x, y, item)):
            return true;
        case (checkReverseDiagonally(x, y, item)):
            return true;
    }
}

function checkHorizontally(x, y, item) {
    let points = 0;
    for (let i = 1; i < sideBlocks; i++) {
        if (checkCell(y + ' ' + (x + i), item)) {
            points++;
        }
        if (checkCell(y + ' ' + (x - i), item)) {
            points++;
        }
    }
    return (points == sideBlocks - 1);
}

function checkVertically(x, y, item) {
    let points = 0;
    console.log(y + ' ' + x);
    for (let i = 1; i < sideBlocks; i++) {
        if (checkCell((y - i )+ ' ' + x, item)) {
            points++;
        }
        if (checkCell((y + i) + ' ' + x, item)) {
            points++;
        }
        }
    return (points == sideBlocks - 1);
}

function checkDiagonally(x, y, item) {
    let points = 0;
    console.log(y + ' ' + x);
    for (let i = 1; i < sideBlocks; i++) {
        if (checkCell((y - i) + ' ' + (x - i), item)) {
            points++;
        }
        if (checkCell((y + i) + ' ' + (x + i), item)) {
            points++;
        }
        }
    return (points == sideBlocks - 1);
}

function checkReverseDiagonally(x, y, item) {
    let points = 0;
    console.log(y + ' ' + x);
    for (let i = 1; i < sideBlocks; i++) {
        if (checkCell((y - i) + ' ' + (x + i), item)) {
            points++;
        }
        if (checkCell((y + i) + ' ' + (x - i), item)) {
            points++;
        }
        }
    return (points == sideBlocks - 1);
}

function computerMove(weapon, difficulty) {
    let coord = '';
    switch (difficulty) {
        case "easy":
            coord = randomMove();
            break;
        case "mid":
            coord = midiumMove();
            break;
        case "hard":
            coord = hardMove();
            break;
    }
    fillCell(player[currentIndex], coord);
    if (considerWinning(coord, player[currentIndex])) {
        resultMessage(player[currentIndex]);
        return 0;
    }
    changePlayer();
}

drawField(3);