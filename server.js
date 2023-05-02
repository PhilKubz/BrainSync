const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static('public'));

// Import routes
const HomeRoutes = require('./routes/home');
app.use(HomeRoutes);

const projectRoutes = require('./routes/project');
app.use(projectRoutes);

const communicationsRoutes = require('./routes/communication');
app.use(communicationsRoutes);

const calendarRoutes = require('./routes/calendar');
app.use(calendarRoutes);

const fileTabRoutes = require('./routes/fileTab');
app.use(fileTabRoutes);

// Add your routes
app.get('/', (req, res) => {
	res.render('home', {
		username: 'John Doe',
		studyGroups: [
			{ name: 'Math 101' },
			{ name: 'Physics 202' },
			{ name: 'Chemistry 303' }
		]
	});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});