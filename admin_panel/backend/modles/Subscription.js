const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscription = sequelize.define('Subscription', {
    subscription_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    plan_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    duration_in_days: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    price: { 
        type: DataTypes.DECIMAL(5, 2), 
        allowNull: false 
    }
}, {
    tableName: 'subscription',
    timestamps: false
});

module.exports = Subscription;
