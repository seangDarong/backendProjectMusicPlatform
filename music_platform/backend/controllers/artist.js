const Artist = require('../models/Artist');
const Album = require('../models/Album');

const ArtistController = {
    async create(req, res) {
        try {
            const artist = await Artist.create(req.body);
            res.status(201).json(artist);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getAll(req, res) {
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
    },
    async getById(req, res) {
        try {
            const artist = await Artist.findByPk(req.params.id, {
                include: {
                    model: Album,
                    attributes: ['album_id', 'title', 'release_date']
                }
            });
            if (!artist) return res.status(404).json({error: 'Artist not found'});
            res.json(artist);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }   
    },
    async getByName(req, res) {
        try {
            const name = req.params.name;
            const artists = await Artist.findAll({
                where: { name: { [Op.like]: `%${name}%` } },
                include: {
                    model: Album,
                    attributes: ['album_id', 'title', 'release_date']
                }
            });
            if (artists.length === 0) return res.status(404).json({ error: 'No artists found with that name' });
            res.json(artists);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            const artist = await Artist.findByPk(req.params.id);
            if (!artist) return res.status(404).json({ error: 'Artist not found'});
            await artist.update(req.body);
            res.json(artist);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }, 
    async delete(req, res) {
        try {
            const artist = await Artist.findByPk(req.params.id);
            if (!artist) return res.status(404).json({ error: 'Artist not found'});
            await artist.destroy();
            res.json({ message: 'Artist deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}
module.exports = ArtistController;