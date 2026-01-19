import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, LogOut, ChevronDown, Menu, X, 
  Monitor, Briefcase, Wrench, CandlestickChart, Users, Home 
} from 'lucide-react';

import logoImg from '../assets/ak.png';

const Navbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // ថែម State សម្រាប់តាមដាន Scroll
  const navigate = useNavigate();
  const location = useLocation();

  // តាមដានការ Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogout) onLogout(); 
    setShowDropdown(false);
    setIsOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Courses', path: '/courses', icon: <Monitor size={18} /> },
    { name: 'Service', path: '/services', icon: <Briefcase size={18} /> },
    { name: 'Tool', path: '/tool', icon: <Wrench size={18} /> },
    { name: 'Trading Forex', path: '/trading', icon: <CandlestickChart size={18} /> },
    { name: 'Our Team', path: '/team', icon: <Users size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'py-3 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50' 
        : 'py-5 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-amber-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-10 h-10 md:w-11 md:h-11 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 group-hover:border-amber-500/50 transition-all overflow-hidden">
                <img 
                  src={logoImg} 
                  alt="AK Logo" 
                  className="w-full h-full object-contain p-1 transform group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black tracking-tighter text-white leading-none">
                AK DIGITAL<span className="text-amber-500">HUB</span>
              </span>
              <span className="text-[7px] md:text-[8px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">
                Trading & Academy
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/5 px-2 py-1.5 rounded-2xl backdrop-blur-md">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all rounded-xl ${
                  isActive(link.path) 
                    ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Profile / Login */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-3 bg-slate-900/50 p-1 pr-4 rounded-full border border-slate-800 hover:border-amber-500/50 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-full flex items-center justify-center text-slate-900 font-black shadow-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm font-bold text-slate-200">{user.name}</span>
                    <ChevronDown size={14} className={`text-slate-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-3 w-56 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                      <div className="p-4 bg-white/5 border-b border-white/5">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Member Portal</p>
                        <p className="text-sm font-black text-amber-500 truncate">{user.username}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/profile" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                          <User size={18} className="text-slate-500" /> My Profile
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-1">
                          <LogOut size={18} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="bg-amber-500 text-slate-900 px-7 py-2.5 rounded-xl font-black hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95 text-xs uppercase">
                  Get Started
                </Link>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 active:scale-90 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content - Glass Style */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 m-4 bg-[#020617]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-sm ${
                  isActive(link.path) ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5 mt-4">
            {!user ? (
              <Link to="/login" className="block w-full text-center bg-amber-500 text-slate-900 py-4 rounded-2xl font-black uppercase text-xs" onClick={() => setIsOpen(false)}>
                Login to Portal
              </Link>
            ) : (
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 text-red-400 bg-red-500/10 rounded-2xl font-black uppercase text-xs">
                <LogOut size={18} /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;