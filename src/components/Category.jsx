import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ArrowLeft, Heart, ShoppingBag, Eye, Star, Plus, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Category = () => {
  const API = "https://app-product-qh1f.onrender.com/api/v1";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartValue, setCartValue] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const category = location.state?.category || query.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/products/category?category=${category}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (category) fetchProducts();
  }, [category]);

  const handleCart = (id, e) => {
    e.stopPropagation();
    setCartValue(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    // Logic for adding to backend cart can be added here
  };

  if (loading) return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-100 border-t-[#0A2540] rounded-full animate-spin mb-4" />
      <p className="text-[#0A2540] font-black uppercase tracking-widest text-xs">Loading {category}...</p>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans pb-20">
      <Navbar />

      {/* --- LUXURY ECHO HEADER --- */}
      <section className="relative h-[350px] bg-blue-950 flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <button 
            onClick={() => navigate("/products")}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6 flex items-center justify-center gap-2 mx-auto hover:text-white transition-all"
          >
            <ArrowLeft size={14} /> All Collections
          </button>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter italic text-white capitalize">
            {category}<span className="text-blue-500 font-bold not-italic">.</span>
          </h1>
          <p className="text-blue-100/60 mt-4 text-sm font-medium tracking-wide max-w-md mx-auto">
            Discover our curated collection of {category} masterpieces, crafted for those who appreciate fine detail.
          </p>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/5 -z-0 select-none uppercase tracking-tighter">
          {category}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        
        {/* Statistics / Filter Bar */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 mb-12 shadow-xl shadow-blue-900/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="h-10 w-1 bg-blue-600 rounded-full" />
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Items</p>
               <p className="text-lg font-bold text-[#0A2540]">{products.length} Premium Products</p>
             </div>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500">Sorted by: Newest</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {products.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="group"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-900/10 group-hover:border-blue-100">
                  <img
                    src={item.images[0]?.url || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Buttons */}
                  <div className="absolute top-5 right-5 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    <button className="p-3 bg-white text-gray-400 hover:text-rose-500 rounded-2xl shadow-xl transition-colors">
                      <Heart size={18} fill="currentColor" className="fill-transparent hover:fill-rose-500" />
                    </button>
                    <button 
                      onClick={() => navigate(`/singleproduct/${item._id}`)}
                      className="p-3 bg-white text-gray-400 hover:text-blue-600 rounded-2xl shadow-xl transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </div>

                  {/* Quick Add Button */}
                  {/* <button 
                    onClick={(e) => handleCart(item._id, e)}
                    className="absolute bottom-6 left-6 right-6 bg-white text-[#0A2540] py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl"
                  >
                    <Plus size={16} /> Quick Add
                  </button> */}

                  {/* Badge */}
                  {cartValue[item._id] > 0 && (
                    <div className="absolute top-5 left-5 bg-[#0A2540] text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                      {cartValue[item._id]} IN BAG
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="px-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h2 
                      onClick={() => navigate(`/singleproduct/${item._id}`)}
                      className="text-lg font-bold text-[#0A2540] cursor-pointer hover:text-blue-600 transition-colors line-clamp-1 tracking-tight"
                    >
                      {item.name}
                    </h2>
                    <span className="text-xl font-black text-[#0A2540]">₹{item.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
                    <div className="flex text-amber-400">
                       {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Top Rated</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/singleproduct/${item._id}`)}
                    className="w-full py-4 text-white border-2 bg-blue-950 border-[#0A2540]/5 rounded-2xl text-[11px] font-black text-[#0A2540] uppercase tracking-[0.2em] hover:bg-[#0A2540] hover:text-white hover:border-[#0A2540] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    View Experience <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <ShoppingBag size={60} className="mx-auto text-gray-100 mb-6" />
            <h2 className="text-2xl font-black text-[#0A2540]">No items found</h2>
            <p className="text-gray-400 mt-2">We're currently restocking our {category} collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;