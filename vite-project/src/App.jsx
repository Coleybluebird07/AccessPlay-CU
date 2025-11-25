import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/LoginPage/ResgisterPage";
import Browse_games from "./components/browser_games/browse_game";
import GameProfile from "./components/game_profile/game_profile.jsx";

import LandingPage from './LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/LoginPage/ResgisterPage';
import Browse_games from './components/browser_games/browse_game';
import './landing-page.css';
import './navbar.css';
import './components/browser_games/browse_game.css';
import AccountPage from "./AccountPage";
import { isLoggedIn, getUserEmail, logout } from "./authUtils";


export default function App() {
  const path = window.location.pathname;
  const loggedIn = isLoggedIn();
  const email = getUserEmail();


  return (
      <>
        <div className="nav-links">
          <a href="/browse-games">Browse games</a>

          {!loggedIn && (
              <>
                <a href="/login">Login</a>
                <a href="/register" className="nav-button">
                  Register
                </a>
              </>
          )}

          {loggedIn && (
              <>
                <span className="nav-user">Hi, {email}</span>
                <a href="/account">My Account</a>
                <button
                    type="button"
                    className="nav-button"
                    onClick={logout}
                    style={{border: "none", cursor: "pointer"}}
                >
                  Logout
                </button>
              </>
          )}
        </div>


        <div className="page-wrapper">
          {path === "/register" && <RegisterPage/>}
          {path === "/login" && <LoginPage/>}
          {path === "/" && <LandingPage/>}
          {path === "/browse-games" && <Browse_games/>}
          {path === "/account" && <AccountPage />}
        </div>

      </>
  );
}
