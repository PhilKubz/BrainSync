const express = require('express');
const router = express.Router();
const passport = require('passport');
const DropboxStrategy = require('passport-dropbox-oauth2').Strategy;

const DROPBOX_APP_KEY = process.env.DROPBOX_APP_KEY;
const DROPBOX_APP_SECRET = process.env.DROPBOX_APP_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

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
		res.redirect('http://localhost:3001/filesTab');
	});

router.get('/filesTab', function (req, res, next) {
	res.redirect('http://localhost:3001/filesTab');
});

module.exports = router;
