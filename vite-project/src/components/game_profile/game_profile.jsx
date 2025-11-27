import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./game_profile.css";
import { isLoggedIn } from "../../authUtils.js";

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
    if (!game) return <div className="container py-4">Loading...</div>;

    return (
        <div className="container py-4">
            <div className="row g-4">
                <div className="col-12">
                    <div className="position-relative">
                        <img className="img-fluid rounded" src={game.images?.[0] ?? "/placeholder.jpg"} alt={game.name} />
                        <div className="mt-3">
                            <h1 className="h3">{game.name}</h1>
                            <p className="text-muted">{game.short_description}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="h5">About This Game</h2>
                            <p>{game.detailed_description}</p>

                            <h2 className="h6">Genres</h2>
                            <div className="d-flex flex-wrap gap-2">
                                {game.genres?.map((g, i) => (
                                    <span key={i} className="badge text-bg-secondary">{g}</span>
                                ))}
                            </div>

                            <h2 className="h6 mt-3">Accessibility Features</h2>
                            <ul className="mb-0">
                                {(game.accessibility || ["Color Blind Mode", "Captions", "Auto Save"]).map((feat, index) => (
                                    <li key={index}>{feat}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h3 className="h6">Download</h3>
                            <a href={game.redirect_url_android} target="_blank" className="btn btn-success w-100 mb-2">Download for Android</a>
                            <a href={game.redirect_url_ios} target="_blank" className="btn btn-primary w-100">Download for iOS</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="h6">Game Details</h3>
                            <div><strong>Developer:</strong> {game.developer}</div>
                            <div><strong>Publisher:</strong> {game.publisher}</div>
                            <div><strong>Platform:</strong> {game.platform}</div>
                            <div><strong>Release Date:</strong> {game.release_date}</div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="h5">User Reviews</h2>
                            {!isLoggedIn() ? (
                                <p className="text-muted">
                                    Please <Link to="/login">log in</Link> to write a review.
                                </p>
                            ) : (
                                <div className="mb-3">
                                    <h3 className="h6">Write a Review</h3>
                                    <label>Your Rating</label>
                                    <div className="d-flex mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                className={`me-1 ${star <= userRating ? "text-warning" : "text-muted"}`}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setUserRating(star)}>⭐</span>
                                        ))}
                                    </div>
                                    <label>Your Review</label>
                                    <textarea
                                        value={userComment}
                                        onChange={(e) => setUserComment(e.target.value)}
                                        placeholder="Share your experience with this game..."
                                        className="form-control mb-2"
                                    ></textarea>
                                    <button className="btn btn-primary w-100" onClick={handleSubmitReview}>
                                        Submit Review
                                    </button>
                                </div>
                            )}
                            {reviews && reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.review_id} className="border rounded p-3 mb-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-semibold">{review.reviewer_email}</span>
                                            <span className="text-warning">{"⭐".repeat(review.rating)}</span>
                                        </div>
                                        <p className="mb-1">{review.comment}</p>
                                        <small className="text-muted">{new Date(review.created_at).toLocaleDateString()}</small>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No reviews yet. Be the first to review!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-4 text-center">
                <div className="fw-bold">
                    AccessPlay - Discover Accessible Mobile Games
                </div>
                <div className="text-muted">
                    Built with accessibility in mind. WCAG AA compliant with voice control support.
                </div>
                <div>&copy; {new Date().getFullYear()} AccessPlay. All rights reserved.</div>
            </footer>
        </div>
    );
}
