import {Link, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./game_profile.css";
import {isLoggedIn} from "../../authUtils.js";

export default function GameProfile() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState("");

    // Fetch game details
    useEffect(() => {
        fetch(`http://localhost:4000/api/games/${id}`)
            .then(res => res.json())
            .then(data => setGame(data))
            .catch(err => console.error(err));
    }, [id]);

    // Fetch game reviews
    useEffect(() => {
        fetch(`http://localhost:4000/api/games/${id}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err));
    }, [id]);

    // Submit review
    function handleSubmitReview() {
        if (!userRating || !userComment.trim()) {
            alert("Please provide both a rating and a review.");
            return;
        }

        fetch(`http://localhost:4000/api/games/${id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
            body: JSON.stringify({
                rating: userRating,
                comment: userComment
            })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.ok) {
                    alert(data.error || "Could not submit review.");
                    return;
                }

                setUserComment("");
                setUserRating(0);

                // Refresh reviews list
                fetch(`http://localhost:4000/api/games/${id}/reviews`)
                    .then(res => res.json())
                    .then(updated => setReviews(updated));
            })
            .catch(err => console.error(err));
    }

    // Loading state
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
                    <div className="hero-rating">
                        ⭐ {game.average_rating ?? "No Rating"}
                    </div>
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

                {/* Reviews Section */}
                <div className="reviews-section">
                    <h2>User Reviews</h2>

                    {/* Write a Review Form */}
                    {!isLoggedIn() ? (
                        <p className="login-prompt">
                            Please <Link to="/login">log in</Link> to write a review.
                        </p>
                    ) : (
                        <div className="write-review-box">
                            <h3>Write a Review</h3>

                            <label>Your Rating</label>
                            <div className="rating-stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star ${star <= userRating ? "filled" : ""}`}
                                        onClick={() => setUserRating(star)}>⭐</span>
                                ))}
                            </div>

                            <label>Your Review</label>
                            <textarea
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                                placeholder="Share your experience with this game..."
                                className="review-input"
                            ></textarea>

                            <button className="submit-review-btn" onClick={handleSubmitReview}>
                                Submit Review
                            </button>
                        </div>
                    )}

                    {reviews && reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.review_id} className="review-card">
                                <div className="review-header">
                                    <span className="review-author"> {review.reviewer_email}</span>
                                    <span className="review-rating">{"⭐".repeat(review.rating)}</span>
                                </div>
                                <p className="review-text">{review.comment}</p>
                                <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
                            </div>
                        ))
                    ) : (
                        <p className="no-reviews">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
            <footer>
                <div className="footer-title">
                    AccessPlay - Discover Accessible Mobile Games
                </div>
                <div className="footer-note">
                    Built with accessibility in mind. WCAG AA compliant with voice control support.
                </div>
                <div>&copy; {new Date().getFullYear()} AccessPlay. All rights reserved.</div>
            </footer>
        </div>
    );
}
