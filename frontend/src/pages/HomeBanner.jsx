import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const HomeBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full h-[400px] md:h-[600px] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group"
      >
        {/* ១. Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop" 
            alt="AK Digital Hub Banner"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* បន្ថែម Gradient ខ្មៅពីឆ្វេងមកដើម្បីឱ្យអានអក្សរបានច្បាស់ */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />
        </div>

        {/* ២. Content Inside Banner */}
        <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 md:px-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 w-fit px-4 py-1.5 rounded-full text-amber-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} /> Leading Digital Agency
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight uppercase italic tracking-tighter mb-6"
          >
            បំប្លែងអាជីវកម្មអ្នក <br />
            <span className="text-amber-500">ទៅជាម៉ាស៊ីនរកប្រាក់</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-lg text-slate-300 text-sm sm:text-base md:text-lg mb-10 font-light italic"
          >
            យើងជួយអ្នកក្នុងការកសាង Branding, បង្កើត Website និងយុទ្ធសាស្ត្រ Marketing ដែលមានប្រសិទ្ធភាពខ្ពស់បំផុត។
          </motion.p>

          {/* Feature Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <div className="flex items-center gap-2 text-white/70 text-[10px] sm:text-xs uppercase font-bold">
              <ShieldCheck size={16} className="text-amber-500" /> Trusted Security
            </div>
            <div className="flex items-center gap-2 text-white/70 text-[10px] sm:text-xs uppercase font-bold">
              <Zap size={16} className="text-amber-500" /> Fast Delivery
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-fit bg-amber-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-amber-500/20"
          >
            ប្រឹក្សាយោបល់ឥតគិតថ្លៃ <ArrowRight size={18} />
          </motion.button>
        </div>

        {/* Decorative Light Element */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] -z-1" />
      </motion.div>
    </section>
  );
};

export default HomeBanner;