const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubscriberArtist = sequelize.define('SubscriberArtist', { }, {
    tableName: 'subscriber_artist',
    timestamps: false
});

module.exports = SubscriberArtist;