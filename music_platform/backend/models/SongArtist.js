const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SongArtist = sequelize.define('SongArtist', {
    artist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'artist', key: 'artist_id' }
    },
    song_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'song', key: 'song_id' }
    }
}, {
    tableName: 'song_artist',
    timestamps: false,
    id: false // Prevent Sequelize from adding an 'id' column
});

module.exports = SongArtist;