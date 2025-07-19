const sequelize = require('../config/database');
const Album = require('./Album');
const Artist = require('./Artist');
const PlayHistory = require('./PlayHistory');
const Playlist = require('./Playlist');
const Song = require('./Song');
const Subscriber = require('./Subscriber');
const Subscription = require('./Subscription');
const SubscriptionHistory = require('./SubscriptionHistory');

// Subscriber and Subscription
Subscriber.hasMany(Subscription, { foreignKey: 'subscriber_id', onDelete: 'cascade' });
Subscription.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });

// Subscriber and SubscriptionHistory
Subscriber.hasMany(SubscriptionHistory, { foreignKey: 'subscriber_id', onDelete: 'cascade' });
SubscriptionHistory.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });

// Subscription and SubscriptionHistory
Subscription.hasMany(SubscriptionHistory, { foreignKey: 'subscription_id', onDelete: 'cascade' });
SubscriptionHistory.belongsTo(Subscription, { foreignKey: 'subscription_id' });

// Artist and Album
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'cascade' });
Album.belongsTo(Artist, { foreignKey: 'artist_id' });

// Album and Song
Album.hasMany(Song, { foreignKey: 'album_id', onDelete: 'cascade' });
Song.belongsTo(Album, { foreignKey: 'album_id' });

// Artist and Song (optional direct link)
Artist.hasMany(Song, { foreignKey: 'artist_id', onDelete: 'cascade' });
Song.belongsTo(Artist, { foreignKey: 'artist_id' });

// Subscriber and Playlist
Subscriber.hasMany(Playlist, { foreignKey: 'subscriber_id', onDelete: 'cascade' });
Playlist.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });

// Playlist and Song (many-to-many)
Playlist.belongsToMany(Song, { through: 'PlaylistSongs', foreignKey: 'playlist_id' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs', foreignKey: 'song_id' });

// Subscriber and PlayHistory
Subscriber.hasMany(PlayHistory, { foreignKey: 'subscriber_id', onDelete: 'cascade' });
PlayHistory.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });

// Song and PlayHistory
Song.hasMany(PlayHistory, { foreignKey: 'song_id', onDelete: 'cascade' });
PlayHistory.belongsTo(Song, { foreignKey: 'song_id' });

module.exports = {
    sequelize,
    Album,
    Artist,
    PlayHistory,
    Playlist,
    Song,
    Subscriber,
    Subscription,
    SubscriptionHistory
};