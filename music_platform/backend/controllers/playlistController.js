// Playlist controller
const { Playlist } = require('../models');
const PlaylistSong = require('../models/PlaylistSong');

exports.createPlaylist = async (req, res) => {
  try {
    const { title, description, is_public } = req.body;
    // Use subscriber_id from JWT middleware
    const subscriber_id = req.user?.id;
    console.log('Creating playlist for subscriber_id:', subscriber_id);
    if (!subscriber_id) {
      return res.status(400).json({ message: "Missing subscriber_id (user not authenticated)" });
    }
    const playlist = await Playlist.create({
      title,
      description,
      is_public,
      created_at: new Date(),
      subscriber_id
    });
    res.json(playlist);
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ message: "Server error while creating playlist" });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { song_id } = req.body;
    const { playlistId } = req.params;
    await PlaylistSong.create({
      playlist_id: playlistId,
      song_id,
      added_at: new Date()
    });
    res.json({ message: 'Song added to playlist!' });
  } catch (err) {
    console.error('Error adding song to playlist:', err);
    res.status(500).json({ message: 'Server error while adding song to playlist' });
  }
};

exports.listSongsInPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const Song = require('../models/Song');
    const playlistSongs = await PlaylistSong.findAll({ where: { playlist_id: playlistId } });
    const songIds = playlistSongs.map(ps => ps.song_id);
    const songs = await Song.findAll({ where: { song_id: songIds } });
    res.json(songs);
  } catch (err) {
    console.error('Error fetching songs in playlist:', err);
    res.status(500).json({ message: 'Server error while fetching songs in playlist' });
  }
};

exports.removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const deleted = await PlaylistSong.destroy({ where: { playlist_id: playlistId, song_id: songId } });
    if (deleted) {
      res.json({ message: 'Song removed from playlist!' });
    } else {
      res.status(404).json({ message: 'Song not found in playlist' });
    }
  } catch (err) {
    console.error('Error removing song from playlist:', err);
    res.status(500).json({ message: 'Server error while removing song from playlist' });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const deleted = await Playlist.destroy({ where: { playlist_id: playlistId } });
    if (deleted) {
      res.json({ message: 'Playlist deleted!' });
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (err) {
    console.error('Error deleting playlist:', err);
    res.status(500).json({ message: 'Server error while deleting playlist' });
  }
};

exports.editPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { title, description, is_public } = req.body;
    const [updated] = await Playlist.update(
      { title, description, is_public },
      { where: { playlist_id: playlistId } }
    );
    if (updated) {
      res.json({ message: 'Playlist updated!' });
    } else {
      res.status(404).json({ message: 'Playlist not found' });
    }
  } catch (err) {
    console.error('Error editing playlist:', err);
    res.status(500).json({ message: 'Server error while editing playlist' });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const { subscriberId } = req.params;
    const playlists = await Playlist.findAll({
      where: { subscriber_id: subscriberId },
      order: [['created_at', 'DESC']]
    });
    res.json(playlists);
  } catch (err) {
    console.error('Error fetching playlists for user:', err);
    res.status(500).json({ message: 'Server error while fetching playlists for user' });
  }
};
