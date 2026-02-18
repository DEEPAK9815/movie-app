import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { getMovieDetails } from '../services/api';

const Banner = ({ fetchFunction }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await fetchFunction();
                if (request && request.results && request.results.length > 0) {
                    const randomMovie = request.results[Math.floor(Math.random() * request.results.length)];
                    setMovie(randomMovie);
                }
            } catch (error) {
                console.error("Banner fetch error:", error);
            }
        }
        fetchData();
    }, [fetchFunction]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    if (!movie) return <div className="h-[600px] bg-black/90 animate-pulse flex items-center justify-center text-white">Loading Banner...</div>;

    // TMDB Image
    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`;

    return (
        <header
            className="relative h-[700px] text-white object-contain flex flex-col justify-center"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("${backdropUrl}")`,
                backgroundPosition: 'top center',
            }}
        >
            {/* Gradient Overlays for that cinematic fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>

            <div className="ml-8 pt-44 relative z-10 w-full max-w-2xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold pb-2 drop-shadow-2xl">
                    {movie?.title || "Unknown Title"}
                </h1>

                <div className="flex gap-4 my-6">
                    <button
                        onClick={() => alert(`Playing ${movie?.title}`)}
                        className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition cursor-pointer font-bold text-lg"
                    >
                        <Play className="fill-black w-6 h-6" /> Play
                    </button>
                    <button
                        onClick={() => alert(`More info about ${movie?.title}`)}
                        className="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white px-8 py-3 rounded hover:bg-[rgba(109,109,110,0.4)] transition cursor-pointer font-bold text-lg"
                    >
                        <Info className="w-6 h-6" /> More Info
                    </button>
                </div>

                <h1 className="w-full text-lg md:text-xl max-w-lg leading-snug drop-shadow-md text-gray-100">
                    {truncate(movie?.overview || "No description available.", 200)}
                </h1>
            </div>

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#111] to-transparent" />
        </header>
    );
};

export default Banner;
