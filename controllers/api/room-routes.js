const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Message, User, Room, Member} = require('../../models');
const withAuth = require('../../utils/auth');
const {QueryTypes} = require('sequelize');


// create room
router.post('/', withAuth, async (req, res) => {
    try{
        const newRoom = await Room.create(req.body);
        room = newRoom.get({plain: true});
        const newMember = await Member.create({
            member_id: req.session.user_id,
            room_id: room.id,
            role: 'member',
        });
        res.status(201).json(newRoom);
    }catch(err){
        res.status(500).json(err);   
    }
});


//route to display all rooms
router.get('/', async (req, res) => {
    
    try{
        const rooms = await Room.findall();
        if(!rooms){
            res.status(404).json({message: "No Rooms Found"});
        }
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const result = await Room.update({
            name: req.body.name,
        },
        {where: {id: req.params.id}});
        res.status(204).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const result = await Room.destroy(
        {where: {id: req.params.id}});
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
})

//get route for room called by id. possibly used for something? unsure.
router.get('/:id', async (req, res) => {
    try{
        const room = await Room.findByPk(req.params.id);
        if(!room){
            res.status(404).json({message: 'Room not found'});
            return;
        };
    } catch {
        res.status(500).json(err);
    }   
});

module.exports = router;