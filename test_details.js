import axios from 'axios';
import fs from 'fs';

const envPath = 'd:\\Movie\\.env';

try {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    const apiKeyLine = envConfig.split('\n').find(line => line.startsWith('VITE_WATCHMODE_API_KEY'));
    const apiKey = apiKeyLine.split('=')[1].trim();

    const testDetails = async () => {
        try {
            // Test details for Predator: Badlands (ID: 1884698)
            const id = 1884698;
            const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}`;
            console.log(`Fetching details from: ${url}`);
            const response = await axios.get(url);
            console.log('Details Response:', JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error fetching details:', error.response ? error.response.data : error.message);
        }
    };

    testDetails();

} catch (e) {
    console.error("Error:", e.message);
}
