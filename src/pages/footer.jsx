import React from "react";
import "./footer.css";

export default function Footer() {
    return (
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
                    <p>
                        Ministry of Corporate Affairs, Government of India <br />
                        Shastri Bhawan, New Delhi - 110001
                    </p>
                    <p>
                        Email: <a href="mailto:support@mca.gov.in">support@mca.gov.in</a> <br />
                        Phone: +91-11-12345678
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Ministry of Corporate Affairs (MCA). All Rights Reserved.</p>
                <p>&copy; Disclaimer: This is the official internship portal of the Ministry of Corporate Affairs, Government of India. Unauthorized use is strictly prohibited.</p>
            </div>
        </footer>
    );
}
