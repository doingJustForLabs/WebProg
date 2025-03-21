import { TextBlock } from "../js/blocks.js";

class Root{

    constructor (blocks = []){
        this._content = blocks;
        this.header = {
            title: "Конструктор статьи",
            _editModeToggleID: "editModeToggle"
        }
        this._editMode = false;
        this._init();
    }

    addBlock = (block) =>{
        block._id = `${this._content.length}`;
        this._content.push(block);
    }
    
    setBlocks = (blocks) => {
        blocks.forEach(block => {
            this.addBlock(block);
        });
    }

    _updateBlocksId = () => {
        let blocks = this._content;
        this._content = [];
        this.setBlocks(blocks);
    }

    deleteBlock = (id) => {
        this._content.splice(id, 1);
        this._updateBlocksId();
    }

    getEditModeToggle = () => {
        return document.getElementById(this.header._editModeToggleID);
    }
    
    inEditMode = () => {
        return this._editMode;
    }

    getContentHTML = () => {
        const blocksHTML = this._content.map(block => block.getHTML(this._editMode)).join('');
        return `${blocksHTML}
                ${this._editMode ? 
                    `<button id="add-block-button" class="add-button">
                        <img src="../img/add-icon.svg" alt="Добавить" class="big-icon">
                    </button>` : ""}`;
    }
    
    _init = () => {
        document.body.innerHTML = `<main id="root" class="root">
                                        <header id="root-header" class="root-header">
                                            <p class="root-title">${this.header.title}</p>
                                            <div id="root-tools" class="root-tools">
                                                <p>Режим редактирования</p>
                                                <div class="toggle-container">
                                                    <input type="checkbox" id="${this.header._editModeToggleID}" class="toggle-input">
                                                    <label for="editModeToggle" class="toggle-label"></label>
                                                </div>
                                            </div>
                                        </header>
                                        <div id="content" class="root-content"></div>
                                    </main>\n`;
    }

    render = () => {
        console.log(this._content);
        this._editMode = document.getElementById(this.header._editModeToggleID).checked;
        document.getElementById("content").innerHTML = this.getContentHTML();

        if (this._editMode) {
            const addButton = document.getElementById("add-block-button");
            if (addButton) {
                addButton.removeEventListener('click', this._handleAddBlock);
                addButton.addEventListener('click', this._handleAddBlock);
            }
    
            document.removeEventListener("click", this._handleBlockTools);
            document.addEventListener("click", this._handleBlockTools);
        }

    }

    _handleAddBlock = () => {
        this.addBlock(new TextBlock());
        this.render();
    };
    
    _handleBlockTools = (event) => {
        const button = event.target.closest(".tool-button");
        if (!button) return;
    
        const blockEnv = button.closest(".env");
        const block = blockEnv?.querySelector(".block");
        if (!block) return;
    
        if (button.name === "deleteBlock") {
            this.deleteBlock(block.id);
            this.render();
        }
    };


}

export const root = new Root();