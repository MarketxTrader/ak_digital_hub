import { 
  Globe, TrendingUp, Wrench, ShieldCheck, 
  Video, Music, Wand2, Layers, Cpu, PlayCircle
} from 'lucide-react';
import courseImg1 from '../assets/Forex.jpg';

// ១. វគ្គសិក្សាទូទៅ
export const courses = [
  {
    id: 1,
    title: "Forex Masterclass: From Zero to Hero",
    category: "Forex Trading",
    price: 9.99,
    rating: 4.9,
    detail: "វគ្គសិក្សាដែលគ្របដណ្តប់ពីមូលដ្ឋានរហូតដល់កម្រិតខ្ពស់នៃការជួញដូរ Forex សម្រាប់អ្នកចាប់ផ្ដើម។ អ្នកនឹងរៀនពីរបៀបមើល Graph, ការប្រើប្រាស់ Indicator និងចិត្តសាស្ត្រជួញដូរ។",
    image: courseImg1
  },
  {
    id: 2,
    title: "UI/UX Design for Tech Startups",
    category: "Design",
    price: 89,
    rating: 4.8,
    detail: "រៀនពីរបៀបរចនា Interface (UI) និងបទពិសោធន៍អ្នកប្រើប្រាស់ (UX) សម្រាប់ App និង Website ទំនើបៗ ដោយប្រើប្រាស់កម្មវិធី Figma ចាប់ពីកម្រិតដំបូង។",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=500&auto=format&fit=crop"
  }
];

// ២. សេវាកម្ម
export const services = [
  {
    id: 1,
    title: "Web Development",
    description: "បង្កើតគេហទំព័រទំនើប លឿន និងមានសុវត្ថិភាពខ្ពស់សម្រាប់អាជីវកម្ម។",
    longDetail: "យើងផ្តល់ជូននូវការអភិវឌ្ឍន៍គេហទំព័រដែលផ្តោតលើបទពិសោធន៍អ្នកប្រើប្រាស់ (UX) និងល្បឿននៃការដំណើរការ។ មិនថាជា Landing Page ធម្មតា ឬប្រព័ន្ធគ្រប់គ្រងស្មុគស្មាញ យើងធានាជូននូវគុណភាពកូដកម្រិតស្តង់ដារ។",
    icon: "Layout",
    features: ["Responsive Design", "SEO Optimized", "Custom UI/UX", "High Security"],
    steps: [
      "សិក្សាពីតម្រូវការអាជីវកម្ម (Discovery)",
      "រចនាប្លង់តាម Figma (UI/UX Design)",
      "អភិវឌ្ឍន៍ដោយប្រើប្រាស់ React/Next.js",
      "ការធ្វើតេស្តគុណភាព និងល្បឿន (QA Testing)",
      "ដាក់ឱ្យដំណើរការជាផ្លូវការ (Deployment)"
    ]
  },
  {
    id: 2,
    title: "Graphic Design",
    description: "រចនា Logo និងអត្តសញ្ញាណម៉ាកយីហោ (Branding) ឱ្យមានភាពលេចធ្លោ។",
    longDetail: "រូបភាពដែលស្អាតគឺជាដង្ហើមនៃម៉ាកយីហោ។ យើងជួយអ្នកបង្កើតអត្តសញ្ញាណដែលអាចទាក់ទាញភ្នែកអតិថិជនបានតាំងពីការមើលលើកដំបូង តាមរយៈការប្រើប្រាស់ពណ៌ និងរូបរាងដែលឆ្លុះបញ្ចាំងពីគុណតម្លៃអាជីវកម្ម។",
    icon: "Palette",
    features: ["Logo Design", "Social Media Poster", "Brand Identity", "Brand Guidelines"],
    steps: [
      "ការធ្វើ Moodboard ដើម្បីកំណត់ទិសដៅ",
      "រចនា Concept ព្រាងចំនួន ៣",
      "ការកែសម្រួលតាមមតិអតិថិជន",
      "ការប្រគល់ File អាជីព (AI, PNG, SVG)"
    ]
  },
  {
    id: 3,
    title: "Ads Strategy",
    description: "រៀបចំយុទ្ធសាស្ត្របាញ់ពាណិជ្ជកម្មលើ Facebook, TikTok និង Google។",
    longDetail: "ការបាញ់ Ads មិនមែនគ្រាន់តែចុចប៊ូតុង Boost នោះទេ។ យើងជួយវិភាគទិន្នន័យអតិថិជនគោលដៅ ដើម្បីធានាថាថវិកាដែលអ្នកចំណាយនឹងត្រឡប់មកវិញជាផលចំណេញ (ROI) ខ្ពស់បំផុត។",
    icon: "Megaphone",
    features: ["Audience Targeting", "Content Strategy", "Ads Management", "Weekly Reporting"],
    steps: [
      "វិភាគទីផ្សារ និងគូប្រជែង",
      "រៀបចំ Content និង Creative Ads",
      "កំណត់ក្រុមគោលដៅឱ្យចំគោលដៅ",
      "តាមដាន និងបង្កើនប្រសិទ្ធភាពជារៀងរាល់ថ្ងៃ"
    ]
  }
];

// ៣. ឧបករណ៍ (Tools) - បន្ថែម Tool សម្រាប់ Relaxing Video
export const tools = [
  {
    id: 1,
    title: "Tool Relaxing Video loop 5s-5h",
    desc: "ឧបករណ៍ជំនួយក្នុងការបង្កើតវីដេអូកម្សាន្តអារម្មណ៍ (Relaxing) ដែលអាចបម្លែងពី ៥នាទី ទៅ ចន្លោះ១ម៉ោងដល់៥ម៉ោង និងធ្វើមួយដងពី១ដល់១០០វិដេអូ។",
    status: "Premium",
    price: 25.00,
    category: "Tool Relaxing",
    icon: Video 
  },
  {
    id: 2,
    title: "Lofi Music Composer",
    desc: "បង្កើតតន្ត្រីបែប Lofi និងសម្លេងធម្មជាតិ (Rain, Forest) ដោយស្វ័យប្រវត្តិសម្រាប់វីដេអូរបស់អ្នក។",
    status: "Premium",
    price: 19.99,
    category: "Tool Relaxing",
    icon: Music 
  },
  {
    id: 3,
    title: "Auto-Subtitle Magic",
    desc: "បកប្រែ និងដាក់អក្សររត់ក្នុងវីដេអូដោយស្វ័យប្រវត្តិ គាំទ្រភាសាខ្មែរ ១០០%។",
    status: "Premium",
    price: 15.00,
    category: "Video Tech",
    icon: Wand2 
  },
  {
    id: 4,
    title: "Trading Journal Bot",
    desc: "ឧបករណ៍កត់ត្រាការជួញដូរដោយស្វ័យប្រវត្តិក្នុង Telegram កាត់បន្ថយការប្រើប្រាស់ក្រដាស។",
    status: "Premium",
    price: 10.00,
    category: "Trading Tool",
    icon: Wrench 
  },
  {
    id: 5,
    title: "Risk Calculator Pro",
    desc: "គណនាទំហំ Lot Size ឱ្យបានត្រឹមត្រូវបំផុតដើម្បីការពារដើមទុនរបស់អ្នក។",
    status: "Premium",
    price: 12.00,
    category: "Trading Tool",
    icon: ShieldCheck 
  }
];
// ៤. កញ្ចប់តម្លៃសម្រាប់សេវាកម្ម
export const pricingPlans = {
  // កញ្ចប់តម្លៃសម្រាប់ Web Development (ID: 1)
  1: [
    { name: "Starter", price: "299", features: ["Landing Page", "Mobile Friendly", "1 Year Hosting", "Basic SEO"], popular: false },
    { name: "Business", price: "599", features: ["Up to 5 Pages", "E-commerce Ready", "Speed Optimization", "Premium Support"], popular: true },
    { name: "Enterprise", price: "999+", features: ["Custom System", "Full Security", "API Integration", "Maintenance"], popular: false }
  ],
  // កញ្ចប់តម្លៃសម្រាប់ Graphic Design (ID: 2)
  2: [
    { name: "Basic", price: "99", features: ["Logo Design", "3 Concepts", "Source Files"], popular: false },
    { name: "Branding", price: "250", features: ["Logo + Brand Guide", "Social Media Kits", "Business Card"], popular: true },
  ],
  // កញ្ចប់តម្លៃសម្រាប់ Ads Strategy (ID: 3)
  3: [
    { name: "Trial", price: "150", features: ["Ad Setup", "Audience Research", "7 Days Monitoring"], popular: false },
    { name: "Growth", price: "400", features: ["Strategy Planning", "Content Creation", "Monthly Report"], popular: true },
  ]
};

//  ៥. វគ្គសិក្សាសម្រាប់ Trading Hub
export const tradingCourses = [
  {
    id: 't1',
    title: "Basic Forex Trading",
    price: 0.00,
    category: "Basic",
    desc: "យល់ដឹងពីមូលដ្ឋានគ្រឹះនៃទីផ្សារ Forex និងការប្រើប្រាស់កម្មវិធីជួញដូរសម្រាប់អ្នកចាប់ផ្ផ្ដើមដំបូង។",
    level: "Free"
  },
  {
    id: 't2',
    title: "Professional Gold Scalping",
    price: 49.99,
    category: "Professional",
    desc: "បច្ចេកទេសវាយឆ្មក់យកប្រាក់ចំណេញលើមាស (XAUUSD) ក្នុងរយៈពេលខ្លីបែបអាជីព។",
    level: "Professional"
  }
];