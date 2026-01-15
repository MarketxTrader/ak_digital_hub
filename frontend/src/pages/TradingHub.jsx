import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // បន្ថែម useNavigate
import { tradingCourses } from '../data/mockData'; // នាំចូលទិន្នន័យ
import { 
  TrendingUp, BarChart2, ShieldCheck, Zap, 
  Calendar, Send, Star, ArrowRight, ShoppingCart 
} from 'lucide-react';

const TradingHub = () => {
  const chartContainerRef = useRef(null);
  const calendarContainerRef = useRef(null);
  const navigate = useNavigate(); // បង្កើត navigate function

  useEffect(() => {
    // [កូដសម្រាប់ Widget TradingView រក្សានៅដដែល...]
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

  // Function សម្រាប់ទៅទំព័រ Checkout
  const handleEnroll = (course) => {
    navigate('/checkout', { state: { selectedCourse: course } });
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white font-khmer pb-20">
      
      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
          Trading <span className="text-amber-500">Hub</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          វិភាគទីផ្សារមាស និង Forex ជាមួយបច្ចេកវិទ្យា Real-time ប្រតិទិនសេដ្ឋកិច្ច និងវគ្គសិក្សាជំនាញ។
        </p>
        <a 
          href="https://t.me/ak_digital_hub" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#24A1DE] hover:bg-[#208bbf] text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          <Send size={20} /> Join Telegram Signal
        </a>
      </section>

      {/* --- ផ្នែកបន្ថែមថ្មី: Trading Courses Cards --- */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-1 bg-amber-500 rounded-full"></div>
          <h2 className="text-2xl font-black uppercase tracking-widest">Training Programs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tradingCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 hover:border-amber-500/50 transition-all group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Star size={80} className="text-amber-500" />
              </div>
              
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">
                {course.category}
              </span>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
                {course.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">
                {course.desc}
              </p>

              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] font-bold uppercase">Price</span>
                  <span className="text-3xl font-black text-white">
                    {course.price === 0 ? "FREE" : `$${course.price}`}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleEnroll(course)}
                  className="bg-amber-500 text-slate-900 p-4 rounded-2xl font-black hover:bg-amber-400 transition-all active:scale-90"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts & Calendar Grid */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-slate-900/50 border border-slate-800 p-2 rounded-[2.5rem] overflow-hidden shadow-2xl h-[650px]">
            <div className="p-4 flex items-center gap-3">
              <TrendingUp className="text-amber-500" />
              <h2 className="text-xl font-bold">XAUUSD Live Chart</h2>
            </div>
            <div className="h-[550px] w-full rounded-2xl overflow-hidden" ref={chartContainerRef}></div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2.5rem] h-[650px] shadow-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-amber-500" />
              <h2 className="text-xl font-bold">Economic Calendar</h2>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border border-slate-800" ref={calendarContainerRef}></div>
          </div>
        </div>
      </div>

      {/* Support Cards */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] text-center group hover:border-amber-500/30 transition-all">
          <ShieldCheck className="text-amber-500 mx-auto mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Safe Trading</h3>
          <p className="text-slate-400 text-sm italic">"Protect your capital first."</p>
        </div>
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] text-center group hover:border-amber-500/30 transition-all">
          <BarChart2 className="text-amber-500 mx-auto mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Price Action</h3>
          <p className="text-slate-400 text-sm">យល់ដឹងពីចលនាតម្លៃដោយមិនចាំបាច់ប្រើ Indicator ច្រើន។</p>
        </div>
        <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] text-center group hover:border-amber-500/30 transition-all">
          <Zap className="text-amber-500 mx-auto mb-4" size={32} />
          <h3 className="font-bold text-lg mb-2">Real-time Signals</h3>
          <p className="text-slate-400 text-sm">ទទួលបានសញ្ញាជួញដូរភ្លាមៗតាមរយៈក្រុមការងារយើង។</p>
        </div>
      </section>
    </div>
  );
};

export default TradingHub;