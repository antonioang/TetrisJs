import {BLOCK_SIZE} from "./constants"

export function styleElement(obj, props) {
    for (let prop in props) {
        obj.style[prop] = props[prop];
    }
}

export function createGrid(width, height, ctx) {
    for (let x = 0; x <= width; x += 25) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += 25) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

}