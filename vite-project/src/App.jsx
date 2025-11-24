import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/LoginPage/ResgisterPage";
import Browse_games from "./components/browser_games/browse_game";
import GameProfile from "./components/game_profile/game_profile.jsx";

import "./landing-page.css";
import "./navbar.css";
import "./components/browser_games/browse_game.css";
import "./components/game_profile/game_profile.css";

export default function App() {
    return (
        <Router>
            <div className="navbar">
                <Link to="/" className="nav-logo">AccessPlay</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/browse-games">Browse Games</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register" className="nav-button">Register</Link>
                </div>
            </div>

            <div className="page-wrapper">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/browse-games" element={<Browse_games />} />
                    <Route path="/games/:id" element={<GameProfile />} />
                    {/* Optional: 404 route */}
                    <Route path="*" element={<div>Page not found</div>} />
                </Routes>
            </div>
        </Router>
    );
}
