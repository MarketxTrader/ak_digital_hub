import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, LogOut, ChevronDown, Menu, X, 
  Monitor, Briefcase, Wrench, CandlestickChart, Users, Home 
} from 'lucide-react';

// ១. Import រូបភាព Logo ពី assets folder
import logoImg from '../assets/ak.png';

const Navbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogout) onLogout(); 
    setShowDropdown(false);
    setIsOpen(false);
    navigate('/login');
  };

  // ២. បញ្ជី Menu Items តាមតម្រូវការរបស់អ្នក
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Courses', path: '/courses', icon: <Monitor size={18} /> },
    { name: 'Service', path: '/services', icon: <Briefcase size={18} /> },
    { name: 'Tool', path: '/tool', icon: <Wrench size={18} /> },
    { name: 'Trading Forex', path: '/trading', icon: <CandlestickChart size={18} /> },
    { name: 'Our Team', path: '/team', icon: <Users size={18} /> },
  ];

  // ឆែកមើលទំព័រដែលកំពុងនៅដើម្បីប្តូរពណ៌ Link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#020617]/90 text-white sticky top-0 z-50 border-b border-slate-800/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo ជាមួយរូបភាព ak.png */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-amber-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 group-hover:border-amber-500/50 transition-all overflow-hidden">
                <img 
                  src={logoImg} 
                  alt="AK Logo" 
                  className="w-full h-full object-contain p-1 transform group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none">
                AK DIGITAL<span className="text-amber-500">HUB</span>
              </span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">
                Trading & Academy
              </span>
            </div>
          </Link>

          {/* Desktop Menu - បង្ហាញតាមតម្រូវការថ្មី */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all rounded-lg hover:bg-slate-800/50 ${
                  isActive(link.path) ? 'text-amber-500' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Profile / Login */}
          <div className="hidden lg:flex items-center border-l border-slate-800 ml-4 pl-6">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 bg-slate-900/50 p-1.5 pr-4 rounded-full border border-slate-800 hover:border-amber-500/50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-full flex items-center justify-center text-slate-900 font-black shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-bold text-slate-200">{user.name}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ring-1 ring-white/5">
                    <div className="p-4 bg-slate-800/30 border-b border-slate-800">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold italic">Member Account</p>
                      <p className="text-sm font-black text-amber-500 truncate">{user.username}</p>
                    </div>

                    <div className="p-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User size={18} className="text-slate-500" /> My Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-1"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-amber-500 text-slate-900 px-7 py-2.5 rounded-xl font-black hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95 text-xs uppercase"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 active:scale-90 transition-transform"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden bg-[#020617] border-t border-slate-800 p-4 space-y-1 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-bold text-sm ${
                isActive(link.path) ? 'bg-amber-500/10 text-amber-500' : 'text-slate-300 hover:bg-slate-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className={isActive(link.path) ? 'text-amber-500' : 'text-slate-500'}>
                {link.icon}
              </span> 
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-800 mt-4">
            {!user ? (
              <Link
                to="/login"
                className="block w-full text-center bg-amber-500 text-slate-900 py-4 rounded-xl font-black uppercase text-xs"
                onClick={() => setIsOpen(false)}
              >
                Login to Portal
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-4 text-red-400 bg-red-500/5 rounded-xl font-black uppercase text-xs"
              >
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