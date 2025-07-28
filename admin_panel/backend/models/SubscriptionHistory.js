const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubscriptionHistory = sequelize.define('SubscriptionHistory', {
    history_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    start_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    end_data: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    }
}, {
    tableName: 'subscription_history',
    timestamps: false
});

module.exports = SubscriptionHistory;