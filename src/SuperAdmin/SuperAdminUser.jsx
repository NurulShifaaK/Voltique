import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, User, Shield, Search, MoreVertical, 
  AlertCircle, Loader2, X, UserPlus, Lock, Mail 
} from "lucide-react";
import SuperAdminNav from "./SuperAdminNav";

const SuperAdminUser = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/register`);
      setUsers(res.data.alluser || []);
      console.log(res.data.alluser)
    } catch (err) {
      console.error("Directory Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await axios.post(`${API}/register`, formData);
      setIsModalOpen(false);
      setFormData({ name: "", email: "", password: "", role: "USER" });
      fetchUsers();
      alert("Account provisioned successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create user");
    } finally {
      setFormLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


const deleteuser = async (id) => {
  const confirmDelete = window.confirm("Delete this user?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${API}/delete/${id}`);
    setUsers(prev => prev.filter(u => u._id !== id));
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen bg-slate-50 text-blue-950 font-sans pb-10">
      <SuperAdminNav />
      
      <div className="max-w-[1400px] mx-auto p-6 lg:p-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6"
        >
          <div>
            <h1 className="text-3xl font-light tracking-tight">
              User <span className="font-bold">Directory</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Identify and manage system access privileges.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span 
            onClick={() => setIsModalOpen(true)}
            className=" bg-blue-950 px-4 py-2 font-semibold text-white rounded-xl border border-slate-200 shadow-sm ">
            Add new User</span>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-2xl font-bold">{users.length}</span>
              <span className="text-xs text-slate-400 ml-2 font-semibold">Total Accounts</span>
            </div>
          </div>
        </motion.div>

        {/* Search & Utility Bar */}
        <div className="mb-8 flex justify-between items-center gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all shadow-sm"
            />
          </div>
         
        </div>

        {/* Data Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-blue-950" size={32} />
              <p className="text-sm font-medium text-slate-400">Fetching Access Logs...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Identify</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Authorization</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Date</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {filteredUsers.map((user, idx) => (
                      <motion.tr 
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.03 }}
                        className="hover:bg-blue-50/20 transition-all group"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-blue-950 text-white flex items-center justify-center text-xs font-bold rounded-xl shadow-inner group-hover:scale-110 transition-transform">
                              {user.name?.charAt(0) || <User size={14}/>}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-blue-950">{user.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                            user.role === "ADMIN" 
                              ? "bg-blue-950 text-white border-blue-950 shadow-md shadow-blue-900/10" 
                              : "bg-white text-slate-600 border-slate-200"
                          }`}>
                            {user.role === "ADMIN" ? <Shield size={10} /> : <User size={10} />}
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="text-xs text-slate-500 font-medium">
                            {new Date(user.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2">
                           
                           <button
  onClick={() => deleteuser(user._id)}
  className="p-2 text-red-950 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
  title="Delete User"
>
  <Trash2 size={16} />
</button>

                            <button 
                            //   onClick={() => setIsModalOpen(true)}
                              className="p-2 text-slate-300 hover:text-blue-950 hover:bg-slate-100 rounded-lg transition-all"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- CREATE USER SIDE-MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-xl font-bold text-blue-950">Provision Account</h2>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">New System Identity</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-6 flex-1">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/5 transition-all"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/5 transition-all"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Access Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      required
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/5 transition-all"
                      placeholder="Min. 8 characters"
                    />
                  </div>
                </div>

                {/* Role Toggle */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Privilege Level</label>
                  <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: "USER"})}
                      className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition-all ${formData.role === "USER" ? "bg-blue-950 shadow-sm text-white" : "text-slate-400"}`}
                    >
                      USER
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: "ADMIN"})}
                      className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition-all ${formData.role === "ADMIN" ? "bg-blue-950 text-white shadow-lg" : "text-slate-400"}`}
                    >
                    ADMIN
                    </button>
                  </div>
                </div>

                <button 
                  disabled={formLoading}
                  className="w-full bg-blue-950 text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  {formLoading ? <Loader2 size={16} className="animate-spin" /> : "PROVISION ACCOUNT"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuperAdminUser;