import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { getMovieDetails } from '../services/api';

const Banner = ({ fetchFunction }) => {
    const [movie, setMovie] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await fetchFunction();
                if (request && request.titles && request.titles.length > 0) {
                    const randomMovie = request.titles[Math.floor(Math.random() * request.titles.length)];
                    setMovie(randomMovie);

                    try {
                        const detailData = await getMovieDetails(randomMovie.id);
                        setDetails(detailData);
                    } catch (err) {
                        console.error("Failed to fetch banner details", err);
                    }
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

    if (!movie) return <div className="h-[448px] bg-black/90 animate-pulse flex items-center justify-center">Loading...</div>;

    const backdropUrl = details?.backdrop || details?.posterLarge || details?.poster;

    return (
        <header
            className="relative h-[600px] text-white object-contain flex flex-col justify-center"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("${backdropUrl || ''}")`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>

            <div className="ml-8 pt-36 relative z-10 w-full max-w-2xl px-4">
                <h1 className="text-5xl md:text-6xl font-bold pb-2 drop-shadow-2xl">
                    {details?.title || movie?.title || "Unknown Title"}
                </h1>

                <div className="flex gap-4 my-6">
                    <button
                        onClick={() => alert(`Playing ${details?.title || movie?.title}`)}
                        className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition cursor-pointer font-bold text-lg"
                    >
                        <Play className="fill-black w-6 h-6" /> Play
                    </button>
                    <button
                        onClick={() => alert(`More info about ${details?.title || movie?.title}`)}
                        className="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white px-8 py-3 rounded hover:bg-[rgba(109,109,110,0.4)] transition cursor-pointer font-bold text-lg"
                    >
                        <Info className="w-6 h-6" /> More Info
                    </button>
                </div>

                <h1 className="w-full text-lg md:text-xl max-w-lg leading-snug drop-shadow-md">
                    {truncate(details?.plot_overview || details?.description || "No description available.", 200)}
                </h1>
            </div>
        </header>
    );
};

export default Banner;
