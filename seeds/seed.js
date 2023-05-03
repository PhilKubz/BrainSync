const sequelize = require('../config/connection');
const {User, Member, Message, Room} = require('../models');

const userData = require('./userData.json');
const memberData = require('./memberData.json');
const messageData = require('./messageData.json');
const roomData = require('./roomData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const rooms = await Room.bulkCreate(roomData, {
        returning: true,
    });

    for (const member of memberData) {
        await Member.create({
            ...member,
            room_id: rooms[Math.floor(Math.random() * rooms.length)].id,
            member_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const message of messageData) {
        await Message.create({
            ...message,
            room_id: rooms[Math.floor(Math.random() * rooms.length)].id,
            author_id: users[Math.floor(Math.random() * users.length)].id,
            sent_at: new Date(),
        });
    }
};

seedDatabase();