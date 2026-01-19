import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, User, BookOpen, Search, 
  Loader2, Trash2, ShieldCheck, RefreshCw,
  Users, CreditCard, GraduationCap
} from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // សម្រាប់ស្វែងរក

  const BACKEND_URL = "https://ak-digital-hub.onrender.com";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/users`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // មុខងារចម្រាញ់ឈ្មោះសិស្សតាមការ Search
  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = async (username, courseName) => {
    if (!window.confirm(`តើអ្នកប្រាកដថាចង់ Approve ឱ្យ ${username} ចូលរៀនមែនទេ?`)) return;
    
    setProcessing(username);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/approve-student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, course_name: courseName })
      });
      
      if (res.ok) {
        fetchUsers(); 
      }
    } catch (err) {
      alert("មានបញ្ហាបច្ចេកទេស!");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-khmer pb-20">
      {/* Header Section */}
      <div className="bg-slate-900/50 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="text-amber-500" /> AK MANAGER <span className="text-amber-500 text-sm font-medium bg-amber-500/10 px-2 py-0.5 rounded">HUB</span>
            </h1>
            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">Control Panel & Student Management</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="ស្វែងរកឈ្មោះសិស្ស..."
                className="bg-slate-950 border border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={fetchUsers}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-2xl transition-all shadow-lg shadow-amber-500/10"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500"><Users size={24}/></div>
              <div><p className="text-slate-500 text-xs font-bold uppercase tracking-wider">សិស្សសរុប</p><p className="text-2xl font-black">{users.length}</p></div>
           </div>
           <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500"><CreditCard size={24}/></div>
              <div><p className="text-slate-500 text-xs font-bold uppercase tracking-wider">បង់រួច</p><p className="text-2xl font-black">{users.filter(u => u.payment === 'Paid').length}</p></div>
           </div>
           <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500"><GraduationCap size={24}/></div>
              <div><p className="text-slate-500 text-xs font-bold uppercase tracking-wider">រង់ចាំការបញ្ជាក់</p><p className="text-2xl font-black">{users.filter(u => u.payment !== 'Paid').length}</p></div>
           </div>
        </div>

        {/* User Table */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-5">សិស្ស</th>
                <th className="px-8 py-5">មេរៀន</th>
                <th className="px-8 py-5">ស្ថានភាព</th>
                <th className="px-8 py-5 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-amber-500 mb-2" />
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">កំពុងទាញទិន្នន័យ...</p>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((u, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white leading-none mb-1">{u.username}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">{u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen size={14} className="text-slate-500" />
                        <span className={u.enrolled_course !== 'None' ? 'text-slate-300' : 'text-slate-600 italic'}>
                          {u.enrolled_course || "មិនទាន់មាន"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        u.payment === 'Paid' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {u.payment === 'Paid' ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        {u.payment !== 'Paid' && (
                          <button
                            onClick={() => handleApprove(u.username, u.enrolled_course)}
                            disabled={processing === u.username}
                            className="bg-white text-slate-950 px-4 py-2 rounded-xl text-xs font-black hover:bg-amber-500 transition-all flex items-center gap-1 shadow-lg active:scale-95"
                          >
                            {processing === u.username ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                            APPROVE
                          </button>
                        )}
                        <button className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-slate-600 italic text-sm">រកមិនឃើញសិស្សដែលមានឈ្មោះនេះទេ...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;