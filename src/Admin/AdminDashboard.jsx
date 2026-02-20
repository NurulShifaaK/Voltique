import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  Package, 
  Clock,
  ChevronRight,
  Activity
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const API ="https://app-product-qh1f.onrender.com/api/v1"
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
        console.log("Order API full response:", orderRes);
console.log("Order API data:", orderRes.data);
console.log("User API data:", userRes.data);

        const orders = orderRes.data.orders;
        const revenue = orders.reduce((acc, curr) => acc + curr.totalamount, 0);
        const pending = orders.filter(o => o.status === "Placed" || o.status === "Processing").length;

        setData({
          orders: orders.slice(0, 5), // Latest 5
          users: userRes.data.alluser,
          totalRevenue: revenue,
          pendingOrders: pending
        });
      } catch (err) {
        console.error("Dashboard sync error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Animation Settings
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full"
      />
    </div>
  );

  const stats = [
    { label: 'Total Revenue', value: `₹${data.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12%' },
    { label: 'Total Orders', value: data.orders.length, icon: ShoppingBag, trend: '+5%' },
    { label: 'Registered Users', value: data.users.length, icon: Users, trend: '+18%' },
    { label: 'Pending Fulfillment', value: data.pendingOrders, icon: Clock, trend: 'Action Req' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black">
      <AdminNavbar />

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="max-w-[1600px] mx-auto p-6 md:p-10"
      >
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <motion.div variants={itemVars}>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Executive Overview</h1>
            <p className="text-gray-400 text-sm font-medium">Real-time system telemetry and commercial data.</p>
          </motion.div>
          <motion.div variants={itemVars} className="hidden md:block">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-black text-white px-4 py-2 rounded-full">
              <Activity size={14} /> System Live
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVars}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm relative overflow-hidden group"
            >
              <div className="flex justify-between items-start relative z-10">
                <div className="bg-gray-50 p-3 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.trend}</span>
              </div>
              <div className="mt-6 relative z-10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h2 className="text-3xl font-light mt-1 tracking-tighter">{stat.value}</h2>
              </div>
              <div className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-gray-100 transition-colors">
                <stat.icon size={100} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Orders Table Preview */}
          <motion.div variants={itemVars} className="lg:col-span-2 bg-white border border-gray-200 rounded-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest">Recent Transactions</h3>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-bold uppercase text-gray-400">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-gray-400">#{order._id.slice(-6)}</td>
                      <td className="px-6 py-4 text-xs font-bold uppercase">{order.shippingDetails.firstname}</td>
                      <td className="px-6 py-4 text-xs font-medium">₹{order.totalamount}</td>
                      <td className="px-6 py-4">
                        <span className="text-[9px] font-black uppercase border border-black px-2 py-0.5">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* User List Preview */}
          <motion.div variants={itemVars} className="bg-white border border-gray-200 rounded-sm p-6">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6">User Enrollment</h3>
            <div className="space-y-6">
              {data.users.slice(0, 4).map((user) => (
                <div key={user._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-[10px] font-bold rounded-full">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase leading-none">{user.name}</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-mono">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-300 uppercase font-bold">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 border border-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              Manage All Users
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;