// src/components/Disclaimer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Disclaimer.css';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx"; // Make sure you have the logo in assets

function Disclaimer() {
    return (
        <div className="page-container">
            <header className="main-header">
                <Navbar />

                <div className="hero-bg">
                    <div className="hero-content">
                        <h2 className="hero-title">Disclaimer</h2>
                    </div>
                </div>
            </header>

            <main className="disclaimer-layout">
                <div className="disclaimer-container">
                    <div className="disclaimer-card">
                        <h2>Welcome to our AI-Powered Government Internship Portal (Prototype)</h2>
                        <p>This platform is currently a prototype created for academic and demonstration purposes. Please read the following carefully:</p>
                    </div>

                    <section className="disclaimer-card">
                        <h3>1. Prototype Nature</h3>
                        <p>This platform is currently a prototype. Features such as internship listings, match scores, and recommendations are simulated with dummy data to demonstrate workflow.</p>
                    </section>

                    <section className="disclaimer-card">
                        <h3>2. No Guarantee of Internship Placement</h3>
                        <p>The portal does not guarantee actual internship placements or offers. Information provided here is for demonstration only and may not represent real opportunities.</p>
                    </section>

                    <section className="disclaimer-card">
                        <h3>3. Data Privacy</h3>
                        <p>Any data entered (e.g., name, email, resume details) is temporary and not stored permanently. We do not share data with third parties.</p>
                    </section>

                    <section className="disclaimer-card">
                        <h3>4. Use of Company Information</h3>
                        <p>Logos, company names, or internship titles shown are placeholders or mock-ups. They do not represent official affiliations unless explicitly mentioned.</p>
                    </section>

                    <section className="disclaimer-card">
                        <h3>5. Accuracy of AI Features</h3>
                        <p>Features like skill matching and recommended courses are part of the prototype and may differ from real-world AI outputs.</p>
                    </section>

                    <section className="disclaimer-card">
                        <h3>6. Future Scope</h3>
                        <ul>
                            <li>Secure data storage & privacy measures</li>
                            <li>Verified and legitimate internship listings</li>
                            <li>Enhanced AI-powered skill gap analysis</li>
                            <li>Real-time organization and student dashboards</li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Disclaimer;