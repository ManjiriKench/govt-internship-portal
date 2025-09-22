import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import './home.css'; // We will create this file next
import './navbar.jsx'

// Import your images from the assets folder
import heroImage from '../assets/image.png';
import missionImage from '../assets/mission.jpg';
import Navbar from "./navbar.jsx";

function Home() {
    const scrollContainerRef = useRef(null);

    // This hook replaces the <script> tag for the auto-scroller
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const scrollSpeed = 0.5;
        let animationFrameId;
        let isPaused = false;

        const animateScroll = () => {
            if (!isPaused && scrollContainer) {
                // If scrolled to the halfway point, reset to the beginning for a seamless loop
                if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += scrollSpeed;
                }
            }
            animationFrameId = requestAnimationFrame(animateScroll);
        };

        const handleMouseEnter = () => isPaused = true;
        const handleMouseLeave = () => isPaused = false;

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        animateScroll();

        // Cleanup function to stop the animation when the component is removed
        return () => {
            cancelAnimationFrame(animationFrameId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []); // Empty array ensures this effect runs only once on mount


    return (
        <>
            <div className="tricolor-ribbon">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <header className="main-header">
                <div className="top-bar">
                    <p>Government of India | Ministry of Corporate Affairs (MoCA)</p>
                </div>

                <Navbar />

                <div className="hero-bg">
                    <div className="hero-content section-container">
                        <div className="hero-text">
                            <p className="subtitle">AI-Powered Internship Matching Portal</p>
                            <h2 className="title">for the Youth of <span>BHARAT</span></h2>
                            <p className="description">An official initiative of the Ministry of Corporate Affairs to empower students by providing meaningful internship opportunities.</p>
                            <a href="#" className="discover-path-link">
                                Discover Your Path
                            </a>
                        </div>
                        <div className="hero-image-container">
                            <img src={heroImage} alt="Hero Image representing the portal" />
                        </div>
                    </div>
                </div>
            </header>

            <section className="content-section">
                <div className="section-container">
                    <h2 className="section-title">Our Vision: Empowering the Future of Bharat</h2>
                    <div className="mission-content">
                        <div className="mission-text">
                            <p>
                                The Ministry of Corporate Affairs (MoCA) is committed to fostering a new generation of skilled professionals who are ready to contribute to nation-building. This AI-powered portal is our commitment to the youth of Bharat. By leveraging intelligent matching algorithms, we aim to bridge the gap between academic learning and practical application in government sectors. Our mission is to democratize access to high-quality internships, ensuring that every motivated student, regardless of their background, has the opportunity to gain invaluable experience, develop a civic sense, and become a part of India's growth story.
                            </p>
                        </div>
                        <div className="mission-image-container">
                            <img src={missionImage} alt="Image representing MCA's mission" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-section gray-bg">
                <h2 className="section-title">How the Internship Scheme Works</h2>
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    <div className="timeline-step">
                        <div className="timeline-step-content-wrapper">
                            <div className="timeline-step-card">
                                <div className="timeline-step-number">1</div>
                                <h3>Register</h3>
                                <p>Students sign up on the MCA Internship Portal with basic details and academic credentials.</p>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-step">
                        <div className="timeline-step-content-wrapper">
                            <div className="timeline-step-card">
                                <div className="timeline-step-number">2</div>
                                <h3>AI Matching</h3>
                                <p>The system uses AI to match students with internships relevant to their skills and interests.</p>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-step">
                        <div className="timeline-step-content-wrapper">
                            <div className="timeline-step-card">
                                <div className="timeline-step-number">3</div>
                                <h3>Apply & Work</h3>
                                <p>Students can apply, attend selection rounds, and work with top government bodies.</p>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-step" style={{ marginBottom: 0 }}>
                        <div className="timeline-step-content-wrapper">
                            <div className="timeline-step-card">
                                <div className="timeline-step-number">4</div>
                                <h3>Certification</h3>
                                <p>Successful completion of internships earns official certificates from MCA.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content-section light-gray-bg">
                <div className="eligibility-benefits-grid">
                    {/* Eligibility Section */}
                    <div className="info-card">
                        <h3>Are you <span>Eligible</span>?</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Indian Citizen</h4><p>Applicants must be a citizen of India.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Academic Enrollment</h4><p>Currently enrolled in a UG/PG program.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Strong Academics</h4><p>A strong academic background is preferred.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Public Service Motivation</h4><p>A genuine motivation to contribute.</p>
                            </div>
                        </div>
                    </div>
                    {/* Benefits Section */}
                    <div className="info-card">
                        <h3>Core Benefits for <span>MCA Internship Scheme</span></h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Hands-on Experience</h4><p>Gain practical experience in government.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Real-world Exposure</h4><p>Exposure to real-world challenges.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Official Certification</h4><p>Earns an official certificate from MCA.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">{/* SVG Icon */}</div>
                                <h4>Professional Networking</h4><p>Connect with top government officials.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="spacer"></div>

            <main className="internships-section">
                <h2 className="section-title">Featured Internship Opportunities</h2>
                <div id="scroll-container" ref={scrollContainerRef}>
                    {/* Original Cards */}
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/32CD32/FFFFFF?text=Data+Analyst" alt="Data Analyst"/></div>
                        <div className="card-content"><h3>Data Analyst Intern</h3><p>Department of Treasury</p><a href="#">View Details</a></div>
                    </div>
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/94A3B8/FFFFFF?text=Environmental" alt="Environmental"/></div>
                        <div className="card-content"><h3>Environmental Policy Intern</h3><p>Ministry of Environment</p><a href="#">View Details</a></div>
                    </div>
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/60A5FA/FFFFFF?text=Public+Health" alt="Health"/></div>
                        <div className="card-content"><h3>Public Health Intern</h3><p>Department of Health</p><a href="#">View Details</a></div>
                    </div>
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/EC4899/FFFFFF?text=Software+Dev" alt="Software"/></div>
                        <div className="card-content"><h3>Software Development Intern</h3><p>Department of Defense</p><a href="#">View Details</a></div>
                    </div>
                    {/* Duplicate Cards for seamless scroll effect */}
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/32CD32/FFFFFF?text=Data+Analyst" alt="Data Analyst"/></div>
                        <div className="card-content"><h3>Data Analyst Intern</h3><p>Department of Treasury</p><a href="#">View Details</a></div>
                    </div>
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/94A3B8/FFFFFF?text=Environmental" alt="Environmental"/></div>
                        <div className="card-content"><h3>Environmental Policy Intern</h3><p>Ministry of Environment</p><a href="#">View Details</a></div>
                    </div>
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/60A5FA/FFFFFF?text=Public+Health" alt="Health"/></div>
                        <div className="card-content"><h3>Public Health Intern</h3><p>Department of Health</p><a href="#">View Details</a></div>
                    </div>
                    <div className="internship-card">
                        <div className="card-image-wrapper"><img src="https://placehold.co/600x400/EC4899/FFFFFF?text=Software+Dev" alt="Software"/></div>
                        <div className="card-content"><h3>Software Development Intern</h3><p>Department of Defense</p><a href="#">View Details</a></div>
                    </div>
                </div>
            </main>

            <footer className="main-footer">
                <div className="footer-grid">
                    <div className="footer-links">
                        <h3>Quick Links</h3><ul><li><a href="#">Home</a></li><li><a href="#">About MCA</a></li><li><a href="#">FAQ</a></li></ul>
                    </div>
                    <div className="footer-links">
                        <h3>Resources</h3><ul><li><a href="#">Reports & Publications</a></li><li><a href="#">Circulars</a></li></ul>
                    </div>
                    <div className="footer-contact">
                        <h3>Contact Us</h3><p>Ministry of Corporate Affairs, Government of India<br/>New Delhi - 110001</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Ministry of Corporate Affairs (MCA). All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Home;