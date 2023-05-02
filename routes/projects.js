const express = require('express');
const router = express.Router();

router.get('/projects', (req, res) => {
	const projectsData = {
		projects: [
			// Example data, replace this with your actual data
			{
				name: 'Project 1',
				files: ['file1', 'file2']
			},
			{
				name: 'Project 2',
				files: ['file3', 'file4']
			}
		]
	};
	res.render('projects', projectsData);
});

module.exports = router;
