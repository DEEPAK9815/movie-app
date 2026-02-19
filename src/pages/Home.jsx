import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import MovieModal from '../components/MovieModal';
import {
    getTrending,
    getTopRated,
    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getRomanceMovies,
    getDocumentaries
} from '../services/api';

const Home = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden">
            <Navbar />
            <Banner fetchFunction={getTrending} onMovieSelect={setSelectedMovie} />

            <div className="relative pl-0 md:pl-8 pb-10 space-y-4 md:space-y-8 z-30 -mt-24 md:-mt-48 bg-gradient-to-b from-transparent via-[#141414] to-[#141414]">
                <Row title="Trending Now" fetchFunction={getTrending} isLargeRow onMovieClick={setSelectedMovie} />
                <Row title="Top Rated" fetchFunction={getTopRated} onMovieClick={setSelectedMovie} />
                <Row title="Action Thrillers" fetchFunction={getActionMovies} onMovieClick={setSelectedMovie} />
                <Row title="Comedies" fetchFunction={getComedyMovies} onMovieClick={setSelectedMovie} />
                <Row title="Scary Movies" fetchFunction={getHorrorMovies} onMovieClick={setSelectedMovie} />
                <Row title="Romance Movies" fetchFunction={getRomanceMovies} onMovieClick={setSelectedMovie} />
                <Row title="Documentaries" fetchFunction={getDocumentaries} onMovieClick={setSelectedMovie} />
            </div>

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}

            <footer className="w-full bg-[#141414] py-8 text-center text-gray-500 text-sm">
                <p>Designed by Deepak | Powered by Watchmode API</p>
                <div className="mt-2 text-xs">
                    &copy; {new Date().getFullYear()} Movie App Clone
                </div>
            </footer>
        </div>
    );
};

export default Home;
