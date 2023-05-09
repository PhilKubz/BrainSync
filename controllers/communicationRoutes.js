const router = require('express').Router();
const { cA } = require('@fullcalendar/core/internal-common');
const sequelize = require('../config/connection');
const {Room, User, Message, Project, Member} = require('../models');
const withAuth = require('../utils/auth');
const {QueryTypes} = require('sequelize');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const messages = await sequelize.query(`SELECT message.id, message.content, message.sent_at, user.userName, room.name FROM message JOIN room ON room.id = message.room_id JOIN user ON user.id = message.author_id WHERE message.room_id = ${req.params.id} ORDER BY message.sent_at ASC`, {type: QueryTypes.SELECT});
        const roomDetails = await Room.findByPk(req.params.id);
        const details = roomDetails.get({ plain: true});

        const roomId = details.id;
        const roomName = details.name;

        res.render('communications', {
            messages,
            roomId,
            roomName,
            user_id: req.session.user_id
        });
    } catch(err){
        res.status(500).send('Internal Server Error');
    }
});

router.get('/create-room', withAuth, async (req, res) => {
    res.render('roomCreation');
});



module.exports = router;