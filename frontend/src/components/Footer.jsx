import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Youtube, 
  Instagram, 
  Send,     /* ប្រើ Send ជំនួស Telegram */
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';
import logoImg from '../assets/ak.png';

const Footer = () => {
  return (
    <footer className="relative bg-[#020617] border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
      {/* ពន្លឺ Glow តិចៗនៅផ្នែកខាងក្រោម Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* ១. ព័ត៌មានក្រុមហ៊ុន (Brand Info) */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain bg-slate-900 rounded-xl p-1 border border-slate-800" />
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none tracking-tighter">
                  AK DIGITAL<span className="text-amber-500">HUB</span>
                </span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Trading & Academy</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed font-khmer text-sm italic">
              "យើងជាមជ្ឈមណ្ឌលបណ្តុះបណ្តាលជំនាញឌីជីថល និងការជួញដូរឈានមុខគេ ដែលផ្តល់ជូននូវចំណេះដឹងពិត និងការអនុវត្តជាក់ស្តែង។"
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={18} />, link: "#" },
                { icon: <Send size={18} />, link: "#" }, // តំណាងឱ្យ Telegram
                { icon: <Youtube size={18} />, link: "#" },
                { icon: <Instagram size={18} />, link: "#" }
              ].map((social, idx) => (
                <a key={idx} href={social.link} className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all shadow-lg">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ២. Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-amber-500 pl-4">Useful Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'All Courses', path: '/courses' },
                { name: 'Services', path: '/services' },
                { name: 'Trading View', path: '/trading' },
                { name: 'Contact Team', path: '/team' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-amber-500 hover:pl-2 transition-all duration-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ៣. ព័ត៌មានទំនាក់ទំនង (Contact) */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-amber-500 pl-4">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-slate-400">
                <MapPin size={20} className="text-amber-500 shrink-0" />
                <span className="text-sm font-khmer italic">រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400">
                <Phone size={20} className="text-amber-500 shrink-0" />
                <span className="text-sm">+855 14 993 177</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400">
                <Mail size={20} className="text-amber-500 shrink-0" />
                <span className="text-sm">info@akdigitalhub.com</span>
              </li>
            </ul>
          </div>

          {/* ៤. Newsletter */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 border-l-4 border-amber-500 pl-4">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-6 font-khmer italic">ទទួលបានការវិភាគទីផ្សារ និងមេរៀនថ្មីៗមុនគេ។</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-amber-500 text-slate-950 px-4 rounded-xl font-black hover:bg-amber-400 transition-all flex items-center justify-center">
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* បន្ទាត់ខាងក្រោមគេបង្អស់ */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em]">
            © 2026 <span className="text-white font-black">AK DIGITAL HUB</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;