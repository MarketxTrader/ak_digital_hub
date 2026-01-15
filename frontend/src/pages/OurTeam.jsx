import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const OurTeam = () => {
  const team = [
    {
      name: "Noy Vathana",
      role: "Founder & CEO",
      image: "https://via.placeholder.com/150", // ដាក់រូបពិតរបស់អ្នកនៅទីនេះ
      bio: "អ្នកជំនាញផ្នែក Digital Skills និងការបង្កើតចំណូលអនឡាញជាង ៥ឆ្នាំ។"
    },
    {
      name: "Sovan Reach",
      role: "Forex Specialist",
      image: "https://via.placeholder.com/150",
      bio: "គ្រូបង្វឹកផ្នែកជួញដូរ Forex និងការគ្រប់គ្រងហិរញ្ញវត្ថុ។"
    },
    {
      name: "Leakena Chan",
      role: "Course Coordinator",
      image: "https://via.placeholder.com/150",
      bio: "អ្នកសម្របសម្រួល និងជួយសិស្សានុសិស្សក្នុងការសិក្សា។"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white py-20 px-6 font-khmer">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">ជួបជាមួយ <span className="text-amber-500">ក្រុមការងារយើង</span></h1>
          <p className="text-slate-400">យើងមានក្រុមការងារដែលពោរពេញដោយបទពិសោធន៍ ដើម្បីជួយអ្នកឱ្យជោគជ័យ។</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div key={index} className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] text-center hover:border-amber-500/50 transition-all duration-300">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="relative w-full h-full object-cover rounded-full border-2 border-slate-700 p-1 group-hover:border-amber-500 transition-all"
                />
              </div>
              
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-amber-500 font-medium mb-4 text-sm uppercase tracking-widest">{member.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{member.bio}</p>

              <div className="flex justify-center gap-4 text-slate-500">
                <Facebook size={18} className="hover:text-amber-500 cursor-pointer transition-colors" />
                <Instagram size={18} className="hover:text-amber-500 cursor-pointer transition-colors" />
                <Twitter size={18} className="hover:text-amber-500 cursor-pointer transition-colors" />
                <Linkedin size={18} className="hover:text-amber-500 cursor-pointer transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;