import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AdminNavbar from './AdminNavbar';
import { 
  ChevronDown, 
  MapPin, 
  Mail, 
  Phone,
  User,
  CreditCard,
  Loader2,
  Calendar,
  PackageCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const statusOptions = ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

  // ✅ FETCH ORDERS
  const fetchAdminOrders = async () => {
    try {
      const res = await axios.get(`${API}/checkout`);
      console.log(res.data.orders)
      const allOrders = res.data.orders || [];

      // Group orders by userId or email
      const groups = allOrders.reduce((acc, order) => {
        const key = order.userid || order.shippingDetails?.email;

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

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API}/checkout/status/${orderId}`, { status: newStatus });
      fetchAdminOrders();
    } catch (err) {
      console.error("Status Update Error:", err);
    }
  };

  // ✅ DELETE ORDER
  const deleteOrder = async (orderId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this order?");
      if (!confirmDelete) return;

      await axios.delete(`${API}/checkout/delete/${orderId}`);
      toast.success("deleted sucessfully")
      fetchAdminOrders();
    } catch (err) {
      console.error("Delete Error:", err);
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

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-950" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-blue-950 pb-20 font-sans">
      <AdminNavbar />

      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-12 max-w-[1500px] mx-auto"
      >
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Logistics Dispatch
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Customer-centric view grouping multiple orders per destination.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-[#8E7DBE] border-b border-slate-100">
                  <th className="px-8 py-5 text-[12px] font-medium text-white">
                    Consignee & Destination
                  </th>
                  <th className="px-8 py-5 text-[12px] font-medium text-white">
                    Purchase History & Items
                  </th>
                  <th className="px-8 py-5 text-[12px] font-medium text-white text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {groupedOrders.map((group, gIdx) => (
                  <tr key={gIdx} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Customer Info */}
                    <td className="px-8 py-10 align-top w-[400px]">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-800">
                              {group.customer?.firstname} {group.customer?.lastname}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono">
                              UID: {group.userId?.slice(-8)}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-slate-600">
                          <p><span className='text-black font-semibold'>Email:</span> {group.customer?.email}</p>
                          <p><span className='text-black font-semibold'>Mobile:</span>  {group.customer?.phoneno}</p>
                          <p><span className='text-black font-semibold'>Address:</span>  {group.customer?.street},{group.customer?.city}</p>
                          <p><span className='text-black font-semibold'>State:</span>  {group.customer?.state},<span className='text-black font-semibold'>Pincode:</span>  {group.customer?.pincode}</p>

                        </div>
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="px-8 py-10 align-top">
                      <div className="space-y-6">
                        {group.orders.map((order) => (
                          <div key={order._id} className="border-l-2 border-slate-100 pl-6">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded">
                                ORDER #{order._id.slice(-6).toUpperCase()}
                              </span>
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {order.products
                              ?.filter(p => p.product !== null)
                              .map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 mb-2">
                                  <img
                                    src={item.product?.images?.[0]?.url || "https://via.placeholder.com/150"}
                                    className="w-10 h-10 rounded-lg object-cover"
                                    alt=""
                                  />
                                  <div>
                                    <p className="text-xs font-semibold">
                                      {item.product?.name}
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                      Qty: {item.quantity} · ₹{item.price}
                                    </p>
                                  </div>
                                </div>
                              ))}

                            <p className="text-sm font-bold mt-2">
                              Total: ₹{order.totalamount}
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-10 align-top text-right">
                      <div className="flex flex-col gap-6 items-end">
                        {group.orders.map((order) => (
                          <div key={order._id} className="flex flex-col gap-2 items-end">

                            {/* Status Dropdown */}
                            <select
                              value={order.status}
                              onChange={(e) => updateStatus(order._id, e.target.value)}
                              className={`px-3 py-2 rounded-xl text-[12px] font-bold border ${getStatusStyle(order.status)}`}
                            >
                              {statusOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>

                            {/* Delete Button */}
                            <button
                              onClick={() => deleteOrder(order._id)}
                              className="px-4 py-2 rounded-xl text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 transition"
                            >
                              Delete Order
                            </button>

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
            <div className="py-24 flex flex-col items-center text-slate-300">
              <PackageCheck size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium italic">
                No shipments registered in the system.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;