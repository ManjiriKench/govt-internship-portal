// src/components/Faq.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './faq.css';
import FaqItem from './faqItem.jsx';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx"; // Import the reusable item component

const studentFaqs = [
    { id: 's1', question: 'Who can apply for internships?', answer: 'Any registered student from recognized colleges/universities in India.' },
    { id: 's2', question: 'How does the AI recommendation system work?', answer: 'The system uses NLP to analyze your resume and match your skills with internship requirements.' },
    { id: 's3', question: 'Is uploading a resume mandatory?', answer: 'Yes, because the AI system needs it to suggest relevant internships and highlight skill gaps.' },
    { id: 's4', question: 'Are these internships verified?', answer: 'Yes, all internships are posted by verified government organizations and approved by the admin.' },
];

const orgFaqs = [
    { id: 'o1', question: 'Who can post internships?', answer: 'Only verified government departments, ministries, or registered institutions.' },
    { id: 'o2', question: 'How are student matches shown?', answer: 'The AI highlights top candidates based on skills and eligibility.' },
    { id: 'o3', question: 'Can I track applications?', answer: 'Yes, you can view applicants, see AI-suggested matches, and manage applications in your dashboard.' },
];

const generalFaqs = [
    { id: 'g1', question: 'What is the purpose of this portal?', answer: 'To provide students with easy access to authentic government internships and use AI to bridge skill gaps.'},
    { id: 'g2', question: 'Is this an official government platform?', answer: 'This portal is developed under the Smart India Hackathon (SIH) project for enhancing internship opportunities.'},
    { id: 'g3', question: 'Do I need to pay to use this platform?', answer: 'No, it’s completely free for both students and organizations.'}
]

function Faq() {
    const [openId, setOpenId] = useState(null); // State to track which FAQ is open

    // This function will be passed to each FaqItem.
    // It sets the openId, ensuring only one item is open at a time.
    const handleToggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="page-container">
            <header className="main-header">
                <Navbar />
                <div className="faq-hero-bg">
                    <div className="faq-hero-content">
                        <h2 className="faq-hero-title">Frequently Asked Questions</h2>
                        <p className="faq-hero-subtitle">Find answers to common questions about our AI-powered internship portal.</p>
                    </div>
                </div>

            </header>

            <main className="faq-layout">
                <div className="faq-container">
                    <div className="faq-section-card">
                        <h3>For Students</h3>
                        <div className="faq-list">
                            {studentFaqs.map(faq => (
                                <FaqItem
                                    key={faq.id}
                                    item={faq}
                                    isOpen={openId === faq.id}
                                    onClick={() => handleToggle(faq.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="faq-section-card">
                        <h3>For Organizations / Govt. Bodies</h3>
                        <div className="faq-list">
                            {orgFaqs.map(faq => (
                                <FaqItem
                                    key={faq.id}
                                    item={faq}
                                    isOpen={openId === faq.id}
                                    onClick={() => handleToggle(faq.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="faq-section-card">
                        <h3>General / Common</h3>
                        <div className="faq-list">
                            {generalFaqs.map(faq => (
                                <FaqItem
                                    key={faq.id}
                                    item={faq}
                                    isOpen={openId === faq.id}
                                    onClick={() => handleToggle(faq.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Faq;