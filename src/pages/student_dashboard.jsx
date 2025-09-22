// src/components/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './student_dashboard.css';
import './navbar.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faUserCircle, faEnvelope, faFilePdf, faStar } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Navbar from "./navbar.jsx";

// --- Data (In a real app, this would come from an API) ---
const profileData = {
    name: "Manjiri Kench",
    university: "Vishwakarma University, Pune",
    age: 21,
    email: "manjiri123@gmail.com",
    github: "github.com/manjiri",
    skills: ["Python", "Java", "Web Dev", "Data Analysis", "Machine Learning"]
};
const internshipData = [
    { id: 1, title: "Data Scientist Intern", organization: "Digital India Corporation", skills: ["Python", "Machine Learning", "SQL"], logoText: "DIC", url: "/apply/1" },
    { id: 2, title: "Frontend Developer Intern", organization: "Ministry of Technology", skills: ["HTML", "CSS", "JavaScript", "React"], logoText: "MIN", url: "/apply/2" },
    { id: 3, title: "Backend Developer Intern", organization: "Government of Maharashtra", skills: ["Python", "Django", "SQL", "APIs"], logoText: "GOV", url: "/apply/3" },
    { id: 4, title: "AI Research Intern", organization: "National Informatics Centre", skills: ["Python", "Deep Learning", "NLP"], logoText: "NIC", url: "/apply/4" },
];
const skillTypes = ["Python", "Machine Learning", "SQL", "React", "JavaScript", "Django", "APIs", "Docker", "AWS", "Linux"];
const dailyTips = [ { title: "Resume Power-Up", content: "Customize your resume for each application to highlight relevant skills." }];

function Dashboard() {
    const [filteredInternships, setFilteredInternships] = useState([]);
    const [activeSkills, setActiveSkills] = useState([]);
    const [dailyTip, setDailyTip] = useState({ title: '', content: '' });

    useEffect(() => {
        setFilteredInternships(internshipData);
        setDailyTip(dailyTips[0]);
    }, []);

    useEffect(() => {
        if (activeSkills.length === 0) {
            setFilteredInternships(internshipData);
        } else {
            const filtered = internshipData.filter(internship =>
                activeSkills.some(skill => internship.skills.includes(skill))
            );
            setFilteredInternships(filtered);
        }
    }, [activeSkills]);

    const handleSkillClick = (skill) => {
        setActiveSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
    };

    const clearFilters = () => setActiveSkills([]);

    return (
        <div className="page-container">
            <div className="tricolor-ribbon"><div></div><div></div><div></div></div>

            <header className="main-header">
                <Navbar />

                <div className="hero-bg">
                    <div className="hero-content">
                        <h2 className="hero-title">Welcome back, Manjiri!</h2>
                        <p className="hero-subtitle">Here’s your personalized AI-powered internship feed based on your skills and profile.</p>
                        <div className="progress-wrapper">
                            <div className="progress-info">
                                <span>Your Application Journey: 65% Completed</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '65%' }}></div>
                            </div>
                            <div className="progress-steps">
                                <div className="step-item"><span>✅</span><span>Basic Details</span></div>
                                <div className="step-item"><span>✅</span><span>Resume</span></div>
                                <div className="step-item"><span>✅</span><span>Github</span></div>
                                <div className="step-item"><span className="step-incomplete">⚪</span><span>Skills</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="dashboard-layout">
                <aside className="sidebar">
                    <div className="sidebar-card profile-card">
                        <button className="edit-profile-btn"><FontAwesomeIcon icon={faPencilAlt} /></button>
                        <div className="profile-summary">
                            <img src={`https://placehold.co/100x100/808080/FFFFFF?text=MJ`} alt="Profile" className="profile-picture" />
                            <h3 className="profile-name">{profileData.name}</h3>
                            <p className="profile-university">{profileData.university}</p>
                        </div>
                        <div className="profile-details-list">
                            <p><FontAwesomeIcon icon={faUserCircle} className="detail-icon" /><strong>Age:</strong> {profileData.age}</p>
                            <p><FontAwesomeIcon icon={faEnvelope} className="detail-icon" /><strong>Email:</strong> {profileData.email}</p>
                            <p><FontAwesomeIcon icon={faGithub} className="detail-icon" /><strong>GitHub:</strong> <a href={`https://${profileData.github}`}>{profileData.github}</a></p>
                            <p><FontAwesomeIcon icon={faFilePdf} className="detail-icon" /><strong>Resume:</strong> <a href="#">View</a> / <a href="#">Upload</a></p>
                            <div className="profile-skills-section">
                                <p className="skills-title"><strong>Skills:</strong></p>
                                <div className="skills-tags-container">
                                    {profileData.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-card">
                        <div className="filter-header">
                            <h3 className="filter-title">Matchmaker</h3>
                            <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
                        </div>
                        <p className="filter-description">Select skills to fine-tune recommendations.</p>
                        <div className="skills-tags-container">
                            {skillTypes.map(skill => (
                                <button key={skill} onClick={() => handleSkillClick(skill)} className={`skill-button ${activeSkills.includes(skill) ? 'active' : ''}`}>{skill}</button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-card tip-card">
                        <div className="tip-card-background"></div>
                        <div className="tip-card-content">
                            <FontAwesomeIcon icon={faStar} className="tip-icon"/>
                            <h3 className="tip-title">{dailyTip.title}</h3>
                            <p className="tip-body">{dailyTip.content}</p>
                        </div>
                    </div>
                </aside>

                <section className="internship-feed">
                    <h2 className="feed-title">Internships Curated for You</h2>
                    <div className="feed-list">
                        {filteredInternships.map(internship => (
                            <div key={internship.id} className="internship-item">
                                <div className="item-main-info">
                                    <img src={`https://placehold.co/60x60/333/FFFFFF?text=${internship.logoText}`} alt="Logo" className="item-logo"/>
                                    <div className="item-details">
                                        <h4 className="item-title">{internship.title}</h4>
                                        <p className="item-org">{internship.organization} <span className="verified-badge">✅ Verified</span></p>
                                        <div className="skills-tags-container small">
                                            {internship.skills.map(skill => <span key={skill} className="skill-tag-sm">{skill}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="item-action">
                                    <Link to={`/apply/${internship.id}`} className="apply-btn">View & Apply</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="main-footer">
                <div className="footer-grid">
                    <div>
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About MCA</a></li>
                            <li><a href="#">Internship Policy</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Resources</h3>
                        <ul>
                            <li><a href="#">Reports & Publications</a></li>
                            <li><a href="#">Circulars & Notifications</a></li>
                            <li><a href="#">Contact Directory</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Contact Us</h3>
                        <p>Ministry of Corporate Affairs, Government of India<br/>Shastri Bhawan, New Delhi - 110001</p>
                        <p>Email: support@mca.gov.in<br/>Phone: +91-11-12345678</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Ministry of Corporate Affairs (MCA). All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Dashboard;