const { Song } = require('../models');

const SongController = {
  async create(req, res) {
    try {
      const song = await Song.create(req.body);
      res.status(201).json(song);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const songs = await Song.findAll();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const song = await Song.findByPk(req.params.id);
      if (!song) return res.status(404).json({ error: 'Song not found' });
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const song = await Song.findByPk(req.params.id);
      if (!song) return res.status(404).json({ error: 'Song not found' });
      await song.update(req.body);
      res.json(song);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const song = await Song.findByPk(req.params.id);
      if (!song) return res.status(404).json({ error: 'Song not found' });
      await song.destroy();
      res.json({ message: 'Song deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = SongController;
