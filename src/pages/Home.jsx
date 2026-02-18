import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
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
    return (
        <div className="bg-[#111] min-h-screen text-white overflow-hidden">
            <Navbar />
            <Banner fetchFunction={getTrending} />
            <div className="pl-4 pb-10 space-y-8 -mt-20 relative z-20">
                <Row title="Trending Now" fetchFunction={getTrending} isLargeRow />
                <Row title="Top Rated" fetchFunction={getTopRated} />
                <Row title="Action Movies" fetchFunction={getActionMovies} />
                <Row title="Comedy Movies" fetchFunction={getComedyMovies} />
                <Row title="Horror Movies" fetchFunction={getHorrorMovies} />
                <Row title="Romance Movies" fetchFunction={getRomanceMovies} />
                <Row title="Documentaries" fetchFunction={getDocumentaries} />
            </div>
        </div>
    );
};

export default Home;
