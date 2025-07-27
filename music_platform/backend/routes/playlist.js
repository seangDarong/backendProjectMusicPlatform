const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const playHistoryController = require('../controllers/playHistoryController');
const authMiddleware = require('../middleware/auth');

// GET /api/playlists — Test route (public)
router.get('/', (req, res) => {
  res.json({ message: 'Playlist route is working!' });
});

// POST /api/playlists — Create a new playlist (protected)
router.post('/', authMiddleware, playlistController.createPlaylist);

// POST /api/playlists/:playlistId/songs — Add a song to a playlist (protected)
router.post('/:playlistId/songs', authMiddleware, playlistController.addSongToPlaylist);

// GET /api/playlists/:playlistId/songs — List all songs in a playlist (protected)
router.get('/:playlistId/songs', authMiddleware, playlistController.listSongsInPlaylist);

// GET /api/playlists/:playlistId — Get playlist details (protected)
router.get('/:playlistId', authMiddleware, playlistController.getPlaylistDetails);

// POST /api/playhistory — Record a play event (protected)
router.post('/playhistory', authMiddleware, playHistoryController.recordPlayHistory);

// GET /api/playhistory/:subscriberId — Get play history for a user (protected)
router.get('/playhistory/:subscriberId', authMiddleware, playHistoryController.getPlayHistory);

// GET /api/playlists/user/:subscriberId — Get all playlists for a user (protected)
router.get('/user/:subscriberId', authMiddleware, playlistController.getUserPlaylists);

// DELETE /api/playlists/:playlistId/songs/:songId — Remove a song from a playlist (protected)
router.delete('/:playlistId/songs/:songId', authMiddleware, playlistController.removeSongFromPlaylist);

// DELETE /api/playlists/:playlistId — Delete a playlist (protected)
router.delete('/:playlistId', authMiddleware, playlistController.deletePlaylist);

// PUT /api/playlists/:playlistId — Edit a playlist (protected)
router.put('/:playlistId', authMiddleware, playlistController.editPlaylist);

module.exports = router;
