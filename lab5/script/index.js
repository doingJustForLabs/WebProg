class Deletable {
    // Метод для удаления элемента (блоков или сабблоков)
    removeItem(items, index) {
        if (index !== -1) {
            items.splice(index, 1);
        }
    }
}

class Block {
    constructor(data, type) {
        this.data = data;
        this.type = type;
        this.isEditing = false || data.isEditing;
        this.deletable = new Deletable();
    }

    toHTML() {
        throw new Error("Method 'toHTML()' must be implemented.");
    }

    toggleEditing() {
        this.isEditing = !this.isEditing;
        // buildPage(blocks); // Добавляем перерисовку страницы после изменения состояния
    }

    // Кнопки удаления блока
    renderRemoveBlockButton(index) {
        // return this.isEditing ? `<button class="remove-block-btn" data-block-index="${index}">Удалить блок</button>` : '';
        return `<button class="remove-block-btn hidden" data-block-index="${index}">Удалить блок</button>`;
    }
    // удаление подблоков кнопка
    renderRemoveSubblockButton(blockIndex, subIndex) {
        return `<button class="remove-subblock-btn" data-block-index="${blockIndex}" data-sub-index="${subIndex}">Удалить подблок</button>`;
    }

    removeBlock(blocks, blockIndex) {
        this.deletable.removeItem(blocks, blockIndex);
    }

    removeSubblock(subIndex) {
        if (this.data.subblocks && this.data.subblocks[subIndex]) {
            this.deletable.removeItem(this.data.subblocks, subIndex);
        }
    }

    // Кнопка для добавления подблоков
    renderAddSubblockButton() {
        return `<button class="add-subblock-btn">Добавить подблок</button>`;
    }

    // Добавление подблока
    addSubblockToBlock(subblock) {
        if (!this.data.subblocks) {
            this.data.subblocks = [];
        }
        this.data.subblocks.push(subblock);
    }
}


class HeaderBlock extends Block {
    constructor(data) {
        super(data, 'HeaderBlock');
    }

    toHTML() {
        return `
            <div class="card" contenteditable="${this.isEditing}">
                <h1>${this.data.content}</h1>
            </div>
        `;
    }
}

class TextBlock extends Block{
    constructor(data){
        super({
            title: data.title || '',
            subblocks: (data.subblocks || []).map(sub => 
                new SubBlock((sub.params || []).map(p => ({...p})))
            ),
            isEditing: data.isEditing // Добавляем сохранение состояния
        }, 'TextBlock');
    }

    toHTML(index) {
        const subblocksHTML = this.data.subblocks.map((subblock, subIndex) => `
            <div class="subblock">
                ${subblock.toHTML()}
                ${this.renderRemoveSubblockButton(index, subIndex)}
            </div>
        `).join('');

        return `
            <div class="card" contenteditable="${this.isEditing}" data-block-index="${index}">
                <h2>${this.data.title || 'Умное название'}</h2>
                <!-- <p>${this.data.content}</p> --!>
                ${subblocksHTML}
                ${this.renderAddSubblockButton()}
                ${this.renderRemoveBlockButton(index)}
            </div>
        `;
    }
    // addSubblockToBlock(subblock) {
    //     super.addSubblockToBlock(subblock); // Используем метод родителя для добавления
    // }
}

// dont touch, son, it doesn't work   (UPD: yeahhh)
/**
 * Подблоки внутри блока TextBlock
 */
class SubBlock {                // Если вы видите этот класс незакомменченным, то автор либо умер, либо чёт в жизни у него не то //UPD: 20/03/2025 12:09 - It is working
    constructor(params, id) {
        this.id = id || Date.now() + Math.random(); // Учитываем переданный ID
        this.params = params.map(p => ({ 
            ...p,
            id: p.id || Date.now() + Math.random() // Генерируем ID для параметра, если его нет
        }));
    }

    toHTML() {
        if (this.params.length === 0) {
            return `<div class="subblock" data-subblock-id="${this.id}">Параметры отсутствуют</div>`;
        }

        return `
            <div class="subblock" data-subblock-id="${this.id}">
                <!-- <h4>${this.title}</h4> --!>
                <ul>
                    ${this.params.map(param => `
                        <li data-param-id="${param.id}">
                            ${param.name}: ${param.value}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}

class StatsBlock extends Block {
    constructor(data) {
        super(data, 'StatsBlock');
    }

    toHTML(index) {
        return `
            <div class="card" contenteditable="${this.isEditing}" data-block-index="${index}">
                <h2>${this.data.title || 'Характеристики'}</h2>
                <ul>
                    ${this.data.stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join('')}
                </ul>
                ${this.renderRemoveBlockButton(index)}
            </div>
        `;
    }
}

class SkillsBlock extends Block {
    constructor(data) {
        super(data, 'SkillsBlock');
    }

    toHTML(index) {
        return `
            <div class="card" contenteditable="${this.isEditing}" data-block-index="${index}">
                <h2>${this.data.title || 'Навыки'}</h2>
                <ul>
                    ${this.data.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
                ${this.renderRemoveBlockButton(index)}
            </div>
        `;
    }
}

class InventoryBlock extends Block {
    constructor(data) {
        super(data, 'InventoryBlock');
    }

    toHTML(index) {
        return `
            <div class="card" contenteditable="${this.isEditing}" data-block-index="${index}">
                <h2>${this.data.title || 'Инвентарь'}</h2>
                <ul>
                    ${this.data.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
                ${this.renderRemoveBlockButton(index)}
            </div>
        `;
    }
}

function addSubblock(buttonElement, blocks){
    const blockElement = buttonElement.closest('.card');
    const blockIndex = parseInt(blockElement.dataset.blockIndex);

    const block = blocks[blockIndex];

    block.addSubblockToBlock(new SubBlock(
        [{
            name: `Параметр ${block.data.subblocks.length + 1}`,
            value: '',
            id: Date.now() + Math.random()
        }],
        Date.now() + Math.random() // Генерируем уникальный ID для подблока
    ));
    console.log('Added subblock to block:', blockIndex, block);
    console.log('Current subblocks:', block.data.subblocks);
    buildPage(blocks);
}

function removeSubblock(buttonElement, blocks){
    const blockIndex = parseInt(buttonElement.dataset.blockIndex);
    const subblockIndex = parseInt(buttonElement.dataset.subIndex);
    
    console.log("Удаление подблока:", blockIndex, subblockIndex); // Для отладки

    if (!isNaN(blockIndex) && !isNaN(subblockIndex)) {
        const block = blocks[blockIndex];
        block.removeSubblock(subblockIndex);
        buildPage(blocks);
    } else {
        console.error("Некорректные индексы:", blockIndex, subblockIndex);
    }
}

function removeBlock(buttonElement, blocks) {
    const blockIndex = parseInt(buttonElement.dataset.blockIndex);
    const block = blocks[blockIndex];
    block.removeBlock(blocks, blockIndex);
    buildPage(blocks);
}

function buildPage(blocks) {
    const blocksContainer = document.getElementById('blocks-container');

    const prevStates = blocks.map(block => block.isEditing);

    // blocksContainer.innerHTML = ''; // Очищаем только контейнер с блоками
    // blocks.forEach((block, index) => {
    //     blocksContainer.innerHTML += block.toHTML(index);
    // });

    blocksContainer.innerHTML = '';
    blocks.forEach((block, index) => {
        // Восстанавливаем состояние перед рендерингом
        block.isEditing = prevStates[index];
        blocksContainer.innerHTML += block.toHTML(index);
    });

    // Обновляем атрибуты contenteditable
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.setAttribute('contenteditable', blocks[index].isEditing);
    });
}

function restoreBlocks(savedBlocks) {
    const restoredBlocks = savedBlocks.map(block => {
        if (!block.type) {
            console.error('Block type is missing:', block);
            return null; // Пропустить блок без типа
        }
        switch (block.type) {
            case 'HeaderBlock':
                return new HeaderBlock(block.data);
            case 'StatsBlock':
                return new StatsBlock(block.data);
            case 'SkillsBlock':
                return new SkillsBlock(block.data);
            case 'InventoryBlock':
                return new InventoryBlock(block.data);
            case 'TextBlock':
                return new TextBlock({
                    title: block.data.title || '',
                    subblocks: (block.data.subblocks || []).map(sub => ({
                        id: sub.id, // Передаем сохраненный ID
                        params: sub.params.map(p => ({
                            ...p,
                            id: p.id // Сохраняем ID параметра
                        }))
                    })),
                    isEditing: block.data.isEditing // Восстанавливаем состояние
                });
            default:
                throw new Error(`Unknown block type: ${block.type}`);
        }
    }).filter(block => block !== null); // Удалить пропущенные блоки

    console.log('After restoring:', restoredBlocks);
    return restoredBlocks;
}

function isValidNumber(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

document.addEventListener('DOMContentLoaded', () => {
    let savedBlocks = JSON.parse(localStorage.getItem('blocks')) || [
        { type: 'HeaderBlock', data: { content: 'Эльф-лучник' } },
        { type: 'StatsBlock', data: { 
            title: 'Характеристики',
            stats: [
            { name: 'Сила', value: 12 },
            { name: 'Ловкость', value: 18 },
            { name: 'Интеллект', value: 14 }
        ] } },
        { type: 'SkillsBlock', data: { 
            title: 'Навыки',
            skills: ['Стрельба из лука', 'Скрытность', 'Выживание'] 
        } },
        { type: 'InventoryBlock', data: { 
            title: 'Инвентарь',
            items: ['Лук', 'Стрелы', 'Палатка'],
        } }
    ];

    let blocks = restoreBlocks(savedBlocks);

    buildPage(blocks);

    // Контейнер для кнопок
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'controls';
    document.body.prepend(controlsContainer);

    // Сохранение изменений
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    controlsContainer.append(saveButton);

    saveButton.addEventListener('click', () => {
        const blocksContainer = document.getElementById('blocks-container');

        blocks.forEach((block, index) => {
            const blockElement = blocksContainer.children[index];

            switch (block.type) {
                case 'HeaderBlock':
                    block.data.content = blockElement.querySelector('h1').innerText;
                    break;
                case 'StatsBlock':
                    block.data.title = blockElement.querySelector('h2').innerText;
                    block.data.stats = Array.from(blockElement.querySelectorAll('li')).map(li => {
                        const [name, value] = li.innerText.split(':').map(s => s.trim());
                        if (!isValidNumber(value)) {
                            alert(`Ошибка: значение для "${name}" должно быть числом!`);
                            return {
                                name,
                                value: 0
                            }
                        }
                        
                        return { 
                            name, 
                            value: Number(value) // Преобразуем в число
                        }
                    });

                    break;
                case 'SkillsBlock':
                    block.data.skills = Array.from(blockElement.querySelectorAll('li')).map(li => li.innerText);
                    break;
                case 'InventoryBlock':
                    block.data.items = Array.from(blockElement.querySelectorAll('li')).map(li => li.innerText);
                    break;
                case 'TextBlock':
                    block.data.title = blockElement.querySelector('h2').innerText;
                    // block.data.content = blockElement.querySelector('p').innerText;
                    const subblocksInDOM = Array.from(blockElement.querySelectorAll('.subblock'));
                    const updatedSubblocks = subblocksInDOM.map(subblockElement => {
                        const subId = subblockElement.dataset.subblockId;
                        const existingSub = block.data.subblocks.find(s => s.id == subId); // надо использовать просто ==, а не ===, гном
                        
                        if (!existingSub) {
                            console.warn(`Не найден существующий подблок с ID: ${subId}. Пропускаю создание нового.`);
                            return null;  // Не создаём новый, если подблок не найден
                        }
                    
                        existingSub.params = Array.from(subblockElement.querySelectorAll('li')).map(li => {
                            const paramId = li.dataset.paramId;
                            const [name, value] = li.innerText.split(':').map(s => s.trim());
                            return {
                                id: paramId || Date.now() + Math.random(),
                                name: name || "Параметр",
                                value: value || ""
                            };
                        });
                    
                        return existingSub;
                    }).filter(sub => sub !== null);  // Исключаем пустые значения
                    
                    block.data.subblocks = updatedSubblocks;
                    console.log(`Block ${index} subblocks after update:`, block.data.subblocks);
                    break;
            }

            // Выключаем редактирование после сохранения
            // block.isEditing = false;
            // block.toggleEditing();
            console.log(block.isEditing);
        });
        localStorage.setItem('blocks', JSON.stringify(blocks.map(block => ({
            type: block.type,
            data: {
                ...block.data,
                isEditing: block.isEditing, // Сохраняем состояние
                subblocks: (block.data.subblocks || []).map(sub => ({
                    id: sub.id, // Сохраняем ID подблока
                    params: sub.params.map(p => ({
                        id: p.id, // Сохраняем ID параметра
                        name: p.name,
                        value: p.value
                    }))
                }))
            }
        }))));
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.setAttribute('contenteditable', 'false');
        });
        console.log('After saving:', JSON.parse(localStorage.getItem('blocks')));
        // buildPage(blocks);
        alert('Изменения сохранены!');
    });

    console.log('Before saving:', blocks);

    // Добавление нового текстового блока
    const addTextBlockButton = document.createElement('button');
    addTextBlockButton.textContent = 'Добавить блок';
    controlsContainer.append(addTextBlockButton);

    addTextBlockButton.addEventListener('click', () => {
        // Проверяем режим редактирования только для нового блока
        const isAnyEditing = blocks.some(block => block.isEditing);
        
        if (!isAnyEditing) {
            alert('Для добавления блока включите режим редактирования!');
            return;
        }

        // Создаем новый блок сразу в режиме редактирования
        const newBlock = new TextBlock({ 
            title: 'Новый блок',
            subblocks: [],
            isEditing: true // Явно устанавливаем режим редактирования
        });
        
        blocks.push(newBlock);
        buildPage(blocks);
        
        // Сохраняем состояние редактирования для всех блоков
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.setAttribute('contenteditable', blocks[index].isEditing);
        });
    });

    // Режим редактирования
    const editToggle = document.createElement('button');
    editToggle.textContent = 'Редактировать';
    controlsContainer.append(editToggle);

    editToggle.addEventListener('click', () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const isEditing = card.getAttribute('contenteditable') === 'true';
            // Синхронизируем состояние с объектом блока
            blocks[index].isEditing = !isEditing; 
            card.setAttribute('contenteditable', !isEditing);
        });
    });

    // Удаление последнего блока
    // const removeBlockButton = document.createElement('button');
    // removeBlockButton.textContent = 'Удалить последний блок';
    // controlsContainer.append(removeBlockButton);

    // removeBlockButton.addEventListener('click', () => {
    //     if (blocks.length > 1) {
    //         blocks.pop();
    //         buildPage(blocks);
    //     }
    // });

    // Назначаем обработчик на родительский элемент
    document.getElementById('blocks-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-subblock-btn')) {
            addSubblock(e.target, blocks);
        }
        if (e.target.classList.contains('remove-subblock-btn')) {
            removeSubblock(e.target, blocks);
        }

        if (e.target.classList.contains('remove-block-btn')) {
            removeBlock(e.target, blocks);
        }
    });
});

// localStorage.removeItem('blocks');