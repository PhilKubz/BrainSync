document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendar');

	if (calendarEl) {
		var calendar = new FullCalendar.Calendar(calendarEl, {
			plugins: [FullCalendar.DayGridPlugin],
			initialView: 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay'
			}
		});

		calendar.render();
	}
});