import {styleElement, createGrid} from '../utils/utils'
import {COLUMNS, KEY, ROWS, BLOCK_SIZE, COLORS, POINTS as Points} from "../utils/constants"


export function MainScreen() {
    const mainscreen = document.createElement("canvas");
    let ctx, grid, currentPiece;
    const moves = {
        [KEY.LEFT]: p => ({...p, x: p.x - 1}),
        [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
        [KEY.DOWN]: p => ({...p, y: p.y + 1}),
        [KEY.UP]: p => rotate(p),
        [KEY.SPACE]: p => ({...p, y: p.y + 1}),
    };

    init()

    function init() {
        createEl();
        ctx = mainscreen.getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        createGrid(COLUMNS * BLOCK_SIZE, ROWS * BLOCK_SIZE, ctx);
    }

    this.reset = () => {
        grid = Array.from(
            {length: ROWS}, () => Array(COLUMNS).fill(0)
        );
    }

    this.draw = (piece) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.scale(1 / 25, 1 / 25);
        createGrid(COLUMNS * BLOCK_SIZE, ROWS * BLOCK_SIZE, ctx);
        ctx.fillStyle = piece.shape.color;
        piece.shape.el.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    ctx.fillRect(piece.x + x, piece.y + y, 1, 1);
                }
            });
        });
        drawBoard();
    }

    this.move = (piece) => {
        this.currentPiece = piece;
    }

    this.isValid = (piece) => {
        return piece.shape.el.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;
                return (
                    comparePieceGrid(value, x, y) && (betweenWalls(value, x) && aboveFloor(value, y))
                )
            });
        });
    }

    this.drop = (piece) => {
        piece.y += 1;
        if (this.isValid(piece)) {
            this.draw(piece);
            this.currentPiece = piece;
            return true;
        } else {
            if (piece.y > 0) {
                freeze(this.currentPiece);
                lineClear();
                return false;
            }
            return false;
        }
    }

    function comparePieceGrid(value, x, y) {
        if (!value) return true;
        if (typeof grid[y] === 'undefined') {
            return false;
        } else {
            return grid[y][x] === 0;
        }
    }

    function aboveFloor(value, y) {
        if (!value) return true;
        return (y >= 0 && y <= 19)
    }

    function betweenWalls(value, x) {
        //quando il valore della cella del pezzo è zero non faccio il controllo e ritorno comunque true
        if (!value) return true;
        return (x >= 0 && x <= 10);
    }

    function rotate(piece) {
        let clone = JSON.parse(JSON.stringify(piece));
        for (let y = 0; y < clone.shape.el.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [clone.shape.el[x][y], clone.shape.el[y][x]] =
                    [clone.shape.el[y][x], clone.shape.el[x][y]];
            }
        }
        clone.shape.el.forEach(row => row.reverse());
        return clone;
    }

    function freeze(piece) {
        piece.shape.el.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    let dx = x + piece.x;
                    let dy = y + piece.y;
                    grid[dy][dx] = value;
                }
            });
        });
    }

    function lineClear() {
        let lines = 0;
        grid.forEach((row, y) => {
            if (row.every(value => value > 0)) {
                lines++;
                grid.splice(y, 1);
                grid.unshift(Array(COLUMNS).fill(0));
            }
        });
        if (lines > 0) {
            const event = new Event('lines-boom');
            event.linesNumber = 0;
            event.lines = 0;
            event.linesNumber += getLineClearPoints(lines);
            event.lines += lines;
            mainscreen.dispatchEvent(event);
        }
    }

    function getLineClearPoints(lines) {
        return lines === 1 ? Points.SINGLE :
            lines === 2 ? Points.DOUBLE :
                lines === 3 ? Points.TRIPLE :
                    lines === 4 ? Points.TETRIS :
                        0;
    }

    function drawBoard() {
        grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    ctx.fillStyle = COLORS[value - 1];
                    ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    function createEl() {
        mainscreen.width = 250;
        mainscreen.height = 500;
        styleElement(mainscreen, {
            height: "500px",
            width: "250px",
        });
    }

    this.mainscreen = mainscreen;
    this.moves = moves;
    this.currentPiece = currentPiece;
}