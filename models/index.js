const User = require('./User');
const Room = require('./Room');
const Message = require('./Message');
const Member = require('./Member');

User.hasMany(Message, {
    foreignKey: 'author_id',
    onDelete: 'SET NULL'
});

Room.hasMany(Member, {
    foreignKey: 'room_id',
    onDelete: 'CASCADE'
});

Room.hasMany(Message, {
    foreignKey: 'room_id',
    onDelete: 'CASCADE'
});

User.hasMany(Member, {
    foreignKey: 'member_id',
    onDelete: 'CASCADE'
});



module.exports = {User, Room, Message, Member};