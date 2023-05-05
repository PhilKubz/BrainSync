// necessary dependencies and models
const router = require('express').Router();
const {Message, User, Room} = require('../../models');
const withAuth = require('../utils/auth');

// the api/message endpoint

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
//passport.authenticate with json web token may not be necessary. cant remove. Also may need to specify which room is being posted in in the path.
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const newMessage = await Message.create(req.body)
        res.status(201).json(newMessage);
        }
        catch (err) {
            res.status(500).json(err);
            }
            });

//route to delete message by id, will likely need to add event listener to front end js to provide selected message's id to the route when delete button is pushed
router.delete('/:id', async (req, res) => {
    try{
        const messageId = req.body.id;
        const message = await Message.findByPk(messageId);
        await message.destroy();
        res.status(204).json();
        }
        catch (err) {
            res.status(500).json(err);
        }
        });

