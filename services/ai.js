// Добавляем обработчики событий для кнопки отправки и ввода сообщения
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Отправка сообщения пользователя
function sendMessage() {
    console.log("sendMessage() called");

    const userInput = document.getElementById('chat-input').value.trim();
    if (!userInput) {
        console.log("User input is empty. Exiting sendMessage().");
        return;
    }

    console.log(`User input: ${userInput}`);
    appendMessage(userInput, 'user-message');
    document.getElementById('chat-input').value = ''; // Очищаем поле ввода
    setTypingStatus(true);
    fetchChatGPTResponse(userInput);
}

// Добавление сообщения в чат
function appendMessage(text, className) {
    console.log(`appendMessage() called with text: "${text}" and className: "${className}"`);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = text;

    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString();
    messageElement.appendChild(timestamp);

    const chatContent = document.getElementById('chat-content');
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;

    console.log("Message appended to chat content.");
}

// Установка статуса "печатает" или "онлайн"
function setTypingStatus(isTyping) {
    console.log(`setTypingStatus() called with isTyping: ${isTyping}`);

    const statusElement = document.getElementById('chat-status');
    const typingGif = statusElement.querySelector('img');
    const statusText = statusElement.querySelector('span');

    if (isTyping) {
        typingGif.style.display = 'inline-block';
        statusText.textContent = 'печатает...';
    } else {
        typingGif.style.display = 'none';
        statusText.textContent = 'онлайн';
    }

    console.log(`Chat status updated to: ${statusText.textContent}`);
}

// Запрос к API ChatGPT
async function fetchChatGPTResponse(userInput) {
    console.log("fetchChatGPTResponse() called");

    const apiKey = 'sk-dJDLYgERsgO2PN3kdgDOz8cbmnC3aBeu'; 
    const url = 'https://api.proxyapi.ru/openai/v1/chat/completions';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", 
                messages: [{ role: "user", content: userInput }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response data:", data);

        const chatbotResponse = data.choices[0]?.message?.content;
        if (!chatbotResponse) {
            throw new Error("Chatbot response is missing in the API response.");
        }

        console.log(`Chatbot response: "${chatbotResponse}"`);

        setTypingStatus(false);
        appendMessage(chatbotResponse, 'bot-message');
    } catch (error) {
        console.error('Error in fetchChatGPTResponse:', error);
        setTypingStatus(false);
        appendMessage(error, 'bot-message');
    }
}
