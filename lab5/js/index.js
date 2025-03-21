import { root } from "../js/root.js";
import { TextBlock, OrderedListBlock, PictureBlock} from "../js/blocks.js";

let editMode = false;

let tb = new TextBlock("ПЕРВЫЙ");
root.addBlock(tb);

let olb = new OrderedListBlock("ВТОРОЙ");
root.addBlock(olb);

let pb = new PictureBlock("ТРЕТИЙ");
root.addBlock(pb);


document.addEventListener("DOMContentLoaded", () => {

    root.render();

    let toggle = root.getEditModeToggle();
    toggle.addEventListener('change', () => {
        root.render();
        editMode = root.inEditMode();
    });
});


