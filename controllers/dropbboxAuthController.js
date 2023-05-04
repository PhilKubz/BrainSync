const express = require('express');
const router = express.Router();
const passport = require('passport');
const DropboxStrategy = require('passport-dropbox-oauth2').Strategy;

const DROPBOX_APP_KEY = 'YOUR_APP_KEY';
const DROPBOX_APP_SECRET = 'YOUR_APP_SECRET';
const CALLBACK_URL = 'http://localhost:3000/auth/dropbox/callback'; // Replace with your callback URL

passport.use(new DropboxStrategy({
	clientID: DROPBOX_APP_KEY,
	clientSecret: DROPBOX_APP_SECRET,
	callbackURL: CALLBACK_URL
},
	function (accessToken, refreshToken, profile, done) {
		// You can store the accessToken and refreshToken in your user model, if necessary
		return done(null, profile);
	}
));

router.get('/dropbox', passport.authenticate('dropbox'));

router.get('/dropbox/callback',
	passport.authenticate('dropbox', { failureRedirect: '/login' }),
	function (req, res) {
		// Successful authentication, redirect to the files page.
		res.redirect('/files');
	});

module.exports = router;
