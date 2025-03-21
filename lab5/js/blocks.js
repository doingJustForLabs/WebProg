import {Style} from "../js/style.js";

export class Block {
    /**
     * Создаёт блок текста.
     * @param {string} text - текст (<p>).
     * @param {Style} style - стиль блока.
     */
    constructor (text = "Текст", style = {}){
        style = typeof(style) === "object" ? new Style(style) : style;
        this.text = text;
        this.style = style;
    }

    /**
     * Возвращает HTML предтавление блока.
     * @returns {string}
     */
    getHTML = () => {
        const style = this.style.stringify() === "" ? "" : ` style = "${this.style.stringify()}"`;
        return `<p class="block"${style}>\n\t${this.text}\n</p>\n`  
    };
}

/**
 * Блок текста с заголовком.
 */
export class Header extends Block {
    /**
     * Создаёт блок текста с заголовком.
     * @param {string} text - текст заголовка (<h1>).
     * @param {Style} style - стили блока.
     */
    constructor (text = "Заголовок", style = {}) {
        super(text, style);
    }

    /**
     * Возвращает HTML предтавление блока.
     * @returns {string}
     */
        getHTML = () => {
        const style = this.style.stringify() === "" ? "" : ` style = "${this.style.stringify()}"`;
        return `<h1 class="header"${style}>\n\t${this.text}\n</h1>\n`
        };
}

/**
 * Контейнер блоков.
 */
export class Container {
    /**
     * Создаёт контейнер для блоков.
     * @param {Array<Block>} blocksArray - массив блоков.
     * @param {string} direction - режим отображения:
     * row - в строку
     * col - в столбец
     */
    constructor (blocksArray = [], direction = "row"){
        this.blocks = [...blocksArray];
        this.direction = direction;
    }

    /**
     * Добавляет блок в контейнер.
     * @param {Block} block 
     */
    addBlock = (block) =>{
        this.blocks.push(block);
    }
    
    setBlocks = (blocks) => {
        this.blocks = blocks;
    }

    getHTML = () => {
        const blocksHTML = this.blocks.map(block => block.getHTML()).join('');
        return `<div class="container">
            ${blocksHTML}
        </div>\n`;
    }

}

class Root extends Container{

    getHTML = () => {
        const blocksHTML = this.blocks.map(block => block.getHTML()).join('');
        console.log(`<div id="root" class="root">\n\t${blocksHTML}</div>\n`);
        return `<div id="root" class="root">\n\t${blocksHTML}\n</div>\n`;
      }

    render = () => {
        document.body.innerHTML += this.getHTML();
      }
}

export const root = new Root();
