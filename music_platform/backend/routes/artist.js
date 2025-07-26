const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const SongArtist = require('../models/SongArtist');

// POST /api/artists — Create a new artist (for testing)
router.post('/', async (req, res) => {
  try {
    const { name, bio, country } = req.body;
    const artist = await Artist.create({ name, bio, country });
    res.json(artist);
  } catch (err) {
    console.error('Error creating artist:', err);
    res.status(500).json({ message: 'Server error while creating artist' });
  }
});

// POST /api/artists/:artistId/songs — Link a song to an artist
router.post('/:artistId/songs', async (req, res) => {
  try {
    const { song_id } = req.body;
    const { artistId } = req.params;
    await SongArtist.create({ artist_id: artistId, song_id });
    res.json({ message: 'Song linked to artist!' });
  } catch (err) {
    console.error('Error linking song to artist:', err);
    res.status(500).json({ message: 'Server error while linking song to artist' });
  }
});

// GET /api/artists/song/:songId — Get all artists for a song
router.get('/song/:songId', async (req, res) => {
  try {
    const { songId } = req.params;
    const SongArtist = require('../models/SongArtist');
    const Artist = require('../models/Artist');
    const links = await SongArtist.findAll({ where: { song_id: songId } });
    const artistIds = links.map(link => link.artist_id);
    const artists = await Artist.findAll({ where: { artist_id: artistIds } });
    res.json(artists);
  } catch (err) {
    console.error('Error fetching artists for song:', err);
    res.status(500).json({ message: 'Server error while fetching artists for song' });
  }
});

module.exports = router;

const ArtistController = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.post('/', ArtistController.create);
artistRouter.get('/', ArtistController.getAll);
artistRouter.get('/:id', ArtistController.getById);
artistRouter.put('/:id', ArtistController.update);
artistRouter.delete('/:id', ArtistController.delete);

module.exports = artistRouter;


module.exports = artistRouter;

