// Dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');


// Implement our connection config
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({helpers});

const sess = {
	secret: 'The brain is fascinating',
	cookie: {
		maxAge:300000,
		httpOnly: true,
		secure: false,
    	sameSite: 'strict',
	},
	resave: false,
  	saveUninitialized: true,
  	store: new SequelizeStore({
    	db: sequelize
  	})
};

app.use(session(sess));


// Set handlebars as the default engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});