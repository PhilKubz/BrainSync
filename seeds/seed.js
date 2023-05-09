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

    let i = 0;

    let members = [];

    for (const member of memberData) {
        const data = await Member.create({
            ...member,
            room_id: rooms[Math.floor(Math.random() * rooms.length)].id,
            member_id: users[i].id
        });
        console.log(data);
        members.push(data.dataValues);
        i++;
    }

    for (const message of messageData) {
        let roomId = Math.floor(Math.random() * members.length);
        await Message.create({
            ...message,
            room_id: members[roomId].room_id,
            author_id: members[roomId].member_id,
            sent_at: new Date(),
        });
    }
};

seedDatabase();