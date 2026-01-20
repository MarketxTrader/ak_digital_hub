import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageCircle, 
  Zap, 
  Clock, 
  ShieldCheck,
  Layout,
  Palette,
  Megaphone,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { services, pricingPlans } from '../data/mockData';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const service = useMemo(() => 
    services.find(s => s.id === parseInt(id)), 
  [id]);

  const plans = useMemo(() => 
    pricingPlans && pricingPlans[id] ? pricingPlans[id] : [], 
  [id]);

  const iconMap = {
    Layout: Layout,
    Palette: Palette,
    Megaphone: Megaphone
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6 font-khmer">
        <h2 className="text-2xl font-black mb-4 uppercase italic tracking-tighter text-slate-500">រកមិនឃើញសេវាកម្ម</h2>
        <button onClick={() => navigate('/')} className="text-amber-500 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 border border-amber-500/20 px-6 py-3 rounded-full hover:bg-amber-500 hover:text-slate-950 transition-all">
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Layout;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white font-khmer selection:bg-amber-500 selection:text-slate-950">
      
      {/* ១. HERO HEADER SECTION */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto">
            <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(-1)}
            className=" group inline-flex items-center gap-2 px-6 py-3 border border-amber-500/60 rounded-full text-amber-500 hover:text-slate-950 hover:bg-amber-500 transition-all mb-12 uppercase text-[10px] font-black tracking-[0.2em] active:scale-95"
            >
            <ArrowLeft 
                size={16} 
                className="group-hover:-translate-x-1 transition-transform" 
            /> 
            Back to Services
            </motion.button>


          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 sm:w-28 sm:h-28 bg-amber-500/10 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center text-amber-500 flex-shrink-0 border border-amber-500/20 shadow-2xl shadow-amber-500/10"
            >
              <Icon size={48} strokeWidth={1.2} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-amber-500" />
                <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">Premium Service</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-none">
                {service.title}
              </h1>
              <p className="text-slate-400 text-base sm:text-xl font-light italic leading-relaxed max-w-2xl mb-8">
                {service.description}
              </p>
              {/* បង្ហាញ longDetail ប្រសិនបើមាន */}
              {service.longDetail && (
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl border-l-2 border-amber-500/30 pl-6 italic">
                  {service.longDetail}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ២. MAIN CONTENT GRID */}
      <section className="px-4 sm:px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* ខាងឆ្វេង: Details & Pricing */}
            <div className="lg:col-span-2 space-y-20">
              
              {/* Features List */}
              <div className="bg-[#0b1121] border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-black mb-10 uppercase italic flex items-center gap-3">
                  <Sparkles size={24} className="text-amber-500" /> តើអ្នកនឹងទទួលបានអ្វីខ្លះ?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {service.features?.map((feature, index) => (
                    <motion.div 
                      key={index}
                      {...fadeInUp}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-500 transition-colors">
                        <CheckCircle2 className="text-amber-500 group-hover:text-slate-950 transition-colors" size={14} />
                      </div>
                      <span className="text-slate-300 font-medium text-sm sm:text-base leading-snug">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ៣. ជំហានការងារ (Work Process) */}
              {service.steps && (
                <div className="space-y-10">
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic flex items-center gap-3 px-2">
                    <Layers size={24} className="text-amber-500" /> ដំណាក់កាលនៃកិច្ចការ
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {service.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        {...fadeInUp}
                        className="flex items-center gap-6 p-6 rounded-[2rem] border border-white/5 bg-slate-900/40 hover:bg-amber-500/5 transition-all group"
                      >
                        <div className="text-4xl font-black text-amber-500 group-hover:text-amber-500/10 transition-colors italic w-12 text-center">
                          0{index + 1}
                        </div>
                        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                        <span className="text-slate-300 font-bold text-sm sm:text-base uppercase italic tracking-tight">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Section - តារាងតម្លៃ */}
              {plans.length > 0 && (
                <div className="space-y-10 pt-10">
                  <div className="flex flex-col gap-2 px-2">
                    <h3 className="text-3xl font-black uppercase italic tracking-tight flex items-center gap-3">
                       <Zap size={28} className="text-amber-500" /> កញ្ចប់តម្លៃសេវាកម្ម
                    </h3>
                    <div className="h-1 w-20 bg-amber-500 rounded-full" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {plans.map((plan, index) => (
                      <motion.div
                        key={index}
                        {...fadeInUp}
                        className={`relative p-8 sm:p-10 rounded-[2.5rem] border flex flex-col justify-between transition-all duration-500 ${
                          plan.popular ? 'border-amber-500 bg-amber-500/5 shadow-2xl shadow-amber-500/10' : 'border-white/5 bg-white/5'
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 right-8 bg-amber-500 text-slate-950 text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em]">
                            Popular Choice
                          </div>
                        )}

                        <div>
                          <h4 className="text-xl font-black uppercase italic mb-1 tracking-tight">{plan.name}</h4>
                          <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-black text-white">${plan.price}</span>
                            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">/ Project</span>
                          </div>

                          <ul className="space-y-4 mb-10">
                            {plan.features.map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400 italic">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button 
                          onClick={() => window.open('https://t.me/vathana_trader', '_blank')}
                          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${
                          plan.popular 
                            ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}>
                          ជ្រើសរើសកញ្ចប់នេះ
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ខាងស្តាំ: Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 space-y-6">
                <div className="bg-gradient-to-br from-slate-900 to-[#020617] border border-white/10 rounded-[2.5rem] sm:rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />
                  
                  <h4 className="text-2xl font-black uppercase italic mb-8 leading-tight relative z-10">
                    • ចាប់ផ្តើមឥឡូវនេះ <br /> • ពិភាក្សាជាមួយអ្នកជំនាញ <br /><span className="text-amber-500 italic">• បង្កើតជោគជ័យជាមួយគ្នា </span>
                  </h4>
                  
                  <div className="space-y-6 mb-12 relative z-10 text-slate-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 border border-white/10 shadow-inner">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Timeline</p>
                        <p className="text-sm font-bold italic uppercase">២ - ៣ សប្តាហ៍</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500 border border-white/10 shadow-inner">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Guarantee</p>
                        <p className="text-sm font-bold italic uppercase">១០០% គុណភាព</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open('https://t.me/vathana_trader', '_blank')}
                    className="w-full bg-white text-slate-950 py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-all shadow-xl active:scale-95"
                  >
                    <MessageCircle size={18} /> Contact Us Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-white/5 opacity-20 text-[10px] uppercase tracking-[0.5em] font-black px-4 italic">
        © 2026 AK DIGITAL HUB • Premium Quality Services
      </footer>
    </div>
  );
};

export default ServiceDetail;