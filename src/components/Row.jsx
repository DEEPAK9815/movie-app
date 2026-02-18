import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, fetchFunction, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await fetchFunction();
                // TMDB (and our mock) return { results: [...] }
                if (request && request.results) {
                    setMovies(request.results);
                } else if (Array.isArray(request)) {
                    setMovies(request);
                }
            } catch (error) {
                console.error("Failed to fetch movies for row:", title, error);
            }
        }
        fetchData();
    }, [fetchFunction, title]);

    const getImageUrl = (path) => {
        // TMDB Image CDN
        if (!path) return "";
        return `https://image.tmdb.org/t/p/w500${path}`;
    };

    const scroll = (offset) => {
        if (rowRef.current) {
            rowRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    }

    return (
        <div className="text-white ml-5 relative group my-8">
            <h2 className="text-2xl font-bold mb-4 px-2">{title}</h2>

            <div className="relative group/row">
                {/* Left Scroll Button */}
                <div
                    className={`absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 ${movies.length === 0 ? 'hidden' : ''}`}
                    onClick={() => scroll(-500)}
                >
                    <ChevronLeft className="text-white" size={40} />
                </div>

                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll scrollbar-hide scroll-smooth space-x-4 p-4 pl-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <div
                                key={movie.id}
                                className={`flex-none relative transition-transform duration-300 hover:scale-110 cursor-pointer ${isLargeRow ? 'w-[200px]' : 'w-[180px]'} hover:z-10`}
                            >
                                <img
                                    className={`w-full rounded object-cover shadow-lg ${isLargeRow ? 'h-[300px]' : 'h-[270px]'}`}
                                    src={getImageUrl(isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path)}
                                    alt={movie.title}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = "none";
                                    }}
                                />
                                {/* Overlay/fallback if needed */}

                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-b">
                                    <p className="text-sm font-semibold truncate text-center text-white drop-shadow-md">{movie.title}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full h-40 text-gray-500">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>

                {/* Right Scroll Button */}
                <div
                    className={`absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 ${movies.length === 0 ? 'hidden' : ''}`}
                    onClick={() => scroll(500)}
                >
                    <ChevronRight className="text-white" size={40} />
                </div>
            </div>
        </div>
    );
}

export default Row;
