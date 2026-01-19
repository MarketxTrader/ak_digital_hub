import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec';

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({
          action: "login",
          username: credentials.username,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (data.result === "success") {
        localStorage.setItem("user", JSON.stringify(data.user)); 
        navigate('/');
        window.location.reload(); 
      } else {
        setError(data.message || "ឈ្មោះអ្នកប្រើប្រាស់ ឬ លេខសម្ងាត់មិនត្រឹមត្រូវ!");
      }
    } catch (err) {
      setError("មានបញ្ហាបច្ចេកទេសក្នុងការភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 py-12 relative overflow-hidden font-khmer">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/10 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl w-full max-w-[440px] border border-white/5 relative overflow-hidden"
      >
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/10 rounded-[1.5rem] sm:rounded-[2rem] mb-6 border border-amber-500/20">
            <LogIn className="text-amber-500" size={32} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase italic">Welcome Back</h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium">សូមចូលប្រើប្រាស់គណនីរបស់អ្នក</p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-400 text-xs sm:text-sm text-center font-bold"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest ml-1 flex items-center gap-2">
              <User size={14} className="text-amber-500" /> Username
            </label>
            <input 
              type="text" 
              required
              placeholder="វាយឈ្មោះអ្នកប្រើប្រាស់" 
              className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-amber-500 focus:bg-white/10 outline-none transition-all text-sm sm:text-base" 
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest ml-1 flex items-center gap-2">
              <Lock size={14} className="text-amber-500" /> Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="វាយលេខសម្ងាត់" 
                className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-amber-500 focus:bg-white/10 outline-none transition-all text-sm sm:text-base" 
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full font-black py-4 sm:py-5 rounded-2xl sm:rounded-[1.5rem] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs sm:text-sm ${
              loading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 shadow-amber-500/20'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                កំពុងផ្ទៀងផ្ទាត់...
              </>
            ) : (
              <>
                ចូលប្រើប្រាស់ <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            មិនទាន់មានគណនី?{' '}
            <Link to="/register" className="text-amber-500 hover:text-amber-400 font-black transition-colors underline underline-offset-4">
              ចុះឈ្មោះឥឡូវនេះ
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;