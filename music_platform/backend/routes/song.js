const express = require('express');

const router = express.Router();
const Song = require('../models/Song');

// POST /api/songs — Create a new song (for testing)
router.post('/', async (req, res) => {
  try {
    const { title, duration_in_sec, release_date } = req.body;
    // For testing, use dummy album_id
    const song = await Song.create({
      title,
      duration_in_sec,
      album_id: 1, // You may need to create a test album first
      release_date
    });
    res.json(song);
  } catch (err) {
    console.error('Error creating song:', err);
    res.status(500).json({ message: 'Server error while creating song' });
  }
});

// GET /api/songs/:songId — Get song details for playback
router.get('/:songId', async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await Song.findByPk(songId);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    console.error('Error fetching song details:', err);
    res.status(500).json({ message: 'Server error while fetching song details' });
  }
});

module.exports = router;
const SongController = require('../controller/song');

const songRouter = express.Router();

songRouter.post('/', SongController.create);
songRouter.get('/', SongController.getAll);
songRouter.get('/:id', SongController.getById);
songRouter.put('/:id', SongController.update);
songRouter.delete('/:id', SongController.delete);

module.exports = songRouter;

