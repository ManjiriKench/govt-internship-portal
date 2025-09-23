import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/student_login.jsx'; // Import the new Login component
import Register from './pages/student_register.jsx';
import Dashboard from './pages/student_dashboard.jsx';
import Apply from './pages/apply.jsx';
import Disclaimer from './pages/disclaimer.jsx';
import Faq from './pages/faq.jsx'
import './App.css';
import OrganizationLogin from "./pages/organization_login.jsx";
import OrganizationRegister from "./pages/organization_register.jsx";
import OrganizationDashboard from "./pages/organization_dashboard.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply/:internshipId" element={<Apply />} /> {/* 2. Add the new dynamic route */}
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/organization-login" element={<OrganizationLogin />} />
            <Route path="/organization-register" element={<OrganizationRegister />} />
            <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        </Routes>
    );
}

export default App;