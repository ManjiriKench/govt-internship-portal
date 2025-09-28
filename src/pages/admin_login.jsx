// src/components/AdminLogin.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './admin_login.css'; // Using new CSS file
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

function AdminLogin() {
    const [governmentId, setGovernmentId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Logging in with:', { governmentId, password });

        setMessage('Login successful! Redirecting to the dashboard...');

        setTimeout(() => {
            navigate('/admin-dashboard');
        }, 1500);
    };

    return (
        <div className="admin-login-page">
            <header className="admin-login-main-header">
                <Navbar />
                <div className="admin-login-hero-bg">
                    <div className="admin-login-hero-content">
                        <div className="admin-login-hero-text">
                            <h2 className="admin-login-title-text">Administrator Login</h2>
                            <p className="admin-login-subtitle">Sign in to manage the portal and oversee operations.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="admin-login-main">
                <div className="admin-login-container">
                    <h3 className="admin-login-title">Admin Sign In</h3>

                    <form onSubmit={handleLogin} className="admin-login-form">
                        <div className="admin-login-form-group">
                            <label htmlFor="governmentId">Government ID</label>
                            <input
                                type="text"
                                id="governmentId"
                                required
                                value={governmentId}
                                onChange={(e) => setGovernmentId(e.target.value)}
                            />
                        </div>

                        <div className="admin-login-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="admin-login-form-options">
                            <div className="admin-login-remember-me">
                                <input id="remember-me" name="remember-me" type="checkbox" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="admin-login-forgot-password-link">Forgot your password?</Link>
                        </div>

                        <div>
                            <button type="submit" className="admin-login-submit-button">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="admin-login-register-prompt">
                        <p>Having trouble signing in? <Link to="/support" className="admin-login-register-link">
                            Contact Support
                        </Link></p>
                    </div>

                    {message && <div className="admin-login-message-box">{message}</div>}
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default AdminLogin;