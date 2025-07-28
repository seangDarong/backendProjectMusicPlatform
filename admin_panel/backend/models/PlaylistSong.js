const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlaylistSong = sequelize.define('PlaylistSong', {
    playlist_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'playlist', key: 'playlist_id' }
    },
    song_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'song', key: 'song_id' }
    },
    added_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'playlist_song',
    timestamps: false,
    id: false // Prevent Sequelize from adding an 'id' column
});

module.exports = PlaylistSong;