const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubscriberArtist = sequelize.define('SubscriberArtist', {
    subscriber_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'subscriber', key: 'subscriber_id' }
    },
    artist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'artist', key: 'artist_id' }
    }
}, {
    tableName: 'subscriber_artist',
    timestamps: false,
    id: false // Prevent Sequelize from adding an 'id' column
});

module.exports = SubscriberArtist;