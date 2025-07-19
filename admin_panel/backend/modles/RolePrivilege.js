const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RolePrivilege = sequelize.define('RolePrivilege', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    privilege: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'role_privilege',
    timestamps: false
});

module.exports = RolePrivilege;