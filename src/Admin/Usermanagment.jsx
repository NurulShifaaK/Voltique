import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, User, Shield, Search, MoreVertical, AlertCircle, Loader2 } from "lucide-react";
import AdminNavbar from "./AdminNavbar";

const Usermanagement = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/register`);
      setUsers(res.data.alluser || []);
    } catch (err) {
      console.error("Directory Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => { fetchUsers(); }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950 font-sans pb-10">
      <AdminNavbar />
      
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
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Registry</span>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-2xl font-bold">{users.length}</span>
              <span className="text-xs text-slate-400 ml-2 font-semibold">Total Accounts</span>
            </div>
          </div>
        </motion.div>

        {/* Search & Utility Bar */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all shadow-sm"
          />
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
                <thead className="bg-blue-950 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Identify</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Authorization</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Date</th>
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
                       
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center">
                  <AlertCircle className="text-slate-200 mb-2" size={40} />
                  <p className="text-sm text-slate-400 font-medium">No system matches found for your query.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usermanagement;