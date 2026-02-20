
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Package, Truck, CheckCircle, Clock, ChevronRight, MapPin, ExternalLink, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
        setOrders(res.data.orders);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (userid) fetchOrders();
  }, [userid]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-green-50 text-green-700 border-green-100";
      case "processing": return "bg-blue-50 text-blue-700 border-blue-100";
      case "placed": return "bg-amber-50 text-amber-700 border-amber-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-semibold tracking-wide">Securing your order history...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFCFE] min-h-screen font-sans text-gray-900">
      <Navbar />
      
      <main className="max-w-5xl mt-5 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Purchase History</h2>
          <p className="text-gray-500 mt-2 font-medium">Track, manage and download invoices for your curated items.</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-blue-950" size={32} />
            </div>
            <h3 className="text-xl font-bold">No orders found</h3>
            <p className="text-gray-500 mt-2 mb-8">It looks like you haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate("/products")}
              className="bg-blue-950 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-all shadow-lg shadow-blue-600/20"
            >
              Start Exploring
            </button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {orders.map((order) => (
              <motion.div 
                key={order._id} 
                variants={itemVariants}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden"
              >
                {/* Header Section */}
                <div className="bg-blue-950 px-6 py-5 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                  <div className="flex flex-wrap gap-6 sm:gap-10">
                    <div>
                      <p className="text-sm font-bold text-white  mb-1">Ref Number</p>
                      <p className="text-xs font-semibold text-white/80 font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white  mb-1">Placed On</p>
                      <p className="text-xs font-semibold text-white/80 font-mono">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white  mb-1">Total Paid</p>
                      <p className="text-xs font-semibold text-white/80 font-mono">₹{order.totalamount?.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-wider ${getStatusStyle(order.status)}`}>
                    {order.status?.toLowerCase() === "delivered" ? <CheckCircle size={14} /> : <Clock size={14} className="animate-pulse" />}
                    {order.status?.toUpperCase()}
                  </div>
                </div>

                {/* Product Section */}
                <div className="p-6 space-y-6">
                  {order.products.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 last:pb-0 border-b last:border-0 border-gray-50">
                      <div className="flex gap-5 items-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 p-2 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img 
                            src={item.product?.images?.[0]?.url || "https://via.placeholder.com/150"} 
                            alt={item.product?.name}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                            {item.product?.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[11px] font-bold text-blue-950 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                              {item.product?.category}
                            </span>
                            <span className="text-xs font-semibold text-gray-400">Quantity: {item.quantity}</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mt-2">₹{item.price?.toLocaleString()}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigate(`/products`)}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
                      >
                        Buy Again <ExternalLink size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tracking/Address Footer */}
                <div className="bg-gray-300/50 px-6 py-5 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 gap-6">
                  <div className="flex items-start gap-4 w-full">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100 flex-shrink-0">
                      <MapPin className="text-blue-600" size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Delivery Destination</p>
                      <p className="text-sm text-gray-600 font-medium truncate">
                        {order.shippingDetails?.firstname} {order.shippingDetails?.lastname} • {order.shippingDetails?.street}, {order.shippingDetails?.city}
                      </p>
                    </div>
                  </div>
                  
                  <button className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-gray-900/10">
                    Track Shipment
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Orders;