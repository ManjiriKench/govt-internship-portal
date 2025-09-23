// src/components/OrganizationRegister.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './organization_register.css';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

function OrganizationRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationType: '',
        governmentId: '',
        website: '',
        contactPerson: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        verificationDoc: null,
        agreeTerms: false,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setError('');
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

        console.log('Organization Registration Data:', formData);
        setMessage('Registration successful! Your account is pending verification.');

        setTimeout(() => {
            navigate('/organization-login');
        }, 3000);
    };

    return (
        <div className="org-reg-page">
            <header className="org-reg-main-header">
                <Navbar />
                <div className="org-reg-hero-bg">
                    <div className="org-reg-hero-content">
                        <div className="org-reg-hero-text">
                            <h2 className="org-reg-title">Organization Registration</h2>
                            <p className="org-reg-subtitle">Join our platform to find the brightest talent in the nation.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="org-reg-main">
                <div className="org-reg-container">
                    <h3 className="org-reg-register-title">Create an Organization Account</h3>

                    <form onSubmit={handleRegistration} className="org-reg-form">
                        <div className="org-reg-form-grid">
                            <div className="org-reg-form-group">
                                <label htmlFor="organizationName">Official Organization Name</label>
                                <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="organizationType">Organization Type</label>
                                <select id="organizationType" name="organizationType" value={formData.organizationType} onChange={handleChange} required>
                                    <option value="">Select Type</option>
                                    <option value="Government Body">Government Body</option>
                                    <option value="PSU">Public Sector Undertaking (PSU)</option>
                                    <option value="Private Company">Private Company</option>
                                    <option value="NGO">Non-Governmental Organization (NGO)</option>
                                </select>
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="governmentId">Official Govt. ID / CIN</label>
                                <input type="text" id="governmentId" name="governmentId" value={formData.governmentId} onChange={handleChange} required placeholder="e.g., Corporate Identification Number"/>
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="website">Official Website</label>
                                <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} required placeholder="https://example.gov.in"/>
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="contactPerson">Contact Person Name</label>
                                <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="email">Official Email Address</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="phone">Contact Person Phone</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="org-reg-form-group">
                                <label htmlFor="address">Headquarters Address</label>
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="org-reg-form-group full-width">
                                <label htmlFor="verificationDoc">Upload Verification Document</label>
                                <p className="org-reg-label-subtitle">(e.g., Certificate of Incorporation, Official Letterhead)</p>
                                <input type="file" id="verificationDoc" name="verificationDoc" onChange={handleChange} accept=".pdf" className="org-reg-file-input"/>
                            </div>
                        </div>

                        <div className="org-reg-checkbox-section">
                            <div className="org-reg-checkbox-group">
                                <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} required/>
                                <label htmlFor="agreeTerms">I agree to the <a href="/disclaimer">Terms & Conditions</a> & <a href="/privacy">Privacy Policy</a></label>
                            </div>
                        </div>

                        <div className="org-reg-submit-container">
                            <button type="submit" className="org-reg-submit-button">Submit for Verification</button>
                        </div>
                    </form>

                    <div className="org-reg-login-prompt">
                        <p>Already have an account? <Link to="/organization-login" className="org-reg-login-link">Login here</Link></p>
                    </div>

                    {error && <div className="org-reg-message-box error">{error}</div>}
                    {message && <div className="org-reg-message-box success">{message}</div>}
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default OrganizationRegister;