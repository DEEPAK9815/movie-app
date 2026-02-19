import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, fetchFunction, movies: propMovies, isLargeRow = false, onMovieClick }) => {
    const [movies, setMovies] = useState(propMovies || []);
    const rowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (propMovies) {
            setMovies(propMovies);
            return;
        }
        // Fallback for legacy usage
        if (fetchFunction) {
            async function fetchData() {
                try {
                    const request = await fetchFunction();
                    if (request && request.results) {
                        setMovies(request.results);
                    }
                } catch (error) {
                    console.error("Failed to fetch movies for row:", title, error);
                }
            }
            fetchData();
        }
    }, [fetchFunction, title, propMovies]);

    const scroll = (offset) => {
        if (rowRef.current) {
            rowRef.current.scrollBy({ left: offset, behavior: 'smooth' });
        }
    }

    return (
        <div
            className="text-white ml-2 md:ml-5 relative my-4 md:my-8 z-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 px-2 cursor-pointer hover:text-gray-300 transition w-fit duration-200">{title}</h2>

            <div className="relative group/row">
                <div
                    className={`absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${isHovered && movies.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => scroll(-800)}
                >
                    <ChevronLeft className="text-white w-8 h-8 md:w-12 md:h-12" />
                </div>

                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll scrollbar-hide scroll-smooth space-x-2 md:space-x-4 p-4 pl-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <div
                                key={movie.id}
                                onClick={() => onMovieClick && onMovieClick(movie)}
                                className={`flex-none relative transition-all duration-300 hover:scale-105 hover:z-30 cursor-pointer ${isLargeRow ? 'w-[160px] md:w-[220px]' : 'w-[140px] md:w-[200px]'}`}
                            >
                                <img
                                    className={`w-full rounded-md object-cover ${isLargeRow ? 'h-[240px] md:h-[330px]' : 'h-[100px] md:h-[140px]'}`}
                                    src={isLargeRow ? (movie.poster || movie.poster_path) : (movie.backdrop || movie.backdrop_path || movie.poster)}
                                    alt={movie.title}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <div className={`absolute bottom-0 left-0 right-0 p-2 bg-black/80 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-b-md ${isLargeRow ? '' : 'text-xs'}`}>
                                    <p className="font-semibold truncate text-white">{movie.title}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className={`flex-none bg-[#2f2f2f] animate-pulse rounded-md ${isLargeRow ? 'w-[160px] h-[240px]' : 'w-[140px] h-[100px]'}`}></div>
                        ))
                    )}
                </div>

                <div
                    className={`absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${isHovered && movies.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => scroll(800)}
                >
                    <ChevronRight className="text-white w-8 h-8 md:w-12 md:h-12" />
                </div>
            </div>
        </div>
    );
}

export default Row;
