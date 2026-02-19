import React, { useEffect } from 'react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';

const MovieModal = ({ movie, onClose }) => {
    if (!movie) return null;

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const playTrailer = () => {
        if (movie.trailer) {
            window.open(movie.trailer, '_blank');
        } else {
            alert("No trailer available for this title.");
        }
    };

    const backdropUrl = movie.backdrop || movie.poster;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div className="bg-[#181818] w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-[#181818] rounded-full p-2 hover:bg-white/20 transition"
                >
                    <X className="text-white w-6 h-6" />
                </button>

                {/* Hero / Trailer Area */}
                <div className="relative h-[400px] md:h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10" />
                    <img
                        src={backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-10 left-8 md:left-12 z-20 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-black drop-shadow-lg leading-tight">
                            {movie.title}
                        </h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={playTrailer}
                                className="flex items-center gap-2 bg-white text-black px-8 py-2 md:py-3 rounded font-bold hover:bg-opacity-90 transition text-lg"
                            >
                                <Play className="fill-black w-6 h-6" /> Play
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border-2 border-gray-400 rounded-full hover:border-white hover:bg-white/10 transition text-white">
                                <Plus className="w-6 h-6" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border-2 border-gray-400 rounded-full hover:border-white hover:bg-white/10 transition text-white">
                                <ThumbsUp className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="px-8 md:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-4 text-sm font-semibold text-gray-400">
                            <span className="text-[#46d369]">98% Match</span>
                            <span>{movie.year}</span>
                            <span className="border border-gray-600 px-1 rounded text-xs">{movie.us_rating || "PG-13"}</span>
                            <span>{movie.runtime_minutes ? `${Math.floor(movie.runtime_minutes / 60)}h ${movie.runtime_minutes % 60}m` : "Unknown runtime"}</span>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-200">
                            {movie.plot_overview || movie.overview}
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-gray-400">
                        <div>
                            <span className="block text-gray-500 mb-1">Genres:</span>
                            <span className="text-white hover:underline cursor-pointer">
                                {movie.genre_names ? movie.genre_names.join(', ') : "Various"}
                            </span>
                        </div>
                        <div>
                            <span className="block text-gray-500 mb-1">Original Language:</span>
                            <span className="text-white capitalize">{movie.original_language || "English"}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 mb-1">TMDB Rating:</span>
                            <span className="text-white">{movie.user_rating}/10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
