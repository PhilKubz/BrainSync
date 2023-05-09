import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import bootstrapPlugin from '@fullcalendar/bootstrap';

document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendar');

	var calendar = new Calendar(calendarEl, {
		plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
		initialView: 'dayGridMonth',
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		events: [
			{
				title: 'Event 1',
				start: '2023-05-04T10:30:00',
				end: '2023-05-04T12:30:00'
			},
			{
				title: 'Event 2',
				start: '2023-05-05T12:00:00',
				end: '2023-05-05T13:30:00'
			},
			{
				title: 'Event 3',
				start: '2023-05-06T14:30:00',
				end: '2023-05-06T15:30:00'
			}
		]
	});

	calendar.render();
});
