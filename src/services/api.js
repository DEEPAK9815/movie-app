import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

const instance = axios.create({
    baseURL: BASE_URL,
});

export const getMovieDetails = async (id, type = 'movie') => {
    try {
        // Determine type if not provided, though usually passed. Defaults to movie.
        // For banner (Netflix Originals) it might be 'tv'. 
        const response = await instance.get(`/${type}/${id}?api_key=${API_KEY}&append_to_response=videos`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch details", error);
        return null;
    }
}

export default requests;
export { instance };
