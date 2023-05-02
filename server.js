const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static('public'));

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