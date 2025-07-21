const express = require('express');
const SongController = require('../controller/song');

const songRouter = express.Router();

songRouter.post('/', SongController.create);
songRouter.get('/', SongController.getAll);
songRouter.get('/:id', SongController.getById);
songRouter.put('/:id', SongController.update);
songRouter.delete('/:id', SongController.delete);

module.exports = songRouter;
