const updateRoomFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#room-name').value;
    const id =  document.querySelector('#room-id').value;
  
    if (name) {
      const response = await fetch(`/api/rooms/${id}` ,{
        method: 'PUT',
        body: JSON.stringify({name}),
        headers: {'Content-Type': 'application/json'}
      });
  
      if(response.ok){
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  
};

const deleteRoomFormHandler = async (event) => {
    event.preventDefault();
  
    const id =  document.querySelector('#room-id').value;

    const response = await fetch(`/api/rooms/${id}` ,{
        method: 'DELETE'
    });

    if(response.ok){
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};
  
const updateMemberFormHandler = async (event) => {
    event.preventDefault();

    
};
  
const deleteMemberFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#member_id').value;
    const room_id = document.querySelector('#room_id').value;

    const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE'
    });


    if(response.ok){
        document.location.replace(`/communications/${room_id}`);
    } else {
        alert(response.statusText);
    }
};
  
const createMemberFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#user-email').value;
    const room_id = document.querySelector('#room-id').value;

    if(email){
        const response = await fetch('/api/members/' ,{
            method: 'POST',
            body: JSON.stringify({email, room_id}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok){
            document.location.replace(`/communications/${room_id}`);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#room-update').addEventListener('click', updateRoomFormHandler);

document.querySelector('#room-delete').addEventListener('click', deleteRoomFormHandler);

document.querySelector('#member-update').addEventListener('click', updateMemberFormHandler);

document.querySelector('#member-delete').addEventListener('click', deleteMemberFormHandler);

document.querySelector('#member-create').addEventListener('click', createMemberFormHandler);