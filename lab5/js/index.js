import { root } from "../js/root.js";
import { TextBlock, OrderedListBlock, PictureBlock} from "../js/blocks.js";

let editMode = false;

let tb1 = new TextBlock("ПЕРВЫЙ");
root.addBlock(tb1);

let tb2 = new TextBlock("ВТОРОЙ");
root.addBlock(tb2);

let tb3 = new TextBlock("ТРЕТИЙ");
root.addBlock(tb3);


document.addEventListener("DOMContentLoaded", () => {

    root.render();

    let toggle = root.getEditModeToggle();
    toggle.addEventListener('change', () => {
        root.render();
        editMode = root.inEditMode();
    });
});


