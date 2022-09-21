let sideBlocks = 0;
let field = document.getElementById("playfield");







function drawField(pix) {
    document.documentElement.style.setProperty('--number', pix);
    sideBlocks = pix;
    for (let i = 1; i <= pix; i++) {
        for (let l = 1; l <= pix; l++) {
            let div = document.createElement('div');
            div.className = 'cell';
            div.setAttribute('id', i + ' ' + l);
            field.appendChild(div);
        }
    }
    return 0;
}

drawField(5);