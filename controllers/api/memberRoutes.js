// necessary dependencies and models
const router = require('express').Router();
const {Message, Room, Member, User} = require('../../models');

//route to obtain all members of a given group
router.get('/', async (req, res) => {
    try{
        const roomId = req.query.room_id;
        const members = await Member.findall({
            where: {
                roomId: roomId
            },
            include: {
                model: User,
                attributes: ['userName']
            },     
        });
        res.status(200).json(members)
    }
    catch (err) {
        res.status(500).json(err);
    }
});