import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, UserPlus, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    username: '', 
    password: ''
  });

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          id: "AK-" + Date.now(),
          action: "register" 
        })
      });

      alert("🎉 ចុះឈ្មោះជោគជ័យ! លោកអ្នកអាចចូលប្រើប្រាស់បានឥឡូវនេះ។");
      navigate('/login');
    } catch (error) {
      console.error("Error:", error);
      alert("មានបញ្ហាបច្ចេកទេស! សូមព្យាយាមម្តងទៀត។");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 sm:p-6 font-khmer relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/10 blur-[100px] rounded-full -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl w-full max-w-[480px] border border-white/5 relative overflow-hidden"
      >
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/10 rounded-[1.5rem] sm:rounded-[2rem] mb-6 border border-amber-500/20">
            <UserPlus className="text-amber-500" size={32} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase italic">Create Account</h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base font-medium italic">ចូលរួមជាមួយ AK DIGITAL HUB ឥឡូវនេះ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest ml-1 flex items-center gap-2">
              <ShieldCheck size={14} className="text-amber-500" /> Full Name
            </label>
            <input 
              type="text" 
              placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក" 
              required
              className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-amber-500 focus:bg-white/10 outline-none transition-all text-sm sm:text-base placeholder:text-slate-600"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest ml-1 flex items-center gap-2">
              <User size={14} className="text-amber-500" /> Username
            </label>
            <input 
              type="text" 
              placeholder="ឈ្មោះអ្នកប្រើប្រាស់" 
              required
              className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-amber-500 focus:bg-white/10 outline-none transition-all text-sm sm:text-base placeholder:text-slate-600"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest ml-1 flex items-center gap-2">
              <Lock size={14} className="text-amber-500" /> Password
            </label>
            <input 
              type="password" 
              placeholder="កំណត់លេខសម្ងាត់" 
              required
              className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-amber-500 focus:bg-white/10 outline-none transition-all text-sm sm:text-base placeholder:text-slate-600"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full font-black py-4 sm:py-5 rounded-2xl sm:rounded-[1.5rem] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs sm:text-sm mt-4 ${
              loading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
              : 'bg-amber-500 text-slate-950 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 shadow-amber-500/20'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                កំពុងរក្សាទុក...
              </>
            ) : (
              <>
                ចុះឈ្មោះឥឡូវនេះ <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            មានគណនីរួចហើយ?{' '}
            <Link to="/login" className="text-amber-500 hover:text-amber-400 font-black transition-colors underline underline-offset-4">
              ចូលប្រើប្រាស់
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;