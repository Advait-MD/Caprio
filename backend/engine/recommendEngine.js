const seedMovies = require('../config/seedMovies');
const { fetchMovie } = require('../config/omdb');

async function recommend(tasteProfile, watchedIds = []) {
  const { topGenre } = tasteProfile;

  // We need to fetch details for seeds to know their genre (since we only have IDs).
  // Optimization: In a real app we'd cache this. For now, we do it live or trust chance?
  // BETTER APPROACH for Prototype:
  // We will pick 5 random candidates from seed list that are NOT in watchedIds,
  // Fetch them, and return the one that matches Genre. 
  // If none match, return the first one.

  // Shuffle seeds
  const shuffled = [...seedMovies].sort(() => 0.5 - Math.random());

  // Filter out watched
  const candidates = shuffled.filter(id => !watchedIds.includes(id));

  // Try to find a genre match in the first few candidates
  // We only fetch up to 5 to save API calls/time
  for (let i = 0; i < Math.min(candidates.length, 5); i++) {
    const movie = await fetchMovie(candidates[i]);
    if (movie && movie.Genre && movie.Genre.includes(topGenre)) {
      return movie;
    }
  }

  // Fallback: Just return the first valid candidate details
  if (candidates.length > 0) {
    return await fetchMovie(candidates[0]);
  }

  return null;
}

module.exports = { recommend };
