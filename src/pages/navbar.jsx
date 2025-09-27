import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import mcaLogo from '../assets/mca.jpeg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="main-header">
            <div className="tricolor-ribbon">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className="top-bar">
                <p>Government of India | Ministry of Corporate Affairs (MoCA)</p>
            </div>

            <nav className="main-nav">
                <div className="nav-left">
                    <img src={mcaLogo} alt="Government of India Logo" />
                    <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                        {/* Navigation Links */}
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/faq">FAQ</Link>
                        <Link to="/about">About MoCA</Link>
                        <Link to="/disclaimer">Disclaimer</Link>

                        {/* Login buttons for mobile (hidden on desktop) */}
                        <div className="mobile-login-buttons">
                            <Link to="/organization-login" className="org-login-btn">
                                Organization
                            </Link>
                            <Link to="/login" className="student-login-link">
                                Student
                            </Link>
                            <Link to="/admin-login" className="admin-login-btn">
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>

                <h1 className="header-title">GOV. INTERNSHIP SCHEME</h1>

                <div className="nav-right">
                    {/* Desktop login buttons */}
                    <Link to="/organization-login" className="org-login-btn desktop-only">
                        Organization
                    </Link>
                    <Link to="/login" className="student-login-link desktop-only">
                        Student
                    </Link>
                    <Link to="/admin-login" className="admin-login-btn desktop-only">
                        Admin
                    </Link>

                    <button
                        className="hamburger"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;