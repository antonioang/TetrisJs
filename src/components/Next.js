import {BLOCK_SIZE, COLORS, COLUMNS, KEY, ROWS, TETROMINOES} from "../utils/constants"
import {createGrid, styleElement} from "../utils/utils";

export function Next() {
    const next = document.createElement('div');
    let ctx, title, body;
    let next_tetrominoes = [];

    init();

    function init() {
        createEl();
        ctx = body.getContext('2d');
        ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        next.appendChild(title);
        next.appendChild(body);
    }

    this.randomizeElement = () => {
        while (next_tetrominoes.length < 4) {
            let index = Math.round(Math.random() * COLORS.length);
            index = index === 7 ? 6 : index;
            let temp = {
                el: TETROMINOES[index],
                color: COLORS[index]
            }
            let p = new Piece(temp);
            next_tetrominoes.push(p);
        }
        let element = next_tetrominoes.shift();
        drawNextEl();
        return element;
    }

    function drawNextEl() {
        let elementsToDraw = next_tetrominoes.map(obj => ({...obj, y: 0}));
        ctx.clearRect(0, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);
        for (let i = 0; typeof elementsToDraw[i] !== 'undefined'; i++) {
            let nextel = elementsToDraw[i];
            nextel.y += 3 * i;
            ctx.fillStyle = nextel.shape.color;
            nextel.shape.el.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value > 0) {
                        ctx.fillRect(nextel.x + x, nextel.y + y, 1, 1);
                    }
                });
            });
        }
    }

    function Piece(shape) {
        this.shape = shape;

        this.x = 3;
        this.y = -1;
    }

    function createEl() {
        title = document.createElement('div');
        title.innerHTML = 'NEXT';
        styleElement(title, {
            color: "white",
            marginLeft: "20px",
        })
        body = document.createElement('canvas');
        body.width = 300;
        body.height = 250;
    }

    this.next = next;
}