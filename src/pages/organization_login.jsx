// src/components/OrganizationLogin.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './organization_login.css'; // We will create this new CSS file
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx"; // Assuming Navbar is a shared component

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
            // Redirect to the organization's dashboard
            navigate('/organization-dashboard');
        }, 1500);
    };

    return (
        <div className="login-page">
            <header className="main-header">
                <Navbar />
                <div className="hero-bg">
                    <div className="hero-content section-container">
                        <div className="hero-text">
                            <h2 className="title">Organization Login</h2>
                            <p className="subtitle">Sign in to post internships and find the nation's best talent.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="login-main">
                <div className="login-container">
                    <h3 className="login-title">Organization Sign In</h3>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="organizationId">Organization ID / Email</label>
                            <input
                                type="text"
                                id="organizationId"
                                required
                                value={organizationId}
                                onChange={(e) => setOrganizationId(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input id="remember-me" name="remember-me" type="checkbox" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="forgot-password-link">Forgot your password?</Link>
                        </div>

                        <div>
                            <Link to="/organization-dashboard" className="submit-button">
                                Login
                            </Link>
                        </div>
                    </form>

                    <div className="register-prompt">
                        <p>New Organization? <Link to="/organization-register">
                            Register Here
                        </Link></p>
                    </div>

                    {message && <div className="message-box">{message}</div>}
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default OrganizationLogin;