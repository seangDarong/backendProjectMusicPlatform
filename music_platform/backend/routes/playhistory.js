const express = require('express');
const router = express.Router();
const PlayHistory = require('../models/PlayHistory');

// POST /api/playhistory — Record a play event
router.post('/', async (req, res) => {
  try {
    const { subscriber_id, song_id } = req.body;
    const play = await PlayHistory.create({
      subscriber_id,
      song_id,
      played_at: new Date()
    });
    res.json(play);
  } catch (err) {
    console.error('Error recording play history:', err);
    res.status(500).json({ message: 'Server error while recording play history' });
  }
});

// GET /api/playhistory/:subscriberId — Get play history for a user
router.get('/:subscriberId', async (req, res) => {
  try {
    const { subscriberId } = req.params;
    const history = await PlayHistory.findAll({
      where: { subscriber_id: subscriberId },
      order: [['played_at', 'DESC']]
    });
    res.json(history);
  } catch (err) {
    console.error('Error fetching play history:', err);
    res.status(500).json({ message: 'Server error while fetching play history' });
  }
});

module.exports = router;
