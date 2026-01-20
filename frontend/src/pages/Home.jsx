import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  PlayCircle, 
  Sparkles,
  Layout,
  Palette,
  Megaphone,
  CheckCircle2
} from 'lucide-react';
import { services, banners } from '../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const iconMap = { Layout, Palette, Megaphone };

  return (
    <div className="bg-[#020617] text-white font-khmer overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* --- HERO SECTION (Optimized for Mobile) --- */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center pt-24 pb-12 px-5 sm:px-10 overflow-hidden">
        
        {/* Background Animation */}
        <div className="absolute inset-0 z-0"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={banners[currentBanner].id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={banners[currentBanner].image} 
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/40 to-[#020617]" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Badge Tag */}
          <motion.div 
            key={`tag-${currentBanner}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full text-amber-500 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-6 backdrop-blur-md"
          >
            <Sparkles size={14} className="animate-pulse" /> {banners[currentBanner].tag}
          </motion.div>

          {/* Title - Adjusted for smaller screens */}
          <motion.h1 
            key={`title-${currentBanner}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[2.6rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-6 tracking-tighter uppercase italic"
          >
            {banners[currentBanner].title} <br />
            <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              {banners[currentBanner].titleAccent}
            </span>
          </motion.h1>

          {/* Description - Hidden on very small height screens or kept compact */}
          <motion.p 
            key={`desc-${currentBanner}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-[280px] sm:max-w-xl md:max-w-2xl text-slate-400 text-sm md:text-xl mb-10 leading-relaxed font-light italic"
          >
            {banners[currentBanner].desc}
          </motion.p>

          {/* Buttons - Stacked on mobile, side-by-side on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-[280px] sm:max-w-none justify-center px-4"
          >
            <button 
              onClick={() => navigate('/services')} 
              className="bg-amber-500 text-slate-950 font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-widest"
            >
              ចាប់ផ្តើមឥឡូវនេះ <ArrowRight size={18} />
            </button>
            <a
              href="https://t.me/vathana_trader"
              className="bg-white/5 border border-white/10 text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 backdrop-blur-md active:scale-95 transition-all text-xs uppercase tracking-widest"
            >
              <PlayCircle size={18} className="text-amber-500" /> ទំនាក់ទំនង
            </a>
          </motion.div>

          {/* Hero Selector - Improved Spacing for Mobile touch */}
          <div className="flex items-center gap-5 mt-16">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className="group relative py-4" // Larger hit area for thumbs
              >
                <div className="h-[3px] w-8 md:w-12 bg-white/10 rounded-full overflow-hidden">
                  {currentBanner === index && (
                    <motion.div 
                      layoutId="activeTab"
                      className="h-full bg-amber-500"
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION (Improved Grid for Mobile) --- */}
      <section className="py-20 px-6 relative bg-[#020617] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] block mb-3">Our Expertise</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter leading-tight">
              សេវាកម្ម <span className="text-slate-600">ឆ្នើម</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Layout;
              return (
                <motion.div 
                  key={service.id}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  className="bg-[#0b1121] p-8 rounded-[2rem] border border-white/5 flex flex-col"
                >
                  <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-6">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-3 uppercase italic text-white">{service.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 italic">{service.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features?.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <CheckCircle2 size={12} className="text-amber-500" /> {f}
                      </div>
                    ))}
                  </div>

                  <button className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white active:bg-amber-500 active:text-slate-950 transition-all">
                    View Details
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- STATS (Compact for Mobile) --- */}
      <section className="py-16 border-y border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { label: 'Projects', value: '500+' },
            { label: 'Clients', value: '120+' },
            { label: 'Rating', value: '4.9/5' },
            { label: 'Security', value: '100%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-amber-500 italic mb-1">{stat.value}</div>
              <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION (Mobile Optimized) --- */}
      <section className="py-16 px-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
          <h2 className="text-3xl font-black mb-6 italic uppercase leading-tight">
            ត្រៀមខ្លួន <br /> <span className="text-amber-500 text-4xl">ជោគជ័យ?</span>
          </h2>
          <p className="text-slate-400 text-xs mb-10 italic leading-relaxed">ចាប់ផ្តើមដំណើរការអាជីវកម្មឌីជីថលរបស់អ្នកជាមួយយើងថ្ងៃនេះ។</p>
          <button 
            onClick={() => window.open('https://t.me/vathana_trader')}
            className="w-full sm:w-auto bg-white text-slate-950 font-black px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest active:scale-95 transition-all"
          >
            Contact Now
          </button>
        </div>
      </section>

      <footer className="py-8 text-center opacity-30 text-[7px] uppercase tracking-[0.3em] font-black border-t border-white/5">
        © 2026 AK DIGITAL HUB • Infinite Innovation
      </footer>
    </div>
  );
};

export default Home;