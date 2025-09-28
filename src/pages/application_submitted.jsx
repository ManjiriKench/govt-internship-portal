import React from 'react';
import { Link } from 'react-router-dom';
import './application_submitted.css';
import Footer from "./footer.jsx";
import Navbar from "./navbar.jsx"; // Adjust path to your logo

const Application_submitted = () => {
    return (
        <div className="conf-body">
            {/* Header Section */}
            <header className="conf-header">
                <Navbar />

                <div className="conf-hero">
                    <div className="conf-hero-content">
                        <h2 className="conf-hero-title">Apply for Internship</h2>
                        <p className="conf-hero-subtitle">Complete your application and submit it with confidence.</p>
                    </div>
                </div>
            </header>

            {/* Main Confirmation Content */}
            <main className="conf-main">
                <div className="conf-main-container">
                    {/* Confirmation Message */}
                    <div className="conf-card conf-card-success">
                        <i className="fas fa-check-circle conf-success-icon"></i>
                        <h1 className="conf-success-title">Thank you!</h1>
                        <p className="conf-success-subtitle">Your application has been submitted.</p>
                    </div>

                    {/* Next Steps Message Section */}
                    <section className="conf-card">
                        <h3 className="conf-card-title">What's Next?</h3>
                        <p className="conf-card-text">
                            Your application is now under review. Once the review process begins, you’ll receive updates on your dashboard.
                        </p>
                        <p className="conf-card-text">
                            In the meantime, keep building your profile and exploring more internships to improve your chances.
                        </p>
                    </section>

                    {/* How It Works Section */}
                    <section className="conf-card">
                        <h3 className="conf-card-title conf-card-title-center">How It Works</h3>
                        <div className="conf-steps-grid">
                            {/* Step 1 */}
                            <div className="conf-step">
                                <div className="conf-step-icon-wrapper conf-step-icon-wrapper-green">
                                    <i className="fas fa-envelope-open-text conf-step-icon"></i>
                                </div>
                                <h4 className="conf-step-title">Application Submitted</h4>
                                <p className="conf-step-text">We’ve received your details.</p>
                            </div>
                            {/* Step 2 */}
                            <div className="conf-step">
                                <div className="conf-step-icon-wrapper conf-step-icon-wrapper-yellow">
                                    <i className="fas fa-search conf-step-icon"></i>
                                </div>
                                <h4 className="conf-step-title">Organization Review</h4>
                                <p className="conf-step-text">Company will check your profile and resume.</p>
                            </div>
                            {/* Step 3 */}
                            <div className="conf-step">
                                <div className="conf-step-icon-wrapper conf-step-icon-wrapper-blue">
                                    <i className="fas fa-sync-alt conf-step-icon"></i>
                                </div>
                                <h4 className="conf-step-title">Updates</h4>
                                <p className="conf-step-text">Track your progress anytime in the dashboard.</p>
                            </div>
                        </div>
                    </section>

                    {/* Encouragement Section */}
                    <section className="conf-card conf-tip">
                        <div className="conf-tip-emoji">✨</div>
                        <div className="conf-tip-text-container">
                            <h4 className="conf-tip-title">Tip:</h4>
                            <p className="conf-tip-text">Adding new skills and certifications can boost your chances of selection.</p>
                        </div>
                    </section>

                    {/* Buttons Section */}
                    <div className="conf-actions">
                        <Link to="/dashboard" className="conf-button conf-button-large">
                            <i className="fas fa-arrow-left conf-button-icon"></i> Back to Dashboard
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <Footer/>
        </div>
    );
};

export default Application_submitted;