export class Block {
    constructor (header = ""){
        this.header = header;
        this._type = "Block";
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
        this._type = "TextBlock";
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
                            <button name="editTextBlock" class="tool-button">
                                <img src="../img/edit-icon.svg" alt="Изменить" class="icon">
                            </button>
                        </div>
                        <div class="block" id="${this._id}">
                            <h2>${this.header}</h2>
                            <p>${this.text}</p>
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
        this._type = "OrderedListBlock";
    }

    /**
     * Возвращает HTML предтавление блока.
     * @returns {string}
     */
        getHTML = () => {
            const listItems = this.items.map(item => `<li>${item}</li>`).join('');

            return `
            <div class="block" id="${this._id}">
                <h2>${this.header}</h2>
                <ol>${listItems}</ol>
            </div>`;
        };
}

export class PictureBlock extends Block {
    constructor(header = "Заголовок", text = "Текст", imageUrl = "../img/default.jpeg") {
        super(header);
        this.text = text;
        this.imageUrl = imageUrl;
        this._type = "PictureBlock";
    }

    /**
     * Возвращает HTML представление блока с изображением.
     * @returns {string}
     */
    getHTML = () => {
        return `
            <div class="twopart-block" id="${this._id}">
                <img src="${this.imageUrl}" alt="${this.header}">
                <div class="block">
                    <h2>${this.header}</h2>
                    <p>${this.text}</p>
                </div>
            </div>
        `;
    };
};
