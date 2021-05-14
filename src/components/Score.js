import {styleElement} from "../utils/utils";

export function Score() {
    const score = document.createElement("div");
    let title, body;

    init();

    function init() {
        createEl();
        score.appendChild(title);
        score.appendChild(body);
    }

    function createEl() {
        title = document.createElement('div');
        title.innerHTML = 'SCORE';
        styleElement(title, {
            display: "flex",
            justifyContent: "center",
            color: "white",
            height: "35px",
        })
        body = document.createElement('p');
        body.innerHTML = "0"
        styleElement(body, {
            color: "white",
            textAlign: "center",
            fontSize: "30px",
            margin: "0",
            marginBottom: "5px"
        })
    }

    this.score = score;
}