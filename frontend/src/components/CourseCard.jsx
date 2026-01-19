import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, BarChart, ArrowRight } from 'lucide-react';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate('/checkout', { state: { course: course } });
  };

  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden hover:border-amber-500/50 transition-all duration-500 group flex flex-col h-full relative">
      
      {/* ១. ផ្នែករូបភាព (Course Image) */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={course.image || 'https://via.placeholder.com/400x250'} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay ងងឹតបន្តិចលើរូបភាព */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <div className="absolute top-5 left-5 bg-amber-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
          {course.category || 'Popular'}
        </div>
      </div>

      {/* ២. ខ្លឹមសារ (Course Content) */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-white mb-3 line-clamp-1 group-hover:text-amber-500 transition-colors">
          {course.title}
        </h3>
        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-khmer">
          {course.desc}
        </p>
        
        {/* ព័ត៌មានលម្អិត (Stats) */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 mb-6">
          <div className="flex flex-col items-center gap-1 border-r border-white/5">
            <Clock size={14} className="text-amber-500" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{course.duration || '10 Weeks'}</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-r border-white/5">
            <BookOpen size={14} className="text-amber-500" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{course.lessons || '24 Lessons'}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <BarChart size={14} className="text-amber-500" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{course.level || 'Beginner'}</span>
          </div>
        </div>

        {/* ៣. តម្លៃ និងប៊ូតុង (Price & Action) */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Price</span>
            <span className="text-3xl font-black text-white">${course.price}</span>
          </div>
          
          <button 
            onClick={handleEnroll}
            className="flex items-center gap-2 bg-white/5 hover:bg-amber-500 text-white hover:text-slate-900 px-6 py-3 rounded-2xl font-black transition-all duration-300 border border-white/10 hover:border-amber-500 active:scale-95 group/btn shadow-xl"
          >
            Enroll <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;