import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { 
  Minus, Plus, ShoppingBag, Share2, ChevronLeft, 
  ShieldCheck, Truck, Star, Award, CheckCircle, 
  Scissors, Heart, Ruler 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Singelproduct = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const userid = localStorage.getItem("userid");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Fabric & Fit');
  const [increment, setincrement] = useState(1);
  const navigate = useNavigate();

  // Primary Theme Color
  const primaryColor = "#8E7DBE";

  useEffect(() => {
    const fetchsingleproduct = async () => {
      try {
        const res = await axios.get(`${API}/product/${id}`);
        // Ensure this matches your backend response key
        setProduct(res.data.product || res.data.singleproduct);
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
      if (!userid) {
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

  const handleShare = async () => {
    try {
      const shareData = {
        title: product?.name,
        text: `Explore this elegant design: ${product?.name} at SDL Abaya Boutique`,
        url: window.location.href
      };
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Boutique link copied!");
      }
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  const tabContent = {
    'Fabric & Fit': (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-2" style={{ color: primaryColor }}>
            <Scissors size={18} />
            <h4 className="text-sm font-bold uppercase tracking-wider">Craftsmanship Details</h4>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Collection</span> 
              <span className="font-semibold text-gray-900">{product?.category}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Fabric Type</span> 
              <span className="font-semibold text-gray-900">Premium Nida / Lexington</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Design ID</span> 
              <span className="font-semibold text-gray-900">AB-{product?._id?.slice(-5).toUpperCase()}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Workmanship</span> 
              <span className="font-semibold" style={{ color: primaryColor }}>Hand-Finished</span>
            </p>
          </div>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Ruler size={16} className="text-slate-400" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Sizing Guide</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our {product?.name} is tailored for a modest, fluid silhouette. We recommend selecting based on your height (52-60). This specific {product?.category} cut features a refined drape that complements all body types while maintaining traditional modesty standards.
          </p>
        </div>
      </motion.div>
    ),
    'Boutique Story': (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl space-y-6"
      >
        <h3 className="text-3xl font-serif italic text-gray-900">An Intersection of Modesty & Luxury</h3>
        <p className="text-base text-gray-600 leading-relaxed">
          The {product?.name} represents our commitment to the modern Muslimah. Sourced from the finest textile mills, this garment undergoes a 12-point quality check to ensure the embroidery, stitching, and hemline meet luxury boutique standards.
        </p>
        <p className="text-base text-gray-600 leading-relaxed">
          Every Abaya in our {product?.category} line is designed with the intention of longevity. We believe in "Slow Fashion"—creating pieces that remain timeless staples in your wardrobe for years to come.
        </p>
      </motion.div>
    ),
    'Appreciations': (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {[
          { name: "Mariam K.", date: "Feb 15, 2026", text: "The fabric of this Abaya is heavenly. It doesn't crease easily and the drape is very elegant. Perfect for formal occasions." },
          { name: "Fatima Shah", date: "Jan 30, 2026", text: "Truly impressed by the SDL quality. The black is deep and rich, and the sizing is spot on. Will definitely order from this collection again." }
        ].map((rev, i) => (
          <div key={i} className="group border-b border-gray-100 pb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex mb-1" style={{ color: primaryColor }}>
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{rev.name}</span>
                  <CheckCircle size={14} className="text-blue-500" />
                  <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">Verified Client</span>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-400">{rev.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "{rev.text}"
            </p>
          </div>
        ))}
      </motion.div>
    )
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-[#8E7DBE]/20">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-12 h-12 border-2 border-slate-100 border-t-[#8E7DBE] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
          <motion.button 
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#8E7DBE] mb-10 transition-all group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Boutique
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#F9F8FB] rounded-[3rem] p-8 md:p-16 aspect-[3/4] flex items-center justify-center relative overflow-hidden group border border-slate-100 shadow-inner"
            >
              <img
                src={product?.images?.[0]?.url}
                alt={product?.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute bottom-8 left-8">
                <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-[#8E7DBE]/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: primaryColor }}>Lux Quality</span>
                </div>
              </div>
            </motion.div>

            {/* Product Info Section */}
            <div className="flex flex-col pt-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="border-b border-gray-100 pb-8"
              >
                <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                  {product?.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-serif italic font-medium text-gray-900 tracking-tight mb-6">
                  {product?.name}
                </h1>
                <div className="flex items-baseline gap-4">
                  <p className="text-4xl font-light text-gray-900">₹{product?.price?.toLocaleString()}</p>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Inclusive of all taxes</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="py-10 space-y-8"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: product?.stock > 0 ? '#10B981' : '#EF4444' }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    {product?.stock > 0 ? `Ready to Ship: ${product.stock} Designs left` : "Out of Stock"}
                  </span>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed font-light italic">
                  "{product?.description}"
                </p>
              </motion.div>

              {/* Quantity Selection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-10 py-8 border-t border-slate-50"
              >
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">Quantity</span>
                <div className="flex items-center border border-slate-200 rounded-full bg-white px-2 py-1">
                  <button onClick={() => setincrement(Math.max(1, increment - 1))} className="p-3 hover:text-[#8E7DBE] transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="px-6 font-bold text-base min-w-[50px] text-center">{increment}</span>
                  <button onClick={() => setincrement(increment + 1)} className="p-3 hover:text-[#8E7DBE] transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-4"
              >
                <button 
                  onClick={handleaddcart}
                  style={{ backgroundColor: primaryColor }}
                  className="sm:col-span-4 flex items-center justify-center gap-3 text-white py-5 rounded-[2rem] font-bold uppercase text-xs tracking-[0.2em] hover:brightness-90 transition-all shadow-xl shadow-[#8E7DBE]/20 active:scale-[0.98]"
                >
                  <ShoppingBag size={18} /> Add to Boutique Bag
                </button>
                <button 
                  onClick={handleShare}
                  className="sm:col-span-1 flex items-center justify-center border border-slate-200 py-5 rounded-[2rem] text-slate-400 hover:text-[#8E7DBE] hover:border-[#8E7DBE] transition-all active:scale-[0.98]">
                  <Share2 size={20} />
                </button>
              </motion.div>

              {/* Trust Section */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-14 grid grid-cols-2 gap-8 border-t border-slate-50 pt-10"
              >
                <div className="flex items-start gap-4">
                  <Award size={24} style={{ color: primaryColor }} className="mt-1" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">Premium Fabric</h5>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Sourced from the finest local textile artisans.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Truck size={24} style={{ color: primaryColor }} className="mt-1" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">Global Delivery</h5>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Secure, insured shipping to your doorstep.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-32 border-t border-gray-100 pt-20">
            <div className="flex gap-12 mb-16 border-b border-gray-50 overflow-x-auto no-scrollbar">
              {Object.keys(tabContent).map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`text-[11px] font-black uppercase tracking-[0.3em] pb-8 relative transition-all ${activeTab === tab ? 'text-gray-900' : 'text-gray-300 hover:text-[#8E7DBE]'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" 
                      style={{ backgroundColor: primaryColor }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="">
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