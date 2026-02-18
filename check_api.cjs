
const axios = require('axios');
const API_KEY = 'M06GchJwokD8jWJFa8NvLzvdfXRG3lk7cK1Qr8xF';

async function check() {
    try {
        // Test ID: 1550054 (another one from similar)
        const id = 1550054;
        const constructUrl = `https://cdn.watchmode.com/posters/0${id}_poster_w342.jpg`; // Trying 8 digits?
        console.log(`Constructed URL: ${constructUrl}`);

        try {
            await axios.head(constructUrl);
            console.log("Constructed URL is VALID (200 OK)");
        } catch (e) {
            console.log("Constructed URL is INVALID: " + e.message);
        }

        const response = await axios.get(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${API_KEY}`);
        console.log("Actual Poster: " + response.data.poster);
        console.log("Actual Backdrop: " + response.data.backdrop);
    } catch (error) {
        console.error(error);
    }
}

check();
