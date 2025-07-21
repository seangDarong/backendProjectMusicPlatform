const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Song = sequelize.define('Song', {
    song_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    duration_in_sec: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    release_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    }
}, {
    tableName: 'song',
    timestamps: false
});

module.exports = Song;