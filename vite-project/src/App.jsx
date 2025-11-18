import React from 'react';


import LandingPage from './LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/LoginPage/ResgisterPage';
import './landing-page.css';
import './navbar.css';

export default function App() {
  const path = window.location.pathname;

  return (
    <>
    <div className="navbar">
      <a href="/" className="nav-logo">AccessPlay</a>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register" className="nav-button">Register</a>
      </div>
    </div>

    <div className= "page-wrapper">
      {path === "/register" && <RegisterPage />}
      {path === "/login" && <LoginPage />}
      {path === "/" && <LandingPage />}

    </div>

  </>
 );
}