import React, { useEffect, useRef, useState } from 'react'; // បន្ថែម useState
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // បន្ថែមសម្រាប់ animation
import { tradingCourses } from '../data/mockData';
import { 
  TrendingUp, BarChart2, ShieldCheck, Zap, 
  Calendar, Send, Star, ArrowRight, ShoppingCart, 
  Filter, CheckCircle
} from 'lucide-react';

const TradingHub = () => {
  const chartContainerRef = useRef(null);
  const calendarContainerRef = useRef(null);
  const navigate = useNavigate();

  // ១. បង្កើត State សម្រាប់គ្រប់គ្រងការ Filter
  const [activeFilter, setActiveFilter] = useState('All');

  // ២. បង្កើតបញ្ជី Filter Categories (Basic, Advanced, Professional)
  const filters = ['All', 'Basic', 'Advanced', 'Professional'];

  // ៣. លុចលក្ខខណ្ឌ Filter ទិន្នន័យ
  const filteredCourses = activeFilter === 'All' 
    ? tradingCourses 
    : tradingCourses.filter(course => course.category === activeFilter);

  useEffect(() => {
    const createChartWidget = () => {
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = "";
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "autosize": true,
          "symbol": "OANDA:XAUUSD",
          "interval": "D",
          "timezone": "Asia/Bangkok",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com"
        });
        chartContainerRef.current.appendChild(script);
      }
    };

    const createCalendarWidget = () => {
      if (calendarContainerRef.current) {
        calendarContainerRef.current.innerHTML = "";
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "colorTheme": "dark",
          "isMaximized": true,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "importanceFilter": "-1,0,1",
          "currencyFilter": "USD,EUR,GBP,JPY,AUD,CAD"
        });
        calendarContainerRef.current.appendChild(script);
      }
    };

    createChartWidget();
    createCalendarWidget();
  }, []);

  const handleEnroll = (course) => {
    navigate('/checkout', { state: { selectedCourse: course } });
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white font-khmer pb-20 pt-10 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full -z-10"></div>

      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic">
            Trading <span className="text-amber-500">Hub</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-sm md:text-base font-medium italic">
            វិភាគទីផ្សារមាស និង Forex ជាមួយបច្ចេកវិទ្យា Real-time ប្រតិទិនសេដ្ឋកិច្ច និងវគ្គសិក្សាជំនាញ។
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://t.me/ak_digital_hub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#24A1DE] hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs"
            >
              <Send size={18} /> Join Telegram Signal
            </a>
          </div>
        </motion.div>
      </section>

      {/* --- Course Section with Filter --- */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-1.5 bg-amber-500 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight italic">Training Programs</h2>
            </div>
            <p className="text-slate-500 text-sm font-medium">ជ្រើសរើសកម្រិតសិក្សាដែលស័ក្តិសមសម្រាប់អ្នក</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
                  activeFilter === f 
                  ? 'bg-amber-500 text-slate-950 shadow-lg' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredCourses.map((course) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={course.id} 
                className="glass-card bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 hover:border-amber-500/30 transition-all group relative flex flex-col h-full overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Star size={120} className="text-amber-500" />
                </div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-amber-500/10 text-amber-500 text-[9px] font-black px-4 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest">
                    {course.category}
                  </span>
                  <div className="flex text-amber-500 gap-0.5">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mb-4 group-hover:text-amber-500 transition-colors leading-tight tracking-tight uppercase italic">
                  {course.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium italic opacity-80 flex-grow line-clamp-4">
                  {course.desc}
                </p>

                <div className="flex items-center justify-between mt-auto bg-slate-950/60 p-5 rounded-[2rem] border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Enrollment Fee</span>
                    <span className="text-3xl font-black text-white italic">
                      {course.price === 0 ? "FREE" : `$${course.price}`}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleEnroll(course)}
                    className="bg-white hover:bg-amber-500 text-slate-950 p-4 rounded-2xl font-black transition-all active:scale-90 shadow-xl"
                  >
                    <ShoppingCart size={22} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Charts & Calendar Grid (ដូចកូដដើមរបស់អ្នក តែសម្រួលស្ទីលបន្តិច) */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8 mb-20">
        <div className="lg:col-span-2">
          <div className="bg-slate-900/50 border border-white/5 p-4 rounded-[3rem] overflow-hidden shadow-2xl h-[650px] relative">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <TrendingUp size={20} />
                </div>
                <h2 className="text-xl font-black uppercase italic">Market Overview</h2>
              </div>
              <span className="text-[10px] font-black bg-green-500/10 text-green-500 px-3 py-1 rounded-full animate-pulse">LIVE MARKET</span>
            </div>
            <div className="h-[530px] w-full rounded-[2rem] overflow-hidden border border-white/5" ref={chartContainerRef}></div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[3rem] h-[650px] shadow-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                <Calendar size={20} />
              </div>
              <h2 className="text-xl font-black uppercase italic">Economic Events</h2>
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl border border-white/5" ref={calendarContainerRef}></div>
          </div>
        </div>
      </div>

      {/* Support Cards (កែលម្អឱ្យកាន់តែ Premium) */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldCheck size={32} />, title: "Safe Trading", desc: '"Protect your capital first."', color: "amber" },
          { icon: <BarChart2 size={32} />, title: "Price Action", desc: "យល់ដឹងពីចលនាតម្លៃដោយមិនប្រើ Indicator ច្រើន។", color: "blue" },
          { icon: <Zap size={32} />, title: "Real-time Signals", desc: "ទទួលបានសញ្ញាជួញដូរភ្លាមៗតាមរយៈ Telegram។", color: "amber" }
        ].map((item, i) => (
          <div key={i} className="p-10 bg-slate-900/40 border border-white/5 rounded-[2.5rem] text-center group hover:border-amber-500/30 transition-all">
            <div className="text-amber-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="font-black text-xl mb-3 uppercase italic">{item.title}</h3>
            <p className="text-slate-500 text-sm font-medium italic leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TradingHub;