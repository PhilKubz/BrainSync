// necessary dependencies and models
const router = require('express').Router();
const {Member, Message, Room, User} = require('../../models');

//route to display messages from a given room
router.get('/', async (req, res) => {
    try{
        const roomId = req.query.room_id;
        const messages = await Message.findall({
            where: {
                roomId: roomId
            },
            include: {
                model: User,
                attributes: ['userName']
            }, 
            attributes: ['content', 'sent_at'],
            order: [['sent_at', 'ASC']]        
        });
        res.status(200).json(messages)
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//route to post message in a given room
router.post('/', passport.authenticate('jwt', {session: false}) async (req, res) => {
    try{
        const newMessage = await Message.create(req.body)
