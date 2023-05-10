const messageFormHandler = async (event) => {
  event.preventDefault();

  const author_id = document.querySelector('#author-details').value;
  const room_id = document.querySelector('#room-details').value;
  const content = document.querySelector('#userMessageInput').value;
  const sent_at = new Date();

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

