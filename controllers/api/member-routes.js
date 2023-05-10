// necessary dependencies and models
const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Member, User, Room} = require('../../models');
const withAuth = require('../../utils/auth');

// the api/member endpoint

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

// basic route to create new member. A method of verifying that the user creating a member is the
// moderator will need to be added.
router.post('/', withAuth, async (req, res) => {
    try{
       
        const userRaw = await sequelize.query(`SELECT user.id FROM user WHERE email = '${req.body.email}'`);
        const room_id = req.body.room_id;
        user = userRaw[0];
        const newMember = await Member.create({
            member_id: user[0].id,
            room_id: room_id,
            role: 'member'
        });
        console.log(newMember);
        res.status(201).json(newMember);
    }
    catch (err) {
        res.status(500).json(err);
        }
    });

// basic route to delete an existing member. A method of verifying that the user creating a member 
// is the moderator will need to be added. 
router.delete('/:id', async (req, res) => {
    try{
        const memberId = req.params.id;
        const member = await Member.findByPk({
            where: {
                id: memberId,
            }
        });

        if (member) {
        await member.destroy();
        res.status(200).json(member);
        } else {
            res.status(404).json({message: 'No such member' });
        } 
    } catch (err) {
        res.status(500).json(err);
    }

});

// update route for members
router.put('/:id', async (req, res) => {
    try{
        
        const NewRole = await Member.update(
        {
            role: req.body.role    
        },
        {
            where:{
                id: req.params.id
            } 
        }
        )
        res.status(200).json(NewRole)
        } catch(err) {
            res.status(500).json(err);
        }
    });

    module.exports = router;