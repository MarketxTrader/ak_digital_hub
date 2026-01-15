import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec';

  // ប្រសិនបើ User បាន Login រួចហើយ មិនឱ្យចូលទំព័រ Login ទៀតទេ
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
        // ចំណាំ៖ មិនត្រូវដាក់ mode: 'no-cors' ទេ បើចង់បាន Response data មកវិញ
        body: JSON.stringify({
          action: "login",
          username: credentials.username,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (data.result === "success") {
        // ១. រក្សាទុកទិន្នន័យក្នុង LocalStorage
        localStorage.setItem("user", JSON.stringify(data.user)); 
        
        // ២. រុញទៅទំព័រដើម រួចប្តូរស្ថានភាព Navbar
        navigate('/');
        window.location.reload(); // បង្ខំឱ្យ Navbar update ឈ្មោះភ្លាមៗ
      } else {
        setError(data.message || "ឈ្មោះអ្នកប្រើប្រាស់ ឬ លេខសម្ងាត់មិនត្រឹមត្រូវ!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("មានបញ្ហាបច្ចេកទេសក្នុងការភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#1e293b] p-8 rounded-[2rem] shadow-2xl w-full max-w-md border border-slate-700 relative overflow-hidden">
        
        {/* បន្លិចពណ៌ Background តិចៗ */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-4">
            <LogIn className="text-amber-500" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mt-2 font-khmer">សូមចូលប្រើប្រាស់គណនីរបស់អ្នក</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center font-khmer">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm ml-1 flex items-center gap-2">
              <User size={16} /> Username
            </label>
            <input 
              type="text" 
              required
              placeholder="វាយឈ្មោះអ្នកប្រើប្រាស់" 
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" 
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm ml-1 flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="វាយលេខសម្ងាត់" 
                className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" 
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-500 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 ${
              loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-amber-500 text-slate-900 hover:bg-amber-400 hover:-translate-y-0.5'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                កំពុងផ្ទៀងផ្ទាត់...
              </>
            ) : "ចូលប្រើប្រាស់"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 font-khmer text-sm">
            មិនទាន់មានគណនី?{' '}
            <Link to="/register" className="text-amber-500 hover:text-amber-400 font-bold transition">ចុះឈ្មោះឥឡូវនេះ</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;