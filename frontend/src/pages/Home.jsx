import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Star, Users, Zap, 
  ShieldCheck, Globe, Trophy, PlayCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] min-h-screen text-white font-khmer overflow-hidden">
      
      {/* 1. Hero Section - Professional Design */}
      <section className="relative py-28 px-6">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[150px] rounded-full -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 px-5 py-2 rounded-full text-amber-500 text-xs font-black mb-8 tracking-widest uppercase"
          >
            <Zap size={14} fill="currentColor" /> Empowering Digital Generations
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter"
          >
            Master Your Skill. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Own Your Future.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            បណ្តុះបណ្តាលជំនាញឌីជីថល និងការជួញដូរហិរញ្ញវត្ថុ ដើម្បីបង្កើតចំណូលពិតប្រាកដក្នុងយុគសម័យអនឡាញ ជាមួយយុទ្ធសាស្ត្រដែលឈ្នះក្នុងទីផ្សារ។
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto"
          >
            <button 
              onClick={() => navigate('/courses')}
              className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 px-10 py-5 rounded-2xl font-black transition-all active:scale-95 shadow-2xl shadow-amber-500/20 group"
            >
              ចូលរៀនឥឡូវនេះ <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/trading')}
              className="flex items-center justify-center gap-3 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 border border-slate-700 text-white px-10 py-5 rounded-2xl font-black transition-all"
            >
              <PlayCircle size={20} className="text-amber-500" /> មើលការវិភាគមាស
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section - Clean & High-End */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 p-10 bg-slate-900/30 border border-slate-800/50 rounded-[3rem] backdrop-blur-sm shadow-inner">
            {[
              { label: 'សិស្សសរុប', value: '1,500+', color: 'text-white' },
              { label: 'វគ្គសិក្សា', value: '25+', color: 'text-amber-500' },
              { label: 'ការពេញចិត្ត', value: '99%', color: 'text-white' },
              { label: 'បទពិសោធន៍', value: '5Y+', color: 'text-white' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className={`text-4xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section - Modern Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-amber-500 text-sm font-black uppercase tracking-[0.3em] mb-4">Core Values</h2>
            <h3 className="text-4xl md:text-5xl font-black">ហេតុអ្វីជ្រើសរើសយើង?</h3>
          </div>
          <p className="text-slate-500 max-w-md md:text-right">
            យើងផ្តល់លើសពីការបង្រៀន គឺយើងផ្តល់ជូននូវ "លទ្ធផល" និង "សហគមន៍" ដែលរឹងមាំបំផុត។
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <BookOpen />, 
              title: "Expert Curriculum", 
              desc: "មេរៀនត្រូវបានរៀបចំឡើងពីបទពិសោធន៍ជាក់ស្តែង មិនមែនមានតែក្នុងសៀវភៅ។" 
            },
            { 
              icon: <ShieldCheck />, 
              title: "Lifetime Support", 
              desc: "ចូលរៀនម្តង មើលបានរហូត និងមានការ Support ជាប់ជានិច្ចពីក្រុមការងារ។" 
            },
            { 
              icon: <Trophy />, 
              title: "Result Oriented", 
              desc: "ផ្តោតសំខាន់លើការអនុវត្ត ដើម្បីឱ្យសិស្សអាចបង្កើតចំណូលបានពិតប្រាកដ។" 
            }
          ].map((feature, i) => (
            <div key={i} className="bg-gradient-to-b from-slate-900/50 to-transparent border border-slate-800 p-10 rounded-[2.5rem] hover:border-amber-500/30 transition-all group">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all duration-500 shadow-xl shadow-amber-500/5">
                {React.cloneElement(feature.icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-amber-500 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed italic">
                "{feature.desc}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA Section - Final Call */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-amber-500 to-amber-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-amber-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h2 className="text-slate-900 text-4xl md:text-6xl font-black mb-8 leading-tight">
              ត្រៀមខ្លួនរួចរាល់ហើយឬនៅ? <br /> ដើម្បីផ្លាស់ប្តូរជីវិតរបស់អ្នក។
            </h2>
            <button 
              onClick={() => navigate('/register')}
              className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-black transition-all shadow-xl active:scale-95"
            >
              ចុះឈ្មោះចូលរៀនឥឡូវនេះ
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;