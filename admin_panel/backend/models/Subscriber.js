const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscriber = sequelize.define('Subscriber', {
    subscriber_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }, 
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    // 🎉 New field for plan type
    planType: {
        type: DataTypes.ENUM('free', 'premium'),
        allowNull: false,
        defaultValue: 'free'
    },
    subscriptionStart: {
        type: DataTypes.DATE,
        allowNull: true
    },
    subscriptionEnd: {
        type: DataTypes.DATE,
        allowNull: true
    },

}, {
    tableName: 'subscriber',
    timestamps: false
});

module.exports = Subscriber;
