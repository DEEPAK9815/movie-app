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
        // Add random page to get different results on reload
        // Random page 1 or 2. This + limit 50 gives us a pool of ~100 potential items per category depending on reload
        const randomPage = Math.floor(Math.random() * 2) + 1;
        const res = await instance.get(`${endpoint}&limit=${limit}&page=${randomPage}`);
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

// Legacy exports stubbed to use new flow if called directly (though Home.jsx bypasses them)
export const getTrending = async () => ({ results: [] });
export const getTopRated = async () => ({ results: [] });
export const getActionMovies = async () => ({ results: [] });
export const getComedyMovies = async () => ({ results: [] });
export const getHorrorMovies = async () => ({ results: [] });
export const getRomanceMovies = async () => ({ results: [] });
export const getDocumentariesRawMovies = async () => ({ results: [] });

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
    getMovieDetails
};
