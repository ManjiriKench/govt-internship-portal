import React, { useState } from 'react';
import './organization_dashboard.css';
import {
    Building,
    PlusCircle,
    List,
    MapPin,
    DollarSign,
    Clock,
    Users,
    Eye,
    Edit,
    Trash2,
    Calendar,
    Tags
} from 'lucide-react';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

const postedInternshipsData = [
    {
        id: 1,
        title: "Data Scientist Intern",
        applicants: 42,
        status: "Active",
        location: "Mumbai, Maharashtra",
        stipend: "₹25,000",
        postedDate: "2024-01-15",
        deadline: "2024-02-15",
        skills: ["Python", "Machine Learning", "SQL"]
    },
    {
        id: 2,
        title: "Frontend Developer Intern",
        applicants: 78,
        status: "Active",
        location: "Bangalore, Karnataka",
        stipend: "₹30,000",
        postedDate: "2024-01-10",
        deadline: "2024-02-20",
        skills: ["React", "JavaScript", "CSS"]
    },
    {
        id: 3,
        title: "Cloud Engineering Intern",
        applicants: 21,
        status: "Closed",
        location: "Hyderabad, Telangana",
        stipend: "₹28,000",
        postedDate: "2023-12-20",
        deadline: "2024-01-20",
        skills: ["AWS", "Docker", "Kubernetes"]
    },
];

function OrganizationDashboard() {
    const [newInternship, setNewInternship] = useState({
        title: '',
        location: '',
        stipend: '',
        skills: '',
        description: '',
        duration: '',
        deadline: '',
        requirements: '',
        category: ''
    });

    const [postedInternships, setPostedInternships] = useState(postedInternshipsData);
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInternship(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmitInternship = (e) => {
        e.preventDefault();
        const newPost = {
            id: postedInternships.length + 1,
            ...newInternship,
            applicants: 0,
            status: "Active",
            postedDate: new Date().toISOString().split('T')[0],
            skills: newInternship.skills.split(',').map(skill => skill.trim())
        };

        setPostedInternships([newPost, ...postedInternships]);
        alert("New internship posted successfully!");
        setNewInternship({
            title: '', location: '', stipend: '', skills: '', description: '',
            duration: '', deadline: '', requirements: '', category: ''
        });
        setShowForm(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this internship posting?")) {
            setPostedInternships(postedInternships.filter(internship => internship.id !== id));
        }
    };

    const toggleStatus = (id) => {
        setPostedInternships(postedInternships.map(internship =>
            internship.id === id
                ? { ...internship, status: internship.status === "Active" ? "Closed" : "Active" }
                : internship
        ));
    };

    const handleViewApplicants = (id) => {
        alert(`Viewing applicants for internship ID: ${id}`);
    };

    const totalApplicants = postedInternships.reduce((sum, internship) => sum + internship.applicants, 0);
    const activeInternships = postedInternships.filter(internship => internship.status === "Active").length;

    return (
        <div className="org-page-container">
            {/* Header */}
            <header className="org-main-header">
                <Navbar/>

                <div className="org-dashboard-bg">
                    <div className="org-dashboard-wrapper">
                        <h2 className="org-dashboard-title">
                            Welcome, Digital India Corporation!
                        </h2>
                        <p className="org-dashboard-subtitle">
                            Manage your listings and find the best talent for India's future.
                        </p>

                        {/* Quick Stats */}
                        <div className="org-stats-grid">
                            <div className="org-stat-card">
                                <List size={32} />
                                <h3 className="org-stat-number">{postedInternships.length}</h3>
                                <p className="org-stat-label">Total Postings</p>
                            </div>
                            <div className="org-stat-card">
                                <Users size={32} />
                                <h3 className="org-stat-number">{totalApplicants}</h3>
                                <p className="org-stat-label">Total Applicants</p>
                            </div>
                            <div className="org-stat-card">
                                <Clock size={32} />
                                <h3 className="org-stat-number">{activeInternships}</h3>
                                <p className="org-stat-label">Active Postings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="org-dashboard-layout">
                {/* Sidebar */}
                <aside className="org-sidebar">
                    <div className="org-sidebar-card">
                        <div className="org-form-header">
                            <div className="org-form-header-left">
                                <PlusCircle size={24} className="org-form-icon" />
                                <h3 className="org-form-title">Post New Internship</h3>
                            </div>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className={`org-toggle-form-btn ${showForm ? 'cancel' : 'new'}`}
                            >
                                {showForm ? 'Cancel' : 'New Post'}
                            </button>
                        </div>

                        {showForm && (
                            <div className="org-internship-form">
                                <div className="org-form-group">
                                    <label htmlFor="title">Internship Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="e.g., AI Research Intern"
                                        value={newInternship.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="org-form-row">
                                    <div className="org-form-group">
                                        <label htmlFor="location">Location *</label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            placeholder="e.g., Mumbai"
                                            value={newInternship.location}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="org-form-group">
                                        <label htmlFor="duration">Duration</label>
                                        <select
                                            name="duration"
                                            id="duration"
                                            value={newInternship.duration}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select duration</option>
                                            <option value="1-2 months">1-2 months</option>
                                            <option value="3-4 months">3-4 months</option>
                                            <option value="6 months">6 months</option>
                                            <option value="6+ months">6+ months</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="org-form-row">
                                    <div className="org-form-group">
                                        <label htmlFor="stipend">Stipend *</label>
                                        <input
                                            type="text"
                                            name="stipend"
                                            id="stipend"
                                            placeholder="e.g., ₹25,000"
                                            value={newInternship.stipend}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="org-form-group">
                                        <label htmlFor="deadline">Application Deadline</label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            id="deadline"
                                            value={newInternship.deadline}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="org-form-group">
                                    <label htmlFor="skills">Required Skills *</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        id="skills"
                                        placeholder="Python, SQL, Machine Learning"
                                        value={newInternship.skills}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="org-form-group">
                                    <label htmlFor="description">Job Description *</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows="4"
                                        placeholder="Describe the roles and responsibilities..."
                                        value={newInternship.description}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSubmitInternship}
                                    className="org-submit-internship-btn"
                                >
                                    <PlusCircle size={20} />
                                    Post Internship
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Feed */}
                <section className="org-internship-feed">
                    <div className="org-feed-header">
                        <List size={24} className="org-feed-icon" />
                        <h2 className="org-feed-title">
                            Your Posted Internships ({postedInternships.length})
                        </h2>
                    </div>

                    <div className="org-feed-list">
                        {postedInternships.map(internship => (
                            <div key={internship.id} className="org-posted-item">
                                <div className="org-item-main-info">
                                    <div className="org-item-logo-org">
                                        <Building size={24} />
                                    </div>
                                    <div className="org-item-details">
                                        <h4 className="org-item-title">{internship.title}</h4>
                                        <div className="org-item-stats">
                                            <span className="org-item-stat">
                                                <MapPin size={14} />
                                                {internship.location}
                                            </span>
                                            <span className="org-item-stat">
                                                <DollarSign size={14} />
                                                {internship.stipend}
                                            </span>
                                            <span className="org-item-stat">
                                                <Users size={14} />
                                                {internship.applicants} Applicants
                                            </span>
                                            <span className={`org-status-badge ${internship.status.toLowerCase()}`}>
                                                {internship.status}
                                            </span>
                                        </div>
                                        {internship.skills && (
                                            <div className="org-skills-container">
                                                {internship.skills.map((skill, index) => (
                                                    <span key={index} className="org-skill-tag">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="org-item-actions">
                                    <button
                                        onClick={() => handleViewApplicants(internship.id)}
                                        className="org-action-btn view"
                                    >
                                        <Eye size={16} />
                                        View Applicants
                                    </button>
                                    <button
                                        onClick={() => toggleStatus(internship.id)}
                                        className={`org-action-btn ${internship.status === 'Active' ? 'close' : 'open'}`}
                                    >
                                        <Clock size={16} />
                                        {internship.status === 'Active' ? 'Close' : 'Reopen'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(internship.id)}
                                        className="org-action-btn delete"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {postedInternships.length === 0 && (
                        <div className="org-empty-state">
                            <PlusCircle size={48} />
                            <h3 className="org-empty-title">No internships posted yet</h3>
                            <p className="org-empty-description">
                                Start by posting your first internship to attract talented candidates.
                            </p>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    );
}

export default OrganizationDashboard;