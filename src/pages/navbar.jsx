import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import mcaLogo from '../assets/mca.jpeg';
import OrganizationLogin from "./organization_login.jsx"; // Make sure your logo is in src/assets

const Navbar = () => {
    return (
        <>
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
                        <div className="nav-links">
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/faq">FAQ</Link>
                            <Link to="/about">About MoCA</Link>
                            <Link to="/disclaimer">Disclaimer</Link>
                        </div>
                    </div>
                    <h1 className="header-title">GOV. INTERNSHIP SCHEME</h1>
                    <div className="nav-right">
                        <Link to="/organization-login" className="org-login-btn">
                            Login as Organization
                        </Link>
                        <Link to="/login" className="student-login-link">Student Login</Link>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;