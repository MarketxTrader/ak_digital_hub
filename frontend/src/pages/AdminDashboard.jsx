import React, { useState, useEffect } from 'react';
import { Trash2, Search, CheckCircle, Clock, RefreshCw, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // ១. Function សម្រាប់ទាញទិន្នន័យសិស្សពី Backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/users");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.result === "success") {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("មិនអាចទាញទិន្នន័យបានទេ! សូមពិនិត្យមើលថាតើ Python Server បានបើកហើយឬនៅ?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ២. Function សម្រាប់បញ្ជាក់ការបង់ប្រាក់ (Approve Payment) - ហៅទៅកាន់ /admin/approve-payment
  const handleApprove = async (username) => {
    if (!window.confirm(`តើអ្នកចង់បញ្ជាក់ថា @${username} បានបង់ប្រាក់រួចរាល់មែនទេ?`)) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/approve-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username })
      });

      const data = await response.json();

      if (data.result === "success") {
        alert("ស្ថានភាពបង់ប្រាក់ត្រូវបានប្តូរទៅជា Paid!");
        // Update UI ភ្លាមៗក្នុង State ដើម្បីឱ្យប៊ូតុងបាត់ទៅ ហើយលោតសញ្ញាគ្រីពណ៌បៃតង
        setUsers(prevUsers => prevUsers.map(user => 
          user.username === username ? { ...user, payment: "Paid" } : user
        ));
      } else {
        alert("មានបញ្ហា៖ " + (data.message || "មិនអាច Update បានទេ"));
      }
    } catch (error) {
      console.error("Approve Error:", error);
      alert("មិនអាចតភ្ជាប់ទៅកាន់ Server បានទេ! សូមពិនិត្យមើល Route ក្នុង Python។");
    }
  };

  // ៣. Function សម្រាប់លុបសិស្ស (Delete User)
  const handleDelete = async (username) => {
    if (!window.confirm(`តើអ្នកពិតជាចង់លុបសិស្ស @${username} មែនទេ?`)) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username })
      });

      const data = await response.json();

      if (data.result === "success") {
        alert("លុបសិស្សបានជោគជ័យ!");
        setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
      } else {
        alert("ការលុបមិនបានសម្រេច៖ " + (data.message || "Error"));
      }
    } catch (error) {
      alert("មានបញ្ហាបច្ចេកទេស មិនអាចលុបបានទេ!");
    }
  };

  // ចម្រាញ់តាមការ Search
  const filteredUsers = users.filter(user => 
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.username?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-[#020617] min-h-screen text-white font-khmer">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-amber-500 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-400 font-medium">គ្រប់គ្រងបញ្ជីឈ្មោះសិស្ស និងការបង់ប្រាក់សរុប: {users.length} នាក់</p>
          </div>
          <button 
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 px-5 py-2.5 rounded-xl transition-all active:scale-95 border border-slate-700"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> {loading ? "Updating..." : "Update List"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="ស្វែងរកតាមឈ្មោះ ឬ Username..." 
            className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-amber-500 transition-all shadow-inner"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table List */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-5 font-bold">Student Info</th>
                  <th className="p-5 font-bold">Course Enrolled</th>
                  <th className="p-5 font-bold">Payment Status</th>
                  <th className="p-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <tr key={user.username} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3 font-khmer">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 font-bold border border-amber-500/20 group-hover:scale-105 transition-transform">
                          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200">{user.name}</p>
                          <p className="text-xs text-slate-500 tracking-wide">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-700 text-xs text-slate-300">
                        {user.course || "No Course"}
                      </span>
                    </td>
                    <td className="p-5">
                      {user.payment === "Paid" ? (
                        <div className="flex items-center gap-1.5 text-green-500 text-sm font-bold bg-green-500/5 w-fit px-3 py-1 rounded-full border border-green-500/10">
                          <CheckCircle size={14} /> Paid
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold bg-amber-500/5 w-fit px-3 py-1 rounded-full border border-amber-500/10">
                            <Clock size={14} /> {user.payment}
                          </div>
                          <button 
                            onClick={() => handleApprove(user.username)}
                            className="flex items-center gap-1 text-[10px] uppercase font-black bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded-md transition-all shadow-lg active:scale-90 font-khmer"
                            title="បញ្ជាក់ការបង់ប្រាក់"
                          >
                            <UserCheck size={12} /> Approve
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-5 text-center">
                      <button 
                        onClick={() => handleDelete(user.username)}
                        className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        title="លុបសិស្សចេញ"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-slate-500 italic font-khmer">
                      {loading ? "កំពុងទាញទិន្នន័យ..." : "រកមិនឃើញទិន្នន័យសិស្សឡើយ"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;