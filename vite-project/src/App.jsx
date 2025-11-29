import React from 'react';

import LandingPage from './LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/LoginPage/ResgisterPage';
import Browse_games from './components/browser_games/browse_game';
import MicrophoneButton from './components/MicrophoneButton';
import './landing-page.css';
import './navbar.css';
import './components/browser_games/browse_game.css';

export default function App() {
  const path = window.location.pathname;

  return (
    <>
      <div className="navbar">
        <a href="/" className="nav-logo">AccessPlay</a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/browse-games">Browse Games</a>
          <a href="/login">Login</a>
          <a href="/register" className="nav-button">Register</a>
        </div>
      </div>

      <div className="page-wrapper">
        {path === "/register" && <RegisterPage />}
        {path === "/login" && <LoginPage />}
        {path === "/" && <LandingPage />}
        {path === "/browse-games" && <Browse_games />}
      </div>

      <MicrophoneButton />
    </>
  );
}