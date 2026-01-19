import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Lock, 
  CheckCircle, 
  ExternalLink, 
  GraduationCap, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate('/login');
    return null;
  }

  const hasPaid = user.payment === "Paid";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-4 sm:px-6 font-khmer relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/10 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* ១. User Header Card (Responsive Layout) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 border border-white/5 shadow-2xl mb-8 sm:mb-12 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            {/* Avatar ជាមួយ Glow Effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-slate-900 rounded-full border-2 border-white/10 flex items-center justify-center overflow-hidden">
                <User size={60} className="text-slate-700 sm:hidden" />
                <User size={80} className="text-slate-700 hidden sm:block" />
              </div>
            </div>

            <div className="text-center md:text-left flex-grow">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase italic">{user.name}</h1>
                {hasPaid && (
                  <span className="inline-flex items-center justify-center gap-1.5 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
                    <ShieldCheck size={12} /> VIP
                  </span>
                )}
              </div>
              <p className="text-slate-500 font-medium mb-6">@{user.username}</p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${hasPaid ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                    {hasPaid ? "Active Membership" : "Standard Account"}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all border border-red-500/20"
                >
                  <LogOut size={14} /> ចាកចេញ
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ២. Section Title */}
        <div className="flex items-center gap-3 mb-8 px-2 text-center md:text-left">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
             <GraduationCap size={24} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">មេរៀនរបស់អ្នក</h2>
        </div>

        {/* ៣. Course Grid (Responsive Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative group h-full"
          >
            {/* Lock Overlay (ប្រសិនបើមិនទាន់បង់ប្រាក់) */}
            {!hasPaid && (
              <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-amber-500 border border-white/10 shadow-2xl">
                  <Lock size={30} />
                </div>
                <h3 className="font-black text-lg sm:text-xl mb-2 uppercase italic">Locked Content</h3>
                <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">សូមបញ្ចប់ការជាវប្រចាំឆ្នាំ ដើម្បីចូលទៅកាន់មេរៀន VIP ទាំងអស់។</p>
                <button 
                  onClick={() => navigate('/courses')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-8 py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/20 uppercase tracking-widest"
                >
                  Go to Courses
                </button>
              </div>
            )}

            <div className="p-8 sm:p-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-amber-500/10 text-amber-500 w-14 h-14 rounded-3xl flex items-center justify-center shadow-inner">
                  <BookOpen size={28} />
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Status</p>
                   <p className="text-xs font-black text-amber-500">{hasPaid ? "READY TO LEARN" : "PENDING"}</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black mb-3 leading-tight tracking-tight">
                {user.courses !== "None" ? user.courses : "មេរៀនជួញដូរភាគហ៊ុន"}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-8 leading-relaxed italic">
                រៀនពីមូលដ្ឋានគ្រឹះ រហូតដល់ការវិភាគបច្ចេកទេសកម្រិតខ្ពស់ជាមួយគ្រូជំនាញ។
              </p>
              
              <button 
                disabled={!hasPaid}
                onClick={() => window.open('https://your-private-lesson-link.com', '_blank')}
                className={`w-full py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-2 transition-all text-xs sm:text-sm uppercase tracking-widest ${
                  hasPaid 
                  ? "bg-white/5 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/10 hover:border-amber-500 shadow-xl" 
                  : "bg-slate-900 text-slate-700 border border-white/5"
                }`}
              >
                {hasPaid ? "បន្តការសិក្សា" : "Locked"} <ExternalLink size={16} />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Profile;