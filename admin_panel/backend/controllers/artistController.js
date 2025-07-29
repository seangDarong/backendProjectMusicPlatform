const { sequelize, Artist, Album, Song, PlaylistSong } = require('../models');

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
            include: [
                {
                    model: Album,
                    attributes: ['album_id', 'title', 'release_date', 'cover_image_url']
                },
                {
                    model: Song,
                    attributes: ['song_id', 'title', 'duration_in_sec', 'cover_image_url', 'song_url']
                }
            ]
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
        
        // First, find all songs by this artist
        const songsWithArtist = await Song.findAll({
            where: { artist_id: req.params.id },
            attributes: ['song_id']
        });
        
        if (songsWithArtist.length > 0) {
            const songIds = songsWithArtist.map(song => song.song_id);
            
            // Remove all songs by this artist from all playlists
            await PlaylistSong.destroy({
                where: { song_id: songIds }
            });
        }
        
        // Then delete the artist (this will cascade delete albums and songs due to foreign key constraints)
        await artist.destroy();
        res.json({ message: 'Artist deleted successfully' });
    } catch (error) {
        console.error('Error deleting artist:', error);
        res.status(500).json({ error: 'Failed to delete artist: ' + error.message });
    }
};

module.exports = {
    getAllArtist,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
}