import {Tetris} from "./Tetris"

function TetrisManager() {
    const game = new Tetris();

    document.body.appendChild(game.container);
}


export default TetrisManager