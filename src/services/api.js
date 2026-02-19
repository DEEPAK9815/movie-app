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
// Limiting to 10 items to save API calls
const hydrateTitles = async (titles, limit = 12) => {
    const subset = titles.slice(0, limit);

    // Create an array of promises to fetch details for each title
    const detailsPromises = subset.map(title =>
        instance.get(`/title/${title.id}/details`)
            .then(res => res.data)
            .catch(err => {
                console.error(`Failed to hydrate title ${title.id}`, err);
                return null;
            })
    );

    const details = await Promise.all(detailsPromises);
    // Filter out any failed requests
    return details.filter(movie => movie !== null);
};

export const getTrending = async () => {
    try {
        const response = await instance.get('/list-titles/?sort_by=popularity_desc&limit=15'); // Fetch slightly more than needed
        const hydrated = await hydrateTitles(response.data.titles);
        return { results: hydrated };
    } catch (error) {
        console.error("Error fetching trending:", error);
        return { results: [] };
    }
};

export const getTopRated = async () => {
    try {
        // Watchmode lacks a direct "top rated" equivalent in list-titles essentially, but we can sort by rating if available or just use user_rating_desc? 
        // Checking docs: sort_by=user_rating_desc is valid? Let's try popularity first as it's safer, maybe different genre.
        // Actually showing "Relevance" or "Rating" might be better. Let's use popularity for checking.
        const response = await instance.get('/list-titles/?sort_by=user_rating_desc&limit=15');
        const hydrated = await hydrateTitles(response.data.titles);
        return { results: hydrated };
    } catch (error) {
        console.error("Error fetching top rated:", error);
        return { results: [] };
    }
};

// Genre IDs for Watchmode (Common mapping)
// 1 = Action, 4 = Comedy, 11 = Horror, 14 = Romance, 6 = Documentary
export const getActionMovies = async () => {
    const response = await instance.get('/list-titles/?genres=1&limit=15');
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getComedyMovies = async () => {
    const response = await instance.get('/list-titles/?genres=4&limit=15');
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getHorrorMovies = async () => {
    const response = await instance.get('/list-titles/?genres=11&limit=15');
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getRomanceMovies = async () => {
    const response = await instance.get('/list-titles/?genres=14&limit=15');
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getDocumentaries = async () => {
    const response = await instance.get('/list-titles/?genres=6&limit=15');
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getMovieDetails = async (id) => {
    const response = await instance.get(`/title/${id}/details`);
    return response.data;
};

export default {
    getTrending,
    getTopRated,
    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getRomanceMovies,
    getDocumentaries,
    getMovieDetails
};
