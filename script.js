let sideBlocks = 0;
let moves = 0;
let field = document.getElementById("playfield");
let player = ["cross", "zero"];
let currentIndex = player.indexOf('cross');

function drawField(pix) {
    document.documentElement.style.setProperty('--number', pix);
    sideBlocks = pix;
    for (let i = 1; i <= pix; i++) {
        for (let l = 1; l <= pix; l++) {
            let div = document.createElement('div');
            div.className = 'cell';
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
    document.getElementById(coord).appendChild(image);
}

function playerAction() {
    moves++;
    let coord = event.target.id; //this is how we know where our cell is and can pass this knowladge to other functions.
    if (!isCellEmpty(coord)) {
        return 1
    }
    fillCell(player[currentIndex], coord);
    if (currentIndex + 1 >= player.length) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    if (moves === sideBlocks * sideBlocks) {
        resultMessage("draw");
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
    switch (result) {
        case "draw":
            message.innerText = "It's a draw!";
            break;
        case "p1":
            message.innerText = "Player 1 wins!";
            break;
        case "p2":
            message.innerText = "Player 2 wins!";
            break;
    }
}

function reset() {
    document.getElementById('result').remove();
    while (field.childNodes.length > 1) {
        field.querySelector('div').remove();
    }
    drawField(3);
}

drawField(3);