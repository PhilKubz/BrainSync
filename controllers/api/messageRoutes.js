// necessary dependencies and models
const passport = require('passport');
const router = require('express').Router();
const {Member, Message, Room, User} = require('../../models');

//route to display messages from a given 
router.get('/', async (req, res) => {
    try{
        const roomId = req.query.room_id;
        const messages = await Message.findall({
            where: {
                roomId: roomId
            }
        });
        res.status(200).json(messages)
    }
    catch (err) {
        res.status(500).json(err);
    }
});