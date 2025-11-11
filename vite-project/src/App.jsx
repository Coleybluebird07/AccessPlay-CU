import React from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/LoginPage/ResgisterPage';

function App() {
  // Simple routing based on window.location.pathname
  if (window.location.pathname === '/register') {
    return <RegisterPage />;
  }
  // Default to login page
  return <LoginPage />;
}

export default App;
