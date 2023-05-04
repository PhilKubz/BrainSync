// Dependencies
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// Implement our connection config
const sequelize = require('./config/connection');

const app = express();

// Set handlebars as the default engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Serve static files
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Import routes

const projectRoutes = require('./routes/projects');
app.use(projectRoutes);

const calendarRoutes = require('./routes/calendar');
app.use(calendarRoutes);

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
	console.log(`Server started on port: ${PORT}`);
});