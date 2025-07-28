const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/', artistController.getAllArtist);
router.get('/:id', artistController.getArtistById);
router.post('/', artistController.createArtist);
router.put('/:id', artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);

module.exports = router;