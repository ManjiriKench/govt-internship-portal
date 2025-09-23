import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './student_register.css'; // We'll create this CSS file next
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        college: '',
        year: '',
        branch: '',
        location: '',
        interests: '',
        resume: null,
        agreeTerms: false,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setError(''); // Clear error on change
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleRegistration = (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        if (!formData.agreeTerms) {
            setError('You must agree to the Terms & Conditions.');
            return;
        }

        console.log('Registration Data:', formData);
        setMessage('Registration successful! Redirecting to login...');

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="register-page">
            <header className="main-header">
                {/* The header is identical to the login page */}
                <Navbar />
                <div className="hero-bg">
                    <div className="hero-content section-container">
                        <div className="hero-text">
                            <h2 className="title">Student Registration</h2>
                            <p className="subtitle">Create your account to start your journey with AI-powered internship matching.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="register-main">
                <div className="register-container">
                    <h3 className="register-title">Create Account</h3>

                    <form onSubmit={handleRegistration} className="register-form">
                        <div className="form-grid">
                            {/* Form fields */}
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <small className="form-hint">(This will be used for all official communication.)</small>
                                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="e.g., John Doe" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <small className="form-hint">(This will be your primary login ID))</small>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g., john123@gmail.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <small className="form-hint">(Minimum 8 characters, with one number & special character)</small>
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <small className="form-hint">(Re-enter your password)</small>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <small className="form-hint">(For verification & internship alerts)</small>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 9876543210" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="college">College / University Name</label>
                                <input type="text" id="college" name="college" value={formData.college} onChange={handleChange} required placeholder="e.g., Vishwakarma University, Pune" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Year of Study</label>
                                <select id="year" name="year" value={formData.year} onChange={handleChange} required>
                                    <option value="">Select Year</option>
                                    <option value="FY">FY</option>
                                    <option value="SY">SY</option>
                                    <option value="TY">TY</option>
                                    <option value="Final Year">Final Year</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="branch">Degree / Branch</label>
                                <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} required placeholder="e.g., B.Tech CSE" />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="resume">Upload Resume (Optional)</label>
                                <p className="label-subtitle">(PDF format only, Max 5MB)</p>
                                <input type="file" id="resume" name="resume" onChange={handleChange} accept=".pdf" className="file-input"/>
                            </div>
                        </div>

                        <div className="checkbox-section">
                            <div className="checkbox-group">
                                <input
                                    id="agreeTerms"
                                    name="agreeTerms"
                                    type="checkbox"
                                    checked={formData.agreeTerms}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        agreeTerms: e.target.checked,
                                        receiveAlerts: false
                                    }))}
                                    required
                                />
                                <label htmlFor="agreeTerms">
                                    I agree to the <a href="#">Terms & Conditions</a> & <a href="#">Privacy Policy</a>
                                </label>
                            </div>
                            <div className="checkbox-group">
                                <input
                                    id="receiveAlerts"
                                    name="receiveAlerts"
                                    type="checkbox"
                                    checked={formData.receiveAlerts || false}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        receiveAlerts: e.target.checked,
                                        agreeTerms: false
                                    }))}
                                />
                                <label htmlFor="receiveAlerts">
                                    I want to receive internship alerts & AI-based recommendations
                                </label>
                            </div>
                        </div>

                        <div className="submit-container">
                            <button type="submit" className="submit-button">Register & Start My AI Journey</button>
                        </div>
                    </form>

                    <div className="login-prompt">
                        <p>Already have an account? <Link to="/login" className="login-link">Login here</Link></p>
                    </div>
                    <br/>
                    <small className="end_line">Your Skills + AI Guidance = The Perfect Match for Government & Industry Internships in Bharat.</small>

                    {error && <div className="message-box error">{error}</div>}
                    {message && <div className="message-box success">{message}</div>}

                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Register;