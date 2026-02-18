import axios from 'axios';

const API_KEY = import.meta.env.VITE_WATCHMODE_API_KEY;
const BASE_URL = 'https://api.watchmode.com/v1/';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY,
    }
});

// Watchmode doesn't have the exact same endpoints as TMDB, so we simulate categories
// retrieving lists or relying on genres.
// endpoints: https://api.watchmode.com/docs/

export const getTrending = async () => {
    // Watchmode "list-titles" can be used for trending if we sort by popularity?
    // Or /titles/ available...
    // The previous search suggested /movies/popular?
    // Let's assume a standard list endpoint or check docs if needed. 
    // Actually, let's use the 'list-titles' endpoint with 'sort_by=popularity_desc'
    try {
        const response = await api.get('list-titles/', {
            params: {
                sort_by: 'popularity_desc',
                types: 'movie',
                limit: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return { titles: [] };
    }
};

export const getTopRated = async () => {
    try {
        const response = await api.get('list-titles/', {
            params: {
                sort_by: 'user_rating_desc',
                types: 'movie',
                limit: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching top rated movies:", error);
        return { titles: [] };
    }
};

export const getActionMovies = async () => {
    try {
        const response = await api.get('list-titles/', {
            params: {
                genres: 1, // Action
                sort_by: 'popularity_desc',
                limit: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching action movies:", error);
        return { titles: [] };
    }
};

export const getComedyMovies = async () => {
    try {
        const response = await api.get('list-titles/', {
            params: {
                genres: 4, // Comedy
                sort_by: 'popularity_desc',
                limit: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comedy movies:", error);
        return { titles: [] };
    }
};

export const getHorrorMovies = async () => {
    try {
        const response = await api.get('list-titles/', {
            params: {
                genres: 11, // Horror
                sort_by: 'popularity_desc',
                limit: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching horror movies:", error);
        return { titles: [] };
    }
};

export const getRomanceMovies = async () => {
    try {
        const response = await api.get('list-titles/', {
            params: {
                genres: 14, // Romance
                sort_by: 'popularity_desc',
                limit: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching romance movies:", error);
        return { titles: [] };
    }
};

export const getDocumentaries = async () => {
    try {
        const response = await api.get('list-titles/', {
            params: {
                genres: 6, // Documentary
                sort_by: 'popularity_desc',
                limit: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching documentaries:", error);
        return { titles: [] };
    }
};

// Also need a way to get details including images (poster/backdrop)
// The list-titles endpoint might not return full images.
// We might need to fetch details for each item or use a different endpoint?
// According to docs (implied), list-titles is lightweight.
// However, let's start with this and see what we get.
// If needed we can fetch details for the hero movie.
export const getMovieDetails = async (id) => {
    try {
        const response = await api.get(`title/${id}/details/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}

export default api;
