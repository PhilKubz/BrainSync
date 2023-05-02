// Import necessary dependencies
const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error_msg', 'Please log in to view this page');
		res.redirect('/login');
	}
}

// Render user profile page
router.get('/profile', ensureAuthenticated, (req, res) => {
	res.render('profile', {
		user: req.user
	});
});

module.exports = router;
