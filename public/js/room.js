const createRoomFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#room-name').value;

    if(name){
        const response = await fetch('/api/rooms', {
            method: 'POST',
            body: JSON.stringify({name}),
            headers: {'Content-Type' : 'application/json'},
        });

        if(response.ok) {
            document.location.replace(`/`);
        } else {
            alert(response.statusText);
        }
    }
};



document.querySelector('.room-creation-form').addEventListener('submit', createRoomFormHandler);

