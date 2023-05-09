import { Server } from "socket.io";

const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();


// Implement our connection config
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//socket.io Server
const io = new Server(PORT);

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
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.get('./public/css/styles.css', function (req, res) {
	res.set('Content-Type', 'text/css');
	res.sendFile(__dirname + '/public/css/styles.css');
});

app.get('./public/css/calendar.css', function (req, res) {
	res.set('Content-Type', 'text/css');
	res.sendFile(__dirname + '/public/css/calendar.css');
});

// Start the server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});

