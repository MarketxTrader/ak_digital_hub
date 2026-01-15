import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { 
  Loader2, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  PartyPopper, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ១. ទទួលទិន្នន័យមេរៀនពីមេរៀនដែលបានចុច (selectedCourse)
  // ប្រសិនបើគ្មានទិន្នន័យ វានឹងប្រើតម្លៃ Default ការពារការ Error ផ្ទាំងស
  const course = location.state?.selectedCourse || { 
    title: "មេរៀនពិសេស", 
    price: 0.01 
  };
  
  const user = JSON.parse(localStorage.getItem("user"));

  // States សម្រាប់គ្រប់គ្រងការបង់ប្រាក់
  const [qrString, setQrString] = useState("");
  const [paymentHash, setPaymentHash] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://127.0.0.1:8000";

  // ២. ការពារ៖ បើចូលមកដល់ទំព័រនេះដោយគ្មានមេរៀន ឱ្យត្រឡប់ទៅទំព័រ Courses វិញ
  useEffect(() => {
    if (!location.state?.selectedCourse) {
      console.warn("No course selected, redirecting...");
      // navigate('/courses'); // បើកបន្ទាត់នេះ បើអ្នកចង់ឱ្យវាដេញចេញពេលបាត់ Data
    }
  }, [location.state, navigate]);

  // ៣. ទាញយក QR Code ពី Backend តាមរយៈតម្លៃ Price នៃមេរៀន
  useEffect(() => {
    const fetchQR = async () => {
      try {
        setLoading(true);
        // បញ្ជូនតម្លៃ course.price ទៅកាន់ Backend
        const res = await fetch(`${BACKEND_URL}/generate-qr?amount=${course.price}`);
        if (!res.ok) throw new Error("មិនអាចបង្កើត QR បានទេ");
        
        const data = await res.json();
        setQrString(data.qr_string);
        setPaymentHash(data.md5);
      } catch (err) {
        setError("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server");
        console.error("Fetch QR Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (course.price) {
      fetchQR();
    }
  }, [course.price]);

  // ៤. ឆែកស្ថានភាពបង់ប្រាក់រាល់ ៥ វិនាទីម្តង (Polling)
  useEffect(() => {
    if (!paymentHash || isPaid) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/check-status/${paymentHash}`);
        const data = await res.json();
        
        if (data.status === "PAID") {
          clearInterval(interval);
          handlePaymentSuccess();
        }
      } catch (err) {
        console.log("កំពុងរង់ចាំការបង់ប្រាក់...");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [paymentHash, isPaid]);

  // ៥. Logic នៅពេលបង់លុយជោគជ័យ
  const handlePaymentSuccess = async () => {
    try {
      // ក. Update ទៅ Google Sheet ឬ Database តាមរយៈ Backend
      await fetch(`${BACKEND_URL}/update-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user?.username || "Unknown User",
          course_name: course.title,
          amount: course.price
        })
      });

      // ខ. Update LocalStorage ដើម្បីឱ្យ Profile ទាញទិន្នន័យបានភ្លាមៗ
      const updatedUser = { 
        ...user, 
        payment: 'Paid', 
        enrolled_course: course.title 
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsPaid(true);
    } catch (err) {
      console.error("Update Payment Error:", err);
      setIsPaid(true); // បង្ហាញ Success ទោះ Backend Error បន្តិចបន្តួច
    }
  };

  // --- ផ្នែក UI: នៅពេលបង់ប្រាក់រួចរាល់ ---
  if (isPaid) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-khmer">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
          >
            <CheckCircle2 size={40} />
          </motion.div>

          <h2 className="text-2xl font-black text-slate-900 mb-2">បង់ប្រាក់ជោគជ័យ!</h2>
          <p className="text-slate-500 mb-8 font-medium">មេរៀនរបស់អ្នកត្រូវបានបើកជូនឥឡូវនេះ</p>

          <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 text-left">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-1">
              <BookOpen size={14} /> Course Enrolled
            </div>
            <div className="text-lg font-bold text-slate-800 leading-tight">{course.title}</div>
          </div>

          <button 
            onClick={() => navigate('/profile')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
          >
            ចូលទៅកាន់មេរៀន <ArrowRight size={20} />
          </button>
          <PartyPopper className="absolute -bottom-6 -right-6 text-slate-100 w-32 h-32 opacity-20" />
        </motion.div>
      </div>
    );
  }

  // --- ផ្នែក UI: បង្ហាញ QR Code សម្រាប់ស្កេន ---
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 font-khmer">
      <div className="max-w-md w-full">
        <div className="bg-[#1e293b] rounded-[2.5rem] p-8 border border-slate-700 shadow-2xl text-center">
          
          <div className="flex items-center justify-center gap-2 mb-6 text-amber-500 bg-amber-500/10 py-1.5 px-4 rounded-full w-fit mx-auto border border-amber-500/20">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
          </div>

          <h2 className="text-xl font-bold mb-1 uppercase tracking-tight">Scan to Pay</h2>
          <p className="text-slate-400 text-sm mb-8 line-clamp-1">{course.title}</p>

          {/* QR Code Container */}
          <div className="bg-white p-5 rounded-[2rem] inline-block shadow-inner mb-6 relative group">
            {loading ? (
              <div className="w-60 h-60 flex flex-col items-center justify-center text-slate-900 gap-3">
                <Loader2 className="animate-spin text-amber-500" size={35} />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Generating QR...</p>
              </div>
            ) : error ? (
              <div className="w-60 h-60 flex flex-col items-center justify-center text-red-500 gap-2 p-4">
                <AlertCircle size={30} />
                <p className="text-xs font-bold">{error}</p>
                <button onClick={() => window.location.reload()} className="text-[10px] underline mt-2 text-slate-400">ព្យាយាមម្ដងទៀត</button>
              </div>
            ) : (
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrString)}`} 
                alt="KHQR Code" 
                className="w-60 h-60"
              />
            )}
          </div>

          {/* Price Tag */}
          <div className="flex items-center justify-between bg-slate-900/40 p-5 rounded-2xl border border-slate-700 mb-6">
            <div className="text-left">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Total Amount</p>
              <p className="text-2xl font-black text-amber-500">
                ${course.price ? course.price.toFixed(2) : "0.00"}
              </p>
            </div>
            <img src="https://bakong.nbc.gov.kh/img/khqr-logo.png" alt="KHQR" className="h-7" />
          </div>

          {/* Polling Indicator */}
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <Loader2 className="animate-spin text-slate-500" size={14} />
            <p className="text-[11px] tracking-wide italic">កំពុងរង់ចាំការបញ្ជាក់ពីធនាគារ...</p>
          </div>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="w-full mt-6 text-slate-500 hover:text-white text-xs transition-colors font-medium"
        >
          បោះបង់ការបង់ប្រាក់ និងត្រឡប់ក្រោយ
        </button>
      </div>
    </div>
  );
};

export default Checkout;