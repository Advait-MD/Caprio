const axios = require('axios');
const API_KEY = process.env.TMDB_API_KEY || 'YOUR_TMDB_API_KEY';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY
  }
});

module.exports = { API_KEY, tmdb };
