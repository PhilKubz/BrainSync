const router = require('express').Router();
const { Event } = require('../../models');

// get all events
router.get('/events', async (req, res) => {
	try {
		const events = await Event.findAll();
		res.status(200).json(events);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// add a new event
router.post('/events', async (req, res) => {
	try {
		const event = await Event.create(req.body);
		res.status(201).json(event);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// update an existing event
router.put('/events/:id', async (req, res) => {
	try {
		const event = await Event.findByPk(req.params.id);
		if (event) {
			await event.update(req.body);
			res.status(200).json(event);
		} else {
			res.status(404).json({ message: 'Event not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// delete an event
router.delete('/events/:id', async (req, res) => {
	try {
		const event = await Event.findByPk(req.params.id);
		if (event) {
			await event.destroy();
			res.status(204).end();
		} else {
			res.status(404).json({ message: 'Event not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;