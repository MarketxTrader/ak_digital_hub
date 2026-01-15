import React from 'react';
import { tools } from '../data/mockData';
import { Download, Lock } from 'lucide-react';

const Tools = () => {
  return (
    <div className="bg-[#020617] min-h-screen py-20 px-6 font-khmer">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Trading <span className="text-amber-500">Tools</span></h2>
        <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400">ឧបករណ៍ជំនួយសម្រាប់ការវិភាគ និងគ្រប់គ្រងហានិភ័យ។</p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div key={tool.id} className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-amber-500/50 transition-all group">
              <div className="text-amber-500 mb-6"><Icon size={32} /></div>
              <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-slate-400 text-sm mb-6">{tool.desc}</p>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${tool.status === 'Free' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 cursor-not-allowed'}`}>
                {tool.status === 'Free' ? 'Download Now' : 'Premium Only'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Tools;