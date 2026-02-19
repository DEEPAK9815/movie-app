import React, { useState, useEffect } from 'react';
import { instance } from '../services/api';
import requests, { getMovieDetails } from '../services/api';
import { Play, Info } from 'lucide-react';

const Banner = ({ onMovieSelect }) => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <header
            className="relative h-[60vh] md:h-[80vh] text-white object-contain flex flex-col justify-end pb-24 md:pb-48"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#111]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-40" />

            <div className="ml-8 pt-36 md:ml-12 relative z-10 max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold pb-4 drop-shadow-lg">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="flex gap-4 my-6">
                    <button
                        onClick={() => onMovieSelect({ ...movie, media_type: 'tv' })} // Originals are typically TV
                        className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-opacity-80 transition cursor-pointer font-bold text-lg md:text-xl"
                    >
                        <Play className="fill-black w-6 h-6 md:w-7 md:h-7" /> Play
                    </button>
                    <button
                        onClick={() => onMovieSelect({ ...movie, media_type: 'tv' })}
                        className="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-[rgba(109,109,110,0.4)] transition cursor-pointer font-bold text-lg md:text-xl"
                    >
                        <Info className="w-6 h-6 md:w-7 md:h-7" /> More Info
                    </button>
                </div>

                <h1 className="w-full text-base md:text-lg max-w-lg leading-snug drop-shadow-md text-gray-200 line-clamp-3">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#111] to-transparent" />
        </header>
    );
}

export default Banner;
