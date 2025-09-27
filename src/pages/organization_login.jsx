// src/components/OrganizationLogin.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Organization_login.css';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

function OrganizationLogin() {
    const [organizationId, setOrganizationId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Logging in with:', { organizationId, password });

        setMessage('Login successful! Redirecting to your dashboard...');

        setTimeout(() => {
            navigate('/organization-dashboard');
        }, 1500);
    };

    return (
        <div className="org-login-page">
            <header className="org-login-main-header">
                <Navbar />
                <div className="org-login-hero-bg">
                    <div className="org-login-hero-content">
                        <div className="org-login-hero-text">
                            <h2 className="org-login-title-text">Organization Login</h2>
                            <p className="org-login-subtitle">Sign in to post internships and find the nation's best talent.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="org-login-main">
                <div className="org-login-container">
                    <h3 className="org-login-title">Organization Sign In</h3>

                    <form onSubmit={handleLogin} className="org-login-form">
                        <div className="org-login-form-group">
                            <label htmlFor="organizationId">Organization ID / Email</label>
                            <input
                                type="text"
                                id="organizationId"
                                required
                                value={organizationId}
                                onChange={(e) => setOrganizationId(e.target.value)}
                            />
                        </div>

                        <div className="org-login-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="org-login-form-options">
                            <div className="org-login-remember-me">
                                <input id="remember-me" name="remember-me" type="checkbox" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="org-login-forgot-password-link">Forgot your password?</Link>
                        </div>

                        <div>
                            {/* This must be a button to trigger the form's onSubmit event */}
                            <button type="submit" className="org-login-submit-button">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="org-login-register-prompt">
                        <p>New Organization? <Link to="/organization-register" className="org-login-register-link">
                            Register Here
                        </Link></p>
                    </div>

                    {message && <div className="org-login-message-box">{message}</div>}
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default OrganizationLogin;