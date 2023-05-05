const router = require('express').Router();
const userRoutes = require('./user-routes');
const memberRoutes = require('./member-routes');
const messageRoutes = require('./message-routes');
const roomRoutes = require('./room-routes');

/*router.use('/users', userRoutes);
router.use('/members', memberRoutes);
router.use('/messages', messageRoutes);
router.use('/rooms', roomRoutes);*/

module.exports = router;