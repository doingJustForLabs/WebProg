const SIZE = 9;  
const MINES_COUNT = 20;
const FRAME_DIGITS = "⓪①②③④⑤⑥⑦⑧⑨";
const BOMB = "✱";
const FLAG = "✕";
const QUESTION_FLAG = "�";
const SECRET = "■";

let field; 
let revealed;
let marked;

function generateMines() {

    for (let i = 0; i < MINES_COUNT; i++) {
        let row = Math.floor(Math.random() * SIZE);
        let col = Math.floor(Math.random() * SIZE);
        if (field[row][col] !== "MINE") {
            field[row][col] = "MINE";
        } else {
            i--;
        }
    }
}

function countMines() {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {

            if (field[row][col] === "MINE") continue;

            let count = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {

                    let checkRow = row + i;
                    let checkCol = col + j;
                    if (checkRow >= 0 && checkRow < SIZE && checkCol >= 0 && checkCol < SIZE && field[checkRow][checkCol] == "MINE") {
                        count++;
                    }

                }
            }

            field[row][col] = count;
        }
    }
}

function createMask(event) {
    let mask = "";
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (revealed[row][col]){
                if (field[row][col] === "MINE") {
                    mask += ` ${BOMB} `
                } else {
                    mask += ` ${FRAME_DIGITS[field[row][col]]} `;
                }
            } else {
                switch (marked[row][col]){
                    case "X": mask += ` ${FLAG} `; break;
                    case "?": mask += ` ${QUESTION_FLAG} `; break;
                    case "0": mask += ` ${SECRET} `; break;
                    default: return;
                }
            }
            
        }

        if (event == "LOSE"){
            switch (row) {
                case 0: mask += " | ИГРА \"САПЁР\"\n"; break;
                case 1: mask += " | БАХ! Вы попали на мину!\n"; break;
                case 2: mask += " | Игра окончена :C\n"; break;
                case 3: mask += " | Попробуйте ещё раз!\n"; break;
                case SIZE-1: mask += " |"; break;
                default: mask += " |\n"
            }
        } else {
            if (event == "WIN") {
                switch (row) {
                    case 0: mask += " | ИГРА \"САПЁР\"\n"; break;
                    case 1: mask += " | Поздравляем!\n"; break;
                    case 2: mask += " | Вы разминировали поле!\n"; break;
                    case 3: mask += " | Отличная работа!\n"; break;
                    case SIZE-1: mask += " |"; break;
                    default: mask += " |\n"
                }
            } else {
                switch (row) {
                    case 0: mask += " | ИГРА \"САПЁР\"\n"; break;
                    case 1: mask += " | Чтобы открыть клетку, введите\n"; break;
                    case 2: mask += " | её координаты через пробел\n"; break;
                    case 3: mask += " | (в порядке: <строка> <колонка>).\n"; break;
                    case 4: mask += " | Вы можете отметить клетку,\n"; break;
                    case 5: mask += " |  добавив через пробел флаг (-!, -?)\n"; break;
                    case 6: mask += " | \n"; break;
                    case 7: mask += " | Для победы необходимо открыть\n"; break;
                    case 8: mask += " | все клетки без бомб."; break;
                }
            }
        }

    }
    return mask;
}

function play() {

    field = Array.from({ length: SIZE }, () => Array(SIZE).fill(0)); 
    revealed = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
    marked = Array.from({ length: SIZE }, () => Array(SIZE).fill("0"));

    generateMines();
    countMines();
    
    let safeCells = SIZE * SIZE - MINES_COUNT;
    let openedCells = 0;

    while (openedCells < safeCells) {
        let input = prompt(createMask());
        if (!input) return;

        let [row, col, meta] = input.split(" ");

        row = Number(row);
        col = Number(col);
        
        if (isNaN(row) || isNaN(col) || row < 1 || row > SIZE || col < 1 || col > SIZE) {
            alert(`Неверный ввод! Введите два числа от 1 до ${SIZE}.`);
            continue;
        } else {
            row--;
            col--;
        }

        switch (meta){

            case "-!": marked[row][col] = marked[row][col] == "X" ? "0" : "X"; break;
            case "-?": marked[row][col] = marked[row][col] == "?" ? "0" : "?"; break;
            default:             
                if (revealed[row][col]) {
                alert("Эта клетка уже открыта!");
                continue;
                }

                revealed[row][col] = true;
        
                if (field[row][col] === "MINE") {
                    revealed = Array.from({ length: SIZE }, () => Array(SIZE).fill(true));
                    alert(createMask("LOSE"));
                    return;
                }
        
                openedCells++;
        }

    }

    alert(createMask("WIN"));

}
