import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  PlayCircle, 
  Users, 
  Star, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Sparkles,
  Layout,
  Palette,
  Megaphone,
  CheckCircle2,
  Globe,
  MousePointer2,
  Menu
} from 'lucide-react';
import { services, courses } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();

  // Map Icon ឈ្មោះអក្សរទៅជា Component
  const iconMap = {
    Layout: Layout,
    Palette: Palette,
    Megaphone: Megaphone
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-[#020617] text-white font-khmer overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* ១. HERO SECTION - Mobile Responsive Optimized */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 bg-grid opacity-[0.15] -z-10" />
        <div className="absolute top-[15%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-amber-500 text-[9px] sm:text-xs font-black tracking-[0.2em] uppercase mb-6 sm:mb-10 backdrop-blur-md"
          >
            <Sparkles size={12} className="animate-pulse" /> The Future of Digital Solution
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl md:text-[5.5rem] font-black mb-8 tracking-tighter leading-[1.1] uppercase italic"
          >
            ពង្រីកអាជីវកម្មជាមួយ <br />
            <span className="text-gradient-amber drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              សេវាកម្ម Digital បែបទំនើប
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-slate-400 text-sm sm:text-xl md:text-2xl mb-10 sm:mb-14 leading-relaxed font-light italic px-4"
          >
            យើងផ្តល់ជូននូវសេវាកម្មឌីជីថលឈានមុខគេ ដើម្បីជួយឱ្យម៉ាកយីហោរបស់អ្នកឈានដល់កម្រិតពិភពលោក។
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-[320px] sm:max-w-none px-6"
          >
            <button onClick={() => window.open('services')} className="w-full sm:w-auto bg-amber-500 text-slate-950 font-black px-10 py-5 rounded-full flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-xs sm:text-sm uppercase tracking-widest">
              ចាប់ផ្តើមឥឡូវនេះ <ArrowRight size={18} />
            </button>

            <a
              href="https://t.me/vathana_trader"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-black px-10 py-5 rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md active:scale-95 text-xs sm:text-sm uppercase tracking-widest"
            >
              <PlayCircle size={18} className="text-amber-500" />
              ទំនាក់ទំនងយើង
            </a>
          </motion.div>

        </div>
      </section>

      {/* ២. SERVICES SECTION - Cards with Animated Button */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative" id ="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <motion.span {...fadeInUp} className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] block mb-4">What We Offer</motion.span>
            <motion.h2 {...fadeInUp} className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter px-2">
              សេវាកម្មដែល <span className="text-slate-500">ជំរុញកំណើន</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {services?.map((service, idx) => {
              const Icon = iconMap[service.icon] || Layout;
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-[#0b1121] p-8 sm:p-12 rounded-[2.5rem] border border-white/5 relative flex flex-col justify-between hover:border-amber-500/30 transition-all duration-500"
                >
                  {/* Background Glow on Hover */}
                  <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500 pointer-events-none" />

                  <div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-lg">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black mb-4 uppercase italic group-hover:text-amber-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 mb-8 text-xs sm:text-sm leading-relaxed font-light">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-10">
                      {service.features?.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-[10px] sm:text-xs font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                          <CheckCircle2 size={14} className="text-amber-500" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ប៊ូតុង View Service ដែលតភ្ជាប់ទៅ Page លម្អិត */}
                  <button 
                      onClick={() => {
                        navigate(`/services/${service.id}`);
                        window.scrollTo(0, 0); // បន្ថែមឱ្យវាឡើងលើបំផុតពេលប្តូរ Page
                      }}
                      className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500 transition-all duration-300 shadow-md active:scale-[0.98]"
                    >
                      View Service <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ៣. STATS SECTION */}
      <section className="py-16 sm:py-24 border-y border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16">
          {[
            { label: 'Successful Projects', value: '500+' },
            { label: 'Happy Clients', value: '120+' },
            { label: 'Positive Rating', value: '4.9/5' },
            { label: 'Security Guarante', value: '100%' },
          ].map((stat, i) => (
            <motion.div 
                key={i} 
                whileHover={{ y: -5, scale: 1.05 }} // បន្ថែមចលនានៅពេលដាក់ Mouse លើ
                className="text-center cursor-default group"
              >
                <div className="text-3xl sm:text-5xl font-black mb-2 italic text-amber-500 tracking-tighter group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* ៤. CTA SECTION */}
      <section className="py-20 sm:py-40 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-24 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
  
            {/* Blur background */}
            <div className="absolute bottom-0 left-0 w-32 h-25 sm:w-64 sm:h-64 bg-amber-500/10 blur-[50px] sm:blur-[100px] rounded-full" />

            <div className="relative z-10 text-center px-4">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-12 sm:mb-16 tracking-tight italic uppercase leading-[1.3]">
                តើអ្នកត្រៀមខ្លួន <br />
                <span className="block mt-4 sm:mt-6 text-amber-500">
                  ឈ្នះលើទីផ្សារ?
                </span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-xl mb-16 sm:mb-20 max-w-2xl mx-auto font-light italic">
                កុំទុកឱ្យអាជីវកម្មរបស់អ្នកនៅពីក្រោយគេ។ ប្រើប្រាស់ថាមពលឌីជីថល ដើម្បីបង្កើនលទ្ធផលនៅថ្ងៃនេះ។
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                  onClick={() => window.open('https://t.me/vathana_trader', '_blank')}
                  className="w-full sm:w-auto bg-white text-slate-950 font-black px-10 sm:px-14 py-5 rounded-full hover:bg-amber-500 transition-all uppercase tracking-[0.2em] text-[10px] sm:text-xs shadow-lg active:scale-95"
                >
                  Contact Expert
                </button>

                <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-black px-10 sm:px-14 py-5 rounded-full hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-[10px] sm:text-xs backdrop-blur-md active:scale-95">
                  Learn More
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center opacity-30 text-[8px] sm:text-[10px] uppercase tracking-[0.5em] font-black px-4 border-t border-white/5">
        © 2024 AK DIGITAL HUB • Premium Digital Agency • Infinite Innovation
      </footer>
    </div>
  );
};

export default Home;