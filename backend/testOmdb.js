require('dotenv').config();
const axios = require('axios');

const OMDB_API_KEY = process.env.TMDB_API_KEY;
console.log("Using API Key:", OMDB_API_KEY);

const testId = 'tt0137523'; // Fight Club

async function test() {
    try {
        const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${testId}`;
        console.log("Fetching:", url);
        const res = await axios.get(url);
        console.log("Response Status:", res.status);
        console.log("Response Data:", res.data);
    } catch (err) {
        console.error("Error:", err.message);
        if (err.response) console.error("Data:", err.response.data);
    }
}

test();
