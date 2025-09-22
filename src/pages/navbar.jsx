import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import mcaLogo from '../assets/mca.jpeg'; // Make sure your logo is in src/assets

const Navbar = () => {
    return (
        <>
            <header className="main-header">
                <nav className="main-nav">
                    <div className="nav-left">
                        <img src={mcaLogo} alt="Government of India Logo" />
                        <div className="nav-links">
                            <a href="">Dashboard</a>
                            <a href="#">FAQ</a>
                            <a href="#">About MoCA</a>
                            <a href="#">Disclaimer</a>
                        </div>
                    </div>
                    <h1 className="header-title">AI - GOV. INTERNSHIP SCHEME</h1>
                    <div className="nav-right">
                        <button className="org-login-btn">
                            Login as Organization
                        </button>
                        <Link to="/login" className="student-login-link">Student Login</Link>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;