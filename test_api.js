import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const envPath = 'd:\\Movie\\.env';

try {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    const apiKeyLine = envConfig.split('\n').find(line => line.startsWith('VITE_WATCHMODE_API_KEY'));

    if (!apiKeyLine) {
        throw new Error("API Key not found in .env");
    }

    const apiKey = apiKeyLine.split('=')[1].trim();
    console.log(`Testing with API Key: ${apiKey.substring(0, 5)}...`);

    const testWatchmode = async () => {
        try {
            // Using list-titles which is a standard endpoint
            const url = `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&sort_by=popularity_desc&limit=3`;
            console.log(`Fetching from: ${url}`);
            const response = await axios.get(url);
            console.log('Response Status:', response.status);
            console.log('First Result:', JSON.stringify(response.data.titles[0], null, 2));

            // Check if we need to fetch details for images
            if (!response.data.titles[0].poster && response.data.titles[0].tmdb_id) {
                console.log("No poster in list, but found tmdb_id. We will use TMDB for images.");
            }

        } catch (error) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
    };

    testWatchmode();

} catch (e) {
    console.error("Error reading .env:", e.message);
}
