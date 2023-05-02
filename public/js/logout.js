// Import necessary dependencies
const express = require('express');
const router = express.Router();

// Handle user logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
});

module.exports = router;
