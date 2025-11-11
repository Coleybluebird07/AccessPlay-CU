import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file

const LoginPage = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle input changes
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
        // Placeholder for soon to be functional registration.
        console.log('Login attempted with:', formData);
        alert(`Attempting to log in with Email: ${formData.email}`);
    };

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
