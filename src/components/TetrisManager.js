import {Tetris} from "./Tetris"

function TetrisManager() {

    //alert("vuoi iniziare a giocare?");

    const game = new Tetris();

    document.body.appendChild(game.container);

}


export default TetrisManager