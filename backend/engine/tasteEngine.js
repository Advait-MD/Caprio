
function analyzeTaste(chosenMovies) {
  // chosenMovies is an array of full movie objects (from OMDb)
  const genreCounts = {};

  chosenMovies.forEach(movie => {
    if (!movie || !movie.Genre) return;
    const genres = movie.Genre.split(',').map(g => g.trim());
    genres.forEach(g => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });

  // Sort genres by frequency
  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  return {
    topGenre: sortedGenres[0] || 'Drama', // Default
    allPreferences: genreCounts
  };
}

module.exports = { analyzeTaste };
