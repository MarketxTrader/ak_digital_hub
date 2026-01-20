import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../data/mockData';
// ១. ត្រូវប្រាកដថាបាន Import Icon ទាំងនេះពី lucide-react
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Info, 
  Layout, 
  Palette, 
  Megaphone 
} from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();

  // ២. បង្កើត Object សម្រាប់ផ្គូផ្គងឈ្មោះ Icon (String) ទៅនឹង Component ពិតប្រាកដ
  const iconMap = {
    Layout: Layout,
    Palette: Palette,
    Megaphone: Megaphone
  };

  const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    return parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;
  };

  const handleOrder = (service) => {
    navigate('/checkout', { 
      state: { 
        selectedCourse: {
          title: service.title,
          price: getNumericPrice(service.price),
        } 
      } 
    });
  };

  const handleViewDetail = (id) => {
    navigate(`/service/${id}`);
  };

  return (
    <div className="bg-[#020617] min-h-screen py-24 px-4 sm:px-6 font-khmer relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full text-amber-500 text-[10px] font-black tracking-[0.2em] uppercase mb-4 "
          >
            <Sparkles size={14} /> Our Specialized Solutions
          </motion.div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase italic">
            សេវាកម្ម <span className="text-amber-500">អាជីព</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base italic">
            យើងផ្តល់ជូននូវសេវាកម្មឌីជីថលដ៏សម្បូរបែប ដើម្បីជួយឱ្យអាជីវកម្មរបស់អ្នករីកចម្រើនក្នុងសម័យកាលបច្ចេកវិទ្យា។
          </p>
        </div>

        {/* Services Grid */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8​​ ">
          {services.map((service, index) => {
            // ៣. កែប្រែត្រង់នេះ៖ ទាញយក Component ពី iconMap តាមរយៈឈ្មោះ String ក្នុង data
            const IconComponent = iconMap[service.icon] || Layout; 

            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-[2rem] sm:rounded-[3rem] border-[3px] border-dashed border-amber-500 p-[3px]"
              >
                <div className="glass-card bg-slate-900/40 p-8 rounded-[2rem] sm:rounded-[3rem] transition-all group relative overflow-hidden ">

                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 ">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-amber-500/20 shadow-inner">
                    {/* ៤. បង្ហាញ Icon ដែលជា Component ត្រឹមត្រូវ */}
                    <IconComponent size={30} /> 
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 tracking-tight group-hover:text-amber-500 transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-500/60">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] uppercase font-black tracking-[0.2em]">Verified Excellence</span>
                    </div>
                  </div>
                  
                </div>
                </div>
                
                <p className="text-slate-400 mb-10 leading-relaxed text-sm sm:text-base font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.desc}
                </p>

                <div className="flex flex-col space-y-4 bg-slate-950/80 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-left">
                      <div className="flex items-center gap-2 text-white/80 mb-1">
                      <CheckCircle2 size={14} />
                      <span className="text-[15px] uppercase font-black tracking-[0.1em]">សូមមើលព័ត៌មានលម្អិតនៅខាងក្រោម</span>
                    </div>
                    </div>
                  </div>
                  <button 
                    onClick={() =>  handleViewDetail(service.id)}
                    className="w-full text-amber-500 border-amber-800/40 bg-transparent px-6 py-4 sm:py-5 rounded-full font-black text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-slate-950 active:scale-95 transition-all group/btn"
                  >
                    មើលព័ត៌មានលម្អិត
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;