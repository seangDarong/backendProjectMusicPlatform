const { sequelize, Song, Artist, Album } = require('../models');

const getAllAlbum = async (req, res) => {
    try {
        const albums = await Album.findAll({
            include: {
                model: Artist,
                attributes: ['artist_id', 'name', 'country'],
                model: Song,
                attributes: ['song_id', 'title', 'duration_in_sec', 'release_date']
            }
        });
        res.json(albums); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAlbumByID = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id, {
            include: {
                model: Artist,
                attributes: ['artist_id', 'name', 'country'],
            }
        });
        if (!album) return res.status(404).json({ error: 'Album not found'});
        res.json(album);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAlbum = async (req, res) => {
    try {
        const album = await Album.create(req.body);
        res.status(201).json(album);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateAlbum = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) return res.status(404).json({ error: 'Album not found'});
        await album.update(req.body);
        res.json(album);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) return res.status(404).json({ error: 'Album not found'});
        await album.destroy();
        res.json({ message: 'Album deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAlbum,
    getAlbumByID,
    createAlbum,
    updateAlbum,
    deleteAlbum
}