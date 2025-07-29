const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Album = sequelize.define('Album', {
    album_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    release_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    cover_image_url: { 
        type: DataTypes.STRING, 
        allowNull: true,
        defaultValue: 'https://files.catbox.moe/uonk7t.png'
    }
}, {
    tableName: 'album',
    timestamps: false
});

module.exports = Album;