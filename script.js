let sideBlocks = 0;
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
}

function isCellEmpty(coord) {
    if (document.getElementById(coord).childNodes.length === 0) {
        return true;
    } else {
        return false;
    }
}

drawField(3);