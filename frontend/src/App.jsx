import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail'; 
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail'; // <--- បន្ថែមការ Import នេះ
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
 * ១. LayoutWrapper: សម្រាប់គ្រប់គ្រង Background និងការបង្ហាញ Navbar/Footer
 */
const LayoutWrapper = ({ children, user }) => {
  const location = useLocation();
  
  const isAdminPage = location.pathname.startsWith('/admin-control') || 
                      location.pathname.startsWith('/ak-manager-login');

  return (
    <div className={`flex flex-col min-h-screen relative overflow-hidden bg-[#020617] ${!isAdminPage && 'bg-grid'}`}>
      
      {!isAdminPage && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        </>
      )}

      {!isAdminPage && (
        <div className="relative z-50">
          <Navbar user={user} />
        </div>
      )}
      
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      {!isAdminPage && (
        <div className="relative z-10">
          <Footer />
        </div>
      )}
    </div>
  );
};

/**
 * ២. AdminPrivateRoute: ការពារទំព័រ Admin
 */
const AdminPrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.username === "admin"; 
  return isAdmin ? children : <Navigate to="/ak-manager-login" replace />;
};

/**
 * ៣. Main App Component
 */
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleAuthChange = () => {
    const updatedUser = localStorage.getItem("user");
    setUser(updatedUser ? JSON.parse(updatedUser) : null);
  };

  return (
    <Router>
      <LayoutWrapper user={user}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} /> 
          
          {/* --- SERVICE ROUTES --- */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} /> {/* <--- ផ្លូវទៅមើលសេវាកម្មលម្អិត */}
          
          <Route path="/trading" element={<TradingHub />} />
          <Route path="/tool" element={<Tools />} />
          <Route path="/team" element={<OurTeam />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleAuthChange} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ak-manager-login" element={<AdminLogin onLoginSuccess={handleAuthChange} />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          
          {/* Admin Dashboard */}
          <Route 
            path="/admin-control" 
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            } 
          />

          {/* Error Page (404) */}
          <Route path="*" element={
            <div className="text-white min-h-[60vh] flex flex-col items-center justify-center font-khmer px-6 text-center">
              <h1 className="text-9xl font-black text-amber-500/20 absolute uppercase italic tracking-tighter">404</h1>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest">រកមិនឃើញទំព័រ</h2>
                <p className="text-slate-500 mb-8 italic">សូមអភ័យទោស ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានក្នុងប្រព័ន្ធឡើយ។</p>
                <a href="/" className="bg-amber-500 text-slate-900 px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-amber-500/20 inline-block transition-transform active:scale-95">
                  ត្រឡប់ទៅដើម
                </a>
              </div>
            </div>
          } />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;