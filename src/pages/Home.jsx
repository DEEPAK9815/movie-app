import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import MovieModal from '../components/MovieModal';
import api, { hydrateTitles } from '../services/api';

const Home = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [data, setData] = useState({
        trending: [],
        topRated: [],
        action: [],
        adventure: [],
        comedy: [],
        drama: [],
        horror: [],
        romance: [],
        documentaries: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                // 1. Fetch RAW lists (IDs only) - 50 per category
                const [
                    trendingRaw,
                    topRatedRaw,
                    actionRaw,
                    adventureRaw,
                    comedyRaw,
                    dramaRaw,
                    horrorRaw,
                    romanceRaw,
                    docRaw
                ] = await Promise.all([
                    api.getTrendingRaw(),
                    api.getTopRatedRaw(),
                    api.getActionRaw(),
                    api.getAdventureRaw(),
                    api.getComedyRaw(),
                    api.getDramaRaw(),
                    api.getHorrorRaw(),
                    api.getRomanceRaw(),
                    api.getDocumentariesRaw()
                ]);

                // 2. Global Deduplication
                const seenIds = new Set();
                const seenTitles = new Set(); // Prevent same movie title (even if different ID)

                // Helper to extract unique items for a list
                const processList = (list, count = 20) => {
                    const unique = [];
                    for (const item of list) {
                        if (!seenIds.has(item.id) && !seenTitles.has(item.title)) {
                            seenIds.add(item.id);
                            seenTitles.add(item.title);
                            unique.push(item);
                            if (unique.length === count) break;
                        }
                    }
                    return unique;
                };

                const uniqueTrending = processList(trendingRaw, 25);
                const uniqueTopRated = processList(topRatedRaw, 25);
                const uniqueAction = processList(actionRaw, 25);
                const uniqueAdventure = processList(adventureRaw, 25);
                const uniqueComedy = processList(comedyRaw, 25);
                const uniqueDrama = processList(dramaRaw, 25);
                const uniqueHorror = processList(horrorRaw, 25);
                const uniqueRomance = processList(romanceRaw, 25);
                const uniqueDoc = processList(docRaw, 25);

                // 3. Hydrate (Get images/details)
                const [
                    trending,
                    topRated,
                    action,
                    adventure,
                    comedy,
                    drama,
                    horror,
                    romance,
                    documentaries
                ] = await Promise.all([
                    hydrateTitles(uniqueTrending, 25),
                    hydrateTitles(uniqueTopRated, 25),
                    hydrateTitles(uniqueAction, 25),
                    hydrateTitles(uniqueAdventure, 25),
                    hydrateTitles(uniqueComedy, 25),
                    hydrateTitles(uniqueDrama, 25),
                    hydrateTitles(uniqueHorror, 25),
                    hydrateTitles(uniqueRomance, 25),
                    hydrateTitles(uniqueDoc, 25)
                ]);

                setData({
                    trending,
                    topRated,
                    action,
                    adventure,
                    comedy,
                    drama,
                    horror,
                    romance,
                    documentaries
                });
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#141414] min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#E50914] mb-4"></div>
                    <p className="text-white text-lg font-medium">Curating Movies...</p>
                </div>
            </div>
        );
    }

    // Pick a random movie from trending for the Banner
    const bannerMovie = data.trending.length > 0
        ? data.trending[Math.floor(Math.random() * data.trending.length)]
        : null;

    const bannerFetchStub = () => ({ results: data.trending });

    return (
        <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden">
            <Navbar />

            <Banner
                fetchFunction={bannerFetchStub}
                onMovieSelect={setSelectedMovie}
            />

            <div className="relative pl-0 md:pl-8 pb-10 space-y-6 md:space-y-12 z-30 -mt-24 md:-mt-48 bg-gradient-to-b from-transparent via-[#141414] to-[#141414]">
                <Row title="Trending Now" movies={data.trending} isLargeRow onMovieClick={setSelectedMovie} />
                <Row title="Top Rated" movies={data.topRated} onMovieClick={setSelectedMovie} />
                <Row title="Action Thrillers" movies={data.action} onMovieClick={setSelectedMovie} />
                <Row title="Adventure" movies={data.adventure} onMovieClick={setSelectedMovie} />
                <Row title="Comedies" movies={data.comedy} onMovieClick={setSelectedMovie} />
                <Row title="Dramas" movies={data.drama} onMovieClick={setSelectedMovie} />
                <Row title="Scary Movies" movies={data.horror} onMovieClick={setSelectedMovie} />
                <Row title="Romance Movies" movies={data.romance} onMovieClick={setSelectedMovie} />
                <Row title="Documentaries" movies={data.documentaries} onMovieClick={setSelectedMovie} />
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
