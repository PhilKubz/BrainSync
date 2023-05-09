const router = require('express').Router();
const sequelize = require('../config/connection');
const {Room, User, Message, Project, Member} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await sequelize.query('SELECT user.userName, ')

        console.log(userData);

        res.render('home', {
            logged_in: req.session.logged_in 
        });
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  

module.exports = router;