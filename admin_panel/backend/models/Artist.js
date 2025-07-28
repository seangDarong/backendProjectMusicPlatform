const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artist = sequelize.define('Artist', {
    artist_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    bio: { 
        type: DataTypes.TEXT 
    },
    country: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
}, {
    tableName: 'artist',
    timestamps: false
});

module.exports = Artist;