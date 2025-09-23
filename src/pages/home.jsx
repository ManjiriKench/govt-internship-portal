import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import './home.css'; // We will create this file next
import './navbar.jsx'

// Import your images from the assets folder
import heroImage from '../assets/image.png';
import missionImage from '../assets/mission.jpg';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

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
            <header className="main-header">
                <Navbar />

                <div className="hero-bg">
                    <div className="hero-content section-container">
                        <div className="hero-text">
                            <p className="subtitle">AI-Powered Internship Matching Portal</p>
                            <h2 className="title">for the Youth of <span>BHARAT</span></h2>
                            <p className="description">An official initiative of the Ministry of Corporate Affairs to empower students by providing meaningful internship opportunities with government organizations and allied institutions.</p>
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
                        <div className="timeline-step-content-wrapper odd">
                            <div className="timeline-step-card">
                                <h3>Register</h3>
                                <p>Students sign up on the MCA Internship Portal with basic details and academic credentials.</p>
                            </div>
                            <div className="timeline-step-number">1</div>
                        </div>
                    </div>

                    <div className="timeline-step">
                        <div className="timeline-step-content-wrapper even">
                            <div className="timeline-step-card">
                                <h3>AI Matching</h3>
                                <p>The system uses AI to match students with internships relevant to their skills and interests.</p>
                            </div>
                            <div className="timeline-step-number">2</div>
                        </div>
                    </div>

                    <div className="timeline-step">
                        <div className="timeline-step-content-wrapper odd">
                            <div className="timeline-step-card">
                                <h3>Apply & Work</h3>
                                <p>Students can apply, attend selection rounds, and work with top government bodies.</p>
                            </div>
                            <div className="timeline-step-number">3</div>
                        </div>
                    </div>

                    <div className="timeline-step">
                        <div className="timeline-step-content-wrapper even">
                            <div className="timeline-step-card">
                                <h3>Certification</h3>
                                <p>Successful completion of internships earns official certificates from MCA.</p>
                            </div>
                            <div className="timeline-step-number">4</div>
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
                                <div className="info-item-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <h4>Indian Citizen</h4><p>Applicants must be a citizen of India.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/>
                                        <path d="M10 12h8"/>
                                        <path d="M15 9l3 3-3 3"/>
                                        <circle cx="12" cy="7" r="2"/>
                                    </svg>
                                </div>
                                <h4>Academic Enrollment</h4><p>Currently enrolled in a UG/PG program.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5H6.5A2.5 2.5 0 0 0 4 7.5v11z"/>
                                        <path d="M20 17H6.5A2.5 2.5 0 0 1 4 19.5"/>
                                        <polyline points="9 11 11 13 15 9"/>
                                    </svg>
                                </div>
                                <h4>Strong Academics</h4><p>A strong academic background is preferred.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        <path d="M12 7c-2.76 0-5 2.24-5 5h10c0-2.76-2.24-5-5-5z"/>
                                        <path d="M12 10c-1.1 0-2 .9-2 2h4c0-1.1-.9-2-2-2z"/>
                                    </svg>
                                </div>
                                <h4>Public Service Motivation</h4><p>A genuine motivation to contribute.</p>
                            </div>
                        </div>
                    </div>
                    {/* Benefits Section */}
                    <div className="info-card">
                        <h3>Core Benefits for <span>MCA Internship Scheme</span></h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-item-icon">
                                    {/* Example SVG Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.5 17.5L19 19l2.5-2.5"/>
                                        <path d="M19 12v-1.5a4.5 4.5 0 0 0-4.5-4.5h- металл 1a4.5 4.5 0 0 0-4.5 4.5V12"/>
                                        <path d="M12 12h8"/>
                                        <circle cx="6" cy="12" r="3"/>
                                        <path d="M3 12h1m16 0h1"/>
                                    </svg>
                                </div>
                                <h4>Hands-on Experience</h4><p>Gain practical experience in government.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M2 12h20"/>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                    </svg>
                                </div>
                                <h4>Real-world Exposure</h4><p>Exposure to real-world challenges.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <circle cx="12" cy="15" r="3"/>
                                        <path d="M10.5 13.5L9 12"/>
                                        <path d="M13.5 13.5L15 12"/>
                                        <path d="M10.5 16.5L9 18"/>
                                        <path d="M13.5 16.5L15 18"/>
                                    </svg>
                                </div>
                                <h4>Official Certification</h4><p>Earns an official certificate from MCA.</p>
                            </div>
                            <div className="info-item">
                                <div className="info-item-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="5" r="3"/>
                                        <path d="M12 8v5"/>
                                        <circle cx="18" cy="17" r="3"/>
                                        <path d="M15 15.5l-3-1.5"/>
                                        <circle cx="6" cy="17" r="3"/>
                                        <path d="M9 15.5l3-1.5"/>
                                    </svg>
                                </div>
                                <h4>Professional Networking</h4><p>Connect with top government officials.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="spacer"></div>

            <main className="internships-section">
                <h2 className="section-title">Featured Internship Opportunities</h2>
                <div className="scroll-wrapper">
                    <div id="scroll-container" ref={scrollContainerRef}>
                        {[
                            {
                                title: "Data Analyst Intern",
                                department: "Department of Treasury",
                                img: "https://placehold.co/600x400/32CD32/FFFFFF?text=Data+Analyst"
                            },
                            {
                                title: "Environmental Policy Intern",
                                department: "Ministry of Environment",
                                img: "https://placehold.co/600x400/94A3B8/FFFFFF?text=Environmental"
                            },
                            {
                                title: "Public Health Intern",
                                department: "Department of Health",
                                img: "https://placehold.co/600x400/60A5FA/FFFFFF?text=Public+Health"
                            },
                            {
                                title: "Software Development Intern",
                                department: "Department of Defense",
                                img: "https://placehold.co/600x400/EC4899/FFFFFF?text=Software+Dev"
                            },
                            // Duplicates for seamless scroll effect
                            {
                                title: "Data Analyst Intern",
                                department: "Department of Treasury",
                                img: "https://placehold.co/600x400/32CD32/FFFFFF?text=Data+Analyst"
                            },
                            {
                                title: "Environmental Policy Intern",
                                department: "Ministry of Environment",
                                img: "https://placehold.co/600x400/94A3B8/FFFFFF?text=Environmental"
                            },
                            {
                                title: "Public Health Intern",
                                department: "Department of Health",
                                img: "https://placehold.co/600x400/60A5FA/FFFFFF?text=Public+Health"
                            },
                            {
                                title: "Software Development Intern",
                                department: "Department of Defense",
                                img: "https://placehold.co/600x400/EC4899/FFFFFF?text=Software+Dev"
                            }
                        ].map((internship, idx) => (
                            <div className="internship-card" key={idx}>
                                <div className="card-image-wrapper">
                                    <img src={internship.img} alt={internship.title} />
                                </div>
                                <div className="card-content">
                                    <h3>{internship.title}</h3>
                                    <p>{internship.department}</p>
                                    <a href="#">View Details</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>


            <Footer/>
        </>
    );
}

export default Home;