
const axios = require('axios');
const API_KEY = 'M06GchJwokD8jWJFa8NvLzvdfXRG3lk7cK1Qr8xF';

async function check() {
    try {
        console.log("Checking Trending (types='movie', sort_by='popularity_desc')...");
        const trendingResponse = await axios.get(`https://api.watchmode.com/v1/list-titles/?apiKey=${API_KEY}`, {
            params: {
                sort_by: 'popularity_desc',
                types: 'movie',
                limit: 5
            }
        });
        console.log("Trending count: " + trendingResponse.data.titles.length);
        if (trendingResponse.data.titles.length > 0) {
            console.log("Sample Trending: " + JSON.stringify(trendingResponse.data.titles[0], null, 2));
        }

        console.log("\nChecking Top Rated (types='movie', sort_by='user_rating_desc')...");
        const topRatedResponse = await axios.get(`https://api.watchmode.com/v1/list-titles/?apiKey=${API_KEY}`, {
            params: {
                sort_by: 'user_rating_desc',
                types: 'movie',
                limit: 5
            }
        });
        console.log("Top Rated count: " + topRatedResponse.data.titles.length);
        if (topRatedResponse.data.titles.length > 0) {
            console.log("Sample Top Rated: " + JSON.stringify(topRatedResponse.data.titles[0], null, 2));
        }

    } catch (error) {
        console.error("API Error: ", error.response ? error.response.data : error.message);
    }
}

check();
