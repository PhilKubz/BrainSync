const router = require('express').Router();
const sequelize = require('../config/connection');
const {Room, User, Message, Project, Member} = require('../models');
const withAuth = require('../utils/auth');
const {QueryTypes} = require('sequelize');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await sequelize.query(`SELECT user.userName, room.id, room.name FROM user LEFT JOIN member ON member.member_id = user.id JOIN room ON member.room_id = room.id where user.id = ${req.session.user_id}`, {type: QueryTypes.SELECT});

        res.render('home', {
            userData,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
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

router.get('/calendar', withAuth, (req, res) => {
    res.render('calendar');
});

router.get('/auth/dropbox', passport.authenticate('dropbox-oauth2'));
router.get('/auth/dropbox/callback',
    passport.authenticate('dropbox-oauth2', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
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