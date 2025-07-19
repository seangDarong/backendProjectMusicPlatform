const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlaylistSong = sequelize.define('PlaylistSong', {
    added_at: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    }
}, {
    tableName: 'playlist_song',
    timestamps: false
});

module.exports = PlaylistSong;