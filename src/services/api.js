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
const hydrateTitles = async (titles, limit = 12) => {
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

// Return a random page number between 1 and 3 to vary results
const getRandomPage = () => Math.floor(Math.random() * 3) + 1;

export const getTrending = async () => {
    try {
        const response = await instance.get(`/list-titles/?sort_by=popularity_desc&limit=15&page=${getRandomPage()}`);
        const hydrated = await hydrateTitles(response.data.titles);
        return { results: hydrated };
    } catch (error) {
        console.error("Error fetching trending:", error);
        return { results: [] };
    }
};

export const getTopRated = async () => {
    try {
        const response = await instance.get(`/list-titles/?sort_by=user_rating_desc&limit=15&page=${getRandomPage()}`);
        const hydrated = await hydrateTitles(response.data.titles);
        return { results: hydrated };
    } catch (error) {
        console.error("Error fetching top rated:", error);
        return { results: [] };
    }
};

export const getActionMovies = async () => {
    const response = await instance.get(`/list-titles/?genres=1&limit=15&page=${getRandomPage()}`);
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getComedyMovies = async () => {
    const response = await instance.get(`/list-titles/?genres=4&limit=15&page=${getRandomPage()}`);
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getHorrorMovies = async () => {
    const response = await instance.get(`/list-titles/?genres=11&limit=15&page=${getRandomPage()}`);
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getRomanceMovies = async () => {
    const response = await instance.get(`/list-titles/?genres=14&limit=15&page=${getRandomPage()}`);
    const hydrated = await hydrateTitles(response.data.titles);
    return { results: hydrated };
};

export const getDocumentaries = async () => {
    const response = await instance.get(`/list-titles/?genres=6&limit=15&page=${getRandomPage()}`);
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
