import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { 
  Package, ChevronRight, MapPin, ExternalLink, 
  ShoppingBag, Receipt, Calendar, CreditCard, AlertCircle
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


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/checkout/${userid}`);
      
        // const allOrders = res.data.orders || [];
        console.log(res.data.orders)
        // const cleanOrders = allOrders.filter(order => 
        //   order.products && order.products.some(item => item.product !== null)
        // );

        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (userid) fetchOrders();
  }, [userid]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-emerald-50 text-emerald-600";
      case "shipped": return "bg-purple-50 text-[#8E7DBE]";
      default: return "bg-gray-50 text-gray-500";
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-gray-100 border-t-[#8E7DBE] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col text-[#1a1a1a]">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* --- LUXURY HERO SECTION --- */}
      <section className="relative h-[350px] bg-[#8E7DBE] flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/70 mb-4 block">
            Archive & Logistics
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4 italic text-white">
            Your Orders
          </h1>
          <p className="text-white/60 text-xs uppercase tracking-widest font-medium">
            Reviewing {orders.length} curated acquisitions
          </p>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/10 -z-0 select-none uppercase">
          HISTORY
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex-1 w-full">
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-10 "
          >
            <ShoppingBag className="mx-auto mb-6  text-gray-100" size={60} />
            <h3 className="text-2xl font-light italic mb-8">No valid orders found</h3>
            <p className="text-gray-400 text-sm mb-10">Any orders containing only deleted products are hidden.</p>
            <button 
              onClick={() => navigate("/products")}
              className="bg-[#8E7DBE] text-white px-10 py-4 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all"
            >
              Explore Collection
            </button>
          </motion.div>
        ) : (
          <div className="space-y-24">
            {orders.map((order) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                {/* Order Meta Header */}
                <div className="flex flex-col md:flex-row bg-[#8E7DBE] px-7 py-2 rounded justify-between items-end border-b border-gray-100 pb-6 mb-8 gap-4">
                  <div className="flex flex-wrap gap-8 md:gap-16">
                    <div>
                      <p className="text-[9px] font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Package size={10} /> Reference
                      </p>
                      <p className="text-sm font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Calendar size={10} /> Placed On
                      </p>
                      <p className="text-sm font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white uppercase tracking-widest mb-2">Delivery Status</p>
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter ${getStatusStyle(order.status)}`}>
                        {order.status || "Processing"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-white uppercase tracking-widest mb-1 flex items-center justify-end gap-1.5">
                      <CreditCard size={10} /> Investment
                    </p>
                    <p className="text-2xl font-light italic text-[#8E7DBE]">₹{order.totalamount?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {order.products.map((item, pIdx) => {
                    // CRITICAL: If the product was deleted from DB, skip rendering it
                    if (!item.product) return null;

                    return (
                      <div key={pIdx} className="flex items-center gap-6 bg-[#fcfcfc] p-4 rounded-sm border border-transparent hover:border-gray-100 transition-colors">
                        <div className="w-24 h-24 bg-white flex-shrink-0 flex items-center justify-center p-4 border border-gray-50">
                          <img 
                            src={item.product?.images?.[0]?.url || "/placeholder.png"} 
                            className="max-h-full object-contain mix-blend-multiply" 
                            alt={item.product?.name} 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{item.product?.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                            {item.product?.category} • Qty {item.quantity}
                          </p>
                          <button 
                            onClick={() => navigate(`/singleproduct/${item.product?._id}`)}
                            className="text-[10px] font-bold text-[#8E7DBE] uppercase tracking-widest flex items-center gap-1 hover:text-black transition-colors"
                          >
                            View Piece <ExternalLink size={10} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-gray-50/50 p-6 rounded-sm">
                  <div className="flex items-center gap-3 text-gray-500">
                    <MapPin size={14} className="text-[#8E7DBE]" />
                    <p className="text-[11px] font-medium tracking-tight">
                      Destination: <span className="text-black">{order.shippingDetails?.city}, {order.shippingDetails?.state}</span>
                    </p>
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-6 py-3 border border-gray-200 hover:bg-black hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2">
                      <Receipt size={14} /> Invoice
                    </button>
                    <button className="flex-1 sm:flex-none px-8 py-3 bg-[#8E7DBE] text-white hover:bg-[#8E7DBE] text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2">
                      Track Order <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Orders;