import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Play, Clock, Globe, 
  ShieldCheck, ArrowLeft, ShoppingCart, Star,
  BookOpen, Users, Trophy
} from 'lucide-react';

const CourseDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  // បើគ្មានទិន្នន័យ (refresh page) ឱ្យត្រឡប់ទៅទំព័រ Courses
  if (!course) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-khmer">
        <div className="text-center">
          <p className="text-slate-500 mb-4 italic">មិនមានទិន្នន័យមេរៀនឡើយ</p>
          <button onClick={() => navigate('/courses')} className="text-amber-500 font-black italic underline uppercase tracking-widest text-xs">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const features = [
    { icon: <Clock size={18} />, text: "សិក្សាបានពេញមួយជីវិត (Lifetime Access)" },
    { icon: <Globe size={18} />, text: "រៀនបានគ្រប់ទីកន្លែង គ្រប់ពេលវេលា" },
    { icon: <ShieldCheck size={18} />, text: "មានការគាំទ្រពីគ្រូបង្វឹកផ្ទាល់" },
    { icon: <Trophy size={18} />, text: "ទទួលបានវិញ្ញាបនបត្របញ្ជាក់ការសិក្សា" },
  ];

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 px-4 sm:px-6 font-khmer relative overflow-hidden">
      
      {/* Background Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors mb-8 font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft size={14} /> Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* ១. ផ្នែកខាងឆ្វេង: ព័ត៌មានលម្អិតនៃមេរៀន */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 inline-block shadow-lg shadow-amber-500/20">
                {course.category}
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight italic tracking-tighter uppercase">
                {course.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-slate-400 border-b border-white/5 pb-8 mb-8 font-medium italic">
                <div className="flex items-center gap-2 text-amber-500">
                  <Star size={18} fill="currentColor" />
                  <span className="text-white font-bold">{course.rating} (Rating)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-blue-400" />
                  <span>សិស្សចុះឈ្មោះ ១៥០+ នាក់</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">សេចក្តីពិពណ៌នា</h3>
                <p className="text-slate-400 leading-relaxed text-lg italic opacity-90">
                  {course.desc || "ស្វែងយល់ពីយុទ្ធសាស្ត្រ និងបច្ចេកទេសស៊ីជម្រៅដែលជួយឱ្យអ្នកក្លាយជាអ្នកជំនាញក្នុងវិស័យនេះ។ វគ្គសិក្សានេះត្រូវបានរចនាឡើងយ៉ាងសម្រិតសម្រាំងសម្រាប់អ្នកដែលចង់ប្តូរចំណេះដឹងឱ្យទៅជាលទ្ធផលពិតប្រាកដ។"}
                </p>
              </div>
            </motion.div>

            {/* Curriculum */}
            <div className="bg-slate-900/50 border border-white/5 p-8 sm:p-10 rounded-[3rem]">
              <h3 className="text-2xl font-black text-white mb-8 italic uppercase tracking-tight flex items-center gap-3">
                <BookOpen className="text-amber-500" /> អ្វីដែលអ្នកនឹងទទួលបាន
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-start gap-3 group">
                    <CheckCircle2 size={20} className="text-amber-500 mt-1 shrink-0" />
                    <span className="text-slate-400 font-medium italic group-hover:text-white transition-colors">មេរៀនគន្លឹះទី {item}: បច្ចេកទេស និងការអនុវត្តជាក់ស្តែង។</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ២. ផ្នែកខាងស្តាំ: តម្លៃ និង Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-32 bg-slate-900 border border-white/10 p-8 rounded-[3rem] shadow-2xl"
            >
              <div className="relative h-52 rounded-2xl overflow-hidden mb-8 border border-white/5 group">
                <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform cursor-pointer">
                    <Play size={28} fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2">តម្លៃសិក្សាពេញ</span>
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-black text-white italic tracking-tighter">
                    {course.price === 0 ? "FREE" : `$${course.price}`}
                  </span>
                  {course.price > 0 && <span className="text-slate-600 text-xl line-through mb-1 font-bold italic">$199.00</span>}
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout', { state: { selectedCourse: course } })}
                className="w-full bg-white hover:bg-amber-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all mb-8"
              >
                ចុះឈ្មោះចូលរៀនឥឡូវនេះ <ShoppingCart size={18} />
              </button>

              <div className="space-y-4 pt-8 border-t border-white/5">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-500 text-xs font-medium italic">
                    <span className="text-amber-500">{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;