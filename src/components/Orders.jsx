import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { 
  Package, CheckCircle, Clock, ChevronRight, 
  MapPin, ExternalLink, ShoppingBag, Receipt, Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Orders = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userid = localStorage.getItem("userid");

  const colors = {
    navy: "#0A2540",
    royal: "#3B82F6",
    bg: "#F5F7FA",
    border: "#E5E7EB",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/checkout/${userid}`);
        setOrders(res.data.orders);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (userid) fetchOrders();
  }, [userid]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "shipped": return "bg-blue-50 text-blue-700 border-blue-100";
      default: return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: colors.bg }}>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* --- LUXURY HERO SECTION (Product Page Style) --- */}
      <section className="relative h-[400px] bg-blue-950 flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <span className="text-[13px] font-bold uppercase tracking-[0.4em] text-blue-400/60 mb-4 block">
            Customer Dashboard
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 italic text-white">
            Your Journey
          </h1>
          
          <div className="relative mx-auto group">
            <div className="sm:w-[450px] px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4">
               <Package className="text-blue-400" size={20} />
               <span className="text-white/80 text-sm font-medium tracking-wide">
                 Managing {orders.length} active and past shipments
               </span>
            </div>
          </div>
        </motion.div>
        
        {/* Large Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/5 -z-0 select-none">
          ORDERS
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full">
        
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-black/20 shadow-sm">
            <ShoppingBag className="mx-auto mb-4 opacity-10" size={80} />
            <h3 className="text-xl font-bold">No orders yet</h3>
            <button 
              onClick={() => navigate("/products")}
              className="mt-6 bg-blue-950 text-white px-8 py-3 rounded-xl font-bold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order, idx) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                {/* Order Header */}
                <div className="px-8 py-6 bg-gray-200  flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-8 md:gap-12">
                    <div>
                      <p className="text-[12px] font-semibold text-gray-400 mb-1">Order Ref</p>
                      <p className="text-sm font-semibold">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-400 mb-1">Date</p>
                      <p className="text-sm font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-400 mb-1">Status</p>
                      <div className={`mt-1 px-3 py-0.5 rounded-full text-[10px] font-black border ${getStatusStyle(order.status)}`}>
                        {order.status?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Amount Paid</p>
                    <p className="text-xl text-[#0A2540]">₹{order.totalamount?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Products */}
                <div className="p-8 divide-y divide-gray-50">
                  {order.products.map((item, pIdx) => (
                    <div key={pIdx} className="py-6 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gray-50 p-3 border border-black/10 flex items-center justify-center">
                          <img src={item.product?.images?.[0]?.url} className="max-h-full object-contain mix-blend-multiply" alt="" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.product?.name}</h4>
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{item.product?.category} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <button onClick={() => navigate('/products')} className="p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-blue-950 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4 text-white/80">
                    <MapPin size={18} className="text-blue-400" />
                    <p className="text-xs font-medium">
                      Shipping to: <span className="text-white font-bold">{order.shippingDetails?.city}, {order.shippingDetails?.state}</span>
                    </p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                      <Receipt size={16} /> INVOICE
                    </button>
                    <button className="flex-1 md:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                      TRACKING <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;