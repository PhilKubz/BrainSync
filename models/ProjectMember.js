const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProjectMember extends Model {}

ProjectMember.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        member_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Project',
                key: 'id',
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'projectmember',
    }
);

module.exports = ProjectMember;