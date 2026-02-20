import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, Users, ShoppingCart, 
  ArrowUpRight, Activity, Zap, 
  ChevronRight, Database 
} from 'lucide-react';
import SuperAdminNav from './SuperAdminNav';

const Superdashboard = () => {
  // Animation Variants
  const containerVars = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVars = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const quickActions = [
    { name: "Product Registry", path: "/productupload", icon: Package, color: "bg-blue-600", desc: "Manage SKUs and stock levels" },
    { name: "User Directory", path: "/usermanagement", icon: Users, color: "bg-indigo-600", desc: "Control system access levels" },
    { name: "Order Tracking", path: "/orders", icon: ShoppingCart, color: "bg-emerald-600", desc: "Review customer transactions" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-blue-950 font-sans pb-20">
      <SuperAdminNav />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        
        {/* --- WELCOME SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">System Online</span>
          </div>
          <h1 className="text-4xl font-light tracking-tight">
            Control <span className="font-bold">Console</span>
          </h1>
          <p className="text-slate-500 mt-2">Welcome back, Administrator. Global systems are performing optimally.</p>
        </motion.div>

        {/* --- STATS GRID --- */}
        <motion.div 
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Revenue', val: '₹42.8k', change: '+12%', icon: Zap },
            { label: 'Active Users', val: '1,284', change: '+5%', icon: Activity },
            { label: 'Total Products', val: '452', change: 'Live', icon: Database },
            { label: 'Pending Orders', val: '18', change: 'High Priority', icon: ShoppingCart },
          ].map((stat, i) => (
            <motion.div variants={itemVars} key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-2xl text-blue-950">
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.val}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* --- QUICK ACTIONS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={14} className="text-blue-600" /> Operational Hub
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <Link key={i} to={action.path}>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-blue-950 p-6 rounded-[2rem] text-white relative overflow-hidden h-48 flex flex-col justify-end"
                  >
                    <div className="absolute top-6 right-6 p-3 bg-white/10 rounded-2xl backdrop-blur-md group-hover:bg-white group-hover:text-blue-950 transition-colors">
                      <action.icon size={24} />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-1">{action.name}</h3>
                      <p className="text-blue-200/60 text-xs mb-4">{action.desc}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Initialize <ChevronRight size={12} />
                      </div>
                    </div>
                    {/* Decorative Background Circles */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* --- SIDEBAR ACTIVITY --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm"
          >
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">System Logs</h2>
            <div className="space-y-8">
              {[
                { time: '2m ago', msg: 'New admin account provisioned', type: 'user' },
                { time: '14m ago', msg: 'iPhone 15 stock updated', type: 'stock' },
                { time: '1h ago', msg: 'Server maintenance completed', type: 'sys' },
                { time: '3h ago', msg: 'Bulk SKU export generated', type: 'data' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-[2px] h-10 bg-slate-100 mt-1 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-950" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-950 line-clamp-1">{log.msg}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              View All Logs <ArrowUpRight size={14} />
            </button>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default Superdashboard;