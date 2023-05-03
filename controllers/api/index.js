const router = require('express').Router();
const userRoutes = require('./userRoutes');
const memberRoutes = require('./memberRoutes');
const messageRoutes = require('./messageRoutes');
const roomRoutes = require('./roomRoutes');

router.use('/users', userRoutes);
router.use('/members', memberRoutes);
router.use('/messages', messageRoutes);
router.use('/rooms', roomRoutes);

module.exports = router