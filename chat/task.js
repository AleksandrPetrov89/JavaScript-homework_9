const dialog = document.getElementById("chat-widget__messages");

document.querySelector(".chat-widget__side").addEventListener("click", showChatWindow);

document.getElementById("chat-widget__input").addEventListener("keyup", communication, true);


function showChatWindow () {
    // Функция-обработчик, разворачивает/показывает окно чата и в случае простоя чата
    // в течение 30 сек - тормошит клиента, задавая ему вопрос
    document.querySelector(".chat-widget").classList.add("chat-widget_active");
    shakeUp();
};

function shakeUp () {
    // Функция, которая с задержкой в 30 сек задает произвольный вопрос в чате
    setTimeout( () => {
        if (document.querySelector(".message") == null) {
            let question = generatesMessage(questionSelection());
            dialog.innerHTML += question;
        };
    }, 30000);
};

function communication (e) {
    // Функция-обработчик. Если была нажата кнопка "Enter" и текстовое сообщение не пустое, то
    // сообщение отправляется в чат, а через 1 сек поступает ответ от ИИ чата в виде случайного сообщения.
    if (e.code === "Enter" && e.target.value.trim() != "") {
        let userMessage = generatesMessage(e.target.value.trim(), true);
        e.target.value = "";
        dialog.innerHTML += userMessage;
        scrolling();

        setTimeout( () => {
            let answer = generatesMessage(messageSelection());
            dialog.innerHTML += answer;
            scrolling();
        }, 1000);
    };
};

function messageSelection () {
    // Функция, которая выбирает произвольное сообщение из массива listMessages
    const listMessages = ["Доброе утро!", "Добрый день!", "Добрый вечер!", "Ты кто?", "Кто здесь?",
        "Да что Вы говорите?", "Самый умный, да?", "Сгинь, нечистая сила!", "Никого нет дома!"];
    let index = Math.floor (Math.random () * listMessages.length);
    return listMessages[index];
};

function generatesMessage (text, messageClient=false) {
    // Функция, которая формирует сообщение для виджета в виде HTML-разметки, представленной в виде строки.
    // text - текст сообщения
    // messageClient - параметр, определяющий от кого исходит сообщение: 
    //      false - от ИИ чата;   true - от клиента.
    let message = "";
    if (messageClient) {
        message = '<div class="message message_client">\n';
    } else {
        message = '<div class="message">\n';
    };
    let now = new Date;
    message += `    <div class="message__time">${now.toLocaleTimeString()}</div>\n` +
    `    <div class="message__text">${text}!</div>\n` + '</div>\n';
    return message;
};

function scrolling () {
    // Функция, которая осуществляет прокрутку окна чата до блока последнего комментария
    let messages = Array.from(document.getElementsByClassName("message"));
    messages[messages.length - 1].scrollIntoView();
};

function questionSelection () {
    // Функция, которая выбирает произвольный вопрос из массива questions
    const questions = ["Ты там живой?", "Чего притих?", "Кончились глупые вопросы?"];
    let index = Math.floor (Math.random () * questions.length);
    return questions[index];
};
