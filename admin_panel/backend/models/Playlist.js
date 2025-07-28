const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Playlist = sequelize.define('Playlist', {
    playlist_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    created_at: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    is_public: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    subscriber_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'playlist',
    timestamps: false
});

module.exports = Playlist;