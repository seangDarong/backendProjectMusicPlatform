const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');
const Song = require('../models/Song');
const Artist = require('../models/Artist');

// GET /api/albums — Get all albums
router.get('/', AlbumController.getAll);

// POST /api/albums — Create a new album
router.post('/', AlbumController.create);

// GET /api/albums/:albumId/songs — List all songs in an album (MUST come before /:id)
router.get('/:albumId/songs', async (req, res) => {
  try {
    const { albumId } = req.params;
    const songs = await Song.findAll({ 
      where: { album_id: albumId },
      include: {
        model: Artist,
        attributes: ['artist_id', 'name', 'country']
      }
    });
    res.json(songs);
  } catch (err) {
    console.error('Error fetching songs for album:', err);
    res.status(500).json({ message: 'Server error while fetching songs for album' });
  }
});

// GET /api/albums/:id — Get album by ID  
router.get('/:id', AlbumController.getById);

// PUT /api/albums/:id — Update album
router.put('/:id', AlbumController.update);

// DELETE /api/albums/:id — Delete album
router.delete('/:id', AlbumController.delete);

module.exports = router;

