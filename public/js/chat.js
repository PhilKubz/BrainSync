/*import { io } from "socket.io-client";
/*
    PROBLEMS:
        1. I have NO idea at this exact moment how to call SQL to get the user message itself, the username, or the time sent.

const socket = io("ws://infinite-fjord-15703.herokuapp.com/communications");

/*const chatLogEl = document.getElementById("chatLog");
const userMessageEl = document.getElementById("userMessageInput");
const sendButtonEl = document.getElementById("sendButton");

$(document).jquery(function () {
    // Please add code here to get the userName and userMessage from the SQL, sentTime is an added bonus.
    
    // Recieving Messages
    socket.on(messageInput => {
        $(chatLogEl).append(messageInput);
    });

    // Sending Messages
    sendButtonEl.addEventListener("click", function() {
        let messageOutput = (
            `<div class="container border rounded px-2 py-1">
              <div class="row p-2">
                <div class="col border rounded p-2" id="userName">
                  ${userName}
                </div>
                <div class="col-md-auto border rounded p-2" id="sentTime">
                  ${sentTime}
                </div>
              </div>
              <div class="col-md-auto border p-1 mx-3" id="userMessage" style="word-wrap: break-word;">
                ${userMessageEl}
              </div>
            </div>`
          );
        $(chatLogEl).append(messageOutput);
        socket.emit(messageOutput);
    });
});*/

const messageFormHandler = async (event) => {
  event.preventDefault();

  const author_id = session.user_id;
  const room_id = document.querySelector('#room-details').value;
  const content = document.querySelector('#userMessageInput').value;
  const sent_at = new Date();

  console.log("Handler accessed " + author_id, room_id, content, sent_at);

  if (content){
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({content, room_id, author_id, sent_at}),
      headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace(`/communications/${room_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#chatInput').addEventListener('submit', messageFormHandler);