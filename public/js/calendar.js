import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

document.addEventListener('DOMContentLoaded', function () {
	const calendarEl = document.getElementById('calendar');
	const calendar = new Calendar(calendarEl, {
		plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrapPlugin],
		initialView: 'dayGridMonth',
		timeZone: 'UTC',
		themeSystem: 'bootstrap5',
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
		},
		aspectRatio: 4,
		weekNumbers: false,
		dayMaxEvents: true, // allow "more" link when too many events
		events: [
			{
				id: 'a',
				title: 'my event',
				start: '2018-09-01'
			}
		]
	});

	calendar.render();

	const addButtonEl = document.createElement('button');
	addButtonEl.innerText = 'Add new event';
	addButtonEl.addEventListener('click', function () {
		const dateStr = prompt('Enter date in YYYY-MM-DD format');
		const date = moment(dateStr);

		if (date.isValid()) {
			const newEvent = {
				title: 'Dynamic event',
				start: date,
				allDay: true
			};

			calendar.addEvent(newEvent);
		} else {
			alert('Invalid date');
		}
	});

	calendar.setOption('customButtons', {
		addEventButton: {
			text: 'Add new event',
			click: function () {
				addButtonEl.click();
			}
		}
	});

	calendar.setOption('headerToolbar', {
		left: 'prev,next today',
		center: 'title',
		right: 'addEventButton dayGridMonth,timeGridWeek,timeGridDay,listMonth'
	});
});