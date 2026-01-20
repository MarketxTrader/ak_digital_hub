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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const iconMap = { Layout, Palette, Megaphone };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-[#020617] text-white font-khmer overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 overflow-hidden">
        
        <div className="absolute inset-0 z-0"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={banners[currentBanner].id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={banners[currentBanner].image} 
                alt="Background"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-transparent to-[#020617]/60" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-grid opacity-[0.03] z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 pt-10 md:pt-0">
          <motion.div 
            key={`tag-${currentBanner}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-amber-500 text-[8px] sm:text-xs font-black tracking-[0.2em] uppercase mb-6 md:mb-10 backdrop-blur-md"
          >
            <Sparkles size={12} className="animate-pulse text-amber-500" /> {banners[currentBanner].tag}
          </motion.div>

          <motion.h1 
            key={`title-${currentBanner}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-6 md:mb-8 tracking-tighter leading-[1.2] md:leading-[1.1] uppercase italic px-2"
          >
            {banners[currentBanner].title} <br />
            <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              {banners[currentBanner].titleAccent}
            </span>
          </motion.h1>

          <motion.p 
            key={`desc-${currentBanner}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-[300px] sm:max-w-xl md:max-w-2xl text-slate-300 text-[10px] sm:text-lg md:text-xl lg:text-2xl mb-10 md:mb-14 leading-relaxed font-light italic px-4 drop-shadow-md"
          >
            {banners[currentBanner].desc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-[260px] sm:max-w-none px-6 justify-center"
          >
            <button 
              onClick={() => navigate('/services')} 
              className="bg-amber-500 text-slate-950 font-black px-8 py-4 md:px-10 md:py-5 rounded-full flex items-center justify-center gap-3 shadow-xl hover:bg-amber-400 transition-all text-[10px] md:text-xs uppercase tracking-widest active:scale-95"
            >
              ចាប់ផ្តើមឥឡូវនេះ <ArrowRight size={18} />
            </button>
            <a
              href="https://t.me/vathana_trader"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 text-white font-black px-8 py-4 md:px-10 md:py-5 rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md text-[10px] md:text-xs uppercase tracking-widest active:scale-95"
            >
              <PlayCircle size={18} className="text-amber-500" /> ទំនាក់ទំនងយើង
            </a>
          </motion.div>

          <div className="flex gap-2.5 md:gap-3 mt-12 md:mt-16">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${currentBanner === index ? 'w-10 md:w-14 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'w-3 md:w-4 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-20 md:py-32 px-4 sm:px-6 relative bg-[#020617] z-10" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <motion.span {...fadeInUp} className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] block mb-4">What We Offer</motion.span>
            <motion.h2 {...fadeInUp} className="text-3xl sm:text-6xl font-black uppercase italic tracking-tighter px-4 leading-tight">
              សេវាកម្មដែល <span className="text-slate-500">ជំរុញកំណើន</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Layout;
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-[#0b1121] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 relative flex flex-col hover:border-amber-500/30 transition-all duration-500"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 md:mb-8 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-lg">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase italic group-hover:text-amber-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-6 md:mb-8 text-xs md:text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
                    {service.features?.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 md:gap-3 text-[10px] md:text-xs font-bold text-slate-500 group-hover:text-slate-300">
                        <CheckCircle2 size={12} className="text-amber-500" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      navigate(`/service/${service.id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300"
                  >
                    View Service <ArrowRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 md:py-28 border-y border-white/5 bg-slate-950/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {[
            { label: 'Successful Projects', value: '500+' },
            { label: 'Happy Clients', value: '120+' },
            { label: 'Positive Rating', value: '4.9/5' },
            { label: 'Security Guarantee', value: '100%' },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="text-center group cursor-default">
              <div className="text-3xl sm:text-5xl font-black mb-2 italic text-amber-500 tracking-tighter transition-all group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                {stat.value}
              </div>
              <div className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black group-hover:text-slate-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 md:py-40 px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
        >
          <div className="py-20 md:py-32 px-6">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-10 tracking-tight italic uppercase leading-[1.3]">
              តើអ្នកត្រៀមខ្លួន <br />
              <span className="block mt-4 sm:mt-6 text-amber-500">ឈ្នះលើទីផ្សារ?</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-xl mb-14 max-w-2xl mx-auto font-light italic">
              កុំទុកឱ្យអាជីវកម្មរបស់អ្នកនៅពីក្រោយគេ។ ប្រើប្រាស់ថាមពលឌីជីថល ដើម្បីបង្កើនលទ្ធផលនៅថ្ងៃនេះ។
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 md:gap-6">
              <button 
                onClick={() => window.open('https://t.me/vathana_trader', '_blank')} 
                className="bg-white text-slate-950 font-black px-10 py-4.5 md:py-5 rounded-full hover:bg-amber-500 transition-all uppercase text-[10px] md:text-xs tracking-widest active:scale-95"
              >
                Contact Expert
              </button>
              <button 
                onClick={() => navigate('/services')} 
                className="bg-white/5 border border-white/10 text-white font-black px-10 py-4.5 md:py-5 rounded-full hover:bg-white/10 transition-all uppercase text-[10px] md:text-xs tracking-widest backdrop-blur-md active:scale-95"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 text-center opacity-30 text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-black border-t border-white/5 relative z-10 px-4">
        © 2026 AK DIGITAL HUB • Premium Digital Agency • Infinite Innovation
      </footer>
    </div>
  );
};

export default Home;