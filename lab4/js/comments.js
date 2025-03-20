import { cookieGetComments, cookieInit, cookieSaveComments } from './cookies.js';

let comments = new Array();
comments = [...cookieGetComments()];
console.log(comments);
if (comments.length === 0){
    cookieInit();
    comments = [...cookieGetComments()];
}
ShowComments(comments);

/**
 * Конструктор объекта Comment
 * @param {string} text - Текст отзыва. 
 * @param {string} name - Имя пользователя.
 * @param {string} date - Дата отправки отзыва.
 * @param {Number} rating - Оценка пользователя.
 */
export function Comment(text, name, date, rating){
    this.text = text;
    this.name = name;
    this.date = date;
    this.rating = rating;
    this.id = comments.length
}

/**
 * Переводит цифровой формат оценки в строку из звёзд ☆ и ★.
 * @param {Number} rating - Оценка пользователя.
 * @returns {string} - Оценка в формате строки из звёзд.
 */
function numToStars(rating){
    return "★".repeat(rating) + "☆".repeat(5-rating);
}

/**
 * Возвращает строку с сегодняшней датой.
 * @returns {string} - Строка с датой в формате ГГГГ-ММ-ДД.
 */
function today(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

/**
 * Возращает отзыв в виде HTML
 * @param {Comment} comment - Отзыв.
 * @returns {string} - Строка с HTML кодом.
 */
function CommentHTML(comment){
    return (
        `<div class="comment">
                <div class="comment-header">
                    <p class="username">${comment.name}</p>
                    <p class="comment-date">${comment.date}</p>
                </div>
                <p class="comment-text">${comment.text}</p>
                <p class="rating">ОЦЕНКА: <span class="stars">${numToStars(comment.rating)}</span></p>
            </div>`
    );
}

/**
 * Отображает отзыв на странице сайта.
 * @param {Comment} comment - Отзыв.
 */
function showComment(comment){
    document.getElementById("commentsContainer").innerHTML += CommentHTML(comment);
}

/**
 * Отображает массив отзывов на странице сайта.
 * @param {Array<Comment>} comments - Массив отзывов.
 */
function ShowComments(comments){
    comments.forEach(comment => {
        showComment(comment);
    });
}

/**
 * Добавляет отзыв на страницу сайта и сохраняет в cookie.
 * @param {Comment} comment - Отзыв. 
 */
function addComment(comment){
    comments.push(comment);
    showComment(comment);
    cookieSaveComments(comments);
}

/**
 * Считывает данные с формы и создаёт новый отзыв.
 * @returns {Comment} - Отзыв.
 */
function getCommentFromForm(){
    let userName = document.getElementById('inputUsername').value;
    let date = today();
    let text = document.getElementById('inputComment').value;

    let rating;
    let ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(element => {
        if (element.checked) {
            rating = Number(element.value);
        }
    });

    return new Comment(text, userName, date, rating);
}

/**
 * Очищает поля формы.
 */
function clearForm(){
    document.getElementById('inputUsername').value = "";
    document.getElementById('inputComment').value = "";
    let ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(element => {
        element.checked = element.id == "rating1" ? true : false;
    });
}

/**
 * Сохранение и отправка отзыва.
 */
function sendComment(){
    let comment = getCommentFromForm();
    if (comment.name === "" || comment.text === ""){
        document.getElementById('inputUsername').placeholder= "ИМЯ ВВЕДИТЕ";
        document.getElementById('NO').play();
        return;
    } else {
        clearForm();
        addComment(comment);
        return;
    }

}

document.getElementById("sendButton").onclick = sendComment;