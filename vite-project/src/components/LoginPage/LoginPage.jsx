import React, { useState } from 'react';
import './LoginPage.css'; // Import the dedicated CSS file

const LoginPage = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle input changes (Controlled Component pattern)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for API call or client-side validation
        console.log('Login attempted with:', formData);
        alert(`Attempting to log in with Email: ${formData.email}`);
    };

    return (
        <div className="body-container">
            <div className="login-container">
                <div className="login-card">
                    <h2 className="card-title">Login to AccessPlay</h2>
                    <p className="card-subtitle">Enter your credentials to access your account</p>

                    <form onSubmit={handleSubmit}>
                        {/* Email Input Group */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
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
                            <label htmlFor="password">Password</label>
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

                    <p className="register-link-container">
                        Don't have an account? <a href="/register" className="register-link">Register here</a>
                    </p>

                    {/* <div className="demo-accounts">
                        <p>Demo Accounts:</p>
                        <p className="demo-text">Admin: **admin@accessplay.com** / **admin123**</p>
                        <p className="demo-text">User: **user@example.com** / **user123**</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
