const axios = require('axios');

const OMDB_API_KEY = process.env.TMDB_API_KEY; // Reusing the env var check, user said key is there.
const BASE_URL = 'http://www.omdbapi.com/';

const omdb = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: OMDB_API_KEY
    }
});

// Helper to fetch details
const fetchMovie = async (imdbID) => {
    try {
        const response = await omdb.get('', { params: { i: imdbID } });
        if (response.data.Response === 'False') {
            console.error(`OMDb Error for ${imdbID}:`, response.data.Error);
            return null;
        }
        return response.data;
    } catch (error) {
        console.error('OMDb Network Error:', error.message);
        return null;
    }
};

module.exports = { fetchMovie };
