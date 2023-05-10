const router = require('express').Router();
//const { cA } = require('@fullcalendar/core/internal-common');
const sequelize = require('../config/connection');
const {Room, User, Message, Project, Member} = require('../models');
const withAuth = require('../utils/auth');
const {QueryTypes} = require('sequelize');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const messages = await sequelize.query(`SELECT message.id, message.content, message.sent_at, user.userName, room.name FROM message JOIN room ON room.id = message.room_id JOIN user ON user.id = message.author_id WHERE message.room_id = ${req.params.id} ORDER BY message.sent_at DESC`, {type: QueryTypes.SELECT});
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

router.get('/create/room', withAuth, async (req, res) => {
    res.render('roomCreation');
});

router.get('/:id/settings', withAuth, async (req, res) => {
    try{
        const members = await sequelize.query(`SELECT user.id, user.userName, member.role FROM room JOIN member ON member.room_id = room.id JOIN user ON user.id = member.member_id WHERE room.id = ${req.params.id}`, {type: QueryTypes.SELECT});

        const roomRaw = await Room.findByPk(req.params.id);
    
        const room = roomRaw.get({plain: true});

        console.log(room);
    
        res.render('roomSettings',{
            members,
            ...room
        });
    }catch(err){
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;