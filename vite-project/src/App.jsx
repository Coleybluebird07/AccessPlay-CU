import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from './LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/LoginPage/ResgisterPage';
import Browse_games from './components/browser_games/browse_game';
import './landing-page.css';
import './navbar.css';
import './components/browser_games/browse_game.css';
import AccountPage from "./AccountPage";
import { isLoggedIn, getUserEmail, logout } from "./authUtils";
import GameProfile from "./components/game_profile/game_profile.jsx";


export default function App() {
  const path = window.location.pathname;
  const loggedIn = isLoggedIn();
  const email = getUserEmail();

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">AccessPlay</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link to="/browse-games" className="nav-link">Browse Games</Link></li>
            </ul>
            <div className="d-flex align-items-center gap-2">
              {!loggedIn && (
                <>
                  <Link to="/login" className="btn btn-outline-primary">Login</Link>
                  <Link to="/register" className="btn btn-primary">Register</Link>
                </>
              )}
              {loggedIn && (
                <>
                  <span className="navbar-text">Hi, {email}</span>
                  <Link to="/account" className="btn btn-outline-secondary">My Account</Link>
                  <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-3">
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
