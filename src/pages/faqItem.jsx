// src/components/FaqItem.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// This is a reusable component for a single FAQ item.
// It receives props to determine its content and state.
function FaqItem({ item, isOpen, onClick }) {
    return (
        <div className="faq-item">
            <button
                className="faq-trigger"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span>{item.question}</span>
                <FontAwesomeIcon icon={faChevronDown} className="faq-icon" />
            </button>
            <div className={`faq-content ${isOpen ? 'open' : ''}`}>
                <p>{item.answer}</p>
            </div>
        </div>
    );
}

export default FaqItem;