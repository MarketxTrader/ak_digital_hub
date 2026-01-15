import React, { useState, useEffect } from 'react'; // បន្ថែម useState និង useEffect
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import Services from './pages/Services';
import TradingHub from './pages/TradingHub';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout'; 
import AdminDashboard from './pages/AdminDashboard'; 
import AdminLogin from './pages/AdminLogin';
import OurTeam from './pages/OurTeam';
import Tools from './pages/Tool';

/**
 * ១. LayoutWrapper: គ្រប់គ្រង UI ខាងក្រៅ
 */
const LayoutWrapper = ({ children, user }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin-control') || 
                      location.pathname.startsWith('/ak-manager-login');

  return (
    <div className={`flex flex-col min-h-screen ${isAdminPage ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      {/* បោះ user ទៅឱ្យ Navbar ដើម្បីឱ្យវាបង្ហាញឈ្មោះត្រឹមត្រូវ */}
      {!isAdminPage && <Navbar user={user} />} 
      
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
};

const AdminPrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.username === "admin"; 
  return isAdmin ? children : <Navigate to="/ak-manager-login" replace />;
};

/**
 * ២. Main App Component
 */
function App() {
  // បង្កើត Global State សម្រាប់រក្សាទុកព័ត៌មាន User
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Function សម្រាប់ Update State នៅពេល Login ឬ Logout
  const handleAuthChange = () => {
    const updatedUser = localStorage.getItem("user");
    setUser(updatedUser ? JSON.parse(updatedUser) : null);
  };

  return (
    <Router>
      {/* បោះ user ចូលទៅ LayoutWrapper */}
      <LayoutWrapper user={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/service" element={<Services />} />
          <Route path="/trading" element={<TradingHub />} />
          
          {/* បោះ handleAuthChange ទៅឱ្យ Login Pages */}
          <Route path="/login" element={<Login onLoginSuccess={handleAuthChange} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ak-manager-login" element={<AdminLogin onLoginSuccess={handleAuthChange} />} />

          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/tool" element={<Tools />} />
          <Route path="*" element={<div className="text-white p-20">រកមិនឃើញទំព័រដែលអ្នកចង់រកទេ (404 Not Found)</div>} />
          <Route 
            path="/admin-control" 
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            } 
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;