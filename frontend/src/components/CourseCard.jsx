import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, BarChart } from 'lucide-react';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    // បញ្ជូនទៅកាន់ទំព័រ Checkout ជាមួយទិន្នន័យ Course
    navigate('/checkout', { state: { course: course } });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image || 'https://via.placeholder.com/400x250'} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
          {course.category || 'Popular'}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.desc}</p>
        
        <div className="flex items-center justify-between text-slate-500 text-xs mb-6 border-y border-slate-50 py-3">
          <div className="flex items-center gap-1">
            <Clock size={14} /> {course.duration || '10 Weeks'}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} /> {course.lessons || '24 Lessons'}
          </div>
          <div className="flex items-center gap-1">
            <BarChart size={14} /> {course.level || 'Beginner'}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-slate-900">${course.price}</span>
          <button 
            onClick={handleEnroll}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-amber-500 hover:text-slate-900 transition-colors duration-300"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;