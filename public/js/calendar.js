import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';


// $('#calendar').fullCalendar({
// 	header: {
// 		left: 'prev,next today',
// 		center: 'addEventButton',
// 		right: 'month,agendaWeek,agendaDay,listWeek'
// 	},
// 	defaultDate: '2018-11-16',
// 	navLinks: true,
// 	editable: true,
// 	eventLimit: true,
// 	events: [{
// 		title: 'Simple static event',
// 		start: '2018-11-16',
// 		description: 'Super cool event'
// 	},

// 	],
// 	customButtons: {
// 		addEventButton: {
// 			text: 'Add new event',
// 			click: function () {
// 				var dateStr = prompt('Enter date in YYYY-MM-DD format');
// 				var date = moment(dateStr);

// 				if (date.isValid()) {
// 					$('#calendar').fullCalendar('renderEvent', {
// 						title: 'Dynamic event',
// 						start: date,
// 						allDay: true
// 					});
// 				} else {
// 					alert('Invalid Date');
// 				}

// 			}
// 		}
// 	},
// 	dayClick: function (date, jsEvent, view) {
// 		var date = moment(date);

// 		if (date.isValid()) {
// 			$('#calendar').fullCalendar('renderEvent', {
// 				title: 'Dynamic event from date click',
// 				start: date,
// 				allDay: true
// 			});
// 		} else {
// 			alert('Invalid');
// 		}
// 	},
// });
var calendarstuff = document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
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
});
module.exports = calendarstuff;