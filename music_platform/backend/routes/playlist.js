const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const playHistoryController = require('../controllers/playHistoryController');

// GET /api/playlists — Test route
router.get('/', (req, res) => {
  res.json({ message: 'Playlist route is working!' });
});

// POST /api/playlists — Create a new playlist
router.post('/', playlistController.createPlaylist);

// POST /api/playlists/:playlistId/songs — Add a song to a playlist
router.post('/:playlistId/songs', playlistController.addSongToPlaylist);

// GET /api/playlists/:playlistId/songs — List all songs in a playlist
router.get('/:playlistId/songs', playlistController.listSongsInPlaylist);

// POST /api/playhistory — Record a play event
router.post('/playhistory', playHistoryController.recordPlayHistory);

// GET /api/playhistory/:subscriberId — Get play history for a user
router.get('/playhistory/:subscriberId', playHistoryController.getPlayHistory);

// GET /api/playlists/user/:subscriberId — Get all playlists for a user
router.get('/user/:subscriberId', playlistController.getUserPlaylists);

// DELETE /api/playlists/:playlistId/songs/:songId — Remove a song from a playlist
router.delete('/:playlistId/songs/:songId', playlistController.removeSongFromPlaylist);

// DELETE /api/playlists/:playlistId — Delete a playlist
router.delete('/:playlistId', playlistController.deletePlaylist);

// PUT /api/playlists/:playlistId — Edit a playlist
router.put('/:playlistId', playlistController.editPlaylist);

module.exports = router;
