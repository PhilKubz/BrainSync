const router = require('express').Router();
const {Room, User, Message, Project} = require('../models');
const withAuth = require('../utils/auth');

/*router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }, { model: Room }]
        })
    }
});*/

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
});
  
module.exports = router;