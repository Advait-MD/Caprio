const express = require('express');
const router = express.Router();
const { fetchMovie } = require('../config/omdb');

router.get('/:id', async (req, res) => {
  try {
    const movie = await fetchMovie(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
