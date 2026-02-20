import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  Clock,
  ChevronRight,
  Activity,
  Layers
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [data, setData] = useState({
    orders: [],
    users: [],
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [orderRes, userRes] = await Promise.all([
          axios.get(`${API}/checkout`),
          axios.get(`${API}/register`)
        ]);

        const orders = orderRes.data?.orders || [];
        const users = userRes.data?.alluser || [];
        const revenue = orders.reduce((acc, curr) => acc + (curr.totalamount || 0), 0);
        const pending = orders.filter(o => o.status === "Placed" || o.status === "Processing").length;

        setData({
          orders: orders.slice(0, 6), // Taking 6 for better grid filling
          users: users,
          totalRevenue: revenue,
          pendingOrders: pending
        });
      } catch (err) {
        console.error("Dashboard sync error:", err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Smooth transition
      }
    };
    fetchDashboardData();
  }, []);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-4"
      >
        <Layers className="text-blue-950" size={40} />
      </motion.div>
      <p className="text-blue-950 font-medium tracking-widest text-xs uppercase animate-pulse">Initializing Systems</p>
    </div>
  );

  const stats = [
    { label: 'Total Revenue', value: `₹${data.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12.5%', color: 'text-emerald-600' },
    { label: 'Active Orders', value: data.orders.length, icon: ShoppingBag, trend: '+5.2%', color: 'text-blue-600' },
    { label: 'Total Users', value: data.users.length, icon: Users, trend: '+18%', color: 'text-indigo-600' },
    { label: 'Pending Task', value: data.pendingOrders, icon: Clock, trend: 'High Priority', color: 'text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950 font-sans selection:bg-blue-100">
      <AdminNavbar />

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto p-6 lg:p-12"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <motion.div variants={itemVars}>
            <h1 className="text-4xl font-light tracking-tight text-blue-950">
              Console <span className="font-semibold">Overview</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-slate-500 text-sm font-medium">Live Server Metrics: {new Date().toLocaleDateString()}</p>
            </div>
          </motion.div>
          
          <motion.button 
            variants={itemVars}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-blue-950 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-900/20 transition-all"
          >
            <Activity size={18} />
            Generate Report
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVars}
              whileHover={{ y: -5 }}
              className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-950 group-hover:bg-blue-950 group-hover:text-white transition-all duration-300">
                  <stat.icon size={22} />
                </div>
                <span className={`text-[11px] font-bold px-2 py-1 rounded-md bg-slate-50 ${stat.color}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <h2 className="text-3xl font-bold tracking-tight text-blue-950">{stat.value}</h2>
              </div>
              {/* Subtle background decoration */}
              <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <stat.icon size={120} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Table */}
          <motion.div variants={itemVars} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-blue-950">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Recent Transactions</h3>
              <button className="text-white text-xs font-bold flex items-center gap-1 hover:underline">
                View All <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <tr>
                    <th className="px-8 py-4">Ref ID</th>
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Total</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {data.orders.map((order, idx) => (
                      <motion.tr 
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-blue-50/30 transition-colors cursor-default"
                      >
                        <td className="px-8 py-5 text-xs font-mono text-slate-400">#{order._id.slice(-6).toUpperCase()}</td>
                        <td className="px-8 py-5 text-sm font-semibold text-blue-950 capitalize">
                          {order.shippingDetails?.firstname || "Guest"}
                        </td>
                        <td className="px-8 py-5 text-sm font-medium">₹{order.totalamount}</td>
                        <td className="px-8 py-5">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                            order.status === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-blue-50 border-blue-100 text-blue-900'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* User List Panel */}
          <motion.div variants={itemVars} className="bg-black rounded-2xl p-8 text-white shadow-xl shadow-blue-950/20">
            <h3 className="text-sm font-bold  mb-8  opacity-80">User Enrollment</h3>
            <div className="space-y-7">
              {data.users.slice(0, 5).map((user) => (
                <div key={user._id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 text-white flex items-center justify-center text-xs font-bold rounded-xl group-hover:bg-blue-600 transition-colors">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-none">{user.name}</p>
                      <p className="text-[11px] text-blue-300/60 mt-1 font-mono truncate w-32">{user.email}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-blue-300/40" />
                </div>
              ))}
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-12 py-4 bg-white text-blue-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              Management Console
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;