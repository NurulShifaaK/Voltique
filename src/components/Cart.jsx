import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft, Lock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer"; // Assuming you have a Footer

const Cart = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const navigate = useNavigate();
  const [cart, setcart] = useState([]);
  const [loading, setLoading] = useState(true);

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    getallcart();
  }, []);

  const getallcart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/cart/${userid}`);
      setcart(res.data.cart.items || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleremovecart = async (productid) => {
    try {
      await axios.delete(`${API}/cart/${userid}/${productid}`);
      setcart((prev) => prev.filter(item => item.product?._id !== productid));
    } catch (err) {
      console.log(err);
      getallcart();
    }
  };

  const grandTotal = cart.reduce(
    (acc, item) => acc + ((item.product?.offerprice ?? item.product?.price ?? 0) * item.quantity),
    0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-900 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-gray-900 flex flex-col">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* --- LUXURY HERO SECTION --- */}
      <section className="relative h-[400px] bg-blue-950 flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <button 
            onClick={() => navigate(-1)}
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-4 flex items-center justify-center gap-2 mx-auto hover:text-white transition-colors"
          >
            <ChevronLeft size={14} /> Continue Shopping
          </button>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 italic text-white">
            Your Bag
          </h1>
          
          <div className="relative mx-auto group">
            <div className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4 text-white">
               <ShoppingBag className="text-blue-400" size={20} />
               <span className="text-sm font-medium tracking-wide">
                 {cart.filter(item => item.product).length} Premium items in your selection
               </span>
            </div>
          </div>
        </motion.div>
        
        {/* Large Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/5 -z-0 select-none uppercase">
          Cart
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 w-full flex-1">
        {cart.filter(item => item.product).length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-200"
          >
            <ShoppingBag size={80} className="mx-auto text-gray-100 mb-6" />
            <h2 className="text-2xl font-bold">Your bag is empty</h2>
            <p className="text-gray-500 mt-2 mb-10 text-sm font-medium">Looks like you haven't added any luxury pieces yet.</p>
            <button 
              onClick={() => navigate("/")}
              className="bg-blue-950 text-white px-12 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-blue-900/10"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Cart List */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-8 space-y-6">
              <AnimatePresence mode='popLayout'>
                {cart.filter(item => item.product).map((item) => (
                  <motion.div
                    key={item.product._id}
                    variants={itemVariants}
                    layout
                    className="group bg-gray-100/60 border border-gray-100 p-6 rounded-[2rem] flex flex-col sm:flex-row gap-8 items-center hover:shadow-xl hover:border-blue-50 transition-all duration-500"
                  >
                    {/* Image Container */}
                    <div className="w-32 h-32 bg-gray-50 rounded-2xl flex-shrink-0 p-4 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={item.product?.images?.[0]?.url || "/placeholder.png"}
                        alt={item.product?.name || "Product"}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 w-full min-w-0 bg-gray-100/50 p-4 rounded-2xl">
                      <div className="flex justify-between items-start ">
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase  mb-1">
                            {item.product?.category || "COLLECTION"}
                          </p>
                          <h3 className="text-xl font-semibold text-[#0A2540] truncate tracking-tight">
                            {item.product?.name || "Unnamed Product"}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleremovecart(item.product._id)}
                          className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-8">
                        <div className="flex items-center gap-6">
                           <div className="flex items-center  gap-3 bg-[#0A2540] text-white px-4 py-1.5 rounded-full shadow-md">
                             <span className="text-sm font-semibold uppercase opacity-60">Qty: </span>
                             <span className="text-sm ">{item.quantity}</span>
                           </div>
                           {/* <p className="text-xs text-gray-400 font-semibold italic">
                             ₹{((item.product?.offerprice ?? item.product?.price ?? 0)).toLocaleString()} <span className="not-italic">/ unit</span>
                           </p> */}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-[#0A2540]">
                            ₹ {((item.product?.offerprice ?? item.product?.price ?? 0) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-950 text-white p-10 rounded sticky top-28 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-8">
                   <div className="p-2 bg-gray-500 rounded-lg">
                      <ShieldCheck size={20} className="text-white" />
                   </div>
                   <h2 className="text-lg font-semibold tracking-tight">Order Summary</h2>
                </div>
                
                <div className="space-y-5 text-sm">
                  <div className="flex justify-between opacity-70 font-medium">
                    <span>Bag Subtotal</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="opacity-70">Shipping</span>
                    <span className="text-gray-300 font-bold uppercase text-[10px]">Complimentary</span>
                  </div>
                  <div className="flex justify-between opacity-70 font-medium">
                    <span>Estimated Taxes</span>
                    <span>₹0.00</span>
                  </div>
                  
                  <div className="h-[1px] bg-white/10 my-6" />
                  
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-semibold">Total Amount: </span>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-white">₹{grandTotal.toLocaleString()}</p>
                     
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-10 bg-white text-blue-950 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-[#0A2540] transition-all shadow-xl shadow-blue-900/20 group active:scale-[0.98]"
                >
                  <Lock size={18} /> CHECKOUT SECURELY <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                   <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Payment Partners</p>
                   <div className="flex gap-6 opacity-30 grayscale contrast-125">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                   </div>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;