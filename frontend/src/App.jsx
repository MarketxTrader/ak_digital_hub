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
import ServiceDetail from './pages/ServiceDetail'; 
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
  
  // ពិនិត្យមើលថាតើជាទំព័រ Admin ឬអត់
  const isAdminPage = location.pathname.startsWith('/admin-control') || 
                      location.pathname.startsWith('/ak-manager-login');

  return (
    <div className={`flex flex-col min-h-screen relative overflow-hidden bg-[#020617] ${!isAdminPage && 'bg-grid'}`}>
      
      {/* Background Glows - បង្ហាញតែលើទំព័រធម្មតា */}
      {!isAdminPage && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        </>
      )}

      {/* Navbar - មិនបង្ហាញលើទំព័រ Admin */}
      {!isAdminPage && (
        <div className="relative z-50">
          <Navbar user={user} />
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      {/* Footer - មិនបង្ហាញលើទំព័រ Admin */}
      {!isAdminPage && (
        <div className="relative z-10">
          <Footer />
        </div>
      )}
    </div>
  );
};

/**
 * ២. AdminPrivateRoute: ការពារទំព័រ Admin ឱ្យចូលបានតែអ្នកមានសិទ្ធិ
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

  // Function សម្រាប់ Update State នៅពេលមានការ Login ឬ Logout
  const handleAuthChange = () => {
    const updatedUser = localStorage.getItem("user");
    setUser(updatedUser ? JSON.parse(updatedUser) : null);
  };

  return (
    <Router>
      <LayoutWrapper user={user}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} /> 
          
          {/* --- Service Routes --- */}
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetail />} /> {/* ប្រើ /service/:id ឱ្យត្រូវនឹង navigate ក្នុង Services.jsx */}
          
          <Route path="/trading" element={<TradingHub />} />
          <Route path="/tool" element={<Tools />} />
          <Route path="/team" element={<OurTeam />} />

          {/* --- Auth Routes --- */}
          <Route path="/login" element={<Login onLoginSuccess={handleAuthChange} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ak-manager-login" element={<AdminLogin onLoginSuccess={handleAuthChange} />} />

          {/* --- Protected Routes (ត្រូវការ Login) --- */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          
          {/* --- Admin Control Area --- */}
          <Route 
            path="/admin-control" 
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            } 
          />

          {/* --- Error Page (404 Not Found) --- */}
          <Route path="*" element={
            <div className="text-white min-h-[70vh] flex flex-col items-center justify-center font-khmer px-6 text-center relative">
              {/* Background 404 Big Text */}
              <h1 className="text-[12rem] sm:text-[20rem] font-black text-amber-500/[0.03] absolute uppercase italic tracking-tighter select-none">
                404
              </h1>
              
              <div className="relative z-10">
                <div className="inline-block bg-amber-500/10 border border-amber-500/20 px-4 py-1 rounded-full text-amber-500 text-[10px] font-black tracking-widest uppercase mb-6">
                  Page Not Found
                </div>
                <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase tracking-tighter italic">
                  រកមិនឃើញ <span className="text-amber-500">ទំព័រ</span>
                </h2>
                <p className="text-slate-500 mb-10 italic max-w-md mx-auto text-sm sm:text-base">
                  សូមអភ័យទោស ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានក្នុងប្រព័ន្ធឡើយ ឬអាចត្រូវបានផ្លាស់ប្តូរទីតាំង។
                </p>
                <a 
                  href="/" 
                  className="bg-amber-500 text-slate-900 px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-amber-500/40 inline-flex items-center gap-3 transition-all hover:bg-amber-400 active:scale-95"
                >
                  ត្រឡប់ទៅទំព័រដើម
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