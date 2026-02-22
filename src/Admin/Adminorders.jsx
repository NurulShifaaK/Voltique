import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AdminNavbar from './AdminNavbar';
import { 
  ChevronDown, 
  MapPin, 
  Mail, 
  Phone,
  Clock,
  User,
  CreditCard,
  Loader2,
  Calendar,
  AlertCircle,
  PackageCheck
} from 'lucide-react';

const AdminOrders = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const statusOptions = ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

  const fetchAdminOrders = async () => {
    try {
      const res = await axios.get(`${API}/checkout`);
      
      // 1. Filter out entries with null products
      const allOrders = res.data.orders.filter(order => 
        order.products && order.products.some(p => p.product !== null)
      );

      // 2. Group by User ID
      const groups = allOrders.reduce((acc, order) => {
        const key = order.userid || order.shippingDetails.email; // Fallback to email for guests
        if (!acc[key]) {
          acc[key] = {
            userId: key,
            customer: order.shippingDetails,
            orders: []
          };
        }
        acc[key].orders.push(order);
        return acc;
      }, {});

      setGroupedOrders(Object.values(groups));
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdminOrders(); }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API}/checkout/${orderId}`, { status: newStatus });
      // Refresh data to reflect status change across the group
      fetchAdminOrders();
    } catch (err) {
      console.error(orderId, err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-950" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-blue-950 pb-20 font-sans">
      <AdminNavbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-12 max-w-[1500px] mx-auto"
      >
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Logistics Dispatch</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Customer-centric view grouping multiple orders per destination.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-blue-950 border-b border-slate-100">
                  <th className="px-8 py-5 text-[12px] font-medium text-white">Consignee & Destination</th>
                  <th className="px-8 py-5 text-[12px] font-medium text-white">Purchase History & Items</th>
                  <th className="px-8 py-5 text-[12px] font-medium text-white text-right">Status Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {groupedOrders.map((group, gIdx) => (
                  <tr key={gIdx} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Unified Address Box */}
                    <td className="px-8 py-10 align-top w-[400px]">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-800">{group.customer.firstname} {group.customer.lastname}</p>
                            <p className="text-[11px] text-slate-400 font-mono">UID: {group.userId.slice(-8)}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs text-slate-600 font-medium pl-1">
                           <p className="flex items-center gap-2"><Mail size={14} className="text-slate-300"/> {group.customer.email}</p>
                           <p className="flex items-center gap-2"><Phone size={14} className="text-slate-300"/> {group.customer.phoneno}</p>
                        </div>

                        <div className="text-[11px] text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                          <div className="flex gap-2 mb-2 text-blue-400 font-semibold uppercase text-[9px] tracking-wider">
                            <MapPin size={12} /> Shipping Label
                          </div>
                          <p><span className="text-slate-400">Street:</span> {group.customer.street}</p>
                          <p><span className="text-slate-400">City:</span> {group.customer.city}</p>
                          <p><span className="text-slate-400">State:</span> {group.customer.state} — {group.customer.pincode}</p>
                        </div>
                      </div>
                    </td>

                    {/* Grouped Products from all orders of this user */}
                    <td className="px-8 py-10 align-top">
                      <div className="space-y-6">
                        {group.orders.map((order, oIdx) => (
                          <div key={order._id} className="relative pl-6 border-l-2 border-slate-100 pb-2">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-blue-500" />
                            
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">
                                ORDER #{order._id.slice(-6).toUpperCase()}
                              </span>
                              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                                <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                              {order.products.filter(p => p.product !== null).map((item, pIdx) => (
                                <div key={pIdx} className="flex items-center gap-3 bg-white border border-slate-50 p-2 rounded-xl shadow-sm">
                                  <img 
                                    src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/150'} 
                                    className="w-10 h-10 rounded-lg object-cover border border-slate-100" 
                                    alt="" 
                                  />
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-slate-800">{item.product?.name}</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Qty: {item.quantity} · ₹{item.price.toLocaleString()}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-[11px] font-bold text-blue-900">
                               <p className="flex items-center gap-1"><CreditCard size={12} className="text-emerald-500"/> ₹{order.totalamount.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Individual Status Dropdowns per Order */}
                    <td className="px-8 py-10 align-top text-right">
                       <div className="flex flex-col gap-[76px] items-end">
                          {group.orders.map((order) => (
                            <div key={order._id} className="relative group">
                              <button className={`px-4 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2 border transition-all ${getStatusStyle(order.status)}`}>
                                {order.status} <ChevronDown size={12} />
                              </button>
                              <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50 transition-all p-1">
                                {statusOptions.map((opt) => (
                                  <button 
                                    key={opt}
                                    onClick={() => updateStatus(order._id, opt)}
                                    className="w-full text-left px-3 py-2 text-[11px] font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                       </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {groupedOrders.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-slate-300">
               <PackageCheck size={48} className="mb-4 opacity-20" />
               <p className="text-sm font-medium italic">No shipments registered in the system.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;