const COLUMNS = 10;
const ROWS = 20;
const BLOCK_SIZE = 25;

const LINES_PER_LEVEL = 1;

const LEVEL = {
    0: 1000,
    1: 900,
    2: 810,
    3: 730,
    4: 660,
    5: 600,
    6: 550,
    7: 510,
    8: 500
}

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
}

const KEY = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp',
    SPACE: 'Space',
    HOLD: 'KeyZ',
}
Object.freeze(KEY);

const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
]

const TETROMINOES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0]
    ],
    [
        [4, 4, 0],
        [4, 4, 0],
        [0, 0, 0]
    ],
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0]
    ],
    [
        [7, 7, 7],
        [0, 7, 0],
        [0, 0, 0]
    ],
]

export {POINTS, COLUMNS, ROWS, BLOCK_SIZE, KEY, COLORS, TETROMINOES, LINES_PER_LEVEL, LEVEL}