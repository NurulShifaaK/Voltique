import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNavbar from './AdminNavbar';
import { 
  ChevronDown, 
  MapPin, 
  Mail, 
  Package, 
  Search, 
  Filter,
  ExternalLink,
  Loader2
} from 'lucide-react';

const AdminOrders = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const statusOptions = ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

  const fetchAdminOrders = async () => {
    try {
      const res = await axios.get(`${API}/checkout`);
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdminOrders(); }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API}/checkout/${orderId}`, { status: newStatus });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("System Registry Error: Unable to sync status.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-950" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white/70 text-blue-950 font-sans pb-20">
      <AdminNavbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-10 lg:p-14 max-w-[1600px] mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight">
              Logistics <span className="font-bold">Control</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Managing {orders.length} active shipments in the registry.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search Manifest ID..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/5 transition-all"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Orders Container */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-950 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Products & SKU</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Shipping Destination</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Financials</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">Status Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-8 py-6 align-top">
                      <div className="flex flex-col gap-4 max-w-xs">
                        {order.products.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                              <img src={item.product?.images?.[0]?.url} className="w-full h-full object-cover" alt="sku" />
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-bold text-blue-950 truncate">{item.product?.name}</p>
                              <p className="text-[10px] text-slate-400 font-medium">QTY: {item.quantity} · ID: {item.product?._id.slice(-4)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="px-8 py-6 align-top">
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-blue-950 mb-1">{order.shippingDetails.firstname} {order.shippingDetails.lastname}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <Mail size={13} /> {order.shippingDetails.email}
                        </div>
                        <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <MapPin size={13} className="shrink-0 mt-0.5" />
                          <span>{order.shippingDetails.street}, {order.shippingDetails.city}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6 align-top">
                      <p className="text-lg font-bold text-blue-950">₹{order.totalamount.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-1">
                        <ExternalLink size={10} /> ID_{order._id.slice(-8).toUpperCase()}
                      </p>
                    </td>

                    <td className="px-8 py-6 align-top text-right">
                      <div className="relative group inline-block text-left">
                        <button className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 border transition-all ${getStatusStyle(order.status)}`}>
                          {order.status} <ChevronDown size={14} />
                        </button>
                        
                        <div className="absolute right-0 mt-2 w-48 bg-blue-950 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50 transition-all border border-white/10 p-1">
                          {statusOptions.map((opt) => (
                            <button 
                              key={opt}
                              onClick={() => updateStatus(order._id, opt)}
                              className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-slate-100">
            {orders.map((order) => (
              <div key={order._id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-base font-bold text-blue-950">{order.shippingDetails.firstname} {order.shippingDetails.lastname}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="space-y-3 mb-4 bg-slate-50 p-3 rounded-xl">
                   {order.products.map((item, idx) => (
                     <div key={idx} className="flex justify-between text-xs">
                        <span className="font-medium text-slate-600">{item.product?.name} x{item.quantity}</span>
                        <span className="text-slate-400">SKU: {item.product?._id.slice(-4)}</span>
                     </div>
                   ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                   <p className="text-xl font-bold text-blue-950">₹{order.totalamount.toLocaleString()}</p>
                   <div className="relative group">
                      <button className="flex items-center gap-2 text-xs font-bold text-blue-600">
                        Update Registry <ChevronDown size={14} />
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 w-44 bg-blue-950 rounded-lg shadow-xl hidden group-focus-within:block p-1 z-10">
                         {statusOptions.map(opt => (
                           <button 
                            key={opt}
                            onClick={() => updateStatus(order._id, opt)}
                            className="w-full text-left px-4 py-2 text-[10px] text-white uppercase font-bold hover:bg-white/10"
                           >
                            {opt}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;