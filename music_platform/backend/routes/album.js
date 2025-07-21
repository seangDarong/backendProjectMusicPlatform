const express = require('express');

const router = express.Router();
const Album = require('../models/Album');

// POST /api/albums — Create a new album (for testing)
router.post('/', async (req, res) => {
  try {
    const { title, release_date } = req.body;
    const album = await Album.create({
      title,
      release_date
    });
    res.json(album);
  } catch (err) {
    console.error('Error creating album:', err);
    res.status(500).json({ message: 'Server error while creating album' });
  }
});

// GET /api/albums — List all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.json(albums);
  } catch (err) {
    console.error('Error fetching albums:', err);
    res.status(500).json({ message: 'Server error while fetching albums' });
  }
});

// GET /api/albums/:albumId/songs — List all songs in an album
const Song = require('../models/Song');
router.get('/:albumId/songs', async (req, res) => {
  try {
    const { albumId } = req.params;
    const songs = await Song.findAll({ where: { album_id: albumId } });
    res.json(songs);
  } catch (err) {
    console.error('Error fetching songs for album:', err);
    res.status(500).json({ message: 'Server error while fetching songs for album' });
  }
});

module.exports = router;

const AlbumController = require('../controller/album');

const albumRouter = express.Router();

albumRouter.post('/', AlbumController.create);
albumRouter.get('/', AlbumController.getAll);
albumRouter.get('/:id', AlbumController.getById);
albumRouter.put('/:id', AlbumController.update);
albumRouter.delete('/:id', AlbumController.delete);

module.exports = albumRouter;

