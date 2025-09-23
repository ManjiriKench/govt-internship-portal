// src/components/Apply.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './apply.css'; // Assuming you have a corresponding CSS file
import './navbar.jsx'

// Import all the necessary icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft, faCheckCircle, faMapMarkerAlt, faClock, faBriefcase, faUpload,
    faExclamationTriangle, faPaperPlane, faCode, faChartLine, faDatabase
} from '@fortawesome/free-solid-svg-icons';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx"; // Specific import for rupee


// In a real app, you'd fetch this data based on the ID.
const allInternships = [
    {
        id: 1,
        title: "Data Scientist Intern",
        organization: "Digital India Corporation",
        logoText: "DIC",
        location: "Pune, Maharashtra",
        stipend: "₹20,000 / month",
        duration: "6 Months",
        type: "Government"
    }
    // ... other internship data
];

function Apply() {
    const { internshipId } = useParams();
    const navigate = useNavigate();

    const internshipDetails = allInternships.find(
        internship => internship.id === parseInt(internshipId)
    );

    const [status, setStatus] = useState('initial');
    const [fileName, setFileName] = useState('');
    const [showCourses, setShowCourses] = useState(false);

    useEffect(() => {
        if (status === 'loading') {
            const timer = setTimeout(() => { setStatus('analyzed'); }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
            setStatus('loading');
        }
    };

    const handleSubmit = () => {
        console.log(`Submitting application for internship ID: ${internshipId}`);
        navigate('/success');
    };

    if (!internshipDetails) {
        return <div>Internship Not Found</div>;
    }

    return (
        <div className="page-container">
            <header className="main-header">
                <Navbar />
                <div className="apply-hero-bg">
                    <div className="apply-hero-content">
                        <h2 className="apply-hero-title">Apply for Internship</h2>
                        <p className="apply-hero-subtitle">Complete your application and submit it with confidence.</p>
                    </div>
                </div>
            </header>

            <main className="apply-layout">
                <Link to="/dashboard" className="back-link">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Back to Dashboard</span>
                </Link>

                <div className="apply-flow-container">
                    {/* Section 1: Internship & Company Overview */}
                    <section className="content-card">
                        <div className="overview-header">
                            <img src={`https://placehold.co/80x80/1c322b/FFFFFF?text=${internshipDetails.logoText}`} alt="Company Logo" />
                            <div>
                                <h2 className="internship-title">{internshipDetails.title}</h2>
                                <p className="internship-org">{internshipDetails.organization}</p>
                            </div>
                            <span className="verified-badge"><FontAwesomeIcon icon={faCheckCircle} /> Government Verified</span>
                        </div>
                        <div className="details-grid">
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" /> Location: {internshipDetails.location}</p>
                            <p><FontAwesomeIcon icon={faRupeeSign} className="detail-icon" /> Stipend: {internshipDetails.stipend}</p>
                            <p><FontAwesomeIcon icon={faClock} className="detail-icon" /> Duration: {internshipDetails.duration}</p>
                            <p><FontAwesomeIcon icon={faBriefcase} className="detail-icon" /> Type: {internshipDetails.type}</p>
                        </div>
                        <p className="company-description">
                            Digital India Corporation is a not-for-profit company under the Ministry of Electronics and Information Technology. Its mission is to develop and promote a knowledge-based, technology-driven society by leveraging digital tools and platforms for national development. This internship offers a unique opportunity to contribute to high-impact government projects.
                        </p>
                        <h4 className="responsibilities-title">Key Skills & Responsibilities</h4>
                        <ul className="responsibilities-list">
                            <li><FontAwesomeIcon style={{ color: '#26cf64' }} icon={faCheckCircle} /> Develop predictive models and machine learning algorithms using Python.</li>
                            <li><FontAwesomeIcon style={{ color: '#26cf64' }} icon={faCheckCircle} /> Perform data cleaning, analysis, and visualization using Pandas.</li>
                            <li><FontAwesomeIcon style={{ color: '#26cf64' }} icon={faCheckCircle} /> Manage and query large datasets using SQL to support data-driven decision-making.</li>
                            <li><FontAwesomeIcon style={{ color: '#26cf64' }} icon={faCheckCircle} /> Apply advanced statistical methods and models to solve complex problems.</li>
                            <li><FontAwesomeIcon style={{ color: '#26cf64' }} icon={faCheckCircle} /> Collaborate with a team to build robust data pipelines and productionize models.</li>
                        </ul>
                    </section>

                    {/* Section 2: Resume Upload */}
                    <section className="content-card">
                        <h3>Your Application Journey</h3>
                        <p className="section-subtitle">Get an instant AI-powered analysis of your resume and discover how you can stand out.</p>
                        <div className="upload-area">
                            <label htmlFor="resume-upload" className="upload-button"><FontAwesomeIcon icon={faUpload} /> Upload Resume</label>
                            <input type="file" id="resume-upload" onChange={handleFileChange} style={{ display: 'none' }}/>
                            <span className="file-name-display">{fileName || 'No file chosen'}</span>
                        </div>
                        <p className="upload-note">Supported formats: PDF, DOC, DOCX. Max size: 5MB.</p>

                        {status === 'loading' && <div className="loading-indicator"><div className="cool-spinner"></div><span>AI is analyzing your resume...</span></div>}
                        {status === 'analyzed' && <div className="action-container"><button onClick={() => setStatus('scoreVisible')} className="action-button">View AI Match Score</button></div>}
                    </section>

                    {/* Section 3: AI Match Score (Conditional) */}
                    {status === 'scoreVisible' && (
                        <section className="content-card">
                            <h3 className="text-center">Your AI-Powered Match!</h3>
                            <div className="score-display">85<sup>%</sup></div>
                            <p className="score-subtitle">Great Fit!</p>
                            <h4>Matched Skills Based on Your Resume</h4>
                            <div className="skills-grid">
                                <div className="skill-item matched"><FontAwesomeIcon icon={faCheckCircle} /> Python</div>
                                <div className="skill-item matched"><FontAwesomeIcon icon={faCheckCircle} /> Machine Learning</div>
                                <div className="skill-item matched"><FontAwesomeIcon icon={faCheckCircle} /> SQL</div>
                            </div>
                            <h4>Skills to Strengthen</h4>
                            <div className="skills-grid">
                                <div className="skill-item to-strengthen"><FontAwesomeIcon icon={faExclamationTriangle} /> Statistics</div>
                                <div className="skill-item to-strengthen"><FontAwesomeIcon icon={faExclamationTriangle} /> Pandas</div>
                            </div>
                            <p className="ai-note">Our AI has identified a strong alignment with your core technical skills based on your resume and the internship requirements.</p>
                            <div className="action-container">
                                <button onClick={() => setShowCourses(true)} className="action-button secondary">See Recommended Courses</button>
                            </div>
                        </section>
                    )}

                    {/* Section 4: Recommended Courses (Conditional) */}
                    {showCourses && (
                        <section className="content-card">
                            <h3>Recommended Courses to Boost Your Profile</h3>
                            <p className="section-subtitle">These courses are tailored to help you bridge your skill gaps.</p>
                            <div className="courses-grid">
                                <a href="#" className="course-card"><FontAwesomeIcon icon={faCode} /><h4>Practical Machine Learning</h4><p>Build and deploy ML models.</p></a>
                                <a href="#" className="course-card"><FontAwesomeIcon icon={faChartLine} /><h4>Statistics Masterclass</h4><p>Master statistical concepts.</p></a>
                                <a href="#" className="course-card"><FontAwesomeIcon icon={faDatabase} /><h4>Data Analysis with Pandas</h4><p>Manipulate and visualize data.</p></a>
                            </div>
                        </section>
                    )}

                    {/* Section 5: Submit Button (Conditional) */}
                    {status === 'scoreVisible' && (
                        <div className="submit-area">
                            <button onClick={handleSubmit} className="submit-button">
                                <FontAwesomeIcon icon={faPaperPlane} /> Submit Application
                            </button>
                            <p className="submit-note">Your journey to a promising career starts now.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Apply;