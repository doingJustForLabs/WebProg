import { Comment} from './comments.js';


/**
 * Создаёт отзывы по умолчанию.
 */
export function cookieInit(){
    let initComments = new Array();
    initComments.push(new Comment("Ребёнок ВИЗЖИТ от восторга! Всем советую приобрести это чудо!", "Марина", "2001-03-05", 5));
    initComments.push(new Comment("чей ребёнок на фото", "ОЛЕГ", "2001-14-02", 1));
    initComments.push(new Comment("Теперь сайт ещё ужаснее... простите, пожалуйста<br>P.S.: не ломайте свет.", "Михаил", "2025-12-03", 3));
    cookieSaveComments(initComments);
}


/**
 * Переводит массив отзывов в формат JSON.
 * @param {Array<Comment>} comments - Массив отзывов.
 * @returns {string} Строка формата JSON.
 */
function commentsToJSON(comments){
    return JSON.stringify(comments);
}

/**
 * Сохраняет отзывы в cookie.
 * @param {Array<Comment>} comments - Массив отзывов.
 */
export function cookieSaveComments(comments){
    const expires = new Date();
    expires.setTime(expires.getTime() + (7*24*60*60*1000));
    document.cookie = `comments=${commentsToJSON(comments)}; expires=${expires.toUTCString()}`;
}

/**
 * Достаёт отзывы из cookie.
 * @return {Array<Comment>} - Массив отзывов.
 */
export function cookieGetComments(){

    const cookieArr = document.cookie.split(';');

    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();
        if (cookie.indexOf("comments=") === 0) {
            console.log(JSON.parse(decodeURIComponent(cookie.substring("comments=".length, cookie.length))));
            return JSON.parse(decodeURIComponent(cookie.substring("comments=".length, cookie.length)));
        }
    }
    return [];
}