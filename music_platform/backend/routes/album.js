const express = require('express');
const AlbumController = require('../controller/album');

const albumRouter = express.Router();

albumRouter.post('/', AlbumController.create);
albumRouter.get('/', AlbumController.getAll);
albumRouter.get('/:id', AlbumController.getById);
albumRouter.put('/:id', AlbumController.update);
albumRouter.delete('/:id', AlbumController.delete);

module.exports = albumRouter;