export class Block {
    constructor (header = ""){
        this.header = header;
        this.type = "Block";
        this._id = "";
    }

    getHTML = () => {
        return `<div></div>`
    };

    getType = () => {
        return this._type;
    };
}

export class TextBlock extends Block {
    /**
     * Создаёт блок текста.
     * @param {string} header - название блока (заголовок).
     * @param {string} text - основной текст.
     */
    constructor (header = "Заголовок", text = "Текст"){
        super(header);
        this.text = text;
        this.type = "TextBlock";
    }

    /**
     * Возвращает HTML предтавление блока.
     * @returns {string}
     */
    getHTML = (editMode) => {
        if (editMode){
            return `<div class="env">
                        <div class="block-tools">
                            <button name="deleteBlock" class="tool-button">
                                <img src="../img/delete-icon.svg" alt="Удалить" class="icon">
                            </button>
                            <button name="saveBlock" class="tool-button">
                                <img src="../img/save-icon.png" alt="Сохранить" class="icon">
                            </button>
                        </div>
                        <div class="block" id="${this._id}">
                            <h2 contenteditable="${editMode}">${this.header}</h2>
                            <p contenteditable="${editMode}">${this.text}</p>
                        </div>
                    </div>`
        }
        return `<div class="block" id="${this._id}">
                    <h2>${this.header}</h2>
                    <p>${this.text}</p>
                </div>`
    };
}

export class OrderedListBlock extends Block {

    constructor (header="Заголовок", items=["Элемент №1", "Элемент №3", "Элемент №4"]){
        super(header);
        this.items = items;
        this.type = "OrderedListBlock";
    }

    /**
     * Возвращает HTML предтавление блока.
     * @returns {string}
     */
        getHTML = (editMode) => {
            const listItems = this.items.map(item => `<li contenteditable="${editMode}">${item}</li>`).join('');

            if (editMode){
                return `<div class="env">
                            <div class="block-tools">
                                <button name="deleteBlock" class="tool-button">
                                    <img src="../img/delete-icon.svg" alt="Удалить" class="icon">
                                </button>
                                <button name="saveBlock" class="tool-button">
                                    <img src="../img/save-icon.png" alt="Сохранить" class="icon">
                                </button>
                            </div>
                            <div class="block" id="${this._id}">
                                <h2 contenteditable="${editMode}">${this.header}</h2>
                                <ol>${listItems}</ol>
                            </div>
                        </div>`
            }
            return `<div class="block" id="${this._id}">
                        <h2>${this.header}</h2>
                        <ol>${listItems}</ol>
                    </div>`
        };
}

export class PictureBlock extends Block {
    constructor(header = "Заголовок", text = "Текст", imageUrl = "../img/default.jpeg") {
        super(header);
        this.text = text;
        this.imageUrl = imageUrl;
        this.type = "PictureBlock";
    }

    /**
     * Возвращает HTML представление блока с изображением.
     * @returns {string}
     */
    getHTML = (editMode) => {

        if (editMode){
            return `<div class="env">
                        <div class="block-tools">
                            <button name="deleteBlock" class="tool-button">
                                <img src="../img/delete-icon.svg" alt="Удалить" class="icon">
                            </button>
                            <button name="uploadImage" class="tool-button">
                                <img src="../img/pic-icon.png" alt="Сохранить" class="icon">
                            </button>
                            <button name="saveBlock" class="tool-button">
                                <img src="../img/save-icon.png" alt="Сохранить" class="icon">
                            </button>
                        </div>
                        <div class="twopart-block" id="${this._id}">
                            <img src="${this.imageUrl}" alt="${this.header}">
                            <div class="block">
                                <h2 contenteditable="${editMode}">${this.header}</h2>
                                <p contenteditable="${editMode}">${this.text}</p>
                            </div>
                        </div>`
        }
        return `<div class="twopart-block" id="${this._id}">
                <img src="${this.imageUrl}" alt="${this.header}">
                <div class="block">
                    <h2>${this.header}</h2>
                    <p>${this.text}</p>
                </div>
            </div>`
    };
};
