const express = require('express');
const ArtistController = require('../controller/artist');

const artistRouter = express.Router();

artistRouter.post('/', ArtistController.create);
artistRouter.get('/', ArtistController.getAll);
artistRouter.get('/:id', ArtistController.getById);
artistRouter.put('/:id', ArtistController.update);
artistRouter.delete('/:id', ArtistController.delete);

module.exports = artistRouter;