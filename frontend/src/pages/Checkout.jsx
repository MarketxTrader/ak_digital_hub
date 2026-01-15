import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  CheckCircle2, 
  ArrowRight, 
  PartyPopper, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ១. ទទួលទិន្នន័យមេរៀន និងព័ត៌មានអ្នកប្រើប្រាស់
  const course = location.state?.selectedCourse || { 
    title: "មេរៀនពិសេស", 
    price: 0.01 
  };
  
  const user = JSON.parse(localStorage.getItem("user"));

  // States
  const [qrString, setQrString] = useState("");
  const [paymentHash, setPaymentHash] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(null);

  // អាសយដ្ឋាន Backend (Render) - ប្រាកដថាគ្មានសញ្ញា / នៅខាងចុង
  const BACKEND_URL = "https://ak-digital-hub.onrender.com";

  // ២. ទាញយក QR Code
  useEffect(() => {
    const fetchQR = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${BACKEND_URL}/api/generate-qr?amount=${course.price}`);
        
        if (!res.ok) throw new Error("មិនអាចបង្កើត QR បានទេ");
        
        const data = await res.json();
        if (data.qr_string && data.md5) {
          setQrString(data.qr_string);
          setPaymentHash(data.md5);
        }
      } catch (err) {
        setError("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server");
        console.error("Fetch QR Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (course.price) fetchQR();
  }, [course.price]);

  // ៣. ឆែកស្ថានភាពបង់ប្រាក់ (Polling)
  useEffect(() => {
    // បន្ថែមការ Check ឱ្យបានច្បាស់លាស់ ដើម្បីការពារ Error 404 (undefined)
    if (!paymentHash || paymentHash === "undefined" || isPaid) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/check-status/${paymentHash}`);
        
        if (res.status === 404) return; // បើរកមិនឃើញ Hash កុំទាន់ធ្វើអ្វី

        const data = await res.json();
        
        if (data.status === "PAID" || data.status?.responseCode === "000") {
          clearInterval(interval);
          handlePaymentSuccess();
        }
      } catch (err) {
        console.log("កំពុងរង់ចាំការបង់ប្រាក់...");
      }
    }, 5000); // ឆែករាល់ ៥ វិនាទី

    return () => clearInterval(interval);
  }, [paymentHash, isPaid]);

  // ៤. Logic នៅពេលបង់លុយជោគជ័យ
  const handlePaymentSuccess = async () => {
    try {
      // ផ្ញើទិន្នន័យទៅ Google Sheet តាមរយៈ Backend
      await fetch(`${BACKEND_URL}/api/update-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user?.username || "Unknown",
          course_name: course.title,
          amount: course.price
        })
      });

      // Update LocalStorage ភ្លាមៗ
      const updatedUser = { 
        ...user, 
        payment: 'Paid', 
        enrolled_course: course.title 
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsPaid(true);
    } catch (err) {
      console.error("Update Payment Error:", err);
      setIsPaid(true); 
    }
  };

  // --- UI បង់ប្រាក់ជោគជ័យ ---
  if (isPaid) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-khmer">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">ជោគជ័យ!</h2>
          <p className="text-slate-500 mb-8">ការបង់ប្រាក់ត្រូវបានបញ្ជាក់រួចរាល់។</p>
          <button 
            onClick={() => navigate('/profile')}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            ចូលរៀនឥឡូវនេះ <ArrowRight size={20} />
          </button>
          <PartyPopper className="absolute -bottom-4 -left-4 text-slate-100 w-24 h-24 opacity-20" />
        </motion.div>
      </div>
    );
  }

  // --- UI ទំព័រស្កេន QR Code ---
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 font-khmer">
      <div className="max-w-md w-full">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-8 border border-slate-800 shadow-2xl text-center">
          <div className="inline-flex items-center gap-2 text-amber-500 bg-amber-500/10 py-2 px-5 rounded-full mb-8 border border-amber-500/20 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} /> Secure KHQR Payment
          </div>

          <h2 className="text-2xl font-black mb-1 uppercase">Scan to Pay</h2>
          <p className="text-slate-400 text-sm mb-10">{course.title}</p>

          <div className="bg-white p-6 rounded-[2.5rem] inline-block mb-10 shadow-2xl">
            {loading ? (
              <div className="w-60 h-60 flex flex-col items-center justify-center text-slate-900 gap-4">
                <Loader2 className="animate-spin text-amber-500" size={40} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Generating QR...</span>
              </div>
            ) : error ? (
              <div className="w-60 h-60 flex flex-col items-center justify-center text-red-500 p-6">
                <AlertCircle size={40} className="mb-2" />
                <p className="text-xs font-bold">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-[10px] text-slate-400 underline">ព្យាយាមម្ដងទៀត</button>
              </div>
            ) : (
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrString)}`} 
                alt="Bakong KHQR" 
                className="w-60 h-60"
              />
            )}
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex items-center justify-between mb-8">
            <div className="text-left">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">ទឹកប្រាក់ត្រូវបង់</p>
              <p className="text-3xl font-black text-white">${course.price?.toFixed(2)}</p>
            </div>
            <img src="https://bakong.nbc.gov.kh/img/khqr-logo.png" alt="KHQR" className="h-8" />
          </div>

          <div className="flex items-center justify-center gap-3 text-slate-500 animate-pulse">
            <Loader2 size={14} className="animate-spin" />
            <span className="text-xs">រង់ចាំការបញ្ជាក់ដោយស្វ័យប្រវត្តិ...</span>
          </div>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="w-full mt-8 text-slate-500 hover:text-white text-sm transition-all"
        >
          បោះបង់ និងត្រឡប់ក្រោយ
        </button>
      </div>
    </div>
  );
};

export default Checkout;