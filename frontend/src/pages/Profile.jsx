import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, BookOpen, Lock, CheckCircle, ExternalLink, GraduationCap } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  // ទាញយកទិន្នន័យ User ពី LocalStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ប្រសិនបើអត់មាន User ឱ្យទៅកាន់ទំព័រ Login
  if (!user) {
    navigate('/login');
    return null;
  }

  // ឆែកមើលថាតើគាត់បានបង់លុយរួចរាល់ឬនៅ
  const hasPaid = user.payment === "Paid";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 font-khmer">
      <div className="max-w-4xl mx-auto">
        
        {/* Header ផ្នែកព័ត៌មានផ្ទាល់ខ្លួន */}
        <div className="bg-[#1e293b] rounded-[2rem] p-8 border border-slate-700 shadow-xl mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
            <User size={50} className="text-white" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black mb-1">{user.name}</h1>
            <p className="text-slate-400">@{user.username}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              {hasPaid ? (
                <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <CheckCircle size={14} /> VIP MEMBER
                </span>
              ) : (
                <span className="bg-slate-700 text-slate-400 px-4 py-1 rounded-full text-xs font-bold">
                  FREE MEMBER
                </span>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <GraduationCap className="text-amber-500" /> មេរៀនរបស់អ្នក
        </h2>

        {/* ផ្នែកបង្ហាញមេរៀន */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#1e293b] rounded-[2rem] overflow-hidden border border-slate-700 shadow-lg relative group"
          >
            {/* បង្ហាញសញ្ញា "ជាប់សោរ" ប្រសិនបើមិនទាន់បង់លុយ */}
            {!hasPaid && (
              <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-amber-500 shadow-xl border border-slate-700">
                  <Lock size={30} />
                </div>
                <h3 className="font-bold text-lg mb-2">មេរៀននេះត្រូវបានចាក់សោរ</h3>
                <p className="text-slate-400 text-xs mb-4">សូមបង់ប្រាក់ដើម្បីចូលរៀនមេរៀននេះ</p>
                <button 
                  onClick={() => navigate('/courses')}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-2 rounded-xl text-sm transition-all"
                >
                  ទៅកាន់ទំព័រទិញមេរៀន
                </button>
              </div>
            )}

            <div className="p-6">
              <div className="bg-amber-500/10 text-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {user.courses !== "None" ? user.courses : "មិនទាន់មានមេរៀន"}
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                ចូលរៀនមេរៀនកម្រិតអាជីពជាមួយ AK Digital Hub។
              </p>
              
              {/* ប៊ូតុងចូលរៀន - នឹងដើរតែពេលបង់លុយរួច */}
              <button 
                disabled={!hasPaid}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                  hasPaid 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20" 
                  : "bg-slate-800 text-slate-500"
                }`}
                onClick={() => window.open('https://your-private-lesson-link.com', '_blank')}
              >
                {hasPaid ? "ចូលទៅកាន់មេរៀន" : "ជាប់សោរ"} <ExternalLink size={18} />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Profile;