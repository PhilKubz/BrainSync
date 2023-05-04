const User = require('./User');
const Room = require('./Room');
const Message = require('./Message');
const Member = require('./Member');
const Project = require('./Project');
const ProjectMember = require('./ProjectMember');
const Event = require('./Event');


User.hasMany(Message, {
    foreignKey: 'author_id',
    onDelete: 'SET NULL'
});

User.hasMany(Event, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Member, {
    foreignKey: 'member_id',
    onDelete: 'CASCADE'
});

User.hasMany(ProjectMember, {
    foreignKey: 'member_id',
    onDelete: 'CASCADE'
});

Room.hasMany(Member, {
    foreignKey: 'room_id',
    onDelete: 'CASCADE'
});

Room.hasMany(Message, {
    foreignKey: 'room_id',
    onDelete: 'CASCADE'
});

Project.hasMany(ProjectMember, {
    foreignKey: 'project_id',
    onDelete: 'CASCADE'
});




module.exports = {User, Room, Message, Member};