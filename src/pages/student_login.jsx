import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './student_login.css'; // We'll create this CSS file next
import Navbar from "./navbar.jsx";

function Login() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Logging in with:', { studentId, password });

        // Simulate API call and success
        setMessage('Login successful! Redirecting...');

        // In a real app, you'd wait for a server response. Here we'll just redirect after a delay.
        setTimeout(() => {
            // Redirect to a dashboard page (you can create this page next)
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="login-page">
            <header className="main-header">
               <Navbar />
                <div className="hero-bg">
                    <div className="hero-content section-container">
                        <div className="hero-text">
                            <h2 className="title">Student Login</h2>
                            <p className="subtitle">Welcome back! Please sign in to access your dashboard.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="login-main">
                <div className="login-container">
                    <h3 className="login-title">Sign In</h3>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="studentId">Student ID / Email</label>
                            <input
                                type="text"
                                id="studentId"
                                required
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
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
                            <button type="submit" className="submit-button">Login</button>
                        </div>
                    </form>

                    <div className="register-prompt">
                        <p>New Student? <Link to="/register" className="register-link">Register Here</Link></p>
                    </div>

                    {message && <div className="message-box">{message}</div>}
                </div>
            </main>

            <footer className="main-footer">
                {/* Footer content can be made into a reusable component later */}
                <div className="footer-grid">
                    <div className="footer-links"><h3>Quick Links</h3><ul><li><a href="#">Home</a></li><li><a href="#">About MCA</a></li></ul></div>
                    <div className="footer-links"><h3>Resources</h3><ul><li><a href="#">Reports</a></li><li><a href="#">Circulars</a></li></ul></div>
                    <div className="footer-contact"><h3>Contact Us</h3><p>Ministry of Corporate Affairs, Government of India<br/>New Delhi - 110001</p></div>
                </div>
                <div className="footer-bottom"><p>&copy; 2024 Ministry of Corporate Affairs (MCA). All Rights Reserved.</p></div>
            </footer>
        </div>
    );
}

export default Login;