const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/', songController.getAllSong);
router.get('/:id', songController.getSongById);
router.post('/', songController.createSong);
router.put('/', songController.updateSong);
router.delete('/', songController.deleteSong);

module.exports = router;