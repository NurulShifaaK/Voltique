import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Minus, Plus, ShoppingBag, CreditCard, ChevronLeft, ShieldCheck, Truck, Star, Award, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Singelproduct = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const userid = localStorage.getItem("userid");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Product Details');
  const [increment, setincrement] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchsingleproduct = async () => {
      try {
        const res = await axios.get(`${API}/product/${id}`);
        setProduct(res.data.singleproduct);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchsingleproduct();
  }, [id]);

  const handleaddcart = async () => {
    try {

       if(!userid){
        navigate("/login");
        return;
      }
      
      await axios.post(`${API}/addtocart`, {
        sessionId: userid,
        productId: id,
        quantity: increment,
      });
     
      navigate("/cart");
      
    } catch (err) {
      console.log(err);
    }
  };

  // Professional Content for Tabs
  const tabContent = {
    'Product Details': (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-blue-900">
            <Award size={18} />
            <h4 className="text-sm font-bold uppercase tracking-wider">Technical Specifications</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Collection Category</span> 
              <span className="font-semibold text-gray-900">{product?.category}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Serial Reference</span> 
              <span className="font-semibold text-gray-900">#SDL-{product?._id?.slice(-8).toUpperCase()}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Material Composition</span> 
              <span className="font-semibold text-gray-900">Premium Grade Componentry</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Quality Assurance</span> 
              <span className="font-semibold text-green-600">Passed / Certified</span>
            </p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Design Notes</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            The {product?.name} is engineered for those who value both form and function. This piece undergoes a rigorous multi-point inspection to ensure it meets our standards of durability. Every curve and material choice in the {product?.category} line is purposeful, designed to provide a seamless user experience while maintaining a modern professional aesthetic.
          </p>
        </div>
      </motion.div>
    ),
    'Curation Story': (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl space-y-6"
      >
        <h3 className="text-2xl font-bold text-gray-900 leading-tight">A Commitment to Excellence</h3>
        <p className="text-base text-gray-600 leading-relaxed">
          At SDL, our curation process for the {product?.name} began with a simple question: "How can we elevate the daily experience?" We sourced this item specifically for its heritage and manufacturing integrity. 
        </p>
        <p className="text-base text-gray-600 leading-relaxed">
          The {product?.category} collection represents a bridge between traditional quality and contemporary needs. By selecting the {product?.name}, you aren't just purchasing a product; you are investing in a curated piece of design that has been vetted for excellence by our global procurement team.
        </p>
      </motion.div>
    ),
    'Reviews': (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {[
          { name: "Alexander V.", date: "Feb 12, 2026", text: "The build quality of this product is exceptional. It arrived in secure packaging and the performance matches the premium price point. Highly recommended for professionals." },
          { name: "Sarah Jenkins", date: "Jan 28, 2026", text: "The attention to detail on the {product?.name} is evident from the moment you unbox it. Fast shipping and excellent customer service from the SDL team." }
        ].map((rev, i) => (
          <div key={i} className="group border-b border-gray-100 pb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex text-yellow-500 mb-1">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{rev.name}</span>
                  <CheckCircle size={14} className="text-blue-500" />
                  <span className="text-xs text-blue-500 font-medium">Verified Purchase</span>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-400">{rev.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
              "{rev.text.replace("{product?.name}", product?.name)}"
            </p>
          </div>
        ))}
      </motion.div>
    )
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-blue-100">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-900 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
          {/* Animated Header Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-900 mb-10 transition-all group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Collection
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Image Gallery with Motion */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#fcfcfc] rounded-3xl p-12 aspect-square flex items-center justify-center relative overflow-hidden group border border-gray-50"
            >
              <img
                src={product?.images?.[0]?.url}
                alt={product?.name}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 right-6">
                <div className="bg-white/80 backdrop-blur-md border border-gray-100 px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-800">Quality Certified</span>
                </div>
              </div>
            </motion.div>

            {/* Content Staggering */}
            <div className="flex flex-col">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="border-b border-gray-100 pb-8"
              >
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-[0.2em] rounded mb-4">
                  {product?.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                  {product?.name}
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-gray-900">₹{product?.price?.toLocaleString()}</p>
                  <span className="text-sm text-gray-400 font-medium">VAT Included</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="py-8 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${product?.stock > 0 ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {product?.stock > 0 ? `Stock Available: ${product.stock} Units` : "Currently Unavailable"}
                  </span>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                  {product?.description}
                </p>
              </motion.div>

              {/* Quantity Selector */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-8 py-6 border-t border-gray-50"
              >
                <span className="text-xs font-black uppercase tracking-widest text-gray-900">Select Quantity</span>
                <div className="flex items-center border-2 border-gray-100 rounded-xl bg-white overflow-hidden">
                  <button onClick={() => setincrement(Math.max(1, increment - 1))} className="p-4 hover:bg-gray-50 transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="px-6 font-bold text-lg">{increment}</span>
                  <button onClick={() => setincrement(increment + 1)} className="p-4 hover:bg-gray-50 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
              >
                <button 
                  onClick={handleaddcart}
                  className="flex items-center justify-center gap-3 bg-blue-900 text-white py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98]"
                >
                  <ShoppingBag size={20} /> Add to Bag
                </button>
                {/* <button 
                  onClick={() => navigate("/checkout")}
                  className="flex items-center justify-center gap-3 border-2 border-gray-900 py-5 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all active:scale-[0.98]"
                >
                  <CreditCard size={20} /> Secure Checkout
                </button> */}
              </motion.div>

              {/* Professional Trust Badges */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 grid grid-cols-2 gap-6"
              >
                <div className="flex items-start gap-4">
                  <ShieldCheck size={28} className="text-blue-900 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold uppercase">Certified Warranty</h5>
                    <p className="text-[11px] text-gray-500 mt-1">24-month protection plan included with purchase.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Truck size={28} className="text-blue-900 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold uppercase">Priority Logistics</h5>
                    <p className="text-[11px] text-gray-500 mt-1">Insured expedited delivery to your doorstep.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Interactive Tabs Section */}
          <div className="mt-24 border-t border-gray-100 pt-16">
            <div className="flex gap-12 mb-12 border-b border-gray-50 overflow-x-auto no-scrollbar">
              {Object.keys(tabContent).map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold uppercase tracking-[0.2em] pb-6 relative transition-all ${activeTab === tab ? 'text-blue-900' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-900 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                <div key={activeTab}>
                  {tabContent[activeTab]}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Singelproduct;