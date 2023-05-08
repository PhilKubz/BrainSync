/* Chat generated socket.io implementation

const socket = io();

// Handle incoming messages
socket.on('message', message => {
  const chatLog = document.getElementById('chatLog');
  const shouldScrollToBottom = chatLog.scrollTop + chatLog.clientHeight === chatLog.scrollHeight;

  // Create new message element and append it to the chat log
  const messageElem = document.createElement('div');
  messageElem.classList.add('container', 'border', 'rounded', 'px-2', 'py-1');
  messageElem.innerHTML = `
    <div class="row p-2">
      <div class="col border rounded p-2" id="userName">${message.userName}</div>
      <div class="col-md-auto border rounded p-2" id="sentTime">${message.sentTime}</div>
    </div>
    <div class="col-md-auto border p-1 mx-3" id="userMessage" style="word-wrap: break-word;">${message.userMessage}</div>
  `;
  chatLog.appendChild(messageElem);

  // Scroll to bottom if necessary
  if (shouldScrollToBottom) {
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});

// Handle form submission
const form = document.getElementById('chatForm');
const userNameInput = document.getElementById('userNameInput');
const userMessageInput = document.getElementById('userMessageInput');

form.addEventListener('submit', e => {
  e.preventDefault();
  const userName = userNameInput.value.trim();
  const userMessage = userMessageInput.value.trim();

  if (userName && userMessage) {
    // Emit message to server
    socket.emit('message', {
      userName,
      userMessage,
      sentTime: new Date().toLocaleTimeString(),
    });

    // Clear input fields
    userMessageInput.value = '';
    userMessageInput.focus();
  }
});


*/