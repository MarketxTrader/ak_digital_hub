import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, AlertCircle, Lock, User } from 'lucide-react';

const AdminLogin = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ១. ហៅទៅកាន់ API Backend (FastAPI)
      const response = await fetch("http://127.0.0.1:8000/api/admin/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      // ២. ពិនិត្យលទ្ធផលពី Server
      if (response.ok && data.result === "success") {
        // រក្សាទុកទិន្នន័យ Admin ក្នុង LocalStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Update ឈ្មោះក្នុង Navbar ភ្លាមៗ
        if (onLoginSuccess) onLoginSuccess();
        
        // ទៅកាន់ទំព័រ Dashboard
        navigate('/admin-control');
      } else {
        // បង្ហាញ Error ដែលផ្ញើមកពី Backend
        setError(data.detail || 'Username ឬ Password មិនត្រឹមត្រូវទេ!');
      }
    } catch (err) {
      setError('មិនអាចតភ្ជាប់ទៅកាន់ Server បានទេ! សូមពិនិត្យមើលថា Backend កំពុង Run ឬនៅ។');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-6 font-khmer overflow-x-hidden">
      <div className="max-w-md w-full relative z-10">
        
        {/* Card Login */}
        <div className="bg-[#0f172a] rounded-[2.5rem] p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* បែបផែនពន្លឺខាងក្រោយ (Glow Effect) */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full"></div>
          
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-500/20 relative z-10">
            <ShieldCheck className="text-red-500" size={40} />
          </div>
          
          <h2 className="text-2xl font-black text-center text-white mb-2 relative z-10">Admin Access</h2>
          <p className="text-slate-500 text-center text-sm mb-8 relative z-10">ប្រព័ន្ធគ្រប់គ្រងសុវត្ថិភាព AK Digital Hub</p>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {/* Input Username */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Admin Username"
                className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-slate-600"
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                placeholder="Admin Password"
                className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-slate-600"
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>

            {/* ការបង្ហាញ Error */}
            {error && (
              <div className="flex items-start gap-2 text-red-400 text-xs bg-red-500/10 p-4 rounded-xl border border-red-500/20 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="shrink-0" size={16} /> 
                <span>{error}</span>
              </div>
            )}

            {/* ប៊ូតុង Login */}
            <button
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>កំពុងផ្ទៀងផ្ទាត់...</span>
                </>
              ) : (
                "ចូលប្រើប្រាស់ប្រព័ន្ធ"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Secure Encryption Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;