const router = require('express').Router();
const communicationRoutes = require('./communicationRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/communications', communicationRoutes);

module.exports = router;
