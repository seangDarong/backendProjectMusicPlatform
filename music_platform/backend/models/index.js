const sequelize = require('../config/database');
const Album = require('./Album');
const Artist = require('./Artist');
const PlayHistory = require('./PlayHistory');
const Playlist = require('./Playlist');
const PlaylistSong = require('./PlaylistSong');
const Song = require('./Song');
const SongArtist = require('./SongArtist');
const Subscriber = require('./Subscriber');
const SubscriberArtist = require('./SubscriberArtist');
const Subscription = require('./Subscription');
const SubscriptionHistory = require('./SubscriptionHistory');

// subscriber and subscription
Subscriber.hasMany(Subscription, { foreignKey: 'subscriber_id', onDelete: 'cascade' });
Subscription.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });

// subscriber and subscriptionHistory
Subscriber.hasMany(SubscriptionHistory, { foreignKey: 'subscriber_id', onDelete: 'cascade' });
SubscriptionHistory.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });

// subscription and subscriptionHistory
Subscription.hasMany(SubscriptionHistory, { foreignKey: 'subscription_id', onDelete: 'cascade' });
SubscriptionHistory.belongsTo(Subscription, { foreignKey: 'subscription_id' });

// artist and album
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'CASCADE' });
Album.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE' });

// album and song
Album.hasMany(Song, { foreignKey: 'album_id', onDelete: 'CASCADE' });
Song.belongsTo(Album, { foreignKey: 'album_id', onDelete: 'CASCADE' });

// artist and song 
Artist.hasMany(Song, { foreignKey: 'artist_id', onDelete: 'CASCADE' });
Song.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE' });

// subscriber and playlist
Subscriber.hasMany(Playlist, { foreignKey: 'subscriber_id', onDelete: 'CASCADE' });
Playlist.belongsTo(Subscriber, { foreignKey: 'subscriber_id', onDelete: 'CASCADE' });

// playlist and song 
Playlist.belongsToMany(Song, { through: 'PlaylistSongs', foreignKey: 'playlist_id', onDelete: 'CASCADE' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs', foreignKey: 'song_id', onDelete: 'CASCADE' });

// subscriber and playHistory
Subscriber.hasMany(PlayHistory, { foreignKey: 'subscriber_id', onDelete: 'cascade' });
PlayHistory.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });

// song and playHistory
Song.hasMany(PlayHistory, { foreignKey: 'song_id', onDelete: 'cascade' });
PlayHistory.belongsTo(Song, { foreignKey: 'song_id' });

module.exports = {
    sequelize,
    Album,
    Artist,
    PlayHistory,
    Playlist,
    PlaylistSong,
    Song,
    SongArtist,
    Subscriber,
    SubscriberArtist,
    Subscription,
    SubscriptionHistory
};