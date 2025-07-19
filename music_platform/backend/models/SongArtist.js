const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SongArtist = sequelize.define('SongArtist', { }, {
    tableName: 'song_artist',
    timestamps: false
});

module.exports = SongArtist;