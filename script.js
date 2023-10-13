const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');

function appendMessage(content, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type + '-message');

    const avatarImage = document.createElement('img');
    avatarImage.src = type === 'user' ? 'images/user-avatar.png' : 'images/bot-avatar.png';
    avatarImage.alt = type.charAt(0).toUpperCase() + type.slice(1);
    avatarImage.classList.add('avatar', type + '-avatar');

    const textNode = document.createTextNode(content);

    messageElement.appendChild(avatarImage);
    messageElement.appendChild(textNode);

    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessageToAPI(message) {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
    const apiEndpoint = 'http://e805-35-197-67-4.ngrok.io/chat';
    http://e805-35-197-67-4.ngrok.io
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.response; // Modify this based on your API response structure
        appendMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('Error sending message to API:', error);
    });
}

function handleUserInput(event) {
    if (event.key === 'Enter') {
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            appendMessage(userMessage, 'user');
            userInput.value = '';

            sendMessageToAPI(userMessage);
        }
    }
}

userInput.addEventListener('keydown', handleUserInput);
