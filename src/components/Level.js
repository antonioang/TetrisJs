import {styleElement} from "../utils/utils";

export function Level() {
    const level = document.createElement('div');
    let title, body;

    init();

    function init() {
        createEl();
        level.appendChild(title);
        level.appendChild(body);
    }

    function createEl() {
        title = document.createElement('div');
        title.innerHTML = 'LEVEL';
        styleElement(title, {
            color: "white",
            marginRight: "20px",
        });
        body = document.createElement('p');
        body.innerHTML = "0";
        styleElement(body, {
            color: "white",
            textAlign: "center",
            fontSize: "30px",
            margin: "0",
            marginBottom: "5px"
        });
    }

    this.level = level;
}