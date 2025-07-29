const { sequelize, Song, Artist, Album, PlaylistSong } = require('../models');

const getAllSong = async (req, res) => {
    try {
        const songs = await Song.findAll({
            include: [{
            model: Artist,
            attributes: ['artist_id', 'name', 'country']
            },
            {
            model: Album,
            attributes: ['album_id', 'title', 'release_date']
            }] 
        });
        if (!songs) return res.status(404).json({ error: 'Song not found.' });

        res.json(songs);
    } catch (error) {
        console.error('Error fetching songs.', error);
        res.status(500).json({ error: 'Failed to fetch songs.' });
    }
};

const getSongById = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id, {
            include: [{
            model: Artist,
            attributes: ['artist_id', 'name', 'country']
            },
            {
            model: Album,
            attributes: ['album_id', 'title', 'release_date']
            }]
        });
        if (!song) return res.status(404).json({ error: 'Song not found' });
        res.json(song);
    } catch (error) {
        console.error('Error fetching song by ID.', error);
        res.status(500).json({ error: 'Failed to fetch song by ID.' });
    }
};

const createSong = async (req, res) => {
    try {
        const song = await Song.create(req.body);
        res.status(201).json(song);
    } catch (error) {
        console.error('Error creating song.', error);
        res.status(500).json({ error: 'Failed to create song.' });
    }
};

const updateSong = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (!song) return res.status(404).json({ error: 'Song not found' });
        await song.update(req.body);
        res.json(song);
    } catch (error) {
        console.error('Error updating song.', error);
        res.status(500).json({ error: 'Failed to update song.' });
    }
};

const deleteSong = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (!song) return res.status(404).json({ error: 'Song not found' });
        
        // First, remove the song from all playlists to avoid foreign key constraint errors
        await PlaylistSong.destroy({
            where: { song_id: req.params.id }
        });
        
        // Then delete the song
        await song.destroy();
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ error: 'Failed to delete song: ' + error.message });
    }
};

module.exports = {
    getAllSong,
    getSongById,
    createSong,
    updateSong,
    deleteSong
};