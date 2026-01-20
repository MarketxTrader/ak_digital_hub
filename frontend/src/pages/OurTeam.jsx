import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Sparkles } from 'lucide-react';
import TeamImg1 from '../assets/ceo.jpg';

const OurTeam = () => {
  const team = [
    {
      name: "Noy Vathana",
      role: "Founder & CEO",
      image: TeamImg1, // ដាក់រូបពិតទំហំធំជាងមុនបន្តិច
      bio: "អ្នកជំនាញផ្នែក Digital Skills និងការបង្កើតចំណូលអនឡាញជាង ៥ឆ្នាំ។"
    },
    {
      name: "Sovan Reach",
      role: "Forex Specialist",
      image: "https://via.placeholder.com/300",
      bio: "គ្រូបង្វឹកផ្នែកជួញដូរ Forex និងការគ្រប់គ្រងហិរញ្ញវត្ថុ។"
    },
    {
      name: "Leakena Chan",
      role: "Course Coordinator",
      image: "https://via.placeholder.com/300",
      bio: "អ្នកសម្របសម្រួល និងជួយសិស្សានុសិស្សក្នុងការសិក្សា។"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white py-32 px-6 font-khmer relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full text-amber-500 text-[10px] font-black tracking-[0.2em] uppercase mb-6"
          >
            <Sparkles size={14} /> The Creative Minds
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
            ជួបជាមួយ <span className="text-amber-500">ក្រុមការងារយើង</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto italic">
            យើងមានក្រុមការងារដែលពោរពេញដោយបទពិសោធន៍ ដើម្បីជួយជ្រោមជ្រែងអាជីវកម្មរបស់អ្នកឱ្យឈានដល់កម្រិតកំពូល។
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 border border-amber-500/20 p-6 sm:p-10 rounded-3xl bg-slate-900/30 backdrop-blur-sm">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-slate-900/40 border border-amber-500/20 p-8 sm:p-10 rounded-[3rem] text-center hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm"
            >
              {/* Profile Image with Modern Styling */}
              <div className="relative w-40 h-40 mx-auto mb-8">
                {/* ពន្លឺ Glow នៅពីក្រោយរូបភាព (បង្ហាញខ្លាំងពេល Hover) */}
                <div className="absolute inset-0 bg-amber-500 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative w-full h-full p-1 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full overflow-hidden border border-white/10 group-hover:border-amber-500 transition-colors duration-500">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full transition-all duration-500 scale-100 group-hover:scale-110 shadow-2xl" 
                    /* scale-100 ទៅ scale-110 គឺដើម្បីឱ្យវារីកឡើងនៅពេល Hover */
                  />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-1 group-hover:text-amber-500 transition-colors uppercase italic">{member.name}</h3>
                <p className="text-amber-500/60 font-black mb-4 text-[10px] uppercase tracking-[0.2em]">{member.role}</p>
                <div className="h-px w-12 bg-amber-500/20 mx-auto mb-6 group-hover:w-24 transition-all duration-500" />
                <p className="text-slate-400 text-sm leading-relaxed mb-8 italic font-light line-clamp-3">{member.bio}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-6 text-slate-500">
                  <Facebook size={18} className="hover:text-amber-500 cursor-pointer transition-all hover:-translate-y-1" />
                  <Instagram size={18} className="hover:text-amber-500 cursor-pointer transition-all hover:-translate-y-1" />
                  <Twitter size={18} className="hover:text-amber-500 cursor-pointer transition-all hover:-translate-y-1" />
                  <Linkedin size={18} className="hover:text-amber-500 cursor-pointer transition-all hover:-translate-y-1" />
                </div>
              </div>

              {/* Decorative Corner Blur */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-32 text-center opacity-20">
        <p className="text-[10px] uppercase tracking-[0.5em] font-black">AK Digital Hub Elite Team</p>
      </div>
    </div>
  );
};

export default OurTeam;