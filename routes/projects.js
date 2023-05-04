const express = require('express');
const router = express.Router();

router.get('/projects', (req, res) => {
	res.send('Projects page');
});

module.exports = router;