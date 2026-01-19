import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Send, 
  ShieldCheck, 
  Info,
  MessageCircle
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ១. ទទួលទិន្នន័យមេរៀន និងព័ត៌មានអ្នកប្រើប្រាស់
  const course = location.state?.selectedCourse || { 
    title: "Forex Masterclass", 
    price: 0.00 
  };
  
  const user = JSON.parse(localStorage.getItem("user"));

  // ២. កំណត់ Link Telegram Admin និងសារស្វ័យប្រវត្តិ
  const TELEGRAM_ADMIN_URL = "https://t.me/vathana_trader";
  
  const handleContactAdmin = () => {
    const message = `សួស្តី Admin! ខ្ញុំចង់ទិញមេរៀន៖\n\n` +
                    `- ឈ្មោះមេរៀន: ${course.title}\n` +
                    `- តម្លៃ: $${course.price?.toFixed(2)}\n` +
                    `- ឈ្មោះអ្នកប្រើប្រាស់: ${user?.username || "ភ្ញៀវ"}\n\n` +
                    `សូមផ្ញើលេខគណនីសម្រាប់បង់ប្រាក់មកខ្ញុំផង។`;
    
    // បង្កើត URL សម្រាប់ផ្ញើសារទៅ Telegram
    const whatsappUrl = `${TELEGRAM_ADMIN_URL}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 font-khmer">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-8 border border-slate-800 shadow-2xl text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/10 py-2 px-5 rounded-full mb-8 border border-amber-500/20 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> Official Course Enrollment
          </div>

          <h2 className="text-2xl font-black mb-1 uppercase tracking-tight">Checkout</h2>
          <p className="text-slate-400 text-sm mb-10">សូមទាក់ទងមកកាន់ Admin ដើម្បីបញ្ចប់ការទិញ</p>

          {/* Course Summary Card */}
          <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-slate-800 mb-8 text-left relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Selected Course</p>
              <h3 className="text-xl font-bold mb-4 leading-tight">{course.title}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Total Amount</p>
                  <p className="text-4xl font-black text-white">${course.price?.toFixed(2)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                   <Info size={20} className="text-slate-500" />
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors"></div>
          </div>

          {/* Instruction Box */}
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 mb-8 flex gap-3 text-left">
             <MessageCircle className="text-blue-400 shrink-0" size={20} />
             <p className="text-blue-200/70 text-xs leading-relaxed">
               បន្ទាប់ពីចុចប៊ូតុងខាងក្រោម ប្រព័ន្ធនឹងនាំអ្នកទៅកាន់ Telegram របស់ Admin ។ សូមផ្ញើសារដែលបានរៀបចំរួច ដើម្បីទទួលបានព័ត៌មានបង់ប្រាក់។
             </p>
          </div>

          {/* Main Action Button */}
          <button
            onClick={handleContactAdmin}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]"
          >
            <Send size={20} />
            ទិញមេរៀនឥឡូវនេះ
            <ArrowRight size={18} />
          </button>

          <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Available via Telegram Support 24/7
          </p>
        </motion.div>

        <button 
          onClick={() => navigate(-1)}
          className="w-full mt-8 text-slate-500 hover:text-white text-sm font-bold transition-all"
        >
          បោះបង់ និងត្រឡប់ក្រោយ
        </button>
      </div>
    </div>
  );
};

export default Checkout;