import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Send, 
  ShieldCheck, 
  Info,
  MessageCircle,
  ChevronLeft,
  Package,
  BookOpen
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ១. កែសម្រួលឱ្យទទួលយកបានទាំង selectedCourse (ពីទំព័រ Course) និង selectedTool (ពីទំព័រ Tools)
  const item = location.state?.selectedCourse || location.state?.selectedTool || { 
    title: "Item Not Selected", 
    price: 0 
  };

  // កំណត់ប្រភេទដើម្បីបង្ហាញ Icon ឱ្យត្រូវ (Tool ឬ Course)
  const isTool = !!location.state?.selectedTool;
  
  const TELEGRAM_USERNAME = "vathana_trader"; 
  
  const handleContactAdmin = () => {
    // បង្កើតសារអូតូដើម្បីផ្ញើទៅ Admin ឱ្យគាត់ស្រួលដឹងថាទិញអ្វី
    const message = `សួស្តី Admin! ខ្ញុំចង់ទិញ ${isTool ? 'ឧបករណ៍' : 'មេរៀន'}: ${item.title} (តម្លៃ: $${item.price})`;
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 sm:p-6 font-khmer relative overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent -z-10 opacity-50"></div>

      <div className="max-w-md w-full relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 border border-white/5 shadow-2xl text-center relative overflow-hidden bg-slate-900/40 backdrop-blur-xl"
        >
          <div className="hidden sm:block absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/10 py-2 px-4 rounded-full mb-6 border border-amber-500/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
            <ShieldCheck size={14} /> Secured Payment
          </div>

          <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tighter uppercase italic">Checkout</h2>
          <p className="text-slate-400 text-xs sm:text-sm mb-8 font-medium italic">
            {isTool ? 'បញ្ជាទិញឧបករណ៍ឌីជីថល' : 'ចុះឈ្មោះចូលរៀនវគ្គសិក្សា'}
          </p>

          {/* Summary Card */}
          <div className="bg-slate-950/80 p-6 rounded-[2rem] border border-white/5 mb-6 text-left relative group">
            <div className="flex justify-between items-start mb-4">
              <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.2em]">
                {isTool ? 'Selected Tool' : 'Selected Program'}
              </p>
              <div className="bg-amber-500/10 p-2 rounded-xl text-amber-500">
                {isTool ? <Package size={16} /> : <BookOpen size={16} />}
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-4 leading-tight text-white group-hover:text-amber-500 transition-colors line-clamp-2 uppercase italic">
              {item.title}
            </h3>
            
            <div className="pt-4 border-t border-white/5 flex items-end justify-between">
              <div>
                <p className="text-slate-500 text-[9px] font-bold uppercase mb-1">Total Investment</p>
                <p className="text-3xl font-black text-white tracking-tighter">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>
              <div className="text-[9px] font-black text-amber-500/50 uppercase italic mb-1">One-time payment</div>
            </div>
          </div>

          {/* Instruction Box */}
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-[1.5rem] p-4 mb-8 flex gap-3 text-left items-center">
             <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <MessageCircle className="text-blue-400" size={18} />
             </div>
             <p className="text-blue-200/60 text-[10px] leading-relaxed font-medium">
                បន្ទាប់ពីចុចប៊ូតុងខាងក្រោម ប្រព័ន្ធនឹងនាំអ្នកទៅកាន់ **Telegram Admin** ដើម្បីបញ្ចប់ការបង់ប្រាក់។
             </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleContactAdmin}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-5 rounded-[1.8rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-500/20 group text-sm uppercase tracking-widest"
          >
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            {isTool ? 'ទិញឧបករណ៍ឥឡូវនេះ' : 'ទិញមេរៀនឥឡូវនេះ'}
            <ArrowRight size={18} />
          </button>

          {/* Online Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
             <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-black italic">
               Admin is Online for support
             </p>
          </div>
        </motion.div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="w-full mt-8 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft size={16} /> បោះបង់ និងត្រឡប់ក្រោយ
        </button>
      </div>
    </div>
  );
};

export default Checkout;