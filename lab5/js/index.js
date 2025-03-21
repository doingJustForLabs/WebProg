import { root } from "../js/blocks.js";
import { Block, Header, Container} from "../js/blocks.js";

let h1 = new Header("Добро пожаловать в конструктор статей!!", {
    "text-align":"center",
    "font-size":"30px",
});

let b1 = new Block("Здесь вы можете немного побаловаться и написать про что-нибудь...\nМожно создавать разные блоки, редактировать их и удалять.", {
    "font-size":"25px",
    "padding":"10px"
}
);
let b2 = new Block("Тут также доступно немного изменять стиль текста и элементов. Пробуйте!",  {
    "font-size":"25px",
    "padding":"10px",
    "color": "white",
    "background-color": "red"
});
let subbox = new Container();
let b3 = new Block("А этот текст вложен в контейнер который вложен в контейнер!!!", {"font-size": "30px"});
let box1 = new Container();
let box2 = new Container();

subbox.addBlock(b3);
box1.setBlocks([h1, b1, b2, subbox]);
box2.setBlocks([new Header("ААА ВТОРОЙ КОНТЕЙНЕР", {"text-align": "center", "font-size": "50px", "color": "green"})]);

root.addBlock(box1);
root.addBlock(box2);

document.addEventListener("DOMContentLoaded", () => {
    root.render();
});