import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./game_profile.css";

export default function GameProfile() {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/games/${id}`)
            .then(res => res.json())
            .then(data => setGame(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!game) return <div className="loading">Loading...</div>;

    return (
        <div className="game-profile-container">

            {/* Hero Section */}
            <div className="game-hero">
                <img
                    className="hero-image"
                    src={game.images?.[0] ?? "/placeholder.jpg"}
                    alt={game.name}
                />
                <div className="hero-overlay">
                    <h1 className="hero-title">{game.name}</h1>
                    <p className="hero-subtitle">{game.short_description}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="profile-content">

                {/* Left Column */}
                <div className="left-column">
                    <h2>About This Game</h2>
                    <p className="game-description">
                        {game.detailed_description}
                    </p>

                    <h2>Genres</h2>
                    <div className="genre-list">
                        {game.genres?.map((g, i) => (
                            <span key={i} className="genre-tag">{g}</span>
                        ))}
                    </div>

                    <h2>Accessibility Features</h2>
                    <ul className="accessibility-list">
                        {(game.accessibility || ["Color Blind Mode", "Captions", "Auto Save"]).map((feat, index) => (
                            <li key={index}>{feat}</li>
                        ))}
                    </ul>
                </div>

                {/* Right Column */}
                <div className="right-column">
                    <div className="download-section">
                        <h3>Download</h3>

                        <a
                            href={game.redirect_url_android}
                            target="_blank"
                            className="download-btn android"
                        >
                            Download for Android
                        </a>

                        <a
                            href={game.redirect_url_ios}
                            target="_blank"
                            className="download-btn ios"
                        >
                            Download for iOS
                        </a>
                    </div>

                    <div className="game-meta-box">
                        <h3>Game Details</h3>

                        <div className="meta-item"><strong>Developer:</strong> {game.developer}</div>
                        <div className="meta-item"><strong>Publisher:</strong> {game.publisher}</div>
                        <div className="meta-item"><strong>Platform:</strong> {game.platform}</div>
                        <div className="meta-item"><strong>Release Date:</strong> {game.release_date}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
