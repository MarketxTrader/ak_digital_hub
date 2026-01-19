import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '../data/mockData';
import { ShoppingCart, Terminal, ShieldCheck, Filter, Zap, X, Eye, Play, CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tools = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTool, setSelectedTool] = useState(null); // សម្រាប់បើក Popup Detail

  // ១. Logic សម្រាប់ Filter តាម Category
  const filteredTools = tools.filter(tool => {
    if (activeFilter === "All") return true;
    return tool.category === activeFilter;
  });

  // ២. បង្កើតបញ្ជី Category ដោយស្វ័យប្រវត្តិពី mockData
  const filterOptions = ["All", ...new Set(tools.map(tool => tool.category))];

  return (
    <div className="bg-[#020617] min-h-screen py-24 px-4 sm:px-6 font-khmer relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full text-amber-500 text-[10px] font-black tracking-[0.2em] uppercase mb-4"
        >
          <Zap size={14} fill="currentColor" /> Premium Digital Ecosystem
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter uppercase italic"
        >
          Premium <span className="text-amber-500">Tools</span>
        </motion.h2>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-3 mb-16">
        <div className="flex items-center gap-2 text-slate-500 mr-2 border-r border-white/10 pr-4">
          <Filter size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
        </div>
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setActiveFilter(option)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeFilter === option 
              ? 'bg-amber-500 text-slate-900 shadow-xl scale-105' 
              : 'bg-white/5 text-slate-500 hover:bg-white/10 border border-white/5'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <motion.div 
                layout key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card bg-slate-900/40 border border-white/5 p-10 rounded-[3rem] hover:border-amber-500/30 transition-all group relative flex flex-col h-full"
              >
                <div className="absolute top-8 right-8 text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {tool.category}
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center text-amber-500 mb-8 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-2xl border border-white/5">
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-black text-white mb-4 uppercase italic leading-tight group-hover:text-amber-500 transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-10 italic leading-relaxed opacity-80 flex-grow line-clamp-3">
                  {tool.desc}
                </p>

                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Lifetime Access</span>
                    <span className="text-3xl font-black text-white italic tracking-tighter">
                      ${tool.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSelectedTool(tool)}
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
                    >
                      <Eye size={16} /> Detail
                    </button>
                    <button 
                      onClick={() => {
                        const { icon, ...toolData } = tool; // បំបែក Icon ចេញដើម្បីការពារ Error
                        navigate('/checkout', { state: { selectedTool: toolData } });
                      }}
                      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <ShoppingCart size={16} /> Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* --- Popup Modal (ដូច Course) --- */}
      <AnimatePresence>
        {selectedTool && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTool(null)}
              className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <button onClick={() => setSelectedTool(null)} className="absolute top-6 right-6 z-10 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 bg-slate-950/50 flex flex-col justify-center items-center text-center border-r border-white/5">
                  <div className="w-24 h-24 bg-amber-500/10 rounded-3xl flex items-center justify-center text-amber-500 mb-8 shadow-2xl">
                    {React.createElement(selectedTool.icon, { size: 48 })}
                  </div>
                  <div className="space-y-4 text-left w-full">
                     <h4 className="text-white font-black text-[10px] uppercase tracking-widest border-l-2 border-amber-500 pl-3">Tool Advantages</h4>
                     <div className="flex items-center gap-3 text-slate-400 text-xs italic"><CheckCircle2 size={16} className="text-amber-500"/> Full Lifetime Access</div>
                     <div className="flex items-center gap-3 text-slate-400 text-xs italic"><Clock size={16} className="text-amber-500"/> Instant Digital Delivery</div>
                     <div className="flex items-center gap-3 text-slate-400 text-xs italic"><Zap size={16} className="text-amber-500"/> Free Future Updates</div>
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{selectedTool.category}</span>
                  <h2 className="text-3xl font-black text-white uppercase italic leading-tight mb-6">{selectedTool.title}</h2>
                  <p className="text-slate-400 italic leading-relaxed mb-10 text-sm">
                    {selectedTool.desc}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-4xl font-black text-white italic">${selectedTool.price}</span>
                    <button 
                      onClick={() => {
                        const { icon, ...toolData } = selectedTool;
                        navigate('/checkout', { state: { selectedTool: toolData } });
                      }}
                      className="bg-white hover:bg-amber-500 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl"
                    >
                      Buy Tool Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trust Footer */}
      <div className="max-w-7xl mx-auto mt-24 flex flex-col items-center gap-6">
        <div className="bg-blue-500/5 border border-blue-500/10 px-8 py-5 rounded-[2rem] flex items-center gap-4 backdrop-blur-md">
          <ShieldCheck className="text-blue-400" size={24} />
          <div>
            <p className="text-white text-xs font-black uppercase tracking-widest italic">Secure Transaction</p>
            <p className="text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">រាល់ការទិញម្តង ប្រើប្រាស់បានពេញមួយជីវិត រួមទាំងការ Update</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;