const router = require('express').Router();
const {Member, Message, Room, User} = require('../../models');

router.get('/', async (req, res) => {
    try{
        const messages = await Message.findall();
        res.status(200).json(messages)
    }
    catch (err) {
        res.status(500).json(err);
    }
});