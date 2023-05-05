const router = require('express').Router();
const { User, Member, Room, Message } = require('../../models');

// the api/routes endpoint

// route to display all users
router.get('/', async (req, res) => {
    try{
    const users = await User.findAll();
    res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});

//route to display user by id
router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
    }
});

//route to create a new user
router.post('/', async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
        }catch(err){
            res.status(500).json(err);
        }
});

//route to update a user's name
router.put('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.save();
        res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
});

//route to delete a user
router.delete('/:id', async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        user.remove();
        res.status(200).json(user);
    }catch{
        res.status(500).json(err);
        }
    });


module.exports = router;