import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { getMovieDetails } from '../services/api';

const Banner = ({ fetchFunction }) => {
    const [movie, setMovie] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        async function fetchData() {
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
        }
        fetchData();
    }, [fetchFunction]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    if (!movie) return <div className="h-[448px] bg-black animate-pulse"></div>;

    const backdropUrl = details?.backdrop || details?.posterLarge || details?.poster;

    return (
        <header
            className="relative h-[448px] text-white object-contain flex flex-col justify-center"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("${backdropUrl || ''}")`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/60"></div>

            <div className="ml-8 pt-36 relative z-10 w-full max-w-2xl">
                <h1 className="text-5xl font-bold pb-2 drop-shadow-lg">
                    {details?.title || movie?.title || "Unknown Title"}
                </h1>

                <div className="flex gap-4 my-4">
                    <button className="flex items-center gap-2 bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-200 transition">
                        <Play className="fill-black w-5 h-5" /> Play
                    </button>
                    <button className="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white px-8 py-2 rounded font-bold hover:bg-[rgba(109,109,110,0.4)] transition">
                        <Info className="w-5 h-5" /> More Info
                    </button>
                </div>

                <h1 className="w-full text-sm md:text-lg max-w-lg h-20 overflow-hidden leading-snug shadow-black drop-shadow-md">
                    {truncate(details?.plot_overview || details?.description || "No description available.", 150)}
                </h1>
            </div>

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#111] to-transparent" />
        </header>
    );
};

export default Banner;
