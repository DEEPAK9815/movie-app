import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, fetchFunction, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await fetchFunction();
                if (request && request.titles) {
                    setMovies(request.titles);
                } else if (request && Array.isArray(request)) {
                    setMovies(request);
                }
            } catch (error) {
                console.error("Failed to fetch movies for row:", title, error);
            }
        }
        fetchData();
    }, [fetchFunction, title]);

    const getImageUrl = (id) => {
        // Watchmode poster image pattern
        return `https://cdn.watchmode.com/posters/0${id}_poster_w342.jpg`;
    };

    const scroll = (offset) => {
        if (rowRef.current) {
            rowRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    }

    return (
        <div className="text-white ml-5 relative group my-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>

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
                                className={`flex-none relative transition-transform duration-300 hover:scale-110 cursor-pointer ${isLargeRow ? 'w-[180px]' : 'w-[160px]'} hover:z-10`}
                            >
                                <img
                                    className={`w-full rounded object-cover shadow-lg ${isLargeRow ? 'h-[270px]' : 'h-[240px]'}`}
                                    src={getImageUrl(movie.id)}
                                    alt={movie.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = "none"; // Hide broken images? Or show placeholder?
                                        // e.target.src = "https://via.placeholder.com/160x240?text=No+Image"; 
                                    }}
                                />
                                {/* Fallback container if image hidden */}
                                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center -z-10 rounded">
                                    <span className="text-xs text-center p-2">{movie.title}</span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-b">
                                    <p className="text-xs font-semibold truncate text-center text-white">{movie.title}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center w-full h-40 text-gray-500">
                            <p>No movies available</p>
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
