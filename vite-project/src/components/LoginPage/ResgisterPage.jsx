import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file

// === BACKEND CONFIG================================
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
// ==========================================================================

const RegisterPage = () => {
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

// Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // { email, password }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || 'Registration failed');
            alert('Registered! Redirecting to login…');
            window.location.href = '/'; // change target if needed
        } catch (err) {
            console.error('[Register] error:', err);
            alert(err.message || 'Registration failed');
        }
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
