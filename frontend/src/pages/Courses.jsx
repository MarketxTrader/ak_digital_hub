import React from 'react';
import { useNavigate } from 'react-router-dom'; // ១. Import useNavigate
import { courses } from '../data/mockData';
import { Star, ShoppingCart } from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate(); // ២. បង្កើត variable navigate

  const handleEnroll = (course) => {
    // ៣. នាំទៅកាន់ទំព័រ checkout និងបោះទិន្នន័យ course ទៅជាមួយ
    navigate('/checkout', { state: { selectedCourse: course } });
  };

  return (
    <div className="bg-[#020617] min-h-screen py-20 px-6 font-khmer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all shadow-xl">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">{course.category}</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-4 h-14 line-clamp-2">{course.title}</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <Star size={16} className="fill-amber-500 text-amber-500" /> {course.rating}
                </div>
                <div className="text-white font-black text-2xl">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </div>
              </div>

              {/* ៤. បន្ថែម onClick ទៅលើប៊ូតុង */}
              <button 
                onClick={() => handleEnroll(course)}
                className="w-full mt-6 bg-amber-500 text-slate-900 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/10"
              >
                <ShoppingCart size={20} /> Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;