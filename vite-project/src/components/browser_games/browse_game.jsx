import React from "react";
import "./browse_game.css";

export default function Browse_games() {
    return (
        <div>
        <div className="container">
            {/* Sidebar Filters */}
            <div className="filters">
                <h5>Interests & Genres</h5>
                <form className="filter_form" id="filter_form">
                    {[
                        "Puzzle",
                        "Adventure",
                        "RPG",
                        "Casual",
                        "Simulations",
                        "Word Games",
                        "Card Games",
                        "Board Games",
                        "Music & Rhythm",
                        "Educational",
                        "Trivia",
                    ].map((genre) => (
                        <div key={genre}>
                            <input
                                type="checkbox"
                                id={genre.toLowerCase().replace(/[\s&]/g, "_")}
                                name="genre"
                                value={genre.toLowerCase().replace(/[\s&]/g, "_")}
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
                        "Color Blind Mode",
                        "Subtitle & Captions",
                        "One-Handed Play",
                        "Voice Control Support",
                        "Screen Reader Compatibility",
                        "Customize Text Size",
                        "No Audio Required",
                        "Slow-Paced Gameplay",
                        "Visual Audio Indicator",
                        "Difficulty Adjustments",
                        "Haptic Feedback Options",
                        "High Contrast Mode",
                        "Motion Sensitivity Options",
                        "Customizable Controls",
                        "Auto-Save Feature",
                        "Pause Anytime",
                    ].map((feature) => (
                        <div key={feature}>
                            <input
                                type="checkbox"
                                id={feature.toLowerCase().replace(/[\s&-]/g, "_")}
                                name="accessibility"
                                value={feature.toLowerCase().replace(/[\s&-]/g, "_")}
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
                        id="search-input"
                        className="search-input"
                        placeholder="Search for games..."
                    />
                </div>
                <div className="game-list">
                    <div className="game">
                        <img src="example.jpg" alt="Game" />
                        <div className="game-title">Wordscape Journey</div>
                        <div className="game-description">A relaxing word puzzle game...</div>
                        <div className="game-meta">
                            <span>⭐ 4.7</span>
                            <span>10M+ downloads</span>
                        </div>
                    </div>
                    <div className="game">
                        <img src="example.jpg" alt="Game" />
                        <div className="game-title">Wordscape Journey</div>
                        <div className="game-description">A relaxing word puzzle game...</div>
                        <div className="game-meta">
                            <span>⭐ 4.7</span>
                            <span>10M+ downloads</span>
                        </div>
                    </div>
                    <div className="game">
                        <img src="example.jpg" alt="Game" />
                        <div className="game-title">Wordscape Journey</div>
                        <div className="game-description">A relaxing word puzzle game...</div>
                        <div className="game-meta">
                            <span>⭐ 4.7</span>
                            <span>10M+ downloads</span>
                        </div>
                    </div>
                    <div className="game">
                        <img src="example.jpg" alt="Game" />
                        <div className="game-title">Wordscape Journey</div>
                        <div className="game-description">A relaxing word puzzle game...</div>
                        <div className="game-meta">
                            <span>⭐ 4.7</span>
                            <span>10M+ downloads</span>
                        </div>
                    </div>
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
