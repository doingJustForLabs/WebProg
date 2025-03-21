import { OrderedListBlock, PictureBlock, TextBlock } from "../js/blocks.js";

class Root{

    constructor (blocks = []){
        this._content = blocks;
        this.header = {
            title: "Конструктор",
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
                ${this._editMode ? `<div class="creation">
                                        <p>Создать</p>
                                        <select id="block-type-select">
                                            <option value="TextBlock" selected>Параграф</option>
                                            <option value="OrderedListBlock">Список</option>
                                            <option value="PictureBlock">Картинка</option>
                                        </select>
                                        <button id="add-block-button">
                                            <img src="../img/add-icon.svg" alt="Добавить" class="big-icon">
                                        </button>
                                    </div>` : ""}`;
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
        const selected = document.getElementById("block-type-select").value;
        switch (selected) {
            case "TextBlock": 
            this.addBlock(new TextBlock());
            break;

            case "OrderedListBlock": 
            this.addBlock(new OrderedListBlock());
            break;

            case "PictureBlock": 
            this.addBlock(new PictureBlock());
            break;
        }
        
        this.render();
    };
    
    _handleBlockTools = (event) => {
        const button = event.target.closest(".tool-button");
        if (!button) return;
    
        const blockEnv = button.closest(".env");
        const block = blockEnv?.querySelector(".block, .twopart-block");
        if (!block) return;
        
        
        if (button.name === "deleteBlock") {
            this.deleteBlock(block.id);
            this.render();
        }

        if (button.name === "uploadImage"){

            const blockObj = this._content.find(b => b._id === block.id);
            console.log(blockObj);
            if (!blockObj) return;

            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.style.display = "none";
        
            input.addEventListener("change", (event) => {
                const file = event.target.files[0];
                if (!file) return;
        
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = block.querySelector("img");
                    if (img) {
                        img.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            });
        
            document.body.appendChild(input);
            input.click();
            input.remove();
        }

        if (button.name === "saveBlock"){
            console.log("saveButton clicked");

            const blockObj = this._content.find(b => b._id === block.id);
            if (!blockObj) return;

            console.log(blockObj.type);
            switch (blockObj.type){
                case "TextBlock":
                    console.log("saved TEXTBLOCK");
                    blockObj.header = block.querySelector("h2").textContent;
                    blockObj.text = block.querySelector("p").textContent;
                break;

                case "OrderedListBlock":
                    console.log("saved LISTBLOCK");
                    blockObj.header = block.querySelector("h2").textContent;
                    const items = block.querySelectorAll("li");
                    blockObj.items = Array.from(items).map(li => li.textContent);
                break;

                case "PictureBlock":
                    console.log("saved PICTUREBLOCK");
                    blockObj.header = block.querySelector("h2").textContent;
                    blockObj.text = block.querySelector("p").textContent;
                    blockObj.imageUrl = block.querySelector("img").src;
                break;
            }
        }


    };


}

export const root = new Root();