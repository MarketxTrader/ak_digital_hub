import React from 'react';
import { ArrowRight, PlayCircle, Star, Users, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] pt-20">
      
      {/* --- បន្ថែម Background Grid ដែលមានចលនា (បើយោងតាមរូបភាព) --- */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      {/* --- ពន្លឺ Orbs ដែលមានចលនាអណ្ដែត (Glow Effect) --- */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] animate-glow pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-glow pointer-events-none z-0" />

      {/* --- Main Content --- */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        
        {/* Badge ខាងលើ ជាមួយ Sparkle Effect */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-5 py-2 rounded-full mb-8 shadow-lg shadow-amber-500/5"
        >
          <Sparkles size={14} className="text-amber-500 animate-pulse" />
          <span className="text-amber-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
            The Future of Digital Learning
          </span>
        </motion.div>

        {/* ចំណងជើងធំ ប្រើ Gradient និង Shadow ឱ្យដូចក្នុងរូបភាព */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tighter italic uppercase"
        >
          បង្វែរចំណេះដឹងឱ្យទៅជា <br />
          <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">ប្រាក់ចំណូលឌីជីថល</span>
        </motion.h1>

        {/* Description ឱ្យមានភាពទន់ភ្លន់ */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg md:text-xl font-khmer max-w-3xl mx-auto leading-relaxed mb-12 italic opacity-80"
        >
          រៀនជំនាញស្វែងរកប្រាក់ចំណូលតាមអនឡាញ ពីគ្រូដែលមានបទពិសោធន៍ពិតប្រាកដ។ <br className="hidden md:block" />
          ចាប់ផ្ដើមដំណើរការរបស់អ្នកជាមួយ AK DIGITAL HUB ថ្ងៃនេះ។
        </motion.p>

        {/* ប៊ូតុងសកម្មភាព ជាមួយ Shiny Effect (btn-premium) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-5 mb-24"
        >
          <button 
            onClick={() => navigate('/courses')}
            className="btn-premium group w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 px-12 py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)] transition-all active:scale-95"
          >
            ចូលរៀនឥឡូវនេះ 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            className="w-full md:w-auto bg-slate-900/40 border border-white/10 hover:border-amber-500/50 text-white px-12 py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all backdrop-blur-md group"
          >
            <PlayCircle size={22} className="text-amber-500 group-hover:scale-110 transition-transform" /> 
            មើលវីដេអូណែនាំ
          </button>
        </motion.div>

        {/* --- ផ្នែកស្ថិតិ (Stats Section) ជាមួយ Floating Animation --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {[
            { label: 'សិស្សសរុប', value: '5,000+', icon: Users },
            { label: 'វគ្គសិក្សា', value: '25+', icon: BookOpen },
            { label: 'ការពេញចិត្ត', value: '4.9/5', icon: Star },
            { label: 'សុវត្ថិភាព', value: '100%', icon: ShieldCheck }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (idx * 0.1) }}
                className="glass-card py-10 px-4 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all group relative overflow-hidden animate-float"
                style={{ animationDelay: `${idx * 0.5}s` }} // ធ្វើឱ្យវាអណ្ដែតឆ្លាស់គ្នា
              >
                <div className="absolute -right-4 -top-4 text-white/[0.03] group-hover:text-amber-500/[0.08] transition-colors rotate-12">
                  <Icon size={90} />
                </div>
                <p className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-amber-500 transition-colors italic tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] font-khmer">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Hero;