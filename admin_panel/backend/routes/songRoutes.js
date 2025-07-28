const express = require('express');
const router = express.Router();
const songController = require('../../../music_platform/backend/controllers/song');

router.get('/', songController.getAll);
router.get('/:id', songController.getById);
router.post('/', songController.create);
router.post('/:id', songController.update);
router.delete('/:id', songController.delete);

module.exports = router;