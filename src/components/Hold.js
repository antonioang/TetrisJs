import {styleElement} from "../utils/utils";
import {BLOCK_SIZE} from "../utils/constants";

export function Hold() {
    const hold = document.createElement('div');
    let ctx, body, title;
    let piece = {
        hold: undefined
    }
    let Holded = new Proxy(piece, {
        set: (target, key, value) => {
            value.y = 0
            value.x = 3
            target[key] = value;
            updateHold(value);
            return true;
        }
    })

    init();

    function init() {
        createEl();
        ctx = body.getContext('2d');
        ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        hold.appendChild(title);
        hold.appendChild(body);
    }

    this.clean = () => {
        ctx.clearRect(0, 0, ctx.canvas.width / 4, ctx.canvas.height / 4);
    }

    function updateHold(value) {
        ctx.clearRect(0, 0, ctx.canvas.width / 4, ctx.canvas.height / 4);
        ctx.fillStyle = value.shape.color;
        value.shape.el.forEach((row, y) => {
            row.forEach((index, x) => {
                if (index > 0) {
                    ctx.fillRect(value.x + x, value.y + y, 1, 1);
                }
            });
        });
    }

    function createEl() {
        title = document.createElement('div');
        title.innerHTML = 'HOLD';
        styleElement(title, {
            color: "white",
            marginRight: "20px",
        })
        body = document.createElement('canvas');
        body.width = 200;
        body.height = 250;
    }

    this.hold = hold
    this.holded = Holded
}