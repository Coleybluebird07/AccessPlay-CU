import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./browse_game.css";

export default function Browse_games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    // FIXED STATE NAME
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/api/games")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched games:", data);

                if (Array.isArray(data)) {
                    setGames(data);
                } else if (data.games && Array.isArray(data.games)) {
                    setGames(data.games);
                } else {
                    setGames([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching games:", error);
                setGames([]);
            })
            .finally(() => setLoading(false));
    }, []);

    function toggleGenre(genre) {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    }

    function toggleAccessibility(feature) {
        setSelectedFeatures(prev =>
            prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
        );
    }

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchText) params.append("search", searchText);
        if (selectedGenres.length > 0) params.append("genres", selectedGenres.join(","));
        if (selectedFeatures.length > 0) params.append("features", selectedFeatures.join(","));

        fetch(`http://localhost:4000/api/games?${params.toString()}`)
            .then(res => res.json())
            .then(setGames)
            .catch(() => setGames([]));
    }, [searchText, selectedGenres, selectedFeatures]);

    return (
        <div>
            {/* BACKDROP FOR MOBILE FILTER PANEL */}
            {showFilters && (
                <div
                    className="filter-backdrop visible"
                    onClick={() => setShowFilters(false)}
                />
            )}
            <div className="container">
                <div className={`filters ${showFilters ? "visible" : ""}`}>
                    <button className="close-filters" onClick={() => setShowFilters(false)}>
                        ✕
                    </button>
                    <h5>Interests & Genres</h5>
                    <form className="filter_form" id="filter_form">
                        {[
                            "Puzzle","Adventure","RPG","Casual","Simulations","Word Games",
                            "Card Games","Board Games","Music & Rhythm","Educational","Trivia"
                        ].map((genre) => (
                            <div key={genre}>
                                <input
                                    type="checkbox"
                                    onClick={() => toggleGenre(genre)}
                                    id={genre.toLowerCase().replace(/[\s&]/g, "_")}
                                />
                                <label htmlFor={genre.toLowerCase().replace(/[\s&]/g, "_")}>
                                    {genre}
                                </label>
                            </div>
                        ))}
                    </form>

                    <div className="separator"></div>

                    <h5>Accessibility Features</h5>
                    <form className="accessibility_form" id="accessibility_form">
                        {[
                            "Color Blind Mode","Subtitle & Captions","One-Handed Play","Voice Control Support",
                            "Screen Reader Compatibility","Customize Text Size","No Audio Required","Slow-Paced Gameplay",
                            "Visual Audio Indicator","Difficulty Adjustments","Haptic Feedback Options","High Contrast Mode",
                            "Motion Sensitivity Options","Customizable Controls","Auto-Save Feature","Pause Anytime"
                        ].map((feature) => (
                            <div key={feature}>
                                <input
                                    type="checkbox"
                                    onClick={() => toggleAccessibility(feature)}
                                    id={feature.toLowerCase().replace(/[\s&-]/g, "_")}
                                />
                                <label htmlFor={feature.toLowerCase().replace(/[\s&-]/g, "_")}>
                                    {feature}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>

                <div className="main_game_area">

                    <div className="header">
                        <h4>Browse Games</h4>
                        <h4>
                            Discover accessible mobile games tailored to your needs. Use filters
                            to find games with specific accessibility features.
                        </h4>
                    </div>

                    <div className="search-bar" id="search-bar">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for games..."
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    {/* MOBILE FILTER BUTTON */}
                    <button
                        className="mobile-filter-btn"
                        onClick={() => setShowFilters(true)}
                    >
                        Filters
                    </button>

                    <div className="game-list">
                        {loading ? (
                            <div>Loading games...</div>
                        ) : games.length === 0 ? (
                            <div>No games found.</div>
                        ) : (
                            games.map((game) => (
                                <Link to={`/games/${game.game_id}`} key={game.game_id} className="game">
                                    <img
                                        src={game.images?.[0] ?? "placeholder.jpg"}
                                        alt={game.name ?? "Unnamed Game"}
                                    />
                                    <div className="game-title">{game.name ?? "Unnamed Game"}</div>
                                    <div className="game-description">{game.short_description}</div>
                                    <div className="game-meta">
                                        <span>{game.genres?.join(", ") ?? "No genres"}</span>
                                        <span>{game.platform}</span>
                                        <span className="game-rating">⭐ {game.average_rating ?? "No Rating"}</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                </div>
            </div>

            <footer>
                <div className="footer-title">AccessPlay - Discover Accessible Mobile Games</div>
                <div className="footer-note">Built with accessibility in mind. WCAG AA compliant with voice control support.</div>
                <div>&copy; {new Date().getFullYear()} AccessPlay. All rights reserved.</div>
            </footer>
        </div>
    );
}
