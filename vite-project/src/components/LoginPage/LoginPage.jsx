import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file

// === BACKEND CONFIG ================================
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
// ==========================================================================


const LoginPage = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // State for showing user feedback / success / error messages
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // === LOGIN HANDLER (main backend connection block) ======================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData) // { email, password }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || 'Login failed');
            }

            // Success — save token for future authenticated requests
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userEmail', data.user.email);

            setMessage('Login successful! Redirecting...');
            console.log('[Login] success:', data);

            // Redirect to home/dashboard
            window.location.href = '/';
        } catch (err) {
            console.error('[Login] error:', err);
            setMessage(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    // ========================================================================

    return (
        // main html elements / structure
        <div className="body-container">
            <div className="login-container"> 
                <div className="login-card">
                    <h2 className="card-title">Login to AccessPlay</h2>
                    <p className="card-subtitle">Enter your credentials to access your account</p>

                    {/*Submitting data */}
                    <form onSubmit={handleSubmit}>
                        {/* Email Input Group */}
                        <div className="form-group">
                            {/* To ensure a valid / formatted email is entered*/} 
                            <label htmlFor="email">Email</label>
                            {/*Required data*/}
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="your@email.com" 
                                required 
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Input Group */}
                        <div className="form-group">
                            {/* htmlFor set to password for censoring.*/}
                            <label htmlFor="password">Password</label>
                            {/*Required data*/}
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="********" 
                                required 
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                    {/*Link to register page*/}
                    <p className="register-link-container">
                        Don't have an account? <a href="/register" className="register-link">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
