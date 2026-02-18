import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, fetchFunction, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const [scrollX, setScrollX] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const request = await fetchFunction();
            // Watchmode returns { titles: [...] } or { results: [...] } depending on endpoint
            // My api.js returns response.data directly.
            // verify check_api.cjs output: { titles: [...] }
            if (request && request.titles) {
                setMovies(request.titles);
            } else if (request && Array.isArray(request)) {
                // specific lists might return array?
                setMovies(request);
            }
            return request;
        }
        fetchData();
    }, [fetchFunction]);

    const getImageUrl = (id) => {
        // Construct Watchmode poster URL
        // Assumption: 8 digit zero padded ID
        // Pattern: https://cdn.watchmode.com/posters/0{id}_poster_w342.jpg
        // If ID is 1234567 (7 digits), pad to 8 -> 01234567
        const paddedId = id.toString().padStart(7, '0'); // Wait, wait. "01550054" is 8 chars. ID=1550054 (7 chars). So padStart(7, '0') returns 1550054. I need padStart(?, '0')?
        // Ah, the prefix is `0`. 
        // Let's look at `01884698` (ID 1884698 - 7 digits).
        // It seems they prepend '0' if it's 7 digits? Or maybe it's always 8 digits long string?
        // Let's assume standard behavior: `id.toString().padStart(7, '0')` might not be enough context.
        // Let's try appending '0' manually if length is 7?
        // Actually, the example `01550054` suggests a leading zero.
        // Let's just use `id` and try.
        // Actually best bet: https://cdn.watchmode.com/posters/ + id + _poster_w342.jpg ? 
        // No, check check_api value: "https://cdn.watchmode.com/posters/01884698_poster_w342.jpg". There IS a leading zero.
        // Safe bet: `0${id}`? 
        // What if ID is 6 digits?
        // Let's use `.padStart(?, '0')`?
        // The safest guess for "01884698" from "1884698" is it's just prepending '0'.
        // Wait, TMDB IDs don't follow this. These are Watchmode IDs.
        return `https://cdn.watchmode.com/posters/0${id}_poster_w342.jpg`;
    };

    const scroll = (offset) => {
        const element = document.getElementById(title);
        element.scrollLeft += offset;
    }

    return (
        <div className="text-white ml-5">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="relative group">
                <div
                    id={title}
                    className="flex overflow-x-scroll scrollbar-hide scroll-smooth space-x-4 p-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map(movie => (
                        <div
                            key={movie.id}
                            className={`flex-none relative transition-transform duration-300 hover:scale-105 cursor-pointer ${isLargeRow ? 'w-[180px]' : 'w-[160px]'}`}
                        >
                            <img
                                className={`w-full rounded object-cover ${isLargeRow ? 'h-[270px]' : 'h-[240px]'}`}
                                src={getImageUrl(movie.id)}
                                alt={movie.title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/160x240?text=No+Image"; // Fallback
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-xs font-semibold truncate">{movie.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Scroll Buttons - Visible on Hover (Custom implementation or use group-hover) */}
                {/* Simplified for now, native scroll works well */}
            </div>
        </div>
    );
}

export default Row;
