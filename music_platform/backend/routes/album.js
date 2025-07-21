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

module.exports = router;
