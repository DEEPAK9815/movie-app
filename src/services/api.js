import { mockData } from '../data/mockData';

// Simulating async API calls
export const getTrending = async () => {
    return { results: mockData.trending };
};

export const getTopRated = async () => {
    return { results: mockData.topRated };
};

export const getActionMovies = async () => {
    return { results: mockData.action };
};

export const getComedyMovies = async () => {
    return { results: mockData.comedy };
};

export const getHorrorMovies = async () => {
    return { results: mockData.horror };
};

export const getRomanceMovies = async () => {
    return { results: mockData.romance };
};

export const getDocumentaries = async () => {
    return { results: mockData.documentaries };
};

export const getMovieDetails = async (id) => {
    // Find movie in any category
    const allMovies = [
        ...mockData.trending,
        ...mockData.topRated,
        ...mockData.action,
        ...mockData.comedy,
        ...mockData.horror,
        ...mockData.romance,
        ...mockData.documentaries
    ];
    return allMovies.find(m => m.id === id) || null;
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
