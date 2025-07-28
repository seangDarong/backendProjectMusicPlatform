const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlayHistory = sequelize.define('PlayHistory', {
    history_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    played_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'play_history',
    timestamps: false
});

module.exports = PlayHistory;