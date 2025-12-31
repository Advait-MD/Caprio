const express = require('express');
const router = express.Router();
const seedMovies = require('../config/seedMovies');
const { fetchMovie } = require('../config/omdb');

// GET /api/compare/pair
router.get('/pair', async (req, res) => {
  try {
    let attempts = 0;
    const movies = [];

    // Try to fetch 2 unique valid movies
    while (movies.length < 2 && attempts < 10) {
      const idx = Math.floor(Math.random() * seedMovies.length);
      const id = seedMovies[idx];

      // Avoid duplicates
      if (movies.some(m => m.imdbID === id)) continue;

      const movie = await fetchMovie(id);
      if (movie && movie.Title) {
        movies.push(movie);
      }
      attempts++;
    }

    if (movies.length < 2) {
      return res.status(500).json({ error: 'Could not fetch enough movies from OMDb' });
    }

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pair' });
  }
});

module.exports = router;
