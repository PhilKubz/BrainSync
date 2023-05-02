// Import necessary dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Render login page
router.get('/login', (req, res) => {
	res.render('login');
});

// Handle user login using Passport.js
router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;
