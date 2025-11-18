import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file

const RegisterPage = () => {
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
        console.log('Register attempted with:', formData);
        alert(`Attempting to register with Email: ${formData.email}`);
    };

    return (
        <div className="body-container">
            <div className="login-container">
                <div className="login-card">
                    <h2 className="card-title">Register for AccessPlay</h2>
                    <p className="card-subtitle">Create your account to get started</p>

                    <form onSubmit={handleSubmit}>
                        {/* required email inputs */}
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

                        {/* required password inputs */}
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
                            Register
                        </button>
                    </form>
                    {/*Link to login page*/}
                    <p className="register-link-container"> 
                        Already have an account? <a href="/" className="register-link">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
