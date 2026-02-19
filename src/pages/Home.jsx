import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import MovieModal from '../components/MovieModal';
import requests from '../services/api';

const Home = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <div className="bg-[#111] min-h-screen text-white overflow-x-hidden">
            <Navbar />
            <Banner onMovieSelect={setSelectedMovie} />

            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow onMovieSelect={setSelectedMovie} />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieSelect={setSelectedMovie} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onMovieSelect={setSelectedMovie} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onMovieSelect={setSelectedMovie} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onMovieSelect={setSelectedMovie} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onMovieSelect={setSelectedMovie} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onMovieSelect={setSelectedMovie} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} onMovieSelect={setSelectedMovie} />

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
            )}
        </div>
    );
};

export default Home;
