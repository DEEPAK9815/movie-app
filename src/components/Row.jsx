import React, { useState, useEffect, useRef } from 'react';
import { instance } from '../services/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow, onMovieSelect }) => {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const scroll = (offset) => {
        if (rowRef.current) {
            rowRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    return (
        <div
            className="text-white ml-5 relative my-4 md:my-8 z-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 px-2 hover:text-[#e5e5e5] transition w-fit cursor-pointer">{title}</h2>

            <div className="relative group/row">
                <div
                    className={`absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${isHovered && movies.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => scroll(-800)}
                >
                    <ChevronLeft className="text-white w-8 h-8 md:w-12 md:h-12" />
                </div>

                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll scrollbar-hide scroll-smooth space-x-2 md:space-x-4 p-4 pl-1 pb-8" // Added pb-8 for scaling space
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map(movie => (
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                key={movie.id}
                                onClick={() => onMovieSelect(movie)}
                                className={`flex-none object-cover transition-transform duration-450 hover:scale-110 hover:z-30 cursor-pointer rounded-sm ${isLargeRow ? "h-[250px] md:h-[350px]" : "h-[100px] md:h-[150px] w-auto"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                        )
                    ))}
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
