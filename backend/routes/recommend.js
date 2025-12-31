const express = require('express');
const router = express.Router();
const { recommend } = require('../engine/recommendEngine');
const { analyzeTaste } = require('../engine/tasteEngine');

// POST /api/recommend
router.post('/', async (req, res) => {
  try {
    const { history, watchedIds } = req.body;

    const tasteProfile = analyzeTaste(history || []);
    const recommendation = await recommend(tasteProfile, watchedIds || []);

    if (recommendation) {
      res.json(recommendation);
    } else {
      res.status(404).json({ error: 'No recommendation found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to recommend' });
  }
});

module.exports = router;

module.exports = router;
