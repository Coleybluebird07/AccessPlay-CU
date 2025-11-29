import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from './LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/LoginPage/ResgisterPage';
import Browse_games from './components/browser_games/browse_game';
import MicrophoneButton from './components/MicrophoneButton';
import './landing-page.css';
import './navbar.css';
import './components/browser_games/browse_game.css';
import AccountPage from "./AccountPage";
import { isLoggedIn, getUserEmail, logout, getIsAdmin } from "./authUtils";
import GameProfile from "./components/game_profile/game_profile.jsx";
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";


export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const loggedIn = isLoggedIn();
  const email = getUserEmail();
  const isAdmin = getIsAdmin();

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" onClick={() => setIsNavOpen(false)}>AccessPlay</Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="mainNav"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`navbar-collapse ${isNavOpen ? "show" : "collapse"}`} id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setIsNavOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/browse-games" className="nav-link" onClick={() => setIsNavOpen(false)}>Browse Games</Link>
              </li>
              {loggedIn && isAdmin && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link" onClick={() => setIsNavOpen(false)}>Admin Panel</Link>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center gap-2">
              {!loggedIn && (
                <>
                  <Link to="/login" className="btn btn-outline-primary" onClick={() => setIsNavOpen(false)}>Login</Link>
                  <Link to="/register" className="btn btn-primary" onClick={() => setIsNavOpen(false)}>Register</Link>
                </>
              )}
              {loggedIn && (
                <>
                  <span className="navbar-text">Hi, {email}</span>
                  <Link to="/account" className="btn btn-outline-secondary" onClick={() => setIsNavOpen(false)}>My Account</Link>
                  <button type="button" className="btn btn-danger" onClick={() => { setIsNavOpen(false); logout(); }}>Logout</button>
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
          <Route path="/admin" element={<AdminPanel />} />
          {/* Optional: 404 route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
      
      <MicrophoneButton />
    </Router>
  );
}
