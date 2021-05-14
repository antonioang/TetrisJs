import {MainScreen} from './MainScreen';
import {Score} from './Score';
import {Lines} from './Lines';
import {Hold} from './Hold';
import {Level} from './Level';
import {Next} from './Next';
import {styleElement} from "../utils/utils";
import {KEY, LEVEL, LINES_PER_LEVEL} from "../utils/constants"
import {POINTS} from "../utils/constants"

export function Tetris() {
    const container = document.createElement("div");
    let leftContainer, centerContainer, requestAnimateId, rightContainer, mainscreen, score, next,
        level, lines, hold, start, btn, gameOver, btng;
    let time = {start: 0, elapsed: 0, level: 1000};
    let accountValues = {
        score: 0,
        lines: 0,
        level:0
    }
    let account = new Proxy(accountValues, {
        set: (target, key, value) => {
            target[key] = value;
            updateAccount(value, key);
            return true;
        }
    });

    init();

    function init() {
        createEl();
        buildStructure();
        attachListeners();
    }

    function startGame() {
        mainscreen.reset();
        mainscreen.currentPiece = next.randomizeElement();
        animate();
    }

    function animate(now = 0) {
        let p = JSON.parse(JSON.stringify(mainscreen.currentPiece));
        time.elapsed = now - time.start;
        if (time.elapsed > time.level) {
            time.start = now;
            if (!mainscreen.drop(p)) {
                if (mainscreen.currentPiece.y === -1) {
                    stopGame(requestAnimateId);
                    return
                } else {
                    mainscreen.currentPiece = next.randomizeElement();
                    animate();
                }
            } else mainscreen.draw(p);
        }
            requestAnimateId = requestAnimationFrame(animate)
    }

    function stopGame(requestAnimateId) {
        if (container.querySelector("#gameOver") == null) {
            container.appendChild(gameOver);
        } else {
            styleElement(gameOver, {
                display: "flex",
            });
        }
        cancelAnimationFrame(requestAnimateId);
        hold.clean();
        account.score = 0;
        account.lines = 0;
        account.level = 0;
    }

    function updateAccount(value, key) {
        if (key === "lines") {
            let trg = lines.lines.childNodes[1];
            trg.textContent = value;
        } else if(key === "score") {
            let trg = score.score.childNodes[1];
            trg.textContent = value;
        } else {
            let trg = level.level.childNodes[1];
            trg.textContent = value;
        }
    }

    function manageHold() {
        let clone = JSON.parse(JSON.stringify(mainscreen.currentPiece));
        if (typeof hold.holded.hold === "undefined") {
            hold.holded.hold = clone;
            mainscreen.currentPiece = next.randomizeElement();
        } else {
            mainscreen.currentPiece = hold.holded.hold;
            hold.holded.hold = clone;
        }

    }

    function attachListeners() {
        mainscreen.mainscreen.addEventListener('lines-boom', function (e) {
            account.score += e.linesNumber;
            account.lines += e.lines;
            if (account.lines >= LINES_PER_LEVEL) {
                account.level++;
                account.lines -= LINES_PER_LEVEL;
                time.level = LEVEL[account.level];
            }
        });
        container.addEventListener('keydown', function (e) {
            if (e.code === KEY.HOLD) {
                manageHold();
            }
            if (mainscreen.moves[e.code]) {
                e.preventDefault();
                let p = mainscreen.moves[e.code](mainscreen.currentPiece);
                if (e.code === KEY.SPACE) {
                    while (mainscreen.isValid(p)) {
                        account.score += POINTS.HARD_DROP;
                        mainscreen.move(p)
                        p = mainscreen.moves[KEY.DOWN](mainscreen.currentPiece);
                    }
                    mainscreen.draw(mainscreen.currentPiece);
                } else if (mainscreen.isValid(p)) {
                    mainscreen.move(p);
                    if (e.code === KEY.DOWN) {
                        account.score += POINTS.SOFT_DROP;
                    }
                    mainscreen.draw(p);
                }
            }
        });
        btn.addEventListener('click', function () {
            styleElement(start, {
                display: "none",
            });
            startGame();
        })
        btng.addEventListener('click', function () {
            startGame();
            styleElement(gameOver, {
                display: "none",
            });
        })
    }

    function buildStructure() {
        mainscreen = new MainScreen();
        score = new Score();
        level = new Level();
        lines = new Lines();
        hold = new Hold();
        next = new Next();

        container.tabIndex = 0;

        leftContainer.appendChild(hold.hold);
        leftContainer.appendChild(level.level);
        leftContainer.appendChild(lines.lines);
        container.appendChild(leftContainer);
        centerContainer.appendChild(score.score);
        centerContainer.appendChild(mainscreen.mainscreen);
        container.appendChild(centerContainer);
        rightContainer.appendChild(next.next);
        container.appendChild(rightContainer);
        container.appendChild(start);
    }

    function createEl() {
        leftContainer = document.createElement("div");
        centerContainer = document.createElement("div");
        rightContainer = document.createElement("div");
        styleElement(container, {
            display: "flex",
            justifyContent: "center",
            height: "700px",
            alignItems: "center",
            margin: "auto",
        });
        styleElement(leftContainer, {
            textAlign: "right",
        });
        start = document.createElement("div");
        let titles = document.createElement("h1");
        titles.innerHTML = "DO YOU WANT TO START GAME?";
        btn = document.createElement("a");
        styleElement(btn, {
            height: "100px",
            width: "200px",
            background: "green",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
        });
        btn.innerHTML = "START GAME";
        styleElement(start, {
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            width: "50vw",
            borderRadius: "50px",
            background: "white",
            alignItems: "center",
            justifyContent: "center",
        });
        start.appendChild(titles);
        start.appendChild(btn);

        gameOver = document.createElement("div");
        gameOver.id = "gameOver";
        let titleg = document.createElement("h1");
        titleg.innerHTML = "GAMEOVER";
        btng = document.createElement("a");
        styleElement(btng, {
            height: "100px",
            width: "200px",
            background: "green",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
        });
        btng.innerHTML = "RESTART GAME";
        styleElement(gameOver, {
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            width: "50vw",
            borderRadius: "50px",
            background: "white",
            alignItems: "center",
            justifyContent: "center",
        });
        gameOver.appendChild(titleg);
        gameOver.appendChild(btng);
    }

    this.container = container;
}