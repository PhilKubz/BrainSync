function addEvent(event) {
	fetch('/events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(event)
	})
		.then(response => response.json())
		.then(data => {
			// add the new event to the calendar
			calendar.addEvent(data);

			// show a success message to the user
			alert('Event added successfully');
		})
		.catch(error => {
			console.error(error);
			alert('An error occurred while adding the event');
		});
}
