import { 
  Globe, TrendingUp, BarChart, Smartphone, 
  Wrench, ShieldCheck 
} from 'lucide-react';

// ១. បន្ថែម Export សម្រាប់ Courses (ដោះស្រាយ Error របស់អ្នក)
export const courses = [
  {
    id: 1,
    title: "Forex Masterclass: From Zero to Hero",
    category: "Forex Trading",
    price: 0.01,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1611974717484-2a62372f4477?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "UI/UX Design for Tech Startups",
    category: "Design",
    price: 89,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Full-Stack Web Development (React & Node)",
    category: "Web Tech",
    price: 150,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop"
  }
];

// ២. បន្ថែម Export សម្រាប់ Services
export const services = [
  {
    id: 1,
    title: "Custom Web Development",
    desc: "បង្កើតគេហទំព័រអាជីវកម្មទំនើប ដែលមានល្បឿនលឿន និងទាក់ទាញអតិថិជន។",
    price: "$299.00",
    icon: Globe 
  },
  {
    id: 2,
    title: "Trading Strategy Setup",
    desc: "រៀបចំប្រព័ន្ធជួញដូរ និងយុទ្ធសាស្ត្រ Risk Management សម្រាប់ Trader អាជីព។",
    price: "$150.00",
    icon: TrendingUp
  }
];

// ៣. បន្ថែម Export សម្រាប់ Tools
export const tools = [
  {
    id: 1,
    title: "Trading Journal Bot",
    desc: "ឧបករណ៍កត់ត្រាការជួញដូរដោយស្វ័យប្រវត្តិក្នុង Telegram។",
    status: "Free",
    icon: Wrench 
  }
];
export const tradingCourses = [
  {
    id: 't1',
    title: "Basic Forex Trading",
    price: 1.99,
    category: "Basic",
    desc: "យល់ដឹងពីមូលដ្ឋានគ្រឹះនៃទីផ្សារ Forex សម្រាប់អ្នកចាប់ផ្ដើមដំបូង។",
    level: "Free"
  },
  {
    id: 't2',
    title: "Advance Price Action",
    price: 29.99,
    category: "Advance",
    desc: "សិក្សាពីយុទ្ធសាស្ត្រចលនាតម្លៃ និងការគ្រប់គ្រងហានិភ័យកម្រិតខ្ពស់។",
    level: "Intermediate"
  },
  {
    id: 't3',
    title: "Professional Gold Scalping",
    price: 49.99,
    category: "Professional",
    desc: "បច្ចេកទេសវាយឆ្មក់យកប្រាក់ចំណេញលើមាស (XAUUSD) បែបអាជីព។",
    level: "Professional"
  }
];