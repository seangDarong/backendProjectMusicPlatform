const sequelize = require('../config/database');
const Role = require('./Role');
const User = require('./User');
const RolePrivilege = require('./RolePrivilege');

Role.hasMany(User, { foreignKey: 'role_id', onDelete: 'cascade' });
User.belongsTo(Role, { foreignKey: 'role_id' });

Role.hasMany(RolePrivilege, { foreignKey: 'role_id', onDelete: 'cascade' });
RolePrivilege.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = {
    sequelize,
    Role,
    User,
    RolePrivilege
};