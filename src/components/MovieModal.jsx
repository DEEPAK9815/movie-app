import React, { useState, useEffect } from 'react';
import { X, Play, Plus, ThumbsUp, Volume2, VolumeX } from 'lucide-react';
import { getMovieDetails } from '../services/api';

const MovieModal = ({ movie, onClose }) => {
    const [details, setDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        if (movie) {
            async function fetchDetails() {
                const data = await getMovieDetails(movie.id, movie.media_type || (movie.first_air_date ? 'tv' : 'movie'));
                setDetails(data);

                if (data?.videos?.results) {
                    const trailerVid = data.videos.results.find(
                        (vid) => vid.name === "Official Trailer" || vid.type === "Trailer"
                    );
                    setTrailer(trailerVid ? trailerVid.key : data.videos.results[0]?.key);
                }
            }
            fetchDetails();
        }

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [movie]);

    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pt-10 pb-10 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div
                className="relative w-[95%] md:w-[850px] bg-[#181818] rounded-md shadow-2xl overflow-hidden transform scale-100 transition-transform duration-300"
                onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it if we added backdrop click handler
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 bg-[#181818] rounded-full p-1.5 hover:bg-[#2a2a2a] transition"
                >
                    <X className="text-white w-6 h-6" />
                </button>

                {/* Video/Backdrop Area */}
                <div className="relative h-[300px] md:h-[480px] w-full">
                    {trailer ? (
                        <iframe
                            className="w-full h-full object-cover"
                            src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")` }}
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

                    <div className="absolute bottom-12 left-8 md:left-12 flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded font-bold hover:bg-opacity-80 transition text-lg">
                            <Play className="fill-black w-6 h-6" /> Play
                        </button>
                        <button className="flex items-center justify-center border-2 border-gray-500 rounded-full w-10 h-10 hover:border-white transition bg-[rgba(42,42,42,0.6)]">
                            <Plus className="text-white w-5 h-5" />
                        </button>
                        <button className="flex items-center justify-center border-2 border-gray-500 rounded-full w-10 h-10 hover:border-white transition bg-[rgba(42,42,42,0.6)]">
                            <ThumbsUp className="text-white w-5 h-5" />
                        </button>
                    </div>

                    <button
                        onClick={() => setMuted(!muted)}
                        className="absolute bottom-12 right-12 border border-gray-500 rounded-full p-2 hover:border-white transition bg-[rgba(42,42,42,0.6)]"
                    >
                        {muted ? <VolumeX className="text-white w-5 h-5" /> : <Volume2 className="text-white w-5 h-5" />}
                    </button>
                </div>

                {/* Info Area */}
                <div className="px-8 md:px-12 py-6 grid md:grid-cols-[70%_30%] gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4 text-sm font-semibold text-gray-400">
                            <span className="text-[#46d369]">98% Match</span>
                            <span>{movie?.release_date || movie?.first_air_date}</span>
                            <span className="border border-gray-500 px-1 text-xs">HD</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{movie?.title || movie?.name}</h2>
                        <p className="text-base leading-relaxed text-gray-300">
                            {movie?.overview}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 text-sm text-gray-400">
                        <div>
                            <span className="text-gray-500">Genres: </span>
                            <span className="text-white hover:underline cursor-pointer">
                                {details?.genres?.map(g => g.name).join(', ')}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Original Language: </span>
                            <span className="text-white ml-1">
                                {movie?.original_language?.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Vote Average: </span>
                            <span className="text-white ml-1">
                                {movie?.vote_average} / 10
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Backdrop Close Click */}
            <div className="absolute inset-0 z-[-1]" onClick={onClose} />
        </div>
    );
};

export default MovieModal;
