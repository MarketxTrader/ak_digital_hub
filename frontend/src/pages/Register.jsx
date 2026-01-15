import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // ១. ប្តូរ email មកជា username ឱ្យត្រូវតាម Google Sheet column
  const [formData, setFormData] = useState({
    name: '', 
    username: '', 
    password: ''
  });

  // កុំភ្លេចឆែកមើលថា URL នេះជា URL ចុងក្រោយដែលបានពីការ New Deployment ឬនៅ
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyXeOwoBFgXJ1kEpOjhvpw5x5N3XvhVuw_ZjApfaFDvudeHzgyg-qwFEAVNSN9Jkj9pRA/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // ប្រើ no-cors សម្រាប់ការចុះឈ្មោះធម្មតា (មិនត្រូវការ Response body)
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          id: "AK-" + Date.now(),
          action: "register" // ២. បន្ថែម action នេះដើម្បីឱ្យ Script ស្គាល់ថាជាការចុះឈ្មោះ
        })
      });

      alert("🎉 ចុះឈ្មោះជោគជ័យ! លោកអ្នកអាចចូលប្រើប្រាស់បានឥឡូវនេះ។");
      navigate('/login');
    } catch (error) {
      console.error("Error:", error);
      alert("មានបញ្ហាបច្ចេកទេស! សូមព្យាយាមម្តងទៀត។");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#1e293b] rounded-3xl p-8 border border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-2">បង្កើតគណនី</h2>
        <p className="text-slate-400 text-center mb-8">ចូលរួមជាមួយ AK DIGITAL HUB ឥឡូវនេះ</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-slate-300 text-sm mb-1 block ml-1">ឈ្មោះពេញ</label>
            <input 
              type="text" placeholder="បញ្ចូលឈ្មោះពេញ" required
              className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-amber-500 outline-none transition"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-1 block ml-1">ឈ្មោះអ្នកប្រើប្រាស់ (Username)</label>
            <input 
              type="text" placeholder="បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់" required
              className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-amber-500 outline-none transition"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-1 block ml-1">លេខសម្ងាត់</label>
            <input 
              type="password" placeholder="បញ្ចូលលេខសម្ងាត់" required
              className="w-full p-4 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-amber-500 outline-none transition"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-amber-500/20"
          >
            {loading ? "កំពុងដំណើរការ..." : "ចុះឈ្មោះឥឡូវនេះ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;