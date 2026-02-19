import axios from 'axios';

const API_KEY = import.meta.env.VITE_WATCHMODE_API_KEY;
const BASE_URL = 'https://api.watchmode.com/v1';

const instance = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY,
    }
});

// Helper to hydrate a list of titles with details (images)
export const hydrateTitles = async (titles, limit = 20) => {
    const subset = titles.slice(0, limit);

    const detailsPromises = subset.map(title =>
        instance.get(`/title/${title.id}/details`)
            .then(res => res.data)
            .catch(err => {
                console.error(`Failed to hydrate title ${title.id}`, err);
                return null;
            })
    );

    const details = await Promise.all(detailsPromises);
    return details.filter(movie => movie !== null);
};

// Generic raw fetcher (returns ID/Title only)
const fetchRaw = async (endpoint, limit = 50) => {
    try {
        const res = await instance.get(`${endpoint}&limit=${limit}`);
        return res.data.titles || [];
    } catch (error) {
        console.error(`Error fetching raw ${endpoint}:`, error);
        return [];
    }
};

// Fetch raw lists
export const getTrendingRaw = () => fetchRaw('/list-titles/?sort_by=popularity_desc');
export const getTopRatedRaw = () => fetchRaw('/list-titles/?sort_by=user_rating_desc');
export const getActionRaw = () => fetchRaw('/list-titles/?genres=1');
export const getAdventureRaw = () => fetchRaw('/list-titles/?genres=2');
export const getComedyRaw = () => fetchRaw('/list-titles/?genres=4');
export const getDramaRaw = () => fetchRaw('/list-titles/?genres=7');
export const getHorrorRaw = () => fetchRaw('/list-titles/?genres=11');
export const getRomanceRaw = () => fetchRaw('/list-titles/?genres=14');
export const getDocumentariesRaw = () => fetchRaw('/list-titles/?genres=6');

// Backward compatibility (though Home.jsx will bypass this)
const getRandomPage = () => Math.floor(Math.random() * 3) + 1;
export const getTrending = async () => {
    const titles = await fetchRaw(`/list-titles/?sort_by=popularity_desc&page=${getRandomPage()}`);
    return { results: await hydrateTitles(titles, 15) };
};

// ... other exports kept for safety, but Home.jsx handles the main logic now
export const getTopRated = async () => getTrending(); // Placeholder
export const getActionMovies = async () => getTrending();
export const getComedyMovies = async () => getTrending();
export const getHorrorMovies = async () => getTrending();
export const getRomanceMovies = async () => getTrending();
export const getDocumentariesRawMovies = async () => getTrending();
export const getMovieDetails = async (id) => {
    const response = await instance.get(`/title/${id}/details`);
    return response.data;
};

export default {
    getTrendingRaw,
    getTopRatedRaw,
    getActionRaw,
    getAdventureRaw,
    getComedyRaw,
    getDramaRaw,
    getHorrorRaw,
    getRomanceRaw,
    getDocumentariesRaw,
    hydrateTitles,
    getTrending, // Legacy
    getMovieDetails
};
