import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../data/mockData'; 
import { Star, ShoppingCart, Zap, Search, X, Play, Clock, Eye, CheckCircle2, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // ១. បង្កើតបញ្ជី Category ដោយស្វ័យប្រវត្តិពី mockData
  const categories = ["All", ...new Set(courses.map(course => course.category))];

  // ២. Logic សម្រាប់ Filter និង Search រួមគ្នា
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 px-6 font-khmer relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
              Discover <span className="text-amber-500">Premium</span> Skills
            </h1>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="ស្វែងរកមេរៀន..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 pl-12 w-full text-white outline-none focus:border-amber-500/50 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          </div>
        </div>

        {/* --- ៣. ផ្នែក Filter Categories --- */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-slate-500 mr-2 border-r border-white/10 pr-4">
            <Filter size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map((course) => (
            <motion.div 
              layout
              key={course.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card group rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col h-full hover:border-amber-500/30 transition-all shadow-2xl"
            >
              {/* Image Thumbnail */}
              <div className="relative h-56 overflow-hidden">
                <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-[9px] font-black px-3 py-1 rounded-full uppercase italic">
                  {course.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  <Star size={14} fill="currentColor" />
                  <span className="text-white text-xs font-black">{course.rating}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-6 line-clamp-2 uppercase italic leading-tight">
                  {course.title}
                </h3>

                <div className="mt-auto">
                   <div className="mb-6">
                    <span className="text-3xl font-black text-white italic">
                      {course.price === 0 ? "FREE" : `$${course.price}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSelectedCourse(course)}
                      className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
                    >
                      <Eye size={16} /> មើលលម្អិត
                    </button>
                    <button 
                      onClick={() => navigate('/checkout', { state: { selectedCourse: course } })}
                      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <ShoppingCart size={16} /> ចុះឈ្មោះ
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 italic">មិនមានមេរៀនដែលអ្នកកំពុងស្វែងរកឡើយ...</p>
          </div>
        )}

        {/* --- Popup Modal --- */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedCourse(null)}
                className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-slate-900 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl overflow-hidden"
              >
                <button onClick={() => setSelectedCourse(null)} className="absolute top-6 right-6 z-10 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>

                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12 bg-slate-950/50">
                    <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl">
                      <img src={selectedCourse.image} alt="" className="w-full aspect-video object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play size={40} className="text-white fill-white opacity-80" />
                      </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-white font-black text-[10px] uppercase tracking-widest border-l-2 border-amber-500 pl-3">Course Benefits</h4>
                       <div className="flex items-center gap-3 text-slate-400 text-xs italic"><CheckCircle2 size={16} className="text-amber-500"/> Lifetime Access</div>
                       <div className="flex items-center gap-3 text-slate-400 text-xs italic"><Clock size={16} className="text-amber-500"/> Learn at your own pace</div>
                    </div>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{selectedCourse.category}</span>
                    <h2 className="text-3xl font-black text-white uppercase italic leading-tight mb-6">{selectedCourse.title}</h2>
                    <p className="text-slate-400 italic leading-relaxed mb-10 text-sm">
                      {selectedCourse.detail || selectedCourse.desc || "ចូលរួមសិក្សាជាមួយអ្នកជំនាញ ដើម្បីទទួលបានបទពិសោធន៍ពិតៗ។"}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-4xl font-black text-white italic">${selectedCourse.price}</span>
                      <button 
                        onClick={() => navigate('/checkout', { state: { selectedCourse } })}
                        className="bg-white hover:bg-amber-500 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Courses;