const express = require('express');
const router = express.Router();
const SongController = require('../controllers/song');

// GET /api/songs — Get all songs
router.get('/', SongController.getAll);

// POST /api/songs — Create a new song
router.post('/', SongController.create);

// GET /api/songs/:id — Get song by ID
router.get('/:id', SongController.getById);

// PUT /api/songs/:id — Update song
router.put('/:id', SongController.update);

// DELETE /api/songs/:id — Delete song
router.delete('/:id', SongController.delete);

module.exports = router;

