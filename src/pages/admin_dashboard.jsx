import React, { useState } from 'react';
import './admin_dashboard.css';
import {
    Shield,
    Filter,
    List,
    MapPin,
    DollarSign,
    Clock,
    Users,
    Eye,
    Check,
    X,
    Flag,
    Edit,
    Trash2,
    Calendar,
    Building,
    AlertTriangle,
    TrendingUp,
    TrendingDown,
    CheckCircle2,
    XCircle,
    AlertCircle,
    BarChart3
} from 'lucide-react';
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

// Mock data for internships pending review
const mockInternshipsData = [
    {
        id: 1,
        title: "AI Research Intern",
        company: "TechCorp India Ltd",
        companyId: "TC001",
        location: "Mumbai, Maharashtra",
        stipend: "₹35,000",
        postedDate: "2024-01-15",
        deadline: "2024-02-28",
        applicants: 67,
        status: "pending",
        priority: "high",
        skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
        duration: "6 months",
        category: "Technology",
        flaggedReason: null,
        companyRating: 4.5,
        companySize: "500-1000"
    },
    {
        id: 2,
        title: "Digital Marketing Intern",
        company: "StartupXYZ",
        companyId: "SX002",
        location: "Bangalore, Karnataka",
        stipend: "₹20,000",
        postedDate: "2024-01-12",
        deadline: "2024-02-15",
        applicants: 89,
        status: "approved",
        priority: "medium",
        skills: ["Social Media", "SEO", "Content Writing", "Analytics"],
        duration: "3 months",
        category: "Marketing",
        flaggedReason: null,
        companyRating: 3.8,
        companySize: "50-100"
    },
    {
        id: 3,
        title: "Financial Analyst Intern",
        company: "MegaCorp Financial",
        companyId: "MC003",
        location: "Delhi, Delhi",
        stipend: "₹45,000",
        postedDate: "2024-01-10",
        deadline: "2024-03-01",
        applicants: 134,
        status: "flagged",
        priority: "high",
        skills: ["Excel", "Financial Modeling", "SQL", "Bloomberg Terminal"],
        duration: "4-6 months",
        category: "Finance",
        flaggedReason: "Unrealistic requirements for intern position",
        companyRating: 4.2,
        companySize: "1000+"
    },
    {
        id: 4,
        title: "UX Design Intern",
        company: "Creative Studio",
        companyId: "CS004",
        location: "Pune, Maharashtra",
        stipend: "₹25,000",
        postedDate: "2024-01-08",
        deadline: "2024-02-20",
        applicants: 45,
        status: "rejected",
        priority: "low",
        skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
        duration: "3-4 months",
        category: "Design",
        flaggedReason: "Incomplete job description",
        companyRating: 3.5,
        companySize: "10-50"
    },
    {
        id: 5,
        title: "Data Science Intern",
        company: "DataTech Solutions",
        companyId: "DT005",
        location: "Hyderabad, Telangana",
        stipend: "₹30,000",
        postedDate: "2024-01-14",
        deadline: "2024-02-25",
        applicants: 78,
        status: "pending",
        priority: "high",
        skills: ["Python", "R", "Statistics", "Machine Learning", "Tableau"],
        duration: "6 months",
        category: "Technology",
        flaggedReason: null,
        companyRating: 4.0,
        companySize: "200-500"
    },
    {
        id: 6,
        title: "Content Writing Intern",
        company: "Media House Pro",
        companyId: "MH006",
        location: "Chennai, Tamil Nadu",
        stipend: "₹18,000",
        postedDate: "2024-01-16",
        deadline: "2024-02-18",
        applicants: 56,
        status: "approved",
        priority: "low",
        skills: ["Writing", "SEO", "Research", "Social Media"],
        duration: "3 months",
        category: "Content",
        flaggedReason: null,
        companyRating: 3.9,
        companySize: "100-200"
    }
];

function AdminDashboard() {
    const [internships, setInternships] = useState(mockInternshipsData);
    const [selectedInternships, setSelectedInternships] = useState([]);
    const [filters, setFilters] = useState({
        status: '',
        category: '',
        priority: '',
        company: '',
        location: '',
        dateFrom: '',
        dateTo: ''
    });

    // Calculate analytics
    const analytics = {
        total: internships.length,
        pending: internships.filter(i => i.status === 'pending').length,
        approved: internships.filter(i => i.status === 'approved').length,
        rejected: internships.filter(i => i.status === 'rejected').length,
        flagged: internships.filter(i => i.status === 'flagged').length,
        totalApplicants: internships.reduce((sum, i) => sum + i.applicants, 0),
        highPriority: internships.filter(i => i.priority === 'high').length,
        totalCompanies: new Set(internships.map(i => i.companyId)).size
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            category: '',
            priority: '',
            company: '',
            location: '',
            dateFrom: '',
            dateTo: ''
        });
    };

    const handleSelectInternship = (id) => {
        setSelectedInternships(prev =>
            prev.includes(id)
                ? prev.filter(selectedId => selectedId !== id)
                : [...prev, id]
        );
    };

    const handleStatusChange = (id, newStatus, flagReason = null) => {
        setInternships(prev =>
            prev.map(internship =>
                internship.id === id
                    ? { ...internship, status: newStatus, flaggedReason: flagReason }
                    : internship
            )
        );
        alert(`Internship ${newStatus} successfully!`);
    };

    const handleBulkAction = (action) => {
        if (selectedInternships.length === 0) {
            alert('Please select internships first');
            return;
        }

        if (window.confirm(`Are you sure you want to ${action} ${selectedInternships.length} selected internships?`)) {
            setInternships(prev =>
                prev.map(internship =>
                    selectedInternships.includes(internship.id)
                        ? { ...internship, status: action }
                        : internship
                )
            );
            setSelectedInternships([]);
            alert(`${selectedInternships.length} internships ${action}d successfully!`);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this internship posting?")) {
            setInternships(prev => prev.filter(internship => internship.id !== id));
            alert("Internship deleted successfully!");
        }
    };

    const handleViewDetails = (id) => {
        alert(`Viewing details for internship ID: ${id}`);
    };

    const handleViewCompanyProfile = (companyId) => {
        alert(`Viewing company profile: ${companyId}`);
    };

    const handleFlagInternship = (id) => {
        const reason = prompt("Enter reason for flagging this internship:");
        if (reason) {
            handleStatusChange(id, 'flagged', reason);
        }
    };

    // Filter internships based on current filters
    const filteredInternships = internships.filter(internship => {
        return (
            (!filters.status || internship.status === filters.status) &&
            (!filters.category || internship.category === filters.category) &&
            (!filters.priority || internship.priority === filters.priority) &&
            (!filters.company || internship.company.toLowerCase().includes(filters.company.toLowerCase())) &&
            (!filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase())) &&
            (!filters.dateFrom || new Date(internship.postedDate) >= new Date(filters.dateFrom)) &&
            (!filters.dateTo || new Date(internship.postedDate) <= new Date(filters.dateTo))
        );
    });

    return (
        <div className="admin-page-container">
            {/* Header */}
            <header className="admin-main-header">
                <Navbar />

                <div className="admin-dashboard-bg">
                    <div className="admin-dashboard-wrapper">
                        <h2 className="admin-dashboard-title">
                            Government Internship Portal - Admin Control
                        </h2>
                        <p className="admin-dashboard-subtitle">
                            Monitor, review, and manage all internship postings across the platform.
                        </p>

                        {/* Quick Stats */}
                        <div className="admin-stats-grid">
                            <div className="admin-stat-card">
                                <List size={32} />
                                <h3 className="admin-stat-number">{analytics.total}</h3>
                                <p className="admin-stat-label">Total Postings</p>
                            </div>
                            <div className="admin-stat-card">
                                <Clock size={32} />
                                <h3 className="admin-stat-number">{analytics.pending}</h3>
                                <p className="admin-stat-label">Pending Review</p>
                            </div>
                            <div className="admin-stat-card">
                                <Users size={32} />
                                <h3 className="admin-stat-number">{analytics.totalApplicants}</h3>
                                <p className="admin-stat-label">Total Applicants</p>
                            </div>
                            <div className="admin-stat-card">
                                <Building size={32} />
                                <h3 className="admin-stat-number">{analytics.totalCompanies}</h3>
                                <p className="admin-stat-label">Active Companies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="admin-dashboard-layout">
                {/* Sidebar - Analytics & Filters */}
                <aside className="admin-sidebar">
                    {/* Analytics Cards */}
                    <div className="admin-analytics-section">
                        <div className="admin-analytics-grid">
                            <div className="admin-analytics-card">
                                <h4>Approved</h4>
                                <p className="admin-analytics-number">{analytics.approved}</p>
                                <p className="admin-analytics-change positive">
                                    <TrendingUp size={12} /> +12% this week
                                </p>
                            </div>
                            <div className="admin-analytics-card">
                                <h4>Flagged</h4>
                                <p className="admin-analytics-number">{analytics.flagged}</p>
                                <p className="admin-analytics-change negative">
                                    <AlertTriangle size={12} /> Needs attention
                                </p>
                            </div>
                            <div className="admin-analytics-card">
                                <h4>High Priority</h4>
                                <p className="admin-analytics-number">{analytics.highPriority}</p>
                                <p className="admin-analytics-change positive">
                                    <TrendingUp size={12} /> Review first
                                </p>
                            </div>
                            <div className="admin-analytics-card">
                                <h4>Rejected</h4>
                                <p className="admin-analytics-number">{analytics.rejected}</p>
                                <p className="admin-analytics-change negative">
                                    <TrendingDown size={12} /> -5% this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Filter Card */}
                    <div className="admin-sidebar-card">
                        <div className="admin-filter-header">
                            <div className="admin-filter-header-left">
                                <Filter size={24} className="admin-filter-icon" />
                                <h3 className="admin-filter-title">Filter Postings</h3>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="admin-clear-filters-btn"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="admin-filter-form">
                            <div className="admin-filter-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending Review</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="flagged">Flagged</option>
                                </select>
                            </div>

                            <div className="admin-filter-row">
                                <div className="admin-filter-group">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        name="category"
                                        id="category"
                                        value={filters.category}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">All Categories</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Design">Design</option>
                                        <option value="Operations">Operations</option>
                                        <option value="Research">Research</option>
                                        <option value="Content">Content</option>
                                    </select>
                                </div>
                                <div className="admin-filter-group">
                                    <label htmlFor="priority">Priority</label>
                                    <select
                                        name="priority"
                                        id="priority"
                                        value={filters.priority}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">All Priorities</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>

                            <div className="admin-filter-group">
                                <label htmlFor="company">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    placeholder="Search by company..."
                                    value={filters.company}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="admin-filter-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    placeholder="Search by location..."
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="admin-filter-row">
                                <div className="admin-filter-group">
                                    <label htmlFor="dateFrom">Posted From</label>
                                    <input
                                        type="date"
                                        name="dateFrom"
                                        id="dateFrom"
                                        value={filters.dateFrom}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                                <div className="admin-filter-group">
                                    <label htmlFor="dateTo">Posted To</label>
                                    <input
                                        type="date"
                                        name="dateTo"
                                        id="dateTo"
                                        value={filters.dateTo}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Feed */}
                <section className="admin-internship-feed">
                    <div className="admin-feed-header">
                        <div className="admin-feed-header-left">
                            <BarChart3 size={24} className="admin-feed-icon" />
                            <h2 className="admin-feed-title">
                                Internship Postings ({filteredInternships.length})
                            </h2>
                        </div>
                        <div className="admin-bulk-actions">
                            <button
                                onClick={() => handleBulkAction('approve')}
                                className="admin-bulk-btn approve-all"
                                disabled={selectedInternships.length === 0}
                            >
                                <CheckCircle2 size={16} />
                                Approve Selected
                            </button>
                            <button
                                onClick={() => handleBulkAction('reject')}
                                className="admin-bulk-btn reject-all"
                                disabled={selectedInternships.length === 0}
                            >
                                <XCircle size={16} />
                                Reject Selected
                            </button>
                        </div>
                    </div>

                    <div className="admin-feed-list">
                        {filteredInternships.map(internship => (
                            <div
                                key={internship.id}
                                className={`admin-posted-item ${internship.status}`}
                            >
                                <input
                                    type="checkbox"
                                    className="admin-item-checkbox"
                                    checked={selectedInternships.includes(internship.id)}
                                    onChange={() => handleSelectInternship(internship.id)}
                                />

                                <div className="admin-item-main-info">
                                    <div className="admin-item-logo-org">
                                        <Building size={24} />
                                    </div>
                                    <div className="admin-item-details">
                                        <h4 className="admin-item-title">{internship.title}</h4>
                                        <div className="admin-company-info">
                                            {internship.company} • Rating: {internship.companyRating}/5 • Size: {internship.companySize}
                                        </div>
                                        <div className="admin-item-stats">
                                            <span className="admin-item-stat">
                                                <MapPin size={14} />
                                                {internship.location}
                                            </span>
                                            <span className="admin-item-stat">
                                                <DollarSign size={14} />
                                                {internship.stipend}
                                            </span>
                                            <span className="admin-item-stat">
                                                <Users size={14} />
                                                {internship.applicants} Applicants
                                            </span>
                                            <span className="admin-item-stat">
                                                <Calendar size={14} />
                                                Posted: {new Date(internship.postedDate).toLocaleDateString()}
                                            </span>
                                            <span className={`admin-status-badge ${internship.status}`}>
                                                {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                                            </span>
                                            <span className={`admin-priority-flag ${internship.priority}`}>
                                                {internship.priority === 'high' && <AlertCircle size={12} />}
                                                {internship.priority} Priority
                                            </span>
                                        </div>

                                        {internship.flaggedReason && (
                                            <div style={{
                                                marginTop: '0.5rem',
                                                padding: '0.5rem',
                                                backgroundColor: '#fee2e2',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.875rem',
                                                color: '#991b1b'
                                            }}>
                                                <strong>Flagged Reason:</strong> {internship.flaggedReason}
                                            </div>
                                        )}

                                        {internship.skills && (
                                            <div className="admin-skills-container">
                                                {internship.skills.map((skill, index) => (
                                                    <span key={index} className="admin-skill-tag">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="admin-company-actions">
                                            <button
                                                onClick={() => handleViewCompanyProfile(internship.companyId)}
                                                className="admin-company-btn"
                                            >
                                                View Company
                                            </button>
                                            <button className="admin-company-btn">
                                                Company History
                                            </button>
                                            <button className="admin-company-btn">
                                                Contact Company
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="admin-item-actions">
                                    <button
                                        onClick={() => handleViewDetails(internship.id)}
                                        className="admin-action-btn view"
                                    >
                                        <Eye size={16} />
                                        View Details
                                    </button>

                                    {internship.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(internship.id, 'approved')}
                                                className="admin-action-btn approve"
                                            >
                                                <Check size={16} />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(internship.id, 'rejected')}
                                                className="admin-action-btn reject"
                                            >
                                                <X size={16} />
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {internship.status === 'approved' && (
                                        <button
                                            onClick={() => handleStatusChange(internship.id, 'rejected')}
                                            className="admin-action-btn reject"
                                        >
                                            <X size={16} />
                                            Revoke
                                        </button>
                                    )}

                                    {(internship.status === 'pending' || internship.status === 'approved') && (
                                        <button
                                            onClick={() => handleFlagInternship(internship.id)}
                                            className="admin-action-btn flag"
                                        >
                                            <Flag size={16} />
                                            Flag
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(internship.id)}
                                        className="admin-action-btn delete"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredInternships.length === 0 && (
                        <div className="admin-empty-state">
                            <List size={48} />
                            <h3 className="admin-empty-title">No internships found</h3>
                            <p className="admin-empty-description">
                                Try adjusting your filters to see more results.
                            </p>
                        </div>
                    )}
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default AdminDashboard;