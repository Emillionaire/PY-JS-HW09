// Opening chat window
const chatWindow = document.getElementsByClassName('chat-widget')[0]

chatWindow.addEventListener(('click'), chatWindowHandler)

function chatWindowHandler () {
    chatWindow.classList.add('chat-widget_active')
}

// Sending nonempty message
const chatInputBox = document.getElementById('chat-widget__input')
const messages = document.querySelector('.chat-widget__messages')
const scrollingWindow = document.getElementsByClassName('chat-widget__messages-container')[0]
const autoAnswers = [
    'Здравствуйте! Плохого вам дня, досвидания!',
    'Не понял вашего запроса, попробуйте научиться писать.',
    'Ваш запрос обрабатывается, ожидайте бесконечность.',
    'Сюда не пишите!',
    'Это не тот чат который вы ищите...',
    'Мы закрыты, не работаем.'
]
const waitTimer = 0

waiter()
chatInputBox.addEventListener(('keypress'), inputBoxSendHandler)

async function inputBoxSendHandler (e) {
    if (e.key === 'Enter' && e.target.value != '') {
        // Question
        renderQuestion(e)

        // Bot thinking
        await sleep(Math.random() * 2000)

        // Answer
        renderAnswer(e)

        // Autoscrolling to end dialogue
        scrollingWindow.scrollTop = scrollingWindow.scrollHeight
    }
}

function sleep(ms) {
    var start = Date.now(), expire = start + ms;
    while (Date.now() < expire) {}
    return;
}

function renderQuestion (e) {
    messages.innerHTML += `
    <div class="message message_client">
        <div class="message__time">
            ${new Date().toLocaleTimeString()}
        </div>
        <div class="message__text">
            ${e.target.value}
        </div>
    </div>
    `;
}

function renderAnswer (e) {
    indexRandomAnswer = Math.floor(Math.random() * autoAnswers.length)
    messages.innerHTML += `
        <div class="message">
            <div class="message__time">
                ${new Date().toLocaleTimeString()}
            </div>
            <div class="message__text">
                ${autoAnswers[indexRandomAnswer]}
            </div>
        </div>
    `;
}

// Question when 3 sec waiting
async function waiter () {
    var start = Date.now(), expire = start + 3000;
    while (Date.now() < expire) {}
    messages.innerHTML += `
        <div class="message">
            <div class="message__time">
                ${new Date().toLocaleTimeString()}
            </div>
            <div class="message__text">
                'Ну-у-у-у???'
            </div>
        </div>
    `;
    return;
}