import React from 'react';
import { useNavigate } from 'react-router-dom'; // ១. Import useNavigate
import { services } from '../data/mockData';
import { CheckCircle2, ArrowRight, ShoppingCart } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate(); // ២. បង្កើត variable navigate

  const handleOrder = (service) => {
    // ៣. បោះទិន្នន័យទៅ Checkout តាមរយៈ state 
    // ប្រើឈ្មោះ 'selectedCourse' ដើម្បីឱ្យស៊ីគ្នាជាមួយ Checkout.jsx ដែលយើងសរសេរពីមុន
    // យើងបំប្លែង service.price ទៅជាលេខ (Number) ប្រសិនបើវាជា String ក្នុង mockData
    const priceValue = typeof service.price === 'string' 
      ? parseFloat(service.price.replace(/[^0-9.]/g, '')) 
      : service.price;

    navigate('/checkout', { 
      state: { 
        selectedCourse: {
          title: service.title,
          price: priceValue || 0,
          image: "" // អាចបន្ថែមរូបភាពតំណាងសេវាកម្មបើមាន
        } 
      } 
    });
  };

  return (
    <div className="bg-[#020617] min-h-screen py-20 px-6 font-khmer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => {
          const Icon = service.icon; 

          return (
            <div key={service.id} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-amber-500/30 transition-all group">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Icon size={24} /> 
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight">{service.title}</h3>
                  <div className="flex items-center gap-2 text-amber-500/60 mt-1">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Premium Service</span>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-400 mb-8 leading-relaxed h-20 line-clamp-3">
                {service.desc}
              </p>

              <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800/50">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] font-bold uppercase">Price Starting</span>
                  <span className="text-white font-black text-2xl">{service.price}</span>
                </div>
                
                {/* ៤. បន្ថែម onClick ទៅលើប៊ូតុង */}
                <button 
                  onClick={() => handleOrder(service)}
                  className="bg-amber-500 text-slate-900 px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/10"
                >
                  Order Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;