import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { ChevronDown, MapPin, Mail, Package } from 'lucide-react';

const Adminorders = () => {
     const API = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      await axios.put(`http://localhost:3000/api/v1/checkout/${orderId}`, { status: newStatus });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("Error updating registry.");
    }
  };

  const statusOptions = ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-black font-sans">
      <AdminNavbar />
      <div className="p-6 md:p-12 max-w-[1500px] mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">Logistics Command</h1>
          <p className="text-gray-400 text-sm">Real-time order processing and shipment tracking.</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-400 text-white">
                <th className="px-6 py-4 text-[10px]  uppercase tracking-widest">Manifest</th>
                <th className="px-6 py-4 text-[10px]  uppercase tracking-widest">Destination</th>
                <th className="px-6 py-4 text-[10px]  uppercase tracking-widest">Valuation</th>
                <th className="px-6 py-4 text-[10px]  uppercase tracking-widest text-right">Registry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 align-top">
                    <div className="space-y-4">
                      {order.products.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-14 h-14 bg-gray-50 border border-gray-200 grayscale contrast-125">
                            <img src={item.product?.images?.[0]?.url} className="w-full h-full object-cover" alt="sku" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase leading-tight">{item.product?.name}</p>
                            <p className="text-[10px] text-gray-400 mt-1">QTY: {item.quantity} | SKU: {item.product?._id.slice(-6)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-6 align-top">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-semibold uppercase">{order.shippingDetails.firstname} {order.shippingDetails.lastname}</p>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <Mail size={12} className="text-black" /> {order.shippingDetails.email}
                      </div>
                      <div className="flex items-start gap-2 text-[11px] text-gray-400 mt-2">
                        <MapPin size={12} className="text-black shrink-0" />
                        <span className="leading-relaxed">{order.shippingDetails.street}, {order.shippingDetails.city}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-6 align-top">
                    <p className="text-lg  tracking-tighter">₹{order.totalamount.toLocaleString()}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-1">TXN_{order._id.toUpperCase().slice(-10)}</p>
                  </td>

                  <td className="px-6 py-6 align-top text-right">
                    <div className="relative group inline-block text-left">
                      <button className="bg-white  px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-black hover:text-white transition-all">
                        {order.status} <ChevronDown size={14} />
                      </button>
                      
                      <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50 transition-all">
                        {statusOptions.map((opt) => (
                          <button 
                            key={opt}
                            onClick={() => updateStatus(order._id, opt)}
                            className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase hover:bg-gray-100 border-b last:border-0 border-gray-100"
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
      </div>
    </div>
  );
};

export default Adminorders;