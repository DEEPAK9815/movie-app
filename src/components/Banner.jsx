import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';

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

    if (!movie) return <div className="h-[60vh] md:h-[80vh] bg-[#141414] animate-pulse flex items-center justify-center text-white"></div>;

    const backdropUrl = movie.backdrop || movie.poster;

    return (
        <header
            className="relative h-[60vh] md:h-[80vh] text-white object-contain flex flex-col justify-end pb-24 md:pb-48 transition-opacity duration-1000"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("${backdropUrl}")`,
                backgroundPosition: 'top center',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60" />

            <div className="ml-4 md:ml-12 pt-44 relative z-10 w-full max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold pb-2 drop-shadow-2xl text-shadow-md">
                    {movie?.title || "Unknown Title"}
                </h1>

                <div className="flex gap-4 my-6">
                    <button
                        onClick={() => alert(`Playing ${movie?.title}`)}
                        className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-opacity-80 transition cursor-pointer font-bold text-lg md:text-xl"
                    >
                        <Play className="fill-black w-6 h-6 md:w-7 md:h-7" /> Play
                    </button>
                    <button
                        onClick={() => alert(`More info about ${movie?.title}`)}
                        className="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-[rgba(109,109,110,0.4)] transition cursor-pointer font-bold text-lg md:text-xl"
                    >
                        <Info className="w-6 h-6 md:w-7 md:h-7" /> More Info
                    </button>
                </div>

                <h1 className="w-full text-base md:text-lg max-w-lg leading-snug drop-shadow-md text-gray-200 line-clamp-3">
                    {movie?.plot_overview || movie?.overview || "No description available."}
                </h1>
            </div>

            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#141414] to-transparent" />
        </header>
    );
};

export default Banner;
