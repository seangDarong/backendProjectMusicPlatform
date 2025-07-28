const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.getAllAlbum);
router.get('/:id', albumController.getAlbumByID);
router.post('/', albumController.createAlbum);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;