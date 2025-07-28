const { sequelize, Artist, Album, Song } = require('../models');

const getAllArtist = async (req, res) => {
    try {
        const artists = await Artist.findAll({
            include: {
                model: Album,
                attributes: ['album_id', 'title', 'release_date']
            }
        });
        res.json(artists); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id, {
            include: {
                model: Album,
                attributes: ['album_id', 'title', 'release_date'],
                include: {
                    model: Song,
                    attributes: ['song_id', 'tile']
                }
            }
        });
        if (!artist) return res.status(404).json({error: 'Artist not found'});
        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
};

const createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artist not found'});
        await artist.update(req.body);
        res.json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artist not found'});
        await artist.destroy();
        res.json({ message: 'Artist deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllArtist,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
}