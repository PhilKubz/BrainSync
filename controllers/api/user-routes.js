const router = require('express').Router();
const { User, Member, Room, Message } = require('../../models');

// the api/routes endpoint

//route to log in
router.post('/login', async (req, res) => {
    try {
      //finds the user that matches posted e-mail address
      const userData = await User.findOne({ where: { email: req.body.email } });
  

      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      // verifies the posted password against passwords stored in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.userName;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
});

//route to log out and terminate seesion
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

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
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
    }
});

//route to create a new user
router.post('/', async (req, res) => {
    try{
        const user = await User.create(req.body);
        console.log(req.body);
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